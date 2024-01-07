import { BaseEntity } from '..';

export interface Product extends BaseEntity {
  ProductName?: string;
  ImageUrl?: string;
  Description?: string;
  Price?: number;
  FreeShipping?: boolean;
  Promotion?: string;
  TradePrice?: number;
  Discount?: number;
  BrandName?: string;
  BrandID?: number;
  TypeID?: number;
  ProductImages?: ProductImage[];
  ProductVersions?: ProductVersion[];
  Star?: number;
}

export interface Category extends BaseEntity {
  CategoryName: string;
}

export interface Brand extends BaseEntity {
  BrandName: string;
}

export interface ProductImage extends BaseEntity {
  Name: string;
}

export interface ProductVersion extends BaseEntity {
  VersionName: string;

  Price: number;

  ThumbnailImageName: string;

  TechnicalContent: string;

  TechnicalContentParse?: TechnicalContentItem[];

  ProductStatus?: number;

  ReleaseYear: number;

  Quantity: number;

  ProductID: number;

  GroupName: string;

  SortOrder: number;

  OrderQuantity?: number;
}

export interface TechnicalContentItem {
  FieldName: string;
  Caption: string;
  Value: string;
}

export interface ProductType {
  ID?: number;
  TypeName?: string;
}
