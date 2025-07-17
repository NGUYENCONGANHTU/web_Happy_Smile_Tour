import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'considerNotNullPipe',
})
export class ConsiderNotNullPipe implements PipeTransform {
  transform(value: any): boolean {
    if (value) {
      if (Array.isArray(value)) {
        return !!value.length;
      } else if (typeof value === 'object') {
        return !!Object.keys(value).length;
      }
      return !!value;
    }
    return false;
  }
}
