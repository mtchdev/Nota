import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InboxComponent } from './components/app/inbox/inbox.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/onboarding',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: InboxComponent
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
