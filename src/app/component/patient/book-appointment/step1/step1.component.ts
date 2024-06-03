import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  model: NgbDateStruct;
  maxDate: any
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

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    const today = new Date();
    this.maxDate = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear() }
    this.patientInfo = this.authService.getLoggedInInfo()
    this.step1FormData = localStorage.getItem("step1FormData")
    let appToday
    if (this.step1FormData == null) {
      this.loadForm()
      this.selectedValue = 'Myself'
      this.setValue('Myself')
      //appToday = new Date(this.patientInfo.dob);
    } else {
      this.isReadonly = false
      this.selectedValue = 'Other'
      //appToday = new Date("08-03-2024");
      this.step1FormData = JSON.parse(this.step1FormData)
      this.loadForm()
    }
    //this.dob = { month: appToday.getMonth() + 1, day: appToday.getDate(), year: appToday.getFullYear() }
    console.log("***ngOnInit step1FormData***", this.step1FormData)
    console.log("***selectedValue***", this.selectedValue)
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
  }

  setValue(current = '') {
    let firstName = ''
    let middleName = ''
    let lastName = ''
    let dob = ''
    let martialStatus = ''
    let gender = ''
    let email = ''
    let phoneNumber = ''
    let cellPhoneNumber = ''
    let workExtensionNumber = ''
    if (current == 'Myself') {
      firstName = this.patientInfo.firstName
      middleName = this.patientInfo.middleName
      lastName = this.patientInfo.lastName
      martialStatus = this.patientInfo.martialStatus
      gender = this.patientInfo.gender
      email = this.patientInfo.email
      dob = this.patientInfo.dob
      phoneNumber = this.patientInfo.phoneNumber
      cellPhoneNumber = this.patientInfo.cellPhoneNumber
      workExtensionNumber = this.patientInfo.workExtensionNumber
    }else if(this.step1FormData){
      firstName = this.step1FormData.firstName
      middleName = this.step1FormData.middleName
      lastName = this.step1FormData.lastName
      martialStatus = this.step1FormData.martialStatus
      gender = this.step1FormData.gender
      email = this.step1FormData.email
      dob = this.step1FormData.dob
      phoneNumber = this.step1FormData.phoneNumber
      cellPhoneNumber = this.step1FormData.cellPhoneNumber
      workExtensionNumber = this.step1FormData.workExtensionNumber
    }

    // const today = new Date(dob);
    // this.dob = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear() }
    this.step1Form.controls['bookingFor'].setValue(this.selectedValue)
    this.step1Form.controls['firstName'].setValue(firstName)
    this.step1Form.controls['middleName'].setValue(middleName)
    this.step1Form.controls['lastName'].setValue(lastName)
    this.step1Form.controls['martialStatus'].setValue(martialStatus)
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
      firstName: new FormControl((this.step1FormData ? this.step1FormData.firstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      middleName: new FormControl((this.step1FormData ? this.step1FormData.middleName : '')),
      lastName: new FormControl((this.step1FormData ? this.step1FormData.lastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      dob: new FormControl((this.step1FormData ? this.step1FormData.dob : ''), Validators.compose([Validators.required])),
      martialStatus: new FormControl((this.step1FormData ? this.step1FormData.martialStatus : '')),
      gender: new FormControl((this.step1FormData ? this.step1FormData.gender : '')),
      email: new FormControl((this.step1FormData ? this.step1FormData.email : ''), Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
      phoneNumber: new FormControl((this.step1FormData ? this.step1FormData.phoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      cellPhoneNumber: new FormControl((this.step1FormData ? this.step1FormData.cellPhoneNumber : '')),
      workExtensionNumber: new FormControl((this.step1FormData ? this.step1FormData.workExtensionNumber : ''))
    })

  }

  bookAppointmentStep1() {
    console.log("step1Form:", this.step1Form.value)
    localStorage.setItem("step1FormData", JSON.stringify(this.step1Form.value));
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
