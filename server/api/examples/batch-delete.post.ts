import { examplesTable } from '#shared/tables';
import { inArray } from 'drizzle-orm';
import { getCurrentUser } from '../../utils/auth-helpers';

/**
 * Batch delete examples
 * Deletes multiple examples if they belong to the authenticated user
 */
export default defineEventHandler(async event => {
  const user = getCurrentUser(event);

  // Read and validate request body
  const body = await readBody(event);
  const { ids } = body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '请提供要删除的示例ID列表',
    });
  }

  const db = useDatabase();

  // Check if all examples exist and belong to the user
  const existingExamples = await db.query.examplesTable.findMany({
    where: inArray(examplesTable.id, ids),
  });

  if (existingExamples.length !== ids.length) {
    throw createError({
      statusCode: 404,
      statusMessage: '部分示例不存在',
    });
  }

  // Check if all examples belong to the user
  const unauthorizedExamples = existingExamples.filter(example => example.user_id !== user.id);
  if (unauthorizedExamples.length > 0) {
    throw createError({
      statusCode: 403,
      statusMessage: '无权删除部分示例',
    });
  }

  // Delete examples
  const result = await db.delete(examplesTable).where(inArray(examplesTable.id, ids)).returning();

  return {
    deletedCount: result.length,
    deletedIds: result.map(item => item.id),
  };
});
