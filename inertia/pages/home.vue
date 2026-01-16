<template>
  <marketing-layout>
    <div class="min-h-screen">
      <u-page-hero
        headline="全新上线"
        title="Linky"
        description="您的个人知识管理空间 - 高效管理书签、记录想法、让知识触手可及"
        :links="[
          { label: '开始使用', to: '/sign-in', size: 'xl', icon: 'i-heroicons-arrow-right' },
          { label: '了解更多', to: '#features', color: 'neutral', variant: 'ghost', size: 'xl' },
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
            icon: 'i-heroicons-bookmark',
          },
          {
            title: '备忘录',
            description: '快速记录想法、灵感和重要信息，随时随地访问您的笔记',
            icon: 'i-heroicons-document-text',
          },
          {
            title: '安全访问',
            description: '基于 Access Token 的安全认证，保护您的个人数据隐私',
            icon: 'i-heroicons-shield-check',
          },
          {
            title: '快速搜索',
            description: '通过关键词快速找到书签或备忘录，提升工作效率',
            icon: 'i-heroicons-magnifying-glass',
          },
          {
            title: '标签系统',
            description: '灵活的标签分类，让信息组织更加高效和个性化',
            icon: 'i-heroicons-tag',
          },
        ]"
        :ui="{ container: 'flex flex-col lg:grid py-20 sm:py-24 lg:py-32 gap-8 sm:gap-16' }"
      />
      
      <section class="cta-section">
        <div class="container">
          <div class="cta-card">
            <div class="cta-content">
              <u-badge label="Free" size="lg" color="primary" variant="soft" class="cta-badge" />
              <h2 class="cta-title">准备好开始整理您的知识了吗？</h2>
              <p class="cta-description">立即登录，开始使用 Linky 打造属于您的个人知识管理空间</p>
              <div class="cta-buttons">
                <u-button
                  to="/sign-in"
                  size="xl"
                  icon="i-heroicons-rocket-launch"
                  class="cursor-pointer"
                >
                  立即开始
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
  </marketing-layout>
</template>

<script setup lang="ts">
import MarketingLayout from '~/layouts/marketing.vue'
</script>

<style scoped>
.cta-section {
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {
  .cta-section {
    padding: 100px 20px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.cta-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 48px;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 24px;
}

.dark .cta-card {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(55, 65, 81, 1);
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-badge {
  margin-bottom: 20px;
  display: inline-flex;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 16px;
}

.dark .cta-title {
  color: #f9fafb;
}

.cta-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 28px;
}

.dark .cta-description {
  color: #9ca3af;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
