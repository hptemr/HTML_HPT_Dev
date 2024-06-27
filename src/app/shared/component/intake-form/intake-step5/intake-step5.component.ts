import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

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
  isFormEditable = false
  activeUserRoute = this.commonService.getLoggedInRoute()
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
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate([this.activeUserRoute, 'appointments'])
      } else {
        this.step5FormData = response.data.appointmentData
        this.loadForm()
        if (this.authService.getLoggedInInfo('role') == 'patient' && this.step5FormData.status == 'Pending') {
          //patient can update the info
          this.isFormEditable = true
        } else {
          this.isFormEditable = false
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
    this.toggle = !this.toggle;
  }

  async finalSubmit() {
    if (this.isFormEditable) {
      let formData = this.step5Form.value
      Object.assign(formData, { intakeFormSubmit: true })
      let params = {
        query: { _id: this.appId },
        updateInfo: formData
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
        this.router.navigate([this.activeUserRoute, 'appointment-details', this.appId])
      })
    } else {
      this.router.navigate([this.activeUserRoute, 'appointment-details', this.appId])
    }
  }

}
