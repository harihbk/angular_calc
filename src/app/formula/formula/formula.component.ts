import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {

    this.navLinks = [
      {
          label: 'Manufacturing formulas',
          link: './manufacture',
          index: 0
      },{
          label: 'Child safety formulas',
          link: './child',
          index: 1
      },{
        label: 'Bill of materials formulas',
        link: './',
        index: 2
      },{
        label: 'Fabric stock formulas',
        link: './',
        index: 3
      },{
        label: 'Production Rule',
        link: './',
        index: 4
      },{
        label: 'Curtain formulas',
        link: './',
        index: 5
      }
  ];
   }

  ngOnInit():void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
