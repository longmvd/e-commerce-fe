import { OrderDto } from '@/dto/order-dto/order-dto';
import { BaseApi } from '../base/base-api';

export class PurchaseApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'purchaseService/api/Purchases';
  }

  initPurchase(payload: any) {
    return this.post('/init', payload);
  }

  purchase(order: OrderDto) {
    return this.post('', order);
  }
}

export default new PurchaseApi();
