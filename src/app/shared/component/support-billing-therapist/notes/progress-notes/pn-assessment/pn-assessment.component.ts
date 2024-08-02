import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
//import { AppointmentService } from 'src/app/shared/services/appointment.service';
@Component({
  selector: 'app-pn-assessment', 
  templateUrl: './pn-assessment.component.html',
  styleUrl: './pn-assessment.component.scss',
  providers: [DatePipe]
})
export class PnAssessmentComponent {
  isDisabled: boolean = false;
  addNewProblemField:boolean= true;
  appointmentId: string;
  assessment_icd_length:any=5;
  assessment_icd:any = [];
  public userId: string;
  public userRole: string;
  assessmentForm: FormGroup;
  patient_name:string='Pankaj Khairnar'
  assessment_text:string="Thank you for referring *patient name* to our practice, *patient name* received  an initial evaluation and treatment today *todays date*. As per your referral, we will see *patient name* ___ times per week for ___ weeks with a focus on *first 3 treatments to be added*. I will update you on *patient name* progress as appropriate, thank you for the opportunity to assist with their rehabilitation.";
  supporting_documentation_text:string="Neuromuscular Re-education completed to assist with reactive and postural responses, and improving anticipatory responses for dynamic activities. Therapeutic Activity completed for improving functional transitioning performance to assist in performance of ADL's. Patient is unable to complete physical therapy on land. Vasopneumatic device required to assist with reduction in effusion in combination with cryotherapy to improve functional performance through reduced effusion and improved range of motion and motor facilitation. DME was issued today with instructions on wear, care, and use required for full rehabilitation potential. ";
  // placeholder: string = '_';
  // replacement: string = ' ';
  validationMessages = validationMessages; 
  appointment: any = null
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog, public authService: AuthService,private datePipe: DatePipe, public commonService: CommonService) {//,private appointmentService: AppointmentService
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }


  ngOnInit() {
    // this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)
    // console.log('assessment >>>',this.appointment)
    this.assessment_icd = [
      {
          "name": "Pain in left knee"
      },
      {
          "name": "Weakness"
      },
      {
          "name": "Stiffness of left hand, not elsewhere classified"
      }];

    this.assessment_icd_length = this.assessment_icd.length+5;

    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    const todaydate = this.datePipe.transform(new Date(), 'MM/dd/yyyy')!;    
    let assessment_text = this.assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
    this.assessment_text = assessment_text = assessment_text.replace('*todays date*',todaydate);


    this.assessmentForm = this.fb.group({
       appointmentId:[this.appointmentId],
       assessment_text:[this.assessment_text, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
       assessment_icd: this.fb.array(
        [this.fb.group({
          problem: ['', Validators.required],
          long_term_goal: ['', Validators.required]
          })
        ]),     
       supporting_documentation_text:[this.supporting_documentation_text, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],       
    });

    const ctrls = this.assessmentForm.get('assessment_icd') as FormArray;
    ctrls.removeAt(0)
    this.assessment_icd.forEach((item:any) => {  
      ctrls.push(this.editAssessmentGroup(item));
    })   
  }

  assessmentSubmit(formData:any){
    if (this.assessmentForm.invalid){
      this.assessmentForm.markAllAsTouched();
    }else{

    }
    console.log('formData>>>>',formData)
  }


  updateText(): void {
    //this.assessment_text = this.assessment_text.split(this.placeholder).join(this.replacement);
  }

  addAssessmentGroup(){
    this.addNewProblemField = false;
    this.assessment_icd_info.push(this.fb.group({
      problem: ['', Validators.required],
      long_term_goal: ['', Validators.required],
    }));
  }

  get assessment_icd_info() {
    return this.assessmentForm.get('assessment_icd') as FormArray;
  }


  editAssessmentGroup(assessment_icd:any) {
    return this.fb.group({
      problem: [assessment_icd.name+' limiting function', Validators.required],
      long_term_goal: ['Improve '+assessment_icd.name, Validators.required]
    });
  }

  checkGroupSpace(colName: any, event: any) {
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  checkSpace(colName: any, event: any) {
    this.assessmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  removeNewProblem(i:any){
    this.addNewProblemField = true;   
    const control = <FormArray>this.assessmentForm.controls['assessment_icd'];  
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
