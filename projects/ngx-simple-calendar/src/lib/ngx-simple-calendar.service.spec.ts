import { TestBed } from '@angular/core/testing';

import { NgxSimpleCalendarService } from './ngx-simple-calendar.service';

describe('NgxSimpleCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSimpleCalendarService = TestBed.get(NgxSimpleCalendarService);
    expect(service).toBeTruthy();
  });
});
