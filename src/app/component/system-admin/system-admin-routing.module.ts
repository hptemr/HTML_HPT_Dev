import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component';
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { EFaxComponent } from './efax/efax.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DocumentsComponent } from 'src/app/shared/component/manage-documents/documents/documents/documents.component';
import { AppointmentDocumentsComponent } from 'src/app/shared/component/manage-documents/appointment-documents/appointment-documents.component';
import { SystemDocumentsComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents.component';
import { ProtocolsComponent } from 'src/app/shared/component/manage-documents/protocols/protocols.component';
import { ProtocolDetailedDocumentsComponent } from 'src/app/shared/component/manage-documents/protocols/protocol-detailed-documents/protocol-detailed-documents.component';
import { SystemDocumentsDetailedComponent } from 'src/app/shared/component/manage-documents/system-documents/system-documents-detailed/system-documents-detailed.component';
import { ProviderManagementComponent } from './provider-management/provider-management.component';

const routes: Routes = [
  {
    path: 'user-managment',
    children: [ 
      {
        path: 'practice-admin',
        component: PracticeAdminComponent, 
      },
      {
        path: 'therapists',
        component: TherapistsComponent, 
      },
      {
        path: 'support-team',
        component: SupportTeamComponent, 
      },
      {
        path: 'billing-team',
        component: BillingTeamComponent, 
      },
      {
        path: 'patients',
        component: PatientsComponent, 
      },
      {
        path: 'patient-details',
        component: PatientDetailsComponent, 
      },
      {
        path: 'patient-profile',
        component: PatientProfileComponent, 
      },
      {
        path: 'practice-admin-profile',
        component: PracticeAdminProfileComponent, 
      },
      {
        path: 'therapist-admin-profile',
        component: TherapistsAdminProfileComponent, 
      }, 
      {
        path: 'billing-team',
        component: BillingTeamComponent, 
      }, 
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
        path: 'system-documents/system-documents-detailed',
        component: SystemDocumentsDetailedComponent, 
      },
      {
        path: 'protocols',
        component: ProtocolsComponent,
      },
      {
        path: 'protocols/detailed-documents',
        component: ProtocolDetailedDocumentsComponent, 
      },  
    ]
  },
  {
    path: 'provider-management',
    component:ProviderManagementComponent   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
