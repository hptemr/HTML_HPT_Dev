import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
//import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupportBillingTherapistRoutingModule { }
