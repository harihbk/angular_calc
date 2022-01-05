import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelComponent } from './excel.component';
import { ExcelRoutes } from './excel.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogicaldropdownComponent } from './logicaldropdown/logicaldropdown.component';
import { ConditionformComponent } from './component/conditionform/conditionform.component';
import { Condition_then_ifComponent } from './component/condition_then_if/condition_then_if.component';
import { Condition_else_ifComponent } from './component/condition_else_if/condition_else_if.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    ExcelRoutes,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  declarations: [
    ExcelComponent,
    LogicaldropdownComponent,
    ConditionformComponent,
    Condition_then_ifComponent,
    Condition_else_ifComponent

  ]
})
export class ExcelModule { }
