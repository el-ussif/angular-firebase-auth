import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListingComponent } from './transactions-listing/transactions-listing.component';


@NgModule({
  declarations: [
    TransactionsListingComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
