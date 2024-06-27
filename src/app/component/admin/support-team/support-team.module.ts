import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportTeamRoutingModule } from './support-team-routing.module';
// import { AppointmentsComponent } from 'src/app/shared/comman/support-billing-therapist/appointments/appointments.component';
// import { AppointmentDetailsComponent } from 'src/app/shared/comman/support-billing-therapist/appointment-details/appointment-details.component';
// import { SystemFollowupModalComponent } from 'src/app/shared/comman/support-billing-therapist/system-followup-modal/system-followup-modal.component';
// import { AppointmentRequestsComponent } from 'src/app/shared/comman/support-billing-therapist/appointment-requests/appointment-requests.component';
//import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DatePipe } from '@angular/common';
import { ReferralsComponent } from './referrals/referrals.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';

@NgModule({
  declarations: [ 
    // AppointmentsComponent,
    // AppointmentDetailsComponent,
    // AppointmentRequestsComponent,
    // SystemFollowupModalComponent,
    // PatientProfileComponent,
    ReferralsComponent,
    CreateAppointmentComponent
  ],
  imports: [
    CommonModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
    DatePipe
  ]
})
export class SupportTeamModule { }
