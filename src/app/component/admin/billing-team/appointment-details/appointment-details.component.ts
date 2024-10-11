import { Component, ViewChild } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details } from 'src/app/config';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  note: string;  
  dateAddedOn: string;   
  noteAddedOn: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
];

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
  providers: [DatePipe]
})
export class AppointmentDetailsComponent {
  appointmentId: string='';
  public userId: string;
  public userRole: string;
  statusFlag: string;
  app_data: any = [];
  appointmentData: any = [];
  appointment_flag: boolean = false
  profileImage: string = '';
  caseName:string =''
  patientId:string =''
  isBillingDetailsData:boolean=false
  billingDetailsData:any
  insuranceInfo:any;
  isAuthManagmentHistory:boolean=false
  authManagementHistory :any
  authExpireDate: string = 'NA'
  authVisits: string = 'NA'
  isSelfPay: boolean=false
  patientCheckInCount:number = 0

  displayedColumns: string[] = ['note', ' dateAddedOn', 'noteAddedOn', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    public dialog: MatDialog,
    private router: Router, 
    private route: ActivatedRoute, 
    public authService: AuthService, 
    public commonService: CommonService,
    private datePipe: DatePipe
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.getAppointmentDetails()
  }

  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 },
        doctorFields: { _id: 1, npi: 1, name: 1}
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;
          this.app_data[this.appointmentId] = this.appointmentData;

          this.isSelfPay = (this.appointmentData?.payVia == 'Selfpay')? true :false
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo   
          this.patientId = response.data.appointmentData?.patientId._id
          this.caseName = response.data.appointmentData?.caseName
          this.getBillingDetails(this.patientId, this.caseName)  
          this.getAuthManagementHistory(this.patientId, this.caseName)
          this.getPatientCheckInCount(this.patientId, this.caseName)
        }
      })
    }
  }

  getBillingDetails(patientId:any, caseName:string){
    this.isBillingDetailsData = false
    let billingDetailsQuery:any = {
      patientId : patientId,
      caseName : caseName
    }
    this.authService.apiRequest('post', 'appointment/getBillingDetails', billingDetailsQuery).subscribe(async response => { 
      let { error, data } = response
      if(data && data!=null ){
        this.isBillingDetailsData = true
        this.billingDetailsData = data
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getAuthManagementHistory(patientId:any, caseName:string){
    this.isAuthManagmentHistory = false
    this.authExpireDate = 'NA'
    this.authVisits = 'NA'
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }

    this.authService.apiRequest('post', 'appointment/getAuthorizationManagementDetails', queryObj).subscribe(async response => { 
      if(response?.data && response?.data.authManagement.length){
        this.isAuthManagmentHistory = true
        let allAuthManagementHistory = response?.data.authManagement.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.authManagementHistory = allAuthManagementHistory[0]
        this.authExpireDate =  this.datePipe.transform(new Date(this.authManagementHistory?.authorizationToDate), 'MM/dd/yyyy')!;
        this.authVisits = this.authManagementHistory?.authorizationVisit
      } 
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getPatientCheckInCount(patientId:any,caseName:string){
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }
    this.authService.apiRequest('post', 'appointment/getPatientCheckInCount', queryObj).subscribe(async response => { 
      this.patientCheckInCount = response?.data
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

  
}
