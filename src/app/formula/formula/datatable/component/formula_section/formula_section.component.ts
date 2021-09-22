import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonService } from 'src/app/formula/services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formula_section',
  templateUrl: './formula_section.component.html',
  styleUrls: ['./formula_section.component.css']
})
export class Formula_sectionComponent implements OnInit {
  formula_field : any = '';
  calculated_value : any = '';
  calc_button :any=[];
  parameter_name :any=[];
  userentered :any= {}
  rowdata: any;
  variablename: any;
  constructor(
    public dialogRef: MatDialogRef<Formula_sectionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service   :CommonService,
  ) {
   
    this.rowdata = data;
   
    this.formula_field = data.formula
    this.variablename = data.variablename;
    this.calc_button = [
      [{
        name : 1 , value : 1
      },
      {
        name : 2 , value : 2
      },
      {
        name : 3 , value : 3
      },
      {
        name : "+" , value : "+"
      },
      {
        name : "-" , value : "-"
      },
      {
        name : "<" , value : "<"
      }],
      [{
        name : 4 , value : 4
      },{
        name : 5 , value : 5
      },{
        name : 6 , value : 6
      },{
        name : "*" , value : "*"
      },{
        name : "/" , value : "/"
      },{
        name : ">" , value : ">"
      }],
      [{
        name : 7 , value : 7
      },{
        name : 8 , value : 8
      },{
        name : 9 , value : 9
      },{
        name : "(" , value : ")"
      },{
        name : ")" , value : ")"
      },{
        name : "=" , value : "="
      }],
      [{
        name : 0 , value : 0
      },{
        name : "." , value : "."
      },{
        name : "," , value : ","
      },{
        name : "space" , value : "space"
      }],
      [{
        name : "Round" , value : "Round"
      },{
        name : "Floor" , value : "Floor"
      },{
        name : "Ceil" , value : "Ceil"
      }],
      // [{
      //   name : "Power" , value : "Power"
      // },{
      //   name : "isEven" , value : "isEven"
      // },{
      //   name : "RoundDown" , value : "RoundDown"
      // }],[{
      //   name : "RoundUp" , value : "RoundUp"
      // },
      // {
      //   name : "Left" , value : "Left"
      // },
      // {
      //   name : "Right" , value : "Right"
      // }],
      
      // [
      //   {
      //     name : "Mid" , value : "Mid"
      //   },{
      //     name : "Pitch" , value : "Pitch"
      //   },{
      //     name : "Travellers" , value : "Travellers"
      //   }],
      //   [{
      //       name : "Find" , value : "Find"
      //   },
      //   {
      //     name : "Even" , value : "Even"
      //    }]
    ];


    this.parameter_name = [
      { name : 'Measurement' , value : 'measurement'},
      { name : 'Qty' , value : 'qty'},
      { name : 'Component' , value : 'component'},
      { name : 'Sub Component Qty' , value : 'sub_component_qty'},
      { name : 'Product Type' , value : 'product_type'},
      { name : 'Fabric' , value : 'fabric'},
      { name : 'Color' , value : 'color'},
      { name : 'Parts or Repair Delivery Surcharge' , value : 'parts_or_repair_delivery_surcharge'},
      { name : 'Width' , value : 'Width'},
      { name : 'Drop' , value : 'Drop'},
      { name : 'Extras' , value : 'Extras'},
      { name : 'Spe Inst' , value : 'Spe Inst'},
    ]

   
   }

  ngOnInit() {
  }

  onKeyUp(ev:any){
    let setCalc = this.formula_field
    this.formula_field =  `${setCalc}${ev}`
  }

  validateformula(){
    var formula = { 'formula' : this.formula_field , 'variable' : this.userentered }
    console.log(formula);


    this.service.calculatevalue(formula).subscribe(res=>{
      this.calculated_value = res.result;
      console.log(res)
    })

  }


}
