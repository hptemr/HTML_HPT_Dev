import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details, pageSize, pageSizeOptions, appointmentStatus, practiceLocations } from 'src/app/config';

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
  selector: 'app-resolved-requests', 
  templateUrl: './resolved-requests.component.html',
  styleUrl: './resolved-requests.component.scss'
})
export class ResolvedRequestsComponent {
  displayedColumns: string[] = ['patientName','appointmentDate','practiceLocation','resolvedBy','resolvedOn','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {resolved:true}
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

  searchRecords(event: any, colName: string) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      if (colName == 'byPname') {
        let firstName = finalStr;
        let lastName = finalStr;
        let final_str = searchStr.trim().split(' ');
        if(final_str[0] && final_str[1]){
          firstName =  { $regex: final_str[0], $options: 'i' }
          lastName =  { $regex: final_str[1], $options: 'i' }
        }
        this.userQuery = {
          status: "Active",
          $or: [{ firstName: firstName }, { lastName: lastName }, { email: finalStr }]
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
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, caseName: 1, createdAt: 1, updatedAt: 1, practiceLocation: 1,resolvedOn:1,  resolvedBy:1, appointmentDate: 1, resolved: 1 },
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
            resolvedOn: element.resolvedOn,
            resolvedBy: element.resolvedBy,
            status: element.status,
            caseName: element.caseName,
            caseType: element.caseType,
            statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
            patientName: element.patientId?.firstName + " " + element.patientId?.lastName,
            resolvedByName: element.resolvedBy?.firstName + " " + element.resolvedBy?.lastName,
            patientEmail: element.patientId?.email,
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage          
          }
          finalData.push(newColumns)
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