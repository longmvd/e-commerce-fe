import { handleError } from '@/composable/http/use-response';
import { BaseEntity } from '@/entities';
import { PagingRequest } from '@/entities/paging/paging-request';
import { ModelState } from '@/enums/model-state';
import { AxiosError } from 'axios';
import api from './base-api-config';
('@/composable/http/use-response');

export class BaseApi<T = BaseEntity> {
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

  async save(record: T) {
    (record as BaseEntity).State = ModelState.Insert;
    return await this.post(this.controller, record);
  }

  async delete(record: T) {
    (record as BaseEntity).State = ModelState.Delete;
    return await this.post('', record);
  }
}

export default new BaseApi('');
