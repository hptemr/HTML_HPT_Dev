import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; 
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component'; 
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupSupportTeamComponent } from './signup-support-team/signup-support-team.component';
import { PracticeAdminSignupComponent } from './practice-admin-signup/practice-admin-signup.component';
import { TherapistSignupComponent } from './therapist-signup/therapist-signup.component';
import { BillingTeamSignupComponent } from './billing-team-signup/billing-team-signup.component';
import { SchedulerComponent } from 'src/app/shared/comman/scheduler/scheduler.component';
import { CreateAppointmentModalComponent } from 'src/app/shared/comman/scheduler/create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from 'src/app/shared/comman/scheduler/edit-appointment-modal/edit-appointment-modal.component';
import { AppointmentDetailsModalComponent } from 'src/app/shared/comman/scheduler/appointment-details-modal/appointment-details-modal.component';
import { UpcomingAppModalComponent } from 'src/app/shared/comman/scheduler/upcoming-app-modal/upcoming-app-modal.component';
import { CollectPaymentModalComponent } from 'src/app/shared/comman/scheduler/collect-payment-modal/collect-payment-modal.component';
 
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
 

@NgModule({
  declarations: [ 
    LoginComponent,
    SignupPatientComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupSupportTeamComponent,
    PracticeAdminSignupComponent,
    TherapistSignupComponent,
    BillingTeamSignupComponent,

    SchedulerComponent,
    CreateAppointmentModalComponent,
    EditAppointmentModalComponent,
    AppointmentDetailsModalComponent,
    UpcomingAppModalComponent,
    CollectPaymentModalComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule, 
    AuthRoutingModule, 
    MatStepperModule,
    NgOptimizedImage, 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class AuthModule {}
