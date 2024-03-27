import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { PracticeAdminComponent } from './user-managment/practice-admin/practice-admin.component'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { PracticeAdminProfileComponent } from './user-managment/practice-admin-profile/practice-admin-profile.component';
import { TherapistsComponent } from './user-managment/therapists/therapists.component';
import { TherapistsAdminProfileComponent } from './user-managment/therapists-admin-profile/therapists-admin-profile.component';
import { SupportTeamComponent } from './user-managment/support-team/support-team.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFaxComponent } from './efax/efax.component';
import { BillingTeamComponent } from './user-managment/billing-team/billing-team.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { PatientsComponent } from './user-managment/patients/patients.component';
import { PatientDetailsComponent } from './user-managment/patient-details/patient-details.component';
import { PatientProfileComponent } from './user-managment/patient-profile/patient-profile.component';
import { ManagePracticeComponent } from './manage-practice/manage-practice.component';


@NgModule({
  declarations: [
    PracticeAdminComponent ,
    PracticeAdminProfileComponent,
    TherapistsComponent,
    TherapistsAdminProfileComponent,
    SupportTeamComponent,
    ManageProfileComponent,
    EFaxComponent,
    BillingTeamComponent,
    InvitePopupComponent,
    PatientsComponent,
    PatientDetailsComponent,
    PatientProfileComponent,
    ManagePracticeComponent
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class SystemAdminModule { }
