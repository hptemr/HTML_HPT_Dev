import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './component/auth/auth-layout/auth-layout.component';
import { PatientLayoutComponent } from './shared/component/layout/patient-layout/patient-layout-layout.component';
import { AdminLayoutComponent } from './shared/component/layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./component/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    loadChildren: () => import('./component/patient/patient.module').then(mod => mod.PatientModule),
    // canActivate: [AuthGuard], data: { roles: ['patient'] }
  },
  {
    path: 'system-admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./component/admin/system-admin/system-admin.module').then(mod => mod.SystemAdminModule),
    // canActivate: [AuthGuard], data: { roles: ['system_admin'] }
  },
  {
    path: 'practice-admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./component/admin/practice-admin/practice-admin.module').then(mod => mod.PracticeAdminModule),
    // canActivate: [AuthGuard], data: { roles: ['practice_admin'] }
  },

  {
    path: 'support-team',
    component: AdminLayoutComponent,
    loadChildren: () => import('./component/admin/support-team/support-team.module').then(mod => mod.SupportTeamModule),
    // canActivate: [AuthGuard], data: { roles: ['support_team'] }
  },
  {
    path: 'therapist',
    component: AdminLayoutComponent,
    loadChildren: () => import('./component/admin/therapist/therapist.module').then(mod => mod.TherapistModule),
    // canActivate: [AuthGuard], data: { roles: ['therapist'] }
  },
  {
    path: 'billing-team',
    component: AdminLayoutComponent,
    loadChildren: () => import('./component/admin/billing-team/billing-team.module').then(mod => mod.BillingTeamModule),
    // canActivate: [AuthGuard], data: { roles: ['billing_team'] }
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
