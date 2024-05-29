import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { AddInsuranceModalComponent } from '../add-insurance-modal/add-insurance-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { practiceLocations, maritalStatus, relationWithPatient, carrierNameList } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { states_data } from 'src/app/state';
interface State {
  state: string;
  state_code: string;
}

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  model: NgbDateStruct;
  payViaSelected: any

  dob: any
  maxDate: any
  selectedValue: any;
  isReadonly = true
  step2Form: FormGroup;
  step2FormData: any
  step1FormData: any
  patientInfo: any
  practiceLocations = practiceLocations
  maritalStatus = maritalStatus
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  carrierNameList = carrierNameList
  insuranceList: any
  states: State[] = states_data

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.step2FormData = localStorage.getItem("step2FormData")
    if (this.step2FormData == null) {
      let step1: any
      step1 = localStorage.getItem("step1FormData")
      this.step1FormData = JSON.parse(step1)
      this.payViaSelected = 'Insurance'
    } else {
      this.step2FormData = JSON.parse(this.step2FormData)
      console.log(" this.step2FormData :", this.step2FormData)
      this.payViaSelected = this.step2FormData.payVia
    }
    this.loadForm()
    this.getInsuranceList()
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")
  }

  loadForm() {
    this.step2Form = this.fb.group({
      payVia: [this.payViaSelected],
      relationWithPatient: [this.step2FormData ? this.step2FormData.relationWithPatient : this.step1FormData.relationWithPatient],
      firstName: [this.step2FormData ? this.step2FormData.firstName : this.step1FormData.firstName, [Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      middleName: [this.step2FormData ? this.step2FormData.middleName : this.step1FormData.middleName],
      lastName: [this.step2FormData ? this.step2FormData.lastName : this.step1FormData.lastName, [Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      dob: [this.step2FormData ? this.step2FormData.dob : this.step1FormData.dob, [Validators.required]],
      martialStatus: [this.step2FormData ? this.step2FormData.martialStatus : this.step1FormData.martialStatus],
      gender: [this.step2FormData ? this.step2FormData.gender : this.step1FormData.gender],
      email: [this.step2FormData ? this.step2FormData.email : this.step1FormData.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      phoneNumber: [this.step2FormData ? this.step2FormData.phoneNumber : this.step1FormData.phoneNumber, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cellPhoneNumber: [this.step2FormData ? this.step2FormData.cellPhoneNumber : this.step1FormData.cellPhoneNumber],
      workExtensionNumber: [this.step2FormData ? this.step2FormData.workExtensionNumber : this.step1FormData.workExtensionNumber],



      subscriberFirstName: [this.step2FormData ? this.step2FormData.subscriberFirstName : ''],
      subscriberMiddleName: [this.step2FormData ? this.step2FormData.subscriberMiddleName : ''],
      subscriberLastName: [this.step2FormData ? this.step2FormData.subscriberLastName : ''],
      subscriberDob: [this.step2FormData ? this.step2FormData.subscriberDob : ''],
      subscriberRelationWithPatient: [this.step2FormData ? this.step2FormData.subscriberRelationWithPatient : ''],
      primaryInsuranceCompany: [this.step2FormData ? this.step2FormData.primaryInsuranceCompany : ''],
      primaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.primaryInsuranceIdPolicy : ''],
      primaryInsuranceGroup: [this.step2FormData ? this.step2FormData.primaryInsuranceGroup : ''],
      primaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.primaryInsuranceCustomerServicePh : ''],
      secondaryInsuranceCompany: [this.step2FormData ? this.step2FormData.secondaryInsuranceCompany : ''],
      secondaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.secondaryInsuranceIdPolicy : ''],
      secondaryInsuranceGroup: [this.step2FormData ? this.step2FormData.secondaryInsuranceGroup : ''],
      secondaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.secondaryInsuranceCustomerServicePh : ''],
      injuryRelelatedTo: [this.step2FormData ? this.step2FormData.injuryRelelatedTo : ''],
      carrierName: [this.step2FormData ? this.step2FormData.carrierName : ''],
      dateOfInjury: [this.step2FormData ? this.step2FormData.dateOfInjury : ''],
      state: [this.step2FormData ? this.step2FormData.state : ''],
      claim: [this.step2FormData ? this.step2FormData.claim : ''],
      adjusterName: [this.step2FormData ? this.step2FormData.adjusterName : ''],
      adjusterPhone: [this.step2FormData ? this.step2FormData.adjusterPhone : ''],
      reportedEmployer: [this.step2FormData ? this.step2FormData.reportedEmployer : ''],
      employerName: [this.step2FormData ? this.step2FormData.employerName : ''],
      employerPhone: [this.step2FormData ? this.step2FormData.employerPhone : ''],
      employerAddress: [this.step2FormData ? this.step2FormData.employerAddress : ''],
      attorneyName: [this.step2FormData ? this.step2FormData.attorneyName : ''],
      attorneyPhone: [this.step2FormData ? this.step2FormData.attorneyPhone : ''],
    });
  }
  async getInsuranceList() {
    let reqVars = {
      query: { status: 'Active' },
      fields: { updatedAt: 0 },
      order: { insuranceName: 1 },
    }
    await this.authService.apiRequest('post', 'insurance/getInsuranceList', reqVars).subscribe(async response => {

      this.insuranceList = response.data.insuranceList
      console.log(this.insuranceList)
    })
  }

  onChange(event: MatRadioChange) {
    this.payViaSelected = event.value
  }

  bookAppointmentStep2() {
    console.log("step2FormData:", this.step2Form.value)
    localStorage.setItem("step2FormData", JSON.stringify(this.step2Form.value));
    this.router.navigate(['/patient/book-appointment/step-3'])
  }

  checkSpace(colName: any, event: any) {
    this.step2Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  cmsModal() {
    const dialogRef = this.dialog.open(CmsModalComponent, {
      panelClass: 'cms--container',
    });
  }

  addInsurance() {
    const dialogRef = this.dialog.open(AddInsuranceModalComponent, {
      panelClass: 'custom-alert-container',
    });
  }
}
