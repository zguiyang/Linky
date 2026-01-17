<template>
  <div
    class="group relative border cursor-pointer transition-all duration-200"
    :class="cardClasses"
    @click="handleClick"
  >
    <div class="flex flex-col" :class="contentPaddingClass">
      <div class="flex items-center justify-between gap-4 mb-1.5">
        <h3 class="font-semibold text-gray-900 dark:text-white truncate" :class="titleClass">
          {{ memo.title || '无标题备忘录' }}
        </h3>
      </div>

      <p
        class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3"
        :class="contentClass"
      >
        {{ memo.content }}
      </p>

      <div class="flex flex-col gap-2">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ formatDate(memo.updatedAt) }}
        </span>
        <div class="flex flex-wrap gap-1.5">
          <u-badge
            v-for="tag in displayTags"
            :key="tag"
            color="primary"
            variant="outline"
            size="sm"
          >
            {{ tag }}
          </u-badge>
        </div>
      </div>
    </div>

    <div class="absolute top-3 right-3 z-10">
      <u-dropdown-menu :items="getMemoMenuItems(memo)" :content="{ align: 'end' }">
        <u-button
          icon="i-heroicons-ellipsis-horizontal"
          color="gray"
          variant="ghost"
          size="sm"
          class="opacity-0 group-hover:opacity-100 transition-opacity"
          @click.stop
        />
      </u-dropdown-menu>
    </div>

    <div class="absolute bottom-3 right-3 z-10">
      <u-button
        icon="i-heroicons-arrows-pointing-out"
        color="gray"
        variant="ghost"
        size="sm"
        class="opacity-0 group-hover:opacity-100 transition-opacity"
        @click.stop="openFullscreen(memo)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

interface Memo {
  id: number
  title: string
  content: string
  tags: string[]
  pinned: boolean
  updatedAt: string
}

const props = defineProps<{
  memo: Memo
  viewMode?: 'masonry' | 'grid' | 'list'
}>()

const emit = defineEmits<{
  select: [memo: Memo]
  openFullscreen: [memo: Memo]
}>()

const cardClasses = computed(() => {
  const isPinned = props.memo.pinned
  const baseClasses = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'

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
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 break-inside-avoid`
    case 'grid':
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600`
    case 'list':
      return `${baseClasses} rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 p-4`
    default:
      return `${baseClasses} rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600`
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
      return props.memo.tags.slice(0, 2)
    default:
      return props.memo.tags.slice(0, 3)
  }
})

const formatDate = (date: string) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const now = new Date()

  if (year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate()) {
    return '今天'
  } else if (
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    day === now.getDate() - 1
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
          emit('select', memo)
        },
      },
      {
        label: '删除',
        icon: 'i-heroicons-trash',
        color: 'error',
        onSelect: () => {
          emit('select', memo)
        },
      },
    ],
  ]
}

const handleClick = () => {
  emit('select', props.memo)
}

const openFullscreen = (memo: Memo) => {
  emit('openFullscreen', memo)
}
</script>
