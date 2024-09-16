import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { icd_data } from '../../../../../../ICD';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
//import { AppointmentService } from 'src/app/shared/services/appointment.service';
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
  public subjectiveForm: FormGroup;
  validationMessages = validationMessages; 
  todayDate = new Date();
  appointment: any = null
  submitted:boolean=false;
  subjectiveId: string = '';
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      note_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      diagnosis_code: this.fb.array([this.fb.group({
        code: ['',Validators.required],
        name: ['',Validators.required]
      })]),
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });

    this.getSubjectiveRecord()
  }

  getSubjectiveRecord(){

    // var reqVars = {
    //   appointmentId:this.appointmentId,
    //   soap_note_type:'initial_examination'
    // }
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'initial_examination'},     
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
    
      if(response.data && response.data.subjectiveData){
        let subjectiveData = response.data.subjectiveData;

        this.subjectiveId = subjectiveData._id;
        this.subjectiveForm.controls['note_date'].setValue(subjectiveData.note_date);
        this.subjectiveForm.controls['treatment_side'].setValue(subjectiveData.treatment_side);
        this.subjectiveForm.controls['surgery_date'].setValue(subjectiveData.surgery_date);
        this.subjectiveForm.controls['surgery_type'].setValue(subjectiveData.surgery_type);
        this.subjectiveForm.controls['subjective_note'].setValue(subjectiveData.subjective_note);

        subjectiveData.diagnosis_code.forEach((element: any,index:number) => {
          let item = {'code':element.code,'name':element.name};      
          console.log(' item>>>',item)
          if(this.icdCodeList.length==0){
            const ctrls = this.subjectiveForm.get('diagnosis_code') as FormArray;
            ctrls.removeAt(0)  
          }      
          this.diagnosisCodeInfo.push(this.fb.group({
            code: [element.code, Validators.required],
            name: [element.name, Validators.required],
          }));
          this.icdCodeList.push(item);
        })
        console.log(' icdCodeList>>>',this.icdCodeList)
        this.selectedCode = this.icdCodeList.length>0 ? true : false;
      }

      if(response.data && response.data.appointmentDatesList){
        this.appointment_dates = response.data.appointmentDatesList
      }
    })
  }

  getDiagnosisCodes(Obj:any) {

    // this.diagnosisCodeInfo.push(this.fb.group({
    //   code: [selectedData[0].code, Validators.required],
    //   name: [selectedData[0].name, Validators.required],
    // }));


    return this.fb.group({      
      code: [Obj.code, Validators.compose([ Validators.required ])],
      name: [Obj.name, Validators.compose([ Validators.required ])],
    });
  }


  subjectiveSubmit(formData:any){

    if (this.subjectiveForm.invalid){
      this.subjectiveForm.markAllAsTouched();
    }else{
        this.submitted = true
        this.commonService.showLoader();       
        let updateInfo = [];
        updateInfo.push({
          fromAdminId:this.userId,
          userRole:this.userRole,
          updatedAt:new Date()
        });

        if(this.subjectiveId){
          Object.assign(formData, {updateInfo:updateInfo})
        }else{
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,soap_note_type:'initial_examination',status:'Draft',createdBy:this.userId})
        }
        
        let reqVars = {
          userId: this.userId,
          data: formData,
          subjectiveId:this.subjectiveId
        }  
        console.log(' reqVars>>>',reqVars)
        this.authService.apiRequest('post', 'soapNote/submitSubjective', reqVars).subscribe(async (response) => {    
          if (response.error) {
            if (response.message) {
              this.commonService.openSnackBar(response.message, "ERROR");
            }           
          } else {         
            if (response.message) {
              //this.successModal(response.message);
              this.commonService.openSnackBar(response.message, "SUCCESS");
            }
          }
          this.commonService.hideLoader();
          setTimeout(() => {
            this.submitted = false
          }, 3000)
          
        })
    }
  }

  onChange(event: MatRadioChange) {
    //console.log(this.selectedValue = event.value)
  }

  onCodeChange(event: any) {
    let selectedData =  icd_data.filter(city => city.code === event.code);
    if(selectedData[0]){
      let item = {'code':selectedData[0].code,'name':selectedData[0].name};      
      if(this.icdCodeList.length==0){
        const ctrls = this.subjectiveForm.get('diagnosis_code') as FormArray;
        ctrls.removeAt(0)  
      }      
      this.diagnosisCodeInfo.push(this.fb.group({
        code: [selectedData[0].code, Validators.required],
        name: [selectedData[0].name, Validators.required],
      }));
      this.icdCodeList.push(item);
    }    
    this.selectedCode = this.icdCodeList.length>0 ? true : false;
  }

  removeIcd(index:number) {
    this.icdCodeList.splice(index, 1);
    const control = <FormArray>this.subjectiveForm.controls['diagnosis_code'];
    control.removeAt(index);
  }


  get diagnosisCodeInfo() {
    return this.subjectiveForm.get('diagnosis_code') as FormArray;
  }

  
  checkSpace(colName: any, event: any) {
    this.subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  
  ngAfterViewInit() {

  }

  
}
