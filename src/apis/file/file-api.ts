import { handleError } from '@/composable/http/use-response';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseApi } from '../base/base-api';

export class FileApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'fileService/api/Files';
  }
  getUploadOneUrl() {
    return `${this.baseApi.getUri()}${this.controller}/UploadFile`;
  }

  getUploadMultipleUrl() {
    return `${this.getUploadOneUrl()}s`;
  }

  async uploadFile(file: any) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await this.baseApi.post(
        this.controller + '/UploadFile',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data;' },
        }
      );
    } catch (err) {
      return handleError(err as AxiosError);
    }
  }

  async deleteFiles(fileNames: string[], config: AxiosRequestConfig = {}) {
    return this.deleteList(fileNames, config);
  }
}

export default new FileApi();
