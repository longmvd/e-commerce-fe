import { BaseEntity } from '..';

export interface OrderDetail extends BaseEntity {
  OrderID: number;

  ProductID: number;

  Quantity: number;

  Unit?: string;

  Price: number;
}
