import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-conditionform',
  templateUrl: './conditionform.component.html',
  styleUrls: ['./conditionform.component.css']
})
export class ConditionformComponent implements OnInit {
  @Input() expression;
  @Input() dataset;
  @Input() events: Observable<any>;
  //_expression : FormGroup;
  subscription: Subscription
  _allconditions : boolean = true;
  conditional : boolean = true;
  sum_average : boolean = false;
  selectedAggregate: any;
   _Formarray: FormGroup;
  exx: any;
  hn: boolean;
  show: boolean = false;
  exxa: any;
  constructor(
    public fb:FormBuilder
  ) {


  }


  ngOnInit() {


    this.expression.addControl('lefts',this.fb.group({
      left : [''],
      expression : this.fb.group({}),
      aggregate  : this.fb.array([])
    }));

    this.expression.addControl('right',this.fb.control(''));
    this.expression.addControl('logical',this.fb.control(''));
   // this.expression.addControl('aggregate',this.fb.array([]));



    // this.subscription = this.events.subscribe((res :any)=>{
    //   (this.expression as FormGroup).patchValue({
    //     left :res.expression.left,
    //     right : res.expression.right,
    //     logical : res.expression.logical,

    //   })
    // })
    this._Formarray = this.expression.get('lefts') as FormGroup;

  }


  get addressArray()  {
    return this.expression.get('lefts') as FormGroup;
}

 get exxx(){
  return this.addressArray.get('expression')  as FormGroup;
 }

 get checkempty(){
   return this.exxx.get('expression') as FormGroup
 }

 get _expression(){
  //console.log(this.condition_then_if.get('_expression').get('expression'));
  return this.expression.get('lefts').get('expression') as FormGroup
}

get _aggregate():FormArray{
  //console.log(<FormArray>this.expression.get('lefts').get('aggregate'));
   return (this.expression.get('lefts').get('aggregate') as FormArray)
}


  aggregate_invoke(val){
    this.selectedAggregate = val
  }

  conditional_dropdown(val){


    this.hn = false
    this.show = false
    if(val == 'if'){
      console.log((this.exxx));
      this.exxa = (this.exxx as FormGroup)


      this.exxa.addControl('lefts',this.fb.group({
        left : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([])
      }));
      this.exxa.addControl('right',this.fb.control(''));
      this.exxa.addControl('logical',this.fb.control(''));
      this.hn = true
    } else if (val == 'operator'){
      // empty array
      (<FormArray>(this.addressArray as FormGroup).get('aggregate')).clear();
      this.add_aggregate()
      this.show = true;
    }
  }

  remove_aggregate(){}

  add_aggregate(){
  //  console.log((this.addressArray as FormGroup).get('aggregate'));

    const control =  <FormArray>(this.addressArray as FormGroup).get('aggregate')
    //const control = <FormArray>this.expression.get('aggregate');
    control.push(this.newaggregate())

    console.log(this.expression);

  }

  newaggregate(): FormGroup {
    return this.fb.group({
      opera: '',
      aggregates_left : '',
      aggregates_right : '',
      aggregates_operator : ''
    })
 }

  ngOnDestroy() {
   // this.subscription.unsubscribe()
}


}
