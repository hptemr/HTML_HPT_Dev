import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
//import { CustomValidators  } from '../../../../../shared/services/helper/custom-validator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { validationMessages } from '../../../../../utils/validation-messages';
import { DatePipe } from '@angular/common';
import { practiceLocations, s3Details } from 'src/app/config';
import * as moment from 'moment';
export class doctorlists {
  constructor(public id: string, public name: string,public npi: string) {}
}
@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-request-appointment.component.html',
  styleUrl: './create-request-appointment.component.scss',
  providers: [DatePipe]
})
export class CreateRequestAppointmentComponent {
  otherAppType = false;
  requestId: string;
  model: any;//NgbDateStruct;
  selectedValue: any;
  therapistList:any=[];
  orderBy: any = { firstName: 1 }
  appointmentRequestData:any=[];
  appointmentDate: string = '';
  patientName: string = '';
  patientEmail: string = '';
  phoneNumber: string = '';
  location: string = '';
  public userId: string;
  public userRole: string;
  btnName: string = 'Create';
  // minToDate: any = this.commonService.displayFormatDate(new Date(),true)
  // maxToDate:any = this.commonService.displayFormatDate(this.commonService.getMaxAppoinmentFutureMonths(),true)
  minToDate: Date;
  maxToDate: Date;
  statusFlag: string;
  patientId: string = '';
  profileImage: string = '';
  appointment_flag: boolean = false
  appointmentForm: FormGroup;
  practiceLocationData: string[] = practiceLocations
  public doctorList:doctorlists[] = []
  validationMessages = validationMessages
  clickOnRequestAppointment:boolean=false;
  readonlyFlag:boolean=true;
  caseNameOtherFlag:boolean=false;
  convertPhoneNumber: string = '';
  casenameList:any = [];
  doctorId:string='';
  whereDocCond: any = {status:"Active"}
  day: string;
  minTime: Date;
  minEndTime: Date;
  selectedDate: Date | null = null;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['requestId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    const now = new Date();
    this.minToDate = new Date(now.getTime() + 30 * 60 * 1000);
    this.maxToDate = this.commonService.getMaxAppoinmentFutureMonths();

    const currentTime = moment();
    const defaultStartTime = this.getNext30MinuteMark(currentTime);
    const defaultEndTime = moment(defaultStartTime).add(15, 'minutes').toDate();
    this.minTime = new Date();
    this.checkToday();

    this.appointmentForm = this.fb.group({
      caseName: ['', [Validators.required]],
      caseNameOther: [''],
      caseType: ['PT', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      seachByDoctor: ['',[Validators.required]],  
      appointmentDate: ['', [Validators.required]],
      appointmentStartTime: ['', [Validators.required]],
      appointmentEndTime: ['', [Validators.required]],
      appointmentType: [''],
      appointmentTypeOther: [''],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],     
      notes: [''],   
    }, { validator: this.endTimeAfterStartTime('appointmentStartTime', 'appointmentEndTime') }
  );
    this.getAppointmentRequestDetails();
  }

