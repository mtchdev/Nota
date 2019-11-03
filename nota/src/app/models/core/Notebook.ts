import { Model } from '../Model';

export class Notebook extends Model {

    public title: string;
    public color: string;
    public content: string;
    public tasks: Array<string>;

    constructor(props: Notebook | object) {
        super(props);
    }
}
