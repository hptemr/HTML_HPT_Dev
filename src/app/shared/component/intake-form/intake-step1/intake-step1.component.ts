import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from 'src/app/component/patient/book-appointment/contact-modal/contact-modal.component';
import { maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { states_data } from '../../../../state';
import { cities_data } from '../../../../city';
interface State {
  state: string;
  state_code: string;
}
interface City {
  city: string;
  state_code: string;
}
@Component({
  selector: 'app-intake-step1',
  templateUrl: './intake-step1.component.html',
  styleUrl: './intake-step1.component.scss'
})
export class IntakeStep1Component {
  states: State[] = states_data;
  cities: City[] = []
  model: NgbDateStruct;
  appId: any
  selectedValue: any;
  isReadonly = true
  step1Form: FormGroup;
  step1FormData: any
  patientInfo: any
  practiceLocations = practiceLocations
  maritalStatus = maritalStatus
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  todayDate = new Date();
  selectedCity: string = "";
  userId = this.authService.getLoggedInInfo('_id')
  userRole = this.authService.getLoggedInInfo('role')
  maxAppntDate = this.commonService.getMaxAppoinmentFutureMonths()
  activeUserRoute = this.commonService.getLoggedInRoute()
  
  constructor(public dialog: MatDialog, private router: Router,
    private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.patientInfo = this.authService.getLoggedInInfo()
    this.getAppointmentDetails()
  }

  async getAppointmentDetails() {
    const req_vars = {
      query: { _id: this.appId },
      fields: { checkIn: 0 },
      patientFields: { _id:1,firstName:1,middleName:1,lastName:1,dob:1,maritalStatus:1,gender:1,email:1,phoneNumber:1,cellPhoneNumber:1,workExtensionNumber:1,address1:1,city:1,state:1,zipcode:1 },
      therapistFields: { _id: 1 }
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate([this.activeUserRoute, 'appointments'])
      } else {
        this.step1FormData = response.data.appointmentData
        this.selectedValue = this.step1FormData.bookingFor
        this.loadForm()
        if (this.userRole == 'patient' && this.step1FormData && this.step1FormData.caseName) {      
          this.step1Form.controls['practiceLocation']?.disable()
          this.step1Form.controls['appointmentDate']?.disable()
        }
        
        if (this.userRole == 'patient' && !this.step1FormData.intakeFormSubmit) {
            this.isReadonly = false
            
          // if (this.selectedValue == 'Myself') {
          //   //8 this.isReadonly = true
          //   this.step1Form.controls['dob'].disable()
          //   this.step1Form.controls['gender'].disable()
          //   this.step1Form.controls['maritalStatus'].disable()
          // } else {
          //   this.isReadonly = false
          //   this.step1Form.controls['dob'].enable()
          //   this.step1Form.controls['gender'].enable()
          //   this.step1Form.controls['maritalStatus'].enable()
          // }
        }else if ((this.userRole == 'support_team' || this.userRole == 'billing_team') && this.step1FormData.intakeFormSubmit) {
          this.isReadonly = false
        } else {
          this.isReadonly = true

          // this.step1Form.controls['practiceLocation']?.disable()
          // this.step1Form.controls['bookingFor']?.disable()
          // this.step1Form.controls['appointmentDate']?.disable()
          // this.step1Form.controls['relationWithPatient']?.disable()
          // this.step1Form.controls['maritalStatus']?.disable()
          // this.step1Form.controls['gender']?.disable()
          // this.step1Form.controls['city']?.disable()
          // this.step1Form.controls['state']?.disable()

          this.step1Form.disable()
        }

        this.commonService.hideLoader()
      }
    })
  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
    if (this.selectedValue == 'Myself') {
      this.setValue('Myself')
      this.isReadonly = true
      this.step1Form.controls['dob'].disable()
      this.step1Form.controls['gender'].disable()
      this.step1Form.controls['maritalStatus'].disable()
    } else {
      this.setValue('Other')
      this.isReadonly = false
      this.step1Form.controls['dob'].enable()
      this.step1Form.controls['gender'].enable()
      this.step1Form.controls['maritalStatus'].enable()
    }
  }

  setValue(current = '') {
    let firstName = ''
    let middleName = ''
    let lastName = ''
    let dob = null
    let maritalStatus = ''
    let gender = ''
    let email = ''
    let phoneNumber = ''
    let cellPhoneNumber = ''
    let workExtensionNumber = ''

    let address = ''
    let city = ''
    let state = ''
    let zipcode = ''
    if (current == 'Myself') {
      firstName = this.patientInfo.firstName
      middleName = this.patientInfo.middleName
      lastName = this.patientInfo.lastName
      maritalStatus = this.patientInfo.maritalStatus ? this.patientInfo.maritalStatus : ""
      gender = this.patientInfo.gender
      email = this.patientInfo.email
      dob = new Date(this.patientInfo.dob)
      phoneNumber = this.patientInfo.phoneNumber
      cellPhoneNumber = this.patientInfo.cellPhoneNumber ? this.patientInfo.cellPhoneNumber : ""
      workExtensionNumber = this.patientInfo.workExtensionNumber ? this.patientInfo.workExtensionNumber : ""
     // console.log('patientInfo >>>>',this.patientInfo)
      address = this.patientInfo.address1 ? this.patientInfo.address1 : ""
      city = this.patientInfo.city ? this.patientInfo.city : ""
      state = this.patientInfo.state ? this.patientInfo.state : ""
      zipcode = this.patientInfo.zipcode ? this.patientInfo.zipcode : ""

    } else if (this.step1FormData) {
      let patientAppInfo = this.step1FormData.patientInfo
      firstName = patientAppInfo.firstName
      middleName = patientAppInfo.middleName
      lastName = patientAppInfo.lastName
      maritalStatus = patientAppInfo.maritalStatus
      gender = patientAppInfo.gender
      email = patientAppInfo.email
      dob = new Date(patientAppInfo.dob)
      phoneNumber = patientAppInfo.phoneNumber
      cellPhoneNumber = patientAppInfo.cellPhoneNumber
      workExtensionNumber = patientAppInfo.workExtensionNumber
      address = patientAppInfo.address1
      city = patientAppInfo.city
      state = patientAppInfo.state
      zipcode = patientAppInfo.zipcode
    }
    this.step1Form.controls['bookingFor'].setValue(this.selectedValue)
    this.step1Form.controls['firstName'].setValue(firstName)
    this.step1Form.controls['middleName'].setValue(middleName)
    this.step1Form.controls['lastName'].setValue(lastName)
    this.step1Form.controls['maritalStatus'].setValue(maritalStatus)
    this.step1Form.controls['gender'].setValue(gender)
    this.step1Form.controls['email'].setValue(email)
    this.step1Form.controls['dob'].setValue(dob)
    this.step1Form.controls['phoneNumber'].setValue(phoneNumber)
    this.step1Form.controls['cellPhoneNumber'].setValue(cellPhoneNumber)
    this.step1Form.controls['workExtensionNumber'].setValue(workExtensionNumber)
   
    this.step1Form.controls['address'].setValue(address)
    this.step1Form.controls['city'].setValue(city)
    this.step1Form.controls['state'].setValue(state)
    this.step1Form.controls['zipcode'].setValue(zipcode)
  }
  
  //firstName=1,middleName=1,lastName=1,dob=1,maritalStatus=1,gender=1,email=1,phoneNumber=1,cellPhoneNumber=1,workExtensionNumber=1

  loadForm() {
    this.onStateChange(this.step1FormData ? this.step1FormData.patientId.state : '')
    this.selectedCity = (this.step1FormData ? this.step1FormData.patientId.city : '')
    this.step1Form = new FormGroup({
      practiceLocation: new FormControl((this.step1FormData ? this.step1FormData.practiceLocation : ''), Validators.compose([Validators.required])),
      appointmentDate: new FormControl((this.step1FormData ? this.step1FormData.appointmentDate : ''), Validators.compose([Validators.required])),
      bookingFor: new FormControl((this.step1FormData ? this.step1FormData.bookingFor : this.selectedValue)),
      relationWithPatient: new FormControl((this.step1FormData ? this.step1FormData.relationWithPatient : '')),
      firstName: new FormControl((this.step1FormData ? this.step1FormData.patientId.firstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      middleName: new FormControl((this.step1FormData ? this.step1FormData.patientId.middleName : '')),
      lastName: new FormControl((this.step1FormData ? this.step1FormData.patientId.lastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      dob: new FormControl((this.step1FormData ? new Date(this.step1FormData.patientId.dob) : ''), Validators.compose([Validators.required])),
      maritalStatus: new FormControl((this.step1FormData ? this.step1FormData.patientId.maritalStatus : '')),
      gender: new FormControl((this.step1FormData ? this.step1FormData.patientId.gender : '')),
      email: new FormControl((this.step1FormData ? this.step1FormData.patientId.email : ''), Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
      phoneNumber: new FormControl((this.step1FormData ? this.step1FormData.patientId.phoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      cellPhoneNumber: new FormControl((this.step1FormData ? this.step1FormData.patientId.cellPhoneNumber : '')),
      workExtensionNumber: new FormControl((this.step1FormData ? this.step1FormData.patientId.workExtensionNumber : '')),
      address1: new FormControl((this.step1FormData ? this.step1FormData.patientId.address1 : ''),Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])),
      city: new FormControl((this.step1FormData ? this.step1FormData.patientId.city : ''),Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(25)])),
      state: new FormControl((this.step1FormData ? this.step1FormData.patientId.state : ''),Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(25)])),
      zipcode: new FormControl((this.step1FormData ? this.step1FormData.patientId.zipcode : ''),Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(6)]))
    })
  }

  async bookAppointmentStep1() {
    //if ((this.authService.getLoggedInInfo('role') == 'patient' && this.step1FormData.status == 'Pending Intake Form') || (this.authService.getLoggedInInfo('role') == 'support_team' || this.authService.getLoggedInInfo('role') == 'billing_team')) {
      console.log(this.isReadonly,'step1Form>>>',this.step1Form)
      if (this.step1Form.invalid){      
        this.step1Form.markAllAsTouched();
      }else{
        let appointmentUpdateInfo = this.step1FormData.appointmentUpdateInfo;
          appointmentUpdateInfo.push({
            fromPatientId : (this.userRole=='patient') ? this.userId : '',
            fromAdminId:(this.userRole!='patient') ? this.userId : '',
            userRole:this.userRole,
            updatedAt:new Date()
          });
          let finalReqBody: any = this.step1Form.value
          if (this.isReadonly) {
            finalReqBody = {
              dob: this.patientInfo.dob,
              gender: this.patientInfo.gender,
              maritalStatus: this.patientInfo.maritalStatus,
            }
            Object.assign(finalReqBody, this.step1Form.value)
          }
          let params = {
            query: { _id: this.appId },
            updateInfo: {
              practiceLocation: finalReqBody.practiceLocation,
              appointmentDate: finalReqBody.appointmentDate,
              bookingFor: finalReqBody.bookingFor,
              relationWithPatient: finalReqBody.relationWithPatient,
              patientInfo: {
                firstName: finalReqBody.firstName,
                middleName: finalReqBody.middleName,
                lastName: finalReqBody.lastName,
                dob: finalReqBody.dob,
                maritalStatus: finalReqBody.maritalStatus,
                gender: finalReqBody.gender,
                email: finalReqBody.email,
                phoneNumber: finalReqBody.phoneNumber,
                cellPhoneNumber: finalReqBody.cellPhoneNumber,
                workExtension: finalReqBody.workExtension
              },
              appointmentUpdateInfo:appointmentUpdateInfo
            }
          }
    
          await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
            this.router.navigate([this.activeUserRoute, 'intake-form', 'step-2', this.appId])
          })
      }
    //  } else {
    //    this.router.navigate([this.activeUserRoute, 'intake-form', 'step-2', this.appId])
    //  }
  }


  async nextStep() {
    this.router.navigate([this.activeUserRoute, 'intake-form', 'step-2', this.appId])
  }

  contactModal() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      panelClass: 'custom-alert-container',
    });
  }

  checkSpace(colName: any, event: any) {
    this.step1Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onStateChange(selected_state_code:any) {
    this.selectedCity = '';
    this.getCitiesByState(selected_state_code);
  }

  getCitiesByState(state_code: string): City[] {
    return this.cities = cities_data.filter(city => city.state_code === state_code);
  }


}
