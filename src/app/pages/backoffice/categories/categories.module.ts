import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListingComponent } from './categories-listing/categories-listing.component';
import { CategoriesUpdateComponent } from './categories-update/categories-update.component';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';


@NgModule({
  declarations: [
    CategoriesListingComponent,
    CategoriesUpdateComponent,
    CategoriesCreateComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MiscellaneousModule,
    TranslateModule,
    NgxDatatableModule,
    MomentModule,
    FormsModule,
  ]
})
export class CategoriesModule { }
