import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SupportTeamRoutingModule } from './support-team-routing.module';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';


@NgModule({
  declarations: [ 
    AppointmentsComponent,
    ManageProfileComponent
  ],
  imports: [
    CommonModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class SupportTeamModule { }
