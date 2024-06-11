import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { UpdatePatientProfileComponent } from './update-patient-profile/update-patient-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';
import { Step4Component } from './book-appointment/step4/step4.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { NotificationsComponent } from '../admin/system-and-practice/notifications/notifications.component';
import { IntakeStep5Component } from './intake-form/intake-step5/intake-step5.component';
import { IntakeStep1Component } from './intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from './intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from './intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from './intake-form/intake-step4/intake-step4.component';
import { step5Component } from './book-appointment/step5/step5.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { ViewEditInsuranceComponent } from './insurance/view-edit-insurance/view-edit-insurance.component';
import { PatientDashboardComponent } from './dashboard/dashboard.component';
import { HomeExerciseComponent } from './home-exercise/home-exercise.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PatientDashboardComponent,
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
    path: 'emergency-contact',
    component: EmergencyContactComponent,
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
      {
        path: 'step-5',
        component: step5Component,
      },
    ]
  },
  {
    path: 'intake-form',
    children: [
      {
        path: 'step-1',
        component: IntakeStep1Component,
      },
      {
        path: 'step-2',
        component: IntakeStep2Component,
      },
      {
        path: 'step-3',
        component: IntakeStep3Component,
      },
      {
        path: 'step-4',
        component: IntakeStep4Component,
      },
      {
        path: 'step-5',
        component: IntakeStep5Component,
      },
    ]
  },
  {
    path: 'insurance-listing',
    component: InsuranceListingComponent,
  },
  {
    path: 'view-edit-insurance/:insuranceId',
    component: ViewEditInsuranceComponent,
  },
  {
    path: 'add-insurance',
    component: ViewEditInsuranceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PatientRoutingModule { }