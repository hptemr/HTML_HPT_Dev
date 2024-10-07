import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BillingTeamRoutingModule } from './billing-team-routing.module';


import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { SystemFollowupModalComponent } from './system-followup-modal/system-followup-modal.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

@NgModule({
  declarations: [ 
    AppointmentDetailsComponent,
    SystemFollowupModalComponent,
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
