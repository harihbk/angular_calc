import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NeweventRoutes } from './newevent.routing';
import { NeweventComponent } from './newevent.component';
import { EditortemplateComponent } from './editortemplate/editortemplate.component';



@NgModule({
  imports: [
    CommonModule,
    RecurrenceEditorModule,
    DropDownListAllModule,
    NeweventRoutes

  ],
  declarations: [NeweventComponent,EditortemplateComponent]
})
export class CalModule { }
