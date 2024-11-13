import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../../utils/validation-messages';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { s3Details, practiceLocations } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
@Component({
  selector: 'app-edit-appointment-modal', 
  templateUrl: './edit-appointment-modal.component.html',
  styleUrl: './edit-appointment-modal.component.scss'
})
export class EditAppointmentModalComponent {
  validationMessages = validationMessages; 
  appointmentForm: FormGroup;
  app_data:any=[]
  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  selectedAppTypeValue: string;
  clickOnRequestAppointment:boolean=false
  practiceLocationData: string[] = practiceLocations;
  //public doctorList:doctorlists[] = []

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<EditAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.app_data = data.app_data != undefined ? data.app_data : this.app_data;
  }

  ngOnInit() {      
    console.log('app_data Appointment ',this.app_data)
    this.appointmentForm = this.fb.group({
      id:[this.app_data.id, [Validators.required]],
      patientType: ['New', [Validators.required]],
      seachByPname: [''],
      caseName: ['Other', [Validators.required]],
      caseType: ['PT', [Validators.required]],
      caseNameOther: ['',Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],    
      phoneNumber: ['', []],
      seachByDoctor: ['',[Validators.required]],  
      notes: [''],        
      appointmentType: [''],
      appointmentTypeOther: [''],      
    });
  }


  
  onAppointmentTypeChange(value: any) {
    this.selectedAppTypeValue = value
  }
  

  async createAppointment(formData:any){
    
    if (this.appointmentForm.valid) {
      console.log(' #### form data >>>>>>',formData)
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
       
        // if(formData.patientType=='Existing'){
        //   Object.assign(formData, {patientId: this.patientId})
        // }
        // Object.assign(formData, {doctorId: this.doctorId});
        if (this.appointmentForm.controls['firstName'].disabled) {
          Object.assign(formData, {firstName: this.appointmentForm.controls['firstName'].value});
          Object.assign(formData, {lastName: this.appointmentForm.controls['lastName'].value});
          Object.assign(formData, {email: this.appointmentForm.controls['email'].value});
        }
        delete formData.seachByPname;
        delete formData.seachByDoctor;

        let reqVars = {
          requestId:'',
          userId: this.userId,
          data: formData,
          patientType:formData.patientType
        }
        // this.emailError = false; this.invalidEmailErrorMessage = '';   
        // this.authService.apiRequest('post', 'appointment/createAppointment', reqVars).subscribe(async (response) => {
    
        // this.commonService.hideLoader();
        // if (response.error) {
        //   if (response.message) {
        //     this.commonService.openSnackBar(response.message, "ERROR");
        //   }
        //   if(response.data.email){
        //     this.appointmentForm.controls["email"].markAsTouched();
        //     //this.appointmentForm.controls['email'].setValue('');
        //     this.emailError = true;
        //     this.invalidEmailErrorMessage = response.data.email;
        //   }
        // } else {
        //   if (response.message) {       
        //     this.dialogRef.close();
        //     this.successModal(response.message);
        //     this.commonService.openSnackBar(response.message, "SUCCESS");
        //   }
        // }
      //})
    }else{
      console.log(' #### appointment Form>>>>>>',this.appointmentForm)
        this.appointmentForm.markAllAsTouched();
        return;  
    }
  }
}
