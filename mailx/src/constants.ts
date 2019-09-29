export abstract class API {
    public static PROTOCOL = 'http://';
    public static VERSION = 'v1';
    public static URL = `${API.PROTOCOL}127.0.0.1:5000/api/${API.VERSION}/`;

    public static format(path: string): string {
        return API.URL + path;
    }
}

export enum Metadata {
    Version = '0.0.1-pre',
    Name = 'MailX'
}
