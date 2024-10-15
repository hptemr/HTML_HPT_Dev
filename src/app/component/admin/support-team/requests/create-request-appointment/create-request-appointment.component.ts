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
import { validationMessages } from '../../../../../utils/validation-messages';
import { DatePipe } from '@angular/common';
import { practiceLocations, s3Details } from 'src/app/config';
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
  minToDate: any = this.commonService.displayFormatDate(new Date(),true)
  maxToDate:any = this.commonService.displayFormatDate(this.commonService.getMaxAppoinmentFutureMonths(),true)
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
  whereDocCond: any = {stauts:"Active"}
  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['requestId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

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
      appointmentType: [''],
      appointmentTypeOther: [''],
      practiceLocation: ['',[Validators.required]],
      therapistId: ['',[Validators.required]],     
    });
    this.getAppointmentRequestDetails();
    this.getTherapistList()
  }

  async createAppointment(formData:any){
    if (this.appointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
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
        this.appointmentForm.markAllAsTouched();
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
          this.appointmentForm.controls['therapistId'].setValue(therapistId);
          
          // if(this.appointmentDate){
          //   let selected_date = this.datePipe.transform(this.appointmentDate, 'MM-dd-yyyy')
          //   if(selected_date){
          //     let dateObj = selected_date.split('-');
          //     let dateArray = dateObj.map(Number);
          //    // let obj = {'month':dateArray[0],'day':dateArray[1],'year':dateArray[2]};
          //     this.model = '08/22/2024';//dateArray[0]+'/'+dateArray[1]+'/'+dateArray[2];
          //   }            ISODate("2024-08-14T13:05:58.124+0000")
          // }
          //let selected_date = this.datePipe.transform(this.appointmentDate, 'MM-dd-yyyy T HH:MM')
          //this.minToDate = '2024-08-16T00:00';//this.commonService.displayFormatDate(new Date(),true)
          // this.maxToDate = '2025-05-16T00:00';//this.commonService.displayFormatDate(this.commonService.getMaxAppoinmentFutureMonths(),true)
         
          let appointmentDate = this.commonService.displayFormatDate(new Date(this.appointmentDate),false)               
          let appointmentDate2 = this.commonService.formatDateInUTC(this.appointmentDate,'yyyy-MM-ddTHH:mm')
          this.appointmentForm.controls['appointmentDate'].setValue(appointmentDate2);
         
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
