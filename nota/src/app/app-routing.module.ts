import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/inbox',
    pathMatch: 'full'
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
