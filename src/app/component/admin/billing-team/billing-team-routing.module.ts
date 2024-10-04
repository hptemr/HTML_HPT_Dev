import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { AppointmentsComponent } from 'src/app/shared/component/support-billing-therapist/appointments/appointments.component';
// import { AppointmentDetailsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/appointment-details.component';
import { AppointmentRequestsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-requests/appointment-requests.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { PatientsComponent } from 'src/app/shared/component/support-billing-therapist/patients/patients.component';
import { PatientDetailsComponent } from 'src/app/shared/component/support-billing-therapist/patient-details/patient-details.component';
import { PatientProfileComponent } from 'src/app/shared/component/support-billing-therapist/patient-profile/patient-profile.component';
import { DocumentListingComponent } from 'src/app/shared/component/support-billing-therapist/document/document-listing/document-listing.component';
import { DocumentDetailingComponent } from 'src/app/shared/component/support-billing-therapist/document/document-detailing/document-detailing.component';
import { PreviewComponent } from 'src/app/shared/component/manage-documents/file-preview/preview.component';
import { ConversationsChatComponent } from '../../../shared/component/conversations-ui-kits/conversations-chat/conversations-chat.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

import { IntakeStep1Component } from 'src/app/shared/component/intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from 'src/app/shared/component/intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from 'src/app/shared/component/intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from 'src/app/shared/component/intake-form/intake-step4/intake-step4.component';
import { IntakeStep5Component } from 'src/app/shared/component/intake-form/intake-step5/intake-step5.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: AppointmentRequestsComponent,
  },
  // {
  //   path: 'appointments',
  //   component: AppointmentsComponent,
  // },
  {
    path: 'cases',
    component: AppointmentsComponent
  },
  {
    path: 'case-details/:appointmentId',
    component: AppointmentDetailsComponent
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  {
    path: 'intake-form',
    children: [
      {
        path: 'step-1/:appId',
        component: IntakeStep1Component,
      },
      {
        path: 'step-2/:appId',
        component: IntakeStep2Component,
      },
      {
        path: 'step-3/:appId',
        component: IntakeStep3Component,
      },
      {
        path: 'step-4/:appId',
        component: IntakeStep4Component,
      },
      {
        path: 'step-5/:appId',
        component: IntakeStep5Component,
      },
    ]
  },
   {
    path: 'patients',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: 'patient-details/:userId',
        component: PatientDetailsComponent,
      },
      {
        path: 'patient-profile/:userId',
        component: PatientProfileComponent,
      }
    ]
  },
  {
    path: 'document-listing',
    component: DocumentListingComponent,
  },
  {
    path: 'document-details/:id',
    component: DocumentDetailingComponent,
  },
  {
    path: 'file-preview/:file',
    component: PreviewComponent, 
  },
  {
    path: 'conversations-chat',
    component: ConversationsChatComponent,
  },
  {
    path: 'case-details/view-insurance/:appointmentId',
    component:ViewInsuranceComponent   
  },
  {
    path: 'case-details/billing-details/:appointmentId',
    component:BillingDetailsComponent   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingTeamRoutingModule { }
