import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { PracticeAdminRoutingModule } from './practice-admin-routing.module'; 
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
 import { EFaxComponent } from './efax/efax.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component'; 
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { CreateGroupComponent } from './conversations/create-group/create-group.component';
import { AddParticipantsComponent } from './conversations/add-participants/add-participants.component';
import { NotificationsComponent } from './notifications/notifications.component';
  

@NgModule({
  declarations: [   
    TherapistsComponent,
    TherapistsAdminProfileComponent,
    SupportTeamComponent,
     EFaxComponent,
    BillingTeamComponent,
    InvitePopupComponent,
    PatientsComponent,
    PatientDetailsComponent, 
    ManagePracticeComponent,
    ConversationsComponent,
    CreateGroupComponent,
    AddParticipantsComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    PracticeAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class PracticeAdminModule { }
