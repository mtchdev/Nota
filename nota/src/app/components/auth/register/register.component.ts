import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppVariables } from 'app/app.constants';
import { AuthExceptions } from 'app/app.exceptions';

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
        this.authService.init(data.data);
        this.router.navigate(['onboarding/notebook']);
      },
      error => {
        this.registerLoading = false;

        let errorMessage = AuthExceptions[error.error.message];
        switch (error.error.message) {
          case 'USER_USERNAME_EXISTS':
            this.errors.username = errorMessage;
            break;

          case 'USER_EMAIL_EXISTS':
            this.errors.email = errorMessage;
            break;
        }
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
