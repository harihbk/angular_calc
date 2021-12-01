/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomjobComponent } from './customjob.component';

describe('CustomjobComponent', () => {
  let component: CustomjobComponent;
  let fixture: ComponentFixture<CustomjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
