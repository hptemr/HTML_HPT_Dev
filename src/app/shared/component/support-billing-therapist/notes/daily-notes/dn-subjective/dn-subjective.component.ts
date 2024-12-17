import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dn-subjective',
  templateUrl: './dn-subjective.component.html',
  styleUrl: './dn-subjective.component.scss'
})
export class DnSubjectiveComponent {
  isDisabled: boolean = false;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;
  tabs = [
    { number: '1' }, { number: '2' }, { number: '3' },
    { number: '4' }, { number: '5' }, { number: '6' },
    { number: '7' }, { number: '8' }, { number: '9' },
    { number: '10' }
  ];
  appointment_dates: any = [];
  appointmentId: string;
  public userId: string;
  public userRole: string;
  selectedCode: any;
  icdCodeList: any = [];
  public subjectiveForm: FormGroup;
  validationMessages = validationMessages;
  todayDate = new Date();
  appointment: any = null
  submitted: boolean = false;
  subjectiveId: string = '';
  readOnly = false
  appointment_data:any=[];
  addendumId =""
  subjectiveData:any=[];
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, public datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
      let lengthVal = 2
      if(this.addendumId!=undefined){
        lengthVal = 3
      }
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - lengthVal] == 'subjective-view'){
        this.readOnly = true
      }      
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.getSubjective();
    this.subjectiveForm = this.fb.group({
      appointmentId: [this.appointmentId],
      note_date: [''],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });
    if(this.readOnly){
      this.subjectiveForm.disable()
    }
  }

  async getSubjective() {
    let reqVars = {
      query: {
        appointmentId: this.appointmentId,
        soap_note_type: 'daily_note',
        is_deleted:false
      },
      addendumId:this.addendumId,
      soap_note_type:'daily_note'
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      //if (response.data && response.data.subjectiveData && response.data.subjectiveData.status=='Finalized'){
        // this.readOnly = true
        // this.subjectiveForm.disable()  // user can add multiple daily notes
      //}
      if (response.data && response.data.appointmentDatesList){
        this.appointment_dates = this.commonService.checkappointmentDatesList(response.data.appointmentDatesList,'daily_note')
      }
      if (response.data && response.data.subjectiveData) {
        this.subjectiveData = response.data.subjectiveData;
        if (this.subjectiveData.status!='Finalized') this.subjectiveId = this.subjectiveData._id
        if(this.addendumId!=undefined){
          this.subjectiveId = this.subjectiveData._id;
        }
      
        let note_date = '';
        if (this.subjectiveData.note_date && this.subjectiveData.status!='Finalized' && !this.readOnly){
          note_date = this.subjectiveData.note_date
        }
        if (this.subjectiveData.note_date && this.readOnly){
          note_date = this.subjectiveData.note_date
        }
        this.subjectiveForm.controls['note_date'].setValue(note_date)
        this.subjectiveForm.controls['subjective_note'].setValue(this.subjectiveData.subjective_note)
      }
      
      if (response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData;      
      }
     
      
    })
  }

  subjectiveSubmit(formData: any) {
    if (this.subjectiveForm.invalid) {
      this.subjectiveForm.markAllAsTouched();
    } else {
      this.submitted = true
      this.commonService.showLoader();
      let updateInfo = [];
      updateInfo.push({
        fromAdminId: this.userId,
        userRole: this.userRole,
        updatedAt: new Date()
      });

      if (this.subjectiveId) {
        Object.assign(formData, { updateInfo: updateInfo })
      } else {
        Object.assign(formData, { updateInfo: updateInfo, appointmentId: this.appointmentId, soap_note_type: 'daily_note', status: 'Draft', createdBy: this.userId })
      }

      let reqVars = {
        userId: this.userId,
        data: formData,
        subjectiveId: this.subjectiveId,
        addendumId:this.addendumId,
        appointmentId:this.appointmentId,
        soap_note_type:'daily_note'
      }

      this.authService.apiRequest('post', 'soapNote/submitSubjective', reqVars).subscribe(async (response) => {
        let status = 'SUCCESS'
        if (response.error) {
          status = "ERROR"
        }
        if (response.message) {
          this.commonService.openSnackBar(response.message, status);
        }  
        this.commonService.hideLoader();
        setTimeout(() => {
          this.submitted = false
        }, 3000)

        if (status=='SUCCESS') {
          setTimeout(() => {              
            if(this.addendumId && this.addendumId!=undefined){
              this.router.navigate([this.commonService.getLoggedInRoute()+'/daily-notes/objective/'+this.appointmentId+'/'+this.addendumId]);
            }else{
              this.router.navigate([this.commonService.getLoggedInRoute()+'/daily-notes/objective/'+this.appointmentId]);
            } 
          }, 1000)
        }
      })
    }
  }

  checkSpace(colName: any, event: any) {
    this.subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }


  appointmentChange(app:any) {
    if(app.target.value){
      const find = this.appointment_dates.filter((item: any) => item.appointmentDate === app.target.value);
      if(find[0]){
        this.appointmentId = find[0]._id;
        if(this.subjectiveData.note_date && this.subjectiveData.note_date==app.target.value){
          this.subjectiveId = this.subjectiveData._id;
        }else{
          this.subjectiveId = '';
        }        
      }
    }
  }
}
