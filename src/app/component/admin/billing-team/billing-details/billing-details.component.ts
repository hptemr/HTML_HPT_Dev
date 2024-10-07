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
import { carrierNameList, maritalStatus, practiceLocations, relationWithPatient } from 'src/app/config';
import { states_data } from 'src/app/state';

interface State {
  state: string;
  state_code: string;
}
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
  todayDate = new Date()
  RPPhoneNumber: string = '';
  RPCellPhoneNumber: string = '';
  RPWorkExtension: string = '';
  isWorkerCompensationInjury: boolean=false
  carrierNameList = carrierNameList
  states: State[] = states_data
  RPAdjusterPhone: string = '';
  EIEmployerPhone: string = '';
  AIAttorneyPhone: string = '';
  mat_icon:string='add_circle'
  TICustServPhoneNumber: string = '';
  TIAuthFromDate: any = ''
  TIEffectiveSelectedDate: any = ''
  caseName:string =''
  patientId:string =''
  billingDetailsData : any;
  isBillingDetailsData:boolean= false

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, 
    private commonService:CommonService,
    private authService:AuthService,
    private fb: FormBuilder, 
    private router:Router
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

      RP_relationWithPatient: ['', []],
      RP_otherRelation: ['', []],
      RP_firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      RP_middleName: ['', [Validators.pattern(regex.alphabetic)]],
      RP_lastName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      RP_dob: ['', [Validators.required]],
      RP_maritalStatus: ['', []],
      RP_gender: ['', [Validators.required]],
      RP_email: ['', [Validators.required,Validators.email]],
      RP_phoneNo: ['', [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      RP_cellPhoneNo: ['', [Validators.pattern(regex.usPhoneNumber)]],
      RP_workExtension: ['', [Validators.pattern(regex.usPhoneNumber)]],
      RP_injuryRelatedTo: ['', []],

      AI_attorneyName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      AI_attorneyPhone: ['', [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      AI_attorneyAddress: ['', [Validators.required]],
      inCollection:['No', [Validators.required]]
    });
  }

  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: { payViaInsuranceInfo: 1, caseName: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.insuranceInfo = response.data.appointmentData?.payViaInsuranceInfo
          this.patientId = response.data.appointmentData?.patientId._id
          this.caseName = response.data.appointmentData?.caseName
          this.getBillingDetails(this.patientId,this.caseName)
        }
      })
    }
  }

  saveBillingDetails(){
    this.commonService.showLoader();
    let billingDetailsObj:any = {
      billingDetails : this.billingDetailsForm.value,
      patientId : this.patientId,
      caseName : this.caseName
    }

    this.authService.apiRequest('post', 'appointment/addBillingDetails', billingDetailsObj).subscribe(async response => {  
      this.commonService.openSnackBar(response.message, "SUCCESS")
      this.commonService.hideLoader(); 
      this.router.navigate(['/support-team/case-details',this.appointmentId])
    },(err) => {
      this.commonService.hideLoader();
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }
  
  getBillingDetails(patientId:any, caseName:string){
    this.isBillingDetailsData = false
    let billingDetailsQuery:any = {
      patientId : patientId,
      caseName : caseName
    }
    this.authService.apiRequest('post', 'appointment/getBillingDetails', billingDetailsQuery).subscribe(async response => {  
      console.log("getBillingDetails>>>",response)
      let { error, data } = response
      if(data && data!=null ){
        this.isBillingDetailsData = true
        this.billingDetailsData = data
      }
      this.setDataToBillingDetails()
      this.commonService.hideLoader(); 
    },(err) => {
      this.commonService.hideLoader();
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  setDataToBillingDetails(){
    // let filledBillingDetailsData = this.insuranceInfo
    // if(this.isBillingDetailsData){
    //   filledBillingDetailsData = this.billingDetailsData
    // }

    console.log("this.isBillingDetailsData>>>",this.isBillingDetailsData)
    this.billingDetailsForm.controls['primaryInsurance'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.primaryInsurance : this.insuranceInfo?.primaryInsuranceCompany);
    this.billingDetailsForm.controls['PI_idPolicy'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_idPolicy : this.insuranceInfo?.primaryInsuranceIdPolicy);
    this.billingDetailsForm.controls['PI_numberOfVisit'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_numberOfVisit : '');
    this.billingDetailsForm.controls['PI_group'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_group : this.insuranceInfo?.primaryInsuranceGroup);
    this.billingDetailsForm.controls['PI_customerServicePhNo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_customerServicePhNo : this.insuranceInfo?.primaryInsuranceCustomerServicePh);
    this.billingDetailsForm.controls['PI_effectiveDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_effectiveDate : this.insuranceInfo?.primaryInsuranceFromDate);
    this.billingDetailsForm.controls['PI_endDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_endDate : this.insuranceInfo?.primaryInsuranceToDate);
    this.billingDetailsForm.controls['PI_rxRequired'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_rxRequired : '');
    this.billingDetailsForm.controls['PI_copayAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_copayAmt : '');
    this.billingDetailsForm.controls['PI_highDeductible'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_highDeductible : '');
    this.billingDetailsForm.controls['PI_deductibleNetAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_deductibleNetAmt : '');
    this.billingDetailsForm.controls['PI_turnOnModifier'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_turnOnModifier : '');
    this.billingDetailsForm.controls['PI_hardSoftCap'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_hardSoftCap : '');
    this.billingDetailsForm.controls['PI_hardSoftCapText'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_hardSoftCapText : '');
    this.billingDetailsForm.controls['PI_passportApprovalTo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_passportApprovalTo : '');
    this.billingDetailsForm.controls['PI_passportApprovalFrom'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_passportApprovalFrom : '');
    this.billingDetailsForm.controls['PI_passportProvider'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.PI_passportProvider : '');

    this.billingDetailsForm.controls['secondaryInsurance'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.secondaryInsurance : this.insuranceInfo?.secondaryInsuranceCompany);
    this.billingDetailsForm.controls['SI_idPolicy'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_idPolicy : this.insuranceInfo?.secondaryInsuranceIdPolicy);
    this.billingDetailsForm.controls['SI_group'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_group : this.insuranceInfo?.secondaryInsuranceGroup);
    this.billingDetailsForm.controls['SI_customerServicePhNo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_customerServicePhNo : this.insuranceInfo?.secondaryInsuranceCustomerServicePh);
    this.billingDetailsForm.controls['SI_authorization'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_authorization : "");
    this.billingDetailsForm.controls['SI_authorizationFromDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_authorizationFromDate : "");
    this.billingDetailsForm.controls['SI_authorizationToDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_authorizationToDate : "");
    this.billingDetailsForm.controls['SI_effectiveDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_effectiveDate : this.insuranceInfo?.secondaryInsuranceFromDate);
    this.billingDetailsForm.controls['SI_endDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_endDate : this.insuranceInfo?.secondaryInsuranceToDate);
    this.billingDetailsForm.controls['SI_rxRequired'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_rxRequired : "");
    this.billingDetailsForm.controls['SI_copayAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_copayAmt : "");
    this.billingDetailsForm.controls['SI_highDeductible'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_highDeductible : "");
    this.billingDetailsForm.controls['SI_deductibleNetAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_deductibleNetAmt : "");
    this.billingDetailsForm.controls['SI_hardSoftCap'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_hardSoftCap : "");
    this.billingDetailsForm.controls['SI_hardSoftCapText'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.SI_hardSoftCapText : "");

    this.billingDetailsForm.controls['RP_relationWithPatient'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_relationWithPatient : "");
    this.billingDetailsForm.controls['RP_otherRelation'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_otherRelation : "");
    this.billingDetailsForm.controls['RP_firstName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_firstName : "");
    this.billingDetailsForm.controls['RP_middleName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_middleName : "");
    this.billingDetailsForm.controls['RP_lastName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_lastName : "");
    this.billingDetailsForm.controls['RP_dob'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_dob : "");
    this.billingDetailsForm.controls['RP_maritalStatus'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_maritalStatus : "");
    this.billingDetailsForm.controls['RP_gender'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_gender : "");
    this.billingDetailsForm.controls['RP_email'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_email : "");
    this.billingDetailsForm.controls['RP_phoneNo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_phoneNo : "");
    this.billingDetailsForm.controls['RP_cellPhoneNo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_cellPhoneNo : "");
    this.billingDetailsForm.controls['RP_workExtension'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_workExtension : "");
    this.billingDetailsForm.controls['RP_injuryRelatedTo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_injuryRelatedTo : "");

    this.billingDetailsForm.controls['AI_attorneyName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.AI_attorneyName : this.insuranceInfo?.attorneyName);
    this.billingDetailsForm.controls['AI_attorneyPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.AI_attorneyPhone : this.insuranceInfo?.attorneyPhone);
    this.billingDetailsForm.controls['AI_attorneyAddress'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.AI_attorneyAddress : "");
    this.billingDetailsForm.controls['inCollection'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.inCollection : "");

    if(this.isBillingDetailsData && this.billingDetailsData?.thirdInsurance){
      this.addThirdInsurance('add_circle')
    }

    if(this.isBillingDetailsData && this.billingDetailsData?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)"){
      this.onChangeInjuryRelated({value:"Worker's Compensation (WCOMP)"})
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
        if(insuranceType=='third'){ 
          this.selectedThirdInsuranceData = result 
          this.billingDetailsForm.controls['thirdInsurance'].setValue(result?.insuranceName)
        }
      }
    });
  }

  manageAutorizationModal(){
    const dialogRef = this.dialog.open(ManageAuthrizationModalComponent,{
      disableClose: true,
      width:'850px',
      panelClass: [ 'modal--wrapper'],
      data: {
        patientId : this.patientId,
        caseName : this.caseName
      }
    });

    // dialogRef.afterClosed().subscribe(async result => {});
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

  RPPhoneNumberInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.RPPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  RPCellPhoneNumberInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.RPCellPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  RPWorkExtensionInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.RPWorkExtension = this.commonService.formatPhoneNumber(inputElement.value);
  }

  RPAdjusterPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.RPAdjusterPhone = this.commonService.formatPhoneNumber(inputElement.value);
  }

  EIEmployerPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.EIEmployerPhone = this.commonService.formatPhoneNumber(inputElement.value);
  }

  AIAttorneyPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.AIAttorneyPhone = this.commonService.formatPhoneNumber(inputElement.value);
  }

  TICustServPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.TICustServPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  onTIAuthFromDateChange(event: any) {
    let selectedDate = new Date(event.value);
    console.log("onTIAuthFromDateChange>>>",selectedDate )
    this.TIAuthFromDate = selectedDate;
  }

  onTIEffectiveDateChange(event: any) {
    let selectedDate = new Date(event.value);
    this.TIEffectiveSelectedDate = selectedDate;
  }

  onChangeInjuryRelated(event: any){
    console.log("onChangeInjuryRelated>>>",event.value)
    this.isWorkerCompensationInjury = false
    if(event.value=="Worker's Compensation (WCOMP)"){
      this.isWorkerCompensationInjury = true
      this.addWorkerCompensationInjuryFieldsControls()
    }else{
      this.removeWorkerCompensationInjuryFieldsControls()
    }
  }

  addWorkerCompensationInjuryFieldsControls() {
    this.billingDetailsForm.addControl('RP_carrierName', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('RP_dateOfInjury', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('RP_state', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('RP_claim', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('RP_adjusterName', this.fb.control('', [Validators.required,Validators.pattern(regex.alphabetic)]));
    this.billingDetailsForm.addControl('RP_adjusterPhone', this.fb.control('', [Validators.required,Validators.pattern(regex.usPhoneNumber)]));
    this.billingDetailsForm.addControl('RP_reportedToEmployer', this.fb.control('', []));
    this.billingDetailsForm.addControl('EI_employerName', this.fb.control('', [Validators.required,Validators.pattern(regex.alphabetic)]));
    this.billingDetailsForm.addControl('EI_employerPhone', this.fb.control('', [Validators.required,Validators.pattern(regex.usPhoneNumber)]));
    this.billingDetailsForm.addControl('EI_employerAddress', this.fb.control('', [Validators.required]));

    if(this.isBillingDetailsData && this.billingDetailsData?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)"){
      this.setWorkerCompensationInjuryData()
    }
  }

  removeWorkerCompensationInjuryFieldsControls(){
    this.billingDetailsForm.removeControl('RP_carrierName');
    this.billingDetailsForm.removeControl('RP_dateOfInjury');
    this.billingDetailsForm.removeControl('RP_state');
    this.billingDetailsForm.removeControl('RP_claim');
    this.billingDetailsForm.removeControl('RP_adjusterName');
    this.billingDetailsForm.removeControl('RP_adjusterPhone');
    this.billingDetailsForm.removeControl('RP_reportedToEmployer');
    this.billingDetailsForm.removeControl('EI_employerName');
    this.billingDetailsForm.removeControl('EI_employerPhone');
    this.billingDetailsForm.removeControl('EI_employerAddress');
  }

  addThirdInsurance(action:any){
    console.log("action>>>",action)
    if(action=='add_circle'){
      this.mat_icon = 'remove_circle_outline'
      this.thirdInsuranceFieldsControls()
    }else{
      this.mat_icon = 'add_circle'
      this.removethirdInsuranceFieldsControls()
    }
  }

  thirdInsuranceFieldsControls() {
    this.billingDetailsForm.addControl('thirdInsurance', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_idPolicy', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_group', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_customerServicePhNo', this.fb.control('', [Validators.required,Validators.pattern(regex.usPhoneNumber)]));
    this.billingDetailsForm.addControl('TI_authorization', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_authorizationFromDate', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_authorizationToDate', this.fb.control('', [Validators.required]));

    this.billingDetailsForm.addControl('TI_effectiveDate', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_endDate', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_rxRequired', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_copayAmt', this.fb.control('', [Validators.pattern(regex.numericWithDecimal)]));
    this.billingDetailsForm.addControl('TI_highDeductible', this.fb.control('', [Validators.pattern(regex.numericWithDecimal)]));
    this.billingDetailsForm.addControl('TI_deductibleNetAmt', this.fb.control('', [Validators.pattern(regex.numericWithDecimal)]));
    this.billingDetailsForm.addControl('TI_hardSoftCap', this.fb.control('', [Validators.required]));
    this.billingDetailsForm.addControl('TI_hardSoftCapText', this.fb.control('', []));

    if(this.isBillingDetailsData && this.billingDetailsData?.thirdInsurance){
      this.setThirdInsuranceData()
    }
  }

  removethirdInsuranceFieldsControls(){
    this.billingDetailsForm.removeControl('thirdInsurance');
    this.billingDetailsForm.removeControl('TI_idPolicy');
    this.billingDetailsForm.removeControl('TI_group');
    this.billingDetailsForm.removeControl('TI_customerServicePhNo');
    this.billingDetailsForm.removeControl('TI_authorization');
    this.billingDetailsForm.removeControl('TI_authorizationFromDate');
    this.billingDetailsForm.removeControl('TI_authorizationToDate');

    this.billingDetailsForm.removeControl('TI_effectiveDate');
    this.billingDetailsForm.removeControl('TI_endDate');
    this.billingDetailsForm.removeControl('TI_rxRequired');
    this.billingDetailsForm.removeControl('TI_copayAmt');
    this.billingDetailsForm.removeControl('TI_highDeductible');
    this.billingDetailsForm.removeControl('TI_deductibleNetAmt');
    this.billingDetailsForm.removeControl('TI_hardSoftCap');
    this.billingDetailsForm.removeControl('TI_hardSoftCapText');
  }

  setThirdInsuranceData(){
    this.billingDetailsForm.controls['thirdInsurance'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.thirdInsurance : "");
    this.billingDetailsForm.controls['TI_idPolicy'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_idPolicy : "");
    this.billingDetailsForm.controls['TI_group'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_group : "");
    this.billingDetailsForm.controls['TI_customerServicePhNo'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_customerServicePhNo : "");
    this.billingDetailsForm.controls['TI_authorization'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_authorization : "");
    this.billingDetailsForm.controls['TI_authorizationFromDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_authorizationFromDate : "");
    this.billingDetailsForm.controls['TI_authorizationToDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_authorizationToDate : "");
    this.billingDetailsForm.controls['TI_effectiveDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_effectiveDate : "");
    this.billingDetailsForm.controls['TI_endDate'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_endDate : "");
    this.billingDetailsForm.controls['TI_rxRequired'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_rxRequired : "");
    this.billingDetailsForm.controls['TI_copayAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_copayAmt : "");
    this.billingDetailsForm.controls['TI_highDeductible'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_highDeductible : "");
    this.billingDetailsForm.controls['TI_deductibleNetAmt'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_deductibleNetAmt : "");
    this.billingDetailsForm.controls['TI_hardSoftCap'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_hardSoftCap : "");
    this.billingDetailsForm.controls['TI_hardSoftCapText'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.TI_hardSoftCapText : "");
  }

  setWorkerCompensationInjuryData(){
    this.billingDetailsForm.controls['RP_carrierName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_carrierName : "");
    this.billingDetailsForm.controls['RP_dateOfInjury'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_dateOfInjury : "");
    this.billingDetailsForm.controls['RP_state'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_state : "");
    this.billingDetailsForm.controls['RP_claim'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_claim : "");
    this.billingDetailsForm.controls['RP_adjusterName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_adjusterName : "");
    this.billingDetailsForm.controls['RP_adjusterPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_adjusterPhone : "");
    this.billingDetailsForm.controls['RP_reportedToEmployer'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.RP_reportedToEmployer : "");
    this.billingDetailsForm.controls['EI_employerName'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerName : "");
    this.billingDetailsForm.controls['EI_employerPhone'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerPhone : "");
    this.billingDetailsForm.controls['EI_employerAddress'].setValue(this.isBillingDetailsData ? this.billingDetailsData?.EI_employerAddress : "");
  }
}
