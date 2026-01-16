<template>
  <root-layout>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <slot />
    </div>
  </root-layout>
</template>

<script setup lang="ts">
import RootLayout from '~/layouts/root.vue'
</script>
