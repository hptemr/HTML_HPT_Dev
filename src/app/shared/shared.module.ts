import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ContentComponent } from './component/layout/content/content.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FeathericonComponent } from './component/feathericon/feathericon.component';
import { FooterComponent } from './component/footer/footer.component';
import { NotificationComponent } from './component/header/notification/notification.component';
import { ProfileComponent } from './component/header/profile/profile.component';
import { SvgIconComponent } from './component/svg-icon/svg-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TapToTopComponent } from './component/tap-to-top/tap-to-top.component';
import { LoaderComponent } from './component/loader/loader.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLayoutComponent } from './component/layout/patient-layout/patient-layout-layout.component';
import { SidebarPatientComponent } from './component/sidebar-patient/sidebar-patient.component';
import { PatientHeaderComponent } from './component/header-patient/header-patient.component';
import { ManageProfileComponent } from './component/manage-profile/manage-profile.component';
import { UploadImgComponent } from './component/upload-img/upload-img.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { IntakeStep1Component } from './component/intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from './component/intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from './component/intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from './component/intake-form/intake-step4/intake-step4.component';
import { IntakeStep5Component } from './component/intake-form/intake-step5/intake-step5.component';
import { IMaskModule } from 'angular-imask';
import { AppointmentsComponent } from './component/support-billing-therapist/appointments/appointments.component';
import { AppointmentDetailsComponent } from './component/support-billing-therapist/appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './component/support-billing-therapist/system-followup-modal/system-followup-modal.component';
import { DocumentListingComponent } from './component/support-billing-therapist/document/document-listing/document-listing.component';
import { DocumentDetailingComponent } from './component/support-billing-therapist/document/document-detailing/document-detailing.component';

