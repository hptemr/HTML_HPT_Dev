import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes'; 
import { AuthLayoutComponent } from './component/auth/auth-layout/auth-layout.component';
import { SystemAdminLayoutComponent } from './shared/component/layout/system-admin-layout/system-admin-layout.component';

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
