---
name: nuxt-ui
description: 使用 Nuxt UI 构建现代化、响应式且可访问的 Vue 应用程序。包含 100+ 基于 Tailwind CSS 和 Reka UI 的组件。
---

# Nuxt-Ui Skill

Comprehensive assistance with nuxt-ui development, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:

- Working with nuxt-ui
- Asking about nuxt-ui features or APIs
- Implementing nuxt-ui solutions
- Debugging nuxt-ui code
- Learning nuxt-ui best practices

## Quick Reference

### Common Patterns

_Quick reference patterns will be added as you use the skill._

### Example Code Patterns

**Example 1** (vue):

```vue
<template>
  <UError />
</template>
```

**Example 2** (vue):

```vue
<template>
  <UError />
</template>
```

**Example 3** (vue):

```vue
<template>
  <UColorModeImage
    light="https://picsum.photos/id/29/400"
    dark="https://picsum.photos/id/46/400"
    :width="200"
    :height="200" />
</template>
```

**Example 4** (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

**Example 5** (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **ai_tools.md** - Ai Tools documentation
- **getting_started.md** - Getting Started documentation
- **integrations.md** - Integrations documentation
- **theme.md** - Theme documentation

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners

Start with the getting_started or tutorials reference files for foundational concepts.

### For Specific Features

Use the appropriate category reference file (api, guides, etc.) for detailed information.

### For Code Examples

The quick reference section above contains common patterns extracted from the official docs.

## Resources

### references/

Organized documentation extracted from official sources. These files contain:

- Detailed explanations
- Code examples with language annotations
- Links to original documentation
- Table of contents for quick navigation

### scripts/

Add helper scripts here for common automation tasks.

### assets/

Add templates, boilerplate, or example projects here.

## Notes

- This skill was automatically generated from official documentation
- Reference files preserve the structure and examples from source docs
- Code examples include language detection for better syntax highlighting
- Quick reference patterns are extracted from common usage examples in the docs

## Updating

To refresh this skill with updated documentation:

1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information
