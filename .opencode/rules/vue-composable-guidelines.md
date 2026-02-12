# Vue 3 Composition API Guidelines for OpenCode

**Version**: 1.0.0
**Last Updated**: 2026-02-12
**Enforced by**: ESLint + OpenCode Rules

---

## Quick Reference

### Composables

**Must call at top level of `<script setup>`**:
```vue
<script setup lang="ts">
const { $api } = useNuxtApp()  // ✅ Top level
const toast = useToast()

const handleSubmit = async () => {
  await $api('/endpoint')  // ✅ Use here
}
</script>
```

**Never call in methods**:
```vue
<script setup lang="ts">
const handleSubmit = async () => {
  const { $api } = useNuxtApp()  // ❌ Violation!
}
</script>
```

### Lifecycle Hooks

**Must be at top level**:
```vue
<script setup lang="ts">
onMounted(() => {
  initData()
})
</script>
```

**Never after await or in methods**:
```vue
<script setup lang="ts">
async function setup() {
  await fetchData()
  onMounted(() => {})  // ❌ Lost context
}
</script>
```

### Props

**Prefer destructuring**:
```vue
<script setup lang="ts">
const { msg = 'Hello' } = defineProps<{
  msg?: string
}>()
</script>
```

---

## Complete Examples

### Simple Component
```vue
<script setup lang="ts">
defineOptions({ name: 'UserCard' })

const { name, role = 'user' } = defineProps<{
  name: string
  role?: 'user' | 'admin'
}>()

const emit = defineEmits<{
  click: [id: string]
}>()

const handleClick = () => {
  emit('click', name)
}
</script>

<template>
  <div class="user-card">
    <h2>{{ name }}</h2>
    <span>{{ role }}</span>
    <button @click="handleClick">Select</button>
  </div>
</template>
```

### API Integration
```vue
<script setup lang="ts">
const { $api } = useNuxtApp()
const { $toast } = useNuxtApp()

const { data: users, refresh } = await useAsyncData(
  'users',
  () => $api('/users')
)

const handleCreate = async () => {
  await $api('/users', { method: 'post', body: { name: 'New' } })
  $toast.success('Created!')
  await refresh()
}
</script>
```

---

## AI Assistant Instructions

When generating Vue 3 code for this project:

1. **Always call composables at top level** of `<script setup>`
2. **Never put composable calls inside methods or event handlers**
3. **Always use TypeScript** with proper type annotations
4. **Prefer destructuring** for `defineProps`
5. **Follow macro order**: `defineOptions` → `defineProps` → `defineEmits` → `defineSlots`

### Template for New Components

```vue
<script setup lang="ts">
defineOptions({ name: 'ComponentName' })

// Props
const { prop1, prop2 = 'default' } = defineProps<{
  prop1: string
  prop2?: string
}>()

// Emits
const emit = defineEmits<{
  eventName: [payload: Type]
}>()

// Composables
const { $api } = useNuxtApp()

// State
const state = ref(initialValue)

// Methods
const handleAction = async () => {
  await $api('/endpoint')
  emit('eventName', payload)
}
</script>

<template>
  <div>
    <!-- Template content -->
  </div>
</template>
```

---

## Common Mistakes to Avoid

### ❌ Wrong: Composable in Method
```vue
<script setup lang="ts">
const handleSubmit = async () => {
  const { $api } = useNuxtApp()  // ❌
  await $api('/endpoint')
}
</script>
```

### ✅ Correct: Top Level
```vue
<script setup lang="ts">
const { $api } = useNuxtApp()  // ✅

const handleSubmit = async () => {
  await $api('/endpoint')
}
</script>
```

### ❌ Wrong: Lifecycle After Await
```vue
<script setup lang="ts">
async function setup() {
  await fetchData()
  onMounted(() => {})  // ❌ Lost context
}
</script>
```

### ✅ Correct: Top Level
```vue
<script setup lang="ts">
onMounted(() => {  // ✅
  fetchData()
})
</script>
```

### ❌ Wrong: Wrong Macro Order
```vue
<script setup lang="ts">
const emit = defineEmits(['update'])  // ❌
const { title } = defineProps<{ title: string }>()
defineOptions({ name: 'MyComponent' })
</script>
```

### ✅ Correct: Proper Order
```vue
<script setup lang="ts">
defineOptions({ name: 'MyComponent' })  // ✅
const { title } = defineProps<{ title: string }>()
const emit = defineEmits(['update'])
</script>
```

---

## Validation

Run these commands to verify compliance:

```bash
# Lint and auto-fix
pnpm lint --fix

# Type check
pnpm typecheck
```

Violations will be flagged as:
- 🔴 `error`: Must fix before committing
- 🟡 `warning`: Should fix for consistency

---

## References

- [Vue 3 Composition API Documentation](https://vuejs.org/api/composition-api-setup.html)
- [eslint-plugin-vue-composable](https://github.com/ktsn/eslint-plugin-vue-composable)
- [Project Rules: 03-frontend.md](/.opencode/rules/03-frontend.md)
- [Vue Skill: Composables](/.opencode/skills/vue/references/composables.md)
