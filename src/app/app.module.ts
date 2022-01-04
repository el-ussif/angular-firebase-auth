import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CustomersLayoutComponent } from './layouts/customers-layout/customers-layout.component';
import { InvestorsLayoutComponent } from './layouts/investors-layout/investors-layout.component';
import { ProvidersLayoutComponent } from './layouts/providers-layout/providers-layout.component';
import { SuperAdminsLayoutComponent } from './layouts/super-admins-layout/super-admins-layout.component';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AccountConfigurationComponent } from './pages/auth/account-configuration/account-configuration.component';
import { AfterLoginComponent } from './pages/auth/after-login/after-login.component';
import { AuthService } from './pages/auth/auth.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SendPasswordResetFormComponent } from './pages/auth/send-password-reset-form/send-password-reset-form.component';
import { BackofficeModule } from './pages/backoffice/backoffice.module';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { UnautorizeComponent } from './pages/unautorize/unautorize.component';
import { TestComponent } from './test/test.component';
import { TesteurComponent } from './testeur/testeur.component';
import { HttpErrorInterceptors } from './utils/http/http-error-interceptors';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TesteurComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    PresentationComponent,
    LoginComponent,
    CustomersLayoutComponent,
    SuperAdminsLayoutComponent,
    InvestorsLayoutComponent,
    ProvidersLayoutComponent,
    SendPasswordResetFormComponent,
    AfterLoginComponent,
    ResetPasswordComponent,
    AccountConfigurationComponent,
    UnautorizeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    ModalModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MiscellaneousModule,
    CustomFormsModule,
    NgxDropzoneModule,
    BackofficeModule,

  ],
  providers: [
    AuthService,
    {
      useClass: HttpErrorInterceptors,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
  ],
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
