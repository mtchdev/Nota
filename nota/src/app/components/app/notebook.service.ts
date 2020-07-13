import { Injectable } from '@angular/core';
import { HttpService, APIResponse } from '../../providers/http.service';
import { Notebook } from 'models/core/Notebook';
import { API } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class NotebookService {

    constructor(private http: HttpService) { }

    public createNotebook(notebook: Notebook): Observable<APIResponse<Notebook>> {
        return this.http.post<Notebook>(API.format('app/notebook'), notebook);
    }

    public getAllNotebooks(): Observable<APIResponse<Notebook[]>> {
        return this.http.get<Notebook[]>(API.format('app/notebook'));
    }

}
