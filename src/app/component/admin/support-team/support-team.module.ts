import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportTeamRoutingModule } from './support-team-routing.module';
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
