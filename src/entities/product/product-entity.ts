import { BaseEntity } from "..";

export interface Product extends BaseEntity {
  ProductName: string;
  ImageUrl?: string;
  Description?: string;
  Price: number;
  FreeShipping?: boolean;
  Promotion?: string;
  TradePrice?: number;
  Discount?: number;
  BrandName?: string;
  Star?: number;
}

export interface Category extends BaseEntity {
    CategoryName: string;
}

export interface Brand extends BaseEntity {
    BrandName: string;
}
