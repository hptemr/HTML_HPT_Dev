import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from '../../../shared/component/support-billing-therapist/patients/patients.component';
 import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
// import { ConversationsComponent } from './conversations/conversations.component';
import { CreateGroupComponent } from './conversations/create-group/create-group.component';
import { AddParticipantsComponent } from './conversations/add-participants/add-participants.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserListingComponent } from './user-managment/user-listing/user-listing.component';
import { AdminProfileComponent } from './user-managment/admin-profile/admin-profile.component';
import { SystemAndPracticeRoutingModule } from './system-and-practice-routing.module';
import { ConversationsComponent } from '../../../shared/component/conversations/conversations.component';

@NgModule({
  declarations: [
    UserListingComponent,
    EFaxComponent,
    InvitePopupComponent,
    PatientsComponent,
     ManagePracticeComponent,
    ConversationsComponent,
    CreateGroupComponent,
    AddParticipantsComponent,
    NotificationsComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    SystemAndPracticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class SystemAndPracticeModule { }
