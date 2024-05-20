import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { UpdatePatientProfileComponent } from './update-patient-profile/update-patient-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from '../admin/support-team/appointment-requests/appointment-requests.component';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';
import { Step4Component } from './book-appointment/step4/step4.component';

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
    component: UpdatePatientProfileComponent, 
  },
  {
    path: 'profile-details',
    component: PatientProfileComponent, 
  },
  {
    path: 'book-appointment',
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
