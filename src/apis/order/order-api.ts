import { Order } from '@/entities/order';
import { BaseApi } from '../base/base-api';

export class OrderApi extends BaseApi<Order> {
  constructor() {
    super('');
    this.controller = 'orderService/api/Orders';
  }

  retrieveOrder(orderID: any) {
    return this.post('/order-info', orderID);
  }
}

export default new OrderApi();
