import { Component } from '@angular/core';
// import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import {  ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ShareModalComponent } from 'src/app/shared/comman/share-modal/share-modal.component';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { s3Details } from 'src/app/config';
import { SelectPrimaryInsuModalComponent } from 'src/app/shared/comman/select-primary-insu-modal/select-primary-insu-modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../utils/validation-messages';
import { DatePipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface PeriodicElement {
  soap_note_type: string;  
  note_date: string;   
  createdBy: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-case-details', 
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss',
  providers: [DatePipe]
})
export class CaseDetailsComponent {
  showShare= false;
  displayedColumns: string[] = ['soap_note_type', ' note_date', 'createdBy', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  appointmentId: string;
  appointmentData: any = [];
  profileImage: string = '';
  appointment_flag: boolean = false
  casenameList:any = [];
  orderBy: any = { firstName: 1 }
  therapistList:any=[];
  selectedTherapistId:string =""
  isBillingDetailsData:boolean=false
  billingDetailsData:any
  insuranceInfo:any;
  stCaseDetailsForm: FormGroup;
  selectedPrimaryInsuranceData:any;
  validationMessages = validationMessages
  caseName:string =''
  patientId:string =''
  isAuthManagmentHistory:boolean=false
  authManagementHistory :any
  authExpireDate: string = 'NA'
  stCaseDetails:any
  isStCaseDetails:boolean=false
  authVisits: string = 'NA'
  isSelfPay:boolean=false
  isPatientCheckedIn:boolean=false
  patientCheckInCount:number = 0
  hasInitialExamPlanData:boolean=false
  initialExamPlanData:any

  searchValue = ""
  status = ""
  caseType = ""
  noteList = []
  dataLoading = false
  fromDate: any = ''
  toDate: any = ''
  activeUserRoute = this.commonService.getLoggedInRoute()

  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
    public authService:AuthService,
    private fb: FormBuilder, 
    private datePipe: DatePipe
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.initializeStCaseDetailsForm()
    this.getAppointmentDetails()
    this.getTherapistList()
    this.getAppointmentNotes()
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
          // this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;
          this.selectedTherapistId = this.appointmentData?.therapistId?._id
          // this.app_data[this.appointmentId] = this.appointmentData;
          // this.appointmentService.addAppointmentData(this.appointmentId,this.appointmentData)
          this.isPatientCheckedIn = this.appointmentData?.checkIn
          this.isSelfPay = (this.appointmentData?.payVia == 'Selfpay')? true :false 
          this.patientId = response.data.appointmentData?.patientId._id
          this.caseName = response.data.appointmentData?.caseName
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo    
          this.getBillingDetails(this.patientId, this.caseName)  
          this.getAuthManagementHistory(this.patientId, this.caseName)  
          this.getStCaseDetails(this.patientId, this.caseName)
          this.getPatientCheckInCount(this.patientId, this.caseName)
          this.getInitialExamination()
        }
      })
    }
  }

  async getTherapistList() {
    const reqVars = {
      query: { role: 'therapist', status: 'Active' },
      fields: { _id: 1, firstName: 1, lastName: 1 },
      order: this.orderBy,
    }
    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      if (response.data && response.data.therapistData) {
        this.therapistList = response.data.therapistData;
      }
    })
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
    // const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
    //   panelClass: 'custom-alert-container', 
    // });
  }

  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
 
  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
    });
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Kindly choose a therapist prior to confirming the appointment request.'
      }
    });
  }

  shareModal() {
    // const dialogRef = this.dialog.open(ShareModalComponent,{
    //   panelClass: 'custom-alert-container',
    //   data : {
    //     successNote: 'Are you sure you want to share this with billing team?'
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result=>{
    //   this.showShare= result;
    // })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
    
  
  navigateToappointmentDetails(path: string,id:string) {
    this.router.navigate([this.commonService.getLoggedInRoute()+''+path+id]);
  }

  selectInsuranceModal() {
    const dialogRef = this.dialog.open(SelectPrimaryInsuModalComponent,{
      disableClose: true,
      width:'650px',
      panelClass: [ 'modal--wrapper'],
      data: {
        page:'ST-CaseDetails',
        title: 'Primary Insurance',
        insuranceType: 'primary',
        insuranceInfo: this.insuranceInfo,
        selectedInsurance :this.stCaseDetailsForm.get('primaryInsurance')?.value
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.selectedPrimaryInsuranceData = result 
        this.stCaseDetailsForm.controls['primaryInsurance'].setValue(result?.insuranceName)
      }
    });
    
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

  initializeStCaseDetailsForm(){
    this.stCaseDetailsForm = this.fb.group({
      therapistId: ['', [Validators.required]],
      returnToDoctor: ['', []],
      primaryInsurance: ['',[]]
    });
  }

  saveStCaseDetails(){
    this.commonService.showLoader();
    let caseDetailsFormObj:any =this.stCaseDetailsForm.value
    caseDetailsFormObj['payerID']= this.selectedPrimaryInsuranceData?.payerID ? this.selectedPrimaryInsuranceData?.payerID :''
    let caseDetailsObj:any = {
      caseDetails : this.stCaseDetailsForm.value,
      patientId : this.patientId,
      caseName : this.caseName,
      appointmentId : this.appointmentId 
    }

    this.authService.apiRequest('post', 'appointment/addStCaseDetails', caseDetailsObj).subscribe(async response => {  
      this.commonService.openSnackBar(response.message, "SUCCESS")
      this.commonService.hideLoader(); 
    },(err) => {
      this.commonService.hideLoader();
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

  getStCaseDetails(patientId:any, caseName:string){
    this.isStCaseDetails = false
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }

    this.authService.apiRequest('post', 'appointment/getStCaseDetails', queryObj).subscribe(async response => { 
      if(response?.data){
        this.isStCaseDetails = true
        this.stCaseDetails = response?.data
      }
      this.addStCaseDetailsValue()
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  addStCaseDetailsValue() {
    if(this.stCaseDetails?.primaryInsurance){
      this.selectedPrimaryInsuranceData =  this.stCaseDetails 
    }
    this.stCaseDetailsForm.controls['therapistId'].setValue(this.isStCaseDetails ? this.stCaseDetails?.therapistId : this.selectedTherapistId);
    this.stCaseDetailsForm.controls['returnToDoctor'].setValue(this.isStCaseDetails ? this.stCaseDetails?.returnToDoctor : "");
    this.stCaseDetailsForm.controls['primaryInsurance'].setValue(this.isStCaseDetails ? this.stCaseDetails?.primaryInsurance : this.insuranceInfo?.primaryInsuranceCompany);
  }

  patientCheckIn(event:MatCheckboxChange){
    let reqVars = {
      query: { _id: this.appointmentId },
      updateInfo: {
        checkIn: event.checked,
      }
    }

    this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => { 
      this.getPatientCheckInCount(this.patientId,this.caseName)
      this.commonService.openSnackBar(response.message, "SUCCESS")
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
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }


}
