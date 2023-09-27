import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number): string | number {
    if (typeof value === 'string') {
      return this.transformToNumber(value);
    } else if (typeof value === 'number') {
      return this.transformToString(value);
    } else {
      return value; // or you can throw an error if the value is neither a string nor a number.
    }
  }

  private transformToNumber(value: string): number {
    const transformedValue = value.substring(1).replace('-', '');
    return parseInt(transformedValue, 10); // Parsing string to number
  }
  
  private transformToString(value: number): string {
    const strValue = '0' + value.toString();
    return strValue.substring(0, 3) + '-' + strValue.substring(3); // Adding '-' after the third character
  }
}