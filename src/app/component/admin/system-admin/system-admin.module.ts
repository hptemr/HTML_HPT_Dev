import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SystemAdminRoutingModule } from './system-admin-routing.module'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { CreateGroupComponent } from './conversations/create-group/create-group.component';
import { AddParticipantsComponent } from './conversations/add-participants/add-participants.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserListingComponent } from './user-managment/user-listing/user-listing.component';
 
@NgModule({
  declarations: [
    UserListingComponent,
    PracticeAdminProfileComponent,
    TherapistsAdminProfileComponent,
    EFaxComponent,
    InvitePopupComponent,
    PatientsComponent,
    PatientDetailsComponent,
    PatientProfileComponent,
    ManagePracticeComponent,
    ConversationsComponent,
    CreateGroupComponent,
    AddParticipantsComponent,
    NotificationsComponent
    
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class SystemAdminModule { }
