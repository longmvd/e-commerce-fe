import { Brand } from '@/entities';
import { BaseApi } from '../base/base-api';

export class BrandApi extends BaseApi<Brand> {
  constructor() {
    super('');
    this.controller = 'productService/api/Brands';
  }
}

export default new BrandApi();
