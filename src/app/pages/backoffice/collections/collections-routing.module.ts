import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsCreateComponent } from 'src/app/pages/backoffice/collections/collections-create/collections-create.component';
import { CollectionsListingComponent } from 'src/app/pages/backoffice/collections/collections-listing/collections-listing.component';
import {
  CollectionsShowComponent
} from 'src/app/pages/backoffice/collections/collections-show/collections-show.component';
import { CollectionsUpdateComponent } from 'src/app/pages/backoffice/collections/collections-update/collections-update.component';
import { UserHasRoleGuard } from 'src/app/utils/intercepters/user-has-role.guard';

const routes: Routes = [
  {
    path: '',
    component: CollectionsListingComponent,
  },
  {
    path: 'create',
    component: CollectionsCreateComponent,
    canActivate: [UserHasRoleGuard],
    data: {
      roles: ['ADMIN', 'AGENT'],
    },
  },
  {
    path: 'update/:id',
    component: CollectionsUpdateComponent,
    canActivate: [UserHasRoleGuard],
    data: {
      roles: ['ADMIN', 'AGENT'],
    },
  },
  {
    path: 'show/:id',
    component: CollectionsShowComponent,
    canActivate: [UserHasRoleGuard],
    data: {
      roles: ['ADMIN', 'AGENT', 'DESIGNER'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
