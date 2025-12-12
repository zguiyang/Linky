import { createExampleDtoSchema } from '#shared/schemas';
import { examplesTable } from '#shared/tables';
import { getCurrentUser } from '../../utils/auth-helpers';

/**
 * Create a new example
 * Creates a new example record for the authenticated user
 */
export default defineEventHandler(async event => {
  const user = getCurrentUser(event);

  // Read and validate request body
  const body = await readBody(event);
  const validatedData = createExampleDtoSchema.parse(body);

  // Insert new example into database
  const db = useDatabase();
  const result = await db
    .insert(examplesTable)
    .values({
      ...validatedData,
      user_id: user.id,
    })
    .returning();

  return result[0];
});
