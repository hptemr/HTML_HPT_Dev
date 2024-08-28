import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';  
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { loginGuard } from '../../shared/services/gaurd/login.guard';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { TermsOfServicesComponent } from 'src/app/shared/comman/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from 'src/app/shared/comman/privacy-policy/privacy-policy.component';
 
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
    path: 'admin/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'admin/reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'signup',
    component: SignupPatientComponent,
    canActivate:[loginGuard]
  },
  {
    path: 'admin/signup/:userId',
    component: AdminSignupComponent
  },
  {
    path: 'terms-of-services',
    component: TermsOfServicesComponent, 
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent, 
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
