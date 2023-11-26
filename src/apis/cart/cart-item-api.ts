import { CartItem } from '@/entities/cart/cart-entity';
import { BaseApi } from '../base/base-api';

export class CartItemApi extends BaseApi<CartItem> {
  constructor() {
    super('');
    this.controller = 'cartService/api/carts';
  }
}

export default new CartItemApi();
