import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { s3Details, pageSize, pageSizeOptions, appointmentStatus, practiceLocations } from 'src/app/config';
export interface PeriodicElement {
  name: string;  
  appointmentDate: string;  
  action: string;  
  status: string;
  patientcheckstatus: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-appointments', 
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate','status','patientcheckstatus','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {}
  //whereCondTotal: any = {}
  userQuery: any = {}
  dayTwo = false;
  dayOne = true;
  dayOneFlag:boolean = true;
  model: NgbDateStruct;
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""
  appointmentsList: any
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  validationMessages: any = validationMessages
  appStatusVal: any = ''
  practiceLocationsVal: any = ''
  toDate: any = ''
  fromDate: any = ''
  selectedFromDate: any = ''
  selectedToDate: any = ''
  seachByName: any = ''
  seachById: any = ''
  fieldValues:any = ['Accepted', 'Rescheduled'];
  constructor(private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,    
    private router: Router, 
    public authService:AuthService,
    public commonService:CommonService,
    public adminService:AdminService,
    private route: ActivatedRoute
  
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {      
    // const today = new Date();
    // today.setHours(0, 0, 0, 0); 
    // const eodDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // this.whereCond = Object.assign(this.whereCond, {status:{$in:this.fieldValues}, appointmentDate: { $gte: today,$lte: eodDate } })
    this.getAppointmentList('')
   }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  searchRecords(event: any,colName:string) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      if(colName=='byName'){
        this.userQuery = {
          status: "Active",
          role: "therapist",
          $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }]
        }
      }else if(colName=='byId'){
        this.whereCond = Object.assign(this.whereCond, { appointmentId: searchStr })
      }
      
    } else {
      this.userQuery = {}
      this.whereCond = {};
    }
    this.getAppointmentList('search')
  }

  selectRecords(colName:string,event: any) {
     //Object.assign(this.whereCond, { [colName]: { $in: event } })
     if(colName=='practiceLocations'){
       this.whereCond = Object.assign(this.whereCond, { practiceLocation: { $in: event } })
     }else if(colName=='status'){
       this.whereCond = Object.assign(this.whereCond, { status: { $in: event } })//event.target.value
     }
     this.getAppointmentList('search')
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
     this.appStatusVal = ''
     this.seachById = ''
     this.seachByName = ''
     this.whereCond = {};     
     this.getAppointmentList('reset')
   }

   onDateChange(date: NgbDateStruct, colName: any) {
    let selectedDate = date.year + '-' + date.month + '-' + date.day
    let obj = {}
    if (colName == 'fromDate') {
      obj = { $gte: selectedDate }
      this.selectedFromDate = selectedDate;
    } else {
      obj = { $lte: selectedDate }
      this.selectedToDate = selectedDate;
    }
    
    if(this.selectedFromDate && this.selectedToDate){
      obj = { $gte:this.selectedFromDate, $lte:this.selectedToDate }
      Object.assign(this.whereCond, { appointmentDate: obj })
    }else{
      Object.assign(this.whereCond, { appointmentDate: obj })
    }
    
    this.getAppointmentList('search')
  }

  async getAppointmentList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }

    let reqVars = {
      query: this.whereCond,
      userQuery:this.userQuery,
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, createdAt:1, updatedAt:1, practiceLocation:1, appointmentDate:1,checkIn:1 },
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1,profileImage:1, practiceLocation:1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      if(response.data.appointmentList.length>0){
        await response.data.appointmentList.map((element: any) => {
          let newColumns = {
            id: element._id,
            practiceLocation: element.practiceLocation,
            appointmentId:element.appointmentId,
            checkIn: element.checkIn,
            createdAt:element.updatedAt,
            appointmentDate:element.appointmentDate,           
            status: element.status,
            statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
            patientName: element.patientId?.firstName + " " + element.patientId?.lastName,             
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage,
            therapistName:element.therapistId?.firstName + " " + element.therapistId?.lastName,             
          }
          finalData.push(newColumns)
        }) 
        // this.dayTwo = true;
        // this.dayOne = false;
        //this.dayOneFlag = false;
      }else{
        // this.dayTwo = false;
        // this.dayOne = true;
        //this.dayOneFlag = false;
      }

      if (this.totalCount > 0) {
        this.dayTwo = true;
        this.dayOne = false;
      }
      this.appointmentsList = new MatTableDataSource(finalData)
      //this.dayTwo = this.totalCount>0?true:false;
    })
  }


  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAppointmentList()
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked!=undefined) {
      let reqVars = {
        query: { _id: obj.id },
        updateInfo: {
          checkIn: event.source._checked,
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
        //this.getAppointmentList()     
      })
    }
  }

  showDayTwo() {
    this.dayTwo = true;
    this.dayOne = false;
  }
 
  navigateToappointmentDetails(appointmentId:string){
    this.router.navigate([this.commonService.getLoggedInRoute()+ '/appointment-details/',appointmentId]);
  }

}