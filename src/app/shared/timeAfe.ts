import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { timestamp } from 'rxjs';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    const datePipe = new DatePipe('en-US');
    const now = new Date().getTime();
    const diff = now - value.toMillis();

    if (diff < 86400000) { // less than 24 hours
      return datePipe!.transform(value.toMillis(), 'h:mm a')!;
    } else if (diff < 604800000) { // less than 7 days
      const days = Math.floor(diff / 86400000);
      return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    } else { // more than 7 days
      return datePipe!.transform(value.toMillis(), 'd-MMMM-yyyy')!;
    }
  }
}

