import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const BASE_CONFIG: AxiosRequestConfig = {
  headers: {
    'Authorization': 'Basic $TOKEN',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

interface Response<T = any> {
  data?: T;
  status: number;
}

@Injectable()
export class HttpService {

  constructor() { }

  public get config(): object {
    let config = {...BASE_CONFIG};
    let token = localStorage.getItem('authToken') || 'NONE';
    config.headers.Authorization = config.headers.Authorization.replace('$TOKEN', token);
    return config;
  }

  public get<T = any>(target: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        let response: AxiosResponse<Response<T>> = await axios.get(target, config ? config : this.config);
        if (!this.validateStatusCode(response.data.status)) {
          reject(response.data);
        }

        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public post<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<Response<T>> = await axios.post(target, data, config ? config : this.config);
        if (!this.validateStatusCode(response.data.status)) {
          reject(response.data);
        }

        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public put<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<Response<T>> = await axios.put(target, data, config ? config : this.config);
        if (!this.validateStatusCode(response.data.status)) {
          reject(response.data);
        }

        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public delete<T = any>(target: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<Response<T>> = await axios.delete(target, config ? config : this.config);
        if (!this.validateStatusCode(response.data.status)) {
          reject(response.data);
        }

        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public patch<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<Response<T>> = await axios.patch(target, data, config ? config : this.config);
        if (!this.validateStatusCode(response.data.status)) {
          reject(response.data);
        }

        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public validateStatusCode(code: number): boolean {
    return !(code > 399);
  }
}
