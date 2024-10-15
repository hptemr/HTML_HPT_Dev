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
  soap_note_type: string;  
  note_date: string;   
  createdBy: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

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
  authExpireDate: any = 'NA'
  authVisits: string = 'NA'
  isSelfPay: boolean=false
  patientCheckInCount:number = 0
  hasInitialExamPlanData:boolean=false
  initialExamPlanData:any
  todayDate:any = new Date();
  isAuthDateExpire:boolean=false
  isPOCExpire:boolean=false

  displayedColumns: string[] = ['soap_note_type', ' note_date', 'createdBy', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchValue = ""
  status = ""
  caseType = ""
  noteList = []
  dataLoading = false
  fromDate: any = ''
  toDate: any = ''
  activeUserRoute = this.commonService.getLoggedInRoute()

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
    this.getAppointmentNotes()
    this.todayDate = this.datePipe.transform(new Date(this.todayDate), 'MM/dd/yyyy')!;
  }

  getAppointmentNotes(){
    let reqVars = {
      appointmentId:this.appointmentId,
      caseType:this.caseType,
      searchValue:this.searchValue,
      status:this.status,
      fromDate:this.fromDate,
      toDate:this.toDate
    }
    this.dataLoading = true
    this.authService.apiRequest('post', 'soapNote/getAppointmentNoteList', reqVars).subscribe(async response => {
      this.dataLoading = false
      this.dataSource.data = response.data
      this.noteList = response.data
    })
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
          this.getInitialExamination()
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
        this.isAuthDateExpire = (this.authExpireDate!='NA' && this.todayDate > this.authExpireDate)?true:false
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

  searchRecords(){
    this.getAppointmentNotes()
  }

  onDateChange() {
    this.getAppointmentNotes()
  }

  getInitialExamination(){
    this.hasInitialExamPlanData = false
    let reqVars = {
      query: { appointmentId: this.appointmentId },
      fields: { plan_start_date:1, plan_end_date:1 }
    }

    this.authService.apiRequest('post', 'soapNote/getInitialExamination', reqVars).subscribe(async response => { 
      this.hasInitialExamPlanData = (response.data!=null) ? true :false
      this.initialExamPlanData = response.data

      if(this.hasInitialExamPlanData && response.data?.plan_end_date){
        let planEndDate =  this.datePipe.transform(new Date(response.data?.plan_end_date), 'MM/dd/yyyy')!;
        this.isPOCExpire = (planEndDate && this.todayDate > planEndDate)?true:false
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  loadValue(value:any){
    if(value=='daily_note'){
      return 'daily-notes'
    }else if(value=='progress_note'){
      return 'progress-notes'
    }else if(value=='discharge_note'){
      return 'discharge-notes'
    }else{
      return value.replace('_','-')
    }
  }
  
}
