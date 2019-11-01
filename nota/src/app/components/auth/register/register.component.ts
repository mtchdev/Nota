import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppVariables } from 'app/app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public username: string;
  public email: string;
  public password: string;
  public termsConditions = false;
  public privacyPolicy = false;

  public errors = {
    username: null,
    email: null,
    password: null,
    terms: null,
    privacy: null
  };

  public registerLoading = false;
  public showContinueWithoutModal = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public submit(): void {
    for (let i in this.errors) {
      this.errors[i] = null;
    }

    if (!this.username) {
      this.errors.username = 'Please enter a username.';
    }
    if (!this.email) {
      this.errors.email = 'Please enter an email address.';
    }
    if (!this.password) {
      this.errors.password = 'Please enter a password.';
    }
    if (!this.termsConditions) {
      this.errors.terms = 'You need to agree with the Terms & Conditions.';
    }
    if (!this.privacyPolicy) {
      this.errors.privacy = 'You need to agree with the Privacy Policy.';
    }
    if (this.email && !this.validateEmail()) {
      this.errors.email = 'Please enter a valid email address.';
    }
    if (this.username && this.username.length < AppVariables.minimumUsernameLength) {
      this.errors.username = 'Your username must be at least 3 characters.';
    }

    for (let i in this.errors) {
      if (this.errors[i]) {
        return;
      }
    }

    this.registerLoading = true;

    let form: any = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(form).subscribe(
      data => {
        this.registerLoading = false;

        // set active context
        localStorage.setItem(AppVariables.authTokenIdentifier, data.data.token);
        this.authService.user = data.data.user;
        this.authService.token = data.data.token;
        this.router.navigate(['onboarding/notebook']);
      },
      error => {
        this.registerLoading = false;
        alert('An error occurred, try again later.');
      }
    );
  }

  public login(): void {
    this.router.navigate(['auth/login']);
  }

  public validateEmail(): boolean {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(this.email);
  }

  public continueWithoutAccount(): void {
    this.showContinueWithoutModal = false;
    this.router.navigate(['onboarding/notebook']);
  }

}
