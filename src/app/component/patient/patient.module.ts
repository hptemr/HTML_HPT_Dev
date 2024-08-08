import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PatientRoutingModule } from './patient-routing.module';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';
import { UpdatePatientProfileComponent } from './update-patient-profile/update-patient-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { FileUploadModule  } from 'ng2-file-upload';
import { NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './../../shared/comman/custom-date-parser-formatter';
import { Step1Component } from './book-appointment/step1/step1.component';
import { Step2Component } from './book-appointment/step2/step2.component';
import { Step3Component } from './book-appointment/step3/step3.component';
import { Step4Component } from './book-appointment/step4/step4.component'; 
import { AppointmentReqModalComponent } from './book-appointment/appointment-req-modal/appointment-req-modal.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { AddEditContactComponent } from './emergency-contact/add-edit-contact/add-edit-contact.component';
import { ContactModalComponent } from './book-appointment/contact-modal/contact-modal.component';
import { step5Component } from './book-appointment/step5/step5.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { ViewEditInsuranceComponent } from './insurance/view-edit-insurance/view-edit-insurance.component';
import { PatientDashboardComponent } from './dashboard/dashboard.component';
import { AddInsuranceModalComponent } from './book-appointment/add-insurance-modal/add-insurance-modal.component';
import { HomeExerciseComponent } from './home-exercise/home-exercise.component';
import { IMaskModule } from 'angular-imask';  
import { BodyDetailsModalComponent } from 'src/app/shared/component/intake-form/intake-step3/body-details-modal/body-details-modal.component';
@NgModule({
  declarations: [
    AppointmentsComponent, 
    AppointmentDetailsComponent,
    UpdatePatientProfileComponent,
    PatientProfileComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    step5Component,
    AppointmentReqModalComponent,
    EmergencyContactComponent, 
    AddEditContactComponent,
    ContactModalComponent,
    InsuranceListingComponent,
    ViewEditInsuranceComponent,
    PatientDashboardComponent,
    AddInsuranceModalComponent,
    HomeExerciseComponent,
    BodyDetailsModalComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
    FileUploadModule,
    IMaskModule
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
})

export class PatientModule { }