import { OrderDto } from '@/dto/order-dto/order-dto';

export type PurchaseEvent = {
  onPurchase: OrderDto;
};
