import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes'; 
import { AuthLayoutComponent } from './component/auth/auth-layout/auth-layout.component';
import { SystemAdminLayoutComponent } from './shared/component/layout/system-admin-layout/system-admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages/sample-page1',
    pathMatch: 'full'
  }, 

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./component/auth/auth.module').then(mod => mod.AuthModule), 
  },
  {
    path: '',
    component: ContentComponent,
    children: dashData 
  },
  {
    path: 'system-admin',
    component: SystemAdminLayoutComponent, 
    loadChildren: () => import('./component/system-admin/system-admin.module').then(mod => mod.SystemAdminModule), 
    // children: dashData 
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
