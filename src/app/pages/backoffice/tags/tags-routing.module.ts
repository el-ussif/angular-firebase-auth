import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsCreateComponent } from 'src/app/pages/backoffice/tags/tags-create/tags-create.component';
import { TagsListingComponent } from 'src/app/pages/backoffice/tags/tags-listing/tags-listing.component';
import { TagsUpdateComponent } from 'src/app/pages/backoffice/tags/tags-update/tags-update.component';

const routes: Routes = [
  {
    path: '',
    component: TagsListingComponent,
  },
  {
    path: 'create',
    component: TagsCreateComponent,
  },
  {
    path: 'update/:id',
    component: TagsUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
