import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { CreateGroupComponent } from './conversations/create-group/create-group.component';
import { AddParticipantsComponent } from './conversations/add-participants/add-participants.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DocumentsComponent } from 'src/app/shared/component/manage-documents/documents/documents/documents.component';
import { AppointmentDocumentsComponent } from 'src/app/shared/component/manage-documents/appointment-documents/appointment-documents.component';
import { SystemDocumentsComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents.component';
import { ProtocolsComponent } from 'src/app/shared/component/manage-documents/protocols/protocols.component';
import { ProtocolDetailedDocumentsComponent } from 'src/app/shared/component/manage-documents/protocols/protocol-detailed-documents/protocol-detailed-documents.component';
import { SystemDocumentsDetailedComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents-detailed/system-documents-detailed.component';
import { AddFolderModalComponent } from 'src/app/shared/component/manage-documents/add-folder-modal/add-folder-modal.component';
import { UploadDocumentsModalComponent } from 'src/app/shared/component/manage-documents/upload-documents-modal/upload-documents-modal.component';
import { ProviderManagementComponent } from './provider-management/provider-management.component';
import { BulkUploadProvidersComponent } from './bulk-upload-providers/bulk-upload-providers.component';
import { MatChipsModule } from '@angular/material/chips';
import { InsuranceManagementComponent } from './insurance-management/insurance-management.component';
import { UploadInsurancesComponent } from './upload-insurances/upload-insurances.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuarterlyPatientsDashboardComponent } from './dashboard/quarterly-patients-dashboard/quarterly-patients-dashboard.component';
import { QuarterlyAquaticComponent } from './dashboard/quarterly-aquatic/quarterly-aquatic.component';
import { QuarterlyEvalsComponent } from './dashboard/quarterly-evals/quarterly-evals.component';


@NgModule({
  declarations: [
    PracticeAdminComponent ,
    PracticeAdminProfileComponent,
    TherapistsComponent,
    TherapistsAdminProfileComponent,
    SupportTeamComponent,
    ManageProfileComponent,
    EFaxComponent,
    BillingTeamComponent,
    InvitePopupComponent,
    PatientsComponent,
    PatientDetailsComponent,
    PatientProfileComponent,
    ManagePracticeComponent,
    ConversationsComponent,
    CreateGroupComponent,
    AddParticipantsComponent,
    NotificationsComponent,
    DocumentsComponent,
    AppointmentDocumentsComponent,
    SystemDocumentsComponent,
    ProtocolsComponent,
    ProtocolDetailedDocumentsComponent,
    SystemDocumentsDetailedComponent,
    AddFolderModalComponent,
    UploadDocumentsModalComponent,
    ProviderManagementComponent,
    BulkUploadProvidersComponent,
    InsuranceManagementComponent,
    UploadInsurancesComponent,
    
    DashboardComponent,
    QuarterlyPatientsDashboardComponent,
    QuarterlyAquaticComponent,
    QuarterlyEvalsComponent
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,
    MatChipsModule
  ]
})
export class SystemAdminModule { }
