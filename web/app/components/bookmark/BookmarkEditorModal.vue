<template>
  <u-modal
    v-model:open="isOpen"
    :title="isEditing ? '编辑书签' : '添加新书签'"
  >
    <template #body>
      <u-form
        :state="formData"
        class="space-y-4"
        @submit="handleSubmit"
      >
        <template v-if="!isEditing">
          <u-form-field
            label="自动使用 AI 生成标签"
            direction="row"
          >
            <u-switch v-model="autoAiTag" />
          </u-form-field>
        </template>

        <u-form-field
          label="URL"
          name="url"
          required
        >
          <u-input
            v-model="formData.url"
            type="url"
            placeholder="https://example.com"
            icon="i-heroicons-globe-alt"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="标题"
          name="title"
        >
          <u-input
            v-model="formData.title"
            placeholder="留空将自动从网页获取"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="描述"
          name="description"
        >
          <u-textarea
            v-model="formData.description"
            placeholder="留空将自动从网页获取"
            :rows="3"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="标签"
          name="tagIds"
        >
          <u-select-menu
            v-model="formData.tagIds"
            :items="tagSelectItems"
            multiple
            value-key="value"
            label-key="label"
            placeholder="选择标签"
            class="w-full"
          />
        </u-form-field>
      </u-form>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button
          label="取消"
          color="neutral"
          variant="outline"
          @click="handleCancel"
        />
        <u-button
          :label="isEditing ? '保存' : '添加'"
          color="primary"
          :loading="isSubmitting"
          @click="handleSubmit"
        />
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Bookmark, Tag } from '~/api/types'
import { useTagsStore } from '~/stores/tags'

interface Props {
  modelValue: boolean
  bookmark?: Bookmark | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { $api } = useNuxtApp()
const tagsStore = useTagsStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const isEditing = computed(() => !!props.bookmark)
const isSubmitting = ref(false)
const autoAiTag = ref(true)

const formData = ref({
  title: '',
  url: '',
  description: '',
  tagIds: [] as number[]
})

const tagSelectItems = computed(() => tagsStore.tagSelectItems)

const loadBookmarkData = (bookmark: Bookmark) => {
  formData.value = {
    title: bookmark.title,
    url: bookmark.url,
    description: bookmark.description || '',
    tagIds: bookmark.tags.map((t: Tag) => t.id)
  }
}

const resetForm = () => {
  formData.value = {
    title: '',
    url: '',
    description: '',
    tagIds: []
  }
  autoAiTag.value = true
}

const handleSubmit = async () => {
  if (!formData.value.url) {
    return
  }

  isSubmitting.value = true
  try {
    if (isEditing.value && props.bookmark) {
      await $api(`/bookmarks/${props.bookmark.id}`, {
        method: 'put',
        body: formData.value
      })
    } else {
      await $api('/bookmarks', {
        method: 'post',
        body: { url: formData.value.url, autoAiTag: autoAiTag.value }
      })
    }
    emit('save')
    isOpen.value = false
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  isOpen.value = false
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    if (props.bookmark) {
      loadBookmarkData(props.bookmark)
      autoAiTag.value = false
    } else {
      resetForm()
    }
  }
})
</script>
