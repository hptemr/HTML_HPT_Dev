import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BillingTeamRoutingModule } from './billing-team-routing.module';

@NgModule({
  declarations: [ 
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
