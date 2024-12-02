import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from 'src/app/utils/validation-messages';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component'; 
import { practiceLocations, maritalStatus, relationWithPatient, carrierNameList,s3Details } from 'src/app/config';
import { states_data } from 'src/app/state';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { FilePreviewComponent}  from 'src/app/shared/component/file-preview-model/file-preview-model.component'
interface State {
  state: string;
  state_code: string;
}
@Component({
  selector: 'app-view-edit-insurance', 
  templateUrl: './view-edit-insurance.component.html',
  styleUrl: './view-edit-insurance.component.scss'
})
export class ViewEditInsuranceComponent {
  @ViewChild('insuranceFileInput') insuranceFileInput: any
  model: NgbDateStruct;
  insuranceId: string;
  public userId: string;
  public userRole: string;
  insuranceForm: FormGroup;
  insuranceFormData: any
  insuranceData: any
  validationMessages = validationMessages
  relationWithPatient = relationWithPatient
  relationWithPatientFlag:boolean=false
  carrierNameList = carrierNameList
  states: State[] = states_data
  fullNameForSign: any
  todayDate = new Date()
  pageName:any = '';
  isReadOnly:boolean=false
  thirdInsurancesFlag:boolean=false
  mat_icon:string='add_circle'
  successMsg:string='Insurance Details Added Successfully'
  subscriberOtherRelationFlag:boolean=false
  secondarySubscriberOtherRelationFlag:boolean=false
  thirdSubscriberOtherRelationFlag:boolean=false
  injurySelected: any
  workerCompensation:boolean=false
  employerSelected:string=''
  allowedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'doc', 'docx']
  fileError: any = ''
  uploadedInsuranceFiles: any = []
  uploadedInsuranceFilesTotal = 0
  isMinorFlag:boolean=false
  attorneyFlag:boolean=false
  @ViewChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  constructor(public dialog: MatDialog,private fb: FormBuilder,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      const locationArray = location.href.split('/')
      if(params['insuranceId']){
        this.insuranceId = params['insuranceId'];
        this.pageName = locationArray[locationArray.length - 2];
      }else{
        this.pageName = locationArray[locationArray.length - 1];
      }
      if(this.pageName=='view-insurance'){
        this.isReadOnly = true
      }else  if(this.pageName=='edit-insurance'){
        this.successMsg = 'Insurance Details Updated Successfully';
      }
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
    this.fullNameForSign = this.authService.getLoggedInInfo('firstName') +' '+ this.authService.getLoggedInInfo('lastName') 

    this.loadForm();
    this.getInsuranceDetail();
  }
  
  async getInsuranceDetail(){
    if(this.insuranceId){
      var query = {};
      const req_vars = {
        query: Object.assign({ _id: this.insuranceId }, query)
      }
      this.commonService.showLoader();       
      await this.authService.apiRequest('post', 'insurance/getInsuranceDetails', req_vars).subscribe(async response => {         
        this.commonService.hideLoader();
        if (response.error) {
          if(response.message){
            this.commonService.openSnackBar(response.message, "ERROR")   
          }
        } else {        
            if(response && response.data && response.data.insuranceData){
              this.insuranceData = response.data.insuranceData;
              this.getInsuranceData();
            }
        }      
      })
    }
  }

  loadForm() {
    this.insuranceForm = this.fb.group({
      insuranceName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberFirstName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [''],
      subscriberLastName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: ['',[Validators.required]],
      subscriberGender: ['',[Validators.required]],
      subscriberRelationWithPatient: ['', [Validators.required]],
      subscriberOtherRelation: [''],
      primaryInsuranceCompany: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: ['', [Validators.required]],
      primaryInsuranceGroup: ['', [Validators.required]],
      primaryInsuranceCustomerServicePh: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      primaryInsuranceFromDate: [''],
      primaryInsuranceToDate: [''],

      secondarySubscriberFirstName: ['',[Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondarySubscriberMiddleName: [''],
      secondarySubscriberLastName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondarySubscriberDob: ['',[Validators.required]],
      secondarySubscriberRelationWithPatient: ['', [Validators.required]],
      secondarySubscriberOtherRelation: [''],
      secondarySubscriberGender: ['', [Validators.required]],
      secondaryInsuranceCompany: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],      
      secondaryInsuranceIdPolicy: ['', [Validators.required]],
      secondaryInsuranceGroup: ['', [Validators.required]],
      secondaryInsuranceCustomerServicePh: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceFromDate: [''],
      secondaryInsuranceToDate: [''],

      thirdSubscriberFirstName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.minLength(1), Validators.maxLength(35)]],
      thirdSubscriberMiddleName: [''],
      thirdSubscriberLastName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.minLength(1), Validators.maxLength(35)]],
      thirdSubscriberDob: [''],
      thirdSubscriberRelationWithPatient: [''],
      thirdSubscriberOtherRelation: [''],
      thirdSubscriberGender: [''],
      thirdInsuranceCompany: ['', [Validators.minLength(1), Validators.maxLength(35)]],
      thirdInsuranceIdPolicy: [''],
      thirdInsuranceGroup: [''],
      thirdInsuranceCustomerServicePh: ['', [Validators.minLength(14), Validators.maxLength(14)]],
      thirdInsuranceFromDate: [''],
      thirdInsuranceToDate: [''],

      injuryRelelatedTo: [''],
      otherPersonalInjury: [''],
      carrierName: [''],
      dateOfInjury: [''],
      insuranceState: [''],
      claim: [''],
      adjusterName: [''],
      adjusterPhone: [''],
      reportedEmployer: [''],
      employerName: [''],
      employerPhone: [''],
      employerAddress: [''],
      isPatientMinor: [''],
      attorney: [''],
      attorneyName: [''],
      attorneyPhone: [''],
      adultConsent: [false],
      minorConsent: [false],
    });

    if(this.isReadOnly){
      this.insuranceForm.controls['insuranceName'].disable();
      this.insuranceForm.controls['subscriberFirstName'].disable();
      this.insuranceForm.controls['subscriberMiddleName'].disable();
      this.insuranceForm.controls['subscriberLastName'].disable();
      this.insuranceForm.controls['subscriberDob'].disable();
      this.insuranceForm.controls['subscriberRelationWithPatient'].disable();
      this.insuranceForm.controls['subscriberOtherRelation'].disable();
      this.insuranceForm.controls['primaryInsuranceCompany'].disable();
      this.insuranceForm.controls['primaryInsuranceIdPolicy'].disable();
      this.insuranceForm.controls['primaryInsuranceGroup'].disable();
      this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].disable();
      this.insuranceForm.controls['primaryInsuranceFromDate'].disable();
      this.insuranceForm.controls['primaryInsuranceToDate'].disable();

      this.insuranceForm.controls['secondarySubscriberFirstName'].disable();
      this.insuranceForm.controls['secondarySubscriberMiddleName'].disable();
      this.insuranceForm.controls['secondarySubscriberLastName'].disable();
      this.insuranceForm.controls['secondarySubscriberDob'].disable();
      this.insuranceForm.controls['secondarySubscriberRelationWithPatient'].disable();
      this.insuranceForm.controls['secondarySubscriberOtherRelation'].disable();
      this.insuranceForm.controls['secondarySubscriberGender'].disable();
      this.insuranceForm.controls['secondaryInsuranceCompany'].disable();
      this.insuranceForm.controls['secondaryInsuranceIdPolicy'].disable();
      this.insuranceForm.controls['secondaryInsuranceGroup'].disable();
      this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].disable();
      this.insuranceForm.controls['secondaryInsuranceFromDate'].disable();
      this.insuranceForm.controls['secondaryInsuranceToDate'].disable();

      this.insuranceForm.controls['thirdSubscriberFirstName'].disable();
      this.insuranceForm.controls['thirdSubscriberMiddleName'].disable();
      this.insuranceForm.controls['thirdSubscriberLastName'].disable();
      this.insuranceForm.controls['thirdSubscriberDob'].disable();
      this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].disable();
      this.insuranceForm.controls['thirdSubscriberOtherRelation'].disable();
      this.insuranceForm.controls['thirdSubscriberGender'].disable();
      this.insuranceForm.controls['thirdInsuranceCompany'].disable();
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].disable();
      this.insuranceForm.controls['thirdInsuranceGroup'].disable();
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].disable();
      this.insuranceForm.controls['thirdInsuranceFromDate'].disable();
      this.insuranceForm.controls['thirdInsuranceToDate'].disable();

      this.insuranceForm.controls['injuryRelelatedTo'].disable();
      this.insuranceForm.controls['otherPersonalInjury'].disable();
      this.insuranceForm.controls['carrierName'].disable();
      this.insuranceForm.controls['dateOfInjury'].disable();
      this.insuranceForm.controls['insuranceState'].disable();
      this.insuranceForm.controls['claim'].disable();
      this.insuranceForm.controls['adjusterName'].disable();
      this.insuranceForm.controls['adjusterPhone'].disable();
      this.insuranceForm.controls['reportedEmployer'].disable();
      this.insuranceForm.controls['employerName'].disable();
      this.insuranceForm.controls['employerPhone'].disable();
      this.insuranceForm.controls['employerAddress'].disable();
      this.insuranceForm.controls['attorney'].disable();
      this.insuranceForm.controls['attorneyName'].disable();
      this.insuranceForm.controls['attorneyPhone'].disable();
      this.insuranceForm.controls['isPatientMinor'].disable();
      this.insuranceForm.controls['adultConsent'].disable();  
    }    
  }
  
  getInsuranceData() {
    let insuranceName = ''
    let subscriberFirstName = ''
    let subscriberMiddleName = ''
    let subscriberLastName = ''
    let subscriberDob
    let subscriberRelationWithPatient = ''
    let subscriberOtherRelation = ''
    let subscriberGender = ''
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
    let otherPersonalInjury = ''
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
    let primaryInsuranceFromDate = ''
    let primaryInsuranceToDate = ''
    let secondaryInsuranceFromDate = ''
    let secondaryInsuranceToDate = ''

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
    let thirdInsuranceFromDate = ''
    let thirdInsuranceToDate = ''    
    let isPatientMinor = ''
    let adultConsent= false
    let minorConsent= false
    let info = this.insuranceData;
    insuranceName = info.insuranceName
    subscriberFirstName = info.subscriberFirstName
    subscriberMiddleName = info.subscriberMiddleName
    subscriberLastName = info.subscriberLastName
    subscriberDob = info.subscriberDob
    subscriberRelationWithPatient = info.subscriberRelationWithPatient
    subscriberOtherRelation = info.subscriberOtherRelation
    subscriberGender = info.subscriberGender
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
    secondarySubscriberGender= info.secondarySubscriberGender
    secondaryInsuranceCompany = info.secondaryInsuranceCompany
    secondaryInsuranceIdPolicy = info.secondaryInsuranceIdPolicy
    secondaryInsuranceGroup = info.secondaryInsuranceGroup
    secondaryInsuranceCustomerServicePh = info.secondaryInsuranceCustomerServicePh
    secondaryInsuranceFromDate = info.secondaryInsuranceFromDate
    secondaryInsuranceToDate = info.secondaryInsuranceToDate     

    thirdSubscriberFirstName = info.thirdSubscriberFirstName    
    thirdSubscriberMiddleName = info.thirdSubscriberMiddleName    
    thirdSubscriberLastName = info.thirdSubscriberLastName    
    thirdSubscriberDob = info.thirdSubscriberDob    
    thirdSubscriberOtherRelation = info.thirdSubscriberOtherRelation    
    thirdSubscriberRelationWithPatient = info.thirdSubscriberRelationWithPatient  
    thirdSubscriberGender = info.thirdSubscriberGender    
    thirdInsuranceCompany = info.thirdInsuranceCompany
    thirdInsuranceIdPolicy = info.thirdInsuranceIdPolicy
    thirdInsuranceGroup = info.thirdInsuranceGroup
    thirdInsuranceCustomerServicePh = info.thirdInsuranceCustomerServicePh
    thirdInsuranceFromDate = info.thirdInsuranceFromDate
    thirdInsuranceToDate = info.thirdInsuranceToDate

    injuryRelelatedTo = info.injuryRelelatedTo
    otherPersonalInjury = info.otherPersonalInjury
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
    attorney = info.attorney
    attorneyName = info.attorneyName
    attorneyPhone = info.attorneyPhone
    isPatientMinor = info.isPatientMinor ? info.isPatientMinor : 'No'
    adultConsent = info.adultConsent
    minorConsent = info.minorConsent
    this.insuranceForm.controls['insuranceName'].setValue(insuranceName)
    this.insuranceForm.controls['subscriberFirstName'].setValue(subscriberFirstName)
    this.insuranceForm.controls['subscriberMiddleName'].setValue(subscriberMiddleName)
    this.insuranceForm.controls['subscriberLastName'].setValue(subscriberLastName)
    this.insuranceForm.controls['subscriberDob'].setValue(subscriberDob)
    this.insuranceForm.controls['subscriberRelationWithPatient'].setValue(subscriberRelationWithPatient)
    this.insuranceForm.controls['subscriberGender'].setValue(subscriberGender)
    this.insuranceForm.controls['subscriberOtherRelation'].setValue(subscriberOtherRelation)
    this.insuranceForm.controls['primaryInsuranceCompany'].setValue(primaryInsuranceCompany)
    this.insuranceForm.controls['primaryInsuranceIdPolicy'].setValue(primaryInsuranceIdPolicy)
    this.insuranceForm.controls['primaryInsuranceGroup'].setValue(primaryInsuranceGroup)
    this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].setValue(primaryInsuranceCustomerServicePh)
    this.insuranceForm.controls['primaryInsuranceFromDate'].setValue(primaryInsuranceFromDate)
    this.insuranceForm.controls['primaryInsuranceToDate'].setValue(primaryInsuranceToDate)

    this.insuranceForm.controls['secondarySubscriberFirstName'].setValue(secondarySubscriberFirstName)
    this.insuranceForm.controls['secondarySubscriberMiddleName'].setValue(secondarySubscriberMiddleName)
    this.insuranceForm.controls['secondarySubscriberLastName'].setValue(secondarySubscriberLastName)
    this.insuranceForm.controls['secondarySubscriberDob'].setValue(secondarySubscriberDob)
    this.insuranceForm.controls['secondarySubscriberOtherRelation'].setValue(secondarySubscriberOtherRelation)
    this.insuranceForm.controls['secondarySubscriberRelationWithPatient'].setValue(secondarySubscriberRelationWithPatient)      
    this.insuranceForm.controls['secondarySubscriberGender'].setValue(secondarySubscriberGender)            
    this.insuranceForm.controls['secondaryInsuranceCompany'].setValue(secondaryInsuranceCompany)
    this.insuranceForm.controls['secondaryInsuranceIdPolicy'].setValue(secondaryInsuranceIdPolicy)
    this.insuranceForm.controls['secondaryInsuranceGroup'].setValue(secondaryInsuranceGroup)
    this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].setValue(secondaryInsuranceCustomerServicePh)
    this.insuranceForm.controls['secondaryInsuranceFromDate'].setValue(secondaryInsuranceFromDate)
    this.insuranceForm.controls['secondaryInsuranceToDate'].setValue(secondaryInsuranceToDate)

    this.insuranceForm.controls['thirdSubscriberFirstName'].setValue(thirdSubscriberFirstName)
    this.insuranceForm.controls['thirdSubscriberMiddleName'].setValue(thirdSubscriberMiddleName)
    this.insuranceForm.controls['thirdSubscriberLastName'].setValue(thirdSubscriberLastName)
    this.insuranceForm.controls['thirdSubscriberDob'].setValue(thirdSubscriberDob)
    this.insuranceForm.controls['thirdSubscriberGender'].setValue(thirdSubscriberGender)
    this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValue(thirdSubscriberOtherRelation)
    this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].setValue(thirdSubscriberRelationWithPatient)  

    this.insuranceForm.controls['thirdInsuranceCompany'].setValue(thirdInsuranceCompany)
    this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValue(thirdInsuranceIdPolicy)
    this.insuranceForm.controls['thirdInsuranceGroup'].setValue(thirdInsuranceGroup)
    this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValue(thirdInsuranceCustomerServicePh)
    this.insuranceForm.controls['thirdInsuranceFromDate'].setValue(thirdInsuranceFromDate)
    this.insuranceForm.controls['thirdInsuranceToDate'].setValue(thirdInsuranceToDate)

    this.insuranceForm.controls['injuryRelelatedTo'].setValue(injuryRelelatedTo)
    this.insuranceForm.controls['otherPersonalInjury'].setValue(otherPersonalInjury)
    this.insuranceForm.controls['carrierName'].setValue(carrierName)
    this.insuranceForm.controls['dateOfInjury'].setValue(dateOfInjury)
    this.insuranceForm.controls['insuranceState'].setValue(insuranceState)
    this.insuranceForm.controls['claim'].setValue(claim)
    this.insuranceForm.controls['adjusterName'].setValue(adjusterName)
    this.insuranceForm.controls['adjusterPhone'].setValue(adjusterPhone)
    this.insuranceForm.controls['reportedEmployer'].setValue(reportedEmployer)
    this.insuranceForm.controls['employerName'].setValue(employerName)
    this.insuranceForm.controls['employerPhone'].setValue(employerPhone)
    this.insuranceForm.controls['employerAddress'].setValue(employerAddress)
    this.insuranceForm.controls['attorney'].setValue(attorney)
    this.insuranceForm.controls['attorneyName'].setValue(attorneyName)
    this.insuranceForm.controls['attorneyPhone'].setValue(attorneyPhone)
    this.insuranceForm.controls['isPatientMinor'].setValue(isPatientMinor)
    this.insuranceForm.controls['adultConsent'].setValue(adultConsent)
    this.insuranceForm.controls['minorConsent'].setValue(minorConsent)

    this.isMinorFlag = (isPatientMinor=='Yes') ? true : false; 
    if(subscriberRelationWithPatient=='Other'){
      const mockEvent = { target: { value: 'Other' } }; 
      this.relationShipPatient(mockEvent)
    }
    if(injuryRelelatedTo)this.injurySelected = injuryRelelatedTo;
    if(injuryRelelatedTo && injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
      const mockEvent5: MatRadioChange = { value: "Worker's Compensation (WCOMP)", source: this.radioButton! }; 
      this.onInjuryChange(mockEvent5)
    }

    let reportedEmployerVal = typeof reportedEmployer !== 'undefined' ? reportedEmployer : '';
    if(reportedEmployerVal){
      const mockEvent7: MatRadioChange = { value: reportedEmployerVal, source: this.radioButton! }; 
      this.onEmployerChange(mockEvent7)
    }

    let attorneyVal = typeof attorney !== 'undefined' ? attorney : '';
    if(attorneyVal){
      if(attorneyVal=='yes'){ attorneyVal='Yes';} if(attorneyVal=='no'){ attorneyVal='No';}
      const mockEvent11: MatRadioChange = { value: attorneyVal, source: this.radioButton! }; 
      this.attorneyChange(mockEvent11)
    }
    
    if(thirdInsuranceCompany){
      this.thirdInsurance()
    }

    let filesArr: any = []
    if(info.insuranceFiles){
      let insuranceFiles = info.insuranceFiles
      insuranceFiles.forEach((element: any) => {
        filesArr.push({
          name: element,
          data: '',
          icon: this.getIcon(this.getExtension(element))
        })
      });
      this.uploadedInsuranceFiles = filesArr            
    }

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


  async formSubmit(formData:any=null){
    console.log(this.insuranceForm.invalid,' Submit insuranceForm >>>>>',this.insuranceForm)
    for (const control in this.insuranceForm.controls) {
      if (this.insuranceForm.controls[control].invalid) {
        console.log(`Field ${control} has an error`, this.insuranceForm.controls[control].errors);
      }
    }

    if (this.insuranceForm.invalid) {
        this.insuranceForm.markAllAsTouched();
        return;
    }else{
        var query = {};
        let req_vars = formData;
        let uploadedInsuranceFiles: any = localStorage.getItem('uploadedInsuranceFiles')
        let insuranceFiles = this.getInsuranceFiles()
        if (insuranceFiles.length > 0) {
          Object.assign(formData, { insuranceFiles: insuranceFiles })
        }

        if(!this.insuranceId){
          Object.assign(formData, {
            patientId: this.userId,
            uploadedInsuranceFiles: JSON.parse(uploadedInsuranceFiles),
          })
        }

        let apiKey = 'addInsurance';
        if(this.insuranceId){
          apiKey = 'updateInsurance';
          req_vars = {
            query: Object.assign({ _id: this.insuranceId }, query),
            uploadedInsuranceFiles: JSON.parse(uploadedInsuranceFiles),
            data: formData
           }
        }
        this.commonService.showLoader();       
        await this.authService.apiRequest('post', 'insurance/'+apiKey, req_vars).subscribe(async response => {         
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {        
            this.successModal();
          }      
        })
    }
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


  checkSpace(colName: any, event: any) {
    this.insuranceForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: this.successMsg
      }
    })
    dialogRef.afterClosed().subscribe(async insuranceName => {
      this.router.navigate(['/patient/insurance-listing/'])
    });
  }

  relationShipPatient(event: any) {
    this.relationWithPatientFlag = false;
    const selectedValue = event.target ? event.target.value : event; 
    if(selectedValue=='Other'){      
      this.insuranceForm.controls['subscriberOtherRelation'].setValidators([Validators.required])
      this.relationWithPatientFlag = true;
    }else{
      this.insuranceForm.controls['subscriberOtherRelation'].setValidators([])
    }
  }

  attorneyChange(event: MatRadioChange) {
    this.attorneyFlag = false;
    if(event.value=='Yes'){
      this.attorneyFlag = true
      this.insuranceForm.controls['attorneyName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.insuranceForm.controls['attorneyPhone'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])     
    }else{
      this.insuranceForm.controls['attorneyName'].setValidators([]);
      this.insuranceForm.controls['attorneyPhone'].setValidators([]);
      this.insuranceForm.controls['attorneyName'].setValue('')
      this.insuranceForm.controls['attorneyPhone'].setValue('')
      this.insuranceForm.get('attorneyName')?.markAsUntouched();
      this.insuranceForm.get('attorneyPhone')?.markAsUntouched();
    }    
  }

  changePatientMinor(event: MatRadioChange) {
    this.isMinorFlag = false
    if(event.value=='Yes')
      this.isMinorFlag = true
  }

  signatureText(event: any) {
    if(this.insuranceForm.controls['firstName'].value && this.insuranceForm.controls['lastName'].value){
      this.fullNameForSign = this.insuranceForm.controls['firstName'].value + " " + this.insuranceForm.controls['lastName'].value;
    }
  }

  thirdInsurance(){
    if(this.thirdInsurancesFlag){
      this.insuranceForm.controls['thirdInsuranceCompany'].setValidators([]);
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValidators([]);
      this.insuranceForm.controls['thirdInsuranceGroup'].setValidators([]);
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValidators([]);
      this.mat_icon = 'add_circle'
      this.thirdInsurancesFlag = false;  
    
      this.insuranceForm.controls['thirdInsuranceCompany'].setValue('');
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValue('');
      this.insuranceForm.controls['thirdInsuranceGroup'].setValue('');
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValue('');
      this.insuranceForm.controls['thirdInsuranceFromDate'].setValue('');
      this.insuranceForm.controls['thirdInsuranceToDate'].setValue('');    

      this.insuranceForm.controls['thirdInsuranceCompany'].reset();
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].reset();
      this.insuranceForm.controls['thirdInsuranceGroup'].reset();
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].reset();
      this.insuranceForm.controls['thirdInsuranceFromDate'].reset();
      this.insuranceForm.controls['thirdInsuranceToDate'].reset();

      this.insuranceForm.controls['thirdSubscriberFirstName'].setValidators([]);
      this.insuranceForm.controls['thirdSubscriberLastName'].setValidators([]);
      this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].setValidators([]);
      this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValidators([]);
      this.insuranceForm.controls['thirdSubscriberGender'].setValidators([]);
      this.insuranceForm.controls['thirdSubscriberFirstName'].setValue('');
      this.insuranceForm.controls['thirdSubscriberLastName'].setValue('');
      this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].setValue('');
      this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValue('');
      this.insuranceForm.controls['thirdSubscriberGender'].setValue('');
      this.insuranceForm.controls['thirdSubscriberFirstName'].reset();
      this.insuranceForm.controls['thirdSubscriberLastName'].reset();      
      this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].reset();      
      this.insuranceForm.controls['thirdSubscriberOtherRelation'].reset();     
      this.insuranceForm.controls['thirdSubscriberGender'].reset();

    }else{
      this.insuranceForm.controls['thirdSubscriberFirstName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.insuranceForm.controls['thirdSubscriberMiddleName'].setValidators([])
      this.insuranceForm.controls['thirdSubscriberLastName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.insuranceForm.controls['thirdSubscriberDob'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdSubscriberRelationWithPatient'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdSubscriberGender'].setValidators([Validators.required])
      
      this.insuranceForm.controls['thirdInsuranceCompany'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]);
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdInsuranceGroup'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])
      this.mat_icon = 'remove_circle_outline'
      this.thirdInsurancesFlag = true;  
    }    
  } 

  openCMSmodal(event:any,from:string) {  
    if (event.checked === true && !this.isReadOnly) {
      const dialogRef = this.dialog.open(CmsModalComponent,{
        panelClass: 'cms--container', 
      });
    } else{ 
      console.log('ELSE')
      // if(from=='adultConsent'){
      //     this.insuranceForm.controls['adultConsent'].setValue(false)
      // }else if(from=='minorConsent'){
      //     this.insuranceForm.controls['minorConsent'].setValue(false)
      // }
    }
}
 
