/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Condition_else_ifComponent } from './condition_else_if.component';

describe('Condition_else_ifComponent', () => {
  let component: Condition_else_ifComponent;
  let fixture: ComponentFixture<Condition_else_ifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Condition_else_ifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Condition_else_ifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
