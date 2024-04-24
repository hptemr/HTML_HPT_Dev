import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthLayoutComponent } from './component/auth/auth-layout/auth-layout.component';
import { SystemAdminLayoutComponent } from './shared/component/layout/system-admin-layout/system-admin-layout.component';
import { PatientLayoutComponent } from './shared/component/layout/patient-layout/patient-layout-layout.component';
import { SupportTeamLayoutComponent } from './shared/component/layout/support-team-layout/support-team-layout.component';
import { PracticeAdminLayoutComponent } from './shared/component/layout/practice-admin-layout/practice-admin-layout.component';
import { TherapistLayoutComponent } from './shared/component/layout/therapist-layout/therapist-layout.component';
import { BillingTeamLayoutComponent } from './shared/component/layout/billing-team-layout/billing-team-layout.component';

const routes: Routes = [  
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./component/auth/auth.module').then(mod => mod.AuthModule),  
  },
  {
    path: 'system-admin',
    component: SystemAdminLayoutComponent, 
    loadChildren: () => import('./component/system-admin/system-admin.module').then(mod => mod.SystemAdminModule),  
  },
  {
    path: 'practice-admin',
    component: PracticeAdminLayoutComponent, 
    loadChildren: () => import('./component/practice-admin/practice-admin.module').then(mod => mod.PracticeAdminModule),  
  },
  {
    path: 'patient',
    component: PatientLayoutComponent, 
    loadChildren: () => import('./component/patient/patient.module').then(mod => mod.PatientModule),  
  },
 
  {
    path: 'support-team',
    component: SupportTeamLayoutComponent, 
    loadChildren: () => import('./component/support-team/support-team.module').then(mod => mod.SupportTeamModule),  
  },
  {
    path: 'therapist',
    component: TherapistLayoutComponent, 
    loadChildren: () => import('./component/therapist/therapist.module').then(mod => mod.TherapistModule),  
  },
  {
    path: 'billing-team',
    component: BillingTeamLayoutComponent, 
    loadChildren: () => import('./component/billing-team/billing-team.module').then(mod => mod.BillingTeamModule),  
  },

  // {
  //   path: '**',
  //   redirectTo: '/error-page/error404',
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
