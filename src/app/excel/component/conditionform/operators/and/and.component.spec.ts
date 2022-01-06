/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AndComponent } from './and.component';

describe('AndComponent', () => {
  let component: AndComponent;
  let fixture: ComponentFixture<AndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
