import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SelectPrimaryInsuModalComponent } from 'src/app/shared/comman/select-primary-insu-modal/select-primary-insu-modal.component';
import { ManageAuthrizationModalComponent } from './manage-authrization-modal/manage-authrization-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../utils/validation-messages';
import { regex } from '../../../../utils/regex-patterns';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.scss'
})
export class BillingDetailsComponent {
  validationMessages = validationMessages; 
  model: NgbDateStruct;
  appointmentId:string='';
  insuranceInfo:any;
  selectedPrimaryInsuranceData:any
  selectedSecondaryInsuranceData:any
  selectedThirdInsuranceData:any
  billingDetailsForm: FormGroup;
  PICustServPhoneNumber: string = '';
  effectiveSelectedDate: any = ''
  SICustServPhoneNumber: string = '';
  SIAuthFromDate: any = ''
  SIEffectiveSelectedDate: any = ''

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, 
    private commonService:CommonService,
    private authService:AuthService,
    private fb: FormBuilder, 
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.initializeBillingDetailsForm()
    this.getAppointmentDetails()
  }

  initializeBillingDetailsForm(){
    this.billingDetailsForm = this.fb.group({
      primaryInsurance: ['', [Validators.required]],
      PI_idPolicy: ['', [Validators.required]],
      PI_numberOfVisit: ['',[Validators.pattern(regex.onlyNumeric)]],
      PI_group:['', [Validators.required]],
      PI_customerServicePhNo:['', [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      PI_effectiveDate: ['',[Validators.required]],
      PI_endDate: ['',[Validators.required]],
      PI_rxRequired: [''],
      PI_copayAmt: ['',[Validators.pattern(regex.numericWithDecimal)]],
      PI_highDeductible: ['',[Validators.pattern(regex.numericWithDecimal)]],
      PI_deductibleNetAmt: ['',[Validators.pattern(regex.numericWithDecimal)]],
      PI_turnOnModifier: [''],
      PI_hardSoftCap: [''],
      PI_hardSoftCapText: [''],
      PI_passportApprovalTo: [''],
      PI_passportApprovalFrom: [''],
      PI_passportProvider: [''],

      secondaryInsurance: ['', [Validators.required]],
      SI_idPolicy: ['', [Validators.required]],
      SI_group: ['', [Validators.required]],
      SI_customerServicePhNo:['', [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      SI_authorization: ['', [Validators.required]],
      SI_authorizationFromDate: ['', [Validators.required]],
      SI_authorizationToDate: ['', [Validators.required]],
      SI_effectiveDate: ['', [Validators.required]],
      SI_endDate:['', [Validators.required]],
      SI_rxRequired: ['', [Validators.required]],
      SI_copayAmt: ['',[Validators.pattern(regex.numericWithDecimal)]],
      SI_highDeductible: ['',[Validators.pattern(regex.numericWithDecimal)]],
      SI_deductibleNetAmt: ['',[Validators.pattern(regex.numericWithDecimal)]],
      SI_hardSoftCap: ['',[Validators.required]],
      SI_hardSoftCapText: [''],

      // RP_relationWithPatient: ['', []],
      // RP_otherRelation: ['', []],
      // RP_firstName: ['', []],
      // RP_middleName: ['', []],
      // RP_lastName: ['', []],
      // RP_dob: ['', []],
      // RP_maritalStatus: ['', []],
      // RP_gender: ['', []],
      // RP_email: ['', []],
      // RP_phoneNo: ['', []],
      // RP_cellPhoneNo: ['', []],
      // RP_workExtension: ['', []],
      // RP_injuryRelatedTo: ['', []],
      // RP_carrierName: ['', []],
      // RP_dateOfInjury: ['', []],
      // RP_state: ['', []],
      // RP_claim: ['', []],
      // RP_adjusterName: ['', []],
      // RP_reportedToEmployer: ['', []],

      // EI_employerName: ['', []],
      // EI_employerPhone: ['', []],
      // EI_employerAddress: ['', []],

      // AI_attorneyName: ['', []],
      // AI_attorneyPhone: ['', []],
      // AI_attorneyAddress: ['', []],
      // inCollection:['', []]
    });
  }

  saveBillingDetails(){
    console.log("billingDetailsForm>>>",this.billingDetailsForm.value)
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
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo
        }
      })
    }
  }

  selectInsuranceModal(insuranceType:string) {
    let insuranceTitle = (insuranceType=='primary') ?'Primary Insurance' : 
    (insuranceType=='secondary')? 'Secondary Insurance':
    (insuranceType=='third')? 'Third Insurance':''

    const dialogRef = this.dialog.open(SelectPrimaryInsuModalComponent,{
      disableClose: true,
      width:'650px',
      panelClass: [ 'modal--wrapper'],
      data: {
        page:'BT-BillingDetails',
        title: insuranceTitle,
        insuranceType: insuranceType,
        insuranceInfo: this.insuranceInfo
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log("selectInsuranceModal1>>>>>",result)
        if(insuranceType=='primary'){ 
          this.selectedPrimaryInsuranceData = result 
          this.billingDetailsForm.controls['primaryInsurance'].setValue(result?.insuranceName)
        }
        if(insuranceType=='secondary'){ 
          this.selectedSecondaryInsuranceData = result 
          this.billingDetailsForm.controls['secondaryInsurance'].setValue(result?.insuranceName)
        }
        if(insuranceType=='third'){ this.selectedThirdInsuranceData = result }
      }
    });
  }

  manageAutorizationModal(){
    const dialogRef = this.dialog.open(ManageAuthrizationModalComponent,{
      width:'850px',
      panelClass: [ 'modal--wrapper'],
    });
  }

  // ==== Other supported functions =====
  onEffectiveDateChange(event: any) {
    let selectedDate = new Date(event.value);
    this.effectiveSelectedDate = selectedDate;
  }

  onSIAuthFromDateChange(event: any) {
    let selectedDate = new Date(event.value);
    console.log("onSIAuthFromDateChange>>>",selectedDate )
    this.SIAuthFromDate = selectedDate;
  }

  onSIEffectiveDateChange(event: any) {
    let selectedDate = new Date(event.value);
    this.SIEffectiveSelectedDate = selectedDate;
  }

  PICustServPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.PICustServPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  SICustServPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.SICustServPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }
}
