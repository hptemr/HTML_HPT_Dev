import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddInsuranceModalComponent } from 'src/app/component/patient/book-appointment/add-insurance-modal/add-insurance-modal.component';
import { carrierNameList, maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { states_data } from 'src/app/state';
import { validationMessages } from 'src/app/utils/validation-messages';
interface State {
  state: string;
  state_code: string;
}

@Component({
  selector: 'app-intake-step2',
  templateUrl: './intake-step2.component.html',
  styleUrl: './intake-step2.component.scss'
})
export class IntakeStep2Component {

  @ViewChild('insuranceFileInput') insuranceFileInput: any

  appId: any
  payViaSelected: any

  maxDate: any
  isReadonly = true
  step2Form: FormGroup;
  step1FormData: any
  step2FormData: any
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
  isFormEditable = false

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
    this.getInsuranceList()
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
        this.step2FormData = response.data.appointmentData
        this.payViaSelected = this.step2FormData.payVia
        this.loadForm()

        if (this.authService.getLoggedInInfo('role') == 'patient' && this.step2FormData.status == 'Pending') {
          //patient can update the info
          this.isFormEditable = true
        } else {
          this.isFormEditable = false
          this.step2Form.disable()
        }
        this.commonService.hideLoader()
        if (this.step2FormData.payViaInsuranceInfo.insuranceFiles && this.step2FormData.payViaInsuranceInfo.insuranceFiles.length > 0) {
          let filesArr: any = []
          let insuranceFiles = this.step2FormData.payViaInsuranceInfo.insuranceFiles
          insuranceFiles.forEach((element: any) => {
            filesArr.push({
              name: element,
              data: '',
              icon: this.getIcon(this.getExtension(element))
            })
          });
          this.uploadedInsuranceFiles = filesArr
          localStorage.setItem("uploadedInsuranceFiles", JSON.stringify(this.uploadedInsuranceFiles))
          this.uploadedInsuranceFilesTotal = insuranceFiles.length
        }
        this.fullNameForSign = this.step2Form.controls['firstName'].value + " " + this.step2Form.controls['lastName'].value
      }
    })
  }


  loadForm() {
    this.step2Form = this.fb.group({
      payVia: [this.payViaSelected],
      relationWithPatient: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.relationWithPatient : ''],
      firstName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.firstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      middleName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.middleName : ''],
      lastName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.lastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      dob: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.dob : ''],
      maritalStatus: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.maritalStatus : ''],
      gender: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.gender : ''],
      email: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.email : '', [Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      phoneNumber: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.phoneNumber : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cellPhoneNumber: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.cellPhoneNumber : ''],
      workExtensionNumber: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.workExtensionNumber : ''],

      insuranceName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.insuranceName : ''],
      subscriberFirstName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.subscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.subscriberMiddleName : ''],
      subscriberLastName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.subscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.subscriberDob : ''],
      subscriberRelationWithPatient: [this.step2FormData && this.step2FormData.payViaInsuranceInfo.subscriberRelationWithPatient ? this.step2FormData.payViaInsuranceInfo.subscriberRelationWithPatient : '', [Validators.required]],
      primaryInsuranceCompany: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.primaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.primaryInsuranceIdPolicy : '', [Validators.required]],
      primaryInsuranceGroup: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.primaryInsuranceGroup : '', [Validators.required]],
      primaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.primaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceCompany: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.secondaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondaryInsuranceIdPolicy: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.secondaryInsuranceIdPolicy : '', [Validators.required]],
      secondaryInsuranceGroup: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.secondaryInsuranceGroup : '', [Validators.required]],
      secondaryInsuranceCustomerServicePh: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.secondaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      injuryRelelatedTo: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.injuryRelelatedTo : ''],
      carrierName: [this.step2FormData && this.step2FormData.payViaInsuranceInfo.carrierName ? this.step2FormData.payViaInsuranceInfo.carrierName : '', [Validators.required]],
      dateOfInjury: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.dateOfInjury : '', [Validators.required]],
      insuranceState: [this.step2FormData && this.step2FormData.payViaInsuranceInfo.insuranceState ? this.step2FormData.payViaInsuranceInfo.insuranceState : '', [Validators.required]],
      claim: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.claim : '', [Validators.required]],
      adjusterName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.adjusterName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      adjusterPhone: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.adjusterPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      reportedEmployer: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.reportedEmployer : ''],
      employerName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.employerName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      employerPhone: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.employerPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      employerAddress: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.employerAddress : '', [Validators.required]],
      attorneyName: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.attorneyName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      attorneyPhone: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.attorneyPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      attorneyAddress: [this.step2FormData ? this.step2FormData.payViaInsuranceInfo.attorneyAddress : '', [Validators.required]],
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
    let attorneyAddress = ''

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
      attorneyAddress = info.attorneyAddress
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
    this.step2Form.controls['attorneyAddress'].setValue(attorneyAddress)
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

  async bookAppointmentStep2() {
    if (this.isFormEditable) {
      let formData = this.step2Form.value
      let uploadedInsuranceFiles: any = localStorage.getItem('uploadedInsuranceFiles')
      let insuranceFiles = this.getInsuranceFiles()
      if (insuranceFiles.length > 0) {
        Object.assign(formData, { insuranceFiles: insuranceFiles })
      }
      let params = {
        query: { _id: this.appId },
        updateInfo: {
          payViaInsuranceInfo: formData
        },
        uploadedInsuranceFiles: JSON.parse(uploadedInsuranceFiles),
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
        localStorage.removeItem('uploadedInsuranceFiles')
        this.router.navigate(['/patient/intake-form/step-3', this.appId])
      })
    } else {
      localStorage.removeItem('uploadedInsuranceFiles')
      this.router.navigate(['/patient/intake-form/step-3', this.appId])
    }
  }

  addInsurance() {
    const dialogRef = this.dialog.open(AddInsuranceModalComponent, {
      panelClass: 'custom-alert-container',
    })
    dialogRef.afterClosed().subscribe(async insuranceName => {
      if (insuranceName != '') {
        this.commonService.showLoader()
        let formData = this.step2Form.value
        Object.assign(formData, {
          insuranceName: insuranceName,
        })
        let uploadedInsuranceFiles: any = localStorage.getItem('uploadedInsuranceFiles')
        let insuranceFiles = this.getInsuranceFiles()
        if (insuranceFiles.length > 0) {
          Object.assign(formData, { insuranceFiles: insuranceFiles })
        }
        await this.authService.apiRequest('post', 'insurance/addInsurance', formData).subscribe(async response => {
          let params = {
            query: { _id: this.appId },
            updateInfo: formData,
            uploadedInsuranceFiles: JSON.parse(uploadedInsuranceFiles),
          }
          await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
            this.commonService.hideLoader()
            localStorage.removeItem('uploadedInsuranceFiles')
            this.router.navigate(['/patient/intake-form/step-3', this.appId])
          })
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
    this.insuranceFileInput.nativeElement.value = '';
    this.uploadedInsuranceFiles.splice(index, 1);
    localStorage.setItem("uploadedInsuranceFiles", JSON.stringify(this.uploadedInsuranceFiles))
    this.uploadedInsuranceFilesTotal = this.uploadedInsuranceFiles.length
  }

  getIcon(fileType: any) {
    let icon = ''
    if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) {
      icon = 'image'
    } else if (['doc', 'docx'].includes(fileType)) {
      icon = 'description'
    } else {
      icon = 'picture_as_pdf'
    }
    return icon
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
      this.fileError = ""
      let myReader: FileReader = new FileReader()
      myReader.readAsDataURL(file)
      let that = this
      myReader.onloadend = function (loadEvent: any) {
        that.uploadedInsuranceFiles = that.uploadedInsuranceFiles || [];
        that.uploadedInsuranceFiles.push({
          //size: file.size,
          name: datenow + "." + fileType,
          data: loadEvent.target.result,
          icon: that.getIcon(fileType)
        })
        that.uploadedInsuranceFilesTotal = that.uploadedInsuranceFiles.length
        localStorage.setItem("uploadedInsuranceFiles", JSON.stringify(that.uploadedInsuranceFiles))
      }
    }
  }


}
