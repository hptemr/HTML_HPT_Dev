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
import { ConversationsComponent } from '../../../shared/component/conversations/conversations.component';
import { ConversationsChatComponent } from '../../../shared/component/conversations-ui-kits/conversations-chat/conversations-chat.component';

import { DisAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-assessment/dis-assessment.component';
import { DisObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-objective/dis-objective.component';
import { DisPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-plan/dis-plan.component';
import { DisSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-subjective/dis-subjective.component';
import { DischargeNoteComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/discharge-note/discharge-note.component';

import { ProgressNoteComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/progress-notes/progress-notes.component';
import { PnSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-subjective/pn-subjective.component';
import { PnObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-objective/pn-objective.component';
import { PnAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-assessment/pn-assessment.component';
import { PnPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-plan/pn-plan.component';
import { DocumentListingComponent } from 'src/app/shared/component/support-billing-therapist/document/document-listing/document-listing.component';
import { DocumentDetailingComponent } from 'src/app/shared/component/support-billing-therapist/document/document-detailing/document-detailing.component';
import { PreviewComponent } from 'src/app/shared/component/manage-documents/file-preview/preview.component';

import { UserListingComponent } from '../system-and-practice/user-managment/user-listing/user-listing.component';
import { AdminProfileComponent } from '../system-and-practice/user-managment/admin-profile/admin-profile.component';
const routes: Routes = [
  {
    path: 'dashboard',
    //loadChildren: () => import('.src/app/shared/support-billing-therapist/support-billing-therapist-routing.module').then(mod => mod.supportBillingTherapistModule),
    component: AppointmentRequestsComponent
  },
  // {
  //   path: 'appointments',
  //   component: AppointmentsComponent
  // },
  {
    path: 'cases',
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
    path: 'discharge-notes',
    component:DischargeNoteComponent ,
    children: [  
      {
        path: 'subjective/:appointmentId',
        component: DisSubjectiveComponent, 
      }, 
      {
        path: 'objective/:appointmentId',
        component: DisObjectiveComponent, 
      },
      {
        path: 'assessment/:appointmentId',
        component: DisAssessmentComponent, 
      },
      {
        path: 'plan/:appointmentId',
        component: DisPlanComponent, 
      },
      {
        path: 'billing/:appointmentId',
        component: BillingComponent, 
      },
    ]
  },
  {
    path: 'progress-notes',
    component:ProgressNoteComponent ,
    children: [  
      {
        path: 'subjective/:appointmentId',
        component: PnSubjectiveComponent, 
      }, 
      {
        path: 'objective/:appointmentId',
        component: PnObjectiveComponent, 
      },
      {
        path: 'assessment/:appointmentId',
        component: PnAssessmentComponent, 
      },
      {
        path: 'plan/:appointmentId',
        component: PnPlanComponent, 
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
  },
  {
    path: 'conversations',
    component: ConversationsComponent,
  },
  {
    path: 'conversations-chat',
    component: ConversationsChatComponent,
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
    path: 'user-managment',
    children: [
      {
        path: 'therapists',
        component: UserListingComponent,
      },
      {
        path: 'admin-profile/:adminId',
        component: AdminProfileComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }
