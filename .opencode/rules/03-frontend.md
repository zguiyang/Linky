# Frontend Development Guide

Frontend development guidelines for Linky project using Nuxt 4.x.

## Development Guidelines

### Priority 0: Tailwind CSS v4 and Patterns (CRITICAL)

MUST - All frontend styling must use **Tailwind CSS v4** implementation.

**Requirements**:
- Follow **Tailwind CSS v4** specifications strictly
- Use **Tailwind utility classes** for all styling (avoid custom CSS)
- MUST use **[tailwind-patterns](.opencode/skills/tailwind-patterns/)** skill for UI implementation
- Do not reinvent CSS wheels - leverage existing Tailwind patterns
- All UI components must be built using tailwind-patterns skill guidance

**Consult tailwind-patterns skill for**:
- Responsive layouts (grids, flexbox, containers)
- Component patterns (cards, buttons, forms)
- Spacing scale (4, 6, 8, 12, 16, 24)
- Breakpoints (mobile-first: base → sm: → md: → lg:)
- Dark mode support (semantic color tokens)
- Typography patterns (headings, body text, lists)

**Key Principles**:
1. Use Tailwind CSS v4 syntax (`@import "tailwindcss"`)
2. Avoid custom CSS in `<style>` blocks
3. Use Tailwind class names for all visual effects
4. Follow production-ready patterns from tailwind-patterns skill
5. Prioritize semantic tokens over raw colors (`bg-card` not `bg-blue-500`)

### Priority 0.5: Theme Color Management (CRITICAL)

MUST - All theme colors must be managed through **semantic variables** to enable unified control and easy maintenance.

**Requirements**:
- Prohibit hardcoded color values (e.g., `#3b82f6`, `bg-blue-500`, `text-gray-900`)
- Use semantic color variables for all theme-related colors
- Manage theme colors centrally to enable single-point updates

**Three-Level Hierarchy (in priority order)**:

#### Level 1: Nuxt UI Semantic Colors (Highest Priority)
**Use this for all standard UI elements**:

1. **Nuxt UI Components**: Use semantic color props
   ```vue
   <!-- ✅ Correct -->
   <u-button color="primary">Save</u-button>
   <u-badge color="success">Complete</u-badge>
   <u-alert color="warning">Warning</u-alert>
   
   <!-- ❌ Wrong - hardcoded colors -->
   <u-button color="blue">Save</u-button>
   ```

2. **Tailwind Classes with Semantic Colors**
   ```vue
   <!-- ✅ Correct -->
   <div class="bg-primary text-primary-foreground">...</div>
   <p class="text-secondary">...</p>
   <div class="border-warning">...</div>
   
   <!-- ❌ Wrong - hardcoded colors -->
   <div class="bg-blue-500 text-white">...</div>
   <p class="text-gray-500">...</p>
   ```

**Available Semantic Colors** (configured in `web/app/app.config.ts`):
- `primary` - Main CTAs, active navigation, brand elements
- `secondary` - Secondary buttons, alternative actions
- `success` - Success messages, completed states
- `info` - Info alerts, help text, notifications
- `warning` - Warning messages, pending states
- `error` - Error messages, validation errors
- `neutral` - Text, borders, backgrounds, disabled states

#### Level 2: Nuxt UI Semantic CSS Variables
**Use when Tailwind classes are insufficient**:

- Backgrounds: `var(--color-primary)`, `var(--color-primary-50)` ... `var(--color-primary-950)`
- Text: `var(--color-primary-foreground)`, `var(--color-secondary-foreground)`
- Borders: `var(--color-primary-border)`
- All semantic colors support full palette (50-950) and modifiers

```vue
<!-- ✅ Correct - Use CSS variables -->
<style scoped>
.custom-card {
  background: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
}
</style>
```

#### Level 3: Custom CSS Variables (Last Resort)
**Use only when Levels 1 & 2 cannot meet requirements**:

