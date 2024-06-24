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
import { SelectFolderComponent } from './protocol/select-folder/select-folder.component';
import { SelectFilesComponent } from './protocol/select-files/select-files.component'; 
import { OnePageNoteModalComponent } from './appointment-details/one-page-note-modal/one-page-note-modal.component';
import { InitialExaminationComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/initial-examination/initial-examination.component';
import { SubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/objective/objective.component';
import { AssessmentComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/assessment/assessment.component';
import { PlanComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/plan/plan.component';
import { BillingComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/billing/billing.component';
import { AddExerciseComponent } from 'src/app/shared/component/support-billing-therapist/initial-examination/add-exercise/add-exercise.component';
import { AdditionalFormComponent } from 'src/app/shared/component/support-billing-therapist/additional-form/additional-form.component';
import { CaseNoteModalComponent } from 'src/app/shared/component/support-billing-therapist/case-note-modal/case-note-modal.component';

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
    CaseNoteModalComponent,
    OnePageNoteModalComponent
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,

  ]
})
export class TherapistModule { }
