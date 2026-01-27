<template>
  <div
    class="group relative border cursor-pointer transition-all duration-200"
    :class="cardClasses"
    @click="handleClick"
  >
    <div
      class="flex flex-col"
      :class="contentPaddingClass"
    >
      <div class="flex items-center justify-between gap-4 mb-1.5">
        <h3
          class="font-semibold text-default dark:text-default truncate"
          :class="titleClass"
        >
          {{ memo.title || '无标题备忘录' }}
        </h3>
      </div>

      <p
        class="text-sm text-muted dark:text-muted leading-relaxed mb-3"
        :class="contentClass"
      >
        {{ memo.content }}
      </p>

      <div class="flex flex-col gap-2">
        <span class="text-xs text-muted dark:text-muted">
          {{ formatDate(memo.updatedAt) }}
        </span>
        <div class="flex flex-wrap gap-1.5">
          <u-badge
            v-for="tag in displayTags"
            :key="tag"
            color="primary"
            variant="outline"
            size="md"
          >
            {{ tag }}
          </u-badge>
          <span
            v-if="displayTags.length === 0"
            class="text-xs text-muted"
          > 暂无标签 </span>
        </div>
      </div>
    </div>

    <div class="absolute top-3 right-3 z-10">
      <u-dropdown-menu
        :items="getMemoMenuItems(memo)"
        :content="{ align: 'end' }"
      >
        <u-button
          icon="i-heroicons-ellipsis-horizontal"
          color="neutral"
          variant="ghost"
          size="sm"
          class="opacity-0 group-hover:opacity-100 transition-opacity"
          @click.stop
        />
      </u-dropdown-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Memo } from '~/api/types'
import type { ViewMode } from '~/constants'

const props = defineProps<{
  memo: Memo
  viewMode?: ViewMode
}>()

const emit = defineEmits<{
  edit: [memo: Memo]
  delete: [memo: Memo]
}>()

const cardClasses = computed(() => {
  const isPinned = props.memo.isPinned
  const baseClasses = 'bg-default dark:bg-default border-default'

  if (isPinned) {
    switch (props.viewMode) {
      case 'masonry':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-4 hover:-translate-y-1 hover:shadow-md hover:bg-warning-100 dark:hover:bg-warning-900/50 hover:border-warning-300 dark:hover:border-warning-700 break-inside-avoid'
      case 'grid':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-4 hover:-translate-y-1 hover:shadow-md hover:bg-warning-100 dark:hover:bg-warning-900/50 hover:border-warning-300 dark:hover:border-warning-700'
      case 'list':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/50 hover:border-warning-300 dark:hover:border-warning-700'
      default:
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-4 hover:-translate-y-1 hover:shadow-md hover:bg-warning-100 dark:hover:bg-warning-900/50 hover:border-warning-300 dark:hover:border-warning-700'
    }
  }

  switch (props.viewMode) {
    case 'masonry':
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-muted/80 dark:hover:bg-muted/80 hover:border-default break-inside-avoid`
    case 'grid':
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-muted/80 dark:hover:bg-muted/80 hover:border-default`
    case 'list':
      return `${baseClasses} rounded-lg shadow-sm hover:bg-muted/80 dark:hover:bg-muted/80 hover:border-default p-4`
    default:
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-muted/80 dark:hover:bg-muted/80 hover:border-default`
  }
})

const contentPaddingClass = computed(() => {
  switch (props.viewMode) {
    case 'list':
      return 'py-3 pr-6'
    default:
      return 'pt-1 pr-6 pb-2'
  }
})

const titleClass = computed(() => {
  switch (props.viewMode) {
    case 'list':
      return 'text-base'
    default:
      return 'text-[17px]'
  }
})

const contentClass = computed(() => {
  switch (props.viewMode) {
    case 'list':
      return 'line-clamp-1 mb-2'
    default:
      return 'line-clamp-3'
  }
})

const displayTags = computed(() => {
  switch (props.viewMode) {
    case 'list':
      return props.memo.tags.slice(0, 2).map(tag => tag.name)
    default:
      return props.memo.tags.slice(0, 3).map(tag => tag.name)
  }
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

const getMemoMenuItems = (memo: Memo): DropdownMenuItem[][] => {
  return [
    [
      {
        label: '编辑',
        icon: 'i-heroicons-pencil',
        onSelect: () => {
          emit('edit', memo)
        }
      },
      {
        label: '删除',
        icon: 'i-heroicons-trash',
        color: 'error',
        onSelect: () => {
          emit('delete', memo)
        }
      }
    ]
  ]
}

const handleClick = () => {
  emit('edit', props.memo)
}
</script>
