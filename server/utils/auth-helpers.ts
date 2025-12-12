/**
 * Authentication helper functions
 * Provides centralized user authentication logic to reduce code duplication
 */

/**
 * Get the current authenticated user from the event context
 * @param event - The H3 event object
 * @returns The authenticated user object
 * @throws {H3Error} If user is not authenticated
 */
export function getCurrentUser(event: H3Event) {
  const user = event.context.session?.user;
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: '未授权访问',
    });
  }
  return user;
}

/**
 * Check if user has permission to access a specific resource
 * @param resource - The resource object with user_id field
 * @param currentUser - The current authenticated user
 * @throws {H3Error} If user doesn't have permission
 */
export function checkResourcePermission(resource: { user_id: string }, currentUser: { id: string }) {
  if (resource.user_id !== currentUser.id) {
    throw createError({
      statusCode: 403,
      statusMessage: '无权访问此资源',
    });
  }
}
