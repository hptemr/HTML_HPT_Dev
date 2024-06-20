import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TherapistRoutingModule } from './therapist-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { AdditionalFormComponent } from './additional-form/additional-form.component';
import { SubjectiveComponent } from './initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from './initial-examination/objective/objective.component';
import { AssessmentComponent } from './initial-examination/assessment/assessment.component';
import { PlanComponent } from './initial-examination/plan/plan.component';
import { BillingComponent } from './initial-examination/billing/billing.component';
import { InitialExaminationComponent } from './initial-examination/initial-examination/initial-examination.component';
import { AddExerciseComponent } from './initial-examination/add-exercise/add-exercise.component';
import { SelectFolderComponent } from './protocol/select-folder/select-folder.component';
import { SelectFilesComponent } from './protocol/select-files/select-files.component';
import { CaseNoteModalComponent } from './case-note-modal/case-note-modal.component';
import { DocumentsDashboardComponent } from './documents/documents-dashboard/documents-dashboard.component';
import { DocumentsProviderListComponent } from './documents/documents-provider-list/documents-provider-list.component';
import { DocumentsSiteLeaderListingComponent } from './documents/documents-site-leader-listing/documents-site-leader-listing.component';
 

@NgModule({
  declarations: [ 
    AppointmentsComponent,
    ManageProfileComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    PatientProfileComponent,
    AppointmentRequestsComponent,
    AdditionalFormComponent,

    InitialExaminationComponent,
    SubjectiveComponent,
    ObjectiveComponent,
    AssessmentComponent,
    PlanComponent,
    BillingComponent,

    AddExerciseComponent,
    SelectFolderComponent,
    SelectFilesComponent,
    CaseNoteModalComponent
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,

    DocumentsDashboardComponent,
    DocumentsProviderListComponent,
    DocumentsSiteLeaderListingComponent

  ]
})
export class TherapistModule { }
