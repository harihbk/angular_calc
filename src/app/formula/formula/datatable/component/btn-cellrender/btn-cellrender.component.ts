import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-btn-cellrender',
  template: `
  <button type="button" (click)="onClick($event)">{{label}}</button>
  `
})

export class BtnCellrenderComponent implements ICellRendererAngularComp  {
  params: any;
  label: any;



  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {

      const params = {
        event: $event,
        rowData: this.params.node.data

      }
      this.params.onClick(params);

    }
  }

}
