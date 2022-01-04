import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';

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
  @Input() condition_then_if : FormGroup
  @Input()  condition_else_if : FormGroup
  @Input() form : FormGroup;
  @Input() dataset;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Output() _select: EventEmitter<string> = new EventEmitter<string>()
  isCheck: boolean = true;
  _condition_then_if : FormGroup
  @Input() expression: FormGroup;

  @Input() events: Observable<any>;

  events_condition_thenif_Subject: Subject<any> = new Subject<any>();


  subscription: Subscription
  add: any;
  constructor(
    public fb:FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  public expression_dataset = {
    expression : {
      left: "11",
      logical: ">",
      right: "22"
    },
  }


  ngOnInit() {

    this.condition_then_if.addControl('value', this.fb.control(''));
    this.condition_then_if.addControl('choosen',this.fb.control(''));

   this.subscription = this.events.subscribe((res:any)=>{
     (this.condition_then_if as FormGroup).patchValue({
      value :res?.condition_then_if?.value,
      choosen : res?.condition_then_if?.choosen,
      _expression :  res?.condition_then_if?._expression
     })

     this.fun(res?.condition_then_if?.choosen , res?.condition_then_if?._expression);

   })

  }

  fun(elm , _elm){
  //  console.log(_elm);
    if(elm == "thenif"){

      (this.condition_then_if as FormGroup).addControl('_expression',this.validation())

      setTimeout(() => this.events_condition_thenif_Subject.next(_elm ) , 50)



      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }

  get _ccondition_then_if(){
    return this.condition_then_if.get('_expression').get('condition_then_if') as FormGroup
  }

  get _ccondition_else_if(){
    return this.condition_then_if.get('_expression').get('condition_else_if') as FormGroup
  }

  validation(){
    return  this.fb.group({
      expression : this.fb.group({}),
     condition_then_if : this.fb.group({}),
     condition_else_if : this.fb.group({
       value : [''],
       choosen : [''],

     })

      });
    }

  get _expression(){


    //console.log(this.condition_then_if.get('_expression').get('expression'));

    return this.condition_then_if.get('_expression').get('expression') as FormGroup
  }


  fncondition_then_if(ev:any){


    if( ev?.target?.value != "then"){

        (this.condition_then_if as FormGroup).addControl('_expression',this.validation())

        this.events_condition_thenif_Subject.subscribe(res=>{
          console.log(res);

        })
    }


    this.isCheck = ev?.target?.value == "then" ? true : false

    this.selected.emit(ev?.target?.value);

  }

  fncondition_else_if(ev:any){
    this._select.emit(ev?.target?.value)
   }

   ngOnDestroy() {
    this.subscription.unsubscribe()
}

}
