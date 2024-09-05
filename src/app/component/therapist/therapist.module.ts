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
import { AdditionalFormComponent } from 'src/app/shared/component/support-billing-therapist/notes/additional-form/additional-form.component';
import { InitialExaminationComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/initial-examination/initial-examination.component';
import { SubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/objective/objective.component';
import { AssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/assessment/assessment.component';
import { PlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/plan/plan.component';
import { BillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/billing/billing.component';
import { AddExerciseComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/add-exercise/add-exercise.component';
import { CaseNoteModalComponent } from 'src/app/shared/component/support-billing-therapist/notes/case-note-modal/case-note-modal.component';
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
import { EFaxModalComponent } from './appointment-details/e-fax-modal/e-fax-modal.component';
import { EFaxHistoryModalComponent } from './appointment-details/e-fax-history-modal/e-fax-history-modal.component';
 
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

    DailyNotesComponent, 
    DnSubjectiveComponent,
    DnObjectiveComponent,
    DnAssessmentComponent,
    DnPlanComponent,

    DischargeNoteComponent,
    DisSubjectiveComponent,
    DisAssessmentComponent,
    DisObjectiveComponent,
    DisPlanComponent,

    AddExerciseComponent,
    SelectFolderComponent,
    SelectFilesComponent,
    CaseNoteModalComponent,
    OnePageNoteModalComponent,
    EFaxModalComponent,
    EFaxHistoryModalComponent
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
