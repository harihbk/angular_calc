import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  _expression : FormGroup;
  subscription: Subscription
  constructor(
    public fb:FormBuilder
  ) {


  }


  ngOnInit() {



    this.expression.addControl('left', this.fb.control(''));
    this.expression.addControl('right',this.fb.control(''));
    this.expression.addControl('logical',this.fb.control(''));




    this.subscription = this.events.subscribe((res :any)=>{


      (this.expression as FormGroup).patchValue({
        left :res.expression.left,
        right : res.expression.right,
        logical : res.expression.logical
      })

     // console.log(res);
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
}


}
