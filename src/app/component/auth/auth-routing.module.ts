import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';  
import { SignupPatientComponent } from './signup-patient/signup-patient.component';

const routes: Routes = [ 
  {
    path: 'signin',
    component: LoginComponent
  },  
  {
    path: 'patient/signup',
    component: SignupPatientComponent
  },  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
