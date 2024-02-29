import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component';
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { PatientsComponent } from './user-managment/patients/patients.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'sample-page1',
      //   component: SamplePage1Component,
      //   // data: {
      //   //   title: "Sample-page1",
      //   //   breadcrumb: "Default",
      //   // }
      // },
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
