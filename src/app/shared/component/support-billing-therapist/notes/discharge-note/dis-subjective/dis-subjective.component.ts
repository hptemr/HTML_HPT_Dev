import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { icd_data } from '../../../../../../ICD';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-dis-subjective', 
  templateUrl: './dis-subjective.component.html',
  styleUrl: './dis-subjective.component.scss'
})
export class DisSubjectiveComponent {
  isDisabled: boolean = false;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;
  appointment_dates:any=["07/12/2024","05/14/2024","04/10/2024"];

  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];

  appointmentId: string;
  public userId: string;
  public userRole: string;
  selectedCode:any;
  icdCodeList:any = [];
  public dis_subjectiveForm: FormGroup;
  validationMessages = validationMessages; 
  todayDate = new Date();
  appointment: any = null
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.dis_subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      discharge_note_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });
  }


  dis_subjectiveSubmit(formData:any){
    if (this.dis_subjectiveForm.invalid){
      this.dis_subjectiveForm.markAllAsTouched();
    }else{

    }
    console.log('formData>>>>',formData)
  }

    
  checkSpace(colName: any, event: any) {
    this.dis_subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
