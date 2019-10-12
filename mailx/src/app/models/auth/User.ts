import { Model } from '../Model';
export class User extends Model {
    public username: string;
    public email: string;

    constructor(user: User | object) {
        super(user);
    }

}
