<template>
  <u-modal
    v-model:open="open"
    title="导入书签"
  >
    <template #body>
      <u-form
        :state="{ createTags, autoAiTag }"
        @submit="startImport"
      >
        <div
          v-if="step === 'upload'"
          class="space-y-6"
        >
          <div
            class="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-8 text-center transition-colors"
            :class="{
              'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragging,
              'hover:border-neutral-400 dark:hover:border-neutral-500': !isDragging && !selectedFile
            }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <div
              v-if="!selectedFile"
              class="space-y-4"
            >
              <div class="flex justify-center">
                <u-icon
                  name="i-heroicons-document-arrow-up"
                  class="w-12 h-12 text-neutral-400"
                />
              </div>
              <div>
                <p class="text-lg font-medium text-neutral-900 dark:text-neutral-50">
                  拖放HTML文件到此处，或
                </p>
                <u-button
                  label="点击选择文件"
                  color="primary"
                  variant="outline"
                  @click="fileInputRef?.click()"
                />
                <input
                  ref="fileInputRef"
                  type="file"
                  accept=".html,.htm"
                  class="hidden"
                  @change="handleFileSelect"
                >
              </div>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">
                支持 Chrome 浏览器导出的书签 HTML 文件
              </p>
            </div>

            <div
              v-else
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <u-icon
                  name="i-heroicons-document-text"
                  class="w-8 h-8 text-primary-500"
                />
                <div class="text-left">
                  <p class="font-medium text-neutral-900 dark:text-neutral-50">
                    {{ selectedFile.name }}
                  </p>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400">
                    {{ formatFileSize(selectedFile.size) }}
                  </p>
                </div>
              </div>
              <u-button
                icon="i-heroicons-x-mark"
                variant="ghost"
                color="neutral"
                @click="clearFile"
              />
            </div>
          </div>

          <u-accordion
            :items="[{ label: '高级选项', icon: 'i-heroicons-cog-6-tooth', value: 'advanced' }]"
            type="single"
          >
            <template #body>
              <div class="space-y-3 pt-2">
                <u-form-field>
                  <u-checkbox
                    v-model="createTags"
                    label="将文件夹名称转换为标签"
                  />
                </u-form-field>
                <u-form-field>
                  <u-checkbox
                    v-model="autoAiTag"
                    label="自动使用 AI 生成标签"
                  />
                </u-form-field>
              </div>
            </template>
          </u-accordion>
        </div>

        <div
          v-else-if="step === 'importing'"
          class="space-y-6"
        >
          <div class="text-center space-y-4">
            <div class="flex justify-center">
              <u-progress
                :model-value="progress"
                color="primary"
                size="lg"
              />
            </div>
            <div>
              <p class="text-lg font-medium text-neutral-900 dark:text-neutral-50">
                正在导入书签...
              </p>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">
                {{ current }}/{{ total }} {{ currentTitle ? `- ${currentTitle}` : '' }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-else-if="step === 'result'"
          class="space-y-6"
        >
          <div
            v-if="importResult"
            class="space-y-4"
          >
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-success-50 dark:bg-success-900/20 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-success-600 dark:text-success-400">
                  {{ importResult.imported }}
                </p>
                <p class="text-sm text-success-700 dark:text-success-300">
                  成功导入
                </p>
              </div>
              <div class="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-warning-600 dark:text-warning-400">
                  {{ importResult.skipped }}
                </p>
                <p class="text-sm text-warning-700 dark:text-warning-300">
                  跳过
                </p>
              </div>
              <div class="bg-error-50 dark:bg-error-900/20 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-error-600 dark:text-error-400">
                  {{ importResult.errors }}
                </p>
                <p class="text-sm text-error-700 dark:text-error-300">
                  失败
                </p>
              </div>
              <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {{ importResult.tagsCreated }}
                </p>
                <p class="text-sm text-primary-700 dark:text-primary-300">
                  新建标签
                </p>
              </div>
            </div>

            <div
              v-if="importResult.errorsList && importResult.errorsList.length > 0"
              class="mt-4"
            >
              <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                失败的导入：
              </p>
              <div class="max-h-40 overflow-y-auto space-y-1 text-sm">
                <p
                  v-for="(item, index) in importResult.errorsList"
                  :key="index"
                  class="text-neutral-600 dark:text-neutral-400"
                >
                  {{ item.title }}: {{ item.reason }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </u-form>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button
          v-if="step === 'upload'"
          label="导入"
          color="primary"
          :disabled="!selectedFile || isImporting"
          :loading="isImporting"
          @click="startImport"
        />
        <u-button
          v-if="step === 'result'"
          label="完成"
          color="primary"
          @click="handleClose"
        />
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { AsyncImportResponseData, ImportProgressData, ImportResultData } from '~/api/types'
import { useAuthStore } from '~/stores/auth'

const { $api } = useNuxtApp()
const { onImportProgress } = usePush()
const authStore = useAuthStore()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'imported': []
}>()

const open = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const step = ref<'upload' | 'importing' | 'result'>('upload')
const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const selectedFile = ref<File | null>(null)
const isImporting = ref(false)
const importResult = ref<ImportResultData | null>(null)
const current = ref(0)
const total = ref(0)
const currentTitle = ref('')

const progress = computed(() => {
  console.log('progress', current.value, total.value)
  if (total.value === 0) return 0
  return Math.round((current.value / total.value) * 100)
})

const createTags = ref(true)
const autoAiTag = ref(true)

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file && (file.name.endsWith('.html') || file.name.endsWith('.htm'))) {
      selectedFile.value = file
    }
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file) {
      selectedFile.value = file
    }
  }
}

const clearFile = () => {
  selectedFile.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const handleImportProgress = (data: ImportProgressData) => {
  console.log('handle import progress', data)
  if (step.value !== 'importing') {
    step.value = 'importing'
  }

  current.value = data.current
  total.value = data.total
  currentTitle.value = data.currentTitle || ''

  if (data.current === data.total && data.total > 0) {
    setTimeout(async () => {
      importResult.value = await $api<ImportResultData>('/bookmarks/import/' + data.jobId + '/status', { method: 'get' })
      step.value = 'result'
      isImporting.value = false
    }, 0)
  }
}

const startImport = async () => {
  if (!selectedFile.value) return

  isImporting.value = true
  step.value = 'importing'
  current.value = 0
  total.value = 0

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  if (createTags.value !== undefined) {
    formData.append('createTags', String(createTags.value))
  }
  if (autoAiTag.value !== undefined) {
    formData.append('autoAiTag', String(autoAiTag.value))
  }

  const data = await $api<AsyncImportResponseData>('/bookmarks/import', {
    method: 'post',
    body: formData
  })

  if (data && 'jobId' in data) {
    // Job 已创建，等待 SSE 进度更新
  } else {
    step.value = 'upload'
  }

  isImporting.value = false
}

const handleClose = () => {
  emit('imported')
  open.value = false
  step.value = 'upload'
  selectedFile.value = null
  importResult.value = null
  current.value = 0
  total.value = 0
  createTags.value = true
  autoAiTag.value = true
}

onMounted(() => {
  if (authStore.user?.id) {
    console.log('subscribe import progress')
    onImportProgress((data: ImportProgressData) => {
      console.log('handle import progress', data)
      handleImportProgress(data)
    })
  }
})

onUnmounted(() => {
})
</script>
