import { BaseEntity } from '..';

export interface User extends BaseEntity {
  UserID: string;
  FullName?: string;
}
