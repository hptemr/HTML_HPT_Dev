import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  // Override day view hour format
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
   // console.log(locale,'<<<<  date >>>> ',date)
    const aa = new DatePipe(locale ? locale : 'en-US').transform(date, 'hh:mm a'); // Custom format, e.g., 12:15 AM;
    return aa ? aa : '';
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
   // console.log(locale,'<<<<  date >>>> ',date)
    const aa = new DatePipe(locale ? locale : 'en-US').transform(date, 'hh:mm a'); // Custom format, e.g., 12:15 AM;
    return aa ? aa : '';
  }

  // public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
  //     const aa = new DatePipe(locale ? locale : 'en-US').transform(date, 'hh:mm a'); // Custom format, e.g., 12:15 AM;
  //     return aa ? aa : '';
  // }

}
