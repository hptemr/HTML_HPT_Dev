import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { EFaxComponent } from './efax/efax.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { authGuard } from 'src/app/shared/services/gaurd/auth.guard';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { UserListingComponent } from './user-managment/user-listing/user-listing.component';
import { AdminProfileComponent } from './user-managment/admin-profile/admin-profile.component';
import { CommonAdminDashboardComponent } from 'src/app/shared/component/common-admin-dashboard/common-admin-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CommonAdminDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-managment',
    children: [
      {
        path: 'practice-admin',
        component: UserListingComponent,
        canActivate: [authGuard]
      },
      {
        path: 'therapists',
        component: UserListingComponent,
        canActivate: [authGuard]
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
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'patients',
    children: [
      {
        path: 'list',
        component: PatientsComponent,
      },
      {
        path: 'patient-details',
        component: PatientDetailsComponent,
      },
      {
        path: 'patient-profile',
        component: PatientProfileComponent,
      }
    ]
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
    canActivate: [authGuard]
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
