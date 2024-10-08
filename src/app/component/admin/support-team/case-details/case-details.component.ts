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
  selector: 'app-case-details', 
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss',
  providers: [DatePipe]
})
export class CaseDetailsComponent {
  showShare= false;
  displayedColumns: string[] = ['note', ' dateAddedOn', 'noteAddedOn', 'status' ,'action'];
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
          this.patientId = response.data.appointmentData?.patientId._id
          this.caseName = response.data.appointmentData?.caseName
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo    
          this.getBillingDetails(this.patientId, this.caseName)  
          this.getAuthManagementHistory(this.patientId, this.caseName)  
          this.getStCaseDetails(this.patientId, this.caseName)
          
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
        insuranceInfo: this.insuranceInfo
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
    caseDetailsFormObj['payerID']= this.selectedPrimaryInsuranceData.payerID
    let caseDetailsObj:any = {
      caseDetails : this.stCaseDetailsForm.value,
      patientId : this.patientId,
      caseName : this.caseName
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
    this.commonService.showLoader();
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
      }
      this.commonService.hideLoader(); 
    },(err) => {
      this.commonService.hideLoader();
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
    this.stCaseDetailsForm.controls['therapistId'].setValue(this.isStCaseDetails ? this.stCaseDetails?.therapistId : this.selectedTherapistId);
    this.stCaseDetailsForm.controls['returnToDoctor'].setValue(this.isStCaseDetails ? this.stCaseDetails?.returnToDoctor : "");
    this.stCaseDetailsForm.controls['primaryInsurance'].setValue(this.isStCaseDetails ? this.stCaseDetails?.primaryInsurance : this.insuranceInfo?.primaryInsuranceCompany);
  }


}
