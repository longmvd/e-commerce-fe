import api from "./base-api-config";

export class BaseApi<T> {
  controller: string = "";
  protected baseApi;

  constructor(controller: string) {
    this.controller = controller;
    this.baseApi = api;
  }

  get(path: string) {
    return this.baseApi.get(this.controller + path);
  }

  post(path: string, payload: T) {
    return this.baseApi.post(this.controller + path, payload);
  }

  put(path: string, payload: T) {
    return this.baseApi.put(this.controller + path, payload);
  }

  patch(path: string, payload: T) {
    return this.baseApi.patch(this.controller + path, payload);
  }
}
