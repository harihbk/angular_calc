import { Component, OnInit, Optional, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonService } from 'src/app/formula/services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-formula_section',
  templateUrl: './formula_section.component.html',
  styleUrls: ['./formula_section.component.css']
})
export class Formula_sectionComponent implements OnInit {
  @ViewChild('el', {static: false})element: ElementRef;

  formula_field : any = '';
  calculated_value : any = '';
  calc_button :any=[];
  parameter_name :any=[];
  userentered :any= {}
  rowdata: any;
  variablename: any;
  position: number;
  currentPosition: any;
  syntaxerror: any;
  variables: any;


  

  constructor(
    public dialogRef: MatDialogRef<Formula_sectionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service   :CommonService,
    private elementRef:ElementRef,
   
  ) {
   
    this.rowdata = data;
     this.position = 3;
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
      [{
        name : "IF" , value : "IF( TRUE,0,0)"
      }]
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
     this.service.getUsers(1).subscribe(res=>{
       this.variables = res.data
     })
  }


  /*
   This function caret position inputs
  */
  onKeyUp(ev:any){
   
    let setCalc = this.formula_field
    var insert = function(arr:any, index:any, item:any) {
      return [
          ...arr.slice(0, index),     // first half
          item,                       // items to be inserted
          ...arr.slice(index)         // second half
      ];
  };
  let sents = insert(setCalc,this.currentPosition,ev).join('')
  this.currentPosition++
  this.formula_field = sents
   
 
  }

   /*
   This function caret position inputs
  */



  /*
   This function Wrapper if confdition
  */

  wrap(){
    let startindex = this.currentPosition;
   
    let splitStr = Object.assign([], this.formula_field)
    var c = 0;
    var lastindex;
    for(var i = startindex;i <= splitStr.length ; i++){
      if(splitStr[i] == "("){
        c++;
        console.log("%c" + c, "color:red ;font-weight:bold;");
      }  // ( end
      if(splitStr[i] == ")"){
        c--;
        console.log("%c" + c, "color:green ;font-weight:bold;");
        if(c == 0){
          lastindex = i; 
          break // lastindex
        }
      } // ) end
    } // for loop end
   
    var Selected = this.formula_field.slice(startindex,lastindex+1);
    
    
    let g = `if(${this.formula_field.slice(startindex,lastindex+1)} , 0 , 0)`;
    this.formula_field = Selected ? replaceBetween(this.formula_field,startindex,lastindex+1, g) : this.formula_field;


    function replaceBetween(origin:any, startIndex:any, endIndex:any, insertion:any) {
      return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
    }

  }

  /*
   This function Wrapper if confdition
  */




   /*
   validate formula
   */

  validateformula(){
    var formula = { 'formula' : this.formula_field , 'variable' : this.userentered }
    console.log(formula);


    this.service.calculatevalue(formula).subscribe(res=>{
      this.calculated_value = res.result;
      console.log(res)
    })

  }

  /*
   validate formula
  */




   /*
   Set mouseclick position
   */
  myClickFunction(ev:any){
    this.currentPosition = ev.target.selectionStart;
  }

   /*
   Set mouseclick position
   */
  
 

}
