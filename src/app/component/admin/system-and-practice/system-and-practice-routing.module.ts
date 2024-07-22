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
    path: 'notifications',
    component: NotificationsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAndPracticeRoutingModule { }
