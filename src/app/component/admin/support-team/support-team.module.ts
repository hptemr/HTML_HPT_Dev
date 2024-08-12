import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportTeamRoutingModule } from './support-team-routing.module';
import { DatePipe } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { CreateRequestAppointmentComponent } from './requests/create-appointment/create-appointment.component';
import { MaterialModule } from 'src/app/shared/material.module';
@NgModule({
  declarations: [ 
    // AppointmentsComponent,
    // AppointmentDetailsComponent,
    // AppointmentRequestsComponent,
    // SystemFollowupModalComponent,
    // PatientProfileComponent,
    RequestsComponent,
    CreateAppointmentComponent,
    CreateRequestAppointmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DatePipe
  ]
})
export class SupportTeamModule { }
