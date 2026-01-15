# Nuxt-Ui - Integrations

**Pages:** 20

---

## PageSection

**URL:** llms-txt#pagesection

**Contents:**

- Usage
  - Title
  - Description
  - Headline
  - Icon
  - Features
  - Links
  - Orientation
  - Reverse
- API

The PageSection component wraps your content in a [Container](https://ui.nuxt.com/docs/components/container) while maintaining full-width flexibility making it easy to add background colors, images or patterns. It provides a flexible way to display content with an illustration in the default slot.

::code-preview
:::u-page-section

---

features: - title: Icons
description: Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons
from Iconify.
icon: i-lucide-smile
to: /docs/getting-started/integrations/icons - title: Fonts
description: Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font
optimization.
icon: i-lucide-a-large-small
to: /docs/getting-started/integrations/fonts - title: Color Mode
description: Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.
icon: i-lucide-sun-moon
to: /docs/getting-started/integrations/color-mode
description: Nuxt UI provides a comprehensive suite of components and utilities
to help you build beautiful and accessible web applications with Vue and Nuxt.
headline: Features
title: Beautiful Vue UI components

---

:::
::

Use it after a [PageHero](https://ui.nuxt.com/docs/components/page-hero) component:

Use the `title` prop to set the title of the section.

Use the `description` prop to set the description of the section.

Use the `headline` prop to set the headline of the section.

Use the `icon` prop to set the icon of the section.

Use the `features` prop to display a list of [PageFeature](https://ui.nuxt.com/docs/components/page-feature) under the description as an array of objects with the following properties:

- `title?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `description?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `icon?: string`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}
- `orientation?: 'horizontal' | 'vertical'`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

You can pass any property from the [Link](https://ui.nuxt.com/docs/components/link#props) component such as `to`, `target`, etc.

Use the `links` prop to display a list of [Button](https://ui.nuxt.com/docs/components/button) under the description.

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

Use the `reverse` prop to reverse the orientation of the default slot.

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
### Title

Use the `title` prop to set the title of the section.
```

Example 2 (unknown):

```unknown
### Description

Use the `description` prop to set the description of the section.
```

Example 3 (unknown):

```unknown
### Headline

Use the `headline` prop to set the headline of the section.
```

Example 4 (unknown):

```unknown
### Icon

Use the `icon` prop to set the icon of the section.
```

---

## ContentToc

**URL:** llms-txt#contenttoc

**Contents:**

- Usage
  - Title
  - Color
  - Highlight
- Examples
  - Within a page
- API
  - Props
  - Slots
  - Emits

::warning{to="https://ui.nuxt.com/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

Use the `links` prop with the `page?.body?.toc?.links`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} you get when fetching a page.

Use the `title` prop to change the title of the Table of Contents.

Use the `color` prop to change the color of the links.

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

Use the ContentToc component in a page to display the Table of Contents:

::component-changelog{prefix="content"}
::

**Examples:**

Example 1 (unknown):

```unknown
### Title

Use the `title` prop to change the title of the Table of Contents.
```

Example 2 (unknown):

```unknown
### Color

Use the `color` prop to change the color of the links.
```

Example 3 (unknown):

```unknown
### Highlight

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.
```

Example 4 (unknown):

```unknown
## Examples

### Within a page

Use the ContentToc component in a page to display the Table of Contents:
```

---

## ColorModeImage

**URL:** llms-txt#colormodeimage

**Contents:**

- Usage
- API
  - Props
- Changelog

The ColorModeImage component uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image){rel="nofollow"} is installed, falling back to `img` otherwise.

::note
Switch between light and dark mode to see the different images: :u-color-mode-select{size="sm"}
::

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes

---

This component also supports all native `<img>` HTML attributes.
::

::component-changelog{prefix="color-mode"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorModeImage
    light="https://picsum.photos/id/29/400"
    dark="https://picsum.photos/id/46/400"
    :width="200"
    :height="200" />
</template>
```

Example 2 (ts):

```ts
/**
 * Props for the ColorModeImage component
 */
interface ColorModeImageProps {
  dark: string;
  light: string;
  alt?: string | undefined;
  crossorigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  decoding?: 'async' | 'auto' | 'sync' | undefined;
  height?: Numberish | undefined;
  loading?: 'lazy' | 'eager' | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  srcset?: string | undefined;
  usemap?: string | undefined;
  width?: Numberish | undefined;
}
```

---

## ColorModeSwitch

**URL:** llms-txt#colormodeswitch

**Contents:**

- Usage
- Examples
  - With custom icons
- API
  - Props
- Changelog

The ColorModeSwitch component extends the [Switch](https://ui.nuxt.com/docs/components/switch) component, so you can pass any property such as `color`, `size`, etc.

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

::component-changelog{prefix="color-mode"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorModeSwitch />
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

## API

### Props
```

---

## PageLogos

**URL:** llms-txt#pagelogos

**Contents:**

- Usage
  - Title
  - Items
  - Marquee
- API
  - Props
  - Slots
- Theme
- Changelog

The PageLogos component provides a flexible way to display a list of logos or images in your pages.

Use the `title` prop to set the title above the logos.

You can display logos in two ways:

1. Using the `items` prop to provide a list of logos. Each item can be either:

- An icon name (e.g., `i-simple-icons-github`)
- An object containing `src` and `alt` properties for images, which will be utilized in a `UAvatar` component

2. Using the default slot to have complete control over the content

Use the `marquee` prop to enable a marquee effect for the logos.

::note{to="https://ui.nuxt.com/docs/components/marquee"}
When you use `marquee` mode, you can customize its behavior by passing props. For more info, check out the [Marquee](https://ui.nuxt.com/docs/components/marquee) component.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    'i-simple-icons-github',
    'i-simple-icons-discord',
    'i-simple-icons-x',
    'i-simple-icons-instagram',
    'i-simple-icons-linkedin',
    'i-simple-icons-facebook',
  ]);
</script>

<template>
  <UPageLogos :items="items" />
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const items = ref<undefined>([
    'i-simple-icons-github',
    'i-simple-icons-discord',
    'i-simple-icons-x',
    'i-simple-icons-instagram',
    'i-simple-icons-linkedin',
    'i-simple-icons-facebook',
  ]);
</script>

<template>
  <UPageLogos title="Trusted by the best front-end teams" :items="items" />
</template>
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

### Marquee

Use the `marquee` prop to enable a marquee effect for the logos.
```

---

## ContentNavigation

**URL:** llms-txt#contentnavigation

**Contents:**

- Usage
  - Type
  - Color
  - Variant
  - Highlight
  - Trailing Icon
- Examples
  - Within a layout
  - Within a header
- API

::warning{to="https://ui.nuxt.com/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

Use the `navigation` prop with the `navigation`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} value you get when fetching the navigation of your app.

Set the `type` prop to `single` to only allow one item to be open at a time. Defaults to `multiple`.

Use the `color` prop to change the color of the navigation links.

Use the `variant` prop to change the variant of the navigation links.

Use the `highlight` prop to display a highlighted border for the active link.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

Use the ContentNavigation component inside a [PageAside](https://ui.nuxt.com/docs/components/page-aside) component within a layout to display the navigation of the page:

Use the ContentNavigation component inside the `content` slot of a [Header](https://ui.nuxt.com/docs/components/header) component to display the navigation of the page on mobile:

::component-changelog{prefix="content"}
::

**Examples:**

Example 1 (unknown):

```unknown
### Type

Set the `type` prop to `single` to only allow one item to be open at a time. Defaults to `multiple`.
```

Example 2 (unknown):

```unknown
### Color

Use the `color` prop to change the color of the navigation links.
```

Example 3 (unknown):

```unknown
### Variant

Use the `variant` prop to change the variant of the navigation links.
```

Example 4 (unknown):

```unknown
### Highlight

Use the `highlight` prop to display a highlighted border for the active link.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.
```

---

## Fonts

**URL:** llms-txt#fonts

**Contents:**

- Usage
  - Declaration
  - Configuration

Nuxt UI automatically registers the [`@nuxt/fonts`](https://github.com/nuxt/fonts){rel="nofollow"} module for you, so there's no additional setup required.

To use a font in your Nuxt UI application, you can simply declare it in your CSS. It will be automatically loaded and optimized for you.

You can disable the `@nuxt/fonts` module with the `ui.fonts` option in your `nuxt.config.ts`:

**Examples:**

Example 1 (unknown):

```unknown
### Configuration

You can disable the `@nuxt/fonts` module with the `ui.fonts` option in your `nuxt.config.ts`:
```

---

## PageCard

**URL:** llms-txt#pagecard

**Contents:**

- Usage
  - Title
  - Description
  - Icon
  - Link
  - Variant
  - Orientation
  - Reverse
  - Highlight
  - Spotlight

The PageCard component provides a flexible way to display content in a card with an illustration in the default slot.

::code-preview
:::u-page-card

---

class: w-96
description: Nuxt UI integrates with latest Tailwind CSS v4, bringing
significant improvements.
icon: i-simple-icons-tailwindcss
title: Tailwind CSS

---

![Tailwind CSS](https://ui.nuxt.com/tailwindcss-v4.svg){.w-full}
:::
::

::tip
Use the [PageGrid](https://ui.nuxt.com/docs/components/page-grid), [PageColumns](https://ui.nuxt.com/docs/components/page-columns) or [PageList](https://ui.nuxt.com/docs/components/page-list) components to display multiple PageCard.
::

Use the `title` prop to set the title of the card.

Use the `description` prop to set the description of the card.

Use the `icon` prop to set the icon of the card.

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link){rel="nofollow"} component such as `to`, `target`, `rel`, etc.

Use the `variant` prop to change the style of the card.

::tip
You can apply the `light` or `dark` class to the `links` slot when using the `solid` variant to reverse the colors.
::

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

Use the `reverse` prop to reverse the orientation of the default slot.

Use the `highlight` and `highlight-color` props to display a highlighted border around the card.

Use the `spotlight` and `spotlight-color` props to display a spotlight effect that follows your mouse cursor and highlights borders on hover.

::note
The spotlight effect will take over hover effects when using a `to` prop. It's best to use it with the `outline` variant.
::

::tip
You can also customize the color and size by using the `--spotlight-color` and `--spotlight-size` CSS variables:

Use the [User](https://ui.nuxt.com/docs/components/user) component in the `header` or `footer` slot to make the card look like a testimonial.

::tip{to="https://ui.nuxt.com/docs/components/page-columns"}
You can use the [`PageColumns`](https://ui.nuxt.com/docs/components/page-columns) component to display multiple PageCard in a multi-column layout.
::

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UPageCard title="Tailwind CSS" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UPageCard
    title="Tailwind CSS"
    description="Nuxt UI integrates with latest Tailwind CSS v4, bringing significant improvements." />
</template>
```

Example 3 (vue):

```vue
<template>
  <UPageCard
    title="Tailwind CSS"
    description="Nuxt UI integrates with latest Tailwind CSS v4, bringing significant improvements."
    icon="i-simple-icons-tailwindcss" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UPageCard
    title="Tailwind CSS"
    description="Nuxt UI integrates with latest Tailwind CSS v4, bringing significant improvements."
    icon="i-simple-icons-tailwindcss"
    to="https://tailwindcss.com/docs/v4-beta"
    target="_blank" />
</template>
```

---

## Icons

**URL:** llms-txt#icons

**Contents:**

- Usage
  - Icon component
  - Component props
- Theme

## ::callout

class: hidden
icon: i-logos-nuxt-icon
to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt

---

Looking for the **Nuxt** version?
::

You can use the [Icon](https://ui.nuxt.com/docs/components/icon) component with a `name` prop to display an icon:

::note
You can use any name from the <https://icones.js.org>{rel="nofollow"} collection.
::

::warning
When using collections with a dash (`-`), you need to separate the icon name from the collection name with a colon (`:`) as `@iconify/vue` does not handle this case like `@nuxt/icon`. For example, instead of `i-simple-icons-github` you need to write `i-simple-icons:github` or `simple-icons:github`.

Learn more about the [Iconify naming convention](https://iconify.design/docs/icon-components/vue/#icon){rel="nofollow"}.
::

Some components also have an `icon` prop to display an icon, like the [Button](https://ui.nuxt.com/docs/components/button) for example:

You can change the default icons used by Nuxt UI components in your `vite.config.ts`:

**Examples:**

Example 1 (vue):

```vue
<template>
  <UIcons name="i-lucide-lightbulb" class="size-5" />
</template>
```

Example 2 (vue):

```vue
<template>
  <UIcons icon="i-lucide-sun" variant="subtle"> Button </UIcons>
</template>
```

---

## ContentSearchButton

**URL:** llms-txt#contentsearchbutton

**Contents:**

- Usage
  - Collapsed
  - Kbds
- API
  - Props
  - Slots
- Theme
- Changelog

::warning{to="https://ui.nuxt.com/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

The ContentSearchButton component is used to open the [ContentSearch](https://ui.nuxt.com/docs/components/content-search) modal.

It extends the [Button](https://ui.nuxt.com/docs/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::note{to="https://ui.nuxt.com/#collapsed"}
The button defaults to `color="neutral"` and `variant="outline"` when not collapsed, `variant="ghost"` when collapsed.
::

Use the `collapsed` prop to show the button's label and [kbds](https://ui.nuxt.com/#kbds). Defaults to `true`.

Use the `kbds` prop to display keyboard keys in the button. Defaults to `['meta', 'K']`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} to match the default shortcut of the [ContentSearch](https://ui.nuxt.com/docs/components/content-search#shortcut) component.

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes

---

This component also supports all native `<button>` HTML attributes.
::

::component-changelog{prefix="content"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UContentSearchButton />
</template>
```

Example 2 (vue):

```vue
<template>
  <UContentSearchButton variant="subtle" />
</template>
```

Example 3 (vue):

```vue
<template>
  <UContentSearchButton :collapsed="false" />
</template>
```

Example 4 (vue):

```vue
<template>
  <UContentSearchButton :collapsed="false" />
</template>
```

---

## Create a content component

**URL:** llms-txt#create-a-content-component

nuxt-ui make component block --content

---

## Icon

**URL:** llms-txt#icon

**Contents:**

- Usage
- Examples
  - SVG
- API
  - Props
- Changelog

Use the `name` prop to display an icon:

::framework-only
#nuxt
:::caution

---

to: https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#collections

---

It's highly recommended to install the icons collections you need, read more about this.
:::
::

You can also pass a Vue component into the `name` prop:

You can define your icon components yourself, or use [`unplugin-icons`](https://github.com/unplugin/unplugin-icons){rel="nofollow"} to import them directly from SVG files:

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UIcon name="i-lucide-lightbulb" class="size-5" />
</template>
```

Example 2 (unknown):

```unknown
You can define your icon components yourself, or use [`unplugin-icons`](https://github.com/unplugin/unplugin-icons){rel="nofollow"} to import them directly from SVG files:
```

Example 3 (unknown):

```unknown
## API

### Props
```

---

## ContentSearch

**URL:** llms-txt#contentsearch

**Contents:**

- Usage
  - Shortcut
  - Color Mode
- Examples
  - Within `app.vue`
- API
  - Props
  - Slots
  - Emits
  - Expose

::warning{to="https://ui.nuxt.com/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

The ContentSearch component extends the [CommandPalette](https://ui.nuxt.com/docs/components/command-palette) component, so you can pass any property such as `icon`, `placeholder`, etc.

Use the `files` and `navigation` props with the `files`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and `navigation`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} values you fetched using the `queryCollectionSearchSections` and `queryCollectionNavigation` composables from `@nuxt/content`.

::tip
You can open the CommandPalette by pressing ` `, by using the [ContentSearchButton](https://ui.nuxt.com/docs/components/content-search-button) component or by using the `useContentSearch` composable: `const { open } = useContentSearch()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts"}.
::

Use the `shortcut` prop to change the shortcut used in [defineShortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts) to open the ContentSearch component. Defaults to `meta_k` (` `).

By default, a group of commands will be added to the command palette so you can switch between light and dark mode. This will only take effect if the `colorMode` is not forced in a specific page which can be achieved through `definePageMeta`:

You can disable this behavior by setting the `color-mode` prop to `false`:

Use the ContentSearch component in your `app.vue` or in a layout:

::tip
It is recommended to wrap the `ContentSearch` component in a [ClientOnly](https://nuxt.com/docs/api/components/client-only){rel="nofollow"} component so it's not rendered on the server.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                                    | Type                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `commandPaletteRef`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<InstanceType<typeof UCommandPalette> | null>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

::component-changelog{prefix="content"}
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
You can open the CommandPalette by pressing `` ``, by using the [ContentSearchButton](https://ui.nuxt.com/docs/components/content-search-button) component or by using the `useContentSearch` composable: `const { open } = useContentSearch()`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts"}.
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
## Examples

### Within `app.vue`

Use the ContentSearch component in your `app.vue` or in a layout:
```

---

## ContentSurround

**URL:** llms-txt#contentsurround

**Contents:**

- Usage
  - Prev / Next
- Examples
  - Within a page
- API
  - Props
  - Slots
- Theme
- Changelog

::warning{to="https://ui.nuxt.com/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

Use the `surround` prop with the `surround`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} value you get when fetching a page surround.

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](https://ui.nuxt.com/docs/components/icon).

Use the ContentSurround component in a page to display the prev and next links:

::component-changelog{prefix="content"}
::

**Examples:**

Example 1 (unknown):

```unknown
### Prev / Next

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](https://ui.nuxt.com/docs/components/icon).
```

Example 2 (unknown):

```unknown
## Examples

### Within a page

Use the ContentSurround component in a page to display the prev and next links:
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

## ColorModeAvatar

**URL:** llms-txt#colormodeavatar

**Contents:**

- Usage
- API
  - Props
- Changelog

The ColorModeAvatar component extends the [Avatar](https://ui.nuxt.com/docs/components/avatar) component, so you can pass any property such as `size`, `icon`, etc.

Use the `light` and `dark` props to define the source for light and dark mode.

::note
Switch between light and dark mode to see the different images: :u-color-mode-select{size="sm"}
::

## ::callout

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes

---

This component also supports all native `<img>` HTML attributes.
::

::component-changelog{prefix="color-mode"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorModeAvatar light="https://github.com/vuejs.png" dark="https://github.com/nuxt.png" />
</template>
```

Example 2 (ts):

```ts
/**
 * Props for the ColorModeAvatar component
 */
interface ColorModeAvatarProps {
  light: string;
  dark: string;
  /**
   * The element or component this component should render as.
   */
  as?: any;
  ui?: { root?: ClassNameValue; image?: ClassNameValue; fallback?: ClassNameValue; icon?: ClassNameValue } | undefined;
  alt?: string | undefined;
  crossorigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  decoding?: 'async' | 'auto' | 'sync' | undefined;
  height?: Numberish | undefined;
  loading?: 'lazy' | 'eager' | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  srcset?: string | undefined;
  usemap?: string | undefined;
  width?: Numberish | undefined;
  icon?: any;
  text?: string | undefined;
  size?: 'md' | '3xs' | '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | undefined;
  chip?: boolean | ChipProps | undefined;
}
```

---

## Internationalization (i18n)

**URL:** llms-txt#internationalization-(i18n)

**Contents:**

- Usage
  - Locale
  - Custom locale
  - Extend locale
  - Dynamic locale
  - Dynamic direction
- Supported languages

## ::callout

class: hidden
icon: i-logos-nuxt-icon
to: https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt

---

Looking for the **Nuxt** version?
::

::note{to="https://ui.nuxt.com/docs/components/app"}
Nuxt UI provides an **App** component that wraps your app to provide global configurations.
::

Use the `locale` prop with the locale you want to use from `@nuxt/ui/locale`:

You can create your own locale using the `defineLocale` composable:

::tip
Look at the `code` parameter, there you need to pass the iso code of the language. Example:

- `hi` Hindi (language)
- `de-AT`: German (language) as used in Austria (region)
  ::

You can customize an existing locale by overriding its `messages` or `code` using the `extendLocale` composable:

To dynamically switch between languages, you can use the [Vue I18n](https://vue-i18n.intlify.dev/){rel="nofollow"} plugin.

::steps{level="4"}

#### Install the Vue I18n package

:::code-group{sync="pm"}

:::

#### Use the Vue I18n plugin in your `main.ts`

#### Set the `locale` prop using `useI18n`

### Dynamic direction

Each locale has a `dir` property which will be used by the `App` component to set the directionality of all components.

In a multilingual application, you might want to set the `lang` and `dir` attributes on the `<html>` element dynamically based on the user's locale, which you can do with the [useHead](https://unhead.unjs.io/usage/composables/use-head){rel="nofollow"} composable:

## Supported languages

::supported-languages
::

**Examples:**

Example 1 (unknown):

```unknown
### Custom locale

You can create your own locale using the `defineLocale` composable:
```

Example 2 (unknown):

```unknown
::tip
Look at the `code` parameter, there you need to pass the iso code of the language. Example:

- `hi` Hindi (language)
- `de-AT`: German (language) as used in Austria (region)
::

### Extend locale

You can customize an existing locale by overriding its `messages` or `code` using the `extendLocale` composable:
```

Example 3 (unknown):

```unknown
### Dynamic locale

To dynamically switch between languages, you can use the [Vue I18n](https://vue-i18n.intlify.dev/){rel="nofollow"} plugin.

::steps{level="4"}
#### Install the Vue I18n package

  :::code-group{sync="pm"}
```

Example 4 (unknown):

```unknown

```

---

## Editor

**URL:** llms-txt#editor

**Contents:**

- Usage
- Rich Formatting Options
  - Interactive Features
  - Advanced Capabilities
  - Content
  - Content Type
  - Extensions
  - Placeholder
  - Starter Kit
  - Handlers

The Editor component provides a powerful rich text editing experience built on [TipTap](https://tiptap.dev/){rel="nofollow"}. It supports multiple content formats (JSON, HTML, Markdown), customizable toolbars, drag-and-drop block reordering, slash commands, mentions, emoji picker, and extensible architecture for adding custom functionality.

## ::callout

ariaLabel: View source code
icon: i-simple-icons-github
to: https://github.com/nuxt/ui/blob/v4/docs/app/components/content/examples/editor/EditorExample.vue

---

This example demonstrates a production-ready Editor component. Check out the source code on GitHub.
::

Use the `v-model` directive to control the value of the Editor.

The Editor automatically detects the content format based on `v-model` type: strings are treated as `html`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and objects as `json`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

You can explicitly set the format using the `content-type` prop: `json`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, `html`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, or `markdown`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

The Editor includes the following extensions by default:

- [**StarterKit**](https://ui.nuxt.com/#starter-kit) - Core editing features (bold, italic, headings, lists, etc.)
- [**Placeholder**](https://ui.nuxt.com/#placeholder) - Show placeholder text (when placeholder prop is provided)
- **Image** - Insert and display images
- **Mention** - Add @ mentions support
- **Markdown** - Parse and serialize markdown (when content type is markdown)

::note
Each built-in extension can be configured using its corresponding prop (`starter-kit`, `placeholder`, `image`, `mention`, `markdown`) to customize its behavior with TipTap options.
::

You can use the `extensions` prop to add additional TipTap extensions to enhance the Editor's capabilities:

::tip{to="https://ui.nuxt.com/#with-image-upload"}
Check out the image upload example for creating custom TipTap extensions.
::

Use the `placeholder` prop to set a placeholder text that shows in empty paragraphs.

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/functionality/placeholder

---

Learn more about Placeholder extension in the TipTap documentation.
::

Use the `starter-kit` prop to configure the built-in TipTap StarterKit extension which includes common editor features like bold, italic, headings, lists, blockquotes, code blocks, and more.

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/functionality/starterkit

---

Learn more about StarterKit extension in the TipTap documentation.
::

Handlers wrap TipTap's built-in commands to provide a unified interface for editor actions. When you add a `kind` property to a [EditorToolbar](https://ui.nuxt.com/docs/components/editor-toolbar) or [EditorSuggestionMenu](https://ui.nuxt.com/docs/components/editor-suggestion-menu) item, the corresponding handler executes the TipTap command and manages its state (active, disabled, etc.).

#### Default handlers

The Editor component provides these default handlers, which you can reference in toolbar or suggestion menu items using the `kind` property:

| Handler                                                                                                                               | Description                                               | Usage                             |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------- |
| `mark`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}            | Toggle text marks (bold, italic, strike, code, underline) | Requires `mark` property in item  |
| `textAlign`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}       | Set text alignment (left, center, right, justify)         | Requires `align` property in item |
| `heading`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}         | Toggle heading levels (1-6)                               | Requires `level` property in item |
| `link`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}            | Add, edit, or remove links                                | Prompts for URL if not provided   |
| `image`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}           | Insert images                                             | Prompts for URL if not provided   |
| `blockquote`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}      | Toggle blockquotes                                        |                                   |
| `bulletList`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}      | Toggle bullet lists                                       | Handles list conversions          |
| `orderedList`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}     | Toggle ordered lists                                      | Handles list conversions          |
| `codeBlock`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}       | Toggle code blocks                                        |                                   |
| `horizontalRule`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}  | Insert horizontal rules                                   |                                   |
| `paragraph`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}       | Set paragraph format                                      |                                   |
| `undo`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}            | Undo last change                                          |                                   |
| `redo`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}            | Redo last undone change                                   |                                   |
| `clearFormatting`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | Remove all formatting                                     | Works with selection or position  |
| `duplicate`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}       | Duplicate a node                                          | Requires `pos` property in item   |
| `delete`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}          | Delete a node                                             | Requires `pos` property in item   |
| `moveUp`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}          | Move a node up                                            | Requires `pos` property in item   |
| `moveDown`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}        | Move a node down                                          | Requires `pos` property in item   |
| `suggestion`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}      | Trigger suggestion menu                                   | Inserts `/` character             |
| `mention`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}         | Trigger mention menu                                      | Inserts `@` character             |
| `emoji`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"}           | Trigger emoji picker                                      | Inserts `:` character             |

Here's how to use default handlers in toolbar or suggestion menu items:

Use the `handlers` prop to extend or override the default handlers. Custom handlers are merged with the default handlers, allowing you to add new actions or modify existing behavior.

Each handler implements the `EditorHandler`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} interface:

Here's an example of creating custom handlers:

::tip{to="https://ui.nuxt.com/#with-image-upload"}
Check out the image upload example for a complete implementation with custom handlers.
::

You can use the [EditorToolbar](https://ui.nuxt.com/docs/components/editor-toolbar) component to add a fixed, bubble, or floating toolbar to the Editor with common formatting actions.

You can use the [EditorDragHandle](https://ui.nuxt.com/docs/components/editor-drag-handle) component to add a draggable handle for reordering blocks.

### With suggestion menu

You can use the [EditorSuggestionMenu](https://ui.nuxt.com/docs/components/editor-suggestion-menu) component to add slash commands for quick formatting and insertions.

### With mention menu

You can use the [EditorMentionMenu](https://ui.nuxt.com/docs/components/editor-mention-menu) component to add @ mentions for tagging users or entities.

You can use the [EditorEmojiMenu](https://ui.nuxt.com/docs/components/editor-emoji-menu) component to add emoji picker support.

### With image upload

This example demonstrates how to create an image upload feature using the `extensions` prop to register a custom TipTap node and the `handlers` prop to define how the toolbar button triggers the upload flow.

1. Create a Vue component that uses the [FileUpload](https://ui.nuxt.com/docs/components/file-upload) component:

2. Create a custom TipTap extension to register the node:

::warning
If you encounter a `Adding different instances of a keyed plugin` error when creating a custom extension, you may need to add `prosemirror-state` to the vite `optimizeDeps` include list in your `nuxt.config.ts` file.

3. Use the custom extension in the Editor:

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/extensions/custom-extensions

---

Learn more about creating custom extensions in the TipTap documentation.
::

When accessing the component via a template ref, you can use the following:

| Name                                                                                                                         | Type        |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `editor`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} | `Ref<Editor | undefined>`{.language-ts-type.shiki.shiki-themes.material-theme-lighter.material-theme.material-theme-palenight lang="ts-type"} |

## ::callout

icon: i-custom-tiptap
target: \_blank
to: https://tiptap.dev/docs/editor/api/editor

---

The exposed editor instance is the TipTap Editor API. Check the TipTap documentation for all available methods and properties.
::

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::callout
---
ariaLabel: View source code
icon: i-simple-icons-github
to: https://github.com/nuxt/ui/blob/v4/docs/app/components/content/examples/editor/EditorExample.vue
---
This example demonstrates a production-ready Editor component. Check out the source code on GitHub.
::

### Content

Use the `v-model` directive to control the value of the Editor.
```

Example 2 (unknown):

```unknown
### Content Type

The Editor automatically detects the content format based on `v-model` type: strings are treated as `html`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"} and objects as `json`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.

You can explicitly set the format using the `content-type` prop: `json`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, `html`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}, or `markdown`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}.
```

Example 3 (unknown):

```unknown
### Extensions

The Editor includes the following extensions by default:

- [**StarterKit**](https://ui.nuxt.com/#starter-kit) - Core editing features (bold, italic, headings, lists, etc.)
- [**Placeholder**](https://ui.nuxt.com/#placeholder) - Show placeholder text (when placeholder prop is provided)
- **Image** - Insert and display images
- **Mention** - Add @ mentions support
- **Markdown** - Parse and serialize markdown (when content type is markdown)

::note
Each built-in extension can be configured using its corresponding prop (`starter-kit`, `placeholder`, `image`, `mention`, `markdown`) to customize its behavior with TipTap options.
::

You can use the `extensions` prop to add additional TipTap extensions to enhance the Editor's capabilities:
```

Example 4 (unknown):

```unknown
::tip{to="https://ui.nuxt.com/#with-image-upload"}
Check out the image upload example for creating custom TipTap extensions.
::

### Placeholder

Use the `placeholder` prop to set a placeholder text that shows in empty paragraphs.
```

---

## ColorModeSelect

**URL:** llms-txt#colormodeselect

**Contents:**

- Usage
- Examples
  - With custom icons
- API
  - Props
- Changelog

The ColorModeSelect component extends the [SelectMenu](https://ui.nuxt.com/docs/components/select-menu) component, so you can pass any property such as `color`, `variant`, `size`, etc.

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

::component-changelog{prefix="color-mode"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UColorModeSelect />
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

## API

### Props
```

---

## Color Mode

**URL:** llms-txt#color-mode

**Contents:**

- Usage
  - Components
  - Configuration

## ::callout

class: hidden
icon: i-logos-nuxt-icon
to: https://ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt

---

Looking for the **Nuxt** version?
::

Nuxt UI automatically registers the [useDark](https://vueuse.org/core/useDark){rel="nofollow"} composable as a Vue plugin, so there's no additional setup required.

You can use the built-in [ColorModeAvatar](https://ui.nuxt.com/docs/components/color-mode-avatar) or [ColorModeImage](https://ui.nuxt.com/docs/components/color-mode-image) components to display different images for light and dark mode and the [ColorModeButton](https://ui.nuxt.com/docs/components/color-mode-button), [ColorModeSwitch](https://ui.nuxt.com/docs/components/color-mode-switch) or [ColorModeSelect](https://ui.nuxt.com/docs/components/color-mode-select) components to switch between light and dark modes.

You can also use the [useColorMode](https://vueuse.org/core/useColorMode){rel="nofollow"} composable to build your own custom component:

You can disable this plugin with the `colorMode` option in your `vite.config.ts`:

**Examples:**

Example 1 (unknown):

```unknown
### Configuration

You can disable this plugin with the `colorMode` option in your `vite.config.ts`:
```

---

## LocaleSelect

**URL:** llms-txt#localeselect

**Contents:**

- Usage
  - Locales
  - Dynamic locale
- API
  - Props
- Changelog

The LocaleSelect component extends the [SelectMenu](https://ui.nuxt.com/docs/components/select-menu) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::framework-only
#nuxt
:::note{to="https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt"}
This component is meant to be used with the **i18n** system. Learn more about it in the guide.
:::

#vue
:::note{to="https://ui.nuxt.com/docs/getting-started/integrations/i18n/vue"}
This component is meant to be used with the **i18n** system. Learn more about it in the guide.
:::
::

::warning
The flags are displayed using Unicode characters. This may result in a different display, e.g. Microsoft Edge under Windows displays the ISO 3166-1 alpha-2 code instead, as no flag icons are shipped with the OS fonts.
::

Use the `locales` prop with an array of locales from `@nuxt/ui/locale`.

You can pass only the locales you need in your application:

::framework-only
#nuxt
:::div
You can use it with Nuxt i18n:

:::

#vue
:::div
You can use it with Vue i18n:

:::
::

::component-changelog{prefix="locale"}
::

**Examples:**

Example 1 (unknown):

```unknown
You can pass only the locales you need in your application:
```

Example 2 (unknown):

```unknown
### Dynamic locale

::framework-only
#nuxt
  :::div
  You can use it with Nuxt i18n:
```

Example 3 (unknown):

```unknown
:::

#vue
  :::div
  You can use it with Vue i18n:
```

Example 4 (unknown):

```unknown
:::
::

## API

### Props
```

---
