/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Condition_then_ifComponent } from './condition_then_if.component';

describe('Condition_then_ifComponent', () => {
  let component: Condition_then_ifComponent;
  let fixture: ComponentFixture<Condition_then_ifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Condition_then_ifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Condition_then_ifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