**Define in** `web/app/assets/css/main.css`:
```css
@theme {
  /* Define custom color palette (50-950 required) */
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  /* ... up to --color-brand-950 */
  
  /* Define semantic aliases */
  --color-accent: var(--color-brand-500);
}
```

**Usage**:
```vue
<!-- ✅ Correct - Use custom semantic variables -->
<div class="bg-accent text-accent-foreground">...</div>
<div class="bg-brand-500 hover:bg-brand-600">...</div>
```

**Register in** `web/app/app.config.ts`:
```ts
export default defineAppConfig({
  ui: {
    colors: {
      // Map semantic aliases to theme colors
      brand: 'brand',
      accent: 'brand'
    }
  }
})
```

**Configuration Files**:
- **Runtime colors**: `web/app/app.config.ts` (map semantic names to theme colors)
- **Theme definition**: `web/app/assets/css/main.css` (define color palettes with `@theme`)
- **Global config**: `web/nuxt.config.ts` (extend UI with new semantic colors if needed)

**Benefits**:
- ✅ **Unified Management**: All theme colors controlled from one place
- ✅ **Easy Maintenance**: Change theme colors once, update entire application
- ✅ **Dynamic Updates**: UI automatically responds to theme changes
- ✅ **Reduced Maintenance Cost**: No need to modify each page/component individually
- ✅ **Consistent Design**: Semantic colors ensure visual consistency

**Forbidden Practices**:
- ❌ Hardcoded hex values: `#3b82f6`, `rgb(59, 130, 246)`
- ❌ Hardcoded Tailwind colors: `bg-blue-500`, `text-gray-900`, `border-red-500`
- ❌ Inline styles with colors: `style="color: #000"`
- ❌ Defining same color in multiple places

### Priority 0.7: Component Encapsulation Strategy (CRITICAL)

MUST - All encapsulated components MUST strictly follow this priority order.

**Component Priority Order (from high to low)**:

| Priority | Level | Strategy | Description |
|----------|-------|----------|-------------|
| 1️⃣ | **Level 1** | Full Nuxt UI | Directly use Nuxt UI components without modification |
| 2️⃣ | **Level 2** | Nuxt UI + Tailwind CSS | Extend/enhance Nuxt UI components with Tailwind CSS |
| 3️⃣ | **Level 3** | Reka UI + Tailwind CSS | Build custom components using Reka UI primitives + Tailwind CSS |
| 4️⃣ | **Level 4** | Full Custom | Pure custom implementation with Tailwind CSS only |

**Level 1: Full Nuxt UI Components** ✅ **First Choice**

- **When to use**: Standard UI elements that Nuxt UI provides out of the box
- **Check first**: Use `nuxt-ui MCP service` to query component availability
- **Advantages**: Styled, accessible, themeable, fully tested, maintenance-free
- **Examples**:
  ```vue
  <!-- ✅ Correct -->
  <u-button color="primary">Submit</u-button>
  <u-input v-model="email" placeholder="Enter email" />
  <u-card>
    <u-card-header>Title</u-card-header>
    <u-card-body>Content</u-card-body>
  </u-card>
  <u-modal v-model:open="isOpen">
    <u-modal-title>Confirm</u-modal-title>
    <u-modal-body>Are you sure?</u-modal-body>
  </u-modal>
  ```

**Level 2: Nuxt UI + Tailwind CSS Wrapper** ⚠️ **Extend When Needed**

- **When to use**: Need additional props, slots, or styling beyond Nuxt UI's default
- **Pattern**: Create a wrapper component that encapsulates Nuxt UI component + custom logic
- **Naming**: Prefix with `U` (e.g., `UTagsInput.vue`)
- **Consult**: `nuxt-ui` skill for extension patterns
- **Examples**:
  ```vue
  <!-- ✅ Correct - Enhanced button with custom icon -->
  <template>
    <u-button 
      :color="color" 
      :size="size"
      :disabled="disabled"
      @click="handleClick"
    >
      <i-heroicons-plus v-if="icon === 'plus'" />
      <slot />
    </u-button>
  </template>
  
  <script setup lang="ts">
  import { type PropType } from 'vue'
  
  defineProps({
    icon: { type: String as PropType<'plus' | 'check' | 'x'>, default: null },
    color: { type: String, default: 'primary' },
    size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
    disabled: { type: Boolean, default: false }
  })
  
  const emit = defineEmits<{
    click: [event: MouseEvent]
  }>()
  
  const handleClick = (e: MouseEvent) => {
    emit('click', e)
  }
  </script>
  ```

