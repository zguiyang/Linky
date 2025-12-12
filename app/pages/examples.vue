<script setup lang="ts">
  import type { ExampleItem } from '#shared/schemas';
  import { queryExamplePage, createExample, updateExample, deleteExample, batchDeleteExamples } from '@/api/examples';
  import type { ExamplePageRequest } from '@/api/examples';
  import usePagination from '@/utils/usePagination';
  import { h, resolveComponent } from 'vue';
  import type { TableColumn } from '@nuxt/ui';

  // Page meta
  definePageMeta({
    title: '示例管理',
    description: '管理您的示例数据',
  });

  const {
    data: examples,
    loading,
    error,
    queryParams,
    search: handleSearch,
    getPageList: getExamples,
    handlePageChange,
  } = usePagination<ExampleItem, ExamplePageRequest>({
    queryFn: queryExamplePage,
    initialParams: {
      page: 1,
      pageSize: 10,
      name: '',
      description: '',
    },
  });

  // Dialog state
  const showFormDialog = ref(false);
  const showDeleteDialog = ref(false);
  const selectedExample = ref<ExampleItem | null>(null);
  const formMode = ref<'create' | 'edit'>('create');
  const deleteType = ref<'single' | 'batch'>('single');

  // Table selection state
  const tableRef = ref();

  // Resolve components for table
  const UCheckbox = resolveComponent('UCheckbox');
  const UButton = resolveComponent('UButton');
  const UIcon = resolveComponent('UIcon');

  // Table columns definition
  const columns: TableColumn<ExampleItem>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        h(UCheckbox, {
          modelValue: table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
          'aria-label': '全选',
        }),
      cell: ({ row }) =>
        h(UCheckbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
          'aria-label': '选择行',
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: '名称',
      cell: ({ row }) => h('span', { class: 'font-medium' }, row.getValue('name')),
    },
    {
      accessorKey: 'description',
      header: '描述',
      cell: ({ row }) => h('span', { class: 'text-gray-600 dark:text-gray-400' }, row.getValue('description') || '-'),
    },
    {
      accessorKey: 'created_at',
      header: '创建时间',
      cell: ({ row }) =>
        h(
          'span',
          { class: 'text-gray-600 dark:text-gray-400' },
          new Date(row.getValue('created_at')).toLocaleDateString()
        ),
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) =>
        h('div', { class: 'flex gap-3' }, [
          h(
            UButton,
            {
              size: 'md',
              variant: 'outline',
              onClick: () => handleEditExample(row.original),
            },
            () => '编辑'
          ),
          h(
            UButton,
            {
              size: 'md',
              color: 'error',
              variant: 'outline',
              onClick: () => handleDeleteExample(row.original),
            },
            () => '删除'
          ),
        ]),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Computed properties
  const selectedCount = computed(() => {
    return tableRef.value?.tableApi?.getSelectedRowModel().rows.length || 0;
  });

  const hasSelection = computed(() => selectedCount.value > 0);

  // Handle create example
  const handleCreateExample = () => {
    selectedExample.value = null;
    formMode.value = 'create';
    showFormDialog.value = true;
  };

  // Handle edit example
  const handleEditExample = (example: ExampleItem) => {
    selectedExample.value = example;
    formMode.value = 'edit';
    showFormDialog.value = true;
  };

  // Handle delete example
  const handleDeleteExample = (example: ExampleItem) => {
    selectedExample.value = example;
    showDeleteDialog.value = true;
  };

  // Handle batch delete
  const handleBatchDelete = () => {
    if (selectedCount.value === 0) return;
    selectedExample.value = null; // Clear any selected example
    deleteType.value = 'batch';
    showDeleteDialog.value = true;
  };

  // Handle form submit
  const handleFormSubmit = async (data: any) => {
    try {
      if (formMode.value === 'create') {
        await createExample(data);
      } else if (formMode.value === 'edit' && selectedExample.value) {
        await updateExample(selectedExample.value.id, data);
      }

      showFormDialog.value = false;
      await getExamples(); // Refresh the list
    } catch (err) {
      error.value = err instanceof Error ? err.message : '操作失败';
      console.error('Failed to save example:', err);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      if (deleteType.value === 'single' && selectedExample.value) {
        // Single delete
        await deleteExample(selectedExample.value.id);
      } else if (deleteType.value === 'batch' && tableRef.value) {
        // Batch delete
        const selectedRows = tableRef.value.tableApi?.getSelectedRowModel().rows || [];
        const selectedIds = selectedRows.map(row => row.original.id);

        if (selectedIds.length === 0) return;

        await batchDeleteExamples(selectedIds);

        // Clear table selection properly
        tableRef.value.tableApi?.resetRowSelection();
      }

      showDeleteDialog.value = false;
      await getExamples(); // Refresh the list
    } catch (err) {
      const errorMessage = deleteType.value === 'batch' ? '批量删除失败' : '删除失败';
      error.value = err instanceof Error ? err.message : errorMessage;
      console.error(`Failed to ${deleteType.value} delete examples:`, err);
    }
  };

  // Load data on mount
  onMounted(() => {
    getExamples();
  });
