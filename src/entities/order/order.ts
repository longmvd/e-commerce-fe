import { OrderStatus } from '@/enums';
import { BaseEntity } from '..';
import { Payment } from '../payment/payment';

export interface Order extends BaseEntity {
  Status?: OrderStatus;
  Payment?: Payment;
}
