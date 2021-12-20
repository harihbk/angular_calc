import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conditionform',
  templateUrl: './conditionform.component.html',
  styleUrls: ['./conditionform.component.css']
})
export class ConditionformComponent implements OnInit {
  @Input() expression: FormGroup;
  _expression : FormGroup;
  constructor(
    public fb:FormBuilder
  ) {

  }


  ngOnInit() {

  this._expression = this.fb.group(this.expression);



  }



}
