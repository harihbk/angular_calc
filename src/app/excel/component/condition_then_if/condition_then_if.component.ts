import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-condition_then_if',
  templateUrl: './condition_then_if.component.html',
  styleUrls: ['./condition_then_if.component.css']
})
export class Condition_then_ifComponent implements OnInit {
  @Input() condition_then_if;
  @Input() form : FormGroup;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Output() _select: EventEmitter<string> = new EventEmitter<string>()
  isCheck: boolean = true;
  _condition_then_if : FormGroup
  constructor(
    public fb:FormBuilder
  ) { }

  ngOnInit() {
    this.condition_then_if = this.fb.group(this.condition_then_if);
   console.log(this.form);


  }

  get _expression(){
    return this._condition_then_if.get('_expression')['controls'] as FormGroup
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

  fncondition_then_if(ev:any){

    this.condition_then_if.addControl('_expression',this.validation())
    this.condition_then_if = this.condition_then_if
    console.log(this.condition_then_if);

    this.isCheck = ev?.target?.value == "then" ? true : false
    this.selected.emit(ev?.target?.value);

  }

  fncondition_else_if(ev:any){
    this._select.emit(ev?.target?.value)
   }

}
