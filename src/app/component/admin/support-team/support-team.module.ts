import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportTeamRoutingModule } from './support-team-routing.module';
import { DatePipe } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { CreateRequestAppointmentComponent } from './requests/create-request-appointment/create-request-appointment.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { ResolvedRequestsComponent } from './requests/resolved-requests/resolved-requests.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
@NgModule({
  declarations: [ 
    // AppointmentsComponent,
    // AppointmentDetailsComponent,
    // AppointmentRequestsComponent,
    // SystemFollowupModalComponent,
    // PatientProfileComponent,
    RequestsComponent,
    CreateAppointmentComponent,
    CreateRequestAppointmentComponent,
    CaseDetailsComponent,
    ResolvedRequestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DatePipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class SupportTeamModule { }