**Level 3: Reka UI + Tailwind CSS** ⚠️ **When Nuxt UI Lacks Component**

- **When to use**: Nuxt UI does not provide the required component functionality
- **Check availability**:
  1. First query `nuxt-ui MCP service` for Nuxt UI components
  2. Then query `reka-ui skill/components.md` for headless primitives
- **Pattern**: Use Reka UI for accessibility/behavior + Tailwind CSS for styling
- **Naming**: Descriptive name (e.g., `CustomSelect.vue`)
- **Consult**: 
  - `reka-ui` skill for headless component patterns (`asChild`, controlled/uncontrolled)
  - `tailwind-patterns` skill for styling patterns
  - `vue` skill for component structure
- **Examples**:
  ```vue
  <!-- ✅ Correct - Custom select using Reka UI + Tailwind -->
  <template>
    <SelectRoot v-model="selectedValue">
      <SelectTrigger class="w-full border border-gray-300 rounded-md px-3 py-2 text-left">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class="bg-white border border-gray-200 rounded-md shadow-lg p-1">
          <SelectViewport>
            <SelectItem 
              v-for="option in options" 
              :key="option.value" 
              :value="option.value"
              class="px-3 py-2 hover:bg-primary-50 cursor-pointer"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </template>
  ```

**Level 4: Full Custom + Tailwind CSS** ❌ **Last Resort**

- **When to use**: Neither Nuxt UI nor Reka UI has suitable component
- **Requirements**:
  - Must use `tailwind-patterns` skill for styling patterns
  - Must use `vue` skill for component patterns
  - Must use `web-design-guidelines` skill for accessibility review
  - Must ensure WAI-ARIA compliance manually
- **Forbidden**: Using this level when #1-3 can meet requirements

**Decision Workflow**:

```
1. Does Nuxt UI have this component?
   ├─ YES → Use Nuxt UI directly (Level 1)
   └─ NO → Can I extend a related Nuxt UI component?
           ├─ YES → Extend with Tailwind CSS (Level 2)
           └─ NO → Does Reka UI have a headless primitive?
                   ├─ YES → Use Reka UI + Tailwind CSS (Level 3)
                   └─ NO → Use Full Custom + Tailwind CSS (Level 4)
```

**Skills to Consult**:

| Scenario | Required Skills |
|----------|-----------------|
| Nuxt UI component usage | `nuxt-ui` skill + `nuxt-ui MCP service` |
| Extending Nuxt UI components | `nuxt-ui` skill + `tailwind-patterns` skill |
| Reka UI headless components | `reka-ui` skill + `tailwind-patterns` skill |
| Custom component structure | `vue` skill + `tailwind-patterns` skill |
| Accessibility review | `web-design-guidelines` skill |

**Forbidden Practices**:
- ❌ Implementing custom component when Nuxt UI or Reka UI has suitable option
- ❌ Skipping the decision workflow
- ❌ Using Reka UI without consulting `reka-ui` skill
- ❌ Styling without using `tailwind-patterns` skill
- ❌ Creating custom components without accessibility consideration

### Priority 1: Required Skills

MUST - Frontend development requires [nuxt](.opencode/skills/nuxt/) and [nuxt-ui](.opencode/skills/nuxt-ui/) skills.

Consult skills for:
- Pages, routing, composables
- Components, styling, forms

### Priority 2: Use nuxt-ui MCP Service

SHOULD - Use `nuxt-ui` MCP service for component docs.

