import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from '../support-team/patient-profile/patient-profile.component'; 
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { EFaxComponent } from './efax/efax.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { NotificationsComponent } from './notifications/notifications.component';
 
const routes: Routes = [
  {
    path: 'user-managment',
    children: [  
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeAdminRoutingModule { }
