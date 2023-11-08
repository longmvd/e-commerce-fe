import { PagingRequest } from '@/entities/paging/paging-request';
import api from './base-api-config';

export class BaseApi<T> {
  controller: string = '';
  protected baseApi;

  constructor(controller: string) {
    this.controller = controller;
    this.baseApi = api;
  }

  get(path: string) {
    return this.baseApi.get(this.controller + path);
  }

  post(path: string, payload: any) {
    return this.baseApi.post(this.controller + path, payload);
  }

  put(path: string, payload: T) {
    return this.baseApi.put(this.controller + path, payload);
  }

  patch(path: string, payload: T) {
    return this.baseApi.patch(this.controller + path, payload);
  }

  getPaging(pagingRequest: PagingRequest) {
    return this.post('/Paging', pagingRequest);
  }

  getById(id: string) {
    return this.get(`/${id}`);
  }
}

export default new BaseApi('');
