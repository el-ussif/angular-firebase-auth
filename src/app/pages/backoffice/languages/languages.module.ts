import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { LanguagesCreateComponent } from './languages-create/languages-create.component';
import { LanguagesListingComponent } from './languages-listing/languages-listing.component';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesUpdateComponent } from './languages-update/languages-update.component';


@NgModule({
  declarations: [
    LanguagesCreateComponent,
    LanguagesUpdateComponent,
    LanguagesListingComponent
  ],
  imports: [
    CommonModule,
    LanguagesRoutingModule,
    MiscellaneousModule,
    TranslateModule,
    NgxDatatableModule,
    MomentModule,
    FormsModule,
  ],
})
export class LanguagesModule { }
