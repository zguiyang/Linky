<template>
  <RootLayout>
    <div class="marketing-layout">
      <slot />
    </div>
  </RootLayout>
</template>

<script setup lang="ts">
import RootLayout from '~/layouts/root.vue'
</script>

<style scoped>
.marketing-layout {
  /* Marketing layout specific styles if needed */
}
</style>
