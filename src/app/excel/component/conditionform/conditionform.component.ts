import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conditionform',
  templateUrl: './conditionform.component.html',
  styleUrls: ['./conditionform.component.css']
})
export class ConditionformComponent implements OnInit {
  @Input() expression;
  _expression : FormGroup;
  constructor(
    public fb:FormBuilder
  ) {

  }


  ngOnInit() {

 this.expression.setControl('expression',this.fb.group({
  left : [''],
  right : [''],
  logical : ['']
}))

this.expression = (this.expression.get('expression') as FormGroup)

  console.log(this.expression);

  //this.expression = this.expression.get('expression')  as FormGroup;


  }



}
