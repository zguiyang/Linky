<template>
  <div class="min-h-screen">
    <div class="ambient-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="noise-overlay"></div>
    </div>

    <div class="relative z-10">
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
          {
            title: '响应式设计',
            description: '适配各种设备，在手机、平板和桌面端都有流畅体验',
            icon: 'i-heroicons-device-phone-mobile',
          },
        ]"
        :ui="{ container: 'flex flex-col lg:grid py-20 sm:py-24 lg:py-32 gap-8 sm:gap-16' }"
      />

      <section class="cta-section">
        <div class="container">
          <div class="glass-card cta-card">
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
            <div class="cta-visual">
              <div class="visual-circle circle-1"></div>
              <div class="visual-circle circle-2"></div>
              <div class="visual-circle circle-3"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #2563eb;
  --secondary-color: #3b82f6;
  --cta-color: #f97316;
  --bg-color: #f8fafc;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
}

body {
  font-family: 'Work Sans', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Outfit', sans-serif;
}

.ambient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  bottom: -150px;
  right: -100px;
  animation-delay: -7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 30px) scale(1.02);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .glass-card {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

.glass-card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

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

@media (min-width: 1024px) {
  .cta-section {
    padding: 120px 20px;
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
}

@media (max-width: 1024px) {
  .cta-card {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px;
  }
}

@media (max-width: 640px) {
  .cta-card {
    padding: 24px;
  }
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
  color: var(--text-color);
  line-height: 1.2;
  margin-bottom: 16px;
}

.dark .cta-title {
  color: #f9fafb;
}

@media (max-width: 640px) {
  .cta-title {
    font-size: 2rem;
  }
}

.cta-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 28px;
}

.dark .cta-description {
  color: #94a3b8;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cta-visual {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-circle {
  position: absolute;
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  opacity: 0.2;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  opacity: 0.3;
  animation-delay: 1s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  opacity: 0.4;
  animation-delay: 2s;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}
</style>
