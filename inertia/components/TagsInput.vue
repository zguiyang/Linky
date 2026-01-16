<template>
  <div class="tags-input-wrapper">
    <div class="tags-input">
      <span v-for="(tag, index) in tags" :key="index" class="tag-item">
        {{ tag }}
        <button type="button" class="tag-remove" @click="removeTag(index)">
          <u-icon name="i-heroicons-x-mark" class="w-3 h-3" />
        </button>
      </span>

      <input
        v-model="inputValue"
        v-on:keyup.enter="addTag"
        placeholder="输入标签..."
        class="tag-input-field"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputValue = ref('')
const tags = computed(() => props.modelValue)

function addTag() {
  const trimmed = inputValue.value.trim()
  if (trimmed && !tags.value.includes(trimmed)) {
    emit('update:modelValue', [...tags.value, trimmed])
    inputValue.value = ''
  }
}

function removeTag(index: number) {
  emit(
    'update:modelValue',
    tags.value.filter((_, i) => i !== index)
  )
}

watch(
  () => props.modelValue,
  (newVal) => {
    // Sync with external changes
  },
  { deep: true }
)
</script>

<style scoped>
.tags-input-wrapper {
  width: 100%;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: rgb(249 250 251 / 1);
  border: 1px solid rgb(229 231 235 / 1);
  border-radius: 12px;
  min-height: 46px;
}

.dark .tags-input {
  background-color: rgb(31 41 55 / 1);
  border-color: rgb(55 65 81 / 1);
}

.tags-input:focus-within {
  border-color: rgb(99 102 241 / 1);
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background-color: rgb(99 102 241 / 0.1);
  border: 1px solid rgb(99 102 241 / 0.2);
  border-radius: 8px;
  font-size: 0.8125rem;
  color: rgb(129 140 248 / 1);
}

.tag-remove {
  display: flex;
  background: transparent;
  border: none;
  padding: 0;
  color: rgb(156 163 175 / 1);
  cursor: pointer;
  transition: color 0.2s ease;
}

.tag-remove:hover {
  color: rgb(17 24 39 / 1);
}

.dark .tag-remove:hover {
  color: rgb(249 250 251 / 1);
}

.tag-input-field {
  flex: 1;
  min-width: 120px;
  padding: 0.375rem 0;
  background: transparent;
  border: none;
  font-size: 0.9375rem;
  color: rgb(17 24 39 / 1);
  outline: none;
}

.dark .tag-input-field {
  color: rgb(249 250 251 / 1);
}

.tag-input-field::placeholder {
  color: rgb(156 163 175 / 1);
}
</style>
