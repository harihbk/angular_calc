import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingRoutes } from './app-routing.routing';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import  { Formula_sectionComponent } from "../app/formula/formula/datatable/component/formula_section/formula_section.component";
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
    MatDialogModule
  ],
  providers: [],
  entryComponents: [Formula_sectionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
