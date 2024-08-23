import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';  
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupSupportTeamComponent } from './signup-support-team/signup-support-team.component';
import { PracticeAdminSignupComponent } from './practice-admin-signup/practice-admin-signup.component';
import { TherapistSignupComponent } from './therapist-signup/therapist-signup.component';
import { BillingTeamSignupComponent } from './billing-team-signup/billing-team-signup.component';
import { TermsOfServicesComponent } from 'src/app/shared/component/terms-of-services/terms-of-services.component';

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
  {
    path: 'therapist/signup',
    component: TherapistSignupComponent
  },
  {
    path: 'billing-team/signup',
    component: BillingTeamSignupComponent
  },
  {
    path: 'terms-of-services',
    component: TermsOfServicesComponent
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
