import { Component } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { validationMessages } from 'src/app/utils/validation-messages';
import { ViewInsuranceModalComponent } from 'src/app/shared/comman/view-insurance-modal/view-insurance-modal.component';
//import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
//import {NgFor, AsyncPipe} from '@angular/common';

// interface User {
//   id: string;
//   name: string;
// }
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointmentId: string;
  statusFlag: string;
  appointmentData: any = [];
  appointment_flag: boolean = false
  initialName: string = '';
  assign_therapist: string = '';
  public userId: string;
  public userRole: string;
  orderBy: any = { updatedAt: -1 }
  appoitmentForm: FormGroup;
  //appoitmentControl = new FormControl('');
  options: any[] = [];
  validationMessages = validationMessages
  therapistList: Observable<any[]>;
  isFormEditable = false
  //@ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  activeUserRoute = "/" + this.commonService.getLoggedInRoute() + "/"

  constructor(public dialog: MatDialog, private fb: FormBuilder, private navigationService: NavigationService, private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.appoitmentForm = this.fb.group({
      therapistId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      caseName: ['', [Validators.pattern("^[ A-Za-z ]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      coPayAmount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      highDeductibles: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
    });
    if (this.userRole == 'support_team') {
      this.isFormEditable = true
    } else {
      this.appoitmentForm.disable()
    }
    this.getAppointmentDetails()
    this.getTherapistList()
  }

  getValue(user: any) {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  checkthevalue(value: any) {
    let valname = '';
    if (value && value.name) {
      valname = value.name;
    }
    return valname;
  }

  async getTherapistList() {
    let reqVars = {
      query: { role: 'therapist', status: 'Active' },
      fields: { _id: 1, firstName: 1, lastName: 1 },
      order: this.orderBy,
    }

    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      this.commonService.hideLoader();
      if (response.data && response.data.therapistData) {
        this.options = response.data.therapistData;
        this.therapistList = this.appoitmentForm.controls['therapistId'].valueChanges.pipe(
          startWith(''),
          map(value => this.checkthevalue(value)),
          map(name => name ? this._filter(name) : this.options.slice())
        )
      }
    })
  }


  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          if (this.appointmentData.patientId.firstName && this.appointmentData.patientId.lastName) {
            this.initialName = this.appointmentData.patientId.firstName.charAt(0) + this.appointmentData.patientId.lastName.charAt(0);
          }
          if (this.appointmentData.therapistId && this.appointmentData.therapistId.firstName) {
            this.assign_therapist = this.appointmentData.therapistId.firstName + ' ' + this.appointmentData.therapistId.lastName;
            this.appoitmentForm.controls['therapistId'].setValue({ id: this.appointmentData.therapistId, name: this.assign_therapist })
          }

          this.appoitmentForm.controls['caseName'].setValue(this.appointmentData.caseName ? this.appointmentData.caseName : '')
          this.appoitmentForm.controls['highDeductibles'].setValue(this.appointmentData.highDeductibles ? this.appointmentData.highDeductibles : '')
          this.appoitmentForm.controls['coPayAmount'].setValue(this.appointmentData.coPayAmount ? this.appointmentData.coPayAmount : '')
          this.appointment_flag = true;
        }
      })
    }
  }

  async formSubmit(formData: any = null) {
    if (this.appoitmentForm.invalid) {
      this.appoitmentForm.markAllAsTouched();
      return;
    } else {
      if (formData.therapistId.id) {
        this.assign_therapist = formData.therapistId.name;
        // this.appoitmentForm.controls['therapistId'].setValue(formData.therapistId.id)
        //console.log('appoitmentForm >>>>',this.appoitmentForm)
        this.acceptAppointment(formData)
      } else {
        this.appoitmentForm.controls['therapistId'].setErrors({ 'incorrect': true });
        this.appoitmentForm.controls['therapistId'].markAsTouched();
        console.log('appoitmentForm >>>>', this.appoitmentForm.controls)
        return;
      }

    }
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked != undefined) {
      let reqVars = {
        query: { _id: obj._id },
        updateInfo: {
          checkIn: event.source._checked,
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
        //this.getAppointmentList()     
      })
    }
  }


  getPreviousPageLink(): string | null {
    if (this.navigationService.getPreviousUrl()) {
      return this.navigationService.getPreviousUrl();
    } else {
      return this.activeUserRoute + '/dashboard/';
    }
  }

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent, {
      panelClass: 'custom-alert-container',
    });
    dialogRef.afterClosed().subscribe(result => {
      return false
    })
    return false 
  }


  writeComment(appointmentId: string) {
    const dialogRef = this.dialog.open(WriteCommentModalComponent, {
      disableClose: true,
      panelClass: 'custom-alert-container',
      data: {
        appointmentId: appointmentId,
        userRole: this.userRole,
        userId: this.userId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.error) {
        this.getAppointmentDetails();
        this.commonService.openSnackBar(result.message, "SUCCESS")
      }
    });

  }

  rescheduleModal(appointmentId: string) {
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent, {
      disableClose: true,
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
      data: {
        // heading: `Invite ${this.pageTitle}`,
        appointmentId: appointmentId,
        userRole: this.userRole,
        userId: this.userId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.error) {
        this.getAppointmentDetails();
        this.commonService.openSnackBar(result.message, "SUCCESS")
      }
    });
    return false
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: 'custom-alert-container',
      data: {
        successNote: 'Kindly choose a therapist prior to confirming the appointment request.'
      }
    });
  }

  async acceptAppointment(formData: any) {
    if (this.appointmentId) {
      //this.commonService.showLoader(); 
      let reqVars = {
        query: { _id: this.appointmentId },
        userId: this.userId,
        userRole: this.userRole,
        data: formData
      }
      await this.authService.apiRequest('post', 'appointment/acceptAppointment', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.error) {
          this.commonService.openSnackBar(response.message, "ERROR")
        } else {
          this.commonService.openSnackBar(response.message, "SUCCESS")
          this.getAppointmentDetails()
          this.successModal();
        }
      })
    }
  }


  checkSpace(colName: any, event: any) {
    this.appoitmentForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  navigateTopatientDetails(patientId: string) {
    this.router.navigate([this.commonService.getLoggedInRoute() + '/patients/patient-profile/', patientId]);
  }

  viewInsuranveModal() {
    const dialogRef = this.dialog.open(ViewInsuranceModalComponent, {
      panelClass: 'modal--wrapper',
      data: this.appointmentData
    });
    return false
  }
}
