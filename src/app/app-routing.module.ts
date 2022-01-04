import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnautorizeComponent } from 'src/app/pages/unautorize/unautorize.component';
import { AuthGuard } from 'src/app/utils/intercepters/auth.guard';
import { IsLoggedGuard } from 'src/app/utils/intercepters/is-logged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AfterLoginComponent } from './pages/auth/after-login/after-login.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SendPasswordResetFormComponent } from './pages/auth/send-password-reset-form/send-password-reset-form.component';
import { UserTypeGuard } from './utils/intercepters/user-type.guard';

const routes: Routes = [
  {
    path: 'unautorized',
    component: UnautorizeComponent,
  },
  {
    path: '',
    loadChildren: () => import('./pages/backoffice/backoffice.module').then(m => m.BackofficeModule),
    canActivate: [
      AuthGuard,
      UserTypeGuard,
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [IsLoggedGuard],
      },
      {
        path: 'configurations',
        component: AfterLoginComponent,
      },
      {
        path: 'forgot-password',
        component: SendPasswordResetFormComponent,
        canActivate: [IsLoggedGuard],
      },
      {
        path: 'reset-password',
        component: SendPasswordResetFormComponent,
        canActivate: [IsLoggedGuard],
      },
    ],
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
