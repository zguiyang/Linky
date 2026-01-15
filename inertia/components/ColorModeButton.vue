<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <UButton
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    :color="color"
    :variant="variant"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    @click="isDark = !isDark"
  />
</template>
