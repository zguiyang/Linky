<template>
  <div
    class="group relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
    :class="cardClasses"
    @click="handleClick"
  >
    <div
      class="flex flex-col"
      :class="contentPaddingClass"
    >
      <div class="flex items-center justify-between gap-4 mb-1.5">
        <h3
          class="font-semibold truncate"
          :class="titleClass"
        >
          {{ memo.title || '无标题备忘录' }}
        </h3>
      </div>

      <p
        class="text-sm leading-relaxed mb-3"
        :class="contentClass"
      >
        {{ memo.content }}
      </p>

      <div class="flex flex-col gap-2">
        <span
          class="text-xs"
          :class="dateClass"
        >
          {{ formatDate(memo.updatedAt) }}
        </span>
        <div class="flex flex-wrap gap-1.5">
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
          <span
            v-if="memo.tags.length === 0"
            class="text-xs text-[var(--text-secondary)]"
          >暂无标签</span>
        </div>
      </div>
    </div>

    <div
      class="absolute top-3 right-3 z-10"
    >
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

  if (isPinned) {
    switch (props.viewMode) {
      case 'masonry':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-5 break-inside-avoid'
      case 'grid':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-5'
      case 'list':
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-lg p-4'
      default:
        return 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 rounded-xl p-5 break-inside-avoid'
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

const navigateToTag = (tagId: number) => {
  navigateTo(`/workspace/tags/${tagId}`)
}
</script>
