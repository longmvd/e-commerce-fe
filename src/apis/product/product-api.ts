import { Product, ProductType } from '@/entities';
import { BaseApi } from '../base/base-api';

export class ProductApi extends BaseApi<Product> {
  constructor() {
    super('');
    this.controller = 'productService/api/Products';
  }
  getProductCatalog(productTypes: ProductType[]) {
    return this.post('/catalog', productTypes);
  }
}

export default new ProductApi();
