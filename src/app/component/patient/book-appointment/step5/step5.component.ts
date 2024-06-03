import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentReqModalComponent } from '../appointment-req-modal/appointment-req-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from 'src/app/utils/validation-messages';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.scss'
})
export class step5Component {
  toggle: boolean = true;
  selectedValue: any;
  step5Form: FormGroup
  validationMessages = validationMessages
  isProcessing = false
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadForm()
  }

  loadForm() {
    this.step5Form = this.fb.group({
      reminderViaMobile: ['No'],
      reminderViaMobileYes: [''],
      reminderViaEmail: ['No'],
      reminderViaEmailYes: ['']
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
    this.isProcessing = true
    this.commonService.showLoader()
    let step1FormData: any = localStorage.getItem('step1FormData')
    let step2FormData: any = localStorage.getItem('step2FormData')
    let step3FormData: any = localStorage.getItem('step3FormData')
    let step4FormData: any = localStorage.getItem('step4FormData')
    step1FormData = JSON.parse(step1FormData)

    let finalReqBody: any = {
      patientId: this.authService.getLoggedInInfo('_id'),
      practiceLocation: step1FormData.practiceLocation,
      appointmentDate: step1FormData.appointmentDate,
      bookingFor: step1FormData.bookingFor,
      relationWithPatient: step1FormData.relationWithPatient,
      payVia: JSON.parse(step2FormData).payVia,
      payViaInsuranceInfo: JSON.parse(step2FormData),
      patientMedicalHistory: JSON.parse(step3FormData),
      emergencyContact: JSON.parse(step4FormData),
      patientInfo: {
        firstName: step1FormData.firstName,
        middleName: step1FormData.middleName,
        lastName: step1FormData.lastName,
        dob: step1FormData.dob,
        martialStatus: step1FormData.martialStatus,
        gender: step1FormData.gender,
        email: step1FormData.email,
        phoneNumber: step1FormData.phoneNumber,
        cellPhoneNumber: step1FormData.cellPhoneNumber,
        workExtensionNumber: step1FormData.workExtensionNumber,
      }
    }
    Object.assign(finalReqBody, this.step5Form.value)
    console.log("finalReqBody:", finalReqBody)
    await this.authService.apiRequest('post', 'appointment/addAppointment', finalReqBody).subscribe(async response => {
      this.commonService.hideLoader()
      localStorage.removeItem('step1FormData')
      localStorage.removeItem('step2FormData')
      localStorage.removeItem('step3FormData')
      localStorage.removeItem('step4FormData')
      localStorage.removeItem('step5FormData')

      const dialogRef = this.dialog.open(AppointmentReqModalComponent, {
        panelClass: 'custom-alert-container',
      })
      setTimeout(() => {
        dialogRef.close()
        this.router.navigate(['/patient/appointments'])
      }, 6000)
    })
  }

}
