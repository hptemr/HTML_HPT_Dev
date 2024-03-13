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
        path: 'practice-admin-profile',
        component: PracticeAdminProfileComponent, 
      },
      {
        path: 'therapist-admin-profile',
        component: TherapistsAdminProfileComponent, 
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
