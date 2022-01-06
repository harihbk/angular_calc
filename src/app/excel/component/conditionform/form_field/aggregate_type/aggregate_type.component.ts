import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggregate_type',
  templateUrl: './aggregate_type.component.html',
  styleUrls: ['./aggregate_type.component.css']
})
export class Aggregate_typeComponent implements OnInit {
 @Input() aggregate_type : String
  constructor() { }

  ngOnInit() {
  }

}
