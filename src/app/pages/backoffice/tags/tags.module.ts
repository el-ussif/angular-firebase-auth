import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsUpdateComponent } from './tags-update/tags-update.component';
import { TagsCreateComponent } from './tags-create/tags-create.component';
import { TagsListingComponent } from './tags-listing/tags-listing.component';


@NgModule({
  declarations: [
    TagsUpdateComponent,
    TagsCreateComponent,
    TagsListingComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MiscellaneousModule,
    TranslateModule,
    NgxDatatableModule,
    MomentModule,
    FormsModule,
  ]
})
export class TagsModule { }
