import { ModelState } from '@/enums/model-state';
import { OrderDetail } from './order-detail';

export class OrderItemEntity implements OrderDetail {
  constructor(entity: OrderItemEntity) {
    this.OrderID = entity.OrderID;
    this.ProductID = entity.ProductID;
    this.ProductItemID = entity.ProductItemID;
    this.Price = entity.Price;
    this.Quantity = entity.Quantity;
    this.ProductName = entity.ProductName;
    this.Name = `${this.ProductName} - ${this.VersionName}`;
  }

  Name: string;

  ProductName?: string;

  VersionName?: string;

  ThumbnailImageName?: string;

  OrderID: number = 0;

  ProductItemID: number;

  ProductVersionID?: number;

  ProductID: number;

  Quantity: number = 0;

  Unit?: string;

  Price: number = 0;

  Discount?: number;

  State?: ModelState | undefined;
}
