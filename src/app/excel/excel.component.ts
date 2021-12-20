import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  myForm      : FormGroup
  _Formarray  : FormArray;

  constructor(
    private fb: FormBuilder
  ) {


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
        choosen : [''],


      }),
      condition_else_if : this.fb.group({
        value : [''],
        choosen : [''],

      })

		});
  }

  validation(){
  return  this.fb.group({

      expression : this.fb.group({
         left : [''],
         right : [''],
         logical : ['']
      }),
      condition_then_if : this.fb.group({
        value : [''],
        choosen : [''],


      }),
      condition_else_if : this.fb.group({
        value : [''],
        choosen : [''],

      })

		});
  }


  ngOnInit() {


    this.myForm = this.fb.group({
        name: [''],
       _formarray : new FormArray([
        this.validation()
       ])
    })

    this._Formarray = this.myForm.get('_formarray') as FormArray;

    // let obj =
    // {
    //  statement   : "=IF",
    //  fnopen      : '(',
    //  expression : {
    //    left : 1,
    //    logical : ">",
    //    right : 1,
    //  },
    //  then : {
    //    value : 1
    //  },
    //  else : {
    //    value : 2
    //  },
    //  fnclose : ')'
    // }

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



    // (this.myForm.get('_formarray')['controls'][0].get('condition_then_if') as FormGroup).addControl('expression',this.validation())
    // console.log(this.myForm.get('_formarray')['controls'][0].get('condition_then_if'));

  //  this.condition_then_if.addControl('expression',this.validation())
    }

  fncondition_else_if(ev){
    console.log(ev);
  }

  onSubmit() {
    console.log(this.myForm);

    let rawdata = this.myForm.getRawValue();
    console.log(rawdata)
    var formula;


    rawdata._formarray.forEach(element => {
       let expression = element.expression;
       let condition_then_if = element.condition_then_if;
       let condition_else_if = element.condition_else_if;
     formula = `=IF(${expression.left} ${expression.logical} ${expression.right} , ${this.checkthen(condition_then_if)}  , ${this.checkelse(condition_else_if)})`
    console.log(formula);
    });
     this.myForm.patchValue({
       name : formula
     })



  }

  checkthen(params){
   if(params.choosen == "then"){
     return params.value
   }

   return 'formula'
  }

  checkelse(params){
    if(params.choosen == "else"){
      return params.value
    }

    return 'formula'
  }

}
