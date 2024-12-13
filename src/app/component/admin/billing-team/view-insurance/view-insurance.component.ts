import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { carrierNameList, maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
import { states_data } from 'src/app/state';

interface State {
  state: string;
  state_code: string;
}

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrl: './view-insurance.component.scss'
})
export class ViewInsuranceComponent {
  model: NgbDateStruct;
  appointmentId: string='';
  appointmentData: any = [];
  insuranceInfo: any
  relationWithPatient = relationWithPatient
  insuranceForm: FormGroup;
  carrierNameList = carrierNameList
  states: State[] = states_data
  fullNameForSign: string = '';
  isInjuryRelatedToWorkers:boolean=false
  isOtherPersonalInjury:boolean=false
  isBillingDetailsData:boolean=false
  billingDetailsData : any;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService, 
    public commonService: CommonService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.getAppointmentDetails()
    this.loadInsuranceForm()
    this.insuranceForm.disable()
  }

  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: { payViaInsuranceInfo: 1,adminPayViaInsuranceInfo:1, patientId:1, caseName:1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo
          if(response.data.appointmentData?.adminPayViaInsuranceInfo){
            this.insuranceInfo = response.data.appointmentData?.adminPayViaInsuranceInfo
          }
          console.log("this.insuranceInfo>>>",this.insuranceInfo)

          console.log("this.appointmentData>>>",this.appointmentData)
          await this.getBillingDetails(this.appointmentData?.patientId?._id,this.appointmentData?.caseName).catch(_err=>false)
          if(this.isBillingDetailsData){
            this.loadBillingInsuranceData(this.billingDetailsData)
          }else{
            this.loadInsuranceData(this.insuranceInfo)
          }
        }
      })
    }
  }

  getBillingDetails(patientId:any, caseName:string){
      this.isBillingDetailsData = false
      return new Promise(async (resolve, reject) => {
        let billingDetailsQuery:any = {
          patientId : patientId,
          caseName : caseName
        }
        this.authService.apiRequest('post', 'appointment/getBillingDetails', billingDetailsQuery).subscribe(async response => {  
          let { error, data } = response
          if(data && data!=null ){
            this.isBillingDetailsData = true
            this.billingDetailsData = data
          }
          resolve(true)
        },(err) => {
          reject()
        })
      })
  }

  loadInsuranceForm(){
    this.insuranceForm = this.fb.group({
      subscriberFirstName: [''],
      subscriberMiddleName: [''],
      subscriberLastName: [''],
      subscriberDob: [''],
      subscriberRelationWithPatient: [''],
      primaryInsuranceCompany: [''],
      primaryInsuranceIdPolicy: [''],
      primaryInsuranceGroup: [''],
      primaryInsuranceCustomerServicePh: [''],
      primaryInsuranceFromDate: [''],
      primaryInsuranceToDate: [''],
      secondaryInsuranceCompany: [''],
      secondaryInsuranceIdPolicy: [''],
      secondaryInsuranceGroup: [''],
      secondaryInsuranceCustomerServicePh: [''],
      secondaryInsuranceFromDate: [''],
      secondaryInsuranceToDate: [''],
      injuryRelelatedTo: [''],
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
      attorneyName: [''],
      attorneyPhone: [''],
      otherPersonalInjury:['']
    });
  }

  loadInsuranceData(insuranceInfo:any){
    console.log("insuranceInfo?.subscriberDob>>>",insuranceInfo?.subscriberDob)
    this.insuranceForm.controls['subscriberFirstName'].setValue(insuranceInfo ? insuranceInfo?.subscriberFirstName : '');
    this.insuranceForm.controls['subscriberMiddleName'].setValue(insuranceInfo ? insuranceInfo?.subscriberMiddleName : '');
    this.insuranceForm.controls['subscriberLastName'].setValue(insuranceInfo ? insuranceInfo?.subscriberLastName : '');
    this.insuranceForm.controls['subscriberDob'].setValue(insuranceInfo ? insuranceInfo?.subscriberDob : '');
    this.insuranceForm.controls['subscriberRelationWithPatient'].setValue(insuranceInfo ? insuranceInfo?.subscriberRelationWithPatient : '');

    this.insuranceForm.controls['primaryInsuranceCompany'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceCompany : '');
    this.insuranceForm.controls['primaryInsuranceIdPolicy'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceIdPolicy : '');
    this.insuranceForm.controls['primaryInsuranceGroup'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceGroup : '');
    this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceCustomerServicePh : '');
    this.insuranceForm.controls['primaryInsuranceFromDate'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceFromDate : '');
    this.insuranceForm.controls['primaryInsuranceToDate'].setValue(insuranceInfo ? insuranceInfo?.primaryInsuranceToDate : '');

    this.insuranceForm.controls['secondaryInsuranceCompany'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceCompany : '');
    this.insuranceForm.controls['secondaryInsuranceIdPolicy'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceIdPolicy : '');
    this.insuranceForm.controls['secondaryInsuranceGroup'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceGroup : '');
    this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceCustomerServicePh : '');
    this.insuranceForm.controls['secondaryInsuranceFromDate'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceFromDate : '');
    this.insuranceForm.controls['secondaryInsuranceToDate'].setValue(insuranceInfo ? insuranceInfo?.secondaryInsuranceToDate : '');

    this.insuranceForm.controls['injuryRelelatedTo'].setValue(insuranceInfo ? insuranceInfo?.injuryRelelatedTo : '');

    if(insuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
      this.isInjuryRelatedToWorkers = true
      this.insuranceForm.controls['carrierName'].setValue(insuranceInfo ? insuranceInfo?.carrierName : '');
      this.insuranceForm.controls['dateOfInjury'].setValue(insuranceInfo ? insuranceInfo?.dateOfInjury : '');
      this.insuranceForm.controls['insuranceState'].setValue(insuranceInfo ? insuranceInfo?.insuranceState : '');
      this.insuranceForm.controls['claim'].setValue(insuranceInfo ? insuranceInfo?.claim : '');
      this.insuranceForm.controls['adjusterName'].setValue(insuranceInfo ? insuranceInfo?.adjusterName : '');
      this.insuranceForm.controls['adjusterPhone'].setValue(insuranceInfo ? insuranceInfo?.adjusterPhone : '');
      this.insuranceForm.controls['reportedEmployer'].setValue(insuranceInfo ? insuranceInfo?.reportedEmployer : '');
      this.insuranceForm.controls['employerName'].setValue(insuranceInfo ? insuranceInfo?.employerName : '');
      this.insuranceForm.controls['employerPhone'].setValue(insuranceInfo ? insuranceInfo?.employerPhone : '');
      this.insuranceForm.controls['employerAddress'].setValue(insuranceInfo ? insuranceInfo?.employerAddress : '');
    }

    if(insuranceInfo?.injuryRelelatedTo=="Other Personal Injury"){
      this.isOtherPersonalInjury = true
      this.insuranceForm.controls['otherPersonalInjury'].setValue(insuranceInfo ? insuranceInfo?.otherPersonalInjury : '');
    }

    this.insuranceForm.controls['attorneyName'].setValue(insuranceInfo ? insuranceInfo?.attorneyName : '');
    this.insuranceForm.controls['attorneyPhone'].setValue(insuranceInfo ? insuranceInfo?.attorneyPhone : '');
    
  }


  loadBillingInsuranceData(insuranceInfo:any){
    this.insuranceForm.controls['subscriberFirstName'].setValue(insuranceInfo ? insuranceInfo?.subscriberFirstName : '');
    this.insuranceForm.controls['subscriberMiddleName'].setValue(insuranceInfo ? insuranceInfo?.subscriberMiddleName : '');
    this.insuranceForm.controls['subscriberLastName'].setValue(insuranceInfo ? insuranceInfo?.subscriberLastName : '');
    this.insuranceForm.controls['subscriberDob'].setValue(insuranceInfo ? insuranceInfo?.subscriberDob : '');
    this.insuranceForm.controls['subscriberRelationWithPatient'].setValue(insuranceInfo ? insuranceInfo?.subscriberRelationWithPatient : '');

    this.insuranceForm.controls['primaryInsuranceCompany'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.primaryInsurance : '');
    this.insuranceForm.controls['primaryInsuranceIdPolicy'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_idPolicy : '');
    this.insuranceForm.controls['primaryInsuranceGroup'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_group : '');
    this.insuranceForm.controls['primaryInsuranceCustomerServicePh'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_customerServicePhNo : '');
    this.insuranceForm.controls['primaryInsuranceFromDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_effectiveDate : '');
    this.insuranceForm.controls['primaryInsuranceToDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_effectiveDate : '');

    this.insuranceForm.controls['secondaryInsuranceCompany'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.secondaryInsurance : '');
    this.insuranceForm.controls['secondaryInsuranceIdPolicy'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_idPolicy : '');
    this.insuranceForm.controls['secondaryInsuranceGroup'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_group : '');
    this.insuranceForm.controls['secondaryInsuranceCustomerServicePh'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_customerServicePhNo : '');
    this.insuranceForm.controls['secondaryInsuranceFromDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_effectiveDate : '');
    this.insuranceForm.controls['secondaryInsuranceToDate'].setValue(this.isBillingDetailsData? this.billingDetailsData?.SI_endDate : '');

    this.insuranceForm.controls['injuryRelelatedTo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_injuryRelatedTo : '');

    if(this.billingDetailsData?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)"){
      this.isInjuryRelatedToWorkers = true
      this.insuranceForm.controls['carrierName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_carrierName : '');
      this.insuranceForm.controls['dateOfInjury'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_dateOfInjury : '');
      this.insuranceForm.controls['insuranceState'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_state : '');
      this.insuranceForm.controls['claim'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_claim : '');
      this.insuranceForm.controls['adjusterName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_adjusterName : '');
      this.insuranceForm.controls['adjusterPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_adjusterPhone : '');
      this.insuranceForm.controls['reportedEmployer'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_reportedToEmployer : '');
      this.insuranceForm.controls['employerName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerName : '');
      this.insuranceForm.controls['employerPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerPhone : '');
      this.insuranceForm.controls['employerAddress'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerAddress : '');
    }

    // if(this.billingDetailsData?.RP_injuryRelatedTo=="Other Personal Injury"){
    //   this.isOtherPersonalInjury = true
    //   this.insuranceForm.controls['otherPersonalInjury'].setValue(this.isBillingDetailsData ? insuranceInfo?.otherPersonalInjury : '');
    // }

    this.insuranceForm.controls['attorneyName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.AI_attorneyName : '');
    this.insuranceForm.controls['attorneyPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.AI_attorneyPhone : '');
    
  }



}
