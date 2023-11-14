import { handleError } from '@/composable/http/use-response';
import { PagingRequest } from '@/entities/paging/paging-request';
import { AxiosError } from 'axios';
import api from './base-api-config';
('@/composable/http/use-response');

export class BaseApi<T> {
  controller: string = '';
  protected baseApi;

  constructor(controller: string) {
    this.controller = controller;
    this.baseApi = api;
  }

  async get(path: string) {
    try {
      return await this.baseApi.get(this.controller + path);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  }

  async post(path: string, payload: any) {
    try {
      return await this.baseApi.post(this.controller + path, payload);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  }

  async put(path: string, payload: T) {
    try {
      return await this.baseApi.put(this.controller + path, payload);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  }

  async patch(path: string, payload: T) {
    try {
      return await this.baseApi.patch(this.controller + path, payload);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  }

  async getPaging(pagingRequest: PagingRequest) {
    return await this.post('/Paging', pagingRequest);
  }

  async getById(id: string) {
    return this.get(`/${id}`);
  }
}

export default new BaseApi('');
