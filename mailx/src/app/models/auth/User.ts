export class Model {
    constructor(props?: any) {
        for (let key in props) {
            this[key] = props[key];
        }
    }
}

export class User extends Model {
    public username: string;
    public email: string;

    constructor(user: any) {
        super(user);
    }
}
