<template>
  <div
    class="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
    :class="cardClasses"
    @click="$emit('click', bookmark)"
  >
    <div class="absolute top-3 right-3 z-10">
      <u-dropdown-menu
        :items="menuItems"
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

    <div
      class="flex items-center justify-center flex-shrink-0 bg-card dark:bg-card rounded-xl overflow-hidden"
      :class="iconContainerClasses"
    >
      <img
        :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
        :alt="bookmark.title"
        class="object-contain relative z-10"
        :class="iconClasses"
      >
      <div
        class="absolute inset-0 bg-[radial(circle,var(--color-primary-10),rgba(0,0,0,0.7))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>

    <div
      class="relative z-10"
      :class="contentClasses"
    >
      <h3
        class="font-semibold text-foreground dark:text-foreground"
        :class="titleClasses"
      >
        {{ bookmark.title }}
      </h3>

      <template v-if="viewMode === 'masonry'">
        <p
          class="text-base text-muted-foreground dark:text-muted-foreground"
          :class="descriptionClasses"
        >
          {{ bookmark.description }}
        </p>
      </template>

      <template v-else-if="viewMode === 'grid'">
        <u-tooltip :text="bookmark.description ?? undefined">
          <p
            class="text-base text-muted-foreground dark:text-muted-foreground truncate"
            :class="descriptionClasses"
          >
            {{ bookmark.description }}
          </p>
        </u-tooltip>
      </template>

      <template v-else-if="viewMode === 'list'">
        <p
          class="text-sm text-muted-foreground dark:text-muted-foreground"
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
              variant="outline"
              size="md"
            >
              {{ tag.name }}
            </u-badge>
          </div>
          <div
            class="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-muted-foreground"
            :class="visitCountClasses"
          >
            <u-icon
              name="i-heroicons-eye"
              class="size-4"
            />
            <span>{{ bookmark.visitCount }}次访问</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-muted-foreground"
          :class="visitCountClasses"
        >
          <u-icon
            name="i-heroicons-eye"
            class="size-4"
          />
          <span>{{ bookmark.visitCount }}次访问</span>
        </div>
        <div
          class="flex flex-wrap gap-2"
          :class="tagsClasses"
        >
          <u-badge
            v-for="tag in bookmark.tags"
            :key="tag.id"
            color="primary"
            variant="outline"
            size="md"
          >
            {{ tag.name }}
          </u-badge>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bookmark } from '~/api/types'
import type { ViewMode } from '~/constants'

const props = defineProps<{
  bookmark: Bookmark
  viewMode: ViewMode
}>()

const emit = defineEmits<{
  click: [bookmark: Bookmark]
  edit: [bookmark: Bookmark]
  delete: [bookmark: Bookmark]
}>()

const menuItems = [
  [
    {
      label: '编辑',
      icon: 'i-heroicons-pencil',
      onSelect: () => {
        emit('edit', props.bookmark)
      }
    },
    {
      label: '删除',
      icon: 'i-heroicons-trash',
      color: 'error',
      onSelect: () => {
        emit('delete', props.bookmark)
      }
    }
  ]
]

const cardClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'p-5 bg-secondary dark:bg-secondary border border-border rounded-2xl break-inside-avoid'
    case 'grid':
      return 'flex gap-4 p-5 bg-secondary dark:bg-secondary border border-border rounded-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--color-primary-10)] before:to-[var(--color-primary-10)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:bg-secondary/80 dark:hover:bg-secondary/80 hover:border-neutral-300 dark:hover:border-neutral-600'
    case 'list':
      return 'flex items-center gap-3 p-4 bg-secondary dark:bg-secondary border border-border rounded-xl'
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
