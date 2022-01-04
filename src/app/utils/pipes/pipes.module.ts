import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AclPipe } from 'src/app/utils/pipes/acl.pipe';
import { NumberFormatPipe } from 'src/app/utils/pipes/number-format.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';

const EXPORTS = [
  AclPipe,
  NumberFormatPipe,
  CurrencyFormatPipe
];

@NgModule({
  declarations: [
    ...EXPORTS,
  ],
  exports: [
    ...EXPORTS,
  ],
})

export class PipesModule { }
