import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-condition_then_if',
  templateUrl: './condition_then_if.component.html',
  styleUrls: ['./condition_then_if.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Condition_then_ifComponent),
      multi: true
    }
  ]
})
export class Condition_then_ifComponent implements OnInit {
  @Input() condition_then_if;
  @Input() form : FormGroup;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Output() _select: EventEmitter<string> = new EventEmitter<string>()
  isCheck: boolean = true;
  _condition_then_if : FormGroup
  @Input() expression: FormGroup;
  constructor(
    public fb:FormBuilder
  ) { }

  ngOnInit() {
    //this.condition_then_if = this.fb.group(this.condition_then_if);

 // this._condition_then_if = this.condition_then_if.get('condition_then_if')  as FormGroup;

  //    this.expression =  this.fb.group({
  //     left : [''],
  //     right : [''],
  //     logical : ['']
  //  })



  }

      get _ccondition_then_if(){

        return  this.condition_then_if.get('_expression').controls as FormGroup
      }

      // get _expression(){
      // //  return  this.expression.get('expression').controls as FormGroup
      // }


  validation(){
    return  this.fb.group({
      expression : this.fb.group({}),
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

  get _expression(){
    console.log( this.condition_then_if.get('_expression').get('expression') );

    return this.condition_then_if.get('_expression').get('expression') as FormGroup
  }


  fncondition_then_if(ev:any){

    //this.expression = this.condition_then_if.get('expression')  as FormGroup;

    if( ev?.target?.value != "then"){
     // (this.condition_then_if.get('condition_then_if')['controls']['_exp'] as FormGroup).addControl('_expression',this.validation())
   //   this.condition_then_if.get('condition_then_if').addControl('_expression',this.validation())
        (this.condition_then_if as FormGroup).addControl('_expression',this.validation())



    }


    this.isCheck = ev?.target?.value == "then" ? true : false

    this.selected.emit(ev?.target?.value);

  }

  fncondition_else_if(ev:any){
    this._select.emit(ev?.target?.value)
   }

}
