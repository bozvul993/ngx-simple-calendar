import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSimpleCalendarComponent } from './ngx-simple-calendar.component';

describe('NgxSimpleCalendarComponent', () => {
  let component: NgxSimpleCalendarComponent;
  let fixture: ComponentFixture<NgxSimpleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSimpleCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSimpleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
