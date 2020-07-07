import { Model } from '../Model';

export class Note extends Model {

    public title: string;
    public createdAt: number;
    public updatedAt: number;
    public ownerUsername: string;
    public tags: Array<string>;
    public content: string;

    constructor(props: Note | object) {
        super(props);
    }
}
