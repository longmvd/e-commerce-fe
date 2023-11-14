import { BaseApi } from '../base/base-api';

export class PurchaseApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'purchaseService/api/Purchases';
  }

  initPurchase(payload: any) {
    return this.post('/init', payload);
  }
}

export default new PurchaseApi();
