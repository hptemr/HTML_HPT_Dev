import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AppointmentsComponent } from '../support-billing-therapist/appointments/appointments.component';
//import { AppointmentDetailsComponent } from '../support-billing-therapist/appointment-details/appointment-details.component';
//import { AppointmentRequestsComponent } from '../support-billing-therapist/appointment-requests/appointment-requests.component';

// import { AppointmentsComponent } from 'src/app/shared/comman/support-billing-therapist/appointments/appointments.component';
// import { AppointmentDetailsComponent } from 'src/app/shared/comman/support-billing-therapist/appointment-details/appointment-details.component';
// import { AppointmentRequestsComponent } from 'src/app/shared/comman/support-billing-therapist/appointment-requests/appointment-requests.component';
//import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentsComponent } from 'src/app/shared/component/support-billing-therapist/appointments/appointments.component';
import { AppointmentDetailsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/appointment-details.component';
import { AppointmentRequestsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-requests/appointment-requests.component';
//import { SystemFollowupModalComponent } from 'src/app/shared/component/support-billing-therapist/system-followup-modal/system-followup-modal.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { IntakeStep1Component } from 'src/app/shared/component/intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from 'src/app/shared/component/intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from 'src/app/shared/component/intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from 'src/app/shared/component/intake-form/intake-step4/intake-step4.component';
import { IntakeStep5Component } from 'src/app/shared/component/intake-form/intake-step5/intake-step5.component';
import { PatientsComponent } from 'src/app/shared/component/support-billing-therapist/patients/patients.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AppointmentRequestsComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  {
    path: 'appointment-details/:appointmentId',
    component: AppointmentDetailsComponent
  },
  // {
  //   path: 'patient-profile/:patientId',
  //   component: PatientProfileComponent
  // },
  // {
  //   path: 'appointment-requests',
  //   component: AppointmentRequestsComponent
  // },

  {
    path: 'intake-form',
    children: [
      {
        path: 'step-1/:appId',
        component: IntakeStep1Component,
      },
      {
        path: 'step-2/:appId',
        component: IntakeStep2Component,
      },
      {
        path: 'step-3/:appId',
        component: IntakeStep3Component,
      },
      {
        path: 'step-4/:appId',
        component: IntakeStep4Component,
      },
      {
        path: 'step-5/:appId',
        component: IntakeStep5Component,
      },
    ]
  },
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      // {
      //   path: 'patient-details/:userId',
      //   component: PatientDetailsComponent,
      // },
      // {
      //   path: 'patient-profile/:userId',
      //   component: PatientProfileComponent,
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTeamRoutingModule { }
