import { match } from 'path-to-regexp';

export interface RoutePermission {
  pattern: string;
  public?: boolean;
  roles?: string[];
  description?: string;
}

export const routePermissions: RoutePermission[] = [
  // 公开路由
  {
    pattern: '/api/auth/*splat',
    public: true,
    description: '认证相关接口，包括登录、注册、会话管理等',
  },
  {
    pattern: '/api/examples/*splat',
    description: '示例相关接口',
  },
];

// 预编译匹配器以提高性能
export const compiledMatchers = routePermissions.map(permission => ({
  permission,
  matcher: match(permission.pattern, { decode: decodeURIComponent }),
}));

export type RoutePermissionType = RoutePermission;
