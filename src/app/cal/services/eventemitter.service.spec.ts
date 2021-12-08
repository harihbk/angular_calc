/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventemitterService } from './eventemitter.service';

describe('Service: Eventemitter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventemitterService]
    });
  });

  it('should ...', inject([EventemitterService], (service: EventemitterService) => {
    expect(service).toBeTruthy();
  }));
});
