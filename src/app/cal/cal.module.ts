import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalComponent } from './cal.component';
import { CalRoutes } from './cal.routing';


import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';

import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';


import { BrowserModule } from '@angular/platform-browser';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { CustomjobComponent } from './customjob/customjob.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NeweventComponent } from './newevent/newevent.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CalRoutes,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
     NumericTextBoxAllModule,
     TextBoxAllModule,
     DatePickerAllModule,
     TimePickerAllModule,
      DateTimePickerAllModule,
       CheckBoxAllModule,
        ToolbarAllModule,
        DropDownListAllModule,
        ContextMenuAllModule,
        MaskedTextBoxModule,
         UploaderAllModule,
         MultiSelectAllModule,
          TreeViewModule,
          ButtonAllModule,
          DropDownButtonAllModule,
           SwitchAllModule,
            ToastAllModule,
            CalendarModule,
            DialogModule
  ],
  declarations: [CalComponent,CustomjobComponent]
})
export class CalModule { }
