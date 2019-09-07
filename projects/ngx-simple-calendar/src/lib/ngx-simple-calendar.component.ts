import {AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxSimpleCalendarService} from './ngx-simple-calendar.service';
import {months, days, CalendarDay, CalendarEvent, TopBar, CalendarMonths, DayI} from './data-models/data-calendar';


@Component({
  selector: 'ngx-simple-calendar',
  templateUrl: './ngx-simple-calendar.component.html',
  styleUrls: ['./ngx-simple-calendar.component.scss']
})
export class NgxSimpleCalendarComponent implements OnInit, AfterViewInit {

  private eventsInternal: CalendarEvent[];

  @Input('options') options = {};

  @Input('events') set events(value: CalendarEvent[]) {
    this.eventsInternal = value;
    this.initializeCalendar();
  }

  get events(): CalendarEvent[] {
    return this.eventsInternal;
  }

  @ViewChild('dayHolder', {static: false, read: ElementRef}) dayHolder;

  @ContentChild('day', {static: false, read: TemplateRef}) dayTemplate;
  @ContentChild('topBar', {static: false, read: TemplateRef}) topBarTemplate;
  @ContentChild('weekDays', {static: false, read: TemplateRef}) weekDaysTemplate;

  get activeMonth(): TopBar {
    const currentMonth = months.find((month) => month.id === this.currentMonth);
    return {
      year: this.currentYear,
      month: currentMonth,
      setNextMonth: this.setNextMonth,
      setPreviousMonth: this.setPreviousMonth
    };
  }

  constructor(private ngxCalendarSrv: NgxSimpleCalendarService) {
  }

  dayCorrectedHeight = '';
  calendarData: CalendarDay[];
  currentMonthYearText: string;
  currentMonth: number;
  currentYear: number;

  months: CalendarMonths[] = months;
  days: DayI[] = days;

  settings = {
    outline: true,
    evenDayDimensions: false
  };

  ngOnInit() {
    this.settings = {...this.settings, ...this.options};
    this.initializeCalendar();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.dayCorrectedHeight = `${this.dayHolder.nativeElement.clientWidth}px`, 0);
  }

  private initializeCalendar() {
    this.setupActiveDate();
    this.setupCalendarData();
  }

  private setupActiveDate() {
    if (!this.currentMonth) {
      const now = new Date();
      this.currentMonth = now.getMonth();
      this.currentYear = now.getFullYear();
      this.currentMonthYearText = this.ngxCalendarSrv.getMonthYearText(this.currentMonth, this.currentYear);
    }
  }

  private setupCalendarData() {
    this.calendarData = this.ngxCalendarSrv.setupCalendar(this.currentMonth, this.currentYear, this.events);
  }

  setPreviousMonth() {
    if ((this.currentMonth - 1) === -1) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.calendarData = this.ngxCalendarSrv.setupCalendar(this.currentMonth, this.currentYear, this.events);
    this.currentMonthYearText = this.ngxCalendarSrv.getMonthYearText(this.currentMonth, this.currentYear);
  }

  setNextMonth() {
    if ((this.currentMonth + 1) === 12) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }

    this.calendarData = this.ngxCalendarSrv.setupCalendar(this.currentMonth, this.currentYear, this.events);
    this.currentMonthYearText = this.ngxCalendarSrv.getMonthYearText(this.currentMonth, this.currentYear);
  }
}
