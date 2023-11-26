import { ProductVersion } from '@/entities';
import { ModelState } from '@/enums/model-state';
import { BaseApi } from '../base/base-api';

export class ProductVersionApi extends BaseApi<ProductVersion> {
  constructor() {
    super('');
    this.controller = 'productService/api/ProductVersions';
  }
  deleteItem(productVersion: { ID: number | string }) {
    let sendItem = {
      ID: productVersion.ID,
      State: ModelState.Delete,
    };
    return this.post('', sendItem);
  }
}

export default new ProductVersionApi();
