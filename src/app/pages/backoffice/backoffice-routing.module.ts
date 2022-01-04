import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminsLayoutComponent } from 'src/app/layouts/super-admins-layout/super-admins-layout.component';
import { DashboardComponent } from 'src/app/pages/backoffice/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminsLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
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
