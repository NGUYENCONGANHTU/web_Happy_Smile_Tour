import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeSince',
  standalone: true,
})
export class TimeSincePipe implements PipeTransform {
  transform(value: Date | string | number, format = 'DD/MM/YYYY'): string {
    if (!value) return '';

    let dateMoment: moment.Moment;
    if (typeof value === 'string') {
      dateMoment = moment(value, format, true);
    } else {
      dateMoment = moment(value);
    }

    if (!dateMoment.isValid()) return '';

    // normalize both to start of day
    const now = moment().startOf('day');
    const date = dateMoment.startOf('day');

    const seconds = now.diff(date, 'seconds');
    if (seconds < 0) return 'Vừa xong';

    // nếu lâu hơn 1 tháng (30 ngày) thì trả về full date
    const oneMonthInSeconds = 2592000; // 30 ngày
    if (seconds > oneMonthInSeconds) {
      return dateMoment.format(format);
    }

    const intervals: Record<string, number> = {
      năm: 31536000,
      tháng: 2592000,
      tuần: 604800,
      ngày: 86400,
      giờ: 3600,
      phút: 60,
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `${interval} ${key} trước`;
      }
    }

    return 'Vừa xong';
  }
}
