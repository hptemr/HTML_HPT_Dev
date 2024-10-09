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
        fields: { payViaInsuranceInfo: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo
          console.log("this.insuranceInfo>>>",this.insuranceInfo)
         
          this.loadInsuranceData(this.insuranceInfo)
        }
      })
    }
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


}
