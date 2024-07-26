import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { icd_data } from '../../../../../../ICD';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
@Component({
  selector: 'app-subjective', 
  templateUrl: './subjective.component.html',
  styleUrl: './subjective.component.scss',
})
export class SubjectiveComponent implements OnInit {
  icd_data = icd_data;
  isDisabled = true;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;

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
  subjectiveForm: FormGroup;
  validationMessages = validationMessages; 
  todayDate = new Date();

  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private appointmentService: AppointmentService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    
    //const getAppointment = this.appointmentService.getAppointment(this.appointmentId)
    //console.log('getAppointment >>>',getAppointment)
    this.subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      examin_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      // diagnosis_code: this.fb.array([this.fb.group({
      //   code: ['',Validators.required],
      //   name: ['',Validators.required]
      // })]),
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });
  }

  ngAfterViewInit() {

  }

  subjectiveSubmit(formData:any,){
    if (this.subjectiveForm.invalid){
      this.subjectiveForm.markAllAsTouched();
    }else{

    }
  }

  onChange(event: MatRadioChange) {
    //console.log(this.selectedValue = event.value)
  }

  onCodeChange(event: any) {
    let selectedData =  icd_data.filter(city => city.code === this.selectedCode);
    if(selectedData[0]){
      let item = {'code':selectedData[0].code,'name':selectedData[0].name};
      this.icdCodeList.push(item);
    }    
    //diagnosis_code = this.icdCodeList;
    
    console.log('icd Code List >>>',this.subjectiveForm.controls["diagnosis_code"]);
  }

  removeIcd(index:number) {
    this.icdCodeList.splice(index, 1);
    //console.log('icd Code List >>>>>',this.icdCodeList);
  }



}
