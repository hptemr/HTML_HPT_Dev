import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddInsuranceModalComponent } from 'src/app/component/patient/book-appointment/add-insurance-modal/add-insurance-modal.component';
import { carrierNameList, maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
//import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
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
  @ViewChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  appId: any
  payViaSelected: any = 'Selfpay'
  injurySelected: any
  workerCompensation:boolean=false
  maxDate: any
  step2Form: FormGroup;
  step1FormData: any
  step2FormData: any
  practiceLocations = practiceLocations
  maritalStatus = maritalStatus
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  carrierNameList = carrierNameList
  insuranceList: any =[]
  states: State[] = states_data
  fullNameForSign: string = '';
  selectedValue: number

  allowedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'doc', 'docx']
  fileError: any = ''
  uploadedInsuranceFiles: any = []
  uploadedInsuranceFilesTotal = 0
  todayDate = new Date()
  isReadonly = true
  thirdInsurancesFlag:boolean=false
  attorneyFlag:boolean=false
  isMinorFlag:boolean=false
  activeUserRoute = this.commonService.getLoggedInRoute()
  mat_icon:string='add_circle'
  userId = this.authService.getLoggedInInfo('_id')
  userRole = this.authService.getLoggedInInfo('role')
  patientId:string=''
  otherRelationFlag:boolean=false
  subscriberOtherRelationFlag:boolean=false
  secondarySubscriberOtherRelationFlag:boolean=false
  thirdSubscriberOtherRelationFlag:boolean=false
  payViaSelectedFlag:boolean=false
  employerSelected:string=''
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  ngOnInit() {
    this.getAppointmentDetails()
  }

  openCMSmodal(event:any) {  
      if (event.checked === true) {
        const dialogRef = this.dialog.open(CmsModalComponent,{
          panelClass: 'cms--container', 
        });
      } else{
        console.log('else')
      }
  }

  async getAppointmentDetails() {
    const req_vars = {
      query: { _id: this.appId },
      fields: { checkIn: 0 },
      patientFields: { _id: 1 },
      therapistFields: { _id: 1 }
    }
    this.commonService.showLoader()
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate([this.activeUserRoute, 'appointments'])
      } else {
        this.step2FormData = response.data.appointmentData
       
        if(this.step2FormData && this.step2FormData.patientId && this.step2FormData.patientId._id){
          this.patientId = this.step2FormData.patientId._id
        }
        this.getInsuranceList();
        if(this.step2FormData && this.step2FormData.payViaInsuranceInfo){
          this.payViaSelected = this.step2FormData.payViaInsuranceInfo.payVia;
        }
    
        if(this.step2FormData && this.step2FormData.adminPayViaInsuranceInfo && this.userRole!='patient'){
          this.payViaSelected = this.step2FormData.adminPayViaInsuranceInfo.payVia;
        }        
        this.loadForm()

        if (this.userRole == 'patient' && !this.step2FormData.intakeFormSubmit) {
          this.isReadonly = false
        }else if (this.userRole == 'support_team' && this.step2FormData.intakeFormSubmit) {
          this.isReadonly = false
        } else {
          this.isReadonly = true
          this.step2Form.disable()
        }

        this.commonService.hideLoader()
        if (this.step2FormData.payViaInsuranceInfo && this.step2FormData.payViaInsuranceInfo?.insuranceFiles && this.step2FormData.payViaInsuranceInfo?.insuranceFiles.length > 0) {
          let filesArr: any = []
          let insuranceFiles = this.step2FormData.payViaInsuranceInfo?.insuranceFiles
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
        if(this.step2Form.controls['firstName'].value && this.step2Form.controls['lastName'].value){
          this.fullNameForSign = this.step2Form.controls['firstName'].value + " " + this.step2Form.controls['lastName'].value;
        }      

        console.log('>>>>>>>>>isReadonly>>>>',this.isReadonly)
      }
    })
  }

  loadForm() {
    let payViaInsuranceInfo = [];
    if(this.step2FormData && this.step2FormData.payViaInsuranceInfo){
      payViaInsuranceInfo = this.step2FormData.payViaInsuranceInfo
    }

    if(this.step2FormData && this.step2FormData.adminPayViaInsuranceInfo && this.userRole!='patient'){
      payViaInsuranceInfo = this.step2FormData.adminPayViaInsuranceInfo;
    }

    if(payViaInsuranceInfo.payVia){
      this.payViaSelected = payViaInsuranceInfo.payVia
    }
  
    this.step2Form = this.fb.group({
      payVia: [this.payViaSelected],
      relationWithPatient: [payViaInsuranceInfo ? payViaInsuranceInfo?.relationWithPatient : ''],
      otherRelation: [payViaInsuranceInfo ? payViaInsuranceInfo?.otherRelation : ''],
      firstName: [payViaInsuranceInfo ? payViaInsuranceInfo?.firstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      middleName: [payViaInsuranceInfo ? payViaInsuranceInfo?.middleName : ''],
      lastName: [payViaInsuranceInfo ? payViaInsuranceInfo?.lastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      dob: [payViaInsuranceInfo ? payViaInsuranceInfo?.dob : ''],
      maritalStatus: [payViaInsuranceInfo ? payViaInsuranceInfo?.maritalStatus : ''],
      gender: [payViaInsuranceInfo ? payViaInsuranceInfo?.gender : ''],
      email: [payViaInsuranceInfo ? payViaInsuranceInfo?.email : '', [Validators.required, Validators.email, Validators.minLength(5), Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      phoneNumber: [payViaInsuranceInfo ? payViaInsuranceInfo?.phoneNumber : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cellPhoneNumber: [payViaInsuranceInfo ? payViaInsuranceInfo?.cellPhoneNumber : ''],
      workExtensionNumber: [payViaInsuranceInfo ? payViaInsuranceInfo?.workExtensionNumber : ''],

      insuranceName: [payViaInsuranceInfo ? payViaInsuranceInfo?.insuranceName : ''],

      subscriberFirstName: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberMiddleName : ''],
      subscriberLastName: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberDob : ''],
      subscriberRelationWithPatient: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberRelationWithPatient : '', [Validators.required]],
      subscriberOtherRelation: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberOtherRelation : [Validators.required]],
      subscriberGender: [payViaInsuranceInfo ? payViaInsuranceInfo?.subscriberGender : [Validators.required]],
      primaryInsuranceCompany: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceIdPolicy : '', [Validators.required]],
      primaryInsuranceGroup: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceGroup : '', [Validators.required]],
      primaryInsuranceCustomerServicePh: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      primaryInsuranceFromDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceFromDate : ''],
      primaryInsuranceToDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceToDate : ''],
    
      secondarySubscriberFirstName: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondarySubscriberMiddleName: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberMiddleName : ''],
      secondarySubscriberLastName: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondarySubscriberDob: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberDob : ''],
      secondarySubscriberRelationWithPatient: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberRelationWithPatient : '', [Validators.required]],
      secondarySubscriberOtherRelation: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberOtherRelation : [Validators.required]],
      secondarySubscriberGender: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondarySubscriberGender : '', [Validators.required]],
      secondaryInsuranceCompany: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondaryInsuranceIdPolicy: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondaryInsuranceIdPolicy : '', [Validators.required]],
      secondaryInsuranceGroup: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondaryInsuranceGroup : '', [Validators.required]],
      secondaryInsuranceCustomerServicePh: [payViaInsuranceInfo ? payViaInsuranceInfo?.secondaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceFromDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceFromDate : ''],
      secondaryInsuranceToDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.primaryInsuranceToDate : ''],
      
      thirdSubscriberFirstName: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.minLength(1), Validators.maxLength(35)]],
      thirdSubscriberMiddleName: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberMiddleName : ''],
      thirdSubscriberLastName: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.minLength(1), Validators.maxLength(35)]],
      thirdSubscriberDob: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberDob : ''],
      thirdSubscriberRelationWithPatient: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberRelationWithPatient : '', []],
      thirdSubscriberOtherRelation: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberOtherRelation : []],
      thirdSubscriberGender: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdSubscriberGender : '', []],

      thirdInsuranceCompany: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceCompany : '', [Validators.minLength(1), Validators.maxLength(35)]],
      thirdInsuranceIdPolicy: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceIdPolicy : '', []],
      thirdInsuranceGroup: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceGroup : '', []],
      thirdInsuranceCustomerServicePh: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceCustomerServicePh : '', [Validators.minLength(14), Validators.maxLength(14)]],
      thirdInsuranceFromDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceFromDate : ''],
      thirdInsuranceToDate: [payViaInsuranceInfo ? payViaInsuranceInfo?.thirdInsuranceToDate : ''],

      injuryRelelatedTo: [payViaInsuranceInfo ? payViaInsuranceInfo?.injuryRelelatedTo : ''],      
      otherPersonalInjury: [payViaInsuranceInfo ? payViaInsuranceInfo?.otherPersonalInjury : ''],   
      carrierName: [this.step2FormData && this.step2FormData.payViaInsuranceInfo?.carrierName ? this.step2FormData.payViaInsuranceInfo?.carrierName : '', []],
      dateOfInjury: [payViaInsuranceInfo ? payViaInsuranceInfo?.dateOfInjury : '', []],
      insuranceState: [this.step2FormData && this.step2FormData.payViaInsuranceInfo?.insuranceState ? this.step2FormData.payViaInsuranceInfo?.insuranceState : '', []],
      claim: [payViaInsuranceInfo ? payViaInsuranceInfo?.claim : '', []],
      adjusterName: [payViaInsuranceInfo ? payViaInsuranceInfo?.adjusterName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.minLength(1), Validators.maxLength(35)]],
      adjusterPhone: [payViaInsuranceInfo ? payViaInsuranceInfo?.adjusterPhone : '', [Validators.minLength(14), Validators.maxLength(14)]],
      reportedEmployer: [payViaInsuranceInfo ? payViaInsuranceInfo?.reportedEmployer : ''],
      employerName: [payViaInsuranceInfo ? payViaInsuranceInfo?.employerName : '', [Validators.pattern("^[ A-Za-z ]*$"),Validators.minLength(1), Validators.maxLength(35)]],
      employerPhone: [payViaInsuranceInfo ? payViaInsuranceInfo?.employerPhone : '', [Validators.minLength(14), Validators.maxLength(14)]],
      employerAddress: [payViaInsuranceInfo ? payViaInsuranceInfo?.employerAddress : '', []],
      isPatientMinor: [payViaInsuranceInfo ? payViaInsuranceInfo?.isPatientMinor : '', []],
      attorney: [payViaInsuranceInfo ? payViaInsuranceInfo?.attorney : '', []],
      attorneyName: [payViaInsuranceInfo ? payViaInsuranceInfo?.attorneyName : '', [Validators.pattern("^[ A-Za-z ]*$"),Validators.maxLength(35)]],
      attorneyPhone: [payViaInsuranceInfo ? payViaInsuranceInfo?.attorneyPhone : '', [Validators.minLength(14), Validators.maxLength(14)]],
      //attorneyAddress: [payViaInsuranceInfo ? payViaInsuranceInfo?.attorneyAddress : '', [Validators.required]],
    });
    this.isMinorFlag = payViaInsuranceInfo ? payViaInsuranceInfo?.isPatientMinor=='yes' ? true : false : false    


    if(payViaInsuranceInfo?.thirdInsuranceCompany){
      //this.thirdInsurancesFlag = true;  
      this.thirdInsurance()
    }
    
    if(payViaInsuranceInfo && payViaInsuranceInfo?.relationWithPatient=='Other'){ 
      const mockEvent = { target: { value: 'Other' } }; 
      this.relationShipPatient(mockEvent)
    }

    if(payViaInsuranceInfo && payViaInsuranceInfo?.subscriberRelationWithPatient=='Other'){
      const mockEvent2 = { target: { value: 'Other' } }; 
      this.subscriberRelationShipPatient(mockEvent2)
    }

    if(payViaInsuranceInfo && payViaInsuranceInfo?.secondarySubscriberRelationWithPatient=='Other'){
      const mockEvent3 = { target: { value: 'Other' } }; 
      this.secondarySubscriberRelationShipPatient(mockEvent3)
    }

    if(payViaInsuranceInfo && payViaInsuranceInfo?.thirdSubscriberRelationWithPatient=='Other'){
      const mockEvent4 = { target: { value: 'Other' } }; 
      this.thirdSubscriberRelationShipPatient(mockEvent4)
    }
 

    if(payViaInsuranceInfo?.injuryRelelatedTo && payViaInsuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
      const mockEvent5: MatRadioChange = { value: "Worker's Compensation (WCOMP)", source: this.radioButton! }; 
      this.onInjuryChange(mockEvent5)
    }
     
    if(payViaInsuranceInfo && payViaInsuranceInfo?.thirdInsuranceCompany){
      this.thirdInsurancesFlag = true
    }

    if(this.payViaSelected=='Selfpay'){
      Object.keys(this.step2Form.controls).forEach(control => {
        this.step2Form.get(control)?.clearValidators();
        this.step2Form.get(control)?.updateValueAndValidity();
      });
    }
  }

  getInsuranceDetails(event: any) {
    let currentIndex = event.target.value
    let insuranceName = ''
    let subscriberFirstName = ''
    let subscriberMiddleName = ''
    let subscriberLastName = ''
    let subscriberDob
    let subscriberRelationWithPatient = ''
    let subscriberOtherRelation = ''
    let primaryInsuranceCompany = ''
    let primaryInsuranceIdPolicy = ''
    let primaryInsuranceGroup = ''
    let primaryInsuranceCustomerServicePh = ''

    let secondarySubscriberFirstName = ''
    let secondarySubscriberMiddleName = ''
    let secondarySubscriberLastName = ''
    let secondarySubscriberDob = ''
    let secondarySubscriberOtherRelation = ''
    let secondarySubscriberRelationWithPatient = ''
    let secondarySubscriberGender = ''
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
    let attorney = ''
    let attorneyName = ''
    let attorneyPhone = ''
    let attorneyAddress = ''

    let thirdSubscriberFirstName = ''
    let thirdSubscriberMiddleName = ''
    let thirdSubscriberLastName = ''
    let thirdSubscriberDob = ''
    let thirdSubscriberOtherRelation = ''
    let thirdSubscriberGender = ''
    let thirdSubscriberRelationWithPatient = ''

    let thirdInsuranceCompany = ''
    let thirdInsuranceIdPolicy = ''
    let thirdInsuranceGroup = ''
    let thirdInsuranceCustomerServicePh = ''
    let primaryInsuranceFromDate = ''
    let primaryInsuranceToDate = ''
    let secondaryInsuranceFromDate = ''
    let secondaryInsuranceToDate = ''
    let thirdInsuranceFromDate = ''
    let thirdInsuranceToDate = ''    
    let isPatientMinor = false
    if (currentIndex != '') {
      let info = this.insuranceList.filter((item: any) => item.insuranceName === currentIndex)[0]
      insuranceName = info.insuranceName
      subscriberFirstName = info.subscriberFirstName
      subscriberMiddleName = info.subscriberMiddleName
      subscriberLastName = info.subscriberLastName
      subscriberDob = info.subscriberDob
      subscriberRelationWithPatient = info.subscriberRelationWithPatient
      subscriberOtherRelation = info.subscriberOtherRelation      
      primaryInsuranceCompany = info.primaryInsuranceCompany
      primaryInsuranceIdPolicy = info.primaryInsuranceIdPolicy
      primaryInsuranceGroup = info.primaryInsuranceGroup
      primaryInsuranceCustomerServicePh = info.primaryInsuranceCustomerServicePh
      primaryInsuranceFromDate = info.primaryInsuranceFromDate
      primaryInsuranceToDate = info.primaryInsuranceToDate
  
      secondarySubscriberFirstName= info.secondarySubscriberFirstName
      secondarySubscriberMiddleName= info.secondarySubscriberMiddleName
      secondarySubscriberLastName= info.secondarySubscriberLastName
      secondarySubscriberDob= info.secondarySubscriberDob
      secondarySubscriberOtherRelation= info.secondarySubscriberOtherRelation
      secondarySubscriberRelationWithPatient= info.secondarySubscriberRelationWithPatient
      secondarySubscriberGender = info.secondarySubscriberGender    

      secondaryInsuranceCompany = info.secondaryInsuranceCompany
      secondaryInsuranceIdPolicy = info.secondaryInsuranceIdPolicy
      secondaryInsuranceGroup = info.secondaryInsuranceGroup
      secondaryInsuranceCustomerServicePh = info.secondaryInsuranceCustomerServicePh
      secondaryInsuranceFromDate = info.secondaryInsuranceFromDate
      secondaryInsuranceFromDate = info.secondaryInsuranceFromDate    

      thirdSubscriberFirstName = info.thirdSubscriberFirstName    
      thirdSubscriberMiddleName = info.thirdSubscriberMiddleName    
      thirdSubscriberLastName = info.thirdSubscriberLastName    
      thirdSubscriberDob = info.thirdSubscriberDob    
      thirdSubscriberOtherRelation = info.thirdSubscriberOtherRelation    
      thirdSubscriberGender = info.thirdSubscriberGender    
      thirdSubscriberRelationWithPatient = info.thirdSubscriberRelationWithPatient    
      thirdInsuranceCompany = info.thirdInsuranceCompany
      thirdInsuranceIdPolicy = info.thirdInsuranceIdPolicy
      thirdInsuranceGroup = info.thirdInsuranceGroup
      thirdInsuranceCustomerServicePh = info.thirdInsuranceCustomerServicePh
      thirdInsuranceFromDate = info.thirdInsuranceFromDate
      thirdInsuranceToDate = info.thirdInsuranceToDate

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
      isPatientMinor = info.isPatientMinor ? info.isPatientMinor=='yes' ? true : false : false
      attorney = info.attorney
      attorneyName = info.attorneyName
      attorneyPhone = info.attorneyPhone
      //attorneyAddress = info.attorneyAddress
     
    }
    
    this.step2Form.controls['insuranceName'].setValue(insuranceName)

    this.step2Form.controls['subscriberFirstName'].setValue(subscriberFirstName)
    this.step2Form.controls['subscriberMiddleName'].setValue(subscriberMiddleName)
    this.step2Form.controls['subscriberLastName'].setValue(subscriberLastName)
    this.step2Form.controls['subscriberDob'].setValue(subscriberDob)
    this.step2Form.controls['subscriberOtherRelation'].setValue(subscriberOtherRelation)
    this.step2Form.controls['subscriberRelationWithPatient'].setValue(subscriberRelationWithPatient)

    this.step2Form.controls['primaryInsuranceCompany'].setValue(primaryInsuranceCompany)
    this.step2Form.controls['primaryInsuranceIdPolicy'].setValue(primaryInsuranceIdPolicy)
    this.step2Form.controls['primaryInsuranceGroup'].setValue(primaryInsuranceGroup)
    this.step2Form.controls['primaryInsuranceCustomerServicePh'].setValue(primaryInsuranceCustomerServicePh)
    this.step2Form.controls['primaryInsuranceFromDate'].setValue(primaryInsuranceFromDate)
    this.step2Form.controls['primaryInsuranceToDate'].setValue(primaryInsuranceToDate)

    this.step2Form.controls['secondarySubscriberFirstName'].setValue(secondarySubscriberFirstName)
    this.step2Form.controls['secondarySubscriberMiddleName'].setValue(secondarySubscriberMiddleName)
    this.step2Form.controls['secondarySubscriberLastName'].setValue(secondarySubscriberLastName)
    this.step2Form.controls['secondarySubscriberDob'].setValue(secondarySubscriberDob)
    this.step2Form.controls['secondarySubscriberOtherRelation'].setValue(secondarySubscriberOtherRelation)
    this.step2Form.controls['secondarySubscriberRelationWithPatient'].setValue(secondarySubscriberRelationWithPatient)    
    this.step2Form.controls['secondarySubscriberGender'].setValue(secondarySubscriberGender)            
    this.step2Form.controls['secondaryInsuranceCompany'].setValue(secondaryInsuranceCompany)
    this.step2Form.controls['secondaryInsuranceIdPolicy'].setValue(secondaryInsuranceIdPolicy)
    this.step2Form.controls['secondaryInsuranceGroup'].setValue(secondaryInsuranceGroup)
    this.step2Form.controls['secondaryInsuranceCustomerServicePh'].setValue(secondaryInsuranceCustomerServicePh)
    this.step2Form.controls['secondaryInsuranceFromDate'].setValue(secondaryInsuranceFromDate)
    this.step2Form.controls['secondaryInsuranceToDate'].setValue(secondaryInsuranceToDate)

    this.step2Form.controls['thirdSubscriberFirstName'].setValue(thirdSubscriberFirstName)
    this.step2Form.controls['thirdSubscriberMiddleName'].setValue(thirdSubscriberMiddleName)
    this.step2Form.controls['thirdSubscriberLastName'].setValue(thirdSubscriberLastName)
    this.step2Form.controls['thirdSubscriberDob'].setValue(thirdSubscriberDob)
    this.step2Form.controls['thirdSubscriberOtherRelation'].setValue(thirdSubscriberOtherRelation)
    this.step2Form.controls['thirdSubscriberRelationWithPatient'].setValue(thirdSubscriberRelationWithPatient)     
    this.step2Form.controls['thirdSubscriberGender'].setValue(thirdSubscriberGender)   
    this.step2Form.controls['thirdInsuranceCompany'].setValue(thirdInsuranceCompany)
    this.step2Form.controls['thirdInsuranceIdPolicy'].setValue(thirdInsuranceIdPolicy)
    this.step2Form.controls['thirdInsuranceGroup'].setValue(thirdInsuranceGroup)
    this.step2Form.controls['thirdInsuranceCustomerServicePh'].setValue(thirdInsuranceCustomerServicePh)      
    this.step2Form.controls['thirdInsuranceFromDate'].setValue(thirdInsuranceFromDate)
    this.step2Form.controls['thirdInsuranceToDate'].setValue(thirdInsuranceToDate)
    
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

    this.step2Form.controls['isPatientMinor'].setValue(isPatientMinor)
    this.step2Form.controls['attorney'].setValue(attorney)
    this.step2Form.controls['attorneyName'].setValue(attorneyName)
    this.step2Form.controls['attorneyPhone'].setValue(attorneyPhone)
    //this.step2Form.controls['attorneyAddress'].setValue(attorneyAddress)
  }

  async getInsuranceList() {
    let reqVars = {
      query: { patientId:this.patientId,status: 'Active' },
      fields: { updatedAt: 0 },
      order: { insuranceName: 1 },
    }
    await this.authService.apiRequest('post', 'insurance/getInsuranceList', reqVars).subscribe(async response => {
      this.insuranceList = response.data.insuranceList
    })
  }

  onChange(event: MatRadioChange): void {
   this.payViaSelected = event.value
   this.payViaSelectedFlag = false;
    if(this.payViaSelected=='Insurance'){
      this.payViaSelectedFlag = true;
      
    }else if(this.payViaSelected=='Selfpay'){
      Object.keys(this.step2Form.controls).forEach(control => {
        this.step2Form.get(control)?.clearValidators();
        this.step2Form.get(control)?.updateValueAndValidity();
      });
    }
  }

  onEmployerChange(event: MatRadioChange) {
    this.employerSelected = event.value
    this.step2Form.controls['employerName'].setValidators([])
    this.step2Form.controls['employerPhone'].setValidators([])
    this.step2Form.controls['employerAddress'].setValidators([])
    if(this.employerSelected=='Yes'){
      this.step2Form.controls['employerName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.step2Form.controls['employerPhone'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])
      this.step2Form.controls['employerAddress'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])
    }
  }

  attorneyChange(event: MatRadioChange) {
    this.attorneyFlag = false
    if(event.value=='yes'){
      this.attorneyFlag = true
    }else{
      this.step2Form.controls['attorneyName'].setValue('')
      this.step2Form.controls['attorneyPhone'].setValue('')
      this.step2Form.get('attorneyName')?.markAsUntouched();
      this.step2Form.get('attorneyPhone')?.markAsUntouched();
    }    
  }

  changePatientMinor(event: MatRadioChange) {
    this.isMinorFlag = false
    if(event.value=='yes')
    this.isMinorFlag = true
  }

  checkSpace(colName: any, event: any) {
    this.step2Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  signatureText(event: any) {
    if(this.step2Form.controls['firstName'].value && this.step2Form.controls['lastName'].value){
      this.fullNameForSign = this.step2Form.controls['firstName'].value + " " + this.step2Form.controls['lastName'].value;
    }
  }

  thirdInsurance(){
    if(this.thirdInsurancesFlag){     
      this.step2Form.controls['thirdInsuranceCompany'].setValidators([]);
      this.step2Form.controls['thirdInsuranceIdPolicy'].setValidators([]);
      this.step2Form.controls['thirdInsuranceGroup'].setValidators([]);
      this.step2Form.controls['thirdInsuranceCustomerServicePh'].setValidators([]);
      this.mat_icon = 'add_circle'
      this.thirdInsurancesFlag = false;  
      this.step2Form.controls['thirdInsuranceCompany'].setValue('');
      this.step2Form.controls['thirdInsuranceIdPolicy'].setValue('');
      this.step2Form.controls['thirdInsuranceGroup'].setValue('');
      this.step2Form.controls['thirdInsuranceCustomerServicePh'].setValue('');
      this.step2Form.controls['thirdInsuranceFromDate'].setValue('');
      this.step2Form.controls['thirdInsuranceToDate'].setValue('');
      
      this.step2Form.controls['thirdInsuranceCompany'].reset();
      this.step2Form.controls['thirdInsuranceIdPolicy'].reset();
      this.step2Form.controls['thirdInsuranceGroup'].reset();
      this.step2Form.controls['thirdInsuranceCustomerServicePh'].reset();
      this.step2Form.controls['thirdInsuranceFromDate'].reset();
      this.step2Form.controls['thirdInsuranceToDate'].reset();

      this.step2Form.controls['thirdSubscriberFirstName'].setValidators([]);
      this.step2Form.controls['thirdSubscriberLastName'].setValidators([]);
      this.step2Form.controls['thirdSubscriberRelationWithPatient'].setValidators([]);
      this.step2Form.controls['thirdSubscriberOtherRelation'].setValidators([]);
      this.step2Form.controls['thirdSubscriberGender'].setValidators([]);

      this.step2Form.controls['thirdSubscriberFirstName'].setValue('');
      this.step2Form.controls['thirdSubscriberLastName'].setValue('');
      this.step2Form.controls['thirdSubscriberRelationWithPatient'].setValue('');
      this.step2Form.controls['thirdSubscriberOtherRelation'].setValue('');
      this.step2Form.controls['thirdSubscriberGender'].setValue('');


      this.step2Form.controls['thirdSubscriberFirstName'].reset();
      this.step2Form.controls['thirdSubscriberLastName'].reset();      
      this.step2Form.controls['thirdSubscriberRelationWithPatient'].reset();      
      this.step2Form.controls['thirdSubscriberOtherRelation'].reset();     
      this.step2Form.controls['thirdSubscriberGender'].reset();
    }else{

      this.step2Form.controls['thirdSubscriberFirstName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.step2Form.controls['thirdSubscriberMiddleName'].setValidators([])
      this.step2Form.controls['thirdSubscriberLastName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.step2Form.controls['thirdSubscriberDob'].setValidators([])
      this.step2Form.controls['thirdSubscriberRelationWithPatient'].setValidators([Validators.required])
      this.step2Form.controls['thirdSubscriberOtherRelation'].setValidators([Validators.required])
      this.step2Form.controls['thirdSubscriberGender'].setValidators([Validators.required])

      this.step2Form.controls['thirdInsuranceCompany'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]);
      this.step2Form.controls['thirdInsuranceIdPolicy'].setValidators([Validators.required])
      this.step2Form.controls['thirdInsuranceGroup'].setValidators([Validators.required])
      this.step2Form.controls['thirdInsuranceCustomerServicePh'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])
      this.mat_icon = 'remove_circle_outline'
      this.thirdInsurancesFlag = true;  
    }    
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
    //if ((this.authService.getLoggedInInfo('role') == 'patient' && this.step1FormData.status == 'Pending Intake Form') || (this.authService.getLoggedInInfo('role') == 'support_team' || this.authService.getLoggedInInfo('role') == 'billing_team')) {
      console.log(this.step2Form.invalid,' >>>>>step2Form>>>',this.step2Form)
      if (this.step2Form.invalid){
        this.step2Form.markAllAsTouched();
      }else{
        if (!this.isReadonly) {
              let appointmentUpdateInfo = this.step2FormData.appointmentUpdateInfo;
              appointmentUpdateInfo.push({
                fromPatientId : (this.userRole=='patient') ? this.userId : '',
                fromAdminId:(this.userRole!='patient') ? this.userId : '',
                userRole:this.userRole,
                updatedAt:new Date()
              });
              let formData = this.step2Form.value
              let uploadedInsuranceFiles: any = localStorage.getItem('uploadedInsuranceFiles')
              let insuranceFiles = this.getInsuranceFiles()
              if (insuranceFiles.length > 0) {
                Object.assign(formData, { insuranceFiles: insuranceFiles })
              }
              let updateInfo = {}
              if(this.userRole=='patient'){
              updateInfo = { payViaInsuranceInfo: formData}
              }else if(this.userRole!='patient'){
                updateInfo = { adminPayViaInsuranceInfo: formData }
              }

              let params = {
                query: { _id: this.appId },
                updateInfo: updateInfo,
                uploadedInsuranceFiles: JSON.parse(uploadedInsuranceFiles),
                appointmentUpdateInfo:appointmentUpdateInfo
              }
              await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
                localStorage.removeItem('uploadedInsuranceFiles')
                this.router.navigate([this.activeUserRoute, 'intake-form', 'step-3', this.appId])
              })
        } else {
          localStorage.removeItem('uploadedInsuranceFiles')
          this.router.navigate([this.activeUserRoute, 'intake-form', 'step-3', this.appId])
        }
      }
    // } else {
    //   this.router.navigate([this.activeUserRoute, 'intake-form', 'step-3', this.appId])
    // }
  }

  addInsurance() {
    const dialogRef = this.dialog.open(AddInsuranceModalComponent, {
      panelClass: 'custom-alert-container',
    })
    dialogRef.afterClosed().subscribe(async insuranceName => {
      if (insuranceName != '') {
        let appointmentUpdateInfo = this.step2FormData.appointmentUpdateInfo;
        appointmentUpdateInfo.push({
          fromPatientId : (this.userRole=='patient') ? this.userId : '',
          fromAdminId:(this.userRole!='patient') ? this.userId : '',
          userRole:this.userRole,
          updatedAt:new Date()
        });
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
            appointmentUpdateInfo:appointmentUpdateInfo
          }
          await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
            this.commonService.hideLoader()
            localStorage.removeItem('uploadedInsuranceFiles')
            this.router.navigate([this.activeUserRoute, 'intake-form', 'step-3', this.appId])
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
    if($event.target.files[0]){
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

  relationShipPatient(event: any) {
    this.otherRelationFlag = false;
    const selectedValue = event.target ? event.target.value : event; 
    if(selectedValue=='Other'){      
      this.step2Form.controls['otherRelation'].setValidators([Validators.required])
      this.otherRelationFlag = true;
    }else{
      this.step2Form.controls['otherRelation'].setValidators([])
    }
  }
  
  subscriberRelationShipPatient(event: any) {
    this.subscriberOtherRelationFlag = false;
    const selectedValue = event.target ? event.target.value : event; 
    if(selectedValue=='Other'){      
      this.step2Form.controls['subscriberOtherRelation'].setValidators([Validators.required])
      this.subscriberOtherRelationFlag = true;
    }else{
      this.step2Form.controls['subscriberOtherRelation'].setValidators([])
    }
  }

  secondarySubscriberRelationShipPatient(event: any) {
    this.secondarySubscriberOtherRelationFlag = false;
    const selectedValue = event.target ? event.target.value : event; 
    if(selectedValue=='Other'){      
      this.step2Form.controls['secondarySubscriberOtherRelation'].setValidators([Validators.required])
      this.secondarySubscriberOtherRelationFlag = true;
    }else{
      this.step2Form.controls['secondarySubscriberOtherRelation'].setValidators([])
    }
  }
  
  thirdSubscriberRelationShipPatient(event: any) {
    this.thirdSubscriberOtherRelationFlag = false;
    const selectedValue = event.target ? event.target.value : event; 
    if(selectedValue=='Other'){      
      this.step2Form.controls['thirdSubscriberOtherRelation'].setValidators([Validators.required])
      this.thirdSubscriberOtherRelationFlag = true;
    }else{
      this.step2Form.controls['thirdSubscriberOtherRelation'].setValidators([])
    }
  }

  onInjuryChange(event: MatRadioChange): void {
    this.injurySelected = event.value
    if (event.source) {
     // console.log('Source exists:', event.source);
    }
    this.workerCompensation = false
    this.step2Form.get('carrierName')?.markAsUntouched();
    this.step2Form.get('dateOfInjury')?.markAsUntouched();
    this.step2Form.get('insuranceState')?.markAsUntouched();
    this.step2Form.get('claim')?.markAsUntouched();
    this.step2Form.get('adjusterName')?.markAsUntouched();
    this.step2Form.get('adjusterPhone')?.markAsUntouched();
    
    if(this.injurySelected=="Worker's Compensation (WCOMP)"){
      this.workerCompensation = true
      this.step2Form.controls['carrierName'].setValidators([Validators.required])
      this.step2Form.controls['dateOfInjury'].setValidators([Validators.required])
      this.step2Form.controls['insuranceState'].setValidators([Validators.required])
      this.step2Form.controls['claim'].setValidators([Validators.required])
      this.step2Form.controls['adjusterName'].setValidators([Validators.required,Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.step2Form.controls['adjusterPhone'].setValidators([Validators.required,Validators.minLength(14), Validators.maxLength(14)])
    }
    //else if(this.injurySelected=='Other Personal Injury'){  }
  }

  async nextStep() {
    this.router.navigate([this.activeUserRoute, 'intake-form', 'step-3', this.appId])
  }
}
