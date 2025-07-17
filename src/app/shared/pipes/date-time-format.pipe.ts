import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  standalone: true,
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(
    value: any,
    formatOut = 'DD-MM-YYYY HH:mm',
    formatIn?: string
  ): string {
    if (!moment(value).isValid()) return '';
    return moment(value, formatIn).format(formatOut);
  }
}
