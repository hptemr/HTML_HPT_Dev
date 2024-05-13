import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SupportTeamRoutingModule } from './support-team-routing.module';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsComponent } from './patients/patients.component';
import { Step1Component } from './intake-form/step1/step1.component';
import { Step2Component } from './intake-form/step2/step2.component';
import { Step3Component } from './intake-form/step3/step3.component';
import { Step4Component } from './intake-form/step4/step4.component'; 
import { Step5Component } from './intake-form/step5/step5.component';


@NgModule({
  declarations: [ 
    AppointmentsComponent,
    ManageProfileComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    PatientProfileComponent,
    AppointmentRequestsComponent,
    ReferralsComponent,
    CreateAppointmentComponent,
    PatientDetailsComponent,
    PatientsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component
  ],
  imports: [
    CommonModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class SupportTeamModule { }
