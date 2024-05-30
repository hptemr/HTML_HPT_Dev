import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PatientRoutingModule } from './patient-routing.module';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { AppointmentManageDetailsComponent } from './appointments/appointment-manage-details/appointment-manage-details.component';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';
import { Step4Component } from './book-appointment/step4/step4.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { ViewEditInsuranceComponent } from './insurance/view-edit-insurance/view-edit-insurance.component';
import { HomeExerciseComponent } from './home-exercise/home-exercise.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { ContactModalComponent } from './book-appointment/contact-modal/contact-modal.component';
import { AddInsuranceModalComponent } from './book-appointment/add-insurance-modal/add-insurance-modal.component';
import { AppointmentReqModalComponent } from './book-appointment/appointment-req-modal/appointment-req-modal.component';
import { step5Component } from './book-appointment/step5/step5.component';


@NgModule({
  declarations: [
    AppointmentsComponent, 
    AppointmentDetailsComponent,
    AppointmentManageDetailsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    step5Component,
    InsuranceListingComponent,
    ViewEditInsuranceComponent,
    HomeExerciseComponent,
    EmergencyContactComponent,
    ContactModalComponent,
    AddInsuranceModalComponent,
    AppointmentReqModalComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class PatientModule { }
