import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-logicaldropdown',
  templateUrl: './logicaldropdown.component.html',
  styleUrls: ['./logicaldropdown.component.css']
})
export class LogicaldropdownComponent implements OnInit {

  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
