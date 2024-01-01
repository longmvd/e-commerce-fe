import { BaseApi } from '../base/base-api';

export class ImageApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'fileService/api/Images';
  }

  getContentURL(imageName: string) {
    return `${this.baseApi.getUri()}${this.controller}?filename=${imageName}`;
  }

  getImage(imageName: string) {
    return this.baseApi.get(this.getContentURL(imageName));
  }
}

export default new ImageApi();
