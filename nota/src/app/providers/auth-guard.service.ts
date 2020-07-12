import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'app/components/auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public authService: AuthService, public router: Router) {

    }

    public canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return false;
        }

        return true;
    }
}