import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AppointmentsComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  {
    path: 'appointment-details',
    component: AppointmentDetailsComponent
  },
  {
    path: 'patient-profile',
    component: PatientProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingTeamRoutingModule { }
