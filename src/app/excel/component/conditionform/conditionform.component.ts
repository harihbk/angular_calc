import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';
import { TooltipPosition } from '@angular/material/tooltip';


export const SlideInOutAnimation = [
  trigger('dotedline',[
    state('fieldset.scheduler-border',style({
      'content': '' ,
      'position':'absolute',
      'border' : '1px dashed #808080',
      'color': '#486bd3'
    })),


  ]),
  trigger('slideInOut', [

      state('in', style({
          'max-height': '*',
           'opacity': '1',
           'visibility': 'visible',

      })),
      state('out', style({
          'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
          animate('400ms ease-in-out', style({
              'opacity': '0'
          })),
          animate('600ms ease-in-out', style({
              'max-height': '0px'
          })),
          animate('700ms ease-in-out', style({
              'visibility': 'hidden'
          }))
      ]
      )]),
      transition('out => in', [group([
          animate('1ms ease-in-out', style({
              'visibility': 'visible'
          })),
          animate('600ms ease-in-out', style({
              'max-height': '*'
          })),
          animate('800ms ease-in-out', style({
              'opacity': '1'
          }))
      ]
      )])
  ]),
]

@Component({
  selector: 'app-conditionform',
  templateUrl: './conditionform.component.html',
  styleUrls: ['./conditionform.component.css'],
  animations: [SlideInOutAnimation]

})


