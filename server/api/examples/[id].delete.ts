import { examplesTable } from '#shared/tables';
import { eq } from 'drizzle-orm';
import { getCurrentUser, checkResourcePermission } from '../../utils/auth-helpers';

/**
 * Delete a single example by ID
 * Deletes the example if it belongs to the authenticated user
 */
export default defineEventHandler(async event => {
  const user = getCurrentUser(event);

  // Get example ID from route parameters
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少示例ID',
    });
  }

  const db = useDatabase();

  // First check if the example exists and belongs to the user
  const existingExample = await db.query.examplesTable.findFirst({
    where: eq(examplesTable.id, id),
  });

  if (!existingExample) {
    throw createError({
      statusCode: 404,
      statusMessage: '示例不存在',
    });
  }

  checkResourcePermission(existingExample, user);

  // Delete the example
  const result = await db.delete(examplesTable).where(eq(examplesTable.id, id)).returning();

  return result[0];
});
