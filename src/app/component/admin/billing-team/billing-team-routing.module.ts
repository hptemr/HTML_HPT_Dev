import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppointmentsComponent } from './appointments/appointments.component';
// import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
//import { AppointmentRequestsComponent } from '../support-billing-therapist/appointment-requests/appointment-requests.component';
//import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';


const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: AppointmentRequestsComponent, // When we use dynamic code that time use other dashboard component as per requirnment
  // },
  // {
  //   path: 'appointments',
  //   component: AppointmentsComponent,
  // },
  // {
  //   path: 'appointment-details',
  //   component: AppointmentDetailsComponent
  // },
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  // {
  //   path: 'patient-profile',
  //   component: PatientProfileComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingTeamRoutingModule { }
