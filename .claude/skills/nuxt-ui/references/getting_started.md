# Nuxt-Ui - Getting Started

**Pages:** 5

---

## Migration to v4

**URL:** llms-txt#migration-to-v4

**Contents:**

- Migrate your project
  - From Nuxt UI Pro
  - From Nuxt UI
- Changes from v3
  - Renamed ButtonGroup
  - Renamed PageMarquee
  - Removed PageAccordion
  - Renamed model modifiers
  - Changes to Form component
  - Removed deprecated utilities

Nuxt UI v4 marks a major milestone: **Nuxt UI and Nuxt UI Pro are now unified into a single, fully open-source and free library**. You now have access to 100+ production-ready components, all available in the `@nuxt/ui` package.

::note
Nuxt UI v4 requires **Nuxt 4** due to some dependencies. Make sure to upgrade to Nuxt 4 before migrating to Nuxt UI v4.
::

This guide provides step-by-step instructions to migrate your application from v3 to v4.

## Migrate your project

1. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your `package.json`:

::code-group{sync="pm"}

::framework-only
#nuxt
:::div 2. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your `nuxt.config.ts`:

:::

#vue
:::div 2. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your `vite.config.ts`:

:::
::

::framework-only
#nuxt
:::div 3. Use the `ui` key instead of `uiPro` in your `app.config.ts`:

:::

#vue
:::div 3. Use the `ui` key instead of `uiPro` in your `vite.config.ts`:

:::
::

4. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your CSS:

::framework-only
#nuxt
:::div

    ::::warning
    If you are upgrading to Nuxt 4 at the same time as Nuxt UI v4, make sure to update the `@source` directive to match the new directory structure.


    ::::

:::

#vue
:::div

:::
::

5. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your imports:

1. When upgrading from Nuxt UI v3, you simply need to update to v4:

::code-group{sync="pm"}

After upgrading to Nuxt UI v4, please note the following important changes:

### Renamed ButtonGroup

