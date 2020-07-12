import { Injectable } from '@angular/core';
import { HttpService, APIResponse } from '../../providers/http.service';
import { User } from 'models/auth/User';
import { API } from 'app/app.constants';
import { Observable } from 'rxjs';
import { AppVariables } from 'app/app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable()
export class AuthService {

    private _user: User;
    private _token: string;
    private jwt: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpService) { }

    public register(form: object): Observable<APIResponse<AuthResponse>> {
        return this.http.post<AuthResponse>(API.format('auth/register'), form);
    }

    public login(form: object): Observable<APIResponse<AuthResponse>> {
        return this.http.post<AuthResponse>(API.format('auth/login'), form);
    }

    public refresh(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get<AuthResponse>(API.format('auth/refresh')).subscribe(
                data => {
                    localStorage.setItem(AppVariables.authTokenIdentifier, data.data.token);
                    this.user = data.data.user;
                    this.token = data.data.token;
                    resolve(data.data.token);
                },
                error => {
                    reject(error);
                }
            );
        })
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

    public init(data: AuthResponse): void {
        localStorage.setItem(AppVariables.authTokenIdentifier, data.token);
        this.user = data.user;
        this.token = data.token;
    }

    public isAuthenticated(): boolean {
        return !this.jwt.isTokenExpired(this.token);
    }
}
