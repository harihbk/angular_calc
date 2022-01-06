import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-and',
  templateUrl: './and.component.html',
  styleUrls: ['./and.component.css']
})
export class AndComponent implements OnInit {
  @Input() left_operator:FormGroup;
  @Input() conditionlegend : string;
  formarray: FormArray;
  constructor(
    public fb:FormBuilder
  ) { }

  ngOnInit() {
    this.formarray = <FormArray>(this.left_operator.get('aggregate') as FormArray)
    // this.formarray = (this.left_operator as FormArray)
     this.formarray.clear();
     this.formarray.push(this.newaggregate)
     console.log(this.left_operator);
  }

  addformarray(){
     this._formarray.push(this.newaggregate)
  }

  removeformarray(i){
    this._formarray.removeAt(i)

  }

  get _formarray(){
    return <FormArray>(this.left_operator.get('aggregate') as FormArray)
  }

  get newaggregate(): FormGroup {
    return this.fb.group({
      aggregation_type_left: '',
      aggregation_type_right: '',
      aggregates_left : '',
      aggregates_right : '',
      aggregates_operator : '',
    })
 }

}


