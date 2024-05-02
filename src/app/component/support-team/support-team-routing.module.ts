import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [ 
  {
    path: 'appointments',
    component:AppointmentsComponent   
  },
  {
    path: 'manage-profile',
    component:ManageProfileComponent   
  },
  {
    path: 'appointment-details',
    component:AppointmentDetailsComponent   
  },
  {
    path: 'patient-profile',
    component:PatientProfileComponent   
  },
  {
    path: 'appointment-requests',
    component:AppointmentRequestsComponent   
  },
  {
    path: 'referrals',
    component:ReferralsComponent   
  },
  {
    path: 'create-appointment',
    component:CreateAppointmentComponent   
  },
  {
    path: 'patient',
    component:PatientsComponent   
  },
  {
    path: 'patient-details',
    component:PatientDetailsComponent   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTeamRoutingModule { }
