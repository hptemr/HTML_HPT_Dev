import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; 
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component'; 
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { FileUploadModule  } from 'ng2-file-upload';
import { NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './../../shared/comman/custom-date-parser-formatter';
@NgModule({
  declarations: [ 
    LoginComponent,
    SignupPatientComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminSignupComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule, 
    AuthRoutingModule, 
    MatStepperModule,
    MatCheckboxModule,
    NgOptimizedImage,
    FileUploadModule,
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
})
export class AuthModule {}
