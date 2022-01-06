/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Aggregate_typeComponent } from './aggregate_type.component';

describe('Aggregate_typeComponent', () => {
  let component: Aggregate_typeComponent;
  let fixture: ComponentFixture<Aggregate_typeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aggregate_typeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aggregate_typeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
