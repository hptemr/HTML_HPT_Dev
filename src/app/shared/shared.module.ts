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
import { BookmarkComponent } from './component/header/bookmark/bookmark.component';
import { MessageComponent } from './component/header/message/message.component';
import { CartComponent } from './component/header/cart/cart.component';
import { ThemeComponent } from './component/header/theme/theme.component';
import { LanguageComponent } from './component/header/language/language.component';
import { ProfileComponent } from './component/header/profile/profile.component';
import { SvgIconComponent } from './component/svg-icon/svg-icon.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { SearchComponent } from './component/header/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TapToTopComponent } from './component/tap-to-top/tap-to-top.component';
import { LoaderComponent } from './component/loader/loader.component'; 
import { MaterialModule } from './material.module';
import { SystemAdminLayoutComponent } from './component/layout/system-admin-layout/system-admin-layout.component'; 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ 
    ContentComponent,
    SystemAdminLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FeathericonComponent,
    FooterComponent,
    NotificationComponent,
    BookmarkComponent,
    MessageComponent,
    CartComponent,
    ThemeComponent,
    LanguageComponent,
    ProfileComponent,
    SvgIconComponent,
    BreadcrumbComponent,
    SearchComponent,
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
    FormsModule, 
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    SystemAdminLayoutComponent,
    FeathericonComponent,
    LoaderComponent,
    SvgIconComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    TranslateModule,
    NgbModule, 
    MaterialModule
  ]
})
export class SharedModule { }
