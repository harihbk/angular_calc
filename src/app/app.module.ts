import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingRoutes } from './app-routing.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import  { Formula_sectionComponent } from "../app/formula/formula/datatable/component/formula_section/formula_section.component";
import { MaterialModule } from './sharedmodule/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
// import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider} from "angularx-social-login";
import {MatButtonModule} from '@angular/material/button';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from 'ng-gapi';
import { TokenInterceptorService } from './calcmodule/token-interceptor.service';

import {NgxFsModule} from 'ngx-fs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout/layout.module';





let gapiClientConfig: NgGapiClientConfig = {
  client_id: "421629888233-cdqm5rdeakdjvghies922jv0036tfcpj.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events"
  ].join(" ")
};



@NgModule({
  declarations: [
    AppComponent,
    Formula_sectionComponent

   ],
  imports: [
    LayoutModule,
    BrowserModule,
    AppRoutingRoutes,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    MatCardModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SocialLoginModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

       BrowserModule,
       MatButtonModule,
       NgxFsModule

  ],



  providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptorService,
  //     multi: true
  // }
  ],
  entryComponents: [Formula_sectionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
