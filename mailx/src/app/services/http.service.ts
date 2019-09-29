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

  public get<T = any>(target: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      const response: AxiosResponse<Response<T>> = await axios.get(target, config ? config : BASE_CONFIG);
      if (!this.validateStatusCode(response.data.status)) {
        reject(response.data);
      }

      resolve(response.data);
    });
  }

  public post<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      const response: AxiosResponse<Response<T>> = await axios.post(target, data, config ? config : BASE_CONFIG);
      if (!this.validateStatusCode(response.data.status)) {
        reject(response.data);
      }

      resolve(response.data);
    });
  }

  public put<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      const response: AxiosResponse<Response<T>> = await axios.put(target, data, config ? config : BASE_CONFIG);
      if (!this.validateStatusCode(response.data.status)) {
        reject(response.data);
      }

      resolve(response.data);
    });
  }

  public delete<T = any>(target: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      const response: AxiosResponse<Response<T>> = await axios.delete(target, config ? config : BASE_CONFIG);
      if (!this.validateStatusCode(response.data.status)) {
        reject(response.data);
      }

      resolve(response.data);
    });
  }

  public patch<T = any>(target: string, data: any = null, config?: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
      const response: AxiosResponse<Response<T>> = await axios.patch(target, config ? config : BASE_CONFIG);
      if (!this.validateStatusCode(response.data.status)) {
        reject(response.data);
      }

      resolve(response.data);
    });
  }

  public validateStatusCode(code: number): boolean {
    return !(code > 399);
  }
}
