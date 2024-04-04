import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component'; 
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
 

@NgModule({
  declarations: [ 
    LoginComponent,
    SignupPatientComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule, 
    AuthRoutingModule, 
    MatStepperModule
  ],
})
export class AuthModule {}
