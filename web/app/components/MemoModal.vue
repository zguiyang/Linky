<template>
  <u-modal
    v-model:open="isOpen"
    :title="props.mode === 'add' ? '新建备忘录' : '编辑备忘录'"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <div>
          <u-input
            v-model="formData.title"
            placeholder="输入标题（必填）"
            size="lg"
            :class="{ 'border-red-500': errors.title }"
          />
          <p
            v-if="errors.title"
            class="text-sm text-red-500 mt-1"
          >
            {{ errors.title }}
          </p>
        </div>

        <div>
          <u-textarea
            v-model="formData.content"
            placeholder="输入内容（必填）"
            size="lg"
            :rows="6"
            :class="{ 'border-red-500': errors.content }"
          />
          <p
            v-if="errors.content"
            class="text-sm text-red-500 mt-1"
          >
            {{ errors.content }}
          </p>
        </div>

        <div>
          <u-checkbox
            v-model="formData.isPinned"
            label="置顶备忘录"
            color="primary"
          />
        </div>

        <div>
          <u-select
            v-model="formData.tagIds"
            :items="tagSelectItems"
            placeholder="选择标签"
            multiple
            size="lg"
            :ui="{ placeholder: 'text-gray-400' }"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
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
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { tagsApi } from '~/api/tags'
import type { Tag, Memo, CreateMemoRequest, UpdateMemoRequest } from '~/api/types'

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

const tags = ref<Tag[]>([])

const loadTags = async () => {
  try {
    const data = await tagsApi.index()
    tags.value = data
  } catch (error) {
    console.error('Failed to load tags:', error)
    tags.value = []
  }
}

onMounted(() => {
  loadTags()
})

const isOpen = computed({
  get: () => {
    console.log('[MemoModal] isOpen.get, props.modelValue:', props.modelValue)
    return props.modelValue
  },
  set: (value) => {
    console.log('[MemoModal] isOpen.set, value:', value)
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

const tagSelectItems = computed(() => {
  if (!tags.value) return []
  return tags.value.map(tag => ({
    label: tag.name,
    value: tag.id
  }))
})

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
