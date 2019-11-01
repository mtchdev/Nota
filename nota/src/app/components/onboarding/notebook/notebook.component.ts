import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/components/auth/auth.service';
import { OnboardingService } from '../onboarding.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './notebook.component.html'
})
export class OnboardingNotebookComponent implements OnInit {

  public username: string;
  public notebook: string;
  public errors = {
    notebook: null
  };

  constructor(private authService: AuthService, private onboardingService: OnboardingService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.user) {
      this.username = 'User';
    } else {
      this.username = this.authService.user.username;
    }
  }

  submit(): void {
    this.onboardingService.notebook.title = this.notebook;
    this.router.navigate(['onboarding/notebook']); // TODO
  }

}
