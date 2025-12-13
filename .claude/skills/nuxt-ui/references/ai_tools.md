# Nuxt-Ui - Ai Tools

**Pages:** 112

---

## InputMenu

**URL:** llms-txt#inputmenu

**Contents:**

- Usage
  - Items
  - Value Key
  - Multiple
  - Delete Icon
  - Placeholder
  - Content
  - Arrow
  - Color
  - Variant

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::tip
Use this over an [`Input`](https://ui.nuxt.com/docs/components/input) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox){rel="nofollow"} component that offers autocomplete capabilities.
::

::note
This component is similar to the [`SelectMenu`](https://ui.nuxt.com/docs/components/select-menu) but it's using an Input instead of a Select.
::

Use the `items` prop as an array of strings, numbers or booleans:

You can also pass an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`type?: "label" | "separator" | "item"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-items-type)
- [`icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-icons-in-items)
- [`avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-avatar-in-items)
- [`chip?: ChipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-chip-in-items)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { tagsItem?: ClassNameValue, tagsItemText?: ClassNameValue, tagsItemDelete?: ClassNameValue, tagsItemDeleteIcon?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can also pass an array of arrays to the `items` prop to display separated groups of items.

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

Use the `multiple` prop to allow multiple selections, the selected items will be displayed as tags.

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

With `multiple`, use the `delete-icon` prop to customize the delete [Icon](https://ui.nuxt.com/docs/components/icon) in the tags. Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `placeholder` prop to set a placeholder text.

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the InputMenu.

Use the `color` prop to change the ring color when the InputMenu is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the InputMenu.

Use the `size` prop to change the size of the InputMenu.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the InputMenu.

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-chevron-down`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `i-lucide-check`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the InputMenu.

Use the `loading` prop to show a loading icon on the InputMenu.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the InputMenu.

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

### With icon in items

You can use the `icon` property to display an [Icon](https://ui.nuxt.com/docs/components/icon) inside the items.

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the items.

::tip
You can also use the `#leading` slot to display the selected avatar.
::

### With chip in items

You can use the `chip` property to display a [Chip](https://ui.nuxt.com/docs/components/chip) inside the items.

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the InputMenu by pressing ``.
::

### Control open state on focus

You can use the `open-on-focus` or `open-on-click` props to open the menu when the input is focused or clicked.

### Control search term

Use the `v-model:search-term` directive to control the search term.

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::note
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
::

::tip{to="https://ui.nuxt.com/#emits"}
Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.
::

### With fetched items

You can fetch items from an API and use them in the InputMenu.

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced){rel="nofollow"} to debounce the API calls.
::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

### With virtualization :badge{.align-text-top label="4.1+"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{target="\_blank" to="https://github.com/unovue/reka-ui/issues/1885"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

### With full content width

You can expand the content to the full width of its items by adding the `min-w-fit` class on the `ui.content` slot.

::tip
You can also change the content width globally in your `app.config.ts`:

### As a CountryPicker

This example demonstrates using the InputMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

---

This component also supports all native `<input>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                           | Type                  |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `inputRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLInputElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <UInputMenu model-value="Backlog" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { InputMenuItem } from '@nuxt/ui';

  const items = ref<InputMenuItem[]>([
    {
      label: 'Backlog',
    },
    {
      label: 'Todo',
    },
    {
      label: 'In Progress',
    },
    {
      label: 'Done',
    },
  ]);
</script>

<template>
  <UInputMenu :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
    ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  ]);
</script>

<template>
  <UInputMenu model-value="Apple" :items="items" />
</template>
```

---

## Alert

**URL:** llms-txt#alert

**Contents:**

- Usage
  - Title
  - Description
  - Icon
  - Avatar
  - Color
  - Variant
  - Close
  - Close Icon
  - Actions

Use the `title` prop to set the title of the Alert.

Use the `description` prop to set the description of the Alert.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon).

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar).

Use the `color` prop to change the color of the Alert.

Use the `variant` prop to change the variant of the Alert.

Use the `close` prop to display a [Button](https://ui.nuxt.com/docs/components/button) to dismiss the Alert.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `actions` prop to add some [Button](https://ui.nuxt.com/docs/components/button) actions to the Alert.

Use the `orientation` prop to change the orientation of the Alert.

Use the `class` prop to override the base styles of the Alert.

Use the `ui` prop to override the slots styles of the Alert.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UAlert title="Heads up!" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UAlert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide-terminal" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UAlert title="Heads up!" description="You can change the primary color in your app config." />
</template>
```

---

## InputNumber

**URL:** llms-txt#inputnumber

**Contents:**

- Usage
  - Min / Max
  - Step
  - Orientation
  - Placeholder
  - Color
  - Variant
  - Size
  - Disabled
  - Increment / Decrement

Use the `v-model` directive to control the value of the InputNumber.

Use the `default-value` prop to set the initial value when you do not need to control its state.

::note
This component relies on the [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html){rel="nofollow"} package which provides utilities for formatting and parsing numbers across locales and numbering systems.
::

Use the `min` and `max` props to set the minimum and maximum values of the InputNumber.

Use the `step` prop to set the step value of the InputNumber.

Use the `orientation` prop to change the orientation of the InputNumber.

Use the `placeholder` prop to set a placeholder text.

Use the `color` prop to change the ring color when the InputNumber is focused.

Use the `variant` prop to change the variant of the InputNumber.

Use the `size` prop to change the size of the InputNumber.

Use the `disabled` prop to disable the InputNumber.

### Increment / Decrement

Use the `increment` and `decrement` props to customize the increment and decrement buttons with any [Button](https://ui.nuxt.com/docs/components/button) props. Defaults to `{ variant: 'link' }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

### Increment / Decrement Icons

Use the `increment-icon` and `decrement-icon` props to customize the buttons [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-plus` / `i-lucide-minus`.

### With decimal format

Use the `format-options` prop to customize the format of the value.

### With percentage format

Use the `format-options` prop with `style: 'percent'` to customize the format of the value.

### With currency format

Use the `format-options` prop with `style: 'currency'` to customize the format of the value.

You can use the `increment` and `decrement` props to control visibility of the buttons.

### Within a FormField

You can use the InputNumber within a [FormField](https://ui.nuxt.com/docs/components/form-field) component to display a label, help text, required indicator, etc.

Use the `#increment` and `#decrement` slots to customize the buttons.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

---

This component also supports all native `<input>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                           | Type                  |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `inputRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLInputElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UInputNumber :model-value="5" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UInputNumber :default-value="5" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UInputNumber :model-value="5" :min="0" :max="10" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UInputNumber :model-value="5" :step="2" />
</template>
```

---

## DashboardSearch

**URL:** llms-txt#dashboardsearch

**Contents:**

- Usage
  - Shortcut
  - Color Mode
- API
  - Props
  - Slots
  - Emits
  - Expose
- Theme
- Changelog

The DashboardSearch component extends the [CommandPalette](https://ui.nuxt.com/docs/components/command-palette) component, so you can pass any property such as `icon`, `placeholder`, etc.

Use it inside the default slot of the [DashboardGroup](https://ui.nuxt.com/docs/components/dashboard-group) component:

::tip
You can open the CommandPalette by pressing ` `, by using the [DashboardSearchButton](https://ui.nuxt.com/docs/components/dashboard-search-button) component or by using a `v-model:open`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts"} directive.
::

Use the `shortcut` prop to change the shortcut used in [defineShortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts) to open the ContentSearch component. Defaults to `meta_k` (` `).

By default, a group of commands will be added to the command palette so you can switch between light and dark mode. This will only take effect if the `colorMode` is not forced in a specific page which can be achieved through `definePageMeta`:

You can disable this behavior by setting the `color-mode` prop to `false`:

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                                    | Type                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `commandPaletteRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<InstanceType<typeof UCommandPalette> | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
You can open the CommandPalette by pressing `` ``, by using the [DashboardSearchButton](https://ui.nuxt.com/docs/components/dashboard-search-button) component or by using a `v-model:open`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts"} directive.
::

### Shortcut

Use the `shortcut` prop to change the shortcut used in [defineShortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts) to open the ContentSearch component. Defaults to `meta_k` (`` ``).
```

Example 2 (unknown):

```unknown
### Color Mode

By default, a group of commands will be added to the command palette so you can switch between light and dark mode. This will only take effect if the `colorMode` is not forced in a specific page which can be achieved through `definePageMeta`:
```

Example 3 (unknown):

```unknown
You can disable this behavior by setting the `color-mode` prop to `false`:
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## Timeline

**URL:** llms-txt#timeline

**Contents:**

- Usage
  - Items
  - Color
  - Size
  - Orientation
  - Reverse
- Examples
  - Control active item
  - With alternating layout
  - With custom slot

Use the Timeline component to display a list of items in a timeline.

Use the `items` prop as an array of objects with the following properties:

- `date?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `title?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string | number`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, indicator?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, date?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `color` prop to change the color of the active items in a Timeline.

Use the `size` prop to change the size of the Timeline.

Use the `orientation` prop to change the orientation of the Timeline. Defaults to `vertical`.

Use the reverse prop to reverse the direction of the Timeline.

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index.

### With alternating layout

Use the `ui` prop to create a Timeline with alternating layout.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-indicator`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-date`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-title`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-description`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the available slots to create a more complex Timeline.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      date: 'Mar 15, 2025',
      title: 'Project Kickoff',
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
      icon: 'i-lucide-rocket',
    },
    {
      date: 'Mar 22 2025',
      title: 'Design Phase',
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
      icon: 'i-lucide-palette',
    },
    {
      date: 'Mar 29 2025',
      title: 'Development Sprint',
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
      icon: 'i-lucide-code',
    },
    {
      date: 'Apr 5 2025',
      title: 'Testing & Deployment',
      description: 'QA testing and performance optimization. Deployed the application to production.',
      icon: 'i-lucide-check-circle',
    },
  ]);
</script>

<template>
  <UTimeline :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { TimelineItem } from '@nuxt/ui';

  const items = ref<TimelineItem[]>([
    {
      date: 'Mar 15, 2025',
      title: 'Project Kickoff',
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
      icon: 'i-lucide-rocket',
    },
    {
      date: 'Mar 22 2025',
      title: 'Design Phase',
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
      icon: 'i-lucide-palette',
    },
    {
      date: 'Mar 29 2025',
      title: 'Development Sprint',
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
      icon: 'i-lucide-code',
    },
    {
      date: 'Apr 5 2025',
      title: 'Testing & Deployment',
      description: 'QA testing and performance optimization. Deployed the application to production.',
      icon: 'i-lucide-check-circle',
    },
  ]);
</script>

<template>
  <UTimeline :default-value="2" class="w-96" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { TimelineItem } from '@nuxt/ui';

  const items = ref<TimelineItem[]>([
    {
      date: 'Mar 15, 2025',
      title: 'Project Kickoff',
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
      icon: 'i-lucide-rocket',
    },
    {
      date: 'Mar 22 2025',
      title: 'Design Phase',
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
      icon: 'i-lucide-palette',
    },
    {
      date: 'Mar 29 2025',
      title: 'Development Sprint',
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
      icon: 'i-lucide-code',
    },
    {
      date: 'Apr 5 2025',
      title: 'Testing & Deployment',
      description: 'QA testing and performance optimization. Deployed the application to production.',
      icon: 'i-lucide-check-circle',
    },
  ]);
</script>

<template>
  <UTimeline color="neutral" :default-value="2" class="w-96" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { TimelineItem } from '@nuxt/ui';

  const items = ref<TimelineItem[]>([
    {
      date: 'Mar 15, 2025',
      title: 'Project Kickoff',
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
      icon: 'i-lucide-rocket',
    },
    {
      date: 'Mar 22 2025',
      title: 'Design Phase',
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
      icon: 'i-lucide-palette',
    },
    {
      date: 'Mar 29 2025',
      title: 'Development Sprint',
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
      icon: 'i-lucide-code',
    },
    {
      date: 'Apr 5 2025',
      title: 'Testing & Deployment',
      description: 'QA testing and performance optimization. Deployed the application to production.',
      icon: 'i-lucide-check-circle',
    },
  ]);
</script>

<template>
  <UTimeline size="xs" :default-value="2" class="w-96" :items="items" />
</template>
```

---

## ChatMessages

**URL:** llms-txt#chatmessages

**Contents:**

- Usage
  - Messages
  - Status
  - User
  - Assistant
  - Auto Scroll
  - Auto Scroll Icon
  - Should Auto Scroll
  - Should Scroll To Bottom
- Examples

The ChatMessages component displays a list of [ChatMessage](https://ui.nuxt.com/docs/components/chat-message) components using either the default slot or the `messages` prop.

::callout{icon="i-lucide-rocket"}
This component is purpose-built for AI chatbots with features like:

- Initial scroll to the bottom upon loading ([`shouldScrollToBottom`](https://ui.nuxt.com/#should-scroll-to-bottom)).
- Continuous scrolling down as new messages arrive ([`shouldAutoScroll`](https://ui.nuxt.com/#should-auto-scroll)).
- An "Auto scroll" button appears when scrolled up, allowing users to jump back to the latest messages ([`autoScroll`](https://ui.nuxt.com/#auto-scroll)).
- A loading indicator displays while the assistant is processing ([`status`](https://ui.nuxt.com/#status)).
- Submitted messages are scrolled to the top of the viewport and the height of the last user message is dynamically adjusted.
  ::

Use the `messages` prop to display a list of chat messages.

Use the `status` prop to display a visual indicator when the assistant is processing.

::note
Here's the detail of the different statuses from the AI SDK v5 Chat class:

- `submitted`: The message has been sent to the API and we're awaiting the start of the response stream.
- `streaming`: The response is actively streaming in from the API, receiving chunks of data.
- `ready`: The full response has been received and processed; a new user message can be submitted.
- `error`: An error occurred during the API request, preventing successful completion.
  ::

Use the `user` prop to change the [ChatMessage](https://ui.nuxt.com/docs/components/chat-message) props for `user` messages. Defaults to:

- `side: 'right'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant: 'soft'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `assistant` prop to change the [ChatMessage](https://ui.nuxt.com/docs/components/chat-message) props for `assistant` messages. Defaults to:

- `side: 'left'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant: 'naked'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `auto-scroll` prop to customize or hide the auto scroll button (with `false` value) displayed when scrolling to the top of the chat. Defaults to:

- `color: 'neutral'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant: 'outline'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `auto-scroll-icon` prop to customize the auto scroll button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-arrow-down`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.arrowDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.arrowDown` key.
:::
::

### Should Auto Scroll

Use the `should-auto-scroll` prop to enable/disable continuous auto scroll while messages are streaming. Defaults to `false`.

### Should Scroll To Bottom

Use the `should-scroll-to-bottom` prop to enable/disable bottom auto scroll when the component is mounted. Defaults to `true`.

::note{target="\_blank" to="https://ai-sdk.dev/docs/getting-started/nuxt"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

## ::callout

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt-ui-templates/chat

---

Check out the source code of our **AI Chat template** on GitHub for a real-life example.
::

Use the ChatMessages component with the `Chat` class from AI SDK v5 to display a list of chat messages within a page.

Pass the `messages` prop alongside the `status` prop that will be used for the auto scroll and the indicator display.

::note
In this example, we use the `MDC` component from [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc){rel="nofollow"} to render the content of the message. The `getTextFromMessage` utility extracts the text content from the AI SDK V5 message parts. As Nuxt UI provides pre-styled prose components, your content will be automatically styled.
::

### With indicator slot

You can customize the loading indicator that appears when the status is `submitted`.

::tip
You can use all the slots of the [`ChatMessage`](https://ui.nuxt.com/docs/components/chat-message#slots) component inside ChatMessages, they are automatically forwarded allowing you to customize individual messages when using the `messages` prop.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout{icon="i-lucide-rocket"}
This component is purpose-built for AI chatbots with features like:

- Initial scroll to the bottom upon loading ([`shouldScrollToBottom`](https://ui.nuxt.com/#should-scroll-to-bottom)).
- Continuous scrolling down as new messages arrive ([`shouldAutoScroll`](https://ui.nuxt.com/#should-auto-scroll)).
- An "Auto scroll" button appears when scrolled up, allowing users to jump back to the latest messages ([`autoScroll`](https://ui.nuxt.com/#auto-scroll)).
- A loading indicator displays while the assistant is processing ([`status`](https://ui.nuxt.com/#status)).
- Submitted messages are scrolled to the top of the viewport and the height of the last user message is dynamically adjusted.
::

### Messages

Use the `messages` prop to display a list of chat messages.
```

Example 2 (unknown):

```unknown
### Status

Use the `status` prop to display a visual indicator when the assistant is processing.
```

Example 3 (unknown):

```unknown
::note
Here's the detail of the different statuses from the AI SDK v5 Chat class:

- `submitted`: The message has been sent to the API and we're awaiting the start of the response stream.
- `streaming`: The response is actively streaming in from the API, receiving chunks of data.
- `ready`: The full response has been received and processed; a new user message can be submitted.
- `error`: An error occurred during the API request, preventing successful completion.
::

### User

Use the `user` prop to change the [ChatMessage](https://ui.nuxt.com/docs/components/chat-message) props for `user` messages. Defaults to:

- `side: 'right'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant: 'soft'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

Example 4 (unknown):

```unknown
### Assistant

Use the `assistant` prop to change the [ChatMessage](https://ui.nuxt.com/docs/components/chat-message) props for `assistant` messages. Defaults to:

- `side: 'left'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant: 'naked'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

---

## FormField

**URL:** llms-txt#formfield

**Contents:**

- Usage
  - Label
  - Description
  - Hint
  - Help
  - Error
  - Size
- API
  - Props
  - Slots

Wrap any form component with a FormField. Used in a [Form](https://ui.nuxt.com/docs/components/form), it provides validation and error handling.

Use the `label` prop to set the label for the form control.

::note
The label `for` attribute and the form control are associated with a unique `id` if not provided.
::

When using the `required` prop, an asterisk is added next to the label.

Use the `description` prop to provide additional information below the label.

Use the `hint` prop to display a hint message next to the label.

Use the `help` prop to display a help message below the form control.

Use the `error` prop to display an error message below the form control. When used together with the `help` prop, the `error` prop takes precedence.

When used inside a [Form](https://ui.nuxt.com/docs/components/form), this is automatically set when a validation error occurs.

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/design-system#colors"}
This sets the `color` to `error` on the form control. You can change it globally in your `app.config.ts`.
::

Use the `size` prop to change the size of the FormField, the `size` is proxied to the form control.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UFormField label="Email">
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

Example 2 (vue):

```vue
<template>
  <UFormField label="Email" required>
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

Example 3 (vue):

```vue
<template>
  <UFormField label="Email" description="We'll never share your email with anyone else.">
    <UInput placeholder="Enter your email" class="w-full" />
  </UFormField>
</template>
```

Example 4 (vue):

```vue
<template>
  <UFormField label="Email" hint="Optional">
    <UInput placeholder="Enter your email" />
  </UFormField>
</template>
```

---

## Carousel

**URL:** llms-txt#carousel

**Contents:**

- Usage
  - Items
  - Orientation
  - Arrows
  - Prev / Next
  - Prev / Next Icons
  - Dots
- Plugins
  - Autoplay
  - Auto Scroll

Use the Carousel component to display a list of items in a carousel.

::note
Use your mouse to drag the carousel horizontally on desktop.
::

Use the `items` prop as an array and render each item using the default slot:

You can also pass an array of objects with the following properties:

- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can control how many items are visible by using the [`basis`](https://tailwindcss.com/docs/flex-basis){rel="nofollow"} / [`width`](https://tailwindcss.com/docs/width){rel="nofollow"} utility classes on the `item`:

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

::note
Use your mouse to drag the carousel vertically on desktop.
::

::caution
You need to specify a `height` on the container in vertical orientation.
::

Use the `arrows` prop to display prev and next buttons.

Use the `prev` and `next` props to customize the prev and next buttons with any [Button](https://ui.nuxt.com/docs/components/button) props.

### Prev / Next Icons

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-arrow-left` / `i-lucide-arrow-right`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize these icons globally in your `app.config.ts` under `ui.icons.arrowLeft` / `ui.icons.arrowRight` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize these icons globally in your `vite.config.ts` under `ui.icons.arrowLeft` / `ui.icons.arrowRight` key.
:::
::

Use the `dots` prop to display a list of dots to scroll to a specific slide.

The number of dots is based on the number of slides displayed in the view:

The Carousel component implements the official [Embla Carousel plugins](https://www.embla-carousel.com/plugins/){rel="nofollow"}.

This plugin is used to extend Embla Carousel with **autoplay** functionality.

Use the `autoplay` prop as a boolean or an object to configure the [Autoplay plugin](https://www.embla-carousel.com/plugins/autoplay/){rel="nofollow"}.

::note
In this example, we're using the `loop` prop for an infinite carousel.
::

This plugin is used to extend Embla Carousel with **auto scroll** functionality.

Use the `auto-scroll` prop as a boolean or an object to configure the [Auto Scroll plugin](https://www.embla-carousel.com/plugins/auto-scroll/){rel="nofollow"}.

::note
In this example, we're using the `loop` prop for an infinite carousel.
::

This plugin is used to extend Embla Carousel with **auto height** functionality. It changes the height of the carousel container to fit the height of the highest slide in view.

Use the `auto-height` prop as a boolean or an object to configure the [Auto Height plugin](https://www.embla-carousel.com/plugins/auto-height/){rel="nofollow"}.

::note
In this example, we add the `transition-[height]` class on the container to animate the height change.
::

Class Names is a **class name toggle** utility plugin for Embla Carousel that enables you to automate the toggling of class names on your carousel.

Use the `class-names` prop as a boolean or an object to configure the [Class Names plugin](https://www.embla-carousel.com/plugins/class-names/){rel="nofollow"}.

::note
In this example, we add the `transition-opacity [&:not(.is-snapped)]:opacity-10` classes on the `item` to animate the opacity change.
::

This plugin is used to replace the Embla Carousel scroll functionality with **fade transitions**.

Use the `fade` prop as a boolean or an object to configure the [Fade plugin](https://www.embla-carousel.com/plugins/fade/){rel="nofollow"}.

This plugin is used to extend Embla Carousel with the ability to **use the mouse/trackpad wheel** to navigate the carousel.

Use the `wheel-gestures` prop as a boolean or an object to configure the [Wheel Gestures plugin](https://www.embla-carousel.com/plugins/wheel-gestures/){rel="nofollow"}.

::note
Use your mouse wheel to scroll the carousel.
::

You can use the [`emblaApi`](https://ui.nuxt.com/#expose) function [scrollTo](https://www.embla-carousel.com/api/methods/#scrollto){rel="nofollow"} to display thumbnails under the carousel that allows you to navigate to a specific slide.

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref){rel="nofollow"}.

This will give you access to the following:

| Name                                                                                                                           | Type                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `emblaRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLElement        | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}                                                                          |
| `emblaApi`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | [`Ref<EmblaCarouselType | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}](https://www.embla-carousel.com/api/methods/#typescript){rel="nofollow"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::note
Use your mouse to drag the carousel horizontally on desktop.
::

### Items

Use the `items` prop as an array and render each item using the default slot:
```

Example 2 (unknown):

```unknown
You can also pass an array of objects with the following properties:

- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can control how many items are visible by using the [`basis`](https://tailwindcss.com/docs/flex-basis){rel="nofollow"} / [`width`](https://tailwindcss.com/docs/width){rel="nofollow"} utility classes on the `item`:
```

Example 3 (unknown):

```unknown
### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

::note
Use your mouse to drag the carousel vertically on desktop.
::
```

Example 4 (unknown):

```unknown
::caution
You need to specify a `height` on the container in vertical orientation.
::

### Arrows

Use the `arrows` prop to display prev and next buttons.
```

---

## Drawer

**URL:** llms-txt#drawer

**Contents:**

- Usage
  - Title
  - Description
  - Direction
  - Inset
  - Handle
  - Handle Only
  - Overlay
  - Modal
  - Dismissible

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Drawer.

Then, use the `#content` slot to add the content displayed when the Drawer is open.

You can also use the `#header`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, `#body`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and `#footer`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} slots to customize the Drawer's content.

Use the `title` prop to set the title of the Drawer's header.

Use the `description` prop to set the description of the Drawer's header.

Use the `direction` prop to control the direction of the Drawer. Defaults to `bottom`.

Use the `inset` prop to inset the Drawer from the edges.

Use the `handle` prop to control whether the Drawer has a handle or not. Defaults to `true`.

Use the `handle-only` prop to only allow the Drawer to be dragged by the handle.

Use the `overlay` prop to control whether the Drawer has an overlay or not. Defaults to `true`.

Use the `modal` prop to control whether the Drawer blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

Use the `dismissible` prop to control whether the Drawer is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Drawer's background interactive without closing it.
::

Use the `should-scale-background` prop to scale the background when the Drawer is open, creating a visual depth effect. You can set the `set-background-color-on-scale` prop to `false` to prevent changing the background color.

::warning
Make sure to add the `data-vaul-drawer-wrapper` directive to a parent element of your app to make this work.

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Drawer by pressing ``.
::

::tip
This allows you to move the trigger outside of the Drawer or remove it entirely.
::

### Responsive drawer

You can render a [Modal](https://ui.nuxt.com/docs/components/modal) component on desktop and a Drawer on mobile for example.

You can nest drawers within each other by using the `nested` prop.

Use the `#footer` slot to add content after the Drawer's body.

### With command palette

You can use a [CommandPalette](https://ui.nuxt.com/docs/components/command-palette) component inside the Drawer's content.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UDrawer>
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

    <template #content>
      <Placeholder class="h-48 m-4" /> </template
  ></UDrawer>
</template>
```

Example 2 (vue):

```vue
<template>
  <UDrawer title="Drawer with title">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

    <template #body>
      <Placeholder class="h-48" /> </template
  ></UDrawer>
</template>
```

Example 3 (vue):

```vue
<template>
  <UDrawer title="Drawer with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

    <template #body>
      <Placeholder class="h-48" /> </template
  ></UDrawer>
</template>
```

Example 4 (vue):

```vue
<template>
  <UDrawer direction="right">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

    <template #content>
      <Placeholder class="min-w-96 min-h-96 size-full m-4" /> </template
  ></UDrawer>
</template>
```

---

## PricingPlans

**URL:** llms-txt#pricingplans

**Contents:**

- Usage
  - Plans
  - Orientation
  - Compact
  - Scale
- Examples
  - Within a page
- API
  - Props
  - Slots

The PricingPlans component provides a flexible layout to display a list of [PricingPlan](https://ui.nuxt.com/docs/components/pricing-plan) components using either the default slot or the `plans` prop.

::tip
The grid columns will be automatically calculated based on the number of plans, this works with the `plans` prop but also with the default slot.
::

Use the `plans` prop as an array of objects with the properties of the [PricingPlan](https://ui.nuxt.com/docs/components/pricing-plan#props) component.

Use the `orientation` prop to change the orientation of the PricingPlans. Defaults to `horizontal`.

::tip
When using the `plans` prop instead of the default slot, the `orientation` of the plans is automatically reversed, `horizontal` to `vertical` and vice versa.
::

Use the `compact` prop to reduce the padding between the plans when one of the plans is scaled for a better visual balance.

Use the `scale` prop to adjust the spacing between the plans when one of the plans is scaled for a better visual balance.

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PricingPlans component in a page to create a pricing page:

::note
In this example, the `plans` are fetched using `queryCollection` from the `@nuxt/content` module.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
The grid columns will be automatically calculated based on the number of plans, this works with the `plans` prop but also with the default slot.
::

### Plans

Use the `plans` prop as an array of objects with the properties of the [PricingPlan](https://ui.nuxt.com/docs/components/pricing-plan#props) component.
```

Example 2 (unknown):

```unknown
### Orientation

Use the `orientation` prop to change the orientation of the PricingPlans. Defaults to `horizontal`.
```

Example 3 (unknown):

```unknown
::tip
When using the `plans` prop instead of the default slot, the `orientation` of the plans is automatically reversed, `horizontal` to `vertical` and vice versa.
::

### Compact

Use the `compact` prop to reduce the padding between the plans when one of the plans is scaled for a better visual balance.
```

Example 4 (unknown):

```unknown
### Scale

Use the `scale` prop to adjust the spacing between the plans when one of the plans is scaled for a better visual balance.
```

---

## SSR

**URL:** llms-txt#ssr

**Contents:**

- Usage
  - Color Variables Injection
  - Color Scheme Detection
  - Icons Display

When using Nuxt UI with Nuxt.js framework, SSR server will fully work out of the box. However, when using it with pure Vue.js, you will need to pay attention to some details to make it function as expected.

### Color Variables Injection

Nuxt UI, by default, injects to the `<head>` of the document color variables that are used across all components. Since the document is not managed by the UI library in the Vue.js SSR, you will need to inject that manually.

You can do that by using `@unhead` in the following way:

::code-group{sync="vite"}

### Color Scheme Detection

The same goes to the color scheme detection. To avoid flashings in the SSR because of the selected color scheme difference, you will need to detect the user's color scheme before the application initialization.

Adding the script below to the `<head>` of your document will detect if the user is using dark theme, and therefore, render the SSR in the dark theme as well.

::code-group{sync="vite"}

Unfortunately displaying icons with the SSR server of the Vue.js version is currently not supported. The icons will only be displayed after the application is initialized at the user's end.

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown

```

Example 3 (unknown):

```unknown
::

### Color Scheme Detection

The same goes to the color scheme detection. To avoid flashings in the SSR because of the selected color scheme difference, you will need to detect the user's color scheme before the application initialization.

Adding the script below to the `<head>` of your document will detect if the user is using dark theme, and therefore, render the SSR in the dark theme as well.

::code-group{sync="vite"}
```

Example 4 (unknown):

```unknown

```

---

## Skeleton

**URL:** llms-txt#skeleton

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

Use the Skeleton component as-is to display a placeholder.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
## API

### Props
```

Example 2 (unknown):

```unknown
### Slots
```

Example 3 (unknown):

```unknown
## Theme
```

---

## PageColumns

**URL:** llms-txt#pagecolumns

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

The PageColumns component displays content in a responsive multi-column layout. It works well with [PageCard](https://ui.nuxt.com/docs/components/page-card) components or any other elements, adapting from single column on mobile to multiple columns on larger screens.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
## API

### Props
```

Example 2 (unknown):

```unknown
### Slots
```

Example 3 (unknown):

```unknown
## Theme
```

---

## Stepper

**URL:** llms-txt#stepper

**Contents:**

- Usage
  - Items
  - Color
  - Size
  - Orientation
  - Disabled
- Examples
  - With controls
  - Control active item
  - With content slot

Use the Stepper component to display a list of items in a stepper.

Use the `items` prop as an array of objects with the following properties:

- `title?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `content?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string | number`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, trigger?: ClassNameValue, indicator?: ClassNameValue, icon?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
Click on the items to navigate through the steps.
::

Use the `color` prop to change the color of the Stepper.

Use the `size` prop to change the size of the Stepper.

Use the `orientation` prop to change the orientation of the Stepper. Defaults to `horizontal`.

Use the `disabled` prop to disable navigation through the steps.

::note{to="https://ui.nuxt.com/#with-controls"}
This can be useful when you want to force navigation with controls.
::

You can add additional controls for the stepper using buttons.

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index.

### With content slot

Use the `#content` slot to customize the content of each item.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref){rel="nofollow"}.

This will give you access to the following:

| Name                                                                                                                          | Type                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `next`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}    | `() => void`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}   |
| `prev`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}    | `() => void`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}   |
| `hasNext`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<boolean>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |
| `hasPrev`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<boolean>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      title: 'Address',
      description: 'Add your address here',
      icon: 'i-lucide-house',
    },
    {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: 'i-lucide-truck',
    },
    {
      title: 'Checkout',
      description: 'Confirm your order',
    },
  ]);
</script>

<template>
  <UStepper :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { StepperItem } from '@nuxt/ui';

  const items = ref<StepperItem[]>([
    {
      title: 'Address',
      description: 'Add your address here',
      icon: 'i-lucide-house',
    },
    {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: 'i-lucide-truck',
    },
    {
      title: 'Checkout',
      description: 'Confirm your order',
    },
  ]);
</script>

<template>
  <UStepper class="w-full" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { StepperItem } from '@nuxt/ui';

  const items = ref<StepperItem[]>([
    {
      title: 'Address',
      description: 'Add your address here',
      icon: 'i-lucide-house',
    },
    {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: 'i-lucide-truck',
    },
    {
      title: 'Checkout',
      description: 'Confirm your order',
    },
  ]);
</script>

<template>
  <UStepper color="neutral" class="w-full" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { StepperItem } from '@nuxt/ui';

  const items = ref<StepperItem[]>([
    {
      title: 'Address',
      description: 'Add your address here',
      icon: 'i-lucide-house',
    },
    {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: 'i-lucide-truck',
    },
    {
      title: 'Checkout',
      description: 'Confirm your order',
    },
  ]);
</script>

<template>
  <UStepper size="xl" class="w-full" :items="items" />
</template>
```

---

## Accordion

**URL:** llms-txt#accordion

**Contents:**

- Usage
  - Items
  - Multiple
  - Collapsible
  - Unmount
  - Disabled
  - Trailing Icon
- Examples
  - Control active item(s)
  - With drag and drop

Use the Accordion component to display a list of collapsible items.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `trailingIcon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `content?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, header?: ClassNameValue, trigger?: ClassNameValue, leadingIcon?: ClassNameValue, label?: ClassNameValue, trailingIcon?: ClassNameValue, content?: ClassNameValue, body?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Set the `type` prop to `multiple` to allow multiple items to be active at the same time. Defaults to `single`.

When `type` is `single`, you can set the `collapsible` prop to `false` to prevent the active item from collapsing.

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the accordion is collapsed. Defaults to `true`.

::note
You can inspect the DOM to see each item's content being rendered.
::

Use the `disabled` property to disable the Accordion.

You can also disable a specific item by using the `disabled` property in the item object.

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon) of each item. Defaults to `i-lucide-chevron-down`.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

### Control active item(s)

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index **as a string**.

::caution
When `type="multiple"`, ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/){rel="nofollow"} composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html){rel="nofollow"} to enable drag and drop functionality on the Accordion. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/){rel="nofollow"} to provide a seamless drag and drop experience.

Use the `#body` slot to customize the body of each item.

::tip
The `#body` slot includes some pre-defined styles, use the [`#content` slot](https://ui.nuxt.com/#with-content-slot) if you want to start from scratch.
::

### With content slot

Use the `#content` slot to customize the content of each item.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-body`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

### With markdown content

You can use the [MDC](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#mdc){rel="nofollow"} component from `@nuxtjs/mdc` to render markdown in the accordion items.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      label: 'Is Nuxt UI free to use?',
      content:
        'Yes! Nuxt UI is completely free and open source under the MIT license. All 100+ components are available to everyone.',
    },
    {
      label: 'Can I use Nuxt UI with Vue without Nuxt?',
      content:
        'Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.',
    },
    {
      label: 'Is Nuxt UI production-ready?',
      content:
        'Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.',
    },
  ]);
</script>

<template>
  <UAccordion :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { AccordionItem } from '@nuxt/ui';

  const items = ref<AccordionItem[]>([
    {
      label: 'Icons',
      icon: 'i-lucide-smile',
      content: 'You have nothing to do, @nuxt/icon will handle it automatically.',
    },
    {
      label: 'Colors',
      icon: 'i-lucide-swatch-book',
      content: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
    },
  ]);
</script>

<template>
  <UAccordion :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { AccordionItem } from '@nuxt/ui';

  const items = ref<AccordionItem[]>([
    {
      label: 'Icons',
      icon: 'i-lucide-smile',
      content: 'You have nothing to do, @nuxt/icon will handle it automatically.',
    },
    {
      label: 'Colors',
      icon: 'i-lucide-swatch-book',
      content: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
    },
  ]);
</script>

<template>
  <UAccordion type="multiple" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { AccordionItem } from '@nuxt/ui';

  const items = ref<AccordionItem[]>([
    {
      label: 'Icons',
      icon: 'i-lucide-smile',
      content: 'You have nothing to do, @nuxt/icon will handle it automatically.',
    },
    {
      label: 'Colors',
      icon: 'i-lucide-swatch-book',
      content: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
    },
  ]);
</script>

<template>
  <UAccordion :collapsible="false" :items="items" />
</template>
```

---

## DashboardSidebarToggle

**URL:** llms-txt#dashboardsidebartoggle

**Contents:**

- Usage
- Examples
  - Within `toggle` slot
- API
  - Props
- Theme
- Changelog

The DashboardSidebarToggle component is used by the [DashboardNavbar](https://ui.nuxt.com/docs/components/dashboard-navbar) and [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) components.

It is automatically displayed on mobile to toggle the sidebar, **you don't have to add it manually**.

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::note
The button defaults to `color="neutral"` and `variant="ghost"`.
::

### Within `toggle` slot

Even though this component is automatically displayed on mobile, you can use the `toggle` slot of the [DashboardNavbar](https://ui.nuxt.com/docs/components/dashboard-navbar) and [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) components to customize the button.

::tip
When using the `toggle-side` prop of the `DashboardSidebar` and `DashboardNavbar` components, the button will be displayed on the specified side.
::

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UDashboardSidebarToggle />
</template>
```

Example 2 (vue):

```vue
<template>
  <UDashboardSidebarToggle variant="subtle" />
</template>
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

::tip
When using the `toggle-side` prop of the `DashboardSidebar` and `DashboardNavbar` components, the button will be displayed on the specified side.
::

## API

### Props
```

---

## Empty

**URL:** llms-txt#empty

**Contents:**

- Usage
  - Title
  - Description
  - Icon
  - Avatar
  - Actions
  - Variant
  - Size
- Examples
  - With slots

::code-preview
:::u-empty

---

actions: - icon: i-lucide-plus
label: Create new - icon: i-lucide-refresh-cw
label: Refresh
color: neutral
variant: subtle
description: It looks like you haven't added any projects. Create one to get started.
icon: i-lucide-file
title: No projects found

---

:::
::

Use the `title` prop to set the title of the empty state.

Use the `description` prop to set the description of the empty state.

Use the `icon` prop to set the icon of the empty state.

Use the `avatar` prop to set the avatar of the empty state.

Use the `actions` prop to add some [Button](https://ui.nuxt.com/docs/components/button) actions to the empty state.

Use the `variant` prop to change the variant of the empty state.

Use the `size` prop to change the size of the empty state.

Use the available slots to create a more complex empty state.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UEmpty title="No projects found" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UEmpty
    title="No projects found"
    description="It looks like you haven't added any projects. Create one to get started." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UEmpty
    icon="i-lucide-file"
    title="No projects found"
    description="It looks like you haven't added any projects. Create one to get started." />
</template>
```

Example 4 (vue):

```vue
<template>
  <UEmpty
    title="No projects found"
    description="It looks like you haven't added any projects. Create one to get started." />
</template>
```

---

## Form

**URL:** llms-txt#form

**Contents:**

- Usage
  - Schema validation
  - Custom validation
  - Input events
  - Error event
  - Nesting forms
- API
  - Props
  - Slots
  - Emits

Use the Form component to validate form data using any validation library supporting [Standard Schema](https://github.com/standard-schema/standard-schema){rel="nofollow"} such as [Valibot](https://github.com/fabian-hiller/valibot){rel="nofollow"}, [Zod](https://github.com/colinhacks/zod){rel="nofollow"}, [Regle](https://github.com/victorgarciaesgi/regle){rel="nofollow"}, [Yup](https://github.com/jquense/yup){rel="nofollow"}, [Joi](https://github.com/hapijs/joi){rel="nofollow"} or [Superstruct](https://github.com/ianstormtaylor/superstruct){rel="nofollow"} or your own validation logic.

It works with the [FormField](https://ui.nuxt.com/docs/components/form-field) component to display error messages around form elements automatically.

### Schema validation

It requires two props:

- `state` - a reactive object holding the form's state.
- `schema` - any [Standard Schema](https://github.com/standard-schema/standard-schema){rel="nofollow"} or [Superstruct](https://github.com/ianstormtaylor/superstruct){rel="nofollow"}.

::warning
**No validation library is included** by default, ensure you **install the one you need**.
::

Errors are reported directly to the [FormField](https://ui.nuxt.com/docs/components/form-field) component based on the `name` or `error-pattern` prop. This means the validation rules defined for the `email` attribute in your schema will be applied to `<FormField name="email">`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="vue"}.

Nested validation rules are handled using dot notation. For example, a rule like `{ user: z.object({ email: z.string() }) }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts"} will be applied to `<FormField name="user.email">`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="vue"}.

### Custom validation

Use the `validate` prop to apply your own validation logic.

The validation function must return a list of errors with the following attributes:

- `message` - the error message to display.
- `name` - the `name` of the `FormField` to send the error to.

::tip
It can be used alongside the `schema` prop to handle complex use cases.
::

The Form component automatically triggers validation when an input emits an `input`, `change`, or `blur` event.

- Validation on `input` occurs **as you type**.
- Validation on `change` occurs when you **commit to a value**.
- Validation on `blur` happens when an input **loses focus**.

You can control when validation happens this using the `validate-on` prop.

::tip
The form always validates on submit.
::

::tip
You can use the [`useFormField`](https://ui.nuxt.com/docs/composables/use-form-field) composable to implement this inside your own components.
::

You can listen to the `@error` event to handle errors. This event is triggered when the form is submitted and contains an array of `FormError` objects with the following fields:

- `id` - the input's `id`.
- `name` - the `name` of the `FormField`
- `message` - the error message to display.

Here's an example that focuses the first input element with an error after the form is submitted:

Use the `nested` prop to nest multiple Form components and link their validation functions. In this case, validating the parent form will automatically validate all the other forms inside it.

Nested forms directly inherit their parent's state, so you don't need to define a separate state for them. You can use the `name` prop to target a nested attribute within the parent's state.

It can be used to dynamically add fields based on user's input:

Or to validate list inputs:

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes

---

This component also supports all native `<form>` HTML attributes.
::

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref){rel="nofollow"}.

This will give you access to the following:

| Name                                                                                                                           | Type                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `submit()`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Promise<void>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} :br ::div{.text-toned,mt-1} |

Triggers form submission.
:: |
| `validate(opts: { name?: keyof T | (keyof T)[], silent?: boolean, nested?: boolean, transform?: boolean })`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Promise<T>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} :br ::div{.text-toned,mt-1}
Triggers form validation. Will raise any errors unless `opts.silent` is set to true.
:: |
| `clear(path?: keyof T | RegExp)`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `void` :br ::div{.text-toned,mt-1}
Clears form errors associated with a specific path. If no path is provided, clears all form errors.
:: |
| `getErrors(path?: keyof T RegExp)`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `FormError[]`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} :br ::div{.text-toned,mt-1}
Retrieves form errors associated with a specific path. If no path is provided, returns all form errors.
:: |
| `setErrors(errors: FormError[], name?: keyof T RegExp)`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `void` :br ::div{.text-toned,mt-1}
Sets form errors for a given path. If no path is provided, overrides all errors.
:: |
| `errors`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<FormError[]>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} :br ::div{.text-toned,mt-1}
A reference to the array containing validation errors. Use this to access or manipulate the error information.
:: |
| `disabled`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<boolean>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |
| `dirty`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<boolean>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} `true` if at least one form field has been updated by the user. |
| `dirtyFields`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `DeepReadonly<Set<keyof T>>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} Tracks fields that have been modified by the user. |
| `touchedFields`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `DeepReadonly<Set<keyof T>>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} Tracks fields that the user interacted with. |
| `blurredFields`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `DeepReadonly<Set<keyof T>>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} Tracks fields blurred by the user. |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown

```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown

```

---

## RadioGroup

**URL:** llms-txt#radiogroup

**Contents:**

- Usage
  - Items
  - Value Key
  - Legend
  - Color
  - Variant
  - Size
  - Orientation
  - Indicator
  - Disabled

Use the `v-model` directive to control the value of the RadioGroup or the `default-value` prop to set the initial value when you do not need to control its state.

Use the `items` prop as an array of strings or numbers:

You can also pass an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`value?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#value-key)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

Use the `legend` prop to set the legend of the RadioGroup.

Use the `color` prop to change the color of the RadioGroup.

Use the `variant` prop to change the variant of the RadioGroup.

Use the `size` prop to change the size of the RadioGroup.

Use the `orientation` prop to change the orientation of the RadioGroup. Defaults to `vertical`.

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

Use the `disabled` prop to disable the RadioGroup.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['System', 'Light', 'Dark']);
</script>

<template>
  <URadioGroup model-value="System" :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['System', 'Light', 'Dark']);
</script>

<template>
  <URadioGroup model-value="System" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { RadioGroupItem } from '@nuxt/ui';

  const items = ref<RadioGroupItem[]>([
    {
      label: 'System',
      description: 'This is the first option.',
      value: 'system',
    },
    {
      label: 'Light',
      description: 'This is the second option.',
      value: 'light',
    },
    {
      label: 'Dark',
      description: 'This is the third option.',
      value: 'dark',
    },
  ]);
</script>

<template>
  <URadioGroup model-value="system" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { RadioGroupItem } from '@nuxt/ui';

  const items = ref<RadioGroupItem[]>([
    {
      label: 'System',
      description: 'This is the first option.',
      id: 'system',
    },
    {
      label: 'Light',
      description: 'This is the second option.',
      id: 'light',
    },
    {
      label: 'Dark',
      description: 'This is the third option.',
      id: 'dark',
    },
  ]);
</script>

<template>
  <URadioGroup model-value="light" value-key="id" :items="items" />
</template>
```

---

## EditorMentionMenu

**URL:** llms-txt#editormentionmenu

**Contents:**

- Usage
  - Items
  - Char
  - Options
- API
  - Props
- Theme
- Changelog

The EditorMentionMenu component displays a menu of user suggestions when typing the `@` character in the editor and inserts the selected mention using the `@tiptap/extension-mention` package.

::note
It uses the `useEditorMenu` composable built on top of TipTap's [Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion){rel="nofollow"} utility to filter items as you type and support keyboard navigation (arrow keys, enter to select, escape to close).
::

::caution
It must be used inside an [Editor](https://ui.nuxt.com/docs/components/editor) component's default slot to have access to the editor instance.
::

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/nodes/mention

---

Learn more about the Mention extension in the TipTap documentation.
::

Use the `items` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

Use the `char` prop to change the trigger character. Defaults to `@`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout
---
icon: i-custom-tiptap
target: _blank
to: https://tiptap.dev/docs/editor/extensions/nodes/mention
---
Learn more about the Mention extension in the TipTap documentation.
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

Example 2 (unknown):

```unknown
::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

### Char

Use the `char` prop to change the trigger character. Defaults to `@`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.
```

Example 3 (unknown):

```unknown
### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## NavigationMenu

**URL:** llms-txt#navigationmenu

**Contents:**

- Usage
  - Items
  - Orientation
  - Collapsed
  - Highlight
  - Color
  - Variant
  - Trailing Icon
  - Arrow
  - Content Orientation

Use the NavigationMenu component to display a list of links horizontally or vertically.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `badge?: string | number | BadgeProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `tooltip?: TooltipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `trailingIcon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `type?: 'label' | 'trigger' | 'link'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `defaultOpen?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `open?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `children?: NavigationMenuChildItem[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { linkLeadingAvatarSize?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingBadgeSize?: ClassNameValue, linkTrailingBadge?: ClassNameValue, linkTrailingIcon?: ClassNameValue, label?: ClassNameValue, link?: ClassNameValue, content?: ClassNameValue, childList?: ClassNameValue, childLabel?: ClassNameValue, childItem?: ClassNameValue, childLink?: ClassNameValue, childLinkIcon?: ClassNameValue, childLinkWrapper?: ClassNameValue, childLinkLabel?: ClassNameValue, childLinkLabelExternalIcon?: ClassNameValue, childLinkDescription?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::note
You can also pass an array of arrays to the `items` prop to display groups of items.
::

::tip
Each item can take a `children` array of objects with the following properties to create submenus:

- `label: string`
- `description?: string`
- `icon?: string`
- `onSelect?: (e: Event) => void`
- `class?: any`
  ::

Use the `orientation` prop to change the orientation of the NavigationMenu.

::note
When orientation is `vertical`, an [Accordion](https://ui.nuxt.com/docs/components/accordion) component is used to display each group. You can control the open state of each item using the `open` and `defaultOpen` properties and change the behavior using the [`collapsible`](https://ui.nuxt.com/docs/components/accordion#collapsible) and [`type`](https://ui.nuxt.com/docs/components/accordion#multiple) props.
::

::note
Groups will be spaced when orientation is `horizontal` and separated when orientation is `vertical`.
::

In `vertical` orientation, use the `collapsed` prop to collapse the NavigationMenu, this can be useful in a sidebar for example.

::note
You can use the [`tooltip`](https://ui.nuxt.com/#with-tooltip-in-items) and [`popover`](https://ui.nuxt.com/#with-popover-in-items) props to display more information on the collapsed items.
::

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

::note
In this example, the `border-b` class is applied to display a border in `horizontal` orientation, this is not done by default to let you have a clean slate to work with.
::

::caution
In `vertical` orientation, the `highlight` prop only highlights the border of active children.
::

Use the `color` prop to change the color of the NavigationMenu.

Use the `variant` prop to change the variant of the NavigationMenu.

::note
The `highlight` prop changes the `pill` variant active item style. Try it out to see the difference.
::

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon) of each item. Defaults to `i-lucide-chevron-down`. This icon is only displayed when an item has children.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

Use the `arrow` prop to display an arrow on the NavigationMenu content when items have children.

::note
The arrow is animated to follow the active item.
::

### Content Orientation

Use the `content-orientation` prop to change the orientation of the content.

::warning
This prop only works when `orientation` is `horizontal`.
::

Use the `unmount-on-hide` prop to control the content unmounting behavior. Defaults to `true`.

::note
You can inspect the DOM to see each item's content being rendered.
::

### With tooltip in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `tooltip` prop to `true` to display a [Tooltip](https://ui.nuxt.com/docs/components/tooltip) around items with their label but you can also use the `tooltip` property on each item to override the default tooltip.

You can pass any property from the [Tooltip](https://ui.nuxt.com/docs/components/tooltip) component globally or on each item.

### With popover in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `popover` prop to `true` to display a [Popover](https://ui.nuxt.com/docs/components/popover) around items with their children but you can also use the `popover` property on each item to override the default popover.

You can pass any property from the [Popover](https://ui.nuxt.com/docs/components/popover) component globally or on each item.

::tip{to="https://ui.nuxt.com/#with-content-slot"}
You can use the `#content` slot to customize the content of the popover in the `vertical` orientation.
::

### Control active item

You can control the active item(s) by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to `item-${index}` for top-level items or `item-${level}-${index}` for nested items.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can switch the active item by pressing `, `, or ``.
::

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-content`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/#slots"}
You can also use the `#item`, `#item-leading`, `#item-label`, `#item-trailing` and `#item-content` slots to customize all items.
::

### With content slot

Use the `#item-content` slot or the `slot` property (`#{{ item.slot }}-content`) to customize the content of a specific item.

::note
In this example, we add the `sm:w-(--reka-navigation-menu-viewport-width)` class on the `viewport` to have a dynamic width. This requires to set a width on the content's first child.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      to: '/docs/getting-started',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
        },
        {
          label: 'Installation',
          description: 'Learn how to install and configure Nuxt UI in your application.',
          icon: 'i-lucide-cloud-download',
        },
        {
          label: 'Icons',
          icon: 'i-lucide-smile',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        },
        {
          label: 'Colors',
          icon: 'i-lucide-swatch-book',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
        },
        {
          label: 'Theme',
          icon: 'i-lucide-cog',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
        },
      ],
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
      to: '/docs/composables',
      children: [
        {
          label: 'defineShortcuts',
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/docs/composables/define-shortcuts',
        },
        {
          label: 'useOverlay',
          icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/docs/composables/use-overlay',
        },
        {
          label: 'useToast',
          icon: 'i-lucide-file-text',
          description: 'Display a toast within your application.',
          to: '/docs/composables/use-toast',
        },
      ],
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/docs/components',
      active: true,
      children: [
        {
          label: 'Link',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/docs/components/link',
        },
        {
          label: 'Modal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/docs/components/modal',
        },
        {
          label: 'NavigationMenu',
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/docs/components/navigation-menu',
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/docs/components/pagination',
        },
        {
          label: 'Popover',
          icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          to: '/docs/components/popover',
        },
        {
          label: 'Progress',
          icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/docs/components/progress',
        },
      ],
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true,
    },
  ]);
</script>

<template>
  <UNavigationMenu :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items = ref<NavigationMenuItem[]>([
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      to: '/docs/getting-started',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
        },
        {
          label: 'Installation',
          description: 'Learn how to install and configure Nuxt UI in your application.',
          icon: 'i-lucide-cloud-download',
        },
        {
          label: 'Icons',
          icon: 'i-lucide-smile',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        },
        {
          label: 'Colors',
          icon: 'i-lucide-swatch-book',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
        },
        {
          label: 'Theme',
          icon: 'i-lucide-cog',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
        },
      ],
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
      to: '/docs/composables',
      children: [
        {
          label: 'defineShortcuts',
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/docs/composables/define-shortcuts',
        },
        {
          label: 'useOverlay',
          icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/docs/composables/use-overlay',
        },
        {
          label: 'useToast',
          icon: 'i-lucide-file-text',
          description: 'Display a toast within your application.',
          to: '/docs/composables/use-toast',
        },
      ],
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/docs/components',
      active: true,
      children: [
        {
          label: 'Link',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/docs/components/link',
        },
        {
          label: 'Modal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/docs/components/modal',
        },
        {
          label: 'NavigationMenu',
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/docs/components/navigation-menu',
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/docs/components/pagination',
        },
        {
          label: 'Popover',
          icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          to: '/docs/components/popover',
        },
        {
          label: 'Progress',
          icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/docs/components/progress',
        },
      ],
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true,
    },
  ]);
</script>

<template>
  <UNavigationMenu class="w-full justify-center" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items = ref<NavigationMenuItem[][]>([
    [
      {
        label: 'Links',
        type: 'label',
      },
      {
        label: 'Guide',
        icon: 'i-lucide-book-open',
        children: [
          {
            label: 'Introduction',
            description: 'Fully styled and customizable components for Nuxt.',
            icon: 'i-lucide-house',
          },
          {
            label: 'Installation',
            description: 'Learn how to install and configure Nuxt UI in your application.',
            icon: 'i-lucide-cloud-download',
          },
          {
            label: 'Icons',
            icon: 'i-lucide-smile',
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
          },
          {
            label: 'Colors',
            icon: 'i-lucide-swatch-book',
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
          },
          {
            label: 'Theme',
            icon: 'i-lucide-cog',
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
          },
        ],
      },
      {
        label: 'Composables',
        icon: 'i-lucide-database',
        children: [
          {
            label: 'defineShortcuts',
            icon: 'i-lucide-file-text',
            description: 'Define shortcuts for your application.',
            to: '/docs/composables/define-shortcuts',
          },
          {
            label: 'useOverlay',
            icon: 'i-lucide-file-text',
            description: 'Display a modal/slideover within your application.',
            to: '/docs/composables/use-overlay',
          },
          {
            label: 'useToast',
            icon: 'i-lucide-file-text',
            description: 'Display a toast within your application.',
            to: '/docs/composables/use-toast',
          },
        ],
      },
      {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/docs/components',
        active: true,
        defaultOpen: true,
        children: [
          {
            label: 'Link',
            icon: 'i-lucide-file-text',
            description: 'Use NuxtLink with superpowers.',
            to: '/docs/components/link',
          },
          {
            label: 'Modal',
            icon: 'i-lucide-file-text',
            description: 'Display a modal within your application.',
            to: '/docs/components/modal',
          },
          {
            label: 'NavigationMenu',
            icon: 'i-lucide-file-text',
            description: 'Display a list of links.',
            to: '/docs/components/navigation-menu',
          },
          {
            label: 'Pagination',
            icon: 'i-lucide-file-text',
            description: 'Display a list of pages.',
            to: '/docs/components/pagination',
          },
          {
            label: 'Popover',
            icon: 'i-lucide-file-text',
            description: 'Display a non-modal dialog that floats around a trigger element.',
            to: '/docs/components/popover',
          },
          {
            label: 'Progress',
            icon: 'i-lucide-file-text',
            description: 'Show a horizontal bar to indicate task progression.',
            to: '/docs/components/progress',
          },
        ],
      },
    ],
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        badge: '3.8k',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Help',
        icon: 'i-lucide-circle-help',
        disabled: true,
      },
    ],
  ]);
</script>

<template>
  <UNavigationMenu orientation="vertical" class="data-[orientation=vertical]:w-48" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items = ref<NavigationMenuItem[][]>([
    [
      {
        label: 'Links',
        type: 'label',
      },
      {
        label: 'Guide',
        icon: 'i-lucide-book-open',
        children: [
          {
            label: 'Introduction',
            description: 'Fully styled and customizable components for Nuxt.',
            icon: 'i-lucide-house',
          },
          {
            label: 'Installation',
            description: 'Learn how to install and configure Nuxt UI in your application.',
            icon: 'i-lucide-cloud-download',
          },
          {
            label: 'Icons',
            icon: 'i-lucide-smile',
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
          },
          {
            label: 'Colors',
            icon: 'i-lucide-swatch-book',
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
          },
          {
            label: 'Theme',
            icon: 'i-lucide-cog',
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
          },
        ],
      },
      {
        label: 'Composables',
        icon: 'i-lucide-database',
        children: [
          {
            label: 'defineShortcuts',
            icon: 'i-lucide-file-text',
            description: 'Define shortcuts for your application.',
            to: '/docs/composables/define-shortcuts',
          },
          {
            label: 'useOverlay',
            icon: 'i-lucide-file-text',
            description: 'Display a modal/slideover within your application.',
            to: '/docs/composables/use-overlay',
          },
          {
            label: 'useToast',
            icon: 'i-lucide-file-text',
            description: 'Display a toast within your application.',
            to: '/docs/composables/use-toast',
          },
        ],
      },
      {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/docs/components',
        active: true,
        children: [
          {
            label: 'Link',
            icon: 'i-lucide-file-text',
            description: 'Use NuxtLink with superpowers.',
            to: '/docs/components/link',
          },
          {
            label: 'Modal',
            icon: 'i-lucide-file-text',
            description: 'Display a modal within your application.',
            to: '/docs/components/modal',
          },
          {
            label: 'NavigationMenu',
            icon: 'i-lucide-file-text',
            description: 'Display a list of links.',
            to: '/docs/components/navigation-menu',
          },
          {
            label: 'Pagination',
            icon: 'i-lucide-file-text',
            description: 'Display a list of pages.',
            to: '/docs/components/pagination',
          },
          {
            label: 'Popover',
            icon: 'i-lucide-file-text',
            description: 'Display a non-modal dialog that floats around a trigger element.',
            to: '/docs/components/popover',
          },
          {
            label: 'Progress',
            icon: 'i-lucide-file-text',
            description: 'Show a horizontal bar to indicate task progression.',
            to: '/docs/components/progress',
          },
        ],
      },
    ],
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        badge: '3.8k',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Help',
        icon: 'i-lucide-circle-help',
        disabled: true,
      },
    ],
  ]);
</script>

<template>
  <UNavigationMenu collapsed :tooltip="false" :popover="false" orientation="vertical" :items="items" />
</template>
```

---

## Contribution

**URL:** llms-txt#contribution

**Contents:**

- Project structure
  - Documentation
  - Module
- CLI
  - Components

Nuxt UI thrives thanks to its incredible community ❤️. We welcome all contributions through bug reports, pull requests, and feedback to help make this library even better.

::caution
Before reporting a bug or requesting a feature, make sure that you have read through our [documentation](https://ui.nuxt.com/){rel="nofollow"} and existing [issues](https://github.com/nuxt/ui/issues?q=is%3Aissue%20is%3Aopen%20sort%3Aupdated-desc){rel="nofollow"}.
::

Here's an overview of the key directories and files in the Nuxt UI project structure:

The documentation lives in the `docs` folder as a Nuxt app using `@nuxt/content` to generate pages from Markdown files. See the [Nuxt Content documentation](https://content.nuxt.com/docs/getting-started){rel="nofollow"} for details on how it works. Here's a breakdown of its structure:

The module code resides in the `src` folder. Here's a breakdown of its structure:

To make development easier, we've created a CLI that you can use to generate components and locales. You can access it using the `nuxt-ui make` command.

First, you need to link the CLI to your global environment:

You can create new components using the following command:

- `--primitive` Create a primitive component
- `--prose` Create a prose component
- `--content` Create a content component
- `--template` Only generate specific template (available templates: `playground`, `docs`, `test`, `theme`, `component`)

**Examples:**

Example 1 (bash):

```bash
├── app/
│   ├── assets/
│   ├── components/
│   │   └── content/
│   │       └── examples   # Components used in documentation as examples
│   ├── composables/
│   └── ...
├── content/
│   ├── 1.getting-started
│   ├── 2.composables
│   └── 3.components       # Components documentation
```

Example 2 (bash):

```bash
├── plugins/
├── runtime/
│   ├── components/        # Where all the components are located
│   │   ├── Accordion.vue
│   │   ├── Alert.vue
│   │   └── ...
│   ├── composables/
│   ├── locale/
│   ├── plugins/
│   ├── types/
│   ├── utils/
│   └── vue/
│       ├── components/
│       └── plugins/
├── theme/                 # This where the theme for each component is located
│   ├── accordion.ts       # Theme for Accordion component
│   ├── alert.ts
│   └── ...
└── module.ts
```

Example 3 (sh):

```sh
npm link
```

Example 4 (sh):

```sh
nuxt-ui make component <name> [options]
```

---

## Select

**URL:** llms-txt#select

**Contents:**

- Usage
  - Items
  - Value Key
  - Multiple
  - Placeholder
  - Content
  - Arrow
  - Color
  - Variant
  - Size

Use the `v-model` directive to control the value of the Select or the `default-value` prop to set the initial value when you do not need to control its state.

Use the `items` prop as an array of strings, numbers or booleans:

You can also pass an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`value?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#value-key)
- [`type?: "label" | "separator" | "item"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-items-type)
- [`icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-icons-in-items)
- [`avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-avatar-in-items)
- [`chip?: ChipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-chip-in-items)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

Use the `multiple` prop to allow multiple selections, the selected items will be separated by a comma in the trigger.

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

Use the `placeholder` prop to set a placeholder text.

Use the `content` prop to control how the Select content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the Select.

Use the `color` prop to change the ring color when the Select is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the Select.

Use the `size` prop to change the size of the Select.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the Select.

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-chevron-down`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `i-lucide-check`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the Select.

Use the `loading` prop to show a loading icon on the Select.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the Select.

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

### With icon in items

You can use the `icon` property to display an [Icon](https://ui.nuxt.com/docs/components/icon) inside the items.

::note
In this example, the icon is computed from the `value` property of the selected item.
::

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the items.

::note
In this example, the avatar is computed from the `value` property of the selected item.
::

::tip
You can also use the `#leading` slot to display the selected avatar.
::

### With chip in items

You can use the `chip` property to display a [Chip](https://ui.nuxt.com/docs/components/chip) inside the items.

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Select by pressing ``.
::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the Select.

### With fetched items

You can fetch items from an API and use them in the Select.

### With full content width

You can expand the content to the full width of its items by adding the `min-w-fit` class on the `ui.content` slot.

::tip
You can also change the content width globally in your `app.config.ts`:

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                             | Type                   |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `triggerRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLButtonElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <USelect model-value="Backlog" :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <USelect model-value="Backlog" class="w-48" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { SelectItem } from '@nuxt/ui';

  const items = ref<SelectItem[]>([
    {
      label: 'Backlog',
      value: 'backlog',
    },
    {
      label: 'Todo',
      value: 'todo',
    },
    {
      label: 'In Progress',
      value: 'in_progress',
    },
    {
      label: 'Done',
      value: 'done',
    },
  ]);
</script>

<template>
  <USelect model-value="backlog" class="w-48" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
    ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  ]);
</script>

<template>
  <USelect model-value="Apple" class="w-48" :items="items" />
</template>
```

---

## Badge

**URL:** llms-txt#badge

**Contents:**

- Usage
  - Label
  - Color
  - Variant
  - Size
  - Icon
  - Avatar
- Examples
  - `class` prop
- API

Use the default slot to set the label of the Badge.

Use the `label` prop to set the label of the Badge.

Use the `color` prop to change the color of the Badge.

Use the `variant` props to change the variant of the Badge.

Use the `size` prop to change the size of the Badge.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the Badge.

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the Badge.

Use the `class` prop to override the base styles of the Badge.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UBadge> Badge </UBadge>
</template>
```

Example 2 (vue):

```vue
<template>
  <UBadge label="Badge" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UBadge color="neutral"> Badge </UBadge>
</template>
```

Example 4 (vue):

```vue
<template>
  <UBadge color="neutral" variant="outline"> Badge </UBadge>
</template>
```

---

## DashboardSidebarCollapse

**URL:** llms-txt#dashboardsidebarcollapse

**Contents:**

- Usage
- Examples
  - Within `header` slot
  - Within `leading` slot
- API
  - Props
- Theme
- Changelog

The DashboardSidebarCollapse component is used to collapse/expand the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) component **when its `collapsible` prop is set**.

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::note
The button defaults to `color="neutral"` and `variant="ghost"`.
::

### Within `header` slot

You can put this component in the `header` slot of the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) component and use the `collapsed` prop to hide the left part of the header for example:

### Within `leading` slot

You can put this component in the `leading` slot of the [DashboardNavbar](https://ui.nuxt.com/docs/components/dashboard-navbar) component to display it before the title for example:

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UDashboardSidebarCollapse />
</template>
```

Example 2 (vue):

```vue
<template>
  <UDashboardSidebarCollapse variant="subtle" />
</template>
```

Example 3 (unknown):

```unknown
### Within `leading` slot

You can put this component in the `leading` slot of the [DashboardNavbar](https://ui.nuxt.com/docs/components/dashboard-navbar) component to display it before the title for example:
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## PageHeader

**URL:** llms-txt#pageheader

**Contents:**

- Usage
  - Title
  - Description
  - Headline
  - Links
- Examples
  - Within a page
- API
  - Props
  - Slots

The PageHeader component displays a header for your page.

Use it inside the default slot of the [Page](https://ui.nuxt.com/docs/components/page) component, before the [PageBody](https://ui.nuxt.com/docs/components/page-body) component:

Use the `title` prop to display a title in the header.

Use the `description` prop to display a description in the header.

Use the `headline` prop to display a headline in the header.

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) in the header.

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PageHeader component in a page to display the header of the page:

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Title

Use the `title` prop to display a title in the header.
```

Example 2 (unknown):

```unknown
### Description

Use the `description` prop to display a description in the header.
```

Example 3 (unknown):

```unknown
### Headline

Use the `headline` prop to display a headline in the header.
```

Example 4 (unknown):

```unknown
### Links

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) in the header.
```

---

## Collapsible

**URL:** llms-txt#collapsible

**Contents:**

- Usage
  - Unmount
  - Disabled
- Examples
  - Control open state
  - With rotating icon
- API
  - Props
  - Slots
  - Emits

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

::note
You can inspect the DOM to see the content being rendered.
::

Use the `disabled` prop to disable the Collapsible.

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Collapsible by pressing ``.
::

::tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
::

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UCollapsible class="flex flex-col gap-2 w-48">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

    <template #content>
      <Placeholder class="h-48" /> </template
  ></UCollapsible>
</template>
```

Example 2 (vue):

```vue
<template>
  <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-48">
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

    <template #content>
      <Placeholder class="h-48" /> </template
  ></UCollapsible>
</template>
```

Example 3 (vue):

```vue
<template>
  <UCollapsible class="flex flex-col gap-2 w-48" disabled>
    <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

    <template #content>
      <Placeholder class="h-48" /> </template
  ></UCollapsible>
</template>
```

Example 4 (unknown):

```unknown
::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Collapsible by pressing ``.
::

::tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
::

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.
```

---

## AvatarGroup

**URL:** llms-txt#avatargroup

**Contents:**

- Usage
  - Size
  - Max
- Examples
  - With tooltip
  - With chip
  - With link
  - With mask
- API
  - Props

Wrap multiple [Avatar](https://ui.nuxt.com/docs/components/avatar) within an AvatarGroup to stack them.

Use the `size` prop to change the size of all the avatars.

Use the `max` prop to limit the number of avatars displayed. The rest is displayed as an `+X` avatar.

Wrap each avatar with a [Tooltip](https://ui.nuxt.com/docs/components/tooltip) to display a tooltip on hover.

Wrap each avatar with a [Chip](https://ui.nuxt.com/docs/components/chip) to display a chip around the avatar.

Wrap each avatar with a [Link](https://ui.nuxt.com/docs/components/link) to make them clickable.

Wrap an avatar with a CSS mask to display it with a custom shape.

::warning
The `chip` prop does not work correctly when using a mask. Chips may be cut depending on the mask shape.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UAvatarGroup>
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

Example 2 (vue):

```vue
<template>
  <UAvatarGroup size="xl">
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

Example 3 (vue):

```vue
<template>
  <UAvatarGroup :max="2">
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
    <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
    <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
  </UAvatarGroup>
</template>
```

Example 4 (unknown):

```unknown
### With chip

Wrap each avatar with a [Chip](https://ui.nuxt.com/docs/components/chip) to display a chip around the avatar.
```

---

## PageList

**URL:** llms-txt#pagelist

**Contents:**

- Usage
  - Divide
- API
  - Props
  - Slots
- Theme
- Changelog

The PageList component provides a flexible way to display content in a vertical list layout. It's perfect for creating stacked lists of [PageCard](https://ui.nuxt.com/docs/components/page-card) components or any other elements, with optional dividers between items.

Use the `divide` prop to add a divider between each child element.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Divide

Use the `divide` prop to add a divider between each child element.
```

Example 2 (unknown):

```unknown
## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## DashboardSidebar

**URL:** llms-txt#dashboardsidebar

**Contents:**

- Usage
  - Resizable
  - Collapsible
  - Size
  - Side
  - Mode
  - Toggle
  - Toggle Side
- Examples
  - Control open state

The DashboardSidebar component is used to display a sidebar. Its state (size, collapsed, etc.) will be saved based on the `storage` and `storage-key` props you provide to the [DashboardGroup](https://ui.nuxt.com/docs/components/dashboard-group#props) component.

Use it inside the default slot of the [DashboardGroup](https://ui.nuxt.com/docs/components/dashboard-group) component:

::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g., `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `left`, `default` and `right` slots to customize the sidebar and the `body` or `content` slots to customize the sidebar menu.

::note
Drag the sidebar near the left edge of the screen to collapse it.
::

Use the `resizable` prop to make the sidebar resizable.

Use the `collapsible` prop to make the sidebar collapsible when dragging near the edge of the screen.

::warning
The [`DashboardSidebarCollapse`](https://ui.nuxt.com/docs/components/dashboard-sidebar-collapse) component will have no effect if the sidebar is not **collapsible**.
::

::tip{to="https://ui.nuxt.com/#slots"}
You can access the `collapsed` state in the slot props to customize the content of the sidebar when it is collapsed.
::

Use the `min-size`, `max-size`, `default-size` and `collapsed-size` props to customize the size of the sidebar.

::tip{to="https://ui.nuxt.com/docs/components/dashboard-group#props"}
Sizes are calculated as percentages by default. You can change this using the `unit` prop on the `DashboardGroup` component.
::

::note
The `collapsed-size` prop is set to `0` by default but the sidebar has a `min-w-16` to make sure it is visible.
::

Use the `side` prop to change the side of the sidebar. Defaults to `left`.

Use the `mode` prop to change the mode of the sidebar menu. Defaults to `slideover`.

Use the `body` slot to fill the menu body (under the header) or the `content` slot to fill the entire menu.

::tip{to="https://ui.nuxt.com/#props"}
You can use the `menu` prop to customize the menu of the sidebar, it will adapt depending on the mode you choose.
::

::note
These examples contain the [`DashboardGroup`](https://ui.nuxt.com/docs/components/dashboard-group), [`DashboardPanel`](https://ui.nuxt.com/docs/components/dashboard-panel) and [`DashboardNavbar`](https://ui.nuxt.com/docs/components/dashboard-navbar) components as they are required to demonstrate the sidebar on mobile.
::

Use the `toggle` prop to customize the [DashboardSidebarToggle](https://ui.nuxt.com/docs/components/dashboard-sidebar-toggle) component displayed on mobile.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `toggle-side` prop to change the side of the toggle button. Defaults to `left`.

### Control open state

You can control the open state by using the `open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the open state of the DashboardSidebar by pressing ``.
::

### Control collapsed state

You can control the collapsed state by using the `collapsed` prop or the `v-model:collapsed` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the collapsed state of the DashboardSidebar by pressing ``.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g., `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `left`, `default` and `right` slots to customize the sidebar and the `body` or `content` slots to customize the sidebar menu.
```

Example 2 (unknown):

```unknown
::note
Drag the sidebar near the left edge of the screen to collapse it.
::

### Resizable

Use the `resizable` prop to make the sidebar resizable.
```

Example 3 (unknown):

```unknown
### Collapsible

Use the `collapsible` prop to make the sidebar collapsible when dragging near the edge of the screen.

::warning
The [`DashboardSidebarCollapse`](https://ui.nuxt.com/docs/components/dashboard-sidebar-collapse) component will have no effect if the sidebar is not **collapsible**.
::
```

Example 4 (unknown):

```unknown
::tip{to="https://ui.nuxt.com/#slots"}
You can access the `collapsed` state in the slot props to customize the content of the sidebar when it is collapsed.
::

### Size

Use the `min-size`, `max-size`, `default-size` and `collapsed-size` props to customize the size of the sidebar.
```

---

## InputTags

**URL:** llms-txt#inputtags

**Contents:**

- Usage
  - Placeholder
  - Max Length
  - Color
  - Variants
  - Sizes
  - Icon
  - Avatar
  - Delete Icon
  - Loading

Use the `v-model` directive to control the value of the InputTags.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `placeholder` prop to set a placeholder text.

Use the `max-length` prop to set the maximum number of characters allowed in a tag.

Use the `color` prop to change the ring color when the InputTags is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the appearance of the InputTags.

Use the `size` prop to adjust the size of the InputTags.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the InputTags.

::note
Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.
::

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the InputTags.

Use the `delete-icon` prop to customize the delete [Icon](https://ui.nuxt.com/docs/components/icon) in the tags. Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `loading` prop to show a loading icon on the InputTags.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the InputTags.

### Within a FormField

You can use the InputTags within a [FormField](https://ui.nuxt.com/docs/components/form-field) component to display a label, help text, required indicator, etc.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

---

This component also supports all native `<input>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                           | Type                  |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `inputRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLInputElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UInputTags />
</template>
```

Example 2 (vue):

```vue
<template>
  <UInputTags />
</template>
```

Example 3 (vue):

```vue
<template>
  <UInputTags placeholder="Enter tags..." />
</template>
```

Example 4 (vue):

```vue
<template>
  <UInputTags :max-length="4" />
</template>
```

---

## PinInput

**URL:** llms-txt#pininput

**Contents:**

- Usage
  - Type
  - Mask
  - OTP
  - Length
  - Placeholder
  - Color
  - Variant
  - Size
  - Disabled

Use the `v-model` directive to control the value of the PinInput.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `type` prop to change the input type. Defaults to `text`.

::note
When `type` is set to `number`, it will only accept numeric characters.
::

Use the `mask` prop to treat the input like a password.

Use the `otp` prop to enable One-Time Password functionality. When enabled, mobile devices can automatically detect and fill OTP codes from SMS messages or clipboard content, with autocomplete support.

Use the `length` prop to change the amount of inputs.

Use the `placeholder` prop to set a placeholder text.

Use the `color` prop to change the ring color when the PinInput is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the PinInput.

Use the `size` prop to change the size of the PinInput.

Use the `disabled` prop to disable the PinInput.

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                            | Type                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputsRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<ComponentPublicInstance[]>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPinInput />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPinInput />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPinInput type="number" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPinInput mask />
</template>
```

---

## Avatar

**URL:** llms-txt#avatar

**Contents:**

- Usage
  - Src
  - Size
  - Icon
  - Text
  - Alt
  - Chip
- Examples
  - With tooltip
  - With mask

The Avatar uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image){rel="nofollow"} is installed, falling back to `img` otherwise.

::note
You can pass any property from the HTML `<img>` element such as `alt`, `loading`, etc.
::

Use the `src` prop to set the image URL.

Use the `size` prop to set the size of the Avatar.

::note
The `<img>` element's `width` and `height` are automatically set based on the `size` prop.
::

Use the `icon` prop to display a fallback [Icon](https://ui.nuxt.com/docs/components/icon).

Use the `text` prop to display a fallback text.

When no icon or text is provided, the **initials** of the `alt` prop is used as fallback.

::note
The `alt` prop is passed to the `img` element as the `alt` attribute.
::

Use the `chip` prop to display a chip around the Avatar.

You can use a [Tooltip](https://ui.nuxt.com/docs/components/tooltip) component to display a tooltip when hovering the Avatar.

You can use a CSS mask to display an Avatar with a custom shape instead of a simple circle.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes

---

This component also supports all native `<img>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UAvatar src="https://github.com/benjamincanac.png" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UAvatar src="https://github.com/benjamincanac.png" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UAvatar src="https://github.com/benjamincanac.png" size="xl" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UAvatar icon="i-lucide-image" size="md" />
</template>
```

---

## Textarea

**URL:** llms-txt#textarea

**Contents:**

- Usage
  - Rows
  - Placeholder
  - Autoresize
  - Color
  - Variant
  - Size
  - Icon
  - Avatar
  - Loading

Use the `v-model` directive to control the value of the Textarea.

Use the `rows` prop to set the number of rows. Defaults to `3`.

Use the `placeholder` prop to set a placeholder text.

Use the `autoresize` prop to enable autoresizing the height of the Textarea.

Use the `maxrows` prop to set the maximum number of rows when autoresizing. If set to `0`, the Textarea will grow indefinitely.

Use the `color` prop to change the ring color when the Textarea is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the Textarea.

Use the `size` prop to change the size of the Textarea.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the Textarea.

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the Textarea.

Use the `loading` prop to show a loading icon on the Textarea.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the Textarea.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes

---

This component also supports all native `<textarea>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                              | Type                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `textareaRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLTextAreaElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UTextarea model-value="" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UTextarea :rows="12" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UTextarea placeholder="Type something..." />
</template>
```

Example 4 (vue):

```vue
<template>
  <UTextarea model-value="This is a long text that will autoresize the height of the Textarea." autoresize />
</template>
```

---

## defineShortcuts

**URL:** llms-txt#defineshortcuts

**Contents:**

- Usage
- API
- Examples
  - Basic usage
  - With input focus handling
  - Extracting shortcuts from menu items

Use the auto-imported `defineShortcuts` composable to define keyboard shortcuts.

- Shortcuts are automatically adjusted for non-macOS platforms, converting `meta` to `ctrl`.
- The composable uses VueUse's [`useEventListener`](https://vueuse.org/core/useEventListener/){rel="nofollow"} to handle keydown events.
- For a complete list of available shortcut keys, refer to the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values){rel="nofollow"} API documentation. Note that the key should be written in lowercase.

::tip{to="https://ui.nuxt.com/docs/components/kbd"}
Learn how to display shortcuts in components in the **Kbd** component documentation.
::

`defineShortcuts(config: ShortcutsConfig, options?: ShortcutsOptions): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Define keyboard shortcuts for your application.

::field-group
:::field{required name="config" required="true" type="ShortcutsConfig"}
An object where keys are shortcut definitions and values are either handler functions or shortcut configuration objects.
:::

:::field{name="options" type="ShortcutsOptions"}
Optional configuration for the shortcuts behavior.

    ::::collapsible
      :::::field{name="chainDelay" type="number"}
      The delay between key presses to consider the shortcut as chained. Default is `250`.
      :::::
    ::::

:::
::

#### Shortcut definition

Shortcuts are defined using the following format:

- Single key: `'a'`, `'b'`, `'1'`, `'?'`, etc.
- Key combinations: Use `_` to separate keys, e.g., `'meta_k'`, `'ctrl_shift_f'`
- Key sequences: Use `-` to define a sequence, e.g., `'g-d'`

- `meta`: Represents `⌘ Command` on macOS and `Ctrl` on other platforms
- `ctrl`: Represents `Ctrl` on all platforms
- `shift`: Used for alphabetic keys when Shift is required

- `escape`: Triggers on Esc key
- `enter`: Triggers on Enter key
- `arrowleft`, `arrowright`, `arrowup`, `arrowdown`: Trigger on respective arrow keys

#### Shortcut configuration

Each shortcut can be defined as a function or an object with the following properties:

`interface ShortcutConfig { handler: () => void; usingInput?: boolean | string }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::field-group
:::field{required name="handler" required="true" type="() => void"}
Function to be executed when the shortcut is triggered.
:::

:::field{name="usingInput" type="boolean | string"}
Controls when the shortcut should trigger based on input focus:

- `false` (default): Shortcut only triggers when no input is focused
- `true`: Shortcut triggers even when any input is focused
- `string`: Shortcut only triggers when the specified input (by name) is focused
  :::
  ::

### With input focus handling

The `usingInput` option allows you to specify that a shortcut should only trigger when a specific input is focused.

### Extracting shortcuts from menu items

The `extractShortcuts` utility can be used to automatically define shortcuts from menu items:

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const open = ref(false);

  defineShortcuts({
    meta_k: () => {
      open.value = !open.value;
    },
  });
</script>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  defineShortcuts({
    '?': () => openHelpModal(),
    meta_k: () => openCommandPalette(),
    'g-d': () => navigateToDashboard(),
  });
</script>
```

Example 3 (vue):

```vue
<template>
  <UInput v-model="query" name="queryInput" />
</template>

<script setup lang="ts">
  const query = ref('');

  defineShortcuts({
    enter: {
      usingInput: 'queryInput',
      handler: () => performSearch(),
    },
    escape: {
      usingInput: true,
      handler: () => clearSearch(),
    },
  });
</script>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const items = [
    {
      label: 'Save',
      icon: 'i-lucide-file-down',
      kbds: ['meta', 'S'],
      onSelect() {
        save();
      },
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy',
      kbds: ['meta', 'C'],
      onSelect() {
        copy();
      },
    },
  ];

  defineShortcuts(extractShortcuts(items));
</script>
```

---

## DashboardSearchButton

**URL:** llms-txt#dashboardsearchbutton

**Contents:**

- Usage
  - Collapsed
  - Kbds
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardSearchButton component is used to open the [DashboardSearch](https://ui.nuxt.com/docs/components/dashboard-search) modal.

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::note{to="https://ui.nuxt.com/#collapsed"}
The button defaults to `color="neutral"` and `variant="outline"` when not collapsed, `variant="ghost"` when collapsed.
::

Use the `collapsed` prop to hide the button's label and [kbds](https://ui.nuxt.com/#kbds). Defaults to `false`.

::tip{to="https://ui.nuxt.com/docs/components/dashboard-sidebar#slots"}
When using the button in the **DashboardSidebar** component, use the `collapsed` slot prop directly.
::

Use the `kbds` prop to display keyboard keys in the button. Defaults to `['meta', 'K']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to match the default shortcut of the [DashboardSearch](https://ui.nuxt.com/docs/components/dashboard-search#shortcut) component.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UDashboardSearchButton />
</template>
```

Example 2 (vue):

```vue
<template>
  <UDashboardSearchButton variant="subtle" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UDashboardSearchButton collapsed />
</template>
```

Example 4 (vue):

```vue
<template>
  <UDashboardSearchButton :collapsed="false" />
</template>
```

---

## ColorModeButton

**URL:** llms-txt#colormodebutton

**Contents:**

- Usage
- Examples
  - With custom icons
  - With fallback slot
- API
  - Props
  - Slots
- Changelog

The ColorModeButton component extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::note
The button defaults to `color="neutral"` and `variant="ghost"`.
::

### With custom icons

::framework-only
#nuxt
:::div
Use the `app.config.ts` to customize the icon with the `ui.icons` property:

:::

#vue
:::div
Use the `vite.config.ts` to customize the icon with the `ui.icons` property:

:::
::

### With fallback slot

As the button is wrapped in a [ClientOnly](https://nuxt.com/docs/api/components/client-only){rel="nofollow"} component, you can pass a `fallback` slot to display a placeholder while the component is loading.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog{prefix="color-mode"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorModeButton />
</template>
```

Example 2 (unknown):

```unknown
:::

#vue
  :::div
  Use the `vite.config.ts` to customize the icon with the `ui.icons` property:
```

Example 3 (unknown):

```unknown
:::
::

### With fallback slot

As the button is wrapped in a [ClientOnly](https://nuxt.com/docs/api/components/client-only){rel="nofollow"} component, you can pass a `fallback` slot to display a placeholder while the component is loading.
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## ChangelogVersion

**URL:** llms-txt#changelogversion

**Contents:**

- Usage
  - Title
  - Description
  - Date
  - Badge
  - Image
  - Authors
  - Link
  - Indicator
- Examples

The ChangelogVersion component provides a flexible way to display an `<article>` element with customizable content including title, description, image, etc.

::code-preview
:::u-changelog-version

---

authors: - name: Benjamin Canac
description: "@benjamincanac"
avatar:
src: https://github.com/benjamincanac.png
to: https://x.com/benjamincanac
target: \_blank - name: Sebastien Chopin
description: "@atinux"
avatar:
src: https://github.com/atinux.png
to: https://x.com/atinux
target: \_blank - name: Hugo Richard
description: "@hugorcd**"
avatar:
src: https://github.com/hugorcd.png
to: https://x.com/hugorcd**
target: \_blank
ui:
container: max-w-lg
class: w-full
date: 2025-03-12
description: Nuxt UI v3 is out! After 1500+ commits, this major redesign brings
improved accessibility, Tailwind CSS v4 support, and full Vue compatibility.
image: https://nuxt.com/assets/blog/nuxt-ui-v3.png
target: \_blank
title: Introducing Nuxt UI v3
to: https://nuxt.com/blog/nuxt-ui-v3

---

:::
::

::tip{to="https://ui.nuxt.com/docs/components/changelog-versions"}
Use the [`ChangelogVersions`](https://ui.nuxt.com/docs/components/changelog-versions) component to display multiple changelog versions in a timeline with an indicator bar on the left.
::

Use the `title` prop to display the title of the ChangelogVersion.

Use the `description` prop to display the description of the ChangelogVersion.

Use the `date` prop to display the date of the ChangelogVersion.

::tip
The date is automatically formatted to the [current locale](https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt#locale). You can either pass a `Date` object or a string.
::

Use the `badge` prop to display a [Badge](https://ui.nuxt.com/docs/components/badge) on the ChangelogVersion.

You can pass any property from the [Badge](https://ui.nuxt.com/docs/components/badge#props) component to customize it.

Use the `image` prop to display an image in the BlogPost.

::note
If [`@nuxt/image`](https://image.nuxt.com/get-started/installation){rel="nofollow"} is installed, the `<NuxtImg>` component will be used instead of the native `img` tag.
::

Use the `authors` prop to display a list of [User](https://ui.nuxt.com/docs/components/user) in the ChangelogVersion as an array of objects with the following properties:

- `name?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: Omit<AvatarProps, 'size'>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `chip?: boolean | Omit<ChipProps, 'size' | 'inset'>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `size?: UserProps['size']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `orientation?: UserProps['orientation']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

Use the `indicator` prop to hide the indicator dot on the left. Defaults to `true`.

::note
When the `indicator` prop is `false`, the date will be displayed over the title.
::

You can use the `body` slot to display custom content between the image and the authors with:

- the [MDC](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#mdc){rel="nofollow"} component from `@nuxtjs/mdc` to display some markdown.
- the [ContentRenderer](https://content.nuxt.com/docs/components/content-renderer){rel="nofollow"} component from `@nuxt/content` to render the content of the page or list.
- or use the `:u-changelog-version` component directly in your content with markdown inside the `body` slot as Nuxt UI provides pre-styled prose components.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UChangelogVersion title="Introducing Nuxt UI v3" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UChangelogVersion
    title="Introducing Nuxt UI v3"
    description="Nuxt UI v3 is out! After 1500+ commits, this major redesign brings improved accessibility, Tailwind CSS v4 support, and full Vue compatibility." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UChangelogVersion
    title="Introducing Nuxt UI v3"
    description="Nuxt UI v3 is out! After 1500+ commits, this major redesign brings improved accessibility, Tailwind CSS v4 support, and full Vue compatibility."
    date="2025-03-12" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UChangelogVersion
    title="Introducing Nuxt UI v3"
    description="Nuxt UI v3 is out! After 1500+ commits, this major redesign brings improved accessibility, Tailwind CSS v4 support, and full Vue compatibility."
    date="2025-03-12"
    badge="Release" />
</template>
```

---

## ChatPrompt

**URL:** llms-txt#chatprompt

**Contents:**

- Usage
  - Variant
- Examples
  - Within a page
- API
  - Props
  - Slots
  - Emits
  - Expose
- Theme

The ChatPrompt component renders a `<form>` element and extends the [Textarea](https://ui.nuxt.com/docs/components/textarea) component so you can pass any property such as `icon`, `placeholder`, `autofocus`, etc.

::code-preview
:::u-chat-prompt

---

variant: subtle

---

    ::::u-chat-prompt-submit{.rounded-full color="neutral"}
    ::::

#footer
::::u-select
---
items: - label: Gemini 2.5 Pro
value: gemini-2.5-pro
icon: i-simple-icons-googlegemini - label: GPT-4o
value: gpt-4o
icon: i-simple-icons-openai - label: Claude 3.5 Sonnet
value: claude-3.5-sonnet
icon: i-simple-icons-anthropic - label: Llama 4
value: llama-4
icon: i-simple-icons-ollama
icon: i-simple-icons-openai
modelValue: gpt-4o
placeholder: Select a model
variant: ghost
---
::::
:::
::

::note
The ChatPrompt handles the following events:

- The form is submitted when the user presses `` or when the user clicks on the submit button.
- The textarea is blurred when ``is pressed and emits a`close` event.
  ::

Use the `variant` prop to change the style of the prompt. Defaults to `outline`.

::note{target="\_blank" to="https://ai-sdk.dev/docs/getting-started/nuxt"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

## ::callout

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt-ui-templates/chat

---

Check out the source code of our **AI Chat template** on GitHub for a real-life example.
::

Use the ChatPrompt component with the `Chat` class from AI SDK v5 to display a chat prompt within a page.

Pass the `input` prop alongside the `error` prop to disable the textarea when an error occurs.

You can also use it as a starting point for a chat interface.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes

---

This component also supports all native `<textarea>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                              | Type                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `textareaRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLTextAreaElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UChatPrompt variant="soft" />
</template>
```

Example 2 (unknown):

```unknown
You can also use it as a starting point for a chat interface.
```

Example 3 (unknown):

```unknown
## API

### Props
```

Example 4 (unknown):

```unknown
::callout
---
icon: i-simple-icons-mdnwebdocs
target: _blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes
---
This component also supports all native `<textarea>` HTML attributes.
::

### Slots
```

---

## InputTime

**URL:** llms-txt#inputtime

**Contents:**

- Usage
  - Hour Cycle
  - Color
  - Variant
  - Size
  - Icon
  - Avatar
  - Disabled
- Examples
  - Within a FormField

Use the `v-model` directive to control the selected date.

Use the `default-value` prop to set the initial value when you do not need to control its state.

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html){rel="nofollow"} package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner. Format of date depends on the [`locale`](https://ui.nuxt.com/docs/getting-started/integrations/i18n) installed in your application.
::

Use the `hour-cycle` prop to change the hour cycle of the InputTime. Defaults to `12`.

Use the `color` prop to change the color of the InputTime.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the InputTime.

Use the `size` prop to change the size of the InputTime.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the InputTime.

::note
Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.
::

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the InputTime.

Use the `disabled` prop to disable the InputTime.

### Within a FormField

You can use the InputTime within a [FormField](https://ui.nuxt.com/docs/components/form-field) component to display a label, help text, required indicator, etc.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UInputTime />
</template>
```

Example 2 (vue):

```vue
<template>
  <UInputTime />
</template>
```

Example 3 (vue):

```vue
<template>
  <UInputTime :hour-cycle="24" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UInputTime color="neutral" highlight />
</template>
```

---

## Chip

**URL:** llms-txt#chip

**Contents:**

- Usage
  - Color
  - Size
  - Text
  - Position
  - Inset
  - Standalone
- Examples
  - Control visibility
- API

Wrap any component with a Chip to display an indicator.

Use the `color` prop to change the color of the Chip.

Use the `size` prop to change the size of the Chip.

Use the `text` prop to set the text of the Chip.

Use the `position` prop to change the position of the Chip.

Use the `inset` prop to display the Chip inside the component. This is useful when dealing with rounded components.

Use the `standalone` prop alongside the `inset` prop to display the Chip inline.

::note
It's used this way in the [`CommandPalette`](https://ui.nuxt.com/docs/components/command-palette), [`InputMenu`](https://ui.nuxt.com/docs/components/input-menu), [`Select`](https://ui.nuxt.com/docs/components/select) or [`SelectMenu`](https://ui.nuxt.com/docs/components/select-menu) components for example.
::

### Control visibility

You can control the visibility of the Chip using the `show` prop.

::note
In this example, the Chip has a color per status and is displayed when the status is not `offline`.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UChip>
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

Example 2 (vue):

```vue
<template>
  <UChip color="neutral">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

Example 3 (vue):

```vue
<template>
  <UChip size="3xl">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

Example 4 (vue):

```vue
<template>
  <UChip :text="5" size="3xl">
    <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
  </UChip>
</template>
```

---

## CheckboxGroup

**URL:** llms-txt#checkboxgroup

**Contents:**

- Usage
  - Items
  - Value Key
  - Legend
  - Color
  - Variant
  - Size
  - Orientation
  - Indicator
  - Disabled

Use the `v-model` directive to control the value of the CheckboxGroup or the `default-value` prop to set the initial value when you do not need to control its state.

Use the `items` prop as an array of strings or numbers:

You can also pass an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`value?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#value-key)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, icon?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

Use the `legend` prop to set the legend of the CheckboxGroup.

Use the `color` prop to change the color of the CheckboxGroup.

Use the `variant` prop to change the variant of the CheckboxGroup.

Use the `size` prop to change the size of the CheckboxGroup.

Use the `orientation` prop to change the orientation of the CheckboxGroup. Defaults to `vertical`.

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

Use the `disabled` prop to disable the CheckboxGroup.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['System', 'Light', 'Dark']);
</script>

<template>
  <UCheckboxGroup :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['System', 'Light', 'Dark']);
</script>

<template>
  <UCheckboxGroup :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { CheckboxGroupItem } from '@nuxt/ui';

  const items = ref<CheckboxGroupItem[]>([
    {
      label: 'System',
      description: 'This is the first option.',
      value: 'system',
    },
    {
      label: 'Light',
      description: 'This is the second option.',
      value: 'light',
    },
    {
      label: 'Dark',
      description: 'This is the third option.',
      value: 'dark',
    },
  ]);
</script>

<template>
  <UCheckboxGroup :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { CheckboxGroupItem } from '@nuxt/ui';

  const items = ref<CheckboxGroupItem[]>([
    {
      label: 'System',
      description: 'This is the first option.',
      id: 'system',
    },
    {
      label: 'Light',
      description: 'This is the second option.',
      id: 'light',
    },
    {
      label: 'Dark',
      description: 'This is the third option.',
      id: 'dark',
    },
  ]);
</script>

<template>
  <UCheckboxGroup value-key="id" :items="items" />
</template>
```

---

## Checkbox

**URL:** llms-txt#checkbox

**Contents:**

- Usage
  - Indeterminate
  - Indeterminate Icon
  - Label
  - Description
  - Icon
  - Color
  - Variant
  - Size
  - Indicator

Use the `v-model` directive to control the checked state of the Checkbox.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `indeterminate` value in the `v-model` directive or `default-value` prop to set the Checkbox to an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes){rel="nofollow"}.

### Indeterminate Icon

Use the `indeterminate-icon` prop to customize the indeterminate icon. Defaults to `i-lucide-minus`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.minus` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.minus` key.
:::
::

Use the `label` prop to set the label of the Checkbox.

When using the `required` prop, an asterisk is added next to the label.

Use the `description` prop to set the description of the Checkbox.

Use the `icon` prop to set the icon of the Checkbox when it is checked. Defaults to `i-lucide-check`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

Use the `color` prop to change the color of the Checkbox.

Use the `variant` prop to change the variant of the Checkbox.

Use the `size` prop to change the size of the Checkbox.

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

Use the `disabled` prop to disable the Checkbox.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UCheckbox model-value />
</template>
```

Example 2 (vue):

```vue
<template>
  <UCheckbox default-value />
</template>
```

Example 3 (vue):

```vue
<template>
  <UCheckbox default-value="indeterminate" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UCheckbox default-value="indeterminate" indeterminate-icon="i-lucide-plus" />
</template>
```

---

## ChangelogVersions

**URL:** llms-txt#changelogversions

**Contents:**

- Usage
  - Versions
  - Indicator
  - Indicator Motion
- Examples
  - Within a page
  - With sticky indicator
- API
  - Props
  - Slots

The ChangelogVersions component provides a flexible layout to display a list of [ChangelogVersion](https://ui.nuxt.com/docs/components/changelog-version) components using either the default slot or the `versions` prop.

Use the `versions` prop as an array of objects with the properties of the [ChangelogVersion](https://ui.nuxt.com/docs/components/changelog-version#props) component.

Use the `indicator` prop to hide the indicator bar on the left. Defaults to `true`.

Use the `indicator-motion` prop to customize or hide the motion effect on the indicator bar. Defaults to `true` with `{ damping: 30, restDelta: 0.001 }` [spring transition options](https://motion.dev/docs/vue-transitions#spring){rel="nofollow"}.

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the ChangelogVersions component in a page to create a changelog page:

::note
In this example, the `versions` are fetched using `queryCollection` from the `@nuxt/content` module.
::

::tip
The `to` prop is overridden here since `@nuxt/content` uses the `path` property.
::

### With sticky indicator

You can use the `ui` prop and the different slots to make the indicators sticky:

::tip
You can use all the slots of the [`ChangelogVersion`](https://ui.nuxt.com/docs/components/changelog-version#slots) component inside ChangelogVersions, they are automatically forwarded allowing you to customize individual versions when using the `versions` prop.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Versions

Use the `versions` prop as an array of objects with the properties of the [ChangelogVersion](https://ui.nuxt.com/docs/components/changelog-version#props) component.
```

Example 2 (unknown):

```unknown
### Indicator

Use the `indicator` prop to hide the indicator bar on the left. Defaults to `true`.
```

Example 3 (unknown):

```unknown
### Indicator Motion

Use the `indicator-motion` prop to customize or hide the motion effect on the indicator bar. Defaults to `true` with `{ damping: 30, restDelta: 0.001 }` [spring transition options](https://motion.dev/docs/vue-transitions#spring){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

### Within a page

Use the ChangelogVersions component in a page to create a changelog page:
```

---

## Separator

**URL:** llms-txt#separator

**Contents:**

- Usage
  - Orientation
  - Label
  - Icon
  - Avatar
  - Color
  - Type
  - Size
- API
  - Props

Use the Separator component as-is to separate content.

Use the `orientation` prop to change the orientation of the Separator. Defaults to `horizontal`.

Use the `label` prop to display a label in the middle of the Separator.

Use the `icon` prop to display an icon in the middle of the Separator.

Use the `avatar` prop to display an avatar in the middle of the Separator.

Use the `color` prop to change the color of the Separator. Defaults to `neutral`.

Use the `type` prop to change the type of the Separator. Defaults to `solid`.

Use the `size` prop to change the size of the Separator. Defaults to `xs`.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <USeparator />
</template>
```

Example 2 (vue):

```vue
<template>
  <USeparator orientation="vertical" class="h-48" />
</template>
```

Example 3 (vue):

```vue
<template>
  <USeparator label="Hello World" />
</template>
```

Example 4 (vue):

```vue
<template>
  <USeparator icon="i-simple-icons-nuxtdotjs" />
</template>
```

---

## Footer

**URL:** llms-txt#footer

**Contents:**

- Usage
- Examples
  - Within `app.vue`
- API
  - Props
  - Slots
- Theme
- Changelog

The Footer component renders a `<footer>` element.

Use the `left`, `default` and `right` slots to customize the footer.

::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render the footer links in the center.
::

::tip{to="https://ui.nuxt.com/docs/components/footer-columns"}
You can use the [FooterColumns](https://ui.nuxt.com/docs/components/footer-columns) component to display a list of links inside the `top` slot.
::

Use the Footer component in your `app.vue` or in a layout:

::note
In this example, we use the [Separator](https://ui.nuxt.com/docs/components/separator) component to add a border above the footer.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render the footer links in the center.
::

::tip{to="https://ui.nuxt.com/docs/components/footer-columns"}
You can use the [FooterColumns](https://ui.nuxt.com/docs/components/footer-columns) component to display a list of links inside the `top` slot.
::

## Examples

### Within `app.vue`

Use the Footer component in your `app.vue` or in a layout:
```

Example 2 (unknown):

```unknown
::note
In this example, we use the [Separator](https://ui.nuxt.com/docs/components/separator) component to add a border above the footer.
::

## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## Banner

**URL:** llms-txt#banner

**Contents:**

- Usage
  - Title
  - Icon
  - Color
  - Close
  - Close Icon
  - Actions
  - Link
- Examples
  - Within `app.vue`

Use the `title` prop to display a title on the Banner.

Use the `icon` prop to display an icon on the Banner.

Use the `color` prop to change the color of the Banner.

Use the `close` prop to display a [Button](https://ui.nuxt.com/docs/components/button) to dismiss the Banner. Defaults to `false`.

::tip
A `close` event will be emitted when the close button is clicked.
::

::note
When closed, `banner-${id}` will be stored in the local storage to prevent it from being displayed again. :br For the example above, `banner-example` will be stored in the local storage.
::

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `actions` prop to add some [Button](https://ui.nuxt.com/docs/components/button) actions to the Banner.

::note
The action buttons default to `color="neutral"` and `size="xs"`. You can customize these values by passing them directly to each action button.
::

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

::note
The `NuxtLink` component will inherit all other attributes you pass to the `User` component.
::

Use the Banner component in your `app.vue` or in a layout:

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UBanner title="This is a banner with an important message." />
</template>
```

Example 2 (vue):

```vue
<template>
  <UBanner icon="i-lucide-info" title="This is a banner with an icon." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UBanner color="neutral" icon="i-lucide-info" title="This is a banner with an icon." />
</template>
```

Example 4 (unknown):

```unknown
::note
When closed, `banner-${id}` will be stored in the local storage to prevent it from being displayed again. :br For the example above, `banner-example` will be stored in the local storage.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.
```

---

## DashboardPanel

**URL:** llms-txt#dashboardpanel

**Contents:**

- Usage
  - Resizable
  - Size
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardPanel component is used to display a panel. Its state (size, collapsed, etc.) will be saved based on the `storage` and `storage-key` props you provide to the [DashboardGroup](https://ui.nuxt.com/docs/components/dashboard-group#props) component.

Use it inside the default slot of the [DashboardGroup](https://ui.nuxt.com/docs/components/dashboard-group) component, you can put multiple panels next to each other:

::caution
It is recommended to set an `id` when using multiple panels in different pages to avoid conflicts.
::

::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g., `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `header`, `body` and `footer` slots to customize the panel or the default slot if you don't want a scrollable body with padding.

::note
Most of the time, you will use the [`DashboardNavbar`](https://ui.nuxt.com/docs/components/dashboard-navbar) component in the `header` slot.
::

Use the `resizable` prop to make the panel resizable.

Use the `min-size`, `max-size` and `default-size` props to customize the size of the panel.

::tip{to="https://ui.nuxt.com/docs/components/dashboard-group#props"}
Sizes are calculated as percentages by default. You can change this using the `unit` prop on the `DashboardGroup` component.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::caution
It is recommended to set an `id` when using multiple panels in different pages to avoid conflicts.
::

::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g., `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `header`, `body` and `footer` slots to customize the panel or the default slot if you don't want a scrollable body with padding.
```

Example 2 (unknown):

```unknown
::note
Most of the time, you will use the [`DashboardNavbar`](https://ui.nuxt.com/docs/components/dashboard-navbar) component in the `header` slot.
::

### Resizable

Use the `resizable` prop to make the panel resizable.
```

Example 3 (unknown):

```unknown
### Size

Use the `min-size`, `max-size` and `default-size` props to customize the size of the panel.
```

Example 4 (unknown):

```unknown
::tip{to="https://ui.nuxt.com/docs/components/dashboard-group#props"}
Sizes are calculated as percentages by default. You can change this using the `unit` prop on the `DashboardGroup` component.
::

## API

### Props
```

---

## Progress

**URL:** llms-txt#progress

**Contents:**

- Usage
  - Max
  - Status
  - Indeterminate
  - Animation
  - Orientation
  - Color
  - Size
  - Inverted
- API

Use the `v-model` directive to control the value of the Progress.

Use the `max` prop to set the maximum value of the Progress.

Use the `max` prop with an array of strings to display the active step under the bar, the maximum value of the Progress is the length of the array.

Use the `status` prop to display the current Progress value above the bar.

When no `v-model` is set or the value is `null`, the Progress becomes _indeterminate_. The progress bar is animated as a `carousel`, but you can change it using the [`animation`](https://ui.nuxt.com/#animation) prop.

Use the `animation` prop to change the animation of the Progress to an inverse carousel, a swinging bar or an elastic bar. Defaults to `carousel`.

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

Use the `color` prop to change the color of the Slider.

Use the `size` prop to change the size of the Slider.

Use the `inverted` prop to visually invert the Progress.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UProgress :model-value="50" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UProgress :model-value="3" :max="4" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UProgress :model-value="3" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UProgress :model-value="50" status />
</template>
```

---

## Link

**URL:** llms-txt#link

**Contents:**

- Usage
  - Tag
  - Style
- IntelliSense
- API
  - Props
  - Slots
- Theme
- Changelog

The Link component is a wrapper around [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} using the [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom){rel="nofollow"} prop. It provides a few extra props:

- `inactive-class` prop to set a class when the link is inactive, `active-class` is used when active.
- `exact` prop to style with `active-class` when the link is active and the route is exactly the same as the current route.
- `exact-query` and `exact-hash` props to style with `active-class` when the link is active and the query or hash is exactly the same as the current query or hash.

- use `exact-query="partial"` to style with `active-class` when the link is active and the query partially match the current query.

The incentive behind this is to provide the same API as NuxtLink back in Nuxt 2 / Vue 2. You can read more about it in the Vue Router [migration from Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link){rel="nofollow"} guide.

::note
It is used by the [`Breadcrumb`](https://ui.nuxt.com/docs/components/breadcrumb), [`Button`](https://ui.nuxt.com/docs/components/button), [`ContextMenu`](https://ui.nuxt.com/docs/components/context-menu), [`DropdownMenu`](https://ui.nuxt.com/docs/components/dropdown-menu) and [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) components.
::

The `Link` components renders an `<a>` tag when a `to` prop is provided, otherwise it renders a `<button>` tag. You can use the `as` prop to change fallback tag.

::note
You can inspect the rendered HTML by changing the `to` prop.
::

By default, the link has default active and inactive styles, check out the [#theme](https://ui.nuxt.com/#theme) section.

::note
Try changing the `to` prop to see the active and inactive states.
::

You can override this behavior by using the `raw` prop and provide your own styles using `class`, `active-class` and `inactive-class`.

If you're using VSCode and wish to get autocompletion for the classes `active-class` and `inactive-class`, you can add the following settings to your `.vscode/settings.json`:

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes

---

This component also supports all native `<a>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <ULink to="" as="button"> Link </ULink>
</template>
```

Example 2 (vue):

```vue
<template>
  <ULink to="/docs/components/link"> Link </ULink>
</template>
```

Example 3 (vue):

```vue
<template>
  <ULink raw to="/docs/components/link" active-class="font-bold" inactive-class="text-muted"> Link </ULink>
</template>
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## PricingTable

**URL:** llms-txt#pricingtable

**Contents:**

- Usage
  - Tiers
  - Sections
- Examples
  - With slots
- API
  - Props
  - Slots
- Theme
- Changelog

The PricingTable component provides a responsive and customizable way to display pricing plans in a table format, automatically switching between a horizontal table layout on desktop for easy comparison and a vertical card layout on mobile for better readability.

::code-preview
:::u-pricing-table

---

sections: - title: Features
features: - title: Number of developers
tiers:
solo: "1"
team: "5"
enterprise: Unlimited - title: Projects
tiers:
solo: true
team: true
enterprise: true - title: GitHub repository access
tiers:
solo: true
team: true
enterprise: true - title: Updates
tiers:
solo: Patch & minor
team: All updates
enterprise: All updates - title: Support
tiers:
solo: Community
team: Priority
enterprise: 24/7 - title: Security
features: - title: SSO
tiers:
solo: false
team: true
enterprise: true - title: Audit logs
tiers:
solo: false
team: true
enterprise: true - title: Custom security review
tiers:
solo: false
team: false
enterprise: true
tiers: - id: solo
title: Solo
description: For indie hackers.
price: $249
billingCycle: /month
billingPeriod: billed annually
badge: Most popular
button:
label: Buy now
variant: subtle - id: team
title: Team
description: For growing teams.
price: $499
billingCycle: /month
billingPeriod: billed annually
button:
label: Buy now
highlight: true - id: enterprise
title: Enterprise
description: For large organizations.
price: Custom
button:
label: Contact sales
color: neutral

---

:::
::

Use the `tiers` prop as an array of objects to define your pricing plans. Each tier object supports the following properties:

- `id: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Unique identifier for the tier (required)
- `title?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Name of the pricing plan
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Short description of the plan
- `price?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - The current price of the plan (e.g., "$99", "€99", "Free")
- `discount?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - The discounted price that will display the `price` with strikethrough (e.g., "$79", "€79")
- `billingCycle?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - The unit price period that appears next to the price (e.g., "/month", "/seat/month")
- `billingPeriod?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Additional billing context that appears above the billing cycle (e.g., "billed monthly")
- `badge?: string | BadgeProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Display a badge next to the title `{ color: 'primary', variant: 'subtle' }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `button?: ButtonProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Configure the CTA button `{ size: 'lg', block: true }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `highlight?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - Whether to visually emphasize this tier as the recommended option

Use the `sections` prop to organize features into logical groups. Each section represents a category of features that you want to compare across different pricing tiers.

- `title: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - The heading for the feature section
- `features: PricingTableSectionFeature[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} - An array of features with their availability in each tier:

- Each feature requires a `title` and a `tiers` object mapping tier IDs to values
  - Boolean values (`true`/`false`) will display as checkmarks (✓) or minus icons (-)
  - String values will be shown as text (e.g., "Unlimited", "Up to 5 users")
  - Numeric values will be displayed as is (e.g., 10, 100)

The PricingTable component provides powerful slot customization options to tailor the display of your content. You can customize individual elements using generic slots or target specific items using their IDs.

The component supports various slot types for maximum customization flexibility:

| Slot Type         | Pattern                               | Description             | Example                      |
| ----------------- | ------------------------------------- | ----------------------- | ---------------------------- | ------------------------- | --------------------------- |
| **Tier slots**    | `#{tier-id}-{element}`                | Target specific tiers   | `#team-title`, `#solo-price` |
| **Section slots** | `#section-{id                         | formatted-title}-title` | Target specific sections     | `#section-features-title` |
| **Feature slots** | `#feature-{id                         | formatted-title}-{title | value}`                      | Target specific features  | `#feature-developers-title` |
| **Generic slots** | `#tier-title`, `#section-title`, etc. | Apply to all items      | `#feature-value`             |

::note
When no `id` is provided, the slot name is auto-generated from the title (e.g., "Premium Features!" becomes `#section-premium-features-title`).
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPricingTable />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPricingTable />
</template>
```

Example 3 (unknown):

```unknown
The component supports various slot types for maximum customization flexibility:

| Slot Type         | Pattern                                       | Description              | Example                      |
| ----------------- | --------------------------------------------- | ------------------------ | ---------------------------- |
| **Tier slots**    | `#{tier-id}-{element}`                        | Target specific tiers    | `#team-title`, `#solo-price` |
| **Section slots** | `#section-{id|formatted-title}-title`         | Target specific sections | `#section-features-title`    |
| **Feature slots** | `#feature-{id|formatted-title}-{title|value}` | Target specific features | `#feature-developers-title`  |
| **Generic slots** | `#tier-title`, `#section-title`, etc.         | Apply to all items       | `#feature-value`             |

::note
When no `id` is provided, the slot name is auto-generated from the title (e.g., "Premium Features!" becomes `#section-premium-features-title`).
::

## API

### Props
```

Example 4 (unknown):

```unknown
### Slots
```

---

## Pagination

**URL:** llms-txt#pagination

**Contents:**

- Usage
  - Total
  - Items Per Page
  - Sibling Count
  - Show Edges
  - Show Controls
  - Color
  - Variant
  - Active Color
  - Active Variant

Use the `default-page` prop or the `v-model:page` directive to control the current page.

::note
The Pagination component uses some [`Button`](https://ui.nuxt.com/docs/components/button) to display the pages, use [`color`](https://ui.nuxt.com/#color), [`variant`](https://ui.nuxt.com/#variant) and [`size`](https://ui.nuxt.com/#size) props to style them.
::

Use the `total` prop to set the total number of items in the list.

Use the `items-per-page` prop to set the number of items per page. Defaults to `10`.

Use the `sibling-count` prop to set the number of siblings to show. Defaults to `2`.

Use the `show-edges` prop to always show the ellipsis, first and last pages. Defaults to `false`.

Use the `show-controls` prop to show the first, prev, next and last buttons. Defaults to `true`.

Use the `color` prop to set the color of the inactive controls. Defaults to `neutral`.

Use the `variant` prop to set the variant of the inactive controls. Defaults to `outline`.

Use the `active-color` prop to set the color of the active control. Defaults to `primary`.

Use the `active-variant` prop to set the variant of the active control. Defaults to `solid`.

Use the `size` prop to set the size of the controls. Defaults to `md`.

Use the `disabled` prop to disable the pagination controls.

Use the `to` prop to transform buttons into links. Pass a function that receives the page number and returns a route destination.

::note
In this example we're adding the `#with-links` hash to avoid going to the top of the page.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPagination :page="5" :total="100" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPagination :page="5" :total="100" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPagination :page="5" :items-per-page="20" :total="100" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPagination :page="5" :sibling-count="1" :total="100" />
</template>
```

---

## PageAnchors

**URL:** llms-txt#pageanchors

**Contents:**

- Usage
  - Links
- Examples
  - Within a layout
- API
  - Props
  - Slots
- Theme
- Changelog

Use the PageAnchors component to display a list of links.

Use the `links` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeading?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PageAnchors component inside the [PageAside](https://ui.nuxt.com/docs/components/page-aside) component to display a list of links above the navigation.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPageAnchors />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { PageAnchor } from '@nuxt/ui';
</script>

<template>
  <UPageAnchors />
</template>
```

Example 3 (unknown):

```unknown
## API

### Props
```

Example 4 (unknown):

```unknown
### Slots
```

---

## Card

**URL:** llms-txt#card

**Contents:**

- Usage
  - Variant
- API
  - Props
  - Slots
- Theme
- Changelog

Use the `header`, `default` and `footer` slots to add content to the Card.

Use the `variant` prop to change the variant of the Card.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Variant

Use the `variant` prop to change the variant of the Card.
```

Example 2 (unknown):

```unknown
## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## FileUpload

**URL:** llms-txt#fileupload

**Contents:**

- Usage
  - Multiple
  - Dropzone
  - Interactive
  - Accept
  - Label
  - Description
  - Icon
  - Color
  - Variant

Use the `v-model` directive to control the value of the FileUpload.

Use the `multiple` prop to allow multiple files to be selected.

Use the `dropzone` prop to enable/disable the droppable area. Defaults to `true`.

Use the `interactive` prop to enable/disable the clickable area. Defaults to `true`.

::tip{to="https://ui.nuxt.com/#with-files-bottom-slot"}
This can be useful when adding a [`Button`](https://ui.nuxt.com/docs/components/button) component in the `#actions` slot.
::

Use the `accept` prop to specify the allowed file types for the input. Provide a comma-separated list of [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types){rel="nofollow"} or file extensions (e.g., `image/png,application/pdf,.jpg`). Defaults to `*` (all file types).

Use the `label` prop to set the label of the FileUpload.

Use the `description` prop to set the description of the FileUpload.

Use the `icon` prop to set the icon of the FileUpload. Defaults to `i-lucide-upload`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.upload` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.upload` key.
:::
::

Use the `color` prop to change the color of the FileUpload.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the FileUpload.

Use the `size` prop to change the size of the FileUpload.

Use the `layout` prop to change how the files are displayed in the FileUpload. Defaults to `grid`.

::warning
This prop only works when `variant` is `area`.
::

Use the `position` prop to change the position of the files in the FileUpload. Defaults to `outside`.

::warning
This prop only works when `variant` is `area` and when `layout` is `list`.
::

### With Form validation

You can use the FileUpload within a [Form](https://ui.nuxt.com/docs/components/form) and [FormField](https://ui.nuxt.com/docs/components/form-field) components to handle validation and error handling.

### With default slot

You can use the default slot to make your own FileUpload component.

### With files-bottom slot

You can use the `files-bottom` slot to add a [Button](https://ui.nuxt.com/docs/components/button) under the files list to remove all files for example.

::note{to="https://ui.nuxt.com/#interactive"}
The `interactive` prop is set to `false` in this example to prevent the default clickable area.
::

### With files-top slot

You can use the `files-top` slot to add a [Button](https://ui.nuxt.com/docs/components/button) above the files list to add new files for example.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

---

This component also supports all native `<input>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                              | Type                  |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `inputRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}    | `Ref<HTMLInputElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |
| `dropzoneRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLDivElement   | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UFileUpload class="w-96 min-h-48" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UFileUpload multiple class="w-96 min-h-48" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UFileUpload :dropzone="false" class="w-96 min-h-48" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UFileUpload :interactive="false" class="w-96 min-h-48" />
</template>
```

---

## MCP Server

**URL:** llms-txt#mcp-server

**Contents:**

- What is MCP?
- Available Resources
- Available Tools
  - Component Tools
  - Template Tools
  - Documentation Tools
  - Example Tools
  - Migration Tools
- Available Prompts
- Configuration

MCP (Model Context Protocol) is a standardized protocol that enables AI assistants to access external data sources and tools. Nuxt UI provides an MCP server that allows AI assistants like Claude Code, Cursor, and Windsurf to access component information, source code, and usage examples directly.

The MCP server provides structured access to our component library, making it easy for AI tools to understand and assist with Nuxt UI development.

## Available Resources

The Nuxt UI MCP server provides the following resources for discovery:

- **`resource://nuxt-ui/components`**: Browse all available components with categories
- **`resource://nuxt-ui/composables`**: Browse all available composables with categories
- **`resource://nuxt-ui/examples`**: Browse all available code examples
- **`resource://nuxt-ui/templates`**: Browse all available project templates
- **`resource://nuxt-ui/documentation-pages`**: Browse all available documentation pages

You're able to access these resources with tools like Claude Code by using `@`.

The Nuxt UI MCP server provides the following tools organized by category:

- **`list_components`**: Lists all available Nuxt UI components with their categories and basic information
- **`list_composables`**: Lists all available Nuxt UI composables with their categories and basic information
- **`get_component`**: Retrieves component documentation and details
- **`get_component_metadata`**: Retrieves detailed metadata for a component including props, slots, and events
- **`search_components_by_category`**: Searches components by category or text filter

- **`list_templates`**: Lists all available Nuxt UI templates with optional category filtering
- **`get_template`**: Retrieves template details and setup instructions

### Documentation Tools

- **`list_documentation_pages`**: Lists all documentation pages
- **`get_documentation_page`**: Retrieves documentation page content by URL path
- **`list_getting_started_guides`**: Lists all getting started guides and installation instructions

- **`list_examples`**: Lists all available UI examples and code demonstrations
- **`get_example`**: Retrieves specific UI example implementation code and details

- **`get_migration_guide`**: Retrieves version-specific migration guides and upgrade instructions

The Nuxt UI MCP server provides guided prompts for common workflows:

- **`find_component_for_usecase`**: Find the best component for your specific use case
- **`implement_component_with_props`**: Generate complete component implementation with proper props
- **`setup_project_with_template`**: Get guided setup instructions for project templates

You're able to access these resources with tools like Claude Code by using `/`.

The Nuxt UI MCP server uses HTTP transport and can be configured in different AI assistants.

::note{icon="i-lucide-info"}
**Custom connectors using MCP are available on ChatGPT for Pro and Plus accounts** on the web.
::

Follow these steps to set up Nuxt UI as a connector within ChatGPT:

1. **Enable Developer mode:**

- Go to Settings → Connectors → Advanced settings → Developer mode

2. **Open ChatGPT settings**
3. **In the Connectors tab, Create a new connector:**

- Give it a name: `Nuxt UI`
  - MCP server URL: `https://ui.nuxt.com/mcp`
  - Authentication: `None`

4. **Click Create**

The Nuxt UI connector will appear in the composer's "Developer mode" tool later during conversations.

::note{icon="i-lucide-info"}
**Ensure Claude Code is installed** - Visit [Anthropic's documentation](https://docs.anthropic.com/en/docs/claude-code/quickstart){rel="nofollow"} for installation instructions.
::

Add the server using the CLI command:

Click the button below to install the Nuxt UI MCP server directly in Cursor:

## ::u-button

color: neutral
icon: i-custom-cursor
label: Install MCP Server
to: cursor://anysphere.cursor-deeplink/mcp/install?name=nuxt-ui&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vdWkubnV4dC5jb20vbWNwIn0%3D

---

::

#### Manual Setup Instructions:

1. Open Cursor and go to "Settings" > "Tools & MCP"
2. Add the Nuxt UI MCP server configuration

Or manually create/update `.cursor/mcp.json` in your project root:

### Google Antigravity

#### Setup Instructions:

1. Open the MCP store via the "..." dropdown at the top of the editor's agent panel.
2. Click on "Manage MCP Servers"
3. Click on "View raw config"
4. Modify the `mcp_config.json` with your custom MCP server configuration:

5. Return to the "Manage MCP Servers" tab and click "Refresh". The Nuxt UI MCP server should now appear.

#### Setup Instructions:

1. Navigate to "Intelligence" > "Connectors"
2. Click on "Add Connector" button, then select "Custom MCP Connector"
3. Create your Custom MCP Connector:

- Connector Name : `NuxtUI`
  - Connector Server : `https://ui.nuxt.com/mcp`

### Visual Studio Code

::note{icon="i-lucide-info"}
**Install required extensions** - Ensure you have [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot){rel="nofollow"} and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat){rel="nofollow"} extensions installed.
::

#### Setup Instructions:

1. Open VS Code and access the Command Palette (Ctrl/Cmd + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)" and select it
3. Navigate to your project's `.vscode` folder or create one if it doesn't exist
4. Create or edit the `mcp.json` file with the following configuration:

#### Setup Instructions:

1. Open Windsurf and navigate to "Settings" > "Windsurf Settings" > "Cascade"
2. Click the "Manage MCPs" button, then select the "View raw config" option
3. Add the following configuration to your MCP settings:

#### Setup Instructions:

1. Open Zed and go to "Settings" > "Open Settings"
2. Navigate to the JSON settings file
3. Add the following context server configuration to your settings:

#### Setup Instructions:

1. In your project root, create `opencode.json`
2. Add the following configuration:

### GitHub Copilot Agent

::note{icon="i-lucide-info"}
**Repository administrator access required** to configure MCP servers for GitHub Copilot coding agent.
::

If you have already configured MCP servers in VS Code (replace the `servers` key with `mcpServers` for GitHub Copilot Agent), you can leverage a similar configuration for GitHub Copilot coding agent. You will need to add a `tools` key specifying which tools are available to Copilot.

#### Setup Instructions:

1. Navigate to your GitHub repository
2. Go to **Settings** > **Code & automation** > **Copilot** > **Coding agent**
3. In the **MCP configuration** section, add the following configuration:

### Validating the Configuration

To verify the MCP server is configured correctly:

1. Create an issue in your repository and assign it to Copilot
2. Wait for Copilot to create a pull request
3. In the pull request, click View session in the "Copilot started work" timeline event
4. Click the ellipsis button (...) at the top right, then click Copilot in the sidebar
5. Expand the Start MCP Servers step to see the configured Nuxt tools

For more information on using MCP with GitHub Copilot coding agent, see [Extend coding agent with MCP](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp){rel="nofollow"}.

Once configured, you can ask your AI assistant questions like:

- "List all available Nuxt UI components"
- "Get Button component documentation"
- "What props does Input accept?"
- "Find form-related components"
- "List dashboard templates"
- "Get template setup instructions"
- "Show installation guide"
- "Get v4 migration guide"
- "List all examples"
- "Get ContactForm example code"

The AI assistant will use the MCP server to fetch structured JSON data and provide guided assistance for Nuxt UI during development.

**Examples:**

Example 1 (bash):

```bash
claude mcp add --transport http nuxt-ui-remote https://ui.nuxt.com/mcp
```

Example 2 (unknown):

```unknown
### Google Antigravity

#### Setup Instructions:

1. Open the MCP store via the "..." dropdown at the top of the editor's agent panel.
2. Click on "Manage MCP Servers"
3. Click on "View raw config"
4. Modify the `mcp_config.json` with your custom MCP server configuration:
```

Example 3 (unknown):

```unknown
5. Return to the "Manage MCP Servers" tab and click "Refresh". The Nuxt UI MCP server should now appear.

### Le Chat Mistral

#### Setup Instructions:

1. Navigate to "Intelligence" > "Connectors"
2. Click on "Add Connector" button, then select "Custom MCP Connector"
3. Create your Custom MCP Connector:


   - Connector Name : `NuxtUI`
   - Connector Server : `https://ui.nuxt.com/mcp`

### Visual Studio Code

::note{icon="i-lucide-info"}
**Install required extensions** - Ensure you have [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot){rel="nofollow"} and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat){rel="nofollow"} extensions installed.
::

#### Setup Instructions:

1. Open VS Code and access the Command Palette (Ctrl/Cmd + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)" and select it
3. Navigate to your project's `.vscode` folder or create one if it doesn't exist
4. Create or edit the `mcp.json` file with the following configuration:
```

Example 4 (unknown):

```unknown
### Windsurf

#### Setup Instructions:

1. Open Windsurf and navigate to "Settings" > "Windsurf Settings" > "Cascade"
2. Click the "Manage MCPs" button, then select the "View raw config" option
3. Add the following configuration to your MCP settings:
```

---

## User

**URL:** llms-txt#user

**Contents:**

- Usage
  - Name
  - Description
  - Avatar
  - Chip
  - Size
  - Orientation
  - Link
- API
  - Props

Use the `name` prop to display a name for the user.

Use the `description` prop to display a description for the user.

Use the `avatar` prop to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) component.

::collapsible{name="all avatar properties"}

Use the `chip` prop to display a [Chip](https://ui.nuxt.com/docs/components/chip) component.

::collapsible{name="all chip properties"}

Use the `size` prop to change the size of the user avatar and text.

Use the `orientation` prop to change the orientation. Defaults to `horizontal`.

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

::note
The `NuxtLink` component will inherit all other attributes you pass to the `User` component.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UUser name="John Doe" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UUser name="John Doe" description="Software Engineer" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UUser name="John Doe" description="Software Engineer" />
</template>
```

Example 4 (ts):

```ts
/**
 * Props for the Avatar component
 */
interface AvatarProps {
  /**
   * The element or component this component should render as.
   */
  as?: any;
  src?: string | undefined;
  alt?: string | undefined;
  icon?: any;
  text?: string | undefined;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '3xs' | '2xl' | '3xl' | undefined;
  chip?: boolean | ChipProps | undefined;
  ui?: { root?: ClassNameValue; image?: ClassNameValue; fallback?: ClassNameValue; icon?: ClassNameValue } | undefined;
  loading?: 'lazy' | 'eager' | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  crossorigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  decoding?: 'async' | 'auto' | 'sync' | undefined;
  height?: Numberish | undefined;
  sizes?: string | undefined;
  srcset?: string | undefined;
  usemap?: string | undefined;
  width?: Numberish | undefined;
}
```

---

## EditorDragHandle

**URL:** llms-txt#editordraghandle

**Contents:**

- Usage
  - Icon
  - Options
- Examples
  - With dropdown menu
  - With suggestion menu
- API
  - Props
  - Slots
  - Emits

The EditorDragHandle component provides drag-and-drop functionality for reordering editor blocks using the `@tiptap/extension-drag-handle-vue-3` package.

::caution
It must be used inside an [Editor](https://ui.nuxt.com/docs/components/editor) component's default slot to have access to the editor instance.
::

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/functionality/drag-handle-vue

---

Learn more about the Drag Handle extension in the TipTap documentation.
::

Use the `icon` prop to customize the drag handle icon.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.drag` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.drag` key.
:::
::

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

::note
The offset is automatically calculated to center the handle for small blocks and align it to the top for taller blocks.
::

### With dropdown menu

Use the default slot to add a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu) with block-level actions like duplicate, delete, move up/down, or transform blocks into different types.

Listen to the `@node-change` event to track the currently hovered node and its position, then use `editor.chain().setMeta('lockDragHandle', open).run()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to lock the handle position while the menu is open.

::note
This example uses the `mapEditorItems` utility from `@nuxt/ui/utils/editor` to automatically map handler kinds (like `duplicate`, `delete`, `moveUp`, etc.) to their corresponding editor commands with proper state management.
::

### With suggestion menu

Use the default slot to add a [Button](https://ui.nuxt.com/docs/components/button) next to the drag handle to open the [EditorSuggestionMenu](https://ui.nuxt.com/docs/components/editor-suggestion-menu).

Call the `onClick` slot function to get the current node position, then use `handlers.suggestion?.execute(editor, { pos: node?.pos }).run()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to insert new blocks at that position.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout
---
icon: i-custom-tiptap
target: _blank
to: https://tiptap.dev/docs/editor/extensions/functionality/drag-handle-vue
---
Learn more about the Drag Handle extension in the TipTap documentation.
::

### Icon

Use the `icon` prop to customize the drag handle icon.
```

Example 2 (unknown):

```unknown
::framework-only
#nuxt
  :::tip
  ---
  to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme
  ---
  You can customize this icon globally in your `app.config.ts` under `ui.icons.drag` key.
  :::

#vue
  :::tip
  ---
  to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme
  ---
  You can customize this icon globally in your `vite.config.ts` under `ui.icons.drag` key.
  :::
::

### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

::note
The offset is automatically calculated to center the handle for small blocks and align it to the top for taller blocks.
::
```

Example 3 (unknown):

```unknown
## Examples

### With dropdown menu

Use the default slot to add a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu) with block-level actions like duplicate, delete, move up/down, or transform blocks into different types.

Listen to the `@node-change` event to track the currently hovered node and its position, then use `editor.chain().setMeta('lockDragHandle', open).run()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to lock the handle position while the menu is open.
```

Example 4 (unknown):

```unknown
::note
This example uses the `mapEditorItems` utility from `@nuxt/ui/utils/editor` to automatically map handler kinds (like `duplicate`, `delete`, `moveUp`, etc.) to their corresponding editor commands with proper state management.
::

### With suggestion menu

Use the default slot to add a [Button](https://ui.nuxt.com/docs/components/button) next to the drag handle to open the [EditorSuggestionMenu](https://ui.nuxt.com/docs/components/editor-suggestion-menu).

Call the `onClick` slot function to get the current node position, then use `handlers.suggestion?.execute(editor, { pos: node?.pos }).run()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to insert new blocks at that position.
```

---

## Marquee

**URL:** llms-txt#marquee

**Contents:**

- Usage
  - Pause on Hover
  - Reverse
  - Orientation
  - Repeat
  - Overlay
- Examples
  - Testimonials
  - Screenshots
- API

Use the default slot with your content to create an infinite scrolling animation.

Use the `pause-on-hover` prop to pause the animation when the user hovers over the content.

Use the `reverse` prop to reverse the direction of the animation.

Use the `orientation` prop to change the scrolling direction.

Use the `repeat` prop to specify how many times the content should be repeated in the animation.

Use the `overlay` prop to remove the gradient overlays on the edges of the marquee.

Use the `Marquee` component to create an infinite scrolling animation for your testimonials.

Use the `Marquee` component to create an infinite scrolling animation for your screenshots.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UMarquee>
    <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
  </UMarquee>
</template>
```

Example 2 (vue):

```vue
<template>
  <UMarquee pause-on-hover>
    <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
  </UMarquee>
</template>
```

Example 3 (vue):

```vue
<template>
  <UMarquee reverse>
    <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
  </UMarquee>
</template>
```

Example 4 (vue):

```vue
<template>
  <UMarquee orientation="vertical">
    <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
    <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
  </UMarquee>
</template>
```

---

## Breadcrumb

**URL:** llms-txt#breadcrumb

**Contents:**

- Usage
  - Items
  - Separator Icon
- Examples
  - With separator slot
  - With custom slot
- API
  - Props
  - Slots
- Theme

Use the Breadcrumb component to show the current page's location in your site's hierarchy.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLabel?: ClassNameValue, separator?: ClassNameValue, separatorIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::note
A `span` is rendered instead of a link when the `to` property is not defined.
::

Use the `separator-icon` prop to customize the [Icon](https://ui.nuxt.com/docs/components/icon) between each item. Defaults to `i-lucide-chevron-right`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronRight` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronRight` key.
:::
::

### With separator slot

Use the `#separator` slot to customize the separator between each item.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      label: 'Docs',
      icon: 'i-lucide-book-open',
      to: '/docs',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/docs/components',
    },
    {
      label: 'Breadcrumb',
      icon: 'i-lucide-link',
      to: '/docs/components/breadcrumb',
    },
  ]);
</script>

<template>
  <UBreadcrumb :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { BreadcrumbItem } from '@nuxt/ui';

  const items = ref<BreadcrumbItem[]>([
    {
      label: 'Docs',
      icon: 'i-lucide-book-open',
      to: '/docs',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/docs/components',
    },
    {
      label: 'Breadcrumb',
      icon: 'i-lucide-link',
      to: '/docs/components/breadcrumb',
    },
  ]);
</script>

<template>
  <UBreadcrumb :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { BreadcrumbItem } from '@nuxt/ui';

  const items = ref<BreadcrumbItem[]>([
    {
      label: 'Docs',
      icon: 'i-lucide-book-open',
      to: '/docs',
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/docs/components',
    },
    {
      label: 'Breadcrumb',
      icon: 'i-lucide-link',
      to: '/docs/components/breadcrumb',
    },
  ]);
</script>

<template>
  <UBreadcrumb separator-icon="i-lucide-arrow-right" :items="items" />
</template>
```

Example 4 (unknown):

```unknown
### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

---

## Create a basic component

**URL:** llms-txt#create-a-basic-component

nuxt-ui make component my-component

---

## Slideover

**URL:** llms-txt#slideover

**Contents:**

- Usage
  - Title
  - Description
  - Close
  - Close Icon
  - Side
  - Transition
  - Overlay
  - Modal
  - Dismissible

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Slideover.

Then, use the `#content` slot to add the content displayed when the Slideover is open.

You can also use the `#header`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, `#body`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and `#footer`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} slots to customize the Slideover's content.

Use the `title` prop to set the title of the Slideover's header.

Use the `description` prop to set the description of the Slideover's header.

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Slideover's header.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

::note
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `side` prop to set the side of the screen where the Slideover will slide in from. Defaults to `right`.

Use the `transition` prop to control whether the Slideover is animated or not. Defaults to `true`.

Use the `overlay` prop to control whether the Slideover has an overlay or not. Defaults to `true`.

Use the `modal` prop to control whether the Slideover blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

Use the `dismissible` prop to control whether the Slideover is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Slideover's background interactive without closing it.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Slideover by pressing ``.
::

::tip
This allows you to move the trigger outside of the Slideover or remove it entirely.
::

### Programmatic usage

You can use the [`useOverlay`](https://ui.nuxt.com/docs/composables/use-overlay) composable to open a Slideover programmatically.

::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses the [`OverlayProvider`](https://github.com/nuxt/ui/blob/v4/src/runtime/components/OverlayProvider.vue){rel="nofollow"} component.
::

First, create a slideover component that will be opened programmatically:

::note
We are emitting a `close` event when the slideover is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::tip
You can close the slideover within the slideover component by emitting `emit('close')`.
::

### Nested slideovers

You can nest slideovers within each other.

Use the `#footer` slot to add content after the Slideover's body.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <USlideover>
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-full m-4" /> </template
  ></USlideover>
</template>
```

Example 2 (vue):

```vue
<template>
  <USlideover title="Slideover with title">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-full" /> </template
  ></USlideover>
</template>
```

Example 3 (vue):

```vue
<template>
  <USlideover title="Slideover with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-full" /> </template
  ></USlideover>
</template>
```

Example 4 (vue):

```vue
<template>
  <USlideover title="Slideover with close button">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-full" /> </template
  ></USlideover>
</template>
```

---

## DashboardGroup

**URL:** llms-txt#dashboardgroup

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardGroup component is the main layout that wraps the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) and [DashboardPanel](https://ui.nuxt.com/docs/components/dashboard-panel) components to create a responsive dashboard interface.

Use it in a layout or in your `app.vue`:

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
## API

### Props
```

Example 2 (unknown):

```unknown
### Slots
```

Example 3 (unknown):

```unknown
## Theme
```

---

## Tooltip

**URL:** llms-txt#tooltip

**Contents:**

- Usage
  - Text
  - Kbds
  - Delay
  - Content
  - Arrow
  - Disabled
- Examples
  - Control open state
  - With following cursor

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Tooltip.

::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses the [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider){rel="nofollow"} component from Reka UI.
::

::tip{to="https://ui.nuxt.com/docs/components/app#props"}
You can check the `App` component `tooltip` prop to see how to configure the Tooltip globally.
::

Use the `text` prop to set the content of the Tooltip.

Use the `kbds` prop to render [Kbd](https://ui.nuxt.com/docs/components/kbd) components in the Tooltip.

::tip
You can use special keys like `meta` that displays as `⌘` on macOS and `Ctrl` on other platforms.
::

Use the `delay-duration` prop to change the delay before the Tooltip appears. For example, you can make it appear instantly by setting it to `0`.

::tip
This can be configured globally through the `tooltip.delayDuration` option in the [`App`](https://ui.nuxt.com/docs/components/app) component.
::

Use the `content` prop to control how the Tooltip content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the Tooltip.

Use the `disabled` prop to disable the Tooltip.

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Tooltip by pressing ``.
::

### With following cursor

You can make the Tooltip follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger){rel="nofollow"} prop:

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UTooltip text="Open on GitHub">
    <UButton label="Open" color="neutral" variant="subtle" />
  </UTooltip>
</template>
```

Example 2 (vue):

```vue
<template>
  <UTooltip text="Open on GitHub">
    <UButton label="Open" color="neutral" variant="subtle" />
  </UTooltip>
</template>
```

Example 3 (vue):

```vue
<template>
  <UTooltip text="Open on GitHub">
    <UButton label="Open" color="neutral" variant="subtle" />
  </UTooltip>
</template>
```

Example 4 (vue):

```vue
<template>
  <UTooltip :delay-duration="0" text="Open on GitHub">
    <UButton label="Open" color="neutral" variant="subtle" />
  </UTooltip>
</template>
```

---

## PageHero

**URL:** llms-txt#pagehero

**Contents:**

- Usage
  - Title
  - Description
  - Headline
  - Links
  - Orientation
  - Reverse
- API
  - Props
  - Slots

The PageHero component wraps your content in a [Container](https://ui.nuxt.com/docs/components/container) while maintaining full-width flexibility making it easy to add background colors, images or patterns. It provides a flexible way to display content with an illustration in the default slot.

::code-preview
:::u-page-hero

---

description: A Nuxt/Vue-integrated UI library providing a rich set of
fully-styled, accessible and highly customizable components for building
modern web applications.
title: Ultimate Vue UI library

---

    ::::u-page-card
    ---
    class: rounded-lg
    variant: subtle
    ---
    #default{unwrap="p"}
    ![App screenshot](https://ui.nuxt.com/blocks/image4.png){.rounded-sm.shadow-2xl.ring.ring-default height="3000" width="4804"}
    ::::

:::
::

Use the `title` prop to set the title of the hero.

Use the `description` prop to set the description of the hero.

Use the `headline` prop to set the headline of the hero.

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) under the description.

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

Use the `reverse` prop to reverse the orientation of the default slot.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPageHero title="Ultimate Vue UI library" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPageHero
    title="Ultimate Vue UI library"
    description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPageHero
    title="Ultimate Vue UI library"
    description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications."
    headline="New release" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPageHero
    title="Ultimate Vue UI library"
    description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications." />
</template>
```

---

## Calendar

**URL:** llms-txt#calendar

**Contents:**

- Usage
  - Multiple
  - Range
  - Color
  - Variant
  - Size
  - Disabled
  - Number Of Months
  - Month Controls
  - Year Controls

Use the `v-model` directive to control the selected date.

Use the `default-value` prop to set the initial value when you do not need to control its state.

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html){rel="nofollow"} package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner. Format of date depends on the [`locale`](https://ui.nuxt.com/docs/getting-started/integrations/i18n) installed in your application.
::

Use the `multiple` prop to allow multiple selections.

Use the `range` prop to select a range of dates.

Use the `color` prop to change the color of the calendar.

Use the `variant` prop to change the variant of the calendar.

Use the `size` prop to change the size of the calendar.

Use the `disabled` prop to disable the calendar.

Use the `numberOfMonths` prop to change the number of months in the calendar.

Use the `month-controls` prop to show the month controls. Defaults to `true`.

Use the `year-controls` prop to show the year controls. Defaults to `true`.

Use the `fixed-weeks` prop to display the calendar with fixed weeks.

Use the [Chip](https://ui.nuxt.com/docs/components/chip) component to add events to specific days.

### With disabled dates

Use the `is-date-disabled` prop with a function to mark specific dates as disabled.

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

### With other calendar systems

You can use other calenders from `@internationalized/date` to implement a different calendar system.

## ::note

## to: https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations

You can check all the available calendars on `@internationalized/date` docs.
::

### With external controls

You can control the calendar with external controls by manipulating the date passed in the `v-model`.

Use a [Button](https://ui.nuxt.com/docs/components/button) and a [Popover](https://ui.nuxt.com/docs/components/popover) component to create a date picker.

### As a DateRangePicker

Use a [Button](https://ui.nuxt.com/docs/components/button) and a [Popover](https://ui.nuxt.com/docs/components/popover) component to create a date range picker.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const value = ref(new CalendarDate(2022, 2, 3));
</script>

<template>
  <UCalendar v-model="value" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UCalendar />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  const value = ref(new CalendarDate(2022, 2, 4, 2022, 2, 6, 2022, 2, 8));
</script>

<template>
  <UCalendar multiple v-model="value" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UCalendar range v-model="value" />
</template>
```

---

## Switch

**URL:** llms-txt#switch

**Contents:**

- Usage
  - Label
  - Description
  - Icon
  - Loading
  - Loading Icon
  - Color
  - Size
  - Disabled
- API

Use the `v-model` directive to control the checked state of the Switch.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `label` prop to set the label of the Switch.

When using the `required` prop, an asterisk is added next to the label.

Use the `description` prop to set the description of the Switch.

Use the `checked-icon` and `unchecked-icon` props to set the icons of the Switch when checked and unchecked.

Use the `loading` prop to show a loading icon on the Switch.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `color` prop to change the color of the Switch.

Use the `size` prop to change the size of the Switch.

Use the `disabled` prop to disable the Switch.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <USwitch model-value />
</template>
```

Example 2 (vue):

```vue
<template>
  <USwitch default-value />
</template>
```

Example 3 (vue):

```vue
<template>
  <USwitch label="Check me" />
</template>
```

Example 4 (vue):

```vue
<template>
  <USwitch required label="Check me" />
</template>
```

---

## DashboardNavbar

**URL:** llms-txt#dashboardnavbar

**Contents:**

- Usage
  - Title
  - Icon
  - Toggle
  - Toggle Side
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardNavbar component is a responsive navigation bar that integrates with the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) component. It includes a mobile toggle button to enable responsive navigation in dashboard layouts.

Use it inside the `header` slot of the [DashboardPanel](https://ui.nuxt.com/docs/components/dashboard-panel) component:

Use the `left`, `default` and `right` slots to customize the navbar.

::note
In this example, we use the [Tabs](https://ui.nuxt.com/docs/components/tabs) component in the right slot to display some tabs.
::

Use the `title` prop to set the title of the navbar.

Use the `icon` prop to set the icon of the navbar.

Use the `toggle` prop to customize the toggle button displayed on mobile that opens the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) component.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `toggle-side` prop to change the side of the toggle button. Defaults to `right`.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
Use the `left`, `default` and `right` slots to customize the navbar.
```

Example 2 (unknown):

```unknown
::note
In this example, we use the [Tabs](https://ui.nuxt.com/docs/components/tabs) component in the right slot to display some tabs.
::

### Title

Use the `title` prop to set the title of the navbar.
```

Example 3 (unknown):

```unknown
### Icon

Use the `icon` prop to set the icon of the navbar.
```

Example 4 (unknown):

```unknown
### Toggle

Use the `toggle` prop to customize the toggle button displayed on mobile that opens the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) component.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.
```

---

## Kbd

**URL:** llms-txt#kbd

**Contents:**

- Usage
  - Value
  - Color
  - Variant
  - Size
- Examples
  - `class` prop
- API
  - Props
  - Slots

Use the default slot to set the value of the Kbd.

Use the `value` prop to set the value of the Kbd.

You can pass special keys to the `value` prop that goes through the [`useKbd`](https://github.com/nuxt/ui/blob/v4/src/runtime/composables/useKbd.ts){rel="nofollow"} composable. For example, the `meta` key displays as `⌘` on macOS and `Ctrl` on other platforms.

Use the `color` prop to change the color of the Kbd.

Use the `variant` prop to change the variant of the Kbd.

Use the `size` prop to change the size of the Kbd.

Use the `class` prop to override the base styles of the Badge.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UKbd> K </UKbd>
</template>
```

Example 2 (vue):

```vue
<template>
  <UKbd value="K" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UKbd value="meta" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UKbd color="neutral"> K </UKbd>
</template>
```

---

## useFormField

**URL:** llms-txt#useformfield

**Contents:**

- Usage

Use the auto-imported `useFormField` composable to integrate custom inputs with a [Form](https://ui.nuxt.com/docs/components/form).

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const { id, emitFormBlur, emitFormInput, emitFormChange } = useFormField();
</script>
```

---

## PageLinks

**URL:** llms-txt#pagelinks

**Contents:**

- Usage
  - Links
  - Title
- Examples
  - Within a page
- API
  - Props
  - Slots
- Theme
- Changelog

Use the PageLinks component to display a list of links.

Use the `links` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

Use the `title` prop to display a title above the links.

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PageLinks component in the `bottom` slot of the ContentToc component to display a list of links below the table of contents.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPageLinks />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { PageLink } from '@nuxt/ui';
</script>

<template>
  <UPageLinks />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { PageLink } from '@nuxt/ui';
</script>

<template>
  <UPageLinks title="Community" />
</template>
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## Create a prose component

**URL:** llms-txt#create-a-prose-component

nuxt-ui make component heading --prose

---

## BlogPosts

**URL:** llms-txt#blogposts

**Contents:**

- Usage
  - Posts
  - Orientation
- Examples
  - Within a page
- API
  - Props
  - Slots
- Theme
- Changelog

The BlogPosts component provides a flexible layout to display a list of [BlogPost](https://ui.nuxt.com/docs/components/blog-post) components using either the default slot or the `posts` prop.

Use the `posts` prop as an array of objects with the properties of the [BlogPost](https://ui.nuxt.com/docs/components/blog-post#props) component.

Use the `orientation` prop to change the orientation of the BlogPosts. Defaults to `horizontal`.

::tip
When using the `posts` prop instead of the default slot, the `orientation` of the posts is automatically reversed, `horizontal` to `vertical` and vice versa.
::

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the BlogPosts component in a page to create a blog page:

::note
In this example, the `posts` are fetched using `queryCollection` from the `@nuxt/content` module.
::

::tip
The `to` prop is overridden here since `@nuxt/content` uses the `path` property.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Posts

Use the `posts` prop as an array of objects with the properties of the [BlogPost](https://ui.nuxt.com/docs/components/blog-post#props) component.
```

Example 2 (unknown):

```unknown
### Orientation

Use the `orientation` prop to change the orientation of the BlogPosts. Defaults to `horizontal`.
```

Example 3 (unknown):

```unknown
::tip
When using the `posts` prop instead of the default slot, the `orientation` of the posts is automatically reversed, `horizontal` to `vertical` and vice versa.
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

### Within a page

Use the BlogPosts component in a page to create a blog page:
```

Example 4 (unknown):

```unknown
::note
In this example, the `posts` are fetched using `queryCollection` from the `@nuxt/content` module.
::

::tip
The `to` prop is overridden here since `@nuxt/content` uses the `path` property.
::

## API

### Props
```

---

## PageBody

**URL:** llms-txt#pagebody

**Contents:**

- Usage
- Examples
  - Within a page
- API
  - Props
  - Slots
- Theme
- Changelog

The PageBody component wraps your main content and adds some padding for consistent spacing.

Use it inside the default slot of the [Page](https://ui.nuxt.com/docs/components/page) component, after the [PageHeader](https://ui.nuxt.com/docs/components/page-header) component:

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PageBody component in a page to display the content of the page:

::note
In this example, we use the [`ContentRenderer`](https://content.nuxt.com/docs/components/content-renderer){rel="nofollow"} component from `@nuxt/content` to render the content of the page.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

### Within a page

Use the PageBody component in a page to display the content of the page:
```

Example 2 (unknown):

```unknown
::note
In this example, we use the [`ContentRenderer`](https://content.nuxt.com/docs/components/content-renderer){rel="nofollow"} component from `@nuxt/content` to render the content of the page.
::

## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## LLMs.txt

**URL:** llms-txt#llms.txt

**Contents:**

- What is LLMs.txt?
- Available routes
- Choosing the Right File
- Important usage notes
- Usage with AI Tools
  - Cursor
  - Windsurf
  - Other AI Tools

LLMs.txt is a structured documentation format specifically designed for large language models (LLMs). Nuxt UI provides LLMs.txt files that contain comprehensive information about our component library, making it easy for AI tools to understand and assist with Nuxt UI development.

These files are optimized for AI consumption and contain structured information about components, APIs, usage patterns, and best practices.

We provide LLMs.txt routes to help AI tools access our documentation:

- **`/llms.txt`** - Contains a structured overview of all components and their documentation links (\~5K tokens)
- **`/llms-full.txt`** - Provides comprehensive documentation including implementation details, examples, theming, composables, and migration guidance (\~1M+ tokens)

## Choosing the Right File

::note{icon="i-lucide-info"}
**Most users should start with `/llms.txt`** - it contains all essential information and works with standard LLM context windows. Use `/llms-full.txt` only if you need comprehensive implementation examples and your AI tool supports large contexts (200K+ tokens).
::

## Important usage notes

::warning{icon="i-lucide-alert-triangle"}
**@-symbol must be typed manually** - When using tools like Cursor or Windsurf, the `@` symbol must be typed by hand in the chat interface. Copy-pasting breaks the tool's ability to recognize it as a context reference.
::

## Usage with AI Tools

Nuxt UI provides specialized LLMs.txt files that you can reference in Cursor for better AI assistance with component development.

1. **Direct reference**: Mention the LLMs.txt URLs when asking questions
2. Add these specific URLs to your project context using `@docs`

[Read more about Cursor Web and Docs Search](https://docs.cursor.com/en/context/@-symbols/@-docs){rel="nofollow"}

Windsurf can directly access the Nuxt UI LLMs.txt files to understand component usage and best practices.

#### Using LLMs.txt with Windsurf:

- Use `@docs` to reference specific LLMs.txt URLs
- Create persistent rules referencing these URLs in your workspace

[Read more about Windsurf Web and Docs Search](https://docs.windsurf.com/windsurf/cascade/web-search){rel="nofollow"}

Any AI tool that supports LLMs.txt can use these routes to better understand Nuxt UI.

#### Examples for ChatGPT, Claude, or other LLMs:

- "Using Nuxt UI documentation from <https://ui.nuxt.com/llms.txt>{rel="nofollow"}"
- "Follow complete Nuxt UI guidelines from <https://ui.nuxt.com/llms-full.txt>{rel="nofollow"}"

---

## PageCTA

**URL:** llms-txt#pagecta

**Contents:**

- Usage
  - Title
  - Description
  - Links
  - Variant
  - Orientation
  - Reverse
- API
  - Props
  - Slots

The PageCTA component provides a flexible way to display a call to action in your pages with an illustration in the default slot.

::code-preview
:::u-page-c-t-a

---

links: - label: Get started
color: neutral - label: Learn more
color: neutral
variant: subtle
trailingIcon: i-lucide-arrow-right
description: Preview the latest Tailwind CSS v4 and get started with Nuxt UI.
orientation: horizontal
title: Trusted and supported by our amazing community

---

![Illustration](https://picsum.photos/640/616){.w-full.rounded-lg height="308" width="320"}
:::
::

Use it inside a [PageSection](https://ui.nuxt.com/docs/components/page-section) component or directly in your page:

::tip
Use `px-0` and `rounded-none` classes to make the CTA fill the edge of the page on mobile.
::

Use the `title` prop to set the title of the CTA.

Use the `description` prop to set the description of the CTA.

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) under the description.

Use the `variant` prop to change the style of the CTA.

::tip
You can apply the `light` or `dark` class to the `links` slot when using the `solid` variant to reverse the colors.
::

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

Use the `reverse` prop to reverse the orientation of the default slot.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
Use `px-0` and `rounded-none` classes to make the CTA fill the edge of the page on mobile.
::

### Title

Use the `title` prop to set the title of the CTA.
```

Example 2 (unknown):

```unknown
### Description

Use the `description` prop to set the description of the CTA.
```

Example 3 (unknown):

```unknown
### Links

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) under the description.
```

Example 4 (unknown):

```unknown
### Variant

Use the `variant` prop to change the style of the CTA.
```

---

## useToast

**URL:** llms-txt#usetoast

**Contents:**

- Usage
- API
  - add()
  - update()
  - remove()
  - clear()
  - `toasts`

Use the auto-imported `useToast` composable to display [Toast](https://ui.nuxt.com/docs/components/toast) notifications.

- The `useToast` composable uses Nuxt's `useState` to manage the toast state, ensuring reactivity across your application.
- A maximum of 5 toasts are displayed at a time. When adding a new toast that would exceed this limit, the oldest toast is automatically removed.
- When removing a toast, there's a 200ms delay before it's actually removed from the state, allowing for exit animations.

::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses our [`Toaster`](https://github.com/nuxt/ui/blob/v4/src/runtime/components/Toaster.vue){rel="nofollow"} component which uses the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider){rel="nofollow"} component from Reka UI.
::

::tip{to="https://ui.nuxt.com/docs/components/toast"}
Learn how to customize the appearance and behavior of toasts in the **Toast** component documentation.
::

`useToast()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

The `useToast` composable provides methods to manage toast notifications globally.

`add(toast: Partial<Toast>): Toast`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Adds a new toast notification.

::field-group
:::field{required name="toast" required="true" type="Partial<Toast>"}
A partial `Toast` object with the following properties:

    ::::collapsible
      :::::field-group
        ::::::field{name="id" type="string | number"}
        A unique identifier for the toast. If not provided, a timestamp will be used.
        ::::::

        ::::::field{name="open" type="boolean"}
        Whether the toast is open. Defaults to `true`.
        ::::::

        ::::::field{name="..." type="Toast"}
        Other properties from the `Toast` interface.
        ::::::
      :::::
    ::::

:::
::

**Returns:** The complete `Toast` object that was added.

`update(id: string | number, toast: Partial<Toast>): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Updates an existing toast notification.

::field-group
:::field{required name="id" required="true" type="string | number"}
The unique identifier of the toast to update.
:::

:::field{required name="toast" required="true" type="Partial<Toast>"}
A partial `Toast` object with the properties to update.
:::
::

`remove(id: string | number): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Removes a toast notification.

::field-group
:::field{required name="id" required="true" type="string | number"}
The unique identifier of the toast to remove.
:::
::

`clear(): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Removes all toast notifications.

`toasts: Ref<Toast[]>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

- Type: `Ref<Toast[]>`
- Description: A reactive array containing all current toast notifications.

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const toast = useToast();
</script>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const toast = useToast();

  function showToast() {
    toast.add({
      title: 'Success',
      description: 'Your action was completed successfully.',
      color: 'success',
    });
  }
</script>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  const toast = useToast();

  function updateToast(id: string | number) {
    toast.update(id, {
      title: 'Updated Toast',
      description: 'This toast has been updated.',
    });
  }
</script>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const toast = useToast();

  function removeToast(id: string | number) {
    toast.remove(id);
  }
</script>
```

---

## FieldGroup

**URL:** llms-txt#fieldgroup

**Contents:**

- Usage
  - Size
  - Orientation
- Examples
  - With input
  - With tooltip
  - With dropdown
  - With badge
- API
  - Props

Wrap multiple [Button](https://ui.nuxt.com/components/button) within a FieldGroup to group them together.

Use the `size` prop to change the size of all the buttons.

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

You can use components like [Input](https://ui.nuxt.com/components/input), [InputMenu](https://ui.nuxt.com/components/input-menu), [Select](https://ui.nuxt.com/components/select) [SelectMenu](https://ui.nuxt.com/components/select-menu), etc. within a field group.

You can use a [Tooltip](https://ui.nuxt.com/components/tooltip) within a field group.

You can use a [DropdownMenu](https://ui.nuxt.com/components/dropdown-menu) within a field group.

You can use a [Badge](https://ui.nuxt.com/components/badge) within a field group.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UFieldGroup>
    <UButton color="neutral" variant="subtle" label="Button" />
    <UButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
  </UFieldGroup>
</template>
```

Example 2 (vue):

```vue
<template>
  <UFieldGroup size="xl">
    <UButton color="neutral" variant="subtle" label="Button" />
    <UButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
  </UFieldGroup>
</template>
```

Example 3 (vue):

```vue
<template>
  <UFieldGroup orientation="vertical">
    <UButton color="neutral" variant="subtle" label="Submit" />
    <UButton color="neutral" variant="outline" label="Cancel" />
  </UFieldGroup>
</template>
```

Example 4 (vue):

```vue
<template>
  <UFieldGroup>
    <UInput color="neutral" variant="outline" placeholder="Enter token" />

    <UButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
  </UFieldGroup>
</template>
```

---

## Generate only documentation template

**URL:** llms-txt#generate-only-documentation-template

**Contents:**

- Locales
- Submit a Pull Request (PR)
  - Local development
  - IDE Setup
  - Linting
  - Type checking
  - Testing
  - Commit conventions
  - Making a Pull Request
- Thanks

nuxt-ui make component my-component --template=docs
sh
nuxt-ui make locale --code <code> --name <name>
sh
git clone -b v4 https://github.com/nuxt/ui.git
sh
corepack enable
sh
pnpm install
sh
pnpm run dev:prepare
sh
pnpm run docs
sh
pnpm run dev
sh
pnpm run dev:vue
json
{
"editor.codeActionsOnSave": {
"source.fixAll": false,
"source.fixAll.eslint": true
}
}
sh
pnpm run lint # check for linting errors
pnpm run lint:fix # fix linting errors
sh
pnpm run typecheck
sh
pnpm run test

````

::tip
If you have to update the snapshots, press `u` after the tests have finished running.
::

### Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/){rel="nofollow"} for commit messages, which allows a changelog to be auto-generated based on the commits. Please read the [guide](https://www.conventionalcommits.org/en/v1.0.0/#summary){rel="nofollow"} through if you aren't familiar with it already.

- Use `fix` and `feat` for code changes that affect functionality or logic
- Use `docs` for documentation changes and `chore` for maintenance tasks

### Making a Pull Request

- Follow along the [instructions](https://github.com/nuxt/ui/blob/v4/.github/PULL_REQUEST_TEMPLATE.md?plain=1){rel="nofollow"} provided when creating a PR
- Ensure your PR's title adheres to the [Conventional Commits](https://www.conventionalcommits.org/){rel="nofollow"} since it will be used once the code is merged.
- Multiple commits are fine; no need to rebase or force push. We'll use `Squash and Merge` when merging.
- Ensure `lint`, `typecheck` and `tests` work before submitting the PR. Avoid making unrelated changes.

We'll review it promptly. If assigned to a maintainer, they'll review it carefully. Ignore the red text; it's for tracking purposes.

Thank you again for being interested in this project! You are awesome! ❤️

**Examples:**

Example 1 (unknown):
```unknown
::note
When creating a new component, the CLI will automatically generate all the necessary files like the component itself, theme, tests, and documentation.
::

### Locales

You can create new locales using the following command:
````

Example 2 (unknown):

```unknown
::note
---
to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt#supported-languages
---
Learn more about **i18n** in the documentation.
::

## Submit a Pull Request (PR)

Before you start, check if there's an existing issue describing the problem or feature request you're working on. If there is, please leave a comment on the issue to let us know you're working on it.

If there isn't, open a new issue to discuss the problem or feature.

### Local development

To begin local development, follow these steps:

::steps{level="4"}
#### Clone the `nuxt/ui` repository to your local machine
```

Example 3 (unknown):

```unknown
#### Enable [Corepack](https://github.com/nodejs/corepack){rel="nofollow"}
```

Example 4 (unknown):

```unknown
#### Install dependencies
```

---

## Modal

**URL:** llms-txt#modal

**Contents:**

- Usage
  - Title
  - Description
  - Close
  - Close Icon
  - Transition
  - Overlay
  - Modal
  - Dismissible
  - Scrollable :badge{.align-text-top label="4.2+"}

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Modal.

Then, use the `#content` slot to add the content displayed when the Modal is open.

You can also use the `#header`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, `#body`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and `#footer`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} slots to customize the Modal's content.

Use the `title` prop to set the title of the Modal's header.

Use the `description` prop to set the description of the Modal's header.

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Modal's header.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

::tip
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `transition` prop to control whether the Modal is animated or not. Defaults to `true`.

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

Use the `modal` prop to control whether the Modal blocks interaction with outside content. Defaults to `true`.

::note
When `modal` is set to `false`, the overlay is automatically disabled and outside content becomes interactive.
::

Use the `dismissible` prop to control whether the Modal is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

::tip
You can combine `modal: false` with `dismissible: false` to make the Modal's background interactive without closing it.
::

### Scrollable :badge{.align-text-top label="4.2+"}

Use the `scrollable` prop to make the Modal's content scrollable within the overlay.

::warning
As the overlay is needed for scrolling, `modal: false` is not compatible and `overlay: false` only removes the background.
::

::caution
There's a [known issue](https://reka-ui.com/docs/components/dialog#scrollable-overlay){rel="nofollow"} where clicking on the scrollbar may unintentionally close the dialog on some operating systems.
::

Use the `fullscreen` prop to make the Modal fullscreen.

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Modal by pressing ``.
::

::tip
This allows you to move the trigger outside of the Modal or remove it entirely.
::

### Programmatic usage

You can use the [`useOverlay`](https://ui.nuxt.com/docs/composables/use-overlay) composable to open a Modal programmatically.

::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses the [`OverlayProvider`](https://github.com/nuxt/ui/blob/v4/src/runtime/components/OverlayProvider.vue){rel="nofollow"} component.
::

First, create a modal component that will be opened programmatically:

::note
We are emitting a `close` event when the modal is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::tip
You can close the modal within the modal component by emitting `emit('close')`.
::

You can nest modals within each other.

Use the `#footer` slot to add content after the Modal's body.

### With command palette

You can use a [CommandPalette](https://ui.nuxt.com/docs/components/command-palette) component inside the Modal's content.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UModal>
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-48 m-4" /> </template
  ></UModal>
</template>
```

Example 2 (vue):

```vue
<template>
  <UModal title="Modal with title">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" /> </template
  ></UModal>
</template>
```

Example 3 (vue):

```vue
<template>
  <UModal title="Modal with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" /> </template
  ></UModal>
</template>
```

Example 4 (vue):

```vue
<template>
  <UModal title="Modal with close button">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" /> </template
  ></UModal>
</template>
```

---

## ColorPicker

**URL:** llms-txt#colorpicker

**Contents:**

- Usage
  - RGB Format
  - HSL Format
  - CMYK Format
  - CIELab Format
  - Throttle
  - Size
  - Disabled
- Examples
  - As a Color chooser

Use the `v-model` directive to control the value of the ColorPicker.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `format` prop to set `rgb` value of the ColorPicker.

Use the `format` prop to set `hsl` value of the ColorPicker.

Use the `format` prop to set `cmyk` value of the ColorPicker.

Use the `format` prop to set `lab` value of the ColorPicker.

Use the `throttle` prop to set the throttle value of the ColorPicker.

Use the `size` prop to set the size of the ColorPicker.

Use the `disabled` prop to disable the ColorPicker.

### As a Color chooser

Use a [Button](https://ui.nuxt.com/docs/components/button) and a [Popover](https://ui.nuxt.com/docs/components/popover) component to create a color chooser.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorPicker model-value="#00C16A" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UColorPicker default-value="#00BCD4" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UColorPicker format="rgb" model-value="rgb(0, 193, 106)" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UColorPicker format="hsl" model-value="hsl(153, 100%, 37.8%)" />
</template>
```

---

## PageGrid

**URL:** llms-txt#pagegrid

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

The PageGrid component provides a responsive grid layout for displaying [PageCard](https://ui.nuxt.com/docs/components/page-card) components or any other elements, automatically adjusting from 1 to 3 columns based on screen size.

You can also use it to display a list of cards in a bento style layout by using `col-span-*` and `row-span-*` utility classes.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
You can also use it to display a list of cards in a bento style layout by using `col-span-*` and `row-span-*` utility classes.
```

Example 2 (unknown):

```unknown
## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## Slider

**URL:** llms-txt#slider

**Contents:**

- Usage
  - Min / Max
  - Step
  - Multiple
  - Orientation
  - Color
  - Size
  - Tooltip
  - Disabled
  - Inverted

Use the `v-model` directive to control the value of the Slider.

Use the `default-value` prop to set the initial value when you do not need to control its state.

Use the `min` and `max` props to set the minimum and maximum values of the Slider. Defaults to `0` and `100`.

Use the `step` prop to set the increment value of the Slider. Defaults to `1`.

Use the `v-model` directive or the `default-value` prop with an array of values to create a range Slider.

Use the `min-steps-between-thumbs` prop to limit the minimum distance between the thumbs.

Use the `orientation` prop to change the orientation of the Slider. Defaults to `horizontal`.

Use the `color` prop to change the color of the Slider.

Use the `size` prop to change the size of the Slider.

Use the `tooltip` prop to display a [Tooltip](https://ui.nuxt.com/docs/components/tooltip) around the Slider thumbs with the current value. You can set it to `true` for default behavior or pass an object to customize it with any property from the [Tooltip](https://ui.nuxt.com/docs/components/tooltip#props) component.

Use the `disabled` prop to disable the Slider.

Use the `inverted` prop to visually invert the Slider.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <USlider :model-value="50" />
</template>
```

Example 2 (vue):

```vue
<template>
  <USlider :default-value="50" />
</template>
```

Example 3 (vue):

```vue
<template>
  <USlider :min="0" :max="50" :default-value="50" />
</template>
```

Example 4 (vue):

```vue
<template>
  <USlider :step="10" :default-value="50" />
</template>
```

---

## useOverlay

**URL:** llms-txt#useoverlay

**Contents:**

- Usage
- API
  - create()
  - open()
  - close()
  - patch()
  - unmount()
  - isOpen()
  - overlays
- Instance API

Use the auto-imported `useOverlay` composable to programmatically control [Modal](https://ui.nuxt.com/docs/components/modal) and [Slideover](https://ui.nuxt.com/docs/components/slideover) components.

- The `useOverlay` composable is created using `createSharedComposable`, ensuring that the same overlay state is shared across your entire application.

::note
In order to return a value from the overlay, the `overlay.open()` can be awaited. In order for this to work, however, the **overlay component must emit a `close` event**. See example below for details.
::

`useOverlay()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

The `useOverlay` composable provides methods to manage overlays globally. Each created overlay returns an instance with its own methods.

`create(component: T, options: OverlayOptions): OverlayInstance`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Create an overlay, and return a factory instance.

::field-group
:::field{required name="component" required="true" type="T"}
The overlay component to render.
:::

:::field{name="options" type="OverlayOptions"}
Configuration options for the overlay.

    ::::collapsible
      :::::field-group
        ::::::field{name="defaultOpen" type="boolean"}
        Open the overlay immediately after being created. Defaults to `false`.
        ::::::

        ::::::field{name="props" type="ComponentProps"}
        An optional object of props to pass to the rendered component.
        ::::::

        ::::::field{name="destroyOnClose" type="boolean"}
        Removes the overlay from memory when closed. Defaults to `false`.
        ::::::
      :::::
    ::::

:::
::

`open(id: symbol, props?: ComponentProps<T>): OpenedOverlay<T>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Open an overlay by its `id`.

::field-group
:::field{required name="id" required="true" type="symbol"}
The identifier of the overlay.
:::

:::field{name="props" type="ComponentProps<T>"}
An optional object of props to pass to the rendered component.
:::
::

`close(id: symbol, value?: any): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Close an overlay by its `id`.

::field-group
:::field{required name="id" required="true" type="symbol"}
The identifier of the overlay.
:::

:::field{name="value" type="any"}
A value to resolve the overlay promise with.
:::
::

`patch(id: symbol, props: ComponentProps<T>): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Update an overlay by its `id`.

::field-group
:::field{required name="id" required="true" type="symbol"}
The identifier of the overlay.
:::

:::field{required name="props" required="true" type="ComponentProps<T>"}
An object of props to update on the rendered component.
:::
::

`unmount(id: symbol): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Remove an overlay from the DOM by its `id`.

::field-group
:::field{required name="id" required="true" type="symbol"}
The identifier of the overlay.
:::
::

`isOpen(id: symbol): boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Check if an overlay is open using its `id`.

::field-group
:::field{required name="id" required="true" type="symbol"}
The identifier of the overlay.
:::
::

`overlays: Overlay[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

In-memory list of all overlays that were created.

`open(props?: ComponentProps<T>): Promise<OpenedOverlay<T>>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::field-group
:::field{name="props" type="ComponentProps<T>"}
An optional object of props to pass to the rendered component.
:::
::

`close(value?: any): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::field-group
:::field{name="value" type="any"}
A value to resolve the overlay promise with.
:::
::

`patch(props: ComponentProps<T>): void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Update the props of the overlay.

::field-group
:::field{required name="props" required="true" type="ComponentProps<T>"}
An object of props to update on the rendered component.
:::
::

Here's a complete example of how to use the `useOverlay` composable:

In this example, we're using the `useOverlay` composable to control multiple modals and slideovers.

When opening overlays programmatically (e.g. modals, slideovers, etc), the overlay component can only access injected values from the component containing `UApp` (typically `app.vue` or layout components). This is because overlays are mounted outside of the page context by the `UApp` component.

As such, using `provide()` in pages or parent components isn't supported directly. To pass provided values to overlays, the recommended approach is to use props instead:

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  import { LazyModalExample } from '#components';

  const overlay = useOverlay();

  const modal = overlay.create(LazyModalExample);

  async function openModal() {
    modal.open();
  }
</script>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import { LazyModalExample } from '#components';

  const overlay = useOverlay();

  const modal = overlay.create(LazyModalExample);

  function openModal() {
    modal.open({
      title: 'Welcome',
    });
  }
</script>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import { LazyModalExample } from '#components';

  const overlay = useOverlay();

  const modal = overlay.create(LazyModalExample, {
    title: 'Welcome',
  });

  function openModal() {
    modal.open();
  }

  function updateModalTitle() {
    modal.patch({ title: 'Updated Title' });
  }
</script>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import { ModalA, ModalB, SlideoverA } from '#components';

  const overlay = useOverlay();

  // Create with default props
  const modalA = overlay.create(ModalA, { title: 'Welcome' });
  const modalB = overlay.create(ModalB);

  const slideoverA = overlay.create(SlideoverA);

  const openModalA = () => {
    // Open modalA, but override the title prop
    modalA.open({ title: 'Hello' });
  };

  const openModalB = async () => {
    // Open modalB, and wait for its result
    const modalBInstance = modalB.open();

    const input = await modalBInstance;

    // Pass the result from modalB to the slideover, and open it
    slideoverA.open({ input });
  };
</script>

<template>
  <button @click="openModalA">Open Modal</button>
</template>
```

---

## BlogPost

**URL:** llms-txt#blogpost

**Contents:**

- Usage
  - Title
  - Description
  - Date
  - Badge
  - Image
  - Authors
  - Link
  - Variant
  - Orientation

The BlogPost component provides a flexible way to display an `<article>` element with customizable content including title, description, image, etc.

::code-preview
:::u-blog-post

---

authors: - name: Anthony Fu
description: antfu7
avatar:
src: https://github.com/antfu.png
to: https://github.com/antfu
target: \_blank
class: w-96
date: 2024-11-25
description: Discover Nuxt Icon v1 - a modern, versatile, and customizable icon
solution for your Nuxt projects.
image: https://nuxt.com/assets/blog/nuxt-icon/cover.png
target: \_blank
title: Introducing Nuxt Icon v1
to: https://nuxt.com/blog/nuxt-icon-v1-0

---

:::
::

::tip{to="https://ui.nuxt.com/docs/components/blog-posts"}
Use the [`BlogPosts`](https://ui.nuxt.com/docs/components/blog-posts) component to display multiple blog posts in a responsive grid layout.
::

Use the `title` prop to display the title of the BlogPost.

Use the `description` prop to display the description of the BlogPost.

Use the `date` prop to display the date of the BlogPost.

::tip
The date is automatically formatted to the [current locale](https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt#locale). You can either pass a `Date` object or a string.
::

Use the `badge` prop to display a [Badge](https://ui.nuxt.com/docs/components/badge) in the BlogPost.

You can pass any property from the [Badge](https://ui.nuxt.com/docs/components/badge#props) component to customize it.

Use the `image` prop to display an image in the BlogPost.

::note
If [`@nuxt/image`](https://image.nuxt.com/get-started/installation){rel="nofollow"} is installed, the `<NuxtImg>` component will be used instead of the native `img` tag.
::

Use the `authors` prop to display a list of [User](https://ui.nuxt.com/docs/components/user) in the BlogPost as an array of objects with the following properties:

- `name?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: Omit<AvatarProps, 'size'>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `chip?: boolean | Omit<ChipProps, 'size' | 'inset'>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `size?: UserProps['size']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `orientation?: UserProps['orientation']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

When the `authors` prop has more than one item, the [AvatarGroup](https://ui.nuxt.com/docs/components/avatar-group) component is used.

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

Use the `variant` prop to change the style of the BlogPost.

::note
The styling will be different wether you provide a `to` prop or an `image`.
::

Use the `orientation` prop to change the BlogPost orientation. Defaults to `vertical`.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UBlogPost title="Introducing Nuxt Icon v1" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UBlogPost
    title="Introducing Nuxt Icon v1"
    description="Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UBlogPost
    title="Introducing Nuxt Icon v1"
    description="Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects."
    date="2024-11-25" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UBlogPost
    title="Introducing Nuxt Icon v1"
    description="Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects."
    badge="Release" />
</template>
```

---

## DashboardResizeHandle

**URL:** llms-txt#dashboardresizehandle

**Contents:**

- Usage
- Examples
  - Within `resize-handle` slot
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardResizeHandle component is used by the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) and [DashboardPanel](https://ui.nuxt.com/docs/components/dashboard-panel) components.

It is automatically displayed when the `resizable` prop is set, **you don't have to add it manually**.

### Within `resize-handle` slot

Even though this component is automatically displayed when the `resizable` prop is set, you can use the `resize-handle` slot of the [DashboardSidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar) and [DashboardPanel](https://ui.nuxt.com/docs/components/dashboard-panel) components to customize the handle.

::note
In this example, we add an `after` pseudo-element to display a vertical line on hover.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

::note
In this example, we add an `after` pseudo-element to display a vertical line on hover.
::

## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## EditorEmojiMenu

**URL:** llms-txt#editoremojimenu

**Contents:**

- Usage
  - Items
  - Char
  - Options
- API
  - Props
- Theme
- Changelog

The EditorEmojiMenu component displays a menu of emoji suggestions when typing the `:` character in the editor and inserts the selected emoji. It works alongside the `@tiptap/extension-emoji` package to provide emoji support.

::note
It uses the `useEditorMenu` composable built on top of TipTap's [Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion){rel="nofollow"} utility to filter items as you type and support keyboard navigation (arrow keys, enter to select, escape to close).
::

::caution
It must be used inside an [Editor](https://ui.nuxt.com/docs/components/editor) component's default slot to have access to the editor instance.
::

::warning
The `@tiptap/extension-emoji` package is not installed by default, you need to install it separately.
::

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/nodes/emoji

---

Learn more about the Emoji extension in the TipTap documentation.
::

Use the `items` prop as an array of objects with the following properties:

- `name: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `emoji: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `shortcodes?: string[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `tags?: string[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `group?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `fallbackImage?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

Use the `char` prop to change the trigger character. Defaults to `:`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
The `@tiptap/extension-emoji` package is not installed by default, you need to install it separately.
::

::callout
---
icon: i-custom-tiptap
target: _blank
to: https://tiptap.dev/docs/editor/extensions/nodes/emoji
---
Learn more about the Emoji extension in the TipTap documentation.
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `name: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `emoji: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `shortcodes?: string[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `tags?: string[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `group?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `fallbackImage?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

Example 2 (unknown):

```unknown
::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

### Char

Use the `char` prop to change the trigger character. Defaults to `:`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.
```

Example 3 (unknown):

```unknown
### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## AuthForm

**URL:** llms-txt#authform

**Contents:**

- Usage
  - Fields
  - Title
  - Description
  - Icon
  - Providers
  - Separator
  - Submit
- Examples
  - Within a page

Built on top of the [Form](https://ui.nuxt.com/docs/components/form) component, the `AuthForm` component can be used in your pages or wrapped in a [PageCard](https://ui.nuxt.com/docs/components/page-card).

The Form will construct itself based on the `fields` prop and the state will be handled internally.

Use the `fields` prop as an array of objects with the following properties:

- `name?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `type?: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'select' | 'otp'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Each field must include a `type` property, which determines the input component and any additional props applied: `checkbox` fields use [Checkbox](https://ui.nuxt.com/docs/components/checkbox#props) props, `select` fields use [SelectMenu](https://ui.nuxt.com/docs/components/select-menu#props) props, `otp` fields use [PinInput](https://ui.nuxt.com/docs/components/pin-input#props) props, and all other types use [Input](https://ui.nuxt.com/docs/components/input#props) props.

You can also pass any property from the [FormField](https://ui.nuxt.com/docs/components/form-field#props) component to each field.

Use the `title` prop to set the title of the Form.

Use the `description` prop to set the description of the Form.

Use the `icon` prop to set the icon of the Form.

Use the `providers` prop to add providers to the form.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component such as `variant`, `color`, `to`, etc.

Use the `separator` prop to customize the [Separator](https://ui.nuxt.com/docs/components/separator) between the providers and the fields. Defaults to `or`.

You can pass any property from the [Separator](https://ui.nuxt.com/docs/components/separator#props) component to customize it.

Use the `submit` prop to change the submit button of the Form.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component such as `variant`, `color`, `to`, etc.

You can wrap the `AuthForm` component with the [PageCard](https://ui.nuxt.com/docs/components/page-card) component to display it within a `login.vue` page for example.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes

---

This component also supports all native `<form>` HTML attributes.
::

You can access the typed component instance (exposing formRef and state) using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref){rel="nofollow"}. For example, in a separate form (e.g. a "reset" form) you can do:

This gives you access to the following (exposed) properties:

| Name                                                                                                                          | Type                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `formRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLFormElement                                                                                                                          | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |
| `state`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}   | `Reactive<FormStateType>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Fields

The Form will construct itself based on the `fields` prop and the state will be handled internally.

Use the `fields` prop as an array of objects with the following properties:

- `name?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `type?: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'select' | 'otp'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Each field must include a `type` property, which determines the input component and any additional props applied: `checkbox` fields use [Checkbox](https://ui.nuxt.com/docs/components/checkbox#props) props, `select` fields use [SelectMenu](https://ui.nuxt.com/docs/components/select-menu#props) props, `otp` fields use [PinInput](https://ui.nuxt.com/docs/components/pin-input#props) props, and all other types use [Input](https://ui.nuxt.com/docs/components/input#props) props.

You can also pass any property from the [FormField](https://ui.nuxt.com/docs/components/form-field#props) component to each field.
```

Example 2 (unknown):

```unknown
### Title

Use the `title` prop to set the title of the Form.
```

Example 3 (unknown):

```unknown
### Description

Use the `description` prop to set the description of the Form.
```

Example 4 (unknown):

```unknown
### Icon

Use the `icon` prop to set the icon of the Form.
```

---

## Tabs

**URL:** llms-txt#tabs

**Contents:**

- Usage
  - Items
  - Content
  - Unmount
  - Color
  - Variant
  - Size
  - Orientation
- Examples
  - Control active item

Use the Tabs component to display a list of items in a tabs.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `badge?: string | number | BadgeProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `content?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string | number`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { trigger?: ClassNameValue, leadingIcon?: ClassNameValue, leadingAvatar?: ClassNameValue, leadingAvatarSize?: ClassNameValue, label?: ClassNameValue, trailingBadge?: ClassNameValue, trailingBadgeSize?: ClassNameValue, content?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Set the `content` prop to `false` to turn the Tabs into a toggle-only control without displaying any content. Defaults to `true`.

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Tabs is collapsed. Defaults to `true`.

::note
You can inspect the DOM to see each item's content being rendered.
::

Use the `color` prop to change the color of the Tabs.

Use the `variant` prop to change the variant of the Tabs.

Use the `size` prop to change the size of the Tabs.

Use the `orientation` prop to change the orientation of the Tabs. Defaults to `horizontal`.

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index **as a string**.

### With content slot

Use the `#content` slot to customize the content of each item.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                              | Type                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `triggersRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<ComponentPublicInstance[]>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `badge?: string | number | BadgeProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `content?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `value?: string | number`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { trigger?: ClassNameValue, leadingIcon?: ClassNameValue, leadingAvatar?: ClassNameValue, leadingAvatarSize?: ClassNameValue, label?: ClassNameValue, trailingBadge?: ClassNameValue, trailingBadgeSize?: ClassNameValue, content?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

Example 2 (unknown):

```unknown
### Content

Set the `content` prop to `false` to turn the Tabs into a toggle-only control without displaying any content. Defaults to `true`.
```

Example 3 (unknown):

```unknown
### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Tabs is collapsed. Defaults to `true`.
```

Example 4 (unknown):

```unknown
::note
You can inspect the DOM to see each item's content being rendered.
::

### Color

Use the `color` prop to change the color of the Tabs.
```

---

## ChatPromptSubmit

**URL:** llms-txt#chatpromptsubmit

**Contents:**

- Usage
  - Ready
  - Submitted
  - Streaming
  - Error
- Examples
  - Within a page
- API
  - Props
  - Slots

The ChatPromptSubmit component is used inside the [ChatPrompt](https://ui.nuxt.com/docs/components/chat-prompt) component to submit the prompt. It automatically handles the different `status` values to control the chat.

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::code-preview
:::u-chat-prompt-submit
:::

::note
You can also use it inside the `footer` slot of the [`ChatPrompt`](https://ui.nuxt.com/docs/components/chat-prompt) component.
::

When its status is `ready`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, use the `color`, `variant` and `icon` props to customize the Button. Defaults to:

- `color="primary"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant="solid"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon="i-lucide-arrow-up"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.arrowUp` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.arrowUp` key.
:::
::

When its status is `submitted`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, use the `submitted-color`, `submitted-variant` and `submitted-icon` props to customize the Button. Defaults to:

- `submittedColor="neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `submittedVariant="subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `submittedIcon="i-lucide-square"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
The `stop` event is emitted when the user clicks on the Button.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.stop` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.stop` key.
:::
::

When its status is `streaming`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, use the `streaming-color`, `streaming-variant` and `streaming-icon` props to customize the Button. Defaults to:

- `streamingColor="neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `streamingVariant="subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `streamingIcon="i-lucide-square"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
The `stop` event is emitted when the user clicks on the Button.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.stop` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.stop` key.
:::
::

When its status is `error`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, use the `error-color`, `error-variant` and `error-icon` props to customize the Button. Defaults to:

- `errorColor="error"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `errorVariant="soft"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `errorIcon="i-lucide-rotate-ccw"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
The `reload` event is emitted when the user clicks on the Button.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.reload` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.reload` key.
:::
::

::note{target="\_blank" to="https://ai-sdk.dev/docs/getting-started/nuxt"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

## ::callout

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt-ui-templates/chat

---

Check out the source code of our **AI Chat template** on GitHub for a real-life example.
::

Use the ChatPromptSubmit component with the `Chat` class from AI SDK v5 to display a chat prompt within a page.

Pass the `status` prop and listen to the `stop` and `reload` events to control the chat.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UChatPrompt>
    <UChatPromptSubmit />
  </UChatPrompt>
</template>
```

Example 2 (vue):

```vue
<template>
  <UChatPromptSubmit color="primary" variant="solid" icon="i-lucide-arrow-up" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UChatPromptSubmit
    submitted-color="neutral"
    submitted-variant="subtle"
    submitted-icon="i-lucide-square"
    status="submitted" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UChatPromptSubmit
    streaming-color="neutral"
    streaming-variant="subtle"
    streaming-icon="i-lucide-square"
    status="streaming" />
</template>
```

---

## Popover

**URL:** llms-txt#popover

**Contents:**

- Usage
  - Mode
  - Delay
  - Content
  - Arrow
  - Modal
  - Dismissible
- Examples
  - Control open state
  - With command palette

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the Popover.

Then, use the `#content` slot to add the content displayed when the Popover is open.

Use the `mode` prop to change the mode of the Popover. Defaults to `click`.

::note
When using the `hover` mode, the Reka UI [`HoverCard`](https://reka-ui.com/docs/components/hover-card){rel="nofollow"} component is used instead of the [`Popover`](https://reka-ui.com/docs/components/popover){rel="nofollow"}.
::

When using the `hover` mode, you can use the `open-delay` and `close-delay` props to control the delay before the Popover is opened or closed.

Use the `content` prop to control how the Popover content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the Popover.

Use the `modal` prop to control whether the Popover blocks interaction with outside content. Defaults to `false`.

Use the `dismissible` prop to control whether the Popover is dismissible when clicking outside of it or pressing escape. Defaults to `true`.

::note
A `close:prevent` event will be emitted when the user tries to close it.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the Popover by pressing ``.
::

### With command palette

You can use a [CommandPalette](https://ui.nuxt.com/docs/components/command-palette) component inside the Popover's content.

### With following cursor

You can make the Popover follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger){rel="nofollow"} prop:

You can use the `#anchor` slot to position the Popover against a custom element.

::warning
This slot only works when `mode` is `click`.
::

::note
The `close` function is only available when `mode` is set to `click` because Reka UI exposes this for [`Popover`](https://reka-ui.com/docs/components/popover#close-using-slot-props){rel="nofollow"} but not for [`HoverCard`](https://reka-ui.com/docs/components/hover-card){rel="nofollow"}.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPopover>
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" /> </template
  ></UPopover>
</template>
```

Example 2 (vue):

```vue
<template>
  <UPopover mode="hover">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" /> </template
  ></UPopover>
</template>
```

Example 3 (vue):

```vue
<template>
  <UPopover mode="hover" :open-delay="500" :close-delay="300">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" /> </template
  ></UPopover>
</template>
```

Example 4 (vue):

```vue
<template>
  <UPopover>
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" /> </template
  ></UPopover>
</template>
```

---

## ChatMessage

**URL:** llms-txt#chatmessage

**Contents:**

- Usage
  - Parts
  - Side
  - Variant
  - Icon
  - Avatar
  - Actions
- API
  - Props
  - Slots

The ChatMessage component renders an `<article>` element for a `user` or `assistant` chat message.

::code-preview
:::u-chat-message

---

avatar:
src: https://github.com/benjamincanac.png
parts: - type: text
id: "1"
text: Hello! Tell me more about building AI chatbots with Nuxt UI.
id: "1"
role: user
side: right
variant: soft

---

:::
::

::tip{to="https://ui.nuxt.com/docs/components/chat-messages"}
Use the [`ChatMessages`](https://ui.nuxt.com/docs/components/chat-messages) component to display a list of chat messages.
::

Use the `parts` prop to display the message content using the AI SDK v5 format.

::note
The `parts` prop is the recommended format for AI SDK v5. Each part has a `type` (e.g., 'text') and corresponding content. The ChatMessage component also supports the deprecated `content` prop for backward compatibility.
::

Use the `side` prop to display the message on the left or right.

::note
When using the [`ChatMessages`](https://ui.nuxt.com/docs/components/chat-messages) component, the `side` prop is set to `left` for `assistant` messages and `right` for `user` messages.
::

Use the `variant` prop to change style of the message.

::note
When using the [`ChatMessages`](https://ui.nuxt.com/docs/components/chat-messages) component, the `variant` prop is set to `naked` for `assistant` messages and `soft` for `user` messages.
::

Use the `icon` prop to display an [Icon](https://ui.nuxt.com/docs/components/icon) component next to the message.

Use the `avatar` prop to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) component next to the message.

You can also use the `avatar.icon` prop to display an icon as the avatar.

Use the `actions` prop to display actions below the message that will be displayed when hovering over the message.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UChatMessage role="user" id="1" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UChatMessage side="right" role="user" id="1" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UChatMessage variant="soft" role="user" id="1" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UChatMessage icon="i-lucide-user" variant="soft" side="right" role="user" id="1" />
</template>
```

---

## DropdownMenu

**URL:** llms-txt#dropdownmenu

**Contents:**

- Usage
  - Items
  - Content
  - Arrow
  - Size
  - Modal
  - Disabled
- Examples
  - With checkbox items
  - With color items

Use a [Button](https://ui.nuxt.com/docs/components/button) or any other component in the default slot of the DropdownMenu.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- [`color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-color-items)
- [`checked?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`onUpdateChecked?: (checked: boolean) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- `children?: DropdownMenuItem[] | DropdownMenuItem[][]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.
::

Use the `content` prop to control how the DropdownMenu content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the DropdownMenu.

Use the `size` prop to control the size of the DropdownMenu.

::warning
The `size` prop will not be proxied to the Button, you need to set it yourself.
::

::note
When using the same size, the DropdownMenu items will be perfectly aligned with the Button.
::

Use the `modal` prop to control whether the DropdownMenu blocks interaction with outside content. Defaults to `true`.

Use the `disabled` prop to disable the DropdownMenu.

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

::note
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
::

You can use the `color` property to highlight certain items with a color.

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the DropdownMenu by pressing ``.
::

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

### With trigger content width

You can expand the content to the full width of its button by adding the `w-(--reka-dropdown-menu-trigger-width)` class on the `ui.content` slot.

::tip
You can also change the content width globally in your `app.config.ts`:

### Extract shortcuts

When you have some items with `kbds` property (displaying some [Kbd](https://ui.nuxt.com/docs/components/kbd)), you can easily make them work with the [defineShortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts) composable.

Inside the `defineShortcuts` composable, there is an `extractShortcuts` utility that will extract the shortcuts recursively from the items and return an object that you can pass to `defineShortcuts`. It will automatically call the `select` function of the item when the shortcut is pressed.

::note
In this example, ` `, ` ` and ` ` would trigger the `select` function of the corresponding item.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    [
      {
        label: 'Benjamin',
        avatar: {
          src: 'https://github.com/benjamincanac.png',
        },
        type: 'label',
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
      },
      {
        label: 'Settings',
        icon: 'i-lucide-cog',
        kbds: [','],
      },
      {
        label: 'Keyboard shortcuts',
        icon: 'i-lucide-monitor',
      },
    ],
    [
      {
        label: 'Team',
        icon: 'i-lucide-users',
      },
      {
        label: 'Invite users',
        icon: 'i-lucide-user-plus',
        children: [
          [
            {
              label: 'Email',
              icon: 'i-lucide-mail',
            },
            {
              label: 'Message',
              icon: 'i-lucide-message-square',
            },
          ],
          [
            {
              label: 'More',
              icon: 'i-lucide-circle-plus',
            },
          ],
        ],
      },
      {
        label: 'New team',
        icon: 'i-lucide-plus',
        kbds: ['meta', 'n'],
      },
    ],
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Support',
        icon: 'i-lucide-life-buoy',
        to: '/docs/components/dropdown-menu',
      },
      {
        label: 'API',
        icon: 'i-lucide-cloud',
        disabled: true,
      },
    ],
    [
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        kbds: ['shift', 'meta', 'q'],
      },
    ],
  ]);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui';

  const items = ref<DropdownMenuItem[][]>([
    [
      {
        label: 'Benjamin',
        avatar: {
          src: 'https://github.com/benjamincanac.png',
        },
        type: 'label',
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
      },
      {
        label: 'Settings',
        icon: 'i-lucide-cog',
        kbds: [','],
      },
      {
        label: 'Keyboard shortcuts',
        icon: 'i-lucide-monitor',
      },
    ],
    [
      {
        label: 'Team',
        icon: 'i-lucide-users',
      },
      {
        label: 'Invite users',
        icon: 'i-lucide-user-plus',
        children: [
          [
            {
              label: 'Email',
              icon: 'i-lucide-mail',
            },
            {
              label: 'Message',
              icon: 'i-lucide-message-square',
            },
          ],
          [
            {
              label: 'More',
              icon: 'i-lucide-circle-plus',
            },
          ],
        ],
      },
      {
        label: 'New team',
        icon: 'i-lucide-plus',
        kbds: ['meta', 'n'],
      },
    ],
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Support',
        icon: 'i-lucide-life-buoy',
        to: '/docs/components/dropdown-menu',
      },
      {
        label: 'API',
        icon: 'i-lucide-cloud',
        disabled: true,
      },
    ],
    [
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        kbds: ['shift', 'meta', 'q'],
      },
    ],
  ]);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui';

  const items = ref<DropdownMenuItem[]>([
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
    },
  ]);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui';

  const items = ref<DropdownMenuItem[]>([
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
    },
  ]);
</script>

<template>
  <UDropdownMenu arrow :items="items">
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
```

---

## SelectMenu

**URL:** llms-txt#selectmenu

**Contents:**

- Usage
  - Items
  - Value Key
  - Multiple
  - Placeholder
  - Search Input
  - Content
  - Arrow
  - Color
  - Variant

Use the `v-model` directive to control the value of the SelectMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::tip
Use this over a [`Select`](https://ui.nuxt.com/docs/components/select) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox){rel="nofollow"} component that offers search capabilities and multiple selection.
::

::note
This component is similar to the [`InputMenu`](https://ui.nuxt.com/docs/components/input-menu) but it's using a Select instead of an Input with the search inside the menu.
::

Use the `items` prop as an array of strings, numbers or booleans:

You can also pass an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`type?: "label" | "separator" | "item"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-items-type)
- [`icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-icons-in-items)
- [`avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-avatar-in-items)
- [`chip?: ChipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-chip-in-items)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::caution
Unlike the [`Select`](https://ui.nuxt.com/docs/components/select) component, the SelectMenu expects the whole object to be passed to the `v-model` directive or the `default-value` prop by default.
::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

Use the `multiple` prop to allow multiple selections, the selected items will be separated by a comma in the trigger.

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

Use the `placeholder` prop to set a placeholder text.

Use the `search-input` prop to customize or hide the search input (with `false` value).

You can pass any property from the [Input](https://ui.nuxt.com/docs/components/input) component to customize it.

::tip
You can set the `search-input` prop to `false` to hide the search input.
::

Use the `content` prop to control how the SelectMenu content is rendered, like its `align` or `side` for example.

Use the `arrow` prop to display an arrow on the SelectMenu.

Use the `color` prop to change the ring color when the SelectMenu is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the SelectMenu.

Use the `size` prop to change the size of the SelectMenu.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the SelectMenu.

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-chevron-down`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `i-lucide-check`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

Use the `avatar` prop to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the SelectMenu.

Use the `loading` prop to show a loading icon on the SelectMenu.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the SelectMenu.

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

### With icon in items

You can use the `icon` property to display an [Icon](https://ui.nuxt.com/docs/components/icon) inside the items.

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the items.

::tip
You can also use the `#leading` slot to display the selected avatar.
::

### With chip in items

You can use the `chip` property to display a [Chip](https://ui.nuxt.com/docs/components/chip) inside the items.

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::note
In this example, leveraging [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts), you can toggle the SelectMenu by pressing ``.
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the SelectMenu.

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::note
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
::

::tip{to="https://ui.nuxt.com/#emits"}
Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.
::

### With fetched items

You can fetch items from an API and use them in the SelectMenu.

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced){rel="nofollow"} to debounce the API calls.
::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

### With virtualization :badge{.align-text-top label="4.1+"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{target="\_blank" to="https://github.com/unovue/reka-ui/issues/1885"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

### With full content width

You can expand the content to the full width of its items by adding the `min-w-fit` class on the `ui.content` slot.

::tip
You can also change the content width globally in your `app.config.ts`:

### As a CountryPicker

This example demonstrates using the SelectMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                             | Type                   |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `triggerRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLButtonElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <USelectMenu model-value="Backlog" :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>(['Backlog', 'Todo', 'In Progress', 'Done']);
</script>

<template>
  <USelectMenu model-value="Backlog" class="w-48" :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { SelectMenuItem } from '@nuxt/ui';

  const items = ref<SelectMenuItem[]>([
    {
      label: 'Backlog',
    },
    {
      label: 'Todo',
    },
    {
      label: 'In Progress',
    },
    {
      label: 'Done',
    },
  ]);
</script>

<template>
  <USelectMenu class="w-48" :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
    ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
  ]);
</script>

<template>
  <USelectMenu model-value="Apple" class="w-48" :items="items" />
</template>
```

---

## EditorSuggestionMenu

**URL:** llms-txt#editorsuggestionmenu

**Contents:**

- Usage
  - Items
  - Char
  - Options
- API
  - Props
- Theme
- Changelog

The EditorSuggestionMenu component displays a menu of formatting and action suggestions when typing a trigger character in the editor and executes the corresponding [handler](https://ui.nuxt.com/docs/components/editor#handlers) when an item is selected.

::note
It uses the `useEditorMenu` composable built on top of TipTap's [Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion){rel="nofollow"} utility to filter items as you type and support keyboard navigation (arrow keys, enter to select, escape to close).
::

::caution
It must be used inside an [Editor](https://ui.nuxt.com/docs/components/editor) component's default slot to have access to the editor instance.
::

Use the `items` prop as an array of objects with the following properties:

- [`kind?: "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "codeBlock" | "horizontalRule" | "paragraph" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/docs/components/editor#handlers)
- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `type?: "label" | "separator"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Use `type: 'label'` for section headers and `type: 'separator'` for visual dividers to organize commands into logical groups for better discoverability.
::

Use the `char` prop to change the trigger character. Defaults to `/`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Items

Use the `items` prop as an array of objects with the following properties:

- [`kind?: "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "codeBlock" | "horizontalRule" | "paragraph" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/docs/components/editor#handlers)
- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `type?: "label" | "separator"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
```

Example 2 (unknown):

```unknown
::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Use `type: 'label'` for section headers and `type: 'separator'` for visual dividers to organize commands into logical groups for better discoverability.
::

### Char

Use the `char` prop to change the trigger character. Defaults to `/`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.
```

Example 3 (unknown):

```unknown
### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
## API

### Props
```

---

## InputDate

**URL:** llms-txt#inputdate

**Contents:**

- Usage
  - Range
  - Color
  - Variant
  - Size
  - Separator Icon
  - Disabled
- Examples
  - With unavailable dates
  - With min/max dates

Use the `v-model` directive to control the selected date.

Use the `default-value` prop to set the initial value when you do not need to control its state.

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html){rel="nofollow"} package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner. Format of date depends on the [`locale`](https://ui.nuxt.com/docs/getting-started/integrations/i18n) installed in your application.
::

Use the `range` prop to select a range of dates.

Use the `color` prop to change the color of the InputDate.

Use the `variant` prop to change the variant of the InputDate.

Use the `size` prop to change the size of the InputDate.

Use the `separator-icon` prop to change the icon of the range separator.

Use the `disabled` prop to disable the InputDate.

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

Use a [Calendar](https://ui.nuxt.com/docs/components/calendar) and a [Popover](https://ui.nuxt.com/docs/components/popover) component to create a date picker.

### As a DateRangePicker

Use a [Calendar](https://ui.nuxt.com/docs/components/calendar) and a [Popover](https://ui.nuxt.com/docs/components/popover) component to create a date range picker.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UInputDate />
</template>
```

Example 2 (vue):

```vue
<template>
  <UInputDate />
</template>
```

Example 3 (vue):

```vue
<template>
  <UInputDate range />
</template>
```

Example 4 (vue):

```vue
<template>
  <UInputDate color="neutral" highlight />
</template>
```

---

## ContextMenu

**URL:** llms-txt#contextmenu

**Contents:**

- Usage
  - Items
  - Size
  - Modal
  - Disabled
- Examples
  - With checkbox items
  - With color items
  - With custom slot
  - Extract shortcuts

Use anything you like in the default slot of the ContextMenu, and right-click on it to display the menu.

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- [`color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-color-items)
- [`checked?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`onUpdateChecked?: (checked: boolean) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-checkbox-items)
- `children?: ContextMenuItem[] | ContextMenuItem[][]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.
::

Use the `size` prop to change the size of the ContextMenu.

Use the `modal` prop to control whether the ContextMenu blocks interaction with outside content. Defaults to `true`.

Use the `disabled` prop to disable the ContextMenu.

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

::note
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
::

You can use the `color` property to highlight certain items with a color.

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

### Extract shortcuts

When you have some items with `kbds` property (displaying some [Kbd](https://ui.nuxt.com/docs/components/kbd)), you can easily make them work with the [defineShortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts) composable.

Inside the `defineShortcuts` composable, there is an `extractShortcuts` utility that will extract the shortcuts recursively from the items and return an object that you can pass to `defineShortcuts`. It will automatically call the `select` function of the item when the shortcut is pressed.

::note
In this example, ` `, ` ` `, ` ` `, ` ` `, ` ` ` and ` ` ``would trigger the`select` function of the corresponding item.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    [
      {
        label: 'Appearance',
        children: [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
          },
          {
            label: 'Light',
            icon: 'i-lucide-sun',
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
          },
        ],
      },
    ],
    [
      {
        label: 'Show Sidebar',
        kbds: ['meta', 's'],
      },
      {
        label: 'Show Toolbar',
        kbds: ['shift', 'meta', 'd'],
      },
      {
        label: 'Collapse Pinned Tabs',
        disabled: true,
      },
    ],
    [
      {
        label: 'Refresh the Page',
      },
      {
        label: 'Clear Cookies and Refresh',
      },
      {
        label: 'Clear Cache and Refresh',
      },
      {
        type: 'separator',
      },
      {
        label: 'Developer',
        children: [
          [
            {
              label: 'View Source',
              kbds: ['meta', 'shift', 'u'],
            },
            {
              label: 'Developer Tools',
              kbds: ['option', 'meta', 'i'],
            },
            {
              label: 'Inspect Elements',
              kbds: ['option', 'meta', 'c'],
            },
          ],
          [
            {
              label: 'JavaScript Console',
              kbds: ['option', 'meta', 'j'],
            },
          ],
        ],
      },
    ],
  ]);
</script>

<template>
  <UContextMenu :items="items">
    <div
      class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
      Right click here
    </div>
  </UContextMenu>
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { ContextMenuItem } from '@nuxt/ui';

  const items = ref<ContextMenuItem[][]>([
    [
      {
        label: 'Appearance',
        children: [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
          },
          {
            label: 'Light',
            icon: 'i-lucide-sun',
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
          },
        ],
      },
    ],
    [
      {
        label: 'Show Sidebar',
        kbds: ['meta', 's'],
      },
      {
        label: 'Show Toolbar',
        kbds: ['shift', 'meta', 'd'],
      },
      {
        label: 'Collapse Pinned Tabs',
        disabled: true,
      },
    ],
    [
      {
        label: 'Refresh the Page',
      },
      {
        label: 'Clear Cookies and Refresh',
      },
      {
        label: 'Clear Cache and Refresh',
      },
      {
        type: 'separator',
      },
      {
        label: 'Developer',
        children: [
          [
            {
              label: 'View Source',
              kbds: ['meta', 'shift', 'u'],
            },
            {
              label: 'Developer Tools',
              kbds: ['option', 'meta', 'i'],
            },
            {
              label: 'Inspect Elements',
              kbds: ['option', 'meta', 'c'],
            },
          ],
          [
            {
              label: 'JavaScript Console',
              kbds: ['option', 'meta', 'j'],
            },
          ],
        ],
      },
    ],
  ]);
</script>

<template>
  <UContextMenu :items="items">
    <div
      class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
      Right click here
    </div>
  </UContextMenu>
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { ContextMenuItem } from '@nuxt/ui';

  const items = ref<ContextMenuItem[]>([
    {
      label: 'System',
      icon: 'i-lucide-monitor',
    },
    {
      label: 'Light',
      icon: 'i-lucide-sun',
    },
    {
      label: 'Dark',
      icon: 'i-lucide-moon',
    },
  ]);
</script>

<template>
  <UContextMenu size="xl" :items="items">
    <div
      class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
      Right click here
    </div>
  </UContextMenu>
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { ContextMenuItem } from '@nuxt/ui';

  const items = ref<ContextMenuItem[]>([
    {
      label: 'System',
      icon: 'i-lucide-monitor',
    },
    {
      label: 'Light',
      icon: 'i-lucide-sun',
    },
    {
      label: 'Dark',
      icon: 'i-lucide-moon',
    },
  ]);
</script>

<template>
  <UContextMenu :modal="false" :items="items">
    <div
      class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
      Right click here
    </div>
  </UContextMenu>
</template>
```

---

## Customize components

**URL:** llms-txt#customize-components

**Contents:**

- Tailwind Variants
  - Slots
  - Variants
  - Default Variants
  - Compound Variants
- Customize theme
  - Global config
  - `ui` prop
  - `class` prop

Nuxt UI components are styled using the [Tailwind Variants](https://www.tailwind-variants.org/){rel="nofollow"} API, which provides a powerful way to create variants and manage component styles.

Components can have multiple `slots`, each representing a distinct HTML element or section within the component. These slots allow for flexible content insertion and styling.

Let's take the [Card](https://ui.nuxt.com/docs/components/card) component as an example which has multiple slots:

Some components don't have slots, they are just composed of a single root element. In this case, the theme only defines the `base` slot like the [Container](https://ui.nuxt.com/docs/components/container) component for example:

::warning
Components without slots don't have a [`ui` prop](https://ui.nuxt.com/#ui-prop), only the [`class` prop](https://ui.nuxt.com/#class-prop) is available to override styles.
::

Components support `variants`, which allow you to dynamically adjust the styles of different `slots` based on component props.

For example, the [Avatar](https://ui.nuxt.com/docs/components/avatar) component uses a `size` variant to control its appearance:

This way, the `size` prop will apply the corresponding styles to the `root` slot:

The `defaultVariants` property sets the default value for each variant when no prop is passed.

For example, the [Avatar](https://ui.nuxt.com/docs/components/avatar) component has its default size set to `md`:

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/installation/nuxt#themedefaultvariants

---

You can use the `theme.defaultVariants` option in your `nuxt.config.ts` to override the default values for `size` and `color` for all components at once.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/installation/vue#themedefaultvariants

---

You can use the `theme.defaultVariants` option in your `vite.config.ts` to override the default values for `size` and `color` for all components at once.
:::
::

### Compound Variants

Some components use the `compoundVariants` property to apply classes when multiple variant conditions are met at the same time.

For example, the [Button](https://ui.nuxt.com/docs/components/button) component uses the `compoundVariants` property to apply classes for a specific `color` and `variant` combination:

You have multiple ways to customize the appearance of Nuxt UI components, you can do it for all components at once or on a per-component basis.

::note
Tailwind Variants uses [`tailwind-merge`](https://github.com/dcastil/tailwind-merge){rel="nofollow"} under the hood to merge classes so you don't have to worry about conflicting classes.
::

::tip
You can explore the theme for each component in two ways:

- Check the `Theme` section in the documentation of each individual component.
- Browse the source code directly in the GitHub repository at [`src/theme`](https://github.com/nuxt/ui/tree/v4/src/theme){rel="nofollow"}.
  ::

::framework-only
#nuxt
You can override the theme of components globally inside your `app.config.ts` by using the exact same structure as the theme object.

#vue
You can override the theme of components globally inside your `vite.config.ts` by using the exact same structure as the theme object.
::

You can customize the [`slots`](https://ui.nuxt.com/#slots), [`variants`](https://ui.nuxt.com/#variants), [`compoundVariants`](https://ui.nuxt.com/#compound-variants) and [`defaultVariants`](https://ui.nuxt.com/#default-variants) of a component to change the default theme of a component:

::framework-only
#nuxt
:::div

:::

#vue
:::div

:::
::

::note
In this example, `font-bold` overrides `font-medium` on all buttons, `size-4` overrides `size-5` class on the leading icon when `size="md"` and `ring-default hover:bg-accented` overrides `ring-accented hover:bg-elevated` when `color="neutral"` and `variant="outline"`. The buttons now defaults to `color="neutral"` and `variant="outline"`.
::

You can also override a component's **slots** using the `ui` prop. This takes priority over both global config and resolved `variants`.

::note
In this example, the `trailingIcon` slot is overwritten with `size-3` even though the `md` size variant would apply a `size-5` class to it.
::

The `class` prop allows you to override the classes of the `root` or `base` slot. This takes priority over both global config and resolved `variants`.

::note
In this example, the `font-bold` class will override the default `font-medium` class on this button.
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

Some components don't have slots, they are just composed of a single root element. In this case, the theme only defines the `base` slot like the [Container](https://ui.nuxt.com/docs/components/container) component for example:

::code-group
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

::warning
Components without slots don't have a [`ui` prop](https://ui.nuxt.com/#ui-prop), only the [`class` prop](https://ui.nuxt.com/#class-prop) is available to override styles.
::

### Variants

Components support `variants`, which allow you to dynamically adjust the styles of different `slots` based on component props.

For example, the [Avatar](https://ui.nuxt.com/docs/components/avatar) component uses a `size` variant to control its appearance:
```

---

## PageFeature

**URL:** llms-txt#pagefeature

**Contents:**

- Usage
  - Title
  - Description
  - Icon
  - Link
  - Orientation
- API
  - Props
  - Slots
- Theme

The PageFeature component is used by the [PageSection](https://ui.nuxt.com/docs/components/page-section) component to display [features](https://ui.nuxt.com/docs/components/page-section#features).

Use the `title` prop to set the title of the feature.

Use the `description` prop to set the description of the feature.

Use the `icon` prop to set the icon of the feature.

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

Use the `orientation` prop to change the orientation of the feature. Defaults to `horizontal`.

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPageFeature title="Theme" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPageFeature title="Theme" description="Customize Nuxt UI with your own colors, fonts, and more." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPageFeature
    title="Theme"
    description="Customize Nuxt UI with your own colors, fonts, and more."
    icon="i-lucide-swatch-book" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPageFeature
    title="Theme"
    description="Customize Nuxt UI with your own colors, fonts, and more."
    icon="i-lucide-swatch-book"
    to="/docs/getting-started/theme/design-system"
    target="_blank" />
</template>
```

---

## Page

**URL:** llms-txt#page

**Contents:**

- Usage
- Examples
  - Within a layout
  - Within a page
- API
  - Props
  - Slots
- Theme
- Changelog

The Page component helps you create layouts with optional left and right columns. It's perfect for building documentation sites and other content-focused pages.

::tip
The page will display as a centered single column layout if no slots are specified.
::

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the Page component in a layout with the `left` slot to display a navigation:

::note
In this example, we use the `ContentNavigation` component to display the navigation injected in `app.vue`.
::

Use the Page component in a page with the `right` slot to display a table of contents:

::note
In this example, we use the `ContentToc` component to display the table of contents.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
The page will display as a centered single column layout if no slots are specified.
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

### Within a layout

Use the Page component in a layout with the `left` slot to display a navigation:
```

Example 2 (unknown):

```unknown
::note
In this example, we use the `ContentNavigation` component to display the navigation injected in `app.vue`.
::

### Within a page

Use the Page component in a page with the `right` slot to display a table of contents:
```

Example 3 (unknown):

```unknown
::note
In this example, we use the `ContentToc` component to display the table of contents.
::

## API

### Props
```

Example 4 (unknown):

```unknown
### Slots
```

---

## App

**URL:** llms-txt#app

**Contents:**

- Usage
- API
  - Props
  - Slots
- Changelog

This component implements Reka UI [ConfigProvider](https://reka-ui.com/docs/utilities/config-provider){rel="nofollow"} to provide global configuration to all components:

- Enables all primitives to inherit global reading direction.
- Enables changing the behavior of scroll body when setting body lock.
- Much more controls to prevent layout shifts.

It's also using [ToastProvider](https://reka-ui.com/docs/components/toast#provider){rel="nofollow"} and [TooltipProvider](https://reka-ui.com/docs/components/tooltip#provider){rel="nofollow"} to provide global toasts and tooltips, as well as programmatic modals and slideovers.

Wrap your entire application with the App component in your `app.vue` file:

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt#locale

---

Learn how to use the `locale` prop to change the locale of your app.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/vue#locale

---

Learn how to use the `locale` prop to change the locale of your app.
:::
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::framework-only
#nuxt
  :::tip
  ---
  to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt#locale
  ---
  Learn how to use the `locale` prop to change the locale of your app.
  :::

#vue
  :::tip
  ---
  to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/vue#locale
  ---
  Learn how to use the `locale` prop to change the locale of your app.
  :::
::

## API

### Props
```

Example 2 (unknown):

```unknown
### Slots
```

---

## PricingPlan

**URL:** llms-txt#pricingplan

**Contents:**

- Usage
  - Title
  - Description
  - Badge
  - Price
  - Discount
  - Billing
  - Features
  - Button
  - Variant

The PricingPlan component provides a flexible way to display a pricing plan with customizable content including title, description, price, features, etc.

::code-preview
:::u-pricing-plan

---

button:
label: Buy now
features: - One developer - Unlimited projects - Access to GitHub repository - Unlimited patch & minor updates - Lifetime access
badge: Most popular
billing-cycle: /month
class: w-96
description: For bootstrappers and indie hackers.
discount: $199
price: $249
title: Solo

---

:::
::

::tip{to="https://ui.nuxt.com/docs/components/pricing-plans"}
Use the [`PricingPlans`](https://ui.nuxt.com/docs/components/pricing-plans) component to display multiple pricing plans in a responsive grid layout.
::

Use the `title` prop to set the title of the PricingPlan.

Use the `description` prop to set the description of the PricingPlan.

Use the `badge` prop to display a [Badge](https://ui.nuxt.com/docs/components/badge) next to the title of the PricingPlan.

You can pass any property from the [Badge](https://ui.nuxt.com/docs/components/badge#props) component to customize it.

Use the `price` prop to set the price of the PricingPlan.

Use the `discount` prop to set a discounted price that will be displayed alongside the original price (which will be shown with a strikethrough).

Use the `billing-cycle` and/or `billing-period` props to display the billing information of the PricingPlan.

Use the `features` prop as an array of string to display a list of features on the PricingPlan:

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.success` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.success` key.
:::
::

You can also pass an array of objects with the following properties:

- `title: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `button` prop with any property from the [Button](https://ui.nuxt.com/docs/components/button) component to display a button at the bottom of the PricingPlan.

::tip
Use the `onClick` field to add a click handler to trigger the plan purchase.
::

Use the `variant` prop to change the variant of the PricingPlan.

Use the `orientation` prop to change the orientation of the PricingPlan. Defaults to `vertical`.

Use the `tagline` prop to display a tagline text above the price.

Use the `terms` prop to display terms below the price.

Use the `highlight` prop to display a highlighted border around the PricingPlan.

Use the `scale` prop to make a PricingPlan bigger than the others.

::note{to="https://ui.nuxt.com/docs/components/pricing-plans#scale"}
Check out the PricingPlans's `scale` example to see how it works as it's hard to demonstrate by itself.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPricingPlan title="Solo" class="w-96" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPricingPlan title="Solo" description="For bootstrappers and indie hackers." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPricingPlan title="Solo" description="For bootstrappers and indie hackers." badge="Most popular" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPricingPlan title="Solo" description="For bootstrappers and indie hackers." />
</template>
```

---

## FooterColumns

**URL:** llms-txt#footercolumns

**Contents:**

- Usage
  - Columns
- API
  - Props
  - Slots
- Theme
- Changelog

The FooterColumns component renders a list of columns to display in your Footer.

Use it in the `top` slot of the [Footer](https://ui.nuxt.com/docs/components/footer) component:

Use the `columns` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `children?: FooterColumnLink[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Each column contains a `children` array of objects that define the links. Each link can have the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Columns

Use the `columns` prop as an array of objects with the following properties:

- `label: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `children?: FooterColumnLink[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Each column contains a `children` array of objects that define the links. Each link can have the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.
```

Example 2 (unknown):

```unknown
## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## Tree

**URL:** llms-txt#tree

**Contents:**

- Usage
  - Items
  - Multiple
  - Nested :badge{.align-text-top label="4.1+"}
  - Color
  - Size
  - Trailing Icon
  - Expanded Icon
  - Disabled
- Examples

Use the Tree component to display a hierarchical structure of items.

Use the `items` prop as an array of objects with the following properties:

- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `trailingIcon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `defaultExpanded?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `children?: TreeItem[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `onToggle?: (e: TreeItemToggleEvent<TreeItem>) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `onSelect?: (e: TreeItemSelectEvent<TreeItem>) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, itemWithChildren?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingIcon?: ClassNameValue, listWithChildren?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
A unique identifier is required for each item. The component will use the `label` prop as identifier if no `get-key` is provided. Ideally you should provide a `get-key` function prop to return a unique identifier. Alternatively, you can use the `labelKey` prop to specify which property to use as the unique identifier.
::

Use the `multiple` prop to allow multiple item selections.

### Nested :badge{.align-text-top label="4.1+"}

Use the `nested` prop to control whether the Tree is rendered with nested structure or as a flat list. Defaults to `true`.

::note{to="https://ui.nuxt.com/#with-virtualization"}
When `nested` is `false`, all items are rendered at the same level with indentation to indicate hierarchy. This is useful for virtualization or drag and drop functionality.
::

Use the `color` prop to change the color of the Tree.

Use the `size` prop to change the size of the Tree.

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon) of a parent node. Defaults to `i-lucide-chevron-down`.

::note
If an icon is specified for an item, it will always take precedence over these props.
::

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

Use the `expanded-icon` and `collapsed-icon` props to customize the icons of a parent node when it is expanded or collapsed. Defaults to `i-lucide-folder-open` and `i-lucide-folder` respectively.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize these icons globally in your `app.config.ts` under `ui.icons.folder` and `ui.icons.folderOpen` keys.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize these icons globally in your `vite.config.ts` under `ui.icons.folder` and `ui.icons.folderOpen` keys.
:::
::

Use the `disabled` prop to prevent any user interaction with the Tree.

::note
You can also disable individual items using `item.disabled`.
::

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive.

If you want to prevent an item from being selected, you can use the `item.onSelect()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} property or the global `select` event:

::note
This lets you expand or collapse a parent item without selecting it.
::

### Control expanded items

You can control the expanded items by using the `default-expanded` prop or the `v-model` directive.

If you want to prevent an item from being expanded, you can use the `item.onToggle()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} property or the global `toggle` event:

::note
This lets you select a parent item without expanding or collapsing its children.
::

### With checkbox in items :badge{.align-text-top label="4.1+"}

You can use the `item-leading` slot to add a [Checkbox](https://ui.nuxt.com/docs/components/checkbox) to the items. Use the `multiple`, `propagate-select` and `bubble-select` props to enable multi-selection with parent-child relationship and the `select` and `toggle` events to control the selected and expanded state of the items.

::note
This example uses the `as` prop to change the items from `button` to `div` as the [`Checkbox`](https://ui.nuxt.com/docs/components/checkbox) is also rendered as a `button`.
::

### With drag and drop :badge{.align-text-top label="4.1+"}

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/){rel="nofollow"} composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html){rel="nofollow"} to enable drag and drop functionality on the Tree. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/){rel="nofollow"} to provide a seamless drag and drop experience.

::note
This example sets the `nested` prop to `false` to have a flat list of items so that the items can be dragged and dropped.
::

### With virtualization :badge{.align-text-top label="4.1+"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning
When virtualization is enabled, the tree structure is flattened, similar to setting the `nested` prop to `false`.
::

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-wrapper`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    {
      label: 'app/',
      defaultExpanded: true,
      children: [
        {
          label: 'composables/',
          children: [
            {
              label: 'useAuth.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
            {
              label: 'useUser.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
          ],
        },
        {
          label: 'components/',
          defaultExpanded: true,
          children: [
            {
              label: 'Card.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
            {
              label: 'Button.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
          ],
        },
      ],
    },
    {
      label: 'app.vue',
      icon: 'i-vscode-icons-file-type-vue',
    },
    {
      label: 'nuxt.config.ts',
      icon: 'i-vscode-icons-file-type-nuxt',
    },
  ]);
</script>

<template>
  <UTree :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  import type { TreeItem } from '@nuxt/ui';

  const items = ref<TreeItem[]>([
    {
      label: 'app/',
      defaultExpanded: true,
      children: [
        {
          label: 'composables/',
          children: [
            {
              label: 'useAuth.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
            {
              label: 'useUser.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
          ],
        },
        {
          label: 'components/',
          defaultExpanded: true,
          children: [
            {
              label: 'Card.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
            {
              label: 'Button.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
          ],
        },
      ],
    },
    {
      label: 'app.vue',
      icon: 'i-vscode-icons-file-type-vue',
    },
    {
      label: 'nuxt.config.ts',
      icon: 'i-vscode-icons-file-type-nuxt',
    },
  ]);
</script>

<template>
  <UTree :items="items" />
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  import type { TreeItem } from '@nuxt/ui';

  const items = ref<TreeItem[]>([
    {
      label: 'app/',
      defaultExpanded: true,
      children: [
        {
          label: 'composables/',
          children: [
            {
              label: 'useAuth.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
            {
              label: 'useUser.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
          ],
        },
        {
          label: 'components/',
          defaultExpanded: true,
          children: [
            {
              label: 'Card.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
            {
              label: 'Button.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
          ],
        },
      ],
    },
    {
      label: 'app.vue',
      icon: 'i-vscode-icons-file-type-vue',
    },
    {
      label: 'nuxt.config.ts',
      icon: 'i-vscode-icons-file-type-nuxt',
    },
  ]);
</script>

<template>
  <UTree multiple :items="items" />
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  import type { TreeItem } from '@nuxt/ui';

  const items = ref<TreeItem[]>([
    {
      label: 'app/',
      defaultExpanded: true,
      children: [
        {
          label: 'composables/',
          children: [
            {
              label: 'useAuth.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
            {
              label: 'useUser.ts',
              icon: 'i-vscode-icons-file-type-typescript',
            },
          ],
        },
        {
          label: 'components/',
          defaultExpanded: true,
          children: [
            {
              label: 'Card.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
            {
              label: 'Button.vue',
              icon: 'i-vscode-icons-file-type-vue',
            },
          ],
        },
      ],
    },
    {
      label: 'app.vue',
      icon: 'i-vscode-icons-file-type-vue',
    },
    {
      label: 'nuxt.config.ts',
      icon: 'i-vscode-icons-file-type-nuxt',
    },
  ]);
</script>

<template>
  <UTree :nested="false" :items="items" />
</template>
```

---

## EditorToolbar

**URL:** llms-txt#editortoolbar

**Contents:**

- Usage
  - Items
  - Layout
  - Options
  - Should Show
- Examples
  - With image toolbar
  - With link popover
- API
  - Props

The EditorToolbar component displays a toolbar of formatting buttons that automatically sync their active state with the editor content. It supports three layout modes using the `@tiptap/vue-3/menus` package:

- `fixed`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} (always visible)
- `bubble`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} (appears on text selection)
- `floating`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} (appears on empty lines)

::caution
It must be used inside an [Editor](https://ui.nuxt.com/docs/components/editor) component's default slot to have access to the editor instance.
::

::callout{icon="i-custom-tiptap"}
The bubble and floating layouts use TipTap's [BubbleMenu](https://tiptap.dev/docs/editor/extensions/functionality/bubble-menu){rel="nofollow"} and [FloatingMenu](https://tiptap.dev/docs/editor/extensions/functionality/floating-menu){rel="nofollow"} extensions.
::

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `activeColor?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant?: "solid" | "outline" | "soft" | "ghost" | "link" | "subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `activeVariant?: "solid" | "outline" | "soft" | "ghost" | "link" | "subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`kind?: "mark" | "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "codeBlock" | "horizontalRule" | "paragraph" | "undo" | "redo" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/docs/components/editor#handlers)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `loading?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `active?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `tooltip?: TooltipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-link-popover)
- `onClick?: (e: MouseEvent) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `items?: EditorToolbarItem[] | EditorToolbarItem[][]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button#props) component such as `color`, `variant`, `size`, etc.

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take an `items` array of objects with the same properties as the `items` prop to create a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu).
::

Use the `layout` prop to change how the toolbar is displayed. Defaults to `fixed`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

When using `bubble`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} or `floating`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} layouts, use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.

When using `bubble`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} or `floating`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} layouts, use the `should-show` prop to control when the toolbar appears. This function receives context about the editor state and returns a boolean.

### With image toolbar

Use the `should-show` prop to create context-specific toolbars that appear only for certain node types. This example shows a `bubble` toolbar with download and delete actions that only appears when an image is selected.

### With link popover

This example demonstrates how to create a custom link popover using the `slot` property on toolbar items and the [Popover](https://ui.nuxt.com/docs/components/popover) component.

1. Create a Vue component that wraps a [Popover](https://ui.nuxt.com/docs/components/popover) with link editing functionality:

2. Use the custom component in the toolbar with a named slot:

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout{icon="i-custom-tiptap"}
The bubble and floating layouts use TipTap's [BubbleMenu](https://tiptap.dev/docs/editor/extensions/functionality/bubble-menu){rel="nofollow"} and [FloatingMenu](https://tiptap.dev/docs/editor/extensions/functionality/floating-menu){rel="nofollow"} extensions.
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `activeColor?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `variant?: "solid" | "outline" | "soft" | "ghost" | "link" | "subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `activeVariant?: "solid" | "outline" | "soft" | "ghost" | "link" | "subtle"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`kind?: "mark" | "textAlign" | "heading" | "link" | "image" | "blockquote" | "bulletList" | "orderedList" | "codeBlock" | "horizontalRule" | "paragraph" | "undo" | "redo" | "clearFormatting" | "duplicate" | "delete" | "moveUp" | "moveDown" | "suggestion" | "mention" | "emoji"`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/docs/components/editor#handlers)
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `loading?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `active?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `tooltip?: TooltipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-link-popover)
- `onClick?: (e: MouseEvent) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `items?: EditorToolbarItem[] | EditorToolbarItem[][]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button#props) component such as `color`, `variant`, `size`, etc.
```

Example 2 (unknown):

```unknown
::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take an `items` array of objects with the same properties as the `items` prop to create a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu).
::

### Layout

Use the `layout` prop to change how the toolbar is displayed. Defaults to `fixed`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.
```

Example 3 (unknown):

```unknown
### Options

When using `bubble`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} or `floating`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} layouts, use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
### Should Show

When using `bubble`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} or `floating`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} layouts, use the `should-show` prop to control when the toolbar appears. This function receives context about the editor state and returns a boolean.
```

---

## Input

**URL:** llms-txt#input

**Contents:**

- Usage
  - Type
  - Placeholder
  - Color
  - Variant
  - Size
  - Icon
  - Avatar
  - Loading
  - Loading Icon

Use the `v-model` directive to control the value of the Input.

Use the `type` prop to change the input type. Defaults to `text`.

Some types have been implemented in their own components such as [Checkbox](https://ui.nuxt.com/docs/components/checkbox), [Radio](https://ui.nuxt.com/docs/components/radio-group), [InputNumber](https://ui.nuxt.com/docs/components/input-number) etc. and others have been styled like `file` for example.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types

---

You can check all the available types on the MDN Web Docs.
::

Use the `placeholder` prop to set a placeholder text.

Use the `color` prop to change the ring color when the Input is focused.

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `variant` prop to change the variant of the Input.

Use the `size` prop to change the size of the Input.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the Input.

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the Input.

Use the `loading` prop to show a loading icon on the Input.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the Input.

### With clear button

You can put a [Button](https://ui.nuxt.com/docs/components/button) inside the `#trailing` slot to clear the Input.

You can put a [Button](https://ui.nuxt.com/docs/components/button) inside the `#trailing` slot to copy the value to the clipboard.

### With password toggle

You can put a [Button](https://ui.nuxt.com/docs/components/button) inside the `#trailing` slot to toggle the password visibility.

### With password strength indicator

You can use the [Progress](https://ui.nuxt.com/docs/components/progress) component to display the password strength indicator.

### With character limit

You can use the `#trailing` slot to add a character limit to the Input.

### With keyboard shortcut

You can use the [Kbd](https://ui.nuxt.com/docs/components/kbd) component inside the `#trailing` slot to add a keyboard shortcut to the Input.

::note{to="https://ui.nuxt.com/composables/define-shortcuts"}
This example uses the `defineShortcuts` composable to focus the Input when the `` key is pressed.
::

There's no built-in support for masks, but you can use libraries like [maska](https://github.com/beholdr/maska){rel="nofollow"} to mask the Input.

### With floating label

You can use the `#default` slot to add a floating label to the Input.

### Within a FormField

You can use the Input within a [FormField](https://ui.nuxt.com/docs/components/form-field) component to display a label, help text, required indicator, etc.

::tip{to="https://ui.nuxt.com/docs/components/form"}
It also provides validation and error handling when used within a **Form** component.
::

### Within a FieldGroup

You can use the Input within a [FieldGroup](https://ui.nuxt.com/components/field-group) component to group multiple elements together.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

---

This component also supports all native `<input>` HTML attributes.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                           | Type                  |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `inputRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLInputElement | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UInput model-value="" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UInput type="file" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UInput placeholder="Search..." />
</template>
```

Example 4 (vue):

```vue
<template>
  <UInput color="neutral" highlight placeholder="Search..." />
</template>
```

---

## ChatPalette

**URL:** llms-txt#chatpalette

**Contents:**

- Usage
- Examples
  - Within a Modal
  - Within ContentSearch
- API
  - Props
  - Slots
- Theme
- Changelog

The ChatPalette component is a structured layout wrapper that organizes [ChatMessages](https://ui.nuxt.com/docs/components/chat-messages) in a scrollable content area and [ChatPrompt](https://ui.nuxt.com/docs/components/chat-prompt) in a fixed bottom section, creating cohesive chatbot interfaces for modals, slideovers, or drawers.

::note{target="\_blank" to="https://ai-sdk.dev/docs/getting-started/nuxt"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

You can use the ChatPalette component inside a [Modal](https://ui.nuxt.com/docs/components/modal)'s content.

### Within ContentSearch

You can use the ChatPalette component conditionally inside [ContentSearch](https://ui.nuxt.com/docs/components/content-search)'s content to display a chatbot interface when a user selects an item.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
## Examples

::note{target="_blank" to="https://ai-sdk.dev/docs/getting-started/nuxt"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

### Within a Modal

You can use the ChatPalette component inside a [Modal](https://ui.nuxt.com/docs/components/modal)'s content.
```

Example 2 (unknown):

```unknown
### Within ContentSearch

You can use the ChatPalette component conditionally inside [ContentSearch](https://ui.nuxt.com/docs/components/content-search)'s content to display a chatbot interface when a user selects an item.
```

Example 3 (unknown):

```unknown
## API

### Props
```

Example 4 (unknown):

```unknown
### Slots
```

---

## CommandPalette

**URL:** llms-txt#commandpalette

**Contents:**

- Usage
  - Groups
  - Multiple
  - Placeholder
  - Icon
  - Selected Icon
  - Trailing Icon
  - Loading
  - Loading Icon
  - Close

Use the `v-model` directive to control the value of the CommandPalette or the `default-value` prop to set the initial value when you do not need to control its state.

::tip{to="https://ui.nuxt.com/#control-selected-items"}
You can also use the `@update:model-value` event to listen to the selected item(s).
::

The CommandPalette component filters groups and ranks matching commands by relevance as users type. It provides dynamic, instant search results for efficient command discovery. Use the `groups` prop as an array of objects with the following properties:

- `id: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `items?: CommandPaletteItem[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`ignoreFilter?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-ignore-filter)
- [`postFilter?: (searchTerm: string, items: T[]) => T[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-post-filtered-items)
- `highlightedIcon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::caution
You must provide an `id` for each group otherwise the group will be ignored.
::

Each group contains an `items` array of objects that define the commands. Each item can have the following properties:

- `prefix?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `label?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `suffix?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `avatar?: AvatarProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `chip?: ChipProps`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `active?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `loading?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `disabled?: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- [`slot?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}](https://ui.nuxt.com/#with-custom-slot)
- `placeholder?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `children?: CommandPaletteItem[]`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `onSelect?: (e: Event) => void`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `class?: any`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `ui?: { item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelPrefix?: ClassNameValue, itemLabelBase?: ClassNameValue, itemLabelSuffix?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue, itemTrailingHighlightedIcon?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

::tip{to="https://ui.nuxt.com/#with-children-in-items"}
Each item can take a `children` array of objects with the following properties to create submenus:
::

Use the `multiple` prop to allow multiple selections.

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

Use the `placeholder` prop to change the placeholder text.

Use the `icon` prop to customize the input [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-search`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.search` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.search` key.
:::
::

Use the `selected-icon` prop to customize the selected item [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-check`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

Use the `trailing-icon` prop to customize the trailing [Icon](https://ui.nuxt.com/docs/components/icon) when an item has children. Defaults to `i-lucide-chevron-right`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronRight` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronRight` key.
:::
::

Use the `loading` prop to show a loading icon on the CommandPalette.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `close` prop to display a [Button](https://ui.nuxt.com/docs/components/button) to dismiss the CommandPalette.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `close-icon` prop to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Use the `back` prop to customize or hide the back button (with `false` value) displayed when navigating into a submenu.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `back-icon` prop to customize the back button [Icon](https://ui.nuxt.com/docs/components/icon). Defaults to `i-lucide-arrow-left`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.arrowLeft` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.arrowLeft` key.
:::
::

Use the `disabled` prop to disable the CommandPalette.

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive, by using the `onSelect` field on each item or by using the `@update:model-value` event.

### Control search term

Use the `v-model:search-term` directive to control the search term.

::note
This example uses the `@update:model-value` event to reset the search term when an item is selected.
::

### With children in items

You can create hierarchical menus by using the `children` property in items. When an item has children, it will automatically display a chevron icon and enable navigation into a submenu.

::note
When navigating into a submenu:

- The search term is reset
- A back button appears in the input
- You can go back to the previous group by pressing the `` key
  ::

### With fetched items

You can fetch items from an API and use them in the CommandPalette.

### With ignore filter

You can set the `ignoreFilter` field to `true` on a group to disable the internal search and use your own search logic.

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced){rel="nofollow"} to debounce the API calls.
::

### With post-filtered items

You can use the `postFilter` field on a group to filter items after the search happened.

::note
Start typing to see items with higher level appear.
::

### With custom fuse search

You can use the `fuse` prop to override the options of [useFuse](https://vueuse.org/integrations/useFuse){rel="nofollow"} which defaults to:

::tip
The `fuseOptions` are the options of [Fuse.js](https://www.fusejs.io/api/options.html){rel="nofollow"}, the `resultLimit` is the maximum number of results to return and the `matchAllWhenSearchEmpty` is a boolean to match all items when the search term is empty.
::

You can for example set `{ fuseOptions: { includeMatches: true } }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to highlight the search term in the items.

### With virtualization :badge{.align-text-top label="4.1+"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{target="\_blank" to="https://github.com/unovue/reka-ui/issues/1885"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

You can use the CommandPalette component inside a [Popover](https://ui.nuxt.com/docs/components/popover)'s content.

You can use the CommandPalette component inside a [Modal](https://ui.nuxt.com/docs/components/modal)'s content.

You can use the CommandPalette component inside a [Drawer](https://ui.nuxt.com/docs/components/drawer)'s content.

### Listen open state

When using the `close` prop, you can listen to the `update:open` event when the button is clicked.

::note
This can be useful when using the CommandPalette inside a [`Modal`](https://ui.nuxt.com/docs/components/modal) for example.
::

Use the `#footer` slot to add custom content at the bottom of the CommandPalette, such as keyboard shortcuts help or additional actions.

Use the `slot` property to customize a specific item or group.

You will have access to the following slots:

- `#{{ item.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ item.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ group.slot }}`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ group.slot }}-leading`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ group.slot }}-label`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `#{{ group.slot }}-trailing`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UCommandPalette class="flex-1 h-80" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UCommandPalette class="flex-1" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UCommandPalette multiple class="flex-1" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UCommandPalette placeholder="Search an app..." class="flex-1" />
</template>
```

---

## DashboardToolbar

**URL:** llms-txt#dashboardtoolbar

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

The DashboardToolbar component is used to display a toolbar under the [DashboardNavbar](https://ui.nuxt.com/docs/components/dashboard-navbar) component.

Use it inside the `header` slot of the [DashboardPanel](https://ui.nuxt.com/docs/components/dashboard-panel) component:

Use the `left`, `default` and `right` slots to customize the toolbar.

::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render some links.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
Use the `left`, `default` and `right` slots to customize the toolbar.
```

Example 2 (unknown):

```unknown
::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render some links.
::

## API

### Props
```

Example 3 (unknown):

```unknown
### Slots
```

Example 4 (unknown):

```unknown
## Theme
```

---

## Table

**URL:** llms-txt#table

**Contents:**

- Usage
  - Data
  - Columns
  - Meta
  - Loading
  - Sticky
- Examples
  - With row actions
  - With expandable rows
  - With grouped rows

The Table component is built on top of [TanStack Table](https://tanstack.com/table/latest){rel="nofollow"} and is powered by the [useVueTable](https://tanstack.com/table/latest/docs/framework/vue/vue-table#usevuetable){rel="nofollow"} composable to provide a flexible and fully type-safe API. \*Some features of TanStack Table are not supported yet, we'll add more over time.\*

## ::callout

ariaLabel: View source code
icon: i-simple-icons-github
to: https://github.com/nuxt/ui/tree/v4/docs/app/components/content/examples/table/TableExample.vue

---

This example demonstrates the most common use case of the `Table` component. Check out the source code on GitHub.
::

Use the `data` prop as an array of objects, the columns will be generated based on the keys of the objects.

Use the `columns` prop as an array of [ColumnDef](https://tanstack.com/table/latest/docs/api/core/column-def){rel="nofollow"} objects with properties like:

- `accessorKey`: [The key of the row object to use when extracting the value for the column.]{.text-muted}
- `header`: [The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (the exact type depends on the adapter being used).]{.text-muted}
- `footer`: [The footer to display for the column. Works exactly like header, but is displayed under the table.]{.text-muted}
- `cell`: [The cell to display each row for the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value (the exact type depends on the adapter being used).]{.text-muted}
- `meta`: [Extra properties for the column.]{.text-muted}

- `td`: [The classes to apply to the `td` element.]{.text-muted}
  - `th`: [The classes to apply to the `th` element.]{.text-muted}
  - `style`:

- `td`: [The style to apply to the `td` element.]{.text-muted}
  - `th`: [The style to apply to the `th` element.]{.text-muted}

In order to render components or other HTML elements, you will need to use the Vue [`h` function](https://vuejs.org/api/render-function.html#h){rel="nofollow"} inside the `header` and `cell` props. This is different from other components that use slots but allows for more flexibility.

::tip{ariaLabel="Table columns with slots" to="https://ui.nuxt.com/#with-slots"}
You can also use slots to customize the header and data cells of the table.
::

::note
When rendering components with `h`, you can either use the `resolveComponent` function or import from `#components`.
::

Use the `meta` prop as an object ([TableMeta](https://tanstack.com/table/latest/docs/api/core/table#meta){rel="nofollow"}) to pass properties like:

- `tr`: [The classes to apply to the `tr` element.]{.text-muted}
- `style`:

- `tr`: [The style to apply to the `tr` element.]{.text-muted}

Use the `loading` prop to display a loading state, the `loading-color` prop to change its color and the `loading-animation` prop to change its animation.

Use the `sticky` prop to make the header or footer sticky.

You can add a new column that renders a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu) component inside the `cell` to render row actions.

### With expandable rows

You can add a new column that renders a [Button](https://ui.nuxt.com/docs/components/button) component inside the `cell` to toggle the expandable state of a row using the TanStack Table [Expanding APIs](https://tanstack.com/table/latest/docs/api/features/expanding){rel="nofollow"}.

::caution
You need to define the `#expanded` slot to render the expanded content which will receive the row as a parameter.
::

::tip
You can use the `expanded` prop to control the expandable state of the rows (can be binded with `v-model`).
::

::note
You could also add this action to the [`DropdownMenu`](https://ui.nuxt.com/docs/components/dropdown-menu) component inside the `actions` column.
::

### With grouped rows

You can group rows based on a given column value and show/hide sub rows via some button added to the cell using the TanStack Table [Grouping APIs](https://tanstack.com/table/latest/docs/api/features/grouping){rel="nofollow"}.

#### Important parts:

- Add `grouping` prop with an array of column ids you want to group by.
- Add `grouping-options` prop. It must include `getGroupedRowModel`, you can import it from `@tanstack/vue-table` or implement your own.
- Expand rows via `row.toggleExpanded()` method on any cell of the row. Keep in mind, it also toggles `#expanded` slot.
- Use `aggregateFn` on column definition to define how to aggregate the rows.
- `agregatedCell` renderer on column definition only works if there is no `cell` renderer.

### With row selection

You can add a new column that renders a [Checkbox](https://ui.nuxt.com/docs/components/checkbox) component inside the `header` and `cell` to select rows using the TanStack Table [Row Selection APIs](https://tanstack.com/table/latest/docs/api/features/row-selection){rel="nofollow"}.

::tip
You can use the `row-selection` prop to control the selection state of the rows (can be binded with `v-model`).
::

### With row select event

You can add a `@select` listener to make rows clickable with or without a checkbox column.

::note
The handler function receives the `Event` and `TableRow` instance as the first and second arguments respectively.
::

::tip
You can use this to navigate to a page, open a modal or even to select the row manually.
::

### With row context menu event

You can add a `@contextmenu` listener to make rows right clickable and wrap the Table in a [ContextMenu](https://ui.nuxt.com/docs/components/context-menu) component to display row actions for example.

::note
The handler function receives the `Event` and `TableRow` instance as the first and second arguments respectively.
::

### With row hover event

You can add a `@hover` listener to make rows hoverable and use a [Popover](https://ui.nuxt.com/docs/components/popover) or a [Tooltip](https://ui.nuxt.com/docs/components/tooltip) component to display row details for example.

::note
The handler function receives the `Event` and `TableRow` instance as the first and second arguments respectively.
::

::note
This example is similar as the Popover [with following cursor example](https://ui.nuxt.com/docs/components/popover#with-following-cursor) and uses a [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced){rel="nofollow"} to prevent the Popover from opening and closing too quickly when moving the cursor from one row to another.
::

### With column footer

You can add a `footer` property to the column definition to render a footer for the column.

### With column sorting

You can update a column `header` to render a [Button](https://ui.nuxt.com/docs/components/button) component inside the `header` to toggle the sorting state using the TanStack Table [Sorting APIs](https://tanstack.com/table/latest/docs/api/features/sorting){rel="nofollow"}.

::tip
You can use the `sorting` prop to control the sorting state of the columns (can be binded with `v-model`).
::

You can also create a reusable component to make any column header sortable.

::note
In this example, we use a function to define the column header but you can also create an actual component.
::

### With column pinning

You can update a column `header` to render a [Button](https://ui.nuxt.com/docs/components/button) component inside the `header` to toggle the pinning state using the TanStack Table [Pinning APIs](https://tanstack.com/table/latest/docs/api/features/row-pinning){rel="nofollow"}.

::note
A pinned column will become sticky on the left or right side of the table. When using column pinning, you should define explicit `size` values for your columns to ensure proper column width handling, especially with multiple pinned columns.
::

::tip
You can use the `column-pinning` prop to control the pinning state of the columns (can be binded with `v-model`).
::

### With column visibility

You can use a [DropdownMenu](https://ui.nuxt.com/docs/components/dropdown-menu) component to toggle the visibility of the columns using the TanStack Table [Column Visibility APIs](https://tanstack.com/table/latest/docs/api/features/column-visibility){rel="nofollow"}.

::tip
You can use the `column-visibility` prop to control the visibility state of the columns (can be binded with `v-model`).
::

### With column filters

You can use an [Input](https://ui.nuxt.com/docs/components/input) component to filter per column the rows using the TanStack Table [Column Filtering APIs](https://tanstack.com/table/latest/docs/api/features/column-filtering){rel="nofollow"}.

::tip
You can use the `column-filters` prop to control the filters state of the columns (can be binded with `v-model`).
::

### With global filter

You can use an [Input](https://ui.nuxt.com/docs/components/input) component to filter the rows using the TanStack Table [Global Filtering APIs](https://tanstack.com/table/latest/docs/api/features/global-filtering){rel="nofollow"}.

::tip
You can use the `global-filter` prop to control the global filter state (can be binded with `v-model`).
::

You can use a [Pagination](https://ui.nuxt.com/docs/components/pagination) component to control the pagination state using the [Pagination APIs](https://tanstack.com/table/latest/docs/api/features/pagination){rel="nofollow"}.

There are different pagination approaches as explained in [Pagination Guide](https://tanstack.com/table/latest/docs/guide/pagination#pagination-guide){rel="nofollow"}. In this example, we use client-side pagination so we need to manually pass `getPaginationRowModel()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} function.

::tip
You can use the `pagination` prop to control the pagination state (can be binded with `v-model`).
::

### With fetched data

You can fetch data from an API and use them in the Table.

### With infinite scroll

If you use server-side pagination, you can use the [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/#useinfinitescroll){rel="nofollow"} composable to load more data when scrolling.

### With drag and drop

You can use the [`useSortable`](https://vueuse.org/integrations/useSortable/){rel="nofollow"} composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html){rel="nofollow"} to enable drag and drop functionality on the Table. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/){rel="nofollow"} to provide a seamless drag and drop experience.

::note
Since the table ref doesn't expose the tbody element, add a unique class to it via the `:ui` prop to target it with `useSortable` (e.g. `:ui="{ tbody: 'my-table-tbody' }"`).
::

### With virtualization :badge{.align-text-top label="4.1+"}

Use the `virtualize` prop to enable virtualization for large datasets as a boolean or an object with options like `{ estimateSize: 65, overscan: 12 }`. You can also pass other [TanStack Virtual options](https://tanstack.com/virtual/latest/docs/api/virtualizer#optional-options){rel="nofollow"} to customize the virtualization behavior.

::warning
When virtualization is enabled, the divider between rows and sticky properties are not supported.
::

::note
A height constraint is required on the table for virtualization to work properly (e.g., `class="h-[400px]"`).
::

You can use the `get-sub-rows` prop to display hierarchical (tree) data in the table.
For example, if your data objects have a `children` array, set `:get-sub-rows="row => row.children"` to enable expandable rows.

You can use slots to customize the header and data cells of the table.

Use the `#<column>-header` slot to customize the header of a column. You will have access to the `column`, `header` and `table` properties in the slot scope.

Use the `#<column>-cell` slot to customize the cell of a column. You will have access to the `cell`, `column`, `getValue`, `renderValue`, `row`, and `table` properties in the slot scope.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#attributes

---

This component also supports all native `<table>` HTML attributes.
::

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref){rel="nofollow"}.

This will give you access to the following:

| Name                                                                                                                           | Type                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `tableRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<HTMLTableElement                                                                                                                                                                                          | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |
| `tableApi`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | [`Table`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}](https://tanstack.com/table/latest/docs/api/core/table#table-api){rel="nofollow"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout
---
ariaLabel: View source code
icon: i-simple-icons-github
to: https://github.com/nuxt/ui/tree/v4/docs/app/components/content/examples/table/TableExample.vue
---
This example demonstrates the most common use case of the `Table` component. Check out the source code on GitHub.
::

### Data

Use the `data` prop as an array of objects, the columns will be generated based on the keys of the objects.
```

Example 2 (unknown):

```unknown
### Columns

Use the `columns` prop as an array of [ColumnDef](https://tanstack.com/table/latest/docs/api/core/column-def){rel="nofollow"} objects with properties like:

- `accessorKey`: [The key of the row object to use when extracting the value for the column.]{.text-muted}
- `header`: [The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (the exact type depends on the adapter being used).]{.text-muted}
- `footer`: [The footer to display for the column. Works exactly like header, but is displayed under the table.]{.text-muted}
- `cell`: [The cell to display each row for the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value (the exact type depends on the adapter being used).]{.text-muted}
- `meta`: [Extra properties for the column.]{.text-muted}

  - `class`:


    - `td`: [The classes to apply to the `td` element.]{.text-muted}
    - `th`: [The classes to apply to the `th` element.]{.text-muted}
  - `style`:


    - `td`: [The style to apply to the `td` element.]{.text-muted}
    - `th`: [The style to apply to the `th` element.]{.text-muted}

In order to render components or other HTML elements, you will need to use the Vue [`h` function](https://vuejs.org/api/render-function.html#h){rel="nofollow"} inside the `header` and `cell` props. This is different from other components that use slots but allows for more flexibility.

::tip{ariaLabel="Table columns with slots" to="https://ui.nuxt.com/#with-slots"}
You can also use slots to customize the header and data cells of the table.
::
```

Example 3 (unknown):

```unknown
::note
When rendering components with `h`, you can either use the `resolveComponent` function or import from `#components`.
::

### Meta

Use the `meta` prop as an object ([TableMeta](https://tanstack.com/table/latest/docs/api/core/table#meta){rel="nofollow"}) to pass properties like:

- `class`:


  - `tr`: [The classes to apply to the `tr` element.]{.text-muted}
- `style`:


  - `tr`: [The style to apply to the `tr` element.]{.text-muted}
```

Example 4 (unknown):

```unknown
### Loading

Use the `loading` prop to display a loading state, the `loading-color` prop to change its color and the `loading-animation` prop to change its animation.
```

---

## Toast

**URL:** llms-txt#toast

**Contents:**

- Usage
  - Title
  - Description
  - Icon
  - Avatar
  - Color
  - Close
  - Close Icon
  - Actions
  - Progress

Use the [useToast](https://ui.nuxt.com/docs/composables/use-toast) composable to display a toast in your application.

::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses our [`Toaster`](https://github.com/nuxt/ui/blob/v4/src/runtime/components/Toaster.vue){rel="nofollow"} component which uses the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider){rel="nofollow"} component from Reka UI.
::

::tip{to="https://ui.nuxt.com/docs/components/app#props"}
You can check the `App` component `toaster` prop to see how to configure the Toaster globally.
::

Pass a `title` field to the `toast.add` method to display a title.

Pass a `description` field to the `toast.add` method to display a description.

Pass an `icon` field to the `toast.add` method to display an [Icon](https://ui.nuxt.com/docs/components/icon).

Pass an `avatar` field to the `toast.add` method to display an [Avatar](https://ui.nuxt.com/docs/components/avatar).

Pass a `color` field to the `toast.add` method to change the color of the Toast.

Pass a `close` field to customize or hide the close [Button](https://ui.nuxt.com/docs/components/button) (with `false` value).

Pass a `closeIcon` field to customize the close button [Icon](https://ui.nuxt.com/docs/components/icon). Default to `i-lucide-x`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

Pass an `actions` field to add some [Button](https://ui.nuxt.com/docs/components/button) actions to the Toast.

Pass a `progress` field to customize or hide the [Progress](https://ui.nuxt.com/docs/components/progress) bar (with `false` value).

::tip
The Progress bar inherits the Toast color by default, but you can override it using the `progress.color` field.
::

Pass an `orientation` field to the `toast.add` method to change the orientation of the Toast.

::note{to="https://ui.nuxt.com/components/app"}
Nuxt UI provides an **App** component that wraps your app to provide global configurations.
::

### Change global position

Change the `toaster.position` prop on the [App](https://ui.nuxt.com/docs/components/app#props) component to change the position of the toasts.

::note{to="https://github.com/nuxt/ui/blob/v4/docs/app/app.config.ts#L3"}
In this example, we use the `AppConfig` to configure the `position` prop of the `Toaster` component globally.
::

### Change global duration

Change the `toaster.duration` prop on the [App](https://ui.nuxt.com/docs/components/app#props) component to change the duration of the toasts.

::note{to="https://github.com/nuxt/ui/blob/v4/docs/app/app.config.ts#L4"}
In this example, we use the `AppConfig` to configure the `duration` prop of the `Toaster` component globally.
::

### Change global max :badge{.align-text-top label="4.1+"}

Change the `toaster.max` prop on the [App](https://ui.nuxt.com/docs/components/app#props) component to change the max number of toasts displayed at once.

::note{to="https://github.com/nuxt/ui/blob/v4/docs/app/app.config.ts#L5"}
In this example, we use the `AppConfig` to configure the `max` prop of the `Toaster` component globally.
::

Set the `toaster.expand` prop to `false` on the [App](https://ui.nuxt.com/docs/components/app#props) component to display stacked toasts (inspired by [Sonner](https://sonner.emilkowal.ski/){rel="nofollow"}).

::tip
You can hover over the toasts to expand them. This will also pause the timer of the toasts.
::

::note{to="https://github.com/nuxt/ui/blob/v4/docs/app/app.config.ts#L6"}
In this example, we use the `AppConfig` to configure the `expand` prop of the `Toaster` component globally.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                         | Type                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `height`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<number>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
Make sure to wrap your app with the [`App`](https://ui.nuxt.com/docs/components/app) component which uses our [`Toaster`](https://github.com/nuxt/ui/blob/v4/src/runtime/components/Toaster.vue){rel="nofollow"} component which uses the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider){rel="nofollow"} component from Reka UI.
::

::tip{to="https://ui.nuxt.com/docs/components/app#props"}
You can check the `App` component `toaster` prop to see how to configure the Toaster globally.
::

### Title

Pass a `title` field to the `toast.add` method to display a title.
```

Example 2 (unknown):

```unknown
### Description

Pass a `description` field to the `toast.add` method to display a description.
```

Example 3 (unknown):

```unknown
### Icon

Pass an `icon` field to the `toast.add` method to display an [Icon](https://ui.nuxt.com/docs/components/icon).
```

Example 4 (unknown):

```unknown
### Avatar

Pass an `avatar` field to the `toast.add` method to display an [Avatar](https://ui.nuxt.com/docs/components/avatar).
```

---

## Button

**URL:** llms-txt#button

**Contents:**

- Usage
  - Label
  - Color
  - Variant
  - Size
  - Icon
  - Avatar
  - Link
  - Loading
  - Loading Icon

Use the default slot to set the label of the Button.

Use the `label` prop to set the label of the Button.

Use the `color` prop to change the color of the Button.

Use the `variant` prop to change the variant of the Button.

Use the `size` prop to change the size of the Button.

Use the `icon` prop to show an [Icon](https://ui.nuxt.com/docs/components/icon) inside the Button.

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

The `label` as prop or slot is optional so you can use the Button as an icon-only button.

Use the `avatar` prop to show an [Avatar](https://ui.nuxt.com/docs/components/avatar) inside the Button.

The `label` as prop or slot is optional so you can use the Button as an avatar-only button.

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

When the Button is a link or when using the `active` prop, you can use the `active-color` and `active-variant` props to customize the active state.

You can also use the `active-class` and `inactive-class` props to customize the active state.

::tip
You can configure these styles globally in your `app.config.ts` file under the `ui.button.variants.active` key.

Use the `loading` prop to show a loading icon and disable the Button.

Use the `loading-auto` prop to show the loading icon automatically while the `@click` promise is pending.

This also works with the [Form](https://ui.nuxt.com/docs/components/form) component.

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::framework-only
#nuxt
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#theme

---

You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/vue#theme

---

You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

Use the `disabled` prop to disable the Button.

Use the `class` prop to override the base styles of the Button.

Use the `ui` prop to override the slots styles of the Button.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

## ::callout

icon: i-simple-icons-github
to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Link.vue#L13

---

The `Button` component extends the `Link` component. Check out the source code on GitHub.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UButton> Button </UButton>
</template>
```

Example 2 (vue):

```vue
<template>
  <UButton label="Button" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UButton color="neutral"> Button </UButton>
</template>
```

Example 4 (vue):

```vue
<template>
  <UButton color="neutral" variant="outline"> Button </UButton>
</template>
```

---