  checkToday(): void {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); // Get the day index (0 = Sunday, 6 = Saturday)
    this.day = daysOfWeek[today];
  }

  getNext30MinuteMark(currentTime:any): Date { 
    const minutes = currentTime.minutes();
    const next15MinuteMark = minutes % 30 === 0 ? currentTime : currentTime.add(30 - (minutes % 30), 'minutes');
    return next15MinuteMark.seconds(0).milliseconds(0).toDate(); // Set seconds and milliseconds to 0
  }

  endTimeAfterStartTime(startTimeKey: string, endTimeKey: string) {
    return (formGroup: FormGroup) => {
      const startTime = formGroup.controls[startTimeKey];
      const endTime = formGroup.controls[endTimeKey];

      if (endTime.errors && !endTime.errors['endTimeAfterStartTime']) {
        return;
      }
      if (moment(endTime.value).isSameOrBefore(moment(startTime.value))) {
        endTime.setErrors({ endTimeAfterStartTime: true });
      } else {
        endTime.setErrors(null);
      }
    };
  }

  onDateInput(event: MatDatepickerInputEvent<any>): void {
    this.selectedDate = new Date(event.value);

    const startOfDay = new Date(this.selectedDate);
    startOfDay.setHours(0, 0, 0, 0); 

    const endOfDay = new Date(this.selectedDate);
    endOfDay.setHours(23, 59, 59, 999); 

    this.appointmentForm.controls['appointmentStartTime'].setValue(event.value);
    const currentTime = moment(event.value);
    this.appointmentForm.controls['appointmentEndTime'].setValue(this.getNext30MinuteMark(currentTime));
  }

  async calculateEndDate(date1:Date,date2:Date){
    // console.log('date1 OBJ >>>',typeof date1,' >>>>> date2 OBJ >>>',typeof date2)
    // console.log('date1 >>>',date1,' >>>>> date2 >>>',date2)

    if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
       date1 = new Date(date1);
    }
    if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
        date2 = new Date(date2);
    }

      const year = date1.getFullYear();
      const month = date1.getMonth();
      const day = date1.getDate();
      
      const hours = date2.getHours();
      const minutes = date2.getMinutes();
      const seconds = date2.getSeconds();      
      let returnDate = new Date(year, month, day, hours, minutes, seconds);
      return returnDate;
  }

  async createAppointment(formData:any){
    if (this.appointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
        const appointmentStartTime = await this.calculateEndDate(formData.appointmentDate,formData.appointmentStartTime)
        if(appointmentStartTime) {
          formData.appointmentStartTime = appointmentStartTime;
        }

        const appointmentEndTime = await this.calculateEndDate(formData.appointmentDate,formData.appointmentEndTime)
          formData.appointmentEndTime = appointmentEndTime;

        Object.assign(formData, {patientId: this.patientId})
        Object.assign(formData, {doctorId: this.doctorId});

        delete formData.seachByPname;
        delete formData.seachByDoctor;

        let reqVars = {
          requestId:this.requestId,
          userId: this.userId,
          data: formData,
          patientType:'Existing'
        }
       
        await this.authService.apiRequest('post', 'appointment/createAppointment',reqVars).subscribe(async response => { 
          this.clickOnRequestAppointment = false
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {          
            if(response.message){
              this.successModal(response.message);
              this.commonService.openSnackBar(response.message, "SUCCESS")   
            }                      
          }
        })
    }else{
      console.log('appointmentForm >>>',this.appointmentForm)
        this.appointmentForm.markAllAsTouched();
        return;  
    }
  }
  
  onPracticeLocationTyChange(value: any) {
    this.getTherapistList(value)
  }
   
  async getTherapistList(location:any) {
    interface Query {
      role: string;
      status: string;
      practiceLocation?: { $in: any[] }; // Marked optional with '?'
    }

    const reqVars:{ query: Query; fields: object; order: any } = {
      query: { role: 'therapist', status: 'Active',practiceLocation:{ $in: [location] } },
      fields: { _id: 1, firstName: 1, lastName: 1 },
      order: this.orderBy,
    }
    if(location=='Admin All'){
      delete reqVars.query.practiceLocation;
    }
    
    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      if (response.data && response.data.therapistData) {
        this.therapistList = response.data.therapistData;
      }
    })
  }

  async getAppointmentRequestDetails(){
    if (this.requestId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.requestId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentRequestDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentRequestData) {
          this.appointmentRequestData = response.data.appointmentRequestData;

          if(response.data.caseNameList){
            this.casenameList = response.data.caseNameList;
          }

          let appointmentData = response.data.appointmentData;
          if(appointmentData){
            this.btnName = 'Update';
          }
          
          this.statusFlag = this.appointmentRequestData.status.charAt(0).toLowerCase() + this.appointmentRequestData.status.slice(1)
          this.patientId = this.appointmentRequestData.patientId?._id;
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentRequestData.patientId.profileImage;
          this.patientName = this.appointmentRequestData.patientId?.firstName + " " + this.appointmentRequestData.patientId?.lastName;
          this.patientEmail = this.appointmentRequestData.patientId?.email;
          this.phoneNumber = this.appointmentRequestData.patientId?.phoneNumber;

          this.appointmentDate = (appointmentData && appointmentData.appointmentDate) ? appointmentData.appointmentDate : this.appointmentRequestData.appointmentDate;
          this.location = (appointmentData && appointmentData.practiceLocation) ? appointmentData.practiceLocation : this.appointmentRequestData.practiceLocation;

          let caseName = (appointmentData && appointmentData.caseName) ? appointmentData.caseName : '';
          let caseType = (appointmentData && appointmentData.caseType) ? appointmentData.caseType : 'PT';
          let appointmentType = (appointmentData && appointmentData.appointmentType) ? appointmentData.appointmentType : '';
          
          
          if(appointmentData && appointmentData.status && appointmentData.status=='Pending'){
            this.appointmentForm.controls['caseNameOther'].setValue(caseName);
            this.onCaseSelected('Other');
            this.appointmentForm.controls['caseName'].setValue('Other'); 
          }else{
            this.appointmentForm.controls['caseName'].setValue(caseName); 
          }
          this.appointmentForm.controls['caseType'].setValue(caseType);

          this.appointmentForm.controls['appointmentType'].setValue(appointmentType);
          this.selectedValue = appointmentType;
          if(appointmentType && appointmentType=='Other'){
            let appointmentTypeOther = (appointmentData && appointmentData.appointmentTypeOther) ? appointmentData.appointmentTypeOther : '';
            this.appointmentForm.controls['appointmentTypeOther'].setValue(appointmentTypeOther);
          }
          
          let therapistId = (appointmentData && appointmentData.therapistId) ? appointmentData.therapistId : '';
                   
          this.appointmentForm.controls['firstName'].setValue(this.appointmentRequestData.patientId?.firstName);
          this.appointmentForm.controls['lastName'].setValue(this.appointmentRequestData.patientId?.lastName);
          this.appointmentForm.controls['email'].setValue(this.appointmentRequestData.patientId?.email);         
          this.appointmentForm.controls['phoneNumber'].setValue(this.appointmentRequestData.patientId?.phoneNumber);
          
          this.appointmentForm.controls['practiceLocation'].setValue(this.location);
          if(this.location){
            this.onPracticeLocationTyChange(this.location)
          }
          this.appointmentForm.controls['therapistId'].setValue(therapistId);
          this.appointmentForm.controls['appointmentDate'].setValue(this.appointmentDate);
          this.appointmentForm.controls['appointmentStartTime'].setValue(this.appointmentDate);
          const currentTime = moment(this.appointmentDate);
          const defaultEndTime = this.getNext30MinuteMark(currentTime);
          this.appointmentForm.controls['appointmentEndTime'].setValue(defaultEndTime);
          this.appointment_flag = true;    
        }
      })
    }
  }

  onCaseSelected(value: any) {
   this.caseNameOtherFlag = false
   this.appointmentForm.controls['caseNameOther'].setValidators([]);
   if(value=='Other'){
    this.caseNameOtherFlag = true
    this.appointmentForm.controls['caseNameOther'].setValidators([Validators.required]);
   }   
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

  selectDoctor(id: string): any {    
    if(this.doctorList.length>0) {
      let selected = this.doctorList.find(item => typeof item === 'object' && item.id === id) || null;
      if(selected) {
        this.doctorId = id;        
      }    
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
      this.router.navigate(['/support-team/requests'])
    });
    
  }

  onChange(value: any) {
    this.selectedValue = value
    //console.log(this.selectedValue = value)
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }
}
