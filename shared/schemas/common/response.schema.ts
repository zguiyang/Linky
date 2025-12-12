import { z } from 'zod/v4';
import { PaginationDefaults, SortDirection } from '#shared/constants';

/**
 * 分页请求 Schema
 */
export const paginatedRequestSchema = z.object({
  page: z.coerce.number().int().min(1).positive().default(PaginationDefaults.PAGE).describe('页码'),
  pageSize: z.coerce.number().int().min(1).positive().default(PaginationDefaults.PAGE_SIZE).describe('分页大小'),
  orderBy: z.string().default(PaginationDefaults.DEFAULT_ORDER_BY).describe('排序字段'),
  direction: z.enum([SortDirection.ASC, SortDirection.DESC]).default(PaginationDefaults.DIRECTION).describe('排序方向'),
});

/**
 * 分页响应 Schema
 */
export function createPaginatedResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    content: z.array(itemSchema).describe('分页数据'),
    total: z.number().int().min(0).describe('总条数'),
    page: z.number().int().min(1).positive().describe('当前页码'),
    pageSize: z.number().int().min(1).positive().describe('分页大小'),
    pages: z.number().int().min(0).describe('总页数'),
  });
}

export type PaginatedRequest = z.infer<typeof paginatedRequestSchema>;
