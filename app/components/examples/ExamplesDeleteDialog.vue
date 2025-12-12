<script setup lang="ts">
  import type { ExampleItem } from '#shared/schemas';

  /**
   * 删除类型枚举
   */
  type DeleteType = 'single' | 'batch';

  /**
   * Props for the delete dialog component
   */
  interface Props {
    modelValue: boolean;
    example?: ExampleItem | null;
    deleteType?: DeleteType;
    batchCount?: number;
  }

  /**
   * Emits for the delete dialog component
   */
  interface Emits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm' | 'cancel'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    example: null,
    deleteType: 'single',
    batchCount: 0,
  });

  const emit = defineEmits<Emits>();

  // Dialog state
  const isDialogOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  });

  // Handle confirm delete
  const handleConfirm = () => {
    emit('confirm');
  };

  // Handle cancel
  const handleCancel = () => {
    emit('cancel');
  };

  // Computed properties for UI
  const dialogTitle = computed(() => {
    return props.deleteType === 'batch' ? '确认批量删除' : '确认删除';
  });

  const confirmButtonText = computed(() => {
    return props.deleteType === 'batch' ? '确认删除' : '确认删除';
  });

  const cancelButtonText = computed(() => {
    return '取消';
  });

  // Computed message based on delete type
  const deleteMessage = computed(() => {
    if (props.deleteType === 'batch') {
      return `您确定要删除选中的 <span class="font-semibold text-red-600 dark:text-red-400 mx-1">${props.batchCount}</span> 个示例吗？`;
    } else {
      return `您确定要删除示例 <span class="font-semibold text-gray-900 dark:text-gray-100 mx-1">"${props.example?.name || ''}"</span> 吗？`;
    }
  });

  // Computed details section
  const showDetailsSection = computed(() => {
    return props.deleteType === 'single' && props.example?.description;
  });

  // Computed selection details section
  const showSelectionDetails = computed(() => {
    return props.deleteType === 'batch' && props.batchCount > 0;
  });
</script>

<template>
  <UModal
    v-model:open="isDialogOpen"
    :ui="{
      width: 'sm:max-w-md', // md = 448px, 适合简单的确认对话框
      container: 'items-center',
      padding: 'p-0',
    }">
    <template #content>
      <UCard class="w-full">
        <template #header>
          <div class="flex items-center justify-between px-6 py-4">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
              {{ dialogTitle }}
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              size="md"
              icon="i-heroicons-x-mark-20-solid"
              @click="handleCancel" />
          </div>
        </template>

        <div class="px-6 pb-6">
          <div class="space-y-6">
            <!-- Warning Icon and Message -->
            <div class="text-center space-y-4">
              <!-- Warning Icon -->
              <div class="flex justify-center">
                <div
                  class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-50 dark:bg-red-900/20">
                  <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>

              <!-- Warning Message -->
              <div class="space-y-3">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {{ deleteType === 'batch' ? '确认批量删除' : '确认删除示例' }}
                </h3>
                <div class="space-y-2">
                  <p class="text-gray-600 dark:text-gray-400" v-html="deleteMessage"></p>
                  <p class="text-sm text-red-600 dark:text-red-400">此操作无法撤销，请谨慎操作。</p>
                </div>
              </div>
            </div>

            <!-- Example Details (Single Delete) -->
            <div
              v-if="showDetailsSection"
              class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">示例详情</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 break-words">
                  {{ example?.description }}
                </p>
              </div>
            </div>

            <!-- Selection Details (Batch Delete) -->
            <div
              v-if="showSelectionDetails"
              class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-list-bullet-16-solid" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">已选择 {{ batchCount }} 个项目</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">点击确认后将永久删除这些示例</p>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/30 p-3 rounded-md">
              <p>
                <UIcon name="i-heroicons-information-circle-16-solid" class="inline mr-1" />
                删除后将无法恢复，请谨慎操作
              </p>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <UButton variant="outline" size="md" class="min-w-24 justify-center" @click="handleCancel">
                {{ cancelButtonText }}
              </UButton>
              <UButton color="error" size="md" class="min-w-28 justify-center" @click="handleConfirm">
                {{ confirmButtonText }}
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </template>
  </UModal>
</template>
