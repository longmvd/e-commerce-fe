import { ProductType } from '@/entities';
import { BaseApi } from '../base/base-api';

export class ProductTypeApi extends BaseApi<ProductType> {
  constructor() {
    super('');
    this.controller = 'productService/api/ProductTypes';
  }
}

export default new ProductTypeApi();
