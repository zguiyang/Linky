<template>
  <div
    class="group relative border rounded-xl overflow-hidden transition-all duration-200"
    :class="cardClasses"
  >
    <template v-if="isEditing">
      <div class="p-4">
        <div class="memo-editor">
          <u-editor
            ref="editorRef"
            v-model="localContent"
            :content-type="'html'"
            :placeholder="{ placeholder: '在这里输入你的灵感...' }"
            class="min-h-[150px] max-h-[400px]"
          />
        </div>

        <div class="flex justify-center gap-2 mt-4 pt-3 border-t border-[var(--border-subtle)]">
          <u-button
            color="neutral"
            variant="ghost"
            label="取消"
            @click="handleCancel"
          />
          <u-button
            color="primary"
            label="保存"
            :loading="isSaving"
            @click="handleSave"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="flex flex-col"
        :class="contentPaddingClass"
      >
        <div class="flex items-center justify-between gap-4 mb-1.5">
          <div class="flex items-center gap-2 min-w-0">
            <u-icon
              v-if="memo.isPinned"
              name="i-heroicons-bookmark"
              class="text-warning shrink-0"
            />
            <h3
              class="font-semibold truncate"
              :class="titleClass"
            >
              {{ memo.title || '无标题备忘录' }}
            </h3>
          </div>
        </div>

        <div
          class="text-sm leading-relaxed mb-3"
          :class="contentClass"
        >
          <u-editor
            v-if="memo.content"
            :model-value="memo.content"
            :content-type="'html'"
            :editable="false"
            class="prose prose-sm max-w-none"
          />
          <div
            v-else
            class="text-[var(--text-tertiary)]"
          >
            ✏️ 点击编辑内容...
          </div>
        </div>

        <div
          v-if="memo.tags.length > 0"
          class="flex flex-wrap gap-1.5 mb-3"
        >
          <u-badge
            v-for="tag in memo.tags"
            :key="tag.id"
            color="primary"
            :variant="tag.isAiGenerated ? 'soft' : 'outline'"
            size="md"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click.stop="navigateToTag(tag.id)"
          >
            <span
              v-if="tag.isAiGenerated"
              class="flex items-center gap-1"
            >
              <u-icon
                name="i-heroicons-sparkles"
                class="size-3"
              />
            </span>
            {{ tag.name }}
          </u-badge>
        </div>

        <div class="flex items-center justify-between gap-4 mt-auto pt-2">
          <span
            class="text-xs"
            :class="dateClass"
          >
            {{ formatDate(memo.updatedAt || memo.createdAt) }}
          </span>

          <u-dropdown-menu
            :items="getMemoMenuItems(memo)"
            :content="{ align: 'end' }"
          >
            <u-button
              icon="i-heroicons-ellipsis-horizontal"
              color="neutral"
              variant="ghost"
              size="sm"
              @click.stop
            />
          </u-dropdown-menu>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Memo } from '~/api/types'
import type { ViewMode } from '~/constants'

const props = withDefaults(defineProps<{
  memo: Memo
  viewMode?: ViewMode
  isEditing?: boolean
}>(), {
  viewMode: 'masonry',
  isEditing: false
})

const emit = defineEmits<{
  edit: [memo: Memo]
  delete: [memo: Memo]
  openEditor: [memo: Memo]
  saveNewContent: [content: string]
  saveContent: [id: number, content: string]
  startContentEdit: [memo: Memo]
  cancelContentEdit: []
}>()

const editorRef = ref()
const localContent = ref('')
const isSaving = ref(false)

watch(() => props.memo.content, (newContent) => {
  if (props.isEditing && newContent !== localContent.value) {
    localContent.value = newContent || ''
  }
}, { immediate: true })

watch(() => props.isEditing, (editing) => {
  if (editing) {
    localContent.value = props.memo.content || ''
    nextTick(() => {
      editorRef.value?.element?.focus()
    })
  }
})

