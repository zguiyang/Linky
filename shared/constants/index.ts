// 错误消息（实际使用的）
export const ErrorMessages = {
  UNAUTHORIZED: '未授权访问',
} as const;

export const SortDirection = {
  ASC: 'asc' as const,
  DESC: 'desc' as const,
};

// 分页常量（被类型和Schema使用）
export const Pagination = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_ORDER_BY: 'created_at',
  SORT_DIRECTION: SortDirection,
} as const;

export const PaginationDefaults = {
  PAGE: Pagination.DEFAULT_PAGE,
  PAGE_SIZE: Pagination.DEFAULT_PAGE_SIZE,
  DIRECTION: Pagination.SORT_DIRECTION.DESC,
  DEFAULT_ORDER_BY: Pagination.DEFAULT_ORDER_BY,
};

export type SortDirectionType = (typeof SortDirection)[keyof typeof SortDirection];