onEmployerChange(event: MatRadioChange) {
  this.employerSelected = event.value
  if(this.employerSelected=='Yes'){
    this.insuranceForm.controls['employerName'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
    this.insuranceForm.controls['employerPhone'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])
    this.insuranceForm.controls['employerAddress'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])
  }else{
    this.insuranceForm.controls['employerName'].setValidators([])
    this.insuranceForm.controls['employerPhone'].setValidators([])
    this.insuranceForm.controls['employerAddress'].setValidators([])
    this.insuranceForm.controls['employerName'].reset();
    this.insuranceForm.controls['employerPhone'].reset();
    this.insuranceForm.controls['employerAddress'].reset();  
    this.insuranceForm.get('employerName')?.markAsUntouched();
    this.insuranceForm.get('employerPhone')?.markAsUntouched();
    this.insuranceForm.get('employerAddress')?.markAsUntouched();
  }
  this.insuranceForm.updateValueAndValidity();
}

subscriberRelationShipPatient(event: any) {
  this.subscriberOtherRelationFlag = false;
  const selectedValue = event.target ? event.target.value : event; 
  if(selectedValue=='Other'){      
    this.insuranceForm.controls['subscriberOtherRelation'].setValidators([Validators.required])
    this.subscriberOtherRelationFlag = true;
  }else{
    this.insuranceForm.controls['subscriberOtherRelation'].setValidators([])
  }
}

