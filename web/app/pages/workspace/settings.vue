<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      设置
    </h1>

    <div class="space-y-6 max-w-2xl">
      <u-card>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            AI 配置
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            配置 AI 服务接口信息，用于后续 AI 功能集成
          </p>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                启用 AI 功能
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                开启后将可以使用 AI 相关功能
              </p>
            </div>
            <u-switch
              v-model="form.aiEnabled"
              color="primary"
            />
          </div>

          <u-form-field
            label="AI Base URL"
            help="AI 服务的基础地址"
          >
            <u-input
              v-model="form.aiBaseUrl"
              placeholder="https://api.openai.com/v1"
              size="lg"
            />
          </u-form-field>

          <u-form-field
            label="AI 模型名称"
            help="AI 模型名称，如 gpt-4o、gpt-3.5-turbo"
          >
            <u-input
              v-model="form.aiModelName"
              placeholder="gpt-4o"
              size="lg"
            />
          </u-form-field>

          <u-form-field
            label="API Key"
            help="AI 服务的 API 密钥"
          >
            <u-input
              v-model="form.aiApiKey"
              type="password"
              placeholder="sk-..."
              size="lg"
            />
          </u-form-field>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <u-button
              color="primary"
              :loading="saving"
              @click="saveSettings"
            >
              保存设置
            </u-button>
          </div>
        </template>
      </u-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from '~/lib/request'

definePageMeta({ layout: 'workspace' })

const saving = ref(false)
const form = reactive({
  aiEnabled: false,
  aiBaseUrl: '',
  aiModelName: '',
  aiApiKey: ''
})

onMounted(async () => {
  const { data } = await request.get<{ aiEnabled: boolean, aiBaseUrl: string | null, aiModelName: string | null }>('/settings/ai')
  if (data) {
    form.aiEnabled = data.aiEnabled
    form.aiBaseUrl = data.aiBaseUrl || ''
    form.aiModelName = data.aiModelName || ''
  }
})

const saveSettings = async () => {
  saving.value = true

  await request.put('/settings/ai', {
    aiEnabled: form.aiEnabled,
    aiBaseUrl: form.aiBaseUrl || null,
    aiModelName: form.aiModelName || null,
    aiApiKey: form.aiApiKey || undefined
  })

  form.aiApiKey = ''
  saving.value = false
}
</script>
