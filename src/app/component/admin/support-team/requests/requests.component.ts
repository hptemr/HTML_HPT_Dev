 

 
 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details, pageSize, pageSizeOptions, appointmentStatus, practiceLocations } from 'src/app/config';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
export interface PeriodicElement {
  name: string;  
  email : string;
  imgPath : string;
  appointmentDate: string;  
  practiceLocation: string;
  therapist : string;
  referredBy : string;
  action: string;   
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-requests', 
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  displayedColumns: string[] = ['name','appointmentDate','practiceLocation','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {resolved:false}
  userQuery: any = {}
  // fromDate: NgbDateStruct = ''
  // toDate: NgbDateStruct = ''
  dayTwo = false;
  dayOne = true;
  dayOneFlag: boolean = true;
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery: any = ""
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  appointmentRequestList: any
  practiceLocationsVal: any = ''
  toDate: any = ''
  fromDate: any = ''
  selectedFromDate: any = ''
  selectedToDate: any = ''
  seachByPname: any = ''
  seachById: any = ''
  resolved: any = []
  public userId: string = this.authService.getLoggedInInfo('_id');
  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,public authService: AuthService,public commonService: CommonService, private router: Router,) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    let userType = this.authService.getLoggedInInfo('role')
    if (userType != 'support_team') { }

    this.getRequestsList('')
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  check(event:any,id:any) {  
    if (event.checked === true) {
     let textMsg = 'Are you sure you want to mark this request as resolved?'
      // if (event.checked === false) {
      //    textMsg = 'Are you sure you want to mark this request as unresolved?'
      // }
      const dialogRef = this.dialog.open(AlertComponent,{
        panelClass: 'custom-alert-container',
        data : {
          warningNote: textMsg
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.resolveRequest(id)
          this.resolved[id] = true;  
        }else{
          this.resolved[id] = false;
        }
      });
    }  
  }

  async resolveRequest(id: string) {
      let data = {
        resolved:true,
        resolvedBy:this.userId,
      }
      let reqVars = {
        query: { _id: id },
        userId: this.userId,
        updateInfo: data
      }
      await this.authService.apiRequest('post', 'appointment/resolvedRequest',reqVars).subscribe(async response => { 
        if (response.error) {
          if(response.message){
            this.commonService.openSnackBar(response.message, "ERROR")   
          }
        } else {          
          if(response.message){
            this.getRequestsList('')
            this.commonService.openSnackBar(response.message, "SUCCESS")   
          }          
        }
      })
  }

  searchRecords(event: any, colName: string) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      if (colName == 'byPname') {
        this.userQuery = {
          status: "Active",
          $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }]
        }
      } 
    } else {
      this.userQuery = {}
      this.whereCond = {};
    }
    this.getRequestsList('search')
  }

  selectRecords(colName: string, event: any) {
    if (event && event != '') {
      Object.assign(this.whereCond, { [colName]: { $in: event } })
    } else {
      delete this.whereCond[colName];
    }
    this.getRequestsList('search')
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRequestsList()
  }


  onDateChange(event: any, colName: any) {
    let selectedDate = new Date(event.value);
    let obj = {}
    if (colName == 'fromDate') {
      obj = { $gte: selectedDate }
      this.selectedFromDate = selectedDate;
    } else {
      obj = { $lte: selectedDate }
      this.selectedToDate = selectedDate;
    }
    if (this.selectedFromDate && this.selectedToDate) {
      obj = { $gte: this.selectedFromDate, $lte: this.selectedToDate }
      Object.assign(this.whereCond, { appointmentDate: obj })
    } else {
      Object.assign(this.whereCond, { appointmentDate: obj })
    }
    this.getRequestsList('search')
  }


  async getRequestsList(action = "") {
      if (action == "") {
        this.commonService.showLoader()
      }
      let reqVars = {
        query: this.whereCond,
        userQuery: this.userQuery,
        fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, caseName: 1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1, resolved: 1 },
        patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1 },
        order: this.orderBy,
        limit: this.pageSize,
        offset: (this.pageIndex * this.pageSize)
      }
      await this.authService.apiRequest('post', 'appointment/getAppointmentRequestList', reqVars).subscribe(async response => {
        this.commonService.hideLoader()
        this.totalCount = response.data.totalCount
        let finalData: any = []
        if (response.data.appointmentRequestList.length > 0) {
          await response.data.appointmentRequestList.map((element: any) => {
            let newColumns = {
              id: element._id,
              practiceLocation: element.practiceLocation,
             // appointmentId: element.appointmentId,
              checkIn: element.checkIn,
              createdAt: element.updatedAt,
              appointmentDate: element.appointmentDate,
              status: element.status,
              caseName: element.caseName,
              caseType: element.caseType,
              statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
              patientName: element.patientId?.firstName + " " + element.patientId?.lastName,
              patientEmail: element.patientId?.email,
              profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage          
            }
            finalData.push(newColumns)
            this.resolved[element._id] = element.resolved ? element.resolved : false;
          })
        }
  
        if (this.totalCount > 0) {
          this.dayTwo = true;
          this.dayOne = false;
        }else{
          this.dayTwo = false;
          this.dayOne = true;
        }
         this.appointmentRequestList = new MatTableDataSource(finalData)
      })
    
  }

  
  reset() {
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.fromDate = ''
    this.toDate = ''
    this.selectedFromDate = ''
    this.selectedToDate = ''
    this.practiceLocationsVal = ''
    this.seachById = ''
    this.seachByPname = ''
    this.whereCond = {};
    this.userQuery = {};
    this.getRequestsList('reset')
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToappointmentDetails(requestId: string) {
    this.router.navigate([this.commonService.getLoggedInRoute(), 'create-request-appointment',requestId]);
  }

}
