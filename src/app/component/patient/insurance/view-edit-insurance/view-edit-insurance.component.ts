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
import { practiceLocations, maritalStatus, relationWithPatient, carrierNameList } from 'src/app/config';
import { states_data } from 'src/app/state';
import { MatRadioChange } from '@angular/material/radio';
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
      insuranceName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberFirstName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [''],
      subscriberLastName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: [''],
      subscriberGender: ['',[Validators.required]],
      subscriberRelationWithPatient: ['', [Validators.required]],
      subscriberOtherRelation: [''],
      primaryInsuranceCompany: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: ['', [Validators.required]],
      primaryInsuranceGroup: ['', [Validators.required]],
      primaryInsuranceCustomerServicePh: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      primaryInsuranceFromDate: [''],
      primaryInsuranceToDate: [''],

      secondaryInsuranceCompany: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],      
      secondaryInsuranceIdPolicy: ['', [Validators.required]],
      secondaryInsuranceGroup: ['', [Validators.required]],
      secondaryInsuranceCustomerServicePh: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceFromDate: [''],
      secondaryInsuranceToDate: [''],

      thirdInsuranceCompany: ['', [Validators.minLength(1), Validators.maxLength(35)]],
      thirdInsuranceIdPolicy: ['', []],
      thirdInsuranceGroup: ['', []],
      thirdInsuranceCustomerServicePh: ['', [Validators.minLength(14), Validators.maxLength(14)]],
      thirdInsuranceFromDate: [''],
      thirdInsuranceToDate: [''],

      injuryRelelatedTo: [''],
      carrierName: ['', [Validators.required]],
      dateOfInjury: ['', [Validators.required]],
      insuranceState: ['', [Validators.required]],
      claim: ['', [Validators.required]],
      adjusterName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      adjusterPhone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      reportedEmployer: [''],
      employerName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      employerPhone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      employerAddress: ['', [Validators.required]],
      attorneyName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      attorneyPhone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
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
      this.insuranceForm.controls['secondaryInsuranceCompany'].disable();
      this.insuranceForm.controls['secondaryInsuranceIdPolicy'].disable();
      this.insuranceForm.controls['secondaryInsuranceGroup'].disable();
      this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].disable();
      this.insuranceForm.controls['secondaryInsuranceFromDate'].disable();
      this.insuranceForm.controls['secondaryInsuranceToDate'].disable();
      this.insuranceForm.controls['thirdInsuranceCompany'].disable();
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].disable();
      this.insuranceForm.controls['thirdInsuranceGroup'].disable();
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].disable();
      this.insuranceForm.controls['thirdInsuranceFromDate'].disable();
      this.insuranceForm.controls['thirdInsuranceToDate'].disable();
      this.insuranceForm.controls['injuryRelelatedTo'].disable();
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
      this.insuranceForm.controls['attorneyName'].disable();
      this.insuranceForm.controls['attorneyPhone'].disable();
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
    let primaryInsuranceFromDate = ''
    let primaryInsuranceToDate = ''
    let secondaryInsuranceFromDate = ''
    let secondaryInsuranceToDate = ''
    let thirdInsuranceCompany = ''
    let thirdInsuranceIdPolicy = ''
    let thirdInsuranceGroup = ''
    let thirdInsuranceCustomerServicePh = ''
    let thirdInsuranceFromDate = ''
    let thirdInsuranceToDate = ''    

    let info = this.insuranceData;
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

    secondaryInsuranceCompany = info.secondaryInsuranceCompany
    secondaryInsuranceIdPolicy = info.secondaryInsuranceIdPolicy
    secondaryInsuranceGroup = info.secondaryInsuranceGroup
    secondaryInsuranceCustomerServicePh = info.secondaryInsuranceCustomerServicePh
    secondaryInsuranceFromDate = info.secondaryInsuranceFromDate
    secondaryInsuranceToDate = info.secondaryInsuranceToDate     

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
    attorneyName = info.attorneyName
    attorneyPhone = info.attorneyPhone
    

    this.insuranceForm.controls['insuranceName'].setValue(insuranceName)
    this.insuranceForm.controls['subscriberFirstName'].setValue(subscriberFirstName)
    this.insuranceForm.controls['subscriberMiddleName'].setValue(subscriberMiddleName)
    this.insuranceForm.controls['subscriberLastName'].setValue(subscriberLastName)
    this.insuranceForm.controls['subscriberDob'].setValue(subscriberDob)
    this.insuranceForm.controls['subscriberRelationWithPatient'].setValue(subscriberRelationWithPatient)
    this.insuranceForm.controls['subscriberOtherRelation'].setValue(subscriberOtherRelation)
    this.insuranceForm.controls['primaryInsuranceCompany'].setValue(primaryInsuranceCompany)
    this.insuranceForm.controls['primaryInsuranceIdPolicy'].setValue(primaryInsuranceIdPolicy)
    this.insuranceForm.controls['primaryInsuranceGroup'].setValue(primaryInsuranceGroup)
    this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].setValue(primaryInsuranceCustomerServicePh)
    this.insuranceForm.controls['primaryInsuranceFromDate'].setValue(primaryInsuranceFromDate)
    this.insuranceForm.controls['primaryInsuranceToDate'].setValue(primaryInsuranceToDate)

    this.insuranceForm.controls['secondaryInsuranceCompany'].setValue(secondaryInsuranceCompany)
    this.insuranceForm.controls['secondaryInsuranceIdPolicy'].setValue(secondaryInsuranceIdPolicy)
    this.insuranceForm.controls['secondaryInsuranceGroup'].setValue(secondaryInsuranceGroup)
    this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].setValue(secondaryInsuranceCustomerServicePh)
    this.insuranceForm.controls['secondaryInsuranceFromDate'].setValue(secondaryInsuranceFromDate)
    this.insuranceForm.controls['secondaryInsuranceToDate'].setValue(secondaryInsuranceToDate)

    this.insuranceForm.controls['thirdInsuranceCompany'].setValue(thirdInsuranceCompany)
    this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValue(thirdInsuranceIdPolicy)
    this.insuranceForm.controls['thirdInsuranceGroup'].setValue(thirdInsuranceGroup)
    this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValue(thirdInsuranceCustomerServicePh)
    this.insuranceForm.controls['thirdInsuranceFromDate'].setValue(thirdInsuranceFromDate)
    this.insuranceForm.controls['thirdInsuranceToDate'].setValue(thirdInsuranceToDate)

    this.insuranceForm.controls['injuryRelelatedTo'].setValue(injuryRelelatedTo)
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
    this.insuranceForm.controls['attorneyName'].setValue(attorneyName)
    this.insuranceForm.controls['attorneyPhone'].setValue(attorneyPhone)

    if(subscriberRelationWithPatient=='Other'){
      const mockEvent = { target: { value: 'Other' } }; 
      this.relationShipPatient(mockEvent)
    }
    
    if(thirdInsuranceCompany){
      this.thirdInsurance()
    }
  }

  
  async formSubmit(formData:any=null){
    if (this.insuranceForm.invalid) {
        this.insuranceForm.markAllAsTouched();
        return;
    }else{
        var query = {};
        if(!this.insuranceId){
          Object.assign(formData, {
            patientId: this.userId
          })
        }

        let req_vars = formData
        let apiKey = 'addInsurance';
        if(this.insuranceId){
          apiKey = 'updateInsurance';
          req_vars = {
            query: Object.assign({ _id: this.insuranceId }, query),
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
    }else{
      this.insuranceForm.controls['thirdInsuranceCompany'].setValidators([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]);
      this.insuranceForm.controls['thirdInsuranceIdPolicy'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdInsuranceGroup'].setValidators([Validators.required])
      this.insuranceForm.controls['thirdInsuranceCustomerServicePh'].setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)])
      this.mat_icon = 'remove_circle_outline'
      this.thirdInsurancesFlag = true;  
    }    
  } 

  openCMSmodal(event:any) {  
    if (event.checked === true) {
      const dialogRef = this.dialog.open(CmsModalComponent,{
        panelClass: 'cms--container', 
      });
    } else{ 
    }
}
 


}
