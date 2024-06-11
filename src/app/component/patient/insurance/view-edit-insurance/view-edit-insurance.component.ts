import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AddInsuranceModalComponent } from '../../book-appointment/add-insurance-modal/add-insurance-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from 'src/app/utils/validation-messages';
import { practiceLocations, maritalStatus, relationWithPatient, carrierNameList } from 'src/app/config';
import { states_data } from 'src/app/state';
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
  model: NgbDateStruct;
  insuranceId: string;
  public userId: string;
  public userRole: string;
  insuranceForm: FormGroup;
  insuranceFormData: any
  insuranceData: any
  validationMessages = validationMessages
  relationWithPatient = relationWithPatient
  carrierNameList = carrierNameList
  states: State[] = states_data
  fullNameForSign: any
  todayDate = new Date()

  constructor(public dialog: MatDialog,private fb: FormBuilder,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      if(params['insuranceId'])this.insuranceId = params['insuranceId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
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
            console.log('>>>>>  insurance data >>>>>>>',this.insuranceData)
        }      
      })
    }
  }

  loadForm() {
    this.insuranceForm = this.fb.group({      
      insuranceName: [this.insuranceFormData ? this.insuranceFormData.insuranceName :  [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberFirstName: [this.insuranceFormData ? this.insuranceFormData.subscriberFirstName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberMiddleName: [this.insuranceFormData ? this.insuranceFormData.subscriberMiddleName : ''],
      subscriberLastName: [this.insuranceFormData ? this.insuranceFormData.subscriberLastName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      subscriberDob: [this.insuranceFormData ? this.insuranceFormData.subscriberDob : ''],
      subscriberRelationWithPatient: [this.insuranceFormData && this.insuranceFormData.subscriberRelationWithPatient ? this.insuranceFormData.subscriberRelationWithPatient : '', [Validators.required]],
      primaryInsuranceCompany: [this.insuranceFormData ? this.insuranceFormData.primaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      primaryInsuranceIdPolicy: [this.insuranceFormData ? this.insuranceFormData.primaryInsuranceIdPolicy : '', [Validators.required]],
      primaryInsuranceGroup: [this.insuranceFormData ? this.insuranceFormData.primaryInsuranceGroup : '', [Validators.required]],
      primaryInsuranceCustomerServicePh: [this.insuranceFormData ? this.insuranceFormData.primaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      secondaryInsuranceCompany: [this.insuranceFormData ? this.insuranceFormData.secondaryInsuranceCompany : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      secondaryInsuranceIdPolicy: [this.insuranceFormData ? this.insuranceFormData.secondaryInsuranceIdPolicy : '', [Validators.required]],
      secondaryInsuranceGroup: [this.insuranceFormData ? this.insuranceFormData.secondaryInsuranceGroup : '', [Validators.required]],
      secondaryInsuranceCustomerServicePh: [this.insuranceFormData ? this.insuranceFormData.secondaryInsuranceCustomerServicePh : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      injuryRelelatedTo: [this.insuranceFormData ? this.insuranceFormData.injuryRelelatedTo : ''],
      carrierName: [this.insuranceFormData && this.insuranceFormData.carrierName ? this.insuranceFormData.carrierName : '', [Validators.required]],
      dateOfInjury: [this.insuranceFormData ? this.insuranceFormData.dateOfInjury : '', [Validators.required]],
      insuranceState: [this.insuranceFormData && this.insuranceFormData.insuranceState ? this.insuranceFormData.insuranceState : '', [Validators.required]],
      claim: [this.insuranceFormData ? this.insuranceFormData.claim : '', [Validators.required]],
      adjusterName: [this.insuranceFormData ? this.insuranceFormData.adjusterName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      adjusterPhone: [this.insuranceFormData ? this.insuranceFormData.adjusterPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      reportedEmployer: [this.insuranceFormData ? this.insuranceFormData.reportedEmployer : ''],
      employerName: [this.insuranceFormData ? this.insuranceFormData.employerName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      employerPhone: [this.insuranceFormData ? this.insuranceFormData.employerPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      employerAddress: [this.insuranceFormData ? this.insuranceFormData.employerAddress : '', [Validators.required]],
      attorneyName: [this.insuranceFormData ? this.insuranceFormData.attorneyName : '', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      attorneyPhone: [this.insuranceFormData ? this.insuranceFormData.attorneyPhone : '', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    });
  }

  
  getInsuranceData() {
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

    let info = this.insuranceData;
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

    this.insuranceForm.controls['subscriberFirstName'].setValue(subscriberFirstName)
    this.insuranceForm.controls['subscriberMiddleName'].setValue(subscriberMiddleName)
    this.insuranceForm.controls['subscriberLastName'].setValue(subscriberLastName)
    this.insuranceForm.controls['subscriberDob'].setValue(subscriberDob)
    this.insuranceForm.controls['subscriberRelationWithPatient'].setValue(subscriberRelationWithPatient)
    this.insuranceForm.controls['primaryInsuranceCompany'].setValue(primaryInsuranceCompany)
    this.insuranceForm.controls['primaryInsuranceIdPolicy'].setValue(primaryInsuranceIdPolicy)
    this.insuranceForm.controls['primaryInsuranceGroup'].setValue(primaryInsuranceGroup)
    this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].setValue(primaryInsuranceCustomerServicePh)
    this.insuranceForm.controls['secondaryInsuranceCompany'].setValue(secondaryInsuranceCompany)
    this.insuranceForm.controls['secondaryInsuranceIdPolicy'].setValue(secondaryInsuranceIdPolicy)
    this.insuranceForm.controls['secondaryInsuranceGroup'].setValue(secondaryInsuranceGroup)
    this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].setValue(secondaryInsuranceCustomerServicePh)
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
        console.log("req_vars:", req_vars)

        this.commonService.showLoader();       
        await this.authService.apiRequest('post', 'insurance/'+apiKey, req_vars).subscribe(async response => {         
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {        
         
          }      
        })
    }
  }

  checkSpace(colName: any, event: any) {
    this.insuranceForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  // addInsurance(){
  //   const dialogRef = this.dialog.open(AddInsuranceModalComponent,{
  //     panelClass: 'custom-alert-container', 
  //   });
  // }
}
