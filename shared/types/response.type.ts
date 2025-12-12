import type { SortDirectionType } from '#shared/constants';

/**
 * 分页数据类型定义
 */
export type PaginatedData<T> = {
  content: T[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
};

export type ErrorResponse = {
  error: boolean;
  message: string;
  url?: string;
  statusCode?: number;
  statusMessage?: string;
  stack?: any[];
};

/**
 * 分页查询参数类型
 */
export type PageQueryParams = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  direction?: SortDirectionType;
};
