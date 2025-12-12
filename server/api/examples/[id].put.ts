import { examplesTable } from '#shared/tables';
import { updateExampleDtoSchema } from '#shared/schemas';
import { eq } from 'drizzle-orm';
import { getCurrentUser, checkResourcePermission } from '../../utils/auth-helpers';

/**
 * Update a single example by ID
 * Updates the example if it belongs to the authenticated user
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

  // Read and validate request body
  const body = await readBody(event);
  const validatedData = updateExampleDtoSchema.parse(body);

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

  // Update the example
  const result = await db
    .update(examplesTable)
    .set({
      ...validatedData,
      updated_at: new Date(),
    })
    .where(eq(examplesTable.id, id))
    .returning();

  return result[0];
});
