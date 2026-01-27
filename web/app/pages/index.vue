<template>
  <div class="min-h-screen">
    <u-page-hero
      headline="全新上线"
      title="Linky"
      description="您的个人知识管理空间 - 高效管理书签、记录想法、让知识触手可及"
      :links="[
        {
          label: entryButton.label,
          to: entryButton.to,
          size: 'xl',
          icon: 'i-heroicons-arrow-right'
        },
        { label: '了解更多', to: '#features', color: 'neutral', variant: 'ghost', size: 'xl' }
      ]"
      :ui="{ container: 'flex flex-col lg:grid py-32 sm:py-40 lg:py-48 gap-16 sm:gap-y-24' }"
    />

    <u-page-section
      id="features"
      headline="功能特性"
      title="一站式知识管理"
      description="Linky 提供简洁而强大的工具，帮助您整理和访问网络资源与个人想法"
      :features="[
        {
          title: '书签管理',
          description: '高效管理您的网络书签，支持分类整理和智能标签，让链接井井有条',
          icon: 'i-heroicons-bookmark'
        },
        {
          title: '备忘录',
          description: '快速记录想法、灵感和重要信息，随时随地访问您的笔记',
          icon: 'i-heroicons-document-text'
        },
        {
          title: '安全访问',
          description: '基于 Access Token 的安全认证，保护您的个人数据隐私',
          icon: 'i-heroicons-shield-check'
        },
        {
          title: '快速搜索',
          description: '通过关键词快速找到书签或备忘录，提升工作效率',
          icon: 'i-heroicons-magnifying-glass'
        },
        {
          title: '标签系统',
          description: '灵活的标签分类，让信息组织更加高效和个性化',
          icon: 'i-heroicons-tag'
        }
      ]"
      :ui="{ container: 'flex flex-col lg:grid py-20 sm:py-24 lg:py-32 gap-8 sm:gap-16' }"
    />

    <section class="py-[60px] sm:py-[100px] px-5 relative overflow-hidden">
      <div class="max-w-[1200px] mx-auto relative">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center p-12 rounded-3xl border border-border bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl relative overflow-hidden">
          <div class="relative z-10">
            <u-badge
              label="Free"
              size="lg"
              color="primary"
              variant="soft"
              class="mb-5 inline-flex"
            />
            <h2 class="text-4xl font-bold leading-tight mb-4 text-foreground dark:text-foreground">
              准备好开始整理您的知识了吗？
            </h2>
            <p class="text-lg leading-relaxed mb-7 text-muted-foreground dark:text-muted-foreground">
              立即登录，开始使用 Linky 打造属于您的个人知识管理空间
            </p>
            <div class="flex flex-wrap gap-4">
              <u-button
                :to="entryButton.to"
                size="xl"
                icon="i-heroicons-rocket-launch"
                class="cursor-pointer"
              >
                {{ entryButton.label }}
              </u-button>
              <u-button
                to="#features"
                color="neutral"
                variant="ghost"
                size="xl"
                class="cursor-pointer"
              >
                了解更多
              </u-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({ layout: 'marketing' })

const user = ref<{ fullName: string | null, email: string } | null>(null)

const entryButton = computed(() => ({
  label: user.value ? '进入工作区' : '开始使用',
  to: user.value ? '/workspace/bookmarks' : '/auth/sign-in'
}))
</script>
