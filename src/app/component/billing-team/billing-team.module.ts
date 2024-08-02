import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BillingTeamRoutingModule } from './billing-team-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ReportsComponent } from './report/reports/reports.component';
import { MissedNoteComponent } from './report/missed-note/missed-note.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
 

@NgModule({
  declarations: [ 
    AppointmentsComponent,
    ManageProfileComponent,
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
    PatientProfileComponent, 
    ReportsComponent,
    MissedNoteComponent,
    ViewInsuranceComponent,
    BillingDetailsComponent
  ],
  imports: [
    CommonModule,
    BillingTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class BillingTeamModule { }
