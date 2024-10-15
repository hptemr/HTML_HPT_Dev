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
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, public datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - 2] == 'subjective-view'){
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
      note_date: ['', [Validators.required]],
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
        soap_note_type: 'daily_note'
      }
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      if(response.data.subjectiveData.status=='Finalized'){
        this.readOnly = true
        this.subjectiveForm.disable()
      }
      if (response.data && response.data.subjectiveData) {
        let subjectiveData = response.data.subjectiveData;
        this.subjectiveId = subjectiveData._id
        this.subjectiveForm.controls['note_date'].setValue(this.datePipe.transform(subjectiveData.note_date, 'MM/dd/yyyy'))
        this.subjectiveForm.controls['subjective_note'].setValue(subjectiveData.subjective_note)
      }
      if(response.data && response.data.appointmentDatesList){
        this.appointment_dates = response.data.appointmentDatesList       
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
        subjectiveId: this.subjectiveId
      }
      this.authService.apiRequest('post', 'soapNote/submitSubjective', reqVars).subscribe(async (response) => {
        let status = 'SUCCESS'
        if (response.error) {
          status = "ERROR"
        }
        this.commonService.openSnackBar(response.message, status);
        this.commonService.hideLoader();
        setTimeout(() => {
          this.submitted = false
        }, 3000)
      })
    }
  }

  checkSpace(colName: any, event: any) {
    this.subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
