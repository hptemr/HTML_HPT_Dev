import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ 
    ContentComponent,
    SystemAdminLayoutComponent,
    PatientLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarPatientComponent,
    FeathericonComponent,
    FooterComponent,
    NotificationComponent,   
    ProfileComponent,
    SvgIconComponent,  
    TapToTopComponent,
    LoaderComponent, 
    
  ],
  imports: [
    CommonModule, 
    FormsModule,
    MaterialModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule, 
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
