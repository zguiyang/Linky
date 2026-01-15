# Nuxt-Ui - Theme

**Pages:** 7

---

## Design System

**URL:** llms-txt#design-system

**Contents:**

- Tailwind CSS
  - Fonts
  - Colors
  - Breakpoints
- Colors
  - Semantic colors
  - Runtime configuration
  - Extend colors

Tailwind CSS uses a CSS-first configuration, letting you define your design tokens with the [`@theme`](https://tailwindcss.com/docs/functions-and-directives#theme-directive){rel="nofollow"} directive directly in your CSS. This makes your theme portable, maintainable and easy to customize.

::note{target="\_blank" to="https://tailwindcss.com/docs/theme"}
Check the Tailwind CSS documentation for all available theme variable customization options.
::

Use the `--font-*` theme variables to [customize the font family utilities](https://tailwindcss.com/docs/font-family#customizing-your-theme){rel="nofollow"} in your project.

::framework-only
#nuxt
:::note{to="https://ui.nuxt.com/docs/getting-started/integrations/fonts"}
Fonts defined here are automatically loaded and optimized by the `@nuxt/fonts` module.
:::
::

Use the `--color-*` theme variables to [customize your colors](https://tailwindcss.com/docs/colors#customizing-your-colors){rel="nofollow"} or [override default colors](https://tailwindcss.com/docs/colors#overriding-default-colors){rel="nofollow"}.

::warning
When adding custom colors, make sure to define all shades from `50` to `950` for each color.
::

Use the `--breakpoint-*` theme variables to [customize your breakpoints](https://tailwindcss.com/docs/responsive-design#customizing-your-theme){rel="nofollow"}.

Nuxt UI's color system is designed around **semantic naming** rather than specific color values. This approach makes your UI more maintainable and allows for easy theme switching.

Nuxt UI provides semantic color aliases that describe the **purpose** of the color. Each alias is defined based on a color from your `@theme` configuration, which can be any color you define in addition to the [default Tailwind CSS palette](https://tailwindcss.com/docs/colors){rel="nofollow"}.

| Color                          | Default  | Description                                                       |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| `primary`{color="primary"}     | `green`  | Main CTAs, active navigation, brand elements, important links     |
| `secondary`{color="secondary"} | `blue`   | Secondary buttons, alternative actions, complementary UI elements |
| `success`{color="success"}     | `green`  | Success messages, completed states, positive confirmations        |
| `info`{color="info"}           | `blue`   | Info alerts, tooltips, help text, neutral notifications           |
| `warning`{color="warning"}     | `yellow` | Warning messages, pending states, attention-needed items          |
| `error`{color="error"}         | `red`    | Error messages, validation errors, destructive actions            |
| `neutral`                      | `slate`  | Text, borders, backgrounds, disabled states                       |

These semantic colors are available in the `color` prop of Nuxt UI components:

::note
Try the :prose-icon{.text-primary name="i-lucide-swatch-book"} theme picker in the header to instantly see how different color schemes affect the entire UI!
::

### Runtime configuration

::framework-only
#nuxt
:::div
You can configure these colors at runtime in your [`app.config.ts`](https://nuxt.com/docs/guide/directory-structure/app-config#app-config-file){rel="nofollow"} file under the `ui.colors` key, allowing for dynamic theme customization without restarting the server:

:::

#vue
:::div
You can configure these colors at runtime in your `vite.config.ts` file under the `ui.colors` key, allowing for dynamic theme customization:

:::
::

::caution
You can only use colors that exist in your theme. Either:

- Use [Tailwind's default colors](https://tailwindcss.com/docs/colors){rel="nofollow"} (like `blue`, `green`, `zinc`)
- Define custom colors first using the `@theme` directive (like `brand` in our example above)
  ::

You may want to define extra semantic colors beyond the defaults, such as adding a `tertiary` color:

::framework-only
#nuxt
:::div
First, register the new color in your `nuxt.config.ts` under the `ui.theme.colors` key:

Then, assign it in your `app.config.ts` under the `ui.colors` key:

:::

#vue
:::div
Register and assign the new color in your `vite.config.ts` file:

:::
::

Finally, use this new color in components that support the `color` prop or [as a class](https://ui.nuxt.com/docs/getting-started/theme/css-variables):

**Examples:**

Example 1 (unknown):

```unknown
::note{target="_blank" to="https://tailwindcss.com/docs/theme"}
Check the Tailwind CSS documentation for all available theme variable customization options.
::

### Fonts

Use the `--font-*` theme variables to [customize the font family utilities](https://tailwindcss.com/docs/font-family#customizing-your-theme){rel="nofollow"} in your project.
```

Example 2 (unknown):

```unknown
::framework-only
#nuxt
  :::note{to="https://ui.nuxt.com/docs/getting-started/integrations/fonts"}
  Fonts defined here are automatically loaded and optimized by the `@nuxt/fonts` module.
  :::
::

### Colors

Use the `--color-*` theme variables to [customize your colors](https://tailwindcss.com/docs/colors#customizing-your-colors){rel="nofollow"} or [override default colors](https://tailwindcss.com/docs/colors#overriding-default-colors){rel="nofollow"}.
```

Example 3 (unknown):

```unknown
::warning
When adding custom colors, make sure to define all shades from `50` to `950` for each color.
::

### Breakpoints

Use the `--breakpoint-*` theme variables to [customize your breakpoints](https://tailwindcss.com/docs/responsive-design#customizing-your-theme){rel="nofollow"}.
```

Example 4 (unknown):

```unknown
## Colors

Nuxt UI's color system is designed around **semantic naming** rather than specific color values. This approach makes your UI more maintainable and allows for easy theme switching.

### Semantic colors

Nuxt UI provides semantic color aliases that describe the **purpose** of the color. Each alias is defined based on a color from your `@theme` configuration, which can be any color you define in addition to the [default Tailwind CSS palette](https://tailwindcss.com/docs/colors){rel="nofollow"}.

| Color                          | Default  | Description                                                       |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| `primary`{color="primary"}     | `green`  | Main CTAs, active navigation, brand elements, important links     |
| `secondary`{color="secondary"} | `blue`   | Secondary buttons, alternative actions, complementary UI elements |
| `success`{color="success"}     | `green`  | Success messages, completed states, positive confirmations        |
| `info`{color="info"}           | `blue`   | Info alerts, tooltips, help text, neutral notifications           |
| `warning`{color="warning"}     | `yellow` | Warning messages, pending states, attention-needed items          |
| `error`{color="error"}         | `red`    | Error messages, validation errors, destructive actions            |
| `neutral`                      | `slate`  | Text, borders, backgrounds, disabled states                       |

These semantic colors are available in the `color` prop of Nuxt UI components:
```

---

## Error

**URL:** llms-txt#error

**Contents:**

- Usage
  - Error
  - Clear
  - Redirect
- Examples
  - Within `error.vue`
- API
  - Props
  - Slots
- Theme

The Error component works together with the [Header](https://ui.nuxt.com/docs/components/header) component to create a full-height layout that extends to the viewport's available height.

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#header"}
The Error component uses the `--ui-header-height` CSS variable to position itself correctly below the [Header](https://ui.nuxt.com/docs/components/header).
::

Use the `error` prop to display an error message.

## ::note

target: \_blank
to: https://nuxt.com/docs/guide/directory-structure/error

---

In most cases, you will receive the `error` prop in your `error.vue` file.
::

Use the `clear` prop to customize or hide the clear button (with `false` value).

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `redirect` prop to redirect the user to a different page when the clear button is clicked. Defaults to `/`.

### Within `error.vue`

Use the Error component in your `error.vue`:

::tip
You might want to replicate the code of your `app.vue` inside your `error.vue` file to have the same layout and features, here is an example: <https://github.com/nuxt/ui/blob/v4/docs/app/error.vue>{rel="nofollow"}
::

::note
You can read more about how to handle errors in the [Nuxt documentation](https://nuxt.com/docs/getting-started/error-handling#error-page){rel="nofollow"}, but when using `nuxt generate` it is recommended to add `fatal: true` inside your `createError` call to make sure the error page is displayed:

::component-changelog
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <UError />
</template>
```

Example 2 (vue):

```vue
<template>
  <UError />
</template>
```

Example 3 (vue):

```vue
<template>
  <UError redirect="/docs/getting-started" />
</template>
```

Example 4 (unknown):

```unknown
::tip
You might want to replicate the code of your `app.vue` inside your `error.vue` file to have the same layout and features, here is an example: <https://github.com/nuxt/ui/blob/v4/docs/app/error.vue>{rel="nofollow"}
::

::note
You can read more about how to handle errors in the [Nuxt documentation](https://nuxt.com/docs/getting-started/error-handling#error-page){rel="nofollow"}, but when using `nuxt generate` it is recommended to add `fatal: true` inside your `createError` call to make sure the error page is displayed:
```

---

## CSS Variables

**URL:** llms-txt#css-variables

**Contents:**

- Colors
- Text
- Background
- Border
- Radius
- Container
- Header
- Body

Nuxt UI provides Tailwind CSS utility classes for each [semantic color](https://ui.nuxt.com/docs/getting-started/theme/design-system#semantic-colors) you define, allowing you to use class names like `text-error` or `bg-success`:

::code-preview
[Primary]{.text-primary.text-sm.px-4.inline-block class="py-1.5"}[Secondary]{.text-secondary.text-sm.px-4.inline-block class="py-1.5"}[Success]{.text-success.text-sm.px-4.inline-block class="py-1.5"}[Info]{.text-info.text-sm.px-4.inline-block class="py-1.5"}[Warning]{.text-warning.text-sm.px-4.inline-block class="py-1.5"}[Error]{.text-error.text-sm.px-4.inline-block class="py-1.5"}

Each utility class uses a CSS variable to set its color for light and dark modes:

::tip
You can adjust which shade each utility class uses for light and dark mode in your `main.css` file:

::warning
You can't use `primary: 'black'` in your [**config**](https://ui.nuxt.com/docs/getting-started/theme/design-system#runtime-configuration) because `black` doesn't have multiple shades. To use solid black or white as your primary color, set it directly in your `main.css` file:

Nuxt UI provides Tailwind CSS utility classes for text colors, allowing you to use class names like `text-dimmed` or `text-muted`:

::code-preview
[Dimmed]{.text-dimmed.text-sm.px-4.inline-block.rounded-md class="py-1.5"}[Muted]{.text-muted.text-sm.px-4.inline-block.rounded-md class="py-1.5"}[Toned]{.text-toned.text-sm.px-4.inline-block.rounded-md class="py-1.5"}[Text]{.text-default.text-sm.px-4.inline-block.rounded-md class="py-1.5"}[Highlighted]{.text-highlighted.text-sm.px-4.inline-block.rounded-md class="py-1.5"}[Inverted]{.text-inverted.bg-inverted.text-sm.px-4.inline-block.rounded-md class="py-1.5"}

Each utility class uses a CSS variable to set its color for light and dark modes:

::tip
You can customize these CSS variables in your `main.css` file:

Nuxt UI provides Tailwind CSS utility classes for background colors, allowing you to use class names like `bg-default` or `bg-muted`:

::code-preview
[Default]{.bg-default.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Muted]{.bg-muted.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Elevated]{.bg-elevated.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Accented]{.bg-accented.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Inverted]{.bg-inverted.text-inverted.text-sm.px-4.inline-block.rounded-md class="py-1.5"}

Each utility class uses a CSS variable to set its color for light and dark modes:

::tip
You can customize these CSS variables in your `main.css` file:

Nuxt UI provides Tailwind CSS utility classes for border colors, allowing you to use class names like `border-default` or `border-muted`:

::code-preview
[Default]{.border-2.border-default.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Muted]{.border-2.border-muted.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Accented]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[Inverted]{.border-2.border-inverted.text-sm.px-4.inline-block.rounded-md class="py-1.5"}

Each utility class uses a CSS variable to set its color for light and dark modes:

::tip
You can customize these CSS variables in your `main.css` file:

Nuxt UI overrides Tailwind CSS's default `rounded-*` utilities with a unified border radius system, allowing you to use regular [border radius utilities](https://tailwindcss.com/docs/border-radius){rel="nofollow"} like `rounded-xs` or `rounded-2xl`:

::code-preview
[xs]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-xs.mr-2 class="py-1.5"}[sm]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-sm.mr-2 class="py-1.5"}[md]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-md.mr-2 class="py-1.5"}[lg]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-lg.mr-2 class="py-1.5"}[xl]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-xl.mr-2 class="py-1.5"}[2xl]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-2xl.mr-2 class="py-1.5"}[3xl]{.border-2.border-accented.text-sm.px-4.inline-block.rounded-3xl.mr-2 class="py-1.5"}

These utility classes are calculated based on a global `--ui-radius` CSS variable, which defines the base radius value applied across all components for a consistent look.

::tip
You can customize the base radius value in your `main.css` file:

::note
Try the :prose-icon{.text-primary name="i-lucide-swatch-book"} theme picker in the header above to change the base radius value.
::

Nuxt UI provides a `--ui-container` CSS variable that controls the maximum width of the [Container](https://ui.nuxt.com/docs/components/container) component.

::tip
You can customize this value in your `main.css` file to adjust container widths consistently throughout your application:

Nuxt UI provides a `--ui-header-height` CSS variable that controls the height of the [Header](https://ui.nuxt.com/docs/components/header) component.

::tip
You can customize this value in your `main.css` to adjust header height consistently throughout your application:

Nuxt UI applies default classes on the `<body>`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="html"} element of your app for consistent theming across light and dark modes:

**Examples:**

Example 1 (vue):

```vue
<template>
  <span class="text-primary">Primary</span>
  <span class="text-secondary">Secondary</span>
  <span class="text-success">Success</span>
  <span class="text-info">Info</span>
  <span class="text-warning">Warning</span>
  <span class="text-error">Error</span>
</template>
```

Example 2 (unknown):

```unknown

```

Example 3 (unknown):

```unknown
::

::tip
You can adjust which shade each utility class uses for light and dark mode in your `main.css` file:
```

Example 4 (unknown):

```unknown
::

::warning
You can't use `primary: 'black'` in your [**config**](https://ui.nuxt.com/docs/getting-started/theme/design-system#runtime-configuration) because `black` doesn't have multiple shades. To use solid black or white as your primary color, set it directly in your `main.css` file:
```

---

## PageAside

**URL:** llms-txt#pageaside

**Contents:**

- Usage
- Examples
  - Within a layout
- API
  - Props
  - Slots
- Theme
- Changelog

The PageAside component is a sticky `<aside>` element that is only displayed starting from the [`lg` breakpoint](https://tailwindcss.com/docs/breakpoints){rel="nofollow"}.

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#header"}
The PageAside component uses the `--ui-header-height` CSS variable to position itself correctly below the [Header](https://ui.nuxt.com/docs/components/header).
::

Use it inside the `left` or `right` slot of the [Page](https://ui.nuxt.com/docs/components/page) component:

::note
While these examples use [Nuxt Content](https://content.nuxt.com){rel="nofollow"}, the components can be integrated with any content management system.
::

Use the PageAside component in a layout to display the navigation:

::note
In this example, we use the `ContentNavigation` component to display the navigation injected in `app.vue`.
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

### Within a layout

Use the PageAside component in a layout to display the navigation:
```

Example 2 (unknown):

```unknown
::note
In this example, we use the `ContentNavigation` component to display the navigation injected in `app.vue`.
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

## Container

**URL:** llms-txt#container

**Contents:**

- Usage
- API
  - Props
  - Slots
- Theme
- Changelog

Use the default slot to center and constrain the width of your content.

## ::tip

## to: https://ui.nuxt.com/docs/getting-started/theme/css-variables#container

Its max width is controlled by the `--ui-container` CSS variable.
::

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

## Header

**URL:** llms-txt#header

**Contents:**

- Usage
  - Title
  - To
  - Mode
  - Toggle
  - Toggle Side
- Examples
  - Within `app.vue`
- API
  - Props

The Header component renders a `<header>` element.

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#header"}
Its height is defined through a `--ui-header-height` CSS variable.
::

Use the `left`, `default` and `right` slots to customize the header and the `body` or `content` slots to customize the header menu.

::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render the header links in the center.
::

Use the `title` prop to change the title of the header. Defaults to `Nuxt UI`.

You can also use the `title` slot to add your own logo.

::tip{to="https://ui.nuxt.com/#props"}
You should still add the `title` prop to replace the default `aria-label` of the link.
::

Use the `to` prop to change the link of the title. Defaults to `/`.

You can also use the `left` slot to override the link entirely.

Use the `mode` prop to change the mode of the header menu. Defaults to `modal`.

Use the `body` slot to fill the menu body (under the header) or the `content` slot to fill the entire menu.

::tip{to="https://ui.nuxt.com/#props"}
You can use the `menu` prop to customize the menu of the header, it will adapt depending on the mode you choose.
::

Use the `toggle` prop to customize the toggle button displayed on mobile.

You can pass any property from the [Button](https://ui.nuxt.com/docs/components/button) component to customize it.

Use the `toggle-side` prop to change the side of the toggle button. Defaults to `right`.

Use the Header component in your `app.vue` or in a layout:

::component-changelog
::

**Examples:**

Example 1 (unknown):

```unknown
::note
In this example, we use the [NavigationMenu](https://ui.nuxt.com/docs/components/navigation-menu) component to render the header links in the center.
::

### Title

Use the `title` prop to change the title of the header. Defaults to `Nuxt UI`.
```

Example 2 (unknown):

```unknown
You can also use the `title` slot to add your own logo.

::tip{to="https://ui.nuxt.com/#props"}
You should still add the `title` prop to replace the default `aria-label` of the link.
::
```

Example 3 (unknown):

```unknown
### To

Use the `to` prop to change the link of the title. Defaults to `/`.
```

Example 4 (unknown):

```unknown
You can also use the `left` slot to override the link entirely.
```

---

## Main

**URL:** llms-txt#main

**Contents:**

- Usage
- Examples
  - Within `app.vue`
- API
  - Props
  - Slots
- Theme
- Changelog

The Main component works together with the [Header](https://ui.nuxt.com/docs/components/header) component to create a full-height layout that extends to the viewport's available height.

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#header"}
The Main component uses the `--ui-header-height` CSS variable to position itself correctly below the [Header](https://ui.nuxt.com/docs/components/header).
::

Use the Main component in your `app.vue` or in a layout:

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