Query for:
- Props, slots, events
- Usage examples

### Priority 3: Design & Aesthetics Skills

SHOULD - Use design skills for UI/UX guidance and creative implementation:

- **[frontend-design](.opencode/skills/frontend-design/)** - Create distinctive, production-grade frontend interfaces with high design quality. Use when building web components, pages, or applications that require creative, polished code and unique UI design that avoids generic AI aesthetics.

- **[ui-ux-pro-max](.opencode/skills/ui-ux-pro-max/)** - UI/UX design intelligence with extensive design systems, component patterns, and style guidance. Use for comprehensive design planning, component libraries, and systematic UI/UX decision-making.

**Skill Complementarity**:
- `frontend-design`: Focuses on creative execution, distinctive aesthetics, and memorable interface design. Best for visual-heavy features, landing pages, or when you need unique, standout design.
- `ui-ux-pro-max`: Provides systematic design guidance, component patterns, and comprehensive UI/UX frameworks. Best for consistent design systems, dashboards, or when you need structured design decisions.

**When to use each**:
- Use `frontend-design` for: New features, creative layouts, unique visual treatments, distinctive page designs
- Use `ui-ux-pro-max` for: Design systems, component libraries, dashboards, systematic UI patterns, comprehensive style guides

### Priority 4: Refer to Official Docs

SHOULD - Refer to official documentation.

- https://nuxt.com/docs
- https://ui.nuxt.com

## Tech Stack

- **Framework**: Nuxt 4.x
- **Language**: TypeScript
- **UI Library**: Nuxt UI 4.x
- **Styling**: Tailwind CSS 4.x
- **HTTP Client**: Nitro ($fetch)

## Directory Structure

```
web/
├── app/                    # Nuxt application directory
│   ├── pages/             # File-based routing
│   ├── layouts/           # Page layouts
│   ├── components/        # Vue components
│   ├── middleware/        # Route middleware
│   ├── composables/       # Vue composables
│   ├── plugins/           # Nuxt plugins (including API configuration)
│   ├── api/              # TypeScript type definitions
│   ├── stores/           # Pinia stores
│   ├── constants/        # Constants
│   ├── assets/           # Static assets (CSS, images)
│   └── utils/            # Utility functions
├── public/                # Static files
├── nuxt.config.ts         # Nuxt configuration
└── package.json
```

## Common Commands

### Development

```bash
pnpm run dev:web       # Start development server (port 3000)
```

### Code Quality

```bash
pnpm --filter web lint        # Lint code
pnpm --filter web lint --fix  # Auto-fix linting issues
pnpm --filter web typecheck   # Type check
```

### Build

```bash
pnpm --filter web build       # Build for production
pnpm run preview             # Preview production build
```

## Nuxt 4 Conventions

### Pages

**Location**: `app/pages/`

**Conventions**:
- File-based routing system
- Use `<script setup lang="ts">`
- Auto-generated routes
- Named routes via file naming

**Examples**:
```
pages/
├── index.vue              # / (home)
├── auth/
│   ├── sign-in.vue       # /auth/sign-in
│   └── sign-up.vue       # /auth/sign-up
└── workspace/
    ├── bookmarks.vue     # /workspace/bookmarks
    └── memos.vue        # /workspace/memos
```

### Layouts

**Location**: `app/layouts/`

**Conventions**:
- Define page layouts
- Use `<slot />` for page content
- Auto-imported

**Example**:
```vue
<template>
  <div>
    <header>...</header>
    <main>
      <slot />
    </main>
    <footer>...</footer>
  </div>
</template>
```

### Components

**Location**: `app/components/`

**Conventions**:
- Auto-imported in templates
- Use PascalCase for file names
- Nested components support

**Example structure**:
```
components/
├── shared/
│   └── Button.vue
├── BookmarkCard.vue
└── MemoCard.vue
```

### Middleware

**Location**: `app/middleware/`

**Conventions**:
- Route guards and navigation hooks
- Use `.global` suffix for global middleware
- Define using `defineNuxtRouteMiddleware`

