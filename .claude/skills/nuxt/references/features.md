# Nuxt - Features

**Pages:** 21

---

## defineNuxtRouteMiddleware

**URL:** llms-txt#definenuxtroutemiddleware

**Contents:**

- Type
- Parameters
  - `middleware`
- Examples
  - Showing Error Page
  - Redirection

Route middleware are stored in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) of your Nuxt application (unless [set otherwise](https://nuxt.com/docs/3.x/api/nuxt-config#middleware)).

- **Type**: `RouteMiddleware`

A function that takes two Vue Router's route location objects as parameters: the next route `to` as the first, and the current route `from` as the second.

Learn more about available properties of `RouteLocationNormalized&#x60; in the \*\*[Vue Router docs](https://router.vuejs.org/api/type-aliases/RouteLocationNormalized.html){rel="&#x22;nofollow&#x22;"}\*\*.

### Showing Error Page

You can use route middleware to throw errors and show helpful error messages:

The above route middleware will redirect a user to the custom error page defined in the `~/error.vue` file, and expose the error message and code passed from the middleware.

Use [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) in combination with `navigateTo` helper function inside the route middleware to redirect users to different routes based on their authentication status:

Both [navigateTo](https://nuxt.com/docs/3.x/api/utils/navigate-to) and [abortNavigation](https://nuxt.com/docs/3.x/api/utils/abort-navigation) are globally available helper functions that you can use inside `defineNuxtRouteMiddleware`.

**Examples:**

Example 1 (unknown):

```unknown
## Parameters

### `middleware`

- **Type**: `RouteMiddleware`

A function that takes two Vue Router's route location objects as parameters: the next route `to` as the first, and the current route `from` as the second.

Learn more about available properties of `RouteLocationNormalized&#x60; in the &#x2A;*[Vue Router docs](https://router.vuejs.org/api/type-aliases/RouteLocationNormalized.html){rel="&#x22;nofollow&#x22;"}**.

## Examples

### Showing Error Page

You can use route middleware to throw errors and show helpful error messages:
```

Example 2 (unknown):

```unknown
The above route middleware will redirect a user to the custom error page defined in the `~/error.vue` file, and expose the error message and code passed from the middleware.

### Redirection

Use [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) in combination with `navigateTo` helper function inside the route middleware to redirect users to different routes based on their authentication status:
```

---

## useHydration

**URL:** llms-txt#usehydration

**Contents:**

- Usage
- Type
- Parameters
- Return Values

`useHydration` is a built-in composable that provides a way to set data on the server side every time a new HTTP request is made and receive that data on the client side. This way `useHydration` allows you to take full control of the hydration cycle.

::note
This is an advanced composable, primarily designed for use within plugins, mostly used by Nuxt modules.
::

::note
`useHydration` is designed to **ensure state synchronization and restoration during SSR**. If you need to create a globally reactive state that is SSR-friendly in Nuxt, [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) is the recommended choice.
::

The data returned from the `get` function on the server is stored in `nuxtApp.payload` under the unique key provided as the first parameter to `useHydration`. During hydration, this data is then retrieved on the client, preventing redundant computations or API calls.

| Parameter | Type                 | Description                                                                                                   |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `key`     | `string`             | A unique key that identifies the data in your Nuxt application.                                               |
| `get`     | `() => T`            | A function executed **only on the server** (called when SSR rendering is done) to set the initial value.      |
| `set`     | `(value: T) => void` | A function executed **only on the client** (called when initial Vue instance is created) to receive the data. |

This composable does not return any value.

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

## Type
```

---

## Middleware

**URL:** llms-txt#middleware

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

## ::sandbox

branch: main
dir: examples/routing/middleware
file: app.vue
repo: nuxt/examples

---

::

---

## Plugins

**URL:** llms-txt#plugins

**Contents:**

- `addPlugin`
  - Usage
  - Type
  - Parameters
  - Examples
- `addPluginTemplate`
  - Usage
  - Type
  - Parameters
  - Examples

Plugins are self-contained code that usually add app-level functionality to Vue. In Nuxt, plugins are automatically imported from the `plugins/` directory. However, if you need to ship a plugin with your module, Nuxt Kit provides the `addPlugin` and `addPluginTemplate` methods. These utils allow you to customize the plugin configuration to better suit your needs.

Registers a Nuxt plugin and adds it to the plugins array.

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/injecting-plugins?friend=nuxt

---

Watch Vue School video about `addPlugin`.
::

**`plugin`**: A plugin object or a string with the path to the plugin. If a string is provided, it will be converted to a plugin object with `src` set to the string value.

If a plugin object is provided, it must have the following properties:

| Property | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                         |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`    | `string` | `true`   | Path to the plugin file.                                                                                                                                                                                                                                                                                                                                            |
| `mode`   | `'all'   | 'server' | 'client'`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                                                                                                                                                                                                                                         | `false` | If set to `'all'`, the plugin will be included in both client and server bundles. If set to `'server'`, the plugin will only be included in the server bundle. If set to `'client'`, the plugin will only be included in the client bundle. You can also use `.client` and `.server` modifiers when specifying `src` option to use plugin only in client or server side. |
| `order`  | `number` | `false`  | Order of the plugin. This allows more granular control over plugin order and should only be used by advanced users. Lower numbers run first, and user plugins default to `0`. It's recommended to set `order` to a number between `-20` for `pre`-plugins (plugins that run before Nuxt plugins) and `20` for `post`-plugins (plugins that run after Nuxt plugins). |

::warning
Avoid using `order` unless necessary. Use `append` if you simply need to register plugins after Nuxt defaults.
::

**`options`**: Optional object with the following properties:

| Property | Type      | Required | Description                                                                                                         |
| -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `append` | `boolean` | `false`  | If `true`, the plugin will be appended to the plugins array. If `false`, it will be prepended. Defaults to `false`. |

## `addPluginTemplate`

Adds a template and registers as a nuxt plugin. This is useful for plugins that need to generate code at build time.

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/injecting-plugin-templates?friend=nuxt

---

Watch Vue School video about `addPluginTemplate`.
::

**`pluginOptions`**: A plugin template object with the following properties:

| Property      | Type                                                                                                                                    | Required                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`         | `string`                                                                                                                                | `false`                                                                                                                            | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                                                                                                                                                                                                                                             |
| `filename`    | `string`                                                                                                                                | `false`                                                                                                                            | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required.                                                                                                                                                                                                                      |
| `dst`         | `string`                                                                                                                                | `false`                                                                                                                            | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.                                                                                                                                                                                                                                   |
| `mode`        | `'all'                                                                                                                                  | 'server'                                                                                                                           | 'client'`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                                                                                                                                                                                                                                         | `false`                                                                                                                                                                          | If set to `'all'`, the plugin will be included in both client and server bundles. If set to `'server'`, the plugin will only be included in the server bundle. If set to `'client'`, the plugin will only be included in the client bundle. You can also use `.client` and `.server` modifiers when specifying `src` option to use plugin only in client or server side. |
| `options`     | `Record<string, any>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`                                                                                                                            | Options to pass to the template.                                                                                                                                                                                                                                                                                                                                    |
| `getContents` | `(data: Record<string, any>) => string                                                                                                  | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`                                                                                                                                                                                                                                                                                                                                                             | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |
| `write`       | `boolean`                                                                                                                               | `false`                                                                                                                            | If set to `true`, the template will be written to the destination file. Otherwise, the template will be used only in virtual filesystem.                                                                                                                                                                                                                            |
| `order`       | `number`                                                                                                                                | `false`                                                                                                                            | Order of the plugin. This allows more granular control over plugin order and should only be used by advanced users. Lower numbers run first, and user plugins default to `0`. It's recommended to set `order` to a number between `-20` for `pre`-plugins (plugins that run before Nuxt plugins) and `20` for `post`-plugins (plugins that run after Nuxt plugins). |

::warning
Prefer using `getContents` for dynamic plugin generation. Avoid setting `order` unless necessary.
::

**`options`**: Optional object with the following properties:

| Property | Type      | Required | Description                                                                                                         |
| -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `append` | `boolean` | `false`  | If `true`, the plugin will be appended to the plugins array. If `false`, it will be prepended. Defaults to `false`. |

#### Generate a plugin template with different options

Use `addPluginTemplate` when you need to generate plugin code dynamically at build time. This allows you to generate different plugin contents based on the options passed to it. For example, Nuxt internally uses this function to generate Vue app configurations.

This generates different plugin code depending on the provided configuration.

#### Using an EJS template to generate a plugin

You can also use an EJS template to generate your plugin. Options can be passed through the `options` property and then used within the EJS template to generate the plugin content.

::warning
If you set `compatibilityVersion` to `4`, Nuxt no longer uses `lodash.template` to compile templates by default. You can still enable it via the `experimental.compileTemplate` option, but support for EJS templates will be removed entirely in the next major version.
::

**Examples:**

Example 1 (unknown):

```unknown
### Type
```

Example 2 (unknown):

```unknown
### Parameters

**`plugin`**: A plugin object or a string with the path to the plugin. If a string is provided, it will be converted to a plugin object with `src` set to the string value.

If a plugin object is provided, it must have the following properties:

| Property | Type                                                                                                                                            | Required | Description                                                                                                                                                                                                                                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`    | `string`                                                                                                                                        | `true`   | Path to the plugin file.                                                                                                                                                                                                                                                                                                                                                 |
| `mode`   | `'all' | 'server' | 'client'`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | If set to `'all'`, the plugin will be included in both client and server bundles. If set to `'server'`, the plugin will only be included in the server bundle. If set to `'client'`, the plugin will only be included in the client bundle. You can also use `.client` and `.server` modifiers when specifying `src` option to use plugin only in client or server side. |
| `order`  | `number`                                                                                                                                        | `false`  | Order of the plugin. This allows more granular control over plugin order and should only be used by advanced users. Lower numbers run first, and user plugins default to `0`. It's recommended to set `order` to a number between `-20` for `pre`-plugins (plugins that run before Nuxt plugins) and `20` for `post`-plugins (plugins that run after Nuxt plugins).      |

::warning
Avoid using `order` unless necessary. Use `append` if you simply need to register plugins after Nuxt defaults.
::

**`options`**: Optional object with the following properties:

| Property | Type      | Required | Description                                                                                                         |
| -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `append` | `boolean` | `false`  | If `true`, the plugin will be appended to the plugins array. If `false`, it will be prepended. Defaults to `false`. |

### Examples

::code-group
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

## `addPluginTemplate`

Adds a template and registers as a nuxt plugin. This is useful for plugins that need to generate code at build time.

::tip
---
icon: i-lucide-video
target: _blank
to: https://vueschool.io/lessons/injecting-plugin-templates?friend=nuxt
---
Watch Vue School video about `addPluginTemplate`.
::

### Usage
```

---

## Generates `app/middleware/auth.ts`

**URL:** llms-txt#generates-`app/middleware/auth.ts`

**Contents:**

- `nuxt add api`

npx nuxt add middleware auth
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add api`

- Modifier flags: `--method` (can accept `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` or `trace`) or alternatively you can directly use `--get`, `--post`, etc.
```

---

## Add Nuxt modules

**URL:** llms-txt#add-nuxt-modules

**Contents:**

- Global `.nuxtrc` File

modules[]=@nuxt/image
modules[]=nuxt-security
md
~/.nuxtrc
md
C:\Users\{username}\.nuxtrc

````

This global `.nuxtrc` file allows you to define default settings that apply to all Nuxt projects on your system. However, project-level `.nuxtrc` files will override these global settings, and `nuxt.config` will take precedence over both.

**Examples:**

Example 1 (unknown):
```unknown
If present, the properties in the `nuxt.config` file will overwrite the properties in `.nuxtrc` file.

::note
Nuxt automatically adds a `setups` section to track module installation and upgrade state. This is used internally for [module lifecycle hooks](https://nuxt.com/docs/3.x/api/kit/modules#using-lifecycle-hooks-for-module-installation-and-upgrade) and should not be modified manually.
::

::read-more{to="https://nuxt.com/docs/api/configuration/nuxt-config"}
Discover all the available options in the **Nuxt configuration** documentation.
::

## Global `.nuxtrc` File

You can also create a global `.nuxtrc` file in your home directory to apply configurations globally.

- On macOS/Linux, this file is located at:
````

Example 2 (unknown):

```unknown
- On Windows, it is located at:
```

---

## ES Modules

**URL:** llms-txt#es-modules

**Contents:**

- Background
  - CommonJS Modules
  - ESM Syntax
  - What is 'Native' ESM?
  - What Are Valid Imports in a Node.js Context?
  - What Kinds of Problems Can There Be?
- Troubleshooting ESM Issues
  - Transpiling Libraries
  - Aliasing Libraries
  - Default Exports

This guide helps explain what ES Modules are and how to make a Nuxt app (or upstream library) compatible with ESM.

CommonJS (CJS) is a format introduced by Node.js that allows sharing functionality between isolated JavaScript modules ([read more](https://nodejs.org/api/modules.html){rel="&#x22;nofollow&#x22;"}).
You might be already familiar with this syntax:

Bundlers like webpack and Rollup support this syntax and allow you to use modules written in CommonJS in the browser.

Most of the time, when people talk about ESM vs. CJS, they are talking about a different syntax for writing [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules){rel="&#x22;nofollow&#x22;"}.

Before ECMAScript Modules (ESM) became a standard (it took more than 10 years!), tooling like
[webpack](https://webpack.js.org/guides/ecma-script-modules){rel="&#x22;nofollow&#x22;"} and even languages like TypeScript started supporting so-called **ESM syntax**.
However, there are some key differences with actual spec; here's [a helpful explainer](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/){rel="&#x22;nofollow&#x22;"}.

### What is 'Native' ESM?

You may have been writing your app using ESM syntax for a long time. After all, it's natively supported by the browser, and in Nuxt 2 we compiled all the code you wrote to the appropriate format (CJS for server, ESM for browser).

When adding modules to your package, things were a little different. A sample library might expose both CJS and ESM versions, and let us pick which one we wanted:

So in Nuxt 2, the bundler (webpack) would pull in the CJS file ('main') for the server build and use the ESM file ('module') for the client build.

::note
The `module` field is a convention used by bundlers like webpack and Rollup, but is not recognized by Node.js itself. Node.js only uses the [`exports`](https://nodejs.org/api/packages.html#exports){rel=""nofollow""} and [`main`](https://nodejs.org/api/packages.html#main){rel=""nofollow""} fields for module resolution.
::

However, in recent Node.js LTS releases, it is now possible to [use native ESM module](https://nodejs.org/api/esm.html){rel="&#x22;nofollow&#x22;"} within Node.js. That means that Node.js itself can process JavaScript using ESM syntax, although it doesn't do it by default. The two most common ways to enable ESM syntax are:

- set `"type": "module"` within your `package.json` and keep using `.js` extension
- use the `.mjs` file extensions (recommended)

This is what we do for Nuxt Nitro; we output a `.output/server/index.mjs` file. That tells Node.js to treat this file as a native ES module.

### What Are Valid Imports in a Node.js Context?

When you `import` a module rather than `require` it, Node.js resolves it differently. For example, when you import `sample-library`, Node.js will look for the `exports` entry in that library's `package.json`, or fall back to the `main` entry if `exports` is not defined.

This is also true of dynamic imports, like `const b = await import('sample-library')`.

Node supports the following kinds of imports (see [docs](https://nodejs.org/api/packages.html#determining-module-system){rel="&#x22;nofollow&#x22;"}):

1. files ending in `.mjs` - these are expected to use ESM syntax
2. files ending in `.cjs` - these are expected to use CJS syntax
3. files ending in `.js` - these are expected to use CJS syntax unless their `package.json` has `"type": "module"`

### What Kinds of Problems Can There Be?

For a long time module authors have been producing ESM-syntax builds but using conventions like `.esm.js` or `.es.js`, which they have added to the `module` field in their `package.json`. This hasn't been a problem until now because they have only been used by bundlers like webpack, which don't especially care about the file extension.

However, if you try to import a package with an `.esm.js` file in a Node.js ESM context, it won't work, and you'll get an error like:

You might also get this error if you have a named import from an ESM-syntax build that Node.js thinks is CJS:

## Troubleshooting ESM Issues

If you encounter these errors, the issue is almost certainly with the upstream library. They need to [fix their library](https://nuxt.com/#library-author-guide) to support being imported by Node.

### Transpiling Libraries

In the meantime, you can tell Nuxt not to try to import these libraries by adding them to `build.transpile`:

You may find that you _also_ need to add other packages that are being imported by these libraries.

### Aliasing Libraries

In some cases, you may also need to manually alias the library to the CJS version, for example:

A dependency with CommonJS format, can use `module.exports` or `exports` to provide a default export:

This normally works well if we `require` such dependency:

[Node.js in native ESM mode](https://nodejs.org/api/esm.html#interoperability-with-commonjs){rel="&#x22;nofollow&#x22;"}, [typescript with `esModuleInterop` enabled](https://www.typescriptlang.org/tsconfig#esModuleInterop){rel="&#x22;nofollow&#x22;"} and bundlers such as webpack, provide a compatibility mechanism so that we can default import such library.
This mechanism is often referred to as "interop require default":

However, because of the complexities of syntax detection and different bundle formats, there is always a chance that the interop default fails and we end up with something like this:

Also when using dynamic import syntax (in both CJS and ESM files), we always have this situation:

In this case, we need to manually interop the default export:

For handling more complex situations and more safety, we recommend and internally use [mlly](https://github.com/unjs/mlly){rel="&#x22;nofollow&#x22;"} in Nuxt that can preserve named exports.

## Library Author Guide

The good news is that it's relatively simple to fix issues of ESM compatibility. There are two main options:

1. **You can rename your ESM files to end with `.mjs`.**

_This is the recommended and simplest approach._ You may have to sort out issues with your library's dependencies and possibly with your build system, but in most cases, this should fix the problem for you. It's also recommended to rename your CJS files to end with `.cjs`, for the greatest explicitness.

1. **You can opt to make your entire library ESM-only**.

This would mean setting `"type": "module"` in your `package.json` and ensuring that your built library uses ESM syntax. However, you may face issues with your dependencies - and this approach means your library can _only_ be consumed in an ESM context.

The initial step from CJS to ESM is updating any usage of `require` to use `import` instead:

In ESM Modules, unlike CJS, `require`, `require.resolve`, `__filename` and `__dirname` globals are not available
and should be replaced with `import()` and `import.meta.filename`.

- Prefer named exports rather than default export. This helps reduce CJS conflicts. (see [Default exports](https://nuxt.com/#default-exports) section)
- Avoid depending on Node.js built-ins and CommonJS or Node.js-only dependencies as much as possible to make your library usable in Browsers and Edge Workers without needing Nitro polyfills.
- Use new `exports` field with conditional exports. ([read more](https://nodejs.org/api/packages.html#conditional-exports){rel="&#x22;nofollow&#x22;"}).

**Examples:**

Example 1 (js):

```js
const a = require('./a');

module.exports.a = a;
```

Example 2 (js):

```js
import a from './a';

export { a };
```

Example 3 (json):

```json
{
  "name": "sample-library",
  "main": "dist/sample-library.cjs.js",
  "module": "dist/sample-library.esm.js"
}
```

Example 4 (unknown):

```unknown
You might also get this error if you have a named import from an ESM-syntax build that Node.js thinks is CJS:
```

---

## Nuxt 3.9

**URL:** llms-txt#nuxt-3.9

**Contents:**

- ⚡️ Vite 5
- ✨ Vue 3.4 ready
- 🏝️ Interactive Server Components
- 🔥 Automatic Server Optimisations
- 🚦 Granular Loading API
- 🏁 Run single events in `callOnce`
- 🚨 Error Types
- 🔥 Schema Performance
- ✅ Upgrading
- Full Release Notes

A very merry Christmas to you and yours from all Nuxters involved in this release! 🎁🎄

We have lots of features packed into v3.9 and can't wait for you to try them out.

This release comes with Vite 5 and Rollup 4 support. Module authors may need to check to ensure that any vite plugins you're creating are compatible with these latest releases.

This comes with a whole host of great improvements and bug fixes - check out [the Vite changelog](https://vitejs.dev/guide/migration.html#migration-from-v4){rel="&#x22;nofollow&#x22;"} for more info.

This release is tested with the latest Vue 3.4 release candidate, and has the necessary configuration to take advantage of [new features in Vue 3.4](https://blog.vuejs.org/posts/vue-3-4){rel="&#x22;nofollow&#x22;"}, including debugging hydration errors in production (just set `debug: true`) in your Nuxt config.

👉 To take advantage, just update your `vue` version once v3.4 is released, or try out the release candidate today:

### 🏝️ Interactive Server Components

This is a highly-experimental update, but it's now possible to play around with interactive components within Nuxt server components. You'll need to enable this new feature additionally to component islands:

Now, within a server component, you can specify components to hydrate by using the `nuxt-client` directive:

We're pretty excited about this one - so do let us know how you're using it! 🙏

### 🔥 Automatic Server Optimisations

We now use Vite's new AST-aware 'define' to perform more accurate replacements on server-side code, meaning code like this will no longer throw an error:

This hasn't been possible until now because we haven't wanted to run the risk of accidentally replacing normal words like `document` within non-JS parts of your apps. But Vite's new `define` functionality is powered by `esbuild` and is syntax-aware, so we feel confident in enabling this functionality. Nevertheless, you can opt out if you need to:

### 🚦 Granular Loading API

We now have a new hook-based system for [`<NuxtLoadingIndicator>`](https://nuxt.com/docs/api/components/nuxt-loading-indicator), including a `useLoadingIndicator` composable that lets you control/stop/start the loading state. You can also hook into `page:loading:start` and `page:loading:end` if you prefer.

::tip
You can read more [in the docs](https://nuxt.com/docs/api/composables/use-loading-indicator) and in the original PR ([#24010](https://github.com/nuxt/nuxt/pull/24010){rel=""nofollow""}).
::

### 🏁 Run single events in `callOnce`

Sometimes you only want to run code once, no matter how many times you load a page - and you don't want to run it again on the client if it ran on the server.

For this, we have a new utility: [`callOnce`](https://nuxt.com/docs/api/utils/call-once) ([#24787](https://github.com/nuxt/nuxt/pull/24787){rel="&#x22;nofollow&#x22;"}).

Note that this utility is context-aware so it _must_ be called in component setup function or Nuxt plugin, as with other Nuxt composables.

::read-more{to="https://nuxt.com/docs/api/utils/call-once"}
::

For a while now, errors returned by `useAsyncData` and `useFetch` have been typed pretty generically as `Error`. We've significantly improved the type possibilities for them to make them more accurate in terms of what you'll actually receive. (We normalise errors with the `h3` `createError` utility under the hood, so they can be serialised from server to client, for example.)

We've tried to implement the type change in a backwards compatible way, but you might notice that you need to update the generic if you're manually configuring the generics for these composables. See ([#24396](https://github.com/nuxt/nuxt/pull/24396){rel="&#x22;nofollow&#x22;"}) for more information, and do let us know if you experience any issues.

### 🔥 Schema Performance

We've taken some time in this release to make some minor performance improvements, so you should notice some things are a bit faster. This is an ongoing project and we have ideas for improving initial load time of the Nuxt dev server.

As usual, our recommendation for upgrading is to run:

## Full Release Notes

## ::read-more

icon: i-simple-icons-github
to: https://github.com/nuxt/nuxt/releases/tag/v3.9.0

---

Read the full release notes of Nuxt `v3.9.0`.
::

Thank you for reading this far! We hope you enjoy the new release. Please do let us know if you have any feedback or issues.

**Examples:**

Example 1 (unknown):

```unknown
### 🏝️ Interactive Server Components

This is a highly-experimental update, but it's now possible to play around with interactive components within Nuxt server components. You'll need to enable this new feature additionally to component islands:
```

Example 2 (unknown):

```unknown
Now, within a server component, you can specify components to hydrate by using the `nuxt-client` directive:
```

Example 3 (unknown):

```unknown
We're pretty excited about this one - so do let us know how you're using it! 🙏

### 🔥 Automatic Server Optimisations

We now use Vite's new AST-aware 'define' to perform more accurate replacements on server-side code, meaning code like this will no longer throw an error:
```

Example 4 (unknown):

```unknown
This hasn't been possible until now because we haven't wanted to run the risk of accidentally replacing normal words like `document` within non-JS parts of your apps. But Vite's new `define` functionality is powered by `esbuild` and is syntax-aware, so we feel confident in enabling this functionality. Nevertheless, you can opt out if you need to:
```

---

## Using Vite Plugins in Nuxt

**URL:** llms-txt#using-vite-plugins-in-nuxt

**Contents:**

- Using Vite Plugins in Nuxt Modules

While Nuxt modules offer extensive functionality, sometimes a specific Vite plugin might meet your needs more directly.

First, we need to install the Vite plugin, for our example, we'll use `@rollup/plugin-yaml`:

::code-group{sync="pm"}

Next, we need to import and add it to our [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file:

Now we installed and configured our Vite plugin, we can start using YAML files directly in our project.

For example, we can have a `config.yaml` that stores configuration data and import this data in our Nuxt components:

## Using Vite Plugins in Nuxt Modules

If you're developing a Nuxt module and need to add Vite plugins, you should use the [`addVitePlugin`](https://nuxt.com/docs/3.x/api/kit/builder#addviteplugin) utility:

For environment-specific plugins in Nuxt 5+, use the `applyToEnvironment()` method:

::important
If you're writing code that needs to access resolved Vite configuration, you should use the `config` and `configResolved` hooks _within_ your Vite plugin, rather than using Nuxt's `vite:extend`, `vite:extendConfig` and `vite:configResolved`.
::

::read-more{to="https://nuxt.com/docs/3.x/api/kit/builder#addviteplugin"}
Read more about `addVitePlugin` in the Nuxt Kit documentation.
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

Next, we need to import and add it to our [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file:
```

---

## Nuxt Plugins

**URL:** llms-txt#nuxt-plugins

**Contents:**

- Avoid costly plugin setup
- Use Composition whenever possible
- If `async`, enable `parallel`

Plugins in Nuxt allow you to extend your application with additional functionality. However, improper use can lead to performance bottlenecks. This guide outlines best practices to optimize your Nuxt plugins.

## Avoid costly plugin setup

A large number of plugins can cause performance issues, especially if they require expensive computations or take too long to initialize. Since plugins run during the hydration phase, inefficient setups can block rendering and degrade the user experience.

## Use Composition whenever possible

Whenever possible, favor composition over plugins. Just like in Vue, many utilities and composables can be used directly without the need for a plugin. This keeps your project lightweight and improves maintainability.

## If `async`, enable `parallel`

By default, all plugins loads synchronously.
When defining asynchronous plugins, setting `parallel: true` allows multiple plugins to load concurrently, improving performance by preventing blocking operations.

---

## addRouteMiddleware

**URL:** llms-txt#addroutemiddleware

**Contents:**

- Type
- Parameters
  - `name`
  - `middleware`
  - `options`
- Examples
  - Named Route Middleware
  - Global Route Middleware

::note
Route middleware are navigation guards stored in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) directory of your Nuxt application (unless [set otherwise](https://nuxt.com/docs/3.x/api/nuxt-config#middleware)).
::

- **Type:** `string` | `RouteMiddleware`

Can be either a string or a function of type `RouteMiddleware`. Function takes the next route `to` as the first argument and the current route `from` as the second argument, both of which are Vue route objects.

Learn more about available properties of [route objects](https://nuxt.com/docs/3.x/api/composables/use-route).

- **Type:** `RouteMiddleware`

The second argument is a function of type `RouteMiddleware`. Same as above, it provides `to` and `from` route objects. It becomes optional if the first argument in `addRouteMiddleware()` is already passed as a function.

- **Type:** `AddRouteMiddlewareOptions`

An optional `options` argument lets you set the value of `global` to `true` to indicate whether the router middleware is global or not (set to `false` by default).

### Named Route Middleware

Named route middleware is defined by providing a string as the first argument and a function as the second:

When defined in a plugin, it overrides any existing middleware of the same name located in the `middleware/` directory.

### Global Route Middleware

Global route middleware can be defined in two ways:

- Pass a function directly as the first argument without a name. It will automatically be treated as global middleware and applied on every route change.

- Set an optional, third argument `{ global: true }` to indicate whether the route middleware is global.

**Examples:**

Example 1 (ts):

```ts
function addRouteMiddleware(name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void;
function addRouteMiddleware(middleware: RouteMiddleware): void;

interface AddRouteMiddlewareOptions {
  global?: boolean;
}
```

Example 2 (unknown):

```unknown
When defined in a plugin, it overrides any existing middleware of the same name located in the `middleware/` directory.

### Global Route Middleware

Global route middleware can be defined in two ways:

- Pass a function directly as the first argument without a name. It will automatically be treated as global middleware and applied on every route change.
```

Example 3 (unknown):

```unknown
- Set an optional, third argument `{ global: true }` to indicate whether the route middleware is global.
```

---

## Features

**URL:** llms-txt#features

**Contents:**

- `features`
  - inlineStyles
  - noScripts
- `future`
  - compatibilityVersion
  - typescriptBundlerResolution

Some features of Nuxt are available on an opt-in basis, or can be disabled based on your needs.

Inlines styles when rendering HTML. This is currently available only when using Vite.

You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.

Disables rendering of Nuxt scripts and JS resource hints. Can also be configured granularly within `routeRules`.

There is also a `future` namespace for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### compatibilityVersion

::important
This configuration option is available in Nuxt v3.12+. Please note, that for now, you need to define the compatibility version in each layer that opts into Nuxt 4 behavior. This will not be required after Nuxt 4 is released.
::

This enables early access to Nuxt features or flags.

Setting `compatibilityVersion` to `4` changes defaults throughout your
Nuxt configuration to opt-in to Nuxt v4 behaviour, but you can granularly re-enable Nuxt v3 behaviour
when testing (see example). Please file issues if so, so that we can
address in Nuxt or in the ecosystem.

### typescriptBundlerResolution

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting
for frameworks like Nuxt and [Vite](https://vite.dev/guide/performance.html#reduce-resolve-operations){rel="&#x22;nofollow&#x22;"}.

It improves type support when using modern libraries with `exports`.

See [the original TypeScript pull request](https://github.com/microsoft/TypeScript/pull/51669){rel="&#x22;nofollow&#x22;"}.

**Examples:**

Example 1 (unknown):

```unknown
### noScripts

Disables rendering of Nuxt scripts and JS resource hints. Can also be configured granularly within `routeRules`.
```

Example 2 (unknown):

```unknown
## `future`

There is also a `future` namespace for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### compatibilityVersion

::important
This configuration option is available in Nuxt v3.12+. Please note, that for now, you need to define the compatibility version in each layer that opts into Nuxt 4 behavior. This will not be required after Nuxt 4 is released.
::

This enables early access to Nuxt features or flags.

Setting `compatibilityVersion` to `4` changes defaults throughout your
Nuxt configuration to opt-in to Nuxt v4 behaviour, but you can granularly re-enable Nuxt v3 behaviour
when testing (see example). Please file issues if so, so that we can
address in Nuxt or in the ecosystem.
```

Example 3 (unknown):

```unknown
### typescriptBundlerResolution

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting
for frameworks like Nuxt and [Vite](https://vite.dev/guide/performance.html#reduce-resolve-operations){rel="&#x22;nofollow&#x22;"}.

It improves type support when using modern libraries with `exports`.

See [the original TypeScript pull request](https://github.com/microsoft/TypeScript/pull/51669){rel="&#x22;nofollow&#x22;"}.
```

---

## Generates `/plugins/sockets.client.ts`

**URL:** llms-txt#generates-`/plugins/sockets.client.ts`

**Contents:**

- `nuxt add component`

npx nuxt add plugin sockets --client
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add component`

- Modifier flags: `--mode client|server` or `--client` or `--server`
```

---

## Generates `plugins/analytics.ts`

**URL:** llms-txt#generates-`plugins/analytics.ts`

**Contents:**

- `nuxt add page`

npx nuxt add plugin analytics
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add page`
```

---

## Experimental Features

**URL:** llms-txt#experimental-features

**Contents:**

- asyncContext
- asyncEntry
- externalVue
- treeshakeClientOnly
- extractAsyncDataHandlers
- emitRouteChunkError
- restoreState
- inlineRouteRules
- renderJsonPayloads
- noVueServer

The Nuxt experimental features can be enabled in the Nuxt configuration file.

Internally, Nuxt uses `@nuxt/schema` to define these experimental features. You can refer to the [API documentation](https://nuxt.com/docs/3.x/api/configuration/nuxt-config#experimental) or the [source code](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/experimental.ts){rel="&#x22;nofollow&#x22;"} for more information.

::note
Note that these features are experimental and could be removed or modified in the future.
::

Enable native async context to be accessible for nested composables in Nuxt and in Nitro. This opens the possibility to use composables inside async composables and reduce the chance to get the `Nuxt instance is unavailable` error.

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/20918

---

See full explanation on the GitHub pull-request.
::

Enables generation of an async entry point for the Vue bundle, aiding module federation support.

Externalizes `vue`, `@vue/*` and `vue-router` when building.

_Enabled by default._

::warning
This feature will likely be removed in a near future.
::

## treeshakeClientOnly

Tree shakes contents of client-only components from server bundle.

_Enabled by default._

## extractAsyncDataHandlers

Extracts handler functions from `useAsyncData` and `useLazyAsyncData` calls into separate chunks for improved code splitting and caching efficiency.

This feature transforms inline handler functions into dynamically imported chunks:

The benefit of this transformation is that we can split out data fetching logic — while still allowing the code to be loaded if required.

::important
This feature is only recommended for **static builds** with payload extraction, and where data does not need to be re-fetched at runtime.
::

## emitRouteChunkError

Emits `app:chunkError` hook when there is an error loading vite/webpack chunks. Default behavior is to perform a reload of the new route on navigation to a new route when a chunk fails to load.

If you set this to `'automatic-immediate'` Nuxt will reload the current route immediately, instead of waiting for a navigation. This is useful for chunk errors that are not triggered by navigation, e.g., when your Nuxt app fails to load a [lazy component](https://nuxt.com/docs/3.x/directory-structure/components#dynamic-imports). A potential downside of this behavior is undesired reloads, e.g., when your app does not need the chunk that caused the error.

You can disable automatic handling by setting this to `false`, or handle chunk errors manually by setting it to `manual`.

Allows Nuxt app state to be restored from `sessionStorage` when reloading the page after a chunk error or manual [`reloadNuxtApp()`](https://nuxt.com/docs/3.x/api/utils/reload-nuxt-app) call.

To avoid hydration errors, it will be applied only after the Vue app has been mounted, meaning there may be a flicker on initial load.

::important
Consider carefully before enabling this as it can cause unexpected behavior,
and consider providing explicit keys to [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) as auto-generated keys may not match across builds.
::

Define route rules at the page level using [`defineRouteRules`](https://nuxt.com/docs/3.x/api/utils/define-route-rules).

Matching route rules will be created, based on the page's `path`.

## ::read-more

icon: i-lucide-square-function
to: https://nuxt.com/docs/api/utils/define-route-rules

---

Read more in `defineRouteRules` utility.
::

## ::read-more

icon: i-lucide-medal
to: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering

---

::

## renderJsonPayloads

Allows rendering of JSON payloads with support for revivifying complex types.

_Enabled by default._

Disables Vue server renderer endpoint within Nitro.

Enables extraction of payloads of pages generated with `nuxt generate`.

Enables the experimental [`<NuxtClientFallback>`](https://nuxt.com/docs/3.x/api/components/nuxt-client-fallback) component for rendering content on the client if there's an error in SSR.

## crossOriginPrefetch

Enables cross-origin prefetch using the Speculation Rules API.

## ::read-more

icon: i-simple-icons-w3c
target: \_blank
to: https://wicg.github.io/nav-speculation/prefetch.html

---

Read more about the **Speculation Rules API**.
::

Enables View Transition API integration with client-side router.

## ::link-example

target: \_blank
to: https://stackblitz.com/edit/nuxt-view-transitions?file=app.vue

---

::

## ::read-more

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API

---

Read more about the **View Transition API**.
::

Enables writing of early hints when using node server.

Enables experimental component islands support with [`<NuxtIsland>`](https://nuxt.com/docs/3.x/api/components/nuxt-island) and `.island.vue` files.

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/components#server-components

::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/issues/19772

---

You can follow the server components roadmap on GitHub.
::

Enables config schema support.

_Enabled by default._

## polyfillVueUseHead

Adds a compatibility layer for modules, plugins, or user code relying on the old `@vueuse/head` API.

## respectNoSSRHeader

Allow disabling Nuxt SSR responses by setting the `x-nuxt-no-ssr` header.

Resolve `~`, `~~`, `@` and `@@` aliases located within layers with respect to their layer source and root directories.

_Enabled by default._

Enable the new experimental typed router using [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router){rel="&#x22;nofollow&#x22;"}.

Out of the box, this will enable typed usage of [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to), [`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link), [`router.push()`](https://nuxt.com/docs/3.x/api/composables/use-router) and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`.

::important
If you use `pnpm` without `shamefully-hoist=true`, you will need to have `unplugin-vue-router` installed as a devDependency in order for this feature to work.
::

## ::video-accordion

title: Watch a video from Daniel Roe explaining type-safe routing in Nuxt
video-id: SXk-L19gTZk

---

::

Set an alternative watcher that will be used as the watching service for Nuxt.

Nuxt uses `chokidar-granular` by default, which will ignore top-level directories
(like `node_modules` and `.git`) that are excluded from watching.

You can set this instead to `parcel` to use `@parcel/watcher`, which may improve
performance in large projects or on Windows platforms.

You can also set this to `chokidar` to watch all files in your source directory.

## sharedPrerenderData

Enabling this feature automatically shares payload _data_ between pages that are prerendered. This can result
in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and
fetch the same data in different pages.

## ::video-accordion

title: Watch a video from Alexander Lichter about the experimental sharedPrerenderData
video-id: 1jUupYHVvrU

---

::

It is particularly important when enabling this feature to make sure that any unique key of your data
is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch
data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch`
should do this automatically for you.)

With this feature, Nuxt will automatically polyfill Node.js imports in the client build using [`unenv`](https://github.com/unjs/unenv){rel="&#x22;nofollow&#x22;"}.

::note
To make globals like `Buffer` work in the browser, you need to manually inject them.

This option allows exposing some route metadata defined in `definePageMeta` at build-time to modules (specifically `alias`, `name`, `path`, `redirect`, `props` and `middleware`).

This only works with static or strings/arrays rather than variables or conditional assignment. See [original issue](https://github.com/nuxt/nuxt/issues/24770){rel="&#x22;nofollow&#x22;"} for more information and context.

It is also possible to scan page metadata only after all routes have been registered in `pages:extend`. Then another hook, `pages:resolved` will be called. To enable this behavior, set `scanPageMeta: 'after-resolve'`.

You can disable this feature if it causes issues in your project.

Enables CookieStore support to listen for cookie updates (if supported by the browser) and refresh `useCookie` ref values.

## ::read-more

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/API/CookieStore

---

Read more about the **CookieStore**.
::

Caches Nuxt build artifacts based on a hash of the configuration and source files.

When enabled, changes to the following files will trigger a full rebuild:

In addition, any changes to files within `srcDir` will trigger a rebuild of the Vue client/server bundle. Nitro will always be rebuilt (though work is in progress to allow Nitro to announce its cacheable artifacts and their hashes).

::note
A maximum of 10 cache tarballs are kept.
::

## extraPageMetaExtractionKeys

The `definePageMeta()` macro is a useful way to collect build-time meta about pages. Nuxt itself provides a set list of supported keys which is used to power some of the internal features such as redirects, page aliases and custom paths.

This option allows passing additional keys to extract from the page metadata when using `scanPageMeta`.

This allows modules to access additional metadata from the page metadata in the build context. If you are using this within a module, it's recommended also to [augment the `NuxtPage` types with your keys](https://nuxt.com/docs/3.x/directory-structure/pages#typing-custom-metadata).

## normalizeComponentNames

Ensure that auto-generated Vue component names match the full component name
you would use to auto-import the component.

By default, if you haven't set it manually, Vue will assign a component name that matches
the filename of the component.

In this case, the component name would be `MyComponent`, as far as Vue is concerned. If you wanted to use `<KeepAlive>` with it, or identify it in the Vue DevTools, you would need to use this component.

But in order to auto-import it, you would need to use `SomeFolderMyComponent`.

By setting `experimental.normalizeComponentNames`, these two values match, and Vue will generate a component name that matches the Nuxt pattern for component naming.

## spaLoadingTemplateLocation

When rendering a client-only page (with `ssr: false`), we optionally render a loading screen (from `app/spa-loading-template.html`).

It can be set to `within`, which will render it like this:

Alternatively, you can render the template alongside the Nuxt app root by setting it to `body`:

This avoids a white flash when hydrating a client-only page.

## browserDevtoolsTiming

Enables performance markers for Nuxt hooks in browser devtools. This adds performance markers that you can track in the Performance tab of Chromium-based browsers, which is useful for debugging and optimizing performance.

This is enabled by default in development mode. If you need to disable this feature, it is possible to do so:

## ::read-more

color: gray
icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/29922

---

See PR #29922 for implementation details.
::

## ::read-more

color: gray
icon: i-simple-icons-googlechrome
target: \_blank
to: https://developer.chrome.com/docs/devtools/performance/extension#tracks

---

Learn more about Chrome DevTools Performance API.
::

## debugModuleMutation

Records mutations to `nuxt.options` in module context, helping to debug configuration changes made by modules during the Nuxt initialization phase.

This is enabled by default when `debug` mode is enabled. If you need to disable this feature, it is possible to do so:

To enable it explicitly:

## ::read-more

color: gray
icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/30555

---

See PR #30555 for implementation details.
::

This enables hydration strategies for `<Lazy>` components, which improves performance by deferring hydration of components until they're needed.

Lazy hydration is enabled by default, but you can disable this feature:

## ::read-more

color: gray
icon: i-simple-icons-github
to: https://nuxt.com/docs/guide/directory-structure/components#delayed-or-lazy-hydration

---

Read more about lazy hydration.
::

## templateImportResolution

Controls how imports in Nuxt templates are resolved. By default, Nuxt attempts to resolve imports in templates relative to the module that added them.

This is enabled by default, so if you're experiencing resolution conflicts in certain environments, you can disable this behavior:

## ::read-more

color: gray
icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/31175

---

See PR #31175 for implementation details.
::

This option enables enabling decorator syntax across your entire Nuxt/Nitro app, powered by [esbuild](https://github.com/evanw/esbuild/releases/tag/v0.21.3){rel="&#x22;nofollow&#x22;"}.

For a long time, TypeScript has had support for decorators via `compilerOptions.experimentalDecorators`. This implementation predated the TC39 standardization process. Now, decorators are a [Stage 3 Proposal](https://github.com/tc39/proposal-decorators){rel="&#x22;nofollow&#x22;"}, and supported without special configuration in TS 5.0+ (see <https://github.com/microsoft/TypeScript/pull/52582>{rel="&#x22;nofollow&#x22;"} and <https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators>{rel="&#x22;nofollow&#x22;"}).

Enabling `experimental.decorators` enables support for the TC39 proposal, **NOT** for TypeScript's previous `compilerOptions.experimentalDecorators` implementation.

::warning
Note that there may be changes before this finally lands in the JS standard.
::

Nuxt will automatically purge cached data from `useAsyncData` and `nuxtApp.static.data`. This helps prevent memory leaks
and ensures fresh data is loaded when needed, but it is possible to disable it:

## ::read-more

color: gray
icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/31379

---

See PR #31379 for implementation details.
::

## granularCachedData

Whether to call and use the result from `getCachedData` when refreshing data for `useAsyncData` and `useFetch` (whether by `watch`, `refreshNuxtData()`, or a manual `refresh()` call.

## ::read-more

color: gray
icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/pull/31373

---

See PR #31373 for implementation details.
::

If set to `false`, the `pending` object returned from `useAsyncData`, `useFetch`, `useLazyAsyncData` and `useLazyFetch` will be a computed property that is `true` only when `status` is also pending.

That means that when `immediate: false` is passed, `pending` will be `false` until the first request is made.

By default, Nuxt improves chunk stability by using an import map to resolve the entry chunk of the bundle.

This injects an import map at the top of your `<head>` tag:

Within the script chunks emitted by Vite, imports will be from `#entry`. This means that changes to the entry will not invalidate chunks which are otherwise unchanged.

::note
Nuxt smartly disables this feature if you have configured `vite.build.target` to include a browser that doesn't support import maps, or if you have configured `vite.build.rollupOptions.output.entryFileNames` to a value that does not include `[hash]`.
::

If you need to disable this feature you can do so:

Enable enhanced TypeScript developer experience with the `@dxup/nuxt` module.

This experimental plugin provides improved TypeScript integration and development tooling for better DX when working with TypeScript in Nuxt applications.

This flag is disabled by default, but you can enable this feature:

::important
To use this feature, you need to:

- Have `typescript` installed as a dependency
- Configure VS Code to use your workspace TypeScript version (see [VS Code documentation](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript){rel=""nofollow""})
  ::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/KazariEX/dxup

---

Learn more about **@dxup/nuxt**.
::

## viteEnvironmentApi

Enable Vite 6's new [Environment API](https://vite.dev/guide/api-environment){rel="&#x22;nofollow&#x22;"} for improved build configuration and plugin architecture.

When you set `future.compatibilityVersion` to `5`, this feature is enabled by default. You can also enable it explicitly for testing:

The Vite Environment API provides better consistency between development and production builds, more granular control over environment-specific configuration, and improved performance.

::important
Enabling this feature changes how Vite plugins are registered and configured. See the [Vite Environment API migration guide](https://nuxt.com/docs/4.x/getting-started/upgrade#migration-to-vite-environment-api) for details on updating your plugins.
::

::read-more{target="\_blank" to="https://vite.dev/guide/api-environment"}
Learn more about Vite's Environment API.
::

**Examples:**

Example 1 (unknown):

```unknown
::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/pull/20918
---
See full explanation on the GitHub pull-request.
::

## asyncEntry

Enables generation of an async entry point for the Vue bundle, aiding module federation support.
```

Example 2 (unknown):

```unknown
## externalVue

Externalizes `vue`, `@vue/*` and `vue-router` when building.

*Enabled by default.*
```

Example 3 (unknown):

```unknown
::warning
This feature will likely be removed in a near future.
::

## treeshakeClientOnly

Tree shakes contents of client-only components from server bundle.

*Enabled by default.*
```

Example 4 (unknown):

```unknown
## extractAsyncDataHandlers

Extracts handler functions from `useAsyncData` and `useLazyAsyncData` calls into separate chunks for improved code splitting and caching efficiency.
```

---

## Nuxt performance

**URL:** llms-txt#nuxt-performance

**Contents:**

- Built-in Features
  - Links
  - Hybrid Rendering
  - Lazy Loading Components
  - Lazy Hydration
  - Fetching data
- Core Nuxt Modules
  - Images
  - Fonts
  - Scripts

Nuxt comes with built-in features designed to improve your application's performance and contribute to better [Core Web Vitals](https://web.dev/articles/vitals){rel="&#x22;nofollow&#x22;"}. There are also multiple Nuxt core modules that assist in improving performance in specific areas. This guide outlines best practices to optimize performance of your Nuxt application.

Nuxt offers several built-in features that help you optimize performance of your website. Understanding how these features work is crucial for achieving blazingly-fast performance.

[`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link) is a drop-in replacement for both Vue Router's `<RouterLink>` component and HTML's `<a>` tag. It intelligently determines whether the link is internal or external and renders it accordingly with available optimizations (prefetching, default attributes, etc.)

Nuxt automatically includes smart prefetching. That means it detects when a link is visible (by default), either in the viewport or when scrolling and prefetches the JavaScript for those pages so that they are ready when the user clicks the link.

You can also opt for prefetching on interaction instead:

## ::read-more

title: NuxtLink
to: https://nuxt.com/docs/api/components/nuxt-link

---

::

In more complex applications, we may need a full control over how our application is rendered to support cases where some pages could be generated at build time, while others should be client-side rendered

Hybrid rendering allows different caching rules per route using Route Rules and decides how the server should respond to a new request on a given URL:

Nuxt server will automatically register corresponding middleware and wrap routes with cache handlers using Nitro caching layer.

## ::read-more

title: Hybrid rendering
to: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering

---

::

### Lazy Loading Components

To dynamically import a component (also known as lazy-loading a component) all you need to do is add the Lazy prefix to the component's name. This is useful if the component is not always needed.

By using the Lazy prefix you can delay loading the component code until the right moment, which can be helpful for optimizing your JavaScript bundle size.

## ::read-more

title: Lazy loading components
to: https://nuxt.com/docs/guide/directory-structure/components#dynamic-imports

---

::

It is not always necessary to hydrate (or make interactive) all the components of your site on the initial load. Using lazy hydration, you can control when components can have their code loaded, which can improve the time-to-interactive metric for your app. Nuxt allows you to control when components become interactive with lazy hydration (added in Nuxt v3.16).

To optimize your app, you may want to delay the hydration of some components until they're visible, or until the browser is done with more important tasks.

## ::read-more

title: Lazy hydration
to: https://nuxt.com/docs/guide/directory-structure/components#delayed-or-lazy-hydration

---

::

To avoid fetching same data twice (once on the server and once on client) Nuxt provides [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) and [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data). They ensure that if an API call is made on the server, the data is forwarded to the client in the payload instead of being fetched again.

## ::read-more

title: Data fetching
to: https://nuxt.com/docs/getting-started/data-fetching

---

::

Apart from Nuxt's built-in features, there are also core modules maintained by the Nuxt team which help improve performance even further. These modules help handle assets such as images, custom fonts, or third party scripts.

Unoptimized images can have a significant negative impact on your website performance, specifically the [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp){rel="&#x22;nofollow&#x22;"} score.

In Nuxt we can use [Nuxt Image](https://image.nuxt.com/){rel="&#x22;nofollow&#x22;"} module that is a plug-and-play image optimization for Nuxt apps. It allows resizing and transforming your images using built-in optimizer or your favorite images CDN.

## ::video-accordion

title: Watch the video by LearnVue about Nuxt Image
video-id: \_UBff2eqGY0

---

::

[`<NuxtImg>`](https://nuxt.com/docs/3.x/api/components/nuxt-img) is a drop-in replacement for the native `<img>` tag that comes with following enhancements:

- Uses built-in provider to optimize local and remote images
- Converts `src` to provider optimized URLs with modern formats such as WebP or Avif
- Automatically resizes images based on `width` and `height`
- Generates responsive `sizes` when providing sizes option
- Supports native `lazy loading` as well as other `<img>` attributes

Images in your website can usually be separated by importance; the ones that are needed to be delivered first at initial load (i.e. `Largest Contentful Paint`), and the ones that can be loaded later or when specifically needed. For that, we could use the following optimizations:

::read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}
::

[Nuxt Fonts](https://fonts.nuxt.com/){rel="&#x22;nofollow&#x22;"} will automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.

It includes built-in automatic self-hosting for any font file which means you can optimally load web fonts with reduced layout shift, thanks to the underlying package [fontaine](https://github.com/unjs/fontaine){rel="&#x22;nofollow&#x22;"}.

## ::video-accordion

title: Watch the talk by Daniel Roe about the idea behind Nuxt Fonts
video-id: D3F683UViBY

---

::

Nuxt Fonts processes all your CSS and does the following things automatically when it encounters a font-family declaration.

1. **Resolves fonts** – Looks for font files in public/, then checks web providers like Google, Bunny, and Fontshare.
2. **Generates @font-face rules** – Injects CSS rules to load fonts from the correct sources.
3. **Proxies & caches fonts** – Rewrites URLs to `/_fonts`, downloads and caches fonts locally.
4. **Creates fallback metrics** – Adjusts local system fonts to match web fonts, reducing layout shift ([CLS](https://web.dev/articles/cls){rel="&#x22;nofollow&#x22;"}).
5. **Includes fonts in build** – Bundles fonts with your project, hashing file names and setting long-lived cache headers.

It supports multiple providers that are designed to be pluggable and extensible, so no matter your setup you should be able to use an existing provider or write your own.

Third-party resources like analytics tools, video embeds, maps, and social media integrations enhance website functionality but can significantly degrade user experience and negatively impact [Interaction to Next Paint (INP)](https://web.dev/articles/inp){rel="&#x22;nofollow&#x22;"} and Largest Contentful Paint (LCP) scores.

[Nuxt Scripts](https://scripts.nuxt.com/){rel="&#x22;nofollow&#x22;"} lets you load third-party scripts with better performance, privacy, security and DX.

## ::video-accordion

title: Watch the video by Alex Lichter about Nuxt Scripts
video-id: sjMqUUvH9AE

---

::

Nuxt Scripts provides an abstraction layer on top of third-party scripts, providing SSR support and type-safety and while still giving you full low-level control over how a script is loaded.

::read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}
::

To improve performance, we need to first know how to measure it, starting with measuring performance during development - on local environment, and then moving to auditing application that are deployed on production.

[This](https://nuxt.com/docs/3.x/api/commands/analyze) command of `nuxi` allows to analyze the production bundle or your Nuxt application. It leverages `vite-bundle-visualizer` (similar to `webpack-bundle-analyzer`) to generate a visual representation of your application's bundle, making it easier to identify which components take up the most space.

When you see a large block in the visualization, it often signals an opportunity for optimization—whether by splitting it into smaller parts, implementing lazy loading, or replacing it with a more efficient alternative, especially for third-party libraries.

Large blocks containing multiple elements can often be reduced by importing only the necessary components rather than entire modules while large standalone blocks may be better suited for lazy loading rather than being included in the main bundle.

The [Nuxt DevTools](https://devtools.nuxt.com/){rel="&#x22;nofollow&#x22;"} gives you insights and transparency about your Nuxt App to identify performance gaps and seamlessly manage your app configurations.

![Nuxt DevTools example](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

It comes with several features we can use to measure performance of Nuxt apps:

1. **Timeline** – Tracks time spent on rendering, updating, and initializing components to identify performance bottlenecks.
2. **Assets** – Displays file sizes (e.g., images) without transformations.
3. **Render Tree** – Shows connections between Vue components, scripts, and styles to optimize dynamic loading.
4. **Inspect** – Lists all files used in the Vue app with their size and evaluation time.

Chrome DevTools come with two useful tabs for measuring performance; `Performance` and `Lighthouse`.

When you open the [Performance](https://developer.chrome.com/docs/devtools/performance/overview){rel="&#x22;nofollow&#x22;"} panel, it instantly shows your local \**Largest Contentful Paint (LCP)\*\* and \**Cumulative Layout Shift (CLS)\*\* scores (good, needs improvement, or bad).

If you interact with the page, it also captures \*\*Interaction to Next Paint (INP)\*\*, giving you a full view of your Core Web Vitals based on your device and network.

![Chrome DevTools Performance Panel](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse){rel="&#x22;nofollow&#x22;"} audits performance, accessibility, SEO, progressive web apps, and best practices. It runs tests on your page and generates a report. Use failing audits as a guide to improve your site.

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

Each audit has a reference document explaining why the audit is important, as well as how to fix it.

### PageSpeed Insights

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about){rel="&#x22;nofollow&#x22;"} reports on the user experience of a page on both mobile and desktop devices, and provides suggestions on how that page may be improved.

It provides both lab and field data about a page. Lab data is useful for debugging issues, as it is collected in a controlled environment while field data is useful for capturing true, real-world user experience.

[WebPageTest](https://www.webpagetest.org/){rel="&#x22;nofollow&#x22;"} is a web performance tool providing deep diagnostic information about how a page performs under a variety of conditions.

Each test can be run from different locations around the world, on real browsers, over any number of customizable network conditions.

When building more complex Nuxt applications, you will probably encounter some of the problems listed below. Understanding these problems and fixing them will help you improve performance of your website.

### Overusing plugins

**Problem**: A large number of plugins can cause performance issues, especially if they require expensive computations or take too long to initialize. Since plugins run during the hydration phase, inefficient setups can block rendering and degrade the user experience.

**Solution**: Inspect your plugins and see if some of them could be implemented rather as a composable or utility function instead.

### Unused code / dependencies

**Problem**: With the development of the project, there can be a case where there will be some unused code or a dependency. This additional functionality may not be used or needed while it will be increase the bundle size of our project.

**Solution**: Inspect your `package.json` for unused dependencies and analyze your code for unused utils/composables/functions.

### Not using Vue Performance tips

**Problem**: [Vue documentation](https://vuejs.org/guide/best-practices/performance){rel="&#x22;nofollow&#x22;"} lists several Performance improvements we can use in our Nuxt projects as well but as they are part of Vue documentation, developers tend to forget about it and focus on Nuxt specific improvements only - while Nuxt application is still a Vue project.

**Solution**: Use concepts such as `shallowRef`, `v-memo`, `v-once`, etc to improve performance.

### Not following patterns

**Problem**: The more people are currently working on the project, the more difficult it will be to maintain the stable codebase. Developers have a tendency to introduce new concepts they've seen in another project which can cause conflicts and problems with performance.

**Solution**: Establish rules and patterns in the project such as [Good practices and Design Patterns for Vue Composables](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk){rel="&#x22;nofollow&#x22;"}

### Trying to load everything at the same time

**Problem**: When a page is loaded and it is not correctly instructed about the order of loading elements it will result in fetching everything at the same time - which can be slow and result in bad User Experience.

**Solution**: Use concepts such as Progressive Enhancement where core webpage content is set first, then more nuanced and technically rigorous layers of presentation and features are added on top as the browser/internet connection allow.

To learn more about various techniques for improving performance, take a look at the following resources:

1. [Apply instant loading with the PRPL pattern](https://web.dev/articles/apply-instant-loading-with-prpl){rel="&#x22;nofollow&#x22;"}
2. [Perceived performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance){rel="&#x22;nofollow&#x22;"}
3. [Understanding Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path){rel="&#x22;nofollow&#x22;"}

**Examples:**

Example 1 (html):

```html
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>

<!-- Which will render to with Vue Router & Smart Prefetching -->
<a href="/about">About page</a>
```

Example 2 (ts):

```ts
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: 'interaction',
      },
    },
  },
});
```

Example 3 (ts):

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true,
    },
    '/products/**': {
      swr: 3600,
    },
    '/blog': {
      isr: 3600,
    },
    '/admin/**': {
      ssr: false,
    },
  },
});
```

Example 4 (html):

```html
<script setup lang="ts">
  const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

---

## node_modules

**URL:** llms-txt#node_modules

The package manager ([`npm`](https://docs.npmjs.com/cli/commands/npm/){rel="&#x22;nofollow&#x22;"} or [`yarn`](https://yarnpkg.com){rel="&#x22;nofollow&#x22;"} or [`pnpm`](https://pnpm.io/cli/install){rel="&#x22;nofollow&#x22;"} or [`bun`](https://bun.com/package-manager){rel="&#x22;nofollow&#x22;"}) creates this directory to store the dependencies of your project.

::important
This directory should be added to your [`.gitignore`](https://nuxt.com/docs/3.x/directory-structure/gitignore) file to avoid pushing the dependencies to your repository.
::

---

## Modules

**URL:** llms-txt#modules

**Contents:**

- Module Compatibility
  - Plugin Compatibility
  - Vue Compatibility
- Module Migration
  - Test with `@nuxt/bridge`
  - Migrate from CommonJS to ESM
  - Ensure Plugins Default Export
  - Avoid Runtime Modules
  - Use TypeScript (Optional)

## Module Compatibility

Nuxt 3 has a basic backward compatibility layer for Nuxt 2 modules using `@nuxt/kit` auto wrappers. But there are usually steps to follow to make modules compatible with Nuxt 3 and sometimes, using Nuxt Bridge is required for cross-version compatibility.

We have prepared a [Dedicated Guide](https://nuxt.com/docs/3.x/guide/going-further/modules) for authoring Nuxt 3 ready modules using `@nuxt/kit`. Currently best migration path is to follow it and rewrite your modules. Rest of this guide includes preparation steps if you prefer to avoid a full rewrite yet making modules compatible with Nuxt 3.

::tip{icon="i-lucide-puzzle" to="https://nuxt.com/modules"}
Explore Nuxt 3 compatible modules.
::

### Plugin Compatibility

Nuxt 3 plugins are **not** fully backward compatible with Nuxt 2.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

### Vue Compatibility

Plugins or components using the Composition API need exclusive Vue 2 or Vue 3 support.

By using [vue-demi](https://github.com/vueuse/vue-demi){rel="&#x22;nofollow&#x22;"} they should be compatible with both Nuxt 2 and 3.

When Nuxt 3 users add your module, you will not have access to the module container (`this.*`) so you will need to use utilities from `@nuxt/kit` to access the container functionality.

### Test with `@nuxt/bridge`

Migrating to `@nuxt/bridge` is the first and most important step for supporting Nuxt 3.

If you have a fixture or example in your module, add `@nuxt/bridge` package to its config (see [example](https://nuxt.com/docs/3.x/bridge/overview#update-nuxtconfig))

### Migrate from CommonJS to ESM

Nuxt 3 natively supports TypeScript and ECMAScript Modules. Please check [Native ES Modules](https://nuxt.com/docs/3.x/guide/concepts/esm) for more info and upgrading.

### Ensure Plugins Default Export

If you inject a Nuxt plugin that does not have `export default` (such as global Vue plugins), ensure you add `export default () => { }` to the end of it.

### Avoid Runtime Modules

With Nuxt 3, Nuxt is now a build-time-only dependency, which means that modules shouldn't attempt to hook into the Nuxt runtime.

Your module should work even if it's only added to [`buildModules`](https://nuxt.com/docs/3.x/api/nuxt-config#runtimeconfig) (instead of `modules`). For example:

- Avoid updating `process.env` within a Nuxt module and reading by a Nuxt plugin; use [`runtimeConfig`](https://nuxt.com/docs/3.x/api/nuxt-config#runtimeconfig) instead.
- (\*) Avoid depending on runtime hooks like `vue-renderer:*` for production
- (\*) Avoid adding `serverMiddleware` by importing them inside the module. Instead, add them by referencing a file path so that they are independent of the module's context

(\*) Unless it is for `nuxt dev` purpose only and guarded with `if (nuxt.options.dev) { }`.

::tip
Continue reading about Nuxt 3 modules in the [Modules Author Guide](https://nuxt.com/docs/3.x/guide/going-further/modules).
::

### Use TypeScript (Optional)

While it is not essential, most of the Nuxt ecosystem is shifting to use TypeScript, so it is highly recommended to consider migration.

::tip
You can start migration by renaming `.js` files, to `.ts`. TypeScript is designed to be progressive!
::

::tip
You can use TypeScript syntax for Nuxt 2 and 3 modules and plugins without any extra dependencies.
::

**Examples:**

Example 1 (unknown):

```unknown

```

---

## Generates `app/plugins/analytics.ts`

**URL:** llms-txt#generates-`app/plugins/analytics.ts`

**Contents:**

- `nuxt add page`

npx nuxt add plugin analytics
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add page`
```

---

## Generates `middleware/auth.ts`

**URL:** llms-txt#generates-`middleware/auth.ts`

**Contents:**

- `nuxt add api`

npx nuxt add middleware auth
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add api`

- Modifier flags: `--method` (can accept `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` or `trace`) or alternatively you can directly use `--get`, `--post`, etc.
```

---

## ignore route middleware files under foo folder except foo/bar.js

**URL:** llms-txt#ignore-route-middleware-files-under-foo-folder-except-foo/bar.js

middleware/foo/\*.js
!middleware/foo/bar.js

```

::read-more
---
icon: i-simple-icons-git
target: _blank
title: the git documentation
to: https://git-scm.com/docs/gitignore
---
More details about the spec are in the **gitignore documentation**.
::

---
```
