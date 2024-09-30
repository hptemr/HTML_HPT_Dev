import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dis-assessment', 
  templateUrl: './dis-assessment.component.html',
  styleUrl: './dis-assessment.component.scss'
})
export class DisAssessmentComponent {
  isDisabled: boolean = false;  
  addNewProblemField:boolean= true;

  appointmentId: string;
  dis_assessment_icd_length:any=5;
  dis_assessment_icd:any = [];
  public userId: string;
  public userRole: string;
  dis_assessmentForm: FormGroup;
  patient_name:string='Pankaj Khairnar'
  dis_assessment_text:string="This note is to inform you of the discharge of *patient name* from our practice. *patient name* received ____ visits. *patient name* has demonstrated good success with therapy achieving all rehab goals. They are independent with their established HEP. Thank you for the opportunity to assist *patient name* with their rehabilitation.";
  supporting_documentation_text:string="Neuromuscular Re-education completed to assist with reactive and postural responses, and improving anticipatory responses for dynamic activities. Therapeutic Activity completed for improving functional transitioning performance to assist in performance of ADL's. Patient is unable to complete physical therapy on land. Vasopneumatic device required to assist with reduction in effusion in combination with cryotherapy to improve functional performance through reduced effusion and improved range of motion and motor facilitation. DME was issued today with instructions on wear, care, and use required for full rehabilitation potential. ";
  validationMessages = validationMessages; 
  appointment: any = null
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog, public authService: AuthService,private datePipe: DatePipe, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.dis_assessment_icd = [
      {
          "name": "Pain in left knee"
      },
      {
          "name": "Weakness"
      },
      {
          "name": "Stiffness of left hand, not elsewhere classified"
      }];

    this.dis_assessment_icd_length = this.dis_assessment_icd.length+5;

    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
 
    let dis_assessment_text = this.dis_assessment_text.replace('*patient name*',this.patient_name);
    dis_assessment_text = dis_assessment_text.replace('*patient name*',this.patient_name);
    dis_assessment_text = dis_assessment_text.replace('*patient name*',this.patient_name);
    this.dis_assessment_text = dis_assessment_text = dis_assessment_text.replace('*patient name*',this.patient_name);

    this.dis_assessmentForm = this.fb.group({
       appointmentId:[this.appointmentId],
       dis_assessment_text:[this.dis_assessment_text,[Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
       dis_assessment_icd: this.fb.array(
        [this.fb.group({
          problem: ['', Validators.required],
          long_term_goal: ['', Validators.required]
          })
        ]),     
       supporting_documentation_text:[this.supporting_documentation_text, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],       
    });

    const ctrls = this.dis_assessmentForm.get('dis_assessment_icd') as FormArray;
    ctrls.removeAt(0)
    this.dis_assessment_icd.forEach((item:any) => {  
      ctrls.push(this.editAssessmentGroup(item));
    })   
  }

  dis_assessmentSubmit(formData:any){
    if (this.dis_assessmentForm.invalid){
      this.dis_assessmentForm.markAllAsTouched();
    }else{

    }
    console.log('formData>>>>',formData)
  }

  addAssessmentGroup(){
    this.addNewProblemField = false;
    this.dis_assessment_icd_info.push(this.fb.group({
      problem: ['', Validators.required],
      long_term_goal: ['', Validators.required],
    }));
  }

  get dis_assessment_icd_info() {
    return this.dis_assessmentForm.get('dis_assessment_icd') as FormArray;
  }


  editAssessmentGroup(dis_assessment_icd:any) {
    return this.fb.group({
      problem: [dis_assessment_icd.name+' limiting function', Validators.required],
      long_term_goal: ['Improve '+dis_assessment_icd.name, Validators.required]
    });
  }

  checkGroupSpace(colName: any, event: any) {
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  checkSpace(colName: any, event: any) {
    this.dis_assessmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  removeNewProblem(i:any){
    this.addNewProblemField = true;   
    const control = <FormArray>this.dis_assessmentForm.controls['dis_assessment_icd'];  
    if(control.controls[i].get('problem')?.value || control.controls[i].get('long_term_goal')?.value){

      const dialogRef = this.dialog.open(AlertComponent, {
        panelClass: 'custom-alert-container',
        data: {
          warningNote: 'Do you really want to delete this record?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result && !result.error) {
          control.removeAt(i);          
        }
      });
    }else{
      control.removeAt(i);
    }   
  }

}
