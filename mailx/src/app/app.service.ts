import { Injectable } from '@angular/core';

interface AppState {
    [key: string]: any;
}

@Injectable()
export class AppService {
    private _state: AppState;

    constructor() {
        this._state = {};
    }

    get state(): object {
        return this._state = this._clone(this._state);
    }

    public get(prop?: any): object {
        let state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    public set(key: string, value: string): any {
        return this._state[key] = value;
    }

    public _clone(object: AppState): object {
        return JSON.parse(JSON.stringify(object));
    }
}