secondarySubscriberRelationShipPatient(event: any) {
  this.secondarySubscriberOtherRelationFlag = false;
  const selectedValue = event.target ? event.target.value : event; 
  if(selectedValue=='Other'){      
    this.insuranceForm.controls['secondarySubscriberOtherRelation'].setValidators([Validators.required])
    this.secondarySubscriberOtherRelationFlag = true;
  }else{
    this.insuranceForm.controls['secondarySubscriberOtherRelation'].setValidators([])
  }
}

thirdSubscriberRelationShipPatient(event: any) {
  this.thirdSubscriberOtherRelationFlag = false;
  const selectedValue = event.target ? event.target.value : event; 
  if(selectedValue=='Other'){      
    this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValidators([Validators.required])
    this.thirdSubscriberOtherRelationFlag = true;
  }else{
    this.insuranceForm.controls['thirdSubscriberOtherRelation'].setValidators([])
  }
}

  onInjuryChange(event: MatRadioChange): void {
    this.injurySelected = event.value

    if (event.source) {
      console.log('Source exists:', event.source);
    }
    this.workerCompensation = false
    this.insuranceForm.get('carrierName')?.markAsUntouched();
    this.insuranceForm.get('dateOfInjury')?.markAsUntouched();
    this.insuranceForm.get('insuranceState')?.markAsUntouched();
    this.insuranceForm.get('claim')?.markAsUntouched();
    this.insuranceForm.get('adjusterName')?.markAsUntouched();
    this.insuranceForm.get('adjusterPhone')?.markAsUntouched();
    
    this.insuranceForm.controls['carrierName'].setValidators([])
    this.insuranceForm.controls['dateOfInjury'].setValidators([])
    this.insuranceForm.controls['insuranceState'].setValidators([])
    this.insuranceForm.controls['claim'].setValidators([])
    this.insuranceForm.controls['adjusterName'].setValidators([])
    this.insuranceForm.controls['adjusterPhone'].setValidators([])

    if(this.injurySelected=="Worker's Compensation (WCOMP)"){
      this.workerCompensation = true
      this.insuranceForm.controls['carrierName'].setValidators([Validators.required])
      this.insuranceForm.controls['dateOfInjury'].setValidators([Validators.required])
      this.insuranceForm.controls['insuranceState'].setValidators([Validators.required])
      this.insuranceForm.controls['claim'].setValidators([Validators.required])
      this.insuranceForm.controls['adjusterName'].setValidators([Validators.required,Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])
      this.insuranceForm.controls['adjusterPhone'].setValidators([Validators.required,Validators.minLength(14), Validators.maxLength(14)])
    }

    
    //else if(this.injurySelected=='Other Personal Injury'){  }
  }


