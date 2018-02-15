import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uidToUsername'
})
export class UidToUsernamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const username = value.replace('steemconnect:', '');
    return username;
  }
}
