export interface PagingRequest {
  PageSize?: number;
  PageIndex?: number;
  Filter?: string;
  CustomFilter?: string;
  Sort?: string;
  Desc?: boolean;
  Columns?: string;

  QuickSearch?: {
    SearchValue?: string;

    /**
     * list string split by ','
     */
    Columns?: string;
  };
  UseSp?: boolean;
}

export interface PagingSort {
  /**
   * column name
   */
  Selector?: string;
  Desc?: boolean;
}

export interface ServiceResponse {
  Data: any;
  validateResults: any;
  IsSuccess: boolean;
  ErrorCode: number;
  UserMessage: string;
  SystemMessage: 'User name or password is invalid';
  GetLastData: boolean;
  ServerTime: string;
}
