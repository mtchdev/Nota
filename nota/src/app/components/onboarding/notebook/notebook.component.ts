import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/components/auth/auth.service';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';

type Step = 'notebook' | 'color' | 'tasks' | 'finish';

@Component({
  templateUrl: './notebook.component.html'
})
export class OnboardingNotebookComponent implements OnInit {

  public username: string;
  public notebookTitle: string;
  public errors = {
    notebook: null
  };
  public step: Step = 'notebook';

  constructor(private authService: AuthService, private onboardingService: OnboardingService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.user) {
      this.username = 'User';
    } else {
      this.username = this.authService.user.username;
    }
  }

  createNotebook(): void {
    this.errors.notebook = null;

    if (!this.notebookTitle) {
      this.errors.notebook = 'Please provide a notebook title.';
    }
    if (this.notebookTitle && this.notebookTitle.length > 30) {
      this.errors.notebook = 'The title must be under 30 characters.';
    }

    if (this.errors.notebook) { return; }

    this.onboardingService.notebook.title = this.notebookTitle;
    this.router.navigate(['onboarding/notebook']); // TODO
  }

}
