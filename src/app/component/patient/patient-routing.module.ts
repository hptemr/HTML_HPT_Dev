import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { AppointmentManageDetailsComponent } from './appointments/appointment-manage-details/appointment-manage-details.component';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';

const routes: Routes = [ 
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
