import { z } from 'zod/v4';

import { selectExampleSchema, insertExampleSchema, updateExampleSchema } from '#shared/tables';
import { createPaginatedResponseSchema, paginatedRequestSchema } from '#shared/schemas/common/response.schema';

export const exampleItemSchema = selectExampleSchema
  .extend({
    created_at: z.iso.datetime().describe('创建时间'),
    updated_at: z.iso.datetime().describe('更新时间'),
  })
  .meta({ description: '示例项' });

export const examplePageListResponseSchema = createPaginatedResponseSchema(exampleItemSchema);

// 创建示例 DTO
export const createExampleDtoSchema = insertExampleSchema
  .pick({
    name: true,
    description: true,
  })
  .meta({ description: '创建示例请求体' });

// 更新示例 DTO
export const updateExampleDtoSchema = updateExampleSchema
  .pick({ name: true, description: true })
  .meta({ description: '更新示例请求体' });

// 查询参数 DTO
export const queryExamplePageDtoSchema = paginatedRequestSchema
  .extend({
    name: z.string().optional().meta({ description: '按名称筛选' }),
    description: z.string().optional().meta({ description: '按描述筛选' }),
  })
  .meta({ description: '分页查询示例参数' });

// 类型定义
export type CreateExampleDto = z.infer<typeof createExampleDtoSchema>;
export type UpdateExampleDto = z.infer<typeof updateExampleDtoSchema>;
export type QueryExamplePageDto = z.infer<typeof queryExamplePageDtoSchema>;
export type ExampleItem = z.infer<typeof exampleItemSchema>;
export type ExamplePageListResponse = z.infer<typeof examplePageListResponseSchema>;
