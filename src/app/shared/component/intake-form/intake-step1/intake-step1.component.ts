import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from 'src/app/component/patient/book-appointment/contact-modal/contact-modal.component';
import { maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-intake-step1',
  templateUrl: './intake-step1.component.html',
  styleUrl: './intake-step1.component.scss'
})
export class IntakeStep1Component {
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
  maxAppntDate = this.commonService.getMaxAppoinmentFutureMonths()

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
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
      patientFields: { _id: 1 },
      therapistFields: { _id: 1 }
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate(['/patient/appointments'])
      } else {
        this.step1FormData = response.data.appointmentData
        this.selectedValue = this.step1FormData.bookingFor
        this.loadForm()

        if (this.authService.getLoggedInInfo('role') == 'patient' && this.step1FormData.status == 'Pending') {
          if (this.selectedValue == 'Myself') {
            this.isReadonly = true
            this.step1Form.controls['dob'].disable()
            this.step1Form.controls['gender'].disable()
            this.step1Form.controls['maritalStatus'].disable()
          } else {
            this.isReadonly = false
            this.step1Form.controls['dob'].enable()
            this.step1Form.controls['gender'].enable()
            this.step1Form.controls['maritalStatus'].enable()
          }
        } else {
          this.isReadonly = true
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
  }

  loadForm() {
    this.step1Form = new FormGroup({
      practiceLocation: new FormControl((this.step1FormData ? this.step1FormData.practiceLocation : ''), Validators.compose([Validators.required])),
      appointmentDate: new FormControl((this.step1FormData ? this.step1FormData.appointmentDate : ''), Validators.compose([Validators.required])),
      bookingFor: new FormControl((this.step1FormData ? this.step1FormData.bookingFor : this.selectedValue)),
      relationWithPatient: new FormControl((this.step1FormData ? this.step1FormData.relationWithPatient : '')),
      firstName: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.firstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      middleName: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.middleName : '')),
      lastName: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.lastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      dob: new FormControl((this.step1FormData ? new Date(this.step1FormData.patientInfo.dob) : ''), Validators.compose([Validators.required])),
      maritalStatus: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.maritalStatus : '')),
      gender: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.gender : '')),
      email: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.email : ''), Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
      phoneNumber: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.phoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      cellPhoneNumber: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.cellPhoneNumber : '')),
      workExtensionNumber: new FormControl((this.step1FormData ? this.step1FormData.patientInfo.workExtensionNumber : ''))
    })
  }

  async bookAppointmentStep1() {
    if (this.authService.getLoggedInInfo('role') == 'patient' && this.step1FormData.status == 'Pending') {
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
          }
        }
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
        this.router.navigate(['/patient/intake-form/step-2', this.appId])
      })
    } else {
      this.router.navigate(['/patient/intake-form/step-2', this.appId])
    }
  }

  contactModal() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      panelClass: 'custom-alert-container',
    });
  }

  checkSpace(colName: any, event: any) {
    this.step1Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

}