async previewfile(document_temp_name:string) {
  let req_vars = {
    query: { _id: this.userId },
    fileName: document_temp_name,
    filePath:s3Details.patientInsuranceFolderPath
  }
  this.commonService.showLoader()
  await this.authService.apiRequest('post', 'patients/getPreviewDocument', req_vars).subscribe(async response => {
    this.commonService.hideLoader()
    if (response.error) {
      this.commonService.openSnackBar(response.message, "ERROR")
    } else {
      let profile = response.data;
      let documentsLink = profile.document;

      var extension = document_temp_name.substring(document_temp_name.lastIndexOf('.') + 1);
      let fileName = document_temp_name;
      let fileType = '';let icon = ''
      if(extension=='png' || extension=='jpg' || extension=='jpeg' || extension=='PNG' || extension=='JPG' || extension=='JPEG'){
        fileType = "image"
      }else if(extension=='mp4' || extension=='webm'){
        fileType = "video"
      }else if(extension=='mpeg' || extension=='mp3'){
        fileType = "audio"
      }else{
        fileType = "doc"
      }      
      icon = this.getIcon(extension)

      if(documentsLink){
        const dialogRef = this.dialog.open(FilePreviewComponent, {
          panelClass: 'custom-alert-container',
          data: {
            documentsLink:documentsLink,
            fileType:fileType,
            fileName:fileName,
            icon:icon
          }
        });
      }
    }
  })



}
}
