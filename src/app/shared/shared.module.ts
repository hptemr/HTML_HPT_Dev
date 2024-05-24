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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientLayoutComponent } from './component/layout/patient-layout/patient-layout-layout.component';
import { SidebarPatientComponent } from './component/sidebar-patient/sidebar-patient.component';
import { PatientHeaderComponent } from './component/header-patient/header-patient.component';
import { ManageProfileComponent } from './component/manage-profile/manage-profile.component';
import { UploadImgComponent } from './component/upload-img/upload-img.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { CommonAdminDashboardComponent } from './component/common-admin-dashboard/common-admin-dashboard.component';

// import { AppointmentsComponent } from './comman/support-billing-therapist/appointments/appointments.component';
// import { AppointmentDetailsComponent } from './comman/support-billing-therapist/appointment-details/appointment-details.component';
// import { SystemFollowupModalComponent } from './comman/support-billing-therapist/system-followup-modal/system-followup-modal.component';
// import { AppointmentRequestsComponent } from './comman/support-billing-therapist/appointment-requests/appointment-requests.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ContentComponent,
    AdminLayoutComponent,
    PatientLayoutComponent,
    HeaderComponent,
    PatientHeaderComponent,
    SidebarComponent,
    SidebarPatientComponent,
    FeathericonComponent,
    FooterComponent,
    NotificationComponent,
    ProfileComponent,
    SvgIconComponent,
    TapToTopComponent,
    LoaderComponent,
    ManageProfileComponent,
    UploadImgComponent,
    CommonAdminDashboardComponent,

    // AppointmentsComponent,
    // AppointmentDetailsComponent,
    // SystemFollowupModalComponent,
    // AppointmentRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ImageCropperComponent,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    AdminLayoutComponent,
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
