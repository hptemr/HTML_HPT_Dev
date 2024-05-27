import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { AppointmentManageDetailsComponent } from './appointments/appointment-manage-details/appointment-manage-details.component';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';
import { Step4Component } from './book-appointment/step4/step4.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { ViewEditInsuranceComponent } from './insurance/view-edit-insurance/view-edit-insurance.component';
import { NotificationsComponent } from '../system-admin/notifications/notifications.component';
import { HomeExerciseComponent } from './home-exercise/home-exercise.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';

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
      {
        path: 'step-4',
        component: Step4Component, 
      }, 
    ]
  },
  {
    path: 'notifications',
    component: NotificationsComponent, 
  }, 
  {
    path: 'home-exercise',
    component: HomeExerciseComponent, 
  },
  {
    path: 'insurance-listing',
    component: InsuranceListingComponent, 
  },
  {
    path: 'view-edit-insurance',
    component: ViewEditInsuranceComponent, 
  },
  {
    path: 'emergency-contact',
    component: EmergencyContactComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
