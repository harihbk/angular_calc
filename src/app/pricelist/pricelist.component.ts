import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { RowNode } from 'ag-grid-community';


@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {
   gridApi : any;
   gridColumnApi : any;
   rowData: any=[];

   columnDefs : any;
   rowSelection : any;
  
  newCount:number = 1;
  agGridOptions:any;
  gridOptions: any;
  defaultColDef: { editable: boolean; flex: number; minWidth: number; resizable: boolean; };
  getarray: any;
  columnindex: any;
  rowindex: any;
  column_setindex: number = 0;
  column_setindex_down: number = 0;

  constructor(
    private http: HttpClient
  ) { 

   

    this.columnDefs = [
      {
        headerName: "Make",
        field: "make"
      },
      {
        headerName: "Model",
        field: "model"
      },
      {
        headerName: "Price",
        field: "price"
      },
    
    ];
    this.rowData = [
      {
        make: "Toyota",
        model: "Celica",
        price: 35000,
     
      },
      {
        make: "Ford",
        model: "Mondeo",
        price: 32000,
      
      },
      {
        make: "Porsche",
        model: "Boxter",
        price: 72000,
      
      }
    ];


    this.defaultColDef = {
      editable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';

    
  }


  ngOnInit() {
   
  }


  onPasteStart(params:any) {
   // console.log('Callback onPasteStart:', params);
  }


  onCellValueChanged(params:any) {
    //console.log('Callback onCellValueChanged:', params);
  }  

  onPasteEnd(params:any) {

    

    let d = JSON.parse(localStorage.getItem("copydata") || '{}')
    this.columnDefs= this.gridApi.getColumnDefs();
    var Column = {};
    var dd = [];
    var columnc = this.columnDefs.length-this.columnindex
    // i initialize  when user click column cell
    /**
     * create new column
     * setColumnDefs is to refresh  cell
     * column_setindex  increment number in column
     * **/
    for(var i = this.columnDefs.length-this.columnindex ; i < d[0].length ; i++){
          this.columnDefs.push({ 
            headerName: `Column${this.column_setindex}`,
            field: `Column${this.column_setindex}`,
            editable: true,
          })    
          this.gridApi.setColumnDefs(this.columnDefs);
          this.column_setindex++;
    }
    
    /**
     * splice column from 2 dimension array
     * **/

    var array = d.map(function(item:any){
      return item.splice(columnc);
    });

      /**
     * splice column from 2 dimension array
     * **/


    /**
     * Transponse matrix
     * **/
    var row_to_column= array.reduce((prev:any, next:any) => next.map((item:any, i:any) =>
    (prev[i] || []).concat(next[i])
      ), []);
     /**
     * Transponse matrix
     * **/

  
    /**
     * append each value to rows and column
     * **/
    for(var n=0;n<row_to_column.length;n++){
      var colname =  `Column${this.column_setindex_down}`
      this.gridApi.forEachNode(function (rowNode:RowNode) {
        var k = rowNode.rowIndex || 0
        rowNode.setDataValue(colname,row_to_column[n][k]) 
        })
        this.column_setindex_down++;
      }

      /**
     * append each value to rows and column
     * **/

   
  }

  setHeaderNames() {
    // change headers
         var columnDefs = this.gridApi.getColumnDefs();
        // columnDefs.forEach(function(colDef:any, index:any) {
        //   console.log(columnDefs);
        //    // colDef.headerName = "C" + index;
        // });
        this.columnDefs = columnDefs;
    
        this.columnDefs.push({
          headerName: "dsfds",
          field: "dsfds"
        })

   


  }

  CellClickedEvent(params:any){
    //this.gridApi.column.colDef.id
    //column index
    var focusedCell = this.gridApi.getFocusedCell();    
    this.columnindex = this.gridColumnApi.getAllDisplayedColumns().indexOf(focusedCell.column);
    this.rowindex    = params.rowIndex;
  }

  onBtCopyRows() {
    this.gridApi.copySelectedRowsToClipboard();
  }

  onBtCopyRange() {
    this.gridApi.copySelectedRangeToClipboard();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = [];
    this.gridApi.forEachNode((node:any) => {
      this.rowData.push(node.data);
    });
  }

  onAddRow() {
    this.setHeaderNames();
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    this.printResult(res);
  }

  sendToClipboard(params:any) {
    console.log('send to clipboard called with data:');
    console.log(params.data);
  }




  ngAfterViewInit() { 
    window.addEventListener('paste', this.insertNewRowsBeforePaste) 
  }

  insertNewRowsBeforePaste(event:any) 
  {
    
    var clipboardData = event.clipboardData || (<any>window).clipboardData
    var pastedText = clipboardData.getData('Text')
    let row_data = pastedText.split('\n');
    let splitdata:any = [];
    let pastarray:any=[]
    row_data.forEach((data:any, index:any) => {
      splitdata.push(data.replace('\r',''))
    })
    splitdata.forEach((value:any, index:any) => {
      pastarray.push(value.split('\t'))
    })
    this.getarray = pastarray
    
   localStorage.setItem("copydata", JSON.stringify(pastarray))
  }






   createNewRowData() {
    var newData = {
      make: "Toyota " + this.newCount,
      model: "Celica " + this.newCount,
      price: 35000 + this.newCount * 17,
      zombies: "Headless",
      Column2: "Little",
      Column3: "Airbag"
    };
    this.newCount++;
    return newData;
  }

   printResult(res:any) {
    console.log("---------------------------------------");
    if (res.add) {
      res.add.forEach(function(rowNode:any) {
        console.log("Added Row Node", rowNode);
      });
    }
    if (res.remove) {
      res.remove.forEach(function(rowNode:any) {
        console.log("Removed Row Node", rowNode);
      });
    }
    if (res.update) {
      res.update.forEach(function(rowNode:any) {
        console.log("Updated Row Node", rowNode);
      });
    }
  }

}