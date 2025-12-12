import { examplesTable } from '#shared/tables';
import { eq } from 'drizzle-orm';
import { getCurrentUser, checkResourcePermission } from '../../utils/auth-helpers';

/**
 * Get a single example by ID
 * Returns the example if it belongs to the authenticated user
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

  // Find the example that belongs to the current user
  const example = await db.query.examplesTable.findFirst({
    where: eq(examplesTable.id, id),
  });

  // Check if example exists and belongs to the user
  if (!example) {
    throw createError({
      statusCode: 404,
      statusMessage: '示例不存在',
    });
  }

  checkResourcePermission(example, user);

  return example;
});
