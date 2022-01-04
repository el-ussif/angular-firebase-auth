import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { AuthorsCreateComponent } from 'src/app/pages/backoffice/authors/authors-create/authors-create.component';
import { AuthorsListingComponent } from 'src/app/pages/backoffice/authors/authors-listing/authors-listing.component';
import { AuthorsUpdateComponent } from 'src/app/pages/backoffice/authors/authors-update/authors-update.component';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsShowComponent } from './authors-show/authors-show.component';


@NgModule({
  declarations: [
    AuthorsListingComponent,
    AuthorsCreateComponent,
    AuthorsUpdateComponent,
    AuthorsShowComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MiscellaneousModule,
    TranslateModule,
    NgxDatatableModule,
    MomentModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxDropzoneModule,
    PipesModule,
  ],
})
export class AuthorsModule { }
