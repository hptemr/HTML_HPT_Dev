import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../../../shared/component/support-billing-therapist/patients/patients.component';
import { EFaxComponent } from './efax/efax.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
// import { ConversationsComponent } from './conversations/conversations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { UserListingComponent } from './user-managment/user-listing/user-listing.component';
import { AdminProfileComponent } from './user-managment/admin-profile/admin-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientDetailsComponent } from 'src/app/shared/component/support-billing-therapist/patient-details/patient-details.component';
import { PatientProfileComponent } from 'src/app/shared/component/support-billing-therapist/patient-profile/patient-profile.component';
import { AppointmentDetailsComponent } from 'src/app/shared/component/support-billing-therapist/appointment-details/appointment-details.component';
import { ConversationsComponent } from '../../../shared/component/conversations/conversations.component';
import { ConversationsChatComponent } from '../../../shared/component/conversations-ui-kits/conversations-chat/conversations-chat.component';
import { DocumentsComponent } from 'src/app/shared/component/manage-documents/documents/documents/documents.component';
import { AppointmentDocumentsComponent } from 'src/app/shared/component/manage-documents/appointment-documents/appointment-documents.component';
import { SystemDocumentsComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents.component';
import { ProtocolsComponent } from 'src/app/shared/component/manage-documents/protocols/protocols.component';
import { ProtocolDetailedDocumentsComponent } from 'src/app/shared/component/manage-documents/protocols/protocol-detailed-documents/protocol-detailed-documents.component';
import { SystemDocumentsDetailedComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents-detailed/system-documents-detailed.component';
import { PreviewComponent } from 'src/app/shared/component/manage-documents/file-preview/preview.component';
import { ProviderManagementComponent } from './doctor-management/provider-management/provider-management.component';
import { BulkUploadProvidersComponent } from './doctor-management/bulk-upload-providers/bulk-upload-providers.component';
import { UploadInsurancesComponent } from './insurance-management/upload-insurances/upload-insurances.component';
import { ManageInsuranceComponent } from './insurance-management/manage-insurance/manage-insurance.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'user-managment',
    children: [
      {
        path: 'practice-admin',
        component: UserListingComponent,
      },
      {
        path: 'therapists',
        component: UserListingComponent,
      },
      {
        path: 'support-team',
        component: UserListingComponent,
      },
      {
        path: 'billing-team',
        component: UserListingComponent,
      },
      {
        path: 'admin-profile/:adminId',
        component: AdminProfileComponent,
      }
    ]
  },
  {
    path: 'appointment-details/:appointmentId',
    component: AppointmentDetailsComponent
  },
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: 'patient-details/:userId',
        component: PatientDetailsComponent,
      },
      {
        path: 'patient-profile/:userId',
        component: PatientProfileComponent,
      }
    ]
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
  },
  {
    path: 'e-fax',
    component: EFaxComponent,
  },
  {
    path: 'manage-practice',
    component: ManagePracticeComponent,
  },
  {
    path: 'conversations',
    component: ConversationsComponent,
  },
  {
    path: 'conversations-chat',
    component: ConversationsChatComponent,
    data: { refreshComponent: true }
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'manage-documents',
    component:DocumentsComponent ,
    children: [  
      {
        path: 'appointment-documents',
        component: AppointmentDocumentsComponent, 
      },
      {
        path: 'system-documents',
        component: SystemDocumentsComponent, 
      },
      {
        path: 'system-documents/system-documents-detailed/:id',
        component: SystemDocumentsDetailedComponent, 
      },
      {
        path: 'protocols',
        component: ProtocolsComponent,
      },
      {
        path: 'protocols/detailed-documents',
        component: ProtocolDetailedDocumentsComponent, 
      }
    ]
  },
  {
    path: 'file-preview/:file',
    component: PreviewComponent, 
  },
  {
    path: 'provider-management',
    component:ProviderManagementComponent   
  },
  {
    path: 'bulk-upload-providers',
    component:BulkUploadProvidersComponent   
  },
  {
    path: 'insurance-management',
    component:ManageInsuranceComponent   
  },
  {
    path: 'upload-insurance',
    component:UploadInsurancesComponent   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAndPracticeRoutingModule { }
