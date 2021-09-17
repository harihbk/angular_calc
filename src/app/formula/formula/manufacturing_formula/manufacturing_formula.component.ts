import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturing_formula',
  templateUrl: './manufacturing_formula.component.html',
  styleUrls: ['./manufacturing_formula.component.css']
})
export class Manufacturing_formulaComponent implements OnInit {


  constructor(private router: Router) {

   }

  ngOnInit() {
  }

  changeRoute(event:MatRadioChange){

    let route
    if(event.value === "formula"){
       route = 'manufacture'
    } else {
       route = 'manufacture/allowance'
    }

    this.router.navigate([route]);
  }

}
