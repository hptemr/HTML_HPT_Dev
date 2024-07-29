import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-assessment', 
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {
  isDisabled: boolean = false;
  addNewProblemField:boolean= true;
  appointmentId: string;
  public userId: string;
  public userRole: string;
  assessmentForm: FormGroup;
  patient_name:string='Pankaj Khairnar'
  assessment_text:string="Thank you for referring *patient name* to our practice, *patient name* received  an initial evaluation and treatment today *todays date*./n As per your referral, we will see *patient name*     __  times per week for _____ weeks with a focus on *first 3 treatments to be added*./n I will update you on *patient name* progress as appropriate, thank you for the opportunity to assist with their rehabilitation."

  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }


  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

   // const today = new Date();
   // const todaydate = this.commonService.formattedDate(today);

    let assessment_text = this.assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
    assessment_text = assessment_text.replace('*patient name*',this.patient_name);
   // assessment_text = assessment_text.replace('*todays date*',todaydate);


    this.assessmentForm = this.fb.group({
       appointmentId:[this.appointmentId],
       assessment_text:[assessment_text, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      
       supporting_documentation_text:['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
       
    });
    
    console.log('>>>>>',this.assessmentForm.controls['assessment_text'].value)
    
  }

  assessmentSubmit(formData:any){
     console.log('>>>>>',formData)
  }

  addNewProblem(){
    this.addNewProblemField = false;

    this.assessment_icd_info.push(this.fb.group({
      problem: ['', Validators.required],
      long_term_goal: ['', Validators.required],
    }));
  }

  get assessment_icd_info() {
    return this.assessmentForm.get('assessment_icd') as FormArray;
  }


  removeNewProblem(){
    this.addNewProblemField = true;
  }
}
