import type { QueryExamplePageDto, ExampleItem, CreateExampleDto, UpdateExampleDto } from '#shared/schemas';
import type { PaginatedData } from '#shared/types/response.type';
import { request } from '@/lib/request';

export type ExamplePageRequest = Partial<QueryExamplePageDto>;

/**
 * Query examples with pagination and search
 * @param params - Query parameters including pagination and search filters
 * @returns Paginated list of examples
 */
export async function queryExamplePage(params: ExamplePageRequest) {
  return await request.get<PaginatedData<ExampleItem>>('/examples/page', params);
}

/**
 * Get a single example by ID
 * @param id - Example ID
 * @returns Single example
 */
export async function getExample(id: string) {
  return await request.get<ExampleItem>(`/examples/${id}`);
}

/**
 * Create a new example
 * @param data - Example data to create
 * @returns Created example
 */
export async function createExample(data: CreateExampleDto) {
  return await request.post<ExampleItem>('/examples', data);
}

/**
 * Update an existing example
 * @param id - Example ID
 * @param data - Example data to update
 * @returns Updated example
 */
export async function updateExample(id: string, data: UpdateExampleDto) {
  return await request.put<ExampleItem>(`/examples/${id}`, data);
}

/**
 * Delete an example
 * @param id - Example ID
 * @returns Deleted example
 */
export async function deleteExample(id: string) {
  return await request.delete<ExampleItem>(`/examples/${id}`);
}

/**
 * Batch delete examples
 * @param ids - Array of example IDs to delete
 * @returns Batch delete result
 */
export async function batchDeleteExamples(ids: string[]) {
  return await request.post<{ deletedCount: number; deletedIds: string[] }>('/examples/batch-delete', { ids });
}