export class ConditionformComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  animationState = 'in';
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
  right_rec: boolean = false;
  left_rec: boolean = false;
  private _then: FormGroup;
  thenshowhide: boolean = false;
  elsehide: boolean = false;
  public _aggregatefunc: FormArray;
  aggregate_left: boolean = false;
  conditionlegend: any;
  aggregate_left_instance: FormArray;
  aggregate_right: boolean;
  conditionlegend_right: any;
  conditional_else_label: any;
  conditional_then_label: any;
  operator_label: any;
  constructor(
    public fb:FormBuilder
  ) {


  }




  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
}


  ngOnInit() {

    this.expression.addControl('lefts',this._lefts_validator);
    this.expression.addControl('rights',this._rights_validator);
    this.expression.addControl('logical',this.fb.control(''));
     this.expression.addControl('condition_expression_then',this._condition_expression_validator);
    this.expression.addControl('condition_expression_else',this._condition_expression_validator);

    this.expression.addControl('operators',this.fb.array([
      this.opearatoevalidator
    ]))


    // this.subscription = this.events.subscribe((res :any)=>{
    //   (this.expression as FormGroup).patchValue({
    //     left :res.expression.left,
    //     right : res.expression.right,
    //     logical : res.expression.logical,

    //   })
    // })


  }

  get opearatoevalidator(){
  return  this.fb.group({
        operator : [''],
        operator_aggregate_type : [''],
       // operator_controls : this.fb.group({})

    })
  }


  get addressArray()  {
    return this.expression.get('lefts') as FormGroup;
  }

 get exxx(){
  return this.addressArray.get('expression')  as FormGroup;
 }



 get _expression(){
  return this.expression.get('lefts').get('expression') as FormGroup
  }


  aggregate_invoke(val){
    this.selectedAggregate = val
  }

  conditional_else(val){
    this.conditional_else_label = val.toUpperCase()
    switch (val){
      case 'if':
        this._then =  ((this.expression.get('condition_expression_then') as FormGroup).get('expression') as FormGroup)
        this._then.addControl('lefts',this._lefts_validator);
        this._then.addControl('rights',this._rights_validator);
        this._then.addControl('logical',this.fb.control(''));
        this._then.addControl('condition_expression_then',this._condition_expression_validator);
        this._then.addControl('condition_expression_else',this._condition_expression_validator);
      break;
      case 'and':

      break;
      case 'or':

      break;
      case 'operator':
       // (<FormArray>(this.expression.get('lefts') as FormGroup).get('aggregate')).clear();
      break;
    }
  }

  get condition_expression_else(){
    return <FormGroup>(this.expression.get('condition_expression_else'))
  }


  get validation_rights_lefts(){
    return this.fb.group({
      left : [''],
      expression : this.fb.group({}),
      aggregate  : this.fb.array([]),
      aggregate_type : [''],
    })
  }


  get _lefts_validator(){
    return this.fb.group({
      left : [''],
      expression : this.fb.group({}),
      aggregate  : this.fb.array([]),
      aggregate_type : [''],
    })
  }
  get _rights_validator(){
    return this.fb.group({
      right : [''],
      expression : this.fb.group({}),
      aggregate  : this.fb.array([]),
      aggregate_type : [''],
    })
  }

  get _condition_expression_validator(){
   return this.fb.group({
      condition : [''],
      value     : [''],
      aggregate_type : [''],
      aggregate  : this.fb.array([]),
      expression : this.fb.group({})
    })
  }



  get _allvalidators(){
    return   this.fb.group({
      'lefts': this._lefts_validator,
      'rights' : this._rights_validator,
      'logical' : [''],
      'condition_expression_then':this._condition_expression_validator,
      'condition_expression_else' : this._condition_expression_validator
    })
  }

  operator_controls(i,val){

    switch (val){
      case 'if':
        (<FormGroup>(this.expression.get('operators').controls[i] as FormGroup)).addControl('operator_controls',this._allvalidators)
      break;
      case 'and':
        (<FormGroup>(this.expression.get('operators').controls[i] as FormGroup)).addControl('operator_controls',this.validation())
      break;
      case 'or':
        (<FormGroup>(this.expression.get('operators').controls[i] as FormGroup)).addControl('operator_controls',this.validation())
      break
    }
  }


  validation(){
    return  this.fb.group({
      condition : [''],
      value     : [''],
      aggregate_type : [''],
      aggregate  : this.fb.array([]),
      expression : this.fb.group({})
      });
    }


  conditional_then(val){
    this.conditional_then_label = val.toUpperCase()
    switch (val){
      case 'if':
        this._then =  ((this.expression.get('condition_expression_then') as FormGroup).get('expression') as FormGroup)
        this._then.addControl('lefts',this._lefts_validator);
        this._then.addControl('rights',this._rights_validator);
        this._then.addControl('logical',this.fb.control(''));
        this._then.addControl('condition_expression_then',this._condition_expression_validator);
        this._then.addControl('condition_expression_else',this._condition_expression_validator);
      break;
      case 'and':

      break;
      case 'or':

      break;
      case 'operator':
        (<FormArray>(this.expression.get('lefts') as FormGroup).get('aggregate')).clear();
      break;
    }
  }

  conditional_dropdown(val){
    this.conditionlegend_right = val.toUpperCase()
    switch (val){
      case 'if':
        this.exxa = (this.exxx as FormGroup)
        this.exxa.addControl('lefts',this._lefts_validator);
        this.exxa.addControl('rights',this._rights_validator);
        this.exxa.addControl('logical',this.fb.control(''));
        this.exxa.addControl('condition_expression_then',this._condition_expression_validator);
        this.exxa.addControl('condition_expression_else',this._condition_expression_validator);
      break;
      case 'and':

      break;
      case 'or':

      break;
      case 'operator':
        (<FormArray>(this.addressArray as FormGroup).get('aggregate')).clear();
      break;
    }
  }

  chooseope(val){
    this.operator_label = val.toUpperCase();
  }


  add_aggregate(){
    const control =  <FormArray>(this.addressArray as FormGroup).get('aggregate')
    control.push(this.newaggregate())
  }

  operatorsaddformarray(){
    (<FormArray>this.expression.get('operators') as FormArray).push(this.opearatoevalidator)
  }

  removeoperator(i)
  {
    (<FormArray>this.expression.get('operators') as FormArray).removeAt(i)
  }

  newaggregate(): FormGroup {
    return this.fb.group({
      aggregation_type_left   : '',
      aggregation_type_right  : '',
      aggregates_left         : '',
      aggregates_right        : '',
      aggregates_operator     : '',
    })
 }

  ngOnDestroy() {}


}
