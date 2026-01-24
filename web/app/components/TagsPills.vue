<template>
  <div class="flex gap-2 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8 lg:hidden scrollbar-hide">
    <u-button
      v-for="tag in tags"
      :key="tag.id"
      :color="selectedTags.includes(tag.id) ? 'primary' : 'neutral'"
      variant="soft"
      size="sm"
      class="shrink-0 whitespace-nowrap"
      @click="toggleTag(tag.id)"
    >
      <template
        v-if="tag.color"
        #leading
      >
        <span
          class="w-2 h-2 rounded-full inline-block mr-1.5"
          :style="{ backgroundColor: tag.color }"
        />
      </template>
      {{ tag.name }}
    </u-button>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '~/api/types'

defineProps<{
  tags: Tag[]
  selectedTags: number[]
}>()

const emit = defineEmits<{
  'toggle:tag': [tagId: number]
}>()

const toggleTag = (tagId: number) => {
  emit('toggle:tag', tagId)
}
</script>
