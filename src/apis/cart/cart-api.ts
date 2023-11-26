import { Cart, CartItem } from '@/entities/cart/cart-entity';
import { BaseApi } from '../base/base-api';

export class CartApi extends BaseApi<Cart> {
  constructor() {
    super('');
    this.controller = 'cartService/api/carts';
  }

  addToCart(cartItem: CartItem) {
    return this.post('/add-to-cart', cartItem);
  }

  getCartInfo() {
    return this.get('/cart-info');
  }
}

export default new CartApi();
