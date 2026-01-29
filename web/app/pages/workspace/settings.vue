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
import { settingsApi } from '~/api/settings'

definePageMeta({ layout: 'workspace' })

const saving = ref(false)
const form = reactive({
  aiBaseUrl: '',
  aiApiKey: ''
})

onMounted(async () => {
  try {
    const data = await settingsApi.getAiConfig()
    form.aiBaseUrl = data.aiBaseUrl || ''
  } catch {
    // handle error
  }
})

const saveSettings = async () => {
  saving.value = true
  try {
    await settingsApi.updateAiConfig({
      aiBaseUrl: form.aiBaseUrl || null,
      aiApiKey: form.aiApiKey || undefined
    })
    form.aiApiKey = ''
  } catch {
    // handle error
  } finally {
    saving.value = false
  }
}
</script>
