import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { defaultAssessmentText, defaultSupportDocText } from 'src/app/config';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss',
  providers: [DatePipe]
})
export class AssessmentComponent {
  isDisabled: boolean = false;
  addNewProblemField: boolean = true;
  appointmentId: string;
  assessment_icd_length: any = 5;
  assessment_icd: any = [];
  public userId: string;
  public userRole: string;
  assessmentForm: FormGroup;
  patient_name: string = ''
  assessment_text: string = defaultAssessmentText
  supporting_documentation_text: string = defaultSupportDocText
  validationMessages = validationMessages;
  appointment: any = null
  assessmentData: any = []
  isUpdate: any = true
  readOnly = false
  addendumId =""
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, public authService: AuthService, private datePipe: DatePipe, public commonService: CommonService) {//,private appointmentService: AppointmentService
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
      let lengthVal = 2
      if(this.addendumId!=undefined){
        lengthVal = 3
      }
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - lengthVal] == 'assessment-view'){
        this.readOnly = true
      }
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.getAssessment()
  }

  async getAssessment() {
    let reqVars = {
      query: {
        appointmentId: this.appointmentId,
        soap_note_type: "initial_examination"
      },
      fields: {
        updatedAt: 0
      },
      params:{
        addendumId:this.addendumId
      }
    }
    await this.authService.apiRequest('post', 'soapNote/getAssessment', reqVars).subscribe(async (response) => {
      let assessmentData = response.data
      
      if (!assessmentData || assessmentData == null) {
        this.isUpdate = false
        const req_vars = {
          query: { _id: this.appointmentId },
          fields: { patientId: 1, therapistId: 0, appointmentDate: 1 },
          patientFields: { _id: 1, firstName: 1, lastName: 1 }
        }
        await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
          let appmtData = response.data.appointmentData
          this.patient_name = appmtData.patientId.firstName + " " + appmtData.patientId.lastName
          this.assessment_icd = [];
          const todaydate = this.datePipe.transform(new Date(appmtData.appointmentDate), 'MM/dd/yyyy')!;
          let assessment_text = this.assessment_text.replace('PATIENT_NAME', this.patient_name);
          assessment_text = assessment_text.replace('PATIENT_NAME', this.patient_name);
          assessment_text = assessment_text.replace('PATIENT_NAME', this.patient_name);
          assessment_text = assessment_text.replace('PATIENT_NAME', this.patient_name);
          this.assessment_text = assessment_text = assessment_text.replace('*todays date*', todaydate);
        })
      } else {
        this.assessment_text = assessmentData.assessment_text
        this.assessment_icd = assessmentData.assessment_icd
        this.assessment_icd_length = this.assessment_icd.length + 5;
        this.supporting_documentation_text = assessmentData.supporting_documentation_text
      }
      let that = this
      setTimeout(function () {
        that.commonService.hideLoader()
        that.assessmentForm = that.fb.group({
          appointmentId: [that.appointmentId],
          assessment_text: [that.assessment_text, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
          assessment_icd: that.fb.array([
            that.fb.group({
              problem: ['', Validators.required],
              long_term_goal: ['', Validators.required]
            })
          ]),
          supporting_documentation_text: [that.supporting_documentation_text, [Validators.required, Validators.minLength(1)]],
        });

        if(that.readOnly){
          that.assessmentForm.disable()
        }

        const ctrls = that.assessmentForm.get('assessment_icd') as FormArray;
        ctrls.removeAt(0)
        that.assessment_icd.forEach((item: any) => {
          ctrls.push(that.editAssessmentGroup(item));
        })
        if(assessmentData && assessmentData.status=='Finalized'){
          that.assessmentForm.disable()
          that.readOnly = true
        }
      }, 700);
    })
  }


  //Add/Update the Assessment data for initial exam
  assessmentSubmit(formData: any) {
    if (this.assessmentForm.invalid) {
      this.assessmentForm.markAllAsTouched();
    } else {
      this.commonService.showLoader();
      Object.assign(formData, { soap_note_type: "initial_examination" });
      let reqVars = {
        isUpdate: this.isUpdate,
        userId: this.userId,
        data: formData,
        query: {
          soap_note_type: "initial_examination",
          appointmentId: this.appointmentId
        },
        addendumId:this.addendumId,
      }
      this.authService.apiRequest('post', 'soapNote/submitAssessment', reqVars).subscribe(async (response) => {
        this.commonService.hideLoader();
        let status = 'SUCCESS'
        if (response.error) {
          status = 'ERROR'
        }
        this.commonService.openSnackBar(response.message, status);
        this.getAssessment()
      })
    }
  }

  updateText(): void {
    //this.assessment_text = this.assessment_text.split(this.placeholder).join(this.replacement);
  }

  addAssessmentGroup() {
    this.addNewProblemField = false;
    this.assessment_icd_info.push(this.fb.group({
      problem: ['', Validators.required],
      long_term_goal: ['', Validators.required],
    }));
    this.assessmentForm.controls['assessment_icd_info'].markAsUntouched();
    if(this.readOnly){
      this.assessmentForm.disable()
    }
  }

  get assessment_icd_info() {
    return this.assessmentForm.get('assessment_icd') as FormArray;
  }

  editAssessmentGroup(assessment_icd: any) {
    return this.fb.group({
      problem: [assessment_icd.problem, Validators.required],
      long_term_goal: [assessment_icd.long_term_goal, Validators.required]
    });
  }

  checkGroupSpace(colName: any, event: any) {
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  checkSpace(colName: any, event: any) {
    this.assessmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  removeNewProblem(i: any) {
    this.addNewProblemField = true;
    const control = <FormArray>this.assessmentForm.controls['assessment_icd'];
    if (control.controls[i].get('problem')?.value || control.controls[i].get('long_term_goal')?.value) {

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
    } else {
      control.removeAt(i);
    }

  }
}
