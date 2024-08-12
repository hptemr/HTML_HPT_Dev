import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../../utils/validation-messages';
import { practiceLocations, s3Details } from 'src/app/config';
@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
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
  statusFlag: string;
  profileImage: string = '';
  appointment_flag: boolean = false
  appointmentForm: FormGroup;
  practiceLocationData: string[] = practiceLocations
  validationMessages = validationMessages
  clickOnRequestAppointment:boolean=false;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['requestId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.appointmentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],
      
    });
    this.getAppointmentRequestDetails();
    this.getTherapistList()
  }

 async createAppointment(formData:any){
    if (this.appointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
        Object.assign(formData, {patientId: this.userId})
        let reqVars = {
          userId: this.userId,
          data: formData
        }
        this.commonService.showLoader();       
        await this.authService.apiRequest('post', 'appointment/createAppointment',reqVars).subscribe(async response => { 
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {          
            if(response.message){
              this.commonService.openSnackBar(response.message, "SUCCESS")   
            }          
            this.successModal();
          }
        })
    }else{
        this.appointmentForm.markAllAsTouched();
        return;  
    }
  }

  
  async getTherapistList() {
    let reqVars = {
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
          this.statusFlag = this.appointmentRequestData.status.charAt(0).toLowerCase() + this.appointmentRequestData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentRequestData.patientId.profileImage;
          this.appointmentDate = this.appointmentRequestData.appointmentDate;
          this.patientName = this.appointmentRequestData.patientId?.firstName + " " + this.appointmentRequestData.patientId?.lastName;
          this.patientEmail = this.appointmentRequestData.patientId?.email;
          this.phoneNumber = this.appointmentRequestData.patientId?.phoneNumber;
          this.location = this.appointmentRequestData.location,

          this.appointment_flag = true;    
  
          console.log('appointment Request Data  >>>>>>>>>>>',this.appointmentRequestData)
        }
      })
    }

  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'The Appointment has been created'
      }
    });
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