**Example**:
```typescript
export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/', '/auth/sign-in']
  if (!publicRoutes.includes(to.path) && !isAuthenticated()) {
    return navigateTo('/auth/sign-in')
  }
})
```

### Composables

**Location**: `app/composables/`

**Conventions**:
- Auto-imported throughout the app
- Use `use` prefix convention
- Reusable reactive logic

**Example**:
```typescript
export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useCookie('auth_token')

  const login = async (credentials: any) => {
    const response = await authApi.login(credentials)
    user.value = response.user
    token.value = response.token
  }

  return { user, token, login }
}
```

## Component Development

### Naming and Usage

**Import in script**: PascalCase
**Use in template**: kebab-case (with `u-` prefix for Nuxt UI)

```vue
<script setup lang="ts">
import TagsInput from '~/components/TagsInput.vue'
import WorkspaceLayout from '~/layouts/workspace.vue'
</script>

<template>
  <workspace-layout>
    <tags-input />
  </workspace-layout>
</template>
```

**Rule applies to all components (custom and Nuxt UI)**:
- `<u-button>`, `<u-input>`, `<u-modal>`, `<u-card>`, `<u-select>`, `<u-textarea>`
- `<u-form>`, `<u-form-field>`, `<u-checkbox>`, `<u-badge>`
- Custom components: `<tags-input>`, `<bookmark-card>`, `<memo-card>`
- Layouts: `<workspace-layout>`, `<auth-layout>`, `<marketing-layout>`

### Nuxt UI Components

**Priority**:
1. **Use Nuxt UI components** - First choice for UI elements
2. **Compose Nuxt UI components** - Combine existing components for complex features
3. **Implement from scratch** - Only when #1 and #2 are not possible

**Common components**:
- Buttons: `<u-button>`
- Inputs: `<u-input>`, `<u-textarea>`
- Cards: `<u-card>`
- Modals: `<u-modal>`
- Forms: `<u-form>`, `<u-form-field>`

Use nuxt-ui MCP service to query component documentation and examples.

### Custom Components

**Naming**: PascalCase (e.g., `BookmarkCard.vue`, `TagsInput.vue`)

**Example**:
```vue
<script setup lang="ts">
defineProps<{
  title: string
  size?: 'sm' | 'md' | 'lg'
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
```

### Script Setup

Always use `<script setup lang="ts">`:
- Define props with `defineProps<T>()`
- Define emits with `defineEmits<T>()`
- Use TypeScript for type safety

### Icons

Prefix with `i-`:
- Heroicons: `i-heroicons-plus`, `i-heroicons-magnifying-glass`, `i-heroicons-bookmark`
- Lucide: `i-lucide-sun`, `i-lucide-moon` (for dark mode)

## API Communication

### Core Files

| File | Purpose |
|------|---------|
| `app/plugins/api.ts` | Global API plugin with interceptors |
| `app/composables/useApi.ts` | SSR-compatible data fetching |
| `app/composables/useHttpError.ts` | Global error handling |

### Calling APIs

**Direct $api**（recommended）:
```typescript
const { $api } = useNuxtApp()

const user = await $api<User>('/auth/me')
await $api.post('/auth/login', { email, password })
await $api.delete(`/bookmarks/${id}`)
```

**useApi**（SSR-compatible）:
```typescript
const { data, pending, refresh } = await useApi<User>('/auth/me')
```

### Type Definitions

**Location**: `app/api/types.ts`

**Usage**:
```typescript
import type { User, Bookmark, Tag } from '~/api/types'

// Use generics for type safety
const user = await $api<User>('/auth/me')
const bookmarks = await $api<Bookmark[]>('/bookmarks')
```

## Styling

### Tailwind CSS v4 Syntax Rules (CRITICAL)

This section documents **Tailwind CSS v4 specific syntax requirements** to avoid common migration mistakes.

#### 1. CSS Variable Syntax (v4 Required)

**⚠️ CRITICAL**: CSS variables in arbitrary values MUST use parentheses, NOT square brackets.

```vue
<!-- ✅ Correct (v4 syntax) -->
<div class="bg-(--bg-surface) border-(--border-subtle) text-(--text-primary)">

<!-- ❌ Wrong (v3 syntax - will cause IDE warnings) -->
<div class="bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]">
```

**Pattern**: `property-[var(--name)]` → `property-(--name)`

| Property | v3 (Wrong) | v4 (Correct) |
|----------|-----------|-------------|
| background | `bg-[var(--x)]` | `bg-(--x)` |
| color | `text-[var(--x)]` | `text-(--x)` |
| border color | `border-[var(--x)]` | `border-(--x)` |
| width | `w-[var(--x)]` | `w-(--x)` |
| height | `h-[var(--x)]` | `h-(--x)` |

#### 2. Flex Utility Shorthand (v3+ Recommended)

**Flex utilities have shorter aliases** (introduced in v3, recommended in v4):

```vue
<!-- ✅ Correct (shorthand, recommended) -->
<div class="shrink-0 grow">

<!-- ❌ Wrong (full names, legacy) -->
<div class="flex-shrink-0 flex-grow">
```

| Legacy (Avoid) | Shorthand (Preferred) |
|----------------|----------------------|
| `flex-shrink-0` | `shrink-0` |
| `flex-shrink` | `shrink` |
| `flex-grow` | `grow` |
| `flex-grow-0` | `grow-0` |
| `flex-none` | `flex-none` (unchanged) |

#### 3. Gradient Syntax (v4 Required)

```vue
<!-- ✅ Correct (v4 syntax) -->
<div class="bg-linear-to-r from-primary-500 to-primary-600">

<!-- ❌ Wrong (v3 syntax) -->
<div class="bg-gradient-to-r from-primary-500 to-primary-600">
```

**Pattern**: `bg-gradient-to-r` → `bg-linear-to-r`

#### 4. CSS Import (v4 Required)

```css
/* ✅ Correct (v4 syntax) */
@import "tailwindcss";
@import "@nuxt/ui";

/* ❌ Wrong (v3 syntax) */
/* @tailwind base; */
/* @tailwind components; */
/* @tailwind utilities; */
```

---

### Tailwind CSS v4 Migration Checklist

When working with this project, ensure all new code follows v4 syntax:

- [ ] CSS variables use `property-(--name)` not `property-[var(--name)]`
- [ ] Flex utilities use `shrink`, `grow` not `flex-shrink`, `flex-grow`
- [ ] Gradients use `bg-linear-to-r` not `bg-gradient-to-r`
- [ ] CSS imports use `@import "tailwindcss"` not `@tailwind` directives

**Migration Tool**: If encountering legacy syntax, run `npx @tailwindcss/upgrade` in the `web/` directory to auto-migrate.

---

### Tailwind CSS v4 (CRITICAL)

**Requirements**:
- **MUST** use Tailwind CSS v4 syntax (`@import "tailwindcss"`)
- **MUST** use Tailwind utility classes for ALL styling
- **MUST** avoid custom CSS in `<style>` blocks unless absolutely necessary
- **MUST** use **[tailwind-patterns](.opencode/skills/tailwind-patterns/)** skill for implementation
- **MUST** follow Tailwind CSS v4 specifications

**Key Rules**:
1. Use Tailwind class names for all visual effects - NO custom CSS
2. Avoid reinventing CSS wheels - leverage existing patterns
3. Use semantic color tokens (`bg-card`, `text-foreground`) not raw colors (`bg-blue-500`)
4. Apply mobile-first responsive design (base → sm: → md: → lg:)
5. Use consistent spacing scale (4, 6, 8, 12, 16, 24)

**Example**:
```vue
<template>
  <u-button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
    Click me
  </u-button>
</template>
```

**When Custom CSS is Allowed** (RARE):
- Only when Tailwind cannot achieve: effect
- Must be documented with `/* Custom CSS: reason */`
- Prefer using `@layer utilities` in `main.css` over component `<style>` blocks

**Location**: `app/assets/css/main.css` for global styles and Tailwind v4 imports

**Learn Patterns**:
- Consult **[tailwind-patterns](.opencode/skills/tailwind-patterns/)** skill for all UI implementations
- Use production-ready patterns from skill (layouts, cards, forms, buttons, typography)

## Configuration

**Location**: `nuxt.config.ts`

**Key configurations**:
- Modules: `@nuxt/eslint`, `@nuxt/ui`
- Runtime config: API base URL, app name
- CSS: Global styles
- ESLint configuration

**Example**:
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3333',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Linky'
    }
  }
})
```

## Environment Variables

**Reference**: `web/.env.example`

**Key variables**:
- `NUXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NUXT_PUBLIC_APP_NAME` - Application name

**Usage**:
```typescript
const config = useRuntimeConfig()
const apiUrl = config.public.apiBaseUrl
const appName = config.public.appName
```

## External Documentation

### Nuxt Documentation

- **Official docs**: https://nuxt.com/docs
- **Use nuxt skill**: Available in `.opencode/skills/nuxt/`
  - `project-setup.md` - Project setup and configuration
  - `routing.md` - File-based routing
  - `nuxt-components.md` - Nuxt components
  - `nuxt-composables.md` - Nuxt composables
  - `nuxt-config.md` - Configuration options

### Nuxt UI Components

- **Official docs**: https://ui.nuxt.com
- **Use nuxt-ui skill**: Available in `.opencode/skills/nuxt-ui/`
- **MCP service**: Use nuxt-ui MCP service to query component documentation

### Tailwind CSS v4

- **Official docs**: https://tailwindcss.com/docs
- **Use tailwind-patterns skill**: Available in `.opencode/skills/tailwind-patterns/`
  - `SKILL.md` - Complete Tailwind CSS v4 patterns reference
  - `rules/tailwind-patterns.md` - Common mistakes and corrections
  - `references/` - Detailed patterns for layouts, cards, forms, buttons, typography, navigation, and dark mode

### TypeScript

- All components use TypeScript
- Enable strict type checking
- Define props, emits, and return types
- For complex type logic, refer to [typescript-advanced-types](.opencode/skills/typescript-advanced-types/) skill

## Error Handling

### Principle
- **General case**: No try-catch needed, API plugin handles automatically
- **Special cases**: Use try-catch when needed (see below)

### Auto Handling
- **401 errors**: Clear token, redirect to login, show error toast
- **Other errors**: Show error toast automatically

### When to Use try-catch
- Page initialization data fetching (prevent crash)
- Specific error logic needed (retry, rollback)
- Error logging required

## Vue 3 Composition API Best Practices

### Priority 0.3: Composables Top-Level Only (CRITICAL)

**Rule**: Composables must be called at the top level of `<script setup>`, never in event handlers, conditionals, loops, or nested functions.

**✅ Correct**:
```vue
<script setup lang="ts">
// Top-level: Call composables once
const { $api } = useNuxtApp()
const colorMode = useColorMode()
const toast = useToast()

// Use in methods
const handleSubmit = async () => {
  await $api('/endpoint', { method: 'post', body: data })
}
</script>
```

**❌ Wrong**:
```vue
<script setup lang="ts">
// Wrong: Call composable inside method
const handleSubmit = async () => {
  const { $api } = useNuxtApp()  // ❌ Violation
  await $api('/endpoint', { method: 'post' })
}
</script>
```

**Why This Matters**:
1. Composables may have lifecycle context that is lost when called late
2. Repeated calls create unnecessary overhead
3. Code becomes harder to maintain and refactor
4. Violates Vue 3 Composition API best practices

**Enforced by**: `eslint-plugin-vue-composable` rule `vue-composable/composable-placement`

---

### Priority 0.4: Lifecycle Hooks Placement (CRITICAL)

**Rule**: Lifecycle hooks (`onMounted`, `onUnmounted`, `watch`, etc.) must be called at the top level of `<script setup>` or inside other composables, never after an `await` expression or in event handlers.

**✅ Correct**:
```vue
<script setup lang="ts">
onMounted(() => {
  console.log('Component mounted')
})

