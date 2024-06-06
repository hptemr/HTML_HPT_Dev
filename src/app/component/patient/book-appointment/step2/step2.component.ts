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
  fullNameForSign: any

  allowedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'doc', 'docx']
  fileError: any = ''
  uploadedInsuranceFiles: any = []
  uploadedInsuranceFilesTotal = 0
  todayDate = new Date()

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.step2FormData = localStorage.getItem("step2FormData")
    this.uploadedInsuranceFiles = localStorage.getItem("uploadedInsuranceFiles")
    this.uploadedInsuranceFiles = JSON.parse(this.uploadedInsuranceFiles)
    if (this.uploadedInsuranceFiles) {
      this.uploadedInsuranceFilesTotal = this.uploadedInsuranceFiles.length
    }

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
    console.log(" this.step2FormData :", this.step2FormData)

    this.loadForm()
    this.getInsuranceList()
    this.fullNameForSign = this.step2Form.controls['firstName'].value + " " + this.step2Form.controls['lastName'].value
  }

  loadForm() {
    this.step2Form = this.fb.group({
      payVia: [this.payViaSelected],
      relationWithPatient: [this.step2FormData ? this.step2FormData.relationWithPatient : this.step1FormData.relationWithPatient],
      firstName: [this.step2FormData ? this.step2FormData.firstName : this.step1FormData.firstName, [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      middleName: [this.step2FormData ? this.step2FormData.middleName : this.step1FormData.middleName],
      lastName: [this.step2FormData ? this.step2FormData.lastName : this.step1FormData.lastName, [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      dob: [this.step2FormData ? this.step2FormData.dob : this.step1FormData.dob],
      martialStatus: [this.step2FormData ? this.step2FormData.martialStatus : this.step1FormData.martialStatus],
      gender: [this.step2FormData ? this.step2FormData.gender : this.step1FormData.gender],
      email: [this.step2FormData ? this.step2FormData.email : this.step1FormData.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      phoneNumber: [this.step2FormData ? this.step2FormData.phoneNumber : this.step1FormData.phoneNumber, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cellPhoneNumber: [this.step2FormData ? this.step2FormData.cellPhoneNumber : this.step1FormData.cellPhoneNumber],
      workExtensionNumber: [this.step2FormData ? this.step2FormData.workExtensionNumber : this.step1FormData.workExtensionNumber],

      insuranceName: [this.step2FormData ? this.step2FormData.insuranceName : ''],
      subscriberFirstName: [this.step2FormData ? this.step2FormData.subscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [this.step2FormData ? this.step2FormData.subscriberMiddleName : ''],
      subscriberLastName: [this.step2FormData ? this.step2FormData.subscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: [this.step2FormData ? this.step2FormData.subscriberDob : ''],
      subscriberRelationWithPatient: [this.step2FormData && this.step2FormData.subscriberRelationWithPatient ? this.step2FormData.subscriberRelationWithPatient : '', [Validators.required]],
      primaryInsuranceCompany: [this.step2FormData ? this.step2FormData.primaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.primaryInsuranceIdPolicy : '', [Validators.required]],
      primaryInsuranceGroup: [this.step2FormData ? this.step2FormData.primaryInsuranceGroup : '', [Validators.required]],
      primaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.primaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceCompany: [this.step2FormData ? this.step2FormData.secondaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.secondaryInsuranceIdPolicy : '', [Validators.required]],
      secondaryInsuranceGroup: [this.step2FormData ? this.step2FormData.secondaryInsuranceGroup : '', [Validators.required]],
      secondaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.secondaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      injuryRelelatedTo: [this.step2FormData ? this.step2FormData.injuryRelelatedTo : ''],
      carrierName: [this.step2FormData && this.step2FormData.carrierName ? this.step2FormData.carrierName : '', [Validators.required]],
      dateOfInjury: [this.step2FormData ? this.step2FormData.dateOfInjury : '', [Validators.required]],
      insuranceState: [this.step2FormData && this.step2FormData.insuranceState ? this.step2FormData.insuranceState : '', [Validators.required]],
      claim: [this.step2FormData ? this.step2FormData.claim : '', [Validators.required]],
      adjusterName: [this.step2FormData ? this.step2FormData.adjusterName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      adjusterPhone: [this.step2FormData ? this.step2FormData.adjusterPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      reportedEmployer: [this.step2FormData ? this.step2FormData.reportedEmployer : ''],
      employerName: [this.step2FormData ? this.step2FormData.employerName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      employerPhone: [this.step2FormData ? this.step2FormData.employerPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      employerAddress: [this.step2FormData ? this.step2FormData.employerAddress : '', [Validators.required]],
      attorneyName: [this.step2FormData ? this.step2FormData.attorneyName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      attorneyPhone: [this.step2FormData ? this.step2FormData.attorneyPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    });
  }

  getInsuranceDetails(event: any) {
    let currentIndex = event.target.value
    let insuranceName = ''
    let subscriberFirstName = ''
    let subscriberMiddleName = ''
    let subscriberLastName = ''
    let subscriberDob
    let subscriberRelationWithPatient = ''
    let primaryInsuranceCompany = ''
    let primaryInsuranceIdPolicy = ''
    let primaryInsuranceGroup = ''
    let primaryInsuranceCustomerServicePh = ''
    let secondaryInsuranceCompany = ''
    let secondaryInsuranceIdPolicy = ''
    let secondaryInsuranceGroup = ''
    let secondaryInsuranceCustomerServicePh = ''
    let injuryRelelatedTo = ''
    let carrierName = ''
    let dateOfInjury
    let insuranceState = ''
    let claim = ''
    let adjusterName = ''
    let adjusterPhone = ''
    let reportedEmployer = ''
    let employerName = ''
    let employerPhone = ''
    let employerAddress = ''
    let attorneyName = ''
    let attorneyPhone = ''

    if (currentIndex != '') {
      let info = this.insuranceList.filter((item: any) => item.insuranceName === currentIndex)[0]
      insuranceName = info.insuranceName
      subscriberFirstName = info.subscriberFirstName
      subscriberMiddleName = info.subscriberMiddleName
      subscriberLastName = info.subscriberLastName
      subscriberDob = info.subscriberDob
      subscriberRelationWithPatient = info.subscriberRelationWithPatient
      primaryInsuranceCompany = info.primaryInsuranceCompany
      primaryInsuranceIdPolicy = info.primaryInsuranceIdPolicy
      primaryInsuranceGroup = info.primaryInsuranceGroup
      primaryInsuranceCustomerServicePh = info.primaryInsuranceCustomerServicePh
      secondaryInsuranceCompany = info.secondaryInsuranceCompany
      secondaryInsuranceIdPolicy = info.secondaryInsuranceIdPolicy
      secondaryInsuranceGroup = info.secondaryInsuranceGroup
      secondaryInsuranceCustomerServicePh = info.secondaryInsuranceCustomerServicePh
      injuryRelelatedTo = info.injuryRelelatedTo
      carrierName = info.carrierName
      dateOfInjury = info.dateOfInjury
      insuranceState = info.insuranceState
      claim = info.claim
      adjusterName = info.adjusterName
      adjusterPhone = info.adjusterPhone
      reportedEmployer = info.reportedEmployer
      employerName = info.employerName
      employerPhone = info.employerPhone
      employerAddress = info.employerAddress
      attorneyName = info.attorneyName
      attorneyPhone = info.attorneyPhone
    }
    this.step2Form.controls['insuranceName'].setValue(insuranceName)
    this.step2Form.controls['subscriberFirstName'].setValue(subscriberFirstName)
    this.step2Form.controls['subscriberMiddleName'].setValue(subscriberMiddleName)
    this.step2Form.controls['subscriberLastName'].setValue(subscriberLastName)
    this.step2Form.controls['subscriberDob'].setValue(subscriberDob)
    this.step2Form.controls['subscriberRelationWithPatient'].setValue(subscriberRelationWithPatient)
    this.step2Form.controls['primaryInsuranceCompany'].setValue(primaryInsuranceCompany)
    this.step2Form.controls['primaryInsuranceIdPolicy'].setValue(primaryInsuranceIdPolicy)
    this.step2Form.controls['primaryInsuranceGroup'].setValue(primaryInsuranceGroup)
    this.step2Form.controls['primaryInsuranceCustomerServicePh'].setValue(primaryInsuranceCustomerServicePh)
    this.step2Form.controls['secondaryInsuranceCompany'].setValue(secondaryInsuranceCompany)
    this.step2Form.controls['secondaryInsuranceIdPolicy'].setValue(secondaryInsuranceIdPolicy)
    this.step2Form.controls['secondaryInsuranceGroup'].setValue(secondaryInsuranceGroup)
    this.step2Form.controls['secondaryInsuranceCustomerServicePh'].setValue(secondaryInsuranceCustomerServicePh)
    this.step2Form.controls['injuryRelelatedTo'].setValue(injuryRelelatedTo)
    this.step2Form.controls['carrierName'].setValue(carrierName)
    this.step2Form.controls['dateOfInjury'].setValue(dateOfInjury)
    this.step2Form.controls['insuranceState'].setValue(insuranceState)
    this.step2Form.controls['claim'].setValue(claim)
    this.step2Form.controls['adjusterName'].setValue(adjusterName)
    this.step2Form.controls['adjusterPhone'].setValue(adjusterPhone)
    this.step2Form.controls['reportedEmployer'].setValue(reportedEmployer)
    this.step2Form.controls['employerName'].setValue(employerName)
    this.step2Form.controls['employerPhone'].setValue(employerPhone)
    this.step2Form.controls['employerAddress'].setValue(employerAddress)
    this.step2Form.controls['attorneyName'].setValue(attorneyName)
    this.step2Form.controls['attorneyPhone'].setValue(attorneyPhone)
  }

  async getInsuranceList() {
    let reqVars = {
      query: { status: 'Active' },
      fields: { updatedAt: 0 },
      order: { insuranceName: 1 },
    }
    await this.authService.apiRequest('post', 'insurance/getInsuranceList', reqVars).subscribe(async response => {
      this.insuranceList = response.data.insuranceList
    })
  }

  onChange(event: MatRadioChange) {
    this.payViaSelected = event.value
  }

  checkSpace(colName: any, event: any) {
    this.step2Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  cmsModal() {
    const dialogRef = this.dialog.open(CmsModalComponent, {
      panelClass: 'cms--container',
    });
  }

  getInsuranceFiles() {
    let filesName: any = []
    if (localStorage.getItem("uploadedInsuranceFiles")) {
      let files: any
      files = localStorage.getItem("uploadedInsuranceFiles")
      filesName = JSON.parse(files).map((item: any) => item.name);
    }
    return filesName
  }

  bookAppointmentStep2() {
    let formData = this.step2Form.value
    Object.assign(formData, {
      patientId: this.authService.getLoggedInInfo('_id'),
    })
    let insuranceFiles = this.getInsuranceFiles()
    if (insuranceFiles.length > 0) {
      Object.assign(formData, { insuranceFiles: insuranceFiles })
    }
    localStorage.setItem("step2FormData", JSON.stringify(formData));
    console.log("step2FormData:", formData)
    this.router.navigate(['/patient/book-appointment/step-3'])
  }

  addInsurance() {
    const dialogRef = this.dialog.open(AddInsuranceModalComponent, {
      panelClass: 'custom-alert-container',
    })
    dialogRef.afterClosed().subscribe(async insuranceName => {
      if (insuranceName != '') {
        let formData = this.step2Form.value
        Object.assign(formData, {
          insuranceName: insuranceName,
          patientId: this.authService.getLoggedInInfo('_id')
        })
        let insuranceFiles = this.getInsuranceFiles()
        if (insuranceFiles.length > 0) {
          Object.assign(formData, { insuranceFiles: insuranceFiles })
        }
        console.log("formData:", formData)
        await this.authService.apiRequest('post', 'insurance/addInsurance', formData).subscribe(async response => {
          console.log("addInsurance response:", response)
          localStorage.setItem("step2FormData", JSON.stringify(formData));
          this.router.navigate(['/patient/book-appointment/step-3'])
        })
      }
    })
  }

  getExtension(fileName: any) {
    if (fileName && fileName != undefined) {
      return fileName.split(/[#?]/)[0].split('.').pop().trim();
    }
  }

  deleteInsurance(index: any) {
    this.uploadedInsuranceFiles.splice(index, 1);
    localStorage.setItem("uploadedInsuranceFiles", JSON.stringify(this.uploadedInsuranceFiles))
    this.uploadedInsuranceFilesTotal = this.uploadedInsuranceFiles.length
  }

  uploadInsurance($event: any) {
    let file: File = $event.target.files[0]
    let fileType = this.getExtension(file.name)
    let datenow = Date.now()
    if (!this.allowedFileTypes.includes(fileType)) {
      this.fileError = "File type should be pdf, image, doc only"
    } else if (file.size / (1024 * 1024) >= 5) {
      this.fileError = 'File max size should be less than 5MB'
    } else {
      let icon = ''
      this.fileError = ""
      if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) {
        icon = 'image'
      } else if (['doc', 'docx'].includes(fileType)) {
        icon = 'description'
      } else {
        icon = 'picture_as_pdf'
      }

      let myReader: FileReader = new FileReader()
      myReader.readAsDataURL(file)
      let that = this
      myReader.onloadend = function (loadEvent: any) {
        that.uploadedInsuranceFiles = that.uploadedInsuranceFiles || [];
        that.uploadedInsuranceFiles.push({
          //size: file.size,
          name: datenow + "." + fileType,
          data: loadEvent.target.result,
          icon: icon
        })
        that.uploadedInsuranceFilesTotal = that.uploadedInsuranceFiles.length
        localStorage.setItem("uploadedInsuranceFiles", JSON.stringify(that.uploadedInsuranceFiles))
      }
    }
  }

}
