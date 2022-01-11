import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';




export const SlideInOutAnimation = [
  trigger('slideInOut', [
      state('in', style({
          'max-height': '*',
          'opacity': '1',
          'visibility': 'visible'
      })),
      state('out', style({
          'max-height': '0px',
          'opacity': '0',
          'visibility': 'hidden'
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
  selector: 'app-and',
  templateUrl: './and.component.html',
  styleUrls: ['./and.component.css'],
  animations: [SlideInOutAnimation],
  encapsulation: ViewEncapsulation.None,

})
export class AndComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  animationState = 'in';
  @Input() left_operator:FormGroup;
  @Input() conditionlegend : string;
  formarray: FormArray;
  conditional_lefts: FormGroup;
  boolean_condition_left: boolean = false;
  expression_left: FormGroup;
  conditional_left_index: any;
  conditional_rights: FormGroup;
  boolean_condition_right: boolean;
  show:boolean = false;
  constructor(
    public fb:FormBuilder,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('%c'+ (this.left_operator.get('aggregate') as FormArray), 'background: #222; color: #bada55');

    this.formarray = <FormArray>(this.left_operator.get('aggregate') as FormArray)
     this.formarray.clear();
     this.formarray.push(this.newaggregate)
     console.log(this.left_operator);
  }

  addformarray(){

     this._formarray.push(this.newaggregate)
     console.log(this._formarray);

  }

  removeformarray(i){
    this._formarray.removeAt(i)

  }

  toggleShowDiv() {


      this.animationState = this.animationState === 'out' ? 'in' : 'out';


  }

  conditional_right(i,val){


     if(val == 'if'){

        this.conditional_rights = <FormGroup>(this._formarray as FormArray).controls[i].get('aggregate_right_expression');
        console.log(this.conditional_rights);
        this.conditional_rights.addControl('lefts',this.fb.group({
        left : [''],
        expression : this.fb.group({}),
        aggregate  :this.fb.array([]),
        aggregate_type : [''],

        }));

        this.conditional_rights.addControl('rights',this.fb.group({
        right : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : [''],

        }));
        this.conditional_rights.addControl('logical',this.fb.control(''));
        this.conditional_rights.addControl('condition_expression_then',this.fb.group({
          condition : [''],
          value     : [''],
          aggregate_type : [''],
          aggregate  : this.fb.array([]),
          expression : this.fb.group({})
        }));

      //  this.conditional_rights = <FormGroup>(this._formarray.get('aggregate_right_expression') as FormGroup)



        this.cdref.detectChanges();

     }



  }

  conditional_left(i,val){

    this.boolean_condition_left = false
     if(val == 'if'){
        this.conditional_left_index = i
        this.conditional_lefts = <FormGroup>(this._formarray as FormArray).controls[i].get('aggregate_left_expression');

        this.conditional_lefts.addControl('lefts',this.fb.group({
        left : [''],
        expression : this.fb.group({}),
        aggregate  :this.fb.array([]),
        aggregate_type : [''],

        }));

        this.conditional_lefts.addControl('rights',this.fb.group({
        right : [''],
        expression : this.fb.group({}),
        aggregate  : this.fb.array([]),
        aggregate_type : [''],

        }));
        this.conditional_lefts.addControl('logical',this.fb.control(''));
        this.conditional_lefts.addControl('condition_expression_then',this.fb.group({
          condition : [''],
          value     : [''],
          aggregate_type : [''],
          aggregate  : this.fb.array([]),
          expression : this.fb.group({})
        }));

        this.expression_left = <FormGroup>(this._formarray.get('aggregate_left_expression') as FormGroup)

        this.boolean_condition_left = true
        this.cdref.detectChanges();

     }



  }

  get _expression():FormGroup{

    console.log(<FormGroup>(this._formarray.get('aggregate_left_expression') as FormGroup));

    return <FormGroup>(this._formarray.get('aggregate_left_expression') as FormGroup)
  }

  get events(){
    return {}
  }

  get _formarray(){
    return <FormArray>(this.left_operator.get('aggregate') as FormArray)
  }

  get newaggregate(): FormGroup {
    return this.fb.group({
      aggregate_left_expression  : this.fb.group({}),
      aggregate_right_expression : this.fb.group({}),
      aggregation_type_left      : '',
      aggregation_type_right     : '',
      aggregates_left            : '',
      aggregates_right           : '',
      aggregates_operator        : '',
    })
 }

}