import { InitialExaminationComponent } from './component/support-billing-therapist/notes/initial-examination/initial-examination/initial-examination.component';
import { SubjectiveComponent } from './component/support-billing-therapist/notes/initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from './component/support-billing-therapist/notes/initial-examination/objective/objective.component';
import { AssessmentComponent } from './component/support-billing-therapist/notes/initial-examination/assessment/assessment.component';
import { PlanComponent } from './component/support-billing-therapist/notes/initial-examination/plan/plan.component';
import { BillingComponent } from './component/support-billing-therapist/notes/initial-examination/billing/billing.component';
import { DailyNoteBillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/daily-notes/billing/billing.component';
import { ProgressNoteBillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/billing/billing.component';
import { DischargeNoteBillingComponent } from 'src/app/shared/component/support-billing-therapist/notes/discharge-note/billing/billing.component';

import { AddExerciseComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/add-exercise/add-exercise.component';
import { ProtocolModalComponent } from 'src/app/shared/component/support-billing-therapist/notes/initial-examination/protocol-modal/protocol-modal.component';
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

import { ProgressNoteComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/progress-notes/progress-notes.component';
import { PnSubjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-subjective/pn-subjective.component';
import { PnObjectiveComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-objective/pn-objective.component';
import { PnAssessmentComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-assessment/pn-assessment.component';
import { PnPlanComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-plan/pn-plan.component';
import { PnAddExerciseComponent } from 'src/app/shared/component/support-billing-therapist/notes/progress-notes/pn-add-exercise/pn-add-exercise.component';

import { AppointmentRequestsComponent } from './component/support-billing-therapist/appointment-requests/appointment-requests.component';
import { PatientDetailsComponent } from './component/support-billing-therapist/patient-details/patient-details.component';
import { PatientProfileComponent } from './component/support-billing-therapist/patient-profile/patient-profile.component';
import { ViewInsuranceModalComponent } from './comman/view-insurance-modal/view-insurance-modal.component';

import { UserListingComponent } from '../component/admin/system-and-practice/user-managment/user-listing/user-listing.component';
//import { AdminProfileComponent } from '../component/admin/system-and-practice/user-managment/admin-profile/admin-profile.component';
import { DatePipe } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
//import { ProfilePicService } from 'src/app/shared/services/profile-pic.service';
import { OnePageNoteModalComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/one-page-note-modal/one-page-note-modal.component';
import { EFaxModalComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/e-fax-modal/e-fax-modal.component';
import { EFaxHistoryModalComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/e-fax-history-modal/e-fax-history-modal.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SchedulerComponent } from 'src/app/shared/comman/scheduler/scheduler.component';
import { CreateAppointmentModalComponent } from 'src/app/shared/comman/scheduler/create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from 'src/app/shared/comman/scheduler/edit-appointment-modal/edit-appointment-modal.component';
import { AppointmentDetailsModalComponent } from 'src/app/shared/comman/scheduler/appointment-details-modal/appointment-details-modal.component';
import { UpcomingAppModalComponent } from 'src/app/shared/comman/scheduler/upcoming-app-modal/upcoming-app-modal.component';
import { CollectPaymentModalComponent } from 'src/app/shared/comman/scheduler/collect-payment-modal/collect-payment-modal.component';
import { CalendarModule, DateAdapter,CalendarDateFormatter  } from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/shared/comman/scheduler/calendar-moment-date-formatter.provider';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ReportsComponent } from './comman/reports/reports.component';
//import { NgApexchartsModule } from 'ng-apexcharts';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    ContentComponent,
    AdminLayoutComponent,
    PatientLayoutComponent,
    HeaderComponent,
    PatientHeaderComponent,
    SidebarComponent,
    SidebarPatientComponent,
    FeathericonComponent,
    FooterComponent,
    NotificationComponent,
    ProfileComponent,
    SvgIconComponent,
    TapToTopComponent,
    LoaderComponent,
    ManageProfileComponent,
    UploadImgComponent,
    IntakeStep1Component,
    IntakeStep2Component,
    IntakeStep3Component,
    IntakeStep4Component,
    IntakeStep5Component,
    AppointmentsComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    InitialExaminationComponent,SubjectiveComponent,ObjectiveComponent,AssessmentComponent,PlanComponent,BillingComponent,
    DailyNotesComponent, 
    DnSubjectiveComponent,
    DnObjectiveComponent,
    DnAssessmentComponent,
    DnPlanComponent,
    CaseNoteModalComponent,
    DischargeNoteComponent,
    DisSubjectiveComponent,
    DisAssessmentComponent,
    DisObjectiveComponent,
    DisPlanComponent,
    ProgressNoteComponent,
    PnSubjectiveComponent,
    PnObjectiveComponent,
    PnAssessmentComponent,
    PnPlanComponent,
    PnAddExerciseComponent,
    AddExerciseComponent,
    ProtocolModalComponent,
    AppointmentRequestsComponent,
    PatientDetailsComponent,
    PatientProfileComponent,
    ViewInsuranceModalComponent,
    DocumentListingComponent,
    DocumentDetailingComponent,
    UserListingComponent,
    DailyNoteBillingComponent,
    ProgressNoteBillingComponent,
    DischargeNoteBillingComponent,
    OnePageNoteModalComponent,
    EFaxModalComponent,
    EFaxHistoryModalComponent,
    SchedulerComponent,
    CreateAppointmentModalComponent,
    EditAppointmentModalComponent,
    AppointmentDetailsModalComponent,
    UpcomingAppModalComponent,
    CollectPaymentModalComponent,
    ReportsComponent
   // AdminProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ImageCropperComponent,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot(),
    IMaskModule,
    DatePipe,
    NgxDocViewerModule,
    //NgApexchartsModule,
    MatChipsModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,        
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{ provide: CalendarDateFormatter, useClass: CustomDateFormatter }],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    AdminLayoutComponent,
    PatientLayoutComponent,
    FeathericonComponent,
    LoaderComponent,
    SvgIconComponent,
    TapToTopComponent,
    TranslateModule,
    NgbModule,
    MaterialModule,
    NgxDocViewerModule,
    ProfileComponent,
  ],  
  

})

export class SharedModule { }
