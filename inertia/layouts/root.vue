<template>
  <UApp>
    <div class="root-container">
      <AmbientBackground />

      <transition :name="transitionName" mode="out-in">
        <slot />
      </transition>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AmbientBackground from '~/components/shared/AmbientBackground.vue'

const transitionName = ref('fade')
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
