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


@NgModule({
  declarations: [
    AppointmentsComponent, 
    AppointmentDetailsComponent,
    UpdatePatientProfileComponent,
    PatientProfileComponent
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
