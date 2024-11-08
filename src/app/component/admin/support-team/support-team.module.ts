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
import { SchedulerComponent } from 'src/app/shared/comman/scheduler/scheduler.component';
import { CreateAppointmentModalComponent } from 'src/app/shared/comman/scheduler/create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from 'src/app/shared/comman/scheduler/edit-appointment-modal/edit-appointment-modal.component';
import { AppointmentDetailsModalComponent } from 'src/app/shared/comman/scheduler/appointment-details-modal/appointment-details-modal.component';
import { UpcomingAppModalComponent } from 'src/app/shared/comman/scheduler/upcoming-app-modal/upcoming-app-modal.component';
import { CollectPaymentModalComponent } from 'src/app/shared/comman/scheduler/collect-payment-modal/collect-payment-modal.component';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomDateFormatter } from 'src/app/shared/comman/scheduler/calendar-moment-date-formatter.provider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
//import { CustomDateParserFormatter } from 'src/app/shared/comman/custom-date-parser-formatter';CustomDateParserFormatter
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
    ResolvedRequestsComponent,
    SchedulerComponent,
    CreateAppointmentModalComponent,
    EditAppointmentModalComponent,
    AppointmentDetailsModalComponent,
    UpcomingAppModalComponent,
    CollectPaymentModalComponent
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
    OwlNativeDateTimeModule,        
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{ provide: [CalendarDateFormatter], useClass: CustomDateFormatter }],
})
export class SupportTeamModule { }
