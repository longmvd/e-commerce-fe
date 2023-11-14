import { OrderItemEntity } from '@/entities/order';
import { Payment, PaymentMethod } from '@/entities/payment/payment';
import { Shipment } from '@/entities/shipment/shipment';

export interface OrderDto {
  ID?: number;

  CustomerName: string;

  Email?: string;

  UserID?: string;

  Items?: OrderItemEntity[];

  Payment: Payment;

  PaymentMethods?: PaymentMethod[];

  Shipment: Shipment;
}
