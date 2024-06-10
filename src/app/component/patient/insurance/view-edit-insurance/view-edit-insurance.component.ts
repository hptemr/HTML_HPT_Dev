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
  step2Form: FormGroup;
  step2FormData: any
  insuranceData: any
  validationMessages = validationMessages
  relationWithPatient = relationWithPatient
  carrierNameList = carrierNameList
  states: State[] = states_data
  fullNameForSign: any
  todayDate = new Date()
  constructor(public dialog: MatDialog,private fb: FormBuilder,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.insuranceId = params['insuranceId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
    //subscriberFirstName     subscriberMiddleName     subscriberLastName    subscriberDob     subscriberRelationWithPatient  
    //primaryInsuranceCompany   primaryInsuranceIdPolicy  primaryInsuranceGroup     primaryInsuranceCustomerServicePh
    //secondaryInsuranceCompany  secondaryInsuranceIdPolicy   secondaryInsuranceGroup   secondaryInsuranceCustomerServicePh 
    //injuryRelelatedTo   carrierName   dateOfInjury    insuranceState    claim   adjusterName    adjusterPhone   reportedEmployer
    //employerName    employerPhone   employerAddress   attorneyName    attorneyPhone
    this.loadForm();
    this.getInsuranceDetail();
  }
  
  async getInsuranceDetail(){
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

  loadForm() {
    this.step2Form = this.fb.group({
      //insuranceName: [this.step2FormData ? this.step2FormData.insuranceName : ''],
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

    let info = this.insuranceData
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

  checkSpace(colName: any, event: any) {
    this.step2Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  addInsurance(){
    const dialogRef = this.dialog.open(AddInsuranceModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
