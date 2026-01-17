<template>
  <div
    class="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
    :class="cardClasses"
    @click="$emit('click', bookmark)"
  >
    <div class="absolute top-3 right-3 z-10">
      <u-dropdown-menu :items="menuItems" :content="{ align: 'end' }">
        <u-button
          icon="i-heroicons-ellipsis-horizontal"
          color="neutral"
          variant="ghost"
          size="sm"
          @click.stop
        />
      </u-dropdown-menu>
    </div>

    <div
      class="flex items-center justify-center flex-shrink-0 bg-white dark:bg-gray-700 rounded-xl overflow-hidden"
      :class="iconContainerClasses"
    >
      <img
        :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
        :alt="bookmark.title"
        class="object-contain relative z-10"
        :class="iconClasses"
      />
      <div
        class="absolute inset-0 bg-[radial(circle,var(--color-primary-10),rgba(0,0,0,0.7))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      ></div>
    </div>

    <div class="relative z-10" :class="contentClasses">
      <h3 class="font-semibold text-gray-900 dark:text-white" :class="titleClasses">
        {{ bookmark.title }}
      </h3>

      <template v-if="viewMode === 'masonry'">
        <p class="text-base text-gray-500 dark:text-gray-400" :class="descriptionClasses">
          {{ bookmark.description }}
        </p>
      </template>

      <template v-else-if="viewMode === 'grid'">
        <u-tooltip :text="bookmark.description">
          <p
            class="text-base text-gray-500 dark:text-gray-400 truncate"
            :class="descriptionClasses"
          >
            {{ bookmark.description }}
          </p>
        </u-tooltip>
      </template>

      <template v-else-if="viewMode === 'list'">
        <p class="text-sm text-gray-500 dark:text-gray-400" :class="descriptionClasses">
          {{ bookmark.description }}
        </p>
      </template>

      <template v-if="viewMode === 'list'">
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-2" :class="tagsClasses">
            <u-badge
              v-for="tag in bookmark.tags"
              :key="tag"
              color="primary"
              variant="outline"
              size="md"
            >
              {{ tag }}
            </u-badge>
          </div>
          <div
            class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
            :class="visitCountClasses"
          >
            <u-icon name="i-heroicons-eye" class="size-4" />
            <span>{{ bookmark.visitCount }}次访问</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
          :class="visitCountClasses"
        >
          <u-icon name="i-heroicons-eye" class="size-4" />
          <span>{{ bookmark.visitCount }}次访问</span>
        </div>
        <div class="flex flex-wrap gap-2" :class="tagsClasses">
          <u-badge
            v-for="tag in bookmark.tags"
            :key="tag"
            color="primary"
            variant="outline"
            size="md"
          >
            {{ tag }}
          </u-badge>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

interface Bookmark {
  id: number
  title: string
  url: string
  description: string
  category: string
  tags: string[]
  visitCount: number
  createdAt: string
}

const props = defineProps<{
  bookmark: Bookmark
  viewMode: 'masonry' | 'grid' | 'list'
}>()

defineEmits<{
  click: [bookmark: Bookmark]
}>()

const menuItems: DropdownMenuItem[][] = [
  [
    {
      label: '编辑',
      icon: 'i-heroicons-pencil',
      onSelect: () => {
        console.log('Mock: 编辑书签', props.bookmark)
      },
    },
    {
      label: '删除',
      icon: 'i-heroicons-trash',
      color: 'error',
      onSelect: () => {
        console.log('Mock: 删除书签', props.bookmark)
      },
    },
  ],
]

const cardClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl break-inside-avoid'
    case 'grid':
      return 'flex gap-4 p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--color-primary-10)] before:to-[var(--color-primary-10)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600'
    case 'list':
      return 'flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl'
    default:
      return ''
  }
})

const iconContainerClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'relative w-12 h-12 mb-3'
    case 'grid':
      return 'relative w-12 h-12'
    case 'list':
      return 'w-10 h-10 rounded-lg'
    default:
      return ''
  }
})

const iconClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'w-6 h-6'
    case 'grid':
      return 'w-6 h-6'
    case 'list':
      return 'w-5 h-5'
    default:
      return ''
  }
})

const contentClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return ''
    case 'grid':
      return 'flex-1 min-w-0'
    case 'list':
      return 'flex-1 min-w-0'
    default:
      return ''
  }
})

const titleClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-base mb-2 line-clamp-2'
    case 'grid':
      return 'text-base mb-1.5 line-clamp-1'
    case 'list':
      return 'text-base mb-1 truncate'
    default:
      return ''
  }
})

const descriptionClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'mb-3'
    case 'grid':
      return 'mb-3'
    case 'list':
      return 'mb-2'
    default:
      return ''
  }
})

const visitCountClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'mb-3'
    case 'grid':
      return 'mb-3'
    case 'list':
      return ''
    default:
      return ''
  }
})

const tagsClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return ''
    case 'grid':
      return ''
    case 'list':
      return ''
    default:
      return ''
  }
})
</script>
