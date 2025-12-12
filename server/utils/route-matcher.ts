import { compiledMatchers, type RoutePermission } from '../config/route-permissions';

/**
 * 路由匹配器 - 提供路由权限匹配功能
 */
export const RouteMatcher = {
  /**
   * 根据路径查找匹配的权限配置
   * @param path 请求路径
   * @returns 匹配的权限配置，如果没有匹配则返回 null
   */
  findPermission(path: string): RoutePermission | null {
    for (const { permission, matcher } of compiledMatchers) {
      // 使用 path-to-regexp 进行匹配
      const result = matcher(path);

      if (result) {
        return permission;
      }
    }

    return null;
  },

  /**
   * 检查路径是否为公开路由
   * @param path 请求路径
   * @returns 是否为公开路由
   */
  isPublicRoute(path: string): boolean {
    const permission = this.findPermission(path);
    return permission?.public === true;
  },

  /**
   * 检查路径是否需要认证
   * @param path 请求路径
   * @returns 是否需要认证
   */
  requiresAuth(path: string): boolean {
    const permission = this.findPermission(path);
    // 只有明确标记 public: true 的才是公开路由
    return !permission?.public;
  },

  /**
   * 获取路径需要的角色
   * @param path 请求路径
   * @returns 需要的角色数组
   */
  getRequiredRoles(path: string): string[] {
    const permission = this.findPermission(path);
    return permission?.roles || [];
  },

  /**
   * 检查用户是否有权限访问指定路径
   * @param path 请求路径
   * @param userRoles 用户角色数组
   * @returns 是否有权限
   */
  hasPermission(path: string, userRoles: string[] = []): boolean {
    const permission = this.findPermission(path);

    // 如果没有匹配到权限配置，默认需要认证
    if (!permission) return false;

    const index = compiledMatchers.findIndex(m => m.permission === permission);

    // 前两个是公开路由，直接允许
    if (index <= 1) {
      return true;
    }

    // 检查角色权限（管理员路由）
    if (permission.roles && permission.roles.length > 0) {
      return permission.roles.some(role => userRoles.includes(role));
    }

    // 其他路由通过认证即可访问
    return true;
  },
};
