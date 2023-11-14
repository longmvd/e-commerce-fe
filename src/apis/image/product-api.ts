import { BaseApi } from '../base/base-api';

export class ImageApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'imageService/api/Images';
  }
}

export default new ImageApi();
