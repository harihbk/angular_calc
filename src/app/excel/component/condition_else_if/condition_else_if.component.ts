import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-condition_else_if',
  templateUrl: './condition_else_if.component.html',
  styleUrls: ['./condition_else_if.component.css']
})
export class Condition_else_ifComponent implements OnInit {
  @Input() condition_else_if: FormGroup;
  @Output() _select: EventEmitter<string> = new EventEmitter<string>()
  _condition_else_if : FormGroup
  constructor(
    public fb:FormBuilder
  ) { }

  ngOnInit() {
    this._condition_else_if = this.fb.group(this.condition_else_if);
  }

  fncondition_else_if(ev){
   this._select.emit(ev.target.value)
  }
}
