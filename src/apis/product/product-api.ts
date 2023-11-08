import { Product } from '@/entities';
import { BaseApi } from '../base/base-api';

export class ProductApi extends BaseApi<Product> {
  constructor() {
    super('');
    this.controller = 'productService/api/Products';
  }
}

export default new ProductApi();
