import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value *= 655.95;
    return new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(value)
  }
}
