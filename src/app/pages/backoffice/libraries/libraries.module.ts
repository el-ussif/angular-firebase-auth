import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { LibrariesCreateComponent } from './libraries-create/libraries-create.component';
import { LibrariesListingComponent } from './libraries-listing/libraries-listing.component';

import { LibrariesRoutingModule } from './libraries-routing.module';
import { LibrariesUpdateComponent } from './libraries-update/libraries-update.component';
import { LibrariesShowComponent } from './libraries-show/libraries-show.component';


@NgModule({
  declarations: [
    LibrariesUpdateComponent,
    LibrariesListingComponent,
    LibrariesCreateComponent,
    LibrariesShowComponent,
  ],
    imports: [
        CommonModule,
        LibrariesRoutingModule,
        MiscellaneousModule,
        TranslateModule,
        NgxDatatableModule,
        MomentModule,
        FormsModule,
        HttpClientModule,
        AngularEditorModule,
        NgxDropzoneModule,
        NgSelectModule,
        NgxAudioPlayerModule,
        AccordionModule,
    ],
})
export class LibrariesModule {
}
