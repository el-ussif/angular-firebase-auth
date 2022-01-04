import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CategoriesCreateComponent,
} from 'src/app/pages/backoffice/categories/categories-create/categories-create.component';
import {
  CategoriesListingComponent,
} from 'src/app/pages/backoffice/categories/categories-listing/categories-listing.component';
import {
  CategoriesUpdateComponent,
} from 'src/app/pages/backoffice/categories/categories-update/categories-update.component';
const routes: Routes = [
  {
    path: '',
    component: CategoriesListingComponent,
  },
  {
    path: 'create',
    component: CategoriesCreateComponent,
  },
  {
    path: 'update/:id',
    component: CategoriesUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {
}
