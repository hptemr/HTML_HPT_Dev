import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details, practiceLocations } from 'src/app/config';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { validationMessages } from '../../../../utils/validation-messages';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import * as moment from 'moment';
export class lists {
  constructor(public id: string, public firstName: string,public lastName: string,public status: string,public patientName: string, public patientEmail: string,public profileImage: string) {}
}
export class doctorlists {
  constructor(public id: string, public name: string,public npi: string) {}
}
export class caselist {
  constructor(public caseName: string, public caseType: string) {}
}
@Component({
  selector: 'app-create-appointment-modal', 
  templateUrl: './create-appointment-modal.component.html',
  styleUrl: './create-appointment-modal.component.scss'
})
export class CreateAppointmentModalComponent {
  selectedValue: string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  appointmentForm: FormGroup;
  whereCond: any = {}
  minToDate: Date;
  maxToDate: Date;
  orderBy: any = { firstName: 1 }
  seachByPname: any = '';
  caseNameFlag:boolean=false;
  caseNameOtherFlag:boolean=true;
  convertPhoneNumber: string = '';
  casenameList:caselist[] = [];
  public patientList:lists[] = []
  public doctorList:doctorlists[] = []
  selectedAppTypeValue: string;
  patientId: string;
  doctorId:string='';
  therapistList:any=[];
  practiceLocationData: string[] = practiceLocations;
  validationMessages = validationMessages;
  invalidEmailErrorMessage: string = '';
  emailError:boolean = false;
  clickOnRequestAppointment:boolean=false;
  whereDocCond: any = {stauts:"Active"}
  minTime: Date;
  minEndTime: Date;
  day: string;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router,public authService: AuthService,public commonService: CommonService,private dialogRef: MatDialogRef<CreateAppointmentModalComponent>) {}

  ngOnInit() {    
    const now = new Date();
    this.minToDate = new Date(now.getTime() + 30 * 60 * 1000);
    this.maxToDate = this.commonService.getMaxAppoinmentFutureMonths();

    const defaultStartTime = this.getNext30MinuteMark();
    const defaultEndTime = moment(defaultStartTime).add(15, 'minutes').toDate();
    this.minTime = new Date();
    this.checkToday();
    
    // if(this.userRole!='support_team'){
    //   this.router.navigate([''])
    // }
   
    this.appointmentForm = this.fb.group({
      patientType: ['New', [Validators.required]],
      seachByPname: [''],
      caseName: [''],
      caseType: ['PT', [Validators.required]],
      caseNameOther: ['',[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      appointmentDate: ['', [Validators.required]],
      appointmentStartTime: ['', [Validators.required]],
      appointmentEndTime: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],    
      phoneNumber: ['', []],
      seachByDoctor: ['',[Validators.required]],    
      appointmentType: [''],
      appointmentTypeOther: [''],      
      notes: [''],      
     // repeatsNotes: [''],      
    },
    { validator: this.endTimeAfterStartTime('appointmentStartTime', 'appointmentEndTime') }
    );
  
    this.appointmentForm.patchValue({
      appointmentStartTime: defaultStartTime,
      appointmentEndTime: defaultEndTime,
    });

    this.getTherapistList()    
  }

  checkToday(): void {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); // Get the day index (0 = Sunday, 6 = Saturday)
    this.day = daysOfWeek[today];
  }

  getNext30MinuteMark(): Date {
    const currentTime = moment();
    const minutes = currentTime.minutes();
    const next15MinuteMark = minutes % 30 === 0 ? currentTime : currentTime.add(30 - (minutes % 30), 'minutes');
    return next15MinuteMark.seconds(0).milliseconds(0).toDate(); // Set seconds and milliseconds to 0
  }

  endTimeAfterStartTime(startTimeKey: string, endTimeKey: string) {
    // const currentTime = this.appointmentForm.controls['appointmentStartTime'].value;//moment();
    // const minutes = currentTime.minutes();
    // this.minEndTime = currentTime.add(30 - (minutes % 30), 'minutes');
    return (formGroup: FormGroup) => {
      const startTime = formGroup.controls[startTimeKey];
      const endTime = formGroup.controls[endTimeKey];

      if (endTime.errors && !endTime.errors['endTimeAfterStartTime']) {
        return;
      }
      // Check if endTime is after startTime
      if (moment(endTime.value).isSameOrBefore(moment(startTime.value))) {
        endTime.setErrors({ endTimeAfterStartTime: true });
      } else {
        endTime.setErrors(null);
      }
    };
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.appointmentForm.controls['appointmentStartTime'].setValue(event.value);
    this.appointmentForm.controls['appointmentEndTime'].setValue(event.value);
  }

  onDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.appointmentForm.controls['appointmentStartTime'].setValue(event.value);
    this.appointmentForm.controls['appointmentEndTime'].setValue(event.value);
  }

  async createAppointment(formData:any){
    
    if (this.appointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
       
        if(formData.patientType=='Existing'){
          Object.assign(formData, {patientId: this.patientId})
        }
        Object.assign(formData, {doctorId: this.doctorId});
        if (this.appointmentForm.controls['firstName'].disabled) {
          Object.assign(formData, {firstName: this.appointmentForm.controls['firstName'].value});
          Object.assign(formData, {lastName: this.appointmentForm.controls['lastName'].value});
          Object.assign(formData, {email: this.appointmentForm.controls['email'].value});
        }
        delete formData.seachByPname;
        delete formData.seachByDoctor;

        let reqVars = {
          requestId:'',
          userId: this.userId,
          data: formData,
          patientType:formData.patientType
        }
        this.emailError = false; this.invalidEmailErrorMessage = '';   
        this.authService.apiRequest('post', 'appointment/createAppointment', reqVars).subscribe(async (response) => {    
          this.commonService.hideLoader();
          if (response.error) {
            this.clickOnRequestAppointment = false
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
              this.dialogRef.close();
              this.successModal(response.message);
              this.commonService.openSnackBar(response.message, "SUCCESS");
            }
          }
        })
    }else{
      console.log(' #### appointment Form>>>>>>')
      Object.keys(this.appointmentForm.controls).forEach(field => {
        const control = this.appointmentForm.get(field);
        if (control && control.errors) {
          console.log(`Errors in ${field}:     Value: ${control.value}`);
      
          Object.keys(control.errors).forEach(errorKey => {
            const errorValue = control.errors ? control.errors[errorKey] : '';
            console.log(`'Error details:'  - ${errorKey}:`, errorValue);
          });
        }
      });
        this.appointmentForm.markAllAsTouched();
        return;  
    }
  }

  successModal(successMsg:string) {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote:successMsg
      }
    })
    dialogRef.afterClosed().subscribe(async id => {
      this.dialogRef.close('SUCCESS');
      //this.router.navigate(['/support-team/cases'])
    });
    
  }

  onAppointmentTypeChange(value: any) {
    this.selectedAppTypeValue = value
  }
  
  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
    this.appointmentForm.controls['caseNameOther'].setValue('');
    if(this.selectedValue=='New'){
      this.caseNameFlag = false;
      this.caseNameOtherFlag = true;
      this.appointmentForm.controls['firstName'].setValue('');
      this.appointmentForm.controls['lastName'].setValue('');
      this.appointmentForm.controls['email'].setValue('');
      this.appointmentForm.controls['firstName'].enable();
      this.appointmentForm.controls['lastName'].enable();
      this.appointmentForm.controls['email'].enable();

      this.appointmentForm.controls['caseName'].setValidators([]);
      this.appointmentForm.controls['caseName'].reset(); 
      this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
      this.appointmentForm.updateValueAndValidity();
    
    }else{
      this.caseNameFlag = true;
      this.caseNameOtherFlag = false;
      this.appointmentForm.controls['caseNameOther'].setValidators([]);
      this.appointmentForm.controls['caseNameOther'].reset();
      this.appointmentForm.controls['caseName'].setValidators([Validators.required]);
      this.appointmentForm.updateValueAndValidity();

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
      order: this.orderBy,
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
        this.appointmentForm.controls['caseNameOther'].setValidators([]);
        this.appointmentForm.controls['firstName'].disable()
        this.appointmentForm.controls['lastName'].disable()
        this.appointmentForm.controls['email'].disable()
        this.patientId = id;
        //this.appointmentForm.controls['caseType'].reset();
        this.appointmentForm.controls['caseName'].reset('');
        this.appointmentForm.controls['caseNameOther'].reset('');        
        this.getCaseList(id)
      }    
    }
  }
  
  selectDoctor(id: string): any {    
    if(this.doctorList.length>0) {
      let selected = this.doctorList.find(item => typeof item === 'object' && item.id === id) || null;
      if(selected) {
        this.doctorId = id;        
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
          this.caseNameOtherFlag = false;          
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

  searchDoctorRecords(event: any) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {      
      searchStr = searchStr.replace("+", "\\+");
      let number = this.isOnlyNumbers(searchStr)
      searchStr = { $regex: searchStr, $options: 'i' }   
        if (number) {
          this.whereDocCond = {
            status: "Active",
            $or: [{ npi: searchStr }]
          }
        }else{
          this.whereDocCond = {
            status: "Active",
            $or: [{ name: searchStr }]
          }
        }
      this.getDoctorsList()
    } else {
      this.whereDocCond = {status: "Active"};
    }
  }

  isOnlyNumbers(input:string) {
    const regex = /^\d+$/;
    return regex.test(input);
  }

  async getDoctorsList(){
    let reqVars = {
      query: this.whereDocCond,
      fields: {_id:1, name: 1, credentials: 1, npi: 1 },     
      order: {name:1}
    }
    await this.authService.apiRequest('post', 'appointment/getDoctorList', reqVars).subscribe(async response => {
      let finalData: any = []
      if (response.data && response.data.doctorList && response.data.doctorList.length > 0) {
        await response.data.doctorList.map((element: any) => {
          let newColumns = {
           id: element._id,
           name: element.name,
           credentials: element.credentials,
           npi: element.npi,
          }
          finalData.push(newColumns)
        })
      }
      this.doctorList = finalData;    
    })
  }

}
