import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
 import { EFaxComponent } from './efax/efax.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { authGuard } from 'src/app/shared/services/gaurd/auth.guard';
import { ManageProfileComponent } from 'src/app/shared/component/manage-profile/manage-profile.component';
import { UserListingComponent } from './user-managment/user-listing/user-listing.component';

const routes: Routes = [
  {
    path: 'user-managment',
    children: [ 
      {
        path: 'practice-admin',
        component: UserListingComponent, 
        canActivate:[authGuard]
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
        path: 'practice-admin-profile/:practiceAdminId',
        component: PracticeAdminProfileComponent, 
        canActivate:[authGuard]
      },
      {
        path: 'therapist-admin-profile/:therapistId',
        component: TherapistsAdminProfileComponent, 
        canActivate:[authGuard]
      }, 
      {
        path: 'billing-team',
        component: UserListingComponent, 
      }, 
    ]
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent, 
    canActivate:[authGuard]
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
