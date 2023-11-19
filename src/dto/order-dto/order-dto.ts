import { BaseEntity } from '@/entities';
import { OrderItemEntity } from '@/entities/order';
import { Payment, PaymentMethod } from '@/entities/payment/payment';
import { Shipment } from '@/entities/shipment/shipment';
import { OrderStatus } from '@/enums/order-enum';

export interface OrderDto extends BaseEntity {
  ID?: number;

  CustomerName: string;

  Email?: string;

  UserID?: string;

  Items?: OrderItemEntity[];

  Payment: Payment;

  PaymentMethods?: PaymentMethod[];

  Shipment: Shipment;

  Status?: OrderStatus;
}