const cardClasses = computed(() => {
  const isPinned = props.memo.isPinned

  if (isPinned) {
    switch (props.viewMode) {
      case 'masonry':
        return 'bg-[var(--bg-surface)] border border-warning-300 dark:border-warning-700 rounded-xl p-5 break-inside-avoid border-l-4 border-l-warning-500'
      case 'grid':
        return 'bg-[var(--bg-surface)] border border-warning-300 dark:border-warning-700 rounded-xl p-5 border-l-4 border-l-warning-500'
      case 'list':
        return 'bg-[var(--bg-surface)] border border-warning-300 dark:border-warning-700 rounded-lg p-4 border-l-4 border-l-warning-500'
      default:
        return 'bg-[var(--bg-surface)] border border-warning-300 dark:border-warning-700 rounded-xl p-5 break-inside-avoid border-l-4 border-l-warning-500'
    }
  }

  switch (props.viewMode) {
    case 'masonry':
      return 'bg-[var(--bg-surface)] border-[var(--border-subtle)] rounded-xl p-5 break-inside-avoid'
    case 'grid':
      return 'flex gap-4 p-5 bg-[var(--bg-surface)] border-[var(--border-subtle)] rounded-xl'
    case 'list':
      return 'flex items-center gap-3 p-4 bg-[var(--bg-surface)] border-[var(--border-subtle)] rounded-lg'
    default:
      return 'bg-[var(--bg-surface)] border-[var(--border-subtle)] rounded-xl p-5 break-inside-avoid'
  }
})

const contentPaddingClass = computed(() => {
  switch (props.viewMode) {
    case 'list':
      return 'flex-1 min-w-0 py-3 pr-6'
    default:
      return ''
  }
})

const titleClass = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-[var(--text-primary)] text-base mb-2 line-clamp-2'
    case 'grid':
      return 'text-[var(--text-primary)] text-base mb-1.5 line-clamp-1'
    case 'list':
      return 'text-[var(--text-primary)] text-base mb-1 truncate'
    default:
      return 'text-[var(--text-primary)] text-base mb-2 line-clamp-2'
  }
})

const contentClass = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-[var(--text-secondary)] mb-3'
    case 'grid':
      return 'text-[var(--text-secondary)] mb-3 line-clamp-2'
    case 'list':
      return 'text-[var(--text-secondary)] mb-2 line-clamp-1'
    default:
      return 'text-[var(--text-secondary)] mb-3'
  }
})

const dateClass = computed(() => {
  return 'text-[var(--text-secondary)]'
})

const formatDate = (date: string | null) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const now = new Date()

  if (year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate()) {
    return '今天'
  } else if (
    year === now.getFullYear()
    && month === now.getMonth() + 1
    && day === now.getDate() - 1
  ) {
    return '昨天'
  }

  return `${year}年${month}月${day}日`
}

const getMemoMenuItems = (_memo: Memo): DropdownMenuItem[][] => {
  return [
    [
      {
        label: '编辑信息',
        icon: 'i-heroicons-pencil',
        onSelect: () => {
          emit('edit', props.memo)
        }
      },
      {
        label: '打开编辑器',
        icon: 'i-heroicons-document-text',
        onSelect: () => {
          emit('openEditor', props.memo)
        }
      },
      {
        label: '删除',
        icon: 'i-heroicons-trash',
        color: 'error',
        onSelect: () => {
          emit('delete', props.memo)
        }
      }
    ]
  ]
}

const handleCancel = () => {
  localContent.value = props.memo.content || ''
  emit('cancelContentEdit')
}

const handleSave = () => {
  if (isSaving.value) return

  isSaving.value = true
  if (props.memo.id === 0 || props.memo.id === null) {
    emit('saveNewContent', localContent.value)
  } else {
    emit('saveContent', props.memo.id, localContent.value)
  }

  nextTick(() => {
    isSaving.value = false
  })
}

const navigateToTag = (tagId: number) => {
  navigateTo(`/workspace/tags/${tagId}`)
}
</script>
