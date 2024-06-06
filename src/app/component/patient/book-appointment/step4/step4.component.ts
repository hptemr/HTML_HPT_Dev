import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { relationWithPatient } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component {
  step4Form: FormGroup
  step4FormData: any
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  emergencyContactList: any
  todayDate = new Date() 
  
  constructor(public dialog: MatDialog, private router: Router,
    private commonService: CommonService,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.getEmergencyContactList()
    let step4: any
    step4 = localStorage.getItem("step4FormData")
    this.step4FormData = JSON.parse(step4)
    console.log(" this.step4FormData :", this.step4FormData)
    this.loadForm()
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

  bookAppointmentStep4() {
    console.log("step4Form:", this.step4Form.value)
    localStorage.setItem("step4FormData", JSON.stringify(this.step4Form.value));
    this.router.navigate(['/patient/book-appointment/step-5'])
  }
}
