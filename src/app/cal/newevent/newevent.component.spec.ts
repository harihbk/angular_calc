/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NeweventComponent } from './newevent.component';

describe('NeweventComponent', () => {
  let component: NeweventComponent;
  let fixture: ComponentFixture<NeweventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeweventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
