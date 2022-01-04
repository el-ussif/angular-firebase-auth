import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MomentModule } from 'ngx-moment';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListingComponent } from './users-listing/users-listing.component';


@NgModule({
  declarations: [
    UsersListingComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MiscellaneousModule,
    TranslateModule,
    NgxDatatableModule,
    MomentModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxDropzoneModule,
    PipesModule,
  ]
})
export class UsersModule { }
