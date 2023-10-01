import { Pipe, PipeTransform } from '@angular/core';

// this pipe is tranform the phonenumber to the desire type formated string (054-4212458) or to number (544212458)

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number): string | number {
    if (typeof value === 'string') {
      // in case of adding indured to contact display empty string when no phone number included
      return value ? this.transformToNumber(value) : '';
    } else if (typeof value === 'number') {
      return this.transformToString(value);
    } else {
      return value;
    }
  }

  private transformToNumber(value: string): number {
    const transformedValue = value.substring(1).replace('-', '');
    return parseInt(transformedValue, 10); // Parsing string to number
  }
  
  private transformToString(value: number): string {
    const strValue = '0' + value.toString();
    return strValue.substring(0, 3) + '-' + strValue.substring(3); // adding '-' after the third character
  }
}