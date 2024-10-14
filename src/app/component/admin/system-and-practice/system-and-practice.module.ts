import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from '../../../shared/component/support-billing-therapist/patients/patients.component';
 import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
// import { ConversationsComponent } from './conversations/conversations.component';
// import { CreateGroupComponent } from './conversations/create-group/create-group.component';
// import { AddParticipantsComponent } from './conversations/add-participants/add-participants.component';
import { NotificationsComponent } from './notifications/notifications.component';
//import { UserListingComponent } from './user-managment/user-listing/user-listing.component';
import { AdminProfileComponent } from './user-managment/admin-profile/admin-profile.component';
import { SystemAndPracticeRoutingModule } from './system-and-practice-routing.module';
import { ConversationsComponent } from '../../../shared/component/conversations/conversations.component';
import { ConversationsChatComponent } from '../../../shared/component/conversations-ui-kits/conversations-chat/conversations-chat.component';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { DocumentsComponent } from 'src/app/shared/component/manage-documents/documents/documents/documents.component';
import { AppointmentDocumentsComponent } from 'src/app/shared/component/manage-documents/appointment-documents/appointment-documents.component';
import { SystemDocumentsComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents.component';
import { ProtocolsComponent } from 'src/app/shared/component/manage-documents/protocols/protocols.component';
import { ProtocolDetailedDocumentsComponent } from 'src/app/shared/component/manage-documents/protocols/protocol-detailed-documents/protocol-detailed-documents.component';
import { SystemDocumentsDetailedComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents-detailed/system-documents-detailed.component';
import { AddFolderModalComponent } from 'src/app/shared/component/manage-documents/add-folder-modal/add-folder-modal.component';
import { UploadDocumentsModalComponent } from 'src/app/shared/component/manage-documents/upload-documents-modal/upload-documents-modal.component';
import { PreviewComponent } from 'src/app/shared/component/manage-documents/file-preview/preview.component';
import { FilePreviewComponent } from 'src/app/shared/component/file-preview-model/file-preview-model.component';
import { ProviderManagementComponent } from './doctor-management/provider-management/provider-management.component';
import { BulkUploadProvidersComponent } from './doctor-management/bulk-upload-providers/bulk-upload-providers.component';
import { UploadInsurancesComponent } from './insurance-management/upload-insurances/upload-insurances.component';
import { ManageInsuranceComponent } from './insurance-management/manage-insurance/manage-insurance.component';

@NgModule({
  declarations: [
    //UserListingComponent,
    EFaxComponent,
    InvitePopupComponent,
    PatientsComponent,
    ManagePracticeComponent,
    ConversationsComponent,
    ConversationsChatComponent,
    // CreateGroupComponent,
    // AddParticipantsComponent,
    NotificationsComponent,
    AdminProfileComponent,
    DocumentsComponent,
    AppointmentDocumentsComponent,
    SystemDocumentsComponent,
    ProtocolsComponent,
    ProtocolDetailedDocumentsComponent,
    SystemDocumentsDetailedComponent,
    AddFolderModalComponent,
    UploadDocumentsModalComponent,
    PreviewComponent,
    FilePreviewComponent,
    ProviderManagementComponent,
    BulkUploadProvidersComponent,
    ManageInsuranceComponent,
    UploadInsurancesComponent
  ],
  imports: [
    CommonModule,
    SystemAndPracticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CometChatConversationsWithMessages
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemAndPracticeModule { }
