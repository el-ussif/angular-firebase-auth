import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsCreateComponent } from 'src/app/pages/backoffice/authors/authors-create/authors-create.component';
import { AuthorsListingComponent } from 'src/app/pages/backoffice/authors/authors-listing/authors-listing.component';
import { AuthorsUpdateComponent } from 'src/app/pages/backoffice/authors/authors-update/authors-update.component';
import {
  LanguagesCreateComponent
} from 'src/app/pages/backoffice/languages/languages-create/languages-create.component';
import {
  LanguagesListingComponent
} from 'src/app/pages/backoffice/languages/languages-listing/languages-listing.component';
import {
  LanguagesUpdateComponent
} from 'src/app/pages/backoffice/languages/languages-update/languages-update.component';

const routes: Routes = [
  {
    path: '',
    component: LanguagesListingComponent,
  },
  {
    path: 'create',
    component: LanguagesCreateComponent,
  },
  {
    path: 'update/:id',
    component: LanguagesUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