</script>

<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">示例管理</h1>
      <p class="text-gray-600 dark:text-gray-400">管理您的示例数据</p>
    </div>

    <!-- Error Alert -->
    <UAlert
      v-if="error"
      color="error"
      variant="solid"
      class="mb-6"
      :title="error"
      :close-button="{ onClick: () => (error = null) }" />

    <!-- Search and Actions -->
    <UCard class="mb-6">
      <div class="flex flex-col gap-4">
        <!-- Search Row -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 w-full">
            <UInput
              v-model="queryParams.name"
              placeholder="搜索示例名称..."
              icon="i-heroicons-magnifying-glass-20-solid"
              @keyup.enter="handleSearch" />
          </div>
          <div class="flex-1 w-full">
            <UInput
              v-model="queryParams.description"
              placeholder="搜索描述..."
              icon="i-heroicons-magnifying-glass-20-solid"
              @keyup.enter="handleSearch" />
          </div>
          <div class="flex gap-3 sm:ml-4">
            <UButton :loading="loading" size="md" @click="handleSearch">
              <UIcon name="i-heroicons-magnifying-glass-20-solid" class="mr-1" />
              搜索
            </UButton>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <UButton color="primary" size="md" @click="handleCreateExample">
              <UIcon name="i-heroicons-plus-20-solid" class="mr-1" />
              新建示例
            </UButton>

            <!-- Batch Delete Button -->
            <UButton v-if="hasSelection" color="error" variant="outline" size="md" @click="handleBatchDelete">
              <UIcon name="i-heroicons-trash-20-solid" class="mr-1" />
              批量删除 ({{ selectedCount }})
            </UButton>
          </div>

          <div class="text-sm text-gray-600 dark:text-gray-400">共 {{ examples.total }} 条记录</div>
        </div>
      </div>
    </UCard>

    <!-- Examples Table -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">示例列表</h2>
        </div>
      </template>

      <!-- Use <ClientOnly> to prevent hydration mismatch -->
      <ClientOnly>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-8">
          <UIcon
            name="i-heroicons-arrow-path-20-solid"
            class="animate-spin text-4xl text-gray-400 dark:text-gray-500" />
        </div>

        <!-- Empty State -->
        <div v-else-if="examples.content.length === 0" class="text-center py-8">
          <UIcon name="i-heroicons-inbox-20-solid" class="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
          <p class="text-gray-500 dark:text-gray-400 mb-4">暂无示例数据</p>
          <UButton color="primary" size="md" @click="handleCreateExample"> 创建第一个示例 </UButton>
        </div>

        <!-- Data Table -->
        <div v-else>
          <UTable ref="tableRef" :data="examples.content" :columns="columns" :loading="loading" class="w-full" />

          <!-- Pagination -->
          <div class="flex justify-center mt-6">
            <UPagination
              v-model="queryParams.page"
              :page-count="examples.pageSize"
              :total="examples.total"
              @update:model-value="handlePageChange" />
          </div>
        </div>
      </ClientOnly>
    </UCard>

    <!-- Form Dialog -->
    <ExamplesFormDialog
      v-model="showFormDialog"
      :example="selectedExample"
      :mode="formMode"
      @submit="handleFormSubmit"
      @cancel="showFormDialog = false" />

    <!-- Delete Confirmation Dialog (Unified for Single and Batch) -->
    <ExamplesDeleteDialog
      v-model="showDeleteDialog"
      :example="selectedExample"
      :delete-type="deleteType"
      :batch-count="selectedCount"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteDialog = false" />
  </div>
</template>
