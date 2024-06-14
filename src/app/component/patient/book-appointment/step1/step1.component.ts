import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { practiceLocations, maritalStatus, relationWithPatient } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  selectedValue: any;
  isReadonly = true
  step1Form: FormGroup;
  step1FormData: any
  patientInfo: any
  practiceLocations = practiceLocations
  maritalStatus = maritalStatus
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages

  dob: any
  appointmentDate: any

  todayDate = new Date();
  maxAppntDate = this.commonService.getMaxAppoinmentFutureMonths()

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.patientInfo = this.authService.getLoggedInInfo()
    this.step1FormData = localStorage.getItem("step1FormData")
    if (this.step1FormData == null) {
      this.isReadonly = true
      this.loadForm()
      this.selectedValue = 'Myself'
      this.setValue('Myself')
    } else {
      this.step1FormData = JSON.parse(this.step1FormData)
      this.isReadonly = this.step1FormData.bookingFor == 'Myself' ? true : false
      this.selectedValue = this.step1FormData.bookingFor
      this.loadForm()
    }
    this.enabledDisabledFields()
    console.log("***ngOnInit step1FormData***", this.step1FormData)
  }

  enabledDisabledFields() {
    if (this.isReadonly) {
      this.step1Form.controls['dob'].disable()
      this.step1Form.controls['gender'].disable()
      this.step1Form.controls['maritalStatus'].disable()
      this.setValue('Myself')
    } else {
      this.step1Form.controls['dob'].enable()
      this.step1Form.controls['gender'].enable()
      this.step1Form.controls['maritalStatus'].enable()
      this.setValue('Other')
    }
  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
    if (this.selectedValue == 'Myself') {
      this.setValue('Myself')
      this.isReadonly = true
    } else {
      this.isReadonly = false
      this.setValue('Other')
    }
    this.enabledDisabledFields()
  }

  setValue(current = '') {
    console.log("patientInfo:", this.patientInfo) 
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
      firstName = this.step1FormData.firstName
      middleName = this.step1FormData.middleName
      lastName = this.step1FormData.lastName
      maritalStatus = this.step1FormData.maritalStatus
      gender = this.step1FormData.gender
      email = this.step1FormData.email
      dob = new Date(this.step1FormData.dob)
      phoneNumber = this.step1FormData.phoneNumber
      cellPhoneNumber = this.step1FormData.cellPhoneNumber
      workExtensionNumber = this.step1FormData.workExtensionNumber
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
      firstName: new FormControl((this.step1FormData ? this.step1FormData.firstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      middleName: new FormControl((this.step1FormData ? this.step1FormData.middleName : '')),
      lastName: new FormControl((this.step1FormData ? this.step1FormData.lastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      dob: new FormControl((this.step1FormData ? new Date(this.step1FormData.dob) : ''), Validators.compose([Validators.required])),
      maritalStatus: new FormControl((this.step1FormData ? this.step1FormData.maritalStatus : '')),
      gender: new FormControl((this.step1FormData ? this.step1FormData.gender : '')),
      email: new FormControl((this.step1FormData ? this.step1FormData.email : ''), Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
      phoneNumber: new FormControl((this.step1FormData ? this.step1FormData.phoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      cellPhoneNumber: new FormControl((this.step1FormData ? this.step1FormData.cellPhoneNumber : '')),
      workExtensionNumber: new FormControl((this.step1FormData ? this.step1FormData.workExtensionNumber : ''))
    })

  }

  bookAppointmentStep1() {
    let finalReqBody: any = this.step1Form.value
    if (this.isReadonly) {
      finalReqBody = {
        dob: this.patientInfo.dob,
        gender: this.patientInfo.gender,
        maritalStatus: this.patientInfo.maritalStatus,
      }
      Object.assign(finalReqBody, this.step1Form.value)
    }
    console.log("step1Form:", finalReqBody)
    localStorage.setItem("step1FormData", JSON.stringify(finalReqBody));
    this.router.navigate(['/patient/book-appointment/step-2'])
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
