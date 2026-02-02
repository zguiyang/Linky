<template>
  <u-modal
    v-model:open="isOpen"
    title="编辑备忘录信息"
  >
    <template #body>
      <u-form
        :state="formData"
        class="flex flex-col gap-4"
        @submit="handleSubmit"
      >
        <u-form-field
          label="标题"
          name="title"
        >
          <u-input
            v-model="formData.title"
            placeholder="自动提取或手动输入"
            size="lg"
            class="w-full"
          />
        </u-form-field>

        <u-form-field>
          <u-checkbox
            v-model="formData.isPinned"
            label="置顶备忘录"
            color="primary"
          />
        </u-form-field>

        <u-form-field label="标签">
          <u-select
            v-model="formData.tagIds"
            :items="tagSelectItems"
            placeholder="选择标签"
            multiple
            size="lg"
            class="w-full"
            :ui="{ placeholder: 'text-gray-400' }"
          />
        </u-form-field>
      </u-form>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <u-button
          color="neutral"
          variant="ghost"
          @click="handleCancel"
        >
          取消
        </u-button>
        <u-button
          color="primary"
          :loading="isSubmitting"
          @click="handleSubmit"
        >
          保存
        </u-button>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Memo, UpdateMemoRequest } from '~/api/types'
import { useTagsStore } from '~/stores/tags'

interface Props {
  modelValue: boolean
  memo: Memo | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: UpdateMemoRequest): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tagsStore = useTagsStore()
await tagsStore.fetchTags()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const formData = ref<{
  title: string
  isPinned: boolean
  tagIds: number[]
}>({
  title: '',
  isPinned: false,
  tagIds: []
})

const isSubmitting = ref(false)

const tagSelectItems = computed(() => tagsStore.tagSelectItems)

const loadMemoData = (memo: Memo) => {
  formData.value = {
    title: memo.title,
    isPinned: memo.isPinned,
    tagIds: memo.tags.map(tag => tag.id)
  }
}

const handleSubmit = () => {
  isSubmitting.value = true

  const data: UpdateMemoRequest = {
    title: formData.value.title || undefined,
    isPinned: formData.value.isPinned,
    tagIds: formData.value.tagIds
  }

  emit('save', data)
  isSubmitting.value = false
}

const handleCancel = () => {
  emit('close')
  isOpen.value = false
}

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.memo) {
    loadMemoData(props.memo)
  }
})
</script>
