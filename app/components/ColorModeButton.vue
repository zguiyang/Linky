<script lang="ts" setup>
  const colorMode = useColorMode();

  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set(_isDark) {
      colorMode.preference = _isDark ? 'dark' : 'light';
    },
  });
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
      color="neutral"
      variant="ghost"
      size="xs"
      class="p-2.5"
      :aria-label="`切换到${isDark ? '明亮' : '暗黑'}模式`"
      @click="isDark = !isDark" />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
