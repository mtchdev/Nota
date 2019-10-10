import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../../models/auth/User';

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

    this.authService.register(form).then((user: User) => {
      console.log(user);
      this.registerLoading = false;
    });
  }

  public login(): void {
    this.router.navigate(['auth/login']);
  }

}
