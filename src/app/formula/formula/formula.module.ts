import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaComponent } from './formula.component';
import { FormulaRoutes } from './formula.routing';
import {MatTabsModule} from '@angular/material/tabs';
import { Manufacturing_formulaComponent } from './manufacturing_formula/manufacturing_formula.component';
import { Child_safteyComponent } from './child_saftey/child_saftey.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from 'src/app/sharedmodule/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormulaRoutes,
    HttpClientModule,
    MatTabsModule,
    MatGridListModule,
    MatRadioModule,
    MatDialogModule,
    MaterialModule
   // AgGridModule.withComponents([])
  ],
  declarations: [
    FormulaComponent,
    Manufacturing_formulaComponent,
    Child_safteyComponent
  ]
})
export class FormulaModule { }
