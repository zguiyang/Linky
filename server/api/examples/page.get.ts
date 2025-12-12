import { count, eq, and, ilike, desc } from 'drizzle-orm';
import { examplesTable } from '#shared/tables';
import { queryExamplePageDtoSchema } from '#shared/schemas';
import { getCurrentUser } from '../../utils/auth-helpers';

/**
 * Get paginated examples for the authenticated user
 * Supports pagination and search functionality
 */
export default defineEventHandler(async event => {
  const user = getCurrentUser(event);

  // Parse and validate query parameters
  const query = getQuery(event);
  const validatedQuery = queryExamplePageDtoSchema.parse(query);

  const { page, pageSize, name, description } = validatedQuery;
  const offset = (page - 1) * pageSize;

  const db = useDatabase();

  // Build where conditions
  const whereConditions = [eq(examplesTable.user_id, user.id)];

  // Add search conditions if provided
  if (name) {
    whereConditions.push(ilike(examplesTable.name, `%${name}%`));
  }

  if (description) {
    whereConditions.push(ilike(examplesTable.description, `%${description}%`));
  }

  // Get total count with filters
  const totalCount = await db
    .select({ count: count() })
    .from(examplesTable)
    .where(whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0]);

  const total = totalCount[0]?.count || 0;

  // Get paginated data with filters
  const items = await db
    .select()
    .from(examplesTable)
    .where(whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0])
    .orderBy(desc(examplesTable.created_at))
    .limit(pageSize)
    .offset(offset);

  // Return paginated response
  return {
    content: items,
    total,
    page,
    pageSize,
    pages: Math.ceil(total / pageSize) || 0,
  };
});
