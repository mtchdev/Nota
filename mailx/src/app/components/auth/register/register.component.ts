import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../../models/auth/User';
import { AppVariables } from '../../../../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public username: string;
  public email: string;
  public password: string;

  public errors = {
    username: null,
    email: null,
    password: null
  };

  public registerLoading = false;

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
      },
      error => {
        console.log(error);
        this.registerLoading = false;
        alert('An error occurred, try again later.');
      }
    );
  }

  public login(): void {
    this.router.navigate(['auth/login']);
  }

}
