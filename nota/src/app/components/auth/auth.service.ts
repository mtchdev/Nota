import { Injectable } from '@angular/core';
import { HttpService, APIResponse } from '../../providers/http.service';
import { User } from 'models/auth/User';
import { API } from 'app/app.constants';
import { Observable } from 'rxjs';

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable()
export class AuthService {

    private _user: User;
    private _token: string;

    constructor(private http: HttpService) { }

    public register(form: object): Observable<APIResponse<AuthResponse>> {
        return this.http.post<AuthResponse>(API.format('auth/register'), form);
    }

    public login(form: object): Observable<APIResponse<AuthResponse>> {
        return this.http.post<AuthResponse>(API.format('auth/login'), form);
    }

    public set token(token: string) {
        localStorage.setItem('authToken', token);
        this._token = token;
    }

    public set user(user: User) {
        this._user = user;
    }

    public get token(): string {
        return this._token;
    }

    public get user(): User {
        return this._user;
    }
}
