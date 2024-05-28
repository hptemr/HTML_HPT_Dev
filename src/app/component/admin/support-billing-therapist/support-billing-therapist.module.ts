import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { SupportBillingTherapistRoutingModule } from './support-billing-therapist-routing.module';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    AppointmentRequestsComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    SupportBillingTherapistRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class SupportBillingTherapistModule { }
