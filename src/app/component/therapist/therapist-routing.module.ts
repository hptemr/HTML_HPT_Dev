import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component'; 
import { SelectFolderComponent } from './protocol/select-folder/select-folder.component';
import { SelectFilesComponent } from './protocol/select-files/select-files.component';  
import { InitialExaminationComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/initial-examination/initial-examination.component';
import { SubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/objective/objective.component';
import { AssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/assessment/assessment.component';
import { PlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/plan/plan.component';
import { BillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/billing/billing.component';
import { AdditionalFormComponent } from 'src/app/shared/component/support-billing-therapist/notes/additional-form/additional-form.component';
import { DailyNotesComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/daily-notes/daily-notes.component';
import { DnSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-subjective/dn-subjective.component';
import { DnObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-objective/dn-objective.component';
import { DnAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-assessment/dn-assessment.component';
import { DnPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/dn-plan/dn-plan.component';
import { DisAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-assessment/dis-assessment.component';
import { DisObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-objective/dis-objective.component';
import { DisPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-plan/dis-plan.component';
import { DisSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/dis-subjective/dis-subjective.component';
import { DischargeNoteComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/discharge-note/discharge-note.component';
 
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
    path: 'additional-form',
    component:AdditionalFormComponent   
  }, 
  {
    path: 'initial-examination',
    component:InitialExaminationComponent ,
    children: [  
      {
        path: 'subjective',
        component: SubjectiveComponent, 
      }, 
      {
        path: 'objective',
        component: ObjectiveComponent, 
      },
      {
        path: 'assessment',
        component: AssessmentComponent, 
      },
      {
        path: 'plan',
        component: PlanComponent, 
      },
      {
        path: 'billing',
        component: BillingComponent, 
      },
    ]
  },
  {
    path: 'daily-notes',
    component:DailyNotesComponent ,
    children: [  
      {
        path: 'subjective',
        component: DnSubjectiveComponent, 
      }, 
      {
        path: 'objective',
        component: DnObjectiveComponent, 
      },
      {
        path: 'assessment',
        component: DnAssessmentComponent, 
      },
      {
        path: 'plan',
        component: DnPlanComponent, 
      },
      {
        path: 'billing',
        component: BillingComponent, 
      },
    ]
  },
  {
    path: 'discharge-notes',
    component:DischargeNoteComponent ,
    children: [  
      {
        path: 'subjective',
        component: DisSubjectiveComponent, 
      }, 
      {
        path: 'objective',
        component: DisObjectiveComponent, 
      },
      {
        path: 'assessment',
        component: DisAssessmentComponent, 
      },
      {
        path: 'plan',
        component: DisPlanComponent, 
      },
      {
        path: 'billing',
        component: BillingComponent, 
      },
    ]
  },
  {
    path: 'select-folder',
    component:SelectFolderComponent   
  },
  {
    path: 'select-file',
    component:SelectFilesComponent   
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }
