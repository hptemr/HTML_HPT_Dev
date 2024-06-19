import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TherapistRoutingModule } from './therapist-routing.module';

// import { AppointmentsComponent } from 'src/app/shared/comman/support-billing-therapist/appointments/appointments.component';
// import { AppointmentDetailsComponent } from 'src/app/shared/comman/support-billing-therapist/appointment-details/appointment-details.component';
 //import { AppointmentRequestsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-requests/appointment-requests.component';

//import { PatientProfileComponent } from './patient-profile/patient-profile.component';
@NgModule({
  declarations: [ 
    // AppointmentsComponent,
    // AppointmentDetailsComponent,
    // AppointmentRequestsComponent,
   // PatientProfileComponent,
    
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
