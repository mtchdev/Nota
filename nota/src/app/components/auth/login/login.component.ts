import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppVariables } from 'app/app.constants';
import { AuthExceptions } from 'app/app.exceptions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public username: string;
    public password: string;

    public errors = {
        username: null,
        password: null
    };

    public loginLoading = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
    }

    public submit(): void {
        for (let i in this.errors) {
            this.errors[i] = null;
        }

        if (!this.username) {
            this.errors.username = 'Please enter your username.';
        }
        if (!this.password) {
            this.errors.password = 'Please enter your password.';
        }

        for (let i in this.errors) {
            if (this.errors[i]) {
                return;
            }
        }

        this.loginLoading = true;

        let form: any = {
            username: this.username,
            password: this.password
        };

        this.authService.login(form).subscribe(
            data => {
                this.loginLoading = false;

                localStorage.setItem(AppVariables.authTokenIdentifier, data.data.token);
                this.authService.user = data.data.user;
                this.authService.token = data.data.token;
            },
            error => {
                this.loginLoading = false;

                let errorMessage = AuthExceptions[error.error.message];
                switch (error.error.message) {
                    case 'USER_USER_NOT_FOUND':
                    this.errors.username = errorMessage;
                    break;

                    case 'USER_PASSWORD_INCORRECT':
                    this.errors.password = errorMessage;
                    break;
                }
            }
        );
    }

    public register(): void {
        this.router.navigate(['auth/register']);
    }

}
