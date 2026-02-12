<template>
  <div
    class="group cursor-pointer transition-colors border rounded-xl overflow-hidden"
    :class="cardClasses"
    @click="$emit('click', bookmark)"
  >
    <!-- 图标区域 -->
    <div
      class="flex items-center justify-center shrink-0"
      :class="iconContainerClasses"
    >
      <img
        :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
        :alt="bookmark.title"
        class="object-contain"
        :class="iconClasses"
      >
    </div>

    <!-- 内容区域 -->
    <div
      class="relative z-10 flex flex-col flex-1"
      :class="contentClasses"
    >
      <div class="flex-1">
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

        <template v-else-if="viewMode === 'list'">
          <p
            class="text-sm"
            :class="descriptionClasses"
          >
            {{ bookmark.description }}
          </p>
        </template>

        <!-- 访问次数 -->
        <div
          class="flex items-center gap-1.5 text-sm"
          :class="visitCountClasses"
        >
          <u-icon
            name="i-heroicons-eye"
            class="size-4"
          />
          <span>{{ bookmark.visitCount }}次访问</span>
        </div>

        <template v-if="viewMode === 'list'">
          <div class="flex flex-wrap gap-2 mt-2">
            <u-badge
              v-for="tag in bookmark.tags"
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
        </template>

        <template v-else>
          <div class="flex flex-wrap gap-2 mt-2">
            <u-badge
              v-for="tag in bookmark.tags"
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
      </div>

      <!-- Footer 区域 - 只放操作按钮 -->
      <div class="flex justify-end mt-3">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bookmark } from '~/api/types'

const props = defineProps<{
  bookmark: Bookmark
  viewMode: 'masonry' | 'list'
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
      return 'bg-(--bg-surface) border-(--border-subtle) p-5 break-inside-avoid h-full'
    case 'list':
      return 'flex items-center gap-3 p-4 bg-(--bg-surface) border-(--border-subtle)'
    default:
      return ''
  }
})

const iconContainerClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'w-12 h-12 bg-(--bg-surface) rounded-xl'
    case 'list':
      return 'w-10 h-10 bg-(--bg-surface) rounded-lg'
    default:
      return ''
  }
})

const iconClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
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
    case 'list':
      return 'min-w-0'
    default:
      return ''
  }
})

const titleClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-(--text-primary) text-base line-clamp-2'
    case 'list':
      return 'text-(--text-primary) text-base truncate'
    default:
      return ''
  }
})

const descriptionClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-(--text-secondary) mt-2'
    case 'list':
      return 'text-(--text-secondary) mt-1'
    default:
      return ''
  }
})

const visitCountClasses = computed(() => {
  switch (props.viewMode) {
    case 'masonry':
      return 'text-(--text-secondary) mt-2'
    case 'list':
      return 'text-(--text-secondary) mt-2'
    default:
      return ''
  }
})

const navigateToTag = (tagId: number) => {
  navigateTo(`/workspace/tags/${tagId}`)
}
</script>
