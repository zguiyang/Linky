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
interface Props {
  modelValue: string[] | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const modelValue = computed({
  get: () => props.modelValue ?? [],
  set: (value) => emit('update:modelValue', value),
})
</script>
