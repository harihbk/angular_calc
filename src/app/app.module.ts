import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingRoutes } from './app-routing.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import  { Formula_sectionComponent } from "../app/formula/formula/datatable/component/formula_section/formula_section.component";
import { MaterialModule } from './sharedmodule/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
// import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    Formula_sectionComponent,
   
  ],
  imports: [ 
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
  
  ],
  providers: [],
  entryComponents: [Formula_sectionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
