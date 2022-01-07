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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AndComponent } from './component/conditionform/operators/and/and.component';
import { OrComponent } from './component/conditionform/operators/or/or.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ExcelRoutes,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule
  ],
  declarations: [
    ExcelComponent,
    LogicaldropdownComponent,
    ConditionformComponent,
    Condition_then_ifComponent,
    Condition_else_ifComponent,
    AndComponent,
    OrComponent

  ]
})
export class ExcelModule { }
