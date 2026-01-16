<template>
  <root-layout>
    <div class="auth-layout">
      <slot />
    </div>
  </root-layout>
</template>

<script setup lang="ts">
import RootLayout from '~/layouts/root.vue'
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}

.dark .auth-layout {
  background-color: #111827;
}
</style>
