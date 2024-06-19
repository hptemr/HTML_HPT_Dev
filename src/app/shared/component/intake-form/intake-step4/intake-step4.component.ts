import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { relationWithPatient } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-intake-step4',
  templateUrl: './intake-step4.component.html',
  styleUrl: './intake-step4.component.scss'
})
export class IntakeStep4Component {
  appId: any
  step4Form: FormGroup
  step4FormData: any
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  emergencyContactList: any
  todayDate = new Date()
  isFormEditable = false
  activeUserRoute = "/" + this.commonService.getLoggedInRoute() + "/"
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.getEmergencyContactList()
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
        this.router.navigate([this.activeUserRoute +'appointments'])
      } else {
        this.step4FormData = response.data.appointmentData.emergencyContact[0]
        this.loadForm()
        if (this.authService.getLoggedInInfo('role') == 'patient' && response.data.appointmentData.status == 'Pending') {
          //patient can update the info
          this.isFormEditable = true
        } else {
          this.isFormEditable = false
          this.step4Form.disable()
        }
        this.commonService.hideLoader()
      }
    })
  }

  loadForm() {
    this.step4Form = new FormGroup({
      ec1FirstName: new FormControl((this.step4FormData ? this.step4FormData.ec1FirstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec1LastName: new FormControl((this.step4FormData ? this.step4FormData.ec1LastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec1Dob: new FormControl((this.step4FormData ? this.step4FormData.ec1Dob : ''), Validators.compose([Validators.required])),
      ec1RelationWithPatient: new FormControl((this.step4FormData ? this.step4FormData.ec1RelationWithPatient : '')),
      ec1PhoneNumber: new FormControl((this.step4FormData ? this.step4FormData.ec1PhoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      ec1myTreatmentCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec1myTreatmentCheckbox : false)),
      ec1myAccountCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec1myAccountCheckbox : false)),

      ec2FirstName: new FormControl((this.step4FormData ? this.step4FormData.ec2FirstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec2LastName: new FormControl((this.step4FormData ? this.step4FormData.ec2LastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec2Dob: new FormControl((this.step4FormData ? this.step4FormData.ec2Dob : ''), Validators.compose([Validators.required])),
      ec2RelationWithPatient: new FormControl((this.step4FormData ? this.step4FormData.ec2RelationWithPatient : '')),
      ec2PhoneNumber: new FormControl((this.step4FormData ? this.step4FormData.ec2PhoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      ec2myTreatmentCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec2myTreatmentCheckbox : false)),
      ec2myAccountCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec2myAccountCheckbox : false)),
    })
  }

  async getEmergencyContactList() {
    let reqVars = {
      query: { _id: this.authService.getLoggedInInfo("_id") },
      fields: { updatedAt: 0 },
      order: { firstName: 1 },
    }
    await this.authService.apiRequest('post', 'emergencyContact/getContactData', reqVars).subscribe(async response => {
      this.emergencyContactList = response.data
    })
  }

  checkSpace(colName: any, event: any) {
    this.step4Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  getContact(formNumber: any, event: any) {
    let currentIndex = event.target.value
    let firstName = ''
    let lastName = ''
    let dob = ''
    let relationWithPatient = ''
    let phoneNumber = ''
    let myTreatments = false
    let myAccounts = false
    if (currentIndex != '') {
      let ecObj = this.emergencyContactList[currentIndex]
      firstName = ecObj.firstName
      lastName = ecObj.lastName
      dob = ecObj.dob
      relationWithPatient = ecObj.relationWithPatient
      phoneNumber = ecObj.phoneNumber
      myTreatments = ecObj.myTreatmentCheckbox
      myAccounts = ecObj.myAccountCheckbox
    }
    this.step4Form.controls['ec' + formNumber + 'FirstName'].setValue(firstName)
    this.step4Form.controls['ec' + formNumber + 'LastName'].setValue(lastName)
    this.step4Form.controls['ec' + formNumber + 'Dob'].setValue(dob)
    this.step4Form.controls['ec' + formNumber + 'RelationWithPatient'].setValue(relationWithPatient)
    this.step4Form.controls['ec' + formNumber + 'PhoneNumber'].setValue(phoneNumber)
    this.step4Form.controls['ec' + formNumber + 'myTreatmentCheckbox'].setValue(myTreatments)
    this.step4Form.controls['ec' + formNumber + 'myAccountCheckbox'].setValue(myAccounts)
  }

  async bookAppointmentStep4() {
    if (this.isFormEditable) {
      let params = {
        query: { _id: this.appId },
        updateInfo: {
          emergencyContact: this.step4Form.value
        }
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
        this.router.navigate([this.activeUserRoute +'intake-form/step-5', this.appId])
      })
    } else {
      this.router.navigate([this.activeUserRoute +'intake-form/step-5', this.appId])
    }
  }

}
