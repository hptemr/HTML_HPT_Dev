import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
@Component({
  selector: 'app-intake-step5',
  templateUrl: './intake-step5.component.html',
  styleUrl: './intake-step5.component.scss'
})
export class IntakeStep5Component {

  appId: any
  toggle: boolean = true;
  selectedValue: any;
  step5Form: FormGroup
  step5FormData: any
  validationMessages = validationMessages
  isReadonly = true
  finalSubmitFlag = false
  activeUserRoute = this.commonService.getLoggedInRoute()
  short_text:string = 'Read More';
  userId = this.authService.getLoggedInInfo('_id')
  userRole = this.authService.getLoggedInInfo('role')
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  ngOnInit() {
    this.getAppointmentDetails()
  }

  async getAppointmentDetails() {
    const req_vars = {
      query: { _id: this.appId },
      fields: { checkIn: 0 },
      patientFields: { _id: 1 },
      therapistFields: { _id: 1 }
    }
    this.commonService.showLoader()
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate([this.activeUserRoute, 'appointments'])
      } else {
        this.step5FormData = response.data.appointmentData
        this.loadForm()
        if (this.userRole== 'patient' && !this.step5FormData?.intakeFormSubmit) {
          this.isReadonly = false
        }else if (this.userRole == 'support_team' && this.step5FormData.intakeFormSubmit) {
          this.isReadonly = false
        } else {
          this.isReadonly = true
          this.step5Form.disable()
        }
        this.commonService.hideLoader()
      }
    })
  }

  loadForm() {
    this.step5Form = this.fb.group({
      reminderViaMobile: [this.step5FormData ? this.step5FormData.reminderViaMobile : 'No'],
      reminderViaMobileYes: [this.step5FormData ? this.step5FormData.reminderViaMobileYes : ''],
      reminderViaEmail: [this.step5FormData ? this.step5FormData.reminderViaEmail : 'No'],
      reminderViaEmailYes: [this.step5FormData ? this.step5FormData.reminderViaEmailYes : '']
    })
  }

  onChange(colName: any, event: any) {
    if (this.step5Form.controls[colName].value == 'Yes') {
      let valid
      if (colName == 'reminderViaMobile') {
        valid = [Validators.required, Validators.minLength(14), Validators.maxLength(14)]
      } else {
        valid = [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]
      }
      this.step5Form.controls[colName + 'Yes'].setValidators(valid)
    } else {
      this.step5Form.controls[colName + 'Yes'].clearValidators();
    }
    this.step5Form.controls[colName + 'Yes'].updateValueAndValidity();
  }

  change() {
    if(this.toggle){
      this.short_text = 'Read Less';
    }else{
      this.short_text = 'Read More';
    }
    this.toggle = !this.toggle;

  }

  async finalSubmit() {
    if (!this.isReadonly) {
      this.finalSubmitFlag = true
      let formData = this.step5Form.value
      Object.assign(formData, { intakeFormSubmit: true })
      Object.assign(formData, { status: 'Scheduled' })
      let appointmentUpdateInfo = this.step5FormData.appointmentUpdateInfo;
      appointmentUpdateInfo.push({
        fromPatientId : (this.userRole=='patient') ? this.userId : '',
        fromAdminId:(this.userRole!='patient') ? this.userId : '',
        userRole:this.userRole,
        updatedAt:new Date()
      });
      Object.assign(formData, {  appointmentUpdateInfo:appointmentUpdateInfo })

      let params = {
        query: { _id: this.appId },
        updateInfo: formData,
        userRole:this.userRole
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
          if(this.userRole=='patient'){
            this.successModal()
          }else{
            this.commonService.openSnackBar("Intake form submit successfully", "SUCCESS")
            this.router.navigate([this.activeUserRoute, 'case-details', this.appId])
          }
      })
    } else {
      this.router.navigate([this.activeUserRoute, 'case-details', this.appId])
    }
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Thank you for requesting an appointment. Your recovery is our only priority. We are working diligently on your request and  will respond in 1 business day or less. '
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.router.navigate(["/patient/appointments"])
      this.router.navigate([this.activeUserRoute, 'case-details', this.appId])
    });
  }
}
