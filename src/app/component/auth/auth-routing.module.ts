import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';  
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { loginGuard } from '../../shared/services/gaurd/login.guard';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
 
const routes: Routes = [ 
  {
    path: '',
    component: LoginComponent,
    canActivate:[loginGuard]
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    canActivate:[loginGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:userId/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'patient/signup',
    component: SignupPatientComponent
  },
  {
    path: 'admin/signup/:userId',
    component: AdminSignupComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
