import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
//import { CustomValidators  } from '../../../../../shared/services/helper/custom-validator';
import { validationMessages } from '../../../../../utils/validation-messages';
import { DatePipe } from '@angular/common';
import { practiceLocations, s3Details } from 'src/app/config';
@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
  providers: [DatePipe]
})
export class CreateRequestAppointmentComponent {
  requestId: string;
  model: NgbDateStruct;
  selectedValue: number;
  therapistList:any=[];
  orderBy: any = { updatedAt: -1 }
  appointmentRequestData:any=[];
  appointmentDate: string = '';
  patientName: string = '';
  patientEmail: string = '';
  phoneNumber: string = '';
  location: string = '';
  public userId: string;
  public userRole: string;
  btnName: string = 'Create';
  statusFlag: string;
  patientId: string = '';
  profileImage: string = '';
  appointment_flag: boolean = false
  appointmentForm: FormGroup;
  practiceLocationData: string[] = practiceLocations
  validationMessages = validationMessages
  clickOnRequestAppointment:boolean=false;
  readonlyFlag:boolean=true;
  caseNameOtherFlag:boolean=false;
  convertPhoneNumber: string = '';
  casenameList:any = [];
  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['requestId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.appointmentForm = this.fb.group({
      caseName: ['', [Validators.required]],
      caseNameOther: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: [''],     
    });
    this.getAppointmentRequestDetails();
    this.getTherapistList()
  }

  async createAppointment(formData:any){
    if (this.appointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
        Object.assign(formData, {patientId: this.patientId})
        let reqVars = {
          requestId:this.requestId,
          userId: this.userId,
          data: formData
        }
        this.commonService.showLoader();       
        await this.authService.apiRequest('post', 'appointment/createAppointment',reqVars).subscribe(async response => { 
          this.clickOnRequestAppointment = false
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {          
            if(response.message){
              this.successModal(response.message);
              this.commonService.openSnackBar(response.message, "SUCCESS")   
            }                      
          }
        })
    }else{
        this.appointmentForm.markAllAsTouched();
        return;  
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

  async getAppointmentRequestDetails(){
    if (this.requestId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.requestId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentRequestDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentRequestData) {
          this.appointmentRequestData = response.data.appointmentRequestData;

          if(response.data.caseNameList){
            this.casenameList = response.data.caseNameList;
          }

          let appointmentData = response.data.appointmentData;
          if(appointmentData){
            this.btnName = 'Update';
          }
          
          this.statusFlag = this.appointmentRequestData.status.charAt(0).toLowerCase() + this.appointmentRequestData.status.slice(1)
          this.patientId = this.appointmentRequestData.patientId?._id;
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentRequestData.patientId.profileImage;
          this.patientName = this.appointmentRequestData.patientId?.firstName + " " + this.appointmentRequestData.patientId?.lastName;
          this.patientEmail = this.appointmentRequestData.patientId?.email;
          this.phoneNumber = this.appointmentRequestData.patientId?.phoneNumber;

          this.appointmentDate = (appointmentData && appointmentData.appointmentDate) ? appointmentData.appointmentDate : this.appointmentRequestData.appointmentDate;
          this.location = (appointmentData && appointmentData.practiceLocation) ? appointmentData.practiceLocation : this.appointmentRequestData.practiceLocation;

          let caseName = (appointmentData && appointmentData.caseName) ? appointmentData.caseName : '';
          if(appointmentData && appointmentData.status && appointmentData.status=='Pending'){
            this.appointmentForm.controls['caseNameOther'].setValue(caseName);
            this.onCaseSelected('Other');
            this.appointmentForm.controls['caseName'].setValue('Other'); 
          }else{
            this.appointmentForm.controls['caseName'].setValue(caseName); 
          }
          let therapistId = (appointmentData && appointmentData.therapistId) ? appointmentData.therapistId : '';
                   
          this.appointmentForm.controls['firstName'].setValue(this.appointmentRequestData.patientId?.firstName);
          this.appointmentForm.controls['lastName'].setValue(this.appointmentRequestData.patientId?.lastName);
          this.appointmentForm.controls['email'].setValue(this.appointmentRequestData.patientId?.email);         
          this.appointmentForm.controls['phoneNumber'].setValue(this.appointmentRequestData.patientId?.phoneNumber);
          this.appointmentForm.controls['appointmentDate'].setValue(this.appointmentDate);
          this.appointmentForm.controls['practiceLocation'].setValue(this.location);
          this.appointmentForm.controls['therapistId'].setValue(therapistId);
          
          if(this.appointmentDate){
            let selected_date = this.datePipe.transform(this.appointmentDate, 'MM-dd-yyyy')
            if(selected_date){
              let dateObj = selected_date.split('-');
              let dateArray = dateObj.map(Number);
              let obj = {'month':dateArray[0],'day':dateArray[1],'year':dateArray[2]};
              this.model = obj;
            }            
          }
          this.appointment_flag = true;    
        }
      })
    }
  }

  onCaseSelected(value: any) {
   this.caseNameOtherFlag = false
   this.appointmentForm.controls['caseNameOther'].setValidators([]);
   if(value=='Other'){
    this.caseNameOtherFlag = true
    this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
   }   
  }

  successModal(successMsg:string) {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote:successMsg
      }
    })
    dialogRef.afterClosed().subscribe(async id => {
      this.router.navigate(['/support-team/requests'])
    });
    
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }
}
