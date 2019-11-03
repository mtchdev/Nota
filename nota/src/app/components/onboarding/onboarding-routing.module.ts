import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingComponent } from './onboarding.component';
import { OnboardingNotebookComponent } from './notebook/notebook.component';

export const routes: Routes = [
    {
        path: 'onboarding',
        children: [
            {
                path: '',
                component: OnboardingComponent
            },
            {
                path: 'notebook',
                component: OnboardingNotebookComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class OnboardingRoutingModule {}
