import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppVariables } from 'app/app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface APIResponse<T> {
  data: T;
  status: number;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {

  }

  public get<T = any>(url: string): Observable<APIResponse<T>> {
    return this.http.get<APIResponse<T>>(url, this.createRequestOptions());
  }

  public post<T = any>(url: string, data: any = null): Observable<APIResponse<T>> {
    return this.http.post<APIResponse<T>>(url, data, this.createRequestOptions());
  }

  public put<T = any>(url: string, data: any = null): Observable<APIResponse<T>> {
    return this.http.put<APIResponse<T>>(url, data, this.createRequestOptions());
  }

  public delete<T = any>(url: string): Observable<APIResponse<T>> {
    return this.http.put<APIResponse<T>>(url, this.createRequestOptions());
  }

  createRequestOptions(): object {
    const headers = new HttpHeaders({
      'Content-Type': AppVariables.defaultContentTypeHeader,
      'Authorization': 'Bearer ' + localStorage.getItem(AppVariables.authTokenIdentifier) || 'none'
    });

    return {
      headers: headers
    };
  }
}
