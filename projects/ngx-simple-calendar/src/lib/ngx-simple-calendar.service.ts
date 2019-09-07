import { Injectable } from '@angular/core';
import {CalendarDay, CalendarEvent, months} from './data-models/data-calendar';

@Injectable({
  providedIn: 'root'
})
export class NgxSimpleCalendarService {

  constructor() {
  }

  getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  getFirstDayInMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  getLastDayInMonth = (month: number, year: number) => new Date(year, month, this.getDaysInMonth(month, year)).getDay();

  setupCalendar(month: number, year: number, events: CalendarEvent[]): CalendarDay[] {
    const firstDayInMonth = this.getFirstDayInMonth(month, year);
    const lastDayInMonth = this.getLastDayInMonth(month, year);

    const daysFromLastMonth = this.getDaysFromLastMonth(month, year, firstDayInMonth);
    const daysFromCurrentMonth = this.getDaysInCurrentMonth(month, year);
    const daysFromNextMonth = this.getDaysFromNextMonth(month, year, lastDayInMonth);

    const calendarData = [...daysFromLastMonth, ...daysFromCurrentMonth, ...daysFromNextMonth];

    this.markCurrentDate(calendarData);

    if (events) {
      this.addEvents(calendarData, events);
    }

    return calendarData;
  }

  getMonthYearText = (monthNumber: number, year: number) => `${months.find((item) => item.id === monthNumber).name} ${year}`;

  private getDaysFromLastMonth(month: number, year: number, firstDayInMonth: number): CalendarDay[] {
    let lastMonth, activeYear;
    const lastMonthDays = [];
    if ((month - 1) === -1) {
      lastMonth = 11;
      activeYear = year - 1;
    } else {
      lastMonth = month - 1;
      activeYear = year;
    }

    const daysLastMonth = this.getDaysInMonth(lastMonth, activeYear);
    const lastFromMonth = (firstDayInMonth === 0) ? 6 : firstDayInMonth - 1;

    for (let i = (daysLastMonth - lastFromMonth) + 1; i <= daysLastMonth; i++) {
      lastMonthDays.push(this.generatedayObject(activeYear, lastMonth, i, false));
    }

    return lastMonthDays;
  }

  private getDaysInCurrentMonth(month, year): CalendarDay[] {
    const daysInMonth = this.getDaysInMonth(month, year);
    const currentMonthDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(this.generatedayObject(year, month, i));
    }

    return currentMonthDays;
  }

  private getDaysFromNextMonth(month: number, year: number, lastDayInMonth: number): CalendarDay[] {
    let nextMonth, activeYear;

    const lastMonthDays = [];
    if ((month + 1) === 12) {
      nextMonth = 0;
      activeYear = year + 1;
    } else {
      nextMonth = month + 1;
      activeYear = year;
    }

    const lastFromMonth = (lastDayInMonth === 0) ? 0 : 7 - lastDayInMonth;

    for (let i = 1; i <= lastFromMonth; i++) {
      lastMonthDays.push(this.generatedayObject(activeYear, nextMonth, i, false));
    }

    return lastMonthDays;
  }

  private markCurrentDate(calendarData: CalendarDay[]) {
    const now = new Date();
    const todaysDate = now.getDate();
    const todaysMonth = now.getMonth();
    const todaysYear = now.getFullYear();

    calendarData.forEach((day) => {
      if (day.number === todaysDate && day.month === todaysMonth && day.year === todaysYear) {
        day.today = true;
      }
    });
  }

  private isWeekend(date: Date) {
    const numberDay = date.getDay();
    return numberDay === 0 || numberDay === 6;
  }

  private getDateTimeLastOfDay(dateTime: Date) {
    const result = new Date(dateTime.getTime());
    result.setDate(result.getDate() + 1);
    result.setMilliseconds(result.getMilliseconds() - 1);
    return result;
  }

  generatedayObject(year: number, month: number, day: number, activeMonth: boolean = true) {
    const startDateTime = new Date(year, month, day);
    const endDateTime = this.getDateTimeLastOfDay(startDateTime);
    return {
      number: day,
      startDateTime,
      endDateTime,
      month: startDateTime.getMonth(),
      year: startDateTime.getFullYear(),
      weekend: this.isWeekend(startDateTime),
      today: false,
      activeMonth,
      events: []
    };
  }

  private addEvents(calendarData: CalendarDay[], events: CalendarEvent[]) {
    events.forEach((event: CalendarEvent) => {
      if (!event.endDateTime) {
        this.handleFullDayEvent(calendarData, event);
      } else {
        this.handleEventInterval(calendarData, event);
      }
    });
  }

  private handleFullDayEvent(calendarData: CalendarDay[], event: CalendarEvent) {
    try {
      const dayWithEvent = calendarData.find((day) => {
        return day.startDateTime.getTime() <= event.startDateTime.getTime() && day.endDateTime.getTime() >= event.startDateTime.getTime();
      });
      dayWithEvent.events.push(event);
    } catch (e) {
      console.log('startDateTime on event is not set');
    }
  }

  private handleEventInterval(calendarData: CalendarDay[], event: CalendarEvent) {
    try {
      const fromDaysInCalendar = calendarData.filter((day) => day.endDateTime.getTime() >= event.startDateTime.getTime());
      const intervalDaysInCalendar = fromDaysInCalendar.filter((day) => {
        const yesterDayReferentDay = new Date(day.endDateTime.getTime());
        yesterDayReferentDay.setDate(yesterDayReferentDay.getDate() - 1);
        return yesterDayReferentDay.getTime() <= event.endDateTime.getTime();
      });
      intervalDaysInCalendar.forEach((day) => {
        day.events.push(event);
      });
    } catch (e) {
      console.log('Error on handling event interval');
    }
  }
}
