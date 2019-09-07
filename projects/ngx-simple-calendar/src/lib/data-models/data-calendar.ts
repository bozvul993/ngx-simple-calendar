// ENUMS

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

// DAYS

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

// INTERFACES
// Day object inside calendar
export interface CalendarDay {
  today: boolean;
  readonly number: number;
  readonly month: number;
  readonly year: number;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly weekend: boolean;
  readonly activeMonth: boolean;
  events: CalendarEvent[];
}

export interface TopBar {
  year: number;
  month: CalendarMonths;
  setNextMonth: () => void;
  setPreviousMonth: () => void;
}

export interface CalendarEvent {
  startDateTime: Date;
  endDateTime?: Date;
  data?: any;
}

export interface DayI {
  readonly id: number;
  readonly translationKey: string;
  readonly name: string;
}

export interface CalendarMonths {
  readonly id: Month;
  readonly translationKey: string;
  readonly name: string;
}

// BASE DATA

export const months: CalendarMonths[] = [{
  id: Month.January,
  translationKey: 'calendar.months.january',
  name: 'January'
}, {
  id: Month.February,
  translationKey: 'calendar.months.february',
  name: 'February'
}, {
  id: Month.March,
  translationKey: 'calendar.months.march',
  name: 'March'
}, {
  id: Month.April,
  translationKey: 'calendar.months.april',
  name: 'April'
}, {
  id: Month.May,
  translationKey: 'calendar.months.may',
  name: 'May'
}, {
  id: Month.June,
  translationKey: 'calendar.months.june',
  name: 'June'
}, {
  id: Month.July,
  translationKey: 'calendar.months.july',
  name: 'July'
}, {
  id: Month.August,
  translationKey: 'calendar.months.august',
  name: 'August'
}, {
  id: Month.September,
  translationKey: 'calendar.months.september',
  name: 'September'
}, {
  id: Month.October,
  translationKey: 'calendar.months.october',
  name: 'October'
}, {
  id: Month.November,
  translationKey: 'calendar.months.november',
  name: 'November'
}, {
  id: Month.December,
  translationKey: 'calendar.months.december',
  name: 'December'
}];

export const days: DayI[] = [{
  id: Day.Monday,
  translationKey: 'calendar.days.monday',
  name: 'Monday'
}, {
  id: Day.Tuesday,
  translationKey: 'calendar.days.tuesday',
  name: 'Tuesday'
}, {
  id: Day.Wednesday,
  translationKey: 'calendar.days.wednesday',
  name: 'Wednesday'
}, {
  id: Day.Thursday,
  translationKey: 'calendar.days.thursday',
  name: 'Thursday'
}, {
  id: Day.Friday,
  translationKey: 'calendar.days.friday',
  name: 'Friday'
}, {
  id: Day.Saturday,
  translationKey: 'calendar.days.saturday',
  name: 'Saturday'
}, {
  id: Day.Sunday,
  translationKey: 'calendar.days.sunday',
  name: 'Sunday'
}];
