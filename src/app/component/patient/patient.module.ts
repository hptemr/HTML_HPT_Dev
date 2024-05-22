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
import { IntakeStep1Component } from './intake-form/intake-step1/intake-step1.component';
import { IntakeStep2Component } from './intake-form/intake-step2/intake-step2.component';
import { IntakeStep3Component } from './intake-form/intake-step3/intake-step3.component';
import { IntakeStep4Component } from './intake-form/intake-step4/intake-step4.component';
import { IntakeStep5Component } from './intake-form/intake-step5/intake-step5.component';
import { ContactModalComponent } from './book-appointment/contact-modal/contact-modal.component';
import { step5Component } from './book-appointment/step5/step5.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { ViewEditInsuranceComponent } from './insurance/view-edit-insurance/view-edit-insurance.component';


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
    IntakeStep1Component,
    IntakeStep2Component,
    IntakeStep3Component,
    IntakeStep4Component,
    IntakeStep5Component,
    ContactModalComponent,
    InsuranceListingComponent,
    ViewEditInsuranceComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
    FileUploadModule,
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
})
export class PatientModule { }
