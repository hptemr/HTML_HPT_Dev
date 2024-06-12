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
 

@NgModule({
  declarations: [ 
    AppointmentsComponent,
    ManageProfileComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    PatientProfileComponent,
    AppointmentRequestsComponent,
    AdditionalFormComponent,

    SubjectiveComponent,
    ObjectiveComponent,
    AssessmentComponent,
    PlanComponent,
    BillingComponent,
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
