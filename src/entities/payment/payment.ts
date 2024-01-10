import { BaseEntity } from '../base';

export interface Payment extends BaseEntity {
  UserID: string;
  OrderID: number;
  PaymentMethodID: number;
  Status: number;
  PaymentMethod: PaymentMethod;
  Total?: number;
}

export interface PaymentMethod extends BaseEntity {
  Name: string;

  Uri?: string;
}
