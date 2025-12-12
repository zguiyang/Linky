import { ErrorMessages } from '#shared/constants';

import { auth } from '../lib/auth';
import { RouteMatcher } from '../utils/route-matcher';

/**
 * 认证中间件
 * 基于路由配置验证用户权限，并将用户信息添加到请求上下文中
 */
export default defineEventHandler(async event => {
  // 只对 API 路由进行处理
  const url = event.node.req.url;

  if (!url || !url.startsWith('/api/')) {
    return;
  }

  const requiresAuth = RouteMatcher.requiresAuth(url);

  if (!requiresAuth) {
    // 公开路由，直接放行
    return;
  }

  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      // 未认证且需要认证的接口，抛出错误
      throw createError({
        statusCode: 401,
        statusMessage: 'UNAUTHORIZED',
        message: ErrorMessages.UNAUTHORIZED,
      });
    }

    // 检查角色权限
    const requiredRoles = RouteMatcher.getRequiredRoles(url);
    if (requiredRoles.length > 0) {
      const userRoles = (session.user as any)?.roles || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

      if (!hasRequiredRole) {
        throw createError({
          statusCode: 403,
          statusMessage: 'FORBIDDEN',
          message: 'Insufficient permissions',
        });
      }
    }

    // 将完整的 session 信息添加到 event.context.session
    event.context.session = session;
  } catch (error) {
    // 如果是已知的错误，直接抛出
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }

    // 其他错误情况
    throw createError({
      statusCode: 401,
      statusMessage: 'UNAUTHORIZED',
      message: ErrorMessages.UNAUTHORIZED,
    });
  }
});
