<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <ambient-background />

    <slot />
  </div>
</template>

<script setup lang="ts">
import AmbientBackground from '~/components/shared/AmbientBackground.vue'
</script>
