import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
//import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { IntakeStep1Component } from 'src/app/shared/component/intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from 'src/app/shared/component/intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from 'src/app/shared/component/intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from 'src/app/shared/component/intake-form/intake-step4/intake-step4.component';
import { IntakeStep5Component } from 'src/app/shared/component/intake-form/intake-step5/intake-step5.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AppointmentRequestsComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'appointment-details/:appointmentId',
    component: AppointmentDetailsComponent
  },
  {
    path: 'patient-profile/:patientId',
    component: PatientProfileComponent
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupportBillingTherapistRoutingModule { }
