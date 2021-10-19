import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flat',
})
export class FlatPipe implements PipeTransform {
  transform(value: any[][], ...args: string[]): any[] {
    return value.flat();
  }
}
