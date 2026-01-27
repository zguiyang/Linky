<template>
  <u-modal
    v-model:open="open"
    title="导入书签"
  >
    <template #body>
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

        <div class="space-y-3">
          <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            导入选项
          </p>
          <div class="flex items-center gap-3">
            <u-checkbox
              v-model="autoFetch"
              label="自动获取元数据（标题、描述、图片）"
            />
          </div>
          <div class="flex items-center gap-3">
            <u-checkbox
              v-model="createTags"
              label="将文件夹名称转换为标签"
            />
          </div>
          <div class="flex items-center gap-3">
            <u-checkbox
              v-model="skipDuplicates"
              label="跳过已存在的书签"
            />
          </div>
        </div>
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
              {{ isAsyncMode ? '正在后台导入书签...' : '正在导入书签...' }}
            </p>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
              {{ isAsyncMode ? `进度: ${progress}%` : '解析文件并创建书签，请稍候' }}
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
                跳过重复
              </p>
            </div>
            <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center">
              <p class="text-2xl font-bold text-neutral-600 dark:text-neutral-400">
                {{ importResult.total }}
              </p>
              <p class="text-sm text-neutral-700 dark:text-neutral-300">
                总计书签
              </p>
            </div>
            <div class="bg-error-50 dark:bg-error-900/20 rounded-lg p-4 text-center">
              <p class="text-2xl font-bold text-error-600 dark:text-error-400">
                {{ importResult.errors }}
              </p>
              <p class="text-sm text-error-700 dark:text-error-300">
                导入失败
              </p>
            </div>
          </div>

          <div
            v-if="importResult.tagsCreated > 0"
            class="text-center"
          >
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
              已创建 {{ importResult.tagsCreated }} 个标签
            </p>
          </div>

          <div
            v-if="importResult.errorsList.length > 0"
            class="space-y-2"
          >
            <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              失败详情 ({{ importResult.errorsList.length }} 项)：
            </p>
            <u-scroll-area class="h-48 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div class="p-3 space-y-2">
                <div
                  v-for="(error, index) in importResult.errorsList"
                  :key="index"
                  class="text-xs p-2 bg-error-50 dark:bg-error-900/20 rounded"
                >
                  <p class="font-medium text-error-700 dark:text-error-300 truncate">
                    {{ error.title }}
                  </p>
                  <p class="text-error-600 dark:text-error-400 truncate">
                    {{ error.url }}
                  </p>
                  <p class="text-error-500 dark:text-error-500 mt-1">
                    {{ error.reason }}
                  </p>
                </div>
              </div>
            </u-scroll-area>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <u-button
        label="取消"
        color="neutral"
        variant="outline"
        @click="close"
      />
      <u-button
        v-if="step === 'upload'"
        label="开始导入"
        color="primary"
        :disabled="!selectedFile"
        :loading="isImporting"
        @click="startImport"
      />
      <u-button
        v-if="step === 'result'"
        label="完成"
        color="primary"
        @click="handleComplete(close)"
      />
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { bookmarksApi, type ImportResult } from '~/api/bookmarks'

type ImportResultData = ImportResult['data']

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
const progress = ref(0)
const isAsyncMode = ref(false)

let pollInterval: ReturnType<typeof setInterval> | null = null

const createTags = ref(true)
const skipDuplicates = ref(true)
const autoFetch = ref(true)

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

const stopPolling = () => {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

const pollImportStatus = async (jobId: string) => {
  pollInterval = setInterval(async () => {
    try {
      const response = await bookmarksApi.getImportStatus(jobId)
      progress.value = response.data.progress

      if (response.data.status === 'completed' && response.data.data) {
        stopPolling()
        importResult.value = response.data.data
        step.value = 'result'
        isImporting.value = false
      } else if (response.data.status === 'waiting') {
        progress.value = 0
      }
    } catch (error) {
      console.error('Polling failed:', error)
      stopPolling()
      step.value = 'upload'
      isImporting.value = false
    }
  }, 1000)
}

const startImport = async () => {
  if (!selectedFile.value) return

  isImporting.value = true
  step.value = 'importing'
  progress.value = 0

  try {
    const response = await bookmarksApi.import(selectedFile.value, {
      createTags: createTags.value,
      skipDuplicates: skipDuplicates.value,
      autoFetch: autoFetch.value
    })

    if (response.mode === 'sync') {
      importResult.value = response.data
      step.value = 'result'
    } else {
      isAsyncMode.value = true
      pollImportStatus(response.data.jobId)
    }
  } catch (error) {
    console.error('Import failed:', error)
    step.value = 'upload'
    isImporting.value = false
  } finally {
    isImporting.value = false
  }
}

const handleComplete = (close: () => void) => {
  emit('imported')
  close()
  resetState()
}

const resetState = () => {
  stopPolling()
  step.value = 'upload'
  selectedFile.value = null
  importResult.value = null
  progress.value = 0
  isAsyncMode.value = false
  createTags.value = true
  skipDuplicates.value = true
  autoFetch.value = true
}

onUnmounted(() => {
  stopPolling()
})
</script>