The `ButtonGroup` component has been renamed to [`FieldGroup`](https://ui.nuxt.com/docs/components/field-group):

### Renamed PageMarquee

The `PageMarquee` component has been renamed to [`Marquee`](https://ui.nuxt.com/docs/components/marquee):

### Removed PageAccordion

The `PageAccordion` component has been removed in favor of [`Accordion`](https://ui.nuxt.com/docs/components/accordion):

::note
The `PageAccordion` component was a wrapper that set `unmount-on-hide` to `false` and customized the `ui` prop.
::

### Renamed model modifiers

The `modelModifiers` shape used by [`Input`](https://ui.nuxt.com/docs/components/input), [`InputNumber`](https://ui.nuxt.com/docs/components/input-number) and [`Textarea`](https://ui.nuxt.com/docs/components/textarea) has changed in v4:

1. The `nullify` modifier was renamed to `nullable` (it converts empty/blank values to `null`).
2. A new `optional` modifier was added (it converts empty/blank values to `undefined`).

Use `nullable` when you want empty values as `null`, and `optional` when you prefer `undefined` for absent values.

### Changes to Form component

The `Form` component has been improved in v4 with better state management and nested form handling. Here are the key changes you need to be aware of:

1. Schema **transformations will only\*\* be applied to the **`@submit` data\*\* and will no longer mutate the form's state. This provides better predictability and prevents unexpected state mutations.
2. **Nested forms must be enabled explicitly** using the `nested` prop. This makes the component behavior more explicit and prevents accidental nested form creation.
3. **Nested forms should now provide a `name`** prop (similar to `UFormField`) and will automatically inherit their state from their parent form.

### Removed deprecated utilities

Some **Nuxt Content utilities** that were previously available in Nuxt UI Pro have been **removed** in v4:

- `findPageBreadcrumb`
- `findPageHeadline`

These are now fully provided by Nuxt Content. Make sure to update your imports and usage accordingly.

### AI SDK v5 migration (optional)

This section only applies if you're using the AI SDK and chat components (`ChatMessage`, `ChatMessages`, `ChatPrompt`, `ChatPromptSubmit`, `ChatPalette`). If you're not using AI features, you can skip this section.

1. Update `@ai-sdk/vue` and `ai` dependencies in your `package.json`:

2. `useChat` composable has been replaced with the new `Chat` class:

3. Messages now use `parts` instead of `content`:

4. Some methods have been renamed:

5. New `getTextFromMessage` utility to extract text from AI SDK v5 message parts:

## ::note

target: \_blank
to: https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0

---

For more details on AI SDK v5 changes, review the **official AI SDK v5 migration guide**.
::

::tip{target="\_blank" to="https://github.com/nuxt/ui/pull/4698"}
View all changes from AI SDK v4 to v5 **in the upgrade PR** for a detailed migration reference.
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
::

::framework-only
#nuxt
  :::div
  2. Replace `@nuxt/ui-pro` with `@nuxt/ui` in your `nuxt.config.ts`:
```

---

## Migration to v3

**URL:** llms-txt#migration-to-v3

**Contents:**

- Migrate your project
  - Update Tailwind CSS
  - Update Nuxt UI
- Changes from v2
  - Updated design system
  - Updated theming system
  - Renamed components
  - Changed components
  - Changed composables
  - Changed form validation

Nuxt UI v3 is a new major version rebuilt from the ground up, introducing a modern architecture with significant performance improvements and an enhanced developer experience. This major release includes several breaking changes alongside powerful new features and capabilities:

- **Tailwind CSS v4**: Migration from JavaScript to CSS-based configuration
- **Reka UI**: Replacing Headless UI as the underlying component library
- **Tailwind Variants**: New styling API for component variants

This guide provides step by step instructions to migrate your application from v2 to v3.

## Migrate your project

::steps

### Update Tailwind CSS

Tailwind CSS v4 introduces significant changes to its configuration approach. The official Tailwind upgrade tool will help automate most of the migration process.

:::note

---

target: \_blank
to: https://tailwindcss.com/docs/upgrade-guide#changes-from-v3

---

For a detailed walkthrough of all changes, refer to the official **Tailwind CSS v4 upgrade guide**.
:::

1. Create a `main.css` file and import it in your `nuxt.config.ts` file:

:::code-group

:::

2. Run the Tailwind CSS upgrade tool:

3. Install the latest version of the package:

:::code-group{sync="pm"}

:::

4. Import it in your CSS:

5. Wrap your app with the [App](https://ui.nuxt.com/docs/components/app) component:

Now that you have updated your project, you can start migrating your code. Here's a comprehensive list of all the breaking changes in Nuxt UI v3.

### Updated design system

In Nuxt UI v2, we had a mix between a design system with `primary`, `gray`, `error` aliases and all the colors from Tailwind CSS. We've replaced it with a proper [design system](https://ui.nuxt.com/docs/getting-started/theme/design-system) with 7 color aliases:

| Color                          | Default  | Description                                                 |
| ------------------------------ | -------- | ----------------------------------------------------------- |
| `primary`{color="primary"}     | `green`  | Main brand color, used as the default color for components. |
| `secondary`{color="secondary"} | `blue`   | Secondary color to complement the primary color.            |
| `success`{color="success"}     | `green`  | Used for success states.                                    |
| `info`{color="info"}           | `blue`   | Used for informational states.                              |
| `warning`{color="warning"}     | `yellow` | Used for warning states.                                    |
| `error`{color="error"}         | `red`    | Used for form error validation states.                      |
| `neutral`                      | `slate`  | Neutral color for backgrounds, text, etc.                   |

This change introduces several breaking changes that you need to be aware of:

- The `gray` color has been renamed to `neutral`

::note
You can also use the new [design tokens](https://ui.nuxt.com/docs/getting-started/theme/css-variables) to handle light and dark mode:

- The `gray`, `black` and `white` in the `color` props have been removed in favor of `neutral`:

- You can no longer use Tailwind CSS colors in the `color` props, use the new aliases instead:

::note{to="https://ui.nuxt.com/docs/getting-started/theme/design-system#colors"}
Learn how to extend the design system to add new color aliases.
::

- The color configuration in `app.config.ts` has been moved into a `colors` object:

### Updated theming system

Nuxt UI components are now styled using the [Tailwind Variants API](https://ui.nuxt.com/docs/getting-started/theme/components), which makes all the overrides you made using the `app.config.ts` and the `ui` prop obsolete.

- Update your [`app.config.ts`](https://ui.nuxt.com/docs/getting-started/theme/components#global-config) to override components with their new theme:

- Update your [`ui` props](https://ui.nuxt.com/docs/getting-started/theme/components#ui-prop) to override each component's slots using their new theme:

::tip{to="https://ui.nuxt.com/docs/components/button#theme"}
We can't detail all the changes here but you can check each component's theme in the **Theme** section.
::

### Renamed components

We've renamed some Nuxt UI components to align with the Reka UI naming convention:

| v2                     | v3                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `Divider`              | [`Separator`](https://ui.nuxt.com/docs/components/separator)                                            |
| `Dropdown`             | [`DropdownMenu`](https://ui.nuxt.com/docs/components/dropdown-menu)                                     |
| `FormGroup`            | [`FormField`](https://ui.nuxt.com/docs/components/form-field)                                           |
| `Range`                | [`Slider`](https://ui.nuxt.com/docs/components/slider)                                                  |
| `Toggle`               | [`Switch`](https://ui.nuxt.com/docs/components/switch)                                                  |
| `Notification`         | [`Toast`](https://ui.nuxt.com/docs/components/toast)                                                    |
| `VerticalNavigation`   | [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) with `orientation="vertical"`   |
| `HorizontalNavigation` | [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) with `orientation="horizontal"` |

Here are the Nuxt UI Pro components that have been renamed or removed:

| v1                      | v3                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `BlogList`              | [`BlogPosts`](https://ui.nuxt.com/docs/components/blog-posts)                                                                      |
| `ColorModeToggle`       | [`ColorModeSwitch`](https://ui.nuxt.com/docs/components/color-mode-switch)                                                         |
| `DashboardCard`         | Removed (use [`PageCard`](https://ui.nuxt.com/docs/components/page-card) instead)                                                  |
| `DashboardLayout`       | [`DashboardGroup`](https://ui.nuxt.com/docs/components/dashboard-group)                                                            |
| `DashboardModal`        | Removed (use [`Modal`](https://ui.nuxt.com/docs/components/modal) instead)                                                         |
| `DashboardNavbarToggle` | [`DashboardSidebarToggle`](https://ui.nuxt.com/docs/components/dashboard-sidebar-toggle)                                           |
| `DashboardPage`         | Removed                                                                                                                            |
| `DashboardPanelContent` | Removed (use `#body` slot instead)                                                                                                 |
| `DashboardPanelHandle`  | [`DashboardResizeHandle`](https://ui.nuxt.com/docs/components/dashboard-resize-handle)                                             |
| `DashboardSection`      | Removed (use [`PageCard`](https://ui.nuxt.com/docs/components/page-card) instead)                                                  |
| `DashboardSidebarLinks` | Removed (use [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) instead)                                      |
| `DashboardSlideover`    | Removed (use [`Slideover`](https://ui.nuxt.com/docs/components/slideover) instead)                                                 |
| `FooterLinks`           | Removed (use [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) instead)                                      |
| `HeaderLinks`           | Removed (use [`NavigationMenu`](https://ui.nuxt.com/docs/components/navigation-menu) instead)                                      |
| `LandingCard`           | Removed (use [`PageCard`](https://ui.nuxt.com/docs/components/page-card) instead)                                                  |
| `LandingCTA`            | [`PageCTA`](https://ui.nuxt.com/docs/components/page-cta)                                                                          |
| `LandingFAQ`            | Removed (use [`Accordion`](https://ui.nuxt.com/docs/components/accordion) instead)                                                 |
| `LandingGrid`           | Removed (use [`PageGrid`](https://ui.nuxt.com/docs/components/page-grid) instead)                                                  |
| `LandingHero`           | Removed (use [`PageHero`](https://ui.nuxt.com/docs/components/page-hero) instead)                                                  |
| `LandingLogos`          | [`PageLogos`](https://ui.nuxt.com/docs/components/page-logos)                                                                      |
| `LandingSection`        | [`PageSection`](https://ui.nuxt.com/docs/components/page-section)                                                                  |
| `LandingTestimonial`    | Removed (use [`PageCard`](https://ui.nuxt.com/docs/components/page-card#as-a-testimonial) instead)                                 |
| `NavigationAccordion`   | [`ContentNavigation`](https://ui.nuxt.com/docs/components/content-navigation)                                                      |
| `NavigationLinks`       | [`ContentNavigation`](https://ui.nuxt.com/docs/components/content-navigation)                                                      |
| `NavigationTree`        | [`ContentNavigation`](https://ui.nuxt.com/docs/components/content-navigation)                                                      |
| `PageError`             | [`Error`](https://ui.nuxt.com/docs/components/error)                                                                               |
| `PricingCard`           | [`PricingPlan`](https://ui.nuxt.com/docs/components/pricing-plan)                                                                  |
| `PricingGrid`           | [`PricingPlans`](https://ui.nuxt.com/docs/components/pricing-plans)                                                                |
| `PricingSwitch`         | Removed (use [`Switch`](https://ui.nuxt.com/docs/components/switch) or [`Tabs`](https://ui.nuxt.com/docs/components/tabs) instead) |

### Changed components

In addition to the renamed components, there are lots of changes to the components API. Let's detail the most important ones:

- The `links` and `options` props have been renamed to `items` for consistency:

::note
This change affects the following components: `Breadcrumb`, `HorizontalNavigation`, `InputMenu`, `RadioGroup`, `Select`, `SelectMenu`, `VerticalNavigation`.
::

- The `click` field in different components has been removed in favor of the native Vue `onClick` event:

::note
This change affects the `Toast` component as well as all component that have `items` links like `NavigationMenu`, `DropdownMenu`, `CommandPalette`, etc.
::

- The global `Modals`, `Slideovers` and `Notifications` components have been removed in favor the [App](https://ui.nuxt.com/docs/components/app) component:

- The `v-model:open` directive and `default-open` prop are now used to control visibility:

::note
This change affects the following components: `ContextMenu`, `Modal` and `Slideover` and enables controlling visibility for `InputMenu`, `Select`, `SelectMenu` and `Tooltip`.
::

- The default slot is now used for the trigger and the content goes inside the `#content` slot (you don't need to use a `v-model:open` directive with this method):

::note
This change affects the following components: `Modal`, `Popover`, `Slideover`, `Tooltip`.
::

- A `#header`, `#body` and `#footer` slots have been added inside the `#content` slot like the `Card` component:

::note
This change affects the following components: `Modal`, `Slideover`.
::

### Changed composables

- The `useToast()` composable `timeout` prop has been renamed to `duration`:

- The `useModal` and `useSlideover` composables have been removed in favor of a more generic `useOverlay` composable:

Some important differences:

- The `useOverlay` composable is now used to create overlay instances
- Overlays that are opened, can be awaited for their result
- Overlays can no longer be close using `modal.close()` or `slideover.close()`, rather, they close automatically: either when a `close` event is fired explicitly from the opened component OR when the overlay closes itself (clicking on backdrop, pressing the ESC key, etc)
- To capture the return value in the parent component you must explictly emit a `close` event with the desired value

Props are now passed through a props attribute:

Closing a modal is now done through the `close` event. The `modal.open` method now returns an instance that can be used to await for the result of the modal whenever the modal is closed:

### Changed form validation

- The error object property for targeting form fields has been renamed from `path` to `name`:

::warning
This page is a work in progress, we'll improve it regularly.
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
:::

2. Run the Tailwind CSS upgrade tool:
```

Example 3 (unknown):

```unknown
### Update Nuxt UI

3. Install the latest version of the package:

  :::code-group{sync="pm"}
```

Example 4 (unknown):

```unknown

```

---

## Installation

**URL:** llms-txt#installation

**Contents:**

- Setup
  - Add to a Vue project
  - Use a Vue template
- Options
  - `prefix`
  - `ui`
  - `colorMode`
  - `theme.colors`
  - `theme.transitions`
  - `theme.defaultVariants`

## ::callout

class: hidden
icon: i-logos-nuxt-icon
to: https://ui.nuxt.com/docs/getting-started/installation/nuxt

---

Looking for the **Nuxt** version?
::

### Add to a Vue project

::steps{level="4"}

#### Install the Nuxt UI package

:::code-group{sync="pm"}

:::

:::warning
If you're using **pnpm**, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/npmrc#shamefully-hoist){rel="nofollow"} in your `.npmrc` file or install `tailwindcss`, `vue-router` and `@unhead/vue` in your project's root directory.
:::

#### Add the Nuxt UI Vite plugin in your `vite.config.ts`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

:::code-group{sync="vite"}

:::

:::tip
Nuxt UI registers `unplugin-auto-import` and `unplugin-vue-components`, which will generate `auto-imports.d.ts` and `components.d.ts` type declaration files. You will likely want to gitignore these, and add them to your `tsconfig`.

:::

:::tip
Internally, Nuxt UI relies on custom alias to resolve the theme types. If you're using TypeScript, you should add an alias to your `tsconfig` to enable auto-completion in your `vite.config.ts`.

:::

#### Use the Nuxt UI Vue plugin

:::code-group{sync="vite"}

:::

#### Import Tailwind CSS and Nuxt UI in your CSS

:::code-group{sync="vite"}

:::

:::tip
Import the CSS file in your entrypoint.

    ::::code-group{sync="vite"}





    ::::

:::

:::callout{icon="i-simple-icons-visualstudiocode"}
It's recommended to install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){rel="nofollow"} extension for VSCode and add the following settings:

:::

#### Wrap your app with App component

:::code-group{sync="vite"}

:::

:::note{to="https://ui.nuxt.com/docs/components/app"}
The `App` component sets up global config and is required for **Toast**, **Tooltip** and **programmatic overlays**.
:::

#### Add the `isolate` class to your root container

:::code-group{sync="vite"}

:::

:::note
This ensures styles are scoped to your app and prevents issues with overlays and stacking contexts.
:::
::

### Use a Vue template

To quickly get started with Nuxt UI, you can use the [starter template](https://github.com/nuxt-ui-templates/starter-vue){rel="nofollow"} by running:

You can also get started with one of our [official templates](https://ui.nuxt.com/templates):

::card-group
:::card

---

color: neutral
icon: i-simple-icons-github
target: \_blank
title: Starter
to: https://github.com/nuxt-ui-templates/starter-vue

---

A minimal template to get started with Nuxt UI.
:::

:::card

---

color: neutral
icon: i-simple-icons-github
target: \_blank
title: Dashboard
to: https://github.com/nuxt-ui-templates/dashboard-vue
variant: subtle

---

A dashboard template with multi-column layout for building sophisticated admin interfaces.
:::

:::card

---

color: neutral
icon: i-simple-icons-github
target: \_blank
title: Starter Adonis
to: https://github.com/nuxt-ui-templates/starter-adonis

---

A minimal Nuxt UI template for AdonisJS using Inertia.js.
:::

:::card

---

color: neutral
icon: i-simple-icons-github
target: \_blank
title: Starter Laravel
to: https://github.com/nuxt-ui-templates/starter-laravel

---

A minimal Nuxt UI template for Laravel using Inertia.js.
:::
::

You can use the `Use this template` button on GitHub to create a new repository or use the CLI:

You can customize Nuxt UI by providing options in your `vite.config.ts`.

Use the `prefix` option to change the prefix of the components.

- Default: `U`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `ui` option to provide configuration for Nuxt UI.

Use the `colorMode` option to enable or disable the color mode integration from `@vueuse/core`.

- Default: `true`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

Use the `theme.colors` option to define the dynamic color aliases used to generate components theme.

- Default: `['primary', 'secondary', 'success', 'info', 'warning', 'error']`{.inline,language-ts-type,shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::tip{to="https://ui.nuxt.com/docs/getting-started/theme/design-system#colors"}
Learn more about color customization and theming in the Theme section.
::

### `theme.transitions`

Use the `theme.transitions` option to enable or disable transitions on components.

- Default: `true`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

::note
This option adds the `transition-colors` class on components with hover or active states.
::

### `theme.defaultVariants`

Use the `theme.defaultVariants` option to override the default `color` and `size` variants for components.

- Default: `{ color: 'primary', size: 'md' }`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

### `theme.prefix` :badge{.align-text-top label="4.2+"}

Use the `theme.prefix` option to configure the same prefix you set on your Tailwind CSS import. This ensures Nuxt UI components use the correct prefixed utility classes and CSS variables.

This will automatically prefix all Tailwind utility classes and CSS variables in Nuxt UI component themes:

## ::note

target: \_blank
to: https://tailwindcss.com/docs/styling-with-utility-classes#using-the-prefix-option

---

Learn more about using a prefix in the Tailwind CSS documentation.
::

Use the `inertia` option to enable compatibility with [Inertia.js](https://inertiajs.com/){rel="nofollow"}.

::note
When using this option, `vue-router` is not required as Inertia.js provides its own routing system. The components that would normally use `RouterLink` will automatically use Inertia's `InertiaLink` component instead.
::

## Continuous releases

Nuxt UI uses [pkg.pr.new](https://github.com/stackblitz-labs/pkg.pr.new){rel="nofollow"} for continuous preview releases, providing developers with instant access to the latest features and bug fixes without waiting for official releases.

Automatic preview releases are created for all commits and PRs to the `v4` branch. Use them by replacing your package version with the specific commit hash or PR number.

::note
**pkg.pr.new** will automatically comment on PRs with the installation URL, making it easy to test changes.
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
:::

  :::warning
  If you're using **pnpm**, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/npmrc#shamefully-hoist){rel="nofollow"} in your `.npmrc` file or install `tailwindcss`, `vue-router` and `@unhead/vue` in your project's root directory.
  :::

#### Add the Nuxt UI Vite plugin in your `vite.config.ts`{.shiki,shiki-themes,material-theme-lighter,material-theme,material-theme-palenight lang="ts-type"}

  :::code-group{sync="vite"}
```

---

## Content

**URL:** llms-txt#content

**Contents:**

- Installation
- Configuration
- Components
- Typography
- Utils
  - `mapContentNavigation`

To get started, you can follow the official [guide](https://content.nuxt.com/docs/getting-started/installation){rel="nofollow"} or in summary:

::code-group{sync="pm"}

Then, add the `@nuxt/content` module in your `nuxt.config.ts`:

::caution
You need to register `@nuxt/content` after `@nuxt/ui` in the `modules` array, otherwise the prose components will not be available.
::

When using Tailwind CSS classes in your markdown content files, you need to ensure Tailwind can detect and generate the necessary utility classes. By default, Tailwind's automatic content detection might not pick up classes written in markdown files.

To fix this, use the [`@source` directive](https://tailwindcss.com/docs/functions-and-directives#source-directive){rel="nofollow"} in your CSS file to explicitly include your content directory:

- Tailwind scans all markdown files in your content directory
- Any utility classes used in your markdown (like `text-primary`) are included in the final CSS
- Dynamic classes in MDC components or custom Vue components within your content work properly

::tip
You can also use glob patterns to be more specific about which files to scan:

- `@source "../../../content/docs/**/*.md"` - Only scan markdown in the docs folder
- `@source "../../../content/**/*.{md,yml}"` - Include both markdown and YAML files
  ::

## ::note

target: \_blank
to: https://tailwindcss.com/docs/detecting-classes-in-source-files

---

Learn more about Tailwind's automatic content detection and best practices for optimizing build performance.
::

You might be using `@nuxt/content` to build a documentation. To help you with that, we've built some components that you can use in your pages:

- a built-in full-text search command palette with [ContentSearch](https://ui.nuxt.com/docs/components/content-search), replacing the need for Algolia DocSearch
- a navigation tree with the [ContentNavigation](https://ui.nuxt.com/docs/components/content-navigation) component
- a sticky Table of Contents with the [ContentToc](https://ui.nuxt.com/docs/components/content-toc) component
- a prev / next navigation with the [ContentSurround](https://ui.nuxt.com/docs/components/content-surround) component

Nuxt UI provides its own custom implementations of all prose components for seamless integration with `@nuxt/content`. This approach ensures consistent styling, complete control over typography, and perfect alignment with the Nuxt UI design system so your content always looks and feels cohesive out of the box.

::note{to="https://ui.nuxt.com/docs/typography"}
Discover the full **Typography** system and explore all available prose components for rich, consistent content presentation.
::

### `mapContentNavigation`

This util will map the navigation from `queryCollectionNavigation` and transform it recursively into an array of objects that can be used by various components.

`mapContentNavigation(navigation, options?)`

- `navigation`: The navigation tree (array of ContentNavigationItem).
- `options` (optional):

- `labelAttribute`: (string) Which field to use as label (`title` by default)
  - `deep`: (number or undefined) Controls how many levels of navigation are included (`undefined` by default : includes all levels)

**Example:** As shown in the breadcrumb example below, it's commonly used to transform the navigation data into the correct format.

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
::

Then, add the `@nuxt/content` module in your `nuxt.config.ts`:
```

---

## Introduction

**URL:** llms-txt#introduction

**Contents:**

- What is Nuxt UI?
- What's new in v4?
- Core technologies
  - Reka UI
  - Tailwind CSS
  - Tailwind Variants
- Key features
  - Ecosystem integration
  - Vue Compatibility
  - TypeScript Support

A modern UI library built on [Reka UI](https://reka-ui.com/){rel="nofollow"}, [Tailwind CSS](https://tailwindcss.com/){rel="nofollow"}, and [Tailwind Variants](https://www.tailwind-variants.org/){rel="nofollow"} to ship beautiful and accessible applications with 100+ production-ready components.

::card-group
:::card{icon="i-lucide-sparkles" title="Developer Experience First"}
Intuitive APIs, excellent TypeScript support, auto-completion, and comprehensive docs.
:::

:::card{icon="i-lucide-palette" title="Beautiful by Default"}
A modern, clean design out of the box with a theme you can adapt in minutes.
:::

:::card{icon="i-lucide-accessibility" title="Accessible by Default"}
WAI-ARIA compliant with keyboard navigation, focus management, and screen reader support.
:::

:::card{icon="i-lucide-blocks" title="Production Ready"}
100+ battle-tested components used by thousands of applications in production.
:::
::

Nuxt UI v4 marks a major milestone: Nuxt UI and Nuxt UI Pro are now unified into a single, fully open-source and free library of 100+ production-ready components and a complete Figma Kit.

The migration from v3 to v4 will be much smoother than from v2 to v3. Read more in the [migration guide](https://ui.nuxt.com/docs/getting-started/migration/v4).

::note{to="https://ui.nuxt.com/docs/getting-started/migration/v3"}
If you are migrating from v2, you can read more in this **migration guide**.
::

Nuxt UI is built on top of [Reka UI](https://reka-ui.com/){rel="nofollow"} as a foundation for the components:

- **WAI-ARIA Compliance**: Follows [WAI-ARIA authoring practices](https://reka-ui.com/docs/overview/accessibility){rel="nofollow"} with proper semantics and roles
- **Keyboard Navigation**: Built-in keyboard support for complex components like tabs and dialogs
- **Focus Management**: Intelligent focus handling that moves focus based on user interactions
- **Accessible Labels**: Abstractions to simplify labeling controls for screen readers

Nuxt UI integrates the latest [Tailwind CSS](https://tailwindcss.com/){rel="nofollow"} v4, bringing significant improvements:

- **5x Faster Builds**: Full builds up to 5x faster, incremental builds over 100x faster
- **Unified Toolchain**: Built-in import handling, vendor prefixing, and syntax transforms
- **CSS-first Configuration**: Customize and extend directly in CSS instead of JavaScript
- **Modern Web Features**: Container queries, cascade layers, wide-gamut colors, and more

### Tailwind Variants

Nuxt UI takes advantage of [Tailwind Variants](https://www.tailwind-variants.org/){rel="nofollow"} to provide a powerful theming system:

- **Dynamic Styling**: Flexible component variants with a powerful API
- **Type Safety**: Full TypeScript support with auto-completion
- **Conflict Resolution**: Efficient merging of conflicting styles

### Ecosystem integration

Nuxt UI integrates with the Nuxt ecosystem to provide a seamless development experience:

- [**Icons**](https://ui.nuxt.com/docs/getting-started/integrations/icons): Access 200,000+ icons from Iconify
- [**Fonts**](https://ui.nuxt.com/docs/getting-started/integrations/fonts): Plug-and-play web font optimization and configuration
- [**Color Mode**](https://ui.nuxt.com/docs/getting-started/integrations/color-mode): Dark and Light mode with auto detection
- [**i18n**](https://ui.nuxt.com/docs/getting-started/integrations/i18n): Internationalize your components with 50+ languages
- [**Content**](https://ui.nuxt.com/docs/getting-started/integrations/content): Beautiful typography out of the box

### Vue Compatibility

Nuxt UI works with any Vue project. Simply add the Vite and Vue plugins to your configuration:

- **Auto-imports**: Components and composables are automatically imported and available globally
- **Theming System**: Full theming support with customizable colors, sizes, variants, and more
- **Developer Experience**: Complete TypeScript support with IntelliSense and auto-completion

## ::tip

ariaLabel: Vue installation guide
to: https://ui.nuxt.com/docs/getting-started/installation/vue

---

Learn how to install and configure Nuxt UI in a Vue project in the **Vue installation guide**.
::

### TypeScript Support

Nuxt UI provides comprehensive TypeScript integration for a superior developer experience:

- **Auto-completion**: For all component props, slots, and events
- **Generic Components**: Using [Vue Generics](https://vuejs.org/api/sfc-script-setup.html#generics){rel="nofollow"}
- **Type-safe Theming**: In `app.config.ts`
- **IntelliSense**: Throughout your entire codebase

::accordion
:::accordion-item{label="Is Nuxt UI free to use?"}
Yes! Nuxt UI is completely free and open source under the MIT license. All 100+ components are available to everyone.
:::

:::accordion-item{label="Can I use Nuxt UI with Vue without Nuxt?"}
Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](https://ui.nuxt.com/docs/getting-started/installation/vue) to get started.
:::

:::accordion-item

---

label: Will Nuxt UI work with other CSS frameworks like UnoCSS?

---

No. Nuxt UI is designed exclusively for Tailwind CSS. UnoCSS support would require significant architecture changes due to different class naming conventions.
:::

:::accordion-item{label="How does Nuxt UI handle accessibility?"}
Through [Reka UI](https://reka-ui.com/docs/overview/accessibility){rel="nofollow"} integration, Nuxt UI provides automatic ARIA attributes, keyboard navigation, focus management, and screen reader support. While offering a strong foundation, testing in your specific use case remains important.
:::

:::accordion-item{label="How is Nuxt UI tested?"}
Nuxt UI ensures reliability with 1000+ Vitest tests covering core functionality and accessibility.
:::

:::accordion-item{label="Is Nuxt UI production-ready?"}
Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.
:::
::

---
