import { TestBed } from '@angular/core/testing';

import { CalendarResolver } from './calendar.resolver';

describe('CalendarResolver', () => {
  let resolver: CalendarResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CalendarResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
