import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricelistComponent } from './pricelist.component';
import { PricelistRoutes } from './pricelist.routing';


import { AgGridModule } from 'ag-grid-angular';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    PricelistRoutes,
    AgGridModule.withComponents([]),
    MatDialogModule,
  ],
  declarations: [PricelistComponent]
})
export class PricelistModule { }
