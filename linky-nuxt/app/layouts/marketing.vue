<template>
  <div class="marketing-layout">
    <AmbientBackground />

    <slot />
  </div>
</template>

<script setup lang="ts">
import AmbientBackground from '~/components/shared/AmbientBackground.vue'
</script>

<style scoped>
.marketing-layout {
  position: relative;
  min-height: 100vh;
}
</style>
