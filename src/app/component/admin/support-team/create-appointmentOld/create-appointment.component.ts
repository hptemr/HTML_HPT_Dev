import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { practiceLocations, s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { regex } from '../../../../utils/regex-patterns';
import { validationMessages } from '../../../../utils/validation-messages';
import { states_data } from '../../../../state';
import { cities_data } from '../../../../city';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

interface State {
  state: string;
  state_code: string;
}
interface City {
  city: string;
  state_code: string;
}

interface PatientData {
  _id: string;
  firstName: string;
  lastName:string;
}

@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  model: NgbDateStruct;
  selectedValue: number;

  regexPattern = regex
  validationMessages = validationMessages
  practiceLocationData: string[] = practiceLocations
  orderBy: any = { firstName: 1 }
  options: any[] = [];
  therapistList: any[] = [];
  convertPhoneNumber: string = '';
  createAppointmentForm: FormGroup;
  todayDate: any = new Date()
  states: State[] = states_data;
  cities: City[] = []
  existingEmail = new FormControl('');
  patientData:PatientData = {_id:'',firstName:'',lastName:''}
  isEmailExist:boolean = false
  clickOnCreateAppointment:boolean = false
  clickOnUpdateAppointment:boolean = false
  refferalId:any = ''
  isViewAppointment:boolean = false

  constructor( 
    public dialog: MatDialog,
    public authService: AuthService,
    public commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.refferalId = params['refferalId'];
    })
  }

  ngOnInit() {
    this.initializeAdminProfile()
    this.getTherapistList()
    this.getEmail()
    if(this.refferalId){
      this.getAppointmentDataById(this.refferalId)
    }
  }

  initializeAdminProfile() {
    this.createAppointmentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      lastName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      email: ['', [Validators.required, Validators.email]],
      appointmentDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(regex.usPhoneNumber)]],
      practiceLocation: ['',[Validators.required]],
      therapist: ['',[Validators.required]],
      referredBy: ['', [Validators.required]],
      streetName:['',[Validators.required]],
      appartment:[''],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      zipcode:['', [Validators.pattern(regex.onlyNumeric)]]
    });
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

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  onStateChange(selected_state_code:any) {
    this.createAppointmentForm.controls['city'].setValue('');
    this.getCitiesByState(selected_state_code);
  }

  getCitiesByState(state_code: string): City[] {
    return this.cities = cities_data.filter(city => city.state_code === state_code);
  }

  createAppointment() {
    if (this.createAppointmentForm.valid) {
      this.clickOnCreateAppointment = true
      this.commonService.showLoader();
      // let stateCode = this.createAppointmentForm.controls['state'].value;
      // let state=states_data.filter(state => state.state_code === stateCode);
      let bodyData:any = this.createAppointmentForm.value
      bodyData['isEmailExist']= this.isEmailExist
      bodyData['patientId']= this.isEmailExist?this.patientData._id:''
      // bodyData['state']= (state.length)?state[0].state:''
      console.log("bodyData>>",bodyData)
      this.authService.apiRequest('post', 'referral/createAppointment', bodyData).subscribe(async response => {  
        this.commonService.openSnackBar(response.message, "SUCCESS")
        this.commonService.hideLoader(); 
        this.router.navigate(['/support-team/referrals']);
      },(err) => {
        this.commonService.hideLoader();
        console.log("createAppointment Err>>>",err);
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        this.router.navigate(['/support-team/referrals']);
      })
    }
  }

  getEmail(){
    // this.existingEmail.valueChanges
    this.createAppointmentForm.controls['email'].valueChanges
    .pipe(debounceTime(300)) // Debounce for 300ms
    .subscribe(value => {
      // Perform search when value changes
      this.checkExistingEmail(value);
    });
  }

  checkExistingEmail(email: any) {
    this.isEmailExist = false
    this.createAppointmentForm.controls['firstName'].setValue('');
    this.createAppointmentForm.controls['lastName'].setValue('');
    this.patientData = {_id:'',firstName:'',lastName:''}
    // Check valid email
    if(email && this.regexPattern.email.test(email)){
      let reqVars = {
        query: { email: email },
        fields: { firstName: 1, lastName: 1 }
      }
      this.authService.apiRequest('post', 'patients/getPatientData', reqVars).subscribe(response => {
        if(response.data.patientData && response.data.patientData!=null){
          this.patientData = response.data.patientData
          this.createAppointmentForm.controls['firstName'].setValue(this.patientData.firstName);
          this.createAppointmentForm.controls['lastName'].setValue(this.patientData.lastName);
          this.isEmailExist = true
        }
      },(_err) => {})
    }
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Your invite has been sent successfully!'
      }
    });
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  getAppointmentDataById(refferalId: any) {
      let reqVars = {
        referralId: refferalId
      }
      this.authService.apiRequest('post', 'referral/getAppointmentDataById', reqVars).subscribe(response => {
        if(!response.error && response.data.length){
          let refferalAppointmentData = response.data[0]
          this.createAppointmentForm.controls['firstName'].setValue(refferalAppointmentData.patient.firstName);
          this.createAppointmentForm.controls['lastName'].setValue(refferalAppointmentData.patient.lastName);
          this.createAppointmentForm.controls['email'].setValue(refferalAppointmentData.patient.email);
          // Disable inputes (First Name, Last Name, Email)
          this.createAppointmentForm.controls['firstName'].disable();
          this.createAppointmentForm.controls['lastName'].disable();
          this.createAppointmentForm.controls['email'].disable();

          this.createAppointmentForm.controls['appointmentDate'].setValue(refferalAppointmentData.appointment.appointmentDate);
          this.createAppointmentForm.controls['practiceLocation'].setValue(refferalAppointmentData.appointment.practiceLocation);
          this.createAppointmentForm.controls['therapist'].setValue(refferalAppointmentData.therapist._id);
          this.createAppointmentForm.controls['referredBy'].setValue(refferalAppointmentData.referredBy);
          this.createAppointmentForm.controls['phoneNumber'].setValue(refferalAppointmentData.phone);
          this.createAppointmentForm.controls['streetName'].setValue(refferalAppointmentData.streetName);
          this.createAppointmentForm.controls['appartment'].setValue(refferalAppointmentData.appartment);
          this.createAppointmentForm.controls['state'].setValue(refferalAppointmentData.state);
          this.createAppointmentForm.controls['city'].setValue(refferalAppointmentData.city);
          this.createAppointmentForm.controls['zipcode'].setValue(refferalAppointmentData.zipcode);

          if(refferalAppointmentData.appointment.status!='Pending'){
            this.isViewAppointment = true
            this.createAppointmentForm.disable();
          }
        }
      },(_err) => {})
    }

    updateAppointment(){
      if (this.createAppointmentForm.valid) {
        this.clickOnUpdateAppointment = true
        this.commonService.showLoader();
        let bodyData:any = this.createAppointmentForm.value
        bodyData['refferalId']= this.refferalId
        this.authService.apiRequest('post', 'referral/updateAppointment', bodyData).subscribe(async response => {  
          this.commonService.openSnackBar(response.message, "SUCCESS")
          this.commonService.hideLoader(); 
          this.router.navigate(['/support-team/referrals']);
        },(err) => {
          this.commonService.hideLoader();
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
          this.router.navigate(['/support-team/referrals']);
        })
      }
    }
}