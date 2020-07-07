import { Model } from '../Model';
import { Note } from './Note';
export class Notebook extends Model {

    public title: string;
    public color: string;
    public notes: Array<Note>;

    constructor(props: Notebook | object) {
        super(props);
    }
}
