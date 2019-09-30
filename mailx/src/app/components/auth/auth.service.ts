import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { User } from '../../models/auth/User';
import { API } from '../../../constants';

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable()
export class AuthService {

    private _user: User;
    private _token: string;

    constructor(private http: HttpService) { }

    public register(form: RegisterForm): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.post<AuthResponse>(API.format('auth/register'), form).then(res => {
                if (res.data.user) {
                    let user = new User(res.data.user);

                    // Since register is calling login on the backend, we're already authenticated:
                    this.token = res.data.token;
                    this.user = user;
                    resolve(user);
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    public set token(token: string) {
        localStorage.setItem('authToken', token);
        this._token = token;
    }

    public set user(user: User) {
        this._user = user;
    }

    public get user(): User {
        return this._user;
    }
}