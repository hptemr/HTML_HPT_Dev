import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { relationWithPatient } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
@Component({
  selector: 'app-intake-step4',
  templateUrl: './intake-step4.component.html',
  styleUrl: './intake-step4.component.scss'
})
export class IntakeStep4Component {
  appId: any
  step4Form: FormGroup
  step4FormData: any
  relationWithPatient = relationWithPatient
  validationMessages = validationMessages
  emergencyContactList: any
  todayDate = new Date()
  //isFormEditable = true
  activeUserRoute = this.commonService.getLoggedInRoute()
  appointmentUpdateInfo:any=[];
  relationOtherFlag1:boolean=false;
  relationOtherFlag2:boolean=false;
  selectedIndex1:number=100
  selectedIndex2:number=101
  isReadonly:boolean = true
  userId = this.authService.getLoggedInInfo('_id')
  userRole = this.authService.getLoggedInInfo('role')
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  ngOnInit() {
    if (this.userRole== 'patient'){
      this.getEmergencyContactList(this.userId)
    }
    this.getAppointmentDetails()
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
        this.step4FormData = response.data.appointmentData.emergencyContact[0];
        if(this.userRole!='patient'){
          this.getEmergencyContactList(response.data?.appointmentData?.patientId);
        } 

        if(this.userRole!='patient' && response.data.appointmentData && response.data.appointmentData.adminEmergencyContact[0]){
          this.step4FormData = response.data.appointmentData.adminEmergencyContact[0];
        }
        this.appointmentUpdateInfo = response.data.appointmentData.appointmentUpdateInfo;
        this.loadForm()
        
        if (this.userRole== 'patient' && !response.data?.appointmentData?.intakeFormSubmit) {
          this.isReadonly = false
        }else if (this.userRole == 'support_team' && response.data?.appointmentData?.intakeFormSubmit) {
          this.isReadonly = false
        } else {
          this.isReadonly = true
          this.step4Form.disable()
        }
      
        this.commonService.hideLoader()
      }
    })
  }

  loadForm() {
    this.step4Form = new FormGroup({
      ec1FirstName: new FormControl((this.step4FormData ? this.step4FormData.ec1FirstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec1LastName: new FormControl((this.step4FormData ? this.step4FormData.ec1LastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec1Dob: new FormControl((this.step4FormData ? this.step4FormData.ec1Dob : ''), Validators.compose([Validators.required])),
      ec1RelationWithPatient: new FormControl((this.step4FormData ? this.step4FormData.ec1RelationWithPatient : '')),
      ec1OtherRelation: new FormControl((this.step4FormData ? this.step4FormData.ec1OtherRelation : '')),
      ec1PhoneNumber: new FormControl((this.step4FormData ? this.step4FormData.ec1PhoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      ec1myTreatmentCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec1myTreatmentCheckbox : false)),
      ec1myAccountCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec1myAccountCheckbox : false)),
      ec1myContactCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec1myContactCheckbox : false)),

      ec2FirstName: new FormControl((this.step4FormData ? this.step4FormData.ec2FirstName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec2LastName: new FormControl((this.step4FormData ? this.step4FormData.ec2LastName : ''), Validators.compose([Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
      ec2Dob: new FormControl((this.step4FormData ? this.step4FormData.ec2Dob : ''), Validators.compose([Validators.required])),
      ec2RelationWithPatient: new FormControl((this.step4FormData ? this.step4FormData.ec2RelationWithPatient : '')),
      ec2OtherRelation: new FormControl((this.step4FormData ? this.step4FormData.ec2OtherRelation : '')),
      ec2PhoneNumber: new FormControl((this.step4FormData ? this.step4FormData.ec2PhoneNumber : ''), Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])),
      ec2myTreatmentCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec2myTreatmentCheckbox : false)),
      ec2myAccountCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec2myAccountCheckbox : false)),
      ec2myContactCheckbox: new FormControl((this.step4FormData ? this.step4FormData.ec2myContactCheckbox : false)),
    })
    
    if(this.step4FormData && this.step4FormData?.ec1myContactCheckbox){
      this.step4Form.controls['ec1myContactCheckbox'].disable()
      
    }
    if(this.step4FormData && this.step4FormData?.ec2myContactCheckbox){
      this.step4Form.controls['ec2myContactCheckbox'].disable()
    }

  }

    onRelationSelected(value: any) {
    this.relationOtherFlag1 = false
    this.step4Form.controls['ec1OtherRelation'].setValidators([]);
    if(value=='Other'){
      this.relationOtherFlag1 = true
      this.step4Form.controls['ec1OtherRelation'].setValidators([Validators.required]); 
    }   
   }

   onRelation2Selected(value: any) {
    this.relationOtherFlag2 = false
    this.step4Form.controls['ec2OtherRelation'].setValidators([]);
    if(value=='Other'){
      this.relationOtherFlag2 = true
      this.step4Form.controls['ec2OtherRelation'].setValidators([Validators.required]); 
    }   
   }

  async getEmergencyContactList(patientId:string) {
    let reqVars = {
      query: { patientId: patientId },
      fields: { updatedAt: 0 },
      order: { firstName: 1 },
    }
    await this.authService.apiRequest('post', 'emergencyContact/getContactListData', reqVars).subscribe(async response => {
      this.emergencyContactList = response.data.emergencyContactList
    })
  }

  checkSpace(colName: any, event: any) {
    this.step4Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  getContact(formNumber: any, event: any) {
    let currentIndex = event.target.value
    this.step4Form.controls['ec1myContactCheckbox']?.enable()
    this.step4Form.controls['ec2myContactCheckbox']?.enable()
        if(formNumber==1){
          this.step4Form.controls['ec1myContactCheckbox']?.disable()
          this.selectedIndex1 = currentIndex;  
          if(event.target.value==''){this.selectedIndex1=100;        this.step4Form.controls['ec1myContactCheckbox']?.enable()  }
        }else if(formNumber==2){
          this.step4Form.controls['ec2myContactCheckbox']?.disable()
          this.selectedIndex2 = currentIndex;  
          if(event.target.value==''){this.selectedIndex2=101; this.step4Form.controls['ec2myContactCheckbox']?.enable()}
        }

        let firstName = ''
        let lastName = ''
        let dob = ''
        let relationWithPatient = ''
        let phoneNumber = ''
        let myTreatments = false
        let myAccounts = false
        if (currentIndex != '') {
          let ecObj = this.emergencyContactList[currentIndex]
          firstName = ecObj.firstName
          lastName = ecObj.lastName
          dob = ecObj.dob
          relationWithPatient = ecObj.relationWithPatient
          phoneNumber = ecObj.phoneNumber
          myTreatments = ecObj.myTreatmentCheckbox
          myAccounts = ecObj.myAccountCheckbox
        }
        this.step4Form.controls['ec' + formNumber + 'FirstName'].setValue(firstName)
        this.step4Form.controls['ec' + formNumber + 'LastName'].setValue(lastName)
        this.step4Form.controls['ec' + formNumber + 'Dob'].setValue(dob)
        this.step4Form.controls['ec' + formNumber + 'RelationWithPatient'].setValue(relationWithPatient)
        this.step4Form.controls['ec' + formNumber + 'PhoneNumber'].setValue(phoneNumber)
        this.step4Form.controls['ec' + formNumber + 'myTreatmentCheckbox'].setValue(myTreatments)
        this.step4Form.controls['ec' + formNumber + 'myAccountCheckbox'].setValue(myAccounts)
        this.step4Form.controls['ec' + formNumber + 'myContactCheckbox'].setValue(myAccounts)
  }

  async bookAppointmentStep4() {
    if (this.step4Form.invalid){
      console.log(this.isReadonly,' #### step4 Form>>>>>>',this.step4Form)
      this.step4Form.markAllAsTouched();
    }else{
      if (!this.isReadonly) {
          this.appointmentUpdateInfo.push({
            fromPatientId : (this.userRole=='patient') ? this.userId : '',
            fromAdminId:(this.userRole!='patient') ? this.userId : '',
            userRole:this.userRole,
            updatedAt:new Date()
          });
          let params = {
            query: {_id: this.appId},
            updateInfo: {emergencyContact: this.step4Form.value},
            appointmentUpdateInfo:this.appointmentUpdateInfo
          }
          await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
            this.router.navigate([this.activeUserRoute, 'intake-form', 'step-5', this.appId])
          })
      } else {
        this.router.navigate([this.activeUserRoute, 'intake-form', 'step-5', this.appId])
      }
    }
  }

  async nextStep() {
    this.router.navigate([this.activeUserRoute, 'intake-form', 'step-5', this.appId])
  }

}
