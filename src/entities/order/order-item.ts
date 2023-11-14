import { OrderDetail } from './order-detail';

export class OrderItemEntity implements OrderDetail {
  constructor(entity: OrderItemEntity) {
    this.OrderID = entity.OrderID;
    this.ProductID = entity.ProductID;
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

  ProductID: number = 0;

  Quantity: number = 0;

  Unit?: string;

  Price: number = 0;
}
