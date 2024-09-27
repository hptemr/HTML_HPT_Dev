import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ContentComponent } from './component/layout/content/content.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FeathericonComponent } from './component/feathericon/feathericon.component';
import { FooterComponent } from './component/footer/footer.component';
import { NotificationComponent } from './component/header/notification/notification.component';   
import { ProfileComponent } from './component/header/profile/profile.component';
import { SvgIconComponent } from './component/svg-icon/svg-icon.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { TapToTopComponent } from './component/tap-to-top/tap-to-top.component';
import { LoaderComponent } from './component/loader/loader.component'; 
import { MaterialModule } from './material.module';
import { SystemAdminLayoutComponent } from './component/layout/system-admin-layout/system-admin-layout.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLayoutComponent } from './component/layout/patient-layout/patient-layout-layout.component';
import { SidebarPatientComponent } from './component/sidebar-patient/sidebar-patient.component';
import { SupportTeamLayoutComponent } from './component/layout/support-team-layout/support-team-layout.component';
import { SupportTeamHeaderComponent } from './component/support-team-header/support-team-header.component';
import { SidebarSupportTeamComponent } from './component/sidebar-support-team/sidebar-support-team.component';
import { PatientHeaderComponent } from './component/header-patient/header-patient.component';
import { PracticeAdminHeaderComponent } from './component/header-practice-admin/header-practice-admin.component';
import { PracticeAdminLayoutComponent } from './component/layout/practice-admin-layout/practice-admin-layout.component';
import { SidebarPracticeAdminComponent } from './component/sidebar-practice-admin/sidebar-practice-admin.component';
import { TherapistLayoutComponent } from './component/layout/therapist-layout/therapist-layout.component';
import { TherapistHeaderComponent } from './component/header-therapist/header-therapist.component';
import { SidebarTherapistComponent } from './component/sidebar-therapist/sidebar-therapist.component';
import { SidebarBillingTeamComponent } from './component/sidebar-billing-team/sidebar-billing-team.component';
import { BillingTeamHeaderComponent } from './component/header-billing-team/header-billing-team.component';
import { BillingTeamLayoutComponent } from './component/layout/billing-team-layout/billing-team-layout.component';
import { SchedulerComponent } from './comman/scheduler/scheduler.component';
import { CreateAppointmentModalComponent } from './comman/scheduler/create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from './comman/scheduler/edit-appointment-modal/edit-appointment-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ 
    ContentComponent,

    SystemAdminLayoutComponent,
    PracticeAdminLayoutComponent,
    PatientLayoutComponent,
    SupportTeamLayoutComponent,
    TherapistLayoutComponent,
    BillingTeamLayoutComponent,

    HeaderComponent,
    SupportTeamHeaderComponent,
    PatientHeaderComponent,
    PracticeAdminHeaderComponent,
    TherapistHeaderComponent,
    BillingTeamHeaderComponent,

    SidebarComponent,
    SidebarPatientComponent,
    SidebarPracticeAdminComponent,
    SidebarSupportTeamComponent,
    SidebarTherapistComponent,
    SidebarBillingTeamComponent,
   

    FeathericonComponent,
    FooterComponent,
    NotificationComponent,   
    ProfileComponent,
    SvgIconComponent,  
    TapToTopComponent,
    LoaderComponent, 

    SchedulerComponent,
    CreateAppointmentModalComponent,
    EditAppointmentModalComponent
    
  ],
  imports: [
    CommonModule, 
    FormsModule,
    MaterialModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule, 
    NgOptimizedImage,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    SystemAdminLayoutComponent,
    PatientLayoutComponent,
    FeathericonComponent,
    LoaderComponent,
    SvgIconComponent, 
    TapToTopComponent,
    TranslateModule,
    NgbModule, 
    MaterialModule
  ]
})
export class SharedModule { }
