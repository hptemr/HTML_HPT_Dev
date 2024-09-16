import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router } from '@angular/router';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { s3Details, practiceLocations } from 'src/app/config';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { validationMessages } from '../../../../utils/validation-messages';
export class lists {
  constructor(public id: string, public firstName: string,public lastName: string,public status: string,public patientName: string, public patientEmail: string,public profileImage: string) {}
}
export class caselist {
  constructor(public caseName: string, public caseType: string) {}
}

@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  model: NgbDateStruct;
  selectedValue: string;
  selectedAppTypeValue: string;
  casenameList:caselist[] = [];
  whereCond: any = {}
  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  seachByPname: any = ''
  public patientList:lists[] = []
  appointmentForm: FormGroup;
  caseNameFlag:boolean=false;
  caseNameOtherFlag:boolean=true;
  convertPhoneNumber: string = '';
  practiceLocationData: string[] = practiceLocations
  validationMessages = validationMessages
  clickOnRequestAppointment:boolean=false;
  patientId: string;
  therapistList:any=[];
  orderBy: any = { updatedAt: -1 }
  invalidEmailErrorMessage: string = '';
  emailError:boolean = false;
  constructor(  public dialog: MatDialog, private fb: FormBuilder, private router: Router,public authService: AuthService,public commonService: CommonService) {}

  ngOnInit() {    
    if(this.userRole!='support_team'){
      this.router.navigate([''])
    }
   
    this.appointmentForm = this.fb.group({
      patientType: ['New', [Validators.required]],
      seachByPname: [''],
      caseName: ['Other', [Validators.required]],
      caseType: ['', [Validators.required]],
      caseNameOther: ['',Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],    
      phoneNumber: ['', []],
      doctorId: ['',[]],    
      appointmentType: [''],
      appointmentTypeOther: [''],      
    });
    this.getTherapistList()
  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
    this.appointmentForm.controls['caseNameOther'].setValue('');
    if(this.selectedValue=='New'){
      this.appointmentForm.controls['firstName'].setValue('');
      this.appointmentForm.controls['lastName'].setValue('');
      this.appointmentForm.controls['email'].setValue('');

      this.appointmentForm.controls['firstName'].enable();
      this.appointmentForm.controls['lastName'].enable();
      
      this.appointmentForm.controls['email'].enable();
      this.appointmentForm.controls['caseType'].reset();
      this.caseNameFlag = false;
      this.caseNameOtherFlag = true;
      this.appointmentForm.controls['caseName'].setValidators([]);
    }else{
      this.caseNameFlag = true;
      this.caseNameOtherFlag = false;
      this.appointmentForm.controls['caseName'].setValidators([Validators.required]);
    }
  }

  onAppointmentTypeChange(value: any) {
    this.selectedAppTypeValue = value
  }

  async createAppointment(formData:any){
    console.log('formData>>>',formData)
    if (this.appointmentForm.valid) {
        //this.clickOnRequestAppointment = true
        this.commonService.showLoader();
       
        if(formData.patientType=='Existing'){
          Object.assign(formData, {patientId: this.patientId})
        }
  
        delete formData.seachByPname;
      console.log('#####formData>>>',formData)
        let reqVars = {
          requestId:'',
          userId: this.userId,
          data: formData,
          patientType:formData.patientType
        }
        this.emailError = false; this.invalidEmailErrorMessage = '';   
        this.authService.apiRequest('post', 'appointment/createAppointment', reqVars).subscribe(async (response) => {
        this.clickOnRequestAppointment = false;
        this.commonService.hideLoader();
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
          }
          if(response.data.email){
            this.appointmentForm.controls["email"].markAsTouched();
            //this.appointmentForm.controls['email'].setValue('');
            this.emailError = true;
            this.invalidEmailErrorMessage = response.data.email;
          }
        } else {
          if (response.message) {
            this.successModal(response.message);
            this.commonService.openSnackBar(response.message, "SUCCESS");
          }
        }
      })
    }else{
        this.appointmentForm.markAllAsTouched();
        return;  
    }
  }

  searchRecords(event: any, colName: string) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }      
      if (colName == 'byPname') {
        let firstName = finalStr;
        let lastName = finalStr;
        let final_str = searchStr.trim().split(' ');
        if(final_str[0] && final_str[1]){
          firstName =  { $regex: final_str[0], $options: 'i' }
          lastName =  { $regex: final_str[1], $options: 'i' }
        }
        this.whereCond = {
          status: "Active",
          $or: [{ firstName: firstName }, { lastName: lastName }, { email: finalStr }]
        }
      } 
      this.getPatientsList()
    } else {
      this.whereCond = {};
    }
  }

  async getPatientsList(){
   // this.commonService.showLoader()
    let reqVars = {
      query: this.whereCond,
      fields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1 },     
    }
    await this.authService.apiRequest('post', 'patients/searchPatientList', reqVars).subscribe(async response => {
     // this.commonService.hideLoader()
      let finalData: any = []
      if (response.data && response.data.patientList && response.data.patientList.length > 0) {
        await response.data.patientList.map((element: any) => {
          let newColumns = {
            id: element._id,          
            status: element.status,
            firstName: element.firstName,
            lastName:element.lastName,
            patientName: element.firstName + " " + element.lastName,
            patientEmail: element.email,
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage          
          }
          finalData.push(newColumns)
        })
      }
      this.patientList = finalData;    
    })
  }

  selectPatient(id: string): any {
    if(this.patientList.length>0) {
      let selected = this.patientList.find(item => typeof item === 'object' && item.id === id) || null;
      if(selected) {
        this.appointmentForm.controls['firstName'].setValue(selected.firstName);
        this.appointmentForm.controls['lastName'].setValue(selected.lastName);
        this.appointmentForm.controls['email'].setValue(selected.patientEmail);

        this.appointmentForm.controls['firstName'].disable()
        this.appointmentForm.controls['lastName'].disable()
        this.appointmentForm.controls['email'].disable()

        this.patientId = id;
        this.appointmentForm.controls['caseType'].reset();
        this.appointmentForm.controls['caseName'].reset('');
        this.appointmentForm.controls['caseNameOther'].reset('');
        this.getCaseList(id)
      }    
    }
  }

  async getCaseList(id: string){
    if(id){
      let reqVars = {
        query: {id:id},
        fields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1 },     
      }
      await this.authService.apiRequest('post', 'appointment/getPatientCaseList', reqVars).subscribe(async response => {
        if (response.data && response.data.caseNameList && response.data.caseNameList.length > 0) {
          this.casenameList = response.data.caseNameList
        }
      })
    }
   }


   async getTherapistList() {
    const reqVars = {
      query: { role: 'therapist', status: 'Active' },
      fields: { _id: 1, firstName: 1, lastName: 1 },
      order: this.orderBy,
    }
    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      if (response.data && response.data.therapistData) {
        this.therapistList = response.data.therapistData;
      }
    })
  }

   onCaseSelected(value: any) {
    this.caseNameOtherFlag = false
    this.appointmentForm.controls['caseNameOther'].setValidators([]);
    this.appointmentForm.controls['caseType'].setValue('');
    if(value=='Other'){
     this.caseNameOtherFlag = true
     this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
    }else{    
      let selected = this.casenameList.find(item => typeof item === 'object' && item.caseName === value) || null;
      if(selected && selected.caseType){
        this.appointmentForm.controls['caseType'].setValue(selected.caseType);
      }      
    }   
   }

   onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  successModal(successMsg:string) {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote:successMsg
      }
    })
    dialogRef.afterClosed().subscribe(async id => {
      this.router.navigate(['/support-team/cases'])
    });
    
  }

}
