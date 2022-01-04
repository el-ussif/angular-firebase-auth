import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { CollectionsCreateComponent } from './collections-create/collections-create.component';
import { CollectionsListingComponent } from './collections-listing/collections-listing.component';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsUpdateComponent } from './collections-update/collections-update.component';
import { CollectionsShowComponent } from './collections-show/collections-show.component';


@NgModule({
  declarations: [
    CollectionsCreateComponent,
    CollectionsUpdateComponent,
    CollectionsListingComponent,
    CollectionsShowComponent,
  ],
    imports: [
        CommonModule,
        CollectionsRoutingModule,
        MiscellaneousModule,
        TranslateModule,
        NgxDatatableModule,
        MomentModule,
        FormsModule,
        HttpClientModule,
        AngularEditorModule,
        NgxDropzoneModule,
        AccordionModule,
    ],
})
export class CollectionsModule {
}
