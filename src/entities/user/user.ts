import { BaseEntity } from '..';
import { Cart } from '../cart/cart-entity';

export interface User extends BaseEntity {
  UserID: string;
  FullName?: string;
  Email?: string;
  Cart?: Cart;
  Roles?: string;
  [key: string]: any;
}
