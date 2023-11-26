export interface Cart {
  ID: number;

  UserID?: string;

  Items?: CartItem[];
}

export interface CartItem {
  ID?: number;

  ProductID?: number;

  ProductItemID?: number;

  Quantity?: number;

  CartID?: number;

  IsActive?: boolean;
  [key: string]: any;
}
