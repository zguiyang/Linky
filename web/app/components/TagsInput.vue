<template>
  <u-input-tags
    v-model="modelValue"
    placeholder="Enter tags..."
    :max-length="20"
    :duplicate="false"
    size="md"
    variant="outline"
    color="primary"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const modelValue = computed({
  get: () => props.modelValue ?? [],
  set: (value: string[]) => emit('update:modelValue', value)
})
</script>
