import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const AuthRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'set-password/:username',
    component: SetPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'forgot-password',
    children: [
      {
        path: '',
        component: ForgotPasswordComponent,
      },
      {
        path: ':username',
        component: ForgotPasswordComponent,
      },
    ],
  },
];
