import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';  
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupSupportTeamComponent } from './signup-support-team/signup-support-team.component';
import { PracticeAdminSignupComponent } from './practice-admin-signup/practice-admin-signup.component';

const routes: Routes = [ 
  {
    path: '',
    component: LoginComponent
  },  
  {
    path: 'patient/signup',
    component: SignupPatientComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },  
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'support-team/signup',
    component: SignupSupportTeamComponent
  },
  {
    path: 'practce-admin/signup',
    component: PracticeAdminSignupComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
