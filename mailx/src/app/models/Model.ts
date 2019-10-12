export class Model {

    constructor(props: object) {
        for (const key in props) {
            this[key] = props[key];
        }
    }

}
