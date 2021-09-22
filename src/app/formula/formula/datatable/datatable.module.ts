import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { DatatableComponent } from './datatable.component';
import { DatatableRoutes } from './datatable.routing';
import {MatDialogModule} from '@angular/material/dialog';
import { BtnCellrenderComponent } from "../datatable/component/btn-cellrender/btn-cellrender.component";

@NgModule({
  imports: [
    CommonModule,
    DatatableRoutes,
    AgGridModule.withComponents([BtnCellrenderComponent]),
    MatDialogModule,
    
  ],
  entryComponents:[ BtnCellrenderComponent ],
  declarations: [DatatableComponent , BtnCellrenderComponent ]
})
export class DatatableModule { }
