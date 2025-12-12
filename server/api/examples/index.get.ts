import { examplesTable } from '#shared/tables';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '../../utils/auth-helpers';

/**
 * Get all examples for the authenticated user
 * Returns all examples belonging to the current user
 */
export default defineEventHandler(async event => {
  const user = getCurrentUser(event);
  const db = useDatabase();

  // Only return data for the current user
  return db.query.examplesTable.findMany({
    where: eq(examplesTable.user_id, user.id),
    orderBy: (examplesTable, { desc }) => desc(examplesTable.created_at),
  });
});
