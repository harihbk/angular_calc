import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { _functions } from '../excel/_function'
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit , AfterViewInit  {

  myForm      : FormGroup
  _Formarray  : FormGroup;
  exx: FormGroup;
  thenif: FormGroup;
  elseif: FormGroup;
  events_expression_Subject: Subject<any> = new Subject<any>();
  events_condition_thenif_Subject: Subject<any> = new Subject<any>();
  events_condition_elseif_Subject: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder
  ) {

  }

  onInput(event){

   // let formula = "if( 1 > 2 , if(4=5 ,  if(2=4 , 4,6)  ,7) , 3 )";
    let formula = this.myForm.value.name;
    let f_index = formula.indexOf('(');
    let l_index = formula.lastIndexOf(')');
    var res = formula.substring(f_index + 1, l_index);

     console.log([f_index,l_index , res]);
     var _iterate = _functions.psplit(res);
     console.log(_iterate);


     var obj = {
      'expression'        : {},
      'condition_then_if' : {},
      'condition_else_if' : {}
     };

      for(var i=0;i<_iterate.length;i++){
           if(i == 0){
             let expression = _iterate[0];
             obj['expression'] =_functions.converttoExpression(expression)
           }

           if(i == 1){
             let thenif = _iterate[1].toLowerCase().split(" ").join("");
             let ei = thenif.substring(0,3);
             let eii = 'if(';


             if( ei == eii ){
               let _thenif = {};
               _thenif['choosen'] ='thenif';
               _thenif['value'] ='0';
               _thenif['_expression'] = innersplit(thenif);
               obj['condition_then_if'] = _thenif;
             } else {
              let _thenif = {};
              _thenif['choosen'] ='then';
              _thenif['value'] =thenif;
              obj['condition_then_if'] = _thenif;
             }


           }

           if(i == 2){
             let elseif = _iterate[2].toLowerCase().split(" ").join("");
             let ei = elseif.substring(0,3);
             let eii = 'if(';
            console.log(elseif);

             if( ei == eii ){
               let _elseif = {};
               _elseif['choosen'] ='elseif';
               _elseif['value'] ='0';
               _elseif['_expression'] = innersplit(elseif);
               obj['condition_else_if'] = _elseif;
             } else {
              let _elseif = {};
              _elseif['choosen'] ='else';
              _elseif['value'] =elseif;
              obj['condition_else_if'] = _elseif;
             }

           }
      }


  //  console.log(obj);



    function innersplit(elseif){
      var obj1={}
      let f_index = elseif.indexOf('(');
      let l_index = elseif.lastIndexOf(')');
      let res = elseif.substring(f_index + 1, l_index);

       console.log([f_index,l_index , res]);
       var _iterate = _functions.psplit(res);
        console.log(_iterate);



      for(var i=0;i<_iterate[0].length;i++){
        if(i == 0){
          let expression = _iterate[0];
          obj1['expression'] =_functions.converttoExpression(expression)
        }

        if(i == 1){
         // let thenif = _iterate[1];

         // let thenif = _iterate[1].toLowerCase().split(" ").join("");
          let thenif = _iterate[1].toLowerCase().split(" ").join("");
          let ei = thenif.substring(0,3);
          let eii = 'if(';


          if( ei == eii ){
            let _thenif = {};
            _thenif['choosen'] ='thenif';
            _thenif['value'] ='0';
            _thenif['_expression'] = innersplit(thenif);
            obj1['condition_then_if'] = _thenif;
          } else {
           let _thenif = {};
           _thenif['choosen'] ='then';
           _thenif['value'] =thenif;
           obj1['condition_then_if'] = _thenif;
          }



        }

        if(i == 2){
          let elseif = _iterate[2].toLowerCase().split(" ").join("");
          console.log(elseif);

          let ei = elseif.substring(0,3);
          let eii = 'if(';

          if( ei == eii ){
            let _expression = {};
            _expression['choosen'] = 'elseif';
            _expression['value'] = '0';
            _expression['_expression'] = innersplit(elseif)
            obj1['condition_else_if']  = _expression
          } else {
            let _expression = {};
            _expression['choosen'] = 'else';
            _expression['value'] = elseif;
            obj1['condition_else_if']  = _expression
          }

        }
   }


   return obj1


    }

     console.log(obj.expression);
   let exp = {}
   exp['expression'] = obj.expression
   exp['condition_then_if'] = obj.condition_then_if
   exp['condition_else_if'] = obj.condition_else_if

  this.events_expression_Subject.next(exp);
  this.events_condition_thenif_Subject.next(exp);
  this.events_condition_elseif_Subject.next(exp);

  }




  public expression_dataset = {}

  public dataset =   {
    expression : {
      left: "1",
      logical: ">",
      right: "2"
    },
    condition_then_if: {
      value: '3',
      choosen: 'then'
    },
    condition_else_if: {
      value: '3',
      choosen: 'else'
    }
  }

  initialvalidate () {
    return  this.fb.group({

      expression : this.fb.group({
         left : [''],
         right : [''],
         logical : ['']
      }),
      condition_then_if : this.fb.group({
        value : [''],
        choosen : ['']
      }),
      condition_else_if : this.fb.group({
        value : [''],
        choosen : ['']
      })

		});
  }

  validation(){
  return  this.fb.group({
      expression : this.fb.group({}),
      condition_then_if : this.fb.group({}),
      condition_else_if : this.fb.group({})
		});
  }


  ngOnInit() {


    this.myForm = this.fb.group({
        name: [''],
       _formarray : this.validation()

    })



    this._Formarray = this.myForm.get('_formarray') as FormGroup;
    this.exx =  this._Formarray.get('expression')  as FormGroup;
    this.thenif =  this._Formarray.get('condition_then_if')  as FormGroup;
    this.elseif =  this._Formarray.get('condition_else_if')  as FormGroup;

  }


  ngAfterViewInit(): void {

    this.myForm.valueChanges.subscribe(val => {
      this.formatformula(val)
    })
  }

  get expression() {
    return this.myForm.get('expression') as FormGroup;
  }

  get condition_then_if(){
    return this.myForm.get('condition_then_if') as FormGroup
  }

  get condition_else_if(){
    return this.myForm.get('condition_else_if') as FormGroup
  }



  fncondition_then_if(ev){
    console.log(ev);
    }

  fncondition_else_if(ev){
    console.log(ev);
  }

  onSubmit() {
    console.log(this.myForm.value)
    let obj = this.myForm.value.expression
    var formula = `${obj}`

  }

  formatformula(val){
    let obj = val._formarray;
    let express = obj.expression
    console.log(express);
    var formula =`=IF( ${ this._checkconditons(express?.lefts ) } ${express?.logical ?? '_'} ${ this._checkconditons(express?.rights ) } , ${this._checkthen(express.condition_expression_then)} , ${this._checkthen(express.condition_expression_else) } )`

    if(express?.operators.length > 0){
      formula += this.operators(express.operators)


    }

    this.myForm.patchValue({
      name : formula
    }, {emitEvent: false})


  }

  operators(val){
    var frm = ''
     console.log(val?.operator_controls);

    val?.forEach(ele => {
      switch(ele?.operator_aggregate_type){
        case 'and':
          frm +=`${ele.operator}`
          frm +=`AND( ${this.andcondition(ele?.operator_controls?.aggregate)} )`;
        break;
        case 'or':
          frm +=`${ele.operator}`
          frm +=`OR( ${this.andcondition(ele?.operator_controls?.aggregate)} )`;
        break;
        case 'if':
          frm +=`${ele.operator}`
          frm +=`${this.nestedformatformula(ele?.operator_controls)} `;
        break;
      }
    });

return frm
  }

  _checkconditons(val){

    if(val?.aggregate_type == 'if'){
        return this.nestedformatformula(val.expression)
    }
    if(val?.aggregate_type == 'and'){
    return `AND( ${this.andcondition(val.aggregate)} )`;
    }

    if(val?.aggregate_type == 'or'){
      return `OR( ${this.andcondition(val.aggregate)} )`;
      }
    return val?.left ?? val?.right ?? '_'
  }

  _checkthen(val){
    console.log(val?.aggregate_type);
     switch(val?.aggregate_type){
       case 'and':
        return `AND( ${this.andcondition(val?.aggregate)} )`;
       break;
       case 'or':
        return `OR( ${this.andcondition(val?.aggregate)} )`;
       break;
       case 'string':
        return `${val?.value ?? '_'}`
       break;
       default :
       return `_`
     }
 //return "_";
  }

  nestedformatformula(exx){

   return `IF( ${this._checkconditons(exx?.lefts)  }  ${exx?.logical ?? '_'} ${ this._checkconditons(exx?.rights ) } ,  ${this._checkthen(exx?.condition_expression_then)} , ${this._checkthen(exx?.condition_expression_else) })`
  }

  andcondition(val){
      var generate_and = ''
    val?.forEach(ele => {
      generate_and +=`${this.checkand(ele)} ,`
    });
    return generate_and.replace(/,\s*$/, ""); // remove last comma

  }

  checkand(val){
    let   generate_and=''
    if(val.aggregation_type_left == "string"){
      generate_and += val.aggregates_left
    }

    if(val.aggregation_type_left == "if"){
      generate_and += this.nestedformatformula(val.aggregate_left_expression)
    }

    generate_and +=val.aggregates_operator

    if(val.aggregation_type_right == "string"){
      generate_and += val.aggregates_right
    }

    if(val.aggregation_type_right == "if"){
      generate_and += this.nestedformatformula(val.aggregate_right_expression)
    }
     return generate_and;
  }

  onSubmit123() {



    let rawdata = this.myForm.getRawValue();
    console.log(this.myForm.value)
    var formula;
    let data = this.myForm.value._formarray


       let expression = data.expression;
       let condition_then_if = data.condition_then_if;
       let condition_else_if = data.condition_else_if;
     formula = `=IF(${expression.left} ${expression.logical} ${expression.right} , ${this.checkthen(condition_then_if)}  , ${this.checkelse(condition_else_if)})`

     this.myForm.patchValue({
       name : formula
     })



  }

  checkthen(params){
   if(params.choosen == "then"){
     return params.value
   }


  return this.ifformula(params._expression)
  }


  ifformula(expression){
   let f ;

  return `IF(${expression.expression.left} ${expression.expression.logical} ${expression.expression.right} , ${this.checkthen(expression.condition_then_if)}  ,  ${this.checkelse(expression.condition_else_if)})`
    console.log(expression);
  }



  checkelse(params){
    if(params.choosen == "else"){
      return params.value
    }
    return this.ifformula(params._expression)

  }

}
