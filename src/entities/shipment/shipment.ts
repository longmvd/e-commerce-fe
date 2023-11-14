import { BaseEntity } from '../base';

export interface Shipment extends BaseEntity {
  OrderID: number;
  CustomerName: string;
  City: string;
  District: string;
  PhoneNumber: string;
  TrackingNumber: number;
  ShipDate: Date;
  Address: string;
  Ward: string;
}
