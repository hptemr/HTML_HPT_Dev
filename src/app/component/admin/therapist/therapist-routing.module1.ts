import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from 'src/app/shared/component/support-billing-therapist/appointments/appointments.component';
import { AppointmentDetailsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/appointment-details.component';
import { InitialExaminationComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/initial-examination/initial-examination.component';
import { SubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/objective/objective.component';
import { AssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/assessment/assessment.component';
import { PlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/plan/plan.component';
import { BillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/billing/billing.component';

import { DailyNotesComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/daily-notes/daily-notes.component';
import { DnSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-subjective/dn-subjective.component';
import { DnObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-objective/dn-objective.component';
import { DnAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-assessment/dn-assessment.component';
import { DnPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-plan/dn-plan.component';

import { AppointmentRequestsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-requests/appointment-requests.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { PatientsComponent } from 'src/app/shared/component/support-billing-therapist/patients/patients.component';
import { PatientDetailsComponent } from 'src/app/shared/component/support-billing-therapist/patient-details/patient-details.component';
import { PatientProfileComponent } from 'src/app/shared/component/support-billing-therapist/patient-profile/patient-profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    //loadChildren: () => import('.src/app/shared/support-billing-therapist/support-billing-therapist-routing.module').then(mod => mod.supportBillingTherapistModule),
    component: AppointmentRequestsComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  {
    path: 'appointment-details/:appointmentId',
    component: AppointmentDetailsComponent
  },
  {
    path: 'initial-examination',
    component:InitialExaminationComponent ,
    children: [  
      {
        path: 'subjective/:appointmentId',
        component: SubjectiveComponent, 
      }, 
      {
        path: 'objective/:appointmentId',
        component: ObjectiveComponent, 
      },
      {
        path: 'assessment/:appointmentId',
        component: AssessmentComponent, 
      },
      {
        path: 'plan/:appointmentId',
        component: PlanComponent, 
      },
      {
        path: 'billing/:appointmentId',
        component: BillingComponent, 
      },
    ]
  },
  {
    path: 'daily-notes',
    component:DailyNotesComponent ,
    children: [  
      {
        path: 'subjective/:appointmentId',
        component: DnSubjectiveComponent, 
      }, 
      {
        path: 'objective/:appointmentId',
        component: DnObjectiveComponent, 
      },
      {
        path: 'assessment/:appointmentId',
        component: DnAssessmentComponent, 
      },
      {
        path: 'plan/:appointmentId',
        component: DnPlanComponent, 
      },
      {
        path: 'billing/:appointmentId',
        component: BillingComponent, 
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }