# Nuxt - Api

**Pages:** 53

---

## <NuxtPicture>

**URL:** llms-txt#<nuxtpicture>

**Contents:**

- Setup

`<NuxtPicture>` is a drop-in replacement for the native `<picture>` tag.

Usage of `<NuxtPicture>` is almost identical to [`<NuxtImg>`](https://nuxt.com/docs/3.x/api/components/nuxt-img) but it also allows serving modern formats like `webp` when possible.

Learn more about the [`<picture>` tag on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture){rel="&#x22;nofollow&#x22;"}.

In order to use `<NuxtPicture>` you should install and enable the Nuxt Image module:

::read-more{target="\_blank" to="https://image.nuxt.com/usage/nuxt-picture"}
Read more about the `<NuxtPicture>` component.
::

---

## useFetch

**URL:** llms-txt#usefetch

**Contents:**

- Usage
  - Reactive Keys and Shared State
  - Reactive Fetch Options
- Type
- Parameters
- Return Values
  - Status values
  - Examples

This composable provides a convenient wrapper around [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) and [`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch).
It automatically generates a key based on URL and fetch options, provides type hints for request url based on server routes, and infers API response type.

::note
`useFetch` is a composable meant to be called directly in a setup function, plugin, or route middleware. It returns reactive composables and handles adding responses to the Nuxt payload so they can be passed from server to client without re-fetching the data on client side when the page hydrates.
::

::warning
If you're using a custom useFetch wrapper, do not await it in the composable, as that can cause unexpected behavior. Please follow [this recipe](https://nuxt.com/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch) for more information on how to make a custom async data fetcher.
::

::note
`data`, `status`, and `error` are Vue refs, and they should be accessed with `.value` when used within the `<script setup>`, while `refresh`/`execute` and `clear` are plain functions.
::

Using the `query` option, you can add search parameters to your query. This option is extended from [unjs/ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"} and is using [unjs/ufo](https://github.com/unjs/ufo){rel="&#x22;nofollow&#x22;"} to create the URL. Objects are automatically stringified.

The above example results in `https://api.nuxt.com/modules?param1=value1&param2=value2`.

You can also use [interceptors](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors){rel="&#x22;nofollow&#x22;"}:

### Reactive Keys and Shared State

You can use a computed ref or a plain ref as the URL, allowing for dynamic data fetching that automatically updates when the URL changes:

When using `useFetch` with the same URL and options in multiple components, they will share the same `data`, `error` and `status` refs. This ensures consistency across components.

::tip
Keyed state created using `useFetch` can be retrieved across your Nuxt application using [`useNuxtData`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-data).
::

::warning
`useFetch` is a reserved function name transformed by the compiler, so you should not name your own function `useFetch`.
::

::warning
If you encounter the `data` variable destructured from a `useFetch` returns a string and not a JSON parsed object then make sure your component doesn't include an import statement like `import { useFetch } from '@vueuse/core`.
::

## ::video-accordion

title: Watch the video from Alexander Lichter to avoid using useFetch the wrong way
video-id: njsGVmcWviY

---

::

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

### Reactive Fetch Options

Fetch options can be provided as reactive, supporting `computed`, `ref` and [computed getters](https://vuejs.org/guide/essentials/computed.html){rel="&#x22;nofollow&#x22;"}. When a reactive fetch option is updated it will trigger a refetch using the updated resolved reactive value.

If needed, you can opt out of this behavior using `watch: false`:

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): The URL or request to fetch. Can be a string, a Request object, a Vue ref, or a function returning a string/Request. Supports reactivity for dynamic endpoints.
- `options` (object): Configuration for the fetch request. Extends [unjs/ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"} options and [`AsyncDataOptions`](https://nuxt.com/docs/3.x/api/composables/use-async-data#params). All options can be a static value, a `ref`, or a computed value.

| Option          | Type                                     | Default               | Description                                                                                                                                                              |
| --------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------- |
| `key`           | `MaybeRefOrGetter<string>`               | auto-gen              | Unique key for de-duplication. If not provided, generated from URL and options.                                                                                          |
| `method`        | `MaybeRefOrGetter<string>`               | `'GET'`               | HTTP request method.                                                                                                                                                     |
| `query`         | `MaybeRefOrGetter<SearchParams>`         | -                     | Query/search params to append to the URL. Alias: `params`.                                                                                                               |
| `params`        | `MaybeRefOrGetter<SearchParams>`         | -                     | Alias for `query`.                                                                                                                                                       |
| `body`          | `MaybeRefOrGetter<RequestInit['body']    | Record<string, any>>` | -                                                                                                                                                                        | Request body. Objects are automatically stringified.                                        |
| `headers`       | `MaybeRefOrGetter<Record<string, string> | [key, value][]        | Headers>`                                                                                                                                                                | -                                                                                           | Request headers. |
| `baseURL`       | `MaybeRefOrGetter<string>`               | -                     | Base URL for the request.                                                                                                                                                |
| `timeout`       | `MaybeRefOrGetter<number>`               | -                     | Timeout in milliseconds to abort the request.                                                                                                                            |
| `cache`         | `boolean                                 | string`               | -                                                                                                                                                                        | Cache control. Boolean disables cache, or use Fetch API values: `default`, `no-store`, etc. |
| `server`        | `boolean`                                | `true`                | Whether to fetch on the server.                                                                                                                                          |
| `lazy`          | `boolean`                                | `false`               | If true, resolves after route loads (does not block navigation).                                                                                                         |
| `immediate`     | `boolean`                                | `true`                | If false, prevents request from firing immediately.                                                                                                                      |
| `default`       | `() => DataT`                            | -                     | Factory for default value of `data` before async resolves.                                                                                                               |
| `timeout`       | `number`                                 | -                     | A number in milliseconds to wait before timing out the request (defaults to `undefined`, which means no timeout)                                                         |
| `transform`     | `(input: DataT) => DataT                 | Promise<DataT>`       | -                                                                                                                                                                        | Function to transform the result after resolving.                                           |
| `getCachedData` | `(key, nuxtApp, ctx) => DataT            | undefined`            | -                                                                                                                                                                        | Function to return cached data. See below for default.                                      |
| `pick`          | `string[]`                               | -                     | Only pick specified keys from the result.                                                                                                                                |
| `watch`         | `MultiWatchSources                       | false`                | -                                                                                                                                                                        | Array of reactive sources to watch and auto-refresh. `false` disables watching.             |
| `deep`          | `boolean`                                | `true`                | Return data in a deep ref object. Set to `false` to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive. |
| `dedupe`        | `'cancel'                                | 'defer'`              | `'cancel'`                                                                                                                                                               | Avoid fetching same key more than once at a time.                                           |
| `$fetch`        | `typeof globalThis.$fetch`               | -                     | Custom $fetch implementation. See [Custom useFetch in Nuxt](https://nuxt.com/docs/guide/recipes/custom-usefetch)                                                         |

::note
All fetch options can be given a `computed` or `ref` value. These will be watched and new requests made automatically with any new values if they are updated.
::

**getCachedData default:**

This only caches data when `experimental.payloadExtraction` in `nuxt.config` is enabled.

| Name      | Type                                                | Description                                                                                                                                                  |
| --------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | --------- | ---------------------------------------------------------- |
| `data`    | `Ref<DataT                                          | undefined>`                                                                                                                                                  | The result of the asynchronous fetch.     |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Function to manually refresh the data. By default, Nuxt waits until a `refresh` is finished before it can be executed again.                                 |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Alias for `refresh`.                                                                                                                                         |
| `error`   | `Ref<ErrorT                                         | undefined>`                                                                                                                                                  | Error object if the data fetching failed. |
| `status`  | `Ref<'idle'                                         | 'pending'                                                                                                                                                    | 'success'                                 | 'error'>` | Status of the data request. See below for possible values. |
| `clear`   | `() => void`                                        | Resets `data` to `undefined` (or the value of `options.default()` if provided), `error` to `null`, set `status` to `idle`, and cancels any pending requests. |

- `idle`: Request has not started (e.g. `{ immediate: false }` or `{ server: false }` on server render)
- `pending`: Request is in progress
- `success`: Request completed successfully
- `error`: Request failed

::note
If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await `useFetch` on client-side, `data` will remain null within `<script setup>`.
::

## ::link-example

## to: https://nuxt.com/docs/examples/advanced/use-custom-fetch-composable

::

::link-example{to="https://nuxt.com/docs/examples/features/data-fetching"}
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
If you're using a custom useFetch wrapper, do not await it in the composable, as that can cause unexpected behavior. Please follow [this recipe](https://nuxt.com/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch) for more information on how to make a custom async data fetcher.
::

::note
`data`, `status`, and `error` are Vue refs, and they should be accessed with `.value` when used within the `<script setup>`, while `refresh`/`execute` and `clear` are plain functions.
::

Using the `query` option, you can add search parameters to your query. This option is extended from [unjs/ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"} and is using [unjs/ufo](https://github.com/unjs/ufo){rel="&#x22;nofollow&#x22;"} to create the URL. Objects are automatically stringified.
```

Example 2 (unknown):

```unknown
The above example results in `https://api.nuxt.com/modules?param1=value1&param2=value2`.

You can also use [interceptors](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors){rel="&#x22;nofollow&#x22;"}:
```

Example 3 (unknown):

```unknown
### Reactive Keys and Shared State

You can use a computed ref or a plain ref as the URL, allowing for dynamic data fetching that automatically updates when the URL changes:
```

Example 4 (unknown):

```unknown
When using `useFetch` with the same URL and options in multiple components, they will share the same `data`, `error` and `status` refs. This ensures consistency across components.

::tip
Keyed state created using `useFetch` can be retrieved across your Nuxt application using [`useNuxtData`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-data).
::

::warning
`useFetch` is a reserved function name transformed by the compiler, so you should not name your own function `useFetch`.
::

::warning
If you encounter the `data` variable destructured from a `useFetch` returns a string and not a JSON parsed object then make sure your component doesn't include an import statement like `import { useFetch } from '@vueuse/core`.
::

::video-accordion
---
title: Watch the video from Alexander Lichter to avoid using useFetch the wrong way
video-id: njsGVmcWviY
---
::

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

### Reactive Fetch Options

Fetch options can be provided as reactive, supporting `computed`, `ref` and [computed getters](https://vuejs.org/guide/essentials/computed.html){rel="&#x22;nofollow&#x22;"}. When a reactive fetch option is updated it will trigger a refetch using the updated resolved reactive value.
```

---

## useNuxtData

**URL:** llms-txt#usenuxtdata

**Contents:**

- Usage
- Params
- Return Values
- Example
- Optimistic Updates
- Type

::note
`useNuxtData` gives you access to the current cached value of [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) , [`useLazyAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-lazy-async-data), [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) and [`useLazyFetch`](https://nuxt.com/docs/3.x/api/composables/use-lazy-fetch) with explicitly provided key.
::

The `useNuxtData` composable is used to access the current cached value of data-fetching composables such as `useAsyncData`, `useLazyAsyncData`, `useFetch`, and `useLazyFetch`. By providing the key used during the data fetch, you can retrieve the cached data and use it as needed.

This is particularly useful for optimizing performance by reusing already-fetched data or implementing features like Optimistic Updates or cascading data updates.

To use `useNuxtData`, ensure that the data-fetching composable (`useFetch`, `useAsyncData`, etc.) has been called with an explicitly provided key.

## ::video-accordion

title: Watch a video from LearnVue about useNuxtData
video-id: e-\_u6swXRWk

---

::

- `key`: The unique key that identifies the cached data. This key should match the one used during the original data fetch.

- `data`: A reactive reference to the cached data associated with the provided key. If no cached data exists, the value will be `null`. This `Ref` automatically updates if the cached data changes, allowing seamless reactivity in your components.

The example below shows how you can use cached data as a placeholder while the most recent data is being fetched from the server.

## Optimistic Updates

The example below shows how implementing Optimistic Updates can be achieved using useNuxtData.

Optimistic Updates is a technique where the user interface is updated immediately, assuming a server operation will succeed. If the operation eventually fails, the UI is rolled back to its previous state.

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
## Optimistic Updates

The example below shows how implementing Optimistic Updates can be achieved using useNuxtData.

Optimistic Updates is a technique where the user interface is updated immediately, assuming a server operation will succeed. If the operation eventually fails, the UI is rolled back to its previous state.
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
## Type
```

---

## Generates `components/TheHeader.vue`

**URL:** llms-txt#generates-`components/theheader.vue`

**Contents:**

- `nuxt add composable`

npx nuxt add component TheHeader
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add composable`
```

---

## defineNuxtComponent

**URL:** llms-txt#definenuxtcomponent

**Contents:**

- `asyncData()`
- `head()`

::note
`defineNuxtComponent()` is a helper function for defining type safe Vue components using options API similar to [`defineComponent()`](https://vuejs.org/api/general.html#definecomponent){rel=""nofollow""}. `defineNuxtComponent()` wrapper also adds support for `asyncData` and `head` component options.
::

::note
Using `<script setup lang="ts">` is the recommended way of declaring Vue components in Nuxt.
::

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

If you choose not to use `setup()` in your app, you can use the `asyncData()` method within your component definition:

If you choose not to use `setup()` in your app, you can use the `head()` method within your component definition:

**Examples:**

Example 1 (unknown):

```unknown
## `head()`

If you choose not to use `setup()` in your app, you can use the `head()` method within your component definition:
```

---

## clearError

**URL:** llms-txt#clearerror

Within your pages, components, and plugins, you can use `clearError` to clear all errors and redirect the user.

- `options?: { redirect?: string }`

You can provide an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

Errors are set in state using [`useError()`](https://nuxt.com/docs/3.x/api/composables/use-error). The `clearError` composable will reset this state and calls the `app:error:cleared` hook with the provided options.

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

**Examples:**

Example 1 (ts):

```ts
// Without redirect
clearError();

// With redirect
clearError({ redirect: '/homepage' });
```

---

## State Management

**URL:** llms-txt#state-management

::read-more{to="https://nuxt.com/docs/getting-started/state-management"}
::

::read-more{to="https://nuxt.com/docs/api/composables/use-state"}
::

## ::sandbox

branch: main
dir: examples/features/state-management
file: app.vue
repo: nuxt/examples

---

::

---

## `usePreviewMode`

**URL:** llms-txt#`usepreviewmode`

**Contents:**

- Options
  - Custom `enable` check
  - Modify default state
  - Customize the `onEnable` and `onDisable` callbacks
- Example

Preview mode allows you to see how your changes would be displayed on a live site without revealing them to users.

You can use the built-in `usePreviewMode` composable to access and control preview state in Nuxt. If the composable detects preview mode it will automatically force any updates necessary for [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) to rerender preview content.

### Custom `enable` check

You can specify a custom way to enable preview mode. By default the `usePreviewMode` composable will enable preview mode if there is a `preview` param in url that is equal to `true` (for example, `http://localhost:3000?preview=true`). You can wrap the `usePreviewMode` into custom composable, to keep options consistent across usages and prevent any errors.

### Modify default state

`usePreviewMode` will try to store the value of a `token` param from url in state. You can modify this state and it will be available for all [`usePreviewMode`](https://nuxt.com/docs/3.x/api/composables/use-preview-mode) calls.

::note
The `getState` function will append returned values to current state, so be careful not to accidentally overwrite important state.
::

### Customize the `onEnable` and `onDisable` callbacks

By default, when `usePreviewMode` is enabled, it will call `refreshNuxtData()` to re-fetch all data from the server.

When preview mode is disabled, the composable will attach a callback to call `refreshNuxtData()` to run after a subsequent router navigation.

You can specify custom callbacks to be triggered by providing your own functions for the `onEnable` and `onDisable` options.

The example below creates a page where part of a content is rendered only in preview mode.

Now you can generate your site and serve it:

Then you can see your preview page by adding the query param `preview` to the end of the page you want to see once, for example `http://localhost:3000/?preview=true`.

::note
`usePreviewMode` should be tested locally with `nuxt generate` and then `nuxt preview` rather than `nuxt dev`. (The [preview command](https://nuxt.com/docs/3.x/api/commands/preview) is not related to preview mode.)
::

**Examples:**

Example 1 (ts):

```ts
const { enabled, state } = usePreviewMode();
```

Example 2 (ts):

```ts
export function useMyPreviewMode() {
  const route = useRoute();
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview;
    },
  });
}
```

Example 3 (ts):

```ts
const data1 = ref('data1');

const { enabled, state } = usePreviewMode({
  getState: currentState => {
    return { data1, data2: 'data2' };
  },
});
```

Example 4 (ts):

```ts
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('preview mode has been enabled');
  },
  onDisable: () => {
    console.log('preview mode has been disabled');
  },
});
```

---

## Teleport

**URL:** llms-txt#teleport

Vue 3 provides the [`<Teleport>` component](https://vuejs.org/guide/built-ins/teleport.html){rel="&#x22;nofollow&#x22;"} which allows content to be rendered elsewhere in the DOM, outside of the Vue application.

This example shows how to use the `<Teleport>` with client-side and server-side rendering.

::read-more{to="https://nuxt.com/docs/api/components/teleports"}
::

## ::sandbox

branch: main
dir: examples/advanced/teleport
file: app.vue
repo: nuxt/examples

---

::

---

## Components

**URL:** llms-txt#components

**Contents:**

- `addComponentsDir`
  - Usage
  - Type
  - Parameters
- `addComponent`
  - Usage
  - Type
  - Parameters
  - Examples

Components are the building blocks of your Nuxt application. They are reusable Vue instances that can be used to create a user interface. In Nuxt, components from the components directory are automatically imported by default. However, if you need to import components from an alternative directory or wish to selectively import them as needed, `@nuxt/kit` provides the `addComponentsDir` and `addComponent` methods. These utils allow you to customize the component configuration to better suit your needs.

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/injecting-components-and-component-directories?friend=nuxt

---

Watch Vue School video about injecting components.
::

## `addComponentsDir`

Register a directory to be scanned for components and imported only when used. Keep in mind, that this does not register components globally, until you specify `global: true` option.

`dir` An object with the following properties:

| Property          | Type                                         | Required                                                                                                                    | Description                                                                                                                                                                                                                                                                         |
| ----------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`            | `string`                                     | `true`                                                                                                                      | Path (absolute or relative) to the directory containing your components. You can use Nuxt aliases (\~ or @) to refer to directories inside project or directly use an npm package path similar to require.                                                                          |
| `pattern`         | `string                                      | string[]`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`                                                                                                                                                                                                                                                                             | Accept Pattern that will be run against specified path.                                                                          |
| `ignore`          | `string[]`                                   | `false`                                                                                                                     | Ignore patterns that will be run against specified path.                                                                                                                                                                                                                            |
| `prefix`          | `string`                                     | `false`                                                                                                                     | Prefix all matched components with this string.                                                                                                                                                                                                                                     |
| `pathPrefix`      | `boolean`                                    | `false`                                                                                                                     | Prefix component name by its path.                                                                                                                                                                                                                                                  |
| `prefetch`        | `boolean`                                    | `false`                                                                                                                     | These properties (prefetch/preload) are used in production to configure how components with Lazy prefix are handled by webpack via its magic comments. Learn more on [webpack documentation](https://webpack.js.org/api/module-methods/#magic-comments){rel="&#x22;nofollow&#x22;"} |
| `preload`         | `boolean`                                    | `false`                                                                                                                     | These properties (prefetch/preload) are used in production to configure how components with Lazy prefix are handled by webpack via its magic comments. Learn more on [webpack documentation](https://webpack.js.org/api/module-methods/#magic-comments){rel="&#x22;nofollow&#x22;"} |
| `isAsync`         | `boolean`                                    | `false`                                                                                                                     | This flag indicates, component should be loaded async (with a separate chunk) regardless of using Lazy prefix or not.                                                                                                                                                               |
| `extendComponent` | `(component: Component) => Promise<Component | void>                                                                                                                       | (Component                                                                                                                                                                                                                                                                          | void)`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}         | `false` | A function that will be called for each component found in the directory. It accepts a component object and should return a component object or a promise that resolves to a component object. |
| `global`          | `boolean`                                    | `false`                                                                                                                     | If enabled, registers components to be globally available.                                                                                                                                                                                                                          |
| `island`          | `boolean`                                    | `false`                                                                                                                     | If enabled, registers components as islands. You can read more about islands in [`<NuxtIsland/>`](https://nuxt.com/docs/3.x/api/components/nuxt-island#nuxtisland) component description.                                                                                           |
| `watch`           | `boolean`                                    | `false`                                                                                                                     | Watch specified path for changes, including file additions and file deletions.                                                                                                                                                                                                      |
| `extensions`      | `string[]`                                   | `false`                                                                                                                     | Extensions supported by Nuxt builder.                                                                                                                                                                                                                                               |
| `transpile`       | `'auto'                                      | boolean`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}  | `false`                                                                                                                                                                                                                                                                             | Transpile specified path using build.transpile. If set to `'auto'`, it will set `transpile: true` if `node_modules/` is in path. |

| Property  | Type      | Required | Description                                                                                          |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `prepend` | `boolean` | `false`  | If set to `true`, the directory will be prepended to the array with `unshift()` instead of `push()`. |

Register a component to be automatically imported.

`options`: An object with the following properties:

| Property          | Type      | Required | Description                                                                                                                                                                                                                                                                         |
| ----------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | `string`  | `true`   | Component name.                                                                                                                                                                                                                                                                     |
| `filePath`        | `string`  | `true`   | Path to the component.                                                                                                                                                                                                                                                              |
| `declarationPath` | `string`  | `false`  | Path to component's declaration file. It is used to generate components' [type templates](https://nuxt.com/docs/3.x/api/kit/templates#addtypetemplate); if not provided, `filePath` is used instead.                                                                                |
| `pascalName`      | `string`  | `false`  | Pascal case component name. If not provided, it will be generated from the component name.                                                                                                                                                                                          |
| `kebabName`       | `string`  | `false`  | Kebab case component name. If not provided, it will be generated from the component name.                                                                                                                                                                                           |
| `export`          | `string`  | `false`  | Specify named or default export. If not provided, it will be set to `'default'`.                                                                                                                                                                                                    |
| `shortPath`       | `string`  | `false`  | Short path to the component. If not provided, it will be generated from the component path.                                                                                                                                                                                         |
| `chunkName`       | `string`  | `false`  | Chunk name for the component. If not provided, it will be generated from the component name.                                                                                                                                                                                        |
| `prefetch`        | `boolean` | `false`  | These properties (prefetch/preload) are used in production to configure how components with Lazy prefix are handled by webpack via its magic comments. Learn more on [webpack documentation](https://webpack.js.org/api/module-methods/#magic-comments){rel="&#x22;nofollow&#x22;"} |
| `preload`         | `boolean` | `false`  | These properties (prefetch/preload) are used in production to configure how components with Lazy prefix are handled by webpack via its magic comments. Learn more on [webpack documentation](https://webpack.js.org/api/module-methods/#magic-comments){rel="&#x22;nofollow&#x22;"} |
| `global`          | `boolean` | `false`  | If enabled, registers component to be globally available.                                                                                                                                                                                                                           |
| `island`          | `boolean` | `false`  | If enabled, registers component as island. You can read more about islands in [`<NuxtIsland/>`](https://nuxt.com/docs/3.x/api/components/nuxt-island#nuxtisland) component description.                                                                                             |
| `mode`            | `'client' | 'server' | 'all'`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                                                                                                                                                            | `false` | This options indicates if component should render on client, server or both. By default, it will render on both client and server. |
| `priority`        | `number`  | `false`  | Priority of the component, if multiple components have the same name, the one with the highest priority will be used.                                                                                                                                                               |

If you want to auto-import a component from an npm package, and the component is a named export (rather than the default), you can use the `export` option to specify it.

**Examples:**

Example 1 (ts):

```ts
export default defineNuxtModule({
  meta: {
    name: '@nuxt/ui',
    configKey: 'ui',
  },
  setup() {
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'U',
      pathPrefix: false,
    });
  },
});
```

Example 2 (ts):

```ts
function addComponentsDir(dir: ComponentsDir, opts: { prepend?: boolean } = {}): void;
```

Example 3 (ts):

```ts
import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: '@nuxt/image',
    configKey: 'image',
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    addComponent({
      name: 'NuxtImg',
      filePath: resolver.resolve('./runtime/components/NuxtImg.vue'),
    });

    addComponent({
      name: 'NuxtPicture',
      filePath: resolver.resolve('./runtime/components/NuxtPicture.vue'),
    });
  },
});
```

Example 4 (ts):

```ts
function addComponent(options: AddComponentOptions): void;
```

---

## useLazyAsyncData

**URL:** llms-txt#uselazyasyncdata

**Contents:**

- Usage
- Type
- Parameters
- Return Values
- Example

`useLazyAsyncData` provides a wrapper around [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) that triggers navigation before the handler is resolved by setting the `lazy` option to `true`.

::note
By default, [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) blocks navigation until its async handler is resolved. `useLazyAsyncData` allows navigation to occur immediately while data fetching continues in the background.
::

When using `useLazyAsyncData`, navigation will occur before fetching is complete. This means you must handle `pending` and `error` states directly within your component's template.

::warning
`useLazyAsyncData` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyAsyncData`.
::

`useLazyAsyncData` has the same signature as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data).

`useLazyAsyncData` accepts the same parameters as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data), with the `lazy` option automatically set to `true`.

## ::read-more

## to: https://nuxt.com/docs/3.x/api/composables/use-async-data#parameters

::

`useLazyAsyncData` returns the same values as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data).

## ::read-more

## to: https://nuxt.com/docs/3.x/api/composables/use-async-data#return-values

::

::read-more{to="https://nuxt.com/docs/3.x/getting-started/data-fetching"}
::

**Examples:**

Example 1 (unknown):

```unknown
When using `useLazyAsyncData`, navigation will occur before fetching is complete. This means you must handle `pending` and `error` states directly within your component's template.

::warning
`useLazyAsyncData` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyAsyncData`.
::

## Type
```

Example 2 (unknown):

```unknown
`useLazyAsyncData` has the same signature as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data).

## Parameters

`useLazyAsyncData` accepts the same parameters as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data), with the `lazy` option automatically set to `true`.

::read-more
---
to: https://nuxt.com/docs/3.x/api/composables/use-async-data#parameters
---
::

## Return Values

`useLazyAsyncData` returns the same values as [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data).

::read-more
---
to: https://nuxt.com/docs/3.x/api/composables/use-async-data#return-values
---
::

## Example
```

---

## Meta Tags

**URL:** llms-txt#meta-tags

**Contents:**

- Migration
  - useHead
  - Meta-components
  - Options API

Nuxt 3 provides several different ways to manage your meta tags:

1. Through your `nuxt.config`.
2. Through the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) [composable](https://nuxt.com/docs/3.x/getting-started/seo-meta)
3. Through [global meta components](https://nuxt.com/docs/3.x/getting-started/seo-meta)

You can customize `title`, `titleTemplate`, `base`, `script`, `noscript`, `style`, `meta`, `link`, `htmlAttrs` and `bodyAttrs`.

::tip
Nuxt currently uses [`Unhead`](https://github.com/unjs/unhead){rel=""nofollow""} to manage your meta tags, but implementation details may change.
::

::read-more{to="https://nuxt.com/docs/getting-started/seo-meta"}
::

1. In your `nuxt.config`, rename `head` to `meta`. Consider moving this shared meta configuration into your `app.vue` instead. (Note that objects no longer have a `hid` key for deduplication.)
2. If you need to access the component state with `head`, you should migrate to using [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) . You might also consider using the built-in meta-components.
3. If you need to use the Options API, there is a `head()` method you can use when you use `defineNuxtComponent`.

Nuxt 3 also provides meta components that you can use to accomplish the same task. While these components look similar to HTML tags, they are provided by Nuxt and have similar functionality.

::important

1. Make sure you use capital letters for these component names to distinguish them from native HTML elements (`<Title>` rather than `<title>`).
2. You can place these components anywhere in your template for your page.
   ::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

### Meta-components

Nuxt 3 also provides meta components that you can use to accomplish the same task. While these components look similar to HTML tags, they are provided by Nuxt and have similar functionality.

::code-group
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

::important
1. Make sure you use capital letters for these component names to distinguish them from native HTML elements (`<Title>` rather than `<title>`).
2. You can place these components anywhere in your template for your page.
::

### Options API
```

---

## Layers

**URL:** llms-txt#layers

This example shows how to use the `extends` key in `nuxt.config.ts` to use the `base/` directory as a base Nuxt application, and use its components, composables or config and override them if necessary.

::read-more{to="https://nuxt.com/docs/getting-started/layers"}
::

## ::sandbox

branch: main
dir: examples/advanced/config-extends
file: nuxt.config.ts
repo: nuxt/examples

---

::

---

## Module Author Guide

**URL:** llms-txt#module-author-guide

**Contents:**

- Quick Start
  - Using the Starter
- Developing Modules
  - Module Anatomy
  - Tooling
  - Recipes
  - Testing
  - Best Practices
- Ecosystem
  - Module Types

Nuxt's [configuration](https://nuxt.com/docs/3.x/api/nuxt-config) and [hooks](https://nuxt.com/docs/3.x/guide/going-further/hooks) systems make it possible to customize every aspect of Nuxt and add any integration you might need (Vue plugins, CMS, server routes, components, logging, etc.).

**Nuxt Modules** are functions that sequentially run when starting Nuxt in development mode using `nuxt dev` or building a project for production with `nuxt build`.
With modules, you can encapsulate, properly test, and share custom solutions as npm packages without adding unnecessary boilerplate to your project, or requiring changes to Nuxt itself.

We recommend you get started with Nuxt Modules using our [starter template](https://github.com/nuxt/starter/tree/module){rel="&#x22;nofollow&#x22;"}:

::code-group{sync="pm"}

This will create a `my-module` project with all the boilerplate necessary to develop and publish your module.

1. Open `my-module` in your IDE of choice
2. Install dependencies using your favorite package manager
3. Prepare local files for development using `npm run dev:prepare`
4. Follow this document to learn more about Nuxt Modules

### Using the Starter

Learn how to perform basic tasks with the module starter.

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/navigating-the-official-starter-template?friend=nuxt

---

Watch Vue School video about Nuxt module starter template.
::

While your module source code lives inside the `src` directory, in most cases, to develop a module, you need a Nuxt application. That's what the `playground` directory is about. It's a Nuxt application you can tinker with that is already configured to run with your module.

You can interact with the playground like with any Nuxt application.

- Launch its development server with `npm run dev`, it should reload itself as you make changes to your module in the `src` directory
- Build it with `npm run dev:build`

::note
All other `nuxt` commands can be used against the `playground` directory (e.g. `nuxt <COMMAND> playground`). Feel free to declare additional `dev:*` scripts within your `package.json` referencing them for convenience.
::

The module starter comes with a basic test suite:

- A linter powered by [ESLint](https://eslint.org){rel="&#x22;nofollow&#x22;"}, run it with `npm run lint`
- A test runner powered by [Vitest](https://vitest.dev){rel="&#x22;nofollow&#x22;"}, run it with `npm run test` or `npm run test:watch`

::tip
Feel free to augment this default test strategy to better suit your needs.
::

Nuxt Modules come with their own builder provided by [`@nuxt/module-builder`](https://github.com/nuxt/module-builder#readme){rel="&#x22;nofollow&#x22;"}. This builder doesn't require any configuration on your end, supports TypeScript, and makes sure your assets are properly bundled to be distributed to other Nuxt applications.

You can build your module by running `npm run prepack`.

::tip
While building your module can be useful in some cases, most of the time you won't need to build it on your own: the `playground` takes care of it while developing, and the release script also has you covered when publishing.
::

::important
Before publishing your module to npm, makes sure you have an [npmjs.com](https://www.npmjs.com){rel=""nofollow""} account and that you're authenticated to it locally with `npm login`.
::

While you can publish your module by bumping its version and using the `npm publish` command, the module starter comes with a release script that helps you make sure you publish a working version of your module to npm and more.

To use the release script, first, commit all your changes (we recommend you follow [Conventional Commits](https://www.conventionalcommits.org){rel="&#x22;nofollow&#x22;"} to also take advantage of automatic version bump and changelog update), then run the release script with `npm run release`.

When running the release script, the following will happen:

- First, it will run your test suite by:

- Running the linter (`npm run lint`)
  - Running unit, integration, and e2e tests (`npm run test`)
  - Building the module (`npm run prepack`)
- Then, if your test suite went well, it will proceed to publish your module by:

- Bumping your module version and generating a changelog according to your Conventional Commits
  - Publishing the module to npm (for that purpose, the module will be built again to ensure its updated version number is taken into account in the published artifact)
  - Pushing a git tag representing the newly published version to your git remote origin

::tip
As with other scripts, feel free to fine-tune the default `release` script in your `package.json` to better suit your needs.
::

## Developing Modules

Nuxt Modules come with a variety of powerful APIs and patterns allowing them to alter a Nuxt application in pretty much any way possible. This section teaches you how to take advantage of those.

We can consider two kinds of Nuxt Modules:

- published modules are distributed on npm - you can see a list of some community modules on [the Nuxt website](https://nuxt.com/modules).
- "local" modules, they exist within a Nuxt project itself, either [inlined in Nuxt config](https://nuxt.com/docs/3.x/api/nuxt-config#modules) or as part of [the `modules` directory](https://nuxt.com/docs/3.x/directory-structure/modules).

In either case, their anatomy is similar.

#### Module Definition

::note
When using the starter, your module definition is available at `src/module.ts`.
::

The module definition is the entry point of your module. It's what gets loaded by Nuxt when your module is referenced within a Nuxt configuration.

At a low level, a Nuxt Module definition is a simple, potentially asynchronous, function accepting inline user options and a `nuxt` object to interact with Nuxt.

You can get type-hint support for this function using the higher-level `defineNuxtModule` helper provided by [Nuxt Kit](https://nuxt.com/docs/3.x/guide/going-further/kit).

However, **we do not recommend** using this low-level function definition. Instead, to define a module, **we recommend** using the object-syntax with `meta` property to identify your module, especially when publishing to npm.

This helper makes writing Nuxt modules more straightforward by implementing many common patterns needed by modules, guaranteeing future compatibility and improving the experience for both module authors and users.

Ultimately `defineNuxtModule` returns a wrapper function with the lower level `(inlineOptions, nuxt)` module signature. This wrapper function applies defaults and other necessary steps before calling your `setup` function:

- Support `defaults` and `meta.configKey` for automatically merging module options
- Type hints and automated type inference
- Add shims for basic Nuxt 2 compatibility
- Ensure module gets installed only once using a unique key computed from `meta.name` or `meta.configKey`
- Automatically register Nuxt hooks
- Automatically check for compatibility issues based on module meta
- Expose `getOptions` and `getMeta` for internal usage of Nuxt
- Ensuring backward and upward compatibility as long as the module is using `defineNuxtModule` from the latest version of `@nuxt/kit`
- Integration with module builder tooling

#### Runtime Directory

::note
When using the starter, the runtime directory is available at `src/runtime`.
::

Modules, like everything in a Nuxt configuration, aren't included in your application runtime. However, you might want your module to provide, or inject runtime code to the application it's installed on. That's what the runtime directory enables you to do.

Inside the runtime directory, you can provide any kind of assets related to the Nuxt App:

- Vue components
- Composables
- [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins)

To the [server engine](https://nuxt.com/docs/3.x/guide/concepts/server-engine), Nitro:

- API routes
- Middlewares
- Nitro plugins

Or any other kind of asset you want to inject in users' Nuxt applications:

- Stylesheets
- 3D models
- Images
- etc.

You'll then be able to inject all those assets inside the application from your [module definition](https://nuxt.com/#module-definition).

::tip
Learn more about asset injection in [the recipes section](https://nuxt.com/#recipes).
::

::warning
Published modules cannot leverage auto-imports for assets within their runtime directory. Instead, they have to import them explicitly from `#imports` or alike.
:br :br
Indeed, auto-imports are not enabled for files within `node_modules` (the location where a published module will eventually live) for performance reasons.
::

Modules come with a set of first-party tools to help you with their development.

#### `@nuxt/module-builder`

[Nuxt Module Builder](https://github.com/nuxt/module-builder#readme){rel="&#x22;nofollow&#x22;"} is a zero-configuration build tool taking care of all the heavy lifting to build and ship your module. It ensures proper compatibility of your module build artifact with Nuxt applications.

[Nuxt Kit](https://nuxt.com/docs/3.x/guide/going-further/kit) provides composable utilities to help your module interact with Nuxt applications. It's recommended to use Nuxt Kit utilities over manual alternatives whenever possible to ensure better compatibility and code readability of your module.

::read-more{to="https://nuxt.com/docs/guide/going-further/kit"}
::

#### `@nuxt/test-utils`

[Nuxt Test Utils](https://nuxt.com/docs/3.x/getting-started/testing) is a collection of utilities to help set up and run Nuxt applications within your module tests.

Find here common patterns used to author modules.

#### Altering Nuxt Configuration

Nuxt configuration can be read and altered by modules. Here's an example of a module enabling an experimental feature.

When you need to handle more complex configuration alterations, you should consider using [defu](https://github.com/unjs/defu){rel="&#x22;nofollow&#x22;"}.

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/extending-and-altering-nuxt-configuration-and-options?friend=nuxt

---

Watch Vue School video about altering Nuxt configuration.
::

#### Exposing Options to Runtime

Because modules aren't part of the application runtime, their options aren't either. However, in many cases, you might need access to some of these module options within your runtime code. We recommend exposing the needed config using Nuxt's [`runtimeConfig`](https://nuxt.com/docs/3.x/api/nuxt-config#runtimeconfig).

Note that we use [`defu`](https://github.com/unjs/defu){rel="&#x22;nofollow&#x22;"} to extend the public runtime configuration the user provides instead of overwriting it.

You can then access your module options in a plugin, component, the application like any other runtime configuration:

::warning
Be careful not to expose any sensitive module configuration on the public runtime config, such as private API keys, as they will end up in the public bundle.
::

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/passing-and-exposing-module-options?friend=nuxt

---

Watch Vue School video about passing and exposing Nuxt module options.
::

#### Injecting Plugins With `addPlugin`

Plugins are a common way for a module to add runtime logic. You can use the `addPlugin` utility to register them from your module.

::read-more{to="https://nuxt.com/docs/guide/going-further/kit"}
::

#### Injecting Vue Components With `addComponent`

If your module should provide Vue components, you can use the `addComponent` utility to add them as auto-imports for Nuxt to resolve.

Alternatively, you can add an entire directory by using `addComponentsDir`.

#### Injecting Composables With `addImports` and `addImportsDir`

If your module should provide composables, you can use the `addImports` utility to add them as auto-imports for Nuxt to resolve.

Alternatively, you can add an entire directory by using `addImportsDir`.

#### Injecting Server Routes With `addServerHandler`

You can also add a dynamic server route:

#### Injecting Other Assets

If your module should provide other kinds of assets, they can also be injected. Here's a simple example module injecting a stylesheet through Nuxt's `css` array.

And a more advanced one, exposing a folder of assets through [Nitro](https://nuxt.com/docs/3.x/guide/concepts/server-engine)'s `publicAssets` option:

#### Using Other Modules in Your Module

If your module depends on other modules, you can specify them using the `moduleDependencies` option. This provides a more robust way to handle module dependencies with version constraints and configuration merging:

::callout{type="info"}
The `moduleDependencies` option replaces the deprecated `installModule` function and ensures proper setup order and configuration merging.
::

[Lifecycle hooks](https://nuxt.com/docs/3.x/guide/going-further/hooks) allow you to expand almost every aspect of Nuxt. Modules can hook to them programmatically or through the `hooks` map in their definition.

::read-more{to="https://nuxt.com/docs/api/advanced/hooks"}
::

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/nuxt-lifecycle-hooks?friend=nuxt

---

Watch Vue School video about using Nuxt lifecycle hooks in modules.
::

::note
**Module cleanup**

If your module opens, handles, or starts a watcher, you should close it when the Nuxt lifecycle is done. The `close` hook is available for this.

Modules can also define and call their own hooks, which is a powerful pattern for making your module extensible.

If you expect other modules to be able to subscribe to your module's hooks, you should call them in the `modules:done` hook. This ensures that all other modules have had a chance to be set up and register their listeners to your hook during their own `setup` function.

#### Adding Templates/Virtual Files

If you need to add a virtual file that can be imported into the user's app, you can use the `addTemplate` utility.

For the server, you should use the `addServerTemplate` utility instead.

#### Adding Type Declarations

You might also want to add a type declaration to the user's project (for example, to augment a Nuxt interface
or provide a global type of your own). For this, Nuxt provides the `addTypeTemplate` utility that both
writes a template to the disk and adds a reference to it in the generated `nuxt.d.ts` file.

If your module should augment types handled by Nuxt, you can use `addTypeTemplate` to perform this operation:

If you need more granular control, you can use the `prepare:types` hook to register a callback that will inject your types.

##### Updating Templates

If you need to update your templates/virtual files, you can leverage the `updateTemplates` utility like this :

Testing helps ensuring your module works as expected given various setup. Find in this section how to perform various kinds of tests against your module.

#### Unit and Integration

::tip
We're still discussing and exploring how to ease unit and integration testing on Nuxt Modules.
:br :br[Check out this RFC to join the conversation](https://github.com/nuxt/nuxt/discussions/18399){rel=""nofollow""}.
::

[Nuxt Test Utils](https://nuxt.com/docs/3.x/getting-started/testing) is the go-to library to help you test your module in an end-to-end way. Here's the workflow to adopt with it:

1. Create a Nuxt application to be used as a "fixture" inside `test/fixtures/*`
2. Setup Nuxt with this fixture inside your test file
3. Interact with the fixture using utilities from `@nuxt/test-utils` (e.g. fetching a page)
4. Perform checks related to this fixture (e.g. "HTML contains ...")
5. Repeat

In practice, the fixture:

::tip
An example of such a workflow is available on [the module starter](https://github.com/nuxt/starter/blob/module/test/basic.test.ts){rel=""nofollow""}.
::

#### Manual QA With Playground and Externally

Having a playground Nuxt application to test your module when developing it is really useful. [The module starter integrates one for that purpose](https://nuxt.com/#how-to-develop).

You can test your module with other Nuxt applications (applications that are not part of your module repository) locally. To do so, you can use [`npm pack`](https://docs.npmjs.com/cli/commands/npm-pack/){rel="&#x22;nofollow&#x22;"} command, or your package manager equivalent, to create a tarball from your module. Then in your test project, you can add your module to `package.json` packages as: `"my-module": "file:/path/to/tarball.tgz"`.

After that, you should be able to reference `my-module` like in any regular project.

With great power comes great responsibility. While modules are powerful, here are some best practices to keep in mind while authoring modules to keep applications performant and developer experience great.

As we've seen, Nuxt Modules can be asynchronous. For example, you may want to develop a module that needs fetching some API or calling an async function.

However, be careful with asynchronous behaviors as Nuxt will wait for your module to setup before going to the next module and starting the development server, build process, etc. Prefer deferring time-consuming logic to Nuxt hooks.

::warning
If your module takes more than **1 second** to setup, Nuxt will emit a warning about it.
::

#### Always Prefix Exposed Interfaces

Nuxt Modules should provide an explicit prefix for any exposed configuration, plugin, API, composable, or component to avoid conflict with other modules and internals.

Ideally, you should prefix them with your module's name (e.g. if your module is called `nuxt-foo`, expose `<FooButton>` and `useFooBar()` and **not** `<Button>` and `useBar()`).

#### Use Lifecycle Hooks for One-Time Setup

When your module needs to perform one-time setup tasks (like generating configuration files, setting up databases, or installing dependencies), use lifecycle hooks instead of running the logic in your main `setup` function.

This pattern prevents unnecessary work on every build and provides a better developer experience. See the [lifecycle hooks documentation](https://nuxt.com/docs/3.x/api/kit/modules#using-lifecycle-hooks-for-module-installation-and-upgrade) for more details.

#### Be TypeScript Friendly

Nuxt has first-class TypeScript integration for the best developer experience.

Exposing types and using TypeScript to develop modules benefits users even when not using TypeScript directly.

#### Avoid CommonJS Syntax

Nuxt relies on native ESM. Please read [Native ES Modules](https://nuxt.com/docs/3.x/guide/concepts/esm) for more information.

#### Document Module Usage

Consider documenting module usage in the readme file:

- Why use this module?
- How to use this module?
- What does this module do?

Linking to the integration website and documentation is always a good idea.

#### Provide a StackBlitz Demo or Boilerplate

It's a good practice to make a minimal reproduction with your module and [StackBlitz](https://nuxt.new/s/v4){rel="&#x22;nofollow&#x22;"} that you add to your module readme.

This not only provides potential users of your module a quick and easy way to experiment with the module but also an easy way for them to build minimal reproductions they can send you when they encounter issues.

#### Do Not Advertise With a Specific Nuxt Version

Nuxt, Nuxt Kit, and other new toolings are made to have both forward and backward compatibility in mind.

Please use "X for Nuxt" instead of "X for Nuxt 3" to avoid fragmentation in the ecosystem and prefer using `meta.compatibility` to set Nuxt version constraints.

#### Stick With Starter Defaults

The module starter comes with a default set of tools and configurations (e.g. ESLint configuration). If you plan on open-sourcing your module, sticking with those defaults ensures your module shares a consistent coding style with other [community modules](https://nuxt.com/modules) out there, making it easier for others to contribute.

[Nuxt Module ecosystem](https://nuxt.com/modules) represents more than 15 million monthly NPM downloads and provides extended functionalities and integrations with all sort of tools. You can be part of this ecosystem!

## ::tip

icon: i-lucide-video
target: \_blank
to: https://vueschool.io/lessons/exploring-nuxt-modules-ecosystem-and-module-types?friend=nuxt

---

Watch Vue School video about Nuxt module types.
::

**Official modules** are modules prefixed (scoped) with `@nuxt/` (e.g. [`@nuxt/content`](https://content.nuxtjs.org){rel="&#x22;nofollow&#x22;"}). They are made and maintained actively by the Nuxt team. Like with the framework, contributions from the community are more than welcome to help make them better!

**Community modules** are modules prefixed (scoped) with `@nuxtjs/` (e.g. [`@nuxtjs/tailwindcss`](https://tailwindcss.nuxtjs.org){rel="&#x22;nofollow&#x22;"}). They are proven modules made and maintained by community members. Again, contributions are welcome from anyone.

**Third-party and other community modules** are modules (often) prefixed with `nuxt-`. Anyone can make them, using this prefix allows these modules to be discoverable on npm. This is the best starting point to draft and try an idea!

**Private or personal modules** are modules made for your own use case or company. They don't need to follow any naming rules to work with Nuxt and are often seen scoped under an npm organization (e.g. `@my-company/nuxt-auth`)

### Listing Your Community Module

Any community modules are welcome to be listed on [the module list](https://nuxt.com/modules). To be listed, [open an issue in the nuxt/modules](https://github.com/nuxt/modules/issues/new?template=module_request.yml){rel="&#x22;nofollow&#x22;"} repository. The Nuxt team can help you to apply best practices before listing.

### Joining `nuxt-modules` and `@nuxtjs/`

By moving your modules to [nuxt-modules](https://github.com/nuxt-modules){rel="&#x22;nofollow&#x22;"}, there is always someone else to help, and this way, we can join forces to make one perfect solution.

If you have an already published and working module, and want to transfer it to `nuxt-modules`, [open an issue in nuxt/modules](https://github.com/nuxt/modules/issues/new){rel="&#x22;nofollow&#x22;"}.

By joining `nuxt-modules` we can rename your community module under the `@nuxtjs/` scope and provide a subdomain (e.g. `my-module.nuxtjs.org`) for its documentation.

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

This will create a `my-module` project with all the boilerplate necessary to develop and publish your module.

**Next steps:**

1. Open `my-module` in your IDE of choice
2. Install dependencies using your favorite package manager
3. Prepare local files for development using `npm run dev:prepare`
4. Follow this document to learn more about Nuxt Modules

### Using the Starter

Learn how to perform basic tasks with the module starter.

::tip
---
icon: i-lucide-video
target: _blank
to: https://vueschool.io/lessons/navigating-the-official-starter-template?friend=nuxt
---
Watch Vue School video about Nuxt module starter template.
::

#### How to Develop

While your module source code lives inside the `src` directory, in most cases, to develop a module, you need a Nuxt application. That's what the `playground` directory is about. It's a Nuxt application you can tinker with that is already configured to run with your module.

You can interact with the playground like with any Nuxt application.

- Launch its development server with `npm run dev`, it should reload itself as you make changes to your module in the `src` directory
- Build it with `npm run dev:build`

::note
All other `nuxt` commands can be used against the `playground` directory (e.g. `nuxt <COMMAND> playground`). Feel free to declare additional `dev:*` scripts within your `package.json` referencing them for convenience.
::

#### How to Test

The module starter comes with a basic test suite:

- A linter powered by [ESLint](https://eslint.org){rel="&#x22;nofollow&#x22;"}, run it with `npm run lint`
- A test runner powered by [Vitest](https://vitest.dev){rel="&#x22;nofollow&#x22;"}, run it with `npm run test` or `npm run test:watch`

::tip
Feel free to augment this default test strategy to better suit your needs.
::

#### How to Build

Nuxt Modules come with their own builder provided by [`@nuxt/module-builder`](https://github.com/nuxt/module-builder#readme){rel="&#x22;nofollow&#x22;"}. This builder doesn't require any configuration on your end, supports TypeScript, and makes sure your assets are properly bundled to be distributed to other Nuxt applications.

You can build your module by running `npm run prepack`.

::tip
While building your module can be useful in some cases, most of the time you won't need to build it on your own: the `playground` takes care of it while developing, and the release script also has you covered when publishing.
::

#### How to Publish

::important
Before publishing your module to npm, makes sure you have an [npmjs.com](https://www.npmjs.com){rel=""nofollow""} account and that you're authenticated to it locally with `npm login`.
::

While you can publish your module by bumping its version and using the `npm publish` command, the module starter comes with a release script that helps you make sure you publish a working version of your module to npm and more.

To use the release script, first, commit all your changes (we recommend you follow [Conventional Commits](https://www.conventionalcommits.org){rel="&#x22;nofollow&#x22;"} to also take advantage of automatic version bump and changelog update), then run the release script with `npm run release`.

When running the release script, the following will happen:

- First, it will run your test suite by:


  - Running the linter (`npm run lint`)
  - Running unit, integration, and e2e tests (`npm run test`)
  - Building the module (`npm run prepack`)
- Then, if your test suite went well, it will proceed to publish your module by:


  - Bumping your module version and generating a changelog according to your Conventional Commits
  - Publishing the module to npm (for that purpose, the module will be built again to ensure its updated version number is taken into account in the published artifact)
  - Pushing a git tag representing the newly published version to your git remote origin

::tip
As with other scripts, feel free to fine-tune the default `release` script in your `package.json` to better suit your needs.
::

## Developing Modules

Nuxt Modules come with a variety of powerful APIs and patterns allowing them to alter a Nuxt application in pretty much any way possible. This section teaches you how to take advantage of those.

### Module Anatomy

We can consider two kinds of Nuxt Modules:

- published modules are distributed on npm - you can see a list of some community modules on [the Nuxt website](https://nuxt.com/modules).
- "local" modules, they exist within a Nuxt project itself, either [inlined in Nuxt config](https://nuxt.com/docs/3.x/api/nuxt-config#modules) or as part of [the `modules` directory](https://nuxt.com/docs/3.x/directory-structure/modules).

In either case, their anatomy is similar.

#### Module Definition

::note
When using the starter, your module definition is available at `src/module.ts`.
::

The module definition is the entry point of your module. It's what gets loaded by Nuxt when your module is referenced within a Nuxt configuration.

At a low level, a Nuxt Module definition is a simple, potentially asynchronous, function accepting inline user options and a `nuxt` object to interact with Nuxt.
```

---

## content

**URL:** llms-txt#content

**Contents:**

- Enable Nuxt Content
- Create Content

[Nuxt Content](https://content.nuxt.com){rel="&#x22;nofollow&#x22;"} reads the [`content/` directory](https://nuxt.com/docs/3.x/directory-structure/content) in your project and parses `.md`, `.yml`, `.csv` and `.json` files to create a file-based CMS for your application.

- Render your content with built-in components.
- Query your content with a MongoDB-like API.
- Use your Vue components in Markdown files with the MDC syntax.
- Automatically generate your navigation.

::read-more{target="\_blank" to="https://content.nuxt.com"}
Learn more in **Nuxt Content** documentation.
::

## Enable Nuxt Content

Install the `@nuxt/content` module in your project as well as adding it to your `nuxt.config.ts` with one command:

Place your markdown files inside the `content/` directory:

````md [content/index.md]
**Examples:**

Example 1 (unknown):

```unknown
## Create Content

Place your markdown files inside the `content/` directory:
```
````

---

## preloadComponents

**URL:** llms-txt#preloadcomponents

Preloading components loads components that your page will need very soon, which you want to start loading early in rendering lifecycle. This ensures they are available earlier and are less likely to block the page's render, improving performance.

Use `preloadComponents` to manually preload individual components that have been registered globally in your Nuxt app. By default Nuxt registers these as async components. You must use the Pascal-cased version of the component name.

::note
On server, `preloadComponents` will have no effect.
::

**Examples:**

Example 1 (ts):

```ts
await preloadComponents('MyGlobalComponent');

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2']);
```

---

## showError

**URL:** llms-txt#showerror

Within the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) you can use `showError` to show an error.

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

The error is set in the state using [`useError()`](https://nuxt.com/docs/3.x/api/composables/use-error) to create a reactive and SSR-friendly shared error state across components.

::tip
`showError` calls the `app:error` hook.
::

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

**Examples:**

Example 1 (ts):

```ts
showError('😱 Oh no, an error has been thrown.');
showError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
});
```

---

## refreshNuxtData

**URL:** llms-txt#refreshnuxtdata

**Contents:**

- Type
- Parameters
- Return Values
- Examples
  - Refresh All Data
  - Refresh Specific Data

`refreshNuxtData` is used to refetch all or specific `asyncData` instances, including those from [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data), [`useLazyAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-lazy-async-data), [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch), and [`useLazyFetch`](https://nuxt.com/docs/3.x/api/composables/use-lazy-fetch).

::note
If your component is cached by `<KeepAlive>` and enters a deactivated state, the `asyncData` inside the component will still be refetched until the component is unmounted.
::

- `keys`: A single string or an array of strings as `keys` that are used to fetch the data. This parameter is **optional**. All [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) keys are re-fetched when no `keys` are explicitly specified.

`refreshNuxtData` returns a promise, resolving when all or specific `asyncData` instances have been refreshed.

This example below refreshes all data being fetched using `useAsyncData` and `useFetch` in Nuxt application.

### Refresh Specific Data

This example below refreshes only data where the key matches to `count` and `user`.

::note
If you have access to the `asyncData` instance, it is recommended to use its `refresh` or `execute` method as the preferred way to refetch the data.
::

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

**Examples:**

Example 1 (unknown):

```unknown
## Parameters

- `keys`: A single string or an array of strings as `keys` that are used to fetch the data. This parameter is **optional**. All [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) keys are re-fetched when no `keys` are explicitly specified.

## Return Values

`refreshNuxtData` returns a promise, resolving when all or specific `asyncData` instances have been refreshed.

## Examples

### Refresh All Data

This example below refreshes all data being fetched using `useAsyncData` and `useFetch` in Nuxt application.
```

Example 2 (unknown):

```unknown
### Refresh Specific Data

This example below refreshes only data where the key matches to `count` and `user`.
```

---

## useRouteAnnouncer

**URL:** llms-txt#userouteannouncer

**Contents:**

- Description
- Parameters
- Properties
  - `message`
  - `politeness`
- Methods
  - `set(message, politeness = "polite")`
  - `polite(message)`
  - `assertive(message)`
- Example

::important
This composable is available in Nuxt v3.12+.
::

A composable which observes the page title changes and updates the announcer message accordingly. Used by [`<NuxtRouteAnnouncer>`](https://nuxt.com/docs/3.x/api/components/nuxt-route-announcer) and controllable.
It hooks into Unhead's [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered){rel="&#x22;nofollow&#x22;"} to read the page's title and set it as the announcer message.

- `politeness`: Sets the urgency for screen reader announcements: `off` (disable the announcement), `polite` (waits for silence), or `assertive` (interrupts immediately). (default `polite`).

- **type**: `Ref<string>`
- **description**: The message to announce

- **type**: `Ref<string>`
- **description**: Screen reader announcement urgency level `off`, `polite`, or `assertive`

### `set(message, politeness = "polite")`

Sets the message to announce with its urgency level.

### `polite(message)`

Sets the message with `politeness = "polite"`

### `assertive(message)`

Sets the message with `politeness = "assertive"`

---

## Custom useFetch in Nuxt

**URL:** llms-txt#custom-usefetch-in-nuxt

**Contents:**

- Custom `$fetch`
- Custom `useFetch`/`useAsyncData`

When working with Nuxt, you might be making the frontend and fetching an external API, and you might want to set some default options for fetching from your API.

The [`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch) utility function (used by the [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) composable) is intentionally not globally configurable. This is important so that fetching behavior throughout your application remains consistent, and other integrations (like modules) can rely on the behavior of core utilities like `$fetch`.

However, Nuxt provides a way to create a custom fetcher for your API (or multiple fetchers if you have multiple APIs to call).

Let's create a custom `$fetch` instance with a [Nuxt plugin](https://nuxt.com/docs/3.x/directory-structure/plugins).

::note
`$fetch` is a configured instance of [ofetch](https://github.com/unjs/ofetch){rel=""nofollow""} which supports adding the base URL of your Nuxt server as well as direct function calls during SSR (avoiding HTTP roundtrips).
::

Let's pretend here that:

- The main API is <https://api.nuxt.com>{rel="&#x22;nofollow&#x22;"}
- We are storing the JWT token in a session with [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils){rel="&#x22;nofollow&#x22;"}
- If the API responds with a `401` status code, we redirect the user to the `/login` page

With this Nuxt plugin, `$api` is exposed from `useNuxtApp()` to make API calls directly from the Vue components:

::callout
Wrapping with [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) **avoid double data fetching when doing server-side rendering** (server & client on hydration).
::

## Custom `useFetch`/`useAsyncData`

Now that `$api` has the logic we want, let's create a `useAPI` composable to replace the usage of `useAsyncData` + `$api`:

Let's use the new composable and have a nice and clean component:

If you want to customize the type of any error returned, you can also do so:

::note
This example demonstrates how to use a custom `useFetch`, but the same structure is identical for a custom `useAsyncData`.
::

## ::link-example

## to: https://nuxt.com/docs/examples/advanced/use-custom-fetch-composable

::

## ::video-accordion

title: Watch a video about custom $fetch and Repository Pattern in Nuxt
video-id: jXH8Tr-exhI

---

::

::note
We are currently discussing to find a cleaner way to let you create a custom fetcher, see <https://github.com/nuxt/nuxt/issues/14736>{rel=""nofollow""}.
::

**Examples:**

Example 1 (unknown):

```unknown
With this Nuxt plugin, `$api` is exposed from `useNuxtApp()` to make API calls directly from the Vue components:
```

Example 2 (unknown):

```unknown
::callout
Wrapping with [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) **avoid double data fetching when doing server-side rendering** (server & client on hydration).
::

## Custom `useFetch`/`useAsyncData`

Now that `$api` has the logic we want, let's create a `useAPI` composable to replace the usage of `useAsyncData` + `$api`:
```

Example 3 (unknown):

```unknown
Let's use the new composable and have a nice and clean component:
```

Example 4 (unknown):

```unknown
If you want to customize the type of any error returned, you can also do so:
```

---

## useLoadingIndicator

**URL:** llms-txt#useloadingindicator

**Contents:**

- Description
- Parameters
- Properties
  - `isLoading`
  - `error`
  - `progress`
- Methods
  - `start()`
  - `set()`
  - `finish()`

A composable which returns the loading state of the page. Used by [`<NuxtLoadingIndicator>`](https://nuxt.com/docs/3.x/api/components/nuxt-loading-indicator) and controllable.
It hooks into [`page:loading:start`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) and [`page:loading:end`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) to change its state.

- `duration`: Duration of the loading bar, in milliseconds (default `2000`).
- `throttle`: Throttle the appearing and hiding, in milliseconds (default `200`).
- `estimatedProgress`: By default Nuxt will back off as it approaches 100%. You can provide a custom function to customize the progress estimation, which is a function that receives the duration of the loading bar (above) and the elapsed time. It should return a value between 0 and 100.

- **type**: `Ref<boolean>`
- **description**: The loading state

- **type**: `Ref<boolean>`
- **description**: The error state

- **type**: `Ref<number>`
- **description**: The progress state. From `0` to `100`.

Set `isLoading` to true and start to increase the `progress` value. `start` accepts a `{ force: true }` option to skip the interval and show the loading state immediately.

Set the `progress` value to a specific value. `set` accepts a `{ force: true }` option to skip the interval and show the loading state immediately.

Set the `progress` value to `100`, stop all timers and intervals then reset the loading state `500` ms later. `finish` accepts a `{ force: true }` option to skip the interval before the state is reset, and `{ error: true }` to change the loading bar color and set the error property to true.

Used by `finish()`. Clear all timers and intervals used by the composable.

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // This is how progress is calculated by default
    estimatedProgress: (duration, elapsed) => (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50),
  });
</script>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator();
  // same as set(0, { force: true })
  // set the progress to 0, and show loading immediately
  start({ force: true });
</script>
```

---

## useCookie

**URL:** llms-txt#usecookie

::read-more{to="https://nuxt.com/docs/api/composables/use-cookie"}
::

## ::sandbox

branch: main
dir: examples/advanced/use-cookie
file: app.vue
repo: nuxt/examples

---

::

---

## useResponseHeader

**URL:** llms-txt#useresponseheader

**Contents:**

- Example

::important
This composable is available in Nuxt v3.14+.
::

You can use the built-in [`useResponseHeader`](https://nuxt.com/docs/3.x/api/composables/use-response-header) composable to set any server response header within your pages, components, and plugins.

We can use `useResponseHeader` to easily set a response header on a per-page basis.

We can use `useResponseHeader` for example in Nuxt [middleware](https://nuxt.com/docs/3.x/directory-structure/middleware) to set a response header for all pages.

**Examples:**

Example 1 (ts):

```ts
// Set a custom response header
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
```

Example 2 (unknown):

```unknown
We can use `useResponseHeader` for example in Nuxt [middleware](https://nuxt.com/docs/3.x/directory-structure/middleware) to set a response header for all pages.
```

---

## useServerSeoMeta

**URL:** llms-txt#useserverseometa

Just like [`useSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-seo-meta), `useServerSeoMeta` composable lets you define your site's SEO meta tags as a flat object with full TypeScript support.

::read-more{to="https://nuxt.com/docs/api/composables/use-seo-meta"}
::

In most instances, the meta doesn't need to be reactive as robots will only scan the initial load. So we recommend using [`useServerSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-server-seo-meta) as a performance-focused utility that will not do anything (or return a `head` object) on the client.

Parameters are exactly the same as with [`useSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-seo-meta)

::read-more{to="https://nuxt.com/docs/getting-started/seo-meta"}
::

---

## Legacy Composition API

**URL:** llms-txt#legacy-composition-api

**Contents:**

- Remove Modules
- Using `@vue/composition-api`
- Migrating from `@nuxtjs/composition-api`
  - Remove `@nuxtjs/composition-api/module` from your buildModules
  - Set `bridge.capi`
  - useFetch
  - `defineNuxtMiddleware`
  - `defineNuxtPlugin`
  - `useRouter` and `useRoute`

Nuxt Bridge provides access to Composition API syntax. It is specifically designed to be aligned with Nuxt 3. Because of this, there are a few extra steps to take when enabling Nuxt Bridge, if you have been using the Composition API previously.

- Remove `@vue/composition-api` from your dependencies.
- Remove `@nuxtjs/composition-api` from your dependencies (and from your modules in `nuxt.config`).

## Using `@vue/composition-api`

If you have been using just `@vue/composition-api` and not `@nuxtjs/composition-api`, then things are very straightforward.

1. First, remove the plugin where you are manually registering the Composition API. Nuxt Bridge will handle this for you.

2. Otherwise, there is nothing you need to do. However, if you want, you can remove your explicit imports from `@vue/composition-api` and rely on Nuxt Bridge auto-importing them for you.

## Migrating from `@nuxtjs/composition-api`

Nuxt Bridge implements the Composition API slightly differently from `@nuxtjs/composition-api` and provides different composables (designed to be aligned with the composables that Nuxt 3 provides).

Because some composables have been removed and don't yet have a replacement, this will be a slightly more complicated process.

### Remove `@nuxtjs/composition-api/module` from your buildModules

You don't have to immediately update your imports yet - Nuxt Bridge will automatically provide a 'shim' for most imports you currently have, to give you time to migrate to the new, Nuxt 3-compatible composables, with the following exceptions:

- `withContext` has been removed. See [below](https://nuxt.com/docs/3.x/bridge/nuxt3-compatible-api#usecontext-and-withcontext).
- `useStatic` has been removed. There is no current replacement. Feel free to raise a discussion if you have a use case for this.
- `reqRef` and `reqSsrRef`, which were deprecated, have now been removed entirely. Follow the instructions below regarding [ssrRef](https://nuxt.com/docs/3.x/bridge/nuxt3-compatible-api#ssrref-and-shallowssrref) to replace this.

### Set `bridge.capi`

For each other composable you are using from `@nuxtjs/composition-api`, follow the steps below.

`$fetchState` and `$fetch` have been removed.

### `defineNuxtMiddleware`

This was a type-helper stub function that is now removed.

Remove the `defineNuxtMiddleware` wrapper:

For typescript support, you can use `@nuxt/types`:

### `defineNuxtPlugin`

This was a type-helper stub function that is now removed.

You may also keep using Nuxt 2-style plugins, by removing the function (as with [defineNuxtMiddleware](https://nuxt.com/#definenuxtmiddleware)).

Remove the `defineNuxtPlugin` wrapper:

For typescript support, you can use `@nuxt/types`:

::warning
While this example is valid, Nuxt 3 introduces a new defineNuxtPlugin function that has a slightly different signature.
::

::read-more{link="/docs/guide/directory-structure/plugins#creating-plugins"}
::

### `useRouter` and `useRoute`

Nuxt Bridge provides direct replacements for these composables via [`useRouter`](https://nuxt.com/docs/3.x/api/composables/use-router) and `useRoute`.

The only key difference is that [`useRoute`](https://nuxt.com/docs/3.x/api/composables/use-route) no longer returns a computed property.

**Examples:**

Example 1 (diff):

```diff
- import Vue from 'vue'
- import VueCompositionApi from '@vue/composition-api'
-
- Vue.use(VueCompositionApi)
```

Example 2 (ts):

```ts
import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
  bridge: {
    capi: true,
    nitro: false, // If migration to Nitro is complete, set to true
  },
});
```

Example 3 (diff):

```diff
const {
- $fetch,
- $fetchState,
+ fetch,
+ fetchState,
} = useFetch(() => { posts.value = await $fetch('/api/posts') })
```

Example 4 (diff):

```diff
- import { defineNuxtMiddleware } from '@nuxtjs/composition-api`
- export default defineNuxtMiddleware((ctx) => {})
+ export default (ctx) => {}
```

---

## Runtime Config

**URL:** llms-txt#runtime-config

**Contents:**

- Migration

If you wish to reference environment variables within your Nuxt 3 app, you will need to use runtime config.

When referencing these variables within your components, you will have to use the [`useRuntimeConfig`](https://nuxt.com/docs/3.x/api/composables/use-runtime-config) composable in your setup method (or Nuxt plugin).

In the `server/` portion of your app, you can use [`useRuntimeConfig`](https://nuxt.com/docs/3.x/api/composables/use-runtime-config) without any import.

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

1. Add any environment variables that you use in your app to the `runtimeConfig` property of the `nuxt.config` file.
2. Migrate `process.env` to [`useRuntimeConfig`](https://nuxt.com/docs/3.x/api/composables/use-runtime-config) throughout the Vue part of your app.

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

---

## Generates `app/composables/foo.ts`

**URL:** llms-txt#generates-`app/composables/foo.ts`

**Contents:**

- `nuxt add layout`

npx nuxt add composable foo
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add layout`
```

---

## Generates `composables/foo.ts`

**URL:** llms-txt#generates-`composables/foo.ts`

**Contents:**

- `nuxt add layout`

npx nuxt add composable foo
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add layout`
```

---

## Generates `app/components/TheHeader.vue`

**URL:** llms-txt#generates-`app/components/theheader.vue`

**Contents:**

- `nuxt add composable`

npx nuxt add component TheHeader
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add composable`
```

---

## useHeadSafe

**URL:** llms-txt#useheadsafe

**Contents:**

- Usage
- Type
  - Allowed Attributes
- Parameters
- Return Values
- Example

The `useHeadSafe` composable is a wrapper around the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable that restricts the input to only allow safe values. This is the recommended way to manage head data when working with user input, as it prevents XSS attacks by sanitizing potentially dangerous attributes.

::warning
When using `useHeadSafe`, potentially dangerous attributes like `innerHTML` in scripts or `http-equiv` in meta tags are automatically stripped out to prevent XSS attacks. Use this composable whenever you're working with user-generated content.
::

### Allowed Attributes

The following attributes are whitelisted for each head element type:

See [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts){rel="&#x22;nofollow&#x22;"} for more detailed types.

`input`: A `MaybeComputedRef<HeadSafe>` object containing head data. You can pass all the same values as [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head), but only safe attributes will be rendered.

This composable does not return any value.

## ::read-more

target: \_blank
to: https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe

---

Read more on the `Unhead` documentation.
::

**Examples:**

Example 1 (unknown):

```unknown
### Allowed Attributes

The following attributes are whitelisted for each head element type:
```

Example 2 (unknown):

```unknown
See [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts){rel="&#x22;nofollow&#x22;"} for more detailed types.

## Parameters

`input`: A `MaybeComputedRef<HeadSafe>` object containing head data. You can pass all the same values as [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head), but only safe attributes will be rendered.

## Return Values

This composable does not return any value.

## Example
```

---

## New Composition API

**URL:** llms-txt#new-composition-api

**Contents:**

- `ssrRef` and `shallowSsrRef`
- `ssrPromise`
- `onGlobalSetup`
- `useStore`
- `useContext` and `withContext`
- `wrapProperty`
- `useAsync` and `useFetch`
  - `useMeta`
  - Explicit Imports
  - Disabling Auto-imports

By migrating from `@nuxtjs/composition-api` to the Nuxt 3 compatible API, there will be less rewriting when migrating to Nuxt 3.

## `ssrRef` and `shallowSsrRef`

These two functions have been replaced with a new composable that works very similarly under the hood: `useState`.

The key differences are that you must provide a _key_ for this state (which Nuxt generated automatically for `ssrRef` and `shallowSsrRef`), and that it can only be called within a Nuxt 3 plugin (which is defined by `defineNuxtPlugin`) or a component instance. (In other words, you cannot use [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) with a global/ambient context, because of the danger of shared state across requests.)

Because the state is keyed, you can access the same state from multiple locations, as long as you are using the same key.

You can read more about how to use this composable in [the Nuxt 3 docs](https://nuxt.com/docs/3.x/api/composables/use-state).

This function has been removed, and you will need to find an alternative implementation if you were using it. If you have a use case for `ssrPromise`, please let us know via a discussion.

This function has been removed, but its use cases can be met by using [`useNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) or [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) within `defineNuxtPlugin`. You can also run any custom code within the `setup()` function of a layout.

In order to access Vuex store instance, you can use `useNuxtApp().$store`.

## `useContext` and `withContext`

You can access injected helpers using `useNuxtApp`.

::note
`useNuxtApp()` also provides a key called `nuxt2Context` which contains all the same properties you would normally access from Nuxt 2 context, but it's advised _not_ to use this directly, as it won't exist in Nuxt 3. Instead, see if there is another way to access what you need. (If not, please raise a feature request or discussion.)
::

This helper function is not provided any more but you can replace it with the following code:

## `useAsync` and `useFetch`

These two composables can be replaced with `useLazyAsyncData` and `useLazyFetch`, which are documented [in the Nuxt 3 docs](https://nuxt.com/docs/3.x/getting-started/data-fetching). Just like the previous `@nuxtjs/composition-api` composables, these composables do not block route navigation on the client-side (hence the 'lazy' part of the name).

::important
Note that the API is entirely different, despite similar sounding names. Importantly, you should not attempt to change the value of other variables outside the composable (as you may have been doing with the previous `useFetch`).
::

::warning
The `useLazyFetch` must have been configured for [Nitro](https://nuxt.com/docs/3.x/bridge/nitro).
::

Migrating to the new composables from `useAsync`:

Migrating to the new composables from `useFetch`:

In order to interact with `vue-meta`, you may use `useNuxt2Meta`, which will work in Nuxt Bridge (but not Nuxt 3) and will allow you to manipulate your meta tags in a `vue-meta`-compatible way.

You can also pass in computed values or refs, and the meta values will be updated reactively:

::note
Be careful not to use both `useNuxt2Meta()` and the Options API `head()` within the same component, as behavior may be unpredictable.
::

Nuxt Bridge also provides a Nuxt 3-compatible meta implementation that can be accessed with the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable.

You will also need to enable it explicitly in your `nuxt.config`:

This [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable uses `@unhead/vue` under the hood (rather than `vue-meta`) to manipulate your `<head>`. Accordingly, it is recommended not to use both the native Nuxt 2 `head()` properties as well as [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) , as they may conflict.

For more information on how to use this composable, see [the Nuxt 3 docs](https://nuxt.com/docs/3.x/getting-started/seo-meta).

Nuxt exposes every auto-import with the `#imports` alias that can be used to make the import explicit if needed:

### Disabling Auto-imports

If you want to disable auto-importing composables and utilities, you can set `imports.autoImport` to `false` in the `nuxt.config` file.

This will disable auto-imports completely but it's still possible to use [explicit imports](https://nuxt.com/#explicit-imports) from `#imports`.

**Examples:**

Example 1 (diff):

```diff
- import { ssrRef } from '@nuxtjs/composition-api'

- const ref1 = ssrRef('initialData')
- const ref2 = ssrRef(() => 'factory function')
+ const ref1 = useState('ref1-key', () => 'initialData')
+ const ref2 = useState('ref2-key', () => 'factory function')
  // accessing the state
  console.log(ref1.value)
```

Example 2 (diff):

```diff
- import { onGlobalSetup } from '@nuxtjs/composition-api'

- export default () => {
-   onGlobalSetup(() => {
+ export default defineNuxtPlugin((nuxtApp) => {
+   nuxtApp.hook('vue:setup', () => {
      // ...
    })
- }
+ })
```

Example 3 (diff):

```diff
- import { useStore } from '@nuxtjs/composition-api`
+ const { $store } = useNuxtApp()
```

Example 4 (diff):

```diff
- import { useContext } from '@nuxtjs/composition-api`
+ const { $axios } = useNuxtApp()
```

---

## Common reasons

**URL:** llms-txt#common-reasons

**Contents:**

- Browser-only APIs in Server Context
- Inconsistent Data
- Conditional Rendering Based on Client State
- Third-party Libraries with Side Effects
- Dynamic Content Based on Time
- In summary

## Browser-only APIs in Server Context

**Problem**: Using browser-specific APIs during server-side rendering.

**Solution**: You can use [`useCookie`](https://nuxt.com/docs/3.x/api/composables/use-cookie):

**Problem**: Different data between server and client.

**Solution**: Use SSR-friendly state:

## Conditional Rendering Based on Client State

**Problem**: Using client-only conditions during SSR.

**Solution**: Use media queries or handle it client-side:

## Third-party Libraries with Side Effects

**Problem**: Libraries that modify the DOM or have browser dependencies (this happens a LOT with tag managers).

**Solution**: Initialise libraries after hydration has completed:

## Dynamic Content Based on Time

**Problem**: Content that changes based on current time.

**Solution**: Use [`NuxtTime`](https://nuxt.com/docs/3.x/api/components/nuxt-time) component or handle it client-side:

1. **Use SSR-friendly composables**: [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch), [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data), [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state)
2. **Wrap client-only code**: Use [`ClientOnly`](https://nuxt.com/docs/3.x/api/components/client-only) component for browser-specific content
3. **Consistent data sources**: Ensure server and client uses the same data
4. **Avoid side effects in setup**: Move browser-dependent code to `onMounted`

::tip
You can read the [Vue documentation on SSR hydration mismatch](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch){rel=""nofollow""} for a better understanding of hydration.
::

**Examples:**

Example 1 (html):

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
  // This will cause hydration mismatch!
  // localStorage doesn't exist on the server!
  const userTheme = localStorage.getItem('theme') || 'light';
</script>
```

Example 2 (html):

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
  // This works on both server and client
  const userTheme = useCookie('theme', { default: () => 'light' });
</script>
```

Example 3 (html):

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

Example 4 (html):

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
  const state = useState('random', () => Math.random());
</script>
```

---

## clearNuxtState

**URL:** llms-txt#clearnuxtstate

**Contents:**

- Type
- Parameters

::note
This method is useful if you want to invalidate the state of `useState`.
::

- `keys`: One or an array of keys that are used in [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) to delete their cached state. If no keys are provided, **all state** will be invalidated.

---

## definePageMeta

**URL:** llms-txt#definepagemeta

**Contents:**

- Type
- Parameters
  - `meta`
- Examples
  - Basic Usage
  - Defining Middleware
  - Using a Custom Regular Expression
  - Defining Layout

`definePageMeta` is a compiler macro that you can use to set metadata for your **page** components located in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory (unless [set otherwise](https://nuxt.com/docs/3.x/api/nuxt-config#pages)). This way you can set custom metadata for each static or dynamic route of your Nuxt application.

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/pages#page-metadata

::

- **Type**: `PageMeta`

An object accepting the following page metadata:

- **Type**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props){rel="&#x22;nofollow&#x22;"}

- **Type**: `string | string[]`

- **Type**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive){rel="&#x22;nofollow&#x22;"}

- **Type**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

- **Type**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

**`layoutTransition`**

- **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition){rel="&#x22;nofollow&#x22;"}

- **Type**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard){rel="&#x22;nofollow&#x22;"} | `Array<MiddlewareKey | NavigationGuard>`

- **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean | 'always'`

- **Type**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias){rel="&#x22;nofollow&#x22;"}

- **Type**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

- **Type**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

The example below demonstrates:

- how `key` can be a function that returns a value;
- how `keepalive` property makes sure that the `<modal>` component is not cached when switching between multiple components;
- adding `pageType` as a custom property:

### Defining Middleware

The example below shows how the middleware can be defined using a `function` directly within the `definePageMeta` or set as a `string` that matches the middleware file name located in the `middleware/` directory:

### Using a Custom Regular Expression

A custom regular expression is a good way to resolve conflicts between overlapping routes, for instance:

The two routes "/test-category" and "/1234-post" match both `[postId]-[postSlug].vue` and `[categorySlug].vue` page routes.

To make sure that we are only matching digits (`\d+`) for `postId` in the `[postId]-[postSlug]` route, we can add the following to the `[postId]-[postSlug].vue` page template:

For more examples see [Vue Router's Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html){rel="&#x22;nofollow&#x22;"}.

You can define the layout that matches the layout's file name located (by default) in the [`layouts/` directory](https://nuxt.com/docs/3.x/directory-structure/layouts). You can also disable the layout by setting the `layout` to `false`:

**Examples:**

Example 1 (unknown):

```unknown
::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/pages#page-metadata
---
::

## Type
```

Example 2 (unknown):

```unknown
## Parameters

### `meta`

- **Type**: `PageMeta`

An object accepting the following page metadata:

**`name`**

- **Type**: `string`
```

Example 3 (unknown):

```unknown
**`path`**

- **Type**: `string`
```

Example 4 (unknown):

```unknown
**`props`**

- **Type**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props){rel="&#x22;nofollow&#x22;"}
```

---

## useLazyFetch

**URL:** llms-txt#uselazyfetch

**Contents:**

- Usage
- Type
- Parameters
- Return Values
- Examples
  - Handling Pending State

`useLazyFetch` provides a wrapper around [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) that triggers navigation before the handler is resolved by setting the `lazy` option to `true`.

By default, [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) blocks navigation until its async handler is resolved. `useLazyFetch` allows navigation to proceed immediately, with data being fetched in the background.

::note
`useLazyFetch` has the same signature as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch).
::

::warning
Awaiting `useLazyFetch` only ensures the call is initialized. On client-side navigation, data may not be immediately available, and you must handle the `pending` state in your component's template.
::

::warning
`useLazyFetch` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyFetch`.
::

::note
`useLazyFetch` is equivalent to `useFetch` with `lazy: true` option set. See [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) for full type definitions.
::

`useLazyFetch` accepts the same parameters as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch):

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): The URL or request to fetch.
- `options` (object): Same as [`useFetch` options](https://nuxt.com/docs/3.x/api/composables/use-fetch#parameters), with `lazy` automatically set to `true`.

::read-more{to="https://nuxt.com/docs/3.x/api/composables/use-fetch#parameters"}
::

Returns the same `AsyncData` object as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch):

| Name      | Type                                                | Description                                                                                                      |
| --------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------- | --------------------------- |
| `data`    | `Ref<DataT                                          | undefined>`                                                                                                      | The result of the asynchronous fetch.     |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Function to manually refresh the data.                                                                           |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Alias for `refresh`.                                                                                             |
| `error`   | `Ref<ErrorT                                         | undefined>`                                                                                                      | Error object if the data fetching failed. |
| `status`  | `Ref<'idle'                                         | 'pending'                                                                                                        | 'success'                                 | 'error'>` | Status of the data request. |
| `clear`   | `() => void`                                        | Resets `data` to `undefined`, `error` to `undefined`, sets `status` to `idle`, and cancels any pending requests. |

## ::read-more

## to: https://nuxt.com/docs/3.x/api/composables/use-fetch#return-values

::

### Handling Pending State

::read-more{to="https://nuxt.com/docs/3.x/getting-started/data-fetching"}
::

**Examples:**

Example 1 (unknown):

```unknown
::note
`useLazyFetch` has the same signature as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch).
::

::warning
Awaiting `useLazyFetch` only ensures the call is initialized. On client-side navigation, data may not be immediately available, and you must handle the `pending` state in your component's template.
::

::warning
`useLazyFetch` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyFetch`.
::

## Type
```

Example 2 (unknown):

```unknown
::note
`useLazyFetch` is equivalent to `useFetch` with `lazy: true` option set. See [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) for full type definitions.
::

## Parameters

`useLazyFetch` accepts the same parameters as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch):

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): The URL or request to fetch.
- `options` (object): Same as [`useFetch` options](https://nuxt.com/docs/3.x/api/composables/use-fetch#parameters), with `lazy` automatically set to `true`.

::read-more{to="https://nuxt.com/docs/3.x/api/composables/use-fetch#parameters"}
::

## Return Values

Returns the same `AsyncData` object as [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch):

| Name      | Type                                                | Description                                                                                                      |
| --------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `data`    | `Ref<DataT | undefined>`                            | The result of the asynchronous fetch.                                                                            |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Function to manually refresh the data.                                                                           |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Alias for `refresh`.                                                                                             |
| `error`   | `Ref<ErrorT | undefined>`                           | Error object if the data fetching failed.                                                                        |
| `status`  | `Ref<'idle' | 'pending' | 'success' | 'error'>`     | Status of the data request.                                                                                      |
| `clear`   | `() => void`                                        | Resets `data` to `undefined`, `error` to `undefined`, sets `status` to `idle`, and cancels any pending requests. |

::read-more
---
to: https://nuxt.com/docs/3.x/api/composables/use-fetch#return-values
---
::

## Examples

### Handling Pending State
```

---

## useAsyncData

**URL:** llms-txt#useasyncdata

**Contents:**

- Usage
  - Watch Params
  - Reactive Keys
  - Make your `handler` abortable
- Params
  - Shared State and Option Consistency
- Return Values
- Type

Within your pages, components, and plugins you can use useAsyncData to get access to data that resolves asynchronously.

::note
[`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) is a composable meant to be called directly in the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context). It returns reactive composables and handles adding responses to the Nuxt payload so they can be passed from server to client **without re-fetching the data on client side** when the page hydrates.
::

::warning
If you're using a custom useAsyncData wrapper, do not await it in the composable, as that can cause unexpected behavior. Please follow [this recipe](https://nuxt.com/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch) for more information on how to make a custom async data fetcher.
::

::note
`data`, `status`, `pending` and `error` are Vue refs and they should be accessed with `.value` when used within the `<script setup>`, while `refresh`/`execute` and `clear` are plain functions.
::

The built-in `watch` option allows automatically rerunning the fetcher function when any changes are detected.

You can use a computed ref, plain ref or a getter function as the key, allowing for dynamic data fetching that automatically updates when the key changes:

### Make your `handler` abortable

You can make your `handler` function abortable by using the `signal` provided in the second argument. This is useful for cancelling requests when they are no longer needed, such as when a user navigates away from a page. `$fetch` natively supports abort signals.

You can also pass an `AbortSignal` to the `refresh`/`execute` function to cancel individual requests manually.

If your `handler` function does not support abort signals, you can implement your own abort logic using the `signal` provided.

The handler signal will be aborted when:

- A new request is made with `dedupe: 'cancel'`
- The `clear` function is called
- The `options.timeout` duration is exceeded

::warning
[`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) is a reserved function name transformed by the compiler, so you should not name your own function [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data).
::

## ::read-more

## to: https://nuxt.com/docs/getting-started/data-fetching#useasyncdata

::

- `key`: a unique key to ensure that data fetching can be properly de-duplicated across requests. If you do not provide a key, then a key that is unique to the file name and line number of the instance of `useAsyncData` will be generated for you.
- `handler`: an asynchronous function that must return a truthy value (for example, it should not be `undefined` or `null`) or the request may be duplicated on the client side.
  :warning[The `handler` function should be **side-effect free** to ensure predictable behavior during SSR and CSR hydration. If you need to trigger side effects, use the [`callOnce`](https://nuxt.com/docs/3.x/api/utils/call-once) utility to do so.]
- `options`:

- `server`: whether to fetch the data on the server (defaults to `true`)
  - `lazy`: whether to resolve the async function after loading the route, instead of blocking client-side navigation (defaults to `false`)
  - `immediate`: when set to `false`, will prevent the request from firing immediately. (defaults to `true`)
  - `default`: a factory function to set the default value of the `data`, before the async function resolves - useful with the `lazy: true` or `immediate: false` option
  - `transform`: a function that can be used to alter `handler` function result after resolving
  - `getCachedData`: Provide a function which returns cached data. A `null` or `undefined` return value will trigger a fetch. By default, this is:

Which only caches data when `experimental.payloadExtraction` of `nuxt.config` is enabled.

- `pick`: only pick specified keys in this array from the `handler` function result
- `watch`: watch reactive sources to auto-refresh
- `deep`: return data in a deep ref object (it is `true` by default). It can be set to `false` to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive.
- `dedupe`: avoid fetching same key more than once at a time (defaults to `cancel`). Possible options:

- `cancel` - cancels existing requests when a new one is made
  - `defer` - does not make new requests at all if there is a pending request
  - `timeout` - a number in milliseconds to wait before timing out the request (defaults to `undefined`, which means no timeout)

::note
Under the hood, `lazy: false` uses `<Suspense>` to block the loading of the route before the data has been fetched. Consider using `lazy: true` and implementing a loading state instead for a snappier user experience.
::

::read-more{to="https://nuxt.com/docs/api/composables/use-lazy-async-data"}
You can use `useLazyAsyncData` to have the same behavior as `lazy: true` with `useAsyncData`.
::

## ::video-accordion

title: Watch a video from Alexander Lichter about client-side caching with
getCachedData
video-id: aQPR0xn-MMk

---

::

### Shared State and Option Consistency

When using the same key for multiple `useAsyncData` calls, they will share the same `data`, `error`, `status` and `pending` refs. This ensures consistency across components but requires option consistency.

The following options **must be consistent** across all calls with the same key:

- `handler` function
- `deep` option
- `transform` function
- `pick` array
- `getCachedData` function
- `default` value

The following options **can differ** without triggering warnings:

- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

::tip
Keyed state created using `useAsyncData` can be retrieved across your Nuxt application using [`useNuxtData`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-data).
::

- `data`: the result of the asynchronous function that is passed in.
- `refresh`/`execute`: a function that can be used to refresh the data returned by the `handler` function.
- `error`: an error object if the data fetching failed.
- `status`: a string indicating the status of the data request:

- `idle`: when the request has not started, such as:

- when `execute` has not yet been called and `{ immediate: false }` is set
  - when rendering HTML on the server and `{ server: false }` is set
  - `pending`: the request is in progress
  - `success`: the request has completed successfully
  - `error`: the request has failed
- `pending`: a `Ref<boolean>` that is `true` while the request is in progress.
- `clear`: a function that can be used to set `data` to `undefined` (or the value of `options.default()` if provided), set `error` to `null`, set `status` to `idle`, and mark any currently pending requests as cancelled.

By default, Nuxt waits until a `refresh` is finished before it can be executed again.

::note
If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) on the client side, `data` will remain `undefined` within `<script setup>`.
::

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
If you're using a custom useAsyncData wrapper, do not await it in the composable, as that can cause unexpected behavior. Please follow [this recipe](https://nuxt.com/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch) for more information on how to make a custom async data fetcher.
::

::note
`data`, `status`, `pending` and `error` are Vue refs and they should be accessed with `.value` when used within the `<script setup>`, while `refresh`/`execute` and `clear` are plain functions.
::

### Watch Params

The built-in `watch` option allows automatically rerunning the fetcher function when any changes are detected.
```

Example 2 (unknown):

```unknown
### Reactive Keys

You can use a computed ref, plain ref or a getter function as the key, allowing for dynamic data fetching that automatically updates when the key changes:
```

Example 3 (unknown):

```unknown
### Make your `handler` abortable

You can make your `handler` function abortable by using the `signal` provided in the second argument. This is useful for cancelling requests when they are no longer needed, such as when a user navigates away from a page. `$fetch` natively supports abort signals.
```

Example 4 (unknown):

```unknown
You can also pass an `AbortSignal` to the `refresh`/`execute` function to cancel individual requests manually.
```

---

## clearNuxtData

**URL:** llms-txt#clearnuxtdata

**Contents:**

- Type
- Parameters

::note
This method is useful if you want to invalidate the data fetching for another page.
::

- `keys`: One or an array of keys that are used in [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) to delete their cached data. If no keys are provided, **all data** will be invalidated.

---

## prefetchComponents

**URL:** llms-txt#prefetchcomponents

Prefetching component downloads the code in the background, this is based on the assumption that the component will likely be used for rendering, enabling the component to load instantly if and when the user requests it. The component is downloaded and cached for anticipated future use without the user making an explicit request for it.

Use `prefetchComponents` to manually prefetch individual components that have been registered globally in your Nuxt app. By default Nuxt registers these as async components. You must use the Pascal-cased version of the component name.

::note
Current implementation behaves exactly the same as [`preloadComponents`](https://nuxt.com/docs/3.x/api/utils/preload-components) by preloading components instead of just prefetching we are working to improve this behavior.
::

::note
On server, `prefetchComponents` will have no effect.
::

**Examples:**

Example 1 (ts):

```ts
await prefetchComponents('MyGlobalComponent');

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2']);
```

---

## useRequestHeader

**URL:** llms-txt#userequestheader

**Contents:**

- Example

You can use the built-in [`useRequestHeader`](https://nuxt.com/docs/3.x/api/composables/use-request-header) composable to access any incoming request header within your pages, components, and plugins.

::tip
In the browser, `useRequestHeader` will return `undefined`.
::

We can use `useRequestHeader` to easily figure out if a user is authorized or not.

The example below reads the `authorization` request header to find out if a person can access a restricted resource.

**Examples:**

Example 1 (ts):

```ts
// Get the authorization request header
const authorization = useRequestHeader('authorization');
```

---

## Nuxt API Reference

**URL:** llms-txt#nuxt-api-reference

::card-group
:::card

---

icon: i-lucide-box
title: Components
to: https://nuxt.com/docs/api/components/client-only

---

Explore Nuxt built-in components for pages, layouts, head, and more.
:::

:::card

---

icon: i-lucide-arrow-left-right
title: Composables
to: https://nuxt.com/docs/api/composables/use-app-config

---

Discover Nuxt composable functions for data-fetching, head management and more.
:::

:::card

---

icon: i-lucide-square-function
title: Utils
to: https://nuxt.com/docs/api/utils/dollarfetch

---

Learn about Nuxt utility functions for navigation, error handling and more.
:::

:::card

---

icon: i-lucide-square-terminal
title: Commands
to: https://nuxt.com/docs/api/commands/add

---

List of Nuxt CLI commands to init, analyze, build, and preview your application.
:::

:::card

---

icon: i-lucide-package
title: Nuxt Kit
to: https://nuxt.com/docs/api/kit/modules

---

Understand Nuxt Kit utilities to create modules and control Nuxt.
:::

:::card

---

icon: i-lucide-brain
title: Advanced
to: https://nuxt.com/docs/api/advanced/hooks

---

Go deep in Nuxt internals with Nuxt lifecycle hooks.
:::

:::card

---

icon: i-lucide-cog
title: Nuxt Configuration
to: https://nuxt.com/docs/api/nuxt-config

---

Explore all Nuxt configuration options to customize your application.
:::
::

---

## This will override the value of apiSecret

**URL:** llms-txt#this-will-override-the-value-of-apisecret

**Contents:**

- App Configuration
- `runtimeConfig` vs. `app.config`
- External Configuration Files
- Vue Configuration
  - With Vite
  - With webpack
  - Enabling Experimental Vue Features

NUXT_API_SECRET=api_secret_token
vue [pages/index.vue]

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

ts [app.config.ts]
export default defineAppConfig({
title: 'Hello Nuxt',
theme: {
dark: true,
colors: {
primary: '#ff0000',
},
},
})
vue [pages/index.vue]

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

ts [nuxt.config.ts] twoslash
export default defineNuxtConfig({
vite: {
vue: {
customElement: true,
},
vueJsx: {
mergeProps: true,
},
},
})
ts [nuxt.config.ts] twoslash
export default defineNuxtConfig({
webpack: {
loaders: {
vue: {
hotReload: true,
},
},
},
})
ts [nuxt.config.ts] twoslash
export default defineNuxtConfig({
vue: {
propsDestructure: true,
},
})

````

#### experimental `reactivityTransform` migration from Vue 3.4 and Nuxt 3.9

Since Nuxt 3.9 and Vue 3.4, `reactivityTransform` has been moved from Vue to Vue Macros which has a [Nuxt integration](https://vue-macros.dev/guide/nuxt-integration.html){rel="&#x22;nofollow&#x22;"}.

::read-more{to="https://nuxt.com/docs/api/configuration/nuxt-config#vue-1"}
::

**Examples:**

Example 1 (unknown):
```unknown
::

These variables are exposed to the rest of your application using the [`useRuntimeConfig()`](https://nuxt.com/docs/3.x/api/composables/use-runtime-config) composable.
````

Example 2 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## App Configuration

The `app.config.ts` file, located in the source directory (by default the root of the project), is used to expose public variables that can be determined at build time. Contrary to the `runtimeConfig` option, these cannot be overridden using environment variables.

A minimal configuration file exports the `defineAppConfig` function containing an object with your configuration. The `defineAppConfig` helper is globally available without import.
```

Example 3 (unknown):

```unknown
These variables are exposed to the rest of your application using the [`useAppConfig`](https://nuxt.com/docs/3.x/api/composables/use-app-config) composable.
```

Example 4 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/guide/directory-structure/app-config"}
::

## `runtimeConfig` vs. `app.config`

As stated above, `runtimeConfig` and `app.config` are both used to expose variables to the rest of your application. To determine whether you should use one or the other, here are some guidelines:

- `runtimeConfig`: Private or public tokens that need to be specified after build using environment variables.
- `app.config`: Public tokens that are determined at build time, website configuration such as theme variant, title and any project config that are not sensitive.

| Feature                   | `runtimeConfig` | `app.config` |
| ------------------------- | --------------- | ------------ |
| Client Side               | Hydrated        | Bundled      |
| Environment Variables     | ✅ Yes           | ❌ No         |
| Reactive                  | ✅ Yes           | ✅ Yes        |
| Types support             | ✅ Partial       | ✅ Yes        |
| Configuration per Request | ❌ No            | ✅ Yes        |
| Hot Module Replacement    | ❌ No            | ✅ Yes        |
| Non primitive JS types    | ❌ No            | ✅ Yes        |

## External Configuration Files

Nuxt uses [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file as the single source of truth for configurations and skips reading external configuration files. During the course of building your project, you may have a need to configure those. The following table highlights common configurations and, where applicable, how they can be configured with Nuxt.

| Name                                                          | Config File             | How To Configure                                                                          |
| ------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| [Nitro](https://nitro.build){rel="&#x22;nofollow&#x22;"}      | ~~`nitro.config.ts`~~   | Use [`nitro`](https://nuxt.com/docs/3.x/api/nuxt-config#nitro) key in `nuxt.config`       |
| [PostCSS](https://postcss.org){rel="&#x22;nofollow&#x22;"}    | ~~`postcss.config.js`~~ | Use [`postcss`](https://nuxt.com/docs/3.x/api/nuxt-config#postcss) key in `nuxt.config`   |
| [Vite](https://vite.dev){rel="&#x22;nofollow&#x22;"}          | ~~`vite.config.ts`~~    | Use [`vite`](https://nuxt.com/docs/3.x/api/nuxt-config#vite) key in `nuxt.config`         |
| [webpack](https://webpack.js.org){rel="&#x22;nofollow&#x22;"} | ~~`webpack.config.ts`~~ | Use [`webpack`](https://nuxt.com/docs/3.x/api/nuxt-config#webpack-1) key in `nuxt.config` |

Here is a list of other common config files:

| Name                                                                     | Config File           | How To Configure                                                                                          |
| ------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org){rel="&#x22;nofollow&#x22;"} | `tsconfig.json`       | [More Info](https://nuxt.com/docs/3.x/guide/concepts/typescript#nuxttsconfigjson)                         |
| [ESLint](https://eslint.org){rel="&#x22;nofollow&#x22;"}                 | `eslint.config.js`    | [More Info](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"} |
| [Prettier](https://prettier.io){rel="&#x22;nofollow&#x22;"}              | `prettier.config.js`  | [More Info](https://prettier.io/docs/en/configuration.html){rel="&#x22;nofollow&#x22;"}                   |
| [Stylelint](https://stylelint.io){rel="&#x22;nofollow&#x22;"}            | `stylelint.config.js` | [More Info](https://stylelint.io/user-guide/configure){rel="&#x22;nofollow&#x22;"}                        |
| [TailwindCSS](https://tailwindcss.com){rel="&#x22;nofollow&#x22;"}       | `tailwind.config.js`  | [More Info](https://tailwindcss.nuxtjs.org/tailwindcss/configuration){rel="&#x22;nofollow&#x22;"}         |
| [Vitest](https://vitest.dev){rel="&#x22;nofollow&#x22;"}                 | `vitest.config.ts`    | [More Info](https://vitest.dev/config/){rel="&#x22;nofollow&#x22;"}                                       |

## Vue Configuration

### With Vite

If you need to pass options to `@vitejs/plugin-vue` or `@vitejs/plugin-vue-jsx`, you can do this in your `nuxt.config` file.

- `vite.vue` for `@vitejs/plugin-vue`. Check [available options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue){rel="&#x22;nofollow&#x22;"}.
- `vite.vueJsx` for `@vitejs/plugin-vue-jsx`. Check [available options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx){rel="&#x22;nofollow&#x22;"}.
```

---

## Plugins and Middleware

**URL:** llms-txt#plugins-and-middleware

**Contents:**

- Plugins
  - Migration
- Route Middleware
  - Migration

Plugins now have a different format, and take only one argument (`nuxtApp`).

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

::read-more{to="https://nuxt.com/docs/api/composables/use-nuxt-app"}
Read more about the format of `nuxtApp`.
::

1. Migrate your plugins to use the `defineNuxtPlugin` helper function.
2. Remove any entries in your `nuxt.config` plugins array that are located in your `plugins/` folder. All files in this directory at the top level (and any index files in any subdirectories) will be automatically registered. Instead of setting `mode` to `client` or `server`, you can indicate this in the file name. For example, `~/plugins/my-plugin.client.ts` will only be loaded on client-side.

Route middleware has a different format.

Much like Nuxt 2, route middleware placed in your `~/middleware` folder is automatically registered. You can then specify it by name in a component. However, this is done with `definePageMeta` rather than as a component option.

`navigateTo` is one of a number of route helper functions.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

1. Migrate your route middleware to use the `defineNuxtRouteMiddleware` helper function.
2. Any global middleware (such as in your `nuxt.config`) can be placed in your `~/middleware` folder with a `.global` extension, for example `~/middleware/auth.global.ts`.

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

::read-more{to="https://nuxt.com/docs/api/composables/use-nuxt-app"}
Read more about the format of `nuxtApp`.
::

### Migration

1. Migrate your plugins to use the `defineNuxtPlugin` helper function.
2. Remove any entries in your `nuxt.config` plugins array that are located in your `plugins/` folder. All files in this directory at the top level (and any index files in any subdirectories) will be automatically registered. Instead of setting `mode` to `client` or `server`, you can indicate this in the file name. For example, `~/plugins/my-plugin.client.ts` will only be loaded on client-side.

## Route Middleware

Route middleware has a different format.

::code-group
```

Example 3 (unknown):

```unknown

```

---

## Generates `server/api/hello.ts`

**URL:** llms-txt#generates-`server/api/hello.ts`

**Contents:**

- `nuxt add layer`

npx nuxt add api hello
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add layer`
```

---

## Using pinned version due to https://github.com/codemod/codemod/issues/1710

**URL:** llms-txt#using-pinned-version-due-to-https://github.com/codemod/codemod/issues/1710

**Contents:**

- New Directory Structure
- Singleton Data Fetching Layer
- Corrected Module Loading Order in Layers
- Deduplication of Route Metadata
- Normalized Component Names
- Unhead v2
- New DOM Location for SPA Loading Screen
- Parsed `error.data`
- More Granular Inline Styles
- Scan Page Meta After Resolution

bun x codemod@0.18.7 nuxt/4/migration-recipe
sh
.output/
.nuxt/
app/
assets/
components/
composables/
layouts/
middleware/
pages/
plugins/
utils/
app.config.ts
app.vue
router.options.ts
content/
layers/
modules/
node_modules/
public/
shared/
server/
api/
middleware/
plugins/
routes/
utils/
nuxt.config.ts
ts [nuxt.config.ts]
export default defineNuxtConfig({
// This reverts the new srcDir default from `app` back to your root directory
srcDir: '.',
// This specifies the directory prefix for `router.options.ts` and `spa-loading-template.html`
dir: {
app: 'app',
},
})
ts
// This will now trigger a warning
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })
ts [app/composables/useUserData.ts]
export function useUserData (userId: string) {
  return useAsyncData(
    `user-${userId}`,
() => fetchUser(userId),
{
deep: true,
transform: user => ({ ...user, lastAccessed: new Date() }),
},
)
}
diff
useAsyncData('key', fetchFunction, {

- getCachedData: (key, nuxtApp) => {
- return cachedData[key]
- }

* getCachedData: (key, nuxtApp, ctx) => {
* // ctx.cause - can be 'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'
*
* // Example: Don't use cache on manual refresh
* if (ctx.cause === 'refresh:manual') return undefined
*
* return cachedData[key]
* }
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  granularCachedData: false,
  purgeCachedData: false,
  },
  })
  ts
  // Layer: my-layer/nuxt.config.ts
  export default defineNuxtConfig({
  modules: ['layer-module-1', 'layer-module-2'],
  })

// Project: nuxt.config.ts
export default defineNuxtConfig({
extends: ['./my-layer'],
modules: ['project-module-1', 'project-module-2'],
})

// Loading order (corrected):
// 1. layer-module-1
// 2. layer-module-2
// 3. project-module-1 (can override layer modules)
// 4. project-module-2 (can override layer modules)
diff
const route = useRoute()

- console.log(route.meta.name)

* console.log(route.name)
  bash [Directory structure]
  ├─ components/
  ├─── SomeFolder/
  ├───── MyComponent.vue
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  normalizeComponentNames: false,
  },
  })
  diff
  useHead({
  meta: [{
  name: 'description',
  // meta tags don't need a vmid, or a key

- vmid: 'description'
- hid: 'description'
  }]
  })
  ts
  import { AliasSortingPlugin, TemplateParamsPlugin } from '@unhead/vue/plugins'

export default defineNuxtPlugin({
setup () {
const unhead = injectHead()
unhead.use(TemplateParamsPlugin)
unhead.use(AliasSortingPlugin)
},
})
diff
-import { useHead } from '@unhead/vue'
+import { useHead } from '#imports'
ts
export default defineNuxtConfig({
unhead: {
legacy: true,
},
})
html

<div id="__nuxt">
  <!-- spa loading template -->
</div>
html
<div id="__nuxt"></div>
<!-- spa loading template -->
ts [nuxt.config.ts] twoslash
export default defineNuxtConfig({
  experimental: {
    spaLoadingTemplateLocation: 'within',
  },
})
diff
  <script setup lang="ts">
  import type { NuxtError } from '#app'

const props = defineProps({
error: Object as () => NuxtError
})

- const data = JSON.parse(error.data)

* const data = error.data
  </script>
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  features: {
  inlineStyles: true,
  },
  })
  diff
  export default defineNuxtConfig({
  hooks: {

-     'pages:extend'(pages) {

*     'pages:resolved'(pages) {
                        const myPage = pages.find(page => page.path === '/')
                        myPage.meta ||= {}
                        myPage.meta.layout = 'overridden-layout'
                      }
                    }
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  scanPageMeta: true,
  },
  })
  ts [app/pages/test/[slug\\].vue]
  // This would be unsafe in a dynamic page (e.g. `[slug].vue`) because the route slug makes a difference
  // to the data fetched, but Nuxt can't know that because it's not reflected in the key.
  const route = useRoute()
  const { data } = await useAsyncData(async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
})
// Instead, you should use a key that uniquely identifies the data fetched.
const { data } = await useAsyncData(route.params.slug, async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  sharedPrerenderData: false,
  },
  })
  ts [app/app.vue] twoslash
  // @errors: 2322
  const { refresh } = await useAsyncData(() => Promise.resolve({ message: 'Hello, Nuxt!' }))

async function refreshData () {
await refresh({ dedupe: true })
}
diff
const { refresh } = await useAsyncData(async () => ({ message: 'Hello, Nuxt 3!' }))

async function refreshData () {

- await refresh({ dedupe: true })

* await refresh({ dedupe: 'cancel' })

- await refresh({ dedupe: false })

* await refresh({ dedupe: 'defer' })
  }
  diff
  <template>

- <div v-if="!pending">

* <div v-if="status === 'success'">
        <p>Data: {{ data }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </template>
    <script setup lang="ts">
    const { data, pending, execute, status } = await useAsyncData(() => fetch('/api/data'), {
      immediate: false
    })
    onMounted(() => execute())
    </script>
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
    experimental: {
      pendingWhenIdle: true,
    },
  })
  diff
    const id = ref('123')
    const { data, execute } = await useFetch('/api/test', {
      query: { id },
      immediate: false
    )
* watch(id, () => execute(), { once: true })
  ts
  // Or globally in your Nuxt config
  export default defineNuxtConfig({
  experimental: {
  alwaysRunFetchOnKeyChange: true,
  },
  })
  diff
  - const { data } = useFetch('/api/test')
  * const { data } = useFetch('/api/test', { deep: true })
    ts \[nuxt.config.ts] twoslash
    export default defineNuxtConfig({
    experimental: {
    defaults: {
    useAsyncData: {
    deep: true,
    },
    },
    },
    })
    diff
* import { relative, resolve } from 'node:fs'
  // ...
  nuxt.hook('builder:watch', async (event, path) => {
* path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
  // ...
  })
  diff

- console.log(window.**NUXT**)

* console.log(useNuxtApp().payload)
  ts
  export default defineNuxtConfig({
  hooks: {
  'app:resolve' (app) {
  app.middleware = app.middleware.filter(mw => !/\/index\.[^/]+$/.test(mw.path))
  },
  },
  })
  diff
* import { readFileSync } from 'node:fs'
* import { template } from 'es-toolkit/compat'
  // ...
  addTemplate({
  fileName: 'appinsights-vue.js'
  options: { /_ some options _/ },

- src: resolver.resolve('./runtime/plugin.ejs'),

* getContents({ options }) {
*     const contents = readFileSync(resolver.resolve('./runtime/plugin.ejs'), 'utf-8')
*     return template(contents)({ options })
* },
  })
  ts
  import { genDynamicImport, genImport, genSafeVariableName } from 'knitwork'

const serialize = (data: any) => JSON.stringify(data, null, 2).replace(/"\{(.+)\}"(?=,?$)/gm, r => JSON.parse(r).replace(/^\{(.*)\}$/, '$1'))

const importSources = (sources: string | string[], { lazy = false } = {}) => {
return toArray(sources).map((src) => {
if (lazy) {
return `const ${genSafeVariableName(src)} = ${genDynamicImport(src, { comment: `webpackChunkName: ${JSON.stringify(src)}` })}`
}
return genImport(src, genSafeVariableName(src))
}).join('\n')
}

const importName = genSafeVariableName
ts
export default defineNuxtConfig({
typescript: {
tsConfig: {
compilerOptions: {
noUncheckedIndexedAccess: false,
},
},
},
})
json
{
// Remove "extends": "./.nuxt/tsconfig.json" if present
"files": [],
"references": [
{ "path": "./.nuxt/tsconfig.app.json" },
{ "path": "./.nuxt/tsconfig.server.json" },
{ "path": "./.nuxt/tsconfig.shared.json" },
{ "path": "./.nuxt/tsconfig.node.json" }
]
}
diff

- "typecheck": "nuxt prepare && vue-tsc --noEmit"

* "typecheck": "nuxt prepare && vue-tsc -b --noEmit"
  ts
  export default defineNuxtConfig({
  typescript: {
  // customize tsconfig.app.json
  tsConfig: {
  // ...
  },
  // customize tsconfig.shared.json
  sharedTsConfig: {
  // ...
  },
  // customize tsconfig.node.json
  nodeTsConfig: {
  // ...
  },
  },
  nitro: {
  typescript: {
  // customize tsconfig.server.json
  tsConfig: {
  // ...
  },
  },
  },
  })
  diff
  export default defineNuxtConfig({

- generate: {
- exclude: ['/admin', '/private'],
- routes: ['/sitemap.xml', '/robots.txt']
- }

* nitro: {
* prerender: {
*     ignore: ['/admin', '/private'],
*     routes: ['/sitemap.xml', '/robots.txt']
* }
* }
  })

````

::read-more{to="https://nitro.build/config#prerender"}
Read more about Nitro's prerender configuration options.
::

## Nuxt 2 vs. Nuxt 3+

In the table below, there is a quick comparison between 3 versions of Nuxt:

| Feature / Version       | Nuxt 2     | Nuxt Bridge | Nuxt 3+    |
| ----------------------- | ---------- | ----------- | ---------- |
| Vue                     | 2          | 2           | 3          |
| Stability               | 😊 Stable  | 😊 Stable   | 😊 Stable  |
| Performance             | 🏎 Fast    | ✈️ Faster   | 🚀 Fastest |
| Nitro Engine            | ❌          | ✅           | ✅          |
| ESM support             | 🌙 Partial | 👍 Better   | ✅          |
| TypeScript              | ☑️ Opt-in  | 🚧 Partial  | ✅          |
| Composition API         | ❌          | 🚧 Partial  | ✅          |
| Options API             | ✅          | ✅           | ✅          |
| Components Auto Import  | ✅          | ✅           | ✅          |
| `<script setup>` syntax | ❌          | 🚧 Partial  | ✅          |
| Auto Imports            | ❌          | ✅           | ✅          |
| webpack                 | 4          | 4           | 5          |
| Vite                    | ⚠️ Partial | 🚧 Partial  | ✅          |
| Nuxt CLI                | ❌ Old      | ✅ nuxt      | ✅ nuxt     |
| Static sites            | ✅          | ✅           | ✅          |

The migration guide provides a step-by-step comparison of Nuxt 2 features to Nuxt 3+ features and guidance to adapt your current application.

::read-more{to="https://nuxt.com/docs/4.x/migration/overview"}
Check out the **guide to migrating from Nuxt 2 to Nuxt 3**.
::

## Nuxt 2 to Nuxt Bridge

If you prefer to progressively migrate your Nuxt 2 application to Nuxt 3, you can use Nuxt Bridge. Nuxt Bridge is a compatibility layer that allows you to use Nuxt 3+ features in Nuxt 2 with an opt-in mechanism.

::read-more{to="https://nuxt.com/docs/4.x/bridge/overview"}
**Migrate from Nuxt 2 to Nuxt Bridge**
::

**Examples:**

Example 1 (unknown):
```unknown
::

This command will execute all codemods in sequence, with the option to deselect any that you do not wish to run. Each codemod is also listed below alongside its respective change and can be executed independently.

### New Directory Structure

🚦 **Impact Level**: Significant

Nuxt now defaults to a new directory structure, with backwards compatibility (so if Nuxt detects you are using the old structure, such as with a top-level `app/pages/` directory, this new structure will not apply).

👉 [See full RFC](https://github.com/nuxt/nuxt/issues/26444){rel="&#x22;nofollow&#x22;"}

#### What Changed

- the new Nuxt default `srcDir` is `app/` by default, and most things are resolved from there.
- `serverDir` now defaults to `<rootDir>/server` rather than `<srcDir>/server`
- `layers/`, `modules/` and `public/` are resolved relative to `<rootDir>` by default
- if using [Nuxt Content v2.13+](https://github.com/nuxt/content/pull/2649){rel="&#x22;nofollow&#x22;"}, `content/` is resolved relative to `<rootDir>`
- a new `dir.app` is added, which is the directory we look for `router.options.ts` and `spa-loading-template.html` - this defaults to `<srcDir>/`

An example v4 folder structure.
````

Example 2 (unknown):

```unknown
::note
With this new structure, the `~` alias now points to the `app/` directory by default (your `srcDir`). This means `~/components` resolves to `app/components/`, `~/pages` to `app/pages/`, etc.
::

👉 For more details, see the [PR implementing this change](https://github.com/nuxt/nuxt/pull/27029){rel="&#x22;nofollow&#x22;"}.

#### Reasons for Change

1. **Performance** - placing all your code in the root of your repo causes issues with `.git/` and `node_modules/` folders being scanned/included by FS watchers which can significantly delay startup on non-Mac OSes.
2. **IDE type-safety** - `server/` and the rest of your app are running in two entirely different contexts with different global imports available, and making sure `server/` isn't *inside* the same folder as the rest of your app is a big first step to ensuring you get good auto-completes in your IDE.

::video-accordion
---
platform: vimeo
title: Watch a video from Vue School on the new directory structure
video-id: "1031028378"
---
::

#### Migration Steps

1. Create a new directory called `app/`.
2. Move your `assets/`, `components/`, `composables/`, `app/layouts/`, `app/middleware/`, `app/pages/`, `app/plugins/` and `utils/` folders under it, as well as `app.vue`, `error.vue`, `app.config.ts`. If you have an `app/router-options.ts` or `app/spa-loading-template.html`, these paths remain the same.
3. Make sure your `nuxt.config.ts`, `content/`, `layers/`, `modules/`, `public/` and `server/` folders remain outside the `app/` folder, in the root of your project.
4. Remember to update any third-party configuration files to work with the new directory structure, such as your `tailwindcss` or `eslint` configuration (if required - `@nuxtjs/tailwindcss` should automatically configure `tailwindcss` correctly).

::tip
You can automate this migration by running `npx codemod@latest nuxt/4/file-structure`
::

However, migration is *not required*. If you wish to keep your current folder structure, Nuxt should auto-detect it. (If it does not, please raise an issue.) The one exception is that if you *already* have a custom `srcDir`. In this case, you should be aware that your `modules/`, `public/` and `server/` folders will be resolved from your `rootDir` rather than from your custom `srcDir`. You can override this by configuring `dir.modules`, `dir.public` and `serverDir` if you need to.

You can also force a v3 folder structure with the following configuration:
```

Example 3 (unknown):

```unknown
### Singleton Data Fetching Layer

🚦 **Impact Level**: Moderate

#### What Changed

Nuxt's data fetching system (`useAsyncData` and `useFetch`) has been significantly reorganized for better performance and consistency:

1. **Shared refs for the same key**: All calls to `useAsyncData` or `useFetch` with the same key now share the same `data`, `error` and `status` refs. This means that it is important that all calls with an explicit key must not have conflicting `deep`, `transform`, `pick`, `getCachedData` or `default` options.
2. **More control over `getCachedData`**: The `getCachedData` function is now called every time data is fetched, even if this is caused by a watcher or calling `refreshNuxtData`. (Previously, new data was always fetched and this function was not called in these cases.) To allow more control over when to use cached data and when to refetch, the function now receives a context object with the cause of the request.
3. **Reactive key support**: You can now use computed refs, plain refs or getter functions as keys, which enables automatic data refetching (and stores data separately).
4. **Data cleanup**: When the last component using data fetched with `useAsyncData` is unmounted, Nuxt will remove that data to avoid ever-growing memory usage.

#### Reasons for Change

These changes have been made to improve memory usage and increase consistency with loading states across calls of `useAsyncData`.

#### Migration Steps

1. **Check for inconsistent options**: Review any components using the same key with different options or fetch functions.
```

Example 4 (unknown):

```unknown
It may be beneficial to extract any calls to `useAsyncData` that share an explicit key (and have custom options) into their own composable:
```

---

## Using pinned version due to https://github.com/codemod-com/codemod/issues/1710

**URL:** llms-txt#using-pinned-version-due-to-https://github.com/codemod-com/codemod/issues/1710

**Contents:**

- New Directory Structure
- Singleton Data Fetching Layer
- Corrected Module Loading Order in Layers
- Deduplication of Route Metadata
- Normalized Component Names
- Unhead v2
- New DOM Location for SPA Loading Screen
- Parsed `error.data`
- More Granular Inline Styles
- Scan Page Meta After Resolution

bun x codemod@0.18.7 nuxt/4/migration-recipe
sh
.output/
.nuxt/
app/
assets/
components/
composables/
layouts/
middleware/
pages/
plugins/
utils/
app.config.ts
app.vue
router.options.ts
content/
layers/
modules/
node_modules/
public/
shared/
server/
api/
middleware/
plugins/
routes/
utils/
nuxt.config.ts
ts [nuxt.config.ts]
export default defineNuxtConfig({
// This reverts the new srcDir default from `app` back to your root directory
srcDir: '.',
// This specifies the directory prefix for `app/router.options.ts` and `app/spa-loading-template.html`
dir: {
app: 'app',
},
})
ts
// This will now trigger a warning
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })
ts [composables/useUserData.ts]
export function useUserData (userId: string) {
  return useAsyncData(
    `user-${userId}`,
() => fetchUser(userId),
{
deep: true,
transform: user => ({ ...user, lastAccessed: new Date() }),
},
)
}
diff
useAsyncData('key', fetchFunction, {

- getCachedData: (key, nuxtApp) => {
- return cachedData[key]
- }

* getCachedData: (key, nuxtApp, ctx) => {
* // ctx.cause - can be 'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'
*
* // Example: Don't use cache on manual refresh
* if (ctx.cause === 'refresh:manual') return undefined
*
* return cachedData[key]
* }
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  granularCachedData: false,
  purgeCachedData: false,
  },
  })
  ts
  // Layer: my-layer/nuxt.config.ts
  export default defineNuxtConfig({
  modules: ['layer-module-1', 'layer-module-2'],
  })

// Project: nuxt.config.ts
export default defineNuxtConfig({
extends: ['./my-layer'],
modules: ['project-module-1', 'project-module-2'],
})

// Loading order (corrected):
// 1. layer-module-1
// 2. layer-module-2
// 3. project-module-1 (can override layer modules)
// 4. project-module-2 (can override layer modules)
diff
const route = useRoute()

- console.log(route.meta.name)

* console.log(route.name)
  bash [Directory structure]
  ├─ components/
  ├─── SomeFolder/
  ├───── MyComponent.vue
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  normalizeComponentNames: false,
  },
  })
  diff
  useHead({
  meta: [{
  name: 'description',
  // meta tags don't need a vmid, or a key

- vmid: 'description'
- hid: 'description'
  }]
  })
  ts
  import { AliasSortingPlugin, TemplateParamsPlugin } from '@unhead/vue/plugins'

export default defineNuxtPlugin({
setup () {
const unhead = injectHead()
unhead.use(TemplateParamsPlugin)
unhead.use(AliasSortingPlugin)
},
})
diff
-import { useHead } from '@unhead/vue'
+import { useHead } from '#imports'
ts
export default defineNuxtConfig({
unhead: {
legacy: true,
},
})
html

<div id="__nuxt">
  <!-- spa loading template -->
</div>
html
<div id="__nuxt"></div>
<!-- spa loading template -->
ts [nuxt.config.ts] twoslash
export default defineNuxtConfig({
  experimental: {
    spaLoadingTemplateLocation: 'within',
  },
})
diff
  <script setup lang="ts">
  import type { NuxtError } from '#app'

const props = defineProps({
error: Object as () => NuxtError
})

- const data = JSON.parse(error.data)

* const data = error.data
  </script>
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  parseErrorData: false,
  },
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  features: {
  inlineStyles: true,
  },
  })
  diff
  export default defineNuxtConfig({
  hooks: {

-     'pages:extend'(pages) {

*     'pages:resolved'(pages) {
                        const myPage = pages.find(page => page.path === '/')
                        myPage.meta ||= {}
                        myPage.meta.layout = 'overridden-layout'
                      }
                    }
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  scanPageMeta: true,
  },
  })
  ts [app/pages/test/[slug\\].vue]
  // This would be unsafe in a dynamic page (e.g. `[slug].vue`) because the route slug makes a difference
  // to the data fetched, but Nuxt can't know that because it's not reflected in the key.
  const route = useRoute()
  const { data } = await useAsyncData(async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
})
// Instead, you should use a key that uniquely identifies the data fetched.
const { data } = await useAsyncData(route.params.slug, async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  sharedPrerenderData: false,
  },
  })
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  defaults: {
  useAsyncData: {
  value: 'null',
  errorValue: 'null',
  },
  },
  },
  })
  ts [app.vue] twoslash
  // @errors: 2322
  const { refresh } = await useAsyncData(() => Promise.resolve({ message: 'Hello, Nuxt!' }))

async function refreshData () {
await refresh({ dedupe: true })
}
diff
const { refresh } = await useAsyncData(async () => ({ message: 'Hello, Nuxt 3!' }))

async function refreshData () {

- await refresh({ dedupe: true })

* await refresh({ dedupe: 'cancel' })

- await refresh({ dedupe: false })

* await refresh({ dedupe: 'defer' })
  }
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
  experimental: {
  resetAsyncDataToUndefined: true,
  },
  })
  diff
  <template>

- <div v-if="!pending">

* <div v-if="status === 'success'">
        <p>Data: {{ data }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </template>
    <script setup lang="ts">
    const { data, pending, execute, status } = await useAsyncData(() => fetch('/api/data'), {
      immediate: false
    })
    onMounted(() => execute())
    </script>
  ts [nuxt.config.ts] twoslash
  export default defineNuxtConfig({
    experimental: {
      pendingWhenIdle: true,
    },
  })
  diff
    const id = ref('123')
    const { data, execute } = await useFetch('/api/test', {
      query: { id },
      immediate: false
    )
* watch(id, () => execute(), { once: true })
  ts
  // Or globally in your Nuxt config
  export default defineNuxtConfig({
  experimental: {
  alwaysRunFetchOnKeyChange: true,
  },
  })
  diff
  - const { data } = useFetch('/api/test')
  * const { data } = useFetch('/api/test', { deep: true })
    ts \[nuxt.config.ts] twoslash
    export default defineNuxtConfig({
    experimental: {
    defaults: {
    useAsyncData: {
    deep: true,
    },
    },
    },
    })
    diff
* import { relative, resolve } from 'node:fs'
  // ...
  nuxt.hook('builder:watch', async (event, path) => {
* path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
  // ...
  })
  diff

- console.log(window.**NUXT**)

* console.log(useNuxtApp().payload)
  ts
  export default defineNuxtConfig({
  hooks: {
  'app:resolve' (app) {
  app.middleware = app.middleware.filter(mw => !/\/index\.[^/]+$/.test(mw.path))
  },
  },
  })
  diff
* import { readFileSync } from 'node:fs'
* import { template } from 'es-toolkit/compat'
  // ...
  addTemplate({
  fileName: 'appinsights-vue.js'
  options: { /_ some options _/ },

- src: resolver.resolve('./runtime/plugin.ejs'),

* getContents({ options }) {
*     const contents = readFileSync(resolver.resolve('./runtime/plugin.ejs'), 'utf-8')
*     return template(contents)({ options })
* },
  })
  ts
  import { genDynamicImport, genImport, genSafeVariableName } from 'knitwork'

const serialize = (data: any) => JSON.stringify(data, null, 2).replace(/"\{(.+)\}"(?=,?$)/gm, r => JSON.parse(r).replace(/^\{(.*)\}$/, '$1'))

const importSources = (sources: string | string[], { lazy = false } = {}) => {
return toArray(sources).map((src) => {
if (lazy) {
return `const ${genSafeVariableName(src)} = ${genDynamicImport(src, { comment: `webpackChunkName: ${JSON.stringify(src)}` })}`
}
return genImport(src, genSafeVariableName(src))
}).join('\n')
}

const importName = genSafeVariableName
ts
export default defineNuxtConfig({
typescript: {
tsConfig: {
compilerOptions: {
noUncheckedIndexedAccess: false,
},
},
},
})
json
{
"files": [],
"references": [
{ "path": "./.nuxt/tsconfig.app.json" },
{ "path": "./.nuxt/tsconfig.server.json" },
{ "path": "./.nuxt/tsconfig.shared.json" },
{ "path": "./.nuxt/tsconfig.node.json" }
]
}
diff

- "typecheck": "nuxt prepare && vue-tsc --noEmit"

* "typecheck": "nuxt prepare && vue-tsc -b --noEmit"
  ts
  export default defineNuxtConfig({
  typescript: {
  // Customize app/server TypeScript config
  tsConfig: {
  compilerOptions: {
  strict: true,
  },
  },
  // Customize build-time TypeScript config
  nodeTsConfig: {
  compilerOptions: {
  strict: true,
  },
  },
  },
  })
  diff
  export default defineNuxtConfig({

- generate: {
- exclude: ['/admin', '/private'],
- routes: ['/sitemap.xml', '/robots.txt']
- }

* nitro: {
* prerender: {
*     ignore: ['/admin', '/private'],
*     routes: ['/sitemap.xml', '/robots.txt']
* }
* }
  })

````

::read-more{to="https://nitro.build/config#prerender"}
Read more about Nitro's prerender configuration options.
::

## Nuxt 2 vs. Nuxt 3+

In the table below, there is a quick comparison between 3 versions of Nuxt:

| Feature / Version       | Nuxt 2     | Nuxt Bridge | Nuxt 3+    |
| ----------------------- | ---------- | ----------- | ---------- |
| Vue                     | 2          | 2           | 3          |
| Stability               | 😊 Stable  | 😊 Stable   | 😊 Stable  |
| Performance             | 🏎 Fast    | ✈️ Faster   | 🚀 Fastest |
| Nitro Engine            | ❌          | ✅           | ✅          |
| ESM support             | 🌙 Partial | 👍 Better   | ✅          |
| TypeScript              | ☑️ Opt-in  | 🚧 Partial  | ✅          |
| Composition API         | ❌          | 🚧 Partial  | ✅          |
| Options API             | ✅          | ✅           | ✅          |
| Components Auto Import  | ✅          | ✅           | ✅          |
| `<script setup>` syntax | ❌          | 🚧 Partial  | ✅          |
| Auto Imports            | ❌          | ✅           | ✅          |
| webpack                 | 4          | 4           | 5          |
| Vite                    | ⚠️ Partial | 🚧 Partial  | ✅          |
| Nuxt CLI                | ❌ Old      | ✅ nuxt      | ✅ nuxt     |
| Static sites            | ✅          | ✅           | ✅          |

The migration guide provides a step-by-step comparison of Nuxt 2 features to Nuxt 3+ features and guidance to adapt your current application.

::read-more{to="https://nuxt.com/docs/migration/overview"}
Check out the **guide to migrating from Nuxt 2 to Nuxt 3**.
::

## Nuxt 2 to Nuxt Bridge

If you prefer to progressively migrate your Nuxt 2 application to Nuxt 3, you can use Nuxt Bridge. Nuxt Bridge is a compatibility layer that allows you to use Nuxt 3+ features in Nuxt 2 with an opt-in mechanism.

::read-more{to="https://nuxt.com/docs/bridge/overview"}
**Migrate from Nuxt 2 to Nuxt Bridge**
::

**Examples:**

Example 1 (unknown):
```unknown
::

This command will execute all codemods in sequence, with the option to deselect any that you do not wish to run. Each codemod is also listed below alongside its respective change and can be executed independently.

### New Directory Structure

🚦 **Impact Level**: Significant

Nuxt now defaults to a new directory structure, with backwards compatibility (so if Nuxt detects you are using the old structure, such as with a top-level `pages/` directory, this new structure will not apply).

👉 [See full RFC](https://github.com/nuxt/nuxt/issues/26444){rel="&#x22;nofollow&#x22;"}

#### What Changed

- the new Nuxt default `srcDir` is `app/` by default, and most things are resolved from there.
- `serverDir` now defaults to `<rootDir>/server` rather than `<srcDir>/server`
- `layers/`, `modules/` and `public/` are resolved relative to `<rootDir>` by default
- if using [Nuxt Content v2.13+](https://github.com/nuxt/content/pull/2649){rel="&#x22;nofollow&#x22;"}, `content/` is resolved relative to `<rootDir>`
- a new `dir.app` is added, which is the directory we look for `router.options.ts` and `spa-loading-template.html` - this defaults to `<srcDir>/`

An example v4 folder structure.
````

Example 2 (unknown):

```unknown
👉 For more details, see the [PR implementing this change](https://github.com/nuxt/nuxt/pull/27029){rel="&#x22;nofollow&#x22;"}.

#### Reasons for Change

1. **Performance** - placing all your code in the root of your repo causes issues with `.git/` and `node_modules/` folders being scanned/included by FS watchers which can significantly delay startup on non-Mac OSes.
2. **IDE type-safety** - `server/` and the rest of your app are running in two entirely different contexts with different global imports available, and making sure `server/` isn't *inside* the same folder as the rest of your app is a big first step to ensuring you get good auto-completes in your IDE.

::video-accordion
---
platform: vimeo
title: Watch a video from Vue School on the new directory structure
video-id: "1031028378"
---
::

#### Migration Steps

1. Create a new directory called `app/`.
2. Move your `assets/`, `components/`, `composables/`, `layouts/`, `middleware/`, `pages/`, `plugins/` and `utils/` folders under it, as well as `app.vue`, `error.vue`, `app.config.ts`. If you have an `app/router-options.ts` or `app/spa-loading-template.html`, these paths remain the same.
3. Make sure your `nuxt.config.ts`, `content/`, `layers/`, `modules/`, `public/` and `server/` folders remain outside the `app/` folder, in the root of your project.
4. Remember to update any third-party configuration files to work with the new directory structure, such as your `tailwindcss` or `eslint` configuration (if required - `@nuxtjs/tailwindcss` should automatically configure `tailwindcss` correctly).

::tip
You can automate this migration by running `npx codemod@latest nuxt/4/file-structure`
::

However, migration is *not required*. If you wish to keep your current folder structure, Nuxt should auto-detect it. (If it does not, please raise an issue.) The one exception is that if you *already* have a custom `srcDir`. In this case, you should be aware that your `modules/`, `public/` and `server/` folders will be resolved from your `rootDir` rather than from your custom `srcDir`. You can override this by configuring `dir.modules`, `dir.public` and `serverDir` if you need to.

You can also force a v3 folder structure with the following configuration:
```

Example 3 (unknown):

```unknown
### Singleton Data Fetching Layer

🚦 **Impact Level**: Moderate

#### What Changed

Nuxt's data fetching system (`useAsyncData` and `useFetch`) has been significantly reorganized for better performance and consistency:

1. **Shared refs for the same key**: All calls to `useAsyncData` or `useFetch` with the same key now share the same `data`, `error` and `status` refs. This means that it is important that all calls with an explicit key must not have conflicting `deep`, `transform`, `pick`, `getCachedData` or `default` options.
2. **More control over `getCachedData`**: The `getCachedData` function is now called every time data is fetched, even if this is caused by a watcher or calling `refreshNuxtData`. (Previously, new data was always fetched and this function was not called in these cases.) To allow more control over when to use cached data and when to refetch, the function now receives a context object with the cause of the request.
3. **Reactive key support**: You can now use computed refs, plain refs or getter functions as keys, which enables automatic data refetching (and stores data separately).
4. **Data cleanup**: When the last component using data fetched with `useAsyncData` is unmounted, Nuxt will remove that data to avoid ever-growing memory usage.

#### Reasons for Change

These changes have been made to improve memory usage and increase consistency with loading states across calls of `useAsyncData`.

#### Migration Steps

1. **Check for inconsistent options**: Review any components using the same key with different options or fetch functions.
```

Example 4 (unknown):

```unknown
It may be beneficial to extract any calls to `useAsyncData` that share an explicit key (and have custom options) into their own composable:
```

---

## composables

**URL:** llms-txt#composables

**Contents:**

- Usage
- Types
- Examples
  - Nested Composables
  - Access plugin injections
- How Files Are Scanned

**Method 1:** Using named export

**Method 2:** Using default export

**Usage:** You can now use auto imported composable in `.js`, `.ts` and `.vue` files

::note
The `composables/` directory in Nuxt does not provide any additional reactivity capabilities to your code. Instead, any reactivity within composables is achieved using Vue's Composition API mechanisms, such as ref and reactive. Note that reactive code is also not limited to the boundaries of the `composables/` directory. You are free to employ reactivity features wherever they're needed in your application.
::

::read-more{to="https://nuxt.com/docs/guide/concepts/auto-imports"}
::

::link-example{to="https://nuxt.com/docs/examples/features/auto-imports"}
::

Under the hood, Nuxt auto generates the file `.nuxt/imports.d.ts` to declare the types.

Be aware that you have to run [`nuxt prepare`](https://nuxt.com/docs/3.x/api/commands/prepare), [`nuxt dev`](https://nuxt.com/docs/3.x/api/commands/dev) or [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build) in order to let Nuxt generate the types.

::note
If you create a composable without having the dev server running, TypeScript will throw an error, such as `Cannot find name 'useBar'.`
::

### Nested Composables

You can use a composable within another composable using auto imports:

### Access plugin injections

You can access [plugin injections](https://nuxt.com/docs/3.x/directory-structure/plugins#providing-helpers) from composables:

## How Files Are Scanned

Nuxt only scans files at the top level of the [`composables/` directory](https://nuxt.com/docs/3.x/directory-structure/composables), e.g.:

Only `composables/index.ts` and `composables/useFoo.ts` would be searched for imports.

To get auto imports working for nested modules, you could either re-export them (recommended) or configure the scanner to include nested directories:

**Example:** Re-export the composables you need from the `composables/index.ts` file:

**Example:** Scan nested directories inside the `composables/` folder:

**Examples:**

Example 1 (unknown):

```unknown
**Method 2:** Using default export
```

Example 2 (unknown):

```unknown
**Usage:** You can now use auto imported composable in `.js`, `.ts` and `.vue` files
```

Example 3 (unknown):

```unknown
::note
The `composables/` directory in Nuxt does not provide any additional reactivity capabilities to your code. Instead, any reactivity within composables is achieved using Vue's Composition API mechanisms, such as ref and reactive. Note that reactive code is also not limited to the boundaries of the `composables/` directory. You are free to employ reactivity features wherever they're needed in your application.
::

::read-more{to="https://nuxt.com/docs/guide/concepts/auto-imports"}
::

::link-example{to="https://nuxt.com/docs/examples/features/auto-imports"}
::

## Types

Under the hood, Nuxt auto generates the file `.nuxt/imports.d.ts` to declare the types.

Be aware that you have to run [`nuxt prepare`](https://nuxt.com/docs/3.x/api/commands/prepare), [`nuxt dev`](https://nuxt.com/docs/3.x/api/commands/dev) or [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build) in order to let Nuxt generate the types.

::note
If you create a composable without having the dev server running, TypeScript will throw an error, such as `Cannot find name 'useBar'.`
::

## Examples

### Nested Composables

You can use a composable within another composable using auto imports:
```

Example 4 (unknown):

```unknown
### Access plugin injections

You can access [plugin injections](https://nuxt.com/docs/3.x/directory-structure/plugins#providing-helpers) from composables:
```

---

## SEO and Meta

**URL:** llms-txt#seo-and-meta

**Contents:**

- Nuxt Config
  - Defaults Tags
- `useHead`
- `useSeoMeta`
- Components
- Types
- Features
  - Reactivity
  - Title Template
  - Template Params

Nuxt head tag management is powered by [Unhead](https://unhead.unjs.io){rel="&#x22;nofollow&#x22;"}. It provides sensible defaults, several powerful composables
and numerous configuration options to manage your app's head and SEO meta tags.

Providing an [`app.head`](https://nuxt.com/docs/3.x/api/nuxt-config#head) property in your [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) allows you to statically customize the head for your entire app.

::important
This method does not allow you to provide reactive data. We recommend using `useHead()` in `app.vue`.
::

It's good practice to set tags here that won't change such as your site title default, language and favicon.

You can also provide any of the keys listed below in [Types](https://nuxt.com/#types).

Some tags are provided by Nuxt by default to ensure your website works well out of the box.

- `viewport`: `width=device-width, initial-scale=1`
- `charset`: `utf-8`

While most sites won't need to override these defaults, you can update them using the keyed shortcuts.

The [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable function supports reactive input, allowing you to manage your head tags programmatically.

We recommend taking a look at the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) and [`useHeadSafe`](https://nuxt.com/docs/3.x/api/composables/use-head-safe) composables.

The [`useSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-seo-meta) composable lets you define your site's SEO meta tags as an object with full type safety.

This helps you avoid typos and common mistakes, such as using `name` instead of `property`.

::read-more{to="https://nuxt.com/docs/api/composables/use-seo-meta"}
::

While using [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) is recommended in all cases, you may have a personal preference for defining your head tags in your template using components.

Nuxt provides the following components for this purpose: `<Title>`, `<Base>`, `<NoScript>`, `<Style>`, `<Meta>`, `<Link>`, `<Body>`, `<Html>` and `<Head>`. Note
the capitalization of these components ensuring we don't use invalid native HTML tags.

`<Head>` and `<Body>` can accept nested meta tags (for aesthetic reasons) but this does not affect _where_ the nested meta tags are rendered in the final HTML.

It's suggested to wrap your components in either a `<Head>` or `<Html>` components as tags will be deduped more intuitively.

Below are the non-reactive types used for [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head), [`app.head`](https://nuxt.com/docs/3.x/api/nuxt-config#head) and components.

See [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts){rel="&#x22;nofollow&#x22;"} for more detailed types.

Reactivity is supported on all properties, by providing a computed value, a getter, or a reactive object.

You can use the `titleTemplate` option to provide a dynamic template for customizing the title of your site. For example, you could add the name of your site to the title of every page.

The `titleTemplate` can either be a string, where `%s` is replaced with the title, or a function.

If you want to use a function (for full control), then this cannot be set in your `nuxt.config`. It is recommended instead to set it within your `app.vue` file where it will apply to all pages on your site:

Now, if you set the title to `My Page` with [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) on another page of your site, the title would appear as 'My Page - Site Title' in the browser tab. You could also pass `null` to default to 'Site Title'.

You can use `templateParams` to provide additional placeholders in your `titleTemplate` besides the default `%s`. This allows for more dynamic title generation.

You can use the `tagPosition: 'bodyClose'` option on applicable tags to append them to the end of the `<body>` tag.

### With `definePageMeta`

Within your [`pages/` directory](https://nuxt.com/docs/3.x/directory-structure/pages), you can use `definePageMeta` along with [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) to set metadata based on the current route.

For example, you can first set the current page title (this is extracted at build time via a macro, so it can't be set dynamically):

And then in your layout file, you might use the route's metadata you have previously set:

::link-example{to="https://nuxt.com/docs/examples/features/meta-tags"}
::

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/pages/#page-metadata

::

In the example below, `titleTemplate` is set either as a string with the `%s` placeholder or as a `function`, which allows greater flexibility in setting the page title dynamically for each route of your Nuxt app:

`nuxt.config` is also used as an alternative way of setting the page title. However, `nuxt.config` does not allow the page title to be dynamic. Therefore, it is recommended to use `titleTemplate` in the `app.vue` file to add a dynamic title, which is then applied to all routes of your Nuxt app.

The example below shows how you might enable Google Fonts using either the `link` property of the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable or using the `<Link>` component:

**Examples:**

Example 1 (unknown):

```unknown
You can also provide any of the keys listed below in [Types](https://nuxt.com/#types).

### Defaults Tags

Some tags are provided by Nuxt by default to ensure your website works well out of the box.

- `viewport`: `width=device-width, initial-scale=1`
- `charset`: `utf-8`

While most sites won't need to override these defaults, you can update them using the keyed shortcuts.
```

Example 2 (unknown):

```unknown
## `useHead`

The [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) composable function supports reactive input, allowing you to manage your head tags programmatically.
```

Example 3 (unknown):

```unknown
We recommend taking a look at the [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) and [`useHeadSafe`](https://nuxt.com/docs/3.x/api/composables/use-head-safe) composables.

## `useSeoMeta`

The [`useSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-seo-meta) composable lets you define your site's SEO meta tags as an object with full type safety.

This helps you avoid typos and common mistakes, such as using `name` instead of `property`.
```

Example 4 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/api/composables/use-seo-meta"}
::

## Components

While using [`useHead`](https://nuxt.com/docs/3.x/api/composables/use-head) is recommended in all cases, you may have a personal preference for defining your head tags in your template using components.

Nuxt provides the following components for this purpose: `<Title>`, `<Base>`, `<NoScript>`, `<Style>`, `<Meta>`, `<Link>`, `<Body>`, `<Html>` and `<Head>`. Note
the capitalization of these components ensuring we don't use invalid native HTML tags.

`<Head>` and `<Body>` can accept nested meta tags (for aesthetic reasons) but this does not affect *where* the nested meta tags are rendered in the final HTML.
```

---

## useRequestHeaders

**URL:** llms-txt#userequestheaders

**Contents:**

- Example

You can use built-in [`useRequestHeaders`](https://nuxt.com/docs/3.x/api/composables/use-request-headers) composable to access the incoming request headers within your pages, components, and plugins.

::tip
In the browser, `useRequestHeaders` will return an empty object.
::

We can use `useRequestHeaders` to access and proxy the initial request's `authorization` header to any future internal requests during SSR.

The example below adds the `authorization` request header to an isomorphic `$fetch` call.

**Examples:**

Example 1 (ts):

```ts
// Get all request headers
const headers = useRequestHeaders();

// Get only cookie request header
const { cookie } = useRequestHeaders(['cookie']);
```

---

## useHead

**URL:** llms-txt#usehead

**Contents:**

- Usage
- Type
- Parameters
- Return Values
- Examples
  - Basic Meta Tags
  - Reactive Meta Tags
  - Using a Function for Full Reactivity
  - Adding External Scripts and Styles
  - Body and HTML Attributes

The `useHead` composable allows you to manage your head tags in a programmatic and reactive way, powered by [Unhead](https://unhead.unjs.io){rel="&#x22;nofollow&#x22;"}. It lets you customize the meta tags, links, scripts, and other elements in the `<head>` section of your HTML document.

::warning
If the data comes from a user or other untrusted source, we recommend you check out [`useHeadSafe`](https://nuxt.com/docs/3.x/api/composables/use-head-safe).
::

::note
The properties of `useHead` can be dynamic, accepting `ref`, `computed` and `reactive` properties. The `meta` parameter can also accept a function returning an object to make the entire object reactive.
::

See [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts){rel="&#x22;nofollow&#x22;"} for more detailed types.

`meta`: An object accepting head metadata properties to customize the page's `<head>` section. All properties support reactive values (`ref`, `computed`, `reactive`) or can be a function returning the metadata object.

| Property        | Type             | Description                                                                                                                     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `title`         | `string`         | Sets the page title.                                                                                                            |
| `titleTemplate` | `string          | ((title?: string) => string)`                                                                                                   | Configures a dynamic template to customize the page title. Can be a string with `%s` placeholder or a function. |
| `base`          | `Base`           | Sets the `<base>` tag for the document.                                                                                         |
| `link`          | `Link[]`         | Array of link objects. Each element is mapped to a `<link>` tag, where object properties correspond to HTML attributes.         |
| `meta`          | `Meta[]`         | Array of meta objects. Each element is mapped to a `<meta>` tag, where object properties correspond to HTML attributes.         |
| `style`         | `Style[]`        | Array of style objects. Each element is mapped to a `<style>` tag, where object properties correspond to HTML attributes.       |
| `script`        | `Script[]`       | Array of script objects. Each element is mapped to a `<script>` tag, where object properties correspond to HTML attributes.     |
| `noscript`      | `Noscript[]`     | Array of noscript objects. Each element is mapped to a `<noscript>` tag, where object properties correspond to HTML attributes. |
| `htmlAttrs`     | `HtmlAttributes` | Sets attributes of the `<html>` tag. Each object property is mapped to the corresponding attribute.                             |
| `bodyAttrs`     | `BodyAttributes` | Sets attributes of the `<body>` tag. Each object property is mapped to the corresponding attribute.                             |

This composable does not return any value. It registers the head metadata with Unhead, which manages the actual DOM updates.

### Reactive Meta Tags

### Using a Function for Full Reactivity

### Adding External Scripts and Styles

### Body and HTML Attributes

::read-more{to="https://nuxt.com/docs/3.x/getting-started/seo-meta"}
::

**Examples:**

Example 1 (unknown):

```unknown
::warning
If the data comes from a user or other untrusted source, we recommend you check out [`useHeadSafe`](https://nuxt.com/docs/3.x/api/composables/use-head-safe).
::

::note
The properties of `useHead` can be dynamic, accepting `ref`, `computed` and `reactive` properties. The `meta` parameter can also accept a function returning an object to make the entire object reactive.
::

## Type
```

Example 2 (unknown):

```unknown
See [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts){rel="&#x22;nofollow&#x22;"} for more detailed types.

## Parameters

`meta`: An object accepting head metadata properties to customize the page's `<head>` section. All properties support reactive values (`ref`, `computed`, `reactive`) or can be a function returning the metadata object.

| Property        | Type                                    | Description                                                                                                                     |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | `string`                                | Sets the page title.                                                                                                            |
| `titleTemplate` | `string | ((title?: string) => string)` | Configures a dynamic template to customize the page title. Can be a string with `%s` placeholder or a function.                 |
| `base`          | `Base`                                  | Sets the `<base>` tag for the document.                                                                                         |
| `link`          | `Link[]`                                | Array of link objects. Each element is mapped to a `<link>` tag, where object properties correspond to HTML attributes.         |
| `meta`          | `Meta[]`                                | Array of meta objects. Each element is mapped to a `<meta>` tag, where object properties correspond to HTML attributes.         |
| `style`         | `Style[]`                               | Array of style objects. Each element is mapped to a `<style>` tag, where object properties correspond to HTML attributes.       |
| `script`        | `Script[]`                              | Array of script objects. Each element is mapped to a `<script>` tag, where object properties correspond to HTML attributes.     |
| `noscript`      | `Noscript[]`                            | Array of noscript objects. Each element is mapped to a `<noscript>` tag, where object properties correspond to HTML attributes. |
| `htmlAttrs`     | `HtmlAttributes`                        | Sets attributes of the `<html>` tag. Each object property is mapped to the corresponding attribute.                             |
| `bodyAttrs`     | `BodyAttributes`                        | Sets attributes of the `<body>` tag. Each object property is mapped to the corresponding attribute.                             |

## Return Values

This composable does not return any value. It registers the head metadata with Unhead, which manages the actual DOM updates.

## Examples

### Basic Meta Tags
```

Example 3 (unknown):

```unknown
### Reactive Meta Tags
```

Example 4 (unknown):

```unknown
### Using a Function for Full Reactivity
```

---

## utils

**URL:** llms-txt#utils

**Contents:**

- Usage

The main purpose of the [`utils/` directory](https://nuxt.com/docs/3.x/directory-structure/utils) is to allow a semantic distinction between your Vue composables and other auto-imported utility functions.

**Method 1:** Using named export

**Method 2:** Using default export

You can now use auto imported utility functions in `.js`, `.ts` and `.vue` files

::read-more{to="https://nuxt.com/docs/guide/concepts/auto-imports"}
::

::link-example{to="https://nuxt.com/docs/examples/features/auto-imports"}
::

::tip
The way `utils/` auto-imports work and are scanned is identical to the [`composables/`](https://nuxt.com/docs/3.x/directory-structure/composables) directory.
::

::important
These utils are only available within the Vue part of your app. :br
Only `server/utils` are auto-imported in the [`server/`](https://nuxt.com/docs/3.x/directory-structure/server#server-utilities) directory.
::

**Examples:**

Example 1 (unknown):

```unknown
**Method 2:** Using default export
```

Example 2 (unknown):

```unknown
You can now use auto imported utility functions in `.js`, `.ts` and `.vue` files
```

---

## Run tests in watch mode

**URL:** llms-txt#run-tests-in-watch-mode

**Contents:**

- 🎭 Built-In Mocks
- 🛠️ Helpers
- Using `@vue/test-utils`
- End-To-End Testing
  - Setup
  - APIs
  - Testing in a Browser

npx vitest --watch
ts twoslash
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
test: {
environmentOptions: {
nuxt: {
mock: {
intersectionObserver: true,
indexedDb: true,
},
},
},
},
})
ts twoslash
// @noErrors
import { expect, it } from 'vitest'
import type { Component } from 'vue'

declare module '#components' {
export const SomeComponent: Component
}
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'

it('can mount some component', async () => {
const component = await mountSuspended(SomeComponent)
expect(component.text()).toMatchInlineSnapshot(
'"This is an auto-imported component"',
)
})
ts twoslash
// @noErrors
import { expect, it } from 'vitest'
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

// tests/App.nuxt.spec.ts
it('can also mount an app', async () => {
const component = await mountSuspended(App, { route: '/test' })
expect(component.html()).toMatchInlineSnapshot(`       "<div>This is an auto-imported component</div>
      <div> I am a global component </div>
      <div>/</div>
      <a href="/test"> Test link </a>"
    `)
})
ts twoslash
// @noErrors
import { expect, it } from 'vitest'
import type { Component } from 'vue'

declare module '#components' {
export const SomeComponent: Component
}
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'
import { screen } from '@testing-library/vue'

it('can render some component', async () => {
await renderSuspended(SomeComponent)
expect(screen.getByText('This is an auto-imported component')).toBeDefined()
})
ts twoslash
// @noErrors
import { expect, it } from 'vitest'
// ---cut---
// tests/App.nuxt.spec.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('can also render an app', async () => {
const html = await renderSuspended(App, { route: '/test' })
expect(html).toMatchInlineSnapshot(`     "<div id="test-wrapper">
      <div>This is an auto-imported component</div>
      <div> I am a global component </div>
      <div>Index page</div><a href="/test"> Test link </a>
    </div>"
  `)
})
ts twoslash
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useStorage', () => {
return () => {
return { value: 'mocked storage' }
}
})

// your tests here
ts twoslash
import { vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const { useStorageMock } = vi.hoisted(() => {
return {
useStorageMock: vi.fn(() => {
return { value: 'mocked storage' }
}),
}
})

mockNuxtImport('useStorage', () => {
return useStorageMock
})

// Then, inside a test
useStorageMock.mockImplementation(() => {
return { value: 'something else' }
})
ts twoslash
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('MyComponent', {
props: {
value: String,
},
setup (props) {
// ...
},
})

// relative path or alias also works
mockComponent('~/components/my-component.vue', () => {
// or a factory function
return defineComponent({
setup (props) {
// ...
},
})
})

// or you can use SFC for redirecting to a mock component
mockComponent('MyComponent', () => import('./MockComponent.vue'))

// your tests here
ts twoslash
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('MyComponent', async () => {
const { ref, h } = await import('vue')

return defineComponent({
setup (props) {
const counter = ref(0)
return () => h('div', null, counter.value)
},
})
})
ts twoslash
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/test/', () => ({
test: 'test-field',
}))
ts twoslash
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/test/', {
method: 'POST',
handler: () => ({ test: 'test-field' }),
})
ts twoslash
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useStorage', () => {
return () => {
return { value: 'mocked storage' }
}
})
ts twoslash
import { $fetch, setup } from '@nuxt/test-utils/e2e'

await setup({
setupTimeout: 10000,
})

// ...
bash [npm]
npm i --save-dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
bash [yarn]
yarn add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
bash [pnpm]
pnpm add -D vitest @vue/test-utils happy-dom @vitejs/plugin-vue
bash [bun]
bun add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
plugins: [vue()],
test: {
environment: 'happy-dom',
},
})
json
"scripts": {
"build": "nuxt build",
"dev": "nuxt dev",
...
"test": "vitest"
},
vue
<template>

  <p>Hello world</p>
</template>
ts twoslash
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
it('component renders Hello world properly', () => {
const wrapper = mount(HelloWorld)
expect(wrapper.text()).toContain('Hello world')
})
})
bash [npm]
npm run test
bash [yarn]
yarn test
bash [pnpm]
pnpm run test
bash [bun]
bun run test
ts [test/my-test.spec.ts] twoslash
import { describe, test } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('My test', async () => {
await setup({
// test context options
})

test('my test', () => {
// ...
})
})
ts twoslash
import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('login page', async () => {
await setup({
host: 'http://localhost:8787',
})

it('displays the email and password fields', async () => {
const page = await createPage('/login')
expect(await page.getByTestId('email').isVisible()).toBe(true)
expect(await page.getByTestId('password').isVisible()).toBe(true)
})
})
ts twoslash
import { $fetch } from '@nuxt/test-utils/e2e'

const html = await $fetch('/')
ts twoslash
import { fetch } from '@nuxt/test-utils/e2e'

const res = await fetch('/')
const { body, headers } = res
ts twoslash
import { url } from '@nuxt/test-utils/e2e'

const pageUrl = url('/page')
// 'http://localhost:6840/page'
ts twoslash
import { createPage } from '@nuxt/test-utils/e2e'

const page = await createPage('/page')
// you can access all the Playwright APIs from the `page` variable
bash [npm]
npm i --save-dev @playwright/test @nuxt/test-utils
bash [yarn]
yarn add --dev @playwright/test @nuxt/test-utils
bash [pnpm]
pnpm add -D @playwright/test @nuxt/test-utils
bash [bun]
bun add --dev @playwright/test @nuxt/test-utils
ts [playwright.config.ts]
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
use: {
nuxt: {
rootDir: fileURLToPath(new URL('.', import.meta.url)),
},
},
// ...
})
ts [tests/example.test.ts]
import { expect, test } from '@nuxt/test-utils/playwright'

test('test', async ({ page, goto }) => {
await goto('/', { waitUntil: 'hydration' })
await expect(page.getByRole('heading')).toHaveText('Welcome to Playwright!')
})
ts [tests/example.test.ts]
import { expect, test } from '@nuxt/test-utils/playwright'

test.use({
nuxt: {
rootDir: fileURLToPath(new URL('..', import.meta.url)),
},
})

test('test', async ({ page, goto }) => {
await goto('/', { waitUntil: 'hydration' })
await expect(page.getByRole('heading')).toHaveText('Welcome to Playwright!')
})

````

**Examples:**

Example 1 (unknown):
```unknown
::warning
When you run your tests within the Nuxt environment, they will be running in a [`happy-dom`](https://github.com/capricorn86/happy-dom){rel=""nofollow""} or [`jsdom`](https://github.com/jsdom/jsdom){rel=""nofollow""} environment. Before your tests run, a global Nuxt app will be initialized (including, for example, running any plugins or code you've defined in your `app.vue`).

This means you should take particular care not to mutate the global state in your tests (or, if you need to, to reset it afterwards).
::

### 🎭 Built-In Mocks

`@nuxt/test-utils` provides some built-in mocks for the DOM environment.

#### `intersectionObserver`

Default `true`, creates a dummy class without any functionality for the IntersectionObserver API

#### `indexedDB`

Default `false`, uses [`fake-indexeddb`](https://github.com/dumbmatter/fakeIndexedDB){rel="&#x22;nofollow&#x22;"} to create a functional mock of the IndexedDB API

These can be configured in the `environmentOptions` section of your `vitest.config.ts` file:
````

Example 2 (unknown):

```unknown
### 🛠️ Helpers

`@nuxt/test-utils` provides a number of helpers to make testing Nuxt apps easier.

#### `mountSuspended`

`mountSuspended` allows you to mount any Vue component within the Nuxt environment, allowing async setup and access to injections from your Nuxt plugins.

::note
Under the hood, `mountSuspended` wraps `mount` from `@vue/test-utils`, so you can check out [the Vue Test Utils documentation](https://test-utils.vuejs.org/guide/){rel=""nofollow""} for more on the options you can pass, and how to use this utility.
::

For example:
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
#### `renderSuspended`

`renderSuspended` allows you to render any Vue component within the Nuxt environment using `@testing-library/vue`, allowing async setup and access to injections from your Nuxt plugins.

This should be used together with utilities from Testing Library, e.g. `screen` and `fireEvent`. Install [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro){rel="&#x22;nofollow&#x22;"} in your project to use these.

Additionally, Testing Library also relies on testing globals for cleanup. You should turn these on in your [Vitest config](https://vitest.dev/config/#globals){rel="&#x22;nofollow&#x22;"}.

The passed in component will be rendered inside a `<div id="test-wrapper"></div>`.

Examples:
```

---

## preloadRouteComponents

**URL:** llms-txt#preloadroutecomponents

**Contents:**

- Example

Preloading routes loads the components of a given route that the user might navigate to in future. This ensures that the components are available earlier and less likely to block the navigation, improving performance.

::tip{icon="i-lucide-rocket"}
Nuxt already automatically preloads the necessary routes if you're using the `NuxtLink` component.
::

::read-more{to="https://nuxt.com/docs/api/components/nuxt-link"}
::

Preload a route when using `navigateTo`.

::read-more{to="https://nuxt.com/docs/api/utils/navigate-to"}
::

::note
On server, `preloadRouteComponents` will have no effect.
::

**Examples:**

Example 1 (ts):

```ts
// we don't await this async function, to avoid blocking rendering
// this component's setup function
preloadRouteComponents('/dashboard');

const submit = async () => {
  const results = await $fetch('/api/authentication');

  if (results.token) {
    await navigateTo('/dashboard');
  }
};
```

---

## NuxtApp

**URL:** llms-txt#nuxtapp

**Contents:**

- Nuxt App Interface
- The Nuxt Context
- Accessing NuxtApp
- Providing Helpers

In Nuxt, you can access runtime app context within composables, components and plugins.

## ::read-more

target: \_blank
to: https://v2.nuxt.com/docs/internals-glossary/context#the-context

---

In Nuxt 2, this was referred to as **Nuxt context**.
::

## Nuxt App Interface

## ::read-more

## to: https://nuxt.com/docs/guide/going-further/internals#the-nuxtapp-interface

Jump over the `NuxtApp` interface documentation.
::

Many composables and utilities, both built-in and user-made, may require access to the Nuxt instance. This doesn't exist everywhere on your application, because a fresh instance is created on every request.

Currently, the Nuxt context is only accessible in [plugins](https://nuxt.com/docs/3.x/directory-structure/plugins), [Nuxt hooks](https://nuxt.com/docs/3.x/guide/going-further/hooks), [Nuxt middleware](https://nuxt.com/docs/3.x/directory-structure/middleware) (if wrapped in `defineNuxtRouteMiddleware`), and [setup functions](https://vuejs.org/api/composition-api-setup.html){rel="&#x22;nofollow&#x22;"} (in pages and components).

If a composable is called without access to the context, you may get an error stating that 'A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function.' In that case, you can also explicitly call functions within this context by using [`nuxtApp.runWithContext`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app#runwithcontext).

Within composables, plugins and components you can access `nuxtApp` with [`useNuxtApp()`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app):

If your composable does not always need `nuxtApp` or you simply want to check if it is present or not, since [`useNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) throws an exception, you can use [`tryUseNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app#tryusenuxtapp) instead.

Plugins also receive `nuxtApp` as the first argument for convenience.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

You can provide helpers to be usable across all composables and application. This usually happens within a Nuxt plugin.

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/plugins#providing-helpers

It is possible to inject helpers by returning an object with a `provide` key in plugins.
::

## ::read-more

target: \_blank
to: https://v2.nuxt.com/docs/directory-structure/plugins#inject-in-root--context

---

In Nuxt 2 plugins, this was referred to as **inject function**.
::

**Examples:**

Example 1 (unknown):

```unknown
If your composable does not always need `nuxtApp` or you simply want to check if it is present or not, since [`useNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) throws an exception, you can use [`tryUseNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app#tryusenuxtapp) instead.

Plugins also receive `nuxtApp` as the first argument for convenience.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

## Providing Helpers

You can provide helpers to be usable across all composables and application. This usually happens within a Nuxt plugin.
```

---
