import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { AdditionalFormComponent } from './additional-form/additional-form.component';
import { SubjectiveComponent } from './initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from './initial-examination/objective/objective.component';
import { AssessmentComponent } from './initial-examination/assessment/assessment.component';
import { PlanComponent } from './initial-examination/plan/plan.component';
import { BillingComponent } from './initial-examination/billing/billing.component';
import { InitialExaminationComponent } from './initial-examination/initial-examination/initial-examination.component';
import { SelectFolderComponent } from './protocol/select-folder/select-folder.component';
import { SelectFilesComponent } from './protocol/select-files/select-files.component';
import { DocumentsDashboardComponent } from './documents/documents-dashboard/documents-dashboard.component';
import { DocumentsProviderListComponent } from './documents/documents-provider-list/documents-provider-list.component';
import { DocumentsSiteLeaderListingComponent } from './documents/documents-site-leader-listing/documents-site-leader-listing.component';
 
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
    path: 'select-folder',
    component:SelectFolderComponent   
  },
  {
    path: 'select-file',
    component:SelectFilesComponent   
  },
  {
    path: 'documents',
    component: DocumentsDashboardComponent
  },
  {
    path: 'provider-documents',
    component: DocumentsProviderListComponent
  },
  {
    path: 'site-leader-documents',
    component: DocumentsSiteLeaderListingComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }
