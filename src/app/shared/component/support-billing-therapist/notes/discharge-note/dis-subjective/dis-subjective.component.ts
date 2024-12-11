import { Component,OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-dis-subjective', 
  templateUrl: './dis-subjective.component.html',
  styleUrl: './dis-subjective.component.scss'
})
export class DisSubjectiveComponent implements OnInit {
  isDisabled: boolean = false;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;
  // tabs = [
  //   {number: '1'}, {number: '2'}, {number: '3'},
  //   {number: '4'}, {number: '5'}, {number: '6'},
  //   {number: '7'}, {number: '8'}, {number: '9'},
  //   {number: '10'}
  // ];
  appointmentId: string;
  public userId: string;
  public userRole: string;
  selectedCode:any;
  icdCodeList:any = [];
  public dis_subjectiveForm: FormGroup;
  public subjectiveForm: FormGroup;
  validationMessages = validationMessages; 
  todayDate = new Date();
  appointment: any = null
  readOnly = false
  subjectiveId: string = '';
  appointment_dates:any=[];
  appointment_data:any=[];
  submitted:boolean=false;
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - 2] == 'subjective-view'){
        this.readOnly = true
      }
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.dis_subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      note_date: [''],
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });
    if(this.readOnly){
      this.dis_subjectiveForm.disable()
    }
    this.getSubjectiveRecord()
  }

  getSubjectiveRecord(){
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'discharge_note'},     
      soap_note_type:'discharge_note'
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
      
      if(response.data && response.data.subjectiveData){
        let subjectiveData = response.data.subjectiveData; 
        if (subjectiveData.status!='Finalized') this.subjectiveId = subjectiveData._id
       
        let note_date = '';
        if (subjectiveData.note_date && subjectiveData.status!='Finalized' && !this.readOnly){
          note_date = subjectiveData.note_date
        }
        if (subjectiveData.note_date && this.readOnly){
          note_date = subjectiveData.note_date
        }
        this.dis_subjectiveForm.controls['note_date'].setValue(note_date)

        this.dis_subjectiveForm.controls['treatment_side'].setValue(subjectiveData.treatment_side);
        this.dis_subjectiveForm.controls['surgery_date'].setValue(subjectiveData.surgery_date);
        this.dis_subjectiveForm.controls['surgery_type'].setValue(subjectiveData.surgery_type);
        this.dis_subjectiveForm.controls['subjective_note'].setValue(subjectiveData.subjective_note); 
      }

      if(response.data && response.data.appointmentDatesList){  
        this.appointment_dates = this.commonService.checkappointmentDatesList(response.data.appointmentDatesList,'discharge_note')      
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData
      }       
      if(response.data.subjectiveData && response.data.subjectiveData.status=='Finalized'){
        this.readOnly = true
        this.dis_subjectiveForm.disable()
      }
    })
  }


  dis_subjectiveSubmit(formData:any){
    if (this.dis_subjectiveForm.invalid){
      console.log('formData>>>>',formData)
      this.dis_subjectiveForm.markAllAsTouched();
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
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,soap_note_type:'discharge_note',status:'Draft',createdBy:this.userId})
        }        
        let reqVars = {
          userId: this.userId,
          data: formData,
          subjectiveId:this.subjectiveId
        }        
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
            setTimeout(() => {
              window.open(`${this.commonService.getLoggedInRoute()}`+"/discharge-notes/objective/"+this.appointmentId, "_self");
            }, 2000)
          }
          this.commonService.hideLoader();
          setTimeout(() => {
            this.submitted = false
          }, 3000)          
        })
    }
  }

    
  checkSpace(colName: any, event: any) {
    this.dis_subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
