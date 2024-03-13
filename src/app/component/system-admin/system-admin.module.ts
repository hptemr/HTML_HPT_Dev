import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';


@NgModule({
  declarations: [
    PracticeAdminComponent ,
    PracticeAdminProfileComponent,
    TherapistsComponent,
    TherapistsAdminProfileComponent,
    SupportTeamComponent,
    ManageProfileComponent,
    EFaxComponent
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
