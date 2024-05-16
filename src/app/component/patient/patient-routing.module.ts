import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { AppointmentManageDetailsComponent } from './appointments/appointment-manage-details/appointment-manage-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from '../admin/support-team/appointment-requests/appointment-requests.component';

const routes: Routes = [ 
  {
    path: 'dashboard',
    component: AppointmentRequestsComponent, // When we use dynamic code that time use other dashboard component as per requirnment
  },
  {
    path: 'appointments',
    component: AppointmentsComponent, 
  }, 
  {
    path: 'appointment-details',
    component: AppointmentDetailsComponent, 
  }, 
  {
    path: 'manage-details',
    component: AppointmentManageDetailsComponent, 
  },
  {
    path: 'profile-details',
    component: PatientProfileComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
