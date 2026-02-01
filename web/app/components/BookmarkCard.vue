<template>
  <div
    class="group cursor-pointer transition-colors border rounded-xl overflow-hidden relative"
    :class="cardClasses"
    @click="$emit('click', bookmark)"
  >
    <div
      class="absolute top-3 right-3 z-20"
    >
      <u-dropdown-menu
        :items="menuItems"
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

    <div
      class="flex items-center justify-center flex-shrink-0"
      :class="iconContainerClasses"
    >
      <img
        :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
        :alt="bookmark.title"
        class="object-contain"
        :class="iconClasses"
      >
    </div>

    <div
      class="relative z-10"
      :class="contentClasses"
    >
      <h3
        class="font-semibold"
        :class="titleClasses"
      >
        {{ bookmark.title }}
      </h3>

      <template v-if="viewMode === 'masonry'">
        <p
          class="text-sm"
          :class="descriptionClasses"
        >
          {{ bookmark.description }}
        </p>
      </template>

      <template v-else-if="viewMode === 'grid'">
        <u-tooltip :text="bookmark.description ?? undefined">
          <p
            class="text-sm truncate"
            :class="descriptionClasses"
          >
            {{ bookmark.description }}
          </p>
        </u-tooltip>
      </template>

      <template v-else-if="viewMode === 'list'">
        <p
          class="text-sm"
          :class="descriptionClasses"
        >
          {{ bookmark.description }}
        </p>
      </template>

      <template v-if="viewMode === 'list'">
        <div class="flex items-center justify-between">
          <div
            class="flex flex-wrap gap-2"
            :class="tagsClasses"
          >
            <u-badge
              v-for="tag in bookmark.tags"
              :key="tag.id"
              color="primary"
              :variant="tag.isAiGenerated ? 'soft' : 'outline'"
              size="md"
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
          <div
            class="flex items-center gap-1.5 text-sm"
            :class="visitCountClasses"
          >
            <u-icon
              name="i-heroicons-eye"
              class="size-4"
            />
            <span>{{ bookmark.visit_count }}次访问</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="flex items-center gap-1.5 text-sm"
          :class="visitCountClasses"
        >
          <u-icon
            name="i-heroicons-eye"
            class="size-4"
          />
          <span>{{ bookmark.visit_count }}次访问</span>
        </div>
        <div
          class="flex flex-wrap gap-2"
          :class="tagsClasses"
        >
          <u-badge
            v-for="tag in bookmark.tags"
            :key="tag.id"
            color="primary"
            :variant="tag.isAiGenerated ? 'soft' : 'outline'"
            size="md"
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
      </template>

      <template v-if="bookmark.status === 'fetching'">
        <div class="flex items-center gap-2 text-sm mt-2">
          <u-icon
            name="i-heroicons-arrow-path"
            class="animate-spin"
          />
          <span>元数据获取中...</span>
        </div>
      </template>

      <template v-else-if="bookmark.metadata?.success === false">
        <div class="flex items-center gap-2 text-sm mt-2">
          <u-icon
            name="i-heroicons-exclamation-circle"
          />
          <span>获取失败</span>
          <u-button
            size="xs"
            variant="link"
            color="error"
            @click.stop="emit('refresh', bookmark)"
          >
            重试
          </u-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bookmark } from '~/api/types'

const props = defineProps<{
  bookmark: Bookmark
  viewMode: 'masonry' | 'grid' | 'list'
}>()

const emit = defineEmits<{
  click: [bookmark: Bookmark]
  edit: [bookmark: Bookmark]
  delete: [bookmark: Bookmark]
  refresh: [bookmark: Bookmark]
}>()

const menuItems = computed(() => [
  [
    {
      label: '刷新',
      icon: 'i-heroicons-arrow-path',
      onSelect: () => emit('refresh', props.bookmark)
    },
    {
      label: '编辑',
      icon: 'i-heroicons-pencil',
      onSelect: () => emit('edit', props.bookmark)
    },
    {
      label: '删除',
      icon: 'i-heroicons-trash',
      color: 'error',
      onSelect: () => emit('delete', props.bookmark)
    }
  ]
])

const cardClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'bg-[var(--bg-surface)] border-[var(--border-subtle)] p-5 break-inside-avoid'
    case 'grid':
      return 'flex gap-4 p-5 bg-[var(--bg-surface)] border-[var(--border-subtle)]'
    case 'list':
      return 'flex items-center gap-3 p-4 bg-[var(--bg-surface)] border-[var(--border-subtle)]'
    default:
      return ''
  }
})

const iconContainerClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'w-12 h-12 mb-3 bg-[var(--bg-surface)] rounded-xl'
    case 'grid':
      return 'w-12 h-12 bg-[var(--bg-surface)] rounded-xl'
    case 'list':
      return 'w-10 h-10 bg-[var(--bg-surface)] rounded-lg'
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
      return 'text-[var(--text-primary)] text-base mb-2 line-clamp-2'
    case 'grid':
      return 'text-[var(--text-primary)] text-base mb-1.5 line-clamp-1'
    case 'list':
      return 'text-[var(--text-primary)] text-base mb-1 truncate'
    default:
      return ''
  }
})

const descriptionClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-[var(--text-secondary)] mb-3'
    case 'grid':
      return 'text-[var(--text-secondary)] mb-3'
    case 'list':
      return 'text-[var(--text-secondary)] mb-2'
    default:
      return ''
  }
})

const visitCountClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-[var(--text-secondary)] mb-3'
    case 'grid':
      return 'text-[var(--text-secondary)] mb-3'
    case 'list':
      return 'text-[var(--text-secondary)]'
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
