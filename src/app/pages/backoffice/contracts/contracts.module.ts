import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListingComponent } from './contracts-listing/contracts-listing.component';


@NgModule({
  declarations: [
    ContractsListingComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
