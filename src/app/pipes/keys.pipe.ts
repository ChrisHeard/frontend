// keys.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys',
    standalone: true
 })
export class KeysPipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) return [];
    return Object.keys(value);
  }
}
