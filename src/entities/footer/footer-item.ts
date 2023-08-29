import { BaseEntity } from "..";

export interface FooterBox extends BaseEntity{
    Title?: string;
    BoxItem?: FooterBoxItem[];
    Order?: number;
    IsHorizontal?: boolean;
}

export interface FooterBoxItem extends BaseEntity{
    Title?: string;
    Url?: string;
    ImageUrl?: string;
}