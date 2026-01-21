<template>
  <u-app>
    <div class="root-container">
      <AmbientBackground />

      <slot />
    </div>
  </u-app>
</template>

<script setup lang="ts">
import AmbientBackground from '~/components/shared/AmbientBackground.vue'
</script>

<style>
.root-container {
  min-height: 100vh;
  width: 100vw;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
</style>
