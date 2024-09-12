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

@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  model: NgbDateStruct;
  selectedValue: string;
  selectedAppTypeValue: string;
  casenameList:any = [];
  whereCond: any = {}
  public userId: string = this.authService.getLoggedInInfo('_id');
  seachByPname: any = ''
  public patientList:lists[] = []
  appointmentForm: FormGroup;
  caseNameOtherFlag:boolean=false;
  convertPhoneNumber: string = '';
  practiceLocationData: string[] = practiceLocations
  validationMessages = validationMessages
  clickOnRequestAppointment:boolean=false;
  patientId: string;
  therapistList:any=[];
  orderBy: any = { updatedAt: -1 }
  constructor(  public dialog: MatDialog, private fb: FormBuilder, private router: Router,public authService: AuthService,public commonService: CommonService) {}

  ngOnInit() {    
    this.appointmentForm = this.fb.group({
      caseName: ['', [Validators.required]],
      caseNameOther: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],    
      phoneNumber: ['', [Validators.required]],
      doctorId: ['',[Validators.required]],    
      appointmentType: [''],
      appointmentTypeOther: [''],      
    });
    this.getTherapistList()
  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
  }

  onAppointmentTypeChange(value: any) {
    this.selectedAppTypeValue = value
  }

  async createAppointment(formData:any){
    if (this.appointmentForm.valid) {
        //this.clickOnRequestAppointment = true
        this.commonService.showLoader();
       
        let patientText = 'Existing'
        //patientText = 'New'

        if(patientText=='Existing'){
          Object.assign(formData, {patientId: this.patientId})
        }

        let reqVars = {
          requestId:'',
          userId: this.userId,
          data: formData,
          signup:patientText
        }
        
        this.commonService.showLoader();       
        this.authService.apiRequest('post', 'appointment/createAppointment', reqVars).subscribe(async (response) => {
        this.clickOnRequestAppointment = false;
        this.commonService.hideLoader();
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
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
    if(this.patientList.length>0){
      let selected = this.patientList.find(item => typeof item === 'object' && item.id === id) || null;
        //id     status      patientName    patientEmail   profileImage
      if(selected){
        this.appointmentForm.controls['firstName'].setValue(selected.firstName);
        this.appointmentForm.controls['lastName'].setValue(selected.lastName);
        this.appointmentForm.controls['email'].setValue(selected.patientEmail);

        this.appointmentForm.controls['firstName'].disable()
        this.appointmentForm.controls['lastName'].disable()
        this.appointmentForm.controls['email'].disable()

        this.patientId = id;
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
    if(value=='Other'){
     this.caseNameOtherFlag = true
     this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
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
