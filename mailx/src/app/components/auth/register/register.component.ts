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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public submit(): void {
    if (!this.username) { return; }
    if (!this.email) { return; }
    if (!this.password) { return; }

    let form: any = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(form).then((user: User) => {
      console.log(user);
    });
  }

  public login(): void {
    this.router.navigate(['auth/login']);
  }

}
