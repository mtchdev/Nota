import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public button(): void {
    this.router.navigate(['auth/register']);
  }

}
