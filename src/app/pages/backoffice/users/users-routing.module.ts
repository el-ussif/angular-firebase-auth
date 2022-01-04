import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListingComponent } from 'src/app/pages/backoffice/users/users-listing/users-listing.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
