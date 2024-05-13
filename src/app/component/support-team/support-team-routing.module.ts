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
import { Step1Component } from './intake-form/step1/step1.component';
import { Step2Component } from './intake-form/step2/step2.component';
import { Step3Component } from './intake-form/step3/step3.component';
import { Step4Component } from './intake-form/step4/step4.component'; 
import { Step5Component } from './intake-form/step5/step5.component';

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
  {
    path: 'intake-form',
    children: [  
      {
        path: 'step-1',
        component: Step1Component, 
      },
      {
        path: 'step-2',
        component: Step2Component, 
      }, 
      {
        path: 'step-3',
        component: Step3Component, 
      },
      {
        path: 'step-4',
        component: Step4Component, 
      },
      {
        path: 'step-5',
        component: Step5Component, 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTeamRoutingModule { }
