import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../../utils/validation-messages';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { s3Details, practiceLocations } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import * as moment from 'moment';
export class doctorlists {
  constructor(public id: string, public name: string,public npi: string) {}
}
export class caselist {
  constructor(public caseName: string, public caseType: string) {}
}
@Component({
  selector: 'app-edit-appointment-modal', 
  templateUrl: './edit-appointment-modal.component.html',
  styleUrl: './edit-appointment-modal.component.scss'
})
export class EditAppointmentModalComponent {
  validationMessages = validationMessages; 
  appointmentForm: FormGroup;
  app_data:any=[]
  minToDate: Date;
  maxToDate: Date;
  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  selectedAppTypeValue: string;
  clickOnRequestAppointment:boolean=false
  practiceLocationData: string[] = practiceLocations;
  public doctorList:doctorlists[] = []
  patientId: string;
  therapistId: string;
  doctorId:string='';
  therapistList:any=[];
  orderBy: any = { firstName: 1 }
  whereDocCond: any = {stauts:"Active"}
  caseNameFlag:boolean=true;
  caseNameOtherFlag:boolean=true;
  selectedValue: string;
  casenameList:caselist[] = [];
  minTime: Date;
  minEndTime: Date;
  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<EditAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.app_data = data.app_data != undefined ? data.app_data : this.app_data;
  }

  ngOnInit() {      
    this.patientId = this.app_data.patientId
    this.therapistId = this.app_data.therapistId
    const now = new Date();
    this.minToDate = new Date(now.getTime() + 30 * 60 * 1000);
    this.maxToDate = this.commonService.getMaxAppoinmentFutureMonths();

    const defaultStartTime = this.getNext30MinuteMark();
    const defaultEndTime = moment(defaultStartTime).add(15, 'minutes').toDate();
    this.minTime = new Date();
         
    console.log('app_data Appointment ',this.app_data)  
    this.appointmentForm = this.fb.group({
      id:[this.app_data.id, [Validators.required]],
      patientId: [this.patientId, [Validators.required]],
      patientType: ['Existing', [Validators.required]],
      seachByPname: [''],
      caseName: [this.app_data.caseName, [Validators.required]],
      caseType: [this.app_data.caseType, [Validators.required]],
      caseNameOther: [''],
      firstName: [this.app_data.patientfirstName, [Validators.required]],
      lastName: [this.app_data.patientlastName, [Validators.required]],
      email: [this.app_data.patientemail],
      appointmentDate: [this.app_data.appointmentDate, [Validators.required]],
      appointmentStartTime: [this.app_data.appointmentDate ? this.app_data.appointmentDate : '', [Validators.required]],
      appointmentEndTime: [this.app_data.appointmentEndTime ? this.app_data.appointmentEndTime : '', [Validators.required]],
      practiceLocation: [this.app_data.practiceLocation,[Validators.required]],
      therapistId: [this.therapistId,[Validators.required]],    
      phoneNumber: [this.app_data.phoneNumber, []],
      seachByDoctor: ['',[Validators.required]],  
      appointmentType: [this.app_data.appointmentType],
      appointmentTypeOther: [''],      
      notes: [this.app_data.notes],        
      repeatsNotes: [this.app_data.repeatsNotes], 
    });
    this.appointmentForm.controls['appointmentStartTime'].setValue(this.app_data.appointmentDate ? this.app_data.appointmentDate : '');
    this.appointmentForm.controls['appointmentEndTime'].setValue(this.app_data.appointmentEndTime ? this.app_data.appointmentEndTime : '');
    this.getTherapistList();
    this.whereDocCond = { _id: this.app_data.doctorId }
    this.getDoctorsList();
    this.getCaseList(this.patientId);
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

  async createAppointment(formData:any){    
    if (this.appointmentForm.valid) {
      console.log(' #### form data >>>>>>',formData)
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
        this.authService.apiRequest('post', 'appointment/createAppointment', reqVars).subscribe(async (response) => {
    
        this.commonService.hideLoader();
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
          }
        } else {
          if (response.message) {       
            this.dialogRef.close();
            //this.successModal(response.message);
            this.commonService.openSnackBar(response.message, "SUCCESS");
            this.dialogRef.close('SUCCESS');
          }
        }
      })
    }else{
      console.log(' #### appointment Form>>>>>>',this.appointmentForm)
        this.appointmentForm.markAllAsTouched();
        Object.keys(this.appointmentForm.controls).forEach(field => {
          const control = this.appointmentForm.get(field);
          if (control && control.errors) {
            console.log(`Errors in ${field}:`, control.errors);
          }
        });
        return;  
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

  // onChange(event: MatRadioChange) {
  //   this.selectedValue = event.value
  //   this.appointmentForm.controls['caseNameOther'].setValue('');
  //   if(this.selectedValue=='New'){
  //     this.appointmentForm.controls['firstName'].setValue('');
  //     this.appointmentForm.controls['lastName'].setValue('');
  //     this.appointmentForm.controls['email'].setValue('');
  //     this.appointmentForm.controls['firstName'].enable();
  //     this.appointmentForm.controls['lastName'].enable();
  //     this.appointmentForm.controls['email'].enable();
  //     this.caseNameFlag = false;
  //     this.caseNameOtherFlag = true;
  //     this.appointmentForm.controls['caseName'].setValidators([]);
  //     this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
  //   }else{
  //     this.caseNameFlag = true;
  //     this.caseNameOtherFlag = false;
  //     this.appointmentForm.controls['caseName'].setValidators([Validators.required]);
  //     this.appointmentForm.controls['caseNameOther'].setValidators([]);
  //   }
  // }

  selectDoctor(id: string): any {    
    if(this.doctorList.length>0) {
      let selected = this.doctorList.find(item => typeof item === 'object' && item.id === id) || null;
      if(selected) {
        this.doctorId = id;        
      }    
    }
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
      if(response.data.doctorList.length>0 && response.data.doctorList.length==1){    
        this.appointmentForm.controls['seachByDoctor'].setValue(response.data.doctorList[0].name);
        this.doctorId = response.data.doctorList[0]._id;        
      }
      
    })
  }
  
  onAppointmentTypeChange(value: any) {
    this.selectedAppTypeValue = value
  }
  
}
