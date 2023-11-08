export interface PagingRequest {
  PageSize?: number;
  PageIndex?: number;
  Filter?: string;
  CustomFilter?: string;
}

export interface ServiceResponse {
  Data: any;
}
