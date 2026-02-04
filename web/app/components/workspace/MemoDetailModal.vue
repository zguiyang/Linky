<template>
  <u-modal
    v-model:open="isOpen"
    title="备忘录详情"
    :ui="{ content: 'max-w-2xl' }"
  >
    <template #body>
      <div
        v-if="isLoading"
        class="flex items-center justify-center py-12"
      >
        <u-icon
          name="i-lucide-loader"
          class="animate-spin size-6 text-muted"
        />
      </div>

      <div
        v-else-if="memo"
        class="space-y-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold truncate">
              {{ memo.title || '无标题备忘录' }}
            </h3>
            <div class="flex items-center gap-2 mt-2">
              <u-badge
                v-for="tag in memo.tags"
                :key="tag.id"
                :color="(tag.color as 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral' | undefined) || 'primary'"
                variant="subtle"
                size="sm"
              >
                {{ tag.name }}
              </u-badge>
            </div>
          </div>
          <u-icon
            v-if="memo.isPinned"
            name="i-heroicons-bookmark"
            class="text-warning shrink-0"
          />
        </div>

        <div
          class="prose prose-sm max-w-none dark:prose-invert"
        >
          <u-editor
            :model-value="memo.content"
            content-type="html"
            :editable="false"
          />
        </div>

        <div class="flex items-center gap-4 pt-2 border-t border-[var(--border-subtle)]">
          <span class="text-xs text-[var(--text-muted)]">
            创建于 {{ formatDate(memo.createdAt) }}
          </span>
          <span
            v-if="memo.updatedAt"
            class="text-xs text-[var(--text-muted)]"
          >
            更新于 {{ formatDate(memo.updatedAt) }}
          </span>
        </div>
      </div>

      <div
        v-else
        class="flex items-center justify-center py-12 text-muted"
      >
        备忘录不存在
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <u-button
          variant="ghost"
          label="关闭"
          @click="isOpen = false"
        />
        <u-button
          color="primary"
          label="打开详情页"
          @click="openDetail"
        />
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import type { Memo } from '~/api/types'

const props = defineProps<{
  open: boolean
  memoId: number | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value)
})

const { $api } = useNuxtApp()
const memo = ref<Memo | null>(null)
const isLoading = ref(false)

const fetchMemo = async () => {
  if (!props.memoId) {
    memo.value = null
    return
  }

  isLoading.value = true
  try {
    memo.value = await $api<Memo>(`/memos/${props.memoId}`, { method: 'get' })
  } catch {
    memo.value = null
  } finally {
    isLoading.value = false
  }
}

watch(() => props.memoId, fetchMemo, { immediate: true })

watch(() => props.open, (open) => {
  if (open && props.memoId) {
    fetchMemo()
  }
})

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openDetail = () => {
  if (memo.value) {
    navigateTo(`/workspace/memos?id=${memo.value.id}`)
    isOpen.value = false
  }
}
</script>
