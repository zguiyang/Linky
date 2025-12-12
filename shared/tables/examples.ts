import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

import { users } from './auth';

export const examplesTable = pgTable('examples', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const insertExampleSchema = createInsertSchema(examplesTable, {
  id: z.string().describe('示例ID'),
  user_id: z.string().describe('关联用户ID'),
  name: z
    .string({
      error: 'Example name is required',
    })
    .min(1, {
      error: 'Example name cannot be empty',
    })
    .max(100, {
      error: 'Example name cannot exceed 100 characters',
    })
    .describe('示例名称, 不能超过100个字符'),
  description: z.string().optional().describe('示例描述, 不能超过255个字符'),
});

export const selectExampleSchema = createSelectSchema(examplesTable, {
  id: z.string().describe('示例ID'),
  user_id: z.string().describe('关联用户ID'),
  name: z
    .string({
      error: 'Example name is required',
    })
    .min(1, {
      error: 'Example name cannot be empty',
    })
    .max(255, {
      error: 'Example name cannot exceed 255 characters',
    })
    .describe('示例名称, 不能超过100个字符'),
  description: z.string().optional().describe('示例描述, 不能超过255个字符'),
});

export const updateExampleSchema = createUpdateSchema(examplesTable, {
  name: z
    .string()
    .min(1, {
      error: 'Example name cannot be empty',
    })
    .max(255, {
      error: 'Example name cannot exceed 255 characters',
    })
    .optional()
    .describe('示例名称'),
  description: z.string().optional().describe('示例描述'),
});

export type InsertExampleDto = z.infer<typeof insertExampleSchema>;
export type SelectExampleDto = z.infer<typeof selectExampleSchema>;
export type UpdateExampleDto = z.infer<typeof updateExampleSchema>;
