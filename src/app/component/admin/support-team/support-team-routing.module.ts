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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTeamRoutingModule { }
