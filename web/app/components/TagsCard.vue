<template>
  <u-card class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
        我的标签
      </h3>
      <u-button
        icon="i-heroicons-plus"
        size="sm"
        variant="ghost"
        color="neutral"
        @click="$emit('add-tag')"
      />
    </div>

    <client-only>
      <div class="p-4">
        <div
          v-if="loading"
          class="flex items-center justify-center py-8"
        >
          <u-icon
            name="i-heroicons-arrow-path"
            class="w-5 h-5 animate-spin text-gray-400"
          />
        </div>

        <div
          v-else-if="tags.length === 0"
          class="text-center py-8"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-12 h-12 text-gray-300 dark:text-gray-600"
          />
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            暂无标签
          </p>
        </div>

        <div
          v-else
          class="space-y-2"
        >
          <div
            v-for="tag in tags"
            :key="tag.id"
            class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 select-none"
            :class="{
              'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20':
                selectedTags?.includes(tag.id),
              'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800':
                !selectedTags?.includes(tag.id)
            }"
            @click="$emit('toggle-tag', tag.id)"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                v-if="tag.color"
                class="w-3 h-3 rounded-full flex-shrink-0"
                :style="{ backgroundColor: tag.color }"
              />
              <div
                v-else
                class="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"
              />
              <span
                class="text-sm truncate"
                :class="{
                  'text-indigo-600 dark:text-indigo-300':
                    selectedTags?.includes(tag.id),
                  'text-gray-700 dark:text-gray-200':
                    !selectedTags?.includes(tag.id)
                }"
              >
                {{ tag.name }}
              </span>
            </div>

            <div class="flex items-center gap-1 ml-2">
              <u-button
                icon="i-heroicons-pencil"
                variant="ghost"
                size="xs"
                color="neutral"
                class="min-h-[44px] min-w-[44px]"
                aria-label="编辑标签"
                @click.stop="$emit('edit-tag', tag)"
              />
              <u-button
                icon="i-heroicons-trash"
                variant="ghost"
                size="xs"
                color="error"
                class="min-h-[44px] min-w-[44px]"
                aria-label="删除标签"
                @click.stop="$emit('delete-tag', tag)"
              />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </u-card>
</template>

<script setup lang="ts">
import type { Tag } from '~/api/types'

interface Props {
  tags: Tag[]
  selectedTags?: number[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  selectedTags: () => [],
  loading: false
})

defineEmits<{
  'add-tag': []
  'edit-tag': [tag: Tag]
  'delete-tag': [tag: Tag]
  'toggle-tag': [tagId: number]
}>()
</script>
