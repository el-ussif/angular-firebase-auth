import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsCreateComponent } from 'src/app/pages/backoffice/authors/authors-create/authors-create.component';
import { AuthorsListingComponent } from 'src/app/pages/backoffice/authors/authors-listing/authors-listing.component';
import { AuthorsShowComponent } from 'src/app/pages/backoffice/authors/authors-show/authors-show.component';
import { AuthorsUpdateComponent } from 'src/app/pages/backoffice/authors/authors-update/authors-update.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsListingComponent,
  },
  {
    path: 'create',
    component: AuthorsCreateComponent,
  },
  {
    path: 'update/:id',
    component: AuthorsUpdateComponent,
  },
  {
    path: 'show/:id',
    component: AuthorsShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
