import { ModelState } from '@/enums/model-state';

export interface BaseEntity {
  ID?: number | string;
  CreatedDate?: Date;
  ModifiedDate?: Date;
  CreatedBy?: Date;
  ModifiedBy?: Date;
  State?: ModelState;
}

export type ObjectType = {
  [key: string]: any;
};
