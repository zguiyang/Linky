<template>
  <u-modal
    v-model:open="isOpen"
    :title="props.mode === 'add' ? '新建备忘录' : '编辑备忘录'"
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
          required
        >
          <u-input
            v-model="formData.title"
            placeholder="输入标题"
            size="lg"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="内容"
          name="content"
          required
        >
          <u-textarea
            v-model="formData.content"
            placeholder="输入内容"
            size="lg"
            :rows="6"
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
          {{ props.mode === 'add' ? '创建' : '保存' }}
        </u-button>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Memo, CreateMemoRequest, UpdateMemoRequest } from '~/api/types'
import { useTagsStore } from '~/stores/tags'

interface Props {
  modelValue: boolean
  memo: Memo | null
  mode: 'add' | 'edit'
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: CreateMemoRequest | UpdateMemoRequest): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tagsStore = useTagsStore()
await tagsStore.fetchTags()

const isOpen = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const formData = ref<{
  id: number
  title: string
  content: string
  isPinned: boolean
  tagIds: number[]
}>({
  id: 0,
  title: '',
  content: '',
  isPinned: false,
  tagIds: []
})

const errors = ref<{
  title: string
  content: string
}>({
  title: '',
  content: ''
})

const isSubmitting = ref(false)

const tagSelectItems = computed(() => tagsStore.tagSelectItems)

const validate = (): boolean => {
  errors.value.title = ''
  errors.value.content = ''

  if (!formData.value.title || formData.value.title.trim().length === 0) {
    errors.value.title = '标题不能为空'
    return false
  }

  if (!formData.value.content || formData.value.content.trim().length === 0) {
    errors.value.content = '内容不能为空'
    return false
  }

  return true
}

const resetForm = () => {
  formData.value = {
    id: 0,
    title: '',
    content: '',
    isPinned: false,
    tagIds: []
  }
  errors.value = { title: '', content: '' }
}

const loadMemoData = (memo: Memo) => {
  formData.value = {
    id: memo.id,
    title: memo.title,
    content: memo.content,
    isPinned: memo.isPinned,
    tagIds: memo.tags.map(tag => tag.id)
  }
}

const handleSubmit = () => {
  if (!validate()) {
    return
  }

  isSubmitting.value = true

  const data = props.mode === 'add'
    ? {
        title: formData.value.title,
        content: formData.value.content,
        isPinned: formData.value.isPinned,
        tagIds: formData.value.tagIds
      }
    : {
        title: formData.value.title,
        content: formData.value.content,
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
  if (newVal) {
    if (props.mode === 'add') {
      resetForm()
    } else if (props.memo) {
      loadMemoData(props.memo)
    }
  }
})
</script>
