<template>
  <u-modal
    v-model:open="isOpen"
    title="编辑备忘录内容"
    :ui="{ content: 'max-w-[80vw] h-[70vh]' }"
  >
    <template #body>
      <div class="memo-editor-container">
        <u-editor
          ref="editorRef"
          v-model="formData.content"
          :content-type="'html'"
          :placeholder="{ placeholder: '输入你的灵感，输入 / 查看可用命令...' }"
          class="w-full h-full"
        >
          <template #default="{ editor }">
            <u-editor-toolbar
              :editor="editor"
              :items="toolbarItems"
              layout="fixed"
            />
            <u-editor-suggestion-menu
              :editor="editor"
              :items="suggestionItems"
            />
          </template>
        </u-editor>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
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
import type { EditorSuggestionMenuItem, EditorToolbarItem } from '@nuxt/ui'
import type { Memo, UpdateMemoRequest } from '~/api/types'

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

const editorRef = ref()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const formData = ref<{
  content: string
}>({
  content: ''
})

const isSubmitting = ref(false)

const toolbarItems: EditorToolbarItem[][] = [
  [{
    icon: 'i-lucide-heading',
    tooltip: { text: '标题' },
    content: {
      align: 'start'
    },
    items: [{
      kind: 'heading',
      level: 1,
      icon: 'i-lucide-heading-1',
      label: '标题 1'
    }, {
      kind: 'heading',
      level: 2,
      icon: 'i-lucide-heading-2',
      label: '标题 2'
    }, {
      kind: 'heading',
      level: 3,
      icon: 'i-lucide-heading-3',
      label: '标题 3'
    }]
  }],
  [{
    kind: 'mark',
    mark: 'bold',
    icon: 'i-lucide-bold',
    tooltip: { text: '加粗' }
  }, {
    kind: 'mark',
    mark: 'italic',
    icon: 'i-lucide-italic',
    tooltip: { text: '斜体' }
  }, {
    kind: 'mark',
    mark: 'underline',
    icon: 'i-lucide-underline',
    tooltip: { text: '下划线' }
  }, {
    kind: 'mark',
    mark: 'strike',
    icon: 'i-lucide-strikethrough',
    tooltip: { text: '删除线' }
  }, {
    kind: 'mark',
    mark: 'code',
    icon: 'i-lucide-code',
    tooltip: { text: '行内代码' }
  }],
  [{
    kind: 'bulletList',
    icon: 'i-lucide-list',
    tooltip: { text: '无序列表' }
  }, {
    kind: 'orderedList',
    icon: 'i-lucide-list-ordered',
    tooltip: { text: '有序列表' }
  }],
  [{
    kind: 'blockquote',
    icon: 'i-lucide-text-quote',
    tooltip: { text: '引用' }
  }, {
    kind: 'codeBlock',
    icon: 'i-lucide-square-code',
    tooltip: { text: '代码块' }
  }],
  [{
    kind: 'horizontalRule',
    icon: 'i-lucide-separator-horizontal',
    tooltip: { text: '分隔线' }
  }],
  [{
    kind: 'undo',
    icon: 'i-lucide-rotate-ccw',
    tooltip: { text: '撤销' }
  }, {
    kind: 'redo',
    icon: 'i-lucide-rotate-cw',
    tooltip: { text: '重做' }
  }]
]

const suggestionItems: EditorSuggestionMenuItem[][] = [
  [{
    type: 'label',
    label: '文本'
  }, {
    kind: 'paragraph',
    label: '普通段落',
    icon: 'i-lucide-type'
  }, {
    kind: 'heading',
    level: 1,
    label: '标题 1',
    icon: 'i-lucide-heading-1'
  }, {
    kind: 'heading',
    level: 2,
    label: '标题 2',
    icon: 'i-lucide-heading-2'
  }, {
    kind: 'heading',
    level: 3,
    label: '标题 3',
    icon: 'i-lucide-heading-3'
  }],
  [{
    type: 'label',
    label: '列表'
  }, {
    kind: 'bulletList',
    label: '无序列表',
    icon: 'i-lucide-list'
  }, {
    kind: 'orderedList',
    label: '有序列表',
    icon: 'i-lucide-list-ordered'
  }],
  [{
    type: 'label',
    label: '插入'
  }, {
    kind: 'blockquote',
    label: '引用',
    icon: 'i-lucide-text-quote'
  }, {
    kind: 'codeBlock',
    label: '代码块',
    icon: 'i-lucide-square-code'
  }, {
    kind: 'horizontalRule',
    label: '分隔线',
    icon: 'i-lucide-separator-horizontal'
  }]
]

const loadMemoData = (memo: Memo) => {
  formData.value = {
    content: memo.content || ''
  }
}

const handleSubmit = () => {
  isSubmitting.value = true

  const data: UpdateMemoRequest = {
    content: formData.value.content
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

<style scoped>
.memo-editor-modal :deep(.u-modal-body) {
  padding: 0;
}

.memo-editor-container {
  display: flex;
  flex-direction: column;
  margin: -1rem;
}

.memo-editor-container :deep(.u-editor) {
  display: flex;
  flex-direction: column;
}

.memo-editor-container :deep(.u-editor-content) {
  flex: 1;
  overflow-y: auto;
}
</style>
