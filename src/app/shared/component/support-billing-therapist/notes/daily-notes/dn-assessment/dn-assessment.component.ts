import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

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
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog, public authService: AuthService,private datePipe: DatePipe, public commonService: CommonService,private appointmentService: AppointmentService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.assessmentForm = this.fb.group({
      appointmentId:[this.appointmentId],
      assessment_text:['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      supporting_documentation_text:['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],       
   });

  }

  assessmentSubmit(formData:any){
    if (this.assessmentForm.invalid){
      this.assessmentForm.markAllAsTouched();
    }else{

    }
    console.log('formData>>>>',formData)
  }


  checkSpace(colName: any, event: any) {
    this.assessmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }
}
