import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcmoduleComponent } from './calcmodule.component';
import { CalcmoduleRoutes } from './calcmodule.routing';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, ScheduleAllModule} from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';






import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';

import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import {  RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';


import { GridAllModule } from '@syncfusion/ej2-angular-grids'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';



@NgModule({
  imports: [
    CommonModule,
    CalcmoduleRoutes,
    ScheduleAllModule,
    ButtonModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,   
    NumericTextBoxAllModule, 
    TextBoxAllModule, 
    DatePickerAllModule, 
    TimePickerAllModule, 
    DateTimePickerAllModule, 
    CheckBoxAllModule,   
    ToolbarAllModule,
    GridAllModule,
     ContextMenuAllModule, 
     MaskedTextBoxModule,
      UploaderAllModule, 
      DropDownListAllModule, 
      MultiSelectAllModule,   
      TreeViewModule, 
      ButtonAllModule, 
      DropDownButtonAllModule, 
      SwitchAllModule, 
      ToastAllModule,
  ],
  declarations: [CalcmoduleComponent],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }
  ]
})
export class CalcmoduleModule { }
