import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-condition_else_if',
  templateUrl: './condition_else_if.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./condition_else_if.component.css']
})
export class Condition_else_ifComponent implements OnInit {
  @Input() condition_else_if: FormGroup;
  @Input() condition_then_if: FormGroup;
  @Input() expression: FormGroup;
  isCheck: boolean = true;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>()

  @Output() _select: EventEmitter<string> = new EventEmitter<string>()
  _condition_else_if : FormGroup
  @Input() events: Observable<any>;
  events_condition_elseif_Subject: Subject<any> = new Subject<any>();


  constructor(
    public fb:FormBuilder,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.condition_else_if.addControl('value', this.fb.control(''));
    this.condition_else_if.addControl('choosen',this.fb.control(''));

    this.events.subscribe((res:any)=>{
      (this.condition_else_if as FormGroup).patchValue({
       value :res?.condition_else_if?.value,
       choosen : res?.condition_else_if?.choosen,
       _expression :  res?.condition_else_if?._expression
      })

      this.fun(res?.condition_else_if?.choosen , res?.condition_else_if?._expression);

    })

  }


  fun(elm , _elm){

    //  console.log(_elm);
      if(elm == "elseif"){

        (this.condition_else_if as FormGroup).addControl('_expression',this.validation())

        setTimeout(() =>this.events_condition_elseif_Subject.next(_elm ) , 50)
        // this.events_condition_elseif_Subject.subscribe({
        //   next : (v) => console.log

        // })

      //  this.events_condition_elseif_Subject.next(1);

       // this.cd.detectChanges()


        this.isCheck = false;
      } else {
        this.isCheck = true;
      }
    }

  get _ccondition_then_if(){
    return this.condition_else_if.get('_expression').get('condition_then_if') as FormGroup
  }


  validation(){
    return  this.fb.group({
      expression : this.fb.group({}),
     condition_then_if : this.fb.group({}),
     condition_else_if : this.fb.group({})

      });
    }

  get _expression(){

    return this.condition_else_if.get('_expression').get('expression') as FormGroup
  }


  get _ccondition_else_if(){
    return this.condition_else_if.get('_expression').get('condition_else_if') as FormGroup
  }


  fncondition_then_if(ev:any){

    this.selected.emit(ev?.target?.value);

  }


  fncondition_else_if(ev){

    if( ev?.target?.value == "elseif"){
      (this.condition_else_if as FormGroup).addControl('_expression',this.validation())
  }

 this.isCheck = ev?.target?.value == "else" ? true : false
   this._select.emit(ev?.target?.value)
  }


}
