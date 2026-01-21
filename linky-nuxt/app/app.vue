<script setup lang="ts">
useHead({
  title: 'Linky - 个人知识管理系统',
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'zh-CN' }
})

useSeoMeta({
  title: 'Linky',
  description: '您的个人知识管理空间 - 高效管理书签、记录想法、让知识触手可及',
  ogTitle: 'Linky',
  ogDescription: '您的个人知识管理空间 - 高效管理书签、记录想法、让知识触手可及',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <u-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </u-app>
</template>
