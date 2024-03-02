import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';


@NgModule({
  declarations: [
    PracticeAdminComponent ,
    PracticeAdminProfileComponent
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule, 
    AuthRoutingModule,  
  ]
})
export class SystemAdminModule { }
