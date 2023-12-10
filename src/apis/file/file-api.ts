import { BaseApi } from '../base/base-api';

export class FileApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'fileService/api/Images';
  }

  getContentURL(imageName: string) {
    return `${this.baseApi.getUri()}${this.controller}?filename=${imageName}`;
  }
}

export default new FileApi();
