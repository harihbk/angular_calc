/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Formula_sectionComponent } from './formula_section.component';

describe('Formula_sectionComponent', () => {
  let component: Formula_sectionComponent;
  let fixture: ComponentFixture<Formula_sectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formula_sectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formula_sectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
