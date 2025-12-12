<script setup lang="ts">
  import type { ExampleItem, CreateExampleDto, UpdateExampleDto } from '#shared/schemas';

  /**
   * Props for the form dialog component
   */
  interface Props {
    modelValue: boolean;
    example?: ExampleItem | null;
    mode: 'create' | 'edit';
  }

  /**
   * Emits for the form dialog component
   */
  interface Emits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'submit', data: CreateExampleDto | UpdateExampleDto): void;
    (e: 'cancel'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    example: null,
  });

  const emit = defineEmits<Emits>();

  // Form state
  const formData = reactive({
    name: '',
    description: '',
  });

  // Form validation
  const formErrors = reactive({
    name: '',
    description: '',
  });

  // Reset form to initial state
  const resetForm = () => {
    formData.name = '';
    formData.description = '';
    clearErrors();
  };

  // Clear form errors
  const clearErrors = () => {
    formErrors.name = '';
    formErrors.description = '';
  };

  // Dialog state
  const isDialogOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  });

  // Initialize form data when example changes
  watch(
    () => props.example,
    newExample => {
      if (newExample && props.mode === 'edit') {
        formData.name = newExample.name || '';
        formData.description = newExample.description || '';
      } else {
        resetForm();
      }
    },
    { immediate: true }
  );

  // Validate form
  const validateForm = (): boolean => {
    clearErrors();
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = '示例名称不能为空';
      isValid = false;
    } else if (formData.name.length > 100) {
      formErrors.name = '示例名称不能超过100个字符';
      isValid = false;
    }

    if (formData.description && formData.description.length > 255) {
      formErrors.description = '描述不能超过255个字符';
      isValid = false;
    }

    return isValid;
  };

  // Handle form submit
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
    };

    emit('submit', submitData);
  };

  // Handle cancel
  const handleCancel = () => {
    emit('cancel');
    resetForm();
  };

  // Computed properties for UI
  const dialogTitle = computed(() => {
    return props.mode === 'create' ? '创建示例' : '编辑示例';
  });

  const submitButtonText = computed(() => {
    return props.mode === 'create' ? '创建' : '更新';
  });
</script>

<template>
  <UModal
    v-model:open="isDialogOpen"
    :ui="{
      width: 'sm:max-w-2xl', // 2xl = 672px, 接近 Ant Design 推荐的 800px
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
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Name Field -->
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                示例名称 <span class="text-red-500 dark:text-red-400 ml-1">*</span>
              </label>
              <UInput
                id="name"
                v-model="formData.name"
                placeholder="请输入示例名称"
                size="lg"
                :color="formErrors.name ? 'error' : undefined"
                class="w-full"
                @input="clearErrors" />
              <div v-if="formErrors.name" class="flex items-center space-x-1 text-red-600 dark:text-red-400">
                <UIcon name="i-heroicons-exclamation-circle-16-solid" class="w-4 h-4" />
                <p class="text-sm">{{ formErrors.name }}</p>
              </div>
            </div>

            <!-- Description Field -->
            <div class="space-y-2">
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> 描述 </label>
              <UTextarea
                id="description"
                v-model="formData.description"
                placeholder="请输入示例描述（可选）"
                size="lg"
                :color="formErrors.description ? 'error' : undefined"
                :rows="4"
                class="w-full resize-none"
                @input="clearErrors" />
              <div class="flex items-center justify-between">
                <div v-if="formErrors.description" class="flex items-center space-x-1 text-red-600 dark:text-red-400">
                  <UIcon name="i-heroicons-exclamation-circle-16-solid" class="w-4 h-4" />
                  <p class="text-sm">{{ formErrors.description }}</p>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formData.description?.length || 0 }}/255 字符</p>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <UButton variant="outline" size="md" class="min-w-24 justify-center" @click="handleCancel">
                取消
              </UButton>
              <UButton type="submit" color="primary" size="md" class="min-w-24 justify-center">
                {{ submitButtonText }}
              </UButton>
            </div>
          </form>
        </div>
      </UCard>
    </template>
  </UModal>
</template>
