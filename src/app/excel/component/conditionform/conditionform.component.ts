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
  constructor(
    public fb:FormBuilder
  ) {


  }




  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
}


  ngOnInit() {


    this.expression.addControl('lefts',this.fb.group({
      left : [''],
      expression : this.fb.group({}),
      aggregate  :  this.fb.array([]),
      aggregate_type : [''],

    }));

    this.expression.addControl('rights',this.fb.group({
      right : [''],
      expression : this.fb.group({}),
      aggregate  :  this.fb.array([]),
      aggregate_type : [''],

    }));

    // this.expression.addControl('right',this.fb.control(''));
    this.expression.addControl('logical',this.fb.control(''));
   // this.expression.addControl('aggregate',this.fb.array([]));
   this.expression.addControl('condition_expression_then',this.fb.group({
    condition : [''],
    value     : [''],
    aggregate_type : [''],
    expression : this.fb.group({})
  }));



  this.expression.addControl('condition_expression_else',this.fb.group({
    condition : [''],
    value     : [''],
    aggregate_type : [''],
    expression : this.fb.group({})
  }));



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

  conditional_else(val){
   this.elsehide = false;
   if(val == 'if'){
    this.elsehide = true;
  this._then =  ((this.expression.get('condition_expression_then') as FormGroup).get('expression') as FormGroup)

   this._then.addControl('lefts',this.fb.group({
    left : [''],
    expression : this.fb.group({}),
    aggregate  : this.fb.array([]),
    aggregate_type : [''],

  }));

  this._then.addControl('rights',this.fb.group({
    right : [''],
    expression : this.fb.group({}),
    aggregate  : this.fb.array([]),
    aggregate_type : [''],

  }));
  this._then.addControl('logical',this.fb.control(''));
 this._then.addControl('condition_expression_then',this.fb.group({
  condition : [''],
  value     : [''],
  aggregate_type : [''],
  expression : this.fb.group({})
}));



this.expression.addControl('condition_expression_else',this.fb.group({
  condition : [''],
  value     : [''],
  aggregate_type : [''],
  expression : this.fb.group({})
}));
  }

  }
  conditional_then(val){
    this.thenshowhide = false;
    if(val == 'if'){
      this.thenshowhide = true;
    this._then =  ((this.expression.get('condition_expression_then') as FormGroup).get('expression') as FormGroup)

     this._then.addControl('lefts',this.fb.group({
      left : [''],
      expression : this.fb.group({}),
      aggregate  :this.fb.array([]),
      aggregate_type : [''],

    }));

    this._then.addControl('rights',this.fb.group({
      right : [''],
      expression : this.fb.group({}),
      aggregate  : this.fb.array([]),
      aggregate_type : [''],

    }));
    this._then.addControl('logical',this.fb.control(''));
   this._then.addControl('condition_expression_then',this.fb.group({
    condition : [''],
    value     : [''],
    aggregate_type : [''],
    expression : this.fb.group({})
  }));



  this.expression.addControl('condition_expression_else',this.fb.group({
    condition : [''],
    value     : [''],
    aggregate_type : [''],
    expression : this.fb.group({})
  }));
    }

  }

  conditional_rightdropdown(val){
    this.right_rec = false
    this.conditionlegend_right = val.toUpperCase()
    if(val == 'if'){

      this.exxa = (this.exxx as FormGroup)
      this.exxa.addControl('lefts',this.fb.group({
        left : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : ['']
      }));
      this.exxa.addControl('rights',this.fb.group({
        right : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : ['']
      }));
      this.exxa.addControl('logical',this.fb.control(''));
      this.exxa.addControl('condition_expression_then',this.fb.group({
        condition : [''],
        value     : [''],
        aggregate_type : ['']
      }));
      this.exxa.addControl('condition_expression_else',this.fb.group({
        condition : [''],
        value     : [''],
        aggregate_type : ['']
      }));


      this.right_rec = true
    } else if (val == 'operator'){
      // empty array
      (<FormArray>(this.addressArray as FormGroup).get('aggregate')).clear();
    //  this.add_aggregate()
      this.show = true;
    } else if(val == 'and' || val == 'or'){

      this.aggregate_right = true;
      this._aggregatefunc = (<FormArray>(this.expression.get('rights') as FormGroup).get('aggregate') as FormArray)



    // this.left_operator_instance =

    }

  }

  conditional_dropdown(val){

    //condition value whether and,or etc ...
    this.conditionlegend = val.toUpperCase()

    this.left_rec = false
    this.show = false
    this.aggregate_left = false;
    if(val == 'if'){
      console.log((this.exxx));
      this.exxa = (this.exxx as FormGroup)


      this.exxa.addControl('lefts',this.fb.group({
        left : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : ['']
      }));
      this.exxa.addControl('rights',this.fb.group({
        right : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : ['']
      }));
      this.exxa.addControl('logical',this.fb.control(''));
      this.exxa.addControl('condition_expression_then',this.fb.group({
        condition : [''],
        value     : [''],
        aggregate_type : ['']
      }));
      this.exxa.addControl('condition_expression_else',this.fb.group({
        condition : [''],
        value     : [''],
        aggregate_type : ['']
      }));



      this.left_rec = true
    } else if (val == 'operator'){
      // empty array
      (<FormArray>(this.addressArray as FormGroup).get('aggregate')).clear();
      //this.add_aggregate()
      this.show = true;
    } else if(val == 'and' || val == 'or'){

      this.aggregate_left = true;
      this._aggregatefunc = (<FormArray>(this.expression.get('lefts') as FormGroup).get('aggregate') as FormArray)



    // this.left_operator_instance =

    }
  }

  get _lefts(){
    return <FormGroup>(this.expression.get('lefts') as FormGroup);
  }

  get _rights(){
    return <FormGroup>(this.expression.get('rights') as FormGroup);
  }

  remove_aggregate(){}

  add_aggregate(){
    const control =  <FormArray>(this.addressArray as FormGroup).get('aggregate')
    control.push(this.newaggregate())
    console.log(this.expression);

  }

  newaggregate(): FormGroup {
    return this.fb.group({
      aggregation_type_left: '',
      aggregation_type_right: '',
      aggregates_left : '',
      aggregates_right : '',
      aggregates_operator : '',
    })
 }

  ngOnDestroy() {
   // this.subscription.unsubscribe()
}


}
