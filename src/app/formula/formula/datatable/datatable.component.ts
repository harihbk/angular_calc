import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IDatasource , IGetRowsParams, RowDragEnterEvent} from 'ag-grid-community';
import { CommonService } from '../../services/common.service';
import {MatDialog} from '@angular/material/dialog';
import { Formula_sectionComponent } from '../datatable/component/formula_section/formula_section.component';
import { BtnCellrenderComponent } from "../datatable/component/btn-cellrender/btn-cellrender.component";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {

  //datatable
  public gridApi:any;
  public gridColumnApi:any;

  public columnDefs:any;
  public defaultColDef:any;
  public rowModelType:any;
  public serverSideStoreType:any;
  public paginationPageSize:any;
  public cacheBlockSize:any;
  public rowData:any= [];
  public defaultPageSize:any;
  public agGridOptions:any;
  //datatable

  sub: any;
  title: any;
  frameworkComponents: any;

  constructor(
    private route: ActivatedRoute ,
    private service   :CommonService,
    public dialog: MatDialog
    ) {

      this.frameworkComponents = {
        buttonRenderer: BtnCellrenderComponent,
      }

      this.columnDefs = [

      
        { field: 'variablename' , filter: 'agTextColumnFilter'  },
        { field: 'productid' },
        { field: 'formula' },
        { field: 'Action',
        width: 110,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: 'Click 1'
        }
        },


      ];

      this.defaultColDef = {
        sortable: true,
        flex: 1,
        minWidth: 90,
        resizable: true,
      };
      this.rowModelType = 'infinite';
      this.serverSideStoreType = 'partial';
      this.paginationPageSize = 10;
      this.cacheBlockSize = 10;

      this.agGridOptions = {

        pagination: true,
        paginationPageSize: 10,
        rowModelType: 'infinite',
        rowHeight: 40,
        columnDefs: [],
        headerHeight: 45,
        suppressContextMenu: true,
        enableSorting: true,
        icons: {
          sortAscending: '<span class="ag-icon ag-icon-small-down"></span>',
          groupContracted: '<span class="ag-icon ag-icon-small-right"></span>'
        },

      };

      onRowDragEnter: (event: RowDragEnterEvent) => {
        this.onRowDragEnter(event);
    }


    }

    onRowDragEnter(ev:any){
      console.log(ev)
    }



  ngOnInit() {
    this.sub = this.route
    .data
    .subscribe(response => {
      this.title = response
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   // this.gridApi.showNoRowsOverlay(); // show NoRowsOverlay
    this.gridApi.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.service.getUsers(this.gridApi.paginationGetCurrentPage()+1).subscribe(response => {
        console.log([this.gridApi.paginationGetPageSize(), this.gridApi.paginationGetCurrentPage()]);

        params.successCallback(
          response.data, response.total
        );
      })
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(Formula_sectionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onBtnClick1(e:any) {
    console.log(e)
    const dialogRef = this.dialog.open(Formula_sectionComponent,{
      width: '1500px',
      data :e.rowData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

