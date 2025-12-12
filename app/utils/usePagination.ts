import { reactive, ref } from 'vue';
import type { Ref, UnwrapNestedRefs } from 'vue';
import type { PaginatedData } from '#shared/types/response.type';

export interface UsePaginationOptions<T, P extends Record<string, any> = Record<string, any>> {
  /**
   * API 查询函数
   * @param params 查询参数
   * @returns 分页数据
   */
  queryFn: (params: P) => Promise<PaginatedData<T>>;
  /**
   * 初始查询参数
   */
  initialParams: P;
}

export interface UsePaginationReturn<T, P extends Record<string, any> = Record<string, any>> {
  /**
   * 分页数据
   */
  data: UnwrapNestedRefs<PaginatedData<T>>;
  /**
   * 加载状态
   */
  loading: Ref<boolean>;
  /**
   * 错误信息
   */
  error: Ref<string | null>;
  /**
   * 查询参数（可直接修改）
   */
  queryParams: UnwrapNestedRefs<P>;
  /**
   * 获取分页数据
   */
  getPageList: () => Promise<void>;
  /**
   * 查询操作
   */
  search: () => Promise<void>;
  /**
   * 页码变更处理函数
   * @param page 新页码
   */
  handlePageChange: (page: number) => Promise<void>;
  /**
   * 每页条数变更处理函数
   * @param pageSize 新每页条数
   */
  handlePageSizeChange: (pageSize: number) => Promise<void>;
  /**
   * 重置查询参数
   */
  reset: () => Promise<void>;
}

/**
 * 分页数据管理 Hook
 * @param options 配置选项
 * @returns 分页相关的响应式数据和方法
 */
const usePagination = <T, P extends Record<string, any> = Record<string, any>>(
  options: UsePaginationOptions<T, P>
): UsePaginationReturn<T, P> => {
  const { queryFn, initialParams } = options;

  // 分页数据
  const data = reactive<PaginatedData<T>>({
    content: [] as T[],
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 0,
  });

  // 查询参数（用户可直接修改）
  const queryParams = reactive<P>({ ...initialParams });

  // 加载状态
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * 执行查询
   */
  const getPageList = async () => {
    loading.value = true;
    error.value = null;

    try {
      const result = await queryFn(queryParams as P);

      // 更新分页数据
      Object.assign(data, result);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载数据失败';
      console.error('Failed to load paginated data:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 查询操作
   * **/

  const search = async () => {
    queryParams.page = 1;
    await getPageList();
  };

  /**
   * 重置查询参数
   */
  const reset = async () => {
    // 逐个属性重置，避免类型问题
    for (const key in initialParams) {
      (queryParams as any)[key] = (initialParams as any)[key];
    }
    await getPageList();
  };

  const handlePageChange = async (page: number) => {
    queryParams.page = page;
    await getPageList();
  };

  const handlePageSizeChange = async (pageSize: number) => {
    queryParams.pageSize = pageSize;
    queryParams.page = 1; // 重置到第一页
    await getPageList();
  };

  return {
    data,
    loading,
    error,
    queryParams,
    getPageList,
    search,
    reset,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePagination;
