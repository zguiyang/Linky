<template>
  <div class="h-full flex flex-col bg-[var(--bg-canvas)]">
    <!-- Header Area -->
    <div class="px-8 py-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <h1 class="text-2xl font-bold text-[var(--text-primary)]">
        系统设置
      </h1>
      <p class="text-[var(--text-secondary)] mt-1">
        管理您的个性化配置与 AI 接口集成
      </p>
    </div>

    <!-- Main Content Area with Sidebar -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Settings Sidebar -->
      <aside class="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-col gap-1">
        <u-button
          v-for="item in menuItems"
          :key="item.id"
          variant="ghost"
          color="neutral"
          class="justify-start gap-3 px-3 py-2.5"
          :class="[activeTab === item.id ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]']"
          @click="navigateTo({ query: { tab: item.id } })"
        >
          <u-icon
            :name="item.icon"
            class="size-5"
          />
          {{ item.label }}
        </u-button>
      </aside>

      <!-- Settings Content -->
      <main class="flex-1 overflow-y-auto p-8 bg-[var(--bg-canvas)]">
        <div class="max-w-4xl">
          <!-- AI Settings Section -->
          <div
            v-if="activeTab === 'ai'"
            class="space-y-8"
          >
            <section>
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <u-icon
                    name="i-heroicons-sparkles"
                    class="text-primary-500"
                  />
                  AI 配置
                </h2>
                <p class="text-sm text-[var(--text-secondary)] mt-1">
                  配置您的 AI 服务接口，开启智能摘要、标签建议等高级功能。
                </p>
              </div>

              <div class="space-y-8">
                <!-- AI Enable Toggle Section -->
                <div class="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div class="flex items-center gap-4">
                    <div class="p-2 rounded-lg bg-primary-500/10">
                      <u-icon
                        name="i-heroicons-power"
                        class="size-6 text-primary-500"
                      />
                    </div>
                    <div>
                      <p class="font-semibold text-[var(--text-primary)]">
                        启用 AI 服务
                      </p>
                      <p class="text-xs text-[var(--text-secondary)]">
                        开启后系统将允许调用第三方模型接口
                      </p>
                    </div>
                  </div>
                  <u-switch
                    v-model="form.aiEnabled"
                    color="primary"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <u-form-field
                    label="AI Base URL"
                    description="AI 服务的基础 API 地址"
                  >
                    <u-input
                      v-model="form.aiBaseUrl"
                      placeholder="https://api.openai.com/v1"
                      size="lg"
                      class="w-full"
                    />
                  </u-form-field>

                  <u-form-field
                    label="AI 模型名称"
                    description="例如 gpt-4o, claude-3-sonnet"
                  >
                    <u-input
                      v-model="form.aiModelName"
                      placeholder="gpt-4o"
                      size="lg"
                      class="w-full"
                    />
                  </u-form-field>
                </div>

                <u-form-field
                  label="API Key"
                  description="您的 AI 服务授权密钥"
                  class="max-w-2xl"
                >
                  <u-input
                    v-model="form.aiApiKey"
                    type="password"
                    placeholder="sk-..."
                    size="lg"
                    icon="i-heroicons-key"
                  />
                </u-form-field>

                <div class="pt-4 border-t border-[var(--border-subtle)] flex justify-end items-center gap-4">
                  <span
                    v-if="lastSaved"
                    class="text-xs text-[var(--text-muted)]"
                  >
                    最后保存于: {{ lastSaved }}
                  </span>
                  <u-button
                    color="primary"
                    size="lg"
                    class="px-8"
                    :loading="saving"
                    @click="saveSettings"
                  >
                    保存更改
                  </u-button>
                </div>
              </div>
            </section>
          </div>

          <!-- Profile Settings Section -->
          <div
            v-if="activeTab === 'profile'"
            class="space-y-8"
          >
            <section>
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <u-icon
                    name="i-heroicons-user-circle"
                    class="text-primary-500"
                  />
                  个人资料
                </h2>
                <p class="text-sm text-[var(--text-secondary)] mt-1">
                  管理您的个人信息、头像及账号安全。
                </p>
              </div>

              <div class="py-12 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[var(--text-secondary)]">
                <u-icon
                  name="i-heroicons-user"
                  class="size-16 opacity-20 mb-4"
                />
                <p class="text-lg">
                  个人资料设置正在开发中...
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'workspace' })

const route = useRoute()
const toast = useToast()
const saving = ref(false)
const lastSaved = ref('')
const activeTab = ref(route.query.tab as string || 'ai')

const menuItems = [
  { id: 'ai', label: 'AI 配置', icon: 'i-heroicons-sparkles' },
  { id: 'profile', label: '个人资料', icon: 'i-heroicons-user-circle' }
]

watch(() => route.query.tab, (newTab) => {
  if (newTab && typeof newTab === 'string') {
    activeTab.value = newTab
  }
})

const form = reactive({
  aiEnabled: false,
  aiBaseUrl: '',
  aiModelName: '',
  aiApiKey: ''
})

onMounted(async () => {
  const { $api } = useNuxtApp()
  try {
    const data = await $api<{ aiEnabled: boolean, aiBaseUrl: string | null, aiModelName: string | null }>('/settings/ai', { method: 'get' })
    if (data) {
      form.aiEnabled = data.aiEnabled
      form.aiBaseUrl = data.aiBaseUrl || ''
      form.aiModelName = data.aiModelName || ''
    }
  } catch (err) {
    console.error('Failed to load settings:', err)
  }
})

const saveSettings = async () => {
  const { $api } = useNuxtApp()
  saving.value = true

  try {
    await $api('/settings/ai', {
      method: 'put',
      body: {
        aiEnabled: form.aiEnabled,
        aiBaseUrl: form.aiBaseUrl || null,
        aiModelName: form.aiModelName || null,
        aiApiKey: form.aiApiKey || undefined
      }
    })

    form.aiApiKey = ''
    lastSaved.value = new Date().toLocaleTimeString()
    toast.add({
      title: '保存成功',
      description: 'AI 配置已成功更新',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
  } catch (err) {
    console.error('Failed to save settings:', err)
    toast.add({
      title: '保存失败',
      description: '更新配置时出错，请重试',
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  } finally {
    saving.value = false
  }
}
</script>
