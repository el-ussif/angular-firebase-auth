import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminsLayoutComponent } from 'src/app/layouts/super-admins-layout/super-admins-layout.component';
import { DashboardComponent } from 'src/app/pages/backoffice/dashboard/dashboard.component';
import { UserHasRoleGuard } from 'src/app/utils/intercepters/user-has-role.guard';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminsLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT', 'DESIGNER'],
        },
      },
      {
        path: 'languages',
        loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: 'authors',
        loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT'],
        },
      },
      {
        path: 'collections',
        loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT', 'DESIGNER'],
        },
      },
      {
        path: 'tailes',
        loadChildren: () => import('./libraries/libraries.module').then(m => m.LibrariesModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT', 'DESIGNER'],
        },
      },
      {
        path: 'contracts',
        loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT'],
        },
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [UserHasRoleGuard],
        data: {
          roles: ['ADMIN', 'AGENT'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {
}
