import { type PagingRequest } from '@/entities/paging/paging-request';
import { TablePaginationConfig } from 'ant-design-vue';

export function generateGUID() {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

class Pagination implements PagingRequest {
  Columns?: string | undefined;
  CustomFilter?: string | undefined;
  Desc?: boolean | undefined;
  Filter?: string | undefined;
  PageIndex?: number | undefined;
  PageSize?: number | undefined;
  QuickSearch?:
    | { SearchValue?: string | undefined; Columns?: string | undefined }
    | undefined;
  Sort?: string | undefined;
  UseSp?: boolean | undefined;
}

function isPagingRequest(pagingRequest: any): pagingRequest is PagingRequest {
  return Object.keys(new Pagination()).some((key) => key in pagingRequest);
}

export function convertPagination(
  pagingRequest: PagingRequest,
  total?: number
): TablePaginationConfig;
export function convertPagination(
  pagingRequest: TablePaginationConfig,
  total?: number
): PagingRequest;
export function convertPagination(pagingRequest: any, total?: number): any {
  if (isPagingRequest(pagingRequest)) {
    let ans = {
      pageSize: pagingRequest.PageSize,
      current: pagingRequest.PageIndex,
      total: total,
    } as TablePaginationConfig;
    return ans;
  } else {
    let ans = {
      PageSize: pagingRequest.pageSize,
      PageIndex: pagingRequest.current,
    } as PagingRequest;
    return ans;
  }
}
