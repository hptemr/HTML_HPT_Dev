import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { defaultSupportDocText } from 'src/app/config';

@Component({
  selector: 'app-dn-assessment',
  templateUrl: './dn-assessment.component.html',
  styleUrl: './dn-assessment.component.scss'
})
export class DnAssessmentComponent {
  isDisabled: boolean = false;
  appointmentId: string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  assessmentForm: FormGroup;

  validationMessages = validationMessages;
  appointment: any = null
  isUpdate: boolean = false;
  readOnly =  false
  addendumId =""
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, public authService: AuthService, private datePipe: DatePipe, public commonService: CommonService, private appointmentService: AppointmentService) {
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
    this.assessmentForm = this.fb.group({
      appointmentId: [this.appointmentId],
      assessment_text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      supporting_documentation_text: [defaultSupportDocText, [Validators.required, Validators.minLength(1), Validators.maxLength(10000)]],
    });
    if(this.readOnly){
      this.assessmentForm.disable()
    }
    this.getAssessment()
  }

  async getAssessment() {
    let reqVars = {
      query: {
        appointmentId: this.appointmentId,
        soap_note_type: "daily_note",
      },
      fields: {
        updatedAt: 0
      },
      params:{
        addendumId:this.addendumId
      }
    }
    await this.authService.apiRequest('post', 'soapNote/getAssessment', reqVars).subscribe(async (response) => {
      this.commonService.hideLoader()
      if(response.data && response.data.status=='Finalized'){
        this.assessmentForm.disable()
        this.readOnly = true
      }
      if (response.data) {
        this.isUpdate = true
        this.assessmentForm.controls['assessment_text'].setValue(response.data.assessment_text)
        this.assessmentForm.controls['supporting_documentation_text'].setValue(response.data.supporting_documentation_text)
      }
    })
  }

  assessmentSubmit(formData: any) {
    if (this.assessmentForm.invalid) {
      this.assessmentForm.markAllAsTouched();
    } else {
      this.commonService.showLoader();
      Object.assign(formData, { soap_note_type: "daily_note" });
      let reqVars = {
        isUpdate: this.isUpdate,
        userId: this.userId,
        data: formData,
        query: {
          soap_note_type: "daily_note",
          appointmentId: this.appointmentId
        },
        addendumId:this.addendumId
      }
      this.authService.apiRequest('post', 'soapNote/submitAssessment', reqVars).subscribe(async (response) => {
        this.commonService.hideLoader();
        let status = 'SUCCESS'
        if (response.error) {
          status = 'ERROR'
        }
        this.commonService.openSnackBar(response.message, status);
        this.getAssessment()
        if(status=='SUCCESS'){
          setTimeout(() => {
           window.open(`${this.commonService.getLoggedInRoute()}`+"/daily-notes/plan/"+this.appointmentId, "_self");
          }, 2000)
         }
      })
    }

  }


  checkSpace(colName: any, event: any) {
    this.assessmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }
}
