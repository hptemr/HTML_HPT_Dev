// custom-date-parser-formatter.ts
import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 3) {
        return {
          day: parseInt(dateParts[0], 10),
          month: parseInt(dateParts[1], 10),
          year: parseInt(dateParts[2], 10)
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? `${this.padNumber(date.day)}-${this.padNumber(date.month)}-${date.year}` : '';
  }

  private padNumber(value: number | null): string {
    return value !== null ? `0${value}`.slice(-2) : '';
  }


}