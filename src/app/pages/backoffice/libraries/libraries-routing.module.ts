import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesCreateComponent } from 'src/app/pages/backoffice/libraries/libraries-create/libraries-create.component';
import { LibrariesListingComponent } from 'src/app/pages/backoffice/libraries/libraries-listing/libraries-listing.component';
import { LibrariesShowComponent } from 'src/app/pages/backoffice/libraries/libraries-show/libraries-show.component';
import { LibrariesUpdateComponent } from 'src/app/pages/backoffice/libraries/libraries-update/libraries-update.component';

const routes: Routes = [
  {
    path: '',
    component: LibrariesListingComponent,
  },
  {
    path: 'create',
    component: LibrariesCreateComponent,
  },
  {
    path: 'update/:id',
    component: LibrariesUpdateComponent,
  },
  {
    path: 'show/:id',
    component: LibrariesShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariesRoutingModule {
}