const handleClick = () => {
  // Lifecycle hooks already set up
}
</script>
```

**❌ Wrong**:
```vue
<script setup lang="ts">
const handleClick = () => {
  onMounted(() => {})  // ❌ Violation
}

async function setupData() {
  await fetchData()
  onMounted(() => {})  // ❌ Violation - after await
}
</script>
```

**Enforced by**: `eslint-plugin-vue-composable` rule `vue-composable/lifecycle-placement`

---

### Priority 0.5: Vue 3 Macro Order

**Rule**: Define macros in `<script setup>` must follow a specific order.

**Required Order**:
1. `defineOptions`
2. `defineProps`
3. `defineEmits`
4. `defineSlots`

**✅ Correct**:
```vue
<script setup lang="ts">
defineOptions({ name: 'MyComponent' })

const { title } = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  update: [value: string]
}>()

const slots = defineSlots<{
  default: () => VNode
}>()
</script>
```

**❌ Wrong**:
```vue
<script setup lang="ts">
const emit = defineEmits(['update'])  // ❌ Wrong order
const { title } = defineProps<{ title: string }>()
defineOptions({ name: 'MyComponent' })
</script>
```

**Enforced by**: `vue/define-macros-order` rule

---

### Priority 0.6: Props Destructuring Pattern

**Rule**: Prefer destructuring `defineProps` for better TypeScript inference and default value support.

**✅ Correct**:
```vue
<script setup lang="ts">
// With TypeScript syntax
const { msg = 'Hello' } = defineProps<{
  msg?: string
}>()

// With options syntax
const { size = 'md', color = 'primary' } = defineProps({
  size: { type: String, default: 'md' },
  color: { type: String, default: 'primary' }
})
</script>
```

**❌ Wrong**:
```vue
<script setup lang="ts">
// ❌ Not destructured - harder to extract values
const props = defineProps<{
  msg?: string
}>()

// ❌ withDefaults cannot be used with destructuring
const { msg } = withDefaults(defineProps<{ msg?: string }>(), { msg: 'Hello' })
</script>
```

**Enforced by**: `vue/define-props-destructuring` rule (warning)

**Benefits**:
- Direct variable access without `props.value`
- Type-safe default values
- Cleaner template usage
- Better IDE auto-complete

---

### Priority 0.7: API Access Pattern

**Rule**: Access `$api` through NuxtApp plugin only at component setup level.

**Pattern**:
```typescript
// 1. In components - Call useNuxtApp() ONCE at top level
const { $api } = useNuxtApp()

// 2. Use throughout component
const handleSave = async () => {
  await $api('/users', { method: 'post', body: data })
}
```

**Pinia Stores Exception**:
```typescript
// In Pinia stores, useNuxtApp() is acceptable
export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()  // ✅ OK in Pinia
  // ...
})
```

**Enforced by**: `vue-composable/composable-placement` rule

---

### ESLint Configuration

This project uses `eslint-plugin-vue-composable` to enforce Vue 3 Composition API best practices.

**Required Dependencies**:
```bash
pnpm add -D eslint-plugin-vue-composable
```

**Configuration** (`web/eslint.config.mjs`):
```javascript
import vueComposable from 'eslint-plugin-vue-composable'

export default withNuxt({
  plugins: {
    'vue-composable': vueComposable
  },
  rules: {
    'vue-composable/composable-placement': 'error',
    'vue-composable/lifecycle-placement': 'error',
    'vue/define-macros-order': ['error', {
      order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
    }],
    'vue/define-props-destructuring': 'warn'
  }
})
```

**Validation Commands**:
```bash
# Lint and auto-fix
pnpm lint --fix

# Type check
pnpm typecheck
```
