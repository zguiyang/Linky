# Nuxt - Other

**Pages:** 243

---

## Announcing Nuxt 4.0

**URL:** llms-txt#announcing-nuxt-4.0

**Contents:**

- 🔥 What's new?
  - 🗂️ New project structure
  - 🔄 Smarter data fetching
  - 🔧 Better TypeScript experience
  - ⚡ Faster CLI and development
- 🚀 How to upgrade
  - 1. Update Nuxt
  - 2. Optional: use migration tools
  - 3. Test and adjust
- 🗺️ What's next?

**Nuxt 4.0 is here!** 🎉

After a year of real-world testing, we're excited to announce the official release of Nuxt 4. This is a stability-focused major release, introducing a few thoughtful breaking changes in order to improve development experience.

If you've been following along, you'll recognize many of these features and changes — and if you're new to them, we hope you'll welcome them.

Nuxt 4 is all about making your development experience smoother:

- **Cleaner project organization** with the new `app/` directory structure
- **Smarter data fetching** - we've taken the opportunity to address some inconsistencies and improve performance with the data layer
- **Better TypeScript support** with project-based separation between the different contexts in your project - app code, server code, `shared/` folder, and configuration
- **Faster CLI and development** with adoption of internal sockets and a faster CLI

Why these features in particular? Mostly because these kind of improvements have required making changes that are technically breaking.

In general, we aim for a hype-free approach to releases. Rather than save up features for a big release, we've been shipping improvements in Nuxt 3 minor releases.

We've also spent a lot of time figuring out how to implement these changes in a backwards-compatible way, and I hope that means that most Nuxt 3 projects can upgrade with a minimum of effort.

I'd advise reading through the [upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade) before you start, to understand what areas of your app might be affected.

### 🗂️ New project structure

The biggest visible change is how projects are organized. Your application code now lives in an `app/` directory by default:

This helps keep your code separate from `node_modules/` and `.git/`, which makes file watchers faster (especially on Windows and Linux). It also gives your IDE better context about whether you're working with client or server code.

::tip
**Don't want to migrate?** That's totally fine! Nuxt will detect your existing structure and keep working exactly as before.
::

#### 🎨 Updated UI templates

Nuxt’s starter templates have an all new look, with improved accessibility, default titles, and template polish ([#27843](https://github.com/nuxt/nuxt/pull/27843){rel="&#x22;nofollow&#x22;"}).

### 🔄 Smarter data fetching

We've made `useAsyncData` and `useFetch` work better. Multiple components using the same key now share their data automatically. There's also automatic cleanup when components unmount, and you can use reactive keys to refetch data when needed. Plus, we've given you more control over when cached data gets used.

Some of these features have already been made available in Nuxt v3 minor releases, because we've been rolling this out gradually. Nuxt v4 brings different defaults, and we expect to continue to work on this data layer in the days to come.

### 🔧 Better TypeScript experience

Nuxt now creates separate TypeScript projects for your app code, server code, `shared/` folder, and builder code. This should mean better autocompletion, more accurate type inference and fewer confusing errors when you're working in different contexts.

::tip
With Nuxt 4, you will only need one `tsconfig.json` file in your project root!
::

This is probably the single issue that is most likely to cause surprises when upgrading, but it should also make your TypeScript experience much smoother in the long run. Please report any issues you encounter. 🙏

### ⚡ Faster CLI and development

In parallel with the release of v4, we've been working on speeding up `@nuxt/cli`.

- **Faster cold starts** - Development server startup is noticeably faster
- **Node.js compile cache** - Automatic reuse of the v8 compile cache
- **Native file watching** - Uses `fs.watch` APIs for fewer system resources
- **Socket-based communication** - The CLI and Vite dev server now communicate via internal sockets instead of network ports, reducing overhead — particularly on Windows

These improvements combined can make a really noticeable difference in your day-to-day development experience, and we have more planned.

Although any major release brings breaking changes, one of our main aims for this release is to ensure that the upgrade path is as smooth as possible. Most of the breaking changes have been testable with a compatibility flag for over a year.

Most projects should upgrade smoothly, but there are a few things to be aware of:

- Nuxt 2 compatibility has been removed from `@nuxt/kit`. (This will particularly affect module authors.)
- Some legacy utilities and deprecated features have been cleaned up.
- The new TypeScript setup might surface some type issues that were hidden before.
- A few modules might need further updates for full Nuxt 4 compatibility.

Don't worry though — for most breaking changes, there are configuration options to revert to the old behavior while you adjust.

Our recommendation for upgrading is to run:

This will deduplicate your lockfile as well, and help ensure that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

### 2. Optional: use migration tools

We’ve also partnered with [Codemod](https://github.com/codemod-com/codemod){rel="&#x22;nofollow&#x22;"} to automate many, though not all, migration steps:

### 3. Test and adjust

Run your tests, check that everything builds correctly, and fix any issues that come up. The [upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade) has detailed migration steps for specific scenarios.

We'd recommend reading through it in full before starting your upgrade, to understand what areas of your app might be affected.

We're planning quick patch releases to address any issues that come up. Nuxt 3 will continue to receive maintenance updates (both bug fixes and backports of features from Nuxt 4) until the end of January 2026, so there's no rush if you need time to migrate.

Looking ahead, we plan to release Nuxt 5 on the sooner side, which will bring Nitro v3 and h3 v2 for even better performance, as well as adopting the Vite Environment API for an improved (and faster!) development experience. And there's a lot more in the works too!

And, quite apart from major releases, we have a lot of exciting features planned to make their way into Nuxt 3.x and 4.x release branches, including support for SSR streaming ([#4753](https://github.com/nuxt/nuxt/issues/4753){rel="&#x22;nofollow&#x22;"}), a first-party accessibility module ([#23255](https://github.com/nuxt/nuxt/issues/23255){rel="&#x22;nofollow&#x22;"}), built-in fetch caching strategies ([#26017](https://github.com/nuxt/nuxt/issues/26017){rel="&#x22;nofollow&#x22;"}), more strongly typed fetch calls (landing in Nitro v3), dynamic route discovery ([#32196](https://github.com/nuxt/nuxt/issues/32196){rel="&#x22;nofollow&#x22;"}), multi-app support ([#21635](https://github.com/nuxt/nuxt/issues/21635){rel="&#x22;nofollow&#x22;"}) and more.

This release is credit to so many people, particularly those who have been testing v4 compatibility mode over the past year. I'm really grateful — thank you for all your help!

Happy coding with Nuxt 4! 🚀

## 📑 Full release notes

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/releases/tag/v4.0.0

---

Read the full release notes of Nuxt `v4.0.0`.
::

A huge thank you to everyone who's been a part of this release. ❤️

**Examples:**

Example 1 (bash):

```bash
my-nuxt-app/
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ plugins/
│  ├─ utils/
│  ├─ app.vue
│  ├─ app.config.ts
│  └─ error.vue
├─ content/
├─ public/
├─ shared/
├─ server/
└─ nuxt.config.ts
```

Example 2 (sh):

```sh
npx nuxt upgrade --dedupe
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown

```

---

## Logging

**URL:** llms-txt#logging

**Contents:**

- `useLogger`
  - Usage
  - Type
  - Parameters
  - Examples

Nuxt provides a logger instance that you can use to log messages with extra features. `useLogger` allows you to get a logger instance.

Returns a logger instance. It uses [consola](https://github.com/unjs/consola){rel="&#x22;nofollow&#x22;"} under the hood.

**`tag`**: A tag to suffix all log messages with, displayed on the right near the timestamp.

**`options`**: Consola configuration options.

**Examples:**

Example 1 (unknown):

```unknown
### Type
```

Example 2 (unknown):

```unknown
### Parameters

**`tag`**: A tag to suffix all log messages with, displayed on the right near the timestamp.

**`options`**: Consola configuration options.

### Examples
```

---

## Job name has to be `pages`. See https://docs.gitlab.com/ee/user/project/pages/#how-it-works

**URL:** llms-txt#job-name-has-to-be-`pages`.-see-https://docs.gitlab.com/ee/user/project/pages/#how-it-works

**Contents:**

- Learn more

pages:
image: node
before_script: - npm ci --cache .npm --prefer-offline
script: # Specify the steps involved to build your app here - npm run generate
cache: # https://docs.gitlab.com/ee/ci/caching/#cache-nodejs-dependencies
key:
files: - package-lock.json
paths: - .npm/
artifacts:
paths: # The directory that contains the built files to be published - .output/public

# The directory that contains the built files to be published

publish: .output/public
rules: # This ensures that only pushes to the default branch # will trigger a pages deploy - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH

````

::read-more
---
target: _blank
to: https://docs.gitlab.com/ee/user/project/pages/getting_started_part_one.html#project-website-examples
---
Head over **GitLab Pages default domain names and URLs** to learn more about the GitLab Pages default domain names.
::

---

## JSX / TSX

**URL:** llms-txt#jsx-/-tsx

::read-more
---
icon: i-simple-icons-vuedotjs
target: _blank
to: https://vuejs.org/guide/extras/render-function.html#jsx-tsx
---
::

::sandbox
---
branch: main
dir: examples/advanced/jsx
file: app.vue
repo: nuxt/examples
---
::

---

## A New Website

**URL:** llms-txt#a-new-website

**Contents:**
- New Design
- Improved Navigation
- Source Code Buttons
- Improved Search Feature
- Migration to Nuxt UI
- Open Graph Images
- Available on GitHub
- What's next?

Nuxt.com is the main entry point when you want to learn Nuxt. With **more than 300k visitors every month**, it was time to give it a new look and feel.

We are back to the original colors of Nuxt, with a navy background (`#020420`) and its signature shiny green (`#00DC82`).

:nuxt-img{.rounded-lg.border.border-gray-700 alt="Nuxt Website Screenshot" height="497" src="https://nuxt.com/assets/blog/website/nuxt-website.png" width="832"}

::read-more{icon="i-lucide-palette" to="https://nuxt.com/design-kit"}
Discover the **Nuxt Design Kit** as well as our **Logo History**.
::

We wanted to achieve a consistent design across all our official documentations:

::div{.grid.sm:grid-cols-2.gap-4}
  :::nuxt-link
  ---
  class: hover:border-transparent
  target: _blank
  to: https://image.nuxt.com
  ---
  :nuxt-img{.m-0.border.rounded-md.border-gray-700 alt="Nuxt Image" height="255" src="https://nuxt.com/assets/blog/website/nuxt-image.png" width="408"}
  :::

:::nuxt-link
  ---
  class: hover:border-transparent
  target: _blank
  to: https://content.nuxt.com
  ---
  :nuxt-img{.m-0.border.rounded-md.border-gray-700 alt="Nuxt Content" height="255" src="https://nuxt.com/assets/blog/website/nuxt-content.png" width="408"}
  :::

:::nuxt-link
  ---
  class: hover:border-transparent
  target: _blank
  to: https://devtools.nuxt.com
  ---
  :nuxt-img{.m-0.border.rounded-md.border-gray-700 alt="Nuxt DevTools" height="255" src="https://nuxt.com/assets/blog/website/nuxt-devtools.png" width="408"}
  :::

:::nuxt-link{.hover:border-transparent target="_blank" to="https://ui.nuxt.com"}
  :nuxt-img{.m-0.border.rounded-md.border-gray-700 alt="Nuxt UI" height="255" src="https://nuxt.com/assets/blog/website/nuxt-ui.png" width="408"}
  :::
::

We really love this new design and hope you do too. &#x2A;*This is only the first step toward many improvements coming to the website.**

## Improved Navigation

From now on, you can easily jump between the five main documentation categories:

:video{.rounded.dark:border.dark:border-gray-700 controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1697548111/nuxt3/nuxt-website-docs-nav.jpg"}

On the right side, you can see the table of contents as well as community shortcuts: Edit this page, Chat on Discord, etc.

:video{.rounded.dark:border.dark:border-gray-700 controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1697549697/nuxt3/nuxt-website-docs-aside.jpg"}

## Source Code Buttons

When looking at Nuxt built-in [components](https://nuxt.com/docs/api/components), [composables](https://nuxt.com/docs/api/composables), [utils](https://nuxt.com/docs/api/utils), [commands](https://nuxt.com/docs/api/commands) and [kit utilities](https://nuxt.com/docs/api/kit), you can now jump to the source code by clicking on the :u-button[Source]{color="gray" icon="i-simple-icons-github" size="xs"} button.

:nuxt-img{.border.rounded.border-gray-700 alt="Nuxt Source Code Button" height="343" src="https://nuxt.com/assets/blog/website/nuxt-website-source-button.png" width="818"}

::read-more{to="https://nuxt.com/docs/api/components/nuxt-link"}
Checkout an example on `<NuxtLink>` documentation page.
::

## Improved Search Feature

You may notice a new modal when hitting :kbd{value="meta"} :kbd{value="K"}. We leverage the Nuxt UI [`<CommandPalette>`](https://ui.nuxt.com/components/command-palette){rel="&#x22;nofollow&#x22;"} components combined with Nuxt Content data (search & navigation) to provide a better search experience.

With the command palette, you can:

- Jump to a page
- Search in the documentation
- Search a module
- Switch the color mode

We plan to add more commands soon.

:video{.rounded.dark:border.dark:border-gray-700 controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1697550571/nuxt3/nuxt-website-search.jpg"}

## Migration to Nuxt UI

The new website is powered by [Nuxt UI](https://ui.nuxt.com){rel="&#x22;nofollow&#x22;"}, our UI library tailored made for Nuxt and built on top of [Tailwind CSS](https://tailwindcss.com){rel="&#x22;nofollow&#x22;"} & [Headless UI](https://headlessui.com/){rel="&#x22;nofollow&#x22;"}.

The website also uses [Nuxt UI Pro](https://ui.nuxt.com/pro){rel="&#x22;nofollow&#x22;"}, a set of premium components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.

It includes components such as `<UHeader>`, `<UFooter>`, `<ULandingHero>`, `<ULandingCard>` and more.

::note
We plan to launch the full documentation of Nuxt UI Pro at the end of October. If you cannot wait and want early access, you can already [purchase a license](https://ui.nuxt.com/pro/purchase){rel=""nofollow""} now and get access to our private repository on GitHub.
::

This [migration](https://github.com/nuxt/nuxt.com/pull/1365){rel="&#x22;nofollow&#x22;"} was a great opportunity to improve Nuxt UI & UI Pro and fix some bugs, as well as a difference of [+9,004]{.text-primary} / [-23,113]{.text-error} lines of code changed.

::read-more
---
icon: i-simple-icons-nuxtdotjs
target: _blank
to: https://ui.nuxt.com
---
Read more about **Nuxt UI**.
::

We are big fans of having a custom image when we share a link on social media. That's why we have added OG images on all our documentation pages.

Example of the [Installation page](https://nuxt.com/docs/getting-started/installation):

![Nuxt OG Image](https://nuxt.com/__og-image__/image/docs/getting-started/introduction/og.png){.border.rounded.border-gray-700 height="630" width="1200"}

::read-more
---
target: _blank
to: https://nuxtseo.com/og-image/getting-started/installation
---
Discover the **Nuxt OG Image** module.
::

## Available on GitHub

We are proud to announce that the website is **now open source** and available on GitHub.

::read-more
---
color: gray
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt.com
---
Check out `nuxt/nuxt.com` on GitHub.
::

This new website is the beginning of upcoming changes we are planing, some of them are:

- Team & Contributors pages
- Integrations page to showcase all the possibilities with Nuxt: Hosting, CMS, Database, etc.
- Templates page (currently [nuxt.new](https://nuxt.new){rel="&#x22;nofollow&#x22;"}) to list official and community starters
- And more...

**We are looking forward to your feedback on [Twitter](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"}, [Discord](https://discord.com/invite/nuxt){rel="&#x22;nofollow&#x22;"} or [GitHub](https://github.com/nuxt/nuxt.com){rel="&#x22;nofollow&#x22;"}**.

Thank you for reading this blog post, and happy Nuxting 🤟

---

## Nuxt 3.15

**URL:** llms-txt#nuxt-3.15

**Contents:**
- ❄️ Snowfall!
- ⚡️ Vite 6 included
- 🪵 Chromium devtools improvements
- 🗺️ Navigation mode for `callOnce`
- 🥵 HMR for templates, pages + page metadata
- 📋 Page meta enhancements
- 🔥 Performance improvements
- 🐣 v4 updates
- ✅ Upgrading
- Full release notes

We're continuing to work on the release of Nitro v3, Nuxt v4 and more. But we're delighted to ship Nuxt v3.15 (just) in time for Christmas.

Happy holidays! You'll notice when you start Nuxt that (if you're in the Northern Hemisphere) there's some snow on the loading screen ([#29871](https://github.com/nuxt/nuxt/pull/29871){rel="&#x22;nofollow&#x22;"}).

## ⚡️ Vite 6 included

Nuxt v3.15 includes [Vite 6](https://vite.dev/blog/announcing-vite6){rel="&#x22;nofollow&#x22;"} for the first time. Although this is a major version, we expect that this won't be a breaking change for Nuxt users (see full [migration guide](https://vite.dev/guide/migration.html){rel="&#x22;nofollow&#x22;"}). However, please take care if you have dependencies that rely on a particular Vite version.

One of the most significant changes with Vite 6 is the new Environment API, which we hope to use in conjunction with Nitro to improve the server dev environment. Watch this space!

You can read the full list of changes in the [Vite 6 changelog](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#600-2024-11-26){rel="&#x22;nofollow&#x22;"}.

## 🪵 Chromium devtools improvements

We talk a lot about the Nuxt DevTools, but v3.15 ships with better integration in dev mode for Chromium-based browser devtools.

We now use the [Chrome DevTools extensibility API](https://developer.chrome.com/docs/devtools/performance/extension){rel="&#x22;nofollow&#x22;"} to add support for printing nuxt hook timings in the browser devtools performance panel.

![CleanShot 2024-11-14 at 15 05 22@2x](https://github.com/user-attachments/assets/57525027-750a-462f-b713-398302aec0cd)

## 🗺️ Navigation mode for `callOnce`

`callOnce` is a built-in Nuxt composable for running code only once. For example, if the code runs on the server it won't run again on the client. But sometimes you do want code to run on *every navigation* - just avoid the initial server/client double load. For this, there's a new `mode: 'navigation'` option that will run the code only once *per navigation*. (See [#30260](https://github.com/nuxt/nuxt/pull/30260){rel="&#x22;nofollow&#x22;"} for more info.)

## 🥵 HMR for templates, pages + page metadata

We now implement hot module reloading for Nuxt's virtual files (like routes, plugins, generated files) as well as for the content of page metadata (within a `definePageMeta` macro) ([#30113](https://github.com/nuxt/nuxt/pull/30113){rel="&#x22;nofollow&#x22;"}).

This should mean you have a faster experience in development, as well as not needing to reload the page when making changes to your routes.

## 📋 Page meta enhancements

We now support extracting extra page meta keys (likely used by module authors) via `experimental.extraPageMetaExtractionKeys` ([#30015](https://github.com/nuxt/nuxt/pull/30015){rel="&#x22;nofollow&#x22;"}). This enables module authors to use this information at build time, in the `pages:resolved` hook.

We also now support local functions in `definePageMeta` ([#30241](https://github.com/nuxt/nuxt/pull/30241){rel="&#x22;nofollow&#x22;"}). This means you can do something like this:

## 🔥 Performance improvements

We now preload the app manifest in the browser if it will be used when hydrating the app ([#30017](https://github.com/nuxt/nuxt/pull/30017){rel="&#x22;nofollow&#x22;"}).

We'll also tree shake vue-router's hash mode history out of your bundle if we can - specifically, if you haven't customised your `app/router.options.ts` ([#30297](https://github.com/nuxt/nuxt/pull/30297){rel="&#x22;nofollow&#x22;"}).

If A few more changes shipped for the new defaults for v4, including only inlining styles by default for Vue components ([#30305](https://github.com/nuxt/nuxt/pull/30305){rel="&#x22;nofollow&#x22;"}).

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## Full release notes

::read-more
---
color: neutral
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.15.0
---
Read the full release notes of Nuxt `v3.15.0`.
::

A huge thank you to everyone who's been a part of this release. ❤️

Don't hesitate to let us know if you have any feedback or issues! 🙏

**Examples:**

Example 1 (ts):
```ts
await callOnce(() => counter.value++, { mode: 'navigation' })
````

Example 2 (ts):

```ts
function validateIdParam(route) {
  return !!(route.params.id && !isNaN(Number(route.params.id)));
}

definePageMeta({
  validate: validateIdParam,
});
```

Example 3 (sh):

```sh
npx nuxi@latest upgrade --force
```

---

## Use Custom Fetch Composable

**URL:** llms-txt#use-custom-fetch-composable

::read-more{to="https://nuxt.com/docs/guide/recipes/custom-usefetch"}
::

## ::sandbox

branch: main
dir: examples/advanced/use-custom-fetch-composable
file: composables/useCustomFetch.ts
repo: nuxt/examples

---

::

---

## Hello Content

**URL:** llms-txt#hello-content

**Contents:**

- Render Content
- Documentation

vue [pages/[...slug\\].vue]

<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div>
    <header><!-- ... --></header>

<ContentRenderer
      v-if="page"
      :value="page"
    />

<footer><!-- ... --></footer>
  </div>
</template>
```

::tip{icon="i-lucide-book"}
Head over to <https://content.nuxt.com>{rel=""nofollow""} to learn more about the Content module features, such as how to build queries and use Vue components in your Markdown files with the MDC syntax.
::

**Examples:**

Example 1 (unknown):

```unknown
The module automatically loads and parses them.

## Render Content

To render content pages, add a [catch-all route](https://nuxt.com/docs/3.x/directory-structure/pages/#catch-all-route) using the [`<ContentRenderer>`](https://content.nuxt.com/docs/components/content-renderer){rel="&#x22;nofollow&#x22;"} component:
```

---

## Creating Custom Events

**URL:** llms-txt#creating-custom-events

**Contents:**

- Creating Events and Listeners

Using events is a great way to decouple your application and allow for more flexible and modular communication between different parts of your code. Events can have multiple listeners that do not depend on each other. For example, you may wish to send an email to your user each time an order has shipped. Instead of coupling your order processing code to your email code, you can emit an event which a listener can receive and use to dispatch an email.

The Nuxt event system is powered by [unjs/hookable](https://github.com/unjs/hookable){rel="&#x22;nofollow&#x22;"}, which is the same library that powers the Nuxt hooks system.

## Creating Events and Listeners

You can create your own custom events using the `hook` method:

To emit an event and notify any listeners, use `callHook`:

You can also use the payload object to enable two-way communication between the emitter and listeners. Since the payload is passed by reference, a listener can modify it to send data back to the emitter.

::tip
You can inspect all events using the **Nuxt DevTools** Hooks panel.
::

::read-more{to="https://nuxt.com/docs/4.x/guide/going-further/hooks"}
Learn more about Nuxt's built-in hooks and how to extend them
::

**Examples:**

Example 1 (ts):

```ts
const nuxtApp = useNuxtApp();

nuxtApp.hook('app:user:registered', payload => {
  console.log('A new user has registered!', payload);
});
```

Example 2 (ts):

```ts
const nuxtApp = useNuxtApp();

await nuxtApp.callHook('app:user:registered', {
  id: 1,
  name: 'John Doe',
});
```

Example 3 (ts):

```ts
const nuxtApp = useNuxtApp();

nuxtApp.hook('app:user:registered', payload => {
  payload.message = 'Welcome to our app!';
});

const payload = {
  id: 1,
  name: 'John Doe',
};

await nuxtApp.callHook('app:user:registered', {
  id: 1,
  name: 'John Doe',
});

// payload.message will be 'Welcome to our app!'
```

---

## error.vue

**URL:** llms-txt#error.vue

During the lifespan of your application, some errors may appear unexpectedly at runtime. In such case, we can use the `error.vue` file to override the default error files and display the error nicely.

::note
Although it is called an 'error page' it's not a route and shouldn't be placed in your `~/pages` directory. For the same reason, you shouldn't use `definePageMeta` within this page. That being said, you can still use layouts in the error file, by utilizing the [`NuxtLayout`](https://nuxt.com/docs/3.x/api/components/nuxt-layout) component and specifying the name of the layout.
::

The error page has a single prop - `error` which contains an error for you to handle.

The `error` object provides the following fields:

If you have an error with custom fields they will be lost; you should assign them to `data` instead:

**Examples:**

Example 1 (unknown):

```unknown
::note
Although it is called an 'error page' it's not a route and shouldn't be placed in your `~/pages` directory. For the same reason, you shouldn't use `definePageMeta` within this page. That being said, you can still use layouts in the error file, by utilizing the [`NuxtLayout`](https://nuxt.com/docs/3.x/api/components/nuxt-layout) component and specifying the name of the layout.
::

The error page has a single prop - `error` which contains an error for you to handle.

The `error` object provides the following fields:
```

Example 2 (unknown):

```unknown
If you have an error with custom fields they will be lost; you should assign them to `data` instead:
```

---

## Announcing Nuxt 3.0 stable

**URL:** llms-txt#announcing-nuxt-3.0-stable

**Contents:**

- API Stability
- The browser and Node.js support
- We Love Community
- To the Future

We are thrilled to announce the first stable version of Nuxt 3.0.0 ✨

Nuxt 3 is a modern rewrite of the Nuxt framework based on [Vite](https://vitejs.dev/){rel="&#x22;nofollow&#x22;"}, [Vue3](https://vuejs.org/){rel="&#x22;nofollow&#x22;"}, and [Nitro](https://nitro.unjs.io/){rel="&#x22;nofollow&#x22;"} with first-class TypeScript support and the result of more than two years of research, community feedback, innovation, and experiment to make a pleasant full-stack Developer Experience for Vue development to everyone.

[Read More In the Documentation](https://nuxt.com/docs/getting-started/introduction)

Nuxt 3.0.0 comes with a stable, production-ready API and 50+ [supported modules](https://nuxt.com/modules) built using [Nuxt Kit](https://nuxt.com/docs/guide/going-further/modules) by the community and Nuxt team.

All composables, filesystem conventions, and configurations are guaranteed to be backward compatible with Nuxt 3.0.0. Due to the nature of the meta-frameworks, some changes happen when we upgrade the underlying dependencies (vite, rollup, and nitropack). Thanks to the new Nuxt Kit and Schema tools, such upgrades will be backward compatible as long as you are using documented features. Kit and Schema also guarantee better future compatibility. This makes it faster for us to iterate and plan the next major versions of Nuxt.

## The browser and Node.js support

Nuxt 3 officially supports evergreen browsers only. The "core browser set" is what we (And [web.dev](http://web.dev){rel="&#x22;nofollow&#x22;"} team) believe most developers need to support most of the time in the absence of specific constraints. It takes into account [usage numbers](https://caniuse.com/usage-table){rel="&#x22;nofollow&#x22;"}, developer expectations, and [existing support in](https://make.wordpress.org/core/handbook/best-practices/browser-support/){rel="&#x22;nofollow&#x22;"} [the ecosystem](https://angular.io/guide/browser-support){rel="&#x22;nofollow&#x22;"}. The core browser set targets the **2 most recent major versions** of Chrome, Firefox, and Edge on a monthly basis and Safari on a yearly basis.

On the server side, Nuxt 3 supports Node.js 14, 16, 18, and 19 at the moment. We encourage everyone to use the latest LTS releases of Node.js, we push them once **widely adopted by major deployment platforms**. This means we keep supporting Node.js versions as long as they are supported by the Node.js team on a rolling basis in non-major releases of Nuxt. Since 14.x is being end-of-life soon, we highly encourage you to update to the latest 18.x whenever possible.

Nuxt wouldn’t be possible today without an amazing community making amazing modules, feedback, and contributions every day. Check our [Community Documentation](https://nuxt.com/docs/community/getting-help){rel="&#x22;nofollow&#x22;"} to be involved!

Releasing Nuxt 3 is a big milestone for us and opens a future-proof basis for new ideas and trust for the users to build their enterprise projects with Nuxt 3.

Server Component Islands, WebSocket layer, new Deployment presets, improved CLI and DevTools and Testing infra are a few to mention. Keep an eye on the [roadmap page](https://nuxt.com/docs/community/roadmap){rel="&#x22;nofollow&#x22;"} and [GitHub discussions](https://github.com/nuxt/nuxt/discussions){rel="&#x22;nofollow&#x22;"} for updates.

NuxtLabs is working on [new product](https://nuxt.studio){rel="&#x22;nofollow&#x22;"} and solutions on top of Nuxt 3 at the time of writing this article.

Stay tuned for more exciting news and Happy Nuxting 💚

---

## Nuxt 3.14

**URL:** llms-txt#nuxt-3.14

**Contents:**

- ⚡️ Faster starts powered by `jiti`
- 📂 Shared folder for code and types shared with client/server
- 🦀 `rspack` builder
- ✨ New composables
- 🔧 New module utilities
- 🚧 v4 changes
- 🗺️ Roadmap to v3.15
- ✅ Upgrading
- Full Release Notes

Behind the scenes, a lot has been going on in preparation for the release of Nuxt v4 (particularly on the `unjs` side with preparations for Nitro v3!)

### ⚡️ Faster starts powered by `jiti`

Loading the nuxt config file, as well as modules and other build-time code, is now powered by `jiti` v2. You can see more about the release in the [jiti v2 release notes](https://github.com/unjs/jiti/releases/tag/v2.0.0){rel="&#x22;nofollow&#x22;"}, but one of the most important pieces is native node esm import (where possible), which should mean a faster start. ✨

### 📂 Shared folder for code and types shared with client/server

You should never import Vue app code in your nitro code (or the other way around). But this has meant a friction point when it comes to sharing types or utilities that _don't_ rely on the nitro/vue contexts.

For this, we have a new `shared/` folder ([#28682](https://github.com/nuxt/nuxt/pull/28682){rel="&#x22;nofollow&#x22;"}). You can't import Vue or nitro code _into_ files in this folder, but it produces auto-imports (if you're using `compatibilityVersion: 4`) which you can consume throughout the rest of your app.

If needed you can use the new `#shared` alias which points to this folder.

The shared folder is alongside your `server/` folder. (If you're using `compatibilityVersion: 4`, this means it's not inside your `app/` folder.)

### 🦀 `rspack` builder

We're excited to announce a new first-class Nuxt builder for `rspack`. It's still experimental but we've refactored the internal Nuxt virtual file system to use `unplugin` to make this possible.

Let us know if you like it - and feel free to raise any issues you experience with it.

👉 To try it out, you can use [this starter](https://github.com/danielroe/nuxt-rspack-starter){rel="&#x22;nofollow&#x22;"} - or just install `@nuxt/rspack-builder` and set `builder: 'rspack'` in your nuxt config file.

### ✨ New composables

We have new `useResponseHeader` and `useRuntimeHook` composables ([#27131](https://github.com/nuxt/nuxt/pull/27131){rel="&#x22;nofollow&#x22;"} and [#29741](https://github.com/nuxt/nuxt/pull/29741){rel="&#x22;nofollow&#x22;"}).

### 🔧 New module utilities

We now have a new `addServerTemplate` utility ([#29320](https://github.com/nuxt/nuxt/pull/29320){rel="&#x22;nofollow&#x22;"}) for adding virtual files for access inside nitro runtime routes.

We've merged some changes which only take effect with `compatibilityVersion: 4`, but which [you can opt-into earlier](https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4).

1. previously, if you had a component like `~/components/App/Header.vue` this would be visible in your devtools as `<Header>`. From v4 we ensure this is `<AppHeader>`, but it's opt-in to avoid breaking any manual `<KeepAlive>` you might have implemented. ([#28745](https://github.com/nuxt/nuxt/pull/28745){rel="&#x22;nofollow&#x22;"}).
2. Nuxt scans page metadata from your files, before calling `pages:extend`. But this has led to some confusing behaviour, as pages added at this point do not end up having their page metadata respected. So we now do not scan metadata before calling `pages:extend`. Instead, we have a new `pages:resolved` hook, which is called after `pages:extend`, after all pages have been augmented with their metadata. I'd recommend opting into this by setting `experimental.scanPageMeta` to `after-resolve`, as it solves a number of bugs.

## 🗺️ Roadmap to v3.15

They didn't quite make it in time for v3.14 but for the next minor release you can expect (among other things):

- auto-imported directives from modules ([#29203](https://github.com/nuxt/nuxt/pull/29203){rel="&#x22;nofollow&#x22;"})
- 'isolated' page renders ([#29366](https://github.com/nuxt/nuxt/pull/29366){rel="&#x22;nofollow&#x22;"})
- delayed hydration ([#26468](https://github.com/nuxt/nuxt/pull/26468){rel="&#x22;nofollow&#x22;"})

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## Full Release Notes

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.14.0

---

Read the full release notes of Nuxt `v3.14.0`.
::

A huge thank you to everyone who's been a part of this release. We have exciting things in store with our next releases! ❤️

Don't hesitate to let us know if you have any feedback or issues! 🙏

**Examples:**

Example 1 (sh):

```sh
npx nuxi@latest upgrade --force
```

---

## bun --bun run dev -o

**URL:** llms-txt#bun---bun-run-dev--o

**Contents:**

- Next Steps

bash [deno]
deno run dev -o

````
::

::tip{icon="i-lucide-circle-check"}
Well done! A browser window should automatically open for <http://localhost:3000>{rel=""nofollow""}.
::

Now that you've created your Nuxt project, you are ready to start building your application.

::read-more{title="Nuxt Concepts" to="https://nuxt.com/docs/guide/concepts"}
::

**Examples:**

Example 1 (unknown):
```unknown

````

---

## .gitignore

**URL:** llms-txt#.gitignore

A `.gitignore` file specifies intentionally untracked files that git should ignore.

## ::read-more

icon: i-simple-icons-git
target: \_blank
title: the git documentation
to: https://git-scm.com/docs/gitignore

---

::

We recommend having a `.gitignore` file that has **at least** the following entries present:

---

## nuxt build-module

**URL:** llms-txt#nuxt-build-module

**Contents:**

- Arguments
- Options

The `build-module` command runs `@nuxt/module-builder` to generate `dist` directory within your `rootDir` that contains the full build for your **nuxt-module**.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option              | Default | Description                                                                      |
| ------------------- | ------- | -------------------------------------------------------------------------------- | --- | ---------------------------- |
| `--cwd=<directory>` |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |
| `--logLevel=<silent | info    | verbose>`                                                                        |     | Specify build-time log level |
| `--build`           | `false` | Build module for distribution                                                    |
| `--stub`            | `false` | Stub dist instead of actually building it for development                        |
| `--sourcemap`       | `false` | Generate sourcemaps                                                              |
| `--prepare`         | `false` | Prepare module for local development                                             |

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/module-builder

---

Read more about `@nuxt/module-builder`.
::

---

## Introducing Nuxt Icon v1

**URL:** llms-txt#introducing-nuxt-icon-v1

**Contents:**

- Why Are Icons Challenging?
- A Journey Through Icon Solutions
  - 1. `<img>` Tags: The Early Days
  - 2. Web Fonts: Icon Fonts
  - 3. Inline SVGs: Component-Based Icons
  - 4. Iconify Runtime: Dynamic API Access
  - 5. On-Demand Component Icons
  - 6. Pure CSS Icons
- The Challenges to Integrate in Nuxt
- Introducing Nuxt Icon v1: The Balance of Both Worlds

Icons are essential to modern web interfaces. They simplify navigation, clarify functionality, and enhance visual appeal. However, implementing icons efficiently involves challenges like scalability, dynamic loading, and server-side rendering (SSR) compatibility.

To address these challenges, we developed **Nuxt Icon v1** — a versatile, modern solution tailored for Nuxt projects. By building on established icon rendering techniques and introducing novel approaches, Nuxt Icon bridges the gap between performance, usability, and flexibility.

In this post, we’ll explore the challenges of icon rendering, the evolution of icon solutions, and how Nuxt Icon combines the best aspects of these methods to offer a seamless experience for developers.

## Why Are Icons Challenging?

At first glance, icons seem simple - they are essentially just tiny image elements that enhance a user interface, providing visual cues and enhancing usability.

![Icons Showcases](https://nuxt.com/assets/blog/nuxt-icon/icons-showcase.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

However, from an engineering perspective, they pose several challenges. Ideal icons should be:

- **Colorable**: Adaptable to themes and color schemes.
- **Scalable**: Render crisply at various sizes and resolutions.
- **Manageable**: Icon sets can contain hundreds or thousands of icons.
- **Efficiently Bundled**: Minimize network requests.
- **Optimally Loaded**: Affect application performance and user experience.
- **Dynamic**: Support dynamic loading for user-generated or runtime-defined icons.

![Engineering Challenges with Icons](https://nuxt.com/assets/blog/nuxt-icon/challenges.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Meeting all these needs requires a carefully engineered solution that balances trade-offs. Let’s explore the evolution of icon solutions and how they address these challenges.

## A Journey Through Icon Solutions

Over the years, developers have experimented with various techniques to render icons efficiently. Let’s explore the evolution of these solutions and the challenges they faced.

### 1. `<img>` Tags: The Early Days

The most straightforward solution: using the `<img>` tag. This was the go-to method in the early days of the web.

You'd host your image assets and use an `<img>` tag to link to that image, specifying its width and height. It's simple, requires no setup or runtime dependencies, and works natively in browsers.

![Solution 1](https://nuxt.com/assets/blog/nuxt-icon/solution-1.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

However, there are drawbacks. Images can become pixelated, lack color control, and don't scale well. Each icon being a separate image file results in many network requests, which could be slow, especially back in the days of HTTP 1.1. Before the image is downloaded, you might see a flash of invisible icons, which can hurt the user experience. Lastly, it's quite verbose to write, as you need to specify the full path of the image and manage the relative paths. It explains why this approach is rarely used on modern websites today.

### 2. Web Fonts: Icon Fonts

As the next step in icon evolution, web fonts emerged as a popular solution. Fonts are inherently vectorized and colorable, making them a natural fit for icons.

Iconset providers typically compile their icons into a special font file, assigning a unique Unicode character to each icon. This is accompanied by a CSS file that maps these Unicode values to specific icon classes.

The advantages of this approach are clear: it's easy to use, colorable, scalable, and requires only a single request to load all icons.

![Solution 2](https://nuxt.com/assets/blog/nuxt-icon/solution-2.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

However, there are some downsides. Loading a large font file upfront can be slow, and customizing the icon set is challenging. Additionally, you might experience a flash of invisible icons before the font loads, as there are no fallback fonts available.

### 3. Inline SVGs: Component-Based Icons

With the advent of modern frontend frameworks, reusing HTML elements has become significantly easier. This led to the idea of directly inlining SVG tags as components.

To support this approach, many icon sets provide packages with wrappers tailored for each framework. For instance, MDI icons use a shared component and pass icon data as props, while Tabler icons offer a dedicated component for each icon.

Since these are SVGs, they are inherently colorable, scalable, and retain all the features of SVGs. Typically, icons are bundled into the app, eliminating additional network requests and ensuring they are SSR-friendly and visible on the first render.

![Solution 3](https://nuxt.com/assets/blog/nuxt-icon/solution-3.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

However, this method has its downsides. It generates numerous SVG DOM elements, which can impact performance when many icons are used. It also increases the bundle size and requires specific integration support for each icon set and framework combination, leading to a degree of vendor lock-in. This makes it challenging to switch to a different icon set or framework.

Despite these trade-offs, this approach is widely adopted today, as switching icon sets or frameworks is not a frequent necessity for most projects.

### 4. Iconify Runtime: Dynamic API Access

[Iconify](https://iconify.design/){rel="&#x22;nofollow&#x22;"} revolutionized icon usage by aggregating over 200,000 icons across 100+ collections. Its runtime solution dynamically fetched icons via an API, enabling dynamic access to any icon without pre-bundling.

This is a great fit for rendering icons from user-provided content or other dynamic content that you don't know at build time. And it's super easy to set up, as you can even use it as a CDN without any build tools.

![Solution 4](https://nuxt.com/assets/blog/nuxt-icon/solution-4.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

While this method offers great flexibility, it does come with some trade-offs. It introduces runtime dependencies, meaning icons will only render after JavaScript is loaded and the icon data is fetched. This approach also poses challenges for server-side rendering (SSR) and caching layers, such as those used in Progressive Web Apps (PWAs).

### 5. On-Demand Component Icons

With the unified interface from Iconify and Vite's on-demand approach, we developed [`unplugin-icons`](https://github.com/unplugin/unplugin-icons){rel="&#x22;nofollow&#x22;"}. This tool allows you to import any icons as components on-demand.

As an [`unplugin`](https://github.com/unjs/unplugin){rel="&#x22;nofollow&#x22;"}, it supports all popular build tools, including Vite, webpack, and rspack. We provide compilers for popular frameworks like Vue, React, Svelte, and Solid. With Iconify, you can use any icon across any framework, minimizing vendor lock-in.

![Solution 5](https://nuxt.com/assets/blog/nuxt-icon/solution-5.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

While this technique shares the same pros and cons as previous component icon solutions, the integration with build tools allows us to serve the full Iconify collection while only shipping the icons you actually use. However, runtime concerns like DOM element management still persist.

### 6. Pure CSS Icons

As a side-effect of working on [UnoCSS](https://unocss.dev/){rel="&#x22;nofollow&#x22;"}, we discovered the potential of embedding icons entirely in CSS, leading to the innovative solution of [Pure CSS Icons](https://antfu.me/posts/icons-in-pure-css){rel="&#x22;nofollow&#x22;"}.

This method involves inlining SVG icons as data URLs and providing a single class to display the icons. With some tweaks, these icons become colorable, scalable, and even capable of displaying SVG animations.

Browsers can cache the CSS rules, and each icon requires only **one DOM element** to render. This approach ships the icons in a single CSS file with no additional requests. Since it's pure CSS, the icons display along with the rest of your UI, require zero runtime, and work naturally with SSR—your server doesn't need any extra work on the server side.

![Solution 6](https://nuxt.com/assets/blog/nuxt-icon/solution-6.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

The only downsides are the lack of full customization for elements inside the SVG and the need to bundle icons at build-time, which isn't dynamic.

## The Challenges to Integrate in Nuxt

While I would say that the [Pure CSS Icons](https://nuxt.com/#_6-pure-css-icons) and [On-demand Component Icons](https://nuxt.com/#_5-on-demand-component-icons) would be pretty sufficient for most of the static usages, Nuxt as a full featured framework, has a bit more requirements to integrate icons efficiently:

- **SSR/CSR**: Nuxt works in both server-side rendering (SSR) and client-side rendering (CSR) modes. We care a lot about the end user experience, and we want to ensure that icons are rendered instantly without flickers.
- **Dynamic Icons**: In integrations like [Nuxt Content](https://content.nuxt.com/){rel="&#x22;nofollow&#x22;"}, the content can be provided at runtime or from external sources, which we are not aware at build time. We want to ensure we have the capability to integrate with those cases well.
- **Performance**: We want to ensure that the icons are bundled efficiently, and the loading of icons is optimized for the best performance.
- **Custom Icons**: While Iconify provides a wide range of icons for selection, we also aware it's pretty common for projects to have their own icon sets, or wanted to use paid icons that are not available in Iconify. Supporting custom icons is crucial for our users.

![Nuxt Integration Challenges and Solutions](https://nuxt.com/assets/blog/nuxt-icon/nuxt-icon-challenges.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

With these requirements in mind, let's revisit the solutions we discussed earlier and see how they stack up.

For dynamic icons, the Iconify Runtime stands out as a viable option. It allows for dynamic fetching of icons, making it suitable for content that isn't known at build time. However, it has its drawbacks. The reliance on runtime dependencies means it doesn't integrate seamlessly with SSR, and it doesn't support custom icons since the requests are directed to Iconify's servers, which don't have access to our local icon setup.

Conversely, Pure CSS Icons offer excellent performance and SSR compatibility. They ensure icons are rendered instantly without flickers and are bundled efficiently. However, they fall short when it comes to dynamic icons, as they need to be bundled at build time and lack the flexibility to adapt to runtime content changes.

Balancing these trade-offs is indeed challenging. So, why not leverage the strengths of both approaches? By understanding these trade-offs, we can better appreciate the balanced solution that Nuxt Icon v1 offers.

## Introducing Nuxt Icon v1: The Balance of Both Worlds

With the flexibility of the Nuxt Module system, Nuxt Icon combines the best of both worlds: the instant rendering of CSS icons and the dynamic fetching of Iconify icons. This dual approach provides a versatile, modern, and customizable icon solution that seamlessly adapts to your project's needs.

### Dual Rendering Modes

To address the trade-offs in rendering approaches, Nuxt Icon introduces a versatile `<Icon>` component that supports both CSS and SVG modes, both of which are SSR-friendly. Depending on your customization needs, you can switch between these modes for each icon.

In CSS mode, icons are included in the CSS during SSR, ensuring they render instantly without any runtime cost. In SVG mode, icons are inlined as HTML during SSR, providing the same immediate rendering benefits. Both approaches ensure that icons appear on the initial screen without any delay, offering a seamless user experience.

![Dual rendering mode](https://nuxt.com/assets/blog/nuxt-icon/dual-rendering-modes.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Dynamic icons present unique challenges, especially when it comes to loading them efficiently. To address this, we leverage Iconify's API, which allows us to serve any icon on demand via network requests. However, relying solely on this API can introduce delays, especially if the servers are geographically distant from your users.

To mitigate this, we introduced the concept of Icon Bundles. We can bundle frequently used icons directly into the `Client Bundle`. This ensures that these icons render instantly without additional network requests. However, bundling all possible icons isn't feasible due to the potential increase in bundle size.

Given that Nuxt is a full-stack framework, we can strike a balance by introducing a `Server Bundle`. On the server side, bundle size is less of an issue, allowing us to include a more extensive set of icons. During SSR, these icons can be fetched quickly and sent to the client as needed. This setup ensures high performance for commonly used icons while still providing the flexibility to serve any icon from Iconify as a fallback.

By combining client-side bundling for static icons and server-side bundling for dynamic icons, we achieve an optimal balance between performance and flexibility.

![Icon Bundles in Nuxt Icons](https://nuxt.com/assets/blog/nuxt-icon/bundles.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Here is a data flow diagram illustrating how Nuxt Icon requests icon data:

1. You use the `<Icon>` component and provide the icon `name`.
2. Nuxt Icon will first check if the icon is available in the `Client Bundle`, or the SSR payload (icons that are known at SSR will be presented in the payload). If so, the icon will be rendered instantly.
3. If the icon is not available on the client side, Nuxt Icon will fetch the icon data from the server API shipped along with your Nuxt app. Inside the server endpoint, it will query from the `Server Bundle` to see if the icon is available.
4. Between that, there are multiple cache systems involved. Server endpoint cache, HTTP cache, and client-side cache to ensure the icon is fetched efficiently and quickly. Since icon data does not change frequently, we use hard cache strategies to ensure the best performance.
5. When the icon is unknown to both the client and server (dynamic icons), the server endpoint will fallback to the Iconify API to fetch the icon data. Since the server endpoint is cached, the Iconify API will be called only once for each unique icon regardless of how many clients are requesting it, to save resources on both sides.

![Nuxt Icon Requesting Data flow](https://nuxt.com/assets/blog/nuxt-icon/dataflow.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

This layered approach ensures efficient icon delivery, balancing speed and flexibility, while being as dynamic as possible. And balance out the trade-offs between each solution.

## Try Nuxt Icon Today

Nuxt Icon v1 represents the culmination of years of innovation in icon rendering. Whether you’re building a dynamic app, a static website, or anything in between, Nuxt Icon adapts to your needs.

It’s easy to add Nuxt Icon to your project by running the following command:

Then, import the `<Icon>` component in your Vue components, providing icon `name` following [Iconify's conventions](https://iconify.design/docs/icons/icon-basics.html){rel="&#x22;nofollow&#x22;"}:

Explore more with the [documentation](https://github.com/nuxt/icon){rel="&#x22;nofollow&#x22;"}, experiment with its features, and let us know your thoughts. We’re excited to see how Nuxt Icon transforms your projects!

**Examples:**

Example 1 (bash):

```bash
npx nuxi module add icon
```

Example 2 (vue):

```vue
<template>
  <Icon name="i-lucide-activity" />
</template>
```

---

## Views

**URL:** llms-txt#views

**Contents:**

- `app.vue`
- Components
- Pages
- Layouts
- Advanced: Extending the HTML Template

![The app.vue file is the entry point of your application](https://nuxt.com/assets/docs/getting-started/views/app.svg)

By default, Nuxt will treat this file as the **entrypoint** and render its content for every route of the application.

::tip
If you are familiar with Vue, you might wonder where `main.js` is (the file that normally creates a Vue app). Nuxt does this behind the scene.
::

![Components are reusable pieces of UI](https://nuxt.com/assets/docs/getting-started/views/components.svg)

Most components are reusable pieces of the user interface, like buttons and menus. In Nuxt, you can create these components in the [`components/`](https://nuxt.com/docs/3.x/directory-structure/components) directory, and they will be automatically available across your application without having to explicitly import them.

![Pages are views tied to a specific route](https://nuxt.com/assets/docs/getting-started/views/pages.svg)

Pages represent views for each specific route pattern. Every file in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory represents a different route displaying its content.

To use pages, create `pages/index.vue` file and add `<NuxtPage />` component to the [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app) (or remove `app.vue` for default entry). You can now create more pages and their corresponding routes by adding new files in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory.

## ::read-more

title: Routing Section
to: https://nuxt.com/docs/getting-started/routing

---

::

![Layouts are wrapper around pages](https://nuxt.com/assets/docs/getting-started/views/layouts.svg)

Layouts are wrappers around pages that contain a common User Interface for several pages, such as header and footer displays. Layouts are Vue files using `<slot />` components to display the **page** content. The `layouts/default.vue` file will be used by default. Custom layouts can be set as part of your page metadata.

::note
If you only have a single layout in your application, we recommend using [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app) with [`<NuxtPage />`](https://nuxt.com/docs/3.x/api/components/nuxt-page) instead.
::

If you want to create more layouts and learn how to use them in your pages, find more information in the [Layouts section](https://nuxt.com/docs/3.x/directory-structure/layouts).

## Advanced: Extending the HTML Template

::note
If you only need to modify the `<head>`, you can refer to the [SEO and meta section](https://nuxt.com/docs/3.x/getting-started/seo-meta).
::

You can have full control over the HTML template by adding a Nitro plugin that registers a hook.
The callback function of the `render:html` hook allows you to mutate the HTML before it is sent to the client.

::read-more{to="https://nuxt.com/docs/guide/going-further/hooks"}
::

**Examples:**

Example 1 (unknown):

```unknown
::tip
If you are familiar with Vue, you might wonder where `main.js` is (the file that normally creates a Vue app). Nuxt does this behind the scene.
::

## Components

![Components are reusable pieces of UI](https://nuxt.com/assets/docs/getting-started/views/components.svg)

Most components are reusable pieces of the user interface, like buttons and menus. In Nuxt, you can create these components in the [`components/`](https://nuxt.com/docs/3.x/directory-structure/components) directory, and they will be automatically available across your application without having to explicitly import them.

::code-group
```

Example 2 (unknown):

```unknown

```

Example 3 (unknown):

```unknown
::

## Pages

![Pages are views tied to a specific route](https://nuxt.com/assets/docs/getting-started/views/pages.svg)

Pages represent views for each specific route pattern. Every file in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory represents a different route displaying its content.

To use pages, create `pages/index.vue` file and add `<NuxtPage />` component to the [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app) (or remove `app.vue` for default entry). You can now create more pages and their corresponding routes by adding new files in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory.

::code-group
```

Example 4 (unknown):

```unknown

```

---

## Nightly Release Channel

**URL:** llms-txt#nightly-release-channel

**Contents:**

- Opting In
- Opting Out
- Using Nightly `@nuxt/cli`

Nuxt lands commits, improvements, and bug fixes every day. You can opt in to test them earlier before the next release.

After a commit is merged into the `main` branch of [nuxt/nuxt](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} and **passes all tests**, we trigger an automated npm release, using GitHub Actions.

You can use these 'nightly' releases to beta test new features and changes.

The build and publishing method and quality of these 'nightly' releases are the same as stable ones. The only difference is that you should often check the GitHub repository for updates. There is a slight chance of regressions not being caught during the review process and by the automated tests. Therefore, we internally use this channel to double-check everything before each release.

::note
Features that are only available on the nightly release channel are marked with an alert in the documentation.
::

::warning
The `latest` nightly release channel is currently tracking the Nuxt v4 branch, meaning that it is particularly likely to have breaking changes right now — be careful! You can opt in to the 3.x branch nightly releases with `"nuxt": "npm:nuxt-nightly@3x"`.
::

Update `nuxt` dependency inside `package.json`:

Remove lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock` or `bun.lockb`) and reinstall dependencies.

Update `nuxt` dependency inside `package.json`:

Remove lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock` or `bun.lockb`) and reinstall dependencies.

## Using Nightly `@nuxt/cli`

To try the latest version of [nuxt/cli](https://github.com/nuxt/cli){rel="&#x22;nofollow&#x22;"}:

::read-more{to="https://nuxt.com/docs/api/commands"}
Read more about the available commands.
::

**Examples:**

Example 1 (unknown):

```unknown
Remove lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock` or `bun.lockb`) and reinstall dependencies.

## Opting Out

Update `nuxt` dependency inside `package.json`:
```

Example 2 (unknown):

```unknown
Remove lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock` or `bun.lockb`) and reinstall dependencies.

## Using Nightly `@nuxt/cli`

To try the latest version of [nuxt/cli](https://github.com/nuxt/cli){rel="&#x22;nofollow&#x22;"}:
```

---

## Announcing Nuxt 3 Release Candidate

**URL:** llms-txt#announcing-nuxt-3-release-candidate

**Contents:**

- A new foundation
- Important notes
- Timeline

We are excited to open source Nuxt 3 after more than a year of intense development. The repository is available on GitHub on [nuxt/nuxt](https://go.nuxt.com/github){rel="&#x22;nofollow&#x22;"} under the [MIT](https://go.nuxt.com/license){rel="&#x22;nofollow&#x22;"} license.

::tip
The documentation is available on <https://nuxt.com>{rel=""nofollow""}.
::

On top of supporting [Vue 3](https://vuejs.org){rel="&#x22;nofollow&#x22;"} or [Vite](https://vitejs.dev){rel="&#x22;nofollow&#x22;"}, Nuxt 3 contains a new [server engine](https://nuxt.com/docs/guide/concepts/server-engine){rel="&#x22;nofollow&#x22;"}, unlocking new full-stack capabilities to Nuxt server and beyond. It's the first JavaScript application server that is portable across a variety of modern cloud hosting providers.

In production, it builds your Vue application and server into one universal `.output` directory. This output is light: minified and without any other Node.js dependencies (except polyfills). You can deploy this output on any system supporting JavaScript, whether Node.js, Serverless, Workers, Edge-side rendering or purely static.

**Bonus:** this server engine can be used on existing Nuxt 2 projects with [Nuxt Bridge](https://nuxt.com/docs/getting-started/bridge){rel="&#x22;nofollow&#x22;"} 🚀

Head over the [Nuxt 3 homepage](https://nuxt.com){rel="&#x22;nofollow&#x22;"} to learn more about Nuxt Nitro and Nuxt Bridge.

Nuxt 3 is currently in beta, so expect things to break (and be fixed quickly). We have [plenty of work left](https://github.com/nuxt/nuxt/issues){rel="&#x22;nofollow&#x22;"} but we want to open it publicly to gather feedback and contributions from the community 💚

**Do not use it for production until we reach the first release candidate.**

During the beta, almost every commit will [trigger a new npm release](https://github.com/nuxt/nuxt/blob/main/.github/workflows/ci.yml#L111-L119){rel="&#x22;nofollow&#x22;"}; you may want to look at the [merged pull requests](https://github.com/nuxt/nuxt/pulls?q=is%3Apr+is%3Amerged){rel="&#x22;nofollow&#x22;"} until we begin generating automated changelogs in the documentation.

We are working every day to improve the documentation, explaining as much as possible all the concepts, features and usage of Nuxt 3.

Check out the community section of the Nuxt 3 website for [getting help](https://nuxt.com/docs/community/getting-help){rel="&#x22;nofollow&#x22;"}, [reporting bugs](https://nuxt.com/docs/community/reporting-bugs){rel="&#x22;nofollow&#x22;"} or [contributing to the framework](https://nuxt.com/docs/community/contribution){rel="&#x22;nofollow&#x22;"}.

Here some major milestones we've achieved on the way to Nuxt 3:

- **Jul 2, 2020**: Nuxt 3 first commit with full TypeScript rewrite
- **Aug 7, 2020**: Webpack 5 support
- **Sep 15, 2020**: [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages){rel="&#x22;nofollow&#x22;"} support
- **Oct 29, 2020**: [Vue 3](https://vuejs.org){rel="&#x22;nofollow&#x22;"} support with bundle-renderer
- **Nov 2, 2020**: [Nuxt Nitro](https://nuxt.com/guide/concepts/server-engine){rel="&#x22;nofollow&#x22;"} initial work
- **Jan 22, 2021**: Initial [Vite](https://vitejs.dev){rel="&#x22;nofollow&#x22;"} support
- **Feb 4, 2021**: Nuxt can deploy on [major serverless platforms](https://nuxt.com/docs/getting-started/deployment){rel="&#x22;nofollow&#x22;"}
- **Mar 6, 2021**: [UnJS](https://github.com/unjs){rel="&#x22;nofollow&#x22;"} organisation created on GitHub
- **Mar 28, 2021**: Init Nuxt Kit and Nuxt CLI ([nuxi](https://nuxt.com/docs/api/commands/add){rel="&#x22;nofollow&#x22;"})
- **May 20, 2021**: [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app){rel="&#x22;nofollow&#x22;"} support (`pages/` becomes optional)
- **Jun 30, 2021**: [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts){rel="&#x22;nofollow&#x22;"} support
- **Jul 15, 2021**: Native ESM support
- **Aug 10, 2021**: Auto import of composables and components
- **Sep 5, 2021**: Init [Nuxt Bridge](https://nuxt.com/docs/bridge/overview){rel="&#x22;nofollow&#x22;"} for improving Nuxt 2 experience
- **Sep 7, 2021**: Support Vite build for production
- **Oct 11, 2021**: Add [`useState`](https://nuxt.com/docs/getting-started/state-management){rel="&#x22;nofollow&#x22;"} and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch){rel="&#x22;nofollow&#x22;"} composables

So far, we've merged [385 pull requests](https://github.com/nuxt/nuxt/pulls?q=is%3Apr+is%3Amerged){rel="&#x22;nofollow&#x22;"}, closed [229 issues](https://github.com/nuxt/nuxt/issues?q=is%3Aissue+is%3Aclosed){rel="&#x22;nofollow&#x22;"} and made [925+ commits](https://github.com/nuxt/nuxt/commits/main){rel="&#x22;nofollow&#x22;"}.

We are excited to hear your thoughts and we thank you for your patience.

Now you can go over the [Nuxt 3 documentation](https://nuxt.com){rel="&#x22;nofollow&#x22;"} 😊

Don't forget to follow us on [Twitter](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"} to get the latest news about Nuxt!

---

## Generates `app/pages/category/[id].vue`

**URL:** llms-txt#generates-`app/pages/category/[id].vue`

**Contents:**

- `nuxt add middleware`

npx nuxt add page "category/[id]"
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add middleware`

- Modifier flags: `--global`
```

---

## Nuxt UI v4

**URL:** llms-txt#nuxt-ui-v4

**Contents:**

- Build anything, faster than ever
- From design to code, seamlessly
- An upgraded developer experience
  - Effortless migration
  - A refined documentation
  - Ready for the next wave of AI
- A thank you to our pro users
- Start building today
- The future is open

Today, we’re releasing [**Nuxt UI v4**](https://ui.nuxt.com){rel="&#x22;nofollow&#x22;"}, a major milestone that sets a new standard for our component library. With this release, we are unifying Nuxt UI and Nuxt UI Pro into a single, powerful, and completely free open-source library.

This marks an exciting new chapter for the Vue and Nuxt ecosystems, made possible by [NuxtLabs joining Vercel](https://nuxtlabs.com){rel="&#x22;nofollow&#x22;"}. Our shared commitment to the open-source community has allowed us to make every component, from a [simple button](https://ui.nuxt.com/docs/components/button){rel="&#x22;nofollow&#x22;"} to the most advanced [dashboard sidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar){rel="&#x22;nofollow&#x22;"}, accessible to everyone.

What was previously a premium offering is now available to all. Over 100 components, advanced sections, and [production-ready templates](https://ui.nuxt.com/templates){rel="&#x22;nofollow&#x22;"} are now yours to build with, unified in one place.

## Build anything, faster than ever

Nuxt UI v4 makes it easy to build modern, polished apps quickly. You can create complex interfaces like landing pages, pricing pages, docs, blogs, portfolios, etc. without starting from scratch.

This is possible because Nuxt UI v4 unifies everything you need into a single `@nuxt/ui` package:

- **110+ components:** An extensive library to build anything from simple websites to complex applications.
- **12 free templates:** Start your next project in minutes with a production-ready template for a [Landing Page](https://landing-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, [SaaS](https://saas-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, [Dashboard](https://dashboard-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, [Docs site](https://docs-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, [Portfolio](https://portfolio-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, [Chat app](https://chat-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}, or [Changelog](https://changelog-template.nuxt.dev){rel="&#x22;nofollow&#x22;"}.
- **Rich Content & Typography:** Beautifully render Markdown and build content-rich sites with our advanced prose components, fully integrated with Nuxt Content.
- **Vue and Nuxt Compatibility:** Works in any Vue or Nuxt project, as well as [Adonis](https://github.com/nuxt-ui-templates/starter-adonis){rel="&#x22;nofollow&#x22;"} and [Laravel](https://github.com/nuxt-ui-templates/starter-laravel){rel="&#x22;nofollow&#x22;"}.

The entire Pro suite is now yours. Build with powerful components previously exclusive to our paid users, now free for everyone.

::tabs{.gap-0}
:::div{label="index.vue"}

:::

:::code-preview

---

ui:
preview: p-0
class: "[&>div]:\*:my-0 w-full"
label: Preview

---

    ::::index-example
    ::::

:::
::

## From design to code, seamlessly

A successful project starts with a solid design system. In v4, we are releasing the **complete Figma Kit** for free, mirroring the entire component library.

With over **2,000 component variants and design tokens**, you now have a single Figma entry point that contains every component along with detailed explanations about structure and usage. Designers and developers work from the same comprehensive source, making collaboration seamless and ensuring a perfect match between design and implementation.

## ::u-button

class: mb-4
icon: i-simple-icons-figma
label: Get the Figma Kit →
target: \_blank
to: https://go.nuxt.com/figma-ui

---

::

## ::carousel

items:

- /assets/blog/figma-kit/1.png
- /assets/blog/figma-kit/2.png
- /assets/blog/figma-kit/3.png

---

::

## An upgraded developer experience

Beyond new components, v4 brings significant improvements to your workflow.

### Effortless migration

Unlike the major overhaul from v2 to v3, the migration to v4 is simple. This release focuses on unification, not breaking changes. Most components work identically, and your existing code will remain largely intact.

Check out our [migration guide](https://ui.nuxt.com/getting-started/migration/v4){rel="&#x22;nofollow&#x22;"} for a complete walkthrough.

### A refined documentation

We've completely overhauled our documentation to make it clearer and more intuitive. We’ve restructured the layout and split complex topics into dedicated pages, ensuring you can find the information you need, faster.

Our documentation is also now fully AI-ready. It's powered by our new \*_[Model Context Protocol (MCP) server](https://ui.nuxt.com/docs/getting-started/ai/mcp){rel="&#x22;nofollow&#x22;"}_\*, which allows AI tools like Cursor to access component documentation and metadata directly. In addition, we provide \*\*[`LLMs.txt` files](https://ui.nuxt.com/docs/getting-started/ai/llms-txt){rel="&#x22;nofollow&#x22;"}\*\*, a structured format that enables any AI assistant to understand our components, theming, and best practices. Your AI tools now have first-class access to our entire library, right inside your editor.

### Ready for the next wave of AI

Our AI chat components now support **Vercel's AI SDK v5**. The new `Chat` class and message format (with `parts`) ensure compatibility with the latest AI SDK improvements, keeping you at the forefront of AI development.

## A thank you to our pro users

We want to extend a special thanks to everyone who supported Nuxt UI Pro. Your early adoption and feedback were instrumental in shaping Nuxt UI. You helped us fund, maintain, and improve the project, allowing us to reach this milestone where we can now offer these powerful tools to the entire community.

Your support made this moment possible.

## Start building today

Get started with Nuxt UI v4 by creating a new project with any of our free templates:

Or add it to your existing project:

## The future is open

With a unified codebase and the backing of Vercel, we're more excited than ever to push the boundaries of component development. This release wouldn't have been possible without the support of our amazing community, and every contributor who has helped shape Nuxt UI.

We can't wait to see what you build. The future of UI development is free, open, and more powerful than ever.

_Ready to get started? Check out the [documentation](https://ui.nuxt.com){rel="&#x22;nofollow&#x22;"} and join our [Discord community](https://discord.nuxt.com){rel="&#x22;nofollow&#x22;"} to connect with other developers building amazing things with Nuxt UI._

**Examples:**

Example 1 (vue):

```vue
<template>
  <UApp>
    <UHeader>
      <UNavigationMenu :items="navigation" />
      <template #right>
        <UColorModeButton />
        <UButton icon="i-simple-icons-github" />
      </template>
    </UHeader>

    <UPageHero
      title="Nuxt UI - Starter"
      description="Nuxt UI is a free and open-source UI library for Nuxt applications. Create beautiful & responsive applications in minutes."
      :links="heroLinks" />

    <UPageSection
      title="The freedom to build anything"
      description="Nuxt UI ships with a comprehensive set of components that cover a wide range of use-cases. Carefully crafted to reduce boilerplate code without sacrificing flexibility."
      :features="features" />

    <UPageSection title="Pricing">
      <UPricingPlans :plans="plans" />
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Start with Nuxt UI today!"
        description="Nuxt UI is a free and open-source UI library for Nuxt applications."
        variant="subtle"
        :links="ctaLinks" />
    </UPageSection>

    <UFooter :items="footerItems" />
  </UApp>
</template>
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

## Framework

**URL:** llms-txt#framework

**Contents:**

- Monorepo Guide
- Setup
  - Playground
  - Testing
  - Linting
  - Documentation
  - Final Checklist
- Documentation Guide
  - Quick Edits
  - Longer Edits

Once you've read the [general contribution guide](https://nuxt.com/docs/3.x/community/contribution), here are some specific points to make about contributions to the [`nuxt/nuxt`](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} repository.

- `packages/kit`: Toolkit for authoring Nuxt Modules, published as [`@nuxt/kit`](https://npmjs.com/package/@nuxt/kit){rel="&#x22;nofollow&#x22;"}.
- `packages/nuxt`: The core of Nuxt, published as [`nuxt`](https://npmjs.com/package/nuxt){rel="&#x22;nofollow&#x22;"}.
- `packages/schema`: Cross-version Nuxt typedefs and defaults, published as [`@nuxt/schema`](https://npmjs.com/package/@nuxt/schema){rel="&#x22;nofollow&#x22;"}.
- `packages/rspack`: The [Rspack](https://rspack.dev){rel="&#x22;nofollow&#x22;"} bundler for Nuxt, published as [`@nuxt/rspack-builder`](https://npmjs.com/package/@nuxt/rspack-builder){rel="&#x22;nofollow&#x22;"}.
- `packages/vite`: The [Vite](https://vite.dev){rel="&#x22;nofollow&#x22;"} bundler for Nuxt, published as [`@nuxt/vite-builder`](https://npmjs.com/package/@nuxt/vite-builder){rel="&#x22;nofollow&#x22;"}.
- `packages/webpack`: The [webpack](https://webpack.js.org){rel="&#x22;nofollow&#x22;"} bundler for Nuxt, published as [`@nuxt/webpack-builder`](https://npmjs.com/package/@nuxt/webpack-builder){rel="&#x22;nofollow&#x22;"}.

To contribute to Nuxt, you need to set up a local environment.

1. [Fork](https://help.github.com/articles/fork-a-repo){rel="&#x22;nofollow&#x22;"} the [`nuxt/nuxt`](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository){rel="&#x22;nofollow&#x22;"} it to your local device.
2. Ensure using the latest [Node.js](https://nodejs.org/en){rel="&#x22;nofollow&#x22;"} (20.x)
3. Enable [Corepack](https://github.com/nodejs/corepack){rel="&#x22;nofollow&#x22;"} to have `pnpm` and `yarn`
4. Run `pnpm install --frozen-lockfile` to Install the dependencies with pnpm:

:note[If you are adding a dependency, please use `pnpm add`. :br
The `pnpm-lock.yaml` file is the source of truth for all Nuxt dependencies.] 5. Activate the passive development system

6. Check out a branch where you can work and commit your changes:

Then, test your changes against the [playground](https://nuxt.com/#playground) and [test](https://nuxt.com/#testing) your changes before submitting a pull request.

While working on a pull request, you will likely want to check if your changes are working correctly.

You can modify the example app in `playground/`, and run:

::important
Please make sure not to commit it to your branch, but it could be helpful to add some example code to your PR description. This can help reviewers and other Nuxt users understand the feature you've built in-depth.
::

Every new feature should have a corresponding unit test (if possible). The `test/` directory in this repository is currently a work in progress, but do your best to create a new test following the example of what's already there.

Before creating a PR or marking it as ready-to-review, ensure that all tests pass by running:

You might have noticed already that we use ESLint to enforce a coding standard.

Before committing your changes, to verify that the code style is correct, run:

::note
You can use `pnpm lint --fix` to fix most of the style changes. :br
If there are still errors left, you must correct them manually.
::

If you are adding a new feature or refactoring or changing the behavior of Nuxt in any other manner, you'll likely want to document the changes. Please include any changes to the docs in the same PR. You don't have to write documentation up on the first commit (but please do so as soon as your pull request is mature enough).

::important
Make sure to make changes according to the [Documentation Style Guide](https://nuxt.com/docs/3.x/community/contribution#documentation-style-guide).
::

When submitting your PR, there is a simple template that you have to fill out. Please tick all appropriate "answers" in the checklists.

## Documentation Guide

If you spot an area where we can improve documentation or error messages, please do open a PR - even if it's just to fix a typo!

::important
Make sure to make changes according to the [Documentation Style Guide](https://nuxt.com/docs/3.x/community/contribution#documentation-style-guide).
::

If you spot a typo or want to rephrase a sentence, you can click on the **Edit this page** link located on the right aside in the **Community** section.

Make the change directly in the GitHub interface and open a Pull Request.

The documentation content is inside the `docs/` directory of the [nuxt/nuxt](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} repository and written in markdown.

::note
To preview the docs locally, follow the steps on [nuxt/nuxt.com](https://github.com/nuxt/nuxt.com){rel=""nofollow""} repository.
::

::note
We recommend that you install the [MDC extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc){rel=""nofollow""} for VS Code.
::

Documentation is linted using [MarkdownLint](https://github.com/DavidAnson/markdownlint){rel="&#x22;nofollow&#x22;"} and [case police](https://github.com/antfu/case-police){rel="&#x22;nofollow&#x22;"} to keep the documentation cohesive.

::note
You can also run `pnpm lint:docs:fix` to highlight and resolve any lint issues.
::

Please make sure your PR title adheres to the [conventional commits](https://www.conventionalcommits.org){rel="&#x22;nofollow&#x22;"} guidelines.

**Examples:**

Example 1 (unknown):

```unknown
4. Run `pnpm install --frozen-lockfile` to Install the dependencies with pnpm:
```

Example 2 (unknown):

```unknown
:note[If you are adding a dependency, please use `pnpm add`. :br
   The `pnpm-lock.yaml` file is the source of truth for all Nuxt dependencies.]
5. Activate the passive development system
```

Example 3 (unknown):

```unknown
6. Check out a branch where you can work and commit your changes:
```

Example 4 (unknown):

```unknown
Then, test your changes against the [playground](https://nuxt.com/#playground) and [test](https://nuxt.com/#testing) your changes before submitting a pull request.

### Playground

While working on a pull request, you will likely want to check if your changes are working correctly.

You can modify the example app in `playground/`, and run:
```

---

## nuxt.config.ts

**URL:** llms-txt#nuxt.config.ts

The `nuxt.config` file extension can either be `.js`, `.ts` or `.mjs`.

::tip
`defineNuxtConfig` helper is globally available without import.
::

You can explicitly import `defineNuxtConfig` from `nuxt/config` if you prefer:

::read-more{to="https://nuxt.com/docs/api/configuration/nuxt-config"}
Discover all the available options in the **Nuxt configuration** documentation.
::

To ensure your configuration is up to date, Nuxt will make a full restart when detecting changes in the main configuration file, the [`.env`](https://nuxt.com/docs/3.x/directory-structure/env), [`.nuxtignore`](https://nuxt.com/docs/3.x/directory-structure/nuxtignore) and [`.nuxtrc`](https://nuxt.com/docs/3.x/directory-structure/nuxtrc) dotfiles.

**Examples:**

Example 1 (unknown):

```unknown
::tip
`defineNuxtConfig` helper is globally available without import.
::

You can explicitly import `defineNuxtConfig` from `nuxt/config` if you prefer:
```

---

## GitLab Pages

**URL:** llms-txt#gitlab-pages

**Contents:**

- Deployment

Nuxt supports deploying on the [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages){rel="&#x22;nofollow&#x22;"} with minimal configuration.

::caution
GitLab Pages only support static sites, Nuxt will pre-render your application to static HTML files.
::

::caution
If you are **not** using a custom domain, you need to set `NUXT_APP_BASE_URL` to your repository-slug for your build step.

**Example**: `https://<group/user>.gitlab.io/<repository>/`: `NUXT_APP_BASE_URL=/<repository>/ npm run generate`
::

1. Here is an example GitLab Pages workflow to deploy your site to GitLab Pages:

````yaml [.gitlab-ci.yml]

---

## <NuxtPage>

**URL:** llms-txt#<nuxtpage>

**Contents:**
- Props
- Example
- Page's Ref
- Custom Props

`<NuxtPage>` is a built-in component that comes with Nuxt. It lets you display top-level or nested pages located in the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory.

::note
`<NuxtPage>` is a wrapper around [`<RouterView>`](https://router.vuejs.org/api/interfaces/RouterViewProps.html#interface-routerviewprops){rel=""nofollow""} from Vue Router. It should be used instead of `<RouterView>` because the former takes additional care of internal states. Otherwise, `useRoute()` may return incorrect paths.
::

`<NuxtPage>` includes the following components:

By default, Nuxt does not enable `<Transition>` and `<KeepAlive>`. You can enable them in the nuxt.config file or by setting the `transition` and `keepalive` properties on `<NuxtPage>`. If you want to define a specific page, you can set it in `definePageMeta` in the page component.

::warning
If you enable `<Transition>` in your page component, ensure that the page has a single root element.
::

Since `<NuxtPage>` uses `<Suspense>` under the hood, the component lifecycle behavior during page changes differs from that of a typical Vue application.

In a typical Vue application, a new page component is mounted **only after** the previous one has been fully unmounted. However, in Nuxt, due to how Vue `<Suspense>` is implemented, the new page component is mounted **before** the previous one is unmounted.

- `name`: tells `<RouterView>` to render the component with the corresponding name in the matched route record's components option.

- type: `string`
- `route`: route location that has all of its components resolved.

- type: `RouteLocationNormalized`
- `pageKey`: control when the `NuxtPage` component is re-rendered.

- type: `string` or `function`
- `transition`: define global transitions for all pages rendered with the `NuxtPage` component.

- type: `boolean` or [`TransitionProps`](https://vuejs.org/api/built-in-components#transition){rel="&#x22;nofollow&#x22;"}
- `keepalive`: control state preservation of pages rendered with the `NuxtPage` component.

- type: `boolean` or [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive){rel="&#x22;nofollow&#x22;"}

::tip
Nuxt automatically resolves the `name` and `route` by scanning and rendering all Vue component files found in the `/pages` directory.
::

For example, if you pass a key that never changes, the `<NuxtPage>` component will be rendered only once - when it is first mounted.

You can also use a dynamic key based on the current route:

::warning
Don't use `$route` object here as it can cause problems with how `<NuxtPage>` renders pages with `<Suspense>`.
::

Alternatively, `pageKey` can be passed as a `key` value via [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) from the `<script>` section of your Vue component in the `/pages` directory.

::link-example{to="https://nuxt.com/docs/examples/routing/pages"}
::

To get the `ref` of a page component, access it through `ref.value.pageRef`

`<NuxtPage>` also accepts custom props that you may need to pass further down the hierarchy.

For example, in the below example, the value of `foobar` will be passed to the `NuxtPage` component and then to the page components.

We can access the `foobar` prop in the page component:

If you have not defined the prop with `defineProps`, any props passed down to `NuxtPage` can still be accessed directly from the page `attrs`:

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
::

**Examples:**

Example 1 (vue):
```vue
<template>
  <RouterView v-slot="{ Component }">
    <!-- Optional, when using transitions -->
    <Transition>
      <!-- Optional, when using keep-alive -->
      <KeepAlive>
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
````

Example 2 (unknown):

```unknown
You can also use a dynamic key based on the current route:
```

Example 3 (unknown):

```unknown
::warning
Don't use `$route` object here as it can cause problems with how `<NuxtPage>` renders pages with `<Suspense>`.
::

Alternatively, `pageKey` can be passed as a `key` value via [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) from the `<script>` section of your Vue component in the `/pages` directory.
```

Example 4 (unknown):

```unknown
::link-example{to="https://nuxt.com/docs/examples/routing/pages"}
::

## Page's Ref

To get the `ref` of a page component, access it through `ref.value.pageRef`
```

---

## useState

**URL:** llms-txt#usestate

**Contents:**

- Usage
- Using `shallowRef`
- Type

::read-more{to="https://nuxt.com/docs/getting-started/state-management"}
::

::important
Because the data inside `useState` will be serialized to JSON, it is important that it does not contain anything that cannot be serialized, such as classes, functions or symbols.
::

::warning
`useState` is a reserved function name transformed by the compiler, so you should not name your own function `useState`.
::

## ::video-accordion

title: Watch a video from Alexander Lichter about why and when to use useState
video-id: mv0WcBABcIk

---

::

## Using `shallowRef`

If you don't need your state to be deeply reactive, you can combine `useState` with [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref){rel="&#x22;nofollow&#x22;"}. This can improve performance when your state contains large objects and arrays.

- `key`: A unique key ensuring that data fetching is properly de-duplicated across requests. If you do not provide a key, then a key that is unique to the file and line number of the instance of [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) will be generated for you.
- `init`: A function that provides initial value for the state when not initiated. This function can also return a `Ref`.
- `T`: (typescript only) Specify the type of state

**Examples:**

Example 1 (ts):

```ts
// Create a reactive state and set default value
const count = useState('counter', () => Math.round(Math.random() * 100));
```

Example 2 (ts):

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }));
// isShallow(state) === true
```

---

## Debugging

**URL:** llms-txt#debugging

**Contents:**

- Sourcemaps
- Debugging with Node Inspector
- Debugging in Your IDE
  - Example VS Code Debug Configuration
  - Example JetBrains IDEs Debug Configuration
  - Other IDEs

Sourcemaps are enabled for your server build by default, and for the client build in dev mode, but you can enable them more specifically in your configuration.

## Debugging with Node Inspector

You can use [Node inspector](https://nodejs.org/en/learn/getting-started/debugging){rel="&#x22;nofollow&#x22;"} to debug Nuxt server-side.

This will start Nuxt in `dev` mode with debugger active. If everything is working correctly a Node.js icon will appear on your Chrome DevTools and you can attach to the debugger.

::important
Note that the Node.js and Chrome processes need to be run on the same platform. This doesn't work inside of Docker.
::

## Debugging in Your IDE

It is possible to debug your Nuxt app in your IDE while you are developing it.

### Example VS Code Debug Configuration

You may need to update the config below with a path to your web browser. For more information, visit the [VS Code documentation about debug configuration](https://go.microsoft.com/fwlink/?linkid=830387){rel="&#x22;nofollow&#x22;"}.

If you prefer your usual browser extensions, add this to the _chrome_ configuration above:

### Example JetBrains IDEs Debug Configuration

You can also debug your Nuxt app in JetBrains IDEs such as IntelliJ IDEA, WebStorm, or PhpStorm.

1. Create a new file in your project root directory and name it `nuxt.run.xml`.
2. Open the `nuxt.run.xml` file and paste the following debug configuration:

If you have another IDE and would like to contribute sample configuration, feel free to [open a PR](https://github.com/nuxt/nuxt/edit/main/docs/2.guide/3.going-further/9.debugging.md){rel="&#x22;nofollow&#x22;"}!

**Examples:**

Example 1 (ts):

```ts
export default defineNuxtConfig({
  // or sourcemap: true
  sourcemap: {
    server: true,
    client: true,
  },
});
```

Example 2 (bash):

```bash
nuxt dev --inspect
```

Example 3 (json5):

```json5
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  version: '0.2.0',
  configurations: [
    {
      type: 'chrome',
      request: 'launch',
      name: 'client: chrome',
      url: 'http://localhost:3000',
      webRoot: '${workspaceFolder}',
    },
    {
      type: 'node',
      request: 'launch',
      name: 'server: nuxt',
      outputCapture: 'std',
      program: '${workspaceFolder}/node_modules/nuxt/bin/nuxt.mjs',
      args: ['dev'],
    },
  ],
  compounds: [
    {
      name: 'fullstack: nuxt',
      configurations: ['server: nuxt', 'client: chrome'],
    },
  ],
}
```

Example 4 (json5):

```json5
"userDataDir": false,
```

---

## useError

**URL:** llms-txt#useerror

**Contents:**

- Usage
- Type
- Parameters
- Return Values
- Example

The `useError` composable returns the global Nuxt error that is being handled and is available on both client and server. It provides a reactive, SSR-friendly error state across your app.

You can use this composable in your components, pages, or plugins to access or react to the current Nuxt error.

This composable does not take any parameters.

Returns a `Ref` containing the current Nuxt error (or `undefined` if there is no error). The error object is reactive and will update automatically when the error state changes.

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

**Examples:**

Example 1 (ts):

```ts
const error = useError();
```

Example 2 (ts):

```ts
interface NuxtError<DataT = unknown> {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: DataT;
  error?: true;
}

export const useError: () => Ref<NuxtError | undefined>;
```

Example 3 (vue):

```vue
<script setup lang="ts">
  const error = useError();

  if (error.value) {
    console.error('Nuxt error:', error.value);
  }
</script>
```

---

## The Evolution of Shiki v1.0

**URL:** llms-txt#the-evolution-of-shiki-v1.0

**Contents:**

- The Start
- The Fork - Shikiji
- Merging Back
- Twoslash
- Integrations
- Conclusions

[Shiki](https://github.com/shikijs/shiki){rel="&#x22;nofollow&#x22;"} is a syntax highlighter that uses [TextMate grammars and themes](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-grammars){rel="&#x22;nofollow&#x22;"}, the same engine that powers VS Code. It provides one of the most accurate and beautiful syntax highlighting for your code snippets. It was created by [Pine Wu](https://github.com/octref){rel="&#x22;nofollow&#x22;"} back in 2018, when he was part of the VS Code team. It started as an experiment to use [Oniguruma](https://github.com/microsoft/vscode-oniguruma){rel="&#x22;nofollow&#x22;"} to do syntax highlighting.

Different from existing syntax highlighters like [Prism](https://prismjs.com/){rel="&#x22;nofollow&#x22;"} and [Highlight.js](https://highlightjs.org/){rel="&#x22;nofollow&#x22;"} that designed to run in the browser, Shiki took a different approach by **highlighting ahead of time**. It ships the highlighted HTML to the client, producing accurate and beautiful syntax highlighting with **zero JavaScript**. It soon took off and became a very popular choice, especially for static site generators and documentation sites.

::collapsible{name="Shiki Example"}
For example, with the code snippet below:

Shiki will generate the following HTML:

It might look a bit overwhelming if you read it, but **this piece of HTML works everywhere without any JavaScript or CSS**. TextMate grammars has a very rich representation of the types of every token (TextMate scopes). Since Shiki flattens all the tokens into styled spans, it achieves accurate results that most traditional CSS-based highlighters have difficulties achieving.
::

While Shiki is awesome, it's still a library that is designed to run on Node.js. This means it is limited to highlighting static code only and would have trouble with dynamic code, because Shiki doesn't work in the browser. In addition, Shiki relies on the WASM binary of Oniguruma, as well as a bunch of heavy grammar and theme files in JSON. It uses Node.js filesystem and path resolution to load these files, which is not accessible in the browser.

To improve that situation, I [started this RFC](https://github.com/shikijs/shiki/issues/91){rel="&#x22;nofollow&#x22;"} that later landed with [this PR](https://github.com/shikijs/shiki/pull/109){rel="&#x22;nofollow&#x22;"} and shipped in Shiki v0.9. While it abstracted the file loading layer to use fetch or filesystem based on the environment, it's still quite complicated to use as you need to serve the grammars and theme files somewhere in your bundle or CDN manually, then call the `setCDN` method to tell Shiki where to load these files.

The solution is not perfect but at least it made it possible to run Shiki in the browser to highlight dynamic content. We have been using that approach since then - until the story of this article began.

Nuxt is putting a lot effort in pushing the [web to the edge](https://nuxt.com/blog/nuxt-on-the-edge), making the web more accessible with lower latency and better performance. Like CDN servers, edge hosting services such as [CloudFlare Workers](https://workers.cloudflare.com/){rel="&#x22;nofollow&#x22;"} are deployed all over the world. Users get the content from the nearest edge server without the round trips to the origin server which could be thousands of miles away. With the awesome benefits it provides, it also comes with some trade-offs. For example, edge servers use a restricted runtime environment. CloudFlare Workers also does not support file system access and usually don't preserve the state between requests. While Shiki's main overhead is loading the grammars and themes upfront, that wouldn't work well in the edge environment.

It all started with a chat between [Sébastien](https://x.com/Atinux){rel="&#x22;nofollow&#x22;"} and me. We were trying to make [Nuxt Content](https://github.com/nuxt/content){rel="&#x22;nofollow&#x22;"} which uses Shiki to highlight the code blocks, to work on the edge.

![Chat History Between Sébastien and Anthony](https://nuxt.com/assets/blog/shiki-start-chat.png){.rounded-lg.shadow.max-w-[700px].border.dark:border-gray-700}

I started the experiments by patching [`shiki-es`](https://github.com/pi0/shiki-es){rel="&#x22;nofollow&#x22;"} (a ESM build of Shiki by [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"}) locally, to convert the grammars and themes files into [ECMAScript Module (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules){rel="&#x22;nofollow&#x22;"} so that it could be understood and bundled by the build tools. This was done to create the code bundle for CloudFlare Workers to consume without using the filesystem nor making network requests.

We need to wrap the JSON files into ESM as inline literal so that we can use [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import){rel="&#x22;nofollow&#x22;"} to dynamically import them. The difference is that `import()` is a standard JavaScript feature that works everywhere, while `fs.readFile` is a Node.js specific API that only works in Node.js. Having `import()` statically would also make bundlers like [Rollup](https://rollupjs.org/){rel="&#x22;nofollow&#x22;"} and [webpack](https://webpack.js.org/){rel="&#x22;nofollow&#x22;"} able to construct the module relationship graph and [emit the bundled code as chunks](https://rollupjs.org/tutorial/#code-splitting){rel="&#x22;nofollow&#x22;"}.

Then, I realized that it actually takes more than that to make it work on edge runtimes. Since bundlers expect imports to be resolvable at build time (meaning that in order to support all the languages and themes), we need to list all the import statements in every single grammar and theme file in the codebase. This would end up with a huge bundle size with a bunch of grammars and themes that you might not actually use. This problem is particularly important in the edge environment, where the bundle size is critical for performance.

So, we needed to figure out a better middle ground to make it work better.

## The Fork - Shikiji

Knowing this might fundamentally change the way Shiki works, and since we don't want to risk breaking the existing Shiki users with our experiments, I started a fork of Shiki called [Shikiji](https://github.com/antfu/shikiji){rel="&#x22;nofollow&#x22;"}. I rewrote the code from scratch while keeping the previous API design decisions in mind. The goal is to make Shiki runtime-agnostic, performant and efficient, like the philosophy we have at [UnJS](https://github.com/unjs){rel="&#x22;nofollow&#x22;"}.

To make that happen, we need to make Shikiji completely ESM-friendly, pure and [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking){rel="&#x22;nofollow&#x22;"}. This goes all the way up to the dependencies of Shiki such as [`vscode-oniguruma`](https://github.com/microsoft/vscode-oniguruma){rel="&#x22;nofollow&#x22;"} and [`vscode-textmate`](https://github.com/microsoft/vscode-textmate){rel="&#x22;nofollow&#x22;"}, which are provided in [Common JS (CJS)](https://requirejs.org/docs/commonjs.html){rel="&#x22;nofollow&#x22;"} format. `vscode-oniguruma` also contains a WASM binding generated by [`emscripten`](https://github.com/emscripten-core/emscripten){rel="&#x22;nofollow&#x22;"} that contains [dangling promises](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md){rel="&#x22;nofollow&#x22;"} that will make CloudFlare Workers fail to finish the request. We ended up by embedding the WASM binary into a [base64 string](https://en.wikipedia.org/wiki/Base64){rel="&#x22;nofollow&#x22;"} and shipping it as an ES module, manually rewriting the WASM binding to avoid dangling promises, and [vendored `vscode-textmate`](https://github.com/shikijs/shiki/blob/main/CONTRIBUTING.md#clone){rel="&#x22;nofollow&#x22;"} to compile from its source code and produce the efficient ESM output.

The end result was very promising. We managed to get Shikiji working on any runtime environment, with even the possibility to [import it from CDN and run in the browser](https://shiki.style/guide/install#cdn-usage){rel="&#x22;nofollow&#x22;"} with a single line of code.

We also took the chance to improve the API and the internal architecture of Shiki. We switched from simple string concatenation to use [`hast`](https://github.com/syntax-tree/hast){rel="&#x22;nofollow&#x22;"}, creating an Abstract Syntax Tree (AST) for generating the HTML output. This opens up the possibility of exposing a [Transformers API](https://shiki.style/guide/transformers){rel="&#x22;nofollow&#x22;"} to allow users to modify the intermediate HAST and do many cool integrations that would be very hard to achieve previously.

Dark/Light mode support [was a frequently requested feature](https://github.com/shikijs/shiki/issues/33){rel="&#x22;nofollow&#x22;"}. Because of the static approach Shiki takes, it won't be possible to change the theme on the fly at rendering. The solution in the past was to generate the highlighted HTML twice, and toggle their visibility based on the user's preference - it wasn't efficient as it duplicate the payload, or used [CSS variables theme](https://github.com/shikijs/shiki/pull/212){rel="&#x22;nofollow&#x22;"} which lost the granular highlighting Shiki is great for. With the new architecture that Shikiji has, I took a step back and rethought the problem, and [came up with the idea](https://github.com/shikijs/shiki/issues/33#issuecomment-1676362336){rel="&#x22;nofollow&#x22;"} of breaking down the common tokens and merge multiple themes as inlined CSS variables, which provide efficient output while aligning with the Shiki's philosophy. You can learn more about it in [Shiki's documentation](https://shiki.style/guide/dual-themes){rel="&#x22;nofollow&#x22;"}.

To make the migration easier, we also created the [`shikiji-compat` compatibility layer](https://shikiji.netlify.app/guide/compat){rel="&#x22;nofollow&#x22;"}, which uses Shikiji's new foundation and provides backward compatibility API.

To get Shikiji to work on Cloudflare Workers, we had one last challenge as they don't support [initiating WASM instance](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate_static){rel="&#x22;nofollow&#x22;"}s from inlined binary data. Instead it requires importing the static `.wasm` assets for security reasons. This means that our "All-in-ESM" approach does not work well on CloudFlare. This would require extra work for users to provide different WASM sources, which makes the experience more difficult than we intended. At this moment, [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"} stepped in and made the universal layer [`unjs/unwasm`](https://github.com/unjs/unwasm){rel="&#x22;nofollow&#x22;"}, which supports the upcoming [WebAssembly/ES Module Integration](https://github.com/WebAssembly/esm-integration/tree/main/proposals/esm-integration){rel="&#x22;nofollow&#x22;"} proposal. It has been integrated into [Nitro to have automated WASM targets](https://github.com/unjs/nitro/pull/2037){rel="&#x22;nofollow&#x22;"}. We hope that `unwasm` will help developers to have a better experience when working with WASM.

Overall, the Shikiji rewrite works well. [Nuxt Content](https://github.com/nuxt/content){rel="&#x22;nofollow&#x22;"}, [VitePress](https://vitepress.dev/){rel="&#x22;nofollow&#x22;"} and [Astro](https://astro.build/){rel="&#x22;nofollow&#x22;"} have been migrated to it. The feedback we have received has also been very positive.

I am a team member of Shiki and have helped to do releases from time to time. While [Pine](https://github.com/octref){rel="&#x22;nofollow&#x22;"} is the lead of Shiki, he was busy on other stuff and Shiki's iterations slowed down. During the experiments in Shikiji, I [proposed a few improvements](https://github.com/shikijs/shiki/issues/510){rel="&#x22;nofollow&#x22;"} that could help Shiki acquire a modern structure. While generally everyone agreed with that direction, there would have been quite a lot of work to do and no one started to work on that.

While we were happy to use Shikiji to solve the problems we had, we certainly didn't want to see the community split by two different versions of Shiki. After a call with Pine, we made the consensus to merge the two projects into one:

## ::read-more

color: purple
icon: i-octicon-git-merge-24
to: https://github.com/shikijs/shiki/pull/557

---

feat!: merge Shikiji back into Shiki for v1.0 [#557]{.opacity-50}
::

We are really happy to see that our work in Shikiji has been merged back to Shiki, that not only works for ourselves, but also benefits the entire community. With this merge, it **solves around 95% of the open issues** we have had in Shiki for years:

![Shikiji Merged Back to Shiki](https://nuxt.com/assets/blog/shiki-merge-pr.png){.rounded-lg.shadow}

Shiki now also got [a brand new documentation site](https://shiki.style/){rel="&#x22;nofollow&#x22;"} where you can also play it right in your browser (thanks to the agnostic approach!). Many frameworks now has built-in integration with Shiki, maybe you are already using it somewhere!

[Twoslash](https://github.com/twoslashes/twoslash){rel="&#x22;nofollow&#x22;"} is an integration tool to retrieve type information from [TypeScript Language Services](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API){rel="&#x22;nofollow&#x22;"} and generated to your code snippet. It essentially make your static code snippet to have hover type information similar to your VS Code editor. It's made by [Orta Therox](https://github.com/orta){rel="&#x22;nofollow&#x22;"} for the [TypeScript documentation site](https://github.com/microsoft/TypeScript-Website){rel="&#x22;nofollow&#x22;"}, there you can find [the original source code here](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ts-twoslasher){rel="&#x22;nofollow&#x22;"}. Orta also created the [Twoslash integration for Shiki v0.x versions](https://github.com/shikijs/twoslash){rel="&#x22;nofollow&#x22;"}. Back then, Shiki [did not have proper plugin system](https://github.com/shikijs/shiki/issues/380){rel="&#x22;nofollow&#x22;"}, that makes the `shiki-twoslash` had to be built as a wrapper over Shiki, make it a bit hard to set up as the existing Shiki integrations won't directly work with Twoslash.

We also took the chance to revise the Twoslash integrations when we were rewriting Shikiji, also a way to [dog-fooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food){rel="&#x22;nofollow&#x22;"} and verify the extensibility. With the new HAST internal, we are able to [integrate Twoslash as a transformer plugin](https://shiki.style/packages/twoslash){rel="&#x22;nofollow&#x22;"}, making it works everywhere that Shiki works and also in a composable way to be used with other transformers.

With this, we started to think that we could probably get Twoslash to work on [nuxt.com](https://nuxt.com), the website you are looking at. nuxt.com uses [Nuxt Content](https://github.com/nuxt/content){rel="&#x22;nofollow&#x22;"} under the hood, and different from other documentation tools like VitePress, one of the benefits Nuxt Content provides is that it's able to handle dynamic content and runs on the edge. Since Twoslash is relying on TypeScript as well as the giant types modules graph from your dependencies, that would be not ideal to ship all those things to the edge or browser. Sounds tricky, but challenge accepted!

We first come up of fetching the types on-demand from CDN, using the [Auto-Type-Acquisition](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ata){rel="&#x22;nofollow&#x22;"} technique that you will see on the [TypeScript playground](https://www.typescriptlang.org/play){rel="&#x22;nofollow&#x22;"}. We made the [`twoslash-cdn`](https://github.com/antfu/twoslash-cdn){rel="&#x22;nofollow&#x22;"} that allows Twoslash to run in any runtime. However, still, it sounds like not the most optimal solution, as it would still require to make many network requests that might defeat the purpose of running on the edge.

After a few iterations on the underlying tools (e.g. on [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc/pull/129){rel="&#x22;nofollow&#x22;"}, the markdown compiler used by Nuxt Content), we managed to take the hybrid approach and made [`nuxt-content-twoslash`](https://github.com/antfu/nuxt-content-twoslash){rel="&#x22;nofollow&#x22;"} that runs Twoslash on build time and caches the results for edge rendering. This way we could avoid shipping any extra dependencies to the final bundle, but still have the rich interactive code snippets on the website:

During that, we also took the chance to refactor [Twoslash](https://github.com/twoslashes/twoslash){rel="&#x22;nofollow&#x22;"} with Orta to have a more efficient and modern structure. It also allows us have [`twoslash-vue`](https://github.com/twoslashes/twoslash/tree/main/packages/twoslash-vue){rel="&#x22;nofollow&#x22;"} that provides the [Vue SFC](https://vuejs.org/guide/scaling-up/sfc.html){rel="&#x22;nofollow&#x22;"} support as you are playing above. It's powered by [Volar.js](https://github.com/volarjs/volar.js){rel="&#x22;nofollow&#x22;"} and [`vuejs/language-tools`](https://github.com/vuejs/language-tools){rel="&#x22;nofollow&#x22;"}. With Volar growing to be framework agnostic and frameworks to work together, we are looking forward to see such integrations to expand to more syntaxes like Astro and Svelte components files in the future.

If you want to give Shiki a try in your own website, here you can find some integrations that we have made:

- [Nuxt](https://shiki.style/packages/nuxt){rel="&#x22;nofollow&#x22;"}

- If using [Nuxt Content](https://content.nuxt.com/){rel="&#x22;nofollow&#x22;"}, Shiki is [build-in](https://content.nuxt.com/get-started/configuration#highlight){rel="&#x22;nofollow&#x22;"}. For Twoslash, you can add [`nuxt-content-twoslash`](https://github.com/antfu/nuxt-content-twoslash){rel="&#x22;nofollow&#x22;"} on top.
  - If not, you can use [`nuxt-shiki`](https://github.com/pi0/nuxt-shiki){rel="&#x22;nofollow&#x22;"} to use Shiki as Vue component or composibles.
- [VitePress](https://shiki.style/packages/vitepress){rel="&#x22;nofollow&#x22;"}

- Shiki is [built-in](https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks){rel="&#x22;nofollow&#x22;"}. For Twoslash, you can use [`vitepress-twoslash`](https://shiki.style/packages/vitepress#twoslash){rel="&#x22;nofollow&#x22;"}.
- Low-level integrations - Shiki provides official integrations for markdown compilers:

- [`markdown-it`](https://shiki.style/packages/markdown-it){rel="&#x22;nofollow&#x22;"} - Plugin for [`markdown-it`](https://github.com/markdown-it/markdown-it){rel="&#x22;nofollow&#x22;"}
  - [`rehype`](https://shiki.style/packages/rehype){rel="&#x22;nofollow&#x22;"} - Plugin for [`rehype`](https://github.com/rehypejs/rehype){rel="&#x22;nofollow&#x22;"}

Check out more integrations on [Shiki's Documentation](https://shiki.style/){rel="&#x22;nofollow&#x22;"}

**Our mission at Nuxt is not only to make a better framework for developers, but also to make the entire frontend and web ecosystem a better place.** We are keeping pushing the boundaries and endorse the modern web standards and best practices. We hope you enjoy the new [Shiki](https://github.com/shikijs/shiki){rel="&#x22;nofollow&#x22;"}, [unwasm](https://github.com/unjs/unwasm){rel="&#x22;nofollow&#x22;"}, [Twoslash](https://github.com/twoslashes/twoslash){rel="&#x22;nofollow&#x22;"} and many other tools we made in the process of making Nuxt and the web better.

**Examples:**

Example 1 (ts):

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
});
```

Example 2 (html):

```html
<pre class="shiki material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0">
  <code>
    <span class="line"><span style="color:#89DDFF;font-style:italic">export</span><span style="color:#89DDFF;font-style:italic"> default</span><span style="color:#82AAFF"> defineNuxtConfig</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">{</span></span>
    <span class="line"><span style="color:#F07178">  modules</span><span style="color:#89DDFF">:</span><span style="color:#BABED8"> [</span></span>
    <span class="line"><span style="color:#89DDFF">    '</span><span style="color:#C3E88D">@nuxt/content</span><span style="color:#89DDFF">'</span><span style="color:#89DDFF">,</span></span>
    <span class="line"><span style="color:#BABED8">  ]</span><span style="color:#89DDFF">,</span></span>
    <span class="line"><span style="color:#89DDFF">}</span><span style="color:#BABED8">)</span></span>
  </code>
</pre>
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
We need to wrap the JSON files into ESM as inline literal so that we can use [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import){rel="&#x22;nofollow&#x22;"} to dynamically import them. The difference is that `import()` is a standard JavaScript feature that works everywhere, while `fs.readFile` is a Node.js specific API that only works in Node.js. Having `import()` statically would also make bundlers like [Rollup](https://rollupjs.org/){rel="&#x22;nofollow&#x22;"} and [webpack](https://webpack.js.org/){rel="&#x22;nofollow&#x22;"} able to construct the module relationship graph and [emit the bundled code as chunks](https://rollupjs.org/tutorial/#code-splitting){rel="&#x22;nofollow&#x22;"}.

Then, I realized that it actually takes more than that to make it work on edge runtimes. Since bundlers expect imports to be resolvable at build time (meaning that in order to support all the languages and themes), we need to list all the import statements in every single grammar and theme file in the codebase. This would end up with a huge bundle size with a bunch of grammars and themes that you might not actually use. This problem is particularly important in the edge environment, where the bundle size is critical for performance.

So, we needed to figure out a better middle ground to make it work better.

## The Fork - Shikiji

Knowing this might fundamentally change the way Shiki works, and since we don't want to risk breaking the existing Shiki users with our experiments, I started a fork of Shiki called [Shikiji](https://github.com/antfu/shikiji){rel="&#x22;nofollow&#x22;"}. I rewrote the code from scratch while keeping the previous API design decisions in mind. The goal is to make Shiki runtime-agnostic, performant and efficient, like the philosophy we have at [UnJS](https://github.com/unjs){rel="&#x22;nofollow&#x22;"}.

To make that happen, we need to make Shikiji completely ESM-friendly, pure and [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking){rel="&#x22;nofollow&#x22;"}. This goes all the way up to the dependencies of Shiki such as [`vscode-oniguruma`](https://github.com/microsoft/vscode-oniguruma){rel="&#x22;nofollow&#x22;"} and [`vscode-textmate`](https://github.com/microsoft/vscode-textmate){rel="&#x22;nofollow&#x22;"}, which are provided in [Common JS (CJS)](https://requirejs.org/docs/commonjs.html){rel="&#x22;nofollow&#x22;"} format. `vscode-oniguruma` also contains a WASM binding generated by [`emscripten`](https://github.com/emscripten-core/emscripten){rel="&#x22;nofollow&#x22;"} that contains [dangling promises](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md){rel="&#x22;nofollow&#x22;"} that will make CloudFlare Workers fail to finish the request. We ended up by embedding the WASM binary into a [base64 string](https://en.wikipedia.org/wiki/Base64){rel="&#x22;nofollow&#x22;"} and shipping it as an ES module, manually rewriting the WASM binding to avoid dangling promises, and [vendored `vscode-textmate`](https://github.com/shikijs/shiki/blob/main/CONTRIBUTING.md#clone){rel="&#x22;nofollow&#x22;"} to compile from its source code and produce the efficient ESM output.

The end result was very promising. We managed to get Shikiji working on any runtime environment, with even the possibility to [import it from CDN and run in the browser](https://shiki.style/guide/install#cdn-usage){rel="&#x22;nofollow&#x22;"} with a single line of code.

We also took the chance to improve the API and the internal architecture of Shiki. We switched from simple string concatenation to use [`hast`](https://github.com/syntax-tree/hast){rel="&#x22;nofollow&#x22;"}, creating an Abstract Syntax Tree (AST) for generating the HTML output. This opens up the possibility of exposing a [Transformers API](https://shiki.style/guide/transformers){rel="&#x22;nofollow&#x22;"} to allow users to modify the intermediate HAST and do many cool integrations that would be very hard to achieve previously.

Dark/Light mode support [was a frequently requested feature](https://github.com/shikijs/shiki/issues/33){rel="&#x22;nofollow&#x22;"}. Because of the static approach Shiki takes, it won't be possible to change the theme on the fly at rendering. The solution in the past was to generate the highlighted HTML twice, and toggle their visibility based on the user's preference - it wasn't efficient as it duplicate the payload, or used [CSS variables theme](https://github.com/shikijs/shiki/pull/212){rel="&#x22;nofollow&#x22;"} which lost the granular highlighting Shiki is great for. With the new architecture that Shikiji has, I took a step back and rethought the problem, and [came up with the idea](https://github.com/shikijs/shiki/issues/33#issuecomment-1676362336){rel="&#x22;nofollow&#x22;"} of breaking down the common tokens and merge multiple themes as inlined CSS variables, which provide efficient output while aligning with the Shiki's philosophy. You can learn more about it in [Shiki's documentation](https://shiki.style/guide/dual-themes){rel="&#x22;nofollow&#x22;"}.

To make the migration easier, we also created the [`shikiji-compat` compatibility layer](https://shikiji.netlify.app/guide/compat){rel="&#x22;nofollow&#x22;"}, which uses Shikiji's new foundation and provides backward compatibility API.

To get Shikiji to work on Cloudflare Workers, we had one last challenge as they don't support [initiating WASM instance](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate_static){rel="&#x22;nofollow&#x22;"}s from inlined binary data. Instead it requires importing the static `.wasm` assets for security reasons. This means that our "All-in-ESM" approach does not work well on CloudFlare. This would require extra work for users to provide different WASM sources, which makes the experience more difficult than we intended. At this moment, [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"} stepped in and made the universal layer [`unjs/unwasm`](https://github.com/unjs/unwasm){rel="&#x22;nofollow&#x22;"}, which supports the upcoming [WebAssembly/ES Module Integration](https://github.com/WebAssembly/esm-integration/tree/main/proposals/esm-integration){rel="&#x22;nofollow&#x22;"} proposal. It has been integrated into [Nitro to have automated WASM targets](https://github.com/unjs/nitro/pull/2037){rel="&#x22;nofollow&#x22;"}. We hope that `unwasm` will help developers to have a better experience when working with WASM.

Overall, the Shikiji rewrite works well. [Nuxt Content](https://github.com/nuxt/content){rel="&#x22;nofollow&#x22;"}, [VitePress](https://vitepress.dev/){rel="&#x22;nofollow&#x22;"} and [Astro](https://astro.build/){rel="&#x22;nofollow&#x22;"} have been migrated to it. The feedback we have received has also been very positive.

## Merging Back

I am a team member of Shiki and have helped to do releases from time to time. While [Pine](https://github.com/octref){rel="&#x22;nofollow&#x22;"} is the lead of Shiki, he was busy on other stuff and Shiki's iterations slowed down. During the experiments in Shikiji, I [proposed a few improvements](https://github.com/shikijs/shiki/issues/510){rel="&#x22;nofollow&#x22;"} that could help Shiki acquire a modern structure. While generally everyone agreed with that direction, there would have been quite a lot of work to do and no one started to work on that.

While we were happy to use Shikiji to solve the problems we had, we certainly didn't want to see the community split by two different versions of Shiki. After a call with Pine, we made the consensus to merge the two projects into one:

::read-more
---
color: purple
icon: i-octicon-git-merge-24
to: https://github.com/shikijs/shiki/pull/557
---
feat!: merge Shikiji back into Shiki for v1.0 [#557]{.opacity-50}
::

We are really happy to see that our work in Shikiji has been merged back to Shiki, that not only works for ourselves, but also benefits the entire community. With this merge, it **solves around 95% of the open issues** we have had in Shiki for years:

![Shikiji Merged Back to Shiki](https://nuxt.com/assets/blog/shiki-merge-pr.png){.rounded-lg.shadow}

Shiki now also got [a brand new documentation site](https://shiki.style/){rel="&#x22;nofollow&#x22;"} where you can also play it right in your browser (thanks to the agnostic approach!). Many frameworks now has built-in integration with Shiki, maybe you are already using it somewhere!

## Twoslash

[Twoslash](https://github.com/twoslashes/twoslash){rel="&#x22;nofollow&#x22;"} is an integration tool to retrieve type information from [TypeScript Language Services](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API){rel="&#x22;nofollow&#x22;"} and generated to your code snippet. It essentially make your static code snippet to have hover type information similar to your VS Code editor. It's made by [Orta Therox](https://github.com/orta){rel="&#x22;nofollow&#x22;"} for the [TypeScript documentation site](https://github.com/microsoft/TypeScript-Website){rel="&#x22;nofollow&#x22;"}, there you can find [the original source code here](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ts-twoslasher){rel="&#x22;nofollow&#x22;"}. Orta also created the [Twoslash integration for Shiki v0.x versions](https://github.com/shikijs/twoslash){rel="&#x22;nofollow&#x22;"}. Back then, Shiki [did not have proper plugin system](https://github.com/shikijs/shiki/issues/380){rel="&#x22;nofollow&#x22;"}, that makes the `shiki-twoslash` had to be built as a wrapper over Shiki, make it a bit hard to set up as the existing Shiki integrations won't directly work with Twoslash.

We also took the chance to revise the Twoslash integrations when we were rewriting Shikiji, also a way to [dog-fooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food){rel="&#x22;nofollow&#x22;"} and verify the extensibility. With the new HAST internal, we are able to [integrate Twoslash as a transformer plugin](https://shiki.style/packages/twoslash){rel="&#x22;nofollow&#x22;"}, making it works everywhere that Shiki works and also in a composable way to be used with other transformers.

With this, we started to think that we could probably get Twoslash to work on [nuxt.com](https://nuxt.com), the website you are looking at. nuxt.com uses [Nuxt Content](https://github.com/nuxt/content){rel="&#x22;nofollow&#x22;"} under the hood, and different from other documentation tools like VitePress, one of the benefits Nuxt Content provides is that it's able to handle dynamic content and runs on the edge. Since Twoslash is relying on TypeScript as well as the giant types modules graph from your dependencies, that would be not ideal to ship all those things to the edge or browser. Sounds tricky, but challenge accepted!

We first come up of fetching the types on-demand from CDN, using the [Auto-Type-Acquisition](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ata){rel="&#x22;nofollow&#x22;"} technique that you will see on the [TypeScript playground](https://www.typescriptlang.org/play){rel="&#x22;nofollow&#x22;"}. We made the [`twoslash-cdn`](https://github.com/antfu/twoslash-cdn){rel="&#x22;nofollow&#x22;"} that allows Twoslash to run in any runtime. However, still, it sounds like not the most optimal solution, as it would still require to make many network requests that might defeat the purpose of running on the edge.

After a few iterations on the underlying tools (e.g. on [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc/pull/129){rel="&#x22;nofollow&#x22;"}, the markdown compiler used by Nuxt Content), we managed to take the hybrid approach and made [`nuxt-content-twoslash`](https://github.com/antfu/nuxt-content-twoslash){rel="&#x22;nofollow&#x22;"} that runs Twoslash on build time and caches the results for edge rendering. This way we could avoid shipping any extra dependencies to the final bundle, but still have the rich interactive code snippets on the website:
```

---

## nuxt typecheck

**URL:** llms-txt#nuxt-typecheck

**Contents:**

- Arguments
- Options

The `typecheck` command runs [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc){rel="&#x22;nofollow&#x22;"} to check types throughout your app.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                       | Default | Description                                                                      |
| ---------------------------- | ------- | -------------------------------------------------------------------------------- | --- | ---------------------------- |
| `--cwd=<directory>`          |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |
| `--logLevel=<silent          | info    | verbose>`                                                                        |     | Specify build-time log level |
| `--dotenv`                   |         | Path to `.env` file to load, relative to the root directory                      |
| `-e, --extends=<layer-name>` |         | Extend from a Nuxt layer                                                         |

::note
This command sets `process.env.NODE_ENV` to `production`. To override, define `NODE_ENV` in a [`.env`](https://nuxt.com/docs/3.x/directory-structure/env) file or as a command-line argument.
::

::read-more{to="https://nuxt.com/docs/guide/concepts/typescript#type-checking"}
Read more on how to enable type-checking at build or development time.
::

---

## Builder

**URL:** llms-txt#builder

**Contents:**

- `extendViteConfig`
  - Usage
  - Type
  - Parameters
- `extendWebpackConfig`
  - Usage
  - Type
  - Parameters
- `addVitePlugin`
  - Usage

Nuxt have builders based on [Vite](https://github.com/nuxt/nuxt/tree/main/packages/vite){rel="&#x22;nofollow&#x22;"} and [webpack](https://github.com/nuxt/nuxt/tree/main/packages/webpack){rel="&#x22;nofollow&#x22;"}. You can extend the config passed to each one using `extendViteConfig` and `extendWebpackConfig` functions. You can also add additional plugins via `addVitePlugin`, `addWebpackPlugin` and `addBuildPlugin`.

## `extendViteConfig`

Extends the Vite configuration. Callback function can be called multiple times, when applying to both client and server builds.

::warning
This hook is now deprecated, and we recommend using a Vite plugin instead with a `config` hook, or — for environment-specific configuration — the `applyToEnvironment` hook.
::

For environment-specific configuration in Nuxt 5+, use `addVitePlugin()` instead:

::warning
**Important:** The `config` hook runs before `applyToEnvironment` and modifies the global configuration. Use `configEnvironment` for environment-specific configuration changes.
::

## ::read-more

icon: i-simple-icons-vite
target: \_blank
to: https://vite.dev/config

---

Checkout Vite website for more information about its configuration.
::

**`callback`**: A callback function that will be called with the Vite configuration object.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                                                                                       |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                                                                                         |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                                                                                          |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle. \*\*Deprecated in Nuxt 5+.\*\* Use `addVitePlugin()` with `applyToEnvironment()` instead. |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle. \*\*Deprecated in Nuxt 5+.\*\* Use `addVitePlugin()` with `applyToEnvironment()` instead. |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`.                                                                      |

## `extendWebpackConfig`

Extends the webpack configuration. Callback function can be called multiple times, when applying to both client and server builds.

## ::read-more

icon: i-simple-icons-webpack
target: \_blank
to: https://webpack.js.org/configuration

---

Checkout webpack website for more information about its configuration.
::

**`callback`**: A callback function that will be called with the webpack configuration object.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                  |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                    |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                     |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle.                      |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle.                      |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`. |

Append Vite plugin to the config.

::warning
In Nuxt 5+, plugins registered with `server: false` or `client: false` options will not have their `config` or `configResolved` hooks called. Instead, use the `applyToEnvironment()` method instead for environment-specific plugins.
::

::tip
See [Vite website](https://vite.dev/guide/api-plugin.html){rel=""nofollow""} for more information about Vite plugins. You can also use [this repository](https://github.com/vitejs/awesome-vite#plugins){rel=""nofollow""} to find a plugin that suits your needs.
::

**`pluginOrGetter`**: A Vite plugin instance or an array of Vite plugin instances. If a function is provided, it must return a Vite plugin instance or an array of Vite plugin instances.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                                                                |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                                                                  |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                                                                   |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle. \*\*Deprecated in Nuxt 5+.\*\* Use `applyToEnvironment()` instead. |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle. \*\*Deprecated in Nuxt 5+.\*\* Use `applyToEnvironment()` instead. |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`.                                               |

## `addWebpackPlugin`

Append webpack plugin to the config.

::tip
See [webpack website](https://webpack.js.org/concepts/plugins){rel=""nofollow""} for more information about webpack plugins. You can also use [this collection](https://webpack.js.org/awesome-webpack/#webpack-plugins){rel=""nofollow""} to find a plugin that suits your needs.
::

**`pluginOrGetter`**: A webpack plugin instance or an array of webpack plugin instances. If a function is provided, it must return a webpack plugin instance or an array of webpack plugin instances.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                  |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                    |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                     |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle.                      |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle.                      |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`. |

Builder-agnostic version of `addVitePlugin` and `addWebpackPlugin`. It will add the plugin to both Vite and webpack configurations if they are present.

**`pluginFactory`**: A factory function that returns an object with `vite` and/or `webpack` properties. These properties must be functions that return a Vite plugin instance or an array of Vite plugin instances and/or a webpack plugin instance or an array of webpack plugin instances.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                  |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                    |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                     |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle.                      |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle.                      |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`. |

**Examples:**

Example 1 (unknown):

```unknown
For environment-specific configuration in Nuxt 5+, use `addVitePlugin()` instead:
```

Example 2 (unknown):

```unknown
::warning
**Important:** The `config` hook runs before `applyToEnvironment` and modifies the global configuration. Use `configEnvironment` for environment-specific configuration changes.
::

### Type
```

Example 3 (unknown):

```unknown
::read-more
---
icon: i-simple-icons-vite
target: _blank
to: https://vite.dev/config
---
Checkout Vite website for more information about its configuration.
::

### Parameters

**`callback`**: A callback function that will be called with the Vite configuration object.

**`options`**: Options to pass to the callback function. This object can have the following properties:

| Property  | Type      | Required | Description                                                                                                                                                                        |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`     | `boolean` | `false`  | If set to `true`, the callback function will be called when building in development mode.                                                                                          |
| `build`   | `boolean` | `false`  | If set to `true`, the callback function will be called when building in production mode.                                                                                           |
| `server`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the server bundle. &#x2A;*Deprecated in Nuxt 5+.** Use `addVitePlugin()` with `applyToEnvironment()` instead. |
| `client`  | `boolean` | `false`  | If set to `true`, the callback function will be called when building the client bundle. &#x2A;*Deprecated in Nuxt 5+.** Use `addVitePlugin()` with `applyToEnvironment()` instead. |
| `prepend` | `boolean` | `false`  | If set to `true`, the callback function will be prepended to the array with `unshift()` instead of `push()`.                                                                       |

## `extendWebpackConfig`

Extends the webpack configuration. Callback function can be called multiple times, when applying to both client and server builds.

### Usage
```

Example 4 (unknown):

```unknown
### Type
```

---

## Refreshed Nuxt ESLint Integrations

**URL:** llms-txt#refreshed-nuxt-eslint-integrations

**Contents:**

- TL;DR
- Background
- Nuxt ESLint Monorepo
- ESLint Flat Config
  - Why Flat Config?
- Nuxt Presets for Flat Config
- Nuxt ESLint Module
  - Project-aware Rules
  - Config Inspector DevTools Integrations
  - Type Generation for Rules

We revamped our ESLint integrations to support ESLint v9 with the new flat config. Along the way, we have explored many new possibilities to make it more personalized, powerful, and with better developer experience.

You can run the following command to install the new [`@nuxt/eslint`](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"} module:

Continue reading the story or learn more with [the documentation](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"}.

[ESLint](https://eslint.org/){rel="&#x22;nofollow&#x22;"} has become an essential tool for today's web development. It helps you to catch errors and enforce a consistent coding style in your project. At Nuxt, we do our best to provide an out-of-the-box experience for ESLint, making it easy to use, configure and follow the best practices we recommend.

Since, both Nuxt and ESLint have evolved a lot. Historically, we ended up with [a few different packages and integrations for ESLint in Nuxt](https://eslint.nuxt.com/guide/faq#package-disambiguation){rel="&#x22;nofollow&#x22;"}, and it wasn't always obvious which one to use for what purpose. We have received a lot of feedback from our community.

To improve the situation and also make it future-proof, we recently refreshed our ESLint integrations to support [ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/){rel="&#x22;nofollow&#x22;"} with the [flat config](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"}. It opens up many more capabilities for customizing your ESLint setup, providing a more straightforward and unified experience.

## Nuxt ESLint Monorepo

We moved ESLint-related packages scattered across different repositories into a single monorepo: [`nuxt/eslint`](https://github.com/nuxt/eslint){rel="&#x22;nofollow&#x22;"}, with a dedicated new documentation site: [eslint.nuxt.com](https://eslint.nuxt.com/){rel="&#x22;nofollow&#x22;"}.

To help understand the differences between each package and what to use, we also have a [FAQ](https://eslint.nuxt.com/guide/faq){rel="&#x22;nofollow&#x22;"} page comparing them and explaining their scopes.

This monorepo now includes:

- `@nuxt/eslint` - The new, all-in-one ESLint module for Nuxt 3, supporting project-aware ESLint flat config and more.
- `@nuxt/eslint-config` - The unopinionated but customizable shared ESLint config for Nuxt 3. Supports both [the flat config format](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"} and [the legacy format](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated){rel="&#x22;nofollow&#x22;"}.
- `@nuxt/eslint-plugin` - The ESLint plugin for Nuxt 3 provides Nuxt-specific rules and configurations.
- Two packages for Nuxt 2 in maintenance mode.

## ESLint Flat Config

Before diving into new Nuxt integrations, let me introduce you to the concept of [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"}.

Flat config is a configuration format introduced in ESLint `v8.21.0` as experimental, and became the default format in [ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/){rel="&#x22;nofollow&#x22;"}.

A quick reference to differentiate:

- **Flat config**: `eslint.config.js` `eslint.config.mjs` etc.
- **Legacy config**: `.eslintrc` `.eslintrc.json` `.eslintrc.js` etc.

[This blog post from ESLint](https://eslint.org/blog/2022/08/new-config-system-part-1/){rel="&#x22;nofollow&#x22;"} explains the motivation behind the flat config system in detail. In short, the legacy `eslintrc` format was designed in the early time of JavaScript, when ES modules and modern JavaScript features were not yet standardized. Many implicit conventions involved, and the `extends` feature makes the final config result hard to understand and predict. Which also makes shared configs hard to maintain and debug.

The new flat config moves the plugins and configs resolution from ESLint's internal convention to the native ES module resolution. This in turn makes it more explicit and transparent, allowing you to even import it from other modules. Since the flat config is just a JavaScript module, it also opens the door for much more customization.

## Nuxt Presets for Flat Config

In the latest [`@nuxt/eslint-config` package](https://eslint.nuxt.com/packages/config#flat-config-format){rel="&#x22;nofollow&#x22;"}, we leverage the flexibility we have to provide a factory function that allows you to customize the config presets easily in a more high-level way. Here is an example of how you can use it:

`@nuxt/eslint-config` starts with an unopinionated base config, which means we only include rules for best practices of TypeScript, Vue and Nuxt, and leave the rest like code style, formatting, etc for you to decide. You can also run [Prettier](https://prettier.io/){rel="&#x22;nofollow&#x22;"} alongside for formatting with the defaults.

The config also allows you to opt-in to more opinionated features as needed. For example, if you want ESLint to take care of the formatting as well, you can turn it on by passing `features.stylistic` to the factory function (powered by [ESLint Stylistic](https://eslint.style/){rel="&#x22;nofollow&#x22;"}):

Or tweak your preferences with an options object ([learn more with the options here](https://eslint.style/guide/config-presets#configuration-factory){rel="&#x22;nofollow&#x22;"}):

And if you are [authoring a Nuxt Module](https://nuxt.com/docs/guide/going-further/modules){rel="&#x22;nofollow&#x22;"}, you can turn on `features.tooling` to enable the rules for the Nuxt module development:

...and so on. The factory function in flat config allows the presets to cover the complexity of the underlying ESLint configuration, and provide high-level and user-friendly abstractions for end users to customize. All this without requiring users to worry about the internal details.

While this approach offers you a Prettier-like experience with minimal configurations (because it's powered by ESLint), you still get the full flexibility to customize and override fine-grained rules and plugins as needed.

We also made a [`FlatConfigComposer`](https://github.com/antfu/eslint-flat-config-utils#composer){rel="&#x22;nofollow&#x22;"} utility from [`eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils){rel="&#x22;nofollow&#x22;"} to make it even easier to override and extend the flat config. The factory function in `@nuxt/eslint-config/flat` returns a `FlatConfigComposer` instance:

With this approach, we get the best of both worlds: the simplicity and high-level abstraction for easy to use, and the power for customization and fine-tuning.

## Nuxt ESLint Module

Taking this even further, we made the new, all-in-one [`@nuxt/eslint` module](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"} for Nuxt 3. It leverages Nuxt's context to generate project-aware and type-safe ESLint configurations for your project.

### Project-aware Rules

We know that Vue's Style Guide suggests the use of [multi-word names for components](https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names){rel="&#x22;nofollow&#x22;"} to avoid conflicts with existing and future HTML elements. Thus, in [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue){rel="&#x22;nofollow&#x22;"}, we have the rule [`vue/multi-word-component-names`](https://eslint.vuejs.org/rules/multi-word-component-names.html){rel="&#x22;nofollow&#x22;"} enabled by default. It's a good practice to follow, but we know that in a Nuxt project, not all `.vue` files are registered as components. Files like `app.vue`, `pages/index.vue`, `layouts/default.vue`, etc. are not available as components in other Vue files, and the rule will be irrelevant to them.

Usually, we could turn off the rule for those files like:

It should work for the majority of the cases. However, we know that in Nuxt you can [customize the path for each directory](https://nuxt.com/docs/api/nuxt-config#dir){rel="&#x22;nofollow&#x22;"}, and [layers](https://nuxt.com/docs/getting-started/layers){rel="&#x22;nofollow&#x22;"} allow you to have multiple sources for each directory. This means the linter rules will be less accurate and potentially cause users extra effort to keep them aligned **manually**.

Similarly, we want to have [`vue/no-multiple-template-root`](https://eslint.vuejs.org/rules/no-multiple-template-root.html){rel="&#x22;nofollow&#x22;"} enabled only for `pages` and `layouts`, etc. As the cases grow, it becomes unrealistic to ask users to maintain the rules manually.

That's where the magic of `@nuxt/eslint` comes in! It leverages Nuxt's context to generate the configurations and rules specific to your project structure. Very similar to the [`.nuxt/tsconfig.json`](http://nuxt.com/docs/guide/concepts/typescript#auto-generated-types){rel="&#x22;nofollow&#x22;"} Nuxt provides, you now also have the project-aware `.nuxt/eslint.config.mjs` to extend from.

To use it, you can add the module to your Nuxt project:

### Config Inspector DevTools Integrations

During the migrations and research for the new flat config, I came up with the idea to make an interactive UI inspector for the flat config and make the configurations more transparent and easier to understand. We have integrated it into [Nuxt DevTools](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"} when you have the `@nuxt/eslint` module installed so you easily access it whenever you need it.

![Screenshot of ESLint Config Inspector running as a tab in Nuxt DevTools](https://nuxt.com/assets/blog/nuxt-eslint-inspector.png)

The inspector allows you to see the final resolved configurations, rules and plugins that have been enabled, and do quick matches to see how rules and configurations have applied to specific files. It's great for debugging and learning how ESLint works in your project.

We are delighted that the ESLint team also finds it useful and is interested in having it for the broader ESLint community. We later joined the effort and made it [the official ESLint Config Inspector](https://github.com/eslint/config-inspector){rel="&#x22;nofollow&#x22;"} (it's built with Nuxt, by the way). You can read [this announcement post](https://eslint.org/blog/2024/04/eslint-config-inspector/){rel="&#x22;nofollow&#x22;"} for more details.

### Type Generation for Rules

One of the main pain points of configuring ESLint was the leak of type information for the rules and configurations. It's hard to know what options are available for a specific rule, and it would require you to jump around the documentation for every rule to figure that out.

Thanks again for the new flat config being dynamic with so many possibilities. We figured out a new tool, [`eslint-typegen`](https://github.com/antfu/eslint-typegen){rel="&#x22;nofollow&#x22;"}, that we could generate the corresponding types from rules configuration schema for each rule **based on the actual plugins you are using**. This means it's a universal solution that works for any ESLint plugins, and the types are always accurate and up-to-date.

In the `@nuxt/eslint` module, this feature is integrated out-of-box, so that you will get this awesome experience right away:

![Screenshot of VS Code that showcases the type check and autocomplete with ESLint rules config](https://nuxt.com/assets/blog/nuxt-eslint-typegen.png)

### Dev Server Checker

With the new module, we took the chance to merge the [`@nuxtjs/eslint-module`](https://github.com/nuxt-modules/eslint){rel="&#x22;nofollow&#x22;"} and the dev server checker for ESLint into the new `@nuxt/eslint` module as an opt-in feature.

::note
You might not need this feature most of the time, as your editor integration should already provide ESLint diagnostics right in your editor. However, for some teams that work with different editors and want to ensure ESLint is always running, being able to run ESLint within the dev server might be helpful in some cases.
::

To enable it, you can set the `checker` option to `true` in the module options:

Whenever you get some ESLint errors, you will see a warning in the console and the browser. To learn more about this feature, you can check the [documentation](https://eslint.nuxt.com/packages/module#dev-server-checker){rel="&#x22;nofollow&#x22;"}.

Since we are now in the Nuxt module with the codegen capabilities and the project-aware configurations, we can actually do a lot more interesting things with this. One is that we can allow modules to contribute to the ESLint configurations as well. Imagine that in the future, when you install a Nuxt module like `@nuxtjs/i18n` it can automatically enable specific ESLint rules for i18n-related files, or when you install something like `@pinia/nuxt` it can install the Pinia ESLint plugin to enforce the best practices for Pinia, etc.

As an experiment, we made a module [`nuxt-eslint-auto-explicit-import`](https://github.com/antfu/nuxt-eslint-auto-explicit-import){rel="&#x22;nofollow&#x22;"} that can do auto inserts for the auto-imports registered in your Nuxt project with a preconfigured ESLint preset. So that you can get the same nice developer experience with auto-imports on using APIs, but still have the auto-inserted explicit imports in your codebase.

This is still in the early stages, and we are still exploring the possibilities and best practices. But we are very excited about the potential and the opportunities it opens up. We will collaborate with the community to see how we can make the most out of it. If you have any ideas or feedback, please do not hesitate to share them with us!

At Nuxt, we care a lot about the ecosystem and the community as always. During our explorations to adopt the new flat config and improve the developer experience, we made quite a few tools to reach that goal. All of them are general-purposed and can be used outside of Nuxt:

- [`@eslint/config-inspector`](https://github.com/eslint/config-inspector){rel="&#x22;nofollow&#x22;"} - The official ESLint Config Inspector, provides interactive UI for your configs.
- [`eslint-typegen`](https://github.com/antfu/eslint-typegen){rel="&#x22;nofollow&#x22;"} - Generate TypeScript types for ESLint rules based on the actual plugins you are using.
- [`eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils){rel="&#x22;nofollow&#x22;"} - Utilities for managing and composing ESLint flat configs.

We are committed to supporting the broader community and collaborating with developers to improve these tools and expand their possibilities. We are excited to see how these tools can benefit the ESLint ecosystem and contribute to the overall developer experience.

::tip
The flat config format is still fairly new, and ESLint v9 was just released a couple of weeks ago. Plugins and the community are gradually catching up to the new format. It's still in the phase of exploration and experimentation.
::

Looking ahead, we are eager to see how the ESLint ecosystem will continue to evolve and how we can leverage new capabilities and possibilities to further enhance Nuxt's developer experience. We are dedicated to providing a seamless and powerful development environment for Nuxt users, and we will continue to explore new ideas and collaborate with the community to achieve this goal.

**Examples:**

Example 1 (unknown):

```unknown
Continue reading the story or learn more with [the documentation](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"}.

## Background

[ESLint](https://eslint.org/){rel="&#x22;nofollow&#x22;"} has become an essential tool for today's web development. It helps you to catch errors and enforce a consistent coding style in your project. At Nuxt, we do our best to provide an out-of-the-box experience for ESLint, making it easy to use, configure and follow the best practices we recommend.

Since, both Nuxt and ESLint have evolved a lot. Historically, we ended up with [a few different packages and integrations for ESLint in Nuxt](https://eslint.nuxt.com/guide/faq#package-disambiguation){rel="&#x22;nofollow&#x22;"}, and it wasn't always obvious which one to use for what purpose. We have received a lot of feedback from our community.

To improve the situation and also make it future-proof, we recently refreshed our ESLint integrations to support [ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/){rel="&#x22;nofollow&#x22;"} with the [flat config](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"}. It opens up many more capabilities for customizing your ESLint setup, providing a more straightforward and unified experience.

## Nuxt ESLint Monorepo

We moved ESLint-related packages scattered across different repositories into a single monorepo: [`nuxt/eslint`](https://github.com/nuxt/eslint){rel="&#x22;nofollow&#x22;"}, with a dedicated new documentation site: [eslint.nuxt.com](https://eslint.nuxt.com/){rel="&#x22;nofollow&#x22;"}.

To help understand the differences between each package and what to use, we also have a [FAQ](https://eslint.nuxt.com/guide/faq){rel="&#x22;nofollow&#x22;"} page comparing them and explaining their scopes.

This monorepo now includes:

- `@nuxt/eslint` - The new, all-in-one ESLint module for Nuxt 3, supporting project-aware ESLint flat config and more.
- `@nuxt/eslint-config` - The unopinionated but customizable shared ESLint config for Nuxt 3. Supports both [the flat config format](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"} and [the legacy format](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated){rel="&#x22;nofollow&#x22;"}.
- `@nuxt/eslint-plugin` - The ESLint plugin for Nuxt 3 provides Nuxt-specific rules and configurations.
- Two packages for Nuxt 2 in maintenance mode.

## ESLint Flat Config

Before diving into new Nuxt integrations, let me introduce you to the concept of [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files){rel="&#x22;nofollow&#x22;"}.

Flat config is a configuration format introduced in ESLint `v8.21.0` as experimental, and became the default format in [ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/){rel="&#x22;nofollow&#x22;"}.

A quick reference to differentiate:

- **Flat config**: `eslint.config.js` `eslint.config.mjs` etc.
- **Legacy config**: `.eslintrc` `.eslintrc.json` `.eslintrc.js` etc.

### Why Flat Config?

[This blog post from ESLint](https://eslint.org/blog/2022/08/new-config-system-part-1/){rel="&#x22;nofollow&#x22;"} explains the motivation behind the flat config system in detail. In short, the legacy `eslintrc` format was designed in the early time of JavaScript, when ES modules and modern JavaScript features were not yet standardized. Many implicit conventions involved, and the `extends` feature makes the final config result hard to understand and predict. Which also makes shared configs hard to maintain and debug.
```

Example 2 (unknown):

```unknown
The new flat config moves the plugins and configs resolution from ESLint's internal convention to the native ES module resolution. This in turn makes it more explicit and transparent, allowing you to even import it from other modules. Since the flat config is just a JavaScript module, it also opens the door for much more customization.

## Nuxt Presets for Flat Config

In the latest [`@nuxt/eslint-config` package](https://eslint.nuxt.com/packages/config#flat-config-format){rel="&#x22;nofollow&#x22;"}, we leverage the flexibility we have to provide a factory function that allows you to customize the config presets easily in a more high-level way. Here is an example of how you can use it:
```

Example 3 (unknown):

```unknown
`@nuxt/eslint-config` starts with an unopinionated base config, which means we only include rules for best practices of TypeScript, Vue and Nuxt, and leave the rest like code style, formatting, etc for you to decide. You can also run [Prettier](https://prettier.io/){rel="&#x22;nofollow&#x22;"} alongside for formatting with the defaults.

The config also allows you to opt-in to more opinionated features as needed. For example, if you want ESLint to take care of the formatting as well, you can turn it on by passing `features.stylistic` to the factory function (powered by [ESLint Stylistic](https://eslint.style/){rel="&#x22;nofollow&#x22;"}):
```

Example 4 (unknown):

```unknown
Or tweak your preferences with an options object ([learn more with the options here](https://eslint.style/guide/config-presets#configuration-factory){rel="&#x22;nofollow&#x22;"}):
```

---

## Nuxt 2 Static Improvements

**URL:** llms-txt#nuxt-2-static-improvements

**Contents:**

- Introduction
- Faster Static Deployments
- Generate time: cache vs full webpack build
- Using in your projects
  - Excluding Files from Cache
  - Module Authors
- How it works
  - Back to old school commands
- What to do next

With Nuxt version 2.13, the [full-static mode](https://nuxt.com/blog/going-full-static) has been introduced. In addition, a new command `nuxt export` was added to pre-render your pages without triggering a webpack build with the goal to separate the rendering and build process. The only issue was that most Nuxt users weren't able to unleash the full potential of the separation... \*\*until now.\*\*

## Faster Static Deployments

With v2.14, `nuxt generate` will **automagically skip webpack build step when no code has been changed** and use the previous build using cache. This will help to drastically improve static deployments time by avoiding unnecessary builds which is usually the most time-consuming part of generation process. Cache support is **platform-agnostic** and works on Netlify, Vercel, or any other CI/CD setup that is caching `node_modules`.

:video{autoplay controls autoPlay="true" controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.jpg"}

## Generate time: cache vs full webpack build

See the comparison in seconds between two `nuxt generate`:

- `Build` is when a webpack build is required
- `Cache` is only when the content has changed (webpack build skipped)

![Comparison between build VS cache time](https://nuxt.com/assets/blog/bar-chart-cache-build.png)

::tip
The static site generation of our projects on content changes are now **\~3.6x times** faster 🚀
::

Project links: [Basic](https://github.com/pi0/nuxt-static-demo){rel="&#x22;nofollow&#x22;"}, [Strapi Module Docs](https://github.com/nuxt-community/strapi-module/tree/master/docs){rel="&#x22;nofollow&#x22;"}, [Content Module Docs](https://github.com/nuxt/content/tree/master/docs){rel="&#x22;nofollow&#x22;"} and [Nuxt 2 Docs](https://github.com/nuxt/website-v2){rel="&#x22;nofollow&#x22;"}.

## Using in your projects

1. Update `nuxt` to the latest minor version, which is v2.14.

2. Ensure `target` is `static` inside your `nuxt.config.js`

`nuxt generate` will behave as before to avoid breaking changes and provide legacy compatibility if you keep `target: ‘server’` or don't specify target.

Now, the `nuxt generate` command will build the project only if necessary, which is the case when files inside the project have been changed. It will always re-render your routes to static HTML files, like `nuxt export` is doing already.

Now you only have to change your build command back from `nuxt build && nuxt export` to `nuxt generate` on the platform you are using. If you are using a CI, ensure that you are properly caching `node_modules`.

### Excluding Files from Cache

By default, nuxt ignores these directories so if any change happens inside them, build will not be triggered:

- Build directory (`.nuxt/`)
- Static directory (`static/`)
- Generate dist (`dist/`)
- `node_modules`
- `README.md`
- Hidden dotfiles (like `.npmrc`)

You can add more patterns using [generate.cache.ignore](https://v2.nuxt.com/docs/configuration-glossary/configuration-generate/#cache){rel="&#x22;nofollow&#x22;"} option in `nuxt.config`:

It is also possible to use a function for `ignore` option to override default ignore entries.

What if you are developing a nuxt module that is working with files that should not trigger a rebuild? The best example is for [@nuxt/content](https://content.nuxt.com){rel="&#x22;nofollow&#x22;"} module that reads markdown files from the repository. In this case, these files are used within a runtime module, which is the case when using `@nuxt/content`, the module itself can tell nuxt to ignore these files for you already so you don't have to do anything! Module authors can use the new `generate:cache:ignore` hook to do so:

When using the new `nuxt generate` with `static` target, a snapshot including checksum of non-ignored project files as well as nuxt version and some other configuration will be written `.nuxt/build.json`. In addition, we also move the build directory to `node_modules/.cache/nuxt`. Because `node_modules` is cached by all major platforms (Netlify, Vercel, ...) and common CI/CD scripts, this solution works out of the box without additional configuration.

When `nuxt generate` is called subsequently, it will again create a checksum based on your project files and then compare it to the existing one inside `node_modules/.cache/nuxt/build.json`.

If they match, it means that nothing is changed that needs rebuild so we can directly start rendering pages.

If a mismatch is detected, it means that a full rebuild would be necessary. You can also see what file caused rebuild by checking console logs. After the build, nuxt generate will save the new checksum inside `.nuxt/build.json`. You can check full implementation [here](https://github.com/nuxt/nuxt.js/pull/7712){rel="&#x22;nofollow&#x22;"}.

### Back to old school commands

With Nuxt v2.13, we introduced `nuxt export` and `nuxt serve` specially designed for the static target. With Nuxt v2.14, they are deprecated as `nuxt generate` and `nuxt start` is smart to detect the target and build when necessary.

- `nuxt dev` = development server
- `nuxt build` = build your application for production
- `nuxt start` = start the production server (use it for Node.js hosting like Heroku, DigitalOcean, etc)

- `nuxt dev` = development server
- `nuxt generate` = build if needed and statically export to `dist/`
- `nuxt start` = serve the `dist/` directory like your static hosting would do (Netlify, Vercel, Surge, etc), great for testing before deploying

- Upgrade your project to [nuxt@2.14.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0){rel="&#x22;nofollow&#x22;"}
- Use `nuxt generate` instead of `nuxt export`
- Use `nuxt start` instead of `nuxt serve`
- Enjoy fast deployments 🤙

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

2. Ensure `target` is `static` inside your `nuxt.config.js`
```

Example 3 (unknown):

```unknown
`nuxt generate` will behave as before to avoid breaking changes and provide legacy compatibility if you keep `target: ‘server’` or don't specify target.

3. That’s it 🙌

Now, the `nuxt generate` command will build the project only if necessary, which is the case when files inside the project have been changed. It will always re-render your routes to static HTML files, like `nuxt export` is doing already.

Now you only have to change your build command back from `nuxt build && nuxt export` to `nuxt generate` on the platform you are using. If you are using a CI, ensure that you are properly caching `node_modules`.

### Excluding Files from Cache

By default, nuxt ignores these directories so if any change happens inside them, build will not be triggered:

- Build directory (`.nuxt/`)
- Static directory (`static/`)
- Generate dist (`dist/`)
- `node_modules`
- `README.md`
- Hidden dotfiles (like `.npmrc`)

You can add more patterns using [generate.cache.ignore](https://v2.nuxt.com/docs/configuration-glossary/configuration-generate/#cache){rel="&#x22;nofollow&#x22;"} option in `nuxt.config`:
```

Example 4 (unknown):

```unknown
It is also possible to use a function for `ignore` option to override default ignore entries.

### Module Authors

What if you are developing a nuxt module that is working with files that should not trigger a rebuild? The best example is for [@nuxt/content](https://content.nuxt.com){rel="&#x22;nofollow&#x22;"} module that reads markdown files from the repository. In this case, these files are used within a runtime module, which is the case when using `@nuxt/content`, the module itself can tell nuxt to ignore these files for you already so you don't have to do anything! Module authors can use the new `generate:cache:ignore` hook to do so:
```

---

## Roadmap

**URL:** llms-txt#roadmap

**Contents:**

- Status Reports
- Roadmap
- Core Modules Roadmap
- Release Cycle
  - Ongoing Support for Nuxt
  - Current Packages
  - Support Status

::read-more{to="https://nuxt.com/blog"}
See our blog for the latest framework and ecosystem announcements.
::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/issues/13653

---

Documentation Progress
::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/discussions/16119

---

Rendering Optimizations: Today and Tomorrow
::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/image/discussions/563

---

Nuxt Image: Performance and Status
::

In roadmap below are some features we are planning or working on at the moment.

::tip
Check [Discussions](https://github.com/nuxt/nuxt/discussions){rel=""nofollow""} and [RFCs](https://github.com/nuxt/nuxt/discussions/categories/rfcs){rel=""nofollow""} for more upcoming features and ideas.
::

| Milestone    | Expected date | Notes                                                                                                                                                                                                | Description                                                                                                                                                             |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEO & PWA    | 2025          | [nuxt/nuxt#18395](https://github.com/nuxt/nuxt/discussions/18395){rel="&#x22;nofollow&#x22;"}                                                                                                        | Migrating from [nuxt-community/pwa-module](https://github.com/nuxt-community/pwa-module){rel="&#x22;nofollow&#x22;"} for built-in SEO utils and service worker support  |
| Assets       | 2025          | [nuxt/nuxt#22012](https://github.com/nuxt/nuxt/discussions/22012){rel="&#x22;nofollow&#x22;"}                                                                                                        | Allow developers and modules to handle loading third-party assets.                                                                                                      |
| Translations | -             | [nuxt/translations#4](https://github.com/nuxt/translations/discussions/4){rel="&#x22;nofollow&#x22;"} ([request access](https://github.com/nuxt/nuxt/discussions/16054){rel="&#x22;nofollow&#x22;"}) | A collaborative project for a stable translation process for Nuxt docs. Currently pending for ideas and documentation tooling support (content v2 with remote sources). |

## Core Modules Roadmap

In addition to the Nuxt framework, there are modules that are vital for the ecosystem. Their status will be updated below.

| Module                                                          | Status      | Nuxt Support | Repository                                                                  | Description                                                                                                                                                                                      |
| --------------------------------------------------------------- | ----------- | ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Scripts](https://scripts.nuxt.com){rel="&#x22;nofollow&#x22;"} | Public Beta | 3.x, 4.x     | [nuxt/scripts](https://github.com/nuxt/scripts){rel="&#x22;nofollow&#x22;"} | Easy 3rd party script management.                                                                                                                                                                |
| Auth Utils                                                      | Planned     | 4.x, 5.x     | `nuxt/auth-utils` to be announced                                           | The temporary repository [atinux/nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils){rel="&#x22;nofollow&#x22;"} is available while awaiting its official integration into Nuxt via RFC. |
| A11y                                                            | Planned     | 4.x, 5.x     | `nuxt/a11y` to be announced                                                 | Accessibility hinting and utilities [nuxt/nuxt#23255](https://github.com/nuxt/nuxt/issues/23255){rel="&#x22;nofollow&#x22;"}                                                                     |
| Hints                                                           | Planned     | 4.x, 5.x     | `nuxt/hints` to be announced                                                | Guidance and suggestions for enhancing development practices.                                                                                                                                    |

Since January 2023, we've adopted a consistent release cycle for Nuxt, following [semver](https://semver.org){rel="&#x22;nofollow&#x22;"}. We aim for major framework releases every year, with an expectation of patch releases every week or so and minor releases every month or so. They should never contain breaking changes except within options clearly marked as `experimental`.

We are planning a slight variation from this plan for Nuxt 4 and Nuxt 5. Nuxt 4 will be a stability-focused release containing all `compatibilityVersion: 4` features, and will be followed shortly by Nuxt 5 which will include an upgrade to Nitro v3 and additional changes.

This approach separates breaking changes into manageable phases, allowing for better ecosystem testing and smoother migrations.

### Ongoing Support for Nuxt

We commit to support each major version of Nuxt for a minimum of six months after the release of the next major version, and to providing an upgrade path for current users at that point.

The current active version of [Nuxt](https://nuxt.com){rel="&#x22;nofollow&#x22;"} is **v4** which is available as `nuxt` on npm with the `latest` tag.

Nuxt 3 will continue to receive maintenance updates (both bug fixes and backports of features from Nuxt 4) until the end of January 2026.

Each active version has its own nightly releases which are generated automatically. For more about enabling the Nuxt nightly release channel, see [the nightly release channel docs](https://nuxt.com/docs/3.x/guide/going-further/nightly-release-channel).

| Release               |                                                                                                                                        | Initial release     | End Of Life                | Docs                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------- | ------------------------------------------------------------------- |
| **5.x** (scheduled)   |                                                                                                                                        | Q4 2025 (estimated) | TBA                        |                                                                     |
| **4.x** (stable)      | [![Nuxt latest version](https://flat.badgen.net/npm/v/nuxt?label=){.not-prose}](https://www.npmjs.com/package/nuxt?activeTab=versions) | 2025-07-16          | 6 months after 5.x release | [nuxt.com](https://nuxt.com/docs/4.x)                               |
| **3.x** (maintenance) | [![Nuxt 3.x version](https://flat.badgen.net/npm/v/nuxt/3x?label=){.not-prose}](https://www.npmjs.com/package/nuxt?activeTab=versions) | 2022-11-16          | 2026-01-31                 | [nuxt.com](https://nuxt.com/docs/3.x)                               |
| **2.x** (unsupported) | [![Nuxt 2.x version](https://flat.badgen.net/npm/v/nuxt/2x?label=){.not-prose}](https://www.npmjs.com/package/nuxt?activeTab=versions) | 2018-09-21          | 2024-06-30                 | [v2.nuxt.com](https://v2.nuxt.com/docs){rel="&#x22;nofollow&#x22;"} |
| **1.x** (unsupported) | [![Nuxt 1.x version](https://flat.badgen.net/npm/v/nuxt/1x?label=){.not-prose}](https://www.npmjs.com/package/nuxt?activeTab=versions) | 2018-01-08          | 2019-09-21                 |                                                                     |

| Status      | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| Unsupported | This version is not maintained any more and will not receive security patches |
| Maintenance | This version will only receive security patches                               |
| Stable      | This version is being developed for and will receive security patches         |
| Development | This version could be unstable                                                |
| Scheduled   | This version does not exist yet but is planned                                |

---

## Geist

**URL:** llms-txt#geist

We are a specialized agency focused on building complex, high-performance e-commerce websites using Nuxt 3 and Shopify.

Our approach prioritizes long-term success for our clients by delivering a clean, maintainable codebase that ensures full control over their project post-delivery.

This allows our clients to easily manage and scale their e-commerce platforms without reliance on external developers, empowering them to make updates and adjustments seamlessly.

---

## Component Options

**URL:** llms-txt#component-options

**Contents:**

- `asyncData` and `fetch`
  - Isomorphic Fetch
  - Composables
  - Migration
- `head`
- `key`
- `layout`
- `loading`
- `middleware`
- `scrollToTop`

## `asyncData` and `fetch`

Nuxt 3 provides new options for [fetching data from an API](https://nuxt.com/docs/3.x/getting-started/data-fetching).

In Nuxt 2 you might use `@nuxtjs/axios` or `@nuxt/http` to fetch your data - or just the polyfilled global `fetch`.

In Nuxt 3 you can use a globally available `fetch` method that has the same API as [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch){rel="&#x22;nofollow&#x22;"} or [`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch) method which is using [unjs/ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"}. It has a number of benefits, including:

1. It will handle 'smartly' making [direct API calls](https://nuxt.com/docs/3.x/guide/concepts/server-engine#direct-api-calls) if it's running on the server, or making a client-side call to your API if it's running on the client. (It can also handle calling third-party APIs.)
2. Plus, it comes with convenience features including automatically parsing responses and stringifying data.

You can read more [about direct API calls](https://nuxt.com/docs/3.x/guide/concepts/server-engine#direct-api-calls) or [fetching data](https://nuxt.com/docs/3.x/getting-started/data-fetching).

Nuxt 3 provides new composables for fetching data: [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) and `useFetch`. They each have 'lazy' variants (`useLazyAsyncData` and `useLazyFetch`), which do not block client-side navigation.

In Nuxt 2, you'd fetch your data in your component using a syntax similar to:

Within your methods and templates, you could use the `post` variable similar how you'd use any other piece of data provided by your component.

With Nuxt 3, you can perform this data fetching using composables in your `setup()` method or `<script setup>` tag:

You can now use `post` inside of your Nuxt 3 template, or call `refresh` to update the data.

::note
Despite the names, [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) is not a direct replacement of the `fetch()` hook. Rather, [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) replaces both hooks and is more customizable; it can do more than simply fetching data from an endpoint. [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) is a convenience wrapper around [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) for simply fetching data from an endpoint.
::

1. Replace the `asyncData` hook with [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) or [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) in your page/component.
2. Replace the `fetch` hook with [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) or [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) in your component.

::read-more{to="https://nuxt.com/docs/migration/meta"}
::

You can now define a key within the [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) compiler macro.

::read-more{to="https://nuxt.com/docs/migration/pages-and-layouts"}
::

This feature is not yet supported in Nuxt 3.

::read-more{to="https://nuxt.com/docs/migration/plugins-and-middleware"}
::

This feature is not yet supported in Nuxt 3. If you want to overwrite the default scroll behavior of `vue-router`, you can do so in `~/app/router.options.ts` (see [docs](https://nuxt.com/docs/3.x/guide/recipes/custom-routing#router-options)) for more info.
Similar to `key`, specify it within the [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) compiler macro.

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

The validate hook in Nuxt 3 only accepts a single argument, the `route`. Just as in Nuxt 2, you can return a boolean value. If you return false and another match can't be found, this will mean a 404. You can also directly return an object with `statusCode`/`statusMessage` to respond immediately with an error (other matches will not be checked).

This is not supported in Nuxt 3. Instead, you can directly use a watcher to trigger refetching data.

**Examples:**

Example 1 (ts):

```ts
export default {
  async asyncData({ params, $http }) {
    const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`);
    return { post };
  },
  // or alternatively
  fetch() {
    this.post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`);
  },
};
```

Example 2 (vue):

```vue
<script setup lang="ts">
  // Define params wherever, through `defineProps()`, `useRoute()`, etc.
  const { data: post, refresh } = await useAsyncData('post', () => $fetch(`https://api.nuxtjs.dev/posts/${params.id}`));
  // Or instead - useFetch is a convenience wrapper around useAsyncData when you're just performing a simple fetch
  const { data: post, refresh } = await useFetch(`https://api.nuxtjs.dev/posts/${params.id}`);
</script>
```

Example 3 (unknown):

```unknown
## `layout`

::read-more{to="https://nuxt.com/docs/migration/pages-and-layouts"}
::

## `loading`

This feature is not yet supported in Nuxt 3.

## `middleware`

::read-more{to="https://nuxt.com/docs/migration/plugins-and-middleware"}
::

## `scrollToTop`

This feature is not yet supported in Nuxt 3. If you want to overwrite the default scroll behavior of `vue-router`, you can do so in `~/app/router.options.ts` (see [docs](https://nuxt.com/docs/3.x/guide/recipes/custom-routing#router-options)) for more info.
Similar to `key`, specify it within the [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) compiler macro.
```

Example 4 (unknown):

```unknown
## `transition`

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

## `validate`

The validate hook in Nuxt 3 only accepts a single argument, the `route`. Just as in Nuxt 2, you can return a boolean value. If you return false and another match can't be found, this will mean a 404. You can also directly return an object with `statusCode`/`statusMessage` to respond immediately with an error (other matches will not be checked).
```

---

## Contribution

**URL:** llms-txt#contribution

**Contents:**

- Ecosystem
- How To Contribute
  - Triage Issues and Help Out in Discussions
  - Creating an Issue
  - Send a Pull Request
  - AI-Assisted Contributions
  - Create a Module
  - Make an RFC
  - Conventions Across Ecosystem
- Documentation Style Guide

There is a range of different ways you might be able to contribute to the Nuxt ecosystem.

The Nuxt ecosystem includes many different projects and organizations:

- [nuxt/](https://github.com/nuxt){rel="&#x22;nofollow&#x22;"} - core repositories for the Nuxt framework itself. [**nuxt/nuxt**](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} contains the Nuxt framework (both versions 2 and 3).
- [nuxt-modules/](https://github.com/nuxt-modules){rel="&#x22;nofollow&#x22;"} - community-contributed and maintained modules and libraries. There is a [process to migrate a module](https://nuxt.com/docs/3.x/guide/going-further/modules/#joining-nuxt-modules-and-nuxtjs) to `nuxt-modules`. While these modules have individual maintainers, they are not dependent on a single person.
- [unjs/](https://github.com/unjs){rel="&#x22;nofollow&#x22;"} - many of these libraries are used throughout the Nuxt ecosystem. They are designed to be universal libraries that are framework- and environment-agnostic. We welcome contributions and usage by other frameworks and projects.

### Triage Issues and Help Out in Discussions

Check out the issues and discussions for the project you want to help. For example, here are [the issues board](https://github.com/nuxt/nuxt/issues){rel="&#x22;nofollow&#x22;"} and [discussions](https://github.com/nuxt/nuxt/discussions){rel="&#x22;nofollow&#x22;"} for Nuxt. Helping other users, sharing workarounds, creating reproductions, or even poking into a bug a little bit and sharing your findings makes a huge difference.

### Creating an Issue

Thank you for taking the time to create an issue! ❤️

- **Reporting bugs**: Check out [our guide](https://nuxt.com/docs/3.x/community/reporting-bugs) for some things to do before opening an issue.
- **Feature requests**: Check that there is not an existing issue or discussion covering the scope of the feature you have in mind. If the feature is to another part of the Nuxt ecosystem (such as a module), please consider raising a feature request there first. If the feature you have in mind is general or the API is not entirely clear, consider opening a discussion in the **Ideas** section to discuss with the community first.

We'll do our best to follow our [internal issue decision making flowchart](https://mermaid.live/view#pako:eNqFlE1v2zAMhv8K4UuToslhx2Bo0TZt12Edhm7YMCAXWqJtorLk6qOpkfS_j7KdfpyWQ-BQr8mHL6nsCuU0FauiMm6rGvQRfq03FuRzvvvTYIQHthpcBT_ugQNwPHuZjheLxf4i1VDx8x4udrf5EBCOQvSsYg4ffS79KS9pmX9QALTgyid2KYB7Ih-4bmKWbDk2YB0E1gRUVaRi-FDmmjAmT3u4nB3DmoNKIUA1BsGSohA49jnVMQhHbDh_EZQUImyxh-gAtfaiG-KWSJ-N8nt6YtpCdgEeE5rXPOdav5YwWJIJU7zrvNADV9C7JBIyIC07Wxupkx3LFQ5vCkguRno5f9fP2qnUko0Y2dk9rGdvHAa9IIhVGlCp5FFNPN-ce4DKeXBd53xMliOLp9IZtyORQVsnrGm-WJzejtUu5fFqdr5FGQ3bLslYvGthjZbJTLpReZG5_lLYw7XQ_CbPVT92ws9gnEJj-v84dk-PiaXnmF1XGAaPsOsMKywNvYmG80ZohV8k4wDR9_N3KN_dHm5mh1lnkM5FsYzRfNiTvJoT5gnQsl6uxjqXLhkNQ9syHJ0UZZ8ERUIlNShr6N8gZDEliR-ow7QZa0fhY4LoHLRo-8N7ZxPwjRj5ZZYXpvOSNs9v3Jjs8NXB4ets92xan3zydXZHvj64lKMayh4-gZC1bjASW2ipLeWuzIuToiXfImu5rbucclMIc0ubYiWPGv3DptjYF9Fhiu5nb1Wxij7RSZE6jZHWjLXHtlhVaIJESXN0_m68_sO_wMs_oO9gyg){rel="&#x22;nofollow&#x22;"} when responding to issues.

### Send a Pull Request

We always welcome pull requests! ❤️

#### Before You Start

Before you fix a bug, we recommend that you check whether **there's an issue that describes it**, as it's possible it's a documentation issue or that there is some context that would be helpful to know.

If you're working on a feature, then we ask that you **open a feature request issue first** to discuss with the maintainers whether the feature is desired - and the design of those features. This helps save time for both the maintainers and the contributors and means that features can be shipped faster. The issue **should be confirmed** by a framework team member before building out a feature in a pull request.

For typo fixes, it's recommended to batch multiple typo fixes into one pull request to maintain a cleaner commit history.

For bigger changes to Nuxt itself, we recommend that you first [create a Nuxt module](https://nuxt.com/#create-a-module) and implement the feature there. This allows for quick proof-of-concept. You can then [create an RFC](https://nuxt.com/#make-an-rfc) in the form of a discussion. As users adopt it and you gather feedback, it can then be refined and either added to Nuxt core or continue as a standalone module.

#### Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org){rel="&#x22;nofollow&#x22;"} for commit messages, which [allows a changelog to be auto-generated](https://github.com/unjs/changelogen){rel="&#x22;nofollow&#x22;"} based on the commits. Please read the guide through if you aren't familiar with it already.

Note that `fix:` and `feat:` are for **actual code changes** (that might affect logic). For typo or document changes, use `docs:` or `chore:` instead:

- ~~`fix: typo`~~ -> `docs: fix typo`

If you are working in a project with a monorepo, like `nuxt/nuxt`, ensure that you specify the main scope of your commit in brackets. For example: `feat(kit): add 'addMagicStuff' utility`.

#### Making the Pull Request

If you don't know how to send a pull request, we recommend reading [the guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request){rel="&#x22;nofollow&#x22;"}.

When sending a pull request, make sure your PR's title also follows the [Commit Convention](https://nuxt.com/#commit-conventions).

If your PR fixes or resolves existing issues, please make sure you mention them in the PR description.

It's ok to have multiple commits in a single PR; you don't need to rebase or force push for your changes as we will use `Squash and Merge` to squash the commits into one commit when merging.

We do not add any commit hooks to allow for quick commits. But before you make a pull request, you should ensure that any lint/test scripts are passing.

In general, please also make sure that there are no _unrelated_ changes in a PR. For example, if your editor has made any changes to whitespace or formatting elsewhere in a file that you edited, please revert these so it is more obvious what your PR changes. And please avoid including multiple unrelated features or fixes in a single PR. If it is possible to separate them, it is better to have multiple PRs to review and merge separately. In general, a PR should do _one thing only_.

#### Once You've Made a Pull Request

Once you've made a pull request, we'll do our best to review it promptly.

If we assign it to a maintainer, then that means that person will take special care to review it and implement any changes that may be required.

If we request changes on a PR, please ignore the red text! It doesn't mean we think it's a bad PR - it's just a way of easily telling the status of a list of pull requests at a glance.

If we mark a PR as 'pending', that means we likely have another task to do in reviewing the PR - it's an internal note-to-self, and not necessarily a reflection on whether the PR is a good idea or not. We will do our best to explain via a comment the reason for the pending status.

We'll do our best to follow [our PR decision making flowchart](https://mermaid.live/view#pako:eNp9VE1v2kAQ_SsjXzBSEqlALlaUisSh0ACK2l4qcVm8Y9hi7672Iwly-O-ZtYPt5FAOCHbee_PmzdpVlCmOURLlhXrJ9sw4-JNuJNBnWs1UQafIQVjrERyWumAOv58-AJeXt29_0b7BXbWwwL0uRPa1vlZvcB_fF8oiMMmB2QM4BXkt3UoON7Lh3LWaDz2SVkK6QGt7DHvw0CKt5sxCKaQoWQEGtVHcZ04oGdw04LTVngW_LHOeFcURGGz97mw6PSv-iJdsi0UCA4nI7SfNwc3W3JZit3eQ1SZFDlKB15yswQ2MgbOjbYeatY3n8bcr-IWlekYYaJRcyB04I9gOB1CEfkF5dAVTzmFAtnqn4-bUYAiMMmHZgWhNPRhgus5mW2BATxq0NkIZ4Y4NbNjzE2ZchBzcHmGLe_ZMSKCcyRXyLrVFa_5n_PBK2xKy3kk9eOjULUdltk6C8kI-7NFDr8f4EVGDoqlp-wa4sJm3ltIMIuZ_mTQXJyTSkQZtunPqsKxShV9GKdkBYe1fHXjpbcjlvONlO9Kqx_M7YHmOmav_luxfE5zKwVs09hM5DLSupgYDlr5flDkwo7ykixKG-xDsUly1LZ-uY32dgDc7lG7YqwbNp0msJwmIUivjWFtfd-xRrEcJ7Omydz37qFplHOtxEp4GskI2qB5dRCWakglOz3oV8JuITJa4iRL6yZk5bKKNPBGOead-H2UWJc54vIiaW53SPgwrz4fIhVNm1bw76lfI6R2_MW21){rel="&#x22;nofollow&#x22;"} when responding and reviewing to pull requests.

### AI-Assisted Contributions

We welcome the thoughtful use of AI tools when contributing to Nuxt, yet ask all contributors to follow [two core principles](https://roe.dev/blog/using-ai-in-open-source){rel="&#x22;nofollow&#x22;"}.

#### Never let an LLM speak for you

- All comments, issues, and pull request descriptions should be written in your own voice
- We value clear, human communication over perfect grammar or spelling
- Avoid copy-pasting AI-generated summaries that don't reflect your own understanding

#### Never let an LLM think for you

- Feel free to use AI tools to generate code or explore ideas
- Only submit contributions you fully understand and can explain
- Contributions should reflect your own reasoning and problem-solving

Our aim is ensuring quality and maintaining the joy of collaborating and communicating with real people. If you have ideas for improving our policy on AI in the Nuxt community, we'd love to hear them! ❤️

If you've built something with Nuxt that's cool, why not [extract it into a module](https://nuxt.com/docs/3.x/guide/going-further/modules), so it can be shared with others? We have [many excellent modules already](https://nuxt.com/modules), but there's always room for more.

If you need help while building it, feel free to [check in with us](https://nuxt.com/docs/3.x/community/getting-help).

We highly recommend [creating a module](https://nuxt.com/#create-a-module) first to test out big new features and gain community adoption.

If you have done this already, or it's not appropriate to create a new module, then please start by creating a new discussion. Make sure it explains your thinking as clearly as possible. Include code examples or function signatures for new APIs. Reference existing issues or pain points with examples.

If we think this should be an RFC, we'll change the category to RFC and broadcast it more widely for feedback.

An RFC will then move through the following stages:

- `rfc: active` - currently open for comment
- `rfc: approved` - approved by the Nuxt team
- `rfc: ready to implement` - an issue has been created and assigned to implement
- `rfc: shipped` - implemented
- `rfc: archived` - not approved, but archived for future reference

### Conventions Across Ecosystem

The following conventions are _required_ within the `nuxt/` organization and recommended for other maintainers in the ecosystem.

#### Module Conventions

Modules should follow the [Nuxt module template](https://github.com/nuxt/starter/tree/module){rel="&#x22;nofollow&#x22;"}. See [module guide](https://nuxt.com/docs/3.x/guide/going-further/modules) for more information.

#### Use Core `unjs/` Libraries

We recommend the following libraries which are used throughout the ecosystem:

- [pathe](https://github.com/unjs/pathe){rel="&#x22;nofollow&#x22;"} - universal path utilities (replacement for node `path`)
- [ufo](https://github.com/unjs/ufo){rel="&#x22;nofollow&#x22;"} - URL parsing and joining utilities
- [unbuild](https://github.com/unjs/unbuild){rel="&#x22;nofollow&#x22;"} - rollup-powered build system
- ... check out the rest of the [unjs/](https://github.com/unjs){rel="&#x22;nofollow&#x22;"} organization for many more!

#### Use ESM Syntax and Default to `type: module`

Most of the Nuxt ecosystem can consume ESM directly. In general we advocate that you avoid using CJS-specific code, such as `__dirname` and `require` statements. You can [read more about ESM](https://nuxt.com/docs/3.x/guide/concepts/esm).

[Corepack](https://nodejs.org/api/corepack.html){rel="&#x22;nofollow&#x22;"} makes sure you are using the correct version for package manager when you run corresponding commands. Projects might have `packageManager` field in their `package.json`.

Under projects with configuration as shown below, Corepack will install `v7.5.0` of `pnpm` (if you don't have it already) and use it to run your commands.

We use [ESLint](https://eslint.org){rel="&#x22;nofollow&#x22;"} for both linting and formatting with [`@nuxt/eslint`](https://github.com/nuxt/eslint){rel="&#x22;nofollow&#x22;"}.

We recommend using [VS Code](https://code.visualstudio.com){rel="&#x22;nofollow&#x22;"} along with the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint){rel="&#x22;nofollow&#x22;"}. If you would like, you can enable auto-fix and formatting when you save the code you are editing:

Since ESLint is already configured to format the code, there is no need to duplicate the functionality with Prettier. To format the code, you can run `yarn lint --fix`, `pnpm lint --fix`, or `bun run lint --fix` or referring the [ESLint section](https://nuxt.com/#use-eslint) for IDE Setup.

If you have Prettier installed in your editor, we recommend you disable it when working on the project to avoid conflict.

We recommend `pnpm` as a package manager for modules, libraries and apps.

It is important to enable Corepack to ensure you are on the same version of the package manager as the project. Corepack is built-in to new node versions for seamless package manager integration.

You only need to do this one time, after Node.js is installed on your computer.

## Documentation Style Guide

Documentation is an essential part of Nuxt. We aim to be an intuitive framework - and a big part of that is making sure that both the developer experience and the docs are perfect across the ecosystem. 👌

Here are some tips that may help improve your documentation:

- Avoid subjective words like _simply_, _just_, \*obviously...\* when possible.

Keep in mind your readers can have different backgrounds and experiences. Therefore, these words don't convey meaning and can be harmful.

::caution{icon="i-lucide-circle-x"}
Simply make sure the function returns a promise.
::

::tip{icon="i-lucide-circle-check"}
Make sure the function returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise){rel=""nofollow""}.
::

- Prefer [active voice](https://developers.google.com/tech-writing/one/active-voice){rel="&#x22;nofollow&#x22;"}.

::caution{icon="i-lucide-circle-x"}
An error will be thrown by Nuxt.
::

::tip{icon="i-lucide-circle-check"}
Nuxt will throw an error.
::

## ::read-more

## to: https://nuxt.com/docs/community/framework-contribution#documentation-guide

Learn how to contribute to the documentation.
::

**Examples:**

Example 1 (unknown):

```unknown
#### Use ESLint

We use [ESLint](https://eslint.org){rel="&#x22;nofollow&#x22;"} for both linting and formatting with [`@nuxt/eslint`](https://github.com/nuxt/eslint){rel="&#x22;nofollow&#x22;"}.

##### IDE Setup

We recommend using [VS Code](https://code.visualstudio.com){rel="&#x22;nofollow&#x22;"} along with the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint){rel="&#x22;nofollow&#x22;"}. If you would like, you can enable auto-fix and formatting when you save the code you are editing:
```

Example 2 (unknown):

```unknown
#### No Prettier

Since ESLint is already configured to format the code, there is no need to duplicate the functionality with Prettier. To format the code, you can run `yarn lint --fix`, `pnpm lint --fix`, or `bun run lint --fix` or referring the [ESLint section](https://nuxt.com/#use-eslint) for IDE Setup.

If you have Prettier installed in your editor, we recommend you disable it when working on the project to avoid conflict.

#### Package Manager

We recommend `pnpm` as a package manager for modules, libraries and apps.

It is important to enable Corepack to ensure you are on the same version of the package manager as the project. Corepack is built-in to new node versions for seamless package manager integration.

To enable it, run
```

---

## defineNuxtPlugin

**URL:** llms-txt#definenuxtplugin

**Contents:**

- Type
- Parameters
- Examples
  - Basic Usage
  - Object Syntax Plugin

`defineNuxtPlugin` is a helper function for creating Nuxt plugins with enhanced functionality and type safety. This utility normalizes different plugin formats into a consistent structure that works seamlessly within Nuxt's plugin system.

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins

::

**plugin**: A plugin can be defined in two ways:

1. **Function Plugin**: A function that receives the [`NuxtApp`](https://nuxt.com/docs/3.x/guide/going-further/internals#the-nuxtapp-interface) instance and can return a promise with an potential object with a [`provide`](https://nuxt.com/docs/3.x/directory-structure/plugins#providing-helpers) property if you want to provide a helper on [`NuxtApp`](https://nuxt.com/docs/3.x/guide/going-further/internals#the-nuxtapp-interface) instance.
2. **Object Plugin**: An object that can include various properties to configure the plugin's behavior, such as `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, and `env`.

| Property    | Type                                                                                                                                          | Required | Description                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | `string`                                                                                                                                      | `false`  | Optional name for the plugin, useful for debugging and dependency management.                                                                                           |
| `enforce`   | `'pre'` \| `'default'` \| `'post'`                                                                                                            | `false`  | Controls when the plugin runs relative to other plugins.                                                                                                                |
| `dependsOn` | `string[]`                                                                                                                                    | `false`  | Array of plugin names this plugin depends on. Ensures proper execution order.                                                                                           |
| `order`     | `number`                                                                                                                                      | `false`  | This allows more granular control over plugin order and should only be used by advanced users. \*\*It overrides the value of `enforce` and is used to sort plugins.\*\* |
| `parallel`  | `boolean`                                                                                                                                     | `false`  | Whether to execute the plugin in parallel with other parallel plugins.                                                                                                  |
| `setup`     | `Plugin<T>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                 | `false`  | The main plugin function, equivalent to a function plugin.                                                                                                              |
| `hooks`     | `Partial<RuntimeNuxtHooks>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | Nuxt app runtime hooks to register directly.                                                                                                                            |
| `env`       | `{ islands?: boolean }`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}     | `false`  | Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.                                                          |

## ::video-accordion

title: Watch a video from Alexander Lichter about the Object Syntax for Nuxt plugins
video-id: 2aXZyXB1QGQ

---

::

The example below demonstrates a simple plugin that adds global functionality:

### Object Syntax Plugin

The example below shows the object syntax with advanced configuration:

**Examples:**

Example 1 (unknown):

```unknown
::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
---
::

## Type
```

Example 2 (unknown):

```unknown
## Parameters

**plugin**: A plugin can be defined in two ways:

1. **Function Plugin**: A function that receives the [`NuxtApp`](https://nuxt.com/docs/3.x/guide/going-further/internals#the-nuxtapp-interface) instance and can return a promise with an potential object with a [`provide`](https://nuxt.com/docs/3.x/directory-structure/plugins#providing-helpers) property if you want to provide a helper on [`NuxtApp`](https://nuxt.com/docs/3.x/guide/going-further/internals#the-nuxtapp-interface) instance.
2. **Object Plugin**: An object that can include various properties to configure the plugin's behavior, such as `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, and `env`.

| Property    | Type                                                                                                                                          | Required | Description                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`      | `string`                                                                                                                                      | `false`  | Optional name for the plugin, useful for debugging and dependency management.                                                                                            |
| `enforce`   | `'pre'` \| `'default'` \| `'post'`                                                                                                            | `false`  | Controls when the plugin runs relative to other plugins.                                                                                                                 |
| `dependsOn` | `string[]`                                                                                                                                    | `false`  | Array of plugin names this plugin depends on. Ensures proper execution order.                                                                                            |
| `order`     | `number`                                                                                                                                      | `false`  | This allows more granular control over plugin order and should only be used by advanced users. &#x2A;*It overrides the value of `enforce` and is used to sort plugins.** |
| `parallel`  | `boolean`                                                                                                                                     | `false`  | Whether to execute the plugin in parallel with other parallel plugins.                                                                                                   |
| `setup`     | `Plugin<T>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                 | `false`  | The main plugin function, equivalent to a function plugin.                                                                                                               |
| `hooks`     | `Partial<RuntimeNuxtHooks>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | Nuxt app runtime hooks to register directly.                                                                                                                             |
| `env`       | `{ islands?: boolean }`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}     | `false`  | Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.                                                           |

::video-accordion
---
title: Watch a video from Alexander Lichter about the Object Syntax for Nuxt plugins
video-id: 2aXZyXB1QGQ
---
::

## Examples

### Basic Usage

The example below demonstrates a simple plugin that adds global functionality:
```

Example 3 (unknown):

```unknown
### Object Syntax Plugin

The example below shows the object syntax with advanced configuration:
```

---

## WebReinvent

**URL:** llms-txt#webreinvent

WebReinvent has 12+ years of experience building software and a team of 50+ software professionals including software developers, UI/UX designers, testers, DevOps, project managers, etc. The team is well-versed in the Nuxt ecosystem and has delivered multiple high-performance web apps, dashboards, real-time apps, multi-tenant SaaS applications, etc.

We are one of the most process-driven companies and we love to follow industry standards. Some of them are managing git repo, code review/audits, deploying new releases via CI/CD, automated software testing, maintaining detailed technical documentation, application performance monitoring, etc. We have been delivering MVP to enterprise-level software products from startup to MSME.

Contact us to build your MVP fast or migrate your legacy software to Nuxt or maintain your existing software or scale your software to the enterprise level. We're here to help.

---

## Vue.js Development

**URL:** llms-txt#vue.js-development

**Contents:**

- Vue with Nuxt
  - Single File Components
  - Auto-imports
  - Vue Router
- Differences with Nuxt 2 / Vue 2
  - Faster Rendering
  - Smaller Bundle
  - Composition API
  - TypeScript Support

Nuxt integrates Vue 3, the new major release of Vue that enables new patterns for Nuxt users.

::note
While an in-depth knowledge of Vue is not required to use Nuxt, we recommend that you read the documentation and go through some of the examples on [vuejs.org](https://vuejs.org){rel=""nofollow""}.
::

Nuxt has always used Vue as a frontend framework.

We chose to build Nuxt on top of Vue for these reasons:

- The reactivity model of Vue, where a change in data automatically triggers a change in the interface.
- The component-based templating, while keeping HTML as the common language of the web, enables intuitive patterns to keep your interface consistent, yet powerful.
- From small projects to large web applications, Vue keeps performing well at scale to ensure that your application keeps delivering value to your users.

### Single File Components

[Vue’s single-file components](https://vuejs.org/guide/scaling-up/sfc.html){rel="&#x22;nofollow&#x22;"} (SFC or `*.vue` files) encapsulate the markup (`<template>`), logic (`<script>`) and styling (`<style>`) of a Vue component. Nuxt provides a zero-config experience for SFCs with [Hot Module Replacement](https://vite.dev/guide/features.html#hot-module-replacement){rel="&#x22;nofollow&#x22;"} that offers a seamless developer experience.

Every Vue component created in the [`components/`](https://nuxt.com/docs/3.x/directory-structure/components) directory of a Nuxt project will be available in your project without having to import it. If a component is not used anywhere, your production’s code will not include it.

::read-more{to="https://nuxt.com/docs/guide/concepts/auto-imports"}
::

Most applications need multiple pages and a way to navigate between them. This is called **routing**. Nuxt uses a [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory and naming conventions to directly create routes mapped to your files using the official [Vue Router library](https://router.vuejs.org){rel="&#x22;nofollow&#x22;"}.

::read-more{to="https://nuxt.com/docs/getting-started/routing"}
::

::link-example{to="https://nuxt.com/docs/examples/features/auto-imports"}
::

## Differences with Nuxt 2 / Vue 2

Nuxt 3+ is based on Vue 3. The new major Vue version introduces several changes that Nuxt takes advantage of:

- Better performance
- Composition API
- TypeScript support

The Vue Virtual DOM (VDOM) has been rewritten from the ground up and allows for better rendering performance. On top of that, when working with compiled Single-File Components, the Vue compiler can further optimize them at build time by separating static and dynamic markup.

This results in faster first rendering (component creation) and updates, and less memory usage. In Nuxt 3, it enables faster server-side rendering as well.

With Vue 3 and Nuxt 3, a focus has been put on bundle size reduction. With version 3, most of Vue’s functionality, including template directives and built-in components, is tree-shakable. Your production bundle will not include them if you don’t use them.

This way, a minimal Vue 3 application can be reduced to 12 kb gzipped.

The only way to provide data and logic to components in Vue 2 was through the Options API, which allows you to return data and methods to a template with pre-defined properties like `data` and `methods`:

The [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html){rel="&#x22;nofollow&#x22;"} introduced in Vue 3 is not a replacement of the Options API, but it enables better logic reuse throughout an application, and is a more natural way to group code by concern in complex components.

Used with the `setup` keyword in the `<script>` definition, here is the above component rewritten with Composition API and Nuxt 3’s auto-imported Reactivity APIs:

The goal of Nuxt is to provide a great developer experience around the Composition API.

- Use auto-imported [Reactivity functions](https://vuejs.org/api/reactivity-core.html){rel="&#x22;nofollow&#x22;"} from Vue and Nuxt [built-in composables](https://nuxt.com/docs/3.x/api/composables/use-async-data).
- Write your own auto-imported reusable functions in the [`composables/` directory](https://nuxt.com/docs/3.x/directory-structure/composables).

### TypeScript Support

Both Vue 3 and Nuxt 3+ are written in TypeScript. A fully typed codebase prevents mistakes and documents APIs usage. This doesn’t mean that you have to write your application in TypeScript to take advantage of it. With Nuxt 3, you can opt-in by renaming your file from `.js` to `.ts` , or add `<script setup lang="ts">` in a component.

::read-more{to="https://nuxt.com/docs/guide/concepts/typescript"}
Read the details about TypeScript in Nuxt
::

**Examples:**

Example 1 (unknown):

```unknown
The [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html){rel="&#x22;nofollow&#x22;"} introduced in Vue 3 is not a replacement of the Options API, but it enables better logic reuse throughout an application, and is a more natural way to group code by concern in complex components.

Used with the `setup` keyword in the `<script>` definition, here is the above component rewritten with Composition API and Nuxt 3’s auto-imported Reactivity APIs:
```

---

## <DevOnly>

**URL:** llms-txt#<devonly>

**Contents:**

- Slots

Nuxt provides the `<DevOnly>` component to render a component only during development.

The content will not be included in production builds.

- `#fallback`: if you ever require to have a replacement during production.

**Examples:**

Example 1 (unknown):

```unknown
## Slots

- `#fallback`: if you ever require to have a replacement during production.
```

---

## <ClientOnly>

**URL:** llms-txt#<clientonly>

**Contents:**

- Props
- Slots
- Examples
  - Accessing HTML Elements

The `<ClientOnly>` component is used for purposely rendering a component only on client side.

::note
The content of the default slot will be tree-shaken out of the server build. (This does mean that any CSS used by components within it may not be inlined when rendering the initial HTML.)
::

- `placeholderTag` | `fallbackTag`: specify a tag to be rendered server-side.
- `placeholder` | `fallback`: specify a content to be rendered server-side.

- `#fallback`: specify a content to be rendered on the server and displayed until `<ClientOnly>` is mounted in the browser.

### Accessing HTML Elements

Components inside `<ClientOnly>` are rendered only after being mounted. To access the rendered elements in the DOM, you can watch a template ref:

**Examples:**

Example 1 (vue):

```vue
<template>
  <div>
    <Sidebar />
    <!-- The <Comment> component will only be rendered on client-side -->
    <ClientOnly fallback-tag="span" fallback="Loading comments...">
      <Comment />
    </ClientOnly>
  </div>
</template>
```

Example 2 (unknown):

```unknown
## Examples

### Accessing HTML Elements

Components inside `<ClientOnly>` are rendered only after being mounted. To access the rendered elements in the DOM, you can watch a template ref:
```

---

## Configuration for `@nuxt/devtools`

**URL:** llms-txt#configuration-for-`@nuxt/devtools`

devtools.enabled=true

---

## .nuxtrc

**URL:** llms-txt#.nuxtrc

**Contents:**

- Usage

The `.nuxtrc` file can be used to configure Nuxt with a flat syntax. It is based on [`unjs/rc9`](https://github.com/unjs/rc9){rel="&#x22;nofollow&#x22;"}.

::tip
For more advanced configurations, use [`nuxt.config`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config).
::

---

## Reporting Bugs

**URL:** llms-txt#reporting-bugs

**Contents:**

- Is It Really a Bug?
- Search the Issues
- Create a Minimal Reproduction
- Figure Out What the Cause Might Be

Try as we might, we will never completely eliminate bugs.

Even if you can't fix the underlying code, reporting a bug well can enable someone else with a bit more familiarity with the codebase to spot a pattern or make a quick fix.

Here are a few key steps.

## Is It Really a Bug?

Consider if you're looking to get help with something, or whether you think there's a bug with Nuxt itself. If it's the former, we'd love to help you - but the best way to do that is through [asking for help](https://nuxt.com/docs/3.x/community/getting-help) rather than reporting a bug.

Search through the [open issues](https://github.com/nuxt/nuxt/issues){rel="&#x22;nofollow&#x22;"} and [discussions](https://github.com/nuxt/nuxt/discussions){rel="&#x22;nofollow&#x22;"} first. If you find anything that seems like the same bug, it's much better to comment on an existing thread than create a duplicate.

## Create a Minimal Reproduction

It's important to be able to reproduce the bug reliably - in a minimal way and apart from the rest of your project. This narrows down what could be causing the issue and makes it possible for someone not only to find the cause, but also to test a potential solution.

Start with the Nuxt sandbox and add the **minimum** amount of code necessary to reproduce the bug you're experiencing.

::note
If your issue concerns Vue or Vite, please try to reproduce it first with the Vue SSR starter.
::

::card-group
:::card

---

icon: i-simple-icons-stackblitz
target: \_blank
title: Nuxt on StackBlitz
to: https://nuxt.new/s/v3

---

:::

:::card

---

icon: i-simple-icons-codesandbox
target: \_blank
title: Nuxt on CodeSandbox
to: https://nuxt.new/c/v3

---

:::
::

::card-group
:::card

---

icon: i-simple-icons-stackblitz
target: \_blank
title: Vue SSR on StackBlitz
to: https://stackblitz.com/github/nuxt-contrib/vue3-ssr-starter/tree/main?terminal=dev

---

:::

:::card

---

icon: i-simple-icons-codesandbox
target: \_blank
title: Vue SSR on CodeSandbox
to: https://codesandbox.io/p/sandbox/github/nuxt-contrib/vue3-ssr-starter/main

---

:::

:::card

---

icon: i-simple-icons-github
target: \_blank
title: Vue SSR Template on GitHub
to: https://github.com/nuxt-contrib/vue3-ssr-starter/generate

---

:::
::

Once you've reproduced the issue, remove as much code from your reproduction as you can (while still recreating the bug). The time spent making the reproduction as minimal as possible will make a huge difference to whoever sets out to fix the issue.

## Figure Out What the Cause Might Be

With a Nuxt project, there are lots of moving pieces - from [Nuxt modules](https://nuxt.com/modules) to [other JavaScript libraries](https://www.npmjs.com){rel="&#x22;nofollow&#x22;"}. Try to report the bug at the most relevant and specific place. That will likely be the Nuxt module causing an issue, or the upstream library that Nuxt is depending on.

---

## Nuxt 4.1

**URL:** llms-txt#nuxt-4.1

**Contents:**

- 🔥 Build and Performance Improvements
  - 🍫 Enhanced Chunk Stability
  - 🦀 Experimental Rolldown Support
- 🧪 Improved Lazy Hydration
- 📄 Enhanced Page Rules
- 🚀 Module Development Enhancements
  - 🪾 Module Dependencies and Integration
  - 🪝 Module Lifecycle Hooks
  - 🙈 Enhanced File Resolution
  - 📂 Layer Directories Utility

## 🔥 Build and Performance Improvements

### 🍫 Enhanced Chunk Stability

Build stability has been significantly improved with import maps ([#33075](https://github.com/nuxt/nuxt/pull/33075){rel="&#x22;nofollow&#x22;"}). This prevents cascading hash changes that could invalidate large portions of your build when small changes are made:

By default, JS chunks emitted in a Vite build are hashed, which means they can be cached immutably. However, this can cause a significant issue: a change to a single component can cause _every_ hash to be invalidated, massively increasing the chance of 404s.

1. a component is changed slightly - the hash of its JS chunk changes
2. the page which uses the component has to be updated to reference the new file name
3. the _entry_ now has its hash changed because it dynamically imports the page
4. **_every other file_** which imports the entry has its hash changed because the entry file name is changed

Obviously this wasn't optimal. With this new feature, the hash of (otherwise) unchanged files which import the entry won't be affected.

This feature is automatically enabled and helps maintain better cache efficiency in production. It does require [native import map support](https://caniuse.com/import-maps){rel="&#x22;nofollow&#x22;"}, but Nuxt will automatically disable it if you have configured `vite.build.target` to include a browser that doesn't support import maps.

And of course you can disable it if needed:

### 🦀 Experimental Rolldown Support

Nuxt now includes experimental support for `rolldown-vite` ([#31812](https://github.com/nuxt/nuxt/pull/31812){rel="&#x22;nofollow&#x22;"}), bringing Rust-powered bundling for potentially faster builds.

To try Rolldown in your Nuxt project, you need to override Vite with the rolldown-powered version since Vite is a dependency of Nuxt. Add the following to your `package.json`:

::code-group{sync="pm"}

After adding the override, reinstall your dependencies. Nuxt will automatically detect when Rolldown is available and adjust its build configuration accordingly.

For more details on Rolldown integration, see the [Vite Rolldown guide](https://vite.dev/guide/rolldown){rel="&#x22;nofollow&#x22;"}.

::note
This is experimental and may have some limitations, but offers a glimpse into the future of high-performance bundling in Nuxt.
::

## 🧪 Improved Lazy Hydration

Lazy hydration macros now work without auto-imports ([#33037](https://github.com/nuxt/nuxt/pull/33037){rel="&#x22;nofollow&#x22;"}), making them more reliable when component auto-discovery is disabled:

This ensures that components that are not "discovered" through Nuxt (e.g., because `components` is set to `false` in the config) can still be used in lazy hydration macros.

## 📄 Enhanced Page Rules

If you have enabled experimental extraction of route rules, these are now exposed on a dedicated `rules` property on `NuxtPage` objects ([#32897](https://github.com/nuxt/nuxt/pull/32897){rel="&#x22;nofollow&#x22;"}), making them more accessible to modules and improving the overall architecture:

The `defineRouteRules` function continues to work exactly as before, but now provides better integration possibilities for modules.

## 🚀 Module Development Enhancements

### 🪾 Module Dependencies and Integration

Modules can now specify dependencies and modify options for other modules ([#33063](https://github.com/nuxt/nuxt/pull/33063){rel="&#x22;nofollow&#x22;"}). This enables better module integration and ensures proper setup order:

This replaces the deprecated `installModule` function and provides a more robust way to handle module dependencies with version constraints and configuration merging.

### 🪝 Module Lifecycle Hooks

Module authors now have access to two new lifecycle hooks: `onInstall` and `onUpgrade` ([#32397](https://github.com/nuxt/nuxt/pull/32397){rel="&#x22;nofollow&#x22;"}). These hooks allow modules to perform additional setup steps when first installed or when upgraded to a new version:

The hooks are only triggered when both `name` and `version` are provided in the module metadata. Nuxt uses the `.nuxtrc` file internally to track module versions and trigger the appropriate hooks. (If you haven't come across it before, the `.nuxtrc` file should be committed to version control.)

::tip
This means module authors can begin implementing their own 'setup wizards' to provide a better experience when some setup is required after installing a module.
::

### 🙈 Enhanced File Resolution

The new `ignore` option for `resolveFiles` ([#32858](https://github.com/nuxt/nuxt/pull/32858){rel="&#x22;nofollow&#x22;"}) allows module authors to exclude specific files based on glob patterns:

### 📂 Layer Directories Utility

A new `getLayerDirectories` utility ([#33098](https://github.com/nuxt/nuxt/pull/33098){rel="&#x22;nofollow&#x22;"}) provides a clean interface for accessing layer directories without directly accessing private APIs:

## ✨ Developer Experience Improvements

### 🎱 Simplified Kit Utilities

Several kit utilities have been improved for better developer experience:

- `addServerImports` now supports single imports ([#32289](https://github.com/nuxt/nuxt/pull/32289){rel="&#x22;nofollow&#x22;"}):

### 🔥 Performance Optimizations

This release includes several internal performance optimizations:

- Improved route rules cache management ([#32877](https://github.com/nuxt/nuxt/pull/32877){rel="&#x22;nofollow&#x22;"})
- Optimized app manifest watching ([#32880](https://github.com/nuxt/nuxt/pull/32880){rel="&#x22;nofollow&#x22;"})
- Better TypeScript processing for page metadata ([#32920](https://github.com/nuxt/nuxt/pull/32920){rel="&#x22;nofollow&#x22;"})

- Improved `useFetch` hook typing ([#32891](https://github.com/nuxt/nuxt/pull/32891){rel="&#x22;nofollow&#x22;"})
- Better handling of TypeScript expressions in page metadata ([#32902](https://github.com/nuxt/nuxt/pull/32902){rel="&#x22;nofollow&#x22;"}, [#32914](https://github.com/nuxt/nuxt/pull/32914){rel="&#x22;nofollow&#x22;"})
- Enhanced route matching and synchronization ([#32899](https://github.com/nuxt/nuxt/pull/32899){rel="&#x22;nofollow&#x22;"})
- Reduced verbosity of Vue server warnings in development ([#33018](https://github.com/nuxt/nuxt/pull/33018){rel="&#x22;nofollow&#x22;"})
- Better handling of relative time calculations in `<NuxtTime>` ([#32893](https://github.com/nuxt/nuxt/pull/32893){rel="&#x22;nofollow&#x22;"})

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile and pull in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

All of these features are also available in **Nuxt 3.19**, which has been released alongside v4.1. As part of our commitment to the v3 branch, we continue to backport compatible v4 features to ensure v3 users can benefit from the latest improvements.

If you're still using Nuxt 3, you can upgrade to v3.19 to get access to all these features while staying on the stable v3 release line.

## Full release notes

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/releases/tag/v4.1.0

---

Read the full release notes of Nuxt `v4.1.0`.
::

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.19.0

---

Read the full release notes of Nuxt `v3.19.0`.
::

Thank you to everyone who contributed! We're excited to see what you build with these new features. ❤️

**Examples:**

Example 1 (html):

```html
<!-- Automatically injected import map -->
<script type="importmap">
  { "imports": { "#entry": "/_nuxt/DC5HVSK5.js" } }
</script>
```

Example 2 (unknown):

```unknown
### 🦀 Experimental Rolldown Support

Nuxt now includes experimental support for `rolldown-vite` ([#31812](https://github.com/nuxt/nuxt/pull/31812){rel="&#x22;nofollow&#x22;"}), bringing Rust-powered bundling for potentially faster builds.

To try Rolldown in your Nuxt project, you need to override Vite with the rolldown-powered version since Vite is a dependency of Nuxt. Add the following to your `package.json`:

::code-group{sync="pm"}
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown

```

---

## Run only unit tests

**URL:** llms-txt#run-only-unit-tests

npx vitest --project unit

---

## callOnce

**URL:** llms-txt#callonce

**Contents:**

- Purpose
- Usage
- Type
- Parameters

::important
This utility is available since [Nuxt v3.9](https://nuxt.com/blog/v3-9).
::

The `callOnce` function is designed to execute a given function or block of code only once during:

- server-side rendering but not hydration
- client-side navigation

This is useful for code that should be executed only once, such as logging an event or setting up a global state.

The default mode of `callOnce` is to run code only once. For example, if the code runs on the server it won't run again on the client. It also won't run again if you `callOnce` more than once on the client, for example by navigating back to this page.

It is also possible to run on every navigation while still avoiding the initial server/client double load. For this, it is possible to use the `navigation` mode:

::important
`navigation` mode is available since [Nuxt v3.15](https://nuxt.com/blog/v3-15).
::

## ::tip

## to: https://nuxt.com/docs/getting-started/state-management#usage-with-pinia

`callOnce` is useful in combination with the [Pinia module](https://nuxt.com/modules/pinia) to call store actions.
::

::read-more{to="https://nuxt.com/docs/getting-started/state-management"}
::

::warning
Note that `callOnce` doesn't return anything. You should use [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) or [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) if you want to do data fetching during SSR.
::

::note
`callOnce` is a composable meant to be called directly in a setup function, plugin, or route middleware, because it needs to add data to the Nuxt payload to avoid re-calling the function on the client when the page hydrates.
::

- `key`: A unique key ensuring that the code is run once. If you do not provide a key, then a key that is unique to the file and line number of the instance of `callOnce` will be generated for you.
- `fn`: The function to run once. It can be asynchronous.
- `options`: Setup the mode, either to re-execute on navigation (`navigation`) or just once for the lifetime of the app (`render`). Defaults to `render`.

- `render`: Executes once during initial render (either SSR or CSR) - Default mode
  - `navigation`: Executes once during initial render and once per subsequent client-side navigation

**Examples:**

Example 1 (unknown):

```unknown
It is also possible to run on every navigation while still avoiding the initial server/client double load. For this, it is possible to use the `navigation` mode:
```

Example 2 (unknown):

```unknown
::important
`navigation` mode is available since [Nuxt v3.15](https://nuxt.com/blog/v3-15).
::

::tip
---
to: https://nuxt.com/docs/getting-started/state-management#usage-with-pinia
---
`callOnce` is useful in combination with the [Pinia module](https://nuxt.com/modules/pinia) to call store actions.
::

::read-more{to="https://nuxt.com/docs/getting-started/state-management"}
::

::warning
Note that `callOnce` doesn't return anything. You should use [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) or [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) if you want to do data fetching during SSR.
::

::note
`callOnce` is a composable meant to be called directly in a setup function, plugin, or route middleware, because it needs to add data to the Nuxt payload to avoid re-calling the function on the client when the page hydrates.
::

## Type
```

---

## assets

**URL:** llms-txt#assets

The directory usually contains the following types of files:

- Stylesheets (CSS, SASS, etc.)
- Fonts
- Images that won't be served from the [`public/`](https://nuxt.com/docs/3.x/directory-structure/public) directory.

If you want to serve assets from the server, we recommend taking a look at the [`public/`](https://nuxt.com/docs/3.x/directory-structure/public) directory.

::read-more{to="https://nuxt.com/docs/getting-started/assets"}
::

---

## Cloudflare

**URL:** llms-txt#cloudflare

**Contents:**

- Cloudflare Pages
  - Git Integration
  - Route matching
  - Direct Upload
- Learn more
- Templates
- Learn more

::tip
**Zero Configuration ✨**

Integration with Cloudflare Pages is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

::important
Checkout the [@nuxthub/core](https://nuxt.com/modules/hub) module to build full-stack Nuxt applications with Cloudflare, learn more on [hub.nuxt.com](https://hub.nuxt.com){rel=""nofollow""}.
::

If you use the GitHub/GitLab integration with Cloudflare Pages, **no configuration is required**. Pushing to your repository will automatically build your project and deploy it.

::note
Nuxt will detect the environment to set the correct [Server/Nitro preset](https://nitro.unjs.io/deploy/providers/cloudflare){rel=""nofollow""}.
::

To leverage server-side rendering on the edge, set the build command to: `nuxt build`

To statically generate your website, set the build command to: `nuxt generate`

On CloudFlare Pages, if an HTML file is found with a matching path to the current route requested, it will serve it. It will also redirect HTML pages to their extension-less counterparts: for instance, `/contact.html` will be redirected to `/contact`, and `/about/index.html` will be redirected to `/about/`.

To match Cloudflare [route matching](https://developers.cloudflare.com/pages/configuration/serving-pages/#route-matching){rel="&#x22;nofollow&#x22;"} rules, set the nitro option `autoSubfolderIndex` to `false`.

Alternatively, you can use [wrangler](https://github.com/cloudflare/workers-sdk){rel="&#x22;nofollow&#x22;"} to upload your project to Cloudflare.

In this case, you will have to set the preset manually.

1. Build your project for Cloudflare Pages:

2. Deploy, it will ask you to create a project for the first time:

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="\_blank"}
Head over **Nitro documentation** to learn more about the Cloudflare deployment preset.
::

::read-more{to="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/#use-bindings-in-your-nuxt-application" target="\_blank"}
Head over **CloudFlare Pages** documentation to learn more about it.
::

::card-group
::card

---

icon: i-simple-icons-github
title: Atidone
to: https://github.com/atinux/atidone
target: \_blank
ui.icon.base: text-black dark:text-white

---

A todos application with user authentication, SSR and Cloudflare D1.
::
::card

---

icon: i-simple-icons-github
title: Atinotes
to: https://github.com/atinux/atinotes
target: \_blank
ui.icon.base: text-black dark:text-white

---

An editable website with universal rendering based on Cloudflare KV.
::
::card

---

icon: i-simple-icons-github
title: Atidraw
to: https://github.com/atinux/atidraw
target: \_blank
ui.icon.base: text-black dark:text-white

---

Web application that lets you to draw and share your drawings with the world, with Cloudflare R2 & AI.
::
::card

---

icon: i-simple-icons-github
title: Nuxt Image Gallery
to: https://github.com/flosciante/nuxt-image-gallery
target: \_blank
ui.icon.base: text-black dark:text-white

---

An image gallery to upload, edit and share your images to the world, with Cloudflare R2.
::
::

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="\_blank"}
Head over **Nitro documentation** to learn more about the cloudflare deployment preset.
::

````

**Examples:**

Example 1 (unknown):
```unknown
### Direct Upload

Alternatively, you can use [wrangler](https://github.com/cloudflare/workers-sdk){rel="&#x22;nofollow&#x22;"} to upload your project to Cloudflare.

In this case, you will have to set the preset manually.

1. Build your project for Cloudflare Pages:
```

Example 2 (unknown):
```unknown
2. Deploy, it will ask you to create a project for the first time:
```

Example 3 (unknown):
```unknown
## Learn more

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
Head over **Nitro documentation** to learn more about the Cloudflare deployment preset.
::

::read-more{to="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/#use-bindings-in-your-nuxt-application" target="_blank"}
Head over **CloudFlare Pages** documentation to learn more about it.
::

## Templates

::card-group
::card
---
icon: i-simple-icons-github
title: Atidone
to: https://github.com/atinux/atidone
target: _blank
ui.icon.base: text-black dark:text-white
---
A todos application with user authentication, SSR and Cloudflare D1.
::
::card
---
icon: i-simple-icons-github
title: Atinotes
to: https://github.com/atinux/atinotes
target: _blank
ui.icon.base: text-black dark:text-white
---
An editable website with universal rendering based on Cloudflare KV.
::
::card
---
icon: i-simple-icons-github
title: Atidraw
to: https://github.com/atinux/atidraw
target: _blank
ui.icon.base: text-black dark:text-white
---
Web application that lets you to draw and share your drawings with the world, with Cloudflare R2 & AI.
::
::card
---
icon: i-simple-icons-github
title: Nuxt Image Gallery
to: https://github.com/flosciante/nuxt-image-gallery
target: _blank
ui.icon.base: text-black dark:text-white
---
An image gallery to upload, edit and share your images to the world, with Cloudflare R2.
::
::

## Learn more

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
Head over **Nitro documentation** to learn more about the cloudflare deployment preset.
::
```

---

## Clever Cloud

**URL:** llms-txt#clever-cloud

**Contents:**
- Deploy Clever Cloud from the Console
- Learn more

Nuxt supports deploying on [Clever Cloud](https://www.clever-cloud.com/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

## Deploy Clever Cloud from the Console

To deploy your Nuxt project to Clever Cloud, you will need to create a **new application**. The application wizard will walk you through the necessary configuration steps.

1. From the lateral menubar, click **Create > An application**
2. Choose how to deploy: **Create an application from a local repository** or **Create an application from a GitHub repository**
3. Select a **Node.js** application, or a **static one**.
4. Set up the minimal size for your instance and scalability options. Nuxt app must be deployed with a minimum size of **XS** instance for **Node.js** application and **nano** instance for **static one**. The build process, however, will need to be configured later with at least an M instance size to ensure it can handle the resource requirements. Depending on your project’s specifications and dependencies, you may need to adjust further as you monitor the metrics from the **Overview** page.
5. Select a **region** to deploy your instance.
6. Skip connecting **Add-ons** to your Clever application unless you’re using a database.
7. Inject **environment variables**:

::code-group{sync="pm"}

- For a **static application**

::note
If [`ssr: false` is set in `nuxt.config.ts`](https://nuxt.com/docs/4.x/getting-started/deployment#static-hosting){rel=""nofollow""} **or** if your project contains dynamic routes that cannot be pre-rendered, you should :

1. Use a **Static Apache** application
2. Create a [`.htaccess`](https://www.clever.cloud/developers/doc/applications/static-apache/#serving-indexhtml-for-spa-single-page-application-routers){rel=""nofollow""} file that redirects all routes to `index.html` to ensure proper routing for your SPA.

Otherwise, you can use the default **Static HTML** application.
::

::code-group{sync="pm"}

8. Navigate to the application **Information** menu and enable the **enable dedicated build instance** option on a minimal instance of type **M**.
9. **Deploy!** If you’re deploying from **GitHub**, your deployment should start automatically. If you’re using **Git**, show [this docs](https://www.clever-cloud.com/developers/doc/quickstart/#choose-how-to-deploy){rel="&#x22;nofollow&#x22;"}.

::read-more
---
target: _blank
to: https://developers.clever-cloud.com/guides/nuxt
---
Clever Cloud documentation for deploying Nuxt
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

- For a **static application**

::note
If [`ssr: false` is set in `nuxt.config.ts`](https://nuxt.com/docs/4.x/getting-started/deployment#static-hosting){rel=""nofollow""} **or** if your project contains dynamic routes that cannot be pre-rendered, you should :

1. Use a **Static Apache** application
2. Create a [`.htaccess`](https://www.clever.cloud/developers/doc/applications/static-apache/#serving-indexhtml-for-spa-single-page-application-routers){rel=""nofollow""} file that redirects all routes to `index.html` to ensure proper routing for your SPA.

Otherwise, you can use the default **Static HTML** application.
::

::code-group{sync="pm"}
```

---

## Nuxt Docs

**URL:** llms-txt#nuxt-docs

**Contents:**
- Contributing

This repository contains the documentation of Nuxt hosted on <https://nuxt.com/docs>{rel="&#x22;nofollow&#x22;"}

Have a look at <https://github.com/nuxt/nuxt.com>{rel="&#x22;nofollow&#x22;"} to run the website locally.

---

## Releases

**URL:** llms-txt#releases

::card-group
  :::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/nuxt
  to: https://github.com/nuxt/nuxt/releases
  ---
  Nuxt framework releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/cli
  to: https://github.com/nuxt/cli/releases
  ---
  Nuxt CLI (`@nuxt/cli`) releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/content
  to: https://github.com/nuxt/content/releases
  ---
  Nuxt Content releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/devtools
  to: https://github.com/nuxt/devtools/releases
  ---
  Nuxt DevTools releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/fonts
  to: https://github.com/nuxt/fonts/releases
  ---
  Nuxt Fonts releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/image
  to: https://github.com/nuxt/image/releases
  ---
  Nuxt Image releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/scripts
  to: https://github.com/nuxt/scripts/releases
  ---
  Nuxt Scripts releases.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: nuxt/ui
  to: https://github.com/nuxt/ui/releases
  ---
  Nuxt UI releases.
  :::
::

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt
---
Discover the `nuxt` organization on GitHub
::

---

## Introducing Nuxt Scripts

**URL:** llms-txt#introducing-nuxt-scripts

**Contents:**
- Getting to Nuxt Scripts
- Why Build a Third-Party Script Module?
  - 😒 Developer Experience: A Full-Stack Headache
  - 🐌 Performance: "Why can't I get 100 on Lighthouse?"
  - 🛡️ Privacy & Security: Do *no* evil?
- What does Nuxt Scripts do about these issues?
  - Composable: useScript
  - Script Registry
  - Facade Components
  - Consent Management & Element Event Triggers

The Nuxt team, in collaboration with the [Chrome Aurora](https://developer.chrome.com/aurora){rel="&#x22;nofollow&#x22;"} team at Google, is excited to announce the public beta release of [Nuxt Scripts](https://scripts.nuxt.com){rel="&#x22;nofollow&#x22;"}.

Nuxt Scripts is a better way to work with third-party scripts, providing improved performance, privacy, security, and developer experience.

![Nuxt Scripts Banner](https://nuxt.com/assets/blog/nuxt-scripts/banner.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

## Getting to Nuxt Scripts

Over a year ago, Daniel published the initial [Nuxt Scripts RFC](https://github.com/nuxt/nuxt/discussions/22016){rel="&#x22;nofollow&#x22;"}. The RFC proposed a module that would "allow third-party scripts to be managed and optimized, following best practices for performant and compliant websites".

Having [personal experience](https://github.com/harlan-zw/nuxt-delay-hydration){rel="&#x22;nofollow&#x22;"} with solving performance issues related to third-party scripts, I knew how difficult these performance optimizations could be. Nonetheless, I was keen to tackle the problem and took over the project.

With the RFC as the seed of the idea, I started prototyping what it could [look like](https://github.com/nuxt/nuxt/discussions/22016#discussioncomment-6527001){rel="&#x22;nofollow&#x22;"} using [Unhead](https://unhead.unjs.io/){rel="&#x22;nofollow&#x22;"}.

Thinking about what I wanted to build exactly, I found that the real issue wasn't just how to load "optimized" third-party scripts but how to make working with third-party scripts a better experience overall.

## Why Build a Third-Party Script Module?

[94% of sites use at least one third-party provider](https://almanac.httparchive.org/en/2022/third-parties#prevalence){rel="&#x22;nofollow&#x22;"}, with the average site having [five third-party providers](https://docs.google.com/spreadsheets/d/1YqoRRsyiNsrEabVLu2nRU98JIG_0zLLuoQhC2nX8xbM/edit?gid=1428106498#gid=1428106498){rel="&#x22;nofollow&#x22;"}.

We know that third-party scripts aren't perfect; they [slow down the web](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript#){rel="&#x22;nofollow&#x22;"}, cause privacy and security issues, and are a pain to work with.

However, they are fundamentally useful and aren't going anywhere soon.

By exploring the issues with third-party scripts, we can see where improvements can be made.

### 😒 Developer Experience: A Full-Stack Headache

Let's walk through adding a third-party script to your Nuxt app using a fictional `tracker.js` script that adds a `track` function to the window.

We start by loading the script using `useHead`.

However, let's now try to get the script functionality working in our app.

The following steps are common when working with third-party scripts in Nuxt:

- Everything has to be wrapped for SSR safety.
- Flaky checks for if the script has loaded.
- Augmenting the window object for types.

### 🐌 Performance: "Why can't I get 100 on Lighthouse?"

For a visitor to start interacting with your Nuxt site, the app bundle needs to be downloaded and Vue needs to hydrate the app instance.

Loading third-party scripts can interfere with this hydration process, even when using `async` or `defer`. This slows down the network and blocks the main thread, leading to a degraded user experience and poor [Core Web Vitals](https://web.dev/vitals/){rel="&#x22;nofollow&#x22;"}.

The [Chrome User Experience Report](https://developer.chrome.com/docs/crux){rel="&#x22;nofollow&#x22;"} shows Nuxt sites with numerous third-party resources typically have poorer [Interaction to Next Paint (INP)](https://web.dev/articles/inp){rel="&#x22;nofollow&#x22;"} and [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp){rel="&#x22;nofollow&#x22;"} scores.

To see how third-party scripts degrade performance, we can look at the [Web Almanac 2022](https://almanac.httparchive.org/en/2022/third-parties#impact-on-performance){rel="&#x22;nofollow&#x22;"}. The report shows that the top 10 third-party scripts **average median blocking time is 1.4 seconds**.

### 🛡️ Privacy & Security: Do *no* evil?

Of the top 10,000 sites, 58% of them have third-party scripts that [exchange tracking IDs stored in external cookies](https://www3.cs.stonybrook.edu/~mikepo/papers/firstparty.www21.pdf){rel="&#x22;nofollow&#x22;"}, meaning they can track users across sites even with third-party cookies disabled.

While in many cases our hands are tied with the providers we use, we should try to minimize the amount of our end-users' data that we're leaking where possible.

When we do take on the privacy implications, it can then be difficult to accurately convey these in our privacy policies and build the consent management required to comply with regulations such as GDPR.

Security when using third-party scripts is also a concern. Third-party scripts are common attack vectors for malicious actors, most do not provide `integrity` hashes for their scripts, meaning they can be compromised and inject malicious code into your app at any time.

## What does Nuxt Scripts do about these issues?

### Composable: useScript

This composable sits between the `<script>` tag and the functionality added to `window.{thirdPartyKey}`.

For the `<script>` tag, the composable:

- Gives full visibility into the script's loading and error states
- Loads scripts as Nuxt is hydrating the app by default, for slightly better performance.
- Restricts `crossorigin` and `referrerpolicy` to improve privacy and security.
- Provides a way to [delay loading the script](https://scripts.nuxt.com/docs/guides/script-triggers){rel="&#x22;nofollow&#x22;"} until you need it.

For the scripts API, it:

- Provides full type-safety around the script's functions
- Adds a proxy layer allowing your app to run when the script functions in unsafe contexts (SSR, before the script is loaded, the script is blocked)

The [script registry](https://scripts.nuxt.com/scripts){rel="&#x22;nofollow&#x22;"} is a collection of first-party integrations for common third-party scripts. As of release, we support 21 scripts, with more to come.

![Nuxt Scripts Registry](https://nuxt.com/assets/blog/nuxt-scripts/registry.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

These registry scripts are fine-tuned wrappers around `useScript` with full type-safety, runtime validation of the script options (dev only) and environment variable support

For example, we can look at the [Fathom Analytics](https://scripts.nuxt.com/scripts/analytics/fathom-analytics){rel="&#x22;nofollow&#x22;"} script.

### Facade Components

The registry includes several [facade components](https://scripts.nuxt.com/docs/guides/facade-components){rel="&#x22;nofollow&#x22;"}, such as
[Google Maps](https://scripts.nuxt.com/scripts/content/google-maps){rel="&#x22;nofollow&#x22;"}, [YouTube](https://scripts.nuxt.com/scripts/content/youtube-player){rel="&#x22;nofollow&#x22;"} and [Intercom](https://scripts.nuxt.com/scripts/support/intercom){rel="&#x22;nofollow&#x22;"}.

Facade components are "fake" components that get hydrated when the third-party script loads. Facade components
have trade-offs but can drastically improve your performance. See the [What are Facade Components?](https://scripts.nuxt.com/docs/guides/facade-components#what-are-facade-components){rel="&#x22;nofollow&#x22;"}
guide for more information.

Nuxt Scripts provides facade components as accessible but headless, meaning they are not styled by default but add the necessary
a16y data.

::tabs
  :::tabs-item{label="Output"}
    ::::youtube-demo
    ::::
  :::

:::tabs-item{label="Input"}

  :::
::

### Consent Management & Element Event Triggers

The `useScript` composable gives you full control over how and when your scripts are loaded, by either providing a custom `trigger` or manually calling the `load()` function.

Building on top of this, Nuxt Scripts provides advanced triggers to make it even easier.

- [Consent Management](https://scripts.nuxt.com/docs/guides/consent){rel="&#x22;nofollow&#x22;"} - Load scripts only after the user has given consent such as with a cookie banner.
- [Element Event Triggers](https://scripts.nuxt.com/docs/guides/script-triggers#element-event-triggers){rel="&#x22;nofollow&#x22;"} - Load scripts based on user interactions such as scrolling, clicking, or form submissions.

In many cases, we're loading third-party scripts from a domain that we don't control. This can lead to a number of issues:

- Privacy: The third-party script can track users across sites.
- Security: The third-party script can be compromised and inject malicious code.
- Performance: Extra DNS lookups will slow down the page load.
- Developer Experience: Consented scripts may be blocked by ad blockers.

To mitigate this, Nuxt Scripts provides a way to bundle third-party scripts into your public directory without any extra work.

The script will now be served from `/_scripts/{hash}` on your own domain.

As we saw, there are many opportunities to improve third-party scripts for developers and end-users.

The initial release of Nuxt Scripts has solved *some* of these issues, but there's still a lot of work ahead of us.

The next items on the roadmap are:

- [Add web worker support (Partytown)](https://github.com/nuxt/scripts/issues/182){rel="&#x22;nofollow&#x22;"}
- [More Live Chat Facade Components](https://github.com/nuxt/scripts/issues/44){rel="&#x22;nofollow&#x22;"}
- [Offload Scripts To Nuxt Server Proxy](https://github.com/nuxt/scripts/issues/87){rel="&#x22;nofollow&#x22;"}
- [Iframe Script Sandboxing](https://github.com/nuxt/scripts/issues/131){rel="&#x22;nofollow&#x22;"}

We'd love to have your contribution and support.

To get started with Nuxt Scripts, we've created a [tutorial](https://scripts.nuxt.com/docs/getting-started/confetti-tutorial){rel="&#x22;nofollow&#x22;"} to help you get up and running.

- [Harlan Wilton - Nuxt](https://github.com/harlan-zw){rel="&#x22;nofollow&#x22;"} (author)
- [Julien Huang - Nuxt](https://github.com/huang-julien){rel="&#x22;nofollow&#x22;"} (contributor)
- [Daniel Roe - Nuxt](https://github.com/danielroe){rel="&#x22;nofollow&#x22;"} (contributor)
- [Chrome Aurora - Google](https://developer.chrome.com/aurora){rel="&#x22;nofollow&#x22;"} (contributor)

And a big thank you to the early contributors.

![Nuxt Scripts Contributors](https://nuxt.com/assets/blog/nuxt-scripts/contributors.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

**Examples:**

Example 1 (ts):
```ts
useHead({ script: [{ src: '/tracker.js', defer: true }] })
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

## Data Fetching

**URL:** llms-txt#data-fetching

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/server"}
::

::sandbox
---
branch: main
dir: examples/features/data-fetching
file: app.vue
repo: nuxt/examples
---
::

---

## EpicMax

**URL:** llms-txt#epicmax

**Contents:**
  - 🚀 Our Services
  - **1. Vue Power Team** — Dedicated Vue/Nuxt experts at your side
  - **2. Vue Power Projects** — End-to-end Vue/Nuxt delivery
  - **3. Vue/Nuxt Code Audit** — Health check for your frontend
  - **4. Consulting from Our CTO** — Strategic Vue/Nuxt expertise on demand

We’re a passionate team of frontend developers, united by our love for coding and open source ❤️

Over the past 8 years, we’ve built **60+ Vue/Nuxt projects** across E-commerce, SaaS, EdTech, and FinTech — and developed our own open-source products: **Vuestic UI** and **Vuestic Admin**.

We’ve seen (and solved) nearly every frontend challenge out there.

We specialize in creating responsive, scalable applications using **Vue**, **Nuxt**, **TypeScript**, and more.

### **1. Vue Power Team** — Dedicated Vue/Nuxt experts at your side

Plug in a seasoned frontend team that feels like part of your own.

- Flexible engagement, predictable monthly costs
- Scale up or down without hiring hassle
- Workflows that adapt to your needs

### **2. Vue Power Projects** — End-to-end Vue/Nuxt delivery

Have a clear scope and deadlines? We’ll handle the rest.

- Fixed timeline and budget — no surprises
- Clean, maintainable code tailored to your business
- Best practices baked in from day one

### **3. Vue/Nuxt Code Audit** — Health check for your frontend

Get a detailed, no-fluff analysis of your existing codebase.

- Identify performance bottlenecks and security risks
- Ensure code quality, scalability, and maintainability
- Actionable report with clear next steps

### **4. Consulting from Our CTO** — Strategic Vue/Nuxt expertise on demand

Work directly with our CTO to level up your frontend game.

- Architecture and scalability guidance
- Workflow improvements and best practices
- Ideal for teams who want to move faster and smarter

Let us help you build something great — or make what you already have even better.

Drop us a line at [**hello@epicmax.co**](mailto\:hello@epicmax.co)

---

## Configuration

**URL:** llms-txt#configuration

**Contents:**
- `nuxt.config`
  - Migration
- Modules
  - Migration
- Directory Changes
- TypeScript
  - Migration
- Vue Changes
- Vuex

The starting point for your Nuxt app remains your `nuxt.config` file.

::note
Nuxt configuration will be loaded using [`unjs/jiti`](https://github.com/unjs/jiti){rel=""nofollow""} and [`unjs/c12`](https://github.com/unjs/c12){rel=""nofollow""}.
::

1. You should migrate to the new `defineNuxtConfig` function that provides a typed configuration schema.

1. If you were using `router.extendRoutes` you can migrate to the new `pages:extend` hook:

1. If you were using `router.routeNameSplitter` you can achieve same result by updating route name generation logic in the new `pages:extend` hook:

Nuxt 3 is an [ESM native framework](https://nuxt.com/docs/3.x/guide/concepts/esm). Although [`unjs/jiti`](https://github.com/unjs/jiti){rel="&#x22;nofollow&#x22;"} provides semi compatibility when loading `nuxt.config` file, avoid any usage of `require` and `module.exports` in this file.

1. Change `module.exports` to `export default`
2. Change `const lib = require('lib')` to `import lib from 'lib'`

#### Async Configuration

In order to make Nuxt loading behavior more predictable, async config syntax is deprecated. Consider using Nuxt hooks for async operations.

Nuxt has built-in support for loading `.env` files. Avoid directly importing it from `nuxt.config`.

Nuxt and Nuxt Modules are now build-time-only.

1. Move all your `buildModules` into `modules`.
2. Check for Nuxt 3 compatibility of modules.
3. If you have any local modules pointing to a directory you should update this to point to the entry file:

::tip
If you are a module author, you can check out [more information about module compatibility](https://nuxt.com/docs/3.x/migration/module-authors) and [our module author guide](https://nuxt.com/docs/3.x/guide/going-further/modules).
::

The `static/` (for storing static assets) has been renamed to `public/`. You can either rename your `static` directory to `public`, or keep the name by setting `dir.public` in your `nuxt.config`.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/public"}
::

It will be much easier to migrate your application if you use Nuxt's TypeScript integration. This does not mean you need to write your application in TypeScript, just that Nuxt will provide automatic type hints for your editor.

You can read more about Nuxt's TypeScript support [in the docs](https://nuxt.com/docs/3.x/guide/concepts/typescript).

::note
Nuxt can type-check your app using [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc){rel=""nofollow""} with `nuxt typecheck` command.
::

1. Create a `tsconfig.json` with the following content:

1. Run `npx nuxt prepare` to generate `.nuxt/tsconfig.json`.
2. Install Volar following the instructions in the [docs](https://nuxt.com/docs/3.x/getting-started/introduction#prerequisites).

There are a number of changes to what is recommended Vue best practice, as well as a number of breaking changes between Vue 2 and 3.

It is recommended to read the [Vue 3 migration guide](https://v3-migration.vuejs.org){rel="&#x22;nofollow&#x22;"} and in particular the [breaking changes list](https://v3-migration.vuejs.org/breaking-changes){rel="&#x22;nofollow&#x22;"}.

It is not currently possible to use the [Vue 3 migration build](https://v3-migration.vuejs.org/migration-build.html){rel="&#x22;nofollow&#x22;"} with Nuxt 3.

Nuxt no longer provides a Vuex integration. Instead, the official Vue recommendation is to use `pinia`, which has built-in Nuxt support via a [Nuxt module](https://pinia.vuejs.org/ssr/nuxt.html){rel="&#x22;nofollow&#x22;"}. [Find out more about pinia here](https://pinia.vuejs.org){rel="&#x22;nofollow&#x22;"}.

A simple way to provide global state management with pinia would be:

Install the [`@pinia/nuxt`](https://nuxt.com/modules/pinia) module:

Enable the module in your nuxt configuration:

Create a `store` folder at the root of your application:

Create a [plugin](https://nuxt.com/docs/3.x/directory-structure/plugins) file to globalize your store:

If you want to keep using Vuex, you can manually migrate to Vuex 4 following [these steps](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html){rel="&#x22;nofollow&#x22;"}.

Once it's done you will need to add the following plugin to your Nuxt app:

For larger apps, this migration can entail a lot of work. If updating Vuex still creates roadblocks, you may want to use the community module: [nuxt3-vuex-module](https://github.com/vedmant/nuxt3-vuex#nuxt3-vuex-module){rel="&#x22;nofollow&#x22;"}, which should work out of the box.

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown
::

1. If you were using `router.extendRoutes` you can migrate to the new `pages:extend` hook:

::code-group
```

Example 3 (unknown):
```unknown

```

Example 4 (unknown):
```unknown
::

1. If you were using `router.routeNameSplitter` you can achieve same result by updating route name generation logic in the new `pages:extend` hook:

::code-group
```

---

## Create a new Nuxt project with Nuxt UI

**URL:** llms-txt#create-a-new-nuxt-project-with-nuxt-ui

**Contents:**
- 🙏 Thank You

npx nuxi@latest init my-app -t ui
bash [pnpm]
pnpm add @nuxt/ui@latest
bash [yarn]
yarn add @nuxt/ui@latest
bash [npm]
npm install @nuxt/ui@latest
bash [bun]
bun add @nuxt/ui@latest
```
::

::warning
If you're using **pnpm**, ensure that you either set [`shamefully-hoist=true`](https://pnpm.io/npmrc#shamefully-hoist){rel=""nofollow""} in your `.npmrc` file or install `tailwindcss` in your project's root directory.
::

Visit our [documentation](https://ui.nuxt.com/getting-started){rel="&#x22;nofollow&#x22;"} to explore all the components and features available in Nuxt UI v3.

This release represents thousands of hours of work from our team and the community. We'd like to thank everyone who contributed to making Nuxt UI v3 a reality.

We're excited to see what you'll build with Nuxt UI v3!

**Examples:**

Example 1 (unknown):
```unknown
::code-group{sync="pm"}
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

## Nuxt 3.11

**URL:** llms-txt#nuxt-3.11

**Contents:**
- 🪵 Better logging
- 🎨 Preview mode
- 💰 Cache-busting payloads
- 👮‍♂️ Middleware `routeRules`
- ⌫ New `clear` data fetching utility
- 🕳️ New `#teleports` target
- 🚦 Loading indicator and transition controls
- 🛍️ Server- and client-only pages
- 🤠 Server component bonanza
- 🔥 Performance improvements

This is possibly the last minor release before Nuxt v4, and so we've packed it full of features and improvements we hope will delight you! ✨

When developing a Nuxt application and using `console.log` in your application, you may have noticed that these logs are not displayed in your browser console when refreshing the page (during server-side rendering). This can be frustrating, as it makes it difficult to debug your application. This is now a thing of the past!

Now, when you have server logs associated with a request, they will be bundled up and passed to the client and displayed in your browser console. [Asynchronous context](https://nodejs.org/docs/latest-v20.x/api/async_context.html){rel="&#x22;nofollow&#x22;"} is used to track and associate these logs with the request that triggered them. ([#25936](https://github.com/nuxt/nuxt/pull/25936){rel="&#x22;nofollow&#x22;"}).

For example, this code:

will now log to your browser console when you refresh the page:

👉 We also plan to support streaming of subsequent logs to the Nuxt DevTools in future.

We've also added a `dev:ssr-logs` hook (both in Nuxt and Nitro) which is called on server and client, allowing you to handle them yourself if you want to.

If you encounter any issues with this, it is possible to disable them - or prevent them from logging to your browser console.

A new `usePreviewMode` composable aims to make it simple to use preview mode in your Nuxt app.

When preview mode is enabled, all your data fetching composables, like `useAsyncData` and `useFetch` will rerun, meaning any cached data in the payload will be bypassed.

::read-more{to="https://nuxt.com/docs/api/composables/use-preview-mode"}
::

## 💰 Cache-busting payloads

We now automatically cache-bust your payloads if you haven't disabled Nuxt's app manifest, meaning you shouldn't be stuck with outdated data after a deployment ([#26068](https://github.com/nuxt/nuxt/pull/26068){rel="&#x22;nofollow&#x22;"}).

## 👮‍♂️ Middleware `routeRules`

It's now possible to define middleware for page paths within the Vue app part of your application (that is, not your Nitro routes) ([#25841](https://github.com/nuxt/nuxt/pull/25841){rel="&#x22;nofollow&#x22;"}).

::read-more{to="https://nuxt.com/docs/guide/concepts/rendering#route-rules"}
::

## ⌫ New `clear` data fetching utility

Now, `useAsyncData` and `useFetch` expose a `clear` utility. This is a function that can be used to set `data` to undefined, set `error` to `null`, set `pending` to `false`, set `status` to `idle`, and mark any currently pending requests as cancelled. ([#26259](https://github.com/nuxt/nuxt/pull/26259){rel="&#x22;nofollow&#x22;"})

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

## 🕳️ New `#teleports` target

Nuxt now includes a new `<div id="teleports"></div>` element in your app within your `<body>` tag. It supports server-side teleports, meaning you can do this safely on the server:

## 🚦 Loading indicator and transition controls

It's now possible to set custom timings for hiding the loading indicator, and forcing the `finish()` method if needed ([#25932](https://github.com/nuxt/nuxt/pull/25932){rel="&#x22;nofollow&#x22;"}).

There's also a new `page:view-transition:start` hook for hooking into the View Transitions API ([#26045](https://github.com/nuxt/nuxt/pull/26045){rel="&#x22;nofollow&#x22;"}) if you have that feature enabled.

## 🛍️ Server- and client-only pages

This release sees server- and client-only pages land in Nuxt! You can now add a `.server.vue` or `.client.vue` suffix to a page to get automatic handling of it.

**Client-only pages** will render entirely on the client-side, and skip server-rendering entirely, just as if the entire page was wrapped in `<ClientOnly>`. Use this responsibly. The flash of load on the client-side can be a bad user experience so make sure you really need to avoid server-side loading. Also consider using `<ClientOnly>` with a `fallback` slot to render a skeleton loader ([#25037](https://github.com/nuxt/nuxt/pull/25037){rel="&#x22;nofollow&#x22;"}).

⚗️ **Server-only pages** are even more useful because they enable you to integrate fully-server rendered HTML within client-side navigation. They will even be prefetched when links to them are in the viewport - so you will get instantaneous loading ([#24954](https://github.com/nuxt/nuxt/pull/24954){rel="&#x22;nofollow&#x22;"}).

## 🤠 Server component bonanza

When you are using server components, you can now use the `nuxt-client` attribute anywhere within your tree ([#25479](https://github.com/nuxt/nuxt/pull/25479){rel="&#x22;nofollow&#x22;"}).

You can listen to an `@error` event from server components that will be triggered if there is any issue loading the component ([#25798](https://github.com/nuxt/nuxt/pull/25798){rel="&#x22;nofollow&#x22;"}).

Finally, server-only components are now smartly enabled when you have a server-only component or a server-only page within your project or any of its layers ([#26223](https://github.com/nuxt/nuxt/pull/26223){rel="&#x22;nofollow&#x22;"}).

::callout{type="warning"}
Server components remain experimental and their API may change, so be careful
before depending on implementation details.
::

## 🔥 Performance improvements

We've shipped a number of performance improvements, including only updating changed virtual templates ([#26250](https://github.com/nuxt/nuxt/pull/26250){rel="&#x22;nofollow&#x22;"}), using a 'layered' prerender cache ([#26104](https://github.com/nuxt/nuxt/pull/26104){rel="&#x22;nofollow&#x22;"}) that falls back to filesystem instead of keeping everything in memory when prerendering - and lots of other examples.

## 📂 Public assets handling

We have shipped a reimplementation of Vite's public asset handling, meaning that public assets in your `public/` directory or your layer directories are now resolved entirely by Nuxt ([#26163](https://github.com/nuxt/nuxt/pull/26163){rel="&#x22;nofollow&#x22;"}), so if you have added `nitro.publicAssets` directories with a custom prefix, these will now work.

We have changed the default `_nuxt/[name].[hash].js` file name pattern for your JS chunks. Now, we default to `_nuxt/[hash].js`. This is to avoid false positives by ad blockers triggering off your component or chunk names, which can be a very difficult issue to debug. ([#26203](https://github.com/nuxt/nuxt/pull/26203){rel="&#x22;nofollow&#x22;"})

You can easily configure this to revert to previous behaviour if you wish:

Previously users with `shamefully-hoist=false` may have encountered issues with types not being resolved or working correctly. You may also have encountered problems with excessive type instantiation.

We now try to tell TypeScript about certain key types so they can be resolved even if deeply nested ([#26158](https://github.com/nuxt/nuxt/pull/26158){rel="&#x22;nofollow&#x22;"}).

There are a whole raft of other type fixes, including some regarding import types ([#26218](https://github.com/nuxt/nuxt/pull/26218){rel="&#x22;nofollow&#x22;"} and [#25965](https://github.com/nuxt/nuxt/pull/25965){rel="&#x22;nofollow&#x22;"}) and module typings ([#25548](https://github.com/nuxt/nuxt/pull/25548){rel="&#x22;nofollow&#x22;"}).

As usual, our recommendation for upgrading Nuxt is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## 👉 Full release notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.11.0
---
Read the full release notes of Nuxt `v3.11.0`.
::

Thank you for reading this far! We hope you enjoy the new release. Please do let us know if you have any feedback or issues.

**Examples:**

Example 1 (unknown):
```unknown
will now log to your browser console when you refresh the page:
```

Example 2 (unknown):
```unknown
👉 We also plan to support streaming of subsequent logs to the Nuxt DevTools in future.

We've also added a `dev:ssr-logs` hook (both in Nuxt and Nitro) which is called on server and client, allowing you to handle them yourself if you want to.

If you encounter any issues with this, it is possible to disable them - or prevent them from logging to your browser console.
```

Example 3 (unknown):
```unknown
## 🎨 Preview mode

A new `usePreviewMode` composable aims to make it simple to use preview mode in your Nuxt app.
```

Example 4 (unknown):
```unknown
When preview mode is enabled, all your data fetching composables, like `useAsyncData` and `useFetch` will rerun, meaning any cached data in the payload will be bypassed.

::read-more{to="https://nuxt.com/docs/api/composables/use-preview-mode"}
::

## 💰 Cache-busting payloads

We now automatically cache-bust your payloads if you haven't disabled Nuxt's app manifest, meaning you shouldn't be stuck with outdated data after a deployment ([#26068](https://github.com/nuxt/nuxt/pull/26068){rel="&#x22;nofollow&#x22;"}).

## 👮‍♂️ Middleware `routeRules`

It's now possible to define middleware for page paths within the Vue app part of your application (that is, not your Nitro routes) ([#25841](https://github.com/nuxt/nuxt/pull/25841){rel="&#x22;nofollow&#x22;"}).
```

---

## useRuntimeHook

**URL:** llms-txt#useruntimehook

**Contents:**
- Usage
  - Parameters
  - Returns
- Example

::important
This composable is available in Nuxt v3.14+.
::

- `name`: The name of the runtime hook to register. You can see the full list of [runtime Nuxt hooks here](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime).
- `fn`: The callback function to execute when the hook is triggered. The function signature varies based on the hook name.

The composable doesn't return a value, but it automatically unregisters the hook when the component's scope is destroyed.

**Examples:**

Example 1 (unknown):
```unknown
## Usage

### Parameters

- `name`: The name of the runtime hook to register. You can see the full list of [runtime Nuxt hooks here](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime).
- `fn`: The callback function to execute when the hook is triggered. The function signature varies based on the hook name.

### Returns

The composable doesn't return a value, but it automatically unregisters the hook when the component's scope is destroyed.

## Example
```

---

## useNuxtApp

**URL:** llms-txt#usenuxtapp

**Contents:**
- Methods
  - `provide (name, value)`
  - `hook(name, cb)`
  - `callHook(name, ...args)`
- Properties
  - `vueApp`
  - `ssrContext`
  - `payload`
  - `isHydrating`
  - `runWithContext`

`useNuxtApp` is a built-in composable that provides a way to access shared runtime context of Nuxt, also known as the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context), which is available on both client and server side (but not within Nitro routes). It helps you access the Vue app instance, runtime hooks, runtime config variables and internal states, such as `ssrContext` and `payload`.

If runtime context is unavailable in your scope, `useNuxtApp` will throw an exception when called. You can use [`tryUseNuxtApp`](https://nuxt.com/#tryusenuxtapp) instead for composables that do not require `nuxtApp`, or to simply check if context is available or not without an exception.

### `provide (name, value)`

`nuxtApp` is a runtime context that you can extend using [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins). Use the `provide` function to create Nuxt plugins to make values and helper methods available in your Nuxt application across all composables and components.

`provide` function accepts `name` and `value` parameters.

As you can see in the example above, `$hello` has become the new and custom part of `nuxtApp` context and it is available in all places where `nuxtApp` is accessible.

Hooks available in `nuxtApp` allows you to customize the runtime aspects of your Nuxt application. You can use runtime hooks in Vue.js composables and [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) to hook into the rendering lifecycle.

`hook` function is useful for adding custom logic by hooking into the rendering lifecycle at a specific point. `hook` function is mostly used when creating Nuxt plugins.

See [Runtime Hooks](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) for available runtime hooks called by Nuxt.

### `callHook(name, ...args)`

`callHook` returns a promise when called with any of the existing hooks.

`useNuxtApp()` exposes the following properties that you can use to extend and customize your app and share state, data and variables.

`vueApp` is the global Vue.js [application instance](https://vuejs.org/api/application.html#application-api){rel="&#x22;nofollow&#x22;"} that you can access through `nuxtApp`.

- [`component()`](https://vuejs.org/api/application.html#app-component){rel="&#x22;nofollow&#x22;"} - Registers a global component if passing both a name string and a component definition, or retrieves an already registered one if only the name is passed.
- [`directive()`](https://vuejs.org/api/application.html#app-directive){rel="&#x22;nofollow&#x22;"} - Registers a global custom directive if passing both a name string and a directive definition, or retrieves an already registered one if only the name is passed[(example)](https://nuxt.com/docs/3.x/directory-structure/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application.html#app-use){rel="&#x22;nofollow&#x22;"&#x7D; - Installs a &#x2A;*[Vue.js Plugin](https://vuejs.org/guide/reusability/plugins.html){rel="&#x22;nofollow&#x22;"}** [(example)](https://nuxt.com/docs/3.x/directory-structure/plugins#vue-plugins).

::read-more
---
icon: i-simple-icons-vuedotjs
to: https://vuejs.org/api/application.html#application-api
---
::

`ssrContext` is generated during server-side rendering and it is only available on the server side.

Nuxt exposes the following properties through `ssrContext`:

- `url` (string) - Current request url.
- `event` ([h3js/h3](https://github.com/h3js/h3){rel="&#x22;nofollow&#x22;"} request event) - Access the request & response of the current route.
- `payload` (object) - NuxtApp payload object.

`payload` exposes data and state variables from server side to client side. The following keys will be available on the client after they have been passed from the server side:

- `serverRendered` (boolean) - Indicates if response is server-side-rendered.
- `data` (object) - When you fetch the data from an API endpoint using either [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) or [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) , resulting payload can be accessed from the `payload.data`. This data is cached and helps you prevent fetching the same data in case an identical request is made more than once.

After fetching the value of `count` using [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) in the example above, if you access `payload.data`, you will see `{ count: 1 }` recorded there.

When accessing the same `payload.data` from [`ssrcontext`](https://nuxt.com/#ssrcontext), you can access the same value on the server side as well.

- `state` (object) - When you use [`useState`](https://nuxt.com/docs/3.x/api/composables/use-state) composable in Nuxt to set shared state, this state data is accessed through `payload.state.[name-of-your-state]`.

It is also possible to use more advanced types, such as `ref`, `reactive`, `shallowRef`, `shallowReactive` and `NuxtError`.

Since [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements){rel="&#x22;nofollow&#x22;"}, it is possible to define your own reducer/reviver for types that are not supported by Nuxt.

::video-accordion
---
title: Watch a video from Alexander Lichter about serializing payloads,
  especially with regards to classes
video-id: 8w6ffRBs8a4
---
::

In the example below, we define a reducer (or a serializer) and a reviver (or deserializer) for the [Luxon](https://moment.github.io/luxon/#/){rel="&#x22;nofollow&#x22;"} DateTime class, using a payload plugin.

Use `nuxtApp.isHydrating` (boolean) to check if the Nuxt app is hydrating on the client side.

::note
You are likely here because you got a "Nuxt instance unavailable" message. Please use this method sparingly, and report examples that are causing issues, so that it can ultimately be solved at the framework level.
::

The `runWithContext` method is meant to be used to call a function and give it an explicit Nuxt context. Typically, the Nuxt context is passed around implicitly and you do not need to worry about this. However, when working with complex `async`/`await` scenarios in middleware/plugins, you can run into instances where the current instance has been unset after an async call.

- `functionWithContext`: Any function that requires the context of the current Nuxt application. This context will be correctly applied automatically.

`runWithContext` will return whatever is returned by `functionWithContext`.

#### A Deeper Explanation of Context

Vue.js Composition API (and Nuxt composables similarly) work by depending on an implicit context. During the lifecycle, Vue sets the temporary instance of the current component (and Nuxt temporary instance of nuxtApp) to a global variable and unsets it in same tick. When rendering on the server side, there are multiple requests from different users and nuxtApp running in a same global context. Because of this, Nuxt and Vue immediately unset this global instance to avoid leaking a shared reference between two users or components.

What it does mean? The Composition API and Nuxt Composables are only available during lifecycle and in same tick before any async operation:

The classic solution to this, is caching the current instance on first call to a local variable like `const instance = getCurrentInstance()` and use it in the next composable call but the issue is that any nested composable calls now needs to explicitly accept the instance as an argument and not depend on the implicit context of composition-api. This is design limitation with composables and not an issue per-se.

To overcome this limitation, Vue does some behind the scenes work when compiling our application code and restores context after each call for `<script setup>`:

For a better description of what Vue actually does, see [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723){rel="&#x22;nofollow&#x22;"}.

This is where `runWithContext` can be used to restore context, similarly to how `<script setup>` works.

Nuxt internally uses [unjs/unctx](https://github.com/unjs/unctx){rel="&#x22;nofollow&#x22;"} to support composables similar to Vue for plugins and middleware. This enables composables like `navigateTo()` to work without directly passing `nuxtApp` to them - bringing the DX and performance benefits of Composition API to the whole Nuxt framework.

Nuxt composables have the same design as the Vue Composition API and therefore need a similar solution to magically do this transform. Check out [unjs/unctx#2](https://github.com/unjs/unctx/issues/2){rel="&#x22;nofollow&#x22;"} (proposal), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4){rel="&#x22;nofollow&#x22;"} (transform implementation), and [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884){rel="&#x22;nofollow&#x22;"} (Integration to Nuxt).

Vue currently only supports async context restoration for `<script setup>` for async/await usage. In Nuxt, the transform support for `defineNuxtPlugin()` and `defineNuxtRouteMiddleware()` was added, which means when you use them Nuxt automatically transforms them with context restoration.

#### Remaining Issues

The `unjs/unctx` transformation to automatically restore context seems buggy with `try/catch` statements containing `await` which ultimately needs to be solved in order to remove the requirement of the workaround suggested above.

#### Native Async Context

Using a new experimental feature, it is possible to enable native async context support using [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage){rel="&#x22;nofollow&#x22;"} and new unctx support to make async context available **natively** to **any nested async composable** without needing a transform or manual passing/calling with context.

::tip
Native async context support works currently in Bun and Node.
::

::read-more
---
to: https://nuxt.com/docs/guide/going-further/experimental-features#asynccontext
---
::

This function works exactly the same as `useNuxtApp`, but returns `null` if context is unavailable instead of throwing an exception.

You can use it for composables that do not require `nuxtApp`, or to simply check if context is available or not without an exception.

**Examples:**

Example 1 (unknown):
```unknown
If runtime context is unavailable in your scope, `useNuxtApp` will throw an exception when called. You can use [`tryUseNuxtApp`](https://nuxt.com/#tryusenuxtapp) instead for composables that do not require `nuxtApp`, or to simply check if context is available or not without an exception.

## Methods

### `provide (name, value)`

`nuxtApp` is a runtime context that you can extend using [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins). Use the `provide` function to create Nuxt plugins to make values and helper methods available in your Nuxt application across all composables and components.

`provide` function accepts `name` and `value` parameters.
```

Example 2 (unknown):
```unknown
As you can see in the example above, `$hello` has become the new and custom part of `nuxtApp` context and it is available in all places where `nuxtApp` is accessible.

### `hook(name, cb)`

Hooks available in `nuxtApp` allows you to customize the runtime aspects of your Nuxt application. You can use runtime hooks in Vue.js composables and [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) to hook into the rendering lifecycle.

`hook` function is useful for adding custom logic by hooking into the rendering lifecycle at a specific point. `hook` function is mostly used when creating Nuxt plugins.

See [Runtime Hooks](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) for available runtime hooks called by Nuxt.
```

Example 3 (unknown):
```unknown
### `callHook(name, ...args)`

`callHook` returns a promise when called with any of the existing hooks.
```

Example 4 (unknown):
```unknown
## Properties

`useNuxtApp()` exposes the following properties that you can use to extend and customize your app and share state, data and variables.

### `vueApp`

`vueApp` is the global Vue.js [application instance](https://vuejs.org/api/application.html#application-api){rel="&#x22;nofollow&#x22;"} that you can access through `nuxtApp`.

Some useful methods:

- [`component()`](https://vuejs.org/api/application.html#app-component){rel="&#x22;nofollow&#x22;"} - Registers a global component if passing both a name string and a component definition, or retrieves an already registered one if only the name is passed.
- [`directive()`](https://vuejs.org/api/application.html#app-directive){rel="&#x22;nofollow&#x22;"} - Registers a global custom directive if passing both a name string and a directive definition, or retrieves an already registered one if only the name is passed[(example)](https://nuxt.com/docs/3.x/directory-structure/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application.html#app-use){rel="&#x22;nofollow&#x22;"&#x7D; - Installs a &#x2A;*[Vue.js Plugin](https://vuejs.org/guide/reusability/plugins.html){rel="&#x22;nofollow&#x22;"}** [(example)](https://nuxt.com/docs/3.x/directory-structure/plugins#vue-plugins).

::read-more
---
icon: i-simple-icons-vuedotjs
to: https://vuejs.org/api/application.html#application-api
---
::

### `ssrContext`

`ssrContext` is generated during server-side rendering and it is only available on the server side.

Nuxt exposes the following properties through `ssrContext`:

- `url` (string) - Current request url.
- `event` ([h3js/h3](https://github.com/h3js/h3){rel="&#x22;nofollow&#x22;"} request event) - Access the request & response of the current route.
- `payload` (object) - NuxtApp payload object.

### `payload`

`payload` exposes data and state variables from server side to client side. The following keys will be available on the client after they have been passed from the server side:

- `serverRendered` (boolean) - Indicates if response is server-side-rendered.
- `data` (object) - When you fetch the data from an API endpoint using either [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) or [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) , resulting payload can be accessed from the `payload.data`. This data is cached and helps you prevent fetching the same data in case an identical request is made more than once.

::code-group
```

---

## nuxt analyze

**URL:** llms-txt#nuxt-analyze

**Contents:**
- Arguments
- Options

The `analyze` command builds Nuxt and analyzes the production bundle (experimental).

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default   | Description                                                                      |
| ---------------------------------- | --------- | -------------------------------------------------------------------------------- |
| `--cwd=<directory>`                |           | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |
| `--logLevel=<silent|info|verbose>` |           | Specify build-time log level                                                     |
| `--dotenv`                         |           | Path to `.env` file to load, relative to the root directory                      |
| `-e, --extends=<layer-name>`       |           | Extend from a Nuxt layer                                                         |
| `--name=<name>`                    | `default` | Name of the analysis                                                             |
| `--no-serve`                       |           | Skip serving the analysis results                                                |

::note
This command sets `process.env.NODE_ENV` to `production`.
::

---

## Import meta

**URL:** llms-txt#import-meta

**Contents:**
- The `import.meta` object
- Runtime (App) Properties
- Builder Properties
- Examples
  - Using `import.meta.url` to resolve files within modules

## The `import.meta` object

With ES modules you can obtain some metadata from the code that imports or compiles your ES-module.
This is done through `import.meta`, which is an object that provides your code with this information.
Throughout the Nuxt documentation you may see snippets that use this already to figure out whether the
code is currently running on the client or server side.

::read-more
---
to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta
---
Read more about `import.meta`.
::

## Runtime (App) Properties

These values are statically injected and can be used for tree-shaking your runtime code.

| Property                | Type    | Description                                                                  |
| ----------------------- | ------- | ---------------------------------------------------------------------------- |
| `import.meta.client`    | boolean | True when evaluated on the client side.                                      |
| `import.meta.browser`   | boolean | True when evaluated on the client side.                                      |
| `import.meta.server`    | boolean | True when evaluated on the server side.                                      |
| `import.meta.nitro`     | boolean | True when evaluated on the server side.                                      |
| `import.meta.dev`       | boolean | True when running the Nuxt dev server.                                       |
| `import.meta.test`      | boolean | True when running in a test context.                                         |
| `import.meta.prerender` | boolean | True when rendering HTML on the server in the prerender stage of your build. |

## Builder Properties

These values are available both in modules and in your `nuxt.config`.

| Property          | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| `import.meta.env` | object | Equals `process.env`                  |
| `import.meta.url` | string | Resolvable path for the current file. |

### Using `import.meta.url` to resolve files within modules

---

## Programmatic Usage

**URL:** llms-txt#programmatic-usage

**Contents:**
- `loadNuxt`
  - Type
  - Parameters
- `buildNuxt`
  - Type
  - Parameters
- `loadNuxtConfig`
  - Type
  - Parameters
- `writeTypes`

Programmatic usage can be helpful when you want to use Nuxt programmatically, for example, when building a [CLI tool](https://github.com/nuxt/cli){rel="&#x22;nofollow&#x22;"} or [test utils](https://github.com/nuxt/test-utils){rel="&#x22;nofollow&#x22;"}.

Load Nuxt programmatically. It will load the Nuxt configuration, instantiate and return the promise with Nuxt instance.

**`loadOptions`**: Loading conditions for Nuxt. `loadNuxt` uses [`c12`](https://github.com/unjs/c12){rel="&#x22;nofollow&#x22;"} under the hood, so it accepts the same options as `c12.loadConfig` with some additional options:

| Property | Type      | Required | Description                                                                                                                                                       |
| -------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`    | `boolean` | `false`  | If set to `true`, Nuxt will be loaded in development mode.                                                                                                        |
| `ready`  | `boolean` | `true`   | If set to `true`, Nuxt will be ready to use after the `loadNuxt` call. If set to `false`, you will need to call `nuxt.ready()` to make sure Nuxt is ready to use. |

Build Nuxt programmatically. It will invoke the builder (currently [@nuxt/vite-builder](https://github.com/nuxt/nuxt/blob/main/packages/vite){rel="&#x22;nofollow&#x22;"} or [@nuxt/webpack-builder](https://github.com/nuxt/nuxt/blob/main/packages/webpack){rel="&#x22;nofollow&#x22;"}) to bundle the application.

**`nuxt`**: Nuxt instance to build. It can be retrieved from the context via `useNuxt()` call.

Load Nuxt configuration. It will return the promise with the configuration object.

**`options`**: Options to pass in [`c12`](https://github.com/unjs/c12#options){rel="&#x22;nofollow&#x22;"} `loadConfig` call.

Generates `tsconfig.json` and writes it to the project buildDir.

**`nuxt`**: Nuxt instance to build. It can be retrieved from the context via `useNuxt()` call.

**Examples:**

Example 1 (ts):
```ts
function loadNuxt (loadOptions?: LoadNuxtOptions): Promise<Nuxt>
```

Example 2 (ts):
```ts
function buildNuxt (nuxt: Nuxt): Promise<any>
```

Example 3 (ts):
```ts
function loadNuxtConfig (options: LoadNuxtConfigOptions): Promise<NuxtOptions>
```

Example 4 (ts):
```ts
function writeTypes (nuxt?: Nuxt): void
```

---

## Styling

**URL:** llms-txt#styling

**Contents:**
- Local Stylesheets
  - Importing Within Components
  - The CSS Property
  - Working With Fonts
  - Stylesheets Distributed Through NPM
- External Stylesheets
  - Dynamically Adding Stylesheets
  - Modifying The Rendered Head With A Nitro Plugin
- Using Preprocessors
  - Preprocessor Workers (Experimental)

Nuxt is highly flexible when it comes to styling. Write your own styles, or reference local and external stylesheets.
You can use CSS preprocessors, CSS frameworks, UI libraries and Nuxt modules to style your application.

If you're writing local stylesheets, the natural place to put them is the [`assets/` directory](https://nuxt.com/docs/3.x/directory-structure/assets).

### Importing Within Components

You can import stylesheets in your pages, layouts and components directly.
You can use a JavaScript import, or a CSS [`@import` statement](https://developer.mozilla.org/en-US/docs/Web/CSS/@import){rel="&#x22;nofollow&#x22;"}.

::tip
The stylesheets will be inlined in the HTML rendered by Nuxt.
::

You can also use the `css` property in the Nuxt configuration.
The natural place for your stylesheets is the [`assets/` directory](https://nuxt.com/docs/3.x/directory-structure/assets). You can then reference its path and Nuxt will include it to all the pages of your application.

::tip
The stylesheets will be inlined in the HTML rendered by Nuxt, injected globally and present in all pages.
::

### Working With Fonts

Place your local fonts files in your `public/` directory, for example in `public/fonts`. You can then reference them in your stylesheets using `url()`.

Then reference your fonts by name in your stylesheets, pages or components:

### Stylesheets Distributed Through NPM

You can also reference stylesheets that are distributed through npm. Let's use the popular `animate.css` library as an example.

::code-group{sync="pm"}

Then you can reference it directly in your pages, layouts and components:

The package can also be referenced as a string in the css property of your Nuxt configuration.

## External Stylesheets

You can include external stylesheets in your application by adding a link element in the head section of your nuxt.config file. You can achieve this result using different methods. Note that local stylesheets can also be included this way.

You can manipulate the head with the [`app.head`](https://nuxt.com/docs/3.x/api/nuxt-config#head) property of your Nuxt configuration:

### Dynamically Adding Stylesheets

You can use the useHead composable to dynamically set a value in your head in your code.

::read-more{to="https://nuxt.com/docs/api/composables/use-head"}
::

Nuxt uses `unhead` under the hood, and you can refer to [its full documentation](https://unhead.unjs.io){rel="&#x22;nofollow&#x22;"}.

### Modifying The Rendered Head With A Nitro Plugin

If you need more advanced control, you can intercept the rendered html with a hook and modify the head programmatically.

Create a plugin in `~/server/plugins/my-plugin.ts` like this:

External stylesheets are render-blocking resources: they must be loaded and processed before the browser renders the page. Web pages that contain unnecessarily large styles take longer to render. You can read more about it on [web.dev](https://web.dev/defer-non-critical-css){rel="&#x22;nofollow&#x22;"}.

## Using Preprocessors

To use a preprocessor like SCSS, Sass, Less or Stylus, install it first.

The natural place to write your stylesheets is the `assets` directory.
You can then import your source files in your `app.vue` (or layouts files) using your preprocessor's syntax.

Alternatively, you can use the `css` property of your Nuxt configuration.

::tip
In both cases, the compiled stylesheets will be inlined in the HTML rendered by Nuxt.
::

If you need to inject code in pre-processed files, like a [Sass partial](https://sass-lang.com/documentation/at-rules/use#partials){rel="&#x22;nofollow&#x22;"} with color variables, you can do so with the Vite [preprocessors options](https://vite.dev/config/shared-options.html#css-preprocessoroptions){rel="&#x22;nofollow&#x22;"}.

Create some partials in your `assets` directory:

::code-group{sync="preprocessor"}

Then in your `nuxt.config` :

Nuxt uses Vite by default. If you wish to use webpack instead, refer to each preprocessor loader [documentation](https://webpack.js.org/loaders/sass-loader){rel="&#x22;nofollow&#x22;"}.

### Preprocessor Workers (Experimental)

Vite has made available an [experimental option](https://vite.dev/config/shared-options.html#css-preprocessormaxworkers){rel="&#x22;nofollow&#x22;"} which can speed up using preprocessors.

You can enable this in your `nuxt.config`:

::note
This is an experimental option and you should refer to the Vite documentation and [provide feedback](https://github.com/vitejs/vite/discussions/15835){rel=""nofollow""}.
::

## Single File Components (SFC) Styling

One of the best things about Vue and SFC is how great it is at naturally dealing with styling. You can directly write CSS or preprocessor code in the style block of your components file, therefore you will have fantastic developer experience without having to use something like CSS-in-JS. However if you wish to use CSS-in-JS, you can find 3rd party libraries and modules that support it, such as [pinceau](https://github.com/Tahul/pinceau){rel="&#x22;nofollow&#x22;"}.

You can refer to the [Vue docs](https://vuejs.org/api/sfc-css-features.html){rel="&#x22;nofollow&#x22;"} for a comprehensive reference about styling components in SFC.

### Class And Style Bindings

You can leverage Vue SFC features to style your components with class and style attributes.

Refer to the [Vue docs](https://vuejs.org/guide/essentials/class-and-style.html){rel="&#x22;nofollow&#x22;"} for more information.

### Dynamic Styles With `v-bind`

You can reference JavaScript variable and expression within your style blocks with the v-bind function.
The binding will be dynamic, meaning that if the variable value changes, the style will be updated.

The scoped attribute allows you to style components in isolation. The styles declared with this attribute will only apply to this component.

You can use [CSS Modules](https://github.com/css-modules/css-modules){rel="&#x22;nofollow&#x22;"} with the module attribute. Access it with the injected `$style` variable.

### Preprocessors Support

SFC style blocks support preprocessor syntax. Vite comes with built-in support for .scss, .sass, .less, .styl and .stylus files without configuration. You just need to install them first, and they will be available directly in SFC with the lang attribute.

You can refer to the [Vite CSS docs](https://vite.dev/guide/features.html#css){rel="&#x22;nofollow&#x22;"} and the [@vitejs/plugin-vue docs](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue){rel="&#x22;nofollow&#x22;"}.
For webpack users, refer to the [vue loader docs](https://vue-loader.vuejs.org){rel="&#x22;nofollow&#x22;"}.

Nuxt comes with postcss built-in. You can configure it in your `nuxt.config` file.

For proper syntax highlighting in SFC, you can use the postcss lang attribute.

By default, Nuxt comes with the following plugins already pre-configured:

- [postcss-import](https://github.com/postcss/postcss-import){rel="&#x22;nofollow&#x22;"}: Improves the `@import` rule
- [postcss-url](https://github.com/postcss/postcss-url){rel="&#x22;nofollow&#x22;"}: Transforms `url()` statements
- [autoprefixer](https://github.com/postcss/autoprefixer){rel="&#x22;nofollow&#x22;"}: Automatically adds vendor prefixes
- [cssnano](https://cssnano.github.io/cssnano){rel="&#x22;nofollow&#x22;"}: Minification and purge

## Leveraging Layouts For Multiple Styles

If you need to style different parts of your application completely differently, you can use layouts.
Use different styles for different layouts.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
::

## Third Party Libraries And Modules

Nuxt isn't opinionated when it comes to styling and provides you with a wide variety of options. You can use any styling tool that you want, such as popular libraries like [UnoCSS](https://unocss.dev){rel="&#x22;nofollow&#x22;"} or [Tailwind CSS](https://tailwindcss.com){rel="&#x22;nofollow&#x22;"}.

The community and the Nuxt team have developed plenty of Nuxt modules to make the integration easier.
You can discover them on the [modules section](https://nuxt.com/modules) of the website.
Here are a few modules to help you get started:

- [UnoCSS](https://nuxt.com/modules/unocss): Instant on-demand atomic CSS engine
- [Tailwind CSS](https://nuxt.com/modules/tailwindcss): Utility-first CSS framework
- [Fontaine](https://github.com/nuxt-modules/fontaine){rel="&#x22;nofollow&#x22;"}: Font metric fallback
- [Pinceau](https://github.com/Tahul/pinceau){rel="&#x22;nofollow&#x22;"}: Adaptable styling framework
- [Nuxt UI](https://ui.nuxt.com){rel="&#x22;nofollow&#x22;"}: A UI Library for Modern Web Apps
- [Panda CSS](https://panda-css.com/docs/installation/nuxt){rel="&#x22;nofollow&#x22;"}: CSS-in-JS engine that generates atomic CSS at build time

Nuxt modules provide you with a good developer experience out of the box, but remember that if your favorite tool doesn't have a module, it doesn't mean that you can't use it with Nuxt! You can configure it yourself for your own project. Depending on the tool, you might need to use a [Nuxt plugin](https://nuxt.com/docs/3.x/directory-structure/plugins) and/or [make your own module](https://nuxt.com/docs/3.x/guide/going-further/modules). Share them with the [community](https://nuxt.com/modules) if you do!

### Easily Load Webfonts

You can use [the Nuxt Google Fonts module](https://github.com/nuxt-modules/google-fonts){rel="&#x22;nofollow&#x22;"} to load Google Fonts.

If you are using [UnoCSS](https://unocss.dev/integrations/nuxt){rel="&#x22;nofollow&#x22;"}, note that it comes with a [web fonts presets](https://unocss.dev/presets/web-fonts){rel="&#x22;nofollow&#x22;"} to conveniently load fonts from common providers, including Google Fonts and more.

Nuxt comes with the same `<Transition>` element that Vue has, and also has support for the experimental [View Transitions API](https://nuxt.com/docs/3.x/getting-started/transitions#view-transitions-api-experimental).

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

### Font Advanced Optimization

We would recommend using [Fontaine](https://github.com/nuxt-modules/fontaine){rel="&#x22;nofollow&#x22;"} to reduce your [CLS](https://web.dev/cls){rel="&#x22;nofollow&#x22;"}. If you need something more advanced, consider creating a Nuxt module to extend the build process or the Nuxt runtime.

::tip
Always remember to take advantage of the various tools and techniques available in the Web ecosystem at large to make styling your application easier and more efficient. Whether you're using native CSS, a preprocessor, postcss, a UI library or a module, Nuxt has got you covered. Happy styling!
::

### LCP Advanced Optimizations

You can do the following to speed-up the download of your global CSS files:

- Use a CDN so the files are physically closer to your users
- Compress your assets, ideally using Brotli
- Use HTTP2/HTTP3 for delivery
- Host your assets on the same domain (do not use a different subdomain)

Most of these things should be done for you automatically if you're using modern platforms like Cloudflare, Netlify or Vercel.
You can find an LCP optimization guide on [web.dev](https://web.dev/optimize-lcp){rel="&#x22;nofollow&#x22;"}.

If all of your CSS is inlined by Nuxt, you can (experimentally) completely stop external CSS files from being referenced in your rendered HTML.
You can achieve that with a hook, that you can place in a module, or in your Nuxt configuration file.

**Examples:**

Example 1 (unknown):
```unknown
::tip
The stylesheets will be inlined in the HTML rendered by Nuxt.
::

### The CSS Property

You can also use the `css` property in the Nuxt configuration.
The natural place for your stylesheets is the [`assets/` directory](https://nuxt.com/docs/3.x/directory-structure/assets). You can then reference its path and Nuxt will include it to all the pages of your application.
```

Example 2 (unknown):
```unknown
::tip
The stylesheets will be inlined in the HTML rendered by Nuxt, injected globally and present in all pages.
::

### Working With Fonts

Place your local fonts files in your `public/` directory, for example in `public/fonts`. You can then reference them in your stylesheets using `url()`.
```

Example 3 (unknown):
```unknown
Then reference your fonts by name in your stylesheets, pages or components:
```

Example 4 (unknown):
```unknown
### Stylesheets Distributed Through NPM

You can also reference stylesheets that are distributed through npm. Let's use the popular `animate.css` library as an example.

::code-group{sync="pm"}
```

---

## Nuxt 3.8

**URL:** llms-txt#nuxt-3.8

**Contents:**
  - 💻 CLI Improvements
  - ✨ Built-in Nuxt DevTools
  - 📸 Nuxt Image Auto-install
  - 📂 Deeper Layout Scanning
  - 📊 App Manifest
  - 🤝 Scope and Context Improvements
  - 🔗 NuxtLink Defaults
  - ⚡️ Data Fetching Improvements
  - 🔢 Layer Improvements
  - 😴 Nightly Release Channel

### 💻 CLI Improvements

Just to remind you, we're now using [the new Nuxt CLI](https://github.com/nuxt/cli){rel="&#x22;nofollow&#x22;"} which is now versioned separately.

::tip
You can now install a module with `nuxi module add <module-name>`
::

::note{icon="i-lucide-rocket"}
We now share the same port with the Vite websocket, meaning better support for docker containers in development.
::

::read-more
---
color: gray
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/cli/releases/tag/v3.9.0
---
Read the Nuxt CLI `v3.9.0` release notes.
::

### ✨ Built-in Nuxt DevTools

Nuxt DevTools v1.0.0 is out and we now think it's ready to be shipped as a direct dependency of Nuxt.

::read-more
---
color: gray
icon: i-simple-icons-github
to: https://nuxt.com/blog/nuxt-devtools-v1-0
---
Check out Nuxt DevTools v1.0 announcement.
::

### 📸 Nuxt Image Auto-install

[`<NuxtImg>`](https://nuxt.com/docs/api/components/nuxt-img) and [`<NuxtPicture>`](https://nuxt.com/docs/api/components/nuxt-picture) first-class built-in components.

We now auto-installing `@nuxt/image` the first time that they are used ([#23717](https://github.com/nuxt/nuxt/pull/23717){rel="&#x22;nofollow&#x22;"}).

:video{.rounded.dark:border.dark:border-gray-700 controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1697721767/nuxt3/nuxt-image-auto-install_uqkptq.jpg"}

::tip
We advise using [`@nuxt/image`](https://image.nuxt.com){rel=""nofollow""} if you're using images in your site; it can apply optimisations to make your site more performant.
::

### 📂 Deeper Layout Scanning

::caution
This is a behaviour change so do take care with this one.
::

We now support scanning layouts within subfolders in [`~/layouts`](https://nuxt.com/docs/guide/directory-structure/layouts) in the same way as we do with [`~/components`](https://nuxt.com/docs/guide/directory-structure/components).

| File                             | Layout name       |
| -------------------------------- | ----------------- |
| \~/layouts/desktop/default.vue   | 'desktop-default' |
| \~/layouts/desktop-base/base.vue | 'desktop-base'    |
| \~/layouts/desktop/index.vue     | 'desktop'         |

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/layouts#named-layout
---
Read more about **Named Layouts**.
::

We now support a built-in app manifest (see [PR #21641](https://github.com/nuxt/nuxt/pull/21641){rel="&#x22;nofollow&#x22;"}), which generates a manifest at `/_nuxt/builds/meta/<buildId>.json`.

It enables loading payloads **only for prerendered routes**, if a site is generated with `nuxt generate`, preventing 404s in the console.

It also enables **client-side route rules**. Only `redirect` route rules is supported for now; they will now redirect when performing client-side navigation.

::tip{icon="i-lucide-rocket"}
The app manifest also enables future enhancements including detection of a new deployment by checking `/_nuxt/builds/latest.json`.
::

::note
You can **opt-on from this behaviour if you need to** by setting `experimental.appManifest` to `false` in your `nuxt.config.ts` file.
::

### 🤝 Scope and Context Improvements

We now define a 'scope' for Nuxt composables executed in plugins ([#23667](https://github.com/nuxt/nuxt/pull/23667){rel="&#x22;nofollow&#x22;"}), which allows running synchronous cleanup before navigating away from your site, using the Vue [`onScopeDispose`](https://vuejs.org/api/reactivity-advanced.html#onscopedispose){rel="&#x22;nofollow&#x22;"} lifecycle method.

::note
This should fix an edge case with cookies ([#23697](https://github.com/nuxt/nuxt/pull/23697){rel=""nofollow""}) and also improves memory management such as Pinia stores ([#23650](https://github.com/nuxt/nuxt/issues/23650){rel=""nofollow""}).
::

::read-more
---
icon: i-simple-icons-vuedotjs
target: _blank
to: https://vuejs.org/api/reactivity-advanced.html#effectscope
---
Read more about Vue effect scopes.
::

We also now support [**native async context**](https://nodejs.org/api/async_context.html){rel="&#x22;nofollow&#x22;"} for the *Vue composition API* ([#23526](https://github.com/nuxt/nuxt/pull/23526){rel="&#x22;nofollow&#x22;"}). In case you're unaware, we support native async context on Node and Bun, enabled with [`experimental.asyncContext`](https://nuxt.com/docs/guide/going-further/experimental-features#asynccontext).

If you experience issues with `Nuxt instance unavailable`, enabling this option may solve your issues:

::note
Once we have cross-runtime support, we will enable it by default.
::

### 🔗 NuxtLink Defaults

You can define your own [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) components with the [`defineNuxtLink`](https://nuxt.com/docs/api/components/nuxt-link#definenuxtlink-signature) utility.

Today, you can cutomize the options for the built-in [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), directly in your `nuxt.config.ts` file ([#23724](https://github.com/nuxt/nuxt/pull/23724){rel="&#x22;nofollow&#x22;"}).

This can enable you to enforce trailing slash behaviour across your entire site, for example:

### ⚡️ Data Fetching Improvements

We have two very significant new features for [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch):

1. You can now set `deep: false` to prevent deep reactivity on the `data` object returned from these composables ([#23600](https://github.com/nuxt/nuxt/pull/23600){rel="&#x22;nofollow&#x22;"}). It should be a performance improvement if you are returning large arrays or objects. The object will still update when refetched; it just won't trigger reactive effects if you change a property deep within the `data`.
2. You can now use the `getCachedData` option to handle custom caching for these composables ([#20747](https://github.com/nuxt/nuxt/pull/20747){rel="&#x22;nofollow&#x22;"})

::video-accordion
---
title: Watch the video from Alexander Lichter about Client-side caching with
  getCachedData.
video-id: aQPR0xn-MMk
---
::

We also support configuring some default values for these composables in an app-wide way ([#23725](https://github.com/nuxt/nuxt/pull/20747){rel="&#x22;nofollow&#x22;"}):

### 🔢 Layer Improvements

We now more carefully load layer plugins ([#22889](https://github.com/nuxt/nuxt/pull/22889){rel="&#x22;nofollow&#x22;"} and [#23148](https://github.com/nuxt/nuxt/pull/23148){rel="&#x22;nofollow&#x22;"}) and middleware ([#22925](https://github.com/nuxt/nuxt/pull/22925){rel="&#x22;nofollow&#x22;"} and [#23552](https://github.com/nuxt/nuxt/pull/23552){rel="&#x22;nofollow&#x22;"}) in the order of the layers, always loading your own plugins and middleware last. This should mean you can rely on utilities that layers may inject.

And probably one of the most significant changes - if you are using remote layers we now clone these within your [`node_modules/`](https://nuxt.com/docs/guide/directory-structure/node_modules) folder ([#109](https://github.com/unjs/c12/pull/109){rel="&#x22;nofollow&#x22;"}) so layers can use dependencies with your project. See [`c12` release notes](https://github.com/unjs/c12/releases/tag/v1.5.1){rel="&#x22;nofollow&#x22;"} for full details.

::tip{icon="i-lucide-check-circle"}
We've also added a test suite to cover these layer resolution changes.
::

### 😴 Nightly Release Channel

Every commit to the `main` branch of Nuxt is automatically deployed to a new release, for easier testing before releases. We've renamed this from the 'edge release channel' to the 'nightly release channel' to avoid confusion with *edge deployments*. And probably also with Microsoft Edge (though I haven't heard that anyone was confused with that one!)

- `nuxt3` is now `nuxt-nightly`
- `nuxi-edge` is now `nuxi-nightly`
- `@​nuxt/kit-edge` is now `@​nuxt/kit-nightly`
- ... and so on.

::read-more
---
to: https://nuxt.com/docs/guide/going-further/nightly-release-channel#nightly-release-channel
---
Read more about the **Nighly Release Channel**.
::

Nitro v2.7 has been released with lots of improvements and bug fixes.

::tip{icon="i-lucide-rocket"}
🔥 One of the most significant is that we now save **40% of bundle size in production** by using native `fetch` supported in Node 18+ ([#1724](https://github.com/unjs/nitro/pull/1724){rel=""nofollow""}). So if possible, we'd recommend you update your Node version to at least 18.
::

::read-more
---
color: gray
icon: i-simple-icons-github
target: _blank
to: https://github.com/unjs/nitro/releases/tag/v2.7.0
---
Check out Nitro v2.7 release note.
::

### 💪 Type Import Changes

::warning
This is likely to need code changes in your project.
::

Vue requires that type imports be explicit (so that the Vue compiler can correctly optimise and resolve type imports for props and so on). See [core Vue `tsconfig.json`](https://github.com/vuejs/tsconfig/blob/main/tsconfig.json#L30-L33){rel="&#x22;nofollow&#x22;"}.

We've therefore taken the decision to turn on `verbatimModuleSyntax` by default in Nuxt projects, which will throw a type error if types are imported without an explicit `type` import. To resolve it you will need to update your imports:

You may also encounter modules in the Nuxt ecosystem that need to be updated; please open an issue for those modules. I'm also very happy to help if you're encountering any problems with this, if you're a module author. Just tag me and I'll take a look.

If for whatever reason you need to undo this change in your project you can set the following configuration:

However, we'd recommend only doing that temporarily, as Vue does need this option to be set for best results.

As usual, our recommendation for upgrading is to run:

## Full Release Notes

::read-more
---
color: gray
icon: i-simple-icons-github
to: https://github.com/nuxt/nuxt/releases/tag/v3.8.0
---
Read the full release notes of Nuxt `v3.8.0`.
::

Thank you for reading this far! We hope you enjoy the new release. Please do let us know if you have any feedback or issues.

**Examples:**

Example 1 (unknown):
```unknown

```

Example 2 (unknown):
```unknown
::

::tip{icon="i-lucide-rocket"}
The app manifest also enables future enhancements including detection of a new deployment by checking `/_nuxt/builds/latest.json`.
::

::note
You can **opt-on from this behaviour if you need to** by setting `experimental.appManifest` to `false` in your `nuxt.config.ts` file.
::

### 🤝 Scope and Context Improvements

We now define a 'scope' for Nuxt composables executed in plugins ([#23667](https://github.com/nuxt/nuxt/pull/23667){rel="&#x22;nofollow&#x22;"}), which allows running synchronous cleanup before navigating away from your site, using the Vue [`onScopeDispose`](https://vuejs.org/api/reactivity-advanced.html#onscopedispose){rel="&#x22;nofollow&#x22;"} lifecycle method.

::note
This should fix an edge case with cookies ([#23697](https://github.com/nuxt/nuxt/pull/23697){rel=""nofollow""}) and also improves memory management such as Pinia stores ([#23650](https://github.com/nuxt/nuxt/issues/23650){rel=""nofollow""}).
::

::read-more
---
icon: i-simple-icons-vuedotjs
target: _blank
to: https://vuejs.org/api/reactivity-advanced.html#effectscope
---
Read more about Vue effect scopes.
::

We also now support [**native async context**](https://nodejs.org/api/async_context.html){rel="&#x22;nofollow&#x22;"} for the *Vue composition API* ([#23526](https://github.com/nuxt/nuxt/pull/23526){rel="&#x22;nofollow&#x22;"}). In case you're unaware, we support native async context on Node and Bun, enabled with [`experimental.asyncContext`](https://nuxt.com/docs/guide/going-further/experimental-features#asynccontext).

If you experience issues with `Nuxt instance unavailable`, enabling this option may solve your issues:
```

Example 3 (unknown):
```unknown
::note
Once we have cross-runtime support, we will enable it by default.
::

### 🔗 NuxtLink Defaults

You can define your own [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) components with the [`defineNuxtLink`](https://nuxt.com/docs/api/components/nuxt-link#definenuxtlink-signature) utility.

Today, you can cutomize the options for the built-in [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), directly in your `nuxt.config.ts` file ([#23724](https://github.com/nuxt/nuxt/pull/23724){rel="&#x22;nofollow&#x22;"}).

This can enable you to enforce trailing slash behaviour across your entire site, for example:
```

Example 4 (unknown):
```unknown
### ⚡️ Data Fetching Improvements

We have two very significant new features for [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch):

1. You can now set `deep: false` to prevent deep reactivity on the `data` object returned from these composables ([#23600](https://github.com/nuxt/nuxt/pull/23600){rel="&#x22;nofollow&#x22;"}). It should be a performance improvement if you are returning large arrays or objects. The object will still update when refetched; it just won't trigger reactive effects if you change a property deep within the `data`.
2. You can now use the `getCachedData` option to handle custom caching for these composables ([#20747](https://github.com/nuxt/nuxt/pull/20747){rel="&#x22;nofollow&#x22;"})
```

---

## refreshCookie

**URL:** llms-txt#refreshcookie

**Contents:**
- Purpose
- Usage
- Type

::important
This utility is available since [Nuxt v3.10](https://nuxt.com/blog/v3-10).
::

The `refreshCookie` function is designed to refresh cookie value returned by `useCookie`.

This is useful for updating the `useCookie` ref when we know the new cookie value has been set in the browser.

::note
---
to: https://nuxt.com/docs/3.x/guide/going-further/experimental-features#cookiestore
---
Since [Nuxt v3.12.0](https://github.com/nuxt/nuxt/releases/tag/v3.12.0){rel=""nofollow""}, the experimental `cookieStore` option is enabled by default. It automatically refreshes the `useCookie` value when cookies change in the browser.
::

**Examples:**

Example 1 (unknown):
```unknown
::note
---
to: https://nuxt.com/docs/3.x/guide/going-further/experimental-features#cookiestore
---
Since [Nuxt v3.12.0](https://github.com/nuxt/nuxt/releases/tag/v3.12.0){rel=""nofollow""}, the experimental `cookieStore` option is enabled by default. It automatically refreshes the `useCookie` value when cookies change in the browser.
::

## Type
```

---

## Nuxt MCP Server

**URL:** llms-txt#nuxt-mcp-server

**Contents:**
- What is MCP?
- Resources
- Tools
  - Documentation
  - Blog
  - Deployment
- Prompts
- Setup
  - ChatGPT
  - Claude Code

MCP (Model Context Protocol) is a standardized protocol that enables AI assistants to access external data sources and tools. Nuxt provides an MCP server that allows AI assistants like Claude Code, Cursor, and Windsurf to access documentation, blog posts, and deployment guides directly.

The MCP server provides structured access to the Nuxt documentation, making it easy for AI tools to understand and assist with Nuxt development.

The Nuxt MCP server provides the following resources for discovery:

- **`resource://nuxt-com/documentation-pages`**: Browse all available documentation pages (defaults to v4.x)
- **`resource://nuxt-com/blog-posts`**: Browse all Nuxt blog posts including releases and tutorials
- **`resource://nuxt-com/deploy-providers`**: Browse all deployment providers and hosting platforms

You're able to access these resources with tools like Claude Code by using `@`.

The Nuxt MCP server provides the following tools organized by category:

- **`list_documentation_pages`**: Lists all available Nuxt documentation pages with their categories and basic information. Supports version filtering (3.x, 4.x, or all)
- **`get_documentation_page`**: Retrieves documentation page content and details by path
- **`get_getting_started_guide`**: Gets the getting started guide for a specific Nuxt version

- **`list_blog_posts`**: Lists all Nuxt blog posts with metadata including dates, categories, and tags
- **`get_blog_post`**: Retrieves blog post content and details by path

- **`list_deploy_providers`**: Lists all deployment providers and hosting platforms for Nuxt applications
- **`get_deploy_provider`**: Retrieves deployment provider details and instructions by path

The Nuxt MCP server provides guided prompts for common workflows:

- **`find_documentation_for_topic`**: Find the best Nuxt documentation for a specific topic or feature
- **`deployment_guide`**: Get deployment instructions for a specific hosting provider
- **`migration_help`**: Get help with migrating between Nuxt versions

You're able to access these resources with tools like Claude Code by using `/`.

The Nuxt MCP server uses HTTP transport and can be installed in different AI assistants.

::note{icon="i-lucide-info"}
**Custom connectors using MCP are available on ChatGPT for Pro and Plus accounts** on the web.
::

Follow these steps to set up Nuxt as a connector within ChatGPT:

1. **Enable Developer mode:**

- Go to Settings → Connectors → Advanced settings → Developer mode
2. **Open ChatGPT settings**
3. **In the Connectors tab, Create a new connector:**

- Give it a name: `Nuxt`
   - MCP server URL: `https://nuxt.com/mcp`
   - Authentication: `None`
4. **Click Create**

The Nuxt connector will appear in the composer's "Developer mode" tool later during conversations.

::note{icon="i-lucide-info"}
**Ensure Claude Code is installed** - Visit [Anthropic's documentation](https://docs.claude.com/en/docs/claude-code/quickstart){rel=""nofollow""} for installation instructions.
::

Add the server using the CLI command:

Click the button below to install the Nuxt MCP server directly in Cursor:

::u-button
---
color: neutral
icon: i-custom-cursor
label: Install MCP Server
to: cursor://anysphere.cursor-deeplink/mcp/install?name=nuxt&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbnV4dC5jb20vbWNwIn0%3D
---
::

For manual setup, follow these steps:

1. Open Cursor and go to "Settings" > "Tools & MCP"
2. Add the Nuxt MCP server configuration

Or manually create/update `.cursor/mcp.json` in your project root:

1. Navigate to "Intelligence" > "Connectors"
2. Click on "Add Connector" button, then select "Custom MCP Connector"
3. Create your Custom MCP Connector:

- Connector Name : `Nuxt`
   - Connector Server : `https://nuxt.com/mcp`

### Visual Studio Code

::note{icon="i-lucide-info"}
**Install required extensions** - Ensure you have [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot){rel=""nofollow""} and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat){rel=""nofollow""} extensions installed.
::

1. Open VS Code and access the Command Palette (Ctrl/Cmd + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)" and select it
3. Navigate to your project's `.vscode` folder or create one if it doesn't exist
4. Create or edit the `mcp.json` file with the following configuration:

### GitHub Copilot Agent

::note{icon="i-lucide-info"}
**Repository administrator access required** to configure MCP servers for GitHub Copilot coding agent.
::

If you have already configured MCP servers in VS Code (replace the `servers` key with `mcpServers` for GitHub Copilot Agent), you can leverage a similar configuration for GitHub Copilot coding agent. You will need to add a `tools` key specifying which tools are available to Copilot.

1. Navigate to your GitHub repository
2. Go to **Settings** > **Code & automation** > **Copilot** > **Coding agent**
3. In the **MCP configuration** section, add the following configuration:

#### Validating the Configuration

To verify the MCP server is configured correctly:

1. Create an issue in your repository and assign it to Copilot
2. Wait for Copilot to create a pull request
3. In the pull request, click **View session** in the "Copilot started work" timeline event
4. Click the ellipsis button (&#x2A;*...**) at the top right, then click **Copilot** in the sidebar
5. Expand the **Start MCP Servers** step to see the configured Nuxt tools

For more information on using MCP with GitHub Copilot coding agent, see [Extend coding agent with MCP](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp){rel="&#x22;nofollow&#x22;"}.

1. Open Windsurf and navigate to "Settings" > "Windsurf Settings" > "Cascade"
2. Click the "Manage MCPs" button, then select the "View raw config" option
3. Add the following configuration to your MCP settings:

1. Open Zed and go to "Settings" > "Open Settings"
2. Navigate to the JSON settings file
3. Add the following context server configuration to your settings:

1. In your project root, create `opencode.json`
2. Add the following configuration:

Once configured, you can ask your AI assistant questions like:

- "List all available Nuxt documentation pages"
- "Get the introduction documentation"
- "What's the difference between v3 and v4?"
- "How do I deploy to Vercel?"
- "Show me the latest blog posts"
- "Help me migrate from Nuxt 3 to Nuxt 4"
- "Search documentation about composables"
- "Find deployment guides for Cloudflare"

The AI assistant will use the MCP server to fetch structured JSON data and provide guided assistance for Nuxt development.

**Examples:**

Example 1 (bash):
```bash
claude mcp add --transport http nuxt-remote https://nuxt.com/mcp
```

Example 2 (unknown):
```unknown
### Le Chat Mistral

1. Navigate to "Intelligence" > "Connectors"
2. Click on "Add Connector" button, then select "Custom MCP Connector"
3. Create your Custom MCP Connector:


   - Connector Name : `Nuxt`
   - Connector Server : `https://nuxt.com/mcp`

### Visual Studio Code

::note{icon="i-lucide-info"}
**Install required extensions** - Ensure you have [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot){rel=""nofollow""} and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat){rel=""nofollow""} extensions installed.
::

1. Open VS Code and access the Command Palette (Ctrl/Cmd + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)" and select it
3. Navigate to your project's `.vscode` folder or create one if it doesn't exist
4. Create or edit the `mcp.json` file with the following configuration:
```

Example 3 (unknown):
```unknown
### GitHub Copilot Agent

::note{icon="i-lucide-info"}
**Repository administrator access required** to configure MCP servers for GitHub Copilot coding agent.
::

If you have already configured MCP servers in VS Code (replace the `servers` key with `mcpServers` for GitHub Copilot Agent), you can leverage a similar configuration for GitHub Copilot coding agent. You will need to add a `tools` key specifying which tools are available to Copilot.

1. Navigate to your GitHub repository
2. Go to **Settings** > **Code & automation** > **Copilot** > **Coding agent**
3. In the **MCP configuration** section, add the following configuration:
```

Example 4 (unknown):
```unknown
4. Click **Save**

#### Validating the Configuration

To verify the MCP server is configured correctly:

1. Create an issue in your repository and assign it to Copilot
2. Wait for Copilot to create a pull request
3. In the pull request, click **View session** in the "Copilot started work" timeline event
4. Click the ellipsis button (&#x2A;*...**) at the top right, then click **Copilot** in the sidebar
5. Expand the **Start MCP Servers** step to see the configured Nuxt tools

For more information on using MCP with GitHub Copilot coding agent, see [Extend coding agent with MCP](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp){rel="&#x22;nofollow&#x22;"}.

### Windsurf

1. Open Windsurf and navigate to "Settings" > "Windsurf Settings" > "Cascade"
2. Click the "Manage MCPs" button, then select the "View raw config" option
3. Add the following configuration to your MCP settings:
```

---

## Generates `layouts/custom.vue`

**URL:** llms-txt#generates-`layouts/custom.vue`

**Contents:**
- `nuxt add plugin`

npx nuxt add layout custom
bash [Terminal]

**Examples:**

Example 1 (unknown):
```unknown
## `nuxt add plugin`

- Modifier flags: `--mode client|server` or `--client`or `--server`
```

---

## app.vue

**URL:** llms-txt#app.vue

**Contents:**
- Usage
  - Minimal Usage
  - Usage with Pages
  - Usage with Layouts

::tip
If you have a `pages/` directory, the `app.vue` file is optional. Nuxt will automatically include a default `app.vue`, but you can still add your own to customize the structure and content as needed.
::

With Nuxt, the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory is optional. If it is not present, Nuxt will not include the [vue-router](https://router.vuejs.org){rel="&#x22;nofollow&#x22;"} dependency. This is useful when building a landing page or an application that does not require routing.

::link-example{to="https://nuxt.com/docs/examples/hello-world"}
::

When you have a [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory, you need to use the [`<NuxtPage>`](https://nuxt.com/docs/3.x/api/components/nuxt-page) component to display the current page:

You can also define the common structure of your application directly in `app.vue`. This is useful when you want to include global elements such as a header or footer:

::note
Remember that `app.vue` acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
Learn more about how to structure your pages using the `pages/` directory.
::

### Usage with Layouts

When your application requires different layouts for different pages, you can use the `layouts/` directory with the [`<NuxtLayout>`](https://nuxt.com/docs/3.x/api/components/nuxt-layout) component. This allows you to define multiple layouts and apply them per page.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
Learn more about how to structure your layouts using the `layouts/` directory.
::

**Examples:**

Example 1 (unknown):
```unknown
::link-example{to="https://nuxt.com/docs/examples/hello-world"}
::

### Usage with Pages

When you have a [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory, you need to use the [`<NuxtPage>`](https://nuxt.com/docs/3.x/api/components/nuxt-page) component to display the current page:
```

Example 2 (unknown):
```unknown
You can also define the common structure of your application directly in `app.vue`. This is useful when you want to include global elements such as a header or footer:
```

Example 3 (unknown):
```unknown
::note
Remember that `app.vue` acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
Learn more about how to structure your pages using the `pages/` directory.
::

### Usage with Layouts

When your application requires different layouts for different pages, you can use the `layouts/` directory with the [`<NuxtLayout>`](https://nuxt.com/docs/3.x/api/components/nuxt-layout) component. This allows you to define multiple layouts and apply them per page.
```

---

## Make sure to run the deployctl command from the output directory

**URL:** llms-txt#make-sure-to-run-the-deployctl-command-from-the-output-directory

**Contents:**
- Deploy within CI/CD using GitHub Actions
- Templates
- Learn more

cd .output
deployctl deploy --project=my-project server/index.ts --token=<DENO_DEPLOY_TOKEN>
yaml [.github/workflows/deno_deploy.yml]
name: deno-deploy
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
jobs:
  deploy:
    steps:
      - uses: actions/checkout@v3
      - run: corepack enable
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
        env:
          NITRO_PRESET: deno_deploy
      - name: Deploy to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: <my-project>
          entrypoint: server/index.ts
          root: .output
```

::important
Make sure to rename `<my-project>` with your project name.
::

::card-group
  :::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Nuxt Deno KV
  to: https://github.com/Atinux/nuxt-deno-kv
  ---
  A collaborative todo-list app built with Deno KV and Nuxt.
  :::
::

::read-more
---
target: _blank
to: https://nitro.unjs.io/deploy/providers/deno-deploy
---
Head over **Nitro documentation** to learn more about the deno-deploy deployment preset.
::

**Examples:**

Example 1 (unknown):
```unknown
## Deploy within CI/CD using GitHub Actions

Link your GitHub repository to your Deno Deploy project and choose the "GitHub Actions" deployment mode. You can do this in your project settings on <https://dash.deno.com>{rel="&#x22;nofollow&#x22;"}.

Create a GitHub action file in your repository:
```

---

## Zerops

**URL:** llms-txt#zerops

**Contents:**
- Static
  - Creating a Project
  - Setting up Zerops YAML
- SSR Node.js
  - Setting up Zerops YAML
- Building & Deploying your App

**Nodejs Preset**: `SERVER_PRESET: zerops`**Static Preset**: `SERVER_PRESET: zerops-static`

::read-more{title="Zerops" to="https://zerops.io"}
::

::tip
**Nuxt x Zerops Quickrun ✨**

Want to test running Nuxt on Zerops without installing or setting up anything? Using repositories [Zerops x Nuxt - Static](https://github.com/zeropsio/recipe-nuxt-static){rel=""nofollow""} or [Zerops x Nuxt - SSR on Node.js](https://github.com/zeropsio/recipe-nuxt-nodejs){rel=""nofollow""} you can deploy example Nuxt app with a single click.
::

Zerops supports deploying both static and server-side rendered apps with a simple configuration file in your project root.

Projects and services can be added either through a [Project add wizard](https://app.zerops.io/dashboard/project-add){rel="&#x22;nofollow&#x22;"} or imported using a YAML structure:

### Creating a Project

This will create a project called `recipe-nuxt` with a Zerops Static service called `app`.

### Setting up Zerops YAML

To tell Zerops how to build and run your app, add a `zerops.yml` to your root:

Now you can trigger the [build & deploy pipeline using the Zerops CLI](https://nuxt.com/#building-deploying-your-app) or by connecting the app service with your [GitHub](https://docs.zerops.io/references/github-integration/){rel="&#x22;nofollow&#x22;"} / [GitLab](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} repository from inside the service detail.

Projects and services can be added either through a [Project add wizard](https://app.zerops.io/dashboard/project-add){rel="&#x22;nofollow&#x22;"} or imported using a YAML structure:

This will create a project called `recipe-nuxt` with a Zerops Node.js service called `app`.

### Setting up Zerops YAML

To tell Zerops how to build and run your app, add a `zerops.yml` to your root:

Now you can trigger the [build & deploy pipeline using the Zerops CLI](https://nuxt.com/#building-deploying-your-app) or by connecting the app service with your [GitHub](https://docs.zerops.io/references/github-integration/){rel="&#x22;nofollow&#x22;"} / [GitLab](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} repository from inside the service detail.

## Building & Deploying your App

- Install the [Zerops CLI](https://github.com/zeropsio/zcli){rel="&#x22;nofollow&#x22;"}.

- Open [Settings > Access Token Management](https://app.zerops.io/settings/token-management){rel="&#x22;nofollow&#x22;"} in the Zerops app and generate a new access token.
- Log in using your access token with the following command:

- Navigate to the root of your app (where `zerops.yml` is located) and run the following command to trigger the deploy:

Your code can be deployed automatically on each commit or a new tag by connecting the service with your [GitHub](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} / [GitLab](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} repository. This connection can be set up in the service detail.

::read-more{title="Zerops Documentation" to="https://docs.zerops.io/"}
::

**Examples:**

Example 1 (unknown):
```unknown
This will create a project called `recipe-nuxt` with a Zerops Static service called `app`.

### Setting up Zerops YAML

To tell Zerops how to build and run your app, add a `zerops.yml` to your root:
```

Example 2 (unknown):
```unknown
Now you can trigger the [build & deploy pipeline using the Zerops CLI](https://nuxt.com/#building-deploying-your-app) or by connecting the app service with your [GitHub](https://docs.zerops.io/references/github-integration/){rel="&#x22;nofollow&#x22;"} / [GitLab](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} repository from inside the service detail.

## SSR Node.js

Projects and services can be added either through a [Project add wizard](https://app.zerops.io/dashboard/project-add){rel="&#x22;nofollow&#x22;"} or imported using a YAML structure:
```

Example 3 (unknown):
```unknown
This will create a project called `recipe-nuxt` with a Zerops Node.js service called `app`.

### Setting up Zerops YAML

To tell Zerops how to build and run your app, add a `zerops.yml` to your root:
```

Example 4 (unknown):
```unknown
Now you can trigger the [build & deploy pipeline using the Zerops CLI](https://nuxt.com/#building-deploying-your-app) or by connecting the app service with your [GitHub](https://docs.zerops.io/references/github-integration/){rel="&#x22;nofollow&#x22;"} / [GitLab](https://docs.zerops.io/references/gitlab-integration){rel="&#x22;nofollow&#x22;"} repository from inside the service detail.

## Building & Deploying your App

- Install the [Zerops CLI](https://github.com/zeropsio/zcli){rel="&#x22;nofollow&#x22;"}.
```

---

## useRequestURL

**URL:** llms-txt#userequesturl

`useRequestURL` is a helper function that returns an [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL){rel="&#x22;nofollow&#x22;"} working on both server-side and client-side.

::important
When utilizing [Hybrid Rendering](https://nuxt.com/docs/3.x/guide/concepts/rendering#hybrid-rendering) with cache strategies, all incoming request headers are dropped when handling the cached responses via the [Nitro caching layer](https://nitro.build/guide/cache){rel=""nofollow""} (meaning `useRequestURL` will return `localhost` for the `host`).

You can define the [`cache.varies` option](https://nitro.build/guide/cache#options){rel=""nofollow""} to specify headers that will be considered when caching and serving the responses, such as `host` and `x-forwarded-host` for multi-tenant environments.
::

::tip
---
icon: i-simple-icons-mdnwebdocs
target: _blank
to: https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties
---
Read about the URL instance properties on the MDN documentation.
::

**Examples:**

Example 1 (unknown):
```unknown

```

---

## Coditive

**URL:** llms-txt#coditive

We are a software development company from Poland, and we specialize in providing exceptional software development services to businesses worldwide. Since 2009, we have helped over 400 clients achieve their business goals. We are your long term, trusted technology partner.

At Coditive, we're committed to bringing your vision to life with our top-notch coding skill both on frontend and backend areas. Our team blends experience and technical know-how to offer unparalleled development services.

Our aim is to help your business succeed by tackling the unique challenges you encounter. Our services encompass creating new digital products, improving existing ones, and experimenting with fresh ideas. At Coditive, we believe that communication is key to success in any project. That's why we always prioritize open and transparent communication with our clients. We value your input and feedback throughout the entire development process, from ideation to implementation.

We specialize in Vue.js, Nuxt, Node.js, and Hi-end WordPress development. Our team has a keen eye for detail, ensuring that every aspect of your project is executed with precision and care. Let us know how we can assist you in reaching your goals.

---

## Nuxt 2 End-of-Life (EOL)

**URL:** llms-txt#nuxt-2-end-of-life-(eol)

**Contents:**
- What happens on June 30th, 2024?
- What’s Next?
- Still on Nuxt 2? Here Are Your Options.
  - Update to the Nuxt 2 latest release
  - Purchase Extended Support for Nuxt 2
  - Notify Your Users of Your Nuxt 2 Post-EOL Plan
- Looking Forward

Released in 2018, Nuxt 2.0 marked a major milestone, establishing it as a mainstream framework. Over the past six years, many developers adopted Nuxt 2, leading to the creation of numerous impressive projects across the web.

However, looking forward, maintaining Nuxt 2 is no longer sustainable. With the recent end-of-life of Vue 2 and the maturity of Nuxt 3 and its ecosystem, it's time for our team to concentrate our efforts on the latest major version and upcoming versions.

::tip
---
target: _blank
to: https://www.herodevs.com/support/nuxt-nes?utm_source=nuxt&utm_medium=nuxt-eol-article
---
Jump over HeroDevs' Nuxt Never-Ending Support (NES)
::

## What happens on June 30th, 2024?

After this date, Nuxt 2 will continue to be available on the NPM package manager, but will no longer receive updates, such as security and browser compatibility fixes. In other words, your applications will continue to work, but you may get deprecation warnings from your package manager reminding you that Nuxt 2 is no longer a supported version.

::note
Vue 2 reached its end-of-life date on December 31st, 2023.
::

Nuxt 3 has been the default version of Nuxt since November 16th, 2022.

On top of using Vue 3 and the composition API, it is shipped with features and innovations:

- Universal & Hybrid Rendering: Benefits of both SPA and SSR, with fine-grained control over route rendering
- Support for serverless environments (AWS Lambda, Deno, Cloudflare Workers) with minimal cold-start.
- First-Class TypeScript Support: Full typing across all components and configurations.
- Vite integration for a faster developer experience
- Server & API routes with end-to-end typing powered by Nitro
- Auto import of composables & utils
- Layers feature for domain driven development

When and if you can, consider migrating to Nuxt 3 to take advantage of these powerful features.

::read-more{to="https://nuxt.com/docs/getting-started/upgrade#nuxt-2-vs-nuxt-3"}
See a full comparison table between Nuxt 2 and Nuxt 3, as well as detailed upgrade guides to Nuxt 3 and Nuxt Bridge (as a part of upgrading to Nuxt 3).
::

::read-more{icon="i-lucide-life-buoy" to="https://nuxt.com/enterprise/support"}
If you need support, including upgrading to Nuxt 3, NuxtLabs provides professional support and consultancy in a wide range of areas.
::

## Still on Nuxt 2? Here Are Your Options.

Recognizing the various situations that arise during transitions, we are fully aware that users may need other options until they can migrate, or maybe migration simply isn't a feasible path. Here are some other options to consider:

### Update to the Nuxt 2 latest release

We expect to release 2.18.0 at the end of June 2024, which will include a few final fixes.

::note
We strongly encourage you to update to 2.18.0 once it's out. This will be the starting point for extended support mentioned below.
::

### Purchase Extended Support for Nuxt 2

If you have to stay on Nuxt 2 post-EOL, we have partnered with HeroDevs to offer Nuxt 2 Never-Ending Support (NES). Nuxt 2 NES provides ongoing security and compatibility patches for Nuxt 2 and all official Nuxt Modules (modules released by the Nuxt team, labeled `@nuxt/...` in the marketplace) even after EOL so that applications with strict compliance requirements remain secure and compliant. It also guarantees that Nuxt 2 applications will continue to operate effectively in modern browsers and maintain compatibility with essential libraries like Vue 2. Moreover, Nuxt 2 NES has continuous security monitoring and an enterprise level SLA with respect to support and fixes.

Nuxt 2 NES is the continuation of the flavor of security support you’ve enjoyed during the Nuxt 2 LTS period — but indefinitely.

::tip
---
target: _blank
to: https://www.herodevs.com/support/nuxt-nes?utm_source=nuxt&utm_medium=nuxt-eol-article
---
Read more about HeroDevs' Nuxt Never-Ending Support (NES)
::

### Notify Your Users of Your Nuxt 2 Post-EOL Plan

If migrating to Nuxt 3 or using Nuxt 2 NES isn't feasible right now, but you're still on Nuxt 2, it's essential to plan how you'll communicate your security strategy to your customers.

This doesn't affect all Nuxt users, but many teams face restrictions against deploying unsupported software due to SLAs, contracts, or other obligations to clients and partners. These requirements might come from customers, regulatory bodies, or internal company policies. Increasingly, regulatory bodies are setting higher standards for software accountability.

For those with such responsibilities, informing your customers, managers, CISO, or other stakeholders about your plans to handle support and manage potential CVEs is crucial. While Nuxt 2 has only had few vulnerabilities, CVEs can emerge even in well-maintained EOL projects through direct vulnerabilities or compromised dependencies. Staying updated with CVE notifications from organizations like [OpenCVE](https://www.opencve.io){rel="&#x22;nofollow&#x22;"}, and [Snyk](https://snyk.io){rel="&#x22;nofollow&#x22;"} can help you identify issues as they arise. Additionally, browsers occasionally update in ways that can affect legacy libraries—though rare, it’s a possibility to be aware of.

It is with a heavy heart that I am saying goodbye to Nuxt 2. After many years of working on it and seeing so many websites made with it, this famous loading bar at the top of each Nuxt 2 website will be something I’ll miss a lot! It is with excitement and energy that I will keep working with the core team on the future of Nuxt to keep innovating like we've been doing over these past 8 years.

---

## GitHub Pages

**URL:** llms-txt#github-pages

**Contents:**
- Setup
- Deployment

Nuxt supports deploying to [GitHub Pages](https://pages.github.com/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

::caution
GitHub Pages only support static sites, Nuxt will pre-render your application to static HTML files.
::

::caution
If you are **not** using a custom domain, you need to set `NUXT_APP_BASE_URL` to your repository-slug for your build step.

**Example**: `https://<user>.github.io/<repository>/`: `NUXT_APP_BASE_URL=/<repository>/ npx nuxt build --preset github_pages`
::

Follow the steps to [create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site){rel="&#x22;nofollow&#x22;"}.

Here is an example GitHub Actions workflow to deploy your site to GitHub Pages using the `github_pages` preset:

```yaml [.github/workflows/deploy.yml]

---

## Server

**URL:** llms-txt#server

**Contents:**
- Steps

In a built Nuxt 3 application, there is no runtime Nuxt dependency. That means your site will be highly performant, and ultra-slim. But it also means you can no longer hook into runtime Nuxt server hooks.

::read-more{to="https://nuxt.com/docs/guide/concepts/server-engine"}
::

1. Remove the `render` key in your `nuxt.config`.
2. Any files in `~/server/api` and `~/server/middleware` will be automatically registered; you can remove them from your `serverMiddleware` array.
3. Update any other items in your `serverMiddleware` array to point to files or npm packages directly, rather than using inline functions.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/server"}
::

::read-more
---
to: https://nuxt.com/docs/guide/going-further/hooks#server-hooks-runtime
---
::

---

## <NuxtLoadingIndicator>

**URL:** llms-txt#<nuxtloadingindicator>

**Contents:**
- Usage
- Slots
- Props

Add `<NuxtLoadingIndicator/>` in your [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app) or [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts).

::link-example{to="https://nuxt.com/docs/examples/routing/pages"}
::

You can pass custom HTML or components through the loading indicator's default slot.

- `color`: The color of the loading bar. It can be set to `false` to turn off explicit color styling.
- `errorColor`: The color of the loading bar when `error` is set to `true`.
- `height`: Height of the loading bar, in pixels (default `3`).
- `duration`: Duration of the loading bar, in milliseconds (default `2000`).
- `throttle`: Throttle the appearing and hiding, in milliseconds (default `200`).
- `estimatedProgress`: By default Nuxt will back off as it approaches 100%. You can provide a custom function to customize the progress estimation, which is a function that receives the duration of the loading bar (above) and the elapsed time. It should return a value between 0 and 100.

::note
This component is optional. :br
To achieve full customization, you can implement your own one based on [its source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/nuxt-loading-indicator.ts){rel=""nofollow""}.
::

::note
You can hook into the underlying indicator instance using [the `useLoadingIndicator` composable](https://nuxt.com/docs/3.x/api/composables/use-loading-indicator), which will allow you to trigger start/finish events yourself.
::

::tip
The loading indicator's speed gradually decreases after reaching a specific point controlled by `estimatedProgress`. This adjustment provides a more accurate reflection of longer page loading times and prevents the indicator from prematurely showing 100% completion.
::

---

## nuxt dev

**URL:** llms-txt#nuxt-dev

**Contents:**
- Arguments
- Options

The `dev` command starts a development server with hot module replacement at [http://localhost:3000](https://localhost:3000){rel="&#x22;nofollow&#x22;"}

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default | Description                                                                                                                                          |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--cwd=<directory>`                |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)                                                                     |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                                                                                                                         |
| `--dotenv`                         |         | Path to `.env` file to load, relative to the root directory                                                                                          |
| `--envName`                        |         | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server) |
| `-e, --extends=<layer-name>`       |         | Extend from a Nuxt layer                                                                                                                             |
| `--clear`                          | `false` | Clear console on restart                                                                                                                             |
| `--no-f, --no-fork`                |         | Disable forked mode                                                                                                                                  |
| `-p, --port`                       |         | Port to listen on (default: `NUXT_PORT || NITRO_PORT || PORT || nuxtOptions.devServer.port`)                                                         |
| `-h, --host`                       |         | Host to listen on (default: `NUXT_HOST || NITRO_HOST || HOST || nuxtOptions.devServer?.host`)                                                        |
| `--clipboard`                      | `false` | Copy the URL to the clipboard                                                                                                                        |
| `-o, --open`                       | `false` | Open the URL in the browser                                                                                                                          |
| `--https`                          |         | Enable HTTPS                                                                                                                                         |
| `--publicURL`                      |         | Displayed public URL (used for QR code)                                                                                                              |
| `--qr`                             |         | Display The QR code of public URL when available                                                                                                     |
| `--public`                         |         | Listen to all network interfaces                                                                                                                     |
| `--tunnel`                         |         | Open a tunnel using <https://github.com/unjs/untun>{rel="&#x22;nofollow&#x22;"}                                                                      |
| `--sslCert`                        |         | (DEPRECATED) Use `--https.cert` instead.                                                                                                             |
| `--sslKey`                         |         | (DEPRECATED) Use `--https.key` instead.                                                                                                              |

The port and host can also be set via NUXT\_PORT, PORT, NUXT\_HOST or HOST environment variables.

Additionally to the above options, `@nuxt/cli` can pass options through to `listhen`, e.g. `--no-qr` to turn off the dev server QR code. You can find the list of `listhen` options in the [unjs/listhen](https://github.com/unjs/listhen){rel="&#x22;nofollow&#x22;"} docs.

This command sets `process.env.NODE_ENV` to `development`.

::note
If you are using a self-signed certificate in development, you will need to set `NODE_TLS_REJECT_UNAUTHORIZED=0` in your environment.
::

---

## Liip AG

**URL:** llms-txt#liip-ag

Liip is a Swiss digital agency with strong convictions. For more than a decade, Liip has been helping companies with their strategic digital projects – from developing innovative web applications, award-winning mobile apps and data-driven online shops, through to coaching sessions for agile ways of working. Our strategy, ideation, user experience and custom development experts create long-lasting software. Whether start-up, large company or federal authority, from retail to mobility, our projects are used by thousands of users.

Rather than just offering standard solutions, we strive for real progress: user-centred innovations with a social, environmental and economic impact for our customers. Liip works in an agile way in self-organised teams using Holacracy. This means no bosses, just lots of entrepreneurship and drive – and even more open source, creative problem solving, testing and new technologies. This is valued by not only our around 200 employees, but also customers and award panels.

---

## Nuxt 3.17

**URL:** llms-txt#nuxt-3.17

**Contents:**
- 📊 Data Fetching Improvements
  - Consistent Data Across Components
  - Reactive Keys
  - Optimized Data Refetching
- 🎭 Built-In Nuxt Components
  - `<NuxtTime>` - A new component for safe time display
  - Enhanced `<NuxtErrorBoundary>`
- 🔗 Router Improvements
- 🔄 Loading Indicator Customization
- 📚 Documentation as a Package

## 📊 Data Fetching Improvements

A major reorganization of Nuxt's data fetching layer brings significant improvements to `useAsyncData` and `useFetch`.

Although we have aimed to maintain backward compatibility and put breaking changes behind the `experimental.granularCachedData` flag (disabled by default), we recommend testing your application thoroughly after upgrading. You can also disable `experimental.purgeCachedData` to revert to the previous behavior if you are relying on cached data being available indefinitely after components using `useAsyncData` are unmounted.

::read-more{target="_blank" to="https://github.com/nuxt/nuxt/pull/31373"}
Read the original PR for full details.
::

### Consistent Data Across Components

All calls to `useAsyncData` or `useFetch` with the same key now share the underlying refs, ensuring consistency across your application:

This solves various issues where components could have inconsistent data states.

You can now use computed refs, plain refs, or getter functions as keys:

### Optimized Data Refetching

Multiple components watching the same data source will now trigger only a single data fetch when dependencies change:

## 🎭 Built-In Nuxt Components

### `<NuxtTime>` - A new component for safe time display

We've added a new `<NuxtTime>` component for SSR-safe time display, which resolves hydration mismatches when working with dates ([#31876](https://github.com/nuxt/nuxt/pull/31876){rel="&#x22;nofollow&#x22;"}):

The component accepts multiple time formats and gracefully handles both client and server rendering.

### Enhanced `<NuxtErrorBoundary>`

The `<NuxtErrorBoundary>` component has been converted to a Single File Component and now exposes `error` and `clearError` from the component - as well as in the error slot types, giving you greater ability to handle errors in your templates and via `useTemplateRef` ([#31847](https://github.com/nuxt/nuxt/pull/31847){rel="&#x22;nofollow&#x22;"}):

## 🔗 Router Improvements

`<NuxtLink>` now accepts a `trailingSlash` prop, giving you more control over URL formatting ([#31820](https://github.com/nuxt/nuxt/pull/31820){rel="&#x22;nofollow&#x22;"}):

## 🔄 Loading Indicator Customization

You can now customize the loading indicator with new props directly on the component ([#31532](https://github.com/nuxt/nuxt/pull/31532){rel="&#x22;nofollow&#x22;"}):

- `hideDelay`: Controls how long to wait before hiding the loading bar
- `resetDelay`: Controls how long to wait before resetting loading indicator state

## 📚 Documentation as a Package

The Nuxt documentation is now available as an npm package! You can install `@nuxt/docs` to access the raw markdown and YAML content used to build the documentation website ([#31353](https://github.com/nuxt/nuxt/pull/31353){rel="&#x22;nofollow&#x22;"}).

## 💻 Developer Experience Improvements

We've added several warnings to help catch common mistakes:

- Warning when server components don't have a root element [#31365](https://github.com/nuxt/nuxt/pull/31365){rel="&#x22;nofollow&#x22;"}
- Warning when using the reserved `runtimeConfig.app` namespace [#31774](https://github.com/nuxt/nuxt/pull/31774){rel="&#x22;nofollow&#x22;"}
- Warning when core auto-import presets are overridden [#29971](https://github.com/nuxt/nuxt/pull/29971){rel="&#x22;nofollow&#x22;"}
- Error when `definePageMeta` is used more than once in a file [#31634](https://github.com/nuxt/nuxt/pull/31634){rel="&#x22;nofollow&#x22;"}

## 🔌 Enhanced Module Development

Module authors will be happy to know:

- A new `experimental.enforceModuleCompatibility` allows Nuxt to throw an error when a module is loaded that isn't compatible with it ([#31657](https://github.com/nuxt/nuxt/pull/31657){rel="&#x22;nofollow&#x22;"}). It will be enabled by default in Nuxt v4.
- You can now automatically register every component exported via named exports from a file with `addComponentExports` [#27155](https://github.com/nuxt/nuxt/pull/27155){rel="&#x22;nofollow&#x22;"}

## 🔥 Performance Improvements

Several performance improvements have been made:

- Switched to `tinyglobby` for faster file globbing [#31668](https://github.com/nuxt/nuxt/pull/31668){rel="&#x22;nofollow&#x22;"}
- Excluded `.data` directory from type-checking for faster builds [#31738](https://github.com/nuxt/nuxt/pull/31738){rel="&#x22;nofollow&#x22;"}
- Improved tree-shaking by hoisting the `purgeCachedData` check [#31785](https://github.com/nuxt/nuxt/pull/31785){rel="&#x22;nofollow&#x22;"}

Our recommendation for upgrading is to run:

This refreshes your lockfile and pulls in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## Full release notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.17.0
---
Read the full release notes of Nuxt `v3.17.0`.
::

A huge thank you to everyone who's been a part of this release. ❤️

**Examples:**

Example 1 (vue):
```vue
<!-- ComponentA.vue -->
<script setup>
const { data: users, pending } = useAsyncData('users', fetchUsers)
</script>

<!-- ComponentB.vue -->
<script setup>
// This will reference the same data state as ComponentA
const { data: users, status } = useAsyncData('users', fetchUsers)
// When either component refreshes the data, both will update consistently
</script>
```

Example 2 (ts):
```ts
const userId = ref('123')
const { data: user } = useAsyncData(
  computed(() => `user-${userId.value}`),
  () => fetchUser(userId.value)
)

// Changing the userId will automatically trigger a new data fetch
// and clean up the old data if no other components are using it
userId.value = '456'
```

Example 3 (ts):
```ts
// In multiple components:
const { data } = useAsyncData(
  'users',
  () => $fetch(`/api/users?page=${route.query.page}`),
  { watch: [() => route.query.page] }
)

// When route.query.page changes, only one fetch operation will occur
// All components using this key will update simultaneously
```

Example 4 (vue):
```vue
<template>
  <NuxtTime :datetime="Date.now()" />
</template>
```

---

## Nuxt: A vision for 2023

**URL:** llms-txt#nuxt:-a-vision-for-2023

**Contents:**
- Unifying Nuxt
- New Website
- Key Modules
- DX and Performance
- A New Release Cycle
- Migrating to Nuxt 3

This past year has been an exciting one. Looking into the new year, there is a lot we have planned as a team and we'd love to share it with you. ✨

This past year has been an exciting one, with the release of Nuxt 3 and Nitro and the launch of the new [nuxt.com](http://nuxt.com/){rel="&#x22;nofollow&#x22;"} website. It's been the culmination of years of work, and has not only resulted in a new major version of Nuxt, but a new Nuxt architecture, a full-stack server framework ([Nitro](https://nitro.unjs.io/){rel="&#x22;nofollow&#x22;"}), and a new GitHub organisation and ecosystem ([UnJS](https://github.com/unjs/){rel="&#x22;nofollow&#x22;"}).

Throughout that whole time, [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"} has led the Nuxt team, putting in countless hours of work and thought into building Nuxt 3.

Now, at the start of 2023, he's handing over the helm of the Nuxt open-source work to me ([Daniel Roe](https://github.com/danielroe){rel="&#x22;nofollow&#x22;"}). Pooya will continue to be actively contributing to the Nuxt project and of course driving the development of UnJS ecosystem and Nitro project.

This is a real honour and I'm hugely pleased to be able to work with the rest of the team and the community to continue to drive Nuxt forward to be the intuitive way to build a web application using Vue. 😊

Looking into the new year, there is a lot we have planned as a team and we'd love to share it with you.

One important change will be unifying Nuxt into a single repository.

As a complete rewrite of Nuxt 2, Nuxt 3 has been developed in a separate repository: `nuxt/framework`. Nuxt 3 even has its own documentation on [nuxt.com](http://nuxt.com/){rel="&#x22;nofollow&#x22;"}, versus the Nuxt 2 documentation on [v2.nuxt.com](https://v2.nuxt.com){rel="&#x22;nofollow&#x22;"}. In development, this helped us move faster but meant less attention on issues for Nuxt 2. It's also a bit confusing.

So in the coming days, we'll be unifying the Nuxt repos into a single repository, `nuxt/nuxt`. We'll transfer all issues and discussions across, of course, clearly labeling them as to which version of Nuxt they affect. This will also provide us an opportunity to close out issues and RFCs that we've resolved or implemented in Nuxt 3.

This last year brought us the launch of [nuxt.com](http://nuxt.com/){rel="&#x22;nofollow&#x22;"} and the unveiling of Nuxt's [new logo](https://nuxt.com/design-kit).

![Nuxt Website 2023](https://nuxt.com/assets/blog/website/new-website-2023.png){.rounded-lg.border.border-gray-700}

We'd like to make this website the central place for everything Nuxt. That includes:

- migrating Nuxt 2 documentation so there's a single website to check (with a version switcher)
- documentation for community modules (using multi-source to pull them from their own repositories)
- revamped [examples](https://nuxt.com/docs/examples/hello-world) that show off more real use cases, including authentication, monorepos and more

We have some other exciting plans for the website, but I don't want to reveal too much, other than to say that we'll also (of course!) be open-sourcing the website soon.

The modules ecosystem is an incredibly powerful one, and we are grateful to all the module authors who extend Nuxt with so many features. Today we have more than 60 modules compatible with Nuxt 3. Our goal is to continue to empower module development as well as make sure that the most used modules in Nuxt 2 are updated or have a straightforward migration path.

The main priorities at the start of the year are `nuxt/image`, PWA and `nuxt/auth`.

We're also developing RFCs for `nuxt/font` and `nuxt/script` in conjunction with the Google Aurora team, which will make it much easier to apply best performance practices to your Nuxt apps. Watch this space!

## DX and Performance

We particularly care a lot about making Nuxt a joy to use, and we'd like to keep pushing the boundary of great developer experience, which we believe results in the best experience for users of the apps we write too.

In the coming months, there will be a continued focus on developer experience and performance. Expect to see Nuxt DevTools and CLI improvements for scaffolding - and more. On the performance side, Nuxt 3 + Nitro is a game-changer for speed, performance, and customisability, and we’ll be building on top of that to enable some amazing features. 🚀

## A New Release Cycle

It's important to know what's coming, and we're going to be spending some time making sure we communicate clearly about what's happening with Nuxt through regular updates like this one.

On top of that, we're planning a consistent release cycle, following [semver](https://semver.org/){rel="&#x22;nofollow&#x22;"}. We'll aim for major framework releases every year, with an expectation of patch releases every week or so and minor releases every month or so. They should never contain breaking changes except within options clearly marked as `experimental`.

One comment: We don't want there to be as big a gap (either in time or in breaking changes) between 3 -> 4 as there was between 2 -> 3, so, when the time comes for Nuxt 4, expect a much more gentle upgrade!

In the upcoming 3.1.0 release, you can already find a host of bug fixes as well as:

- experimental server-only components and a component island renderer
- Nitro 2, Vite 4 and Rollup 3 support

## Migrating to Nuxt 3

On December 31st, 2023, Vue 2 will reach End of Life (EOL), and with it Nuxt 2. Both Vue and Nuxt will continue being available and working for many people, but at the same time, many companies and users will want to transition to Nuxt 3 (and we'd encourage this!).

Part of our focus this year therefore will be supporting everyone who wants to migrate their apps to Nuxt 3. We'll also be working to backport key bug fixes and security fixes to Nuxt 2.

In addition, there is Nuxt Bridge. It was built as a module to bring features and bug fixes from Nuxt 3 back to Nuxt 2, although it has not yet been released in a stable version. We plan to stabilise and release it in the next month or so, but our main focus over the course of the year will be on helping people transition to Nuxt 3.

It’s a privilege to be part of this community, and we wish you a very Happy New Year! 💚

Daniel (on behalf of the whole Nuxt team)

---

## useRequestFetch

**URL:** llms-txt#userequestfetch

You can use `useRequestFetch` to forward the request context and headers when making server-side fetch requests.

When making a client-side fetch request, the browser automatically sends the necessary headers.
However, when making a request during server-side rendering, due to security considerations, we need to forward the headers manually.

::note
Headers that are **not meant to be forwarded** will **not be included** in the request. These headers include, for example:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
The [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) composable uses `useRequestFetch` under the hood to automatically forward the request context and headers.
::

::tip
In the browser during client-side navigation, `useRequestFetch` will behave just like regular [`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch).
::

**Examples:**

Example 1 (unknown):
```unknown

```

---

## .nuxt

**URL:** llms-txt#.nuxt

::important
This directory should be added to your [`.gitignore`](https://nuxt.com/docs/3.x/directory-structure/gitignore) file to avoid pushing the dev build output to your repository.
::

This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.

Nuxt also provides a Virtual File System (VFS) for modules to add templates to this directory without writing them to disk.

You can explore the generated files by opening the [Nuxt DevTools](https://devtools.nuxt.com){rel="&#x22;nofollow&#x22;"} in development mode and navigating to the **Virtual Files** tab.

::warning
You should not touch any files inside since the whole directory will be re-created when running [`nuxt dev`](https://nuxt.com/docs/3.x/api/commands/dev).
::

---

## Sessions and Authentication

**URL:** llms-txt#sessions-and-authentication

**Contents:**
- Introduction
- Install nuxt-auth-utils
- Cookie Encryption Key
- Login API Route
- Login Page
- Protect API Routes
- Protect App Routes
- Home Page
- Conclusion

In this recipe we'll be setting up authentication in a full-stack Nuxt app using [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils){rel="&#x22;nofollow&#x22;"} which provides convenient utilities for managing client-side and server-side session data.

The module uses secured & sealed cookies to store session data, so you don't need to setup a database to store session data.

## Install nuxt-auth-utils

Install the `nuxt-auth-utils` module using the `nuxt` CLI.

::callout
This command will install `nuxt-auth-utils` as dependency and push it in the `modules` section of our `nuxt.config.ts`
::

## Cookie Encryption Key

As `nuxt-auth-utils` uses sealed cookies to store session data, session cookies are encrypted using a secret key from the `NUXT_SESSION_PASSWORD` environment variable.

::note
If not set, this environment variable will be added to your `.env` automatically when running in development mode.
::

::important
You'll need to add this environment variable to your production environment before deploying.
::

For this recipe, we'll create a simple API route to sign-in a user based on static data.

Let's create a `/api/login` API route that will accept a POST request with the email and password in the request body.

::callout
Make sure to install the `zod` dependency in your project (`npm i zod`).
::

::tip{to="https://github.com/atinux/nuxt-auth-utils#server-utils"}
Read more about the `setUserSession` server helper exposed by `nuxt-auth-utils`.
::

The module exposes a Vue composable to know if a user is authenticated in our application:

Let's create a login page with a form to submit the login data to our `/api/login` route.

## Protect API Routes

Protecting server routes is key to making sure your data is safe. Client-side middleware is helpful for the user, but without server-side protection your data can still be accessed. It is critical to protect any routes with sensitive data, we should return a 401 error if the user is not logged in on those.

The `auth-utils` module provides the `requireUserSession` utility function to help make sure that users are logged in and have an active session.

Let's create an example of a `/api/user/stats` route that only authenticated users can access.

## Protect App Routes

Our data is safe with the server-side route in place, but without doing anything else, unauthenticated users would probably get some odd data when trying to access the `/users` page. We should create a [client-side middleware](https://nuxt.com/docs/guide/directory-structure/middleware){rel="&#x22;nofollow&#x22;"} to protect the route on the client side and redirect users to the login page.

`nuxt-auth-utils` provides a convenient `useUserSession` composable which we'll use to check if the user is logged in, and redirect them if they are not.

We'll create a middleware in the `/middleware` directory. Unlike on the server, client-side middleware is not automatically applied to all endpoints, and we'll need to specify where we want it applied.

Now that we have our app middleware to protect our routes, we can use it on our home page that display our authenticated user information. If the user is not authenticated, they will be redirected to the login page.

We'll use [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) to apply the middleware to the route that we want to protect.

We also added a logout button to clear the session and redirect the user to the login page.

We've successfully set up a very basic user authentication and session management in our Nuxt app. We've also protected sensitive routes on the server and client side to ensure that only authenticated users can access them.

As next steps, you can:

- Add authentication using the [20+ supported OAuth providers](https://github.com/atinux/nuxt-auth-utils?tab=readme-ov-file#supported-oauth-providers){rel="&#x22;nofollow&#x22;"}
- Add a database to store users, see [Nitro SQL Database](https://nitro.build/guide/database){rel="&#x22;nofollow&#x22;"} or [NuxtHub SQL Database](https://hub.nuxt.com/docs/features/database){rel="&#x22;nofollow&#x22;"}
- Let user signup with email & password using [password hashing](https://github.com/atinux/nuxt-auth-utils?tab=readme-ov-file#password-hashing){rel="&#x22;nofollow&#x22;"}
- Add support for [WebAuthn / Passkeys](https://github.com/atinux/nuxt-auth-utils?tab=readme-ov-file#webauthn-passkey){rel="&#x22;nofollow&#x22;"}

Checkout the open source [atidone repository](https://github.com/atinux/atidone){rel="&#x22;nofollow&#x22;"} for a full example of a Nuxt app with OAuth authentication, database and CRUD operations.

**Examples:**

Example 1 (unknown):
```unknown
::callout
This command will install `nuxt-auth-utils` as dependency and push it in the `modules` section of our `nuxt.config.ts`
::

## Cookie Encryption Key

As `nuxt-auth-utils` uses sealed cookies to store session data, session cookies are encrypted using a secret key from the `NUXT_SESSION_PASSWORD` environment variable.

::note
If not set, this environment variable will be added to your `.env` automatically when running in development mode.
::
```

Example 2 (unknown):
```unknown
::important
You'll need to add this environment variable to your production environment before deploying.
::

## Login API Route

For this recipe, we'll create a simple API route to sign-in a user based on static data.

Let's create a `/api/login` API route that will accept a POST request with the email and password in the request body.
```

Example 3 (unknown):
```unknown
::callout
Make sure to install the `zod` dependency in your project (`npm i zod`).
::

::tip{to="https://github.com/atinux/nuxt-auth-utils#server-utils"}
Read more about the `setUserSession` server helper exposed by `nuxt-auth-utils`.
::

## Login Page

The module exposes a Vue composable to know if a user is authenticated in our application:
```

Example 4 (unknown):
```unknown
Let's create a login page with a form to submit the login data to our `/api/login` route.
```

---

## nuxt module

**URL:** llms-txt#nuxt-module

**Contents:**
- nuxt module add
- nuxt module search
  - Arguments
  - Options

Nuxt provides a few utilities to work with [Nuxt modules](https://nuxt.com/modules) seamlessly.

| Argument     | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `MODULENAME` | Specify one or more modules to install by name, separated by spaces |

| Option                             | Default | Description                         |
| ---------------------------------- | ------- | ----------------------------------- |
| `--cwd=<directory>`                | `.`     | Specify the working directory       |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level        |
| `--skipInstall`                    |         | Skip npm install                    |
| `--skipConfig`                     |         | Skip nuxt.config.ts update          |
| `--dev`                            |         | Install modules as dev dependencies |

The command lets you install [Nuxt modules](https://nuxt.com/modules) in your application with no manual work.

When running the command, it will:

- install the module as a dependency using your package manager
- add it to your [package.json](https://nuxt.com/docs/3.x/directory-structure/package) file
- update your [`nuxt.config`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file

Installing the [`Pinia`](https://nuxt.com/modules/pinia) module

## nuxt module search

| Argument | Description            |
| -------- | ---------------------- |
| `QUERY`  | keywords to search for |

| Option                | Default | Description                                                                        |
| --------------------- | ------- | ---------------------------------------------------------------------------------- |
| `--cwd=<directory>`   | `.`     | Specify the working directory                                                      |
| `--nuxtVersion=<2|3>` |         | Filter by Nuxt version and list compatible modules only (auto detected by default) |

The command searches for Nuxt modules matching your query that are compatible with your Nuxt version.

**Examples:**

Example 1 (unknown):
```unknown
| Argument     | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `MODULENAME` | Specify one or more modules to install by name, separated by spaces |

| Option                             | Default | Description                         |
| ---------------------------------- | ------- | ----------------------------------- |
| `--cwd=<directory>`                | `.`     | Specify the working directory       |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level        |
| `--skipInstall`                    |         | Skip npm install                    |
| `--skipConfig`                     |         | Skip nuxt.config.ts update          |
| `--dev`                            |         | Install modules as dev dependencies |

The command lets you install [Nuxt modules](https://nuxt.com/modules) in your application with no manual work.

When running the command, it will:

- install the module as a dependency using your package manager
- add it to your [package.json](https://nuxt.com/docs/3.x/directory-structure/package) file
- update your [`nuxt.config`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file

**Example:**

Installing the [`Pinia`](https://nuxt.com/modules/pinia) module
```

Example 2 (unknown):
```unknown
## nuxt module search
```

Example 3 (unknown):
```unknown
### Arguments

| Argument | Description            |
| -------- | ---------------------- |
| `QUERY`  | keywords to search for |

### Options

| Option                | Default | Description                                                                        |
| --------------------- | ------- | ---------------------------------------------------------------------------------- |
| `--cwd=<directory>`   | `.`     | Specify the working directory                                                      |
| `--nuxtVersion=<2|3>` |         | Filter by Nuxt version and list compatible modules only (auto detected by default) |

The command searches for Nuxt modules matching your query that are compatible with your Nuxt version.

**Example:**
```

---

## Head

**URL:** llms-txt#head

**Contents:**
- `setGlobalHead`
  - Type
  - Parameters
  - Examples

Sets global head configuration for your Nuxt application. This utility allows modules to programmatically configure meta tags, links, scripts, and other head elements that will be applied across all pages.

The provided head configuration will be merged with any existing head configuration using deep merging, with your provided values taking precedence.

::tip
This is particularly useful for modules that need to inject global meta tags, stylesheets, or scripts into the application head.
::

**Type**: `AppHeadMetaObject`

An object containing head configuration. All properties are optional and will be merged with existing configuration:

- `charset`: Character encoding for the document
- `viewport`: Viewport meta tag configuration
- `meta`: Array of meta tag objects
- `link`: Array of link tag objects (stylesheets, icons, etc.)
- `style`: Array of inline style tag objects
- `script`: Array of script tag objects
- `noscript`: Array of noscript tag objects
- `title`: Default page title
- `titleTemplate`: Template for formatting page titles
- `bodyAttrs`: Attributes to add to the `<body>` tag
- `htmlAttrs`: Attributes to add to the `<html>` tag

#### Adding Global Meta Tags

#### Injecting Global Stylesheets

#### Adding Global Scripts

#### Setting HTML Attributes

**Examples:**

Example 1 (unknown):
```unknown
### Parameters

#### `head`

**Type**: `AppHeadMetaObject`

An object containing head configuration. All properties are optional and will be merged with existing configuration:

- `charset`: Character encoding for the document
- `viewport`: Viewport meta tag configuration
- `meta`: Array of meta tag objects
- `link`: Array of link tag objects (stylesheets, icons, etc.)
- `style`: Array of inline style tag objects
- `script`: Array of script tag objects
- `noscript`: Array of noscript tag objects
- `title`: Default page title
- `titleTemplate`: Template for formatting page titles
- `bodyAttrs`: Attributes to add to the `<body>` tag
- `htmlAttrs`: Attributes to add to the `<html>` tag

### Examples

#### Adding Global Meta Tags
```

Example 2 (unknown):
```unknown
#### Injecting Global Stylesheets
```

Example 3 (unknown):
```unknown
#### Adding Global Scripts
```

Example 4 (unknown):
```unknown
#### Setting HTML Attributes
```

---

## Nuxt 3.3

**URL:** llms-txt#nuxt-3.3

**Contents:**
- ✨ Local module development DX
- ♻️ Restarting Nuxt
- 🔥 Performance improvements
- 🐛 Error handling
- ⚡️ Head improvements
- 🪵 Better logging in browser DevTools
- 💪 Type improvements
- ⚗️ Nitro enhancements
- 🛠️ Build changes
- 🗺️ Custom config schema (advanced)

## ✨ Local module development DX

We've landed a raft of changes to enable local modules and improve DX.

We now auto-scan your [`~/modules`](https://nuxt.com/docs/guide/directory-structure/modules) folder and register top level files there as modules in your project ([#19394](https://github.com/nuxt/nuxt/pull/19394){rel="&#x22;nofollow&#x22;"}).

When these files are changed, we'll automatically restart the nuxt server.

We also now expose `nuxt/kit` for easy access to kit composables in your local project without having to install `@nuxt/kit` ([#19422](https://github.com/nuxt/nuxt/pull/19422){rel="&#x22;nofollow&#x22;"}).

[Read the documentation about local modules](https://nuxt.com/docs/guide/directory-structure/modules).

## ♻️ Restarting Nuxt

You can add files to the `watch` array to automatically restart the server ([#19530](https://github.com/nuxt/nuxt/pull/19530){rel="&#x22;nofollow&#x22;"}). This is likely to be particularly useful for module authors. You can also trigger a restart of the Nuxt server with the new `restart` hook ([#19084](https://github.com/nuxt/nuxt/pull/19084){rel="&#x22;nofollow&#x22;"}).

## 🔥 Performance improvements

We've increased static asset maxAge to 1 year as a matter of best practice ([#19335](https://github.com/nuxt/nuxt/pull/19335){rel="&#x22;nofollow&#x22;"}), and support tree-shaking more of your build ([#19508](https://github.com/nuxt/nuxt/pull/19508){rel="&#x22;nofollow&#x22;"}).

![nuxt-performance-improvements](https://nuxt.com/assets/blog/nuxt-performance-improvements.png){.rounded-lg.border.border-gray-700}

We also now support preloading [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) with a route in object-syntax ([#19120](https://github.com/nuxt/nuxt/pull/19120){rel="&#x22;nofollow&#x22;"}):

We also track how long it takes each module you use to perform its setup, and warn if it takes too long. You can see all these values by running your dev server with `DEBUG=1` ([#18648](https://github.com/nuxt/nuxt/pull/18648){rel="&#x22;nofollow&#x22;"}).

You can also opt-in to some of Nuxt's internal optimisations by configuring composables to be treeshaken in a particular environment ([#19383](https://github.com/nuxt/nuxt/pull/19383){rel="&#x22;nofollow&#x22;"}) or to have magic keys automatically injected ([#19490](https://github.com/nuxt/nuxt/pull/19490){rel="&#x22;nofollow&#x22;"}).

We now handle chunk errors by default ([#19086](https://github.com/nuxt/nuxt/pull/19086){rel="&#x22;nofollow&#x22;"}), meaning if your site updates with a redeploy, **we automatically handle reloading it on navigation**.

To disable this behavior, set `experimental.emitRouteChunkError` option to `'manual'` and handle it yourself with the new [`reloadNuxtApp`](https://nuxt.com/docs/api/utils/reload-nuxt-app){rel="&#x22;nofollow&#x22;"} composable. Learn more how we implemented in our [chunk-reload.client.ts plugin](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/plugins/chunk-reload.client.ts){rel="&#x22;nofollow&#x22;"}.

You can also set `experimental.restoreState` to preserve some of your app state across reloads:

We also have a new experimental error handling component: [`<NuxtClientFallback>`](https://nuxt.com/docs/api/components/nuxt-client-fallback) ([#8216](https://github.com/nuxt/framework/pull/8216){rel="&#x22;nofollow&#x22;"}) which can capture errors rendering on server, replace them with fallback content, and granularly trigger rerendering the part with an error on the client. This can be enabled with `experimental.clientFallback` - feedback very welcome!

## ⚡️ Head improvements

We've migrated to use [unhead](https://github.com/unjs/unhead){rel="&#x22;nofollow&#x22;"} directly ([#19519](https://github.com/nuxt/nuxt/pull/19519){rel="&#x22;nofollow&#x22;"}) - and automatically tree-shake server-only head composables like `useServerHead` from your client build ([#19576](https://github.com/nuxt/nuxt/pull/19576){rel="&#x22;nofollow&#x22;"}), meaning you can have great SEO without needing to include meta tag logic that's relevant only for crawlers in your client build.

There's also a new [`useHeadSafe`](https://nuxt.com/docs/api/composables/use-head-safe) composable that handles sanitising untrusted user input ([#19548](https://github.com/nuxt/nuxt/pull/19548){rel="&#x22;nofollow&#x22;"}).

## 🪵 Better logging in browser DevTools

Working with the Chrome DevTools team, we've landed a couple of features across the unjs + Nuxt ecosystem meaning we now have first-class support for hiding Nuxt internal stack traces from logs in your (Chromium-based, for now) browser [#19243](https://github.com/nuxt/nuxt/pull/19243){rel="&#x22;nofollow&#x22;"}. We also landed a couple of improvements with stacktraces involving Nuxt hooks ([unjs/hookable#69](https://github.com/unjs/hookable/pull/69){rel="&#x22;nofollow&#x22;"} and [unjs/hookable#68](https://github.com/unjs/hookable/pull/68){rel="&#x22;nofollow&#x22;"}) implementing [`console.createTask`](https://developer.chrome.com/blog/devtools-modern-web-debugging/#linked-stack-traces){rel="&#x22;nofollow&#x22;"}.

| Before                                                                                                                                                  | After                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![before-nuxt-console-improvements](https://user-images.githubusercontent.com/28706372/220933126-56d9a0e5-e846-4958-a40a-e528a48bcb32.png){width="529"} | ![after-nuxt-console-improvements](https://user-images.githubusercontent.com/28706372/220932932-932f193b-59a6-4385-8796-a62dcfd59c20.png){width="534"} |

## 💪 Type improvements

Types for server API routes are now more correct - with non-serialisable types stripped out of the return type ([unjs/nitro#1002](https://github.com/unjs/nitro/pull/1002){rel="&#x22;nofollow&#x22;"}).

We also now type more of `NuxtApp` and correctly type unknown injections for greater type-safety ([#19643](https://github.com/nuxt/nuxt/pull/19643){rel="&#x22;nofollow&#x22;"}).

And if you were struggling with correct types when using `transform` + `default` with Nuxt data fetching composables, fear no more - we now infer the types correctly ([#19487](https://github.com/nuxt/nuxt/pull/19487){rel="&#x22;nofollow&#x22;"}).

## ⚗️ Nitro enhancements

This release comes with Nitro v2.3, which brings lots of improvements of its own. Check out [the release](https://github.com/unjs/nitro/releases/tag/v2.3.0){rel="&#x22;nofollow&#x22;"} for more info.

We now support [`useAppConfig`](https://nuxt.com/docs/api/composables/use-app-config) in nitro server routes ([#19489](https://github.com/nuxt/nuxt/pull/19489){rel="&#x22;nofollow&#x22;"}) - a long-awaited change. Now [`useAppConfig`](https://nuxt.com/docs/api/composables/use-app-config) is consistently available throughout your app for non-runtime configuration from layers, modules, etc.

We've also added a `nitro:build:public-assets` hook to allow modifying assets output from nitro's prerender/build phase ([#19638](https://github.com/nuxt/nuxt/pull/19638){rel="&#x22;nofollow&#x22;"}).

As part of moving towards [first-class support for PNP and pnpm support without `--shamefully-hoist`](https://github.com/nuxt/nuxt/issues/14146){rel="&#x22;nofollow&#x22;"}, we've dropped support for some internal (deprecated) utilities using CJS resolve patterns ([#19537](https://github.com/nuxt/nuxt/pull/19537){rel="&#x22;nofollow&#x22;"} and [#19608](https://github.com/nuxt/nuxt/pull/19608){rel="&#x22;nofollow&#x22;"}).

We also now resolve dependencies like `nuxt`, `@nuxt/kit` and more using ESM search-paths. We'll be keeping a close eye on this.

We're also preparing the groundwork for support of new TypeScript Node16 module resolution ([#19606](https://github.com/nuxt/nuxt/issues/19606){rel="&#x22;nofollow&#x22;"}), and as part of this have changed the format of our runtime output (using `.js` instead of `.mjs` extensions, providing `types` fields for subpath exports, and more).

## 🗺️ Custom config schema (advanced)

We've been testing out an experimental feature to allow modules and users to extend the Nuxt config schema ([#15592](https://github.com/nuxt/nuxt/issues/15592){rel="&#x22;nofollow&#x22;"}), and we've now enabled this by default ([#19172](https://github.com/nuxt/nuxt/pull/19172){rel="&#x22;nofollow&#x22;"}). We expect this will be particularly useful for module and layer/theme authors, and should result in some nicer DX for their users.

See the full changelog by [comparing the changes](https://github.com/nuxt/nuxt/compare/v3.2.3...v3.3.0){rel="&#x22;nofollow&#x22;"} or checkout the [release on GitHub](https://github.com/nuxt/nuxt/releases/tag/v3.3.0){rel="&#x22;nofollow&#x22;"}.

We would like to thank all the 28 contributors who helped on this release 💚

**Examples:**

Example 1 (diff):
```diff
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
-   '~/modules/purge-comments'
  ]
})
```

Example 2 (html):
```html
<NuxtLink :to="{ name: 'home', query: { year: '2023' } }">Home</NuxtLink>
```

Example 3 (sh):
```sh
DEBUG=1 npx nuxt dev
ℹ Module pages took 1.5ms to setup.
ℹ Module meta took 3.15ms to setup
ℹ Module components took 4.5ms to setup.
...
```

---

## Nuxt 3.10

**URL:** llms-txt#nuxt-3.10

**Contents:**
  - ✨ Experimental shared `asyncData` when prerendering
  - 🆔 SSR-safe accessible unique ID creation
  - ✍️ Extending `app/router.options`
  - :icon{name="i-vscode-icons-file-type-node"} Client-side Node.js support
  - 🍪 Better cookie reactivity
  - 🏥 Detecting anti-patterns
  - 🧂 Granular view transitions support
  - 🏗️ Build-time route metadata
  - 📦 Bundler module resolution
- ✅ Upgrading

v3.10 comes quite close on the heels of v3.9, but it's packed with features and fixes. Here are a few highlights.

### ✨ Experimental shared `asyncData` when prerendering

When prerendering routes, we can end up refetching the same data over and over again. In Nuxt 2 it was possible to create a 'payload' which could be fetched once and then accessed in every page (and this is of course possible to do manually in Nuxt 3 - see [this article](https://roe.dev/blog/shared-data-nuxt-generate){rel="&#x22;nofollow&#x22;"}).

With [#24894](https://github.com/nuxt/nuxt/pull/24894){rel="&#x22;nofollow&#x22;"}, we are now able to do this automatically for you when prerendering your site. Your [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) calls will be deduplicated and cached between renders of your site.

::important
It is particularly important to make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically.)
::

::read-more
---
to: https://nuxt.com/docs/guide/going-further/experimental-features#sharedprerenderdata
---
::

### 🆔 SSR-safe accessible unique ID creation

We now ship a `useId` composable for generating SSR-safe unique IDs ([#23368](https://github.com/nuxt/nuxt/pull/23368){rel="&#x22;nofollow&#x22;"}). This allows creating more accessible interfaces in your app. For example:

### ✍️ Extending `app/router.options`

It's now possible for module authors to inject their own `router.options` files ([#24922](https://github.com/nuxt/nuxt/pull/24922){rel="&#x22;nofollow&#x22;"}). The new `pages:routerOptions` hook allows module authors to do things like add custom `scrollBehavior` or add runtime augmenting of routes.

::read-more
---
to: https://nuxt.com/docs/guide/going-further/custom-routing#router-options
---
::

### :icon{name="i-vscode-icons-file-type-node"} Client-side Node.js support

We now support (experimentally) polyfilling key Node.js built-ins ([#25028](https://github.com/nuxt/nuxt/pull/25028){rel="&#x22;nofollow&#x22;"}), just as we already do via Nitro on the server when deploying to non-Node environments.

That means that, within your client-side code, you can import directly from Node built-ins (`node:` and node imports are supported). However, nothing is globally injected for you, to avoid increasing your bundle size unnecessarily. You can either import them where needed.

Or provide your own polyfill, for example, inside a Nuxt plugin.

This should make life easier for users who are working with libraries without proper browser support. However, because of the risk in increasing your bundle unnecessarily, we would strongly urge users **to choose other alternatives** if at all possible.

### 🍪 Better cookie reactivity

We now allow you to opt-in to using the [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore){rel="&#x22;nofollow&#x22;"}. If browser support is present, this will then be used instead of a BroadcastChannel to update `useCookie` values reactively when the cookies are updated ([#25198](https://github.com/nuxt/nuxt/pull/25198){rel="&#x22;nofollow&#x22;"}).

This also comes paired with a new composable, `refreshCookie` which allows manually refreshing cookie values, such as after performing a request.

::read-more{to="https://nuxt.com/docs/api/utils/refresh-cookie"}
::

### 🏥 Detecting anti-patterns

In this release, we've also shipped a range of features to detect potential bugs and performance problems.

- We now will throw an error if `setInterval` is used on server ([#25259](https://github.com/nuxt/nuxt/pull/25259){rel="&#x22;nofollow&#x22;"}).
- We warn (in development only) if data fetch composables are used wrongly ([#25071](https://github.com/nuxt/nuxt/pull/25071){rel="&#x22;nofollow&#x22;"}), such as outside of a plugin or setup context.
- We warn (in development only) if you are not using `<NuxtPage />` but have the `vue-router` integration enabled ([#25490](https://github.com/nuxt/nuxt/pull/25490){rel="&#x22;nofollow&#x22;"}). (`<RouterView />` should not be used on its own.)

### 🧂 Granular view transitions support

It's now possible to control view transitions support on a per-page basis, using `definePageMeta` ([#25264](https://github.com/nuxt/nuxt/pull/25264){rel="&#x22;nofollow&#x22;"}).

You need to have experimental view transitions support enabled first:

And you can opt in/out granularly:

Finally, Nuxt will not apply View Transitions if the user's browser matches `prefers-reduced-motion: reduce` ([#22292](https://github.com/nuxt/nuxt/pull/22292){rel="&#x22;nofollow&#x22;"}). You can set `viewTransition: 'always'`; it will then be up to you to respect the user's preference.

### 🏗️ Build-time route metadata

It's now possible to access routing metadata defined in `definePageMeta` at build-time, allowing modules and hooks to modify and change these values ([#25210](https://github.com/nuxt/nuxt/pull/25210){rel="&#x22;nofollow&#x22;"}).

Please, experiment with this and let us know how it works for you. We hope to improve performance and enable this by default in a future release so modules like `@nuxtjs/i18n` and others can provide a deeper integration with routing options set in `definePageMeta`.

### 📦 Bundler module resolution

With [#24837](https://github.com/nuxt/nuxt/pull/24837){rel="&#x22;nofollow&#x22;"}, we are now opting in to the TypeScript `bundler` resolution which should more closely resemble the actual way that we resolve subpath imports for modules in Nuxt projects.

'Bundler' module resolution is [recommended by Vue](https://github.com/vuejs/tsconfig/blob/mainz/tsconfig.json#L24-L26){rel="&#x22;nofollow&#x22;"} and [by Vite](https://vitejs.dev/guide/performance.html#reduce-resolve-operations){rel="&#x22;nofollow&#x22;"}, but unfortunately there are still many packages that do not have the correct entries in their `package.json`.

As part of this, we opened 85 PRs across the ecosystem to test switching the default, and identified and fixed some issues.

If you need to switch off this behaviour, you can do so. However, please consider raising an issue (feel free to tag me in it) in the library or module's repo so it can be resolved at source.

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## Full Release Notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.10.0
---
Read the full release notes of Nuxt `v3.10.0`.
::

Thank you for reading this far! We hope you enjoy the new release. Please do let us know if you have any feedback or issues.

**Examples:**

Example 1 (unknown):
```unknown
::important
It is particularly important to make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically.)
::

::read-more
---
to: https://nuxt.com/docs/guide/going-further/experimental-features#sharedprerenderdata
---
::

### 🆔 SSR-safe accessible unique ID creation

We now ship a `useId` composable for generating SSR-safe unique IDs ([#23368](https://github.com/nuxt/nuxt/pull/23368){rel="&#x22;nofollow&#x22;"}). This allows creating more accessible interfaces in your app. For example:
```

Example 2 (unknown):
```unknown
### ✍️ Extending `app/router.options`

It's now possible for module authors to inject their own `router.options` files ([#24922](https://github.com/nuxt/nuxt/pull/24922){rel="&#x22;nofollow&#x22;"}). The new `pages:routerOptions` hook allows module authors to do things like add custom `scrollBehavior` or add runtime augmenting of routes.

::read-more
---
to: https://nuxt.com/docs/guide/going-further/custom-routing#router-options
---
::

### :icon{name="i-vscode-icons-file-type-node"} Client-side Node.js support

We now support (experimentally) polyfilling key Node.js built-ins ([#25028](https://github.com/nuxt/nuxt/pull/25028){rel="&#x22;nofollow&#x22;"}), just as we already do via Nitro on the server when deploying to non-Node environments.

That means that, within your client-side code, you can import directly from Node built-ins (`node:` and node imports are supported). However, nothing is globally injected for you, to avoid increasing your bundle size unnecessarily. You can either import them where needed.
```

Example 3 (unknown):
```unknown
Or provide your own polyfill, for example, inside a Nuxt plugin.
```

Example 4 (unknown):
```unknown
This should make life easier for users who are working with libraries without proper browser support. However, because of the risk in increasing your bundle unnecessarily, we would strongly urge users **to choose other alternatives** if at all possible.

### 🍪 Better cookie reactivity

We now allow you to opt-in to using the [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore){rel="&#x22;nofollow&#x22;"}. If browser support is present, this will then be used instead of a BroadcastChannel to update `useCookie` values reactively when the cookies are updated ([#25198](https://github.com/nuxt/nuxt/pull/25198){rel="&#x22;nofollow&#x22;"}).

This also comes paired with a new composable, `refreshCookie` which allows manually refreshing cookie values, such as after performing a request.

::read-more{to="https://nuxt.com/docs/api/utils/refresh-cookie"}
::

### 🏥 Detecting anti-patterns

In this release, we've also shipped a range of features to detect potential bugs and performance problems.

- We now will throw an error if `setInterval` is used on server ([#25259](https://github.com/nuxt/nuxt/pull/25259){rel="&#x22;nofollow&#x22;"}).
- We warn (in development only) if data fetch composables are used wrongly ([#25071](https://github.com/nuxt/nuxt/pull/25071){rel="&#x22;nofollow&#x22;"}), such as outside of a plugin or setup context.
- We warn (in development only) if you are not using `<NuxtPage />` but have the `vue-router` integration enabled ([#25490](https://github.com/nuxt/nuxt/pull/25490){rel="&#x22;nofollow&#x22;"}). (`<RouterView />` should not be used on its own.)

### 🧂 Granular view transitions support

It's now possible to control view transitions support on a per-page basis, using `definePageMeta` ([#25264](https://github.com/nuxt/nuxt/pull/25264){rel="&#x22;nofollow&#x22;"}).

You need to have experimental view transitions support enabled first:
```

---

## <NuxtClientFallback>

**URL:** llms-txt#<nuxtclientfallback>

**Contents:**
- Events
- Props
- Slots

Nuxt provides the `<NuxtClientFallback>` component to render its content on the client if any of its children trigger an error in SSR.

::note
---
to: https://nuxt.com/docs/guide/going-further/experimental-features#clientfallback
---
This component is experimental and in order to use it you must enable the `experimental.clientFallback` option in your `nuxt.config`.
::

- `@ssr-error`: Event emitted when a child triggers an error in SSR. Note that this will only be triggered on the server.

- `placeholderTag` | `fallbackTag`: Specify a fallback tag to be rendered if the slot fails to render on the server.

- **type**: `string`
  - **default**: `div`
- `placeholder` | `fallback`: Specify fallback content to be rendered if the slot fails to render.

- **type**: `string`
- `keepFallback`: Keep the fallback content if it failed to render server-side.

- **type**: `boolean`
  - **default**: `false`

- `#fallback`: specify content to be displayed server-side if the slot fails to render.

**Examples:**

Example 1 (unknown):
```unknown
## Events

- `@ssr-error`: Event emitted when a child triggers an error in SSR. Note that this will only be triggered on the server.
```

Example 2 (unknown):
```unknown
## Props

- `placeholderTag` | `fallbackTag`: Specify a fallback tag to be rendered if the slot fails to render on the server.


  - **type**: `string`
  - **default**: `div`
- `placeholder` | `fallback`: Specify fallback content to be rendered if the slot fails to render.


  - **type**: `string`
- `keepFallback`: Keep the fallback content if it failed to render server-side.


  - **type**: `boolean`
  - **default**: `false`
```

Example 3 (unknown):
```unknown
## Slots

- `#fallback`: specify content to be displayed server-side if the slot fails to render.
```

---

## Wimadev

**URL:** llms-txt#wimadev

We help you plan, develop, extend and maintain your enterprise grade Nuxt application and Node.js backend. Our customers include big international tech corporations and some of Germanys most well known brands. We have been developing almost exclusively with Nuxt since Nuxt 2 was released about 5 years ago.

---

## Nuxt UI v3

**URL:** llms-txt#nuxt-ui-v3

**Contents:**
- 🚀 Reimagined from the Ground Up
  - **From HeadlessUI to Reka UI**
  - **Tailwind CSS v4 Integration**
- 🎨 A Brand New Design System
- 💚 Complete Vue Compatibility
- 📦 Components for Every Need
- 🔷 Improved TypeScript Integration
- ⬆️ Upgrading to v3
- 🎯 Getting Started

We are thrilled to announce the release of Nuxt UI v3, a complete redesign of our UI library that brings significant improvements in accessibility, performance, and developer experience. This major update represents over 1500 commits of hard work, collaboration, and innovation from our team and the community.

## 🚀 Reimagined from the Ground Up

Nuxt UI v3 represents a major leap forward in our journey to provide the most comprehensive UI solution for Vue and Nuxt developers. This version has been rebuilt from the ground up with modern technologies and best practices in mind.

### **From HeadlessUI to Reka UI**

With Reka UI at its core, Nuxt UI v3 delivers:

• Proper keyboard navigation across all interactive components

• ARIA attributes automatically handled for you

• Focus management that just works

• Screen reader friendly components out of the box

This means you can build applications that work for everyone without becoming an accessibility expert.

### **Tailwind CSS v4 Integration**

The integration with Tailwind CSS v4 brings huge performance improvements:

• **5x faster runtime** with optimized component rendering

• **100x faster build times** thanks to the new CSS-first engine

• Smaller bundle sizes with more efficient styling

Your applications will feel snappier, build quicker, and load faster for your users.

## 🎨 A Brand New Design System

Our new color system includes 7 semantic color aliases:

| Color                        | Default  | Description                                      |
| ---------------------------- | -------- | ------------------------------------------------ |
| `primary`{.text-primary}     | `blue`   | Primary color to represent the brand.            |
| `secondary`{.text-secondary} | `blue`   | Secondary color to complement the primary color. |
| `success`{.text-success}     | `green`  | Used for success states.                         |
| `info`{.text-info}           | `blue`   | Used for informational states.                   |
| `warning`{.text-warning}     | `yellow` | Used for warning states.                         |
| `error`{.text-error}         | `red`    | Used for form error validation states.           |
| `neutral`                    | `slate`  | Neutral color for backgrounds, text, etc.        |

This approach makes your codebase more maintainable and your UI more consistent—especially when working in teams. With these semantic tokens, light and dark mode transitions become effortless, as the system automatically handles the appropriate color values for each theme without requiring duplicate class definitions.

## 💚 Complete Vue Compatibility

We're really happy to expand the scope of Nuxt UI beyond the Nuxt framework. With v3, both Nuxt UI and Nuxt UI Pro now work seamlessly in any Vue project, this means you can:

• Use the same components across all your Vue projects

• Benefit from Nuxt UI's theming system in any Vue application

• Enjoy auto-imports and TypeScript support outside of Nuxt

• Leverage both basic components and advanced Pro components in any Vue project

## 📦 Components for Every Need

With 54 core components, 50 Pro components, and 42 Prose components, Nuxt UI v3 provides solutions for virtually any UI challenge:

• **Data Display**: Tables, charts, and visualizations that adapt to your data

• **Navigation**: Menus, tabs, and breadcrumbs that guide users intuitively

• **Feedback**: Toasts, alerts, and modals that communicate clearly

• **Forms**: Inputs, selectors, and validation that simplify data collection

• **Layout**: Grids, containers, and responsive systems that organize content beautifully

Each component is designed to be both beautiful out of the box and deeply customizable when needed.

## 🔷 Improved TypeScript Integration

We've completely revamped our TypeScript integration, with features that make you more productive:

- Complete type safety with helpful autocompletion
- Generic-based components for flexible APIs
- Type-safe theming through a clear, consistent API

## ⬆️ Upgrading to v3

We've prepared a comprehensive [migration](https://ui.nuxt.com/getting-started/migration){rel="&#x22;nofollow&#x22;"} guide to help you upgrade from v2 to v3. While there are breaking changes due to our complete overhaul, we've worked hard to make the transition as smooth as possible.

Whether you're starting a new project or upgrading an existing one, getting started with Nuxt UI v3 is easy:

**Examples:**

Example 1 (html):
```html
<!-- Before: Inconsistent color usage with duplicate dark mode classes -->
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
  <h2 class="text-gray-900 dark:text-white text-xl mb-2">User Profile</h2>
  <p class="text-gray-600 dark:text-gray-300">Account settings and preferences</p>
  <button class="bg-blue-500 text-white px-3 py-1 rounded mt-2">Edit Profile</button>
</div>
```

Example 2 (html):
```html
<!-- After: Semantic design tokens with automatic dark mode support -->
<div class="bg-muted p-4 rounded-lg">
  <h2 class="text-highlighted text-xl mb-2">User Profile</h2>
  <p class="text-muted">Account settings and preferences</p>
  <UButton color="primary" size="sm" class="mt-2">Edit Profile</UButton>
</div>
```

Example 3 (unknown):
```unknown
## 📦 Components for Every Need

With 54 core components, 50 Pro components, and 42 Prose components, Nuxt UI v3 provides solutions for virtually any UI challenge:

• **Data Display**: Tables, charts, and visualizations that adapt to your data

• **Navigation**: Menus, tabs, and breadcrumbs that guide users intuitively

• **Feedback**: Toasts, alerts, and modals that communicate clearly

• **Forms**: Inputs, selectors, and validation that simplify data collection

• **Layout**: Grids, containers, and responsive systems that organize content beautifully

Each component is designed to be both beautiful out of the box and deeply customizable when needed.

## 🔷 Improved TypeScript Integration

We've completely revamped our TypeScript integration, with features that make you more productive:

- Complete type safety with helpful autocompletion
- Generic-based components for flexible APIs
- Type-safe theming through a clear, consistent API
```

Example 4 (unknown):
```unknown
## ⬆️ Upgrading to v3

We've prepared a comprehensive [migration](https://ui.nuxt.com/getting-started/migration){rel="&#x22;nofollow&#x22;"} guide to help you upgrade from v2 to v3. While there are breaking changes due to our complete overhaul, we've worked hard to make the transition as smooth as possible.

## 🎯 Getting Started

Whether you're starting a new project or upgrading an existing one, getting started with Nuxt UI v3 is easy:
```

---

## Deno Deploy

**URL:** llms-txt#deno-deploy

**Contents:**
- Deploy with the CLI

::important
Deno deploy preset is experimental.
::

## Deploy with the CLI

You can use [deployctl](https://deno.com/deploy/docs/deployctl){rel="&#x22;nofollow&#x22;"} to deploy your app.

Login to [Deno Deploy](https://dash.deno.com/account#access-tokens){rel="&#x22;nofollow&#x22;"} to obtain a `DENO_DEPLOY_TOKEN` access token, and set it as an environment variable.

---

## Stormkit

**URL:** llms-txt#stormkit

**Contents:**
- Setup
- Deployment

::tip
**Zero Configuration ✨**

Integration with [Stormkit](https://www.stormkit.io/){rel=""nofollow""} is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

Follow the steps to [create a new app](https://app.stormkit.io/apps/new){rel="&#x22;nofollow&#x22;"} on Stormkit.

By default, Stormkit will deploy your apps automatically when you push changes to your main branch. But to trigger a manual deploy (for example, you might do this for the very first deployment), you may click `Deploy now`.

::read-more
---
target: _blank
to: https://nitro.unjs.io/deploy/providers/stormkit
---
Head over **Nitro documentation** to learn more about the stormkit deployment preset.
::

---

## nuxt test

**URL:** llms-txt#nuxt-test

**Contents:**
- Arguments
- Options

The `test` command runs tests using [`@nuxt/test-utils`](https://nuxt.com/docs/getting-started/testing). This command sets `process.env.NODE_ENV` to `test` if not already set.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default | Description                                                                      |
| ---------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `--cwd=<directory>`                |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                                                     |
| `--dev`                            |         | Run in dev mode                                                                  |
| `--watch`                          |         | Watch mode                                                                       |

::note
This command sets `process.env.NODE_ENV` to `test`.
::

---

## Why is it important to fix them?

**URL:** llms-txt#why-is-it-important-to-fix-them?

**Contents:**
- Performance Impact
- Functionality Issues

Hydration mismatches are not just warnings - they are indicators of serious problems that can break your application:

## Performance Impact

- **Increased time to interactive**: Hydration errors force Vue to re-render the entire component tree, which will increase the time for your Nuxt app to become interactive
- **Poor user experience**: Users may see content flashing or unexpected layout shifts

## Functionality Issues

- **Broken interactivity**: Event listeners may not attach properly, leaving buttons and forms non-functional
- **State inconsistencies**: Application state can become out of sync between what the user sees and what the application thinks is rendered
- **SEO problems**: Search engines may index different content than what users actually see

---

## ignore layout files whose name ends with -ignore.vue

**URL:** llms-txt#ignore-layout-files-whose-name-ends-with--ignore.vue

---

## Design Kit

**URL:** llms-txt#design-kit

**Contents:**
- Logo History
- Nuxt Logo
  - Icon
  - Logo
- Color Palette

The Nuxt logo has evolved gradually over time, but the mountain shape and wordmark have been constant elements in its design.

::div{.hidden.lg:block}
![Nuxt Logo Timeline](https://nuxt.com/assets/design-kit/timeline-light.svg){.dark:hidden.w-full}![Nuxt Logo Timeline](https://nuxt.com/assets/design-kit/timeline-dark.svg){.hidden.dark:block.w-full}
::

::div{.lg:hidden}
![Nuxt Logo Timeline](https://nuxt.com/assets/design-kit/timeline-mobile-light.svg){.dark:hidden.w-full}![Nuxt Logo Timeline](https://nuxt.com/assets/design-kit/timeline-mobile-dark.svg){.hidden.dark:block.w-full}
::

The logo is made from two elements: the triangular mountains and the wordmark. In most cases, they should appear together as the opposite master lockup shows. The triangular mountains can be used on their own as an icon, profile picture or badge, but the wordmark should never be used without this symbol on the side.

::u-page-grid
  :::design-kit-image-card{name="Green" path="icon-green"}
  :::

:::design-kit-image-card{background="bg-white" name="Black" path="icon-black"}
  :::

:::design-kit-image-card
  ---
  background: bg-gray-950
  name: White
  path: icon-white
  ---
  :::
::

::u-page-grid
  :::design-kit-image-card
  ---
  full: true
  background: bg-gray-950
  name: Green & white
  path: logo-green-white
  ---
  :::

:::design-kit-image-card
  ---
  full: true
  background: bg-white
  name: Black
  path: logo-black
  ---
  :::

:::design-kit-image-card
  ---
  full: true
  background: bg-gray-950
  name: White
  path: logo-white
  ---
  :::

:::design-kit-image-card
  ---
  full: true
  background: bg-white
  name: Green & black
  path: logo-green-black
  ---
  :::
::

Our color palette is based on our iconic Nuxt green and colours have been carefully considered to work in harmony and consistency across various media. When creating Nuxt communications, use the colour values shown to make sure your designs stay on-brand.

::u-page-grid
  :::design-kit-color-card{background="#00DC82" name="Green"}
  :::

:::design-kit-color-card{background="#FFFFFF" name="White"}
  :::

:::design-kit-color-card{background="#020420" name="Gray"}
  :::
::

---

## Layout

**URL:** llms-txt#layout

**Contents:**
- `addLayout`
  - Usage
  - Type
  - Parameters
  - Example

Layouts is used to be a wrapper around your pages. It can be used to wrap your pages with common components, for example, a header and a footer. Layouts can be registered using `addLayout` utility.

Register template as layout and add it to the layouts.

::note
In Nuxt 2 `error` layout can also be registered using this utility. In Nuxt 3+ `error` layout [replaced](https://nuxt.com/docs/3.x/getting-started/error-handling#rendering-an-error-page) with `error.vue` page in project root.
::

**`layout`**: A template object or a string with the path to the template. If a string is provided, it will be converted to a template object with `src` set to the string value. If a template object is provided, it must have the following properties:

| Property      | Type                                                                                                                                                   | Required | Description                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `string`                                                                                                                                               | `false`  | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                                                          |
| `filename`    | `string`                                                                                                                                               | `false`  | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required.                                   |
| `dst`         | `string`                                                                                                                                               | `false`  | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.                                                |
| `options`     | `Record<string, any>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                | `false`  | Options to pass to the template.                                                                                                                                                 |
| `getContents` | `(data) => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |
| `write`       | `boolean`                                                                                                                                              | `false`  | If set to `true`, the template will be written to the destination file. Otherwise, the template will be used only in virtual filesystem.                                         |

**`name`**: The name to register the layout under (e.g., `default`, `custom`, etc.).

This will register a layout named `custom` that wraps pages with a header and footer.

You can then use this layout in your pages:

::warning
Due to the lack of support for virtual `.vue` files by `@vitejs/plugin-vue`, you can work around this limitation by passing `write: true` to the first argument of `addLayout`.
::

**Examples:**

Example 1 (unknown):
```unknown
### Type
```

Example 2 (unknown):
```unknown
### Parameters

**`layout`**: A template object or a string with the path to the template. If a string is provided, it will be converted to a template object with `src` set to the string value. If a template object is provided, it must have the following properties:

| Property      | Type                                                                                                                                                   | Required | Description                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `string`                                                                                                                                               | `false`  | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                                                          |
| `filename`    | `string`                                                                                                                                               | `false`  | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required.                                   |
| `dst`         | `string`                                                                                                                                               | `false`  | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.                                                |
| `options`     | `Record<string, any>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                | `false`  | Options to pass to the template.                                                                                                                                                 |
| `getContents` | `(data) => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |
| `write`       | `boolean`                                                                                                                                              | `false`  | If set to `true`, the template will be written to the destination file. Otherwise, the template will be used only in virtual filesystem.                                         |

**`name`**: The name to register the layout under (e.g., `default`, `custom`, etc.).

### Example

This will register a layout named `custom` that wraps pages with a header and footer.
```

Example 3 (unknown):
```unknown
You can then use this layout in your pages:
```

---

## setPageLayout

**URL:** llms-txt#setpagelayout

::important
`setPageLayout` allows you to dynamically change the layout of a page. It relies on access to the Nuxt context and therefore can only be called within the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
If you choose to set the layout dynamically on the server side, you *must* do so before the layout is rendered by Vue (that is, within a plugin or route middleware) to avoid a hydration mismatch.
::

---

## Nuxt Configuration

**URL:** llms-txt#nuxt-configuration

**Contents:**
- alias
- analyzeDir
- app
  - `baseURL`
  - `buildAssetsDir`
  - `cdnURL`
  - `head`
  - `keepalive`
  - `layoutTransition`
  - `pageTransition`

::note
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/tree/main/packages/schema/src/config
---
This file is auto-generated from Nuxt source code.
::

You can improve your DX by defining additional aliases to access custom directories within your JavaScript and CSS.

- **Type**: `object`
- **Default**

::callout
**Note**: Within a webpack context (image sources, CSS - but not JavaScript) you *must* access
your alias by prefixing it with `~`.
::

::callout
**Note**: These aliases will be automatically added to the generated `.nuxt/tsconfig.json` so you can get full
type support and path auto-complete. In case you need to extend options provided by `./.nuxt/tsconfig.json`
further, make sure to add them here or within the `typescript.tsConfig` property in `nuxt.config`.
::

The directory where Nuxt will store the generated files when running `nuxt analyze`.

If a relative path is specified, it will be relative to your `rootDir`.

- **Type**: `string`
- **Default:** `"/<rootDir>/.nuxt/analyze"`

Nuxt App configuration.

The base path of your Nuxt application.

- **Type**: `string`
- **Default:** `"/"`

The folder name for the built site assets, relative to `baseURL` (or `cdnURL` if set). This is set at build time and should not be customized at runtime.

- **Type**: `string`
- **Default:** `"/_nuxt/"`

An absolute URL to serve the public folder from (production-only).

- **Type**: `string`
- **Default:** `""`

Set default configuration for `<head>` on every page.

- **Type**: `object`
- **Default**

Default values for KeepAlive configuration between pages.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Vue KeepAlive](https://vuejs.org/api/built-in-components.html#keepalive){rel="&#x22;nofollow&#x22;"}

### `layoutTransition`

Default values for layout transitions.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Vue Transition docs](https://vuejs.org/api/built-in-components.html#transition){rel="&#x22;nofollow&#x22;"}

Default values for page transitions.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Vue Transition docs](https://vuejs.org/api/built-in-components.html#transition){rel="&#x22;nofollow&#x22;"}

Customize Nuxt root element id.

- **Type**: `object`
- **Default**

Customize Nuxt root element id.

- **Type**: `string`
- **Default:** `"__nuxt"`

Customize Nuxt root element tag.

- **Type**: `string`
- **Default:** `"div"`

Customize Nuxt Nuxt SpaLoader element attributes.

- **Type**: `string`
- **Default:** `"__nuxt-loader"`

Customize Nuxt SpaLoader element tag.

- **Type**: `string`
- **Default:** `"div"`

Customize Nuxt Teleport element attributes.

- **Type**: `object`
- **Default**

Customize Nuxt Teleport element id.

- **Type**: `string`
- **Default:** `"teleports"`

Customize Nuxt Teleport element tag.

- **Type**: `string`
- **Default:** `"div"`

Default values for view transitions.

This only has an effect when **experimental** support for View Transitions is [enabled in your nuxt.config file](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental).
This can be overridden with `definePageMeta` on an individual page.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Nuxt View Transition API docs](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental){rel="&#x22;nofollow&#x22;"}

Additional app configuration

For programmatic usage and type support, you can directly provide app config with this option. It will be merged with `app.config` file as default value.

For multi-app projects, the unique id of the Nuxt application.

Defaults to `nuxt-app`.

- **Type**: `string`
- **Default:** `"nuxt-app"`

Shared build configuration.

Nuxt allows visualizing your bundles and how to optimize them.

Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin){rel="&#x22;nofollow&#x22;"} or [for vite](https://github.com/btd/rollup-plugin-visualizer#options){rel="&#x22;nofollow&#x22;"}.

- **Type**: `object`
- **Default**

It is recommended to use `addTemplate` from `@nuxt/kit` instead of this option.

If you want to transpile specific dependencies with Babel, you can add them here. Each item in transpile can be a package name, a function, a string or regex object matching the dependency's file name.

You can also use a function to conditionally transpile. The function will receive an object ({ isDev, isServer, isClient, isModern, isLegacy }).

Define the directory where your built Nuxt files will be placed.

Many tools assume that `.nuxt` is a hidden directory (because it starts with a `.`). If that is a problem, you can use this option to prevent that.

- **Type**: `string`
- **Default:** `"/<rootDir>/.nuxt"`

A unique identifier matching the build. This may contain the hash of the current state of the project.

- **Type**: `string`
- **Default:** `"58e83ac3-9f93-49e4-a151-c80aec209c10"`

The builder to use for bundling the Vue part of your application.

- **Type**: `string`
- **Default:** `"@nuxt/vite-builder"`

Specify a compatibility date for your app.

This is used to control the behavior of presets in Nitro, Nuxt Image and other modules that may change behavior without a major version bump.
We plan to improve the tooling around this feature in the future.

Configure Nuxt component auto-registration.

Any components in the directories configured here can be used throughout your pages, layouts (and other components) without needing to explicitly import them.

- **Type**: `object`
- **Default**

**See**: [`components/` directory documentation](https://nuxt.com/docs/guide/directory-structure/components){rel="&#x22;nofollow&#x22;"}

You can define the CSS files/modules/libraries you want to set globally (included in every page).

Nuxt will automatically guess the file type by its extension and use the appropriate pre-processor. You will still need to install the required loader if you need to use them.

Set to `true` to enable debug mode.

At the moment, it prints out hook names and timings on the server, and logs hook arguments as well in the browser.
You can also set this to an object to enable specific debug options.

- **Type**: `boolean`
- **Default:** `false`

Whether Nuxt is running in development mode.

Normally, you should not need to set this.

- **Type**: `boolean`
- **Default:** `false`

Set CORS options for the dev server

- **Type**: `array`
- **Default**

Dev server listening host

Whether to enable HTTPS.

- **Type**: `boolean`
- **Default:** `false`

### `loadingTemplate`

Template to show a loading screen

- **Type**: `function`

Dev server listening port

- **Type**: `number`
- **Default:** `3000`

Listening dev server URL.

This should not be set directly as it will always be overridden by the dev server with the full URL (for module and internal use).

- **Type**: `string`
- **Default:** `"http://localhost:3000"`

Nitro development-only server handlers.

**See**: [Nitro server routes documentation](https://nitro.build/guide/routing){rel="&#x22;nofollow&#x22;"}

Enable Nuxt DevTools for development.

Breaking changes for devtools might not reflect on the version of Nuxt.

**See**: [Nuxt DevTools](https://devtools.nuxt.com/){rel="&#x22;nofollow&#x22;"} for more information.

Customize default directory structure used by Nuxt.

It is better to stick with defaults unless needed.

- **Type**: `string`
- **Default:** `"app"`

The assets directory (aliased as `~assets` in your build).

- **Type**: `string`
- **Default:** `"assets"`

The layouts directory, each file of which will be auto-registered as a Nuxt layout.

- **Type**: `string`
- **Default:** `"layouts"`

The middleware directory, each file of which will be auto-registered as a Nuxt middleware.

- **Type**: `string`
- **Default:** `"middleware"`

The modules directory, each file in which will be auto-registered as a Nuxt module.

- **Type**: `string`
- **Default:** `"modules"`

The directory which will be processed to auto-generate your application page routes.

- **Type**: `string`
- **Default:** `"pages"`

The plugins directory, each file of which will be auto-registered as a Nuxt plugin.

- **Type**: `string`
- **Default:** `"plugins"`

The directory containing your static files, which will be directly accessible via the Nuxt server and copied across into your `dist` folder when your app is generated.

- **Type**: `string`
- **Default:** `"public"`

The shared directory. This directory is shared between the app and the server.

- **Type**: `string`
- **Default:** `"shared"`

- **Type**: `string`
- **Default:** `"public"`

Configure shared esbuild options used within Nuxt and passed to other builders, such as Vite or Webpack.

- **Type**: `string`
- **Default:** `"h"`

- **Type**: `string`
- **Default:** `"Fragment"`

- **Type**: `string`
- **Default:** `"esnext"`

### `alwaysRunFetchOnKeyChange`

Whether to run `useFetch` when the key changes, even if it is set to `immediate: false` and it has not been triggered yet.

`useFetch` and `useAsyncData` will always run when the key changes if `immediate: true` or if it has been already triggered.

- **Type**: `boolean`
- **Default:** `true`

Use app manifests to respect route rules on client-side.

- **Type**: `boolean`
- **Default:** `true`

Enable native async context to be accessible for nested composables

- **Type**: `boolean`
- **Default:** `false`

**See**: [Nuxt PR #20918](https://github.com/nuxt/nuxt/pull/20918){rel="&#x22;nofollow&#x22;"}

Set to true to generate an async entry point for the Vue bundle (for module federation support).

- **Type**: `boolean`
- **Default:** `false`

### `browserDevtoolsTiming`

Enable timings for Nuxt application hooks in the performance panel of Chromium-based browsers.

This feature adds performance markers for Nuxt hooks, allowing you to track their execution time in the browser's Performance tab. This is particularly useful for debugging performance issues.

- **Type**: `boolean`
- **Default:** `false`

**See**: [PR #29922](https://github.com/nuxt/nuxt/pull/29922){rel="&#x22;nofollow&#x22;"}

**See**: [Chrome DevTools Performance API](https://developer.chrome.com/docs/devtools/performance/extension#tracks){rel="&#x22;nofollow&#x22;"}

Cache Nuxt/Nitro build artifacts based on a hash of the configuration and source files.

This only works for source files within `srcDir` and `serverDir` for the Vue/Nitro parts of your app.

- **Type**: `boolean`
- **Default:** `false`

### `checkOutdatedBuildInterval`

Set the time interval (in ms) to check for new builds. Disabled when `experimental.appManifest` is `false`.

Set to `false` to disable.

- **Type**: `number`
- **Default:** `3600000`

### `chromeDevtoolsProjectSettings`

Enable integration with Chrome DevTools Workspaces for Nuxt projects.

- **Type**: `boolean`
- **Default:** `true`

**See**: [Chrome DevTools Project Settings](https://docs.google.com/document/d/1rfKPnxsNuXhnF7AiQZhu9kIwdiMS5hnAI05HBwFuBSM){rel="&#x22;nofollow&#x22;"}

Whether to enable the experimental `<NuxtClientFallback>` component for rendering content on the client if there's an error in SSR.

- **Type**: `boolean`
- **Default:** `false`

### `clientNodeCompat`

Automatically polyfill Node.js imports in the client build using `unenv`.

- **Type**: `boolean`
- **Default:** `false`

**See**: [unenv](https://github.com/unjs/unenv){rel="&#x22;nofollow&#x22;"}

### `compileTemplate`

Whether to use `lodash.template` to compile Nuxt templates.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

- **Type**: `boolean`
- **Default:** `true`

### `componentIslands`

Experimental component islands support with `<NuxtIsland>` and `.island.vue` files.

By default it is set to 'auto', which means it will be enabled only when there are islands, server components or server pages in your app.

- **Type**: `string`
- **Default:** `"auto"`

Config schema support

- **Type**: `boolean`
- **Default:** `true`

**See**: [Nuxt Issue #15592](https://github.com/nuxt/nuxt/issues/15592){rel="&#x22;nofollow&#x22;"}

Enables CookieStore support to listen for cookie updates (if supported by the browser) and refresh `useCookie` ref values.

- **Type**: `boolean`
- **Default:** `true`

**See**: [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore){rel="&#x22;nofollow&#x22;"}

### `crossOriginPrefetch`

Enable cross-origin prefetch using the Speculation Rules API.

- **Type**: `boolean`
- **Default:** `false`

### `debugModuleMutation`

Record mutations to `nuxt.options` in module context, helping to debug configuration changes made by modules during the Nuxt initialization phase.

When enabled, Nuxt will track which modules modify configuration options, making it easier to trace unexpected configuration changes.

- **Type**: `boolean`
- **Default:** `false`

**See**: [PR #30555](https://github.com/nuxt/nuxt/pull/30555){rel="&#x22;nofollow&#x22;"}

Enable to use experimental decorators in Nuxt and Nitro.

- **Type**: `boolean`
- **Default:** `false`

**See**: <https://github.com/tc39/proposal-decorators>{rel="&#x22;nofollow&#x22;"}

This allows specifying the default options for core Nuxt components and composables.

These options will likely be moved elsewhere in the future, such as into `app.config` or into the `app/` directory.

##### `componentName`

- **Type**: `string`
- **Default:** `"NuxtLink"`

- **Type**: `boolean`
- **Default:** `true`

- **Type**: `boolean`
- **Default:** `true`

Options that apply to `useAsyncData` (and also therefore `useFetch`)

- **Type**: `boolean`
- **Default:** `true`

- **Type**: `string`
- **Default:** `"null"`

- **Type**: `string`
- **Default:** `"null"`

### `emitRouteChunkError`

Emit `app:chunkError` hook when there is an error loading vite/webpack chunks.

By default, Nuxt will also perform a reload of the new route when a chunk fails to load when navigating to a new route (`automatic`).
Setting `automatic-immediate` will lead Nuxt to perform a reload of the current route right when a chunk fails to load (instead of waiting for navigation).
You can disable automatic handling by setting this to `false`, or handle chunk errors manually by setting it to `manual`.

- **Type**: `string`
- **Default:** `"automatic"`

**See**: [Nuxt PR #19038](https://github.com/nuxt/nuxt/pull/19038){rel="&#x22;nofollow&#x22;"}

### `enforceModuleCompatibility`

Whether Nuxt should stop if a Nuxt module is incompatible.

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `boolean`
- **Default:** `true`

Externalize `vue`, `@vue/*` and `vue-router` when building.

- **Type**: `boolean`
- **Default:** `true`

**See**: [Nuxt Issue #13632](https://github.com/nuxt/nuxt/issues/13632){rel="&#x22;nofollow&#x22;"}

### `extraPageMetaExtractionKeys`

Configure additional keys to extract from the page metadata when using `scanPageMeta`.

This allows modules to access additional metadata from the page metadata. It's recommended to augment the NuxtPage types with your keys.

### `extractAsyncDataHandlers`

- **Type**: `boolean`
- **Default:** `false`

### `granularCachedData`

Whether to call and use the result from `getCachedData` on manual refresh for `useAsyncData` and `useFetch`.

- **Type**: `boolean`
- **Default:** `false`

Use new experimental head optimisations:

- Add the capo.js head plugin in order to render tags in of the head in a more performant way. - Uses the hash hydration plugin to reduce initial hydration
- **Type**: `boolean`
- **Default:** `true`

**See**: [Nuxt Discussion #22632](https://github.com/nuxt/nuxt/discussions/22632){rel="&#x22;nofollow&#x22;"}

### `inlineRouteRules`

Allow defining `routeRules` directly within your `~/pages` directory using `defineRouteRules`.

Rules are converted (based on the path) and applied for server requests. For example, a rule defined in `~/pages/foo/bar.vue` will be applied to `/foo/bar` requests. A rule in `~/pages/foo/[id].vue` will be applied to `/foo/**` requests.
For more control, such as if you are using a custom `path` or `alias` set in the page's `definePageMeta`, you should set `routeRules` directly within your `nuxt.config`.

- **Type**: `boolean`
- **Default:** `false`

Enable automatic configuration of hydration strategies for `<Lazy>` components.

This feature intelligently determines when to hydrate lazy components based on visibility, idle time, or other triggers, improving performance by deferring hydration of components until they're needed.

- **Type**: `boolean`
- **Default:** `true`

**See**: [PR #26468](https://github.com/nuxt/nuxt/pull/26468){rel="&#x22;nofollow&#x22;"}

### `localLayerAliases`

Resolve `~`, `~~`, `@` and `@@` aliases located within layers with respect to their layer source and root directories.

- **Type**: `boolean`
- **Default:** `true`

### `navigationRepaint`

Wait for a single animation frame before navigation, which gives an opportunity for the browser to repaint, acknowledging user interaction.

It can reduce INP when navigating on prerendered routes.

- **Type**: `boolean`
- **Default:** `true`

Disable vue server renderer endpoint within nitro.

- **Type**: `boolean`
- **Default:** `false`

### `normalizeComponentNames`

Ensure that auto-generated Vue component names match the full component name you would use to auto-import the component.

- **Type**: `boolean`
- **Default:** `false`

Whether to parse `error.data` when rendering a server error page.

- **Type**: `boolean`
- **Default:** `false`

### `payloadExtraction`

When this option is enabled (by default) payload of pages that are prerendered are extracted

- **Type**: `boolean`
- **Default:** `true`

### `pendingWhenIdle`

For `useAsyncData` and `useFetch`, whether `pending` should be `true` when data has not yet started to be fetched.

- **Type**: `boolean`
- **Default:** `true`

### `polyfillVueUseHead`

Whether or not to add a compatibility layer for modules, plugins or user code relying on the old `@vueuse/head` API.

This is disabled to reduce the client-side bundle by \~0.5kb.

- **Type**: `boolean`
- **Default:** `false`

### `purgeCachedData`

Whether to clean up Nuxt static and asyncData caches on route navigation.

Nuxt will automatically purge cached data from `useAsyncData` and `nuxtApp.static.data`. This helps prevent memory leaks and ensures fresh data is loaded when needed, but it is possible to disable it.

- **Type**: `boolean`
- **Default:** `true`

**See**: [PR #31379](https://github.com/nuxt/nuxt/pull/31379){rel="&#x22;nofollow&#x22;"}

### `relativeWatchPaths`

Whether to provide relative paths in the `builder:watch` hook.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

- **Type**: `boolean`
- **Default:** `true`

### `renderJsonPayloads`

Render JSON payloads with support for revivifying complex types.

- **Type**: `boolean`
- **Default:** `true`

### `resetAsyncDataToUndefined`

Whether `clear` and `clearNuxtData` should reset async data to its *default* value or update it to `null`/`undefined`.

- **Type**: `boolean`
- **Default:** `true`

### `respectNoSSRHeader`

Allow disabling Nuxt SSR responses by setting the `x-nuxt-no-ssr` header.

- **Type**: `boolean`
- **Default:** `false`

Whether to restore Nuxt app state from `sessionStorage` when reloading the page after a chunk error or manual `reloadNuxtApp()` call.

To avoid hydration errors, it will be applied only after the Vue app has been mounted, meaning there may be a flicker on initial load.
Consider carefully before enabling this as it can cause unexpected behavior, and consider providing explicit keys to `useState` as auto-generated keys may not match across builds.

- **Type**: `boolean`
- **Default:** `false`

Allow exposing some route metadata defined in `definePageMeta` at build-time to modules (alias, name, path, redirect, props, middleware).

This only works with static or strings/arrays rather than variables or conditional assignment.

- **Type**: `boolean`
- **Default:** `true`

**See**: [Nuxt Issues #24770](https://github.com/nuxt/nuxt/issues/24770){rel="&#x22;nofollow&#x22;"}

### `sharedPrerenderData`

Automatically share payload *data* between pages that are prerendered. This can result in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and fetch the same data in different pages.

It is particularly important when enabling this feature to make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically for you.)

- **Type**: `boolean`
- **Default:** `false`

### `spaLoadingTemplateLocation`

Keep showing the spa-loading-template until suspense\:resolve

- **Type**: `string`
- **Default:** `"within"`

**See**: [Nuxt Issues #21721](https://github.com/nuxt/nuxt/issues/21721){rel="&#x22;nofollow&#x22;"}

### `templateImportResolution`

Disable resolving imports into Nuxt templates from the path of the module that added the template.

By default, Nuxt attempts to resolve imports in templates relative to the module that added them. Setting this to `false` disables this behavior, which may be useful if you're experiencing resolution conflicts in certain environments.

- **Type**: `boolean`
- **Default:** `true`

**See**: [PR #31175](https://github.com/nuxt/nuxt/pull/31175){rel="&#x22;nofollow&#x22;"}

### `templateRouteInjection`

By default the route object returned by the auto-imported `useRoute()` composable is kept in sync with the current page in view in `<NuxtPage>`. This is not true for `vue-router`'s exported `useRoute` or for the default `$route` object available in your Vue templates.

By enabling this option a mixin will be injected to keep the `$route` template object in sync with Nuxt's managed `useRoute()`.

- **Type**: `boolean`
- **Default:** `true`

Whether to provide a legacy `templateUtils` object (with `serialize`, `importName` and `importSources`) when compiling Nuxt templates.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

- **Type**: `boolean`
- **Default:** `true`

### `treeshakeClientOnly`

Tree shakes contents of client-only components from server bundle.

- **Type**: `boolean`
- **Default:** `true`

**See**: [Nuxt PR #5750](https://github.com/nuxt/framework/pull/5750){rel="&#x22;nofollow&#x22;"}

Enable the new experimental typed router using [unplugin-vue-router](https://github.com/posva/unplugin-vue-router){rel="&#x22;nofollow&#x22;"}.

- **Type**: `boolean`
- **Default:** `false`

Enable View Transition API integration with client-side router.

- **Type**: `boolean`
- **Default:** `false`

**See**: [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions){rel="&#x22;nofollow&#x22;"}

### `viteEnvironmentApi`

- **Type**: `boolean`
- **Default:** `false`

Set an alternative watcher that will be used as the watching service for Nuxt.

Nuxt uses 'chokidar-granular' if your source directory is the same as your root directory . This will ignore top-level directories (like `node_modules` and `.git`) that are excluded from watching.
You can set this instead to `parcel` to use `@parcel/watcher`, which may improve performance in large projects or on Windows platforms.
You can also set this to `chokidar` to watch all files in your source directory.

- **Type**: `string`
- **Default:** `"chokidar"`

**See**: [chokidar](https://github.com/paulmillr/chokidar){rel="&#x22;nofollow&#x22;"}

**See**: [@parcel/watcher](https://github.com/parcel-bundler/watcher){rel="&#x22;nofollow&#x22;"}

### `writeEarlyHints`

Write early hints when using node server.

- **Type**: `boolean`
- **Default:** `false`

::callout
**Note**: nginx does not support 103 Early hints in the current version.
::

Extend project from multiple local or remote sources.

Value should be either a string or array of strings pointing to source directories or config path relative to current config.
You can use `github:`, `gh:` `gitlab:` or `bitbucket:`

**See**: [`c12` docs on extending config layers](https://github.com/unjs/c12#extending-config-layer-from-remote-sources){rel="&#x22;nofollow&#x22;"}

**See**: [`giget` documentation](https://github.com/unjs/giget){rel="&#x22;nofollow&#x22;"}

The extensions that should be resolved by the Nuxt resolver.

- **Type**: `array`
- **Default**

Some features of Nuxt are available on an opt-in basis, or can be disabled based on your needs.

Stream server logs to the client as you are developing. These logs can be handled in the `dev:ssr-logs` hook.

If set to `silent`, the logs will not be printed to the browser console.

- **Type**: `boolean`
- **Default:** `false`

Inline styles when rendering HTML (currently vite only).

You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.

- **Type**: `boolean`
- **Default:** `true`

Turn off rendering of Nuxt scripts and JS resource hints. You can also disable scripts more granularly within `routeRules`.

If set to 'production' or `true`, JS will be disabled in production mode only.

- **Type**: `boolean`
- **Default:** `false`

`future` is for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### `compatibilityVersion`

Enable early access to Nuxt v4 features or flags.

Setting `compatibilityVersion` to `4` changes defaults throughout your Nuxt configuration, but you can granularly re-enable Nuxt v3 behaviour when testing (see example). Please file issues if so, so that we can address in Nuxt or in the ecosystem.

- **Type**: `number`
- **Default:** `3`

This enables early access to the experimental multi-app support.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Nuxt Issue #21635](https://github.com/nuxt/nuxt/issues/21635){rel="&#x22;nofollow&#x22;"}

### `typescriptBundlerResolution`

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting for frameworks like Nuxt and Vite.

It improves type support when using modern libraries with `exports`.
You can set it to false to use the legacy 'Node' mode, which is the default for TypeScript.

- **Type**: `boolean`
- **Default:** `true`

**See**: [TypeScript PR implementing `bundler` module resolution](https://github.com/microsoft/TypeScript/pull/51669){rel="&#x22;nofollow&#x22;"}

This option is no longer used. Instead, use `nitro.prerender.ignore`.

The routes to generate.

If you are using the crawler, this will be only the starting point for route generation. This is often necessary when using dynamic routes.
It is preferred to use `nitro.prerender.routes`.

Hooks are listeners to Nuxt events that are typically used in modules, but are also available in `nuxt.config`.

Internally, hooks follow a naming pattern using colons (e.g., build\:done).
For ease of configuration, you can also structure them as an hierarchical object in `nuxt.config` (as below).

More customizable than `ignorePrefix`: all files matching glob patterns specified inside the `ignore` array will be ignored in building.

- **Type**: `array`
- **Default**

Pass options directly to `node-ignore` (which is used by Nuxt to ignore files).

**See**: [node-ignore](https://github.com/kaelzhang/node-ignore){rel="&#x22;nofollow&#x22;"}

Any file in `pages/`, `layouts/`, `middleware/`, and `public/` directories will be ignored during the build process if its filename starts with the prefix specified by `ignorePrefix`. This is intended to prevent certain files from being processed or served in the built application. By default, the `ignorePrefix` is set to '-', ignoring any files starting with '-'.

- **Type**: `string`
- **Default:** `"-"`

Configure how Nuxt auto-imports composables into your application.

**See**: [Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/composables){rel="&#x22;nofollow&#x22;"}

An array of custom directories that will be auto-imported. Note that this option will not override the default directories (\~/composables, \~/utils).

- **Type**: `boolean`
- **Default:** `false`

Whether to scan your `composables/` and `utils/` directories for composables to auto-import. Auto-imports registered by Nuxt or other modules, such as imports from `vue` or `nuxt`, will still be enabled.

- **Type**: `boolean`
- **Default:** `true`

Log level when building logs.

Defaults to 'silent' when running in CI or when a TTY is not available. This option is then used as 'silent' in Vite and 'none' in Webpack

- **Type**: `string`
- **Default:** `"info"`

Modules are Nuxt extensions which can extend its core functionality and add endless integrations.

Each module is either a string (which can refer to a package, or be a path to a file), a tuple with the module as first string and the options as a second object, or an inline module function.
Nuxt tries to resolve each item in the modules array using node require path (in `node_modules`) and then will be resolved from project `srcDir` if `~` alias is used.

::callout
**Note**: Modules are executed sequentially so the order is important. First, the modules defined in `nuxt.config.ts` are loaded. Then, modules found in the `modules/`
directory are executed, and they load in alphabetical order.
::

Used to set the modules directories for path resolving (for example, webpack's `resolveLoading`, `nodeExternals` and `postcss`).

The configuration path is relative to `options.rootDir` (default is current working directory).
Setting this field may be necessary if your project is organized as a yarn workspace-styled mono-repository.

- **Type**: `array`
- **Default**

Configuration for Nitro.

**See**: [Nitro configuration docs](https://nitro.build/config/){rel="&#x22;nofollow&#x22;"}

- **Type**: `object`
- **Default**

Build time optimization configuration.

### `asyncTransforms`

Options passed directly to the transformer from `unctx` that preserves async context after `await`.

#### `asyncFunctions`

- **Type**: `array`
- **Default**

#### `objectDefinitions`

##### `defineNuxtComponent`

- **Type**: `array`
- **Default**

##### `defineNuxtPlugin`

- **Type**: `array`
- **Default**

##### `definePageMeta`

- **Type**: `array`
- **Default**

### `keyedComposables`

Functions to inject a key for.

As long as the number of arguments passed to the function is less than `argumentLength`, an additional magic string will be injected that can be used to deduplicate requests between server and client. You will need to take steps to handle this additional key.
The key will be unique based on the location of the function being invoked within the file.

- **Type**: `array`
- **Default**

Tree shake code from specific builds.

Tree shake composables from the server or client builds.

- **Type**: `object`
- **Default**

- **Type**: `object`
- **Default**

Configure shared oxc options used within Nuxt and passed where necessary.

Options for `oxc-transform`

**See**: [Oxc transform docs](https://oxc.rs/docs/guide/usage/transformer.html){rel="&#x22;nofollow&#x22;"}

- **Type**: `string`
- **Default:** `"h"`

- **Type**: `string`
- **Default:** `"Fragment"`

- **Type**: `string`
- **Default:** `"esnext"`

Whether to use the vue-router integration in Nuxt 3. If you do not provide a value it will be enabled if you have a `pages/` directory in your source folder.

Additionally, you can provide a glob pattern or an array of patterns to scan only certain files for pages.

An array of nuxt app plugins.

Each plugin can be a string (which can be an absolute or relative path to a file). If it ends with `.client` or `.server` then it will be automatically loaded only in the appropriate context.
It can also be an object with `src` and `mode` keys.

::callout
**Note**: Plugins are also auto-registered from the `~/plugins` directory
and these plugins do not need to be listed in `nuxt.config` unless you
need to customize their order. All plugins are deduplicated by their src path.
::

**See**: [`plugins/` directory documentation](https://nuxt.com/docs/guide/directory-structure/plugins){rel="&#x22;nofollow&#x22;"}

A strategy for ordering PostCSS plugins.

- **Type**: `function`

Options for configuring PostCSS plugins.

**See**: [PostCSS docs](https://postcss.org/){rel="&#x22;nofollow&#x22;"}

Plugin to parse CSS and add vendor prefixes to CSS rules.

**See**: [`autoprefixer`](https://github.com/postcss/autoprefixer){rel="&#x22;nofollow&#x22;"}

**See**: [`cssnano` configuration options](https://cssnano.github.io/cssnano/docs/config-file/#configuration-options){rel="&#x22;nofollow&#x22;"}

Define the root directory of your application.

This property can be overwritten (for example, running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory.
It is normally not needed to configure this option.

- **Type**: `string`
- **Default:** `"/<rootDir>"`

Global route options applied to matching server routes.

**Experimental**: This is an experimental feature and API may change in the future.

**See**: [Nitro route rules documentation](https://nitro.build/config/#routerules){rel="&#x22;nofollow&#x22;"}

Additional router options passed to `vue-router`. On top of the options for `vue-router`, Nuxt offers additional options to customize the router (see below).

::callout
**Note**: Only JSON serializable options should be passed by Nuxt config.
For more control, you can use `app/router.options.ts` file.
::

**See**: [Vue Router documentation](https://router.vuejs.org/api/interfaces/routeroptions.html){rel="&#x22;nofollow&#x22;"}.

You can enable hash history in SPA mode. In this mode, router uses a hash character (#) before the actual URL that is internally passed. When enabled, the **URL is never sent to the server** and **SSR is not supported**.

- **Type**: `boolean`
- **Default:** `false`

#### `scrollBehaviorType`

Customize the scroll behavior for hash links.

- **Type**: `string`
- **Default:** `"auto"`

Runtime config allows passing dynamic config and environment variables to the Nuxt app context.

The value of this object is accessible from server only using `useRuntimeConfig`.
It mainly should hold *private* configuration which is not exposed on the frontend. This could include a reference to your API secret tokens.
Anything under `public` and `app` will be exposed to the frontend as well.
Values are automatically replaced by matching env variables at runtime, e.g. setting an environment variable `NUXT_API_KEY=my-api-key NUXT_PUBLIC_BASE_URL=/foo/` would overwrite the two values in the example below.

- **Type**: `object`
- **Default**

- **Type**: `string`
- **Default:** `"@nuxt/nitro-server"`

Define the server directory of your Nuxt application, where Nitro routes, middleware and plugins are kept.

If a relative path is specified, it will be relative to your `rootDir`.

- **Type**: `string`
- **Default:** `"/<srcDir>/server"`

Nitro server handlers.

Each handler accepts the following options:

- handler: The path to the file defining the handler. - route: The route under which the handler is available. This follows the conventions of [rou3](https://github.com/unjs/rou3){rel="&#x22;nofollow&#x22;"}. - method: The HTTP method of requests that should be handled. - middleware: Specifies whether it is a middleware handler. - lazy: Specifies whether to use lazy loading to import the handler.
- **Type**: `array`

**See**: [`server/` directory documentation](https://nuxt.com/docs/guide/directory-structure/server){rel="&#x22;nofollow&#x22;"}

::callout
**Note**: Files from `server/api`, `server/middleware` and `server/routes` will be automatically registered by Nuxt.
::

Configures whether and how sourcemaps are generated for server and/or client bundles.

If set to a single boolean, that value applies to both server and client. Additionally, the `'hidden'` option is also available for both server and client.
Available options for both client and server: - `true`: Generates sourcemaps and includes source references in the final bundle. - `false`: Does not generate any sourcemaps. - `'hidden'`: Generates sourcemaps but does not include references in the final bundle.

- **Type**: `object`
- **Default**

## spaLoadingTemplate

Boolean or a path to an HTML file with the contents of which will be inserted into any HTML page rendered with `ssr: false`.

- If it is unset, it will use `~/app/spa-loading-template.html` file in one of your layers, if it exists. - If it is false, no SPA loading indicator will be loaded. - If true, Nuxt will look for `~/app/spa-loading-template.html` file in one of your layers, or a
  default Nuxt image will be used.
  Some good sources for spinners are [SpinKit](https://github.com/tobiasahlin/SpinKit){rel="&#x22;nofollow&#x22;"} or [SVG Spinners](https://icones.js.org/collection/svg-spinners){rel="&#x22;nofollow&#x22;"}.
- **Default:** `null`

**Example**: \~/app/spa-loading-template.html

Define the source directory of your Nuxt application.

If a relative path is specified, it will be relative to the `rootDir`.

- **Type**: `string`
- **Default:** `"/<srcDir>"`

This would work with the following folder structure:

Whether to enable rendering of HTML - either dynamically (in server mode) or at generate time. If set to `false` generated pages will have no content.

- **Type**: `boolean`
- **Default:** `true`

Manually disable nuxt telemetry.

**See**: [Nuxt Telemetry](https://github.com/nuxt/telemetry){rel="&#x22;nofollow&#x22;"} for more information.

Whether your app is being unit tested.

- **Type**: `boolean`
- **Default:** `false`

Extend project from a local or remote source.

Value should be a string pointing to source directory or config path relative to current config.
You can use `github:`, `gitlab:`, `bitbucket:` or `https://` to extend from a remote git repository.

Configuration for Nuxt's TypeScript integration.

Which builder types to include for your project.

By default Nuxt infers this based on your `builder` option (defaulting to 'vite') but you can either turn off builder environment types (with `false`) to handle this fully yourself, or opt for a 'shared' option.
The 'shared' option is advised for module authors, who will want to support multiple possible builders.

- **Default:** `null`

Modules to generate deep aliases for within `compilerOptions.paths`. This does not yet support subpaths. It may be necessary when using Nuxt within a pnpm monorepo with `shamefully-hoist=false`.

- **Type**: `array`
- **Default**

### `includeWorkspace`

Include parent workspace in the Nuxt project. Mostly useful for themes and module authors.

- **Type**: `boolean`
- **Default:** `false`

Generate a `*.vue` shim.

We recommend instead letting the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar){rel="&#x22;nofollow&#x22;"} generate accurate types for your components.
Note that you may wish to set this to `true` if you are using other libraries, such as ESLint, that are unable to understand the type of `.vue` files.

- **Type**: `boolean`
- **Default:** `false`

TypeScript comes with certain checks to give you more safety and analysis of your program. Once you’ve converted your codebase to TypeScript, you can start enabling these checks for greater safety. [Read More](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#getting-stricter-checks){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean`
- **Default:** `true`

You can extend generated `.nuxt/tsconfig.json` using this option.

Enable build-time type checking.

If set to true, this will type check in development. You can restrict this to build-time type checking by setting it to `build`. Requires to install `typescript` and `vue-tsc` as dev dependencies.

- **Type**: `boolean`
- **Default:** `false`

**See**: [Nuxt TypeScript docs](https://nuxt.com/docs/guide/concepts/typescript){rel="&#x22;nofollow&#x22;"}

An object that allows us to configure the `unhead` nuxt module.

Enable the legacy compatibility mode for `unhead` module. This applies the following changes: - Disables Capo.js sorting - Adds the `DeprecationsPlugin`: supports `hid`, `vmid`, `children`, `body` - Adds the `PromisesPlugin`: supports promises as input

- **Type**: `boolean`
- **Default:** `false`

**See**: [`unhead` migration documentation](https://unhead.unjs.io/docs/typescript/head/guides/get-started/migration){rel="&#x22;nofollow&#x22;"}

### `renderSSRHeadOptions`

An object that will be passed to `renderSSRHead` to customize the output.

- **Type**: `object`
- **Default**

Configuration that will be passed directly to Vite.

**See**: [Vite configuration docs](https://vite.dev/config){rel="&#x22;nofollow&#x22;"} for more information.
Please note that not all vite options are supported in Nuxt.

- **Type**: `string`
- **Default:** `"_nuxt/"`

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `string`
- **Default:** `"/<rootDir>/node_modules/.cache/vite"`

- **Type**: `boolean`
- **Default:** `true`

- **Type**: `object`
- **Default**

- **Type**: `object`
- **Default**

- **Type**: `string`
- **Default:** `"production"`

#### `esbuildOptions`

- **Type**: `object`
- **Default**

- **Type**: `array`
- **Default**

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `array`
- **Default**

- **Type**: `string`
- **Default:** `"/<srcDir>"`

- **Type**: `array`
- **Default**

##### `propsDestructure`

- **Type**: `boolean`
- **Default:** `true`

- **Type**: `boolean`
- **Default:** `true`

##### `compilerOptions`

##### `transformAssetUrls`

- **Type**: `object`
- **Default**

- **Type**: `object`
- **Default**

### `compilerOptions`

Options for the Vue compiler that will be passed at build time.

**See**: [Vue documentation](https://vuejs.org/api/application.html#app-config-compileroptions){rel="&#x22;nofollow&#x22;"}

It is possible to pass configure the Vue app globally. Only serializable options may be set in your `nuxt.config`. All other options should be set at runtime in a Nuxt plugin..

**See**: [Vue app config documentation](https://vuejs.org/api/application.html#app-config){rel="&#x22;nofollow&#x22;"}

### `propsDestructure`

Enable reactive destructure for `defineProps`

- **Type**: `boolean`
- **Default:** `true`

### `runtimeCompiler`

Include Vue compiler in runtime bundle.

- **Type**: `boolean`
- **Default:** `false`

### `transformAssetUrls`

- **Type**: `array`
- **Default**

- **Type**: `array`
- **Default**

- **Type**: `array`
- **Default**

- **Type**: `array`
- **Default**

- **Type**: `array`
- **Default**

The watch property lets you define patterns that will restart the Nuxt dev server when changed.

It is an array of strings or regular expressions. Strings should be either absolute paths or relative to the `srcDir` (and the `srcDir` of any layers). Regular expressions will be matched against the path relative to the project `srcDir` (and the `srcDir` of any layers).

The watchers property lets you overwrite watchers configuration in your `nuxt.config`.

Options to pass directly to `chokidar`.

**See**: [chokidar](https://github.com/paulmillr/chokidar#api){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean`
- **Default:** `true`

#### `ignorePermissionErrors`

- **Type**: `boolean`
- **Default:** `true`

### `rewatchOnRawEvents`

An array of event types, which, when received, will cause the watcher to restart.

`watchOptions` to pass directly to webpack.

**See**: [webpack@4 watch options](https://v4.webpack.js.org/configuration/watch/#watchoptions){rel="&#x22;nofollow&#x22;"}.

#### `aggregateTimeout`

- **Type**: `number`
- **Default:** `1000`

### `aggressiveCodeRemoval`

Hard-replaces `typeof process`, `typeof window` and `typeof document` to tree-shake bundle.

- **Type**: `boolean`
- **Default:** `false`

Nuxt uses `webpack-bundle-analyzer` to visualize your bundles and how to optimize them.

Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin){rel="&#x22;nofollow&#x22;"} or [for vite](https://github.com/btd/rollup-plugin-visualizer#options){rel="&#x22;nofollow&#x22;"}.

- **Type**: `object`
- **Default**

Enables CSS source map support (defaults to `true` in development).

- **Type**: `boolean`
- **Default:** `false`

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware){rel="&#x22;nofollow&#x22;"} for available options.

- **Type**: `string`
- **Default:** `"none"`

Configure [webpack experiments](https://webpack.js.org/configuration/experiments/){rel="&#x22;nofollow&#x22;"}

Enables Common CSS Extraction.

Using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin){rel="&#x22;nofollow&#x22;"} under the hood, your CSS will be extracted into separate files, usually one per component. This allows caching your CSS and JavaScript separately.

- **Type**: `boolean`
- **Default:** `true`

Customize bundle filenames.

To understand a bit more about the use of manifests, take a look at [webpack documentation](https://webpack.js.org/guides/code-splitting/){rel="&#x22;nofollow&#x22;"}.

::callout
**Note**: Be careful when using non-hashed based filenames in production
as most browsers will cache the asset and not detect the changes on first load.
::

- **Type**: `function`

- **Type**: `function`

- **Type**: `function`

- **Type**: `function`

- **Type**: `function`

- **Type**: `function`

Set to `false` to disable the overlay provided by [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin){rel="&#x22;nofollow&#x22;"}.

- **Type**: `boolean`
- **Default:** `true`

See [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware){rel="&#x22;nofollow&#x22;"} for available options.

Customize the options of Nuxt's integrated webpack loaders.

See [css-loader](https://github.com/webpack-contrib/css-loader){rel="&#x22;nofollow&#x22;"} for available options.

- **Type**: `boolean`
- **Default:** `false`

##### `importLoaders`

- **Type**: `number`
- **Default:** `0`

- **Type**: `function`

See [css-loader](https://github.com/webpack-contrib/css-loader){rel="&#x22;nofollow&#x22;"} for available options.

- **Type**: `boolean`
- **Default:** `false`

##### `importLoaders`

- **Type**: `number`
- **Default:** `0`

###### `localIdentName`

- **Type**: `string`
- **Default:** `"[local]_[hash:base64:5]"`

- **Type**: `function`

- **Type**: `object`
- **Default**

**See**: [esbuild loader](https://github.com/esbuild-kit/esbuild-loader){rel="&#x22;nofollow&#x22;"}

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `number`
- **Default:** `1000`

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `number`
- **Default:** `1000`

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options){rel="&#x22;nofollow&#x22;"}

- **Type**: `boolean`
- **Default:** `false`

- **Type**: `number`
- **Default:** `1000`

**See**: [`less-loader` Options](https://github.com/webpack-contrib/less-loader#options){rel="&#x22;nofollow&#x22;"}

**See**: [`pug` options](https://pugjs.org/api/reference.html#options){rel="&#x22;nofollow&#x22;"}

**See**: [`sass-loader` Options](https://github.com/webpack-contrib/sass-loader#options){rel="&#x22;nofollow&#x22;"}

###### `indentedSyntax`

- **Type**: `boolean`
- **Default:** `true`

**See**: [`sass-loader` Options](https://github.com/webpack-contrib/sass-loader#options){rel="&#x22;nofollow&#x22;"}

**See**: [`stylus-loader` Options](https://github.com/webpack-contrib/stylus-loader#options){rel="&#x22;nofollow&#x22;"}

See [vue-loader](https://github.com/vuejs/vue-loader){rel="&#x22;nofollow&#x22;"} for available options.

##### `compilerOptions`

##### `propsDestructure`

- **Type**: `boolean`
- **Default:** `true`

##### `transformAssetUrls`

- **Type**: `object`
- **Default**

Configure [webpack optimization](https://webpack.js.org/configuration/optimization/){rel="&#x22;nofollow&#x22;"}.

Set minimize to `false` to disable all minimizers. (It is disabled in development by default).

- **Type**: `boolean`
- **Default:** `true`

You can set minimizer to a customized array of plugins.

- **Type**: `string`
- **Default:** `"single"`

##### `automaticNameDelimiter`

- **Type**: `string`
- **Default:** `"/"`

- **Type**: `string`
- **Default:** `"all"`

OptimizeCSSAssets plugin options.

Defaults to true when `extractCSS` is enabled.

- **Type**: `boolean`
- **Default:** `false`

**See**: [css-minimizer-webpack-plugin documentation](https://github.com/webpack-contrib/css-minimizer-webpack-plugin){rel="&#x22;nofollow&#x22;"}.

Customize PostCSS Loader. same options as [`postcss-loader` options](https://github.com/webpack-contrib/postcss-loader#options){rel="&#x22;nofollow&#x22;"}

#### `postcssOptions`

- **Type**: `object`
- **Default**

Enable the profiler in webpackbar.

It is normally enabled by CLI argument `--profile`.

- **Type**: `boolean`
- **Default:** `false`

**See**: [webpackbar](https://github.com/unjs/webpackbar#profile){rel="&#x22;nofollow&#x22;"}.

### `serverURLPolyfill`

The polyfill library to load to provide URL and URLSearchParams.

Defaults to `'url'` ([see package](https://www.npmjs.com/package/url){rel="&#x22;nofollow&#x22;"}).

- **Type**: `string`
- **Default:** `"url"`

### `warningIgnoreFilters`

Filters to hide build warnings.

Define the workspace directory of your application.

Often this is used when in a monorepo setup. Nuxt will attempt to detect your workspace directory automatically, but you can override it here.
It is normally not needed to configure this option.

- **Type**: `string`
- **Default:** `"/<workspaceDir>"`

**Examples:**

Example 1 (json):
```json
{
  "~": "/<srcDir>/",
  "@": "/<srcDir>/",
  "~~": "/<rootDir>/",
  "@@": "/<rootDir>/",
  "#shared": "/<rootDir>/shared/",
  "assets": "/<srcDir>/assets/",
  "public": "/<srcDir>/public/",
  "#build": "/<rootDir>/.nuxt/",
  "#internal/nuxt/paths": "/<rootDir>/.nuxt/paths.mjs"
}
```

Example 2 (js):
```js
export default {
  alias: {
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  }
}
```

Example 3 (ts):
```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/prefix/'
  }
})
```

Example 4 (bash):
```bash
NUXT_APP_BASE_URL=/prefix/ node .output/server/index.mjs
```

---

## How Nuxt Works?

**URL:** llms-txt#how-nuxt-works?

**Contents:**
- The Nuxt Interface
- The NuxtApp Interface
- Runtime Context vs. Build Context

This guide helps you better understand Nuxt internals to develop new solutions and module integrations on top of Nuxt.

## The Nuxt Interface

When you start Nuxt in development mode with [`nuxt dev`](https://nuxt.com/docs/3.x/api/commands/dev) or building a production application with [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build),
a common context will be created, referred to as `nuxt` internally. It holds normalized options merged with `nuxt.config` file,
some internal state, and a powerful [hooking system](https://nuxt.com/docs/3.x/api/advanced/hooks) powered by [unjs/hookable](https://github.com/unjs/hookable){rel="&#x22;nofollow&#x22;"}
allowing different components to communicate with each other. You can think of it as **Builder Core**.

This context is globally available to be used with [Nuxt Kit](https://nuxt.com/docs/3.x/guide/going-further/kit) composables.
Therefore only one instance of Nuxt is allowed to run per process.

To extend the Nuxt interface and hook into different stages of the build process, we can use [Nuxt Modules](https://nuxt.com/docs/3.x/guide/going-further/modules).

For more details, check out [the source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/core/nuxt.ts){rel="&#x22;nofollow&#x22;"}.

## The NuxtApp Interface

When rendering a page in the browser or on the server, a shared context will be created, referred to as `nuxtApp`.
This context keeps vue instance, runtime hooks, and internal states like ssrContext and payload for hydration.
You can think of it as **Runtime Core**.

This context can be accessed using [`useNuxtApp()`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) composable within Nuxt plugins and `<script setup>` and vue composables.
Global usage is possible for the browser but not on the server, to avoid sharing context between users.

Since [`useNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) throws an exception if context is currently unavailable, if your composable does not always require `nuxtApp`, you can use [`tryUseNuxtApp`](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app#tryusenuxtapp) instead, which will return `null` instead of throwing an exception.

To extend the `nuxtApp` interface and hook into different stages or access contexts, we can use [Nuxt Plugins](https://nuxt.com/docs/3.x/directory-structure/plugins).

Check [Nuxt App](https://nuxt.com/docs/3.x/api/composables/use-nuxt-app) for more information about this interface.

`nuxtApp` has the following properties:

For more details, check out [the source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts){rel="&#x22;nofollow&#x22;"}.

## Runtime Context vs. Build Context

Nuxt builds and bundles project using Node.js but also has a runtime side.

While both areas can be extended, that runtime context is isolated from build-time. Therefore, they are not supposed to share state, code, or context other than runtime configuration!

`nuxt.config` and [Nuxt Modules](https://nuxt.com/docs/3.x/guide/going-further/modules) can be used to extend the build context, and [Nuxt Plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) can be used to extend runtime.

When building an application for production, `nuxt build` will generate a standalone build in the `.output` directory, independent of `nuxt.config` and [Nuxt modules](https://nuxt.com/docs/3.x/guide/going-further/modules).

**Examples:**

Example 1 (ts):
```ts
interface NuxtApp {
  vueApp // the global Vue application: https://vuejs.org/api/application.html#application-api

  versions // an object containing Nuxt and Vue versions

  // These let you call and add runtime NuxtApp hooks
  // https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts#L18
  hooks
  hook
  callHook

  // Only accessible on server-side
  ssrContext: {
    url
    req
    res
    runtimeConfig
    noSSR
  }

  // This will be stringified and passed from server to client
  payload: {
    serverRendered: true
    data: {}
    state: {}
  }

  provide: (name: string, value: any) => void
}
```

---

## Introducing Nuxt DevTools

**URL:** llms-txt#introducing-nuxt-devtools

**Contents:**
- Developer Experience
- The Problem
- Introducing Nuxt DevTools
  - Overview
  - Pages
  - Components
  - Imports
  - Modules
  - Assets
  - Plugins

We announced the preview of [Nuxt DevTools](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"} on [Vue Amsterdam 2023](https://vuejs.amsterdam/){rel="&#x22;nofollow&#x22;"}, a new tool to help you understand your Nuxt app and improve the developer experience even further. Today we released a new minor version [`v0.3.0`](https://github.com/nuxt/devtools/releases/tag/v0.3.0){rel="&#x22;nofollow&#x22;"} with a bunch of updates and improvements.

![devtools-tab-overview](https://nuxt.com/assets/blog/devtools/tab-overview.png)

In this post, we will explore the reasons behind the creation of Nuxt DevTools, how it can enhance your development experience, and what you can expect in the future.

## Developer Experience

Over the recent years, there has been an increasing focus on Developer Experience (DX). Tools and frameworks have been striving to improve the DX. Along the way, Nuxt introduced many innovative features and conventions to make your day-to-day development easier and more efficient.

In Nuxt 3, we switched to [Vite](https://vitejs.dev/){rel="&#x22;nofollow&#x22;"} as the default bundler for the instant hot module replacement (HMR) during developement, creating a faster feedback loop to your workflow. Additionally, we have introduced [Nitro](https://github.com/unjs/nitro){rel="&#x22;nofollow&#x22;"}, a new server engine that allows you to deploy your Nuxt app to any hosting service, such as [Vercel](https://vercel.com){rel="&#x22;nofollow&#x22;"}, [Netlify](https://netlify.com){rel="&#x22;nofollow&#x22;"}, [Cloudflare](https://cloudflare.com){rel="&#x22;nofollow&#x22;"} and [more](https://nitro.unjs.io/deploy){rel="&#x22;nofollow&#x22;"} **with zero-config**.

Nuxt offers many common practices built-in:

- Write TypeScript and ESM out-of-the-box throughout your codebase.
- Build single-page applications (SPA), server-side rendering (SSR), static site generation (SSG), or [hybrid them **per routes**](https://nuxt.com/docs/guide/concepts/rendering#route-rules) - using the same codebase isomorphically without any explicit setup.
- Use several composables, like [`useState`](https://nuxt.com/docs/api/composables/use-state) and [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) for sharing states accessible across the server and client sides.
- Leverage SEO utilities, like [`useHead`](https://nuxt.com/docs/api/composables/use-head) and [`useSeoMeta`](https://nuxt.com/docs/getting-started/seo-meta#useseometa) to make meta-tags management a breaze.

Moreover, features such as the [layout system](https://nuxt.com/docs/guide/directory-structure/layouts), [plugins](https://nuxt.com/docs/guide/directory-structure/plugins), route [middleware](https://nuxt.com/docs/guide/directory-structure/middleware), and other tools make app creation easier and codebases more organized.

Conventions like [file-based routing](https://nuxt.com/docs/guide/directory-structure/pages) and [file-based server APIs](https://nitro.unjs.io/guide/introduction/routing){rel="&#x22;nofollow&#x22;"} making the routing intuitive and effortless.

[Components auto-imports](https://nuxt.com/docs/guide/directory-structure/components) makes it easy to create shared components that are directly available in any Vue file. Unlike global components, they are code-splitted. We also introduced [composables auto-import](https://nuxt.com/docs/guide/concepts/auto-imports), where all APIs from Vue are directly available. Nuxt modules can also provide their custom composables to be auto-imported, as well as your [local composables](https://nuxt.com/docs/guide/directory-structure/composables).

Recently, we introduced client and server-only components, which can be used by adding `.client` and `.server` to the filename. All these conventions are fully typed and developers can even have type autocomplete when doing route navigation or fetching data from APIs. &#x2A;*These conventions significantly reduce boilerplate code, avoid duplications, and improve productivity.**

When it comes to ecosystem, Nuxt has a large community of developers building modules around it, [with hundreds of high-quality modules](https://nuxt.com/modules) available. Modules allow developers to get integrations for features they want without worrying about configuration or best practices.

Nuxt is capable of creating a large scale application at ease, however there is one problem: **the lack of transparency**.

For every new feature and convention we introduce, we are adding a bit more abstraction to the framework.

Abstractions are great things to transfer implementation complexity and make things easier to get more focus when building. On the other hand, they can also add extra burden for users to learn and understand what's going on under the hood. Leading also to implicitness, like where a auto-imported component is from, or how many modules is using a certain component, etc. It can also make things hard to debug.

This might be considered as a trade-off of any tools, you have to learn and understand the tool to use it with efficiency. Despite improving the documentation and providing more examples, **we believe of an opportunity to improve the lack of transparency**.

## Introducing Nuxt DevTools

[Nuxt DevTools](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"} is a visual tool to help you understand your Nuxt app and improve the developer experience even further. It's created to provide a better transparency of Nuxt and your app, find performance bottlenecks and help you manage your app and configuration.

It is shipped as an experimental module and provide the views right inside your app. Once installed, it will add a small icon on the bottom of your app. Clicking it will open the DevTools panel.

To try it, please refer to the [installation guide](https://devtools.nuxtjs.org/guide){rel="&#x22;nofollow&#x22;"}.

Shows a quick overview of your app, including the Nuxt version, pages, components, modules, and plugins you are using. &#x2A;*It also check your Nuxt version and allow you to upgrade with a single click.**

:video{autoplay controls autoPlay="true" controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1679922926/nuxt3/nuxt-devtools-upgrade_dnfghq.jpg"}

The pages tab shows your current routes and provide a quick way to navigate to them. For dynamic routes, it also provide a form to fill with each params interactively. You can also use the textbox to play and test how each route is matched.

:video{autoplay controls autoPlay="true" controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1679923373/nuxt3/nuxt-devtools-pages_csjoh0.jpg"}

Components tab show all the components you are using in your app and where they are from. You can also search for them and go to the source code.

![nuxt-devtools-tab-components](https://nuxt.com/assets/blog/devtools/tab-components.png)

It also provides a graph view that show the relationship between components. You can filter the components to see the dependencies of a specific component. This could help to identify unintended dependencies and improve the performance and bundle size of pages.

![nuxt-devtools-components-graph](https://nuxt.com/assets/blog/devtools/tab-components-graph-all.png)

![nuxt-devtools-components-graph-filtered](https://nuxt.com/assets/blog/devtools/tab-components-graph-filtered.png)

You can also use the "Inspector" feature to inspect the DOM tree and see which component is rendering it. Click to go to your editor of the specific line. Making it much easier to make changes, without the requirement of understanding the project structure thoroughly.

![nuxt-devtools-tab-components-inspector](https://nuxt.com/assets/blog/devtools/tab-components-inspector.png)

Imports tab shows all the auto-imports registered to Nuxt. You can see which files are importing them, and where they are from. Some entries can also provide short descriptions and documentation links.

![nuxt-devtools-tab-imports](https://nuxt.com/assets/blog/devtools/tab-imports.png)

Modules tab shows all the modules you have installed and providing the links to their documentation and source code. You can find more modules available in [Nuxt Modules](https://nuxt.com/modules).

![nuxt-devtools-tab-modules](https://nuxt.com/assets/blog/devtools/tab-modules.png)

Recently we introduce the experimental upgrade feature, which allows you to upgrade your Nuxt or modules with ease. With the [Terminal tab](https://nuxt.com/#terminals), it shows the output of the upgrade process transparently.

![nuxt-devtools-tab-modules-upgrade](https://nuxt.com/assets/blog/devtools/tab-modules-upgrade.png)

The assets tab that shows all your static assets and their information. You can copy the paths of the assets, or the code snippets of using them. In the future, with the integrations of [Nuxt Image](https://image.nuxtjs.org/){rel="&#x22;nofollow&#x22;"}, you can even optimize images with a single click.

![nuxt-devtools-tab-assets](https://nuxt.com/assets/blog/devtools/tab-assets.png)

Plugins tab shows all the plugins you are using in your app. As plugins runs before the app is mounted,the time spent in each plugin should be minimal to avoid blocking the app from rendering. The time cost of each plugin provided can be helpful to find performance bottlenecks.

![nuxt-devtools-tab-plugins](https://nuxt.com/assets/blog/devtools/tab-plugins.png)

Hooks tab can help you to monitor the time spent in each hook from both client and server side. You can also see how many lisenters registed to each hook, and how many times they have been invoked. This can be helpful to find performance bottlenecks.

![nuxt-devtools-tab-hooks](https://nuxt.com/assets/blog/devtools/tab-hooks.png)

You can inspect and modify the app config in DevTools, try different configurations and see the effects immediately.

![nuxt-devtools-app-config](https://nuxt.com/assets/blog/devtools/tab-app-config.png)

This tab shows the state created by [`useState`](https://nuxt.com/docs/api/composables/use-state), [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch). It can be helpful to understand how the data is fetched and how the state is managed, or change them reactively to see it they affects your app. For `useAsyncData` and `useFetch`, you can also manually the trigger the refetch.

![nuxt-devtools-tab-payload](https://nuxt.com/assets/blog/devtools/tab-payload.png)

In some integrations, they might require to have subprocesses running to do certain jobs. Before DevTools, you either hide the output of the subprocess entirely and swallow the potential warnings/errors, or pipe to stdout and pollute your terminal with multiple outputs. Now you can now have the outputs in DevTools for each process and clearly isolated.

![nuxt-devtools-tab-terminals](https://nuxt.com/assets/blog/devtools/tab-terminals.png)

Virtual Files tab shows the virtual files generated by Nuxt and Nitro to support the conventions. This can be helpful for advanced debugging.

![nuxt-devtools-tab-virtual-files](https://nuxt.com/assets/blog/devtools/tab-virtual-files.png)

Inspect expose the [`vite-plugin-inspect`](https://github.com/antfu/vite-plugin-inspect){rel="&#x22;nofollow&#x22;"} integration, allowing you to inspect transformation steps of Vite. It can be helpful to understand how each plugin is transforming your code and spot potential issues.

![nuxt-devtools-vite-plugin-inspect](https://nuxt.com/assets/blog/devtools/tab-inspect.png)

Thanks to [VS Code Server](https://code.visualstudio.com/docs/remote/vscode-server){rel="&#x22;nofollow&#x22;"}, we are able to integrate a **full-featured** VS Code instance into DevTools. You can install extensions and sync your settings. This allows you to get closer feedback loop where you can change the code and see the result immediately without leaving the browser.

![nuxt-devtools-tab-vscode](https://nuxt.com/assets/blog/devtools/tab-vscode.png)

### Module Contributed View

With the ecosystem in mind, Nuxt DevTools to designed to be flexible and extendable. Modules could contribute their own views to DevTools, to provide interactive data and playgrounds for their integrations. The following are a few examples:

[VueUse module](https://nuxt.com/modules/vueuse) provides a search page for available composables and see their documentation.

![nuxt-devtools-tab-vueuse](https://nuxt.com/assets/blog/devtools/tab-vueuse.png)

[UnoCSS module](https://nuxt.com/modules/unocss) provides an interactive inspector to see how each module contributes to the final CSS.

![nuxt-devtools-tab-unocss](https://nuxt.com/assets/blog/devtools/tab-unocss.png)

[Nuxt Icon module](https://nuxt.com/modules/icon) provides a search engine for all icons available.

![nuxt-devtools-tab-nuxt-icon](https://nuxt.com/assets/blog/devtools/tab-icones.png)

[Nuxt Vitest module](https://nuxt.com/modules/vitest){rel="&#x22;nofollow&#x22;"} provides Vitest UI for tests runing with the same pipeline as your Nuxt app.

![nuxt-devtools-tab-vitest](https://nuxt.com/assets/blog/devtools/tab-vitest.png)

### For Module Authors

With the release of `v0.3.0`, we improved the ability for module authors to contribute to the DevTools.

- Module contributed views
- Access to client app's context and devtools' utils
- Custom RPC functions to communicate between server and client
- Subprocesses spawning and output steaming
- [`@nuxt/devtools-kit`](https://devtools.nuxtjs.org/module/utils-kit){rel="&#x22;nofollow&#x22;"} - a set of utilities help you integrate your module with DevTools
- [`@nuxt/devtools-ui-kit`](https://devtools.nuxtjs.org/module/ui-kit){rel="&#x22;nofollow&#x22;"} - the UI components used in DevTools, to make your module's view consistent with the rest of DevTools
- Starter template to create module with DevTools integration

Please check out the [Devtools Module Authors Guide](https://devtools.nuxtjs.org/module/guide){rel="&#x22;nofollow&#x22;"} to learn more.

## What to Expect Next?

This is just the beginning of the journey. We are planning to add more features to DevTools, while exploring the ways to present the data in more intuitive and playful ways.

The goals of Nuxt DevTools are to:

- :icon{.size-5 name="lucide:blend"} Improve transparency for conventions
- :icon{.size-5 name="lucide:gauge"} Inspecting performance & analysis
- :icon{.size-5 name="lucide:swatch-book"} Interactive & playful
- :icon{.size-5 name="lucide:file-pen-line"} Personalized documentations
- :icon{.size-5 name="lucide:blocks"} Manage and scaffold apps with ease
- :icon{.size-5 name="lucide:lightbulb"} Provide insights and improvements
- :icon{.size-5 name="lucide:user-check"} Make the development experience more enjoyable

You can check our [Project Roadmap](https://github.com/nuxt/devtools/discussions/31){rel="&#x22;nofollow&#x22;"} and share your [Ideas & Suggestions](https://github.com/nuxt/devtools/discussions/29){rel="&#x22;nofollow&#x22;"}, helping us to make the DevTools better.

You can follow the latest updates by staring the [GitHub repository](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"}, and following [Nuxt's official Twitter](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"}.

Thank you for reading, and we are looking forward to your feedback and contributions!

---

## <NuxtImg>

**URL:** llms-txt#<nuxtimg>

**Contents:**
- Setup
- Usage

`<NuxtImg>` is a drop-in replacement for the native `<img>` tag.

- Uses built-in provider to optimize local and remote images
- Converts `src` to provider-optimized URLs
- Automatically resizes images based on `width` and `height`
- Generates responsive sizes when providing `sizes` option
- Supports native lazy loading as well as other `<img>` attributes

In order to use `<NuxtImg>` you should install and enable the Nuxt Image module:

`<NuxtImg>` outputs a native `img` tag directly (without any wrapper around it). Use it like you would use the `<img>` tag:

::read-more{target="_blank" to="https://image.nuxt.com/usage/nuxt-img"}
Read more about the `<NuxtImg>` component.
::

**Examples:**

Example 1 (unknown):
```unknown
## Usage

`<NuxtImg>` outputs a native `img` tag directly (without any wrapper around it). Use it like you would use the `<img>` tag:
```

Example 2 (unknown):
```unknown
Will result in:
```

---

## Netlify

**URL:** llms-txt#netlify

**Contents:**
- Setup
- Netlify Edge Functions
- On-demand Builders

::tip
**Zero Configuration ✨**

Integration with Netlify is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

Nuxt will auto-detect that you are in a [Netlify](https://www.netlify.com){rel="&#x22;nofollow&#x22;"} build environment and build an optimized version of your server.

For new sites, Netlify will detect that you are using Nuxt 3 and set the publish directory to `dist` and build command to `npm run build`.

::note
If you are upgrading an existing site from Nuxt 2 you should check these and update them if needed.
::

If you want to add custom redirects, you can do so with [`routeRules`](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering) or by adding a [`_redirects`](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file){rel="&#x22;nofollow&#x22;"} file to your `public` directory.

::tip{color="green" icon="i-lucide-check-circle"}
For deployment, just push to your git repository [as you would normally do for Netlify](https://docs.netlify.com/configure-builds/get-started/){rel=""nofollow""}.
::

## Netlify Edge Functions

::read-more
---
target: _blank
to: https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions
---
Netlify Edge Functions use Deno and the powerful V8 JavaScript runtime to let you run globally distributed functions for the fastest possible response times.
::

Set the following environment variable to run Nuxt on Edge Functions:

## On-demand Builders

On-demand Builders are serverless functions used to generate web content as needed that’s automatically cached on Netlify’s Edge CDN.

They enable you to build pages for your site when a user visits them for the first time and then cache them at the edge for subsequent visits until the next deployment.

::read-more
---
target: _blank
to: https://docs.netlify.com/configure-builds/on-demand-builders/
---
Read More about Netlify on-demand builders
::

Set the following environment variable to enable on-demand builders:

::read-more{target="_blank" to="https://nitro.unjs.io/deploy/providers/netlify"}
Head over **Nitro documentation** to learn more about the netlify deployment preset.
::

**Examples:**

Example 1 (bash):
```bash
SERVER_PRESET=netlify_edge
```

Example 2 (bash):
```bash
SERVER_PRESET=netlify_builder
```

---

## Nuxt dev/build outputs

**URL:** llms-txt#nuxt-dev/build-outputs

.output
.data
.nuxt
.nitro
.cache
dist

---

## SST

**URL:** llms-txt#sst

**Contents:**
- Quick start
- More options

Nuxt supports deploying on [SST](https://sst.dev/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

1. Create a Nuxt project.
2. Init SST in your project.

3. It should detect that your are using Nuxt and ask you to update your `nuxt.config.ts` file.

4. Once you are ready to deploy, run.

You can [read the full Nuxt on SST tutorial here](https://sst.dev/docs/start/aws/nuxt){rel="&#x22;nofollow&#x22;"}.

You can also deploy Nuxt to a container using SST. Head over to the [SST docs to learn more](https://sst.dev/docs/start/aws/nuxt){rel="&#x22;nofollow&#x22;"}.

**Examples:**

Example 1 (bash):
```bash
npx sst@latest init
```

Example 2 (ts):
```ts
nitro: {
     preset: 'aws-lambda'
   }
```

Example 3 (bash):
```bash
npx sst deploy --stage production
```

---

## Compatibility

**URL:** llms-txt#compatibility

**Contents:**
- `checkNuxtCompatibility`
  - Usage
  - Type
  - Parameters
- `assertNuxtCompatibility`
  - Type
  - Parameters
- `hasNuxtCompatibility`
  - Usage
  - Type

Nuxt Kit utilities can be used in Nuxt 3, Nuxt 2 with Bridge and even Nuxt 2 without Bridge. To make sure your module is compatible with all versions, you can use the `checkNuxtCompatibility`, `assertNuxtCompatibility` and `hasNuxtCompatibility` functions. They will check if the current Nuxt version meets the constraints you provide. Also you can use `isNuxt2`, `isNuxt3` and `getNuxtVersion` functions for more granular checks.

## `checkNuxtCompatibility`

Checks if constraints are met for the current Nuxt version. If not, returns an array of messages. Nuxt 2 version also checks for `bridge` support.

**`constraints`**: Version and builder constraints to check against. It accepts the following properties:

| Property | Type                                                                                                                                               | Required | Description                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `nuxt`   | `string`                                                                                                                                           | `false`  | Nuxt version in semver format. Versions may be defined in Node.js way, for example: `>=2.15.0 <3.0.0`.                                          |
| `bridge` | `Record<string, string | false>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | Specifies version constraints or disables compatibility for specific Nuxt builders like `vite`, `webpack`, or `rspack`. Use `false` to disable. |

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

## `assertNuxtCompatibility`

Asserts that constraints are met for the current Nuxt version. If not, throws an error with the list of issues as string.

**`constraints`**: Version and builder constraints to check against. Refer to the [constraints table in `checkNuxtCompatibility`](https://nuxt.com/#parameters) for details.

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

## `hasNuxtCompatibility`

Checks if constraints are met for the current Nuxt version. Return `true` if all constraints are met, otherwise returns `false`. Nuxt 2 version also checks for `bridge` support.

**`constraints`**: Version and builder constraints to check against. Refer to the [constraints table in `checkNuxtCompatibility`](https://nuxt.com/#parameters) for details.

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

## `isNuxtMajorVersion`

Check if current Nuxt instance is of specified major version

**`major`**: Major version to check against.

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

Checks if the current Nuxt version is 3.x.

::note
Use `isNuxtMajorVersion(2, nuxt)` instead. This may be removed in @nuxt/kit v5 or a future major version.
::

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

Checks if the current Nuxt version is 2.x.

::note
Use `isNuxtMajorVersion(2, nuxt)` instead. This may be removed in @nuxt/kit v5 or a future major version.
::

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

Returns the current Nuxt version.

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

**Examples:**

Example 1 (unknown):
```unknown
### Type
```

Example 2 (unknown):
```unknown
### Parameters

**`constraints`**: Version and builder constraints to check against. It accepts the following properties:

| Property | Type                                                                                                                                               | Required | Description                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `nuxt`   | `string`                                                                                                                                           | `false`  | Nuxt version in semver format. Versions may be defined in Node.js way, for example: `>=2.15.0 <3.0.0`.                                          |
| `bridge` | `Record<string, string | false>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | Specifies version constraints or disables compatibility for specific Nuxt builders like `vite`, `webpack`, or `rspack`. Use `false` to disable. |

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

## `assertNuxtCompatibility`

Asserts that constraints are met for the current Nuxt version. If not, throws an error with the list of issues as string.

### Type
```

Example 3 (unknown):
```unknown
### Parameters

**`constraints`**: Version and builder constraints to check against. Refer to the [constraints table in `checkNuxtCompatibility`](https://nuxt.com/#parameters) for details.

**`nuxt`**: Nuxt instance. If not provided, it will be retrieved from the context via `useNuxt()` call.

## `hasNuxtCompatibility`

Checks if constraints are met for the current Nuxt version. Return `true` if all constraints are met, otherwise returns `false`. Nuxt 2 version also checks for `bridge` support.

### Usage
```

Example 4 (unknown):
```unknown
### Type
```

---

## Generates `pages/about.vue`

**URL:** llms-txt#generates-`pages/about.vue`

npx nuxt add page about
bash [Terminal]

**Examples:**

Example 1 (unknown):
```unknown

```

---

## Fidelity Solutions

**URL:** llms-txt#fidelity-solutions

Fidelity Solutions is a full-stack software development agency based in Dallas, Texas, proudly working with businesses across the United States. We build custom websites, apps, and software platforms that help companies reach their digital goals using innovative, scalable technology. Our team excels in everything from UI/UX design and mobile app development to software architecture and system engineering, always tailoring our services to meet the unique needs of each client.

Efficiency drives how we work. We focus on fast timelines, clean code, and eliminating non-essential tasks that slow projects down. Our clients value the open and honest communication they receive from us throughout the entire process—no surprises, just solid teamwork from start to finish. By staying in sync with our clients and using the right tools for the job, we deliver reliable, high-performing digital solutions that grow with your business.

**Why We Partner with Nuxt**

Nuxt helps us build smoother front-end experiences for our clients. Its server-side rendering, modular features, and built-in performance enhancements enable us to create websites that are efficient and easy to scale. This Nuxt partnership has been a game-changer! We launch projects faster and deliver better user experiences across a wide range of industries. We’re excited to start sharing our Nuxt insights and top client success stories.

---

## Events

**URL:** llms-txt#events

**Contents:**
- Creating Events and Listeners

Using events is a great way to decouple your application and allow for more flexible and modular communication between different parts of your code. Events can have multiple listeners that do not depend on each other. For example, you may wish to send an email to your user each time an order has shipped. Instead of coupling your order processing code to your email code, you can emit an event which a listener can receive and use to dispatch an email.

The Nuxt event system is powered by [unjs/hookable](https://github.com/unjs/hookable){rel="&#x22;nofollow&#x22;"}, which is the same library that powers the Nuxt hooks system.

## Creating Events and Listeners

You can create your own custom events using the `hook` method:

To emit an event and notify any listeners, use `callHook`:

You can also use the payload object to enable two-way communication between the emitter and listeners. Since the payload is passed by reference, a listener can modify it to send data back to the emitter.

::tip
You can inspect all events using the **Nuxt DevTools** Hooks panel.
::

::read-more{to="https://nuxt.com/docs/guide/going-further/hooks"}
Learn more about Nuxt's built-in hooks and how to extend them
::

**Examples:**

Example 1 (ts):
```ts
const nuxtApp = useNuxtApp()

nuxtApp.hook('app:user:registered', (payload) => {
  console.log('A new user has registered!', payload)
})
```

Example 2 (ts):
```ts
const nuxtApp = useNuxtApp()

await nuxtApp.callHook('app:user:registered', {
  id: 1,
  name: 'John Doe',
})
```

Example 3 (ts):
```ts
const nuxtApp = useNuxtApp()

nuxtApp.hook('app:user:registered', (payload) => {
  payload.message = 'Welcome to our app!'
})

const payload = {
  id: 1,
  name: 'John Doe',
}

await nuxtApp.callHook('app:user:registered', {
  id: 1,
  name: 'John Doe',
})

// payload.message will be 'Welcome to our app!'
```

---

## Transitions

**URL:** llms-txt#transitions

**Contents:**
- Page Transitions
- Layout Transitions
- Global Settings
- Disable Transitions
- JavaScript Hooks
- Dynamic Transitions
- Transition with NuxtPage
- View Transitions API (experimental)
  - Known Issues

::note
Nuxt leverages Vue's [`<Transition>`](https://vuejs.org/guide/built-ins/transition.html#the-transition-component){rel=""nofollow""} component to apply transitions between pages and layouts.
::

You can enable page transitions to apply an automatic transition for all your [pages](https://nuxt.com/docs/3.x/directory-structure/pages).

::note
If you are changing layouts as well as page, the page transition you set here will not run. Instead, you should set a [layout transition](https://nuxt.com/docs/3.x/getting-started/transitions#layout-transitions).
::

To start adding transition between your pages, add the following CSS to your [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app):

This produces the following result when navigating between pages:

:video{.rounded controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.jpg"}

To set a different transition for a page, set the `pageTransition` key in [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) of the page:

Moving to the about page will add the 3d rotation effect:

:video{.rounded controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1665063233/nuxt3/nuxt3-page-transitions-cutom.jpg"}

## Layout Transitions

You can enable layout transitions to apply an automatic transition for all your [layouts](https://nuxt.com/docs/3.x/directory-structure/layouts).

To start adding transition between your pages and layouts, add the following CSS to your [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app):

This produces the following result when navigating between pages:

:video{.rounded controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1665065289/nuxt3/nuxt3-layouts-transitions_c9hwlx.jpg"}

Similar to `pageTransition`, you can apply a custom `layoutTransition` to the page component using `definePageMeta`:

You can customize these default transition names globally using `nuxt.config`.

Both `pageTransition` and `layoutTransition` keys accept [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition){rel="&#x22;nofollow&#x22;"} as JSON serializable values where you can pass the `name`, `mode` and other valid transition-props of the custom CSS transition.

::warning
If you change the `name` property, you also have to rename the CSS classes accordingly.
::

To override the global transition property, use the `definePageMeta` to define page or layout transitions for a single Nuxt page and override any page or layout transitions that are defined globally in `nuxt.config` file.

## Disable Transitions

`pageTransition` and `layoutTransition` can be disabled for a specific route:

Or globally in the `nuxt.config`:

For advanced use-cases, you can use JavaScript hooks to create highly dynamic and custom transitions for your Nuxt pages.

This way presents perfect use-cases for JavaScript animation libraries such as [GSAP](https://gsap.com){rel="&#x22;nofollow&#x22;"}.

::tip
Learn more about additional [JavaScript hooks](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks){rel=""nofollow""} available in the `Transition` component.
::

## Dynamic Transitions

To apply dynamic transitions using conditional logic, you can leverage inline [middleware](https://nuxt.com/docs/3.x/directory-structure/middleware) to assign a different transition name to `to.meta.pageTransition`.

The page now applies the `slide-left` transition when going to the next id and `slide-right` for the previous:

:video{.rounded controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1665069410/nuxt3/nuxt-dynamic-page-transitions.jpg"}

## Transition with NuxtPage

When `<NuxtPage />` is used in `app.vue`, transitions can be configured with the `transition` prop to activate transitions globally.

::note
Remember, this page transition cannot be overridden with `definePageMeta` on individual pages.
::

## View Transitions API (experimental)

Nuxt ships with an experimental implementation of the [**View Transitions API**](https://developer.chrome.com/docs/web-platform/view-transitions){rel="&#x22;nofollow&#x22;"} (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API){rel="&#x22;nofollow&#x22;"}). This is an exciting new way to implement native browser transitions which (among other things) have the ability to transition between unrelated elements on different pages.

You can check a demo on <https://nuxt-view-transitions.surge.sh>{rel="&#x22;nofollow&#x22;"} and the [source on StackBlitz](https://stackblitz.com/edit/nuxt-view-transitions){rel="&#x22;nofollow&#x22;"}.

The Nuxt integration is under active development, but can be enabled with the `experimental.viewTransition` option in your configuration file:

The possible values are: `false`, `true`, or `'always'`.

If set to true, Nuxt will not apply transitions if the user's browser matches `prefers-reduced-motion: reduce` (recommended). If set to `always`, Nuxt will always apply the transition and it is up to you to respect the user's preference.

By default, view transitions are enabled for all [pages](https://nuxt.com/docs/3.x/directory-structure/pages), but you can set a different global default.

It is possible to override the default `viewTransition` value for a page by setting the `viewTransition` key in [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) of the page:

::warning
Overriding view transitions on a per-page basis will only have an effect if you have enabled the `experimental.viewTransition` option.
::

If you are also using Vue transitions like `pageTransition` and `layoutTransition` (see above) to achieve the same result as the new View Transitions API, then you may wish to *disable* Vue transitions if the user's browser supports the newer, native web API. You can do this by creating `~/middleware/disable-vue-transitions.global.ts` with the following contents:

- If you perform data fetching within your page setup functions, you may wish to reconsider using this feature for the moment. (By design, View Transitions completely freeze DOM updates whilst they are taking place.) We're looking at restricting the View Transition to the final moments before `<Suspense>` resolves, but in the interim you may want to consider carefully whether to adopt this feature if this describes you.

**Examples:**

Example 1 (unknown):
```unknown
::note
If you are changing layouts as well as page, the page transition you set here will not run. Instead, you should set a [layout transition](https://nuxt.com/docs/3.x/getting-started/transitions#layout-transitions).
::

To start adding transition between your pages, add the following CSS to your [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app):

::code-group
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

This produces the following result when navigating between pages:

:video{.rounded controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.jpg"}

To set a different transition for a page, set the `pageTransition` key in [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) of the page:

::code-group
```

---

## nuxt build

**URL:** llms-txt#nuxt-build

**Contents:**
- Arguments
- Options

The `build` command creates a `.output` directory with all your application, server and dependencies ready for production.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default | Description                                                                                                                                          |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--cwd=<directory>`                |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)                                                                     |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                                                                                                                         |
| `--prerender`                      |         | Build Nuxt and prerender static routes                                                                                                               |
| `--preset`                         |         | Nitro server preset                                                                                                                                  |
| `--dotenv`                         |         | Path to `.env` file to load, relative to the root directory                                                                                          |
| `--envName`                        |         | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server) |
| `-e, --extends=<layer-name>`       |         | Extend from a Nuxt layer                                                                                                                             |

::note
This command sets `process.env.NODE_ENV` to `production`.
::

::note
`--prerender` will always set the `preset` to `static`
::

---

## Universal Router

**URL:** llms-txt#universal-router

::sandbox
---
branch: main
dir: examples/routing/universal-router
file: app.vue
repo: nuxt/examples
---
::

---

## Pages and Layouts

**URL:** llms-txt#pages-and-layouts

**Contents:**
- `app.vue`
  - Migration
- Layouts
  - Migration
- Pages
  - Dynamic Routes
  - Nested Routes
  - Page Keys and Keep-alive Props
  - Page and Layout Transitions
  - Migration

Nuxt 3 provides a central entry point to your app via `~/app.vue`.

::note
If you don't have an `app.vue` file in your source directory, Nuxt will use its own default version.
::

This file is a great place to put any custom code that needs to be run once when your app starts up, as well as any components that are present on every page of your app. For example, if you only have one layout, you can move this to `app.vue` instead.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/app"}
::

::link-example{to="https://nuxt.com/docs/examples/hello-world"}
::

Consider creating an `app.vue` file and including any logic that needs to run once at the top-level of your app. You can check out [an example here](https://nuxt.com/docs/3.x/directory-structure/app).

If you are using layouts in your app for multiple pages, there is only a slight change required.

In Nuxt 2, the `<Nuxt>` component is used within a layout to render the current page. In Nuxt 3, layouts use slots instead, so you will have to replace that component with a `<slot />`. This also allows advanced use cases with named and scoped slots. [Read more about layouts](https://nuxt.com/docs/3.x/directory-structure/layouts).

You will also need to change how you define the layout used by a page using the `definePageMeta` compiler macro. Layouts will be kebab-cased. So `layouts/customLayout.vue` becomes `custom-layout` when referenced in your page.

1. Replace `<Nuxt />` with `<slot />`

2. Use [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) to select the layout used by your page.

3. Move `~/layouts/_error.vue` to `~/error.vue`. See [the error handling docs](https://nuxt.com/docs/3.x/getting-started/error-handling). If you want to ensure that this page uses a layout, you can use [`<NuxtLayout>`](https://nuxt.com/docs/3.x/directory-structure/layouts) directly within `error.vue`:

Nuxt 3 ships with an optional `vue-router` integration triggered by the existence of a [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory in your source directory. If you only have a single page, you may consider instead moving it to `app.vue` for a lighter build.

The format for defining dynamic routes in Nuxt 3 is slightly different from Nuxt 2, so you may need to rename some of the files within `pages/`.

1. Where you previously used `_id` to define a dynamic route parameter you now use `[id]`.
2. Where you previously used `_.vue` to define a catch-all route, you now use `[...slug].vue`.

In Nuxt 2, you will have defined any nested routes (with parent and child components) using `<Nuxt>` and `<NuxtChild>`. In Nuxt 3, these have been replaced with a single `<NuxtPage>` component.

### Page Keys and Keep-alive Props

If you were passing a custom page key or keep-alive props to `<Nuxt>`, you will now use `definePageMeta` to set these options.

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/pages#special-metadata
---
::

### Page and Layout Transitions

If you have been defining transitions for your page or layout directly in your component options, you will now need to use `definePageMeta` to set the transition. Since Vue 3, [-enter and -leave CSS classes have been renamed](https://v3-migration.vuejs.org/breaking-changes/transition.html){rel="&#x22;nofollow&#x22;"}. The `style` prop from `<Nuxt>` no longer applies to transition when used on `<slot>`, so move the styles to your `-active` class.

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

1. Rename any pages with dynamic parameters to match the new format.
2. Update `<Nuxt>` and `<NuxtChild>` to be `<NuxtPage>`.
3. If you're using the Composition API, you can also migrate `this.$route` and `this.$router` to use [`useRoute`](https://nuxt.com/docs/3.x/api/composables/use-route) and [`useRouter`](https://nuxt.com/docs/3.x/api/composables/use-router) composables.

#### Example: Dynamic Routes

#### Example: Nested Routes and `definePageMeta`

## `<NuxtLink>` Component

Most of the syntax and functionality are the same for the global [NuxtLink](https://nuxt.com/docs/3.x/api/components/nuxt-link) component. If you have been using the shortcut `<NLink>` format, you should update this to use `<NuxtLink>`.

`<NuxtLink>` is now a drop-in replacement for *all* links, even external ones. You can read more about it, and how to extend it to provide your own link component.

::read-more{to="https://nuxt.com/docs/api/components/nuxt-link"}
::

## Programmatic Navigation

When migrating from Nuxt 2 to Nuxt 3, you will have to update how you programmatically navigate your users. In Nuxt 2, you had access to the underlying Vue Router with `this.$router`. In Nuxt 3, you can use the `navigateTo()` utility method which allows you to pass a route and parameters to Vue Router.

::warning
Make sure to always `await` on [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to) or chain its result by returning from functions.
::

**Examples:**

Example 1 (unknown):
```unknown
2. Use [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) to select the layout used by your page.
```

Example 2 (unknown):
```unknown
3. Move `~/layouts/_error.vue` to `~/error.vue`. See [the error handling docs](https://nuxt.com/docs/3.x/getting-started/error-handling). If you want to ensure that this page uses a layout, you can use [`<NuxtLayout>`](https://nuxt.com/docs/3.x/directory-structure/layouts) directly within `error.vue`:
```

Example 3 (unknown):
```unknown
## Pages

Nuxt 3 ships with an optional `vue-router` integration triggered by the existence of a [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory in your source directory. If you only have a single page, you may consider instead moving it to `app.vue` for a lighter build.

### Dynamic Routes

The format for defining dynamic routes in Nuxt 3 is slightly different from Nuxt 2, so you may need to rename some of the files within `pages/`.

1. Where you previously used `_id` to define a dynamic route parameter you now use `[id]`.
2. Where you previously used `_.vue` to define a catch-all route, you now use `[...slug].vue`.

### Nested Routes

In Nuxt 2, you will have defined any nested routes (with parent and child components) using `<Nuxt>` and `<NuxtChild>`. In Nuxt 3, these have been replaced with a single `<NuxtPage>` component.

### Page Keys and Keep-alive Props

If you were passing a custom page key or keep-alive props to `<Nuxt>`, you will now use `definePageMeta` to set these options.

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/pages#special-metadata
---
::

### Page and Layout Transitions

If you have been defining transitions for your page or layout directly in your component options, you will now need to use `definePageMeta` to set the transition. Since Vue 3, [-enter and -leave CSS classes have been renamed](https://v3-migration.vuejs.org/breaking-changes/transition.html){rel="&#x22;nofollow&#x22;"}. The `style` prop from `<Nuxt>` no longer applies to transition when used on `<slot>`, so move the styles to your `-active` class.

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

### Migration

1. Rename any pages with dynamic parameters to match the new format.
2. Update `<Nuxt>` and `<NuxtChild>` to be `<NuxtPage>`.
3. If you're using the Composition API, you can also migrate `this.$route` and `this.$router` to use [`useRoute`](https://nuxt.com/docs/3.x/api/composables/use-route) and [`useRouter`](https://nuxt.com/docs/3.x/api/composables/use-router) composables.

#### Example: Dynamic Routes

::code-group
```

Example 4 (unknown):
```unknown

```

---

## defineRouteRules

**URL:** llms-txt#definerouterules

**Contents:**
- Usage
- Notes

::read-more
---
icon: i-lucide-star
to: https://nuxt.com/docs/guide/going-further/experimental-features#inlinerouterules
---
This feature is experimental and in order to use it you must enable the `experimental.inlineRouteRules` option in your `nuxt.config`.
::

Will be translated to:

::note
When running [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build), the home page will be pre-rendered in `.output/public/index.html` and statically served.
::

- A rule defined in `~/pages/foo/bar.vue` will be applied to `/foo/bar` requests.
- A rule in `~/pages/foo/[id].vue` will be applied to `/foo/**` requests.

For more control, such as if you are using a custom `path` or `alias` set in the page's [`definePageMeta`](https://nuxt.com/docs/3.x/api/utils/define-page-meta), you should set `routeRules` directly within your `nuxt.config`.

::read-more
---
icon: i-lucide-medal
to: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
---
Read more about the `routeRules`.
::

**Examples:**

Example 1 (unknown):
```unknown
Will be translated to:
```

---

## useRoute

**URL:** llms-txt#useroute

**Contents:**
- Example
- API
- Common Pitfalls
  - Route Synchronization Issues
  - Calling `useRoute` in Middleware
  - Hydration Issues with `route.fullPath`

::note
Within the template of a Vue component, you can access the route using `$route`.
::

The `useRoute` composable is a wrapper around the identically named composable from `vue-router`, providing access to the current route in a Nuxt application.

The key difference is that in Nuxt, the composable ensures that the route is updated **only after** the page content has changed after navigation.
In contrast, the `vue-router` version updates the route **immediately**, which can lead to synchronization issues between different parts of the template
that rely on the route metadata, for example.

In the following example, we call an API via [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) using a dynamic page parameter - `slug` - as part of the URL.

If you need to access the route query parameters (for example `example` in the path `/test?example=true`), then you can use `useRoute().query` instead of `useRoute().params`.

Apart from dynamic parameters and query parameters, `useRoute()` also provides the following computed references related to the current route:

- `fullPath`: encoded URL associated with the current route that contains path, query and hash
- `hash`: decoded hash section of the URL that starts with a #
- `query`: access route query parameters
- `matched`: array of normalized matched routes with current route location
- `meta`: custom data attached to the record
- `name`: unique name for the route record
- `path`: encoded pathname section of the URL
- `redirectedFrom`: route location that was attempted to access before ending up on the current route location

### Route Synchronization Issues

It’s important to use the `useRoute()` composable from Nuxt rather than the one from `vue-router` to avoid synchronization issues during page navigation.
Importing `useRoute` directly from `vue-router` bypasses Nuxt's implementation.

### Calling `useRoute` in Middleware

Using `useRoute` in middleware is not recommended because it can lead to unexpected behavior.
There is no concept of a "current route" in middleware.
The `useRoute()` composable should only be used in the setup function of a Vue component or in a Nuxt plugin.

::warning
This applies to any composable that uses `useRoute()` internally too.
::

::read-more{to="https://nuxt.com/docs/3.x/directory-structure/app/middleware"}
Read more about accessing the route in the middleware section.
::

### Hydration Issues with `route.fullPath`

Browsers don't send [URL fragments](https://url.spec.whatwg.org/#concept-url-fragment){rel="&#x22;nofollow&#x22;"} (for example `#foo`) when making requests. So using `route.fullPath` to affect the template can trigger hydration issues because this will include the fragment on client but not the server.

::read-more
---
icon: i-simple-icons-vuedotjs
to: https://router.vuejs.org/api/type-aliases/RouteLocationNormalizedLoaded.html
---
::

**Examples:**

Example 1 (unknown):
```unknown
If you need to access the route query parameters (for example `example` in the path `/test?example=true`), then you can use `useRoute().query` instead of `useRoute().params`.

## API

Apart from dynamic parameters and query parameters, `useRoute()` also provides the following computed references related to the current route:

- `fullPath`: encoded URL associated with the current route that contains path, query and hash
- `hash`: decoded hash section of the URL that starts with a #
- `query`: access route query parameters
- `matched`: array of normalized matched routes with current route location
- `meta`: custom data attached to the record
- `name`: unique name for the route record
- `path`: encoded pathname section of the URL
- `redirectedFrom`: route location that was attempted to access before ending up on the current route location

## Common Pitfalls

### Route Synchronization Issues

It’s important to use the `useRoute()` composable from Nuxt rather than the one from `vue-router` to avoid synchronization issues during page navigation.
Importing `useRoute` directly from `vue-router` bypasses Nuxt's implementation.
```

---

## createError

**URL:** llms-txt#createerror

**Contents:**
- Parameters
- In Vue App
  - Example
- In API Routes
  - Example

You can use this function to create an error object with additional metadata. It is usable in both the Vue and Nitro portions of your app, and is meant to be thrown.

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

You can pass either a string or an object to the `createError` function. If you pass a string, it will be used as the error `message`, and the `statusCode` will default to `500`. If you pass an object, you can set multiple properties of the error, such as `statusCode`, `message`, and other error properties.

If you throw an error created with `createError`:

- on server-side, it will trigger a full-screen error page which you can clear with `clearError`.
- on client-side, it will throw a non-fatal error for you to handle. If you need to trigger a full-screen error page, then you can do this by setting `fatal: true`.

Use `createError` to trigger error handling in server API routes.

In API routes, using `createError` by passing an object with a short `statusMessage` is recommended because it can be accessed on the client side. Otherwise, a `message` passed to `createError` on an API route will not propagate to the client. Alternatively, you can use the `data` property to pass data back to the client. In any case, always consider avoiding to put dynamic user input to the message to avoid potential security issues.

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

**Examples:**

Example 1 (unknown):
```unknown
## In API Routes

Use `createError` to trigger error handling in server API routes.

### Example
```

---

## Vite

**URL:** llms-txt#vite

**Contents:**
- Remove Modules
- Update Config
- Configuration

::warning
When using `vite`, [nitro](https://nuxt.com/docs/3.x/bridge/nitro) must have been configured.
::

- Remove `nuxt-vite`: Bridge enables same functionality

**Examples:**

Example 1 (unknown):
```unknown
## Configuration
```

---

## DigiNeat

**URL:** llms-txt#digineat

Welcome to DigiNeat — a modern digital agency that always stays up-to-date with the times. We are proud to have representations in Armenia and the USA, allowing us to effectively collaborate with clients worldwide.

We specialize in developing:

- **Websites and mobile applications**: We create attractive and functional solutions that meet any business needs.
- **Smart TV applications**: We offer innovative solutions for television platforms to make entertainment even more accessible.
- **PC software**: We develop powerful and reliable applications for all necessary tasks.

**Why We Choose NUXT**

We have been using Nuxt as one of the leading solutions in our projects — from websites to smart TV applications. Our team is thrilled to be among the official agencies representing this company. Nuxt enables us to create high-quality and efficient applications with minimal time and resource investment. [Learn more about why we choose Nuxt.](https://digineat.com/partners/nuxt){rel="&#x22;nofollow&#x22;"}

For us, our clients' tasks and deadlines are a priority. By utilizing advanced technologies and an AI-first approach, we achieve more while spending less. Our cost-effective process optimization has saved our clients millions of dollars.

**Open to Collaboration**

We are always ready for new opportunities and open to collaboration. We welcome all interested parties to work with us on joint projects.

Contact us, and let’s create the future of digital technology together!

---

## ignore page bar.vue

**URL:** llms-txt#ignore-page-bar.vue

---

## Build with the deno_deploy preset

**URL:** llms-txt#build-with-the-deno_deploy-preset

npm run build --preset=deno_deploy

---

## Understanding how fetch works in Nuxt 2.12

**URL:** llms-txt#understanding-how-fetch-works-in-nuxt-2.12

**Contents:**
- Fetch Hook and Nuxt Lifecycle
  - Page Components
- Availability of fetch hook
  - Layout Components
  - Building-block (Child/Nested) Components
- Call order of multiple fetch hooks
  - Disabling fetch on server-side
- Error Handling
- Fetch as a method
- Making Nuxt pages more performant

Nuxt introduces a new `fetch` with the latest release of version 2.12. Fetch provides a brand new way to bring data into Nuxt applications.

In this post, we will explore different features of the fetch hook and try to understand how it works.

## Fetch Hook and Nuxt Lifecycle

In terms of Nuxt lifecycle hooks, `fetch` sits within Vue lifecycle after `created` hook. As we already know that, all Vue lifecycle hooks are called with their `this` context. The same applies to `fetch` hook as well.

![New fetch in Nuxt lifecycle](https://nuxt.com/assets/blog/new-fetch-lifecycle-hooks.png)

Fetch hook is called after the component instance is created on the server-side. That makes `this` context available inside the `fetch`.

Let’s see what this could mean for page components.

With the help of `this` context, fetch is able to mutate component’s data directly. It means we can set the component’s local data without having to dispatch Vuex store action or committing mutation from the page component.

As a result, Vuex becomes optional, but not impossible. We can still use `this.$store` as usual to access Vuex store if required.

## Availability of fetch hook

With `fetch`, we can prefetch the data asynchronously **in any Vue components**. It means, other than page components found in `/pages` directory, every other `.vue` components found in `/layouts` and `/components` directories can also benefit from the fetch hook.

Let's see what this could mean for layout and building-block components.

### Layout Components

Using new `fetch`, now we can make API calls directly from the layout components. This was impossible prior to the release of v2.12.

**Possible use cases**

- Fetch config data from the back-end in Nuxt layouts to generate footer and navbar dynamically
- Fetch user related data (i.e. user profile, shopping-cart item count) in the navbar
- Fetch site relevant data on `layouts/error.vue`

### Building-block (Child/Nested) Components

With `fetch` hook available in child components as well, we can off-load some of the data-fetching tasks from page-level components, and delegate them over to nested components. This was also impossible prior to the release of v2.12.

This reduces the responsibility of route-level components to a great extent.

**Possible use case -** We can still pass props to child components, but if the child components need to have their own data-fetching logic, now they can!

## Call order of multiple fetch hooks

Since each component can have its own data-fetching logic, you may ask what would be the order in which each of them are called?

Fetch hook is called on server-side once (on the first request to the Nuxt app) and then on client-side when navigating to further routes. But since we can define one fetch hook for each component, fetch hooks are called in sequence of their hierarchy.

### Disabling fetch on server-side

In addition, we can even disable fetch on the server-side if required.

And this way, the fetch hook will only be called on client-side. When `fetchOnServer` is set to false, `$fetchState.pending` becomes `true` when the component is rendered on server-side.

New `fetch` handles error at component level. Let’s see how.

Because we’re fetching data asynchronously, the new fetch() provides a `$fetchState` object to check whether the request has finished and progressed successfully.

Below is what the `$fetchState` object looks like.

1. **Pending -** lets you display a placeholder when fetch is being called on client-side
2. **Error -** lets you show an error message
3. **Timestamp -** shows timestamp of the last fetch which is useful for caching with `keep-alive`

These keys are then used directly in the template area of the component to show relevant placeholders during the process of fetching data from the API.

When error occurs at **component-level**, we can set HTTP status code on server-side by checking `process.server` in fetch hook and follow it up with `throw new Error()` statement.

Setting the HTTP status code this way **is useful for correct SEO**.

New fetch hook also acts as a method that can be invoked upon user interaction or invoked programmatically from the component methods.

## Making Nuxt pages more performant

We can use `:keep-alive-props` prop and `activated` hook to make Nuxt page components more performant using a new fetch hook.

Nuxt allows **caching a certain number of pages** in the memory along with their fetched data. And also allows **adding a number of seconds** before we can re-fetch the data.

For any of the above methods to work, we have to use the `keep-alive` prop in generic `<nuxt />` and `<nuxt-child`> components.

In addition, we can pass `:keep-alive-props` to `<nuxt />` component to cache a number of pages along with their fetched data.

`:keep-alive-props` prop allow us to indicate the maximum number of pages that should be kept in the memory while we navigate elsewhere within the site.

Above is one way to boost page performance which is more high-level and generic, while the next one drills down to optimize the fetch request calls by using the `timestamp` property of `$fetchState` and comparing it against the number of seconds delay before it re-fetches the data.

Vue’s `activated` hook is used here with Nuxt's `keep-alive` prop to re-fetch the data.

## asyncData vs Fetch

As far as page components are concerned, new `fetch` seems way too similar to `asyncData()` because they both deal with the local data. But there are some key differences worth taking note of as below.

As of Nuxt 2.12, `asyncData` method is still an active feature. Let’s examine some of the key differences between `asyncData` and new `fetch`.

1. `asyncData` is limited to only page-level components
2. `this` context is unavailable
3. Adds payload by **returning** the data

1. `fetch` is available in all Vue components
2. `this` context is available
3. Simply **mutates** the local data

## Fetch before Nuxt 2.12

If you have been working with Nuxt for a while, then you’ll know that the previous version of `fetch` was significantly different.

> **Is this a breaking change?**

> No, it isn't. Actually, the old fetch can still be used by passing the `context` as the first argument to avoid any breaking changes in your existing Nuxt applications.

Here’s the list of notable changes in `fetch` hook compared with **before** and **after** v2.12.

### 1. Call order of `fetch` hook

**Before -** `fetch` hook was called before initiating the component, hence `this` wasn’t available inside the fetch hook.

**After -** `fetch` is called after the component instance is created on the server-side when the route is accessed.

### 2. `this` vs `context`

**Before -** We had access to the Nuxt `context` on page-level components, given that the `context` is passed as a first parameter.

**After -** We can access `this` context just like Vue client-side hooks without passing any parameters.

### 3. Availability of `fetch` hook

**Before -** Only page (route-level) components were allowed to fetch data on the server-side.

**After -** Now, we can prefetch the data asynchronously in any Vue components.

### 4. Call order of `fetch` hook

**Before -** `fetch` could be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.

**After -** New `fetch` is the same as an old fetch, but…

…since we can have one `fetch` for each component, `fetch` hooks are called in sequence of their hierarchy.

### 5. Error Handling

**Before -** We used the `context.error` function that showed a custom error page when an error occurred during API calls.

**After -** New `fetch` uses the `$fetchState` object to handle errors in the template area during API calls.

Error handling is performed at component level.

> **Does this mean we cannot show users a custom error page like we did prior to Nuxt 2.12?**

Yes we can, but only with `asyncData()` when it's about page-level component data. When using `fetch`, we can utilize `this.$nuxt.error({ statusCode: 404, message: 'Data not found' })` to show a custom error page.

New fetch hook brings a lot of improvements and provides more flexibility in fetching data and organizing route-level & building-block components in a whole new way!

It will certainly make you think a little differently when you plan and design your new Nuxt project that requires multiple API calls within the same route.

I hope this article has helped you get acquainted with the new `fetch` feature. I'd love to see what you build with it.

**Examples:**

Example 1 (js):
```js
export default {
  fetch() {
    console.log(this)
  }
}
```

Example 2 (js):
```js
export default {
  fetchOnServer: false
}
```

Example 3 (text):
```text
$fetchState = {
  pending: true | false,
  error: null | {},
  timestamp: Integer
};
```

Example 4 (html):
```html
<template>
  <div>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">Error while fetching posts</p>
    <ul v-else>
      …
    </ul>
  </div>
</template>
```

---

## package.json

**URL:** llms-txt#package.json

The minimal `package.json` of your Nuxt application should looks like:

::read-more
---
icon: i-simple-icons-npm
target: _blank
to: https://docs.npmjs.com/cli/configuring-npm/package-json
---
Read more about the `package.json` file.
::

---

## Generates `app/layouts/custom.vue`

**URL:** llms-txt#generates-`app/layouts/custom.vue`

**Contents:**
- `nuxt add plugin`

npx nuxt add layout custom
bash [Terminal]

**Examples:**

Example 1 (unknown):
```unknown
## `nuxt add plugin`

- Modifier flags: `--mode client|server` or `--client`or `--server`
```

---

## Nuxt 3.13

**URL:** llms-txt#nuxt-3.13

**Contents:**
- 🏘️ Route Groups
- 🏝️ Islands and Head Metadata
- 🪝 Custom Prefetch Triggers
- 🗺️ Better Server Source Maps
- 🎁 New Features for Module Authors
- ✨ Improved Dev Warnings
- 🚨 Vue TypeScript Changes
- ✅ Upgrading
- Full Release Notes

We now support naming directories with parentheses/brackets to organise your routes without affecting the path.

This will produce `/`, `/about` and `/contact` pages in your app. The `marketing` group is ignored for purposes of your URL structure.

Read more in [the original PR](https://github.com/nuxt/nuxt/pull/28276){rel="&#x22;nofollow&#x22;"}.

## 🏝️ Islands and Head Metadata

It's now possible for server component islands to manipulate the head, such as by adding SEO metadata when rendering.

Read more in [#27987](https://github.com/nuxt/nuxt/pull/27987){rel="&#x22;nofollow&#x22;"}.

## 🪝 Custom Prefetch Triggers

We now support custom prefetch triggers for `NuxtLink` ([#27846](https://github.com/nuxt/nuxt/pull/27846){rel="&#x22;nofollow&#x22;"}).

It's also possible to enable/disable these globally for your app and override them per link.

## 🗺️ Better Server Source Maps

When running with `node --enable-source-maps`, you may have noticed that the source maps for the Vue files in your server build pointed to the Vite build output (something like `.nuxt/dist/server/_nuxt/index-O15BBwZ3.js`).

Now, even after your Nitro build, your server source maps will reference your original source files ([#28521](https://github.com/nuxt/nuxt/pull/28521){rel="&#x22;nofollow&#x22;"}).

Note that one of the easiest ways of improving your build performance is to turn off source maps if you aren't using them, which you can do easily in your `nuxt.config.ts`:

## 🎁 New Features for Module Authors

In the run-up to Nuxt v4, we're working on adding some key functionality for module authors, including a new `isNuxtMajorVersion` utility where required ([#27579](https://github.com/nuxt/nuxt/pull/27579){rel="&#x22;nofollow&#x22;"}) and better inferred typing for merged module options using the new `defineNuxtModule().with()` method ([#27520](https://github.com/nuxt/nuxt/pull/27520){rel="&#x22;nofollow&#x22;"}).

## ✨ Improved Dev Warnings

We no longer warn when using data fetching composables in middleware ([#28604](https://github.com/nuxt/nuxt/pull/28604){rel="&#x22;nofollow&#x22;"}) and we warn when user components' names begin with Lazy ([#27838](https://github.com/nuxt/nuxt/pull/27838){rel="&#x22;nofollow&#x22;"}).

## 🚨 Vue TypeScript Changes

For a while, in the Vue ecosystem, we've been augmenting `@vue/runtime-core` to add custom properties and more to `vue`. However, this inadvertently breaks the types for projects that augment `vue` - which is now the officially recommended and documented way to augment these interfaces (for example, [ComponentCustomProperties](https://vuejs.org/api/utility-types.html#componentcustomproperties){rel="&#x22;nofollow&#x22;"}, [GlobalComponents](https://vuejs.org/guide/extras/web-components.html#web-components-and-typescript){rel="&#x22;nofollow&#x22;"} and [so on](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties){rel="&#x22;nofollow&#x22;"}).

This means *all* libraries must update their code (or it will break the types of libraries that augment `vue` instead).

We've updated our types in Nuxt along these lines but you may experience issues with the latest `vue-router` when used with libraries which haven't yet done so.

Please create an issue with a reproduction - I'll happily help create a PR to resolve in the upstream library in question. Or you may be able to work around the issue by creating a `declarations.d.ts` in the root of your project with the following code ([credit](https://github.com/nuxt/nuxt/pull/28542#issuecomment-2293282891){rel="&#x22;nofollow&#x22;"} to [@BobbieGoede](https://github.com/BobbieGoede){rel="&#x22;nofollow&#x22;"}):

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## Full Release Notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.13.0
---
Read the full release notes of Nuxt `v3.13.0`.
::

A huge thank you to everyone who's been a part of this release - you are the ones who make Nuxt possible. ❤️

Don't hesitate to let us know if you have any feedback or issues! 🙏

**Examples:**

Example 1 (unknown):
```unknown
This will produce `/`, `/about` and `/contact` pages in your app. The `marketing` group is ignored for purposes of your URL structure.

Read more in [the original PR](https://github.com/nuxt/nuxt/pull/28276){rel="&#x22;nofollow&#x22;"}.

## 🏝️ Islands and Head Metadata

It's now possible for server component islands to manipulate the head, such as by adding SEO metadata when rendering.

Read more in [#27987](https://github.com/nuxt/nuxt/pull/27987){rel="&#x22;nofollow&#x22;"}.

## 🪝 Custom Prefetch Triggers

We now support custom prefetch triggers for `NuxtLink` ([#27846](https://github.com/nuxt/nuxt/pull/27846){rel="&#x22;nofollow&#x22;"}).

For example:
```

Example 2 (unknown):
```unknown
It's also possible to enable/disable these globally for your app and override them per link.

For example:
```

Example 3 (unknown):
```unknown
## 🗺️ Better Server Source Maps

When running with `node --enable-source-maps`, you may have noticed that the source maps for the Vue files in your server build pointed to the Vite build output (something like `.nuxt/dist/server/_nuxt/index-O15BBwZ3.js`).

Now, even after your Nitro build, your server source maps will reference your original source files ([#28521](https://github.com/nuxt/nuxt/pull/28521){rel="&#x22;nofollow&#x22;"}).

Note that one of the easiest ways of improving your build performance is to turn off source maps if you aren't using them, which you can do easily in your `nuxt.config.ts`:
```

Example 4 (unknown):
```unknown
## 🎁 New Features for Module Authors

In the run-up to Nuxt v4, we're working on adding some key functionality for module authors, including a new `isNuxtMajorVersion` utility where required ([#27579](https://github.com/nuxt/nuxt/pull/27579){rel="&#x22;nofollow&#x22;"}) and better inferred typing for merged module options using the new `defineNuxtModule().with()` method ([#27520](https://github.com/nuxt/nuxt/pull/27520){rel="&#x22;nofollow&#x22;"}).

## ✨ Improved Dev Warnings

We no longer warn when using data fetching composables in middleware ([#28604](https://github.com/nuxt/nuxt/pull/28604){rel="&#x22;nofollow&#x22;"}) and we warn when user components' names begin with Lazy ([#27838](https://github.com/nuxt/nuxt/pull/27838){rel="&#x22;nofollow&#x22;"}).

## 🚨 Vue TypeScript Changes

For a while, in the Vue ecosystem, we've been augmenting `@vue/runtime-core` to add custom properties and more to `vue`. However, this inadvertently breaks the types for projects that augment `vue` - which is now the officially recommended and documented way to augment these interfaces (for example, [ComponentCustomProperties](https://vuejs.org/api/utility-types.html#componentcustomproperties){rel="&#x22;nofollow&#x22;"}, [GlobalComponents](https://vuejs.org/guide/extras/web-components.html#web-components-and-typescript){rel="&#x22;nofollow&#x22;"} and [so on](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties){rel="&#x22;nofollow&#x22;"}).

This means *all* libraries must update their code (or it will break the types of libraries that augment `vue` instead).

We've updated our types in Nuxt along these lines but you may experience issues with the latest `vue-router` when used with libraries which haven't yet done so.

Please create an issue with a reproduction - I'll happily help create a PR to resolve in the upstream library in question. Or you may be able to work around the issue by creating a `declarations.d.ts` in the root of your project with the following code ([credit](https://github.com/nuxt/nuxt/pull/28542#issuecomment-2293282891){rel="&#x22;nofollow&#x22;"} to [@BobbieGoede](https://github.com/BobbieGoede){rel="&#x22;nofollow&#x22;"}):
```

---

## Koyeb

**URL:** llms-txt#koyeb

**Contents:**
- Setup
- Learn more

Nuxt supports deploying on the [Koyeb serverless platform](https://www.koyeb.com/docs){rel="&#x22;nofollow&#x22;"} with minimal configuration.

1. Create a new Koyeb app for Nuxt following the [guide](https://www.koyeb.com/docs/deploy/nuxt){rel="&#x22;nofollow&#x22;"}.
2. Set the `engines.node` field in your project's `package.json` file to a [Koyeb-supported version of Node.js](https://www.koyeb.com/docs/build-and-deploy/build-from-git/nodejs#runtime){rel="&#x22;nofollow&#x22;"}:

3. Ensure that `build` and `start` scripts are defined within the project's `package.json` file to define how to build and run the application:

4. During deployment, you'll need to configure environment variables. In your service settings, set the following [environment variable](https://www.koyeb.com/docs/build-and-deploy/environment-variables):

5. Click "Deploy" to build and deploy your Nuxt app.

::read-more{to="https://nitro.unjs.io/deploy/providers/koyeb" target="_blank"}
Head over **Nitro documentation** to learn more about the Koyeb deployment preset.
::
````

**Examples:**

Example 1 (unknown):

```unknown
3. Ensure that `build` and `start` scripts are defined within the project's `package.json` file to define how to build and run the application:
```

Example 2 (unknown):

```unknown
4. During deployment, you'll need to configure environment variables. In your service settings, set the following [environment variable](https://www.koyeb.com/docs/build-and-deploy/environment-variables):
```

Example 3 (unknown):

```unknown
5. Click "Deploy" to build and deploy your Nuxt app.

## Learn more

::read-more{to="https://nitro.unjs.io/deploy/providers/koyeb" target="_blank"}
Head over **Nitro documentation** to learn more about the Koyeb deployment preset.
::
```

---

## Templates

**URL:** llms-txt#templates

**Contents:**

- `addTemplate`
  - Usage
  - Type
  - Parameters
  - Examples
- `addTypeTemplate`
  - Usage
  - Type
  - Parameters
  - Examples

Templates allow you to generate extra files during development and build time. These files will be available in virtual filesystem and can be used in plugins, layouts, components, etc. `addTemplate` and `addTypeTemplate` allow you to add templates to the Nuxt application. `updateTemplates` allows you to regenerate templates that match the filter.

Renders given template during build into the virtual file system, and optionally to disk in the project `buildDir`

**template**: A template object or a string with the path to the template. If a string is provided, it will be converted to a template object with `src` set to the string value. If a template object is provided, it must have the following properties:

| Property      | Type                       | Required                                                                                                                           | Description                                                                                                                                    |
| ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `string`                   | `false`                                                                                                                            | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                        |
| `filename`    | `string`                   | `false`                                                                                                                            | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required. |
| `dst`         | `string`                   | `false`                                                                                                                            | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.              |
| `options`     | `Options`                  | `false`                                                                                                                            | Options to pass to the template.                                                                                                               |
| `getContents` | `(data: Options) => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`                                                                                                                                        | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |
| `write`       | `boolean`                  | `false`                                                                                                                            | If set to `true`, the template will be written to the destination file. Otherwise, the template will be used only in virtual filesystem.       |

#### Creating a Virtual File for Runtime Plugin

In this example, we merge an object inside a module and consume the result in a runtime plugin.

In the module above, we generate a virtual file named `meta.config.mjs`. In the runtime plugin, we can import it using the `#build` alias:

Renders given template during build into the project buildDir, then registers it as types.

**template**: A template object or a string with the path to the template. If a string is provided, it will be converted to a template object with `src` set to the string value. If a template object is provided, it must have the following properties:

| Property      | Type                       | Required                                                                                                                           | Description                                                                                                                                    |
| ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `string`                   | `false`                                                                                                                            | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                        |
| `filename`    | `string`                   | `false`                                                                                                                            | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required. |
| `dst`         | `string`                   | `false`                                                                                                                            | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.              |
| `options`     | `Options`                  | `false`                                                                                                                            | Options to pass to the template.                                                                                                               |
| `getContents` | `(data: Options) => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`                                                                                                                                        | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |

**context**: An optional context object can be passed to control where the type is added. If omitted, the type will only be added to the Nuxt context. This object supports the following properties:

| Property | Type      | Required | Description                                                    |
| -------- | --------- | -------- | -------------------------------------------------------------- |
| `nuxt`   | `boolean` | `false`  | If set to `true`, the type will be added to the Nuxt context.  |
| `nitro`  | `boolean` | `false`  | If set to `true`, the type will be added to the Nitro context. |

#### Adding Type Templates to the Nitro Context

By default, －－ only adds the type declarations to the Nuxt context. To also add them to the Nitro context, set nitro to true.

This allows the `#auth-utils` module to be used within the Nitro context.

## `addServerTemplate`

Adds a virtual file that can be used within the Nuxt Nitro server build.

**template**: A template object. It must have the following properties:

| Property      | Type          | Required                                                                                                                           | Description               |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `filename`    | `string`      | `true`                                                                                                                             | Filename of the template. |
| `getContents` | `() => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `true`                    | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. |

### Creating a Virtual File for Nitro

In this example, we create a virtual file that can be used within the Nuxt Nitro server build.

And then in a runtime file

Regenerate templates that match the filter. If no filter is provided, all templates will be regenerated.

**options**: Options to pass to the template. This object can have the following property:

| Property | Type                                                                                                                                                            | Required | Description                                                                                                                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `filter` | `(template: ResolvedNuxtTemplate) => boolean`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | A function that will be called with the `template` object. It should return a boolean indicating whether the template should be regenerated. If `filter` is not provided, all templates will be regenerated. |

**Examples:**

Example 1 (unknown):

```unknown
### Type
```

Example 2 (unknown):

```unknown
### Parameters

**template**: A template object or a string with the path to the template. If a string is provided, it will be converted to a template object with `src` set to the string value. If a template object is provided, it must have the following properties:

| Property      | Type                                                                                                                                                            | Required | Description                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `string`                                                                                                                                                        | `false`  | Path to the template. If `src` is not provided, `getContents` must be provided instead.                                                                                          |
| `filename`    | `string`                                                                                                                                                        | `false`  | Filename of the template. If `filename` is not provided, it will be generated from the `src` path. In this case, the `src` option is required.                                   |
| `dst`         | `string`                                                                                                                                                        | `false`  | Path to the destination file. If `dst` is not provided, it will be generated from the `filename` path and nuxt `buildDir` option.                                                |
| `options`     | `Options`                                                                                                                                                       | `false`  | Options to pass to the template.                                                                                                                                                 |
| `getContents` | `(data: Options) => string | Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | A function that will be called with the `options` object. It should return a string or a promise that resolves to a string. If `src` is provided, this function will be ignored. |
| `write`       | `boolean`                                                                                                                                                       | `false`  | If set to `true`, the template will be written to the destination file. Otherwise, the template will be used only in virtual filesystem.                                         |

### Examples

#### Creating a Virtual File for Runtime Plugin

In this example, we merge an object inside a module and consume the result in a runtime plugin.
```

Example 3 (unknown):

```unknown
In the module above, we generate a virtual file named `meta.config.mjs`. In the runtime plugin, we can import it using the `#build` alias:
```

Example 4 (unknown):

```unknown
## `addTypeTemplate`

Renders given template during build into the project buildDir, then registers it as types.

### Usage
```

---

## nuxt info

**URL:** llms-txt#nuxt-info

**Contents:**

- Arguments
- Options

The `info` command logs information about the current or specified Nuxt project.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option              | Default | Description                                                                      |
| ------------------- | ------- | -------------------------------------------------------------------------------- |
| `--cwd=<directory>` |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |

---

## DigitalOcean

**URL:** llms-txt#digitalocean

**Contents:**

- Setup
- Learn more

Nuxt supports deploying on the [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

1. Create a new DigitalOcean app following the [guide](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/){rel="&#x22;nofollow&#x22;"}.
2. Next, you'll need to configure environment variables. In your app settings, ensure the following [app-level environment variables](https://docs.digitalocean.com/products/app-platform/how-to/use-environment-variables/){rel="&#x22;nofollow&#x22;"}:

3. You will need to ensure you set an `engines.node` field in your app's `package.json` to ensure DigitalOcean uses a supported version of Node.js:

4. You'll also need to add a run command so DigitalOcean knows what command to run after a build. You can do so by adding a start script to your `package.json`:

5. Finally, you'll need to add this start script to your DigitalOcean app's run command. Go to `Components > Settings > Commands`, click "Edit", then add `npm run start`

::tip
Your Nuxt app should be live at a DigitalOcean generated URL and you can now follow [the rest of the DigitalOcean deployment guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-deployments/).
::

::read-more{to="https://nitro.unjs.io/deploy/providers/digitalocean" target="\_blank"}
Head over **Nitro documentation** to learn more about the digitalocean deployment preset.
::

````

**Examples:**

Example 1 (bash):
```bash
SERVER_PRESET=digital-ocean
```

Example 2 (unknown):
```unknown
4. You'll also need to add a run command so DigitalOcean knows what command to run after a build. You can do so by adding a start script to your `package.json`:
```

Example 3 (unknown):
```unknown
5. Finally, you'll need to add this start script to your DigitalOcean app's run command. Go to `Components > Settings > Commands`, click "Edit", then add `npm run start`

::tip
Your Nuxt app should be live at a DigitalOcean generated URL and you can now follow [the rest of the DigitalOcean deployment guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-deployments/).
::

## Learn more

::read-more{to="https://nitro.unjs.io/deploy/providers/digitalocean" target="_blank"}
Head over **Nitro documentation** to learn more about the digitalocean deployment preset.
::
```

---

## Going Full Static

**URL:** llms-txt#going-full-static

**Contents:**
- Too long to read
- History
- Current issues
- New config option: `target`
- Smarter `nuxt generate`
  - Crazy fast static applications
  - Crawler integrated
  - Faster re-deploy
- Smarter `nuxt start`
- Preview mode

1. Upgrade nuxt to `2.14.0`
2. Set `target: 'static'` in your `nuxt.config.js`
3. Run `nuxt generate`
4. That's it ✨

*Bonus: you can run `nuxt start` to run a local server serving your generated static application.*

:video{autoplay controls autoPlay="true" controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1588095794/nuxt-full-static_rnnbvm.jpg"}

Note: in this video we are using `nuxt export` which has been deprecated in favor of `nuxt generate`.

Nuxt had the static generation feature with `nuxt generate` since [v0.3.2](https://github.com/nuxt/nuxt.js/releases/tag/v0.3.2){rel="&#x22;nofollow&#x22;"} (November 2016), since then we have improved it in multiple ways but never achieved full static generation. Today I am excited to announce that full static export is now possible with Nuxt 2.13.

`nuxt generate` is mostly pre-rendering, when you navigate client-side, `asyncData` and `fetch` are called, *making a request to your API*. A lot of users asked to support a "full static" mode, meaning to not call these 2 hooks on navigation, since the next page has been already pre-rendered.

Also, the developer experience is not optimal:

- You have access to `req` or `res` on SSR but not when running `nuxt generate`
- `process.static` is `true` only when running `nuxt generate`, making it slow to develop Nuxt modules or plugins for static generation
- You have to specify all your [dynamic routes](https://v2.nuxt.com/docs/features/file-system-routing#dynamic-routes){rel="&#x22;nofollow&#x22;"} in `generate.routes`, making it harder since you don't have access to nuxt modules there.
- You cannot test the [SPA fallback](https://v2.nuxt.com/docs/concepts/static-site-generation#spa-fallback){rel="&#x22;nofollow&#x22;"} in development, the fallback is a client-only version of your Nuxt application that loads when hitting a 404 page
- `nuxt generate` runs `nuxt build` by default, making it slower to generate your website if only your content changed

Note that it was possible to have full static support with [nuxt-payload-extractor](https://github.com/DreaMinder/nuxt-payload-extractor){rel="&#x22;nofollow&#x22;"} module but it was more verbose to use and had limitations.

## New config option: `target`

To improve the user experience as well as telling Nuxt that you want to export your application to static hosting, we are introducing a `target` option in your `nuxt.config.js`:

::important
Full static doesn't work with `ssr: 'false'` (which is the same as the deprecated `mode: 'spa'`) as this is used for client-side rendering only (Single Page Applications).
::

Running `nuxt dev` with the static target will improve the developer experience:

- Remove `req` & `res` from context
- Fallback to client-side rendering on 404, errors and redirects (see [SPA fallback](https://v2.nuxt.com/docs/concepts/static-site-generation#spa-fallback){rel="&#x22;nofollow&#x22;"})
- `$route.query` will always be equal to `{}` on server-side rendering
- `process.static` is `true`

We are also exposing `process.target` for modules author to add logic depending on the user target.

## Smarter `nuxt generate`

Now with `v2.14.0`, you can use `nuxt generate`, it will smartly know if it has to build or not.

### Crazy fast static applications

`nuxt generate` with `target: 'static'` will pre-render all your pages to HTML and save a payload file in order to mock `asyncData` and `fetch` on client-side navigation, this means **no** &#x2A;*more HTTP calls to your API on client-side navigation.** By extracting the page payload to a js file, **it also reduces the HTML size** served as well as preloading it (from the  in the header) for optimal performance.

We also improved the [smart prefetching](https://nuxt.com/blog/introducing-smart-prefetching) when doing full static, it will also fetch the payloads, making navigation instant 👀

### Crawler integrated

On top of that, it also has a crawler inside, detecting every relative link and generating it:

If you want to exclude a bunch of routes, use the [generate.exclude](https://v2.nuxt.com/docs/configuration-glossary/configuration-generate#exclude){rel="&#x22;nofollow&#x22;"}. You can keep using [generate.routes](https://v2.nuxt.com/docs/configuration-glossary/configuration-generate#routes){rel="&#x22;nofollow&#x22;"} to add extra routes that the crawler could not detect.

To disable the crawler, set `generate.crawler: false` in your `nuxt.config.js`

By separating `nuxt build` and `nuxt export`, we are opening a new range of improvements: pre-render your pages only if you content has changed, this means: no webpack build → faster re-deployments.

## Smarter `nuxt start`

Once you statically generated your Nuxt app into `dist/`, use `nuxt start` to start a production HTTP server and serve your static app, supporting [SPA Fallback](https://v2.nuxt.com/docs/concepts/static-site-generation#spa-fallback){rel="&#x22;nofollow&#x22;"}.

This command is perfect to locally test your static application before pushing to your favorite static hosting provider.

We do support live preview out of the box to keep calling your API:

It will automatically refresh the page data (calling `nuxtServerInit`, `asyncData` and `fetch`).

When the preview mode is activated, `asyncData` and `fetch` original methods will be called.

Depending of the `target`, you can run these commands.

- `nuxt dev`: Start the development server
  - `nuxt build`: Bundle your Nuxt application for production
  - `nuxt start`: Start the production server
- `static`

- `nuxt dev`: Start the development server (static aware)
  - `nuxt generate`: Bundle your Nuxt application for production if needed (static aware) and export your application to static HTML in `dist/` directory
  - `nuxt start`: Serve your production application from `dist/`

::read-more
---
target: _blank
to: https://v2.nuxt.com/tutorials/moving-from-nuxtjs-dotenv-to-runtime-config
---
Learn more about how to move from `@nuxtjs/dotenv` to runtime config.
::

**Examples:**

Example 1 (vue):
```vue
<script setup>
  import { ref, computed } from '#imports'

  const count = ref(1)
  const double = computed(() => count.value * 2)
</script>
```

---

## Zen Architects

**URL:** llms-txt#zen-architects

ZEN Architects provides Nuxt support by specialists with strengths in DevOps and OSS. Our team consists of top-notch experts in front-end technologies, with extensive experience developing with frameworks including Vue.js and Nuxt.js over years. We keep focusing on optimizing clients IT investment by providing the most efficient solution case by case.

ZEN Architects は DevOps や OSS に強みを持つスペシャリスト集団です。フロントエンド技術については、Vue.js や Nuxt.js などのフレームワークを使った開発経験が豊富で、チームには日本を代表するエキスパートも含まれています。ZEN Architects が提供する技術アドバイザリサービスでは、これまで数十社にのぼるエンタープライズ開発プロジェクトをサポートしてきました。私たちは日頃よりお客様のITへの投資を最適化することにフォーカスしており、ケースごとに最適な解決策を提供します。

---

## Local env files

**URL:** llms-txt#local-env-files

.env
.env.*
!.env.example
```

---

## Nuxt 3.6

**URL:** llms-txt#nuxt-3.6

**Contents:**
- ![SPA loading indicator](https://nuxt.com/assets/design-kit/icon-green.svg){height="36" style="display:inline" vAlign="center" width="36"}  SPA loading indicator
- ⚡️ Performance improvements
- 🔥 Fully static server components
- 🎨 Better style inlining
- 🎬 Animation controls
- ✨ Automatic 'static' preset detection
- 💪 Increased type safety
- ⚗️ Nitro 2.5 built-in
- 🛠️ New tools for module authors
- ✅ Upgrading

## ![SPA loading indicator](https://nuxt.com/assets/design-kit/icon-green.svg){height="36" style="display:inline" vAlign="center" width="36"}  SPA loading indicator

If your site is served with `ssr: false` or you have disabled server-rendering on some of your pages, you might be particularly interested in the new [built-in SPA loading indicator](https://github.com/nuxt/nuxt/pull/21640){rel="&#x22;nofollow&#x22;"}.

You can now place an HTML file in `~/app/spa-loading-template.html` with some HTML you would like to use to render a loading screen that will be rendered until your app is hydrated on these pages.

::note
In Nuxt v4 (or with `compatibilityMode: 4`), this path is now `~/spa-loading-template.html`.
::

👉 **By default an animated Nuxt icon is rendered**. You can completely disable this indicator by setting `spaLoadingTemplate: false` in your nuxt configuration file.

## ⚡️ Performance improvements

The first thing that happens when your app is hydrated is that your plugins run, and so we now perform [build-time optimisations on your plugins](https://github.com/nuxt/nuxt/pull/21611){rel="&#x22;nofollow&#x22;"}, meaning they do not need to be normalised or reordered at runtime.

We also include your error component JS in your main entrypoint, meaning that if an error occurs when a user has no connectivity, you can still handle it with your `~/error.vue`. (This also should decrease your total bundle size.)

👉 Compared to Nuxt 3.5.3, the minimal client bundle has decreased by \~0.7kB. Let's keep this up!

## 🔥 Fully static server components

It has been possible to use server components on static pages, but until now they would increase the payload size of your application. That is no longer true. We now store [rendered server components as separate files, which are preloaded before navigation](https://github.com/nuxt/nuxt/pull/21461){rel="&#x22;nofollow&#x22;"}.

👉 **This does rely on the new, richer JSON payload format**, so make sure you have not disabled this by setting `experimental.renderJsonPayloads` to false.

## 🎨 Better style inlining

If you're monitoring your metrics closely and have not turned off `experimental.inlineSSRStyles`, you should see more CSS inlined in your page, and a significantly external CSS file. We're now [better at deduplicating global CSS](https://github.com/nuxt/nuxt/pull/21573){rel="&#x22;nofollow&#x22;"}, particularly added by libraries like tailwind or unocss.

## 🎬 Animation controls

To give you more fine-grained control over your page/layout components, for example to create custom transitions with GSAP or other libraries, we now allow you to set [`pageRef` on `<NuxtPage>`](https://github.com/nuxt/nuxt/pull/19403){rel="&#x22;nofollow&#x22;"} and [`layoutRef` on `<NuxtLayout>`](https://github.com/nuxt/nuxt/pull/19465){rel="&#x22;nofollow&#x22;"}. These will get passed through to the underlying DOM elements.

## ✨ Automatic 'static' preset detection

Up to now, running `nuxt generate` produced the same output on every deployment provider, but with Nuxt 3.6 we now enable [static provider presets](https://github.com/nuxt/nuxt/pull/21655){rel="&#x22;nofollow&#x22;"} automatically. That means if you are deploying a static build (produced with `nuxt generate`) to a supported provider (currently vercel and netlify with cloudflare and github pages coming soon) we'll prerender your pages with special support for that provider.

This means we can configure any route rules (redirects/headers/etc) that do not require a server function. So you should get the best of both worlds when deploying a site that doesn't require runtime SSR. It also unblocks use of [Nuxt Image](https://github.com/nuxt/image){rel="&#x22;nofollow&#x22;"} on Vercel (with more potential for automatic provider integration coming soon).

## 💪 Increased type safety

We now have better support for server-specific `#imports` and augmentations if you are using the new `~/server/tsconfig.json` we shipped in Nuxt 3.5. So when importing from `#imports` in your server directory, you'll get IDE auto-completion for the right import locations in Nitro, and won't see Vue auto-imports like `useFetch` that are unavailable within your server routes.

You should now also have [type support for runtime Nitro hooks](https://github.com/nuxt/nuxt/pull/21666){rel="&#x22;nofollow&#x22;"}.

Finally, we have [removed more locations where objects had a default `any` type](https://github.com/nuxt/nuxt/pull/21700){rel="&#x22;nofollow&#x22;"}. This should improve type safety within Nuxt in a number of locations where unspecified types fell back to any:

- `RuntimeConfig`
- `PageMeta`
- `NuxtApp['payload']` (accessible now from `NuxtPayload` interface)
- `ModuleMeta`

You can find out more about how to [update your code](https://github.com/nuxt/nuxt/pull/21700){rel="&#x22;nofollow&#x22;"} if this affects you in the original PR.

## ⚗️ Nitro 2.5 built-in

This release ships with new Nitro 2.5, which has a [whole list of exciting improvements](https://github.com/unjs/nitro/releases/tag/v2.5.0){rel="&#x22;nofollow&#x22;"} that are worth checking out.

Of particular note is experimental support for streaming, which is also enabled by a [couple of changes](https://github.com/nuxt/nuxt/pull/21665){rel="&#x22;nofollow&#x22;"} in Nuxt itself.

## 🛠️ New tools for module authors

This release brings a number of utilities for modules authors to easily [add type templates](https://github.com/nuxt/nuxt/pull/21331){rel="&#x22;nofollow&#x22;"} and [assert compatibility](https://github.com/nuxt/nuxt/pull/21246){rel="&#x22;nofollow&#x22;"} with a given version of *another* module.

In addition, this release will finally unlock a new `nuxt/module-builder` mode that should improve type support for module authors. If you're a module author, you might consider following [these migration steps](https://github.com/nuxt/starter/pull/392){rel="&#x22;nofollow&#x22;"} to try it out in the coming days.

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

Read the full release notes on <https://github.com/nuxt/nuxt/releases/tag/v3.6.0>{rel="&#x22;nofollow&#x22;"}

**Examples:**

Example 1 (sh):
```sh
npx nuxi upgrade --force
```

---

## <NuxtErrorBoundary>

**URL:** llms-txt#<nuxterrorboundary>

**Contents:**
- Events
- Slots
- Examples
  - Accessing `error` and `clearError` in script

::tip
The `<NuxtErrorBoundary>` uses Vue's [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured){rel=""nofollow""} hook under the hood.
::

- `@error`: Event emitted when the default slot of the component throws an error.

- `#error`: Specify a fallback content to display in case of error.

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

### Accessing `error` and `clearError` in script

You can access `error` and `clearError` properties within the component's script as below:

**Examples:**

Example 1 (vue):
```vue
<template>
  <NuxtErrorBoundary @error="logSomeError">
    <!-- ... -->
  </NuxtErrorBoundary>
</template>
```

Example 2 (vue):
```vue
<template>
  <NuxtErrorBoundary>
    <!-- ... -->
    <template #error="{ error, clearError }">
      <p>An error occurred: {{ error }}</p>

      <button @click="clearError">
        Clear error
      </button>
    </template>
  </NuxtErrorBoundary>
</template>
```

Example 3 (vue):
```vue
<template>
  <NuxtErrorBoundary ref="errorBoundary">
    <!-- ... -->
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
const errorBoundary = useTemplateRef('errorBoundary')

// errorBoundary.value?.error
// errorBoundary.value?.clearError()
</script>
```

---

## Building an MCP Server for Nuxt

**URL:** llms-txt#building-an-mcp-server-for-nuxt

**Contents:**
- What is MCP and why did we build it?
  - Why MCP over RAG?
- Technical architecture
- Implementation deep dive
  - Module setup
  - Tools: Operations for AI models
  - Resources: Context for language models
  - Prompts: Reusable templates
  - Built-in helpers
  - Using Nuxt server utilities

AI assistants are becoming an increasingly important part of the developer experience. To help them provide accurate, up-to-date information about Nuxt, we built an MCP server that exposes our documentation, blog posts, and deployment guides in a structured way. Here's how we did it with the [Nuxt MCP Toolkit](https://mcp-toolkit.nuxt.dev){rel="&#x22;nofollow&#x22;"}, and how you can build your own.

::callout{icon="i-lucide-bot"}
Want to test the Nuxt MCP server? Jump to the [Nuxt MCP Server Documentation](https://nuxt.com/docs/guide/ai/mcp).
::

## What is MCP and why did we build it?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/){rel="&#x22;nofollow&#x22;"} is an open standard that enables AI assistants to securely access data and tools. Think of it as an API specifically designed for AI assistants: rather than returning HTML or generic JSON, it provides structured, semantic data that LLMs can easily understand and use.

MCP defines three main primitives:

- **Resources**: Allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information. Each resource is uniquely identified by a URI.
- **Tools**: Enable AI models to interact with external systems and perform operations (like searching or API calls)
- **Prompts**: Reusable prompt templates with arguments that can be invoked by users

### Why MCP over RAG?

We've observed that AI assistants using MCP servers provide **significantly better responses** than traditional RAG (Retrieval-Augmented Generation) approaches:

- **Structured data in, structured data out**: Tools accept well-defined parameters and return typed data that prevents hallucinations
- **Composable tools**: AI assistants can chain tools together, using the output of one tool as input for another (e.g., search for a topic, then fetch the full content)
- **Faster and more accurate**: No need to process and chunk large documents at query time
- **Always up-to-date**: Direct access to your content layer without reindexing
- **Context-aware navigation**: The AI can intelligently navigate relationships between content

Both [Nuxt](https://nuxt.com/mcp){rel="&#x22;nofollow&#x22;"} and [Nuxt UI](https://ui.nuxt.com/mcp){rel="&#x22;nofollow&#x22;"} now have MCP servers with similar architectures, making it easier for AI assistants to help developers with these frameworks.

## Technical architecture

Our MCP server is built directly into nuxt.com using the [Nuxt MCP Toolkit](https://mcp-toolkit.nuxt.dev){rel="&#x22;nofollow&#x22;"} module. The module provides automatic discovery of tools, resources, and prompts from your server directory:

The architecture is straightforward: you define your tools, resources, and prompts as individual files, and the module automatically registers them and exposes an HTTP endpoint for MCP clients to connect. No manual server setup, no transport configuration, just create files in the right directories and they're ready to use.

## Implementation deep dive

Getting started is as simple as adding the module to your Nuxt config:

That's it. The module will automatically scan your `server/mcp/` directory and register everything it finds.

### Tools: Operations for AI models

Tools enable language models to interact with external systems by accepting parameters and performing operations. Here's how we implemented our `list_documentation_pages` tool:

Notice a few key things:

- **`defineMcpTool`** is auto-imported, no need to import it manually
- **`inputSchema`** uses Zod for parameter validation
- **`cache: '1h'`** enables built-in response caching
- **`jsonResult()`** is a helper that formats the response correctly

The tool name is automatically derived from the filename (`list-documentation-pages.ts` becomes `list_documentation_pages`).

### Resources: Context for language models

Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information. Each resource is uniquely identified by a URI.

The simplest way to expose a file is using the `file` property, which automatically handles URI generation, MIME type detection, and file reading:

For dynamic resources, you can use a custom handler:

Unlike tools which are model-controlled, resources are application-driven, the host application determines how to incorporate them based on user needs, such as through UI elements for explicit selection or automatic context inclusion.

### Prompts: Reusable templates

Prompts are reusable templates with arguments that users can invoke. They return a conversation format that guides the AI through specific workflows:

Prompts differ from tools in that they are user-invoked and return conversation messages, while tools are model-controlled and return structured data.

The module provides several auto-imported helpers to simplify common patterns:

- **`defineMcpTool`*&#x2A;, &#x2A;*`defineMcpResource`*&#x2A;, &#x2A;*`defineMcpPrompt`**: Define your MCP primitives
- **`jsonResult(data)`**: Format a JSON response for tools
- **`errorResult(message)`**: Return an error response from tools

### Using Nuxt server utilities

To use Nuxt server utilities like `useEvent()` in your handlers, enable `asyncContext` in your Nuxt config:

Then you can access the H3 event and use Nuxt server composables like `queryCollection` from [Nuxt Content](https://content.nuxt.com){rel="&#x22;nofollow&#x22;"}.

## Building your own MCP server

Ready to build an MCP server for your own application? With the Nuxt MCP Toolkit, it takes just a few minutes.

### 1. Install the module

### 2. Configure the module

Add basic configuration to your Nuxt config:

### 3. Create your first tool

Create a file in `server/mcp/tools/`:

That's it! Your MCP server is now accessible at `https://your-domain.com/mcp`.

### 4. Add resources and prompts (optional)

You can also add resources and prompts following the same pattern:

For more advanced configuration options, check out the [Nuxt MCP Toolkit documentation](https://mcp-toolkit.nuxt.dev){rel="&#x22;nofollow&#x22;"}.

## Get started with the Nuxt MCP server

Ready to experience the power of MCP with Nuxt? Our server is already live and provides access to all Nuxt documentation, blog posts, and deployment guides.

### Quick install for Cursor

The easiest way to get started is with Cursor's one-click installation:

::u-button
---
color: neutral
icon: i-custom-cursor
label: Install Nuxt MCP Server in Cursor
to: cursor://anysphere.cursor-deeplink/mcp/install?name=nuxt&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbnV4dC5jb20vbWNwIn0%3D
---
::

### Other AI assistants

The Nuxt MCP server works with Claude Desktop, Windsurf, Visual Studio Code, ChatGPT, and many other MCP-compatible AI assistants. For complete setup instructions for all platforms, check out our [MCP documentation](https://nuxt.com/docs/guide/ai/mcp).

We encourage you to build MCP servers for your own applications. Whether it's documentation, API references, or domain-specific knowledge, MCP makes it easy for AI assistants to provide accurate, helpful information to your users.

The complete source code for our MCP server is available on [GitHub](https://github.com/nuxt/nuxt.com){rel="&#x22;nofollow&#x22;"} in the [`server/mcp/`](https://github.com/nuxt/nuxt.com/tree/main/server/mcp){rel="&#x22;nofollow&#x22;"} directory. Feel free to use it as inspiration for your own implementation!

**Examples:**

Example 1 (text):
```text
nuxt.com/
├── server/
│   └── mcp/
│       ├── tools/
│       │   ├── list-documentation-pages.ts
│       │   ├── get-documentation-page.ts
│       │   └── ...
│       ├── resources/
│       │   ├── nuxt-documentation-pages.ts
│       │   └── ...
│       └── prompts/
│           ├── find-documentation-for-topic.ts
│           └── ...
└── nuxt.config.ts
```

Example 2 (unknown):
```unknown
That's it. The module will automatically scan your `server/mcp/` directory and register everything it finds.

### Tools: Operations for AI models

Tools enable language models to interact with external systems by accepting parameters and performing operations. Here's how we implemented our `list_documentation_pages` tool:
```

Example 3 (unknown):
```unknown
Notice a few key things:

- **`defineMcpTool`** is auto-imported, no need to import it manually
- **`inputSchema`** uses Zod for parameter validation
- **`cache: '1h'`** enables built-in response caching
- **`jsonResult()`** is a helper that formats the response correctly

The tool name is automatically derived from the filename (`list-documentation-pages.ts` becomes `list_documentation_pages`).

### Resources: Context for language models

Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information. Each resource is uniquely identified by a URI.

The simplest way to expose a file is using the `file` property, which automatically handles URI generation, MIME type detection, and file reading:
```

Example 4 (unknown):
```unknown
For dynamic resources, you can use a custom handler:
```

---

## Introducing Nuxt 3 Beta

**URL:** llms-txt#introducing-nuxt-3-beta

**Contents:**
- A new foundation
- Important notes
- Timeline

We are excited to open source Nuxt 3 after more than a year of intense development. The repository is available on GitHub on [nuxt/nuxt](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} under the [MIT](https://github.com/nuxt/nuxt/blob/main/LICENSE){rel="&#x22;nofollow&#x22;"} license.

::tip
The documentation is available on <https://nuxt.com>{rel=""nofollow""}.
::

On top of supporting [Vue 3](https://vuejs.org){rel="&#x22;nofollow&#x22;"} or [Vite](https://vitejs.dev){rel="&#x22;nofollow&#x22;"}, Nuxt 3 contains a new [server engine](https://nuxt.com/docs/guide/concepts/server-engine){rel="&#x22;nofollow&#x22;"}, unlocking new full-stack capabilities to Nuxt server and beyond. It's the first JavaScript application server that is portable across a variety of modern cloud hosting providers.

In production, it builds your Vue application and server into one universal `.output` directory. This output is light: minified and without any other Node.js dependencies (except polyfills). You can deploy this output on any system supporting JavaScript, whether Node.js, Serverless, Workers, Edge-side rendering or purely static.

**Bonus:** this server engine can be used on existing Nuxt 2 projects with [Nuxt Bridge](https://nuxt.com/docs/getting-started/bridge){rel="&#x22;nofollow&#x22;"} 🚀

Head over the [Nuxt 3 homepage](https://nuxt.com){rel="&#x22;nofollow&#x22;"} to learn more about Nuxt Nitro and Nuxt Bridge.

Nuxt 3 is currently in beta, so expect things to break (and be fixed quickly). We have [plenty of work left](https://github.com/nuxt/nuxt/issues){rel="&#x22;nofollow&#x22;"} but we want to open it publicly to gather feedback and contributions from the community 💚

**Do not use it for production until we reach the first release candidate.**

During the beta, almost every commit will [trigger a new npm release](https://github.com/nuxt/nuxt/blob/main/.github/workflows/ci.yml#L111-L119){rel="&#x22;nofollow&#x22;"}; you may want to look at the [merged pull requests](https://github.com/nuxt/nuxt/pulls?q=is%3Apr+is%3Amerged){rel="&#x22;nofollow&#x22;"} until we begin generating automated changelogs in the documentation.

We are working every day to improve the documentation, explaining as much as possible all the concepts, features and usage of Nuxt 3.

Check out the community section of the Nuxt 3 website for [getting help](https://nuxt.com/docs/community/getting-help){rel="&#x22;nofollow&#x22;"}, [reporting bugs](https://nuxt.com/docs/community/reporting-bugs){rel="&#x22;nofollow&#x22;"} or [contributing to the framework](https://nuxt.com/docs/community/contribution){rel="&#x22;nofollow&#x22;"}.

Here some major milestones we've achieved on the way to Nuxt 3:

- **Jul 2, 2020**: Nuxt 3 first commit with full TypeScript rewrite
- **Aug 7, 2020**: Webpack 5 support
- **Sep 15, 2020**: [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages){rel="&#x22;nofollow&#x22;"} support
- **Oct 29, 2020**: [Vue 3](https://vuejs.org){rel="&#x22;nofollow&#x22;"} support with bundle-renderer
- **Nov 2, 2020**: [Nuxt Nitro](https://nuxt.com/guide/concepts/server-engine){rel="&#x22;nofollow&#x22;"} initial work
- **Jan 22, 2021**: Initial [Vite](https://vitejs.dev){rel="&#x22;nofollow&#x22;"} support
- **Feb 4, 2021**: Nuxt can deploy on [major serverless platforms](https://nuxt.com/docs/getting-started/deployment){rel="&#x22;nofollow&#x22;"}
- **Mar 6, 2021**: [UnJS](https://github.com/unjs){rel="&#x22;nofollow&#x22;"} organisation created on GitHub
- **Mar 28, 2021**: Init Nuxt Kit and Nuxt CLI ([nuxi](https://nuxt.com/docs/api/commands/add){rel="&#x22;nofollow&#x22;"})
- **May 20, 2021**: [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app){rel="&#x22;nofollow&#x22;"} support (`pages/` becomes optional)
- **Jun 30, 2021**: [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts){rel="&#x22;nofollow&#x22;"} support
- **Jul 15, 2021**: Native ESM support
- **Aug 10, 2021**: Auto import of composables and components
- **Sep 5, 2021**: Init [Nuxt Bridge](https://nuxt.com/docs/bridge/overview){rel="&#x22;nofollow&#x22;"} for improving Nuxt 2 experience
- **Sep 7, 2021**: Support Vite build for production
- **Oct 11, 2021**: Add [`useState`](https://nuxt.com/docs/getting-started/state-management){rel="&#x22;nofollow&#x22;"} and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch){rel="&#x22;nofollow&#x22;"} composables

So far, we've merged [385 pull requests](https://github.com/nuxt/nuxt/pulls?q=is%3Apr+is%3Amerged){rel="&#x22;nofollow&#x22;"}, closed [229 issues](https://github.com/nuxt/nuxt/issues?q=is%3Aissue+is%3Aclosed){rel="&#x22;nofollow&#x22;"} and made [925+ commits](https://github.com/nuxt/nuxt/commits/main){rel="&#x22;nofollow&#x22;"}.

We are excited to hear your thoughts and we thank you for your patience.

Now you can go over the [Nuxt 3 documentation](https://nuxt.com){rel="&#x22;nofollow&#x22;"} 😊

Don't forget to follow us on [Twitter](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"} to get the latest news about Nuxt!

---

## Module Extend Pages

**URL:** llms-txt#module-extend-pages

::read-more{to="https://nuxt.com/docs/guide/going-further/modules"}
::

::sandbox
---
branch: main
dir: examples/advanced/module-extend-pages
file: pages/index.vue
repo: nuxt/examples
---
::

---

## public

**URL:** llms-txt#public

Files contained within the `public/` directory are served at the root and are not modified by the build process. This is suitable for files that have to keep their names (e.g. `robots.txt`) *or* likely won't change (e.g. `favicon.ico`).

::tip{target="_blank" to="https://v2.nuxt.com/docs/directory-structure/static"}
This is known as the [`static/`] directory in Nuxt 2.
::

**Examples:**

Example 1 (unknown):
```unknown

```

---

## Code Style

**URL:** llms-txt#code-style

**Contents:**
- ESLint
- Quick Setup

The recommended approach for Nuxt is to enable ESLint support using the [`@nuxt/eslint`](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"} module, that will setup project-aware ESLint configuration for you.

::callout{icon="i-lucide-lightbulb"}
The module is designed for the [new ESLint flat config format](https://eslint.org/docs/latest/use/configure/configuration-files-new){rel=""nofollow""} which is the [default format since ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/){rel=""nofollow""}. If you are using the legacy `.eslintrc` config, you will need to [configure manually with `@nuxt/eslint-config`](https://eslint.nuxt.com/packages/config#legacy-config-format){rel=""nofollow""}. We highly recommend you to migrate over the flat config to be future-proof.
::

Start your Nuxt app, a `eslint.config.mjs` file will be generated under your project root. You can customize it as needed.

You can learn more about the module and customizations in [Nuxt ESLint's documentation](https://eslint.nuxt.com/packages/module){rel="&#x22;nofollow&#x22;"}.

**Examples:**

Example 1 (bash):
```bash
npx nuxt module add eslint
```

---

## updateAppConfig

**URL:** llms-txt#updateappconfig

**Contents:**
- Usage

::note
Updates the [`app.config`](https://nuxt.com/docs/3.x/directory-structure/app-config) using deep assignment. Existing (nested) properties will be preserved.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/app-config"}
::

**Examples:**

Example 1 (js):
```js
import { updateAppConfig, useAppConfig } from '#imports'

const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }
updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

---

## How to detect them

**URL:** llms-txt#how-to-detect-them

**Contents:**
- Development Console Warnings

## Development Console Warnings

Vue will log hydration mismatch warnings in the browser console during development:

![Screenshot of Vue hydration mismatch warning in the browser console](https://nuxt.com/assets/docs/best-practices/vue-console-hydration.png)

---

## reloadNuxtApp

**URL:** llms-txt#reloadnuxtapp

**Contents:**
- Type
  - `options` (optional)

::note
`reloadNuxtApp` will perform a hard reload of your app, re-requesting a page and its dependencies from the server.
::

By default, it will also save the current `state` of your app (that is, any state you could access with `useState`).

::read-more
---
icon: i-lucide-star
to: https://nuxt.com/docs/guide/going-further/experimental-features#restorestate
---
You can enable experimental restoration of this state by enabling the `experimental.restoreState` option in your `nuxt.config` file.
::

### `options` (optional)

**Type**: `ReloadNuxtAppOptions`

An object accepting the following properties:

**Default**: `window.location.pathname`

The path to reload (defaulting to the current path). If this is different from the current window location it
will trigger a navigation and add an entry in the browser history.

The number of milliseconds in which to ignore future reload requests. If called again within this time period,
`reloadNuxtApp` will not reload your app to avoid reload loops.

This option allows bypassing reload loop protection entirely, forcing a reload even if one has occurred within
the previously specified TTL.

- `persistState` (optional)

Whether to dump the current Nuxt state to sessionStorage (as `nuxt:reload:state`). By default this will have no
effect on reload unless `experimental.restoreState` is also set, or unless you handle restoring the state yourself.

---

## create nuxt

**URL:** llms-txt#create-nuxt

**Contents:**
- Arguments
- Options
- Environment variables

The `create-nuxt` command initializes a fresh Nuxt project using [unjs/giget](https://github.com/unjs/giget){rel="&#x22;nofollow&#x22;"}.

| Argument | Description       |
| -------- | ----------------- |
| `DIR=""` | Project directory |

| Option                             | Default | Description                                              |
| ---------------------------------- | ------- | -------------------------------------------------------- |
| `--cwd=<directory>`                | `.`     | Specify the working directory                            |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                             |
| `-t, --template`                   |         | Template name                                            |
| `-f, --force`                      |         | Override existing directory                              |
| `--offline`                        |         | Force offline mode                                       |
| `--preferOffline`                  |         | Prefer offline mode                                      |
| `--no-install`                     |         | Skip installing dependencies                             |
| `--gitInit`                        |         | Initialize git repository                                |
| `--shell`                          |         | Start shell after installation in project directory      |
| `--packageManager`                 |         | Package manager choice (npm, pnpm, yarn, bun)            |
| `-M, --modules`                    |         | Nuxt modules to install (comma separated without spaces) |
| `--no-modules`                     |         | Skip module installation prompt                          |
| `--nightly`                        |         | Use Nuxt nightly release channel (3x or latest)          |

## Environment variables

- `NUXI_INIT_REGISTRY`: Set to a custom template registry. ([learn more](https://github.com/unjs/giget#custom-registry){rel="&#x22;nofollow&#x22;"}).

- Default registry is loaded from [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates){rel="&#x22;nofollow&#x22;"}

---

## Nuxt 3.7

**URL:** llms-txt#nuxt-3.7

**Contents:**
  - 🐣 A New CLI
  - 🕸️ Native Web Streams and `Response`
  - 🔥 HTML Rendering Optimisations
  - 🛠️ Build Environment Shortcuts
  - ⚡️ Vite 4.4
  - 💪 TypeScript Updates
  - 🦄 Async Context support
  - 👓 Watcher Updates
  - ⚗️ Nitro 2.6
- ✅ Upgrading

We've refactored `nuxi` using [unjs/citty](http://github.com/unjs/citty){rel="&#x22;nofollow&#x22;"} and this marks the first Nuxt release that depends on the new version, safely in its own repository. We have grand plans for this - check out some of the features + roadmap discussions in [nuxt/cli](https://github.com/nuxt/cli){rel="&#x22;nofollow&#x22;"} and please feel free to contribute!

- [**Project Goals**](https://github.com/nuxt/cli/discussions/3)
- [Feedbacks and Ideas](https://github.com/nuxt/cli/discussions/4)
- [The journey of Nuxt CLI Generations](https://github.com/nuxt/cli/discussions/7)

Nuxi is now decoupled from the main `nuxt` version - we plan to iterate and release nuxi more quickly in future so you can expect new things coming soon!

### 🕸️ Native Web Streams and `Response`

With improvements in [unjs/h3](https://github.com/unjs/h3){rel="&#x22;nofollow&#x22;"} and [unjs/nitro](https://github.com/unjs/nitro){rel="&#x22;nofollow&#x22;"}, it's now possible to directly return a `Response` object from server routes, meaning it's *also* possible to return and handle streams natively in Nuxt.

👉 Check out the full detail in the [unjs/h3](https://github.com/unjs/h3/releases){rel="&#x22;nofollow&#x22;"} and [unjs/nitro](https://github.com/unjs/nitro/releases){rel="&#x22;nofollow&#x22;"} release notes.

### 🔥 HTML Rendering Optimisations

This release comes with a couple of improvements in rendering HTML responses from the server. We now determine whether to preload/prefetch resources at build time (so you can customise this in the `build:manifest` hook). We also now manage rendering the HTML for them directly in `unhead` ([#22179](https://github.com/nuxt/nuxt/pull/22179){rel="&#x22;nofollow&#x22;"}), which means you can configure the *order* for `<link>`, `<meta>`, `<script>`, `<style>`, and more. And - in our preliminary testing - it's even faster!

It's possible to opt-in to upcoming head improvements with the `experimental.headNext` flag. This currently includes a new ordering algorithm based on [capo.js](https://github.com/rviscomi/capo.js){rel="&#x22;nofollow&#x22;"} ([#22431](https://github.com/nuxt/nuxt/pull/22431){rel="&#x22;nofollow&#x22;"}) and allows enabling future optimisations as they are released in `unhead`:

We'd love your thoughts - you can respond with any issues/feedback in [this discussion](https://github.com/nuxt/nuxt/discussions/22632){rel="&#x22;nofollow&#x22;"}.

### 🛠️ Build Environment Shortcuts

In your Nuxt config you can now use `$client` and `$server` shortcuts to easily define configuration that is specific to just the Vite client/server ([#22302](https://github.com/nuxt/nuxt/pull/22302){rel="&#x22;nofollow&#x22;"}) or webpack client/server ([#22304](https://github.com/nuxt/nuxt/pull/22304){rel="&#x22;nofollow&#x22;"}) builds. This previously was only possible with the `vite:extendConfig` and `webpack:config` hooks.

We've chosen to unpin Vite from minor versions, meaning whenever Vite releases a new feature version you can opt-in straight away. Vite 4.4 brings a lot of exciting things, including experimental Lightning CSS support - and much more!

👉 Check out the [Vite release notes](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#440-2023-07-06){rel="&#x22;nofollow&#x22;"} for more.

### 💪 TypeScript Updates

We now use purely relative paths in the generated `tsconfig.json` instead of setting a `baseUrl`. This means better support for dev environments like docker images where the absolute path may not match your IDE ([#22410](https://github.com/nuxt/nuxt/pull/22410){rel="&#x22;nofollow&#x22;"}).

We also set a couple of additional compiler flag defaults to match Vite/TS recommendations ([#22468](https://github.com/nuxt/nuxt/pull/22468){rel="&#x22;nofollow&#x22;"}).

Plus, you should now get type hinted access to layouts in `setPageLayout` and also in `<NuxtLayout name>` ([#22363](https://github.com/nuxt/nuxt/pull/22362){rel="&#x22;nofollow&#x22;"}).

### 🦄 Async Context support

If you've ever got an issue with 'Nuxt context unavailable' this might be one for you. We now support native async context for Bun and Node under an experimental flag, in both Nuxt and Nitro ([#20918](https://github.com/nuxt/nuxt/pull/20918){rel="&#x22;nofollow&#x22;"}).

This enables using Nuxt composables on the server *without* needing to ensure they are being called directly in a setup function. It also allows the same in Nitro, with a new `useEvent()` utility that is usable in server routes.

To try it out, you can enable `experimental.asyncContext`:

### 👓 Watcher Updates

We've fixed a couple of issues with watchers, meaning that you should need to restart your server less often - and you should see a significant performance increase if you are using layers.

There lots more exciting features coming directly from Nitro 2.6, including smaller, lighter servers and new persistent data storage in a `.data` directory.

👉 Read more in [the full release article](https://unjs.io/blog/2023-08-25-nitro-2.6){rel="&#x22;nofollow&#x22;"}.

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the [unjs](https://github.com/unjs){rel="&#x22;nofollow&#x22;"} ecosystem.

Read the full release notes on <https://github.com/nuxt/nuxt/releases/tag/v3.7.0>{rel="&#x22;nofollow&#x22;"}

**Examples:**

Example 1 (ts):
```ts
export default defineNuxtConfig({
  experimental: {
    headNext: true
  }
})
```

Example 2 (ts):
```ts
export default defineNuxtConfig({
  vite: {
    $client: {
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: '_nuxt/[hash].js',
            assetFileNames: '_nuxt/[hash][extname]',
            entryFileNames: '_nuxt/[hash].js'
          }
        }
      }
    }
  }
})
```

Example 3 (ts):
```ts
export default defineNuxtConfig({
  experimental: {
    asyncContext: true
  }
})
```

Example 4 (sh):
```sh
npx nuxi upgrade --force
```

---

## Passionate People

**URL:** llms-txt#passionate-people

Passionate People provide you with additional technical capacity to power-up your digital transformation journeys with our teams of first-class engineers and consultants.

Full stack JavaScript Cloud Engineers ready to work with you and your teams.

---

## ignore layout foo.vue

**URL:** llms-txt#ignore-layout-foo.vue

---

## Runtime config values are automatically replaced by matching environment variables at runtime

**URL:** llms-txt#runtime-config-values-are-automatically-replaced-by-matching-environment-variables-at-runtime

NUXT_API_SECRET=api_secret_token
NUXT_PUBLIC_API_BASE=https://nuxtjs.org
```
::

---

## Nuxt and hydration

**URL:** llms-txt#nuxt-and-hydration

When developing, you may face hydration issues. Don't ignore those warnings.

---

## Nuxt 3.12

**URL:** llms-txt#nuxt-3.12

**Contents:**
- 🚀 Testing Nuxt 4 changes
- 📜 Nuxt Scripts auto-install
- 🌈 Layer auto-registration and bugfixes
- 🌐 Built-in accessibility improvements
- 🔥 Performance improvements
- 👨‍👩‍👧‍👦 Multi-app support
- ⛑️ DX wins
- 🪨 Stabilising features
- 💪 Type improvements
- 📦 Module author/power user improvements

We're on the road to the release of Nuxt 4, but we've not held back in Nuxt v3.12.

## 🚀 Testing Nuxt 4 changes

Nuxt 4 is on the horizon, and it's now possible to test out the behaviour changes that will be coming in the next major release ([#26925](https://github.com/nuxt/nuxt/pull/26925){rel="&#x22;nofollow&#x22;"}) by setting an option in your `nuxt.config.ts` file:

As we've been merging PRs for Nuxt 4, we've been enabling them behind this flag. As much as possible we're aiming for backwards compatibility - our test matrix is running the same fixtures in both v3 and v4 compatibility mode.

There is a lot to say here, with 10+ different PRs and behaviour changes documented and testable, but for full details, including migration steps, see [the v4 upgrade documentation](https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4).

We'd be very grateful for early testing of what's coming in Nuxt 4! 🙏

## 📜 Nuxt Scripts auto-install

We've been gradually working to release [Nuxt Scripts](https://scripts.nuxt.com/){rel="&#x22;nofollow&#x22;"}. It's currently in public preview, but we're near a public release, so we've added some stubs for composables that (when used) will prompt installing the `@nuxt/scripts` module.

👉 Watch out for the launch - and an article explaining more!

## 🌈 Layer auto-registration and bugfixes

Just like `~/modules`, any layers within your project in the `~/layers` directory will now be automatically registered as layers in your project ([#27221](https://github.com/nuxt/nuxt/pull/27221){rel="&#x22;nofollow&#x22;"}).

We also now correctly load layer dependencies, which should resolve a range of issues with monorepos and git installations ([#27338](https://github.com/nuxt/nuxt/pull/27338){rel="&#x22;nofollow&#x22;"}).

## 🌐 Built-in accessibility improvements

We now have a built-in [`<NuxtRouteAnnouncer>`](https://nuxt.com/docs/api/components/nuxt-route-announcer) component and corresponding [`useRouteAnnouncer`](https://nuxt.com/docs/api/composables/use-route-announcer) composable, which will be added by default to new Nuxt templates going forward.

For full details, see [the original PR (#25741)](https://github.com/nuxt/nuxt/pull/25741){rel="&#x22;nofollow&#x22;"} and [documentation](https://nuxt.com/docs/api/components/nuxt-route-announcer).

We're continuing to work on `nuxt/a11y` - expect to hear more on that in future!

## 🔥 Performance improvements

We've landed some performance improvements as well, many of which are behind the `compatibilityVersion: 4` flag, such as a move away from deeply reactive asyncData payloads.

Significant improvements include deduplicating modules ([#27475](https://github.com/nuxt/nuxt/pull/27475){rel="&#x22;nofollow&#x22;"}) - which will apply mostly to layer users who specify modules in their layers. In one project, we saw 30s+ improvement in starting Nuxt.

We've also improved Vite dev server start up time by excluding common ESM dependencies from pre-bundling, and would suggest module authors consider doing the same ([#27372](https://github.com/nuxt/nuxt/pull/27372){rel="&#x22;nofollow&#x22;"}).

We improved chunk determinism, so sequential builds should be less likely to have *completely* different chunk hashes ([#27258](https://github.com/nuxt/nuxt/pull/27258){rel="&#x22;nofollow&#x22;"}).

And we tree shake more client-only composables from your server builds ([#27044](https://github.com/nuxt/nuxt/pull/27044){rel="&#x22;nofollow&#x22;"}), and have reduced the size of server component payloads ([#26863](https://github.com/nuxt/nuxt/pull/26863){rel="&#x22;nofollow&#x22;"}).

## 👨‍👩‍👧‍👦 Multi-app support

We've landed a couple of changes that take us toward a place of supporting multi-app natively in Nuxt, including a `multiApp` experimental flag ([#27291](https://github.com/nuxt/nuxt/pull/27291){rel="&#x22;nofollow&#x22;"}) and the ability to have multiple Nuxt app instances running in parallel at runtime ([#27068](https://github.com/nuxt/nuxt/pull/27068){rel="&#x22;nofollow&#x22;"}).

While it's not yet ready, please do follow along on [the tracker issue](https://github.com/nuxt/nuxt/issues/21635){rel="&#x22;nofollow&#x22;"}, and feel free to pitch in if this is interesting to you.

We now serialise more things in your dev server logs, including VNodes ([#27309](https://github.com/nuxt/nuxt/pull/27309){rel="&#x22;nofollow&#x22;"}) and [URLs](https://github.com/nuxt/nuxt/commit/a549b46e9){rel="&#x22;nofollow&#x22;"}. We also addressed a bug that could lead to a frozen dev server.

When accessing private runtime config in the browser, we now let you know with a more informative error message ([#26441](https://github.com/nuxt/nuxt/pull/26441){rel="&#x22;nofollow&#x22;"}).

## 🪨 Stabilising features

We've removed some experimental options that have been stabilised and which we feel no longer need to be configurable:

- `experimental.treeshakeClientOnly` (enabled by default since v3.0.0)
- `experimental.configSchema` (enabled by default since v3.3.0)
- `experimental.polyfillVueUseHead` (disabled since v3.4.0) - implementable in user-land with [plugin](https://github.com/nuxt/nuxt/blob/f209158352b09d1986aa320e29ff36353b91c358/packages/nuxt/src/head/runtime/plugins/vueuse-head-polyfill.ts#L10-L11){rel="&#x22;nofollow&#x22;"}
- `experimental.respectNoSSRHeader` (disabled since v3.4.0) - implementable in user-land with [server middleware](https://github.com/nuxt/nuxt/blob/c660b39447f0d5b8790c0826092638d321cd6821/packages/nuxt/src/core/runtime/nitro/no-ssr.ts#L8-L9){rel="&#x22;nofollow&#x22;"}

We've also enabled `scanPageMeta` by default ([#27134](https://github.com/nuxt/nuxt/pull/27134){rel="&#x22;nofollow&#x22;"}). This pulls out any page metadata in your `definePageMeta` macro, and makes it available to modules (like `@nuxtjs/i18n`) so they can augment it.

This unlocks much better module/typed routing integration, but has a potential performance cost - so please file an issue if you experience any problems.

## 💪 Type improvements

We now have support for typed `#fallback` slots in server components ([#27097](https://github.com/nuxt/nuxt/pull/27097){rel="&#x22;nofollow&#x22;"}).

We've also improved some defaults in your generated `tsconfig.json`, including setting `module: 'preserve'` if you have a locally installed TypeScript v5.4 version ([see docs](https://www.typescriptlang.org/tsconfig/#preserve){rel="&#x22;nofollow&#x22;"}) - see [#26667](https://github.com/nuxt/nuxt/pull/26667){rel="&#x22;nofollow&#x22;"}, [#27485](https://github.com/nuxt/nuxt/pull/27485){rel="&#x22;nofollow&#x22;"}.

## 📦 Module author/power user improvements

We have shipped a range of type improvements for module authors, including:

- support for typed module options in `installModule` ([#26744](https://github.com/nuxt/nuxt/pull/26744){rel="&#x22;nofollow&#x22;"})
- the option to specify compatibility with certain builders (vite/webpack) in module options ([#27022](https://github.com/nuxt/nuxt/pull/27022){rel="&#x22;nofollow&#x22;"})
- a new `onPrehydrate` hook for hooking into the browser hydration cycle ([#27037](https://github.com/nuxt/nuxt/pull/27037){rel="&#x22;nofollow&#x22;"})
- the ability to access and update *resolved* runtime configuration within modules, with new build-time `useRuntimeConfig` and `updateRuntimeConfig` utils ([#27117](https://github.com/nuxt/nuxt/pull/27117){rel="&#x22;nofollow&#x22;"})

## 🎨 Inlined UI templates

If you previously used `@nuxt/ui-templates` then it may be worth knowing that we have moved them from [a separate repository](https://github.com/nuxt/ui-templates){rel="&#x22;nofollow&#x22;"} into the [nuxt/nuxt](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} monorepo. (This is purely a refactor rather than a change, although you can expect some new designs for Nuxt v4.)

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## Full Release Notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.12.0
---
Read the full release notes of Nuxt `v3.12.0`.
::

A huge thank you to the 75+ Nuxt contributors and community members who have been part of this release. ❤️

Finally, thank you for reading this far! We hope you enjoy v3.12, and please do let us know if you have any feedback or issues. 🙏

**Examples:**

Example 1 (unknown):
```unknown
As we've been merging PRs for Nuxt 4, we've been enabling them behind this flag. As much as possible we're aiming for backwards compatibility - our test matrix is running the same fixtures in both v3 and v4 compatibility mode.

There is a lot to say here, with 10+ different PRs and behaviour changes documented and testable, but for full details, including migration steps, see [the v4 upgrade documentation](https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4).

We'd be very grateful for early testing of what's coming in Nuxt 4! 🙏

## 📜 Nuxt Scripts auto-install

We've been gradually working to release [Nuxt Scripts](https://scripts.nuxt.com/){rel="&#x22;nofollow&#x22;"}. It's currently in public preview, but we're near a public release, so we've added some stubs for composables that (when used) will prompt installing the `@nuxt/scripts` module.

👉 Watch out for the launch - and an article explaining more!

## 🌈 Layer auto-registration and bugfixes

Just like `~/modules`, any layers within your project in the `~/layers` directory will now be automatically registered as layers in your project ([#27221](https://github.com/nuxt/nuxt/pull/27221){rel="&#x22;nofollow&#x22;"}).

We also now correctly load layer dependencies, which should resolve a range of issues with monorepos and git installations ([#27338](https://github.com/nuxt/nuxt/pull/27338){rel="&#x22;nofollow&#x22;"}).

## 🌐 Built-in accessibility improvements

We now have a built-in [`<NuxtRouteAnnouncer>`](https://nuxt.com/docs/api/components/nuxt-route-announcer) component and corresponding [`useRouteAnnouncer`](https://nuxt.com/docs/api/composables/use-route-announcer) composable, which will be added by default to new Nuxt templates going forward.

For full details, see [the original PR (#25741)](https://github.com/nuxt/nuxt/pull/25741){rel="&#x22;nofollow&#x22;"} and [documentation](https://nuxt.com/docs/api/components/nuxt-route-announcer).

We're continuing to work on `nuxt/a11y` - expect to hear more on that in future!

## 🔥 Performance improvements

We've landed some performance improvements as well, many of which are behind the `compatibilityVersion: 4` flag, such as a move away from deeply reactive asyncData payloads.

Significant improvements include deduplicating modules ([#27475](https://github.com/nuxt/nuxt/pull/27475){rel="&#x22;nofollow&#x22;"}) - which will apply mostly to layer users who specify modules in their layers. In one project, we saw 30s+ improvement in starting Nuxt.

We've also improved Vite dev server start up time by excluding common ESM dependencies from pre-bundling, and would suggest module authors consider doing the same ([#27372](https://github.com/nuxt/nuxt/pull/27372){rel="&#x22;nofollow&#x22;"}).

We improved chunk determinism, so sequential builds should be less likely to have *completely* different chunk hashes ([#27258](https://github.com/nuxt/nuxt/pull/27258){rel="&#x22;nofollow&#x22;"}).

And we tree shake more client-only composables from your server builds ([#27044](https://github.com/nuxt/nuxt/pull/27044){rel="&#x22;nofollow&#x22;"}), and have reduced the size of server component payloads ([#26863](https://github.com/nuxt/nuxt/pull/26863){rel="&#x22;nofollow&#x22;"}).

## 👨‍👩‍👧‍👦 Multi-app support

We've landed a couple of changes that take us toward a place of supporting multi-app natively in Nuxt, including a `multiApp` experimental flag ([#27291](https://github.com/nuxt/nuxt/pull/27291){rel="&#x22;nofollow&#x22;"}) and the ability to have multiple Nuxt app instances running in parallel at runtime ([#27068](https://github.com/nuxt/nuxt/pull/27068){rel="&#x22;nofollow&#x22;"}).

While it's not yet ready, please do follow along on [the tracker issue](https://github.com/nuxt/nuxt/issues/21635){rel="&#x22;nofollow&#x22;"}, and feel free to pitch in if this is interesting to you.

## ⛑️ DX wins

We now serialise more things in your dev server logs, including VNodes ([#27309](https://github.com/nuxt/nuxt/pull/27309){rel="&#x22;nofollow&#x22;"}) and [URLs](https://github.com/nuxt/nuxt/commit/a549b46e9){rel="&#x22;nofollow&#x22;"}. We also addressed a bug that could lead to a frozen dev server.

When accessing private runtime config in the browser, we now let you know with a more informative error message ([#26441](https://github.com/nuxt/nuxt/pull/26441){rel="&#x22;nofollow&#x22;"}).

## 🪨 Stabilising features

We've removed some experimental options that have been stabilised and which we feel no longer need to be configurable:

- `experimental.treeshakeClientOnly` (enabled by default since v3.0.0)
- `experimental.configSchema` (enabled by default since v3.3.0)
- `experimental.polyfillVueUseHead` (disabled since v3.4.0) - implementable in user-land with [plugin](https://github.com/nuxt/nuxt/blob/f209158352b09d1986aa320e29ff36353b91c358/packages/nuxt/src/head/runtime/plugins/vueuse-head-polyfill.ts#L10-L11){rel="&#x22;nofollow&#x22;"}
- `experimental.respectNoSSRHeader` (disabled since v3.4.0) - implementable in user-land with [server middleware](https://github.com/nuxt/nuxt/blob/c660b39447f0d5b8790c0826092638d321cd6821/packages/nuxt/src/core/runtime/nitro/no-ssr.ts#L8-L9){rel="&#x22;nofollow&#x22;"}

We've also enabled `scanPageMeta` by default ([#27134](https://github.com/nuxt/nuxt/pull/27134){rel="&#x22;nofollow&#x22;"}). This pulls out any page metadata in your `definePageMeta` macro, and makes it available to modules (like `@nuxtjs/i18n`) so they can augment it.

This unlocks much better module/typed routing integration, but has a potential performance cost - so please file an issue if you experience any problems.

## 💪 Type improvements

We now have support for typed `#fallback` slots in server components ([#27097](https://github.com/nuxt/nuxt/pull/27097){rel="&#x22;nofollow&#x22;"}).

We've also improved some defaults in your generated `tsconfig.json`, including setting `module: 'preserve'` if you have a locally installed TypeScript v5.4 version ([see docs](https://www.typescriptlang.org/tsconfig/#preserve){rel="&#x22;nofollow&#x22;"}) - see [#26667](https://github.com/nuxt/nuxt/pull/26667){rel="&#x22;nofollow&#x22;"}, [#27485](https://github.com/nuxt/nuxt/pull/27485){rel="&#x22;nofollow&#x22;"}.

## 📦 Module author/power user improvements

We have shipped a range of type improvements for module authors, including:

- support for typed module options in `installModule` ([#26744](https://github.com/nuxt/nuxt/pull/26744){rel="&#x22;nofollow&#x22;"})
- the option to specify compatibility with certain builders (vite/webpack) in module options ([#27022](https://github.com/nuxt/nuxt/pull/27022){rel="&#x22;nofollow&#x22;"})
- a new `onPrehydrate` hook for hooking into the browser hydration cycle ([#27037](https://github.com/nuxt/nuxt/pull/27037){rel="&#x22;nofollow&#x22;"})
- the ability to access and update *resolved* runtime configuration within modules, with new build-time `useRuntimeConfig` and `updateRuntimeConfig` utils ([#27117](https://github.com/nuxt/nuxt/pull/27117){rel="&#x22;nofollow&#x22;"})

## 🎨 Inlined UI templates

If you previously used `@nuxt/ui-templates` then it may be worth knowing that we have moved them from [a separate repository](https://github.com/nuxt/ui-templates){rel="&#x22;nofollow&#x22;"} into the [nuxt/nuxt](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} monorepo. (This is purely a refactor rather than a change, although you can expect some new designs for Nuxt v4.)

## ✅ Upgrading

As usual, our recommendation for upgrading is to run:
```

---

## Magic as a Service

**URL:** llms-txt#magic-as-a-service

**Contents:**
  - **Nuxt Development by Magic as a Servic**
  - Our Capabilities

### **Nuxt Development by Magic as a Servic**

With deep expertise in Nuxt and Vue, we build seamless, scalable applications that combine technical precision, elegant design, and intuitive user experiences. From lean MVPs to large-scale digital platforms, we develop ambitious products that solve real problems—with a focus on seamless performance, elegant design, and user-first experiences.

Our work with Maison Margiela, Jil Sander, and SSENSE showcases our ability to craft fast, accessible, and future-proof digital platforms. From custom UI components to SSR and ISR optimisations, we ensure every application is built for beauty, accessibility and performance.

We design and build complete digital products—combining design, engineering, and technical strategy in one team. Whether it's a design system, an e-commerce platform, or a complex interactive experience, we create solutions that are both technically robust and visually compelling. Our process covers everything from discovery and definition to design, development, and deployment.

Using Nuxt as a stable and flexible framework, we create applications that are efficient, scalable, and easy to maintain. Learn more about how we work with Nuxt at [maas.engineering/nuxt](https://maas.engineering/nuxt){rel="&#x22;nofollow&#x22;"}.

---

## nuxt prepare

**URL:** llms-txt#nuxt-prepare

**Contents:**
- Arguments
- Options

The `prepare` command creates a [`.nuxt`](https://nuxt.com/docs/3.x/directory-structure/nuxt) directory in your application and generates types. This can be useful in a CI environment or as a `postinstall` command in your [`package.json`](https://nuxt.com/docs/3.x/directory-structure/package).

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default | Description                                                                                                                                          |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--dotenv`                         |         | Path to `.env` file to load, relative to the root directory                                                                                          |
| `--cwd=<directory>`                |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)                                                                     |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                                                                                                                         |
| `--envName`                        |         | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server) |
| `-e, --extends=<layer-name>`       |         | Extend from a Nuxt layer                                                                                                                             |

::note
This command sets `process.env.NODE_ENV` to `production`.
::

---

## Render

**URL:** llms-txt#render

**Contents:**
- Set up application
- More options

Nuxt supports deploying on [Render](https://render.com/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

## Set up application

1. [Create a new Web Service](https://dashboard.render.com/select-repo?type=web){rel="&#x22;nofollow&#x22;"} and select the repository that contains your code.
2. Ensure the 'Node' environment is selected.
3. Depending on your package manager, set the build command to `yarn && yarn build`, `npm install && npm run build`, or `pnpm i --shamefully-hoist && pnpm build`.
4. Update the start command to `node .output/server/index.mjs`
5. Click 'Advanced' and add the following environment variables

6. Click on `Create Web Service`.

::read-more{target="_blank" to="https://nitro.unjs.io/deploy/providers/render"}
Head over **Nitro documentation** to learn more about the Render deployment presets.
::

**Examples:**

Example 1 (bash):
```bash
SERVER_PRESET=render_com
   NODE_VERSION=20
```

---

## To use the Bun runtime during development

**URL:** llms-txt#to-use-the-bun-runtime-during-development

---

## Nuxt Lifecycle

**URL:** llms-txt#nuxt-lifecycle

**Contents:**
- Server
  - Step 1: Setup Nitro Server and Nitro Plugins (Once)
  - Step 2: Nitro Server Middleware
  - Step 3: Initialize Nuxt and Execute Nuxt App Plugins
  - Step 4: Route Validation
  - Step 5: Execute Nuxt App Middleware
  - Step 6: Render Page and Components
  - Step 7: Generate HTML Output
- Client (browser)
  - Step 1: Initialize Nuxt and Execute Nuxt App Plugins

The goal of this chapter is to provide a high-level overview of the different parts of the framework, their execution order, and how they work together.

On the server, the following steps are executed for every initial request to your application:

### Step 1: Setup Nitro Server and Nitro Plugins (Once)

Nuxt is powered by [Nitro](https://nitro.build/){rel="&#x22;nofollow&#x22;"}, a modern server engine.

When Nitro starts, it initializes and executes the plugins under the `/server/plugins` directory. These plugins can:

- Capture and handle application-wide errors.
- Register hooks that execute when Nitro shuts down.
- Register hooks for request lifecycle events, such as modifying responses.

::callout{icon="i-lucide-lightbulb"}
Nitro plugins are executed only once when the server starts. In a serverless environment, the server boots on each incoming request, and so do the Nitro plugins. However, they are not awaited.
::

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/server#server-plugins
---
::

### Step 2: Nitro Server Middleware

After initializing the Nitro server, middleware under `server/middleware/` is executed for every request. Middleware can be used for tasks such as authentication, logging, or request transformation.

::warning
Returning a value from middleware will terminate the request and send the returned value as the response. This behavior should generally be avoided to ensure proper request handling!
::

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/server#server-middleware
---
::

### Step 3: Initialize Nuxt and Execute Nuxt App Plugins

The Vue and Nuxt instances are created first. Afterward, Nuxt executes its server plugins. This includes:

- Built-in plugins, such as Vue Router and `unhead`.
- Custom plugins located in the `plugins/` directory, including those without a suffix (e.g., `myPlugin.ts`) and those with the `.server` suffix (e.g., `myServerPlugin.server.ts`).

Plugins execute in a specific order and may have dependencies on one another. For more details, including execution order and parallelism, refer to the [Plugins documentation](https://nuxt.com/docs/3.x/directory-structure/plugins).

::callout{icon="i-lucide-lightbulb"}
After this step, Nuxt calls the [`app:created`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) hook, which can be used to execute additional logic.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

### Step 4: Route Validation

After initializing plugins and before executing middleware, Nuxt calls the `validate` method if it is defined in the `definePageMeta` function. The `validate` method, which can be synchronous or asynchronous, is often used to validate dynamic route parameters.

- The `validate` function should return `true` if the parameters are valid.
- If validation fails, it should return `false` or an object containing a `statusCode` and/or `statusMessage` to terminate the request.

For more information, see the [Route Validation documentation](https://nuxt.com/docs/3.x/getting-started/routing#route-validation).

::read-more{to="https://nuxt.com/docs/getting-started/routing#route-validation"}
::

### Step 5: Execute Nuxt App Middleware

Middleware allows you to run code before navigating to a particular route. It is often used for tasks such as authentication, redirection, or logging.

In Nuxt, there are three types of middleware:

- **Global route middleware**
- **Named route middleware**
- **Anonymous (or inline) route middleware**

Nuxt executes all global middleware on the initial page load (both on server and client) and then again before any client-side navigation. Named and anonymous middleware are executed only on the routes specified in the middleware property of the page(route) meta defined in the corresponding page components.

For details about each type and examples, see the [Middleware documentation](https://nuxt.com/docs/3.x/directory-structure/middleware).

Any redirection on the server will result in a `Location:` header being sent to the browser; the browser then makes a fresh request to this new location. All application state will be reset when this happens, unless persisted in a cookie.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

### Step 6: Render Page and Components

Nuxt renders the page and its components and fetches any required data with `useFetch` and `useAsyncData` during this step. Since there are no dynamic updates and no DOM operations occur on the server, Vue lifecycle hooks such as `onBeforeMount`, `onMounted`, and subsequent hooks are **NOT** executed during SSR.

By default, Vue pauses dependency tracking during SSR for better performance.

::callout{icon="i-lucide-lightbulb"}
There is no reactivity on the server side because Vue SSR renders the app top-down as static HTML, making it impossible to go back and modify content that has already been rendered.
::

::important
You should avoid code that produces side effects that need cleanup in root scope of `<script setup>`. An example of such side effects is setting up timers with `setInterval`. In client-side only code we may setup a timer and then tear it down in `onBeforeUnmount` or `onUnmounted`. However, because the unmount hooks will never be called during SSR, the timers will stay around forever. To avoid this, move your side-effect code into `onMounted` instead.
::

::tip{icon="i-lucide-video" target="_blank" to="https://youtu.be/dZSNW07sO-A"}
Watch a video from Daniel Roe explaining Server Rendering and Global State.
::

### Step 7: Generate HTML Output

After all required data is fetched and the components are rendered, Nuxt combines the rendered components with settings from `unhead` to generate a complete HTML document. This HTML, along with the associated data, is then sent back to the client to complete the SSR process.

::callout{icon="i-lucide-lightbulb"}
After rendering the Vue application to HTML, Nuxt calls the [`app:rendered`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) hook.
::

::callout{icon="i-lucide-lightbulb"}
Before finalizing and sending the HTML, Nitro will call the [`render:html`](https://nuxt.com/docs/3.x/api/advanced/hooks#nitro-app-hooks-runtime-server-side) hook. This hook allows you to manipulate the generated HTML, such as injecting additional scripts or modifying meta tags.
::

This part of the lifecycle is fully executed in the browser, no matter which Nuxt mode you've chosen.

### Step 1: Initialize Nuxt and Execute Nuxt App Plugins

This step is similar to the server-side execution and includes both built-in and custom plugins.

Custom plugins in the `plugins/` directory, such as those without a suffix (e.g., `myPlugin.ts`) and with the `.client` suffix (e.g., `myClientPlugin.client.ts`), are executed on the client side.

::callout{icon="i-lucide-lightbulb"}
After this step, Nuxt calls the [`app:created`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) hook, which can be used to execute additional logic.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/plugins"}
::

### Step 2: Route Validation

This step is the same as the server-side execution and includes the `validate` method if defined in the `definePageMeta` function.

### Step 3: Execute Nuxt App Middleware

Nuxt middleware runs on both the server and the client. If you want certain code to run in specific environments, consider splitting it by using `import.meta.client` for the client and `import.meta.server` for the server.

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
---
::

### Step 4: Mount Vue Application and Hydration

Calling `app.mount('#__nuxt')` mounts the Vue application to the DOM. If the application uses SSR or SSG mode, Vue performs a hydration step to make the client-side application interactive. During hydration, Vue recreates the application (excluding [Server Components](https://nuxt.com/docs/3.x/directory-structure/components#server-components)), matches each component to its corresponding DOM nodes, and attaches DOM event listeners.

To ensure proper hydration, it's important to maintain consistency between the data on the server and the client. For API requests, it is recommended to use `useAsyncData`, `useFetch`, or other SSR-friendly composables. These methods ensure that the data fetched on the server side is reused during hydration, avoiding repeated requests. Any new requests should only be triggered after hydration, preventing hydration errors.

::callout{icon="i-lucide-lightbulb"}
Before mounting the Vue application, Nuxt calls the [`app:beforeMount`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) hook.
::

::callout{icon="i-lucide-lightbulb"}
After mounting the Vue application, Nuxt calls the [`app:mounted`](https://nuxt.com/docs/3.x/api/advanced/hooks#app-hooks-runtime) hook.
::

### Step 5: Vue Lifecycle

Unlike on the server, the browser executes the full [Vue lifecycle](https://vuejs.org/guide/essentials/lifecycle){rel="&#x22;nofollow&#x22;"}.

---

## useRequestEvent

**URL:** llms-txt#userequestevent

Within the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) you can use `useRequestEvent` to access the incoming request.

::tip
In the browser, `useRequestEvent` will return `undefined`.
::

**Examples:**

Example 1 (ts):
```ts
// Get underlying request event
const event = useRequestEvent()

// Get the URL
const url = event?.path
```

---

## onBeforeRouteLeave

**URL:** llms-txt#onbeforerouteleave

::read-more
---
icon: i-simple-icons-vuedotjs
target: _blank
title: Vue Router Docs
to: https://router.vuejs.org/api/functions/onBeforeRouteLeave.html
---
::

---

## Nuxt Guide

**URL:** llms-txt#nuxt-guide

::card-group{.sm:grid-cols-1}
  :::card
  ---
  icon: i-lucide-medal
  title: Key Concepts
  to: https://nuxt.com/docs/3.x/guide/concepts
  ---
  Discover the main concepts behind Nuxt, from auto-import, hybrid rendering to its TypeScript support.
  :::

:::card
  ---
  icon: i-lucide-square-check
  title: Best Practices
  to: https://nuxt.com/docs/3.x/guide/best-practices
  ---
  Learn about best practices when developing with Nuxt
  :::

:::card
  ---
  icon: i-lucide-book-open
  title: Recipes
  to: https://nuxt.com/docs/3.x/guide/recipes
  ---
  Find solutions to common problems and learn how to implement them in your Nuxt project.
  :::

:::card
  ---
  icon: i-lucide-star
  title: Going Further
  to: https://nuxt.com/docs/3.x/guide/going-further
  ---
  Master Nuxt with advanced concepts like experimental features, hooks, modules, and more.
  :::
::

---

## Authoring Nuxt Layers

**URL:** llms-txt#authoring-nuxt-layers

**Contents:**
- Basic Example
- Layer Priority
  - When to Use Each
  - Example
- Starter Template
- Publishing Layers
  - Git Repository
  - npm Package
- Tips
  - Named Layer Aliases

Nuxt layers are a powerful feature that you can use to share and reuse partial Nuxt applications within a monorepo, or from a git repository or npm package. The layers structure is almost identical to a standard Nuxt application, which makes them easy to author and maintain.

::read-more{to="https://nuxt.com/docs/getting-started/layers"}
::

A minimal Nuxt layer directory should contain a [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file to indicate it is a layer.

Additionally, certain other files in the layer directory will be auto-scanned and used by Nuxt for the project extending this layer.

- [`components/*`](https://nuxt.com/docs/3.x/directory-structure/components) - Extend the default components
- [`composables/*`](https://nuxt.com/docs/3.x/directory-structure/composables) - Extend the default composables
- [`layouts/*`](https://nuxt.com/docs/3.x/directory-structure/layouts) - Extend the default layouts
- [`middleware/*`](https://nuxt.com/docs/3.x/directory-structure/middleware) - Extend the default middleware
- [`pages/*`](https://nuxt.com/docs/3.x/directory-structure/pages) - Extend the default pages
- [`plugins/*`](https://nuxt.com/docs/3.x/directory-structure/plugins) - Extend the default plugins
- [`server/*`](https://nuxt.com/docs/3.x/directory-structure/server) - Extend the default server endpoints & middleware
- [`utils/*`](https://nuxt.com/docs/3.x/directory-structure/utils) - Extend the default utils
- [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config)- Extend the default nuxt config
- [`app.config.ts`](https://nuxt.com/docs/3.x/directory-structure/app-config) - Extend the default app config

When extending from multiple layers, it's important to understand the override order. Layers with **higher priority** override layers with lower priority when they define the same files or components.

The priority order from highest to lowest is:

1. **Your project files** - always have the highest priority
2. **Auto-scanned layers** from `~~/layers` directory - sorted alphabetically (Z has higher priority than A)
3. **Layers in `extends`** config - first entry has higher priority than second

- **`extends`** - Use for external dependencies (npm packages, remote repositories) or layers outside your project directory
- **`~~/layers` directory** - Use for local layers that are part of your project

::tip
If you need to control the order of auto-scanned layers, you can prefix them with numbers: `~/layers/1.z-layer`, `~/layers/2.a-layer`. This way `2.a-layer` will have higher priority than `1.z-layer`.
::

If you also have `~~/layers/custom`, the priority order is:

- Your project files (highest)
- `~~/layers/custom`
- `../base`
- `@my-themes/awesome`
- `github:my-themes/awesome#v1` (lowest)

This means your project files will override any layer, and `~~/layers/custom` will override anything in `extends`.

To get started you can initialize a layer with the [nuxt/starter/layer template](https://github.com/nuxt/starter/tree/layer){rel="&#x22;nofollow&#x22;"}. This will create a basic structure you can build upon. Execute this command within the terminal to get started:

Follow up on the README instructions for the next steps.

You can publish and share layers by either using a remote source or an npm package.

You can use a git repository to share your Nuxt layer. Some examples:

::tip
If you want to extend a private remote source, you need to add the environment variable `GIGET_AUTH=<token>` to provide a token.
::

::tip
If you want to extend a remote source from a self-hosted GitHub or GitLab instance, you need to supply its URL with the `GIGET_GITHUB_URL=<url>` or `GIGET_GITLAB_URL=<url>` environment variable - or directly configure it with [the `auth` option](https://github.com/unjs/c12#extending-config-layer-from-remote-sources){rel=""nofollow""} in your `nuxt.config`.
::

::warning
Bear in mind that if you are extending a remote source as a layer, you will not be able to access its dependencies outside of Nuxt. For example, if the remote layer depends on an eslint plugin, this will not be usable in your eslint config. That is because these dependencies will be located in a special location (`node_modules/.c12/layer_name/node_modules/`) that is not accessible to your package manager.
::

::note
When using git remote sources, if a layer has npm dependencies and you wish to install them, you can do so by specifying `install: true` in your layer options.

You can publish Nuxt layers as an npm package that contains the files and dependencies you want to extend. This allows you to share your config with others, use it in multiple projects or use it privately.

To extend from an npm package, you need to make sure that the module is published to npm and installed in the user's project as a devDependency. Then you can use the module name to extend the current nuxt config:

To publish a layer directory as an npm package, you want to make sure that the `package.json` has the correct properties filled out. This will make sure that the files are included when the package is published.

::important
Make sure any dependency imported in the layer is **explicitly added** to the `dependencies`. The `nuxt` dependency, and anything only used for testing the layer before publishing, should remain in the `devDependencies` field.
::

Now you can proceed to publish the module to npm, either publicly or privately.

::important
When publishing the layer as a private npm package, you need to make sure you log in, to authenticate with npm to download the node module.
::

### Named Layer Aliases

Auto-scanned layers (from your `~~/layers` directory) automatically create aliases. For example, you can access your `~~/layers/test` layer via `#layers/test`.

If you want to create named layer aliases for other layers, you can specify a name in the configuration of the layer.

This will produce an alias of `#layers/example` which points to your layer.

### Relative Paths and Aliases

When importing using global aliases (such as `~/` and `@/`) in a layer components and composables, note that these aliases are resolved relative to the user's project paths. As a workaround, you can **use relative paths** to import them, or use named layer aliases.

Also when using relative paths in `nuxt.config` file of a layer, (with exception of nested `extends`) they are resolved relative to user's project instead of the layer. As a workaround, use full resolved paths in `nuxt.config`:

## Multi-Layer Support for Nuxt Modules

You can use the [`getLayerDirectories`](https://nuxt.com/docs/api/kit/layers#getlayerdirectories) utility from Nuxt Kit to support custom multi-layer handling for your modules.

- Earlier items in the array have higher priority and override later ones
- The user's project is the first item in the array

Configuration loading and extends support is handled by [unjs/c12](https://github.com/unjs/c12){rel="&#x22;nofollow&#x22;"}, merged using [unjs/defu](https://github.com/unjs/defu){rel="&#x22;nofollow&#x22;"} and remote git sources are supported using [unjs/giget](https://github.com/unjs/giget){rel="&#x22;nofollow&#x22;"}. Check the docs and source code to learn more.

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/issues/13367
---
Checkout our ongoing development to bring more improvements for layers support on GitHub.
::

**Examples:**

Example 1 (unknown):
```unknown
Additionally, certain other files in the layer directory will be auto-scanned and used by Nuxt for the project extending this layer.

- [`components/*`](https://nuxt.com/docs/3.x/directory-structure/components) - Extend the default components
- [`composables/*`](https://nuxt.com/docs/3.x/directory-structure/composables) - Extend the default composables
- [`layouts/*`](https://nuxt.com/docs/3.x/directory-structure/layouts) - Extend the default layouts
- [`middleware/*`](https://nuxt.com/docs/3.x/directory-structure/middleware) - Extend the default middleware
- [`pages/*`](https://nuxt.com/docs/3.x/directory-structure/pages) - Extend the default pages
- [`plugins/*`](https://nuxt.com/docs/3.x/directory-structure/plugins) - Extend the default plugins
- [`server/*`](https://nuxt.com/docs/3.x/directory-structure/server) - Extend the default server endpoints & middleware
- [`utils/*`](https://nuxt.com/docs/3.x/directory-structure/utils) - Extend the default utils
- [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config)- Extend the default nuxt config
- [`app.config.ts`](https://nuxt.com/docs/3.x/directory-structure/app-config) - Extend the default app config

## Basic Example

::code-group
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

## tsconfig.json

**URL:** llms-txt#tsconfig.json

**Contents:**
- Extending TypeScript Configuration

Nuxt [automatically generates](https://nuxt.com/docs/3.x/guide/concepts/typescript) a `.nuxt/tsconfig.json` file with the resolved aliases you are using in your Nuxt project, as well as with other sensible defaults.

You can benefit from this by creating a `tsconfig.json` in the root of your project with the following content:

::note
As you need to, you can customize the contents of this file. However, it is recommended that you don't overwrite `target`, `module` and `moduleResolution`.
::

::note
If you need to customize your `paths`, this will override the auto-generated path aliases. Instead, we recommend that you add any path aliases you need to the [`alias`](https://nuxt.com/docs/3.x/api/nuxt-config#alias) property within your `nuxt.config`, where they will get picked up and added to the auto-generated `tsconfig`.
::

## Extending TypeScript Configuration

You can customize the TypeScript configuration of your Nuxt project for each context (`app` and `server`) in the `nuxt.config.ts` file.

**Examples:**

Example 1 (unknown):
```unknown
::note
As you need to, you can customize the contents of this file. However, it is recommended that you don't overwrite `target`, `module` and `moduleResolution`.
::

::note
If you need to customize your `paths`, this will override the auto-generated path aliases. Instead, we recommend that you add any path aliases you need to the [`alias`](https://nuxt.com/docs/3.x/api/nuxt-config#alias) property within your `nuxt.config`, where they will get picked up and added to the auto-generated `tsconfig`.
::

## Extending TypeScript Configuration

You can customize the TypeScript configuration of your Nuxt project for each context (`app` and `server`) in the `nuxt.config.ts` file.
```

---

## Nuxt: Looking forward

**URL:** llms-txt#nuxt:-looking-forward

**Contents:**
- A Review of 2023 - Sébastien
- Looking forward into 2024 - Daniel
  - Continued development and reimagination
  - Sustainable open source
  - Friendly collaboration
  - A welcoming community
  - What about Nuxt 4?

## A Review of 2023 - Sébastien

In January 2023, Daniel set out [**Nuxt: A vision for 2023**](https://nuxt.com/blog/vision-2023). We achieved most of the goals we set out to accomplish. Some of them are missing and we will tackle them this year!

It was a productive year and the team shipped **9 minor releases**: from v3.1 to v3.9.

In the first 365 days, Nuxt 3 reached new milestones:

- :icon{name="i-lucide-star"} **49,5K stars** on GitHub ([add yours](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"} 😊)
- :icon{name="i-lucide-download"} **27M downloads** on npm
- :icon{name="i-lucide-user-plus"} **612 contributors** on the [nuxt repository](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"}
- :icon{name="i-lucide-puzzle"} **184 modules** created by **142 maintainers**
- :icon{name="i-lucide-circle-check"} **2,423 closed issues**
- :icon{name="i-lucide-git-pull-request"} **1,728 merged pull request**
- :icon{name="i-simple-icons-discord"} **26,300 members** on [Discord](https://chat.nuxt.dev){rel="&#x22;nofollow&#x22;"}

End of October, Nuxt 3 downloads [surpassed Nuxt 2 downloads](https://x.com/Atinux/status/1731980841142669379){rel="&#x22;nofollow&#x22;"} 🚀.

The same month, we released [Nuxt Image 1.0](https://image.nuxt.com){rel="&#x22;nofollow&#x22;"} with Nuxt 3 support and new features to make sure your website stays performant when using Images. Nuxt now auto-installs it as soon as you start using the [`<NuxtImg>`](https://nuxt.com/docs/api/components/nuxt-img) or [`<NuxtPicture>`](https://nuxt.com/docs/api/components/nuxt-picture) component.

We shipped [Nuxt DevTools](https://nuxt.com/blog/nuxt-devtools-v1-0), leveling up the Developer Experience we can expect from a Web framework. I am happy to see that we inspired other frameworks to adopt a similar approach: [Vue DevTools](https://x.com/vuejs/status/1741032977919053865){rel="&#x22;nofollow&#x22;"}, [Next DevTools](https://x.com/xinyao27/status/1741447261132145133){rel="&#x22;nofollow&#x22;"}, [Remix DevTools](https://x.com/AlemTuzlak59192/status/1741903214860009539){rel="&#x22;nofollow&#x22;"}, [Vite Plugin DevTools](https://github.com/pheno-agency/vite-plugin-devtools){rel="&#x22;nofollow&#x22;"}, [Astro Dev Toolbar](https://x.com/n_moore/status/1732164645778071888){rel="&#x22;nofollow&#x22;"} and more.

After many months of building our UI library internally, [Benjamin Canac](https://github.com/benjamincanac){rel="&#x22;nofollow&#x22;"} open sourced [Nuxt UI](https://ui.nuxt.com){rel="&#x22;nofollow&#x22;"} to let you create websites at a faster pace with highly customizable components built with TailwindCSS.

[Nuxt Content](http://content.nuxt.com){rel="&#x22;nofollow&#x22;"} has had 10 minor releases with various improvements: from performance to the MDC syntax. We have some ongoing work to better support [edge rendering](https://nuxt.com/blog/nuxt-on-the-edge){rel="&#x22;nofollow&#x22;"} in the future. At the same time, the NuxtLabs team is working on [Nuxt Studio](https://nuxt.studio){rel="&#x22;nofollow&#x22;"} to let users edit Markdown files with a Notion-like editor while keeping your content inside your git repository.

## Looking forward into 2024 - Daniel

We are well into 2024, and this update is definitely overdue!

Here are a few thoughts on the direction that I'll be seeking to lead Nuxt in over the next year.

### Continued development and reimagination

I would love to see us continuing to adapt our best practices to the changing needs of the ecosystem, expand the boundaries of what good DX could be, and improve Nuxt.

I am really pleased at what we currently offer in Nuxt. But I would never want to rest on our laurels. We need to keep pursuing new possibilities that appear as the web platform develops. We've committed to [Baseline Compatibility](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility){rel="&#x22;nofollow&#x22;"} going forward (and are included in conversations about it with the [W3C WebDX Community Group](https://github.com/web-platform-dx/web-features){rel="&#x22;nofollow&#x22;"}).

We have some strategies to enable us to do this while also prioritising stability for our existing users, and recognising the scope of the Nuxt ecosystem.

1. In general we follow a pattern of **introducing a module or experimental feature** that can be disabled in testing while we gather feedback and confirm the direction and API of new features.
2. We have adopted the **ecosystem-ci pattern** of validating that our code changes in Nuxt don't break downstream projects unintentionally. If you maintain a well-tested module or library that depends on Nuxt, I'd welcome a PR adding your project to [nuxt/ecosystem-ci](https://github.com/nuxt/ecosystem-ci){rel="&#x22;nofollow&#x22;"}.
3. We plan to release a **pull-based test** that will allow you to configure your CI to test itself against the latest nightly version of Nuxt to provide early feedback on new Nuxt releases, rather than facing an issue when upgrading.
4. Finally, we have adopted a **push-based approach to updating existing projects**. When we identify breaking changes or improvements that can be rolled out to the ecosystem, we will proactively raise PRs to Nuxt modules (and, to a lesser extent, other open-source projects using Nuxt).

I hope this will allow us to continue to innovate and experiment with new features without sacrificing the stability and maintainability.

In particular, look for active development on the following:

- ✅ [nuxt/fonts](https://github.com/nuxt/fonts){rel="&#x22;nofollow&#x22;"} - working up to v1.0.0
- ✅ [nuxt/eslint](https://github.com/nuxt/eslint){rel="&#x22;nofollow&#x22;"} - working up to v1.0.0
- 🔥 [nuxt/scripts](https://github.com/nuxt/scripts){rel="&#x22;nofollow&#x22;"} - soon to be released
- 🚧 [nuxt/a11y](https://github.com/nuxt/a11y){rel="&#x22;nofollow&#x22;"} - coming soon!
- 🚧 [nuxt/auth](https://github.com/nuxt/auth){rel="&#x22;nofollow&#x22;"} - coming soon!
- 🚧 [nuxt/hints](https://github.com/nuxt/hints){rel="&#x22;nofollow&#x22;"} - coming soon!

### Sustainable open source

I want Nuxt to continue to be an independent, community-driven framework for the long term.

I'm really delighted to see successful businesses founded on Nuxt, and initiatives springing up around Nuxt that become [sponsors](https://nuxt.com/enterprise/sponsors) or otherwise giving back to the core framework, enabling ongoing Nuxt development.

Obviously, [NuxtLabs](https://nuxtlabs.com){rel="&#x22;nofollow&#x22;"} is the preeminent example of that. [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"}, [Anthony Fu](https://github.com/antfu){rel="&#x22;nofollow&#x22;"} and I are all able to work full-time on open source thanks to their paid services around Nuxt: [Nuxt UI Pro](https://ui.nuxt.com/pro/getting-started){rel="&#x22;nofollow&#x22;"}, [Nuxt Experts](https://nuxt.com/enterprise/support), [Nuxt Studio](https://nuxt.studio/){rel="&#x22;nofollow&#x22;"} and [NuxtHub](https://hub.nuxt.com/){rel="&#x22;nofollow&#x22;"} (soon). They also [sponsor community members](https://github.com/orgs/nuxtlabs/sponsoring){rel="&#x22;nofollow&#x22;"} from Vue, Vite, UnJS, and Nuxt.

For me, keeping Nuxt independent and sustainable for the future requires an active and growing team and community. In the weeks ahead, I'll be announcing a broader 'Nuxt team' alongside the core team. This is about recognising the tireless work of the many people whose contributions are already making Nuxt what it is.

I would also love to see more of those team members or the wider community sponsored to work in the Nuxt ecosystem in the years ahead. If your company has benefited from Nuxt, please do consider sponsoring some of the developers working on Nuxt, whether they are team or wider community members.

### Friendly collaboration

From the beginning of our work on Nuxt 3, we have sought to extract out utilities, libraries and even frameworks that we benefit from so they can *also* benefit a much broader audience.

That's the origin of [UnJS](https://unjs.io/){rel="&#x22;nofollow&#x22;"}, of course, and it continues to thrive under the leadership of [Pooya Parsa](https://github.com/pi0){rel="&#x22;nofollow&#x22;"} (who is also a key member of the Nuxt core team).

We'd like to continue that attitude of friendly collaboration. Although building things ourselves or keeping them to ourselves might to be 'success', I don't have any time for zero-sum games. We will go further, both as a framework and as a web community, if we build *together*.

Equally, one of our core values is platform-independence (alongside deep platform *integration*). We support 90+ providers across deployment, testing, stories, KV and cache, databases, image CDNs and font hosts. That breadth of ecosystem is one that bears rich rewards and frees people up to make choices about which providers they use based on the value they bring. But it *also* means we are dependent on our community who use these different providers to help us keep these integrations up-to-date.

Nuxt isn't going anywhere, but we hope that the work we do collaboratively will last long beyond us.

### A welcoming community

Although it is easy to focus on technical excellence or the quality of developer experience, I am more encouraged to see the continued growth of the Nuxt ecosystem as a welcoming and friendly community.

I am incredibly grateful for the kind tone that prevails across [our community Discord](https://chat.nuxt.dev){rel="&#x22;nofollow&#x22;"}, on [Twitter](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"}, and on [GitHub](https://github.com/nuxt/nuxt){rel="&#x22;nofollow&#x22;"}.

### What about Nuxt 4?

The JavaScript space is known for producing a new framework every week, which means there is a natural hype cycle.

But we are not aiming for hype with the continued development of Nuxt, which is part of why we have committed to regular release cycles:

- **major** framework releases every year
- **minor** releases every month or so
- **patch** releases every week or so

You can expect to see breaking changes shipped in major releases, with features shipped in our minor releases. That means we aren't holding features back for Nuxt 4; we'll ship those as regularly as we can in our 6-weekly minor release cycle.

Our aim is that Nuxt 4 is an opportunity for *thoughtful* breaking changes with either a straightforward migration path (ideally with automated processes) or the ability to opt-in to previous behaviour.

There are definitely lessons we as a team have learned form the transition from Nuxt 2 to 3, and I see Nuxt 4 as an opportunity for us to prove that major releases can be a good experience for users.

You can preview the changes we have in mind by browsing [our roadmap](https://github.com/orgs/nuxt/projects/8/views/4){rel="&#x22;nofollow&#x22;"} or checking through [the issues we've tagged for v4](https://github.com/nuxt/nuxt/issues?q=is\:issue+label:4.x){rel="&#x22;nofollow&#x22;"}. Feedback and wishes are very welcome as always!

Our roadmap for Nuxt 4 is a little complex as we are also planning on major releases across the UnJS ecosystem.

Roughly speaking, we are aiming to have one more minor release for Nuxt v3 and Nitro v2, before beginning a [raft of major releases across the UnJS ecosystem of packages](https://github.com/unjs/community/discussions/4){rel="&#x22;nofollow&#x22;"} - culminating in Nuxt v4.

We are aiming to release **Nuxt v4 on or before June 14** (though obviously this is dependent on having enough time after Nitro's major release to be properly tested in the community, so be aware that this is not an exact date).

After the release of Nuxt v4, we will be providing **six months** of ongoing support and bug-fixes for Nuxt v3, which we expect will be more than ample to upgrade to v4 given our aim of a gentle upgrade path.

We hope you are as excited as we are about the pending release of Nuxt v4! 🎉

Finally, thank you so much for all your trust and support as we've been building Nuxt. I know I speak for the whole team when I say that it's such a privilege to be doing this alongside everyone in the Nuxt community! ❤️

Daniel (on behalf of the whole Nuxt team)

---

## Flightcontrol

**URL:** llms-txt#flightcontrol

**Contents:**
- Set Up your Flightcontrol account
- Create a Project with Configuration via the Dashboard
- Create a Project with Configuration via `flightcontrol.json`

Nitro supports deploying to [AWS via Flightcontrol](https://flightcontrol.dev?ref=nuxt){rel="&#x22;nofollow&#x22;"} with minimal configuration.

::tip
**Zero Configuration ✨**

Integration with Flightcontrol is possible with zero configuration.
::

## Set Up your Flightcontrol account

On a high level, the steps you will need to follow to deploy a project for the first time are:

1. Create an account at [Flightcontrol](https://app.flightcontrol.dev/signup?ref=nuxt){rel="&#x22;nofollow&#x22;"}
2. Create an account at [AWS](https://portal.aws.amazon.com/billing/signup){rel="&#x22;nofollow&#x22;"} (if you don't already have one)
3. Link your AWS account to the Flightcontrol
4. Authorize the Flightcontrol GitHub App to access your chosen repositories, public or private.
5. Create a Flightcontrol project with configuration via the Dashboard or with configuration via `flightcontrol.json`.

## Create a Project with Configuration via the Dashboard

1. Create a Flightcontrol project from the Dashboard. Select a repository for the source.
2. Select the `GUI` config type.
3. Select the Nuxt preset.
4. Select your preferred AWS server size.
5. Submit the new project form.

## Create a Project with Configuration via `flightcontrol.json`

1. Create a Flightcontrol project from your dashboard. Select a repository for the source.
2. Select the `flightcontrol.json` config type.
3. Add a new file at the root of your repository called `flightcontrol.json`. Here is an example configuration that creates an AWS fargate service for your app:

4. Submit the new project form.

::read-more{target="_blank" to="https://www.flightcontrol.dev/docs?ref=nuxt"}
Learn more about Flightcontrol's configuration.
::

::read-more
---
target: _blank
to: https://nitro.unjs.io/deploy/providers/flightcontrol
---
Head over **Nitro documentation** to learn more about the flightcontrol deployment preset.
::

---

## $fetch

**URL:** llms-txt#$fetch

**Contents:**
- Usage
  - Passing Headers and Cookies

Nuxt uses [ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"} to expose globally the `$fetch` helper for making HTTP requests within your Vue app or API routes.

::tip{icon="i-lucide-rocket"}
During server-side rendering, calling `$fetch` to fetch your internal [API routes](https://nuxt.com/docs/3.x/directory-structure/server) will directly call the relevant function (emulating the request), **saving an additional API call**.
::

::note{color="blue" icon="i-lucide-info"}
Using `$fetch` in components without wrapping it with [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) causes fetching the data twice: initially on the server, then again on the client-side during hydration, because `$fetch` does not transfer state from the server to the client. Thus, the fetch will be executed on both sides because the client has to get the data again.
::

We recommend using [`useFetch`](https://nuxt.com/docs/3.x/api/composables/use-fetch) or [`useAsyncData`](https://nuxt.com/docs/3.x/api/composables/use-async-data) + `$fetch` to prevent double data fetching when fetching the component data.

::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

You can use `$fetch` in any methods that are executed only on client-side.

::tip
`$fetch` is the preferred way to make HTTP calls in Nuxt instead of [@nuxt/http](https://github.com/nuxt/http){rel=""nofollow""} and [@nuxtjs/axios](https://github.com/nuxt-community/axios-module){rel=""nofollow""} that are made for Nuxt 2.
::

::note
If you use `$fetch` to call an (external) HTTPS URL with a self-signed certificate in development, you will need to set `NODE_TLS_REJECT_UNAUTHORIZED=0` in your environment.
::

### Passing Headers and Cookies

When we call `$fetch` in the browser, user headers like `cookie` will be directly sent to the API.

However, during Server-Side Rendering, due to security risks such as &#x2A;*Server-Side Request Forgery (SSRF)** or **Authentication Misuse**, the `$fetch` wouldn't include the user's browser cookies, nor pass on cookies from the fetch response.

If you need to forward headers and cookies on the server, you must manually pass them:

However, when calling `useFetch` with a relative URL on the server, Nuxt will use [`useRequestFetch`](https://nuxt.com/docs/3.x/api/composables/use-request-fetch) to proxy headers and cookies (with the exception of headers not meant to be forwarded, like `host`).

**Examples:**

Example 1 (unknown):
```unknown
::read-more{to="https://nuxt.com/docs/getting-started/data-fetching"}
::

You can use `$fetch` in any methods that are executed only on client-side.
```

Example 2 (unknown):
```unknown
::tip
`$fetch` is the preferred way to make HTTP calls in Nuxt instead of [@nuxt/http](https://github.com/nuxt/http){rel=""nofollow""} and [@nuxtjs/axios](https://github.com/nuxt-community/axios-module){rel=""nofollow""} that are made for Nuxt 2.
::

::note
If you use `$fetch` to call an (external) HTTPS URL with a self-signed certificate in development, you will need to set `NODE_TLS_REJECT_UNAUTHORIZED=0` in your environment.
::

### Passing Headers and Cookies

When we call `$fetch` in the browser, user headers like `cookie` will be directly sent to the API.

However, during Server-Side Rendering, due to security risks such as &#x2A;*Server-Side Request Forgery (SSRF)** or **Authentication Misuse**, the `$fetch` wouldn't include the user's browser cookies, nor pass on cookies from the fetch response.

::code-group
```

Example 3 (unknown):
```unknown

```

Example 4 (unknown):
```unknown
::

If you need to forward headers and cookies on the server, you must manually pass them:
```

---

## Firebase

**URL:** llms-txt#firebase

**Contents:**
- Firebase App Hosting (recommended)
  - Project Setup
- Firebase Functions (deprecated)
- Project Setup
- Local Preview
- Build and Deploy
- Options
  - Runtime Node.js Version
- Other Cloud Functions
- Using Cookies in Production

## Firebase App Hosting (recommended)

::note
You will need to be on the [**Blaze plan**](https://firebase.google.com/pricing){rel=""nofollow""} (Pay as you go) to get started.
::

::read-more
---
title: Firebase App Hosting
to: https://firebase.google.com/docs/app-hosting
---
::

1. Go to the Firebase [console](https://console.firebase.google.com/){rel="&#x22;nofollow&#x22;"} and set up a new project.
2. Select **Build > App Hosting** from the sidebar.

- You may need to upgrade your billing plan at this step.
3. Click **Get Started**.

- Choose a region.
   - Import a GitHub repository (you’ll need to link your GitHub account).
   - Configure deployment settings (project root directory and branch), and enable automatic rollouts.
   - Choose a unique ID for your backend.
4. Click Finish & Deploy to create your first rollout.

When you deploy with Firebase App Hosting, the App Hosting preset will be run automatically at build time.

## Firebase Functions (deprecated)

::important
This deployment method is deprecated and is not recommended. Firebase App Hosting is the recommended way to deploy Nuxt apps on Firebase.
::

To use the more recent and recommended generation of Firebase functions, set the `firebase.gen` option to `2`:

::note
If you cannot use configuration for any reason, alternatively you can use `NITRO_FIREBASE_GEN=2` environment variable.
::

If you already have a deployed version of your website and want to upgrade to 2nd gen, [see the Migration process on Firebase docs](https://firebase.google.com/docs/functions/2nd-gen-upgrade){rel="&#x22;nofollow&#x22;"}. Namely, the CLI will ask you to delete your existing functions before deploying the new ones.

::tip
---
target: _blank
to: https://firebase.google.com/docs/functions/version-comparison
---
Comparison between 1st and 2nd generation functions
::

You may instead prefer to set up your project with the Firebase CLI, which will fetch your project ID for you, add required dependencies (see above) and even set up automated deployments via GitHub Actions (for hosting only). [Learn about installing the firebase CLI](https://firebase.google.com/docs/cli#windows-npm){rel="&#x22;nofollow&#x22;"}.

1. Install the latest version of the Firebase CLI.

2. Initialize your Firebase Project

::note
When prompted, you can enter `.output/public` as the public directory. In the next step, **do not** configure your project as a single-page app.
::

Once complete, add the following to your `firebase.json` to enable server rendering in Cloud Functions:

You can preview a local version of your site if you need to test things out without deploying.

Deploy to Firebase Hosting by running a Nuxt build and then running the `firebase deploy` command.

You can set options for Firebase functions in your `nuxt.config.ts` file:

### Runtime Node.js Version

You can set a custom Node.js version in configuration:

Firebase tools use the `engines.node` version in `package.json` to determine which node version to use for your functions. Nuxt automatically writes to the `.output/server/package.json` with configured Node.js version.

You might also need to add a runtime key to your `firebase.json` file:

::read-more
---
target: _blank
to: https://firebase.google.com/docs/functions/manage-functions?gen=2nd#set_nodejs_version
---
You can read more about this in **Firebase Docs**.
::

## Other Cloud Functions

You may be warned that other cloud functions will be deleted when you deploy your Nuxt project. This is because Nitro will deploy your entire project to firebase functions. If you want to deploy only your Nuxt project, you can use the `--only` flag:

::read-more
---
target: _blank
to: https://nitro.unjs.io/deploy/providers/firebase
---
Head over to the **Nitro documentation** to learn more about the Firebase deployment preset.
::

## Using Cookies in Production

When using Firebase Hosting together with Cloud Functions or Cloud Run, cookies are generally stripped from incoming requests to allow for efficient CDN cache behavior. Only the specially-named `__session` cookie is permitted to pass through to your app.

::read-more
---
target: \_blank
to: https://firebase.google.com/docs/hosting/manage-cache#using_cookies
---
For more information, refer to the **Firebase documentation**.
::

## Working with Environment Variables

To set environment variables for your Firebase functions, you need to copy the `.env` file to the `.output/server` directory.
You can do this by adding a `postbuild` script to your `package.json`, that will automatically run after the build command:

::read-more
---
target: \_blank
to: https://firebase.google.com/docs/functions/config-env?gen=2nd#env-variables
---
For more information, refer to the **Firebase documentation**.
::

**Examples:**

Example 1 (unknown):
```unknown
::note
If you cannot use configuration for any reason, alternatively you can use `NITRO_FIREBASE_GEN=2` environment variable.
::

If you already have a deployed version of your website and want to upgrade to 2nd gen, [see the Migration process on Firebase docs](https://firebase.google.com/docs/functions/2nd-gen-upgrade){rel="&#x22;nofollow&#x22;"}. Namely, the CLI will ask you to delete your existing functions before deploying the new ones.

::tip
---
target: _blank
to: https://firebase.google.com/docs/functions/version-comparison
---
Comparison between 1st and 2nd generation functions
::

## Project Setup

You may instead prefer to set up your project with the Firebase CLI, which will fetch your project ID for you, add required dependencies (see above) and even set up automated deployments via GitHub Actions (for hosting only). [Learn about installing the firebase CLI](https://firebase.google.com/docs/cli#windows-npm){rel="&#x22;nofollow&#x22;"}.

1. Install the latest version of the Firebase CLI.
```

Example 2 (unknown):
```unknown
2. Initialize your Firebase Project
```

Example 3 (unknown):
```unknown
::note
When prompted, you can enter `.output/public` as the public directory. In the next step, **do not** configure your project as a single-page app.
::

Once complete, add the following to your `firebase.json` to enable server rendering in Cloud Functions:
```

Example 4 (unknown):
```unknown
## Local Preview

You can preview a local version of your site if you need to test things out without deploying.
```

---

## Resolving

**URL:** llms-txt#resolving

**Contents:**
- `resolvePath`
  - Usage
  - Type
  - Parameters
  - Examples
- `resolveAlias`
  - Type
  - Parameters
- `findPath`
  - Usage

Sometimes you need to resolve a paths: relative to the current module, with unknown name or extension. For example, you may want to add a plugin that is located in the same directory as the module. To handle this cases, nuxt provides a set of utilities to resolve paths. `resolvePath` and `resolveAlias` are used to resolve paths relative to the current module. `findPath` is used to find first existing file in given paths. `createResolver` is used to create resolver relative to base path.

Resolves full path to a file or directory respecting Nuxt alias and extensions options. If path could not be resolved, normalized input path will be returned.

**`path`**: A path to resolve.

**`options`**: Options to pass to the resolver. This object can have the following properties:

| Property             | Type                                                                                                                                       | Required | Description                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `cwd`                | `string`                                                                                                                                   | `false`  | Base for resolving paths from. Default is Nuxt rootDir.                                                                      |
| `alias`              | `Record<string, string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | An object of aliases. Default is Nuxt configured aliases.                                                                    |
| `extensions`         | `string[]`                                                                                                                                 | `false`  | The file extensions to try. Default is Nuxt configured extensions.                                                           |
| `virtual`            | `boolean`                                                                                                                                  | `false`  | Whether to resolve files that exist in the Nuxt VFS (for example, as a Nuxt template).                                       |
| `fallbackToOriginal` | `boolean`                                                                                                                                  | `false`  | Whether to fallback to the original path if the resolved path does not exist instead of returning the normalized input path. |

Resolves path aliases respecting Nuxt alias options.

**`path`**: A path to resolve.

**`alias`**: An object of aliases. If not provided, it will be read from `nuxt.options.alias`.

Try to resolve first existing file in given paths.

**`paths`**: A path or an array of paths to resolve.

**`options`**: Options to pass to the resolver. This object can have the following properties:

| Property             | Type                                                                                                                                       | Required | Description                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `cwd`                | `string`                                                                                                                                   | `false`  | Base for resolving paths from. Default is Nuxt rootDir.                                                                      |
| `alias`              | `Record<string, string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | `false`  | An object of aliases. Default is Nuxt configured aliases.                                                                    |
| `extensions`         | `string[]`                                                                                                                                 | `false`  | The file extensions to try. Default is Nuxt configured extensions.                                                           |
| `virtual`            | `boolean`                                                                                                                                  | `false`  | Whether to resolve files that exist in the Nuxt VFS (for example, as a Nuxt template).                                       |
| `fallbackToOriginal` | `boolean`                                                                                                                                  | `false`  | Whether to fallback to the original path if the resolved path does not exist instead of returning the normalized input path. |

Creates resolver relative to base path.

::tip
---
icon: i-lucide-video
target: _blank
to: https://vueschool.io/lessons/resolving-paths-and-injecting-assets-to-the-app?friend=nuxt
---
Watch Vue School video about createResolver.
::

**`basePath`**: A base path to resolve from. It can be a string or a URL.

The `createResolver` function returns an object with the following properties:

| Property      | Type                                                                                                                                                                                | Description                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `resolve`     | `(path: string) => string`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"}                                        | A function that resolves a path relative to the base path.                                                |
| `resolvePath` | `(path: string, options?: ResolvePathOptions) => Promise<string>`{.language-ts.shiki.shiki-themes.material-theme-lighter.material-theme-lighter.material-theme-palenight lang="ts"} | A function that resolves a path relative to the base path and respects Nuxt alias and extensions options. |

**Examples:**

Example 1 (ts):
```ts
import { defineNuxtModule, resolvePath } from '@nuxt/kit'

export default defineNuxtModule({
  async setup () {
    const entrypoint = await resolvePath('@unhead/vue')
    console.log(`Unhead entrypoint is ${entrypoint}`)
  },
})
```

Example 2 (ts):
```ts
function resolvePath (path: string, options?: ResolvePathOptions): Promise<string>
```

Example 3 (ts):
```ts
import { defineNuxtModule, resolvePath } from '@nuxt/kit'
import { join } from 'pathe'

const headlessComponents: ComponentGroup[] = [
  {
    relativePath: 'combobox/combobox.js',
    chunkName: 'headlessui/combobox',
    exports: [
      'Combobox',
      'ComboboxLabel',
      'ComboboxButton',
      'ComboboxInput',
      'ComboboxOptions',
      'ComboboxOption',
    ],
  },
]

export default defineNuxtModule({
  meta: {
    name: 'nuxt-headlessui',
    configKey: 'headlessui',
  },
  defaults: {
    prefix: 'Headless',
  },
  async setup (options) {
    const entrypoint = await resolvePath('@headlessui/vue')
    const root = join(entrypoint, '../components')

    for (const group of headlessComponents) {
      for (const e of group.exports) {
        addComponent(
          {
            name: e,
            export: e,
            filePath: join(root, group.relativePath),
            chunkName: group.chunkName,
            mode: 'all',
          },
        )
      }
    }
  },
})
```

Example 4 (ts):
```ts
function resolveAlias (path: string, alias?: Record<string, string>): string
```

---

## Nuxt 3.18

**URL:** llms-txt#nuxt-3.18

**Contents:**
- 🧪 Lazy Hydration Macros
- ♿️ Accessibility Improvements
- 🛠️ Enhanced Development Experience
  - Chrome DevTools Workspace Integration
  - Better Component Type Safety
  - New Auto-Import: `onWatcherCleanup`
- 📊 Observability Enhancements
- 🔧 Module Development Improvements
  - Simplified Server Imports
  - TypeScript Configuration

## 🧪 Lazy Hydration Macros

Building on the delayed hydration support from v3.16, we now support **lazy hydration macros** ([#31192](https://github.com/nuxt/nuxt/pull/31192){rel="&#x22;nofollow&#x22;"})! These provide a more ergonomic way to control component hydration:

These macros make it possible to use Nuxt's lazy hydration utilities alongside explicit component imports.

## ♿️ Accessibility Improvements

We've enhanced accessibility by including `<NuxtRouteAnnouncer>` in the built-in `app.vue` ([#32621](https://github.com/nuxt/nuxt/pull/32621){rel="&#x22;nofollow&#x22;"}). This means page changes will be announced to screen readers, making navigation more accessible for users with visual impairments. (This only applies if you do not have an `app.vue` in your project. If you do, please keep `<NuxtRouteAnnouncer>` in your `app.vue`!)

## 🛠️ Enhanced Development Experience

### Chrome DevTools Workspace Integration

We've added **Chrome DevTools workspace integration** ([#32084](https://github.com/nuxt/nuxt/pull/32084){rel="&#x22;nofollow&#x22;"}), allowing you to edit your Nuxt source files directly from Chrome DevTools. This creates a better debugging experience where changes made in DevTools are reflected in your actual source files.

### Better Component Type Safety

Component type safety has been improved with:

- **Typed slots for `<ClientOnly>` and `<DevOnly>`** ([#32707](https://github.com/nuxt/nuxt/pull/32707){rel="&#x22;nofollow&#x22;"}) - better IntelliSense and error checking
- **Exported `<NuxtTime>` prop types** ([#32547](https://github.com/nuxt/nuxt/pull/32547){rel="&#x22;nofollow&#x22;"}) - easier to extend and customize

### New Auto-Import: `onWatcherCleanup`

The `onWatcherCleanup` function from `vue` is now available as an auto-import ([#32396](https://github.com/nuxt/nuxt/pull/32396){rel="&#x22;nofollow&#x22;"}), making it easier to clean up watchers and prevent memory leaks:

## 📊 Observability Enhancements

Page routes are now **exposed to Nitro for observability** ([#32617](https://github.com/nuxt/nuxt/pull/32617){rel="&#x22;nofollow&#x22;"}), enabling better monitoring and analytics integration with supported platforms. This allows observability tools to track page-level metrics more effectively.

## 🔧 Module Development Improvements

Module authors get several quality-of-life improvements:

### Simplified Server Imports

The `addServerImports` kit utility now **supports single imports** ([#32289](https://github.com/nuxt/nuxt/pull/32289){rel="&#x22;nofollow&#x22;"}), making it easier to add individual server utilities:

### TypeScript Configuration

Modules can now &#x2A;*add to `typescript.hoist`** ([#32601](https://github.com/nuxt/nuxt/pull/32601){rel="&#x22;nofollow&#x22;"}), giving them more control over TypeScript configuration and type generation.

## ⚡️ Performance Improvements

We've made several performance optimizations:

- **Improved Vite-node communication** via internal socket ([#32417](https://github.com/nuxt/nuxt/pull/32417){rel="&#x22;nofollow&#x22;"}) for faster development builds
- **Migration to `oxc-walker`** ([#32250](https://github.com/nuxt/nuxt/pull/32250){rel="&#x22;nofollow&#x22;"}) and **oxc for `onPrehydrate` transforms** ([#32045](https://github.com/nuxt/nuxt/pull/32045){rel="&#x22;nofollow&#x22;"}) for faster code transformations

This release also includes several important fixes:

- **Improved data fetching**: When computed keys change, old data is now properly retained ([#32616](https://github.com/nuxt/nuxt/pull/32616){rel="&#x22;nofollow&#x22;"})
- **Better scroll behavior**: `scrollBehaviorType` is now only used for hash scrolling ([#32622](https://github.com/nuxt/nuxt/pull/32622){rel="&#x22;nofollow&#x22;"})
- **Fixed directory aliases**: Added trailing slashes to some directory aliases for better consistency ([#32755](https://github.com/nuxt/nuxt/pull/32755){rel="&#x22;nofollow&#x22;"})

As usual, our recommendation for upgrading is to run:

This refreshes your lockfile and pulls in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## Full release notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.18.0
---
Read the full release notes of Nuxt `v3.18.0`.
::

A huge thank you to everyone who's been a part of this release. Over the next six months, we'll continue backporting compatible v4 features and bug fixes, so please keep the feedback coming! ❤️

**Examples:**

Example 1 (vue):
```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue')
)
</script>
<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is 100px away from entering the viewport.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

Example 2 (ts):
```ts
const { data } = useAsyncData('users', fetchUsers)

watch(data, (newData) => {
  const interval = setInterval(() => {
    // Some periodic task
  }, 1000)

  // Clean up when the watcher is stopped
  onWatcherCleanup(() => {
    clearInterval(interval)
  })
})
```

Example 3 (ts):
```ts
// Before: had to wrap in array
addServerImports([{ from: 'my-package', name: 'myUtility' }])

// Now: can pass directly
addServerImports({ from: 'my-package', name: 'myUtility' })
```

Example 4 (sh):
```sh
npx nuxi@latest upgrade --dedupe
```

---

## navigateTo

**URL:** llms-txt#navigateto

**Contents:**
- Usage
  - Within a Vue Component
  - Within Route Middleware
  - Navigating to an External URL
  - Opening a Page in a New Tab
- Type
- Parameters
  - `to`
  - `options` (optional)

`navigateTo` is available on both server side and client side. It can be used within the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context), or directly, to perform page navigation.

::warning
Make sure to always use `await` or `return` on result of `navigateTo` when calling it.
::

::note
`navigateTo` cannot be used within Nitro routes. To perform a server-side redirect in Nitro routes, use [`sendRedirect`](https://h3.dev/utils/response#sendredirectevent-location-code){rel=""nofollow""} instead.
::

### Within a Vue Component

### Within Route Middleware

When using `navigateTo` within route middleware, you must **return its result** to ensure the middleware execution flow works correctly.

For example, the following implementation **will not work as expected**:

In this case, `navigateTo` will be executed but not returned, which may lead to unexpected behavior.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

### Navigating to an External URL

The `external` parameter in `navigateTo` influences how navigating to URLs is handled:

- **Without `external: true`**:

- Internal URLs navigate as expected.
  - External URLs throw an error.
- **With `external: true`**:

- Internal URLs navigate with a full-page reload.
  - External URLs navigate as expected.

### Opening a Page in a New Tab

**Type**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions){rel="&#x22;nofollow&#x22;"} | `undefined` | `null`

`to` can be a plain string or a route object to redirect to. When passed as `undefined` or `null`, it will default to `'/'`.

### `options` (optional)

**Type**: `NavigateToOptions`

An object accepting the following properties:

- `replace`
- **Type**: `boolean`
- **Default**: `false`
- By default, `navigateTo` pushes the given route into the Vue Router's instance on the client side.

- `redirectCode`
- **Type**: `number`
- **Default**: `302`
- `navigateTo` redirects to the given path and sets the redirect code to [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302){rel="&#x22;nofollow&#x22;"} by default when the redirection takes place on the server side.

- `external`
- **Type**: `boolean`
- **Default**: `false`
- Allows navigating to an external URL when set to `true`. Otherwise, `navigateTo` will throw an error, as external navigation is not allowed by default.
- `open`
- **Type**: `OpenOptions`
- Allows navigating to the URL using the [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open){rel="&#x22;nofollow&#x22;"} method of the window. This option is only applicable on the client side and will be ignored on the server side.

**Examples:**

Example 1 (vue):
```vue
<script setup lang="ts">
// passing 'to' as a string
await navigateTo('/search')

// ... or as a route object
await navigateTo({ path: '/search' })

// ... or as a route object with query parameters
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

Example 2 (ts):
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

Example 3 (ts):
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ This will not work as expected
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

Example 4 (vue):
```vue
<script setup lang="ts">
// will throw an error;
// navigating to an external URL is not allowed by default
await navigateTo('https://nuxt.com')

// will redirect successfully with the 'external' parameter set to 'true'
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

---

## onNuxtReady

**URL:** llms-txt#onnuxtready

::important
`onNuxtReady` only runs on the client-side. :br
It is ideal for running code that should not block the initial rendering of your app.
::

It is 'safe' to run even after your app has initialized. In this case, then the code will be registered to run in the next idle callback.

---

## SIDESTREAM

**URL:** llms-txt#sidestream

We develop the best Nuxt 3 software for you.

How? You’ll work directly with a Nuxt-Insider and 25+ Nuxt3 experts who shipped 50+ Nuxt projects.

We are the creators of sidebase - The productive way to build fullstack Nuxt 3 applications.

We specialize in Nuxt 3 and Fullstack TypeScript Development.

---

## Nuxt 4.2

**URL:** llms-txt#nuxt-4.2

**Contents:**
- 🎯 Abort Control for Data Fetching
- 🎨 Better Error Pages in Development
- 🔮 Opt-in Vite Environment API
- 📦 New `@nuxt/nitro-server` Package
- ⚡ Performance Improvements
  - 📉 Async Data Handler Extraction
- 🔧 Experimental TypeScript Plugin Support
- 🎁 Other Improvements
- 🩹 Important Fixes
- ✅ Upgrading

We're excited to announce Nuxt 4.2, bringing new capabilities for better TypeScript DX, enhanced error handling, and improved control over data fetching! 🎉

## 🎯 Abort Control for Data Fetching

You can now use `AbortController` signals directly within `useAsyncData`, giving you fine-grained control over request cancellation ([#32531](https://github.com/nuxt/nuxt/pull/32531){rel="&#x22;nofollow&#x22;"}).

This works by passing an internal signal to your `useAsyncData` `handler` to cancel any promise that can be canceled, such as `$fetch`.

You also pass an `AbortController` signal directly to `refresh`/`execute`, giving you fine-grained control over request cancellation. This is particularly useful when you need to abort requests based on user actions or component lifecycle events.

## 🎨 Better Error Pages in Development

When an error occurs during development, Nuxt will now display both your custom error page *and* a detailed technical error overlay ([#33359](https://github.com/nuxt/nuxt/pull/33359){rel="&#x22;nofollow&#x22;"}). This gives you the best of both worlds – you can see what your users will experience while also having immediate access to stack traces and debugging information.

![Screenshot of the new development error page](https://nuxt.com/assets/blog/nuxt-error-page.png)

The technical overlay appears as a toggleable panel that doesn't interfere with your custom error page, making it easier to debug issues while maintaining a realistic preview of your error handling.

## 🔮 Opt-in Vite Environment API

For those wanting to experiment with cutting-edge features, you can now opt into the [Vite Environment API](https://vite.dev/guide/api-environment){rel="&#x22;nofollow&#x22;"} ([#33492](https://github.com/nuxt/nuxt/pull/33492){rel="&#x22;nofollow&#x22;"}).

The Vite Environment API is a major architectural improvement in Vite 6. It closes the gap between development and production by allowing the Vite dev server to handle multiple environments concurrently (rather than requiring multiple Vite dev servers, as we have done previously in Nuxt).

This should improve performance when developing and eliminate some edge case bugs.

... and it is the foundation for implementing Nitro as a Vite environment, which should speed up the dev server still further, as well as allowing more greater alignment in development with your Nitro preset.

This is also the first breaking change for Nuxt v5. You can opt in to these breaking changes by setting `compatibilityVersion` to `5`:

Please only use this for testing, as this opts in to unlimited future breaking changes, including updating to Nitro v3 once we ship the Nuxt integration.

::callout{type="warning"}
This is highly experimental and the API may change. Only enable if you're prepared for potential breaking changes and want to help shape the future of Nuxt!
::

## 📦 New `@nuxt/nitro-server` Package

We've extracted Nitro server integration into its own package: `@nuxt/nitro-server` ([#33462](https://github.com/nuxt/nuxt/pull/33462){rel="&#x22;nofollow&#x22;"}). This architectural change allows for different Nitro integration patterns and paves the way for future innovations in server-side rendering.

While this change is mostly internal, it's part of our ongoing effort to make Nuxt more modular and flexible. The new package provides standalone Nitro integration and sets the foundation for alternative integration approaches (such as using Nitro as a Vite plugin in Nuxt v5+).

::callout{type="info"}
This is an internal refactor – no changes should be required in your code.
::

## ⚡ Performance Improvements

We've also shipped several performance enhancements:

- **Precomputed renderer dependencies** – We now compute renderer dependencies at build time rather than runtime, improving cold start and initial render performance ([#33361](https://github.com/nuxt/nuxt/pull/33361){rel="&#x22;nofollow&#x22;"})
- **Reduced dependencies** – Removed unnecessary dependencies from kit and schema packages ([7ae2cf563](https://github.com/nuxt/nuxt/commit/7ae2cf563){rel="&#x22;nofollow&#x22;"})

### 📉 Async Data Handler Extraction

One of the most exciting performance improvements is the new experimental async data handler extraction ([#33131](https://github.com/nuxt/nuxt/pull/33131){rel="&#x22;nofollow&#x22;"}). When enabled, handler functions passed to `useAsyncData` and `useLazyAsyncData` are automatically extracted into separate chunks and dynamically imported.

This is **particularly effective for prerendered static sites**, as the data fetching logic is only needed at build time and can be completely excluded from the client bundle.

::callout{type="info"}
In testing with a previous version of nuxt.com, this feature **reduced JavaScript bundle size by 39%**! Of course, your mileage may vary depending on how much data fetching logic you have.
::

For static/prerendered sites, enable it in your config:

The extracted handlers are then tree-shaken from your client bundle when prerendering, as the data is already available in the payload. This results in significantly smaller JavaScript files shipped to your users.

## 🔧 Experimental TypeScript Plugin Support

We're introducing experimental support for enhanced TypeScript developer experience through the [`@dxup/nuxt`](https://github.com/KazariEX/dxup){rel="&#x22;nofollow&#x22;"} module.

This module adds a number of TypeScript plugins that aim to improve your experience when using Nuxt-specific features:

- **Smart component renaming**: Automatically updates all references when you rename auto-imported component files
- **Go to definition for dynamic imports**: Navigate directly to files when using glob patterns like ``import(`~/assets/${name}.webp`)``
- **Nitro route navigation**: Jump to server route handlers from data fetching functions (`$fetch`, `useFetch`, `useLazyFetch`)
- **Runtime config navigation**: Go to definition works seamlessly with runtime config properties
- **Enhanced auto-import support**: Includes the [`@dxup/unimport`](https://github.com/KazariEX/dxup/tree/main/packages/unimport){rel="&#x22;nofollow&#x22;"} plugin for better navigation with auto-imported composables and utilities

::note
---
to: https://nuxt.com/docs/guide/going-further/experimental-features#typescriptplugin
---
Read more in **[the documentation](https://nuxt.com/docs/guide/going-further/experimental-features#typescriptplugin)**.
::

To enable this feature, set `experimental.typescriptPlugin` to `true` in your Nuxt configuration:

Once enabled, the module will be automatically installed and configured by Nuxt.

::warning
This feature also requires selecting the workspace TypeScript version in VS Code. Run the "TypeScript: Select TypeScript Version" command and choose "Use Workspace Version".
::

## 🎁 Other Improvements

- **Component `declarationPath`** – You can now specify a custom declaration path for components ([#33419](https://github.com/nuxt/nuxt/pull/33419){rel="&#x22;nofollow&#x22;"})
- **Module resolution extensions** – Kit's `resolveModule` now accepts an `extensions` option ([#33328](https://github.com/nuxt/nuxt/pull/33328){rel="&#x22;nofollow&#x22;"})
- **Global head utility** – New `setGlobalHead` utility in kit for easier head management ([#33512](https://github.com/nuxt/nuxt/pull/33512){rel="&#x22;nofollow&#x22;"})

- Route hash is now preserved when redirecting based on `routeRules` ([#33222](https://github.com/nuxt/nuxt/pull/33222){rel="&#x22;nofollow&#x22;"})
- Fixed concurrent calls to `loadNuxtConfig` with proper cleanup ([#33420](https://github.com/nuxt/nuxt/pull/33420){rel="&#x22;nofollow&#x22;"})
- Object-format `href` now works correctly in `<NuxtLink>` ([c69e4c30d](https://github.com/nuxt/nuxt/commit/c69e4c30d){rel="&#x22;nofollow&#x22;"})
- Component auto-imports now work as arguments to Vue's `h()` function ([#33509](https://github.com/nuxt/nuxt/pull/33509){rel="&#x22;nofollow&#x22;"})
- Fixed app config array handling during HMR ([#33555](https://github.com/nuxt/nuxt/pull/33555){rel="&#x22;nofollow&#x22;"})

Our recommendation for upgrading is to run:

This will refresh your lockfile and pull in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## 👉 Full Release Notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v4.2.0
---
Read the full release notes of Nuxt `v4.2.0`.
::

Thank you for reading this far! We hope you enjoy the new release. Please do let us know if you have any feedback or issues.

**Examples:**

Example 1 (vue):
```vue
<script setup lang="ts">
const { data, error, clear, refresh } = await useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', {
  signal
}))

refresh() // will actually cancel the $fetch request (if dedupe: cancel)

clear() // will cancel the latest pending handler
</script>
```

Example 2 (ts):
```ts
const { data, refresh } = await useAsyncData('posts', fetchPosts)

// Abort an ongoing refresh
const abortController = new AbortController()
refresh({ signal: abortController.signal })

// Later...
abortController.abort()
```

Example 3 (unknown):
```unknown
This is also the first breaking change for Nuxt v5. You can opt in to these breaking changes by setting `compatibilityVersion` to `5`:
```

Example 4 (unknown):
```unknown
Please only use this for testing, as this opts in to unlimited future breaking changes, including updating to Nitro v3 once we ship the Nuxt integration.

::callout{type="warning"}
This is highly experimental and the API may change. Only enable if you're prepared for potential breaking changes and want to help shape the future of Nuxt!
::

## 📦 New `@nuxt/nitro-server` Package

We've extracted Nitro server integration into its own package: `@nuxt/nitro-server` ([#33462](https://github.com/nuxt/nuxt/pull/33462){rel="&#x22;nofollow&#x22;"}). This architectural change allows for different Nitro integration patterns and paves the way for future innovations in server-side rendering.

While this change is mostly internal, it's part of our ongoing effort to make Nuxt more modular and flexible. The new package provides standalone Nitro integration and sets the foundation for alternative integration approaches (such as using Nitro as a Vite plugin in Nuxt v5+).

::callout{type="info"}
This is an internal refactor – no changes should be required in your code.
::

## ⚡ Performance Improvements

We've also shipped several performance enhancements:

- **Precomputed renderer dependencies** – We now compute renderer dependencies at build time rather than runtime, improving cold start and initial render performance ([#33361](https://github.com/nuxt/nuxt/pull/33361){rel="&#x22;nofollow&#x22;"})
- **Reduced dependencies** – Removed unnecessary dependencies from kit and schema packages ([7ae2cf563](https://github.com/nuxt/nuxt/commit/7ae2cf563){rel="&#x22;nofollow&#x22;"})

### 📉 Async Data Handler Extraction

One of the most exciting performance improvements is the new experimental async data handler extraction ([#33131](https://github.com/nuxt/nuxt/pull/33131){rel="&#x22;nofollow&#x22;"}). When enabled, handler functions passed to `useAsyncData` and `useLazyAsyncData` are automatically extracted into separate chunks and dynamically imported.

This is **particularly effective for prerendered static sites**, as the data fetching logic is only needed at build time and can be completely excluded from the client bundle.

::callout{type="info"}
In testing with a previous version of nuxt.com, this feature **reduced JavaScript bundle size by 39%**! Of course, your mileage may vary depending on how much data fetching logic you have.
::
```

---

## Nuxt LLMs.txt

**URL:** llms-txt#nuxt-llms.txt

**Contents:**
- What is LLMs.txt?
- Available routes
- Choosing the Right File
- Important usage notes
- Usage with AI Tools
  - Cursor
  - Windsurf
  - Other AI Tools

LLMs.txt is a structured documentation format specifically designed for large language models (LLMs). Nuxt provides LLMs.txt files that contain comprehensive information about the framework, making it easy for AI tools to understand and assist with Nuxt development.

These files are optimized for AI consumption and contain structured information about concepts, APIs, usage patterns, and best practices.

We provide LLMs.txt routes to help AI tools access our documentation:

- **`/llms.txt`** - Contains a structured overview of all documentation pages and their links (\~5K tokens)
- **`/llms-full.txt`** - Provides comprehensive documentation including getting started guides, API references, blog posts, and deployment guides (\~1M+ tokens)

## Choosing the Right File

::note{icon="i-lucide-info"}
**Most users should start with `/llms.txt`** - it contains all essential information and works with standard LLM context windows.

Use `/llms-full.txt` only if you need comprehensive implementation details and your AI tool supports large contexts (200K+ tokens).
::

## Important usage notes

::warning{icon="i-lucide-alert-triangle"}
**@-symbol must be typed manually** - When using tools like Cursor or Windsurf, the `@` symbol must be typed by hand in the chat interface. Copy-pasting breaks the tool's ability to recognize it as a context reference.
::

## Usage with AI Tools

Nuxt provides specialized LLMs.txt files that you can reference in Cursor for better AI assistance with Nuxt development.

1. **Direct reference**: Mention the LLMs.txt URLs when asking questions
2. Add these specific URLs to your project context using `@docs`

[Read more about Cursor Web and Docs Search](https://cursor.com/docs/context/symbols){rel="&#x22;nofollow&#x22;"}

Windsurf can directly access the Nuxt LLMs.txt files to understand framework usage and best practices.

#### Using LLMs.txt with Windsurf

- Use `@docs` to reference specific LLMs.txt URLs
- Create persistent rules referencing these URLs in your workspace

[Read more about Windsurf Web and Docs Search](https://docs.windsurf.com/windsurf/cascade/web-search){rel="&#x22;nofollow&#x22;"}

Any AI tool that supports LLMs.txt can use these routes to better understand Nuxt.

#### Examples for ChatGPT, Claude, or other LLMs

- "Using Nuxt documentation from <https://nuxt.com/llms.txt>{rel="&#x22;nofollow&#x22;"}"
- "Follow complete Nuxt guidelines from <https://nuxt.com/llms-full.txt>{rel="&#x22;nofollow&#x22;"}"

---

## setResponseStatus

**URL:** llms-txt#setresponsestatus

Nuxt provides composables and utilities for first-class server-side-rendering support.

`setResponseStatus` sets the statusCode (and optionally the statusMessage) of the response.

::important
`setResponseStatus` can only be called in the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
In the browser, `setResponseStatus` will have no effect.
::

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

**Examples:**

Example 1 (ts):
```ts
const event = useRequestEvent()

// event will be undefined in the browser
if (event) {
  // Set the status code to 404 for a custom 404 page
  setResponseStatus(event, 404)

  // Set the status message as well
  setResponseStatus(event, 404, 'Page Not Found')
}
```

---

## Cleavr

**URL:** llms-txt#cleavr

**Contents:**
- Setup
- Learn more

::tip
**Zero Configuration ✨**

Integration with this provider is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

**In your [Cleavr.io](https://cleavr.io/){rel="&#x22;nofollow&#x22;"} panel:**

1. Provision a new server
2. Add a website, selecting **Nuxt 3** as the app type
3. In web app > settings > Code Repo, point to your project's code repository
4. In web app > settings > Environment variables, set `SERVER_PRESET=cleavr`

You're now all set to deploy your project!

::read-more{target="_blank" to="https://nitro.unjs.io/deploy/providers/cleavr"}
Head over **Nitro documentation** to learn more about the cleavr deployment preset.
::

---

## nuxt generate

**URL:** llms-txt#nuxt-generate

**Contents:**
- Arguments
- Options

The `generate` command pre-renders every route of your application and stores the result in plain HTML files that you can deploy on any static hosting services. The command triggers the `nuxt build` command with the `prerender` argument set to `true`

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                             | Default | Description                                                                                                                                          |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--cwd=<directory>`                |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)                                                                     |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level                                                                                                                         |
| `--preset`                         |         | Nitro server preset                                                                                                                                  |
| `--dotenv`                         |         | Path to `.env` file to load, relative to the root directory                                                                                          |
| `--envName`                        |         | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server) |
| `-e, --extends=<layer-name>`       |         | Extend from a Nuxt layer                                                                                                                             |

::read-more
---
to: https://nuxt.com/docs/getting-started/deployment#static-hosting
---
Read more about pre-rendering and static hosting.
::

---

## Nuxt 3.5

**URL:** llms-txt#nuxt-3.5

**Contents:**
- ⚡️ Vue 3.3 released
  - 🙌 Nitropack v2.4
  - 💖 Rich JSON payloads
- 🛝 Interactive server components
- ⏰ Environment config
- 💪 Fully typed pages
- 🔎 'Bundler' module resolution
- ⚗️ Separate server types
- 💀 Deprecations
- ✅ Upgrading

## ⚡️ Vue 3.3 released

Vue 3.3 has been released, with lots of exciting features, particularly around type support.

- new `defineOptions` macro
- 'generic' components
- typed slots and using external types in defineProps
- ... and more

This also brings a significant improvement to data fetching when navigating between nested pages ([#20777](https://github.com/nuxt/nuxt/pull/20777){rel="&#x22;nofollow&#x22;"}), thanks to [@antfu](https://github.com/antfu){rel="&#x22;nofollow&#x22;"} and [@baiwusanyu-c](https://github.com/baiwusanyu-c){rel="&#x22;nofollow&#x22;"}.

Read &#x2A;*[the full release announcement](https://blog.vuejs.org/posts/vue-3-3){rel="&#x22;nofollow&#x22;"}** for more details.

We've been working on lots of improvements to Nitro and these have landed already in Nitro v2.4 - you may already have this upgrade, which contains a lot of bug fixes, updates to the module worker format for Cloudflare, Vercel KV support and more.

One note: if you're deploying to Vercel or Netlify and want to benefit from incremental static regeneration, you should now update your route rules:

Read &#x2A;*[the full release notes](https://github.com/unjs/nitro/releases/tag/v2.4.0){rel="&#x22;nofollow&#x22;"}**.

### 💖 Rich JSON payloads

**Rich JSON payload serialisation** is now enabled by default ([#19205](https://github.com/nuxt/nuxt/pull/19205){rel="&#x22;nofollow&#x22;"}, [#20770](https://github.com/nuxt/nuxt/pull/20770){rel="&#x22;nofollow&#x22;"}). This is both faster and allows serialising complex objects in the payload passed from the Nuxt server to client (and also when extracting payload data for prerendered sites).

This now means that **various rich JS types are supported out-of-the-box**: regular expressions, dates, Map and Set and BigInt as well as NuxtError - and Vue-specific objects like `ref`, `reactive`, `shallowRef` and `shallowReactive`.

You can find [an example](https://github.com/nuxt/nuxt/blob/main/test/fixtures/basic/pages/json-payload.vue){rel="&#x22;nofollow&#x22;"} in our test suite.

This is all possible due to [Rich-Harris/devalue#58](https://github.com/Rich-Harris/devalue/pull/58){rel="&#x22;nofollow&#x22;"}. For a long time, Nuxt has been using our own fork of devalue owing to issues serialising Errors and other non-POJO objects, but we now have transitioned back to the original.

You can even register your own custom types with a new object-syntax Nuxt plugin:

You can read more about how this works [here](https://github.com/rich-harris/devalue#custom-types){rel="&#x22;nofollow&#x22;"}.

## 🛝 Interactive server components

This feature should be considered highly experimental, but thanks to some great work from @huang-julien we now support interactive content within server components via *slots* ([#20284](https://github.com/nuxt/nuxt/pull/20284){rel="&#x22;nofollow&#x22;"}).

You can follow the server component roadmap at [#19772](https://github.com/nuxt/nuxt/issues/19772){rel="&#x22;nofollow&#x22;"}.

## ⏰ Environment config

You can now configure fully typed, per-environment overrides in your `nuxt.config.ts`:

If you're authoring layers, you can also use the `$meta` key to provide metadata that you or the consumers of your layer might use.

Read more [about per-environment overrides](https://github.com/nuxt/nuxt/pull/20329){rel="&#x22;nofollow&#x22;"}.

## 💪 Fully typed pages

You can benefit from fully typed routing within your Nuxt app via this experimental integration with [unplugin-vue-router](https://github.com/posva/unplugin-vue-router){rel="&#x22;nofollow&#x22;"} - thanks to some great work from [@posva](https://github.com/posva){rel="&#x22;nofollow&#x22;"}!

Out of the box, this will enable typed usage of [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to), [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), `router.push()` and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"}.

Enable this feature directly in your `nuxt.config.ts`:

## 🔎 'Bundler' module resolution

We now have full support within Nuxt for the `bundler` strategy of [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html){rel="&#x22;nofollow&#x22;"}.

We would recommend adopting this if possible. It has type support for subpath exports, for example, but more exactly matches the behaviour of build tools like Vite and Nuxt than `Node16` resolution.

This turns on TypeScript's ability to 'follow' Node subpath exports. For example, if a library has a subpath export like `mylib/path` that is mapped to `mylib/dist/path.mjs` then the types for this can be pulled in from `mylib/dist/path.d.ts` rather than requiring the library author to create `mylib/path.d.ts`.

## ⚗️ Separate server types

We plan to improve clarity within your IDE between the 'nitro' and 'vue' part of your app, we've shipped the first part of this via a separate generated `tsconfig.json` for your [`~/server`](https://nuxt.com/docs/guide/directory-structure/server) directory ([#20559](https://github.com/nuxt/nuxt/pull/20559){rel="&#x22;nofollow&#x22;"}).

You can use by adding an additional `~/server/tsconfig.json` with the following content:

Although right now these values won't be respected when type checking (`nuxi typecheck`), you should get better type hints in your IDE.

Although we have not typed or documented the `build.extend` hook from Nuxt 2, we have been calling it within the webpack builder. We are now explicitly deprecating this and will remove it in a future minor version.

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

Read the full release note on <https://github.com/nuxt/nuxt/releases/tag/v3.5.0>{rel="&#x22;nofollow&#x22;"}

**Examples:**

Example 1 (diff):
```diff
routeRules: {
--  '/blog/**': { swr: 3000 },
++  '/blog/**': { isr: 3000 },
}
```

Example 2 (unknown):
```unknown
You can read more about how this works [here](https://github.com/rich-harris/devalue#custom-types){rel="&#x22;nofollow&#x22;"}.

## 🛝 Interactive server components

This feature should be considered highly experimental, but thanks to some great work from @huang-julien we now support interactive content within server components via *slots* ([#20284](https://github.com/nuxt/nuxt/pull/20284){rel="&#x22;nofollow&#x22;"}).

You can follow the server component roadmap at [#19772](https://github.com/nuxt/nuxt/issues/19772){rel="&#x22;nofollow&#x22;"}.

## ⏰ Environment config

You can now configure fully typed, per-environment overrides in your `nuxt.config.ts`:
```

Example 3 (unknown):
```unknown
If you're authoring layers, you can also use the `$meta` key to provide metadata that you or the consumers of your layer might use.

Read more [about per-environment overrides](https://github.com/nuxt/nuxt/pull/20329){rel="&#x22;nofollow&#x22;"}.

## 💪 Fully typed pages

You can benefit from fully typed routing within your Nuxt app via this experimental integration with [unplugin-vue-router](https://github.com/posva/unplugin-vue-router){rel="&#x22;nofollow&#x22;"} - thanks to some great work from [@posva](https://github.com/posva){rel="&#x22;nofollow&#x22;"}!

Out of the box, this will enable typed usage of [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to), [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), `router.push()` and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"}.

Enable this feature directly in your `nuxt.config.ts`:
```

Example 4 (unknown):
```unknown
## 🔎 'Bundler' module resolution

We now have full support within Nuxt for the `bundler` strategy of [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html){rel="&#x22;nofollow&#x22;"}.

We would recommend adopting this if possible. It has type support for subpath exports, for example, but more exactly matches the behaviour of build tools like Vite and Nuxt than `Node16` resolution.
```

---

## Nuxt Image v2

**URL:** llms-txt#nuxt-image-v2

**Contents:**
- 🎯 TypeScript support
  - Typed composables
  - Type-safe configuration
  - Typed providers
- 🚀 IPX v3
- 🔌 Server-side utilities
- 🎨 Component improvements
  - Template refs
  - Typed slots
- 🌐 New providers

We're excited to announce **Nuxt Image v2**! 🎉 This release focuses on TypeScript support, performance improvements, and better developer experience.

::note
Nuxt Image v2 works with Nuxt 3.1+. If you're on Nuxt 3.0.x, you'll need to upgrade to at least 3.1 first.
::

## 🎯 TypeScript support

The biggest change in v2 is full TypeScript support throughout the module ([#1802](https://github.com/nuxt/image/pull/1802){rel="&#x22;nofollow&#x22;"}).

### Typed composables

The `$img` helper and `useImage()` composable have full type inference ([#1844](https://github.com/nuxt/image/pull/1844){rel="&#x22;nofollow&#x22;"}):

### Type-safe configuration

Module options are now fully typed. For example, providers that require a `baseURL` will enforce it at the type level in your `nuxt.config.ts`:

Finally, if you are using custom image providers, you should use the new `defineProvider` for type-safe configuration:

We've upgraded to IPX v3 ([#1799](https://github.com/nuxt/image/pull/1799){rel="&#x22;nofollow&#x22;"}) for better performance and better `sharp` binary handling. The upgrade includes automatic detection of the correct `sharp` binaries for your deployment architecture.

## 🔌 Server-side utilities

You can now use image helpers directly in Nitro server endpoints ([#1473](https://github.com/nuxt/image/pull/1473){rel="&#x22;nofollow&#x22;"}).

## 🎨 Component improvements

`<NuxtImg>` now exposes the underlying `<img>` element via template refs:

Both `<NuxtImg>` and `<NuxtPicture>` now have properly typed default slots.

- `imgAttrs` - All computed image attributes (sizes, srcset, etc.)
- `isLoaded` - Whether the placeholder has loaded
- `src` - The computed image source URL

You can now configure the Shopify provider ([#1890](https://github.com/nuxt/image/pull/1890){rel="&#x22;nofollow&#x22;"}):

This provider lets you inject GitHub avatars and user content ([#1990](https://github.com/nuxt/image/pull/1990){rel="&#x22;nofollow&#x22;"}):

We've made several optimizations to reduce bundle size and improve runtime performance:

- **Better URL encoding** ([#1813](https://github.com/nuxt/image/pull/1813){rel="&#x22;nofollow&#x22;"}) - Switched to `URLSearchParams` for more reliable parameter handling
- **Reduced runtime utilities** ([#1816](https://github.com/nuxt/image/pull/1816){rel="&#x22;nofollow&#x22;"}) - Removed unused code and simplified implementations
- **Streamlined screen sizes** ([#1931](https://github.com/nuxt/image/pull/1931){rel="&#x22;nofollow&#x22;"}) - Aligned default breakpoints with Tailwind CSS

## 🎯 Better layer support

Nuxt Image now properly supports custom image directories within Nuxt layers ([#1880](https://github.com/nuxt/image/pull/1880){rel="&#x22;nofollow&#x22;"}), making it easier to organize images in modular projects.

## ⚠️ Breaking changes

The biggest breaking change is how providers are defined. All providers now use a default export with the `defineProvider` wrapper:

If you maintain a custom provider, you'll need to update it. But you get full TypeScript support in return!

### Removed providers

The deprecated `layer0` and `edgio` providers have been removed.

If you have custom providers using `joinWith` for parameter formatting, you'll need to update them to use the `formatter` function with `createOperationsGenerator`. See the [migration guide](https://image.nuxt.com/get-started/migration#url-formatter-changes){rel="&#x22;nofollow&#x22;"} for details.

Default screen sizes now match Tailwind CSS. We've removed `xs` (320px) and `xxl` (2560px). See the [migration guide](https://image.nuxt.com/get-started/migration#screen-size-changes){rel="&#x22;nofollow&#x22;"} for how to add them back if needed.

### Removed utilities

We've removed several unused runtime utilities. If you were importing internal utilities directly, check if they still exist.

Check out our comprehensive [migration guide](https://image.nuxt.com/get-started/migration){rel="&#x22;nofollow&#x22;"} for step-by-step upgrade instructions.

Most apps can upgrade with no code changes. If you have custom providers, you'll need to update them to use `defineProvider` - see the [migration guide](https://image.nuxt.com/get-started/migration#custom-provider-updates){rel="&#x22;nofollow&#x22;"} for examples.

This release includes several fixes:

- **Preload links**: Fixed preload for multiple densities with single size ([#1851](https://github.com/nuxt/image/pull/1851){rel="&#x22;nofollow&#x22;"})
- **Crossorigin attributes**: Correct crossorigin on preload links ([#1836](https://github.com/nuxt/image/pull/1836){rel="&#x22;nofollow&#x22;"})
- **Provider-specific formats**: AWS Amplify and Vercel providers now have proper format allow lists ([#1996](https://github.com/nuxt/image/pull/1996){rel="&#x22;nofollow&#x22;"})
- **Hygraph**: Prevented broken image URLs ([#1999](https://github.com/nuxt/image/pull/1999){rel="&#x22;nofollow&#x22;"})
- **Preset sizes**: Fixed preset size application when component sizes prop is undefined ([#1919](https://github.com/nuxt/image/pull/1919){rel="&#x22;nofollow&#x22;"})
- **Cloudflare**: Don't add baseURL if there are no operations ([#1790](https://github.com/nuxt/image/pull/1790){rel="&#x22;nofollow&#x22;"})
- **IPX**: Always use IPX provider if external baseURL is provided ([#1800](https://github.com/nuxt/image/pull/1800){rel="&#x22;nofollow&#x22;"})

Thank you to all the contributors who made this release possible! This includes contributions from dozens of community members who helped with features, bug fixes, documentation improvements, and feedback.

- [Documentation](https://image.nuxt.com){rel="&#x22;nofollow&#x22;"}
- [GitHub Repository](https://github.com/nuxt/image){rel="&#x22;nofollow&#x22;"}
- [Migration Guide](https://image.nuxt.com/get-started/migration){rel="&#x22;nofollow&#x22;"}

## 👉 Full release notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/image/releases/tag/v2.0.0
---
Read the full release notes of Nuxt Image `v2.0.0`.
::

Happy optimizing! 🖼️✨

**Examples:**

Example 1 (ts):
```ts
const img = useImage()

// Full autocomplete for modifiers
const url = img('/image.jpg', {
  width: 300,
  height: 200,
  fit: 'cover' // TypeScript knows the valid values!
})
```

Example 2 (unknown):
```unknown
### Typed providers

Finally, if you are using custom image providers, you should use the new `defineProvider` for type-safe configuration:
```

Example 3 (unknown):
```unknown
## 🚀 IPX v3

We've upgraded to IPX v3 ([#1799](https://github.com/nuxt/image/pull/1799){rel="&#x22;nofollow&#x22;"}) for better performance and better `sharp` binary handling. The upgrade includes automatic detection of the correct `sharp` binaries for your deployment architecture.

## 🔌 Server-side utilities

You can now use image helpers directly in Nitro server endpoints ([#1473](https://github.com/nuxt/image/pull/1473){rel="&#x22;nofollow&#x22;"}).
```

Example 4 (unknown):
```unknown
## 🎨 Component improvements

### Template refs

`<NuxtImg>` now exposes the underlying `<img>` element via template refs:
```

---

## app.config.ts

**URL:** llms-txt#app.config.ts

**Contents:**
- Usage
- Typing App Config
  - App Config Input
  - App Config Output
- Merging Strategy
- Known Limitations

Nuxt provides an `app.config` config file to expose reactive configuration within your application with the ability to update it at runtime within lifecycle or using a nuxt plugin and editing it with HMR (hot-module-replacement).

You can easily provide runtime app configuration using `app.config.ts` file. It can have either of `.ts`, `.js`, or `.mjs` extensions.

::caution
Do not put any secret values inside `app.config` file. It is exposed to the user client bundle.
::

::note
When configuring a custom [`srcDir`](https://nuxt.com/docs/3.x/api/nuxt-config#srcdir), make sure to place the `app.config` file at the root of the new `srcDir` path.
::

To expose config and environment variables to the rest of your app, you will need to define configuration in `app.config` file.

We can now universally access `theme` both when server-rendering the page and in the browser using [`useAppConfig`](https://nuxt.com/docs/3.x/api/composables/use-app-config) composable.

The [`updateAppConfig`](https://nuxt.com/docs/3.x/api/utils/update-app-config) utility can be used to update the `app.config` at runtime.

::read-more{to="https://nuxt.com/docs/api/utils/update-app-config"}
Read more about the `updateAppConfig` utility.
::

Nuxt tries to automatically generate a TypeScript interface from provided app config so you won't have to type it yourself.

However, there are some cases where you might want to type it yourself. There are two possible things you might want to type.

`AppConfigInput` might be used by module authors who are declaring what valid *input* options are when setting app config. This will not affect the type of `useAppConfig()`.

### App Config Output

If you want to type the result of calling [`useAppConfig()`](https://nuxt.com/docs/3.x/api/composables/use-app-config), then you will want to extend `AppConfig`.

::warning
Be careful when typing `AppConfig` as you will overwrite the types Nuxt infers from your actually defined app config.
::

Nuxt uses a custom merging strategy for the `AppConfig` within [the layers](https://nuxt.com/docs/3.x/getting-started/layers) of your application.

This strategy is implemented using a [Function Merger](https://github.com/unjs/defu#function-merger){rel="&#x22;nofollow&#x22;"}, which allows defining a custom merging strategy for every key in `app.config` that has an array as value.

::note
The function merger can only be used in the extended layers and not the main `app.config` in project.
::

Here's an example of how you can use:

As of Nuxt v3.3, the `app.config.ts` file is shared with Nitro, which results in the following limitations:

1. You cannot import Vue components directly in `app.config.ts`.
2. Some auto-imports are not available in the Nitro context.

These limitations occur because Nitro processes the app config without full Vue component support.

While it's possible to use Vite plugins in the Nitro config as a workaround, this approach is not recommended:

::warning
Using this workaround may lead to unexpected behavior and bugs. The Vue plugin is one of many that are not available in the Nitro context.
::

- [Issue #19858](https://github.com/nuxt/nuxt/issues/19858){rel="&#x22;nofollow&#x22;"}
- [Issue #19854](https://github.com/nuxt/nuxt/issues/19854){rel="&#x22;nofollow&#x22;"}

::note
Nitro v3 will resolve these limitations by removing support for the app config.
You can track the progress in [this pull request](https://github.com/nitrojs/nitro/pull/2521){rel=""nofollow""}.
::

**Examples:**

Example 1 (unknown):
```unknown
::caution
Do not put any secret values inside `app.config` file. It is exposed to the user client bundle.
::

::note
When configuring a custom [`srcDir`](https://nuxt.com/docs/3.x/api/nuxt-config#srcdir), make sure to place the `app.config` file at the root of the new `srcDir` path.
::

## Usage

To expose config and environment variables to the rest of your app, you will need to define configuration in `app.config` file.
```

Example 2 (unknown):
```unknown
We can now universally access `theme` both when server-rendering the page and in the browser using [`useAppConfig`](https://nuxt.com/docs/3.x/api/composables/use-app-config) composable.
```

Example 3 (unknown):
```unknown
The [`updateAppConfig`](https://nuxt.com/docs/3.x/api/utils/update-app-config) utility can be used to update the `app.config` at runtime.
```

Example 4 (unknown):
```unknown
::read-more{to="https://nuxt.com/docs/api/utils/update-app-config"}
Read more about the `updateAppConfig` utility.
::

## Typing App Config

Nuxt tries to automatically generate a TypeScript interface from provided app config so you won't have to type it yourself.

However, there are some cases where you might want to type it yourself. There are two possible things you might want to type.

### App Config Input

`AppConfigInput` might be used by module authors who are declaring what valid *input* options are when setting app config. This will not affect the type of `useAppConfig()`.
```

---

## Error Handling

**URL:** llms-txt#error-handling

::read-more{to="https://nuxt.com/docs/getting-started/error-handling"}
::

::sandbox
---
branch: main
dir: examples/advanced/error-handling
file: app.vue
repo: nuxt/examples
---
::

---

## Build Tooling

**URL:** llms-txt#build-tooling

**Contents:**
- Steps

We use the following build tools by default:

- [Vite](https://vite.dev){rel="&#x22;nofollow&#x22;"} or [webpack](https://webpack.js.org){rel="&#x22;nofollow&#x22;"}
- [Rollup](https://rollupjs.org){rel="&#x22;nofollow&#x22;"}
- [PostCSS](https://postcss.org){rel="&#x22;nofollow&#x22;"}
- [esbuild](https://esbuild.github.io){rel="&#x22;nofollow&#x22;"}

For this reason, most of your previous `build` configuration in `nuxt.config` will now be ignored, including any custom babel configuration.

If you need to configure any of Nuxt's build tools, you can do so in your `nuxt.config`, using the new top-level `vite`, `webpack` and `postcss` keys.

In addition, Nuxt ships with TypeScript support.

::read-more{to="https://nuxt.com/docs/guide/concepts/typescript"}
::

1. Remove `@nuxt/typescript-build` and `@nuxt/typescript-runtime` from your dependencies and modules.
2. Remove any unused babel dependencies from your project.
3. Remove any explicit core-js dependencies.
4. Migrate `require` to `import`.

---

## nuxt devtools

**URL:** llms-txt#nuxt-devtools

**Contents:**
- Arguments
- Options

Running `nuxt devtools enable` will install the Nuxt DevTools globally, and also enable it within the particular project you are using. It is saved as a preference in your user-level `.nuxtrc`. If you want to remove devtools support for a particular project, you can run `nuxt devtools disable`.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `COMMAND`     | Command to run (options: \<enable\|disable>)   |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option              | Default | Description                                                                      |
| ------------------- | ------- | -------------------------------------------------------------------------------- |
| `--cwd=<directory>` |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |

::read-more
---
icon: i-simple-icons-nuxtdotjs
target: \_blank
to: https://devtools.nuxt.com
---
Read more about the **Nuxt DevTools**.
::

---

## Disable SSR

**URL:** llms-txt#disable-ssr

---

## Misc

**URL:** llms-txt#misc

---

## https://github.com/actions/deploy-pages#usage

**URL:** llms-txt#https://github.com/actions/deploy-pages#usage

name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      # Pick your own package manager and build script
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  # Deployment job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write      # to deploy to Pages
      id-token: write   # to verify the deployment originates from an appropriate source
    # Deploy to the github_pages environment
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

::read-more
---
target: _blank
to: https://nitro.unjs.io/deploy/providers/github-pages
---
Head over **Nitro documentation** to learn more about the github-pages deployment preset.
::

---

## Pages

**URL:** llms-txt#pages

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
::

::sandbox
---
branch: main
dir: examples/routing/pages
file: app.vue
repo: nuxt/examples
---
::

---

## Nuxt Kit

**URL:** llms-txt#nuxt-kit

**Contents:**
- Usage
  - Install Dependency
  - Import Kit Utilities

Nuxt Kit provides composable utilities to make interacting with [Nuxt Hooks](https://nuxt.com/docs/3.x/api/advanced/hooks), the [Nuxt Interface](https://nuxt.com/docs/3.x/guide/going-further/internals#the-nuxt-interface) and developing [Nuxt Modules](https://nuxt.com/docs/3.x/guide/going-further/modules) super easy.

::read-more{to="https://nuxt.com/docs/api/kit"}
Discover all Nuxt Kit utilities.
::

### Install Dependency

You can install the latest Nuxt Kit by adding it to the `dependencies` section of your `package.json`. However, please consider always explicitly installing the `@nuxt/kit` package even if it is already installed by Nuxt.

::note
`@nuxt/kit` and `@nuxt/schema` are key dependencies for Nuxt. If you are installing it separately, make sure that the versions of `@nuxt/kit` and `@nuxt/schema` are equal to or greater than your `nuxt` version to avoid any unexpected behavior.
::

### Import Kit Utilities

::read-more{to="https://nuxt.com/docs/api/kit"}
::

::note
Nuxt Kit utilities are only available for modules and not meant to be imported in runtime (components, Vue composables, pages, plugins, or server routes).
::

Nuxt Kit is an [esm-only package](https://nuxt.com/docs/3.x/guide/concepts/esm) meaning that you **cannot** `require('@nuxt/kit')`. As a workaround, use dynamic import in the CommonJS context:

**Examples:**

Example 1 (unknown):
```unknown
### Import Kit Utilities
```

Example 2 (unknown):
```unknown
::read-more{to="https://nuxt.com/docs/api/kit"}
::

::note
Nuxt Kit utilities are only available for modules and not meant to be imported in runtime (components, Vue composables, pages, plugins, or server routes).
::

Nuxt Kit is an [esm-only package](https://nuxt.com/docs/3.x/guide/concepts/esm) meaning that you **cannot** `require('@nuxt/kit')`. As a workaround, use dynamic import in the CommonJS context:
```

---

## .nuxtignore

**URL:** llms-txt#.nuxtignore

**Contents:**
- Usage

The `.nuxtignore` file tells Nuxt to ignore files in your project’s root directory ([`rootDir`](https://nuxt.com/docs/3.x/api/nuxt-config#rootdir)) during the build phase.

It is subject to the same specification as [`.gitignore`](https://nuxt.com/docs/3.x/directory-structure/gitignore) and `.eslintignore` files, in which each line is a glob pattern indicating which files should be ignored.

::tip
You can also configure [`ignoreOptions`](https://nuxt.com/docs/3.x/api/nuxt-config#ignoreoptions), [`ignorePrefix`](https://nuxt.com/docs/3.x/api/nuxt-config#ignoreprefix) and [`ignore`](https://nuxt.com/docs/3.x/api/nuxt-config#ignore) in your `nuxt.config` file.
::

```bash [.nuxtignore]

---

## Logs

**URL:** llms-txt#logs

---

## Nuxt 2: From Terminal to Browser

**URL:** llms-txt#nuxt-2:-from-terminal-to-browser

**Contents:**
- Problems
- Solutions
- Nuxt Vision

> Nuxt is a Vue.js framework to create different kind of web applications with the **same directory structure & conventions**: Universal, Single Page, PWA or Static Generated.

*ℹ️ These features are all available with [v2.8.0 release](https://github.com/nuxt/nuxt.js/releases/tag/v2.8.0){rel="&#x22;nofollow&#x22;"}.*

1. Developing JavaScript applications with Webpack or any bundler requires to switch between your browser and terminal for debugging purpose.
2. Using `console.log` to debug when the app is server rendered requires to remember that logs will be displayed on the terminal when refreshing the page.

1. Forwarding Webpack build state right in the browser and display them in a fancy manner.

![forward-webpack-build-state](https://nuxt.com/assets/blog/forward-webpack-build-state.gif){.rounded-lg.border.border-gray-700}

2. Same for Hot Module Replacement (really useful when the project gets bigger and takes more time to re-build).

![nuxt-build-indicator-hmr](https://nuxt.com/assets/blog/nuxt-build-indicator-hmr.gif){.rounded-lg.border.border-gray-700}

3. Forwarding SSR logs to the browser in development mode

![nuxt-ssr-logs-forwarding](https://nuxt.com/assets/blog/nuxt-ssr-logs-forwarding.gif){.rounded-lg.border.border-gray-700}

The purpose to these changes is to use the terminal for commands only.

Now you can focus right on your code and its visual result 🙂

> Be lazy, be smart, be Nuxt.

- Nuxt 2 docs: <https://v2.nuxt.com>{rel="&#x22;nofollow&#x22;"}
- GitHub: <https://github.com/nuxt/nuxt.js>{rel="&#x22;nofollow&#x22;"}
- Loading Screen source code: <https://github.com/nuxt/loading-screen>{rel="&#x22;nofollow&#x22;"}
- Twitter: <https://x.com/nuxt_js>{rel="&#x22;nofollow&#x22;"}

---

## abortNavigation

**URL:** llms-txt#abortnavigation

**Contents:**
- Type
- Parameters
  - `err`
- Examples
  - `err` as a String
  - `err` as an Error Object

::warning
`abortNavigation` is only usable inside a [route middleware handler](https://nuxt.com/docs/3.x/directory-structure/middleware).
::

- **Type**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error){rel="&#x22;nofollow&#x22;"} | `string`

Optional error to be thrown by `abortNavigation`.

The example below shows how you can use `abortNavigation` in a route middleware to prevent unauthorized route access:

### `err` as a String

You can pass the error as a string:

### `err` as an Error Object

You can pass the error as an [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error){rel="&#x22;nofollow&#x22;"} object, e.g. caught by the `catch`-block:

**Examples:**

Example 1 (unknown):
```unknown
## Parameters

### `err`

- **Type**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error){rel="&#x22;nofollow&#x22;"} | `string`

Optional error to be thrown by `abortNavigation`.

## Examples

The example below shows how you can use `abortNavigation` in a route middleware to prevent unauthorized route access:
```

Example 2 (unknown):
```unknown
### `err` as a String

You can pass the error as a string:
```

Example 3 (unknown):
```unknown
### `err` as an Error Object

You can pass the error as an [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error){rel="&#x22;nofollow&#x22;"} object, e.g. caught by the `catch`-block:
```

---

## Nuxt 3.16

**URL:** llms-txt#nuxt-3.16

**Contents:**
- ⚡️ A New New Nuxt
- 🚀 Unhead v2
- 🔧 Devtools v2 Upgrade
- ⚡️ Performance Improvements
- 🕰️ Delayed Hydration Support
- 🧩 Advanced Pages Configuration
- 🔍 Enhanced Debugging
- 🎨 Decorators Support
- 📛 Named Layer Aliases
- 🧪 Error Handling Improvements

There's a lot in this one!

Say hello to `create-nuxt`, a new tool for starting Nuxt projects (big thanks to [@devgar](https://github.com/devgar){rel="&#x22;nofollow&#x22;"} for donating the package name)!

It's a streamlined version of `nuxi init` - just a sixth of the size and bundled as a single file with all dependencies inlined, to get you going as fast as possible.

Starting a new project is as simple as:

![screenshot of create nuxt app](https://nuxt.com/assets/blog/create-nuxt-ascii.jpeg){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Special thanks to [@cmang](https://github.com/cmang){rel="&#x22;nofollow&#x22;"} for the [beautiful ASCII-art](https://bsky.app/profile/durdraw.org/post/3liadod3gv22a){rel="&#x22;nofollow&#x22;"}. ❤️

Want to learn more about where we're headed with the Nuxt CLI? Check out our roadmap [here](https://github.com/nuxt/cli/issues/648){rel="&#x22;nofollow&#x22;"}, including our plans for an [interactive modules selector](https://github.com/nuxt/cli/issues/754){rel="&#x22;nofollow&#x22;"}.

We've upgraded to `unhead` v2, the engine behind Nuxt's `<head>` management. This major version removes deprecations and improves how context works:

- For Nuxt 3 users, we're shipping a legacy compatibility build so nothing breaks
- The context implementation is now more direct via Nuxt itself

If you're using Unhead directly in your app, keep in mind:

1. Import from Nuxt's auto-imports or `#app/composables/head` instead of `@unhead/vue`
2. Importing directly from `@unhead/vue` might lose async context

Don't worry though - we've maintained backward compatibility in Nuxt 3, so most users won't need to change anything!

If you've opted into `compatibilityVersion: 4`, check out [our upgrade guide](https://nuxt.com/docs/getting-started/upgrade#unhead-v2) for additional changes.

## 🔧 Devtools v2 Upgrade

Nuxt Devtools has leveled up to v2 ([#30889](https://github.com/nuxt/nuxt/pull/30889){rel="&#x22;nofollow&#x22;"})!

You'll love the new features like custom editor selection, Discovery.js for inspecting resolved configs (perfect for debugging), the return of the schema generator, and slimmer dependencies.

One of our favorite improvements is the ability to track how modules modify your Nuxt configuration - giving you X-ray vision into what's happening under the hood.

👉 Discover all the details in the [Nuxt DevTools release notes](https://github.com/nuxt/devtools/releases){rel="&#x22;nofollow&#x22;"}.

## ⚡️ Performance Improvements

We're continuing to make Nuxt faster, and there are a number of improvements in v3.16:

1. Using [`exsolve`](https://github.com/unjs/exsolve){rel="&#x22;nofollow&#x22;"} for module resolution ([#31124](https://github.com/nuxt/nuxt/pull/31124){rel="&#x22;nofollow&#x22;"}) along with the rest of the unjs ecosystem (nitro, c12, pkg-types, and more) - which dramatically speeds up module resolution
2. Smarter module resolution paths ([#31037](https://github.com/nuxt/nuxt/pull/31037){rel="&#x22;nofollow&#x22;"}) - prioritizes direct imports for better efficiency
3. Eliminated duplicated Nitro alias resolution ([#31088](https://github.com/nuxt/nuxt/pull/31088){rel="&#x22;nofollow&#x22;"}) - leaner file handling
4. Streamlined `loadNuxt` by skipping unnecessary resolution steps ([#31176](https://github.com/nuxt/nuxt/pull/31176){rel="&#x22;nofollow&#x22;"}) - faster startups
5. Adopt `oxc-parser` for parsing in Nuxt plugins ([#30066](https://github.com/nuxt/nuxt/pull/30066){rel="&#x22;nofollow&#x22;"})

All these speed boosts happen automatically - no configuration needed!

Shout out to [CodSpeed](https://codspeed.io/){rel="&#x22;nofollow&#x22;"} with [Vitest benchmarking](https://vitest.dev/guide/features.html#benchmarking){rel="&#x22;nofollow&#x22;"} to measure these improvements in CI - it has been really helpful.

To add some anecdotal evidence, my personal site at [roe.dev](https://github.com/danielroe/roe.dev){rel="&#x22;nofollow&#x22;"} loads 32% faster with v3.16, and [nuxt.com](https://github.com/nuxt/nuxt.com){rel="&#x22;nofollow&#x22;"} is 28% faster. I hope you see similar results! ⚡️

## 🕰️ Delayed Hydration Support

We're very pleased to bring you native delayed/lazy hydration support ([#26468](https://github.com/nuxt/nuxt/pull/26468){rel="&#x22;nofollow&#x22;"})! This lets you control exactly when components hydrate, which can improve initial load performance and time-to-interactive. We're leveraging Vue's built-in hydration strategies - [check them out in the Vue docs](https://vuejs.org/guide/components/async.html#lazy-hydration){rel="&#x22;nofollow&#x22;"}.

You can also listen for when hydration happens with the `@hydrated` event:

Learn more about lazy hydration in [our components documentation](https://nuxt.com/docs/guide/directory-structure/components#delayed-or-lazy-hydration).

## 🧩 Advanced Pages Configuration

You can now fine-tune which files Nuxt scans for pages ([#31090](https://github.com/nuxt/nuxt/pull/31090){rel="&#x22;nofollow&#x22;"}), giving you more control over your project structure:

## 🔍 Enhanced Debugging

We've made debugging with the `debug` option more flexible! Now you can enable just the debug logs you need ([#30578](https://github.com/nuxt/nuxt/pull/30578){rel="&#x22;nofollow&#x22;"}):

Or keep it simple with `debug: true` to enable all these debugging features.

## 🎨 Decorators Support

For the decorator fans out there (whoever you are!), we've added experimental support ([#27672](https://github.com/nuxt/nuxt/pull/27672){rel="&#x22;nofollow&#x22;"}). As with all experimental features, feedback is much appreciated.

## 📛 Named Layer Aliases

It's been much requested, and it's here! Auto-scanned local layers (from your `~~/layers` directory) now automatically create aliases. You can access your `~~/layers/test` layer via `#layers/test` ([#30948](https://github.com/nuxt/nuxt/pull/30948){rel="&#x22;nofollow&#x22;"}) - no configuration needed.

If you want named aliases for other layers, you can add a name to your layer configuration:

This creates the alias `#layers/example-layer` pointing to your layer - making imports cleaner and more intuitive.

## 🧪 Error Handling Improvements

We've greatly improved error messages and source tracking ([#31144](https://github.com/nuxt/nuxt/pull/31144){rel="&#x22;nofollow&#x22;"}):

1. Better warnings for undefined `useAsyncData` calls with precise file location information
2. Error pages now appear correctly on island page errors ([#31081](https://github.com/nuxt/nuxt/pull/31081){rel="&#x22;nofollow&#x22;"})

Plus, we're now using Nitro's beautiful error handling (powered by [youch](https://github.com/poppinss/youch){rel="&#x22;nofollow&#x22;"}) to provide more helpful error messages in the terminal, complete with stacktrace support.

Nitro now also automatically applies source maps without requiring extra Node options, and we set appropriate security headers when rendering error pages.

## 📦 Module Development Improvements

For module authors, we've added the ability to augment Nitro types with `addTypeTemplate` ([#31079](https://github.com/nuxt/nuxt/pull/31079){rel="&#x22;nofollow&#x22;"}):

## ⚙️ Nitro v2.11 Upgrade

We've upgraded to Nitro v2.11. There are so many improvements - more than I can cover in these brief release notes.

👉 Check out all the details in the [Nitro v2.11.0 release notes](https://github.com/nitrojs/nitro/releases/tag/v2.11.0){rel="&#x22;nofollow&#x22;"}.

## 📦 New `unjs` Major Versions

This release includes several major version upgrades from the unjs ecosystem, focused on performance and smaller bundle sizes through ESM-only distributions:

- unenv upgraded to v2 (full rewrite)
- db0 upgraded to v0.3 (ESM-only, native node\:sql, improvements)
- ohash upgraded to v2 (ESM-only, native node\:crypto support, much faster)
- untyped upgraded to v2 (ESM-only, smaller install size)
- unimport upgraded to v4 (improvements)
- c12 upgraded to v3 (ESM-only)
- pathe upgraded to v2 (ESM-only)
- cookie-es upgraded to v2 (ESM-only)
- esbuild upgraded to v0.25
- chokidar upgraded to v4

As usual, our recommendation for upgrading is to run:

This refreshes your lockfile and pulls in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## Full release notes

::read-more
---
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt/nuxt/releases/tag/v3.16.0
---
Read the full release notes of Nuxt `v3.16.0`.
::

A huge thank you to everyone who's been a part of this release. ❤️

I'm aware there have been lots of very significant changes in this release - please don't hesitate to let us know if you have any feedback or issues! 🙏

**Examples:**

Example 1 (bash):
```bash
npm create nuxt
```

Example 2 (ts):
```ts
// Nuxt now re-exports composables while properly resolving the context
export function useHead(input, options = {}) {
  const unhead = injectHead(options.nuxt)
  return head(input, { head: unhead, ...options })
}
```

Example 3 (vue):
```vue
<template>
  <!-- Hydrate when component becomes visible in viewport -->
  <LazyExpensiveComponent hydrate-on-visible />

  <!-- Hydrate when browser is idle -->
  <LazyHeavyComponent hydrate-on-idle />

  <!-- Hydrate on interaction (mouseover in this case) -->
  <LazyDropdown hydrate-on-interaction="mouseover" />

  <!-- Hydrate when media query matches -->
  <LazyMobileMenu hydrate-on-media-query="(max-width: 768px)" />

  <!-- Hydrate after a specific delay in milliseconds -->
  <LazyFooter :hydrate-after="2000" />
</template>
```

Example 4 (vue):
```vue
<LazyComponent hydrate-on-visible @hydrated="onComponentHydrated" />
```

---

## <NuxtRouteAnnouncer>

**URL:** llms-txt#<nuxtrouteannouncer>

**Contents:**
- Usage
- Slots
- Props

::important
This component is available in Nuxt v3.12+.
::

Add `<NuxtRouteAnnouncer/>` in your [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app) or [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts) to enhance accessibility by informing assistive technologies about page title changes. This ensures that navigational changes are announced to users relying on screen readers.

You can pass custom HTML or components through the route announcer's default slot.

- `atomic`: Controls if screen readers only announce changes or the entire content. Set to true for full content readouts on updates, false for changes only. (default `false`)
- `politeness`: Sets the urgency for screen reader announcements: `off` (disable the announcement), `polite` (waits for silence), or `assertive` (interrupts immediately). (default `polite`)

::callout
This component is optional. :br
To achieve full customization, you can implement your own one based on [its source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/nuxt-route-announcer.ts){rel=""nofollow""}.
::

::callout
You can hook into the underlying announcer instance using [the `useRouteAnnouncer` composable](https://nuxt.com/docs/3.x/api/composables/use-route-announcer), which allows you to set a custom announcement message.
::

**Examples:**

Example 1 (unknown):
```unknown
## Slots

You can pass custom HTML or components through the route announcer's default slot.
```

---

## Nuxt Directory Structure

**URL:** llms-txt#nuxt-directory-structure

**Contents:**
- Root Directory
  - App Directory & Files
  - Server Directory
- Public Directory
- Shared Directory
- Content Directory
- Modules Directory
- Nuxt Files

Nuxt applications have a specific directory structure that is used to organize the code. This structure is designed to be easy to understand and to be used in a consistent way.

The root directory of a Nuxt application is the directory that contains the `nuxt.config.ts` file. This file is used to configure the Nuxt application.

### App Directory & Files

The following directories are related to the universal Nuxt application:

- [`assets/`](https://nuxt.com/docs/3.x/directory-structure/assets): website's assets that the build tool (Vite or webpack) will process
- [`components/`](https://nuxt.com/docs/3.x/directory-structure/components): Vue components of the application
- [`composables/`](https://nuxt.com/docs/3.x/directory-structure/composables): add your Vue composables
- [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts): Vue components that wrap around your pages and avoid re-rendering between pages
- [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware): run code before navigating to a particular route
- [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages): file-based routing to create routes within your web application
- [`plugins/`](https://nuxt.com/docs/3.x/directory-structure/plugins): use Vue plugins and more at the creation of your Nuxt application
- [`utils/`](https://nuxt.com/docs/3.x/directory-structure/utils): add functions throughout your application that can be used in your components, composables, and pages.

This directory also includes specific files:

- [`app.config.ts`](https://nuxt.com/docs/3.x/directory-structure/app-config): a reactive configuration within your application
- [`app.vue`](https://nuxt.com/docs/3.x/directory-structure/app): the root component of your Nuxt application
- [`error.vue`](https://nuxt.com/docs/3.x/directory-structure/error): the error page of your Nuxt application

The [`server/`](https://nuxt.com/docs/3.x/directory-structure/server) directory is the directory that contains the server-side code of the Nuxt application. It contains the following subdirectories:

- [`api/`](https://nuxt.com/docs/3.x/directory-structure/server#server-routes): contains the API routes of the application.
- [`routes/`](https://nuxt.com/docs/3.x/directory-structure/server#server-routes): contains the server routes of the application (e.g. dynamic `/sitemap.xml`).
- [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/server#server-middleware): run code before a server route is processed
- [`plugins/`](https://nuxt.com/docs/3.x/directory-structure/server#server-plugins): use plugins and more at the creation of the Nuxt server
- [`utils/`](https://nuxt.com/docs/3.x/directory-structure/server#server-utilities): add functions throughout your application that can be used in your server code.

The [`public/`](https://nuxt.com/docs/3.x/directory-structure/public) directory is the directory that contains the public files of the Nuxt application. Files contained within this directory are served at the root and are not modified by the build process.

This is suitable for files that have to keep their names (e.g. `robots.txt`) *or* likely won't change (e.g. `favicon.ico`).

The [`shared/`](https://nuxt.com/docs/3.x/directory-structure/shared) directory is the directory that contains the shared code of the Nuxt application and Nuxt server. This code can be used in both the Vue app and the Nitro server.

The [`content/`](https://nuxt.com/docs/3.x/directory-structure/content) directory is enabled by the [Nuxt Content](https://content.nuxt.com){rel="&#x22;nofollow&#x22;"} module. It is used to create a file-based CMS for your application using Markdown files.

The [`modules/`](https://nuxt.com/docs/3.x/directory-structure/modules) directory is the directory that contains the local modules of the Nuxt application. Modules are used to extend the functionality of the Nuxt application.

- [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file is the main configuration file for the Nuxt application.
- [`.nuxtrc`](https://nuxt.com/docs/3.x/directory-structure/nuxtrc) file is another syntax for configuring the Nuxt application (useful for global configurations).
- [`.nuxtignore`](https://nuxt.com/docs/3.x/directory-structure/nuxtignore) file is used to ignore files in the root directory during the build phase.

---

## nuxt cleanup

**URL:** llms-txt#nuxt-cleanup

**Contents:**
- Arguments
- Options

The `cleanup` command removes common generated Nuxt files and caches, including:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option              | Default | Description                                                                      |
| ------------------- | ------- | -------------------------------------------------------------------------------- |
| `--cwd=<directory>` |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |

---

## <NuxtWelcome>

**URL:** llms-txt#<nuxtwelcome>

It includes links to the Nuxt documentation, source code, and social media accounts.

::read-more
---
target: _blank
to: https://templates.ui.nuxtjs.org/templates/welcome
---
Preview the `<NuxtWelcome />` component.
::

::tip
This component is part of [nuxt/assets](https://github.com/nuxt/assets){rel=""nofollow""}.
::

---

## Building a Privacy-First Feedback Widget

**URL:** llms-txt#building-a-privacy-first-feedback-widget

**Contents:**
- Why a feedback widget?
- Technical architecture
  - 1. Frontend with Motion animations
  - 2. Plausible-inspired anonymization
  - 3. Database persistence with conflict handling
- Shared types for consistency
- What's next

Documentation is at the heart of the Nuxt developer experience. To continuously improve it, we needed a simple and effective way to collect user feedback directly on each page. Here's how we designed and implemented our feedback widget, drawing inspiration from Plausible's privacy-first approach.

## Why a feedback widget?

Currently, users can provide feedback on our documentation by creating GitHub issues or contacting us directly. While these channels are valuable and remain important, they require users to leave their current context and take several steps to share their thoughts.

We wanted something different:

- **Contextual**: Directly integrated into each documentation page
- **Frictionless**: Maximum 2 clicks to provide feedback
- **Privacy-respecting**: No personal tracking, GDPR compliant by design

:video{.rounded-lg controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/so_0/v1749746517/nuxt/nuxt-feedback_lh6zyg.jpg"}

## Technical architecture

Our solution consists of three main components:

### 1. Frontend with Motion animations

The interface combines Vue 3's Composition API with [Motion for Vue](https://motion.dev/docs/vue){rel="&#x22;nofollow&#x22;"} to create an engaging user experience. The widget uses layout animations for smooth state transitions and spring physics for natural feedback. The `useFeedback` composable handles all state management and automatically resets when users navigate between pages.

Here's the success state animation, for example:

You can find the source code of the feedback widget [here](https://github.com/nuxt/nuxt.com/tree/main/app/components/Feedback.vue){rel="&#x22;nofollow&#x22;"}.

### 2. Plausible-inspired anonymization

The challenge was detecting duplicates (a user changing their mind) while preserving privacy. We took inspiration from [Plausible](https://plausible.io/){rel="&#x22;nofollow&#x22;"}'s approach to [counting unique visitors without cookies](https://plausible.io/data-policy){rel="&#x22;nofollow&#x22;"}.

This method generates a unique daily identifier by combining:

- **IP + User-Agent**: Naturally sent with every HTTP request
- **Domain**: Enables environment isolation
- **Current date**: Forces daily rotation of identifiers

**Why is this secure?**

- IP and User-Agent are never stored in the database
- The hash changes daily, preventing long-term tracking
- Very difficult to reverse engineer original data from the hash
- GDPR compliant by design (no persistent personal data)

### 3. Database persistence with conflict handling

First, we define the schema for the feedback table and add a unique constraint on the `path` and `fingerprint` columns.

Then, in the server, we use [Drizzle](https://orm.drizzle.team/docs/get-started){rel="&#x22;nofollow&#x22;"} with an `UPSERT` strategy:

This approach enables updates if the user changes their mind within the day, creation for new feedback, and automatic deduplication per page and user.

You can find the source code of the server side [here](https://github.com/nuxt/nuxt.com/tree/main/server){rel="&#x22;nofollow&#x22;"}.

## Shared types for consistency

We use Zod for runtime validation and type generation:

This approach ensures consistency across frontend, API, and database.

The widget is now live across all documentation pages. Our next step is building an admin interface within nuxt.com to analyze feedback patterns and identify pages that need improvement. This will help us continuously enhance the documentation quality based on real user feedback.

The complete source code is available on [GitHub](https://github.com/nuxt/nuxt.com){rel="&#x22;nofollow&#x22;"} for inspiration and contributions!

**Examples:**

Example 1 (vue):
```vue
<template>
  <!-- ... -->
  <motion.div
    v-if="isSubmitted"
    key="success"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="{ duration: 0.3 }"
    class="flex items-center gap-3 py-2"
    role="status"
    aria-live="polite"
    aria-label="Feedback submitted successfully"
  >
    <motion.div
      :initial="{ scale: 0 }"
      :animate="{ scale: 1 }"
      :transition="{ delay: 0.1, type: 'spring', visualDuration: 0.4 }"
      class="text-xl"
      aria-hidden="true"
    >
      ✨
    </motion.div>
    <motion.div
      :initial="{ opacity: 0, x: 10 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{ delay: 0.2, duration: 0.3 }"
    >
      <div class="text-sm font-medium text-highlighted">
        Thank you for your feedback!
      </div>
      <div class="text-xs text-muted mt-1">
        Your input helps us improve the documentation.
      </div>
    </motion.div>
  </motion.div>
  <!-- ... -->
</template>
```

Example 2 (typescript):
```typescript
export async function generateHash(
  today: string,
  ip: string,
  domain: string,
  userAgent: string
): Promise<string> {
  const data = `${today}+${domain}+${ip}+${userAgent}`

  const buffer = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(data)
  )

  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
```

Example 3 (typescript):
```typescript
export const feedback = sqliteTable('feedback', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  rating: text('rating').notNull(),
  feedback: text('feedback'),
  path: text('path').notNull(),
  title: text('title').notNull(),
  stem: text('stem').notNull(),
  country: text('country').notNull(),
  fingerprint: text('fingerprint').notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull(),
  updatedAt: integer({ mode: 'timestamp' }).notNull()
}, table => [uniqueIndex('path_fingerprint_idx').on(table.path, table.fingerprint)])
```

Example 4 (typescript):
```typescript
await drizzle.insert(tables.feedback).values({
  rating: data.rating,
  feedback: data.feedback || null,
  path: data.path,
  title: data.title,
  stem: data.stem,
  country: event.context.cf?.country || 'unknown',
  fingerprint,
  createdAt: new Date(),
  updatedAt: new Date()
}).onConflictDoUpdate({
  target: [tables.feedback.path, tables.feedback.fingerprint],
  set: {
    rating: data.rating,
    feedback: data.feedback || null,
    country,
    updatedAt: new Date()
  }
})
```

---

## Run only Nuxt tests

**URL:** llms-txt#run-only-nuxt-tests

npx vitest --project nuxt

---

## nuxt add

**URL:** llms-txt#nuxt-add

**Contents:**
  - Arguments
  - Options

| Argument   | Description                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPLATE` | Specify which template to generate (options: \<api\|app\|app-config\|component\|composable\|error\|layer\|layout\|middleware\|module\|page\|plugin\|server-middleware\|server-plugin\|server-route\|server-util>) |
| `NAME`     | Specify name of the generated file                                                                                                                                                                                |

| Option                             | Default | Description                              |
| ---------------------------------- | ------- | ---------------------------------------- |
| `--cwd=<directory>`                | `.`     | Specify the working directory            |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level             |
| `--force`                          | `false` | Force override file if it already exists |

Some templates support additional modifier flags to add a suffix (like `.client` or `.get`) to their name.

**Examples:**

Example 1 (unknown):
```unknown
### Arguments

| Argument   | Description                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPLATE` | Specify which template to generate (options: \<api\|app\|app-config\|component\|composable\|error\|layer\|layout\|middleware\|module\|page\|plugin\|server-middleware\|server-plugin\|server-route\|server-util>) |
| `NAME`     | Specify name of the generated file                                                                                                                                                                                |

### Options

| Option                             | Default | Description                              |
| ---------------------------------- | ------- | ---------------------------------------- |
| `--cwd=<directory>`                | `.`     | Specify the working directory            |
| `--logLevel=<silent|info|verbose>` |         | Specify build-time log level             |
| `--force`                          | `false` | Force override file if it already exists |

**Modifiers:**

Some templates support additional modifier flags to add a suffix (like `.client` or `.get`) to their name.
```

---

## onPrehydrate

**URL:** llms-txt#onprehydrate

**Contents:**
- Usage
- Type
- Parameters
- Return Values
- Example

::important
This composable is available in Nuxt v3.12+.
::

`onPrehydrate` is a composable lifecycle hook that allows you to run a callback on the client immediately before Nuxt hydrates the page.

::note
This is an advanced utility and should be used with care. For example, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251){rel=""nofollow""} and [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js){rel=""nofollow""} manipulate the DOM to avoid hydration mismatches.
::

Call `onPrehydrate` in the setup function of a Vue component (e.g., in `<script setup>`) or in a plugin. It only has an effect when called on the server and will not be included in your client build.

| Parameter  | Type                                   | Required | Description                                                                                                                                                                                                                                                                              |
| ---------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | `((el: HTMLElement) => void) | string` | Yes      | A function (or stringified function) to run before Nuxt hydrates. It will be stringified and inlined in the HTML. Should not have external dependencies or reference variables outside the callback. Runs before Nuxt runtime initializes, so it should not rely on Nuxt or Vue context. |
| `key`      | `string`                               | No       | (Advanced) A unique key to identify the prehydrate script, useful for advanced scenarios like multiple root nodes.                                                                                                                                                                       |

- Returns `undefined` when called with only a callback function.
- Returns a string (the prehydrate id) when called with a callback and a key, which can be used to set or access the `data-prehydrate-id` attribute for advanced use cases.

**Examples:**

Example 1 (unknown):
```unknown
## Parameters

| Parameter  | Type                                   | Required | Description                                                                                                                                                                                                                                                                              |
| ---------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | `((el: HTMLElement) => void) | string` | Yes      | A function (or stringified function) to run before Nuxt hydrates. It will be stringified and inlined in the HTML. Should not have external dependencies or reference variables outside the callback. Runs before Nuxt runtime initializes, so it should not rely on Nuxt or Vue context. |
| `key`      | `string`                               | No       | (Advanced) A unique key to identify the prehydrate script, useful for advanced scenarios like multiple root nodes.                                                                                                                                                                       |

## Return Values

- Returns `undefined` when called with only a callback function.
- Returns a string (the prehydrate id) when called with a callback and a key, which can be used to set or access the `data-prehydrate-id` attribute for advanced use cases.

## Example
```

---

## Monterail

**URL:** llms-txt#monterail

Monterail focuses on delivering innovative software to industry leaders. Since 2010, it has **leveraged the expertise of over 150 specialists** to engineer cutting-edge solutions for market leaders.

As a trusted Vue.js partner, our portfolio showcases diverse projects, highlighting our **commitment to technological excellence and innovative design**.

Our global clientele spans various industries, underscoring our versatility and the recognition we've received, including presence in the Financial Times 1000 and Deloitte's rankings.

Our remote-friendly team excels in communication and collaboration, ensuring seamless engagement across borders. We offer comprehensive tech consultations and business strategy evaluations, building enduring client relationships. Our approach values diversity and creativity, driving us to explore unique solutions that empower businesses.

---

## 7Span

**URL:** llms-txt#7span

At 7Span, we specialize in crafting innovative technology solutions for entrepreneurs and businesses committed to excellence. Since 2015, we have delivered a wide range of services, including custom web development, startup consulting, mobile app solutions, SaaS development, and UI/UX & branding, to enterprises, startups, and agencies.

With a robust team of over 230 professionals, we have consistently developed high-performance web apps, browser extensions, chat apps, real-time dashboards, and multi-tenant SaaS apps, particularly within the Nuxt ecosystem.

We pride ourselves on being one of the most process-driven companies in the industry. We adhere to stringent standards such as effective sprint management, follow strict security protocols, efficient git repo management, thorough code reviews and audits, CI/CD-based deployment, software testing, technical documentation, and comprehensive application performance monitoring.

Over the past decade, we have had the honor of developing cutting-edge solutions for globally renowned brands, high-growth startups, ambitious entrepreneurs, and Fortune 100 companies.

Our notable clients::br
Nestle, Dell, HP, Princeton University, Pfizer, Jio, ITC, T-Systems, Godrej, and Delhivery.

Let's connect to build your MVP, migrate your legacy software to Nuxt, upgrade to the latest Nuxt version, or scale your software to the enterprise level.

---

## Zeabur

**URL:** llms-txt#zeabur

**Contents:**
- Setup
- Learn more

Nuxt supports deploying on [Zeabur](https://zeabur.com){rel="&#x22;nofollow&#x22;"} with minimal configuration.

1. Create a new Zeabur app for Nuxt following the [guide](https://zeabur.com/docs/guides/nodejs/nuxt){rel="&#x22;nofollow&#x22;"}.
2. During the deployment process, you can configure environment variables in Zeabur dashboard. In your service page, open the variables tab set the following [environment variable](https://zeabur.com/docs/deploy/variables){rel="&#x22;nofollow&#x22;"}:

::read-more{to="https://nitro.unjs.io/deploy/providers/zeabur" target="_blank"}
Head over **Nitro documentation** to learn more about the Zeabur deployment preset.
::
````

**Examples:**

Example 1 (bash):

```bash
SERVER_PRESET=zeabur
```

---

## Generates `app/pages/about.vue`

**URL:** llms-txt#generates-`app/pages/about.vue`

npx nuxt add page about
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown

```

---

## shared

**URL:** llms-txt#shared

**Contents:**

- Usage
- How Files Are Scanned

The `shared/` directory allows you to share code that can be used in both the Vue app and the Nitro server.

::note
The `shared/` directory is available in Nuxt v3.14+.
::

::important
Code in the `shared/` directory cannot import any Vue or Nitro code.
::

::warning
Auto-imports are not enabled by default in Nuxt v3 to prevent breaking changes in existing projects.

To use these auto-imported utils and types, you must first [set `future.compatibilityVersion: 4` in your `nuxt.config.ts`](https://nuxt.com/docs/3.x/getting-started/upgrade#opting-in-to-nuxt-4).
::

## ::video-accordion

title: Watch a video from Vue School on sharing utils and types between app and server
video-id: nnAR-MO3q5M

---

::

**Method 1:** Named export

**Method 2:** Default export

You can now use [auto-imported](https://nuxt.com/docs/3.x/directory-structure/shared#auto-imports) utilities in your Nuxt app and `server/` directory.

## How Files Are Scanned

Only files in the `shared/utils/` and `shared/types/` directories will be auto-imported. Files nested within subdirectories of these directories will not be auto-imported unless you add these directories to `imports.dirs` and `nitro.imports.dirs`.

::tip
The way `shared/utils` and `shared/types` auto-imports work and are scanned is identical to the [`composables/`](https://nuxt.com/docs/3.x/directory-structure/composables) and [`utils/`](https://nuxt.com/docs/3.x/directory-structure/utils) directories.
::

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned

::

Any other files you create in the `shared/` folder must be manually imported using the `#shared` alias (automatically configured by Nuxt):

This alias ensures consistent imports across your application, regardless of the importing file's location.

::read-more{to="https://nuxt.com/docs/guide/concepts/auto-imports"}
::

**Examples:**

Example 1 (unknown):

```unknown
**Method 2:** Default export
```

Example 2 (unknown):

```unknown
You can now use [auto-imported](https://nuxt.com/docs/3.x/directory-structure/shared#auto-imports) utilities in your Nuxt app and `server/` directory.
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
## How Files Are Scanned

Only files in the `shared/utils/` and `shared/types/` directories will be auto-imported. Files nested within subdirectories of these directories will not be auto-imported unless you add these directories to `imports.dirs` and `nitro.imports.dirs`.

::tip
The way `shared/utils` and `shared/types` auto-imports work and are scanned is identical to the [`composables/`](https://nuxt.com/docs/3.x/directory-structure/composables) and [`utils/`](https://nuxt.com/docs/3.x/directory-structure/utils) directories.
::

::read-more
---
to: https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
---
::
```

---

## prerenderRoutes

**URL:** llms-txt#prerenderroutes

When prerendering, you can hint to Nitro to prerender additional paths, even if their URLs do not show up in the HTML of the generated page.

::important
`prerenderRoutes` can only be called within the [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
`prerenderRoutes` has to be executed during prerendering. If the `prerenderRoutes` is used in dynamic pages/routes which are not prerendered, then it will not be executed.
::

::note
In the browser, or if called outside prerendering, `prerenderRoutes` will have no effect.
::

You can even prerender API routes which is particularly useful for full statically generated sites (SSG) because you can then `$fetch` data as if you have an available server!

::warning
Prerendered API routes in production may not return the expected response headers, depending on the provider you deploy to. For example, a JSON response might be served with an `application/octet-stream` content type.
Always manually set `responseType` when fetching prerendered API routes.
::

**Examples:**

Example 1 (ts):

```ts
const route = useRoute();

prerenderRoutes('/');
prerenderRoutes(['/', '/about']);
```

Example 2 (ts):

```ts
prerenderRoutes('/api/content/article/name-of-article');

// Somewhere later in App
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
});
```

---

## TypeScript

**URL:** llms-txt#typescript

**Contents:**

- Remove Modules
  - Set `bridge.typescript`
- Update `tsconfig.json`

- Remove `@nuxt/typescript-build`: Bridge enables same functionality
- Remove `@nuxt/typescript-runtime` and `nuxt-ts`: Nuxt 2 has built-in runtime support

### Set `bridge.typescript`

## Update `tsconfig.json`

If you are using TypeScript, you can edit your `tsconfig.json` to benefit from auto-generated Nuxt types:

::note
As `.nuxt/tsconfig.json` is generated and not checked into version control, you'll need to generate that file before running your tests. Add `nuxi prepare` as a step before your tests, otherwise you'll see `TS5083: Cannot read file '~/.nuxt/tsconfig.json'`
::

::note
Keep in mind that all options extended from `./.nuxt/tsconfig.json` will be overwritten by the options defined in your `tsconfig.json`.
Overwriting options such as `"compilerOptions.paths"` with your own configuration will lead TypeScript to not factor in the module resolutions from `./.nuxt/tsconfig.json`. This can lead to module resolutions such as `#imports` not being recognized.

In case you need to extend options provided by `./.nuxt/tsconfig.json` further, you can use the `alias` property within your `nuxt.config`. `nuxi` will pick them up and extend `./.nuxt/tsconfig.json` accordingly.
::

**Examples:**

Example 1 (ts):

```ts
import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
  bridge: {
    typescript: true,
    nitro: false, // If migration to Nitro is complete, set to true
  },
});
```

---

## Roadmap to v4

**URL:** llms-txt#roadmap-to-v4

**Contents:**

- Why Two Releases?
- What's Included?
- What About Nitro?
- What About Nuxt 3?
- What's Next

We originally planned Nuxt 4 for June 2024, but things don't always go according to plan. I think it's appropriate to take a different approach:

👉 \*\*Nuxt 4 entered Release Candidate (RC) stage on July 8, 2025, with a stable release coming soon. Nuxt 5 will come later once Nitro v3 is ready.\*\*

Honestly, in hindsight I think we should have shipped Nuxt v4 last year. It would have aligned better with our once-a-year plan for careful major releases.

On the other hand, it has allowed time for testing across countless projects, by opting in to Nuxt 4 breaking changes with a single flag. I think that we should go ahead and ship these changes as Nuxt v4 for two reasons:

1. **People are already using it**. I frequently hear of teams who are using `compatibilityVersion: 4` in production. This option was _intended_ only for testing, but it has proven solid enough for production use. We want to make it official, and give these teams the protection of a stable release.
2. **It will improve the migration**. Having a two-stage migration from v3 -> v4, and then v4 -> v5 will make for a smoother migration. We don't yet have a final list of breaking changes for Nitro v3, and this means we can spend enough time to ensure that the Nitro upgrade is smooth, while not delaying adoption of the Nuxt changes we've planned for the last year.

What's more, going forward we're going to do our best to decouple Nuxt releases from our key dependencies, like Vite or Nitro.

Nuxt 4 includes all the features you've been testing with `compatibilityVersion: 4`:

- **🗂️ New Directory Structure** - code goes in `app/` for cleaner organization and better IDE performance
- **🔄 Improved Data Fetching** - smarter `useAsyncData` and `useFetch` with better caching and cleanup
- **🏷️ Consistent Component Names** - Vue DevTools and `<KeepAlive>` now see the same names as Nuxt's auto-imports
- **📄 Enhanced Head Management** - dropping deprecated features from Unhead v2 with better performance and tag optimization

... as well as many other improvements documented in the [upgrade guide](https://nuxt.com/docs/getting-started/upgrade). There are also a handful of further changes we will shipping, including:

- preparations for adopting the Vite Environment API (with a single dev server)
- improvements to type 'environment' handling (for server, client, and shared code)

**We're not delaying Nitro v3 adoption**. We aim for Nuxt 5 to arrive with Nitro v3 at the same time we originally planned, even if that's only a few months after the release of Nuxt v4.

Despite the delays over the past year, we've seen phenomenal progress on Nitro. As a whole team, we're very excited to unveil what we have planned in Nitro v3 and h3 v2.

While Nuxt 4 won't initially include these upgrades, releasing Nuxt v4 and Nitro v3 in parallel will mean we can test both Nuxt and Nitro more thoroughly across the ecosystem by the time Nuxt 5 arrives.

## What About Nuxt 3?

We'll provide ongoing maintenance and support for Nuxt 3 after the first stable release of Nuxt 4 — and continue supporting both Nuxt 3 and Nuxt 4 after Nuxt 5 has been released. We've intentionally chosen a slightly shorter timetable of _six months_ support for each of these releases because we believe that it will be a straightforward upgrade.

(My main aim for the Nuxt 4 upgrade is to ensure that it is as smooth as possible.)

Nevertheless, I'll be closely monitoring to see how successfully and quickly the ecosystem migrates. If there are issues I will absolutely extend that six month ongoing maintenance window. We don't want to leave anyone behind.

For a while, this will mean active backports of features and bugfixes across three versions. But I think it's worth it. And we have — after all — been doing this for the last year in preparation for Nuxt 4.

|            |                                                   |
| ---------- | ------------------------------------------------- |
| **Nuxt 3** | Continues receiving updates until the end of 2025 |
| **Nuxt 4** | Supported until mid-2026 (estimated)              |
| **Nuxt 5** | Long-term support following our usual pattern     |

Nuxt v4 is now in \*\*Release Candidate (RC)\*\* stage! We'd love early adopters to test it. Please do report issues to Nuxt or any modules that you may be using.

::note
We are currently in the **release candidate stage**: no more breaking changes are planned — only bug fixes before the stable release.

Release stages for Nuxt 4:

- **Alpha**: experimental features and breaking changes
- **RC (now)**: stable feature set, final testing before release
  ::

Here's what you can expect over the next few weeks:

- We plan to open **upstream PRs for community modules** in the [nuxt/modules](https://github.com/nuxt/modules){rel="&#x22;nofollow&#x22;"} registry, and create a migration guide for module authors.
- We'll create a full **upgrade guide** for Nuxt 3 users, including a list of breaking changes and how to migrate. (The current [upgrade guide](https://nuxt.com/docs/getting-started/upgrade) explains how to enable compatibility mode, but there are some differences with Nuxt 4.)
- We'll **only release bugfixes for v3** this month, deferring backporting new features until after the release of v4.
- We'll \*\*update the docs on [nuxt.com](https://nuxt.com)\*\* to allow switching between `3.x`, `4.x` and (soon) `5.x` documentation.
- With the **release candidate now live**, we're focused exclusively on bug fixes. No new features or breaking changes are expected.
- Once v4 is released, we'll separate the `main` branch to `4.x` to adopt edge releases of `h3` and `nitro` and begin development of Nuxt 5.

::note
You can follow the progress of the remaining work by checking [these remaining tasks](https://github.com/nuxt/nuxt/issues/27027){rel=""nofollow""} and [the Nuxt 4 milestone](https://github.com/nuxt/nuxt/milestone/8){rel=""nofollow""} on GitHub.
::

I'm really excited with this timeline — and thank you for your patience and trust over the last year!

---

## onBeforeRouteUpdate

**URL:** llms-txt#onbeforerouteupdate

## ::read-more

icon: i-simple-icons-vuedotjs
target: \_blank
title: Vue Router Docs
to: https://router.vuejs.org/api/functions/onBeforeRouteUpdate.html

---

::

---

## Curotec

**URL:** llms-txt#curotec

**Contents:**

- Curotec Experience
- The Team

## Curotec Experience

Our experience extends from ground-up development using the Nuxt.js framework to side-by-side collaborations that make in-house teams more productive with Nuxt. Innovation doesn’t stop or start at a company’s size. That’s why our skilled Nuxt.js development team has helped a wide variety of businesses - from enterprises to digital-first startups - realize their vision with highly-usable, seamless, professionally-built applications.

Our team is equipped to take your ideas from concept to launch, pairing the powerful Nuxt.js framework with complementary technologies such as Vue.js, Laravel, Node.js, WordPress, and more as well as deep software planning and design experience to transform your vision into reality. But Curotec can do more than greenfield development, drawing on the comprehensive skill set of our teams and leaders to step in at any stage of development, from planning and design to long-term support.

Rounding out the team with digital strategy, UX, and DevOps, Curotec engineers are positioned to partner with you to create beautiful, functional, and purpose-built applications.

---

## Introducing Smart Prefetching

**URL:** llms-txt#introducing-smart-prefetching

**Contents:**

- Introducing Smart prefetching ⚡️

## Introducing Smart prefetching ⚡️

Starting from [Nuxt v2.4.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.4.0){rel="&#x22;nofollow&#x22;"}, Nuxt will automagically prefetch the code-splitted pages linked with `<nuxt-link>` when visible in the viewport **by default**. This hugely improves the end user performances, inspired by [quicklink](https://github.com/GoogleChromeLabs/quicklink){rel="&#x22;nofollow&#x22;"}.

![nuxt-prefetch-comparison](https://nuxt.com/assets/blog/nuxt-prefetch-comparison.gif){.rounded-lg.border.border-gray-700}

Demos are online and we recommend you to try it out to feel the difference:

- No prefetching (v2.3): <https://nuxt-no-prefetch.surge.sh>{rel="&#x22;nofollow&#x22;"}
- With prefetching (v2.4): <https://nuxt-prefetch.surge.sh>{rel="&#x22;nofollow&#x22;"}

You can learn more about this feature in the [`<nuxt-link>`](https://v2.nuxt.com/docs/features/nuxt-components#the-nuxtlink-component){rel="&#x22;nofollow&#x22;"} section of the documentation.

---

## <NuxtIsland>

**URL:** llms-txt#<nuxtisland>

**Contents:**

- Props
- Slots
- Ref
- Events

When rendering an island component, the content of the island component is static, thus no JS is downloaded client-side.

Changing the island component props triggers a refetch of the island component to re-render it again.

::note
Global styles of your application are sent with the response.
::

::tip
Server only components use `<NuxtIsland>` under the hood
::

- `name` : Name of the component to render.

- **type**: `string`
  - **required**
- `lazy`: Make the component non-blocking.

- **type**: `boolean`
  - **default**: `false`
- `props`: Props to send to the component to render.

- **type**: `Record<string, any>`
- `source`: Remote source to call the island to render.

- **type**: `string`
- **dangerouslyLoadClientComponents**: Required to load components from a remote source.

- **type**: `boolean`
  - **default**: `false`

::note
Remote islands need `experimental.componentIslands` to be `'local+remote'` in your `nuxt.config`.
It is strongly discouraged to enable `dangerouslyLoadClientComponents` as you can't trust a remote server's javascript.
::

::note
By default, component islands are scanned from the `~/components/islands/` directory. So the `~/components/islands/MyIsland.vue` component could be rendered with `<NuxtIsland name="MyIsland" />`.
::

Slots can be passed to an island component if declared.

Every slot is interactive since the parent component is the one providing it.

Some slots are reserved to `NuxtIsland` for special cases.

- `#fallback`: Specify the content to be rendered before the island loads (if the component is lazy) or if `NuxtIsland` fails to fetch the component.

- **type**: `() => Promise<void>`
  - **description**: force refetch the server component by refetching it.

- **type**: `unknown`
  - **description**: emitted when when `NuxtIsland` fails to fetch the new island.

---

## Auto Imports

**URL:** llms-txt#auto-imports

**Contents:**

- Migration

::note
In the rest of the migration documentation, you will notice that key Nuxt and Vue utilities do not have explicit imports. This is not a typo; Nuxt will automatically import them for you, and you should get full type hinting if you have followed [the instructions](https://nuxt.com/docs/3.x/migration/configuration#typescript) to use Nuxt's TypeScript support.
::

[Read more about auto imports](https://nuxt.com/docs/3.x/guide/concepts/auto-imports)

1. If you have been using `@nuxt/components` in Nuxt 2, you can remove `components: true` in your `nuxt.config`. If you had a more complex setup, then note that the component options have changed somewhat. See the [components documentation](https://nuxt.com/docs/3.x/directory-structure/components) for more information.

::tip
You can look at `.nuxt/types/components.d.ts` and `.nuxt/types/imports.d.ts` to see how Nuxt has resolved your components and composable auto-imports.
::

---

## drunomics

**URL:** llms-txt#drunomics

**Contents:**

- About drunomics
- Our Services
- Introducing mossbo: Cloud CMS Ecosystem
- Contact Us

Open source is the foundation of everything we build at drunomics. Based in Austria, we've been delivering award-winning enterprise solutions with decoupled Drupal and Nuxt since 2012. Our expertise powers innovative solutions like [Lupus Decoupled Drupal](https://lupus-decoupled.org/?utm_source=nuxt){rel="&#x22;nofollow&#x22;"}, an open source project that makes combining Drupal with Nuxt effortless, and [mossbo](https://mossbo.com/en?utm_source=nuxt){rel="&#x22;nofollow&#x22;"}, our fully managed Cloud CMS Ecosystem. From concept to launch and beyond, we partner with you to create secure, scalable, high-performance digital experiences.

- Website Development
- Custom Enterprise Solutions
- Migration & Modernization
- Agile Development with DevOps Automation
- AI Integration for Content & Workflow Optimization
- Ongoing Maintenance & Support
- UX/UI Design
- Accessibility Consulting

## Introducing mossbo: Cloud CMS Ecosystem

[mossbo](https://mossbo.com/en?utm_source=nuxt){rel="&#x22;nofollow&#x22;"} delivers a fully managed SaaS experience with open source freedom. Powered by headless Drupal and a modern Nuxt frontend for robust content management with exceptional frontend performance and flexibility.

- **Innovative** – Future-proof architecture with AI-powered content tools, modern page building, and integrated cloud toolkit.
- **Proven** – Built on robust open source technologies, backed by drunomics' award-winning expertise.
- **Worry-Free** – Fully managed service with automatic security updates, version upgrades, ISO-certified EU hosting, and 24/7 monitoring.

Ready to start your project?

🌐 [drunomics.com](https://drunomics.com/en?utm_source=nuxt){rel="&#x22;nofollow&#x22;"}

🌐 [mossbo.com](https://mossbo.com/en?utm_source=nuxt){rel="&#x22;nofollow&#x22;"}

📧 <hello@drunomics.com>

---

## Nuxt on the Edge

**URL:** llms-txt#nuxt-on-the-edge

**Contents:**

- Introduction
- The Challenge
- Pushing Full-stack Capabilities
- Conclusion

In September 2017, Cloudflare [introduced Cloudflare Workers](https://blog.cloudflare.com/introducing-cloudflare-workers/){rel="&#x22;nofollow&#x22;"}, giving the ability to run JavaScript on their [edge network](https://www.cloudflare.com/network/){rel="&#x22;nofollow&#x22;"}. This means your code will deploy on the entire edge network in over a hundred locations worldwide in about 30 seconds. This technology allows you to focus on writing your application close to your users, wherever they are in the world (\~50ms latency).

The worker's runtime is not the same as Node.js or the Browser, it executes the code using V8, the JavaScript engine developed by Google Chrome. Until now, what you could run on their platform were small scripts running on the edge before hitting your server to increase the performance or add some logic based on request headers, for example.

In November 2020, while working on Nuxt 3, **we made the bet to run Nuxt in-production on edge runtimes / V8 isolates**.

It unlocks the ability to server-render pages in \~50ms from all over the world when using a platform like CloudFlare Workers, without having to deal with servers, load balancers and caching, for about [$0.3 per million requests](https://developers.cloudflare.com/workers/platform/pricing/){rel="&#x22;nofollow&#x22;"}. As of today, new platforms are coming to let run apps on V8 isolates such as Deno Deploy.

::note
**2024 update:** I released [NuxtHub](https://hub.nuxt.com){rel=""nofollow""} to let you build full-stack applications with Nuxt on the edge, on your Cloudflare account with zero configuration. It includes a database, blob storage, KV, remote storage and more.
::

In order to make Nuxt run in workers, we had to rewrite some parts of Nuxt to be environmentally agnostic (runs in Node.js, Browser or V8).

We started with our server and created [unjs/h3](http://github.com/unjs/h3){rel="&#x22;nofollow&#x22;"}: a minimal http framework built for high performance and portability. It replaces [Connect](https://github.com/senchalabs/connect){rel="&#x22;nofollow&#x22;"} we used in Nuxt 2 but has compatibility with it so you can keep using Connect/Express middleware. In the workers, for each incoming request, it starts Nuxt in production, sends the request to it and sends back the response.

In Nuxt 2, the duration to start the server in production in memory (also named cold start) was about \~300ms, because we had to load all the dependencies of your server and application in order to handle the request.

By working on h3, we decided to code-split each handler attached to the server and lazy-load them only when requested. When you start Nuxt 3, we only load h3 in memory and the corresponding handlers. When a request comes in, we load the handler corresponding to the route and execute it.

:video{controls poster="https://res.cloudinary.com/nuxt/video/upload/v1689236511/nuxt3/nuxt3-server-performance.jpg" src="https://res.cloudinary.com/nuxt/video/upload/v1689236511/nuxt3/nuxt3-server-performance.mp4"}

By adopting this approach, **we reduced the cold start from \~300ms to \~2ms**.

We had another challenge in order to run Nuxt on the edge: the production bundle size. This includes the server, Vue app and Node.js dependencies combined. Cloudflare workers currently have a limit of 1MB (free plan) and 5MB ($5 per month plan) for the worker size.

In order to achieve this, we created [unjs/nitro](https://nitro.unjs.io/){rel="&#x22;nofollow&#x22;"}, our server engine, when running the `nuxt build` command, it bundles your whole project and includes all dependencies into the final output. It uses [Rollup](https://rollupjs.org/){rel="&#x22;nofollow&#x22;"} and [vercel/nft](https://github.com/vercel/nft){rel="&#x22;nofollow&#x22;"} to trace only the code used by the `node_modules` to remove unnecessary code. \*\*The total size of the generated output for a basic Nuxt 3 application is about 700kB gzip.\*\*

Lastly, to provide the same developer experience between development (Node.js) and production on Cloudflare (Edge runtime), we created [unjs/unenv](https://github.com/unjs/unenv){rel="&#x22;nofollow&#x22;"}: a library to convert JavaScript code to run everywhere (platform agnostic) by mocking or adding polyfills for known dependencies.

**At Nuxt, we believe that you should have the freedom to choose the hosting provider that fits you best.**

This is why you can deploy a Nuxt application with edge-side rendering on:

- [NuxtHub](https://hub.nuxt.com){rel="&#x22;nofollow&#x22;"}
- [Cloudflare Page](https://nitro.unjs.io/deploy/providers/cloudflare#cloudflare-pages){rel="&#x22;nofollow&#x22;"}
- [Deno Deploy](https://nitro.unjs.io/deploy/providers/deno-deploy){rel="&#x22;nofollow&#x22;"}
- [Vercel Edge Functions](https://nitro.unjs.io/deploy/providers/vercel#vercel-edge-functions){rel="&#x22;nofollow&#x22;"} (using CloudFlare Workers under the hood)
- [Netlify Edge Functions](https://nitro.unjs.io/deploy/providers/netlify#netlify-edge-functions){rel="&#x22;nofollow&#x22;"} (using Deno under the hood)

We also support many other deployment providers, including [static hosting](https://nuxt.com/docs/getting-started/deployment#static-hosting) or [traditional Node.js serverless and server hosts](https://nuxt.com/docs/getting-started/deployment#nodejs-server).

## Pushing Full-stack Capabilities

Now that we have Nuxt running on edge runtime, we can do more than render a Vue application. Thanks to the [server directory](https://nuxt.com/docs/guide/directory-structure/server), creating an API route is a TypeScript file away.

To add the `/api/hello` route, create a `server/api/hello.ts` file:

You can now universally call this API in your pages and components:

One important thing to note when we created [useFetch](https://nuxt.com/docs/api/composables/use-fetch) and [$fetch](https://nuxt.com/docs/api/utils/dollarfetch) is that during server-side rendering, if you call your API routes, it will emulate the request and call the function code directly: **avoiding an HTTP request and reducing page’s rendering time**.

In terms of developer experience, you will notice that when creating server files, the Nuxt server keeps running without rebuilding the Vue app. \*\*This is because Nuxt 3 supports Hot Module Replacement (HMR) when creating API and server routes.\*\*

Furthermore, by leveraging Object Relational Mapping (ORM) like [drizzle-orm](https://orm.drizzle.team/){rel="&#x22;nofollow&#x22;"}, developers can connect Edge & Serverless databases such as [D1](https://developers.cloudflare.com/d1/){rel="&#x22;nofollow&#x22;"}, [Turso](https://turso.tech/){rel="&#x22;nofollow&#x22;"}, [Neon](https://neon.tech){rel="&#x22;nofollow&#x22;"}, [Planetscale](https://planetscale.com/){rel="&#x22;nofollow&#x22;"} and more.

I created [Atidone](https://todos.nuxt.dev/){rel="&#x22;nofollow&#x22;"}, an open source demo to showcase a full-stack application with authentication and a database running on the edge. The source code is available on GitHub under the MIT license at [atinux/atidone](https://github.com/atinux/atidone){rel="&#x22;nofollow&#x22;"}.

We are excited about edge-side rendering and what it unlocks. Our team at Nuxt can’t wait to see what you will build on top of this!

Feel free to join our [Discord server](https://discord.com/invite/nuxt){rel="&#x22;nofollow&#x22;"} or mention [@nuxt_js](https://x.com/nuxt_js){rel="&#x22;nofollow&#x22;"} on Twitter to share your work.

**Examples:**

Example 1 (unknown):

```unknown
You can now universally call this API in your pages and components:
```

---

## Server Engine

**URL:** llms-txt#server-engine

**Contents:**

- API Layer
- Direct API Calls
- Typed API Routes
- Standalone Server

While building Nuxt, we created a new server engine: [Nitro](https://nitro.build/){rel="&#x22;nofollow&#x22;"}.

It is shipped with many features:

- Cross-platform support for Node.js, browsers, service workers and more.
- Serverless support out-of-the-box.
- API routes support.
- Automatic code-splitting and async-loaded chunks.
- Hybrid mode for static + serverless sites.
- Development server with hot module reloading.

Server [API endpoints](https://nuxt.com/docs/3.x/directory-structure/server#api-routes) and [Middleware](https://nuxt.com/docs/3.x/directory-structure/server#server-middleware) are added by Nitro that internally uses [h3](https://github.com/h3js/h3){rel="&#x22;nofollow&#x22;"}.

Key features include:

- Handlers can directly return objects/arrays for an automatically-handled JSON response
- Handlers can return promises, which will be awaited (`res.end()` and `next()` are also supported)
- Helper functions for body parsing, cookie handling, redirects, headers and more

Check out [the h3 docs](https://github.com/h3js/h3){rel="&#x22;nofollow&#x22;"} for more information.

## ::read-more

## to: https://nuxt.com/docs/guide/directory-structure/server#server-routes

Learn more about the API layer in the `server/` directory.
::

Nitro allows 'direct' calling of routes via the globally-available [`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch) helper. This will make an API call to the server if run on the browser, but will directly call the relevant function if run on the server, **saving an additional API call**.

[`$fetch`](https://nuxt.com/docs/3.x/api/utils/dollarfetch) API is using [ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"}, with key features including:

- Automatic parsing of JSON responses (with access to raw response if needed)
- Request body and params are automatically handled, with correct `Content-Type` headers

For more information on `$fetch` features, check out [ofetch](https://github.com/unjs/ofetch){rel="&#x22;nofollow&#x22;"}.

When using API routes (or middleware), Nitro will generate typings for these routes as long as you are returning a value instead of using `res.end()` to send a response.

You can access these types when using [`$fetch()`](https://nuxt.com/docs/3.x/api/utils/dollarfetch) or [`useFetch()`](https://nuxt.com/docs/3.x/api/composables/use-fetch).

Nitro produces a standalone server dist that is independent of `node_modules`.

The server in Nuxt 2 is not standalone and requires part of Nuxt core to be involved by running `nuxt start` (with the [`nuxt-start`](https://www.npmjs.com/package/nuxt-start){rel="&#x22;nofollow&#x22;"} or [`nuxt`](https://www.npmjs.com/package/nuxt){rel="&#x22;nofollow&#x22;"} distributions) or custom programmatic usage, which is fragile and prone to breakage and not suitable for serverless and service worker environments.

Nuxt generates this dist when running `nuxt build` into a [`.output`](https://nuxt.com/docs/3.x/directory-structure/output) directory.

The output contains runtime code to run your Nuxt server in any environment (including experimental browser service workers!) and serve your static files, making it a true hybrid framework for the JAMstack. In addition, Nuxt implements a native storage layer, supporting multi-source drivers and local assets.

## ::read-more

icon: i-simple-icons-github
target: \_blank
to: https://github.com/nitrojs/nitro

---

Read more about Nitro engine on GitHub.
::

---

## IIS

**URL:** llms-txt#iis

**Contents:**

- Using IISnode
- More options

1. Install the latest LTS version of [Node.js](https://nodejs.org/en/){rel="&#x22;nofollow&#x22;"} on your Windows Server.
2. Install [IISnode](https://github.com/azure/iisnode/releases){rel="&#x22;nofollow&#x22;"}
3. Install [IIS `URLRewrite` Module](https://www.iis.net/downloads/microsoft/url-rewrite){rel="&#x22;nofollow&#x22;"}.
4. In IIS, add `.mjs` as a new mime type and set its content type to `application/javascript`.
5. Build you application with the following command:

6. Deploy the contents of your `.output` folder to your website in IIS.

::read-more{target="\_blank" to="https://nitro.unjs.io/deploy/providers/iis"}
Head over **Nitro documentation** to learn more about the IIS deployment presets.
::

---

## Undefined

**URL:** llms-txt#undefined

Undefined is a london-based digital studio. We imagine, build & grow performant Websites & Digital Products. We’re a hands-on team of designers & developers that joins forces with forward-thinking startups & enterprises dedicated to their craft.

We believe in the power of collaboration, mixing your expertise in your industry with our love & knowledge for building great digital experiences.

We specialize in building custom web experiences, with our passion being building engaging & bespoke headless CMS setups. Being a partner with a range of great services (Vercel, Prismic, Storyblok, Shopify) gives us deep knowledge to pick the right fit for every project.

---

## ignore page inside ignore folder

**URL:** llms-txt#ignore-page-inside-ignore-folder

---

## Layouts

**URL:** llms-txt#layouts

::read-more{to="https://nuxt.com/docs/getting-started/views#layouts"}
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
::

## ::sandbox

branch: main
dir: examples/features/layouts
file: pages/index.vue
repo: nuxt/examples

---

::

---

## WASM

**URL:** llms-txt#wasm

## ::sandbox

branch: main
dir: examples/experimental/wasm
file: app.vue
repo: nuxt/examples

---

::

---

## <Teleport>

**URL:** llms-txt#<teleport>

**Contents:**

- Body Teleport
- Client-side Teleport

::warning
The `to` target of [`<Teleport>`](https://vuejs.org/guide/built-ins/teleport.html){rel=""nofollow""} expects a CSS selector string or an actual DOM node. Nuxt currently has SSR support for teleports to `#teleports` only, with client-side support for other targets using a `<ClientOnly>` wrapper.
::

## Client-side Teleport

::link-example{to="https://nuxt.com/docs/examples/advanced/teleport"}
::

**Examples:**

Example 1 (vue):

```vue
<template>
  <button @click="open = true">Open Modal</button>
  <Teleport to="#teleports">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
```

Example 2 (vue):

```vue
<template>
  <ClientOnly>
    <Teleport to="#some-selector">
      <!-- content -->
    </Teleport>
  </ClientOnly>
</template>
```

---

## <NuxtLayout>

**URL:** llms-txt#<nuxtlayout>

**Contents:**

- Props
- Additional Props
- Transitions
- Layout's Ref

You can use `<NuxtLayout />` component to activate the `default` layout on `app.vue` or `error.vue`.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
::

- `name`: Specify a layout name to be rendered, can be a string, reactive reference or a computed property. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts) directory.

- **type**: `string`
  - **default**: `default`

::note
Please note the layout name is normalized to kebab-case, so if your layout file is named `errorLayout.vue`, it will become `error-layout` when passed as a `name` property to `<NuxtLayout />`.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
Read more about dynamic layouts.
::

- `fallback`: If an invalid layout is passed to the `name` prop, no layout will be rendered. Specify a `fallback` layout to be rendered in this scenario. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts) directory.

- **type**: `string`
  - **default**: `null`

`NuxtLayout` also accepts any additional props that you may need to pass to the layout. These custom props are then made accessible as attributes.

In the above example, the value of `title` will be available using `$attrs.title` in the template or `useAttrs().title` in `<script setup>` at custom.vue.

`<NuxtLayout />` renders incoming content via `<slot />`, which is then wrapped around Vue’s `<Transition />` component to activate layout transition. For this to work as expected, it is recommended that `<NuxtLayout />` is **not** the root element of the page component.

::read-more{to="https://nuxt.com/docs/getting-started/transitions"}
::

To get the ref of a layout component, access it through `ref.value.layoutRef`.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
::

**Examples:**

Example 1 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
::

## Props

- `name`: Specify a layout name to be rendered, can be a string, reactive reference or a computed property. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts) directory.


  - **type**: `string`
  - **default**: `default`
```

Example 2 (unknown):

```unknown
::note
Please note the layout name is normalized to kebab-case, so if your layout file is named `errorLayout.vue`, it will become `error-layout` when passed as a `name` property to `<NuxtLayout />`.
::
```

Example 3 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/guide/directory-structure/layouts"}
Read more about dynamic layouts.
::

- `fallback`: If an invalid layout is passed to the `name` prop, no layout will be rendered. Specify a `fallback` layout to be rendered in this scenario. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/3.x/directory-structure/layouts) directory.


  - **type**: `string`
  - **default**: `null`

## Additional Props

`NuxtLayout` also accepts any additional props that you may need to pass to the layout. These custom props are then made accessible as attributes.
```

Example 4 (unknown):

```unknown
In the above example, the value of `title` will be available using `$attrs.title` in the template or `useAttrs().title` in `<script setup>` at custom.vue.
```

---

## Lifecycle Hooks

**URL:** llms-txt#lifecycle-hooks

**Contents:**

- App Hooks (runtime)
- Nuxt Hooks (build time)
- Nitro App Hooks (runtime, server-side)

::read-more{to="https://nuxt.com/docs/guide/going-further/hooks"}
::

## App Hooks (runtime)

Check the [app source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts#L37){rel="&#x22;nofollow&#x22;"} for all available hooks.

| Hook                         | Arguments           | Environment     | Description                                                                                                                                                                                           |
| ---------------------------- | ------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app:created`                | `vueApp`            | Server & Client | Called when initial `vueApp` instance is created.                                                                                                                                                     |
| `app:error`                  | `err`               | Server & Client | Called when a fatal error occurs.                                                                                                                                                                     |
| `app:error:cleared`          | `{ redirect? }`     | Server & Client | Called when a fatal error occurs.                                                                                                                                                                     |
| `vue:setup`                  | -                   | Server & Client | Called when the setup of Nuxt root is initialized. This callback must be synchronous.                                                                                                                 |
| `vue:error`                  | `err, target, info` | Server & Client | Called when a vue error propagates to the root component. [Learn More](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured){rel="&#x22;nofollow&#x22;"}.                             |
| `app:rendered`               | `renderContext`     | Server          | Called when SSR rendering is done.                                                                                                                                                                    |
| `app:redirected`             | -                   | Server          | Called before SSR redirection.                                                                                                                                                                        |
| `app:beforeMount`            | `vueApp`            | Client          | Called before mounting the app, called only on client side.                                                                                                                                           |
| `app:mounted`                | `vueApp`            | Client          | Called when Vue app is initialized and mounted in browser.                                                                                                                                            |
| `app:suspense:resolve`       | `appComponent`      | Client          | On [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense){rel="&#x22;nofollow&#x22;"} resolved event.                                                                                   |
| `app:manifest:update`        | `{ id, timestamp }` | Client          | Called when there is a newer version of your app detected.                                                                                                                                            |
| `app:data:refresh`           | `keys?`             | Client          | Called when `refreshNuxtData` is called.                                                                                                                                                              |
| `link:prefetch`              | `to`                | Client          | Called when a `<NuxtLink>` is observed to be prefetched.                                                                                                                                              |
| `page:start`                 | `pageComponent?`    | Client          | Called on [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense){rel="&#x22;nofollow&#x22;"} inside of `NuxtPage` pending event.                                                        |
| `page:finish`                | `pageComponent?`    | Client          | Called on [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense){rel="&#x22;nofollow&#x22;"} inside of `NuxtPage` resolved event.                                                       |
| `page:loading:start`         | -                   | Client          | Called when the `setup()` of the new page is running.                                                                                                                                                 |
| `page:loading:end`           | -                   | Client          | Called after `page:finish`                                                                                                                                                                            |
| `page:transition:finish`     | `pageComponent?`    | Client          | After page transition [onAfterLeave](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks){rel="&#x22;nofollow&#x22;"} event.                                                           |
| `dev:ssr-logs`               | `logs`              | Client          | Called with an array of server-side logs that have been passed to the client (if `features.devLogs` is enabled).                                                                                      |
| `page:view-transition:start` | `transition`        | Client          | Called after `document.startViewTransition` is called when [experimental viewTransition support is enabled](https://nuxt.com/docs/3.x/getting-started/transitions#view-transitions-api-experimental). |

## Nuxt Hooks (build time)

Check the [schema source code](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts#L83){rel="&#x22;nofollow&#x22;"} for all available hooks.

| Hook                        | Arguments                                                | Description                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kit:compatibility`         | `compatibility, issues`                                  | Allows extending compatibility checks.                                                                                                                                                                     |
| `ready`                     | `nuxt`                                                   | Called after Nuxt initialization, when the Nuxt instance is ready to work.                                                                                                                                 |
| `close`                     | `nuxt`                                                   | Called when Nuxt instance is gracefully closing.                                                                                                                                                           |
| `restart`                   | `{ hard?: boolean }`                                     | To be called to restart the current Nuxt instance.                                                                                                                                                         |
| `modules:before`            | -                                                        | Called during Nuxt initialization, before installing user modules.                                                                                                                                         |
| `modules:done`              | -                                                        | Called during Nuxt initialization, after installing user modules.                                                                                                                                          |
| `app:resolve`               | `app`                                                    | Called after resolving the `app` instance.                                                                                                                                                                 |
| `app:templates`             | `app`                                                    | Called during `NuxtApp` generation, to allow customizing, modifying or adding new files to the build directory (either virtually or to written to `.nuxt`).                                                |
| `app:templatesGenerated`    | `app`                                                    | Called after templates are compiled into the [virtual file system](https://nuxt.com/docs/3.x/directory-structure/nuxt#virtual-file-system) (vfs).                                                          |
| `build:before`              | -                                                        | Called before Nuxt bundle builder.                                                                                                                                                                         |
| `build:done`                | -                                                        | Called after Nuxt bundle builder is complete.                                                                                                                                                              |
| `build:manifest`            | `manifest`                                               | Called during the manifest build by Vite and webpack. This allows customizing the manifest that Nitro will use to render `<script>` and `<link>` tags in the final HTML.                                   |
| `builder:generateApp`       | `options`                                                | Called before generating the app.                                                                                                                                                                          |
| `builder:watch`             | `event, path`                                            | Called at build time in development when the watcher spots a change to a file or directory in the project.                                                                                                 |
| `pages:extend`              | `pages`                                                  | Called after page routes are scanned from the file system.                                                                                                                                                 |
| `pages:resolved`            | `pages`                                                  | Called after page routes have been augmented with scanned metadata.                                                                                                                                        |
| `pages:routerOptions`       | `{ files: Array<{ path: string, optional?: boolean }> }` | Called when resolving `router.options` files. Later items in the array override earlier ones.                                                                                                              |
| `server:devHandler`         | `handler`                                                | Called when the dev middleware is being registered on the Nitro dev server.                                                                                                                                |
| `imports:sources`           | `presets`                                                | Called at setup allowing modules to extend sources.                                                                                                                                                        |
| `imports:extend`            | `imports`                                                | Called at setup allowing modules to extend imports.                                                                                                                                                        |
| `imports:context`           | `context`                                                | Called when the [unimport](https://github.com/unjs/unimport){rel="&#x22;nofollow&#x22;"} context is created.                                                                                               |
| `imports:dirs`              | `dirs`                                                   | Allows extending import directories.                                                                                                                                                                       |
| `components:dirs`           | `dirs`                                                   | Called within `app:resolve` allowing to extend the directories that are scanned for auto-importable components.                                                                                            |
| `components:extend`         | `components`                                             | Allows extending new components.                                                                                                                                                                           |
| `nitro:config`              | `nitroConfig`                                            | Called before initializing Nitro, allowing customization of Nitro's configuration.                                                                                                                         |
| `nitro:init`                | `nitro`                                                  | Called after Nitro is initialized, which allows registering Nitro hooks and interacting directly with Nitro.                                                                                               |
| `nitro:build:before`        | `nitro`                                                  | Called before building the Nitro instance.                                                                                                                                                                 |
| `nitro:build:public-assets` | `nitro`                                                  | Called after copying public assets. Allows modifying public assets before Nitro server is built.                                                                                                           |
| `prerender:routes`          | `ctx`                                                    | Allows extending the routes to be pre-rendered.                                                                                                                                                            |
| `build:error`               | `error`                                                  | Called when an error occurs at build time.                                                                                                                                                                 |
| `prepare:types`             | `options`                                                | Called before `@nuxt/cli` writes `.nuxt/tsconfig.json` and `.nuxt/nuxt.d.ts`, allowing addition of custom references and declarations in `nuxt.d.ts`, or directly modifying the options in `tsconfig.json` |
| `listen`                    | `listenerServer, listener`                               | Called when the dev server is loading.                                                                                                                                                                     |
| `schema:extend`             | `schemas`                                                | Allows extending default schemas.                                                                                                                                                                          |
| `schema:resolved`           | `schema`                                                 | Allows extending resolved schema.                                                                                                                                                                          |
| `schema:beforeWrite`        | `schema`                                                 | Called before writing the given schema.                                                                                                                                                                    |
| `schema:written`            | -                                                        | Called after the schema is written.                                                                                                                                                                        |
| `vite:extend`               | `viteBuildContext`                                       | Allows extending Vite default context.                                                                                                                                                                     |
| `vite:extendConfig`         | `viteInlineConfig, env`                                  | Allows extending Vite default config. \*\*Deprecated in Nuxt 5+.\*\* In Nuxt 5, this operates on a shared configuration rather than separate client/server configs.                                        |
| `vite:configResolved`       | `viteInlineConfig, env`                                  | Allows reading the resolved Vite config. \*\*Deprecated in Nuxt 5+.\*\* In Nuxt 5, this operates on a shared configuration rather than separate client/server configs.                                     |
| `vite:serverCreated`        | `viteServer, env`                                        | Called when the Vite server is created.                                                                                                                                                                    |
| `vite:compiled`             | -                                                        | Called after Vite server is compiled.                                                                                                                                                                      |
| `webpack:config`            | `webpackConfigs`                                         | Called before configuring the webpack compiler.                                                                                                                                                            |
| `webpack:configResolved`    | `webpackConfigs`                                         | Allows reading the resolved webpack config.                                                                                                                                                                |
| `webpack:compile`           | `options`                                                | Called right before compilation.                                                                                                                                                                           |
| `webpack:compiled`          | `options`                                                | Called after resources are loaded.                                                                                                                                                                         |
| `webpack:change`            | `shortPath`                                              | Called on `change` on WebpackBar.                                                                                                                                                                          |
| `webpack:error`             | -                                                        | Called on `done` if has errors on WebpackBar.                                                                                                                                                              |
| `webpack:done`              | -                                                        | Called on `allDone` on WebpackBar.                                                                                                                                                                         |
| `webpack:progress`          | `statesArray`                                            | Called on `progress` on WebpackBar.                                                                                                                                                                        |

## Nitro App Hooks (runtime, server-side)

See [Nitro](https://nitro.build/guide/plugins#available-hooks){rel="&#x22;nofollow&#x22;"} for all available hooks.

| Hook              | Arguments                                  | Description                                 | Types                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev:ssr-logs`    | `{ path, logs }`                           | Server                                      | Called at the end of a request cycle with an array of server-side logs.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `render:response` | `response, { event }`                      | Called before sending the response.         | [response](https://github.com/nuxt/nuxt/blob/71ef8bd3ff207fd51c2ca18d5a8c7140476780c7/packages/nuxt/src/core/runtime/nitro/renderer.ts#L24){rel="&#x22;nofollow&#x22;"}, [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}                                                                                                                                                                                     |
| `render:html`     | `html, { event }`                          | Called before constructing the HTML.        | [html](https://github.com/nuxt/nuxt/blob/71ef8bd3ff207fd51c2ca18d5a8c7140476780c7/packages/nuxt/src/core/runtime/nitro/renderer.ts#L15){rel="&#x22;nofollow&#x22;"}, [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}                                                                                                                                                                                         |
| `render:island`   | `islandResponse, { event, islandContext }` | Called before constructing the island HTML. | [islandResponse](https://github.com/nuxt/nuxt/blob/e50cabfed1984c341af0d0c056a325a8aec26980/packages/nuxt/src/core/runtime/nitro/renderer.ts#L28){rel="&#x22;nofollow&#x22;"}, [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}, [islandContext](https://github.com/nuxt/nuxt/blob/e50cabfed1984c341af0d0c056a325a8aec26980/packages/nuxt/src/core/runtime/nitro/renderer.ts#L38){rel="&#x22;nofollow&#x22;"} |
| `close`           | -                                          | Called when Nitro is closed.                | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `error`           | `error, { event? }`                        | Called when an error occurs.                | [error](https://github.com/nitrojs/nitro/blob/d20ffcbd16fc4003b774445e1a01e698c2bb078a/src/types/runtime/nitro.ts#L48){rel="&#x22;nofollow&#x22;"}, [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}                                                                                                                                                                                                          |
| `request`         | `event`                                    | Called when a request is received.          | [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}                                                                                                                                                                                                                                                                                                                                                              |
| `beforeResponse`  | `event, { body }`                          | Called before sending the response.         | [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}, unknown                                                                                                                                                                                                                                                                                                                                                     |
| `afterResponse`   | `event, { body }`                          | Called after sending the response.          | [event](https://github.com/h3js/h3/blob/f6ceb5581043dc4d8b6eab91e9be4531e0c30f8e/src/types.ts#L38){rel="&#x22;nofollow&#x22;"}, unknown                                                                                                                                                                                                                                                                                                                                                     |

---

## Node dependencies

**URL:** llms-txt#node-dependencies

---

## <NuxtLink>

**URL:** llms-txt#<nuxtlink>

**Contents:**

- Internal Routing
  - Passing Params to Dynamic Routes
  - Handling Static File and Cross-App Links
- External Routing
- `rel` and `noRel` Attributes
- Prefetch Links
  - Custom Prefetch Triggers
  - Enable Cross-origin Prefetch
  - Disable prefetch globally
- Props

::note
`<NuxtLink>` is a drop-in replacement for both Vue Router's `<RouterLink>` component and HTML's `<a>` tag. It intelligently determines whether the link is _internal_ or _external_ and renders it accordingly with available optimizations (prefetching, default attributes, etc.)
::

In this example, we use `<NuxtLink>` component to link to another page of the application.

### Passing Params to Dynamic Routes

In this example, we pass the `id` param to link to the route `~/pages/posts/[id].vue`.

::tip
Check out the Pages panel in Nuxt DevTools to see the route name and the params it might take.
::

::tip
When you pass an object into the `to` prop, `<NuxtLink>` will inherit Vue Router’s handling of query parameters. Keys and values will be automatically encoded, so you don’t need to call `encodeURI` or `encodeURIComponent` manually.
::

### Handling Static File and Cross-App Links

By default, `<NuxtLink>` uses Vue Router's client side navigation for relative route. When linking to static files in the `/public` directory or to another application hosted on the same domain, it might result in unexpected 404 errors because they are not part of the client routes. In such cases, you can use the `external` prop with `<NuxtLink>` to bypass Vue Router's internal routing mechanism.

The `external` prop explicitly indicates that the link is external. `<NuxtLink>` will render the link as a standard HTML `<a>` tag. This ensures the link behaves correctly, bypassing Vue Router’s logic and directly pointing to the resource.

#### Linking to Static Files

For static files in the `/public` directory, such as PDFs or images, use the `external` prop to ensure the link resolves correctly.

#### Linking to a Cross-App URL

When pointing to a different application on the same domain, using the `external` prop ensures the correct behavior.

Using the `external` prop or relying on automatic handling ensures proper navigation, avoids unexpected routing issues, and improves compatibility with static resources or cross-application scenarios.

In this example, we use `<NuxtLink>` component to link to a website.

## `rel` and `noRel` Attributes

A `rel` attribute of `noopener noreferrer` is applied by default to links with a `target` attribute or to absolute links (e.g., links starting with `http://`, `https://`, or `//`).

- `noopener` solves a [security bug](https://mathiasbynens.github.io/rel-noopener/){rel="&#x22;nofollow&#x22;"} in older browsers.
- `noreferrer` improves privacy for your users by not sending the `Referer` header to the linked site.

These defaults have no negative impact on SEO and are considered [best practice](https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener){rel="&#x22;nofollow&#x22;"}.

When you need to overwrite this behavior you can use the `rel` or `noRel` props.

A `noRel` prop can be used to prevent the default `rel` attribute from being added to the absolute links.

::note
`noRel` and `rel` cannot be used together. `rel` will be ignored.
::

Nuxt automatically includes smart prefetching. That means it detects when a link is visible (by default), either in the viewport or when scrolling and prefetches the JavaScript for those pages so that they are ready when the user clicks the link. Nuxt only loads the resources when the browser isn't busy and skips prefetching if your connection is offline or if you only have 2g connection.

### Custom Prefetch Triggers

We now support custom prefetch triggers for `<NuxtLink>` after `v3.13.0`. You can use the `prefetchOn` prop to control when to prefetch links.

- `visibility`: Prefetches when the link becomes visible in the viewport. Monitors the element's intersection with the viewport using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API){rel="&#x22;nofollow&#x22;"}. Prefetching is triggered when the element is scrolled into view.
- `interaction`: Prefetches when the link is hovered or focused. This approach listens for `pointerenter` and `focus` events, proactively prefetching resources when the user indicates intent to interact.

You can also use an object to configure `prefetchOn`:

That you probably don't want both enabled!

This configuration will observe when the element enters the viewport and also listen for `pointerenter` and `focus` events. This may result in unnecessary resource usage or redundant prefetching, as both triggers can prefetch the same resource under different conditions.

### Enable Cross-origin Prefetch

To enable cross-origin prefetching, you can set the `crossOriginPrefetch` option in your `nuxt.config`. This will enable cross-origin prefetching using the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API){rel="&#x22;nofollow&#x22;"}.

### Disable prefetch globally

It's also possible to enable/disable prefetching all links globally for your app.

When not using `external`, `<NuxtLink>` supports all Vue Router's [`RouterLink` props](https://router.vuejs.org/api/interfaces/RouterLinkProps.html){rel="&#x22;nofollow&#x22;"}

- `to`: Any URL or a [route location object](https://router.vuejs.org/api/type-aliases/RouteLocation.html){rel="&#x22;nofollow&#x22;"} from Vue Router
- `custom`: Whether `<NuxtLink>` should wrap its content in an `<a>` element. It allows taking full control of how a link is rendered and how navigation works when it is clicked. Works the same as [Vue Router's `custom` prop](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom){rel="&#x22;nofollow&#x22;"}
- `exactActiveClass`: A class to apply on exact active links. Works the same as [Vue Router's `exactActiveClass` prop](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-exactActiveClass){rel="&#x22;nofollow&#x22;"} on internal links. Defaults to Vue Router's default (`"router-link-exact-active"`)
- `activeClass`: A class to apply on active links. Works the same as [Vue Router's `activeClass` prop](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-activeClass){rel="&#x22;nofollow&#x22;"} on internal links. Defaults to Vue Router's default (`"router-link-active"`)
- `replace`: Works the same as [Vue Router's `replace` prop](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Properties-replace){rel="&#x22;nofollow&#x22;"} on internal links
- `ariaCurrentValue`: An `aria-current` attribute value to apply on exact active links. Works the same as [Vue Router's `ariaCurrentValue` prop](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-ariaCurrentValue){rel="&#x22;nofollow&#x22;"} on internal links

- `href`: An alias for `to`. If used with `to`, `href` will be ignored
- `noRel`: If set to `true`, no `rel` attribute will be added to the external link
- `external`: Forces the link to be rendered as an `<a>` tag instead of a Vue Router `RouterLink`.
- `prefetch`: When enabled will prefetch middleware, layouts and payloads (when using [payloadExtraction](https://nuxt.com/docs/3.x/api/nuxt-config#crossoriginprefetch)) of links in the viewport. Used by the experimental [crossOriginPrefetch](https://nuxt.com/docs/3.x/api/nuxt-config#crossoriginprefetch) config.
- `prefetchOn`: Allows custom control of when to prefetch links. Possible options are `interaction` and `visibility` (default). You can also pass an object for full control, for example: `{ interaction: true, visibility: true }`. This prop is only used when `prefetch` is enabled (default) and `noPrefetch` is not set.
- `noPrefetch`: Disables prefetching.
- `prefetchedClass`: A class to apply to links that have been prefetched.

- `target`: A `target` attribute value to apply on the link
- `rel`: A `rel` attribute value to apply on the link. Defaults to `"noopener noreferrer"` for external links.

::tip
Defaults can be overwritten, see [overwriting defaults](https://nuxt.com/#overwriting-defaults) if you want to change them.
::

## Overwriting Defaults

You can overwrite some `<NuxtLink>` defaults in your [`nuxt.config`](https://nuxt.com/docs/3.x/api/nuxt-config#defaults)

::important
These options will likely be moved elsewhere in the future, such as into `app.config` or into the `app/` directory.
::

### Custom Link Component

You can overwrite `<NuxtLink>` defaults by creating your own link component using `defineNuxtLink`.

You can then use `<MyNuxtLink />` component as usual with your new defaults.

### `defineNuxtLink` Signature

- `componentName`: A name for the component. Default is `NuxtLink`.
- `externalRelAttribute`: A default `rel` attribute value applied on external links. Defaults to `"noopener noreferrer"`. Set it to `""` to disable
- `activeClass`: A default class to apply on active links. Works the same as [Vue Router's `linkActiveClass` option](https://router.vuejs.org/api/interfaces/RouterOptions.html#Properties-linkActiveClass){rel="&#x22;nofollow&#x22;"}. Defaults to Vue Router's default (`"router-link-active"`)
- `exactActiveClass`: A default class to apply on exact active links. Works the same as [Vue Router's `linkExactActiveClass` option](https://router.vuejs.org/api/interfaces/RouterOptions.html#Properties-linkExactActiveClass){rel="&#x22;nofollow&#x22;"}. Defaults to Vue Router's default (`"router-link-exact-active"`)
- `trailingSlash`: An option to either add or remove trailing slashes in the `href`. If unset or not matching the valid values `append` or `remove`, it will be ignored.
- `prefetch`: Whether or not to prefetch links by default.
- `prefetchOn`: Granular control of which prefetch strategies to apply by default.
- `prefetchedClass`: A default class to apply to links that have been prefetched.

::link-example{to="https://nuxt.com/docs/examples/routing/pages"}
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

### Passing Params to Dynamic Routes

In this example, we pass the `id` param to link to the route `~/pages/posts/[id].vue`.

::code-group
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

::tip
Check out the Pages panel in Nuxt DevTools to see the route name and the params it might take.
::

::tip
When you pass an object into the `to` prop, `<NuxtLink>` will inherit Vue Router’s handling of query parameters. Keys and values will be automatically encoded, so you don’t need to call `encodeURI` or `encodeURIComponent` manually.
::

### Handling Static File and Cross-App Links

By default, `<NuxtLink>` uses Vue Router's client side navigation for relative route. When linking to static files in the `/public` directory or to another application hosted on the same domain, it might result in unexpected 404 errors because they are not part of the client routes. In such cases, you can use the `external` prop with `<NuxtLink>` to bypass Vue Router's internal routing mechanism.

The `external` prop explicitly indicates that the link is external. `<NuxtLink>` will render the link as a standard HTML `<a>` tag. This ensures the link behaves correctly, bypassing Vue Router’s logic and directly pointing to the resource.

#### Linking to Static Files

For static files in the `/public` directory, such as PDFs or images, use the `external` prop to ensure the link resolves correctly.
```

---

## Run all tests

**URL:** llms-txt#run-all-tests

---

## Generates `layers/subscribe/nuxt.config.ts`

**URL:** llms-txt#generates-`layers/subscribe/nuxt.config.ts`

npx nuxt add layer subscribe

````

---

## useRuntimeConfig

**URL:** llms-txt#useruntimeconfig

**Contents:**
- Usage
- Define Runtime Config
- Access Runtime Config
- Environment Variables
  - Using the `.env` File
- `app` namespace
  - `app.baseURL`
  - `app.cdnURL`

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## Define Runtime Config

The example below shows how to set a public API base URL and a secret API token that is only accessible on the server.

We should always define `runtimeConfig` variables inside `nuxt.config`.

::note
Variables that need to be accessible on the server are added directly inside `runtimeConfig`. Variables that need to be accessible on both the client and the server are defined in `runtimeConfig.public`.
::

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## Access Runtime Config

To access runtime config, we can use `useRuntimeConfig()` composable:

In this example, since `apiBase` is defined within the `public` namespace, it is universally accessible on both server and client-side, while `apiSecret` **is only accessible on the server-side**.

## Environment Variables

It is possible to update runtime config values using a matching environment variable name prefixed with `NUXT_`.

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

### Using the `.env` File

We can set the environment variables inside the `.env` file to make them accessible during **development** and **build/generate**.

::note
Any environment variables set within `.env` file are accessed using `process.env` in the Nuxt app during **development** and **build/generate**.
::

::warning
In **production runtime**, you should use platform environment variables and `.env` is not used.
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/env"}
::

Nuxt uses `app` namespace in runtime-config with keys including `baseURL` and `cdnURL`. You can customize their values at runtime by setting environment variables.

::note
This is a reserved namespace. You should not introduce additional keys inside `app`.
::

By default, the `baseURL` is set to `'/'`.

However, the `baseURL` can be updated at runtime by setting the `NUXT_APP_BASE_URL` as an environment variable.

Then, you can access this new base URL using `config.app.baseURL`:

This example shows how to set a custom CDN url and access them using `useRuntimeConfig()`.

You can use a custom CDN for serving static assets inside `.output/public` using the `NUXT_APP_CDN_URL` environment variable.

And then access the new CDN url using `config.app.cdnURL`.

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

**Examples:**

Example 1 (unknown):
```unknown

````

Example 2 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## Define Runtime Config

The example below shows how to set a public API base URL and a secret API token that is only accessible on the server.

We should always define `runtimeConfig` variables inside `nuxt.config`.
```

Example 3 (unknown):

```unknown
::note
Variables that need to be accessible on the server are added directly inside `runtimeConfig`. Variables that need to be accessible on both the client and the server are defined in `runtimeConfig.public`.
::

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

## Access Runtime Config

To access runtime config, we can use `useRuntimeConfig()` composable:
```

Example 4 (unknown):

```unknown
In this example, since `apiBase` is defined within the `public` namespace, it is universally accessible on both server and client-side, while `apiSecret` **is only accessible on the server-side**.

## Environment Variables

It is possible to update runtime config values using a matching environment variable name prefixed with `NUXT_`.

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

### Using the `.env` File

We can set the environment variables inside the `.env` file to make them accessible during **development** and **build/generate**.
```

---

## AWS Amplify

**URL:** llms-txt#aws-amplify

**Contents:**

- Setup
- Learn more

::tip
**Zero Configuration ✨**

Integration with AWS Amplify is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

1. Login to the [AWS Amplify Hosting Console](https://console.aws.amazon.com/amplify/?trk=01c5a476-5997-4e6a-88b9-fd0a0a5bbe34&sc_channel=el){rel="&#x22;nofollow&#x22;"}
2. Click on "Get Started" > Amplify Hosting (Host your web app)
3. Select and authorize access to your Git repository provider and select the main branch
4. Choose a name for your app, make sure build settings are auto-detected and optionally set requirement environment variables under the advanced section
5. Optionally, select Enable SSR logging to enable server-side logging to your Amazon CloudWatch account
6. Confirm configuration and click on "Save and Deploy"

::read-more{target="\_blank" to="https://www.youtube.com/watch?v=CAk5_XGkOG4"}
Watch an Amplify Hosting tutorial with Nuxt
::

## ::read-more

target: \_blank
to: https://nitro.unjs.io/deploy/providers/aws-amplify

---

Head over **Nitro documentation** to learn more about the aws-amplify deployment preset.
::

---

## useAppConfig

**URL:** llms-txt#useappconfig

**Contents:**

- Usage

::read-more{to="https://nuxt.com/docs/guide/directory-structure/app-config"}
::

**Examples:**

Example 1 (ts):

```ts
const appConfig = useAppConfig();

console.log(appConfig);
```

---

## The Coding Machine

**URL:** llms-txt#the-coding-machine

The Coding Machine has been specialized in tailor-made development around Open Source technologies for more than 15 years.

We like to work and partner with companies of all sizes, from entrepreneurs to multinationals, in all sectors. Technical expertise, challenge (and curiosity) is what drives us.

---

## .env

**URL:** llms-txt#.env

**Contents:**

- Dev, Build and Generate Time
- Custom File
- Production
- Production Preview

::important
This file should be added to your [`.gitignore`](https://nuxt.com/docs/3.x/directory-structure/gitignore) file to avoid pushing secrets to your repository.
::

## Dev, Build and Generate Time

Nuxt CLI has built-in [dotenv](https://github.com/motdotla/dotenv){rel="&#x22;nofollow&#x22;"} support in development mode and when running [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build) and [`nuxt generate`](https://nuxt.com/docs/3.x/api/commands/generate).

In addition to any process environment variables, if you have a `.env` file in your project root directory, it will be automatically loaded **at dev, build and generate time**. Any environment variables set there will be accessible within your `nuxt.config` file and modules.

::note
Note that removing a variable from `.env` or removing the `.env` file entirely will not unset values that have already been set.
::

If you want to use a different file - for example, to use `.env.local` or `.env.production` - you can do so by passing the `--dotenv` flag when using the Nuxt CLI.

When updating `.env` in development mode, the Nuxt instance is automatically restarted to apply new values to the `process.env`.

::important
In your application code, you should use [Runtime Config](https://nuxt.com/docs/3.x/guide/going-further/runtime-config) instead of plain env variables.
::

**After your server is built**, you are responsible for setting environment variables when you run the server.

Your `.env` files will not be read at this point. How you do this is different for every environment.

This design decision was made to ensure compatibility across various deployment environments, some of which may not have a traditional file system available, such as serverless platforms or edge networks like Cloudflare Workers.

Since `.env` files are not used in production, you must explicitly set environment variables using the tools and methods provided by your hosting environment. Here are some common approaches:

- You can pass the environment variables as arguments using the terminal:

`$ DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs`

- You can set environment variables in shell configuration files like `.bashrc` or `.profile`.
- Many cloud service providers, such as Vercel, Netlify, and AWS, provide interfaces for setting environment variables via their dashboards, CLI tools or configuration files.

::important
`runtimeConfig` [won't pick up environment variables that don't start with `NUXT_` in production] (<https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables>{rel=""nofollow""}).
::

## Production Preview

For local production preview purpose, we recommend using [`nuxt preview`](https://nuxt.com/docs/3.x/api/commands/preview) since using this command, the `.env` file will be loaded into `process.env` for convenience. Note that this command requires dependencies to be installed in the package directory.

Or you could pass the environment variables as arguments using the terminal. For example, on Linux or macOS:

Note that for a purely static site, it is not possible to set runtime configuration config after your project is prerendered.

::read-more{to="https://nuxt.com/docs/guide/going-further/runtime-config"}
::

::note
If you want to use environment variables set at build time but do not care about updating these down the line (or only need to update them reactively _within_ your app) then `appConfig` may be a better choice. You can define `appConfig` both within your `nuxt.config` (using environment variables) and also within an `~/app.config.ts` file in your project.

:::read-more{to="https://nuxt.com/docs/guide/directory-structure/app-config"}
:::
::

**Examples:**

Example 1 (unknown):

```unknown
::note
Note that removing a variable from `.env` or removing the `.env` file entirely will not unset values that have already been set.
::

## Custom File

If you want to use a different file - for example, to use `.env.local` or `.env.production` - you can do so by passing the `--dotenv` flag when using the Nuxt CLI.
```

Example 2 (unknown):

```unknown
When updating `.env` in development mode, the Nuxt instance is automatically restarted to apply new values to the `process.env`.

::important
In your application code, you should use [Runtime Config](https://nuxt.com/docs/3.x/guide/going-further/runtime-config) instead of plain env variables.
::

## Production

**After your server is built**, you are responsible for setting environment variables when you run the server.

Your `.env` files will not be read at this point. How you do this is different for every environment.

This design decision was made to ensure compatibility across various deployment environments, some of which may not have a traditional file system available, such as serverless platforms or edge networks like Cloudflare Workers.

Since `.env` files are not used in production, you must explicitly set environment variables using the tools and methods provided by your hosting environment. Here are some common approaches:

- You can pass the environment variables as arguments using the terminal:

`$ DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs`

- You can set environment variables in shell configuration files like `.bashrc` or `.profile`.
- Many cloud service providers, such as Vercel, Netlify, and AWS, provide interfaces for setting environment variables via their dashboards, CLI tools or configuration files.

::important
`runtimeConfig` [won't pick up environment variables that don't start with `NUXT_` in production] (<https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables>{rel=""nofollow""}).
::

## Production Preview

For local production preview purpose, we recommend using [`nuxt preview`](https://nuxt.com/docs/3.x/api/commands/preview) since using this command, the `.env` file will be loaded into `process.env` for convenience. Note that this command requires dependencies to be installed in the package directory.

Or you could pass the environment variables as arguments using the terminal. For example, on Linux or macOS:
```

---

## useRouter

**URL:** llms-txt#userouter

**Contents:**

- Basic Manipulation
- Based on History API
- Navigation Guards
- Promise and Error Handling
- Universal Router Instance

If you only need the router instance within your template, use `$router`:

If you have a `pages/` directory, `useRouter` is identical in behavior to the one provided by `vue-router`.

## ::read-more

icon: i-simple-icons-vuedotjs
target: \_blank
to: https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute

---

Read `vue-router` documentation about the `Router` interface.
::

## Basic Manipulation

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute){rel="&#x22;nofollow&#x22;"}: Add a new route to the router instance. `parentName` can be provided to add new route as the child of an existing route.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute){rel="&#x22;nofollow&#x22;"}: Remove an existing route by its name.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes){rel="&#x22;nofollow&#x22;"}: Get a full list of all the route records.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute){rel="&#x22;nofollow&#x22;"}: Checks if a route with a given name exists.
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve){rel="&#x22;nofollow&#x22;"}: Returns the normalized version of a route location. Also includes an `href` property that includes any existing base.

::note
`router.addRoute()` adds route details into an array of routes and it is useful while building [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) while `router.push()` on the other hand, triggers a new navigation immediately and it is useful in pages, Vue components and composable.
::

## Based on History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back){rel="&#x22;nofollow&#x22;"}: Go back in history if possible, same as `router.go(-1)`.
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward){rel="&#x22;nofollow&#x22;"}: Go forward in history if possible, same as `router.go(1)`.
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go){rel="&#x22;nofollow&#x22;"}: Move forward or backward through the history without the hierarchical restrictions enforced in `router.back()` and `router.forward()`.
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push){rel="&#x22;nofollow&#x22;"}: Programmatically navigate to a new URL by pushing an entry in the history stack. \*\*It is recommended to use [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to) instead.\*\*
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace){rel="&#x22;nofollow&#x22;"}: Programmatically navigate to a new URL by replacing the current entry in the routes history stack. \*\*It is recommended to use [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to) instead.\*\*

## ::read-more

icon: i-simple-icons-mdnwebdocs
target: \_blank
to: https://developer.mozilla.org/en-US/docs/Web/API/History

---

Read more about the browser's History API.
::

`useRouter` composable provides `afterEach`, `beforeEach` and `beforeResolve` helper methods that acts as navigation guards.

However, Nuxt has a concept of **route middleware** that simplifies the implementation of navigation guards and provides a better developer experience.

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

## Promise and Error Handling

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady){rel="&#x22;nofollow&#x22;"}: Returns a Promise that resolves when the router has completed the initial navigation.
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError){rel="&#x22;nofollow&#x22;"}: Adds an error handler that is called every time a non caught error happens during navigation.

## ::read-more

icon: i-simple-icons-vuedotjs
target: \_blank
title: Vue Router Docs
to: https://router.vuejs.org/api/interfaces/Router.html#Methods

---

::

## Universal Router Instance

If you do not have a `pages/` folder, then [`useRouter`](https://nuxt.com/docs/3.x/api/composables/use-router) will return a universal router instance with similar helper methods, but be aware that not all features may be supported or behave in exactly the same way as with `vue-router`.

**Examples:**

Example 1 (unknown):

```unknown
If you only need the router instance within your template, use `$router`:
```

Example 2 (unknown):

```unknown
If you have a `pages/` directory, `useRouter` is identical in behavior to the one provided by `vue-router`.

::read-more
---
icon: i-simple-icons-vuedotjs
target: _blank
to: https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute
---
Read `vue-router` documentation about the `Router` interface.
::

## Basic Manipulation

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute){rel="&#x22;nofollow&#x22;"}: Add a new route to the router instance. `parentName` can be provided to add new route as the child of an existing route.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute){rel="&#x22;nofollow&#x22;"}: Remove an existing route by its name.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes){rel="&#x22;nofollow&#x22;"}: Get a full list of all the route records.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute){rel="&#x22;nofollow&#x22;"}: Checks if a route with a given name exists.
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve){rel="&#x22;nofollow&#x22;"}: Returns the normalized version of a route location. Also includes an `href` property that includes any existing base.
```

Example 3 (unknown):

```unknown
::note
`router.addRoute()` adds route details into an array of routes and it is useful while building [Nuxt plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) while `router.push()` on the other hand, triggers a new navigation immediately and it is useful in pages, Vue components and composable.
::

## Based on History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back){rel="&#x22;nofollow&#x22;"}: Go back in history if possible, same as `router.go(-1)`.
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward){rel="&#x22;nofollow&#x22;"}: Go forward in history if possible, same as `router.go(1)`.
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go){rel="&#x22;nofollow&#x22;"}: Move forward or backward through the history without the hierarchical restrictions enforced in `router.back()` and `router.forward()`.
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push){rel="&#x22;nofollow&#x22;"}: Programmatically navigate to a new URL by pushing an entry in the history stack. &#x2A;*It is recommended to use [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to) instead.**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace){rel="&#x22;nofollow&#x22;"}: Programmatically navigate to a new URL by replacing the current entry in the routes history stack. &#x2A;*It is recommended to use [`navigateTo`](https://nuxt.com/docs/3.x/api/utils/navigate-to) instead.**
```

---

## Nuxt 3.4

**URL:** llms-txt#nuxt-3.4

**Contents:**

- 🪄 View Transitions API Support
- ✨ Payload Enhancements
- 🎁 Object-syntax Nuxt plugins
- 🛠️ Easier Devtools Configuration
- 📚 Layers Improvements
- 🧸 Better Context Transforms
- ♻️ Ecosystem Updates
- 🚨 'Breaking fixes'
- ✅ Upgrading

## 🪄 View Transitions API Support

::article-video{cloudinary="v1681229056/nuxt3/nuxt-view-transitions_cruvma"}
::

You can check a demo on <https://nuxt-view-transitions.surge.sh>{rel="&#x22;nofollow&#x22;"} and the [source on StackBlitz](https://stackblitz.com/edit/nuxt-view-transitions){rel="&#x22;nofollow&#x22;"}.

You may have noticed that Chromium-based browsers now ship a new web platform API: the [**View Transitions API**](https://developer.chrome.com/docs/web-platform/view-transitions/){rel="&#x22;nofollow&#x22;"}. This is an exciting new ability for native browser transitions which (among other things) have the ability to transition between unrelated elements on different pages.

Nuxt now ships with an experimental implementation, which will be under active development during the v3.4 release cycle. See the known issues in the [linked PR](https://github.com/nuxt/nuxt/pull/20092){rel="&#x22;nofollow&#x22;"}.

## ✨ Payload Enhancements

We've merged a \*\*[significant change to how Nuxt handles payloads](https://github.com/nuxt/nuxt/pull/19205){rel="&#x22;nofollow&#x22;"}\*\* (under an experimental flag). Payloads are used to send data from the server to the client when doing server-side rendering and avoid double data-fetching during the hydration phase.

With this new option enabled, this now means that **various rich JS types are supported out-of-the-box**: regular expressions, dates, Map and Set and BigInt as well as NuxtError - and Vue-specific objects like `ref`, `reactive`, `shallowRef` and `shallowReactive`.

You can find [an example](https://github.com/nuxt/nuxt/blob/main/test/fixtures/basic/pages/json-payload.vue){rel="&#x22;nofollow&#x22;"} in our test suite.

This is all possible due to [Rich-Harris/devalue#58](https://github.com/Rich-Harris/devalue/pull/58){rel="&#x22;nofollow&#x22;"}. For a long time, Nuxt has been using our own fork of devalue owing to issues serialising Errors and other non-POJO objects, but we now have transitioned back to the original.

You can even register your own custom types with a new object-syntax Nuxt plugin:

You can read more about how this works [here](https://github.com/rich-harris/devalue#custom-types){rel="&#x22;nofollow&#x22;"}.

**Note**: this only affects payloads of the Nuxt app, that is, data stored within `useState`, returned from `useAsyncData` or manually injected via `nuxtApp.payload`. It does not affect data fetched from Nitro server routes via `$fetch` or `useFetch` although this is one area I am keen to explore further.

Preliminary testing shows a significant speed-up: **25% faster in total server response time** for a very minimal app with a large JSON payload, but I'd urge you to run your own tests and share the results with us.

As mentioned, we're merging this behind a flag so we can test this broadly and gather feedback on the new approach. The most significant potential change is that the payload is now no longer available on `window.__NUXT__` immediately. Instead, we now need to initialise the Nuxt app to parse the payload so any code that accesses `__NUXT__` will need to be run in a plugin or later in the Nuxt app lifecycle. Please feel free to raise an issue if you foresee or encounter issues in your projects.

## 🎁 Object-syntax Nuxt plugins

We now support object-syntax Nuxt plugins for better control over plugin _order_ and easier registration of hooks.

In future we plan to enable build optimizations based on the metadata you pass in your Nuxt plugins.

## 🛠️ Easier Devtools Configuration

It's even easier to enable Nuxt DevTools in your project: just set `devtools: true` in your `nuxt.config.ts` file to enable devtools.

If it's not already installed, Nuxt will prompt to install it locally. This means you no longer need to have Nuxt DevTools enabled globally.

**Note**: the DevTools is still experimental and under active development, so do be prepared for occasional unexpected behaviour, and please report issues directly to <https://github.com/nuxt/devtools>{rel="&#x22;nofollow&#x22;"} 🙏

## 📚 Layers Improvements

We now support [transforming `~`/`~~`/`@`/`@@` aliases within layers](https://github.com/nuxt/nuxt/pull/19986){rel="&#x22;nofollow&#x22;"}, meaning you now no longer need to use relative paths when importing within layers.

This should mean it is much easier to use a 'normal' Nuxt project as a [layer](https://nuxt.com/docs/getting-started/layers#layers){rel="&#x22;nofollow&#x22;"} without needing to specially write it as one.

## 🧸 Better Context Transforms

We [now transform certain keys](https://github.com/nuxt/nuxt/pull/20182){rel="&#x22;nofollow&#x22;"} of `definePageMeta` and `defineNuxtComponent` which means you should have fewer issues with a missing Nuxt instance. This includes support accessing the Nuxt instance after an `await` within `asyncData` and `setup` functions for those still using the Options API. And you no longer need to wrap `middleware` and `validate` with `defineNuxtRouteMiddleware` when using async functions.

## ♻️ Ecosystem Updates

As usual, this release will pull in upstream improvements, including the new [Consola v3](https://github.com/unjs/consola){rel="&#x22;nofollow&#x22;"} and [Nitropack v2.3.3](https://github.com/unjs/nitro){rel="&#x22;nofollow&#x22;"} (a new minor is expected shortly).

## 🚨 'Breaking fixes'

We've also taken the opportunity to do some cleanup in this minor release.

1. Previously it was possible to pass the `x-nuxt-no-ssr` header (undocumented) to force SPA rendering. We've now disabled this behaviour by default but you can get it back by setting `experimental.respectNoSSRHeader` to true. Alternatively, you can set `event.context.nuxt.noSSR` on the server to force SPA rendering.
2. We've [removed the (deprecated) `#head` alias](https://github.com/nuxt/nuxt/pull/20111){rel="&#x22;nofollow&#x22;"} and also disabled the [polyfill for `@vueuse/head` behaviour](https://github.com/nuxt/nuxt/pull/20131){rel="&#x22;nofollow&#x22;"} by default. (It can still be enabled with `experimental.polyfillVueUseHead`.)
3. We've [removed the (deprecated) `experimental.viteNode` option](https://github.com/nuxt/nuxt/pull/20112){rel="&#x22;nofollow&#x22;"}. It can be configured instead with `vite.devBundler`.
4. We've [deprecated accessing public runtime config without the `public` key](https://github.com/nuxt/nuxt/pull/20082){rel="&#x22;nofollow&#x22;"}. This was an undocument compatibility measure with Nuxt 2 and we plan to remove it entirely in v3.5.
5. To fix a bug with our vue-router integration, we now generate a slightly different path matching syntax. If you were relying on the exact path generated, have a look at <https://github.com/nuxt/nuxt/pull/19902>{rel="&#x22;nofollow&#x22;"} for more information.

As usual, our recommendation for upgrading is to run:

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

**Examples:**

Example 1 (ts):

```ts
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
});
```

Example 2 (unknown):

```unknown
With this new option enabled, this now means that **various rich JS types are supported out-of-the-box**: regular expressions, dates, Map and Set and BigInt as well as NuxtError - and Vue-specific objects like `ref`, `reactive`, `shallowRef` and `shallowReactive`.

You can find [an example](https://github.com/nuxt/nuxt/blob/main/test/fixtures/basic/pages/json-payload.vue){rel="&#x22;nofollow&#x22;"} in our test suite.

This is all possible due to [Rich-Harris/devalue#58](https://github.com/Rich-Harris/devalue/pull/58){rel="&#x22;nofollow&#x22;"}. For a long time, Nuxt has been using our own fork of devalue owing to issues serialising Errors and other non-POJO objects, but we now have transitioned back to the original.

You can even register your own custom types with a new object-syntax Nuxt plugin:
```

Example 3 (unknown):

```unknown
You can read more about how this works [here](https://github.com/rich-harris/devalue#custom-types){rel="&#x22;nofollow&#x22;"}.

**Note**: this only affects payloads of the Nuxt app, that is, data stored within `useState`, returned from `useAsyncData` or manually injected via `nuxtApp.payload`. It does not affect data fetched from Nitro server routes via `$fetch` or `useFetch` although this is one area I am keen to explore further.

Preliminary testing shows a significant speed-up: **25% faster in total server response time** for a very minimal app with a large JSON payload, but I'd urge you to run your own tests and share the results with us.

As mentioned, we're merging this behind a flag so we can test this broadly and gather feedback on the new approach. The most significant potential change is that the payload is now no longer available on `window.__NUXT__` immediately. Instead, we now need to initialise the Nuxt app to parse the payload so any code that accesses `__NUXT__` will need to be run in a plugin or later in the Nuxt app lifecycle. Please feel free to raise an issue if you foresee or encounter issues in your projects.

## 🎁 Object-syntax Nuxt plugins

We now support object-syntax Nuxt plugins for better control over plugin *order* and easier registration of hooks.
```

Example 4 (unknown):

```unknown
In future we plan to enable build optimizations based on the metadata you pass in your Nuxt plugins.

## 🛠️ Easier Devtools Configuration

It's even easier to enable Nuxt DevTools in your project: just set `devtools: true` in your `nuxt.config.ts` file to enable devtools.
```

---

## Overview

**URL:** llms-txt#overview

**Contents:**

- Next Steps

There are significant changes when migrating a Nuxt 2 app to Nuxt 3, although you can expect migration to become more straightforward as we move toward a stable release.

::note
This migration guide is under progress to align with the development of Nuxt 3.
::

Some of these significant changes include:

1. Moving from Vue 2 to Vue 3, including defaulting to the Composition API and script setup.
2. Moving from webpack 4 and Babel to Vite or webpack 5 and esbuild.
3. Moving from a runtime Nuxt dependency to a minimal, standalone server compiled with nitropack.

::tip
If you need to remain on Nuxt 2, but want to benefit from Nuxt 3 features in Nuxt 2, you can alternatively check out [how to get started with Bridge](https://nuxt.com/docs/3.x/bridge/overview).
::

- Learn about differences in [configuration](https://nuxt.com/docs/3.x/migration/configuration)

---

## <NuxtTime>

**URL:** llms-txt#<nuxttime>

**Contents:**

- Usage
- Props
  - `datetime`
  - `locale`
  - Formatting Props
  - `relative`
  - Relative Time Formatting Props
- Examples
  - Basic Usage
  - Custom Formatting

::important
This component is available in Nuxt v3.17+.
::

The `<NuxtTime>` component lets you display dates and times in a locale-friendly format with proper `<time>` HTML semantics. It ensures consistent rendering between server and client without hydration mismatches.

You can use the `<NuxtTime>` component anywhere in your app:

- Type: `Date | number | string`
- Required: `true`

The date and time value to display. You can provide:

- A `Date` object
- A timestamp (number)
- An ISO-formatted date string

- Type: `string`
- Required: `false`
- Default: Uses the browser or server's default locale

The [BCP 47 language tag](https://datatracker.ietf.org/doc/html/rfc5646){rel="&#x22;nofollow&#x22;"} for formatting (e.g., 'en-US', 'fr-FR', 'ja-JP'):

The component accepts any property from the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat){rel="&#x22;nofollow&#x22;"} options:

This would output something like: "April 22, 2025, 08:30 AM"

- Type: `boolean`
- Required: `false`
- Default: `false`

Enables relative time formatting using the Intl.RelativeTimeFormat API:

### Relative Time Formatting Props

When `relative` is set to `true`, the component also accepts properties from [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat){rel="&#x22;nofollow&#x22;"}:

::warning
Due to `style` being a reserved prop, `relativeStyle` prop is used instead.
::

This would output something like: "3 days ago" or "last Friday" depending on the `numeric` setting.

### Custom Formatting

### With Custom Locale

**Examples:**

Example 1 (vue):

```vue
<template>
  <NuxtTime :datetime="Date.now()" />
</template>
```

Example 2 (vue):

```vue
<template>
  <NuxtTime :datetime="Date.now()" />
  <NuxtTime :datetime="new Date()" />
  <NuxtTime datetime="2023-06-15T09:30:00.000Z" />
</template>
```

Example 3 (vue):

```vue
<template>
  <NuxtTime :datetime="Date.now()" locale="fr-FR" />
</template>
```

Example 4 (vue):

```vue
<template>
  <NuxtTime :datetime="Date.now()" year="numeric" month="long" day="numeric" hour="2-digit" minute="2-digit" />
</template>
```

---

## Nuxt DevTools v1.0

**URL:** llms-txt#nuxt-devtools-v1.0

**Contents:**

- The Reasons We Built Nuxt DevTools
  - The Problem
- Features
  - In App DevTools
  - Pages View
  - Components View
  - Composables View
  - Modules Management
  - Static Assets Management
  - Runtime Configs Editor

We are thrilled to announce the release of [Nuxt DevTools v1.0](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"}! 🎉

::tip
Since this release, Nuxt DevTools is now enabled with [Nuxt v3.8](https://nuxt.com/blog/v3-8) and onwards by default. Generally available to all Nuxt projects!
::

You can start playing with it by upgrading to the latest Nuxt, and press `Shift + Option + D` (macOS) or `Shift + Alt + D` (Windows) in your browser to open the DevTools. By default the floating panel is hidden to reduce the distraction. You can enable it inside Nuxt DevTools settings page, or explicitly enabled it in your config:

## The Reasons We Built Nuxt DevTools

Over the recent years, there has been an increasing focus on Developer Experience (DX). Tools and frameworks have been striving to improve the DX. Along the way, Nuxt introduced many innovative features and conventions to make your day-to-day development easier and more efficient.

For example, [file-based routing](https://nuxt.com/docs/guide/directory-structure/pages), [layout system](https://nuxt.com/docs/guide/directory-structure/layouts), [plugins](https://nuxt.com/docs/guide/directory-structure/plugins), [route middleware](https://nuxt.com/docs/guide/directory-structure/middleware), [composables auto-import](https://nuxt.com/docs/guide/concepts/auto-imports), [file-based server APIs](https://nitro.unjs.io/guide/routing){rel="&#x22;nofollow&#x22;"}, [powerful module system](https://nuxt.com/modules) and many more.

![List of Nuxt features that enhance developer experience](https://nuxt.com/assets/blog/devtools/slide-dx.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Nuxt is capable of creating various range of applications, from simple hobby projects to large scale applications, from simple client-rendered single-page applications to hybrid rendered sites with serverless functions on edge, etc. We provide those features and conventions to make it easier to support all those use cases and scenarios.

Out of all these benefits of having a powerful framework, we have to made some trade-offs. Sometimes, we have to sacrifice a bit of the transparency of the underlying implementation to make things easier to use.

!["Transparency" as the trade offs of having "Conventions", "Abstractions", "Sensible Defaults" and "Normalizations"](https://nuxt.com/assets/blog/devtools/slide-transparency.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Conventional abstractions are great things to transfer implementation complexity and make things easier to get more focus when building. On the other hand, they can also add extra burden for users to learn and understand what's going on under the hood. Leading also to implicitness, like where a auto-imported component is from, or how many modules is using a certain component, etc. It can also make things hard to debug.

Trade-offs are inevitable. Generally we believe those trade-offs are worth it, as they would help organizing users' codebase and make it easier to maintain in the long run. In the meantime, we also want to compensate the transparency we lost by providing a tool to help you understand what's going on under the hood and make the learning curve smoother.

That's where Nuxt DevTools comes in! We [first introduced it](https://nuxt.com/blog/introducing-nuxt-devtools) in February 2023 to experiment with the idea. After a few months of exploration and development, from surprisingly positive feedbacks from the community, this idea has been proven to be useful and we decided to make it a core part of your Nuxt development experience.

[Nuxt DevTools](https://github.com/nuxt/devtools){rel="&#x22;nofollow&#x22;"} is a set of visual tools to help you understand your Nuxt app and improve the developer experience even further. It's created to provide better transparency between Nuxt and your app, find performance bottlenecks and help you manage your app and configuration.

From the overview, Nuxt DevTools is an in-app DevTools that lives alongside your app. It will show up as a floating panel that you can click to open.

::article-video{cloudinary="v1700132388/devtools/0-intro_ilgwel"}
::

We believe this is a better approach than the traditional browser extension DevTools, as it's:

- **Works across all browsers**, and even on mobile devices! - The capability of browser extension DevTools are limited by the APIs each browsers provides, and also maintain multiple extensions would require a lot of effort. This approach would allow us to focus more on the functionality and features, while having it accessible to users on any browsers and devices.
- **Build tools integrations** - Tranditionally browser extension DevTools are only able to access the runtime context of your app and have no access to the build tools. Having the DevTools comes with Nuxt, allows us to communicate with the build tools and provide much more insights and features.
- **Avoid layout shifts** - Having the DevTools as a floating panel would avoid the layout shifts when toggling the DevTools.

To help improving the implicitness of file-based routing, we introduced the Pages View in DevTools. It lists all the pages that have been registered in your app, that you can easily test and navigate between them.

::article-video{cloudinary="v1700132393/devtools/1-pages_kkbecx"}
::

The Components tab shows all the components you are using in your app and where they are from. You can also search for them and go to the source code.

It also provides a graph view that show the relationship between components. You can filter the components to see the dependencies of a specific component. This could help to identify unintended dependencies and improve the performance and bundle size of pages.

::article-video{cloudinary="v1700132398/devtools/2-components_paj0uv"}
::

Composables view shows all the auto-imported composables registered to Nuxt. You can see which files are importing them, and where they are from. Some entries can also provide short descriptions and documentation links.

::article-video{cloudinary="v1700132395/devtools/3-imports_qhahdf"}
::

### Modules Management

The Modules tab shows all the modules that are registered in your app, with the links to their documentations and repositories.

We also provide the ability for you to search for and explore the modules from the community. And install them with a single click!

::article-video{cloudinary="v1700132389/devtools/4-modules_v5ha5u"}
::

### Static Assets Management

The Assets tab shows all the static assets under your `public` directory. It supports previewing images, videos, fonts, PDFs, and other files, that you can easily copy the URL or code snippet to use in your app. You may also drag and drop files to upload them directly from Nuxt DevTools.

::article-video{cloudinary="v1700132394/devtools/5-assets_mpzyrs"}
::

### Runtime Configs Editor

The Runtime Configs tab shows the runtime configs of your app and provides an interactive editor for you to play with different values.

::article-video{cloudinary="v1700132393/devtools/6-runtime-configs_fzlrik"}
::

Similar to the Runtime Configs Editor, the Payload Editor allows you to edit the payload from composables like [`useState`](https://nuxt.com/docs/api/composables/use-state) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) to see what have been passed from server to client on server-side rendering.

::article-video{cloudinary="v1700132389/devtools/7-payload_nfzobp"}
::

### Open Graph Preview

[Open Graph](https://ogp.me/){rel="&#x22;nofollow&#x22;"} plays an important role in social media sharing as well as [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization){rel="&#x22;nofollow&#x22;"}. In the traditional workflow, we usually need to first deploy our app to check if the Open Graph is working as expected on various social media platforms. With the Open Graph Preview, you can now preview the Open Graph in DevTools and update it live with an instant feedback loop.

We also help you check the Open Graph tags in your app and provide suggestions to improve them. You can copy the generated code snippet and paste it to your routes to fix them in one go.

::article-video{cloudinary="v1700132390/devtools/8-open-graph_hjawen"}
::

Plugins Overview list all the [plugins](https://nuxt.com/docs/guide/directory-structure/plugins) registered in your app. As the plugins are executed in the runtime before your app renders, it's important to keep plugins performant and avoid blocking the rendering. We provide the execution time of each plugin and the total time of all plugins, so you can better identify the potential performance bottlenecks.

::article-video{cloudinary="v1700132390/devtools/9-plugins_bhcobr"}
::

Timeline is a tool for you to check when and how each composable been called. Different from browser DevTools' performance tools, this tab only check the high-level composables combining with other events like route navigration, which is closer to day-to-day use. It also records the arguments and return values of each call, so you can better understand what's going on under the hood.

::warning
As of November 2023, the Timeline is still an experimental feature that requires manually opt-in.
::

::article-video{cloudinary="v1700132392/devtools/10-timeline_zeei5s"}
::

### Production Build Analyzer

While Nuxt DevTools is mostly focused on providing development tools, sometimes we might want to know how chunks are composed in production. The Build Analyzer allows you to fire up a production build and analyze the chunks and modules at any time and see how they are bundled. You can also do multiple builds on different branches to compare how your refactoring/changes affect the bundle size, etc.

::article-video{cloudinary="v1700132394/devtools/11-build-analyze_f3wx6q"}
::

### Server API Playground

Nuxt provides a very convenient way to create server API functions with the [server routes](https://nuxt.com/docs/guide/directory-structure/server#server-routes). Since in Nuxt we have that information, we are able to provide a playground for you to test and debug your server API functions, similar to tools like Postman. We list all the server APIs available in your app automatically. And we execute those functions **within the same context of your app**, so you don't need to manually set them up in external tools. As always, we also have code snippets for you to copy and paste into your app.

::article-video{cloudinary="v1700132388/devtools/12-server-api_owjyjg"}
::

### Embedded Full-feature VS Code

Thanks to the flexibility of our DevTools approach, we can leverage the power of the modern web to embed a full-featured VS Code right in the DevTools. In that VS Code, you can sign in to your account and synchronize your settings, and all the extensions just work as your normal VS Code client. This allows you to quickly edit your code without leaving your browser.

::article-video{cloudinary="v1700132395/devtools/13-vscode_je5x0m"}
::

### Component Inspector

The Inspector allows you to inspect the DOM tree and see which component is rendering it. Click to go to your editor for the specific line. Making it much easier to make changes without the requirement of understanding the project structure thoroughly.

::article-video{cloudinary="v1700132391/devtools/0-inspector_fuxmr7"}
::

In the recent releases, we introduced a split screen feature, that allows you to open two tabs side-by-side.

::article-video{cloudinary="v1700132391/devtools/0-split-view_mdeiie"}
::

In DevTools setting, we provide a few options for you to customize the tabs you want to see, and the layout of the DevTools.

::article-video{cloudinary="v1700132391/devtools/0-settings_weflmu"}
::

In Nuxt, we value the ecosystem a lot. Similar to how Nuxt modules enhance Nuxt core, we also designed Nuxt DevTools to be highly extensible, allowing modules to provide additional features and integrations.

### Community Modules

We are proud to see the community has already started to build modules for Nuxt DevTools. Here are some of them:

[Vitest module](https://nuxt.com/modules/vitest){rel="&#x22;nofollow&#x22;"} provides Vitest UI for tests running with the same pipeline as your Nuxt app. Made it easier to debug your tests alongside your app.

::article-video{cloudinary="v1700132393/devtools/99-vitest_wwikpc"}
::

[VueUse module](https://nuxt.com/modules/vueuse) provides a search page for available composables and see their documentation.

::article-video{cloudinary="v1700132390/devtools/99-vueuse_simsfj"}
::

[SiteMap module](https://nuxt.com/modules/sitemap) provides an interactive editor for you to manage your sitemap.

::article-video{cloudinary="v1700132390/devtools/99-sitemap_xpsfek"}
::

[TailwindCSS module](https://nuxt.com/modules/tailwindcss) provides the Tailwind Config Viewer for you to check what's available based on your config.

::article-video{cloudinary="v1700132388/devtools/99-tailwind_dgiodc"}
::

[UnoCSS module](https://nuxt.com/modules/unocss) provides an interactive inspector to see how each module contributes to the final CSS.

::article-video{cloudinary="v1700132394/devtools/99-unocss_xvii5x"}
::

[Storybook module](https://nuxt.com/modules/storybook) provides a Storybook UI for your components.

::article-video{cloudinary="v1700132388/devtools/99-storybook_ifxt4r"}
::

And they are just a few of them! We are looking forward to see more modules coming to Nuxt DevTools!

### Projects Inspired by Nuxt DevTools

In the meantime, we are also flattered that other frameworks are starting to build their own DevTools inspired by Nuxt DevTools:

- [`webfansplz/vite-plugin-vue-devtools`](https://github.com/webfansplz/vite-plugin-vue-devtools){rel="&#x22;nofollow&#x22;"} - A Nuxt DevTools port to support DevTools for Vite + Vue 3 apps.
- [`pheno-agency/vite-plugin-devtools`](https://github.com/pheno-agency/vite-plugin-devtools){rel="&#x22;nofollow&#x22;"} - An experiment on building framework-agnostic DevTools for Vite.
- [Modern.js DevTools](https://github.com/Asuka109/modern.js/tree/dev/modernjs-devtools/packages/devtools/plugin){rel="&#x22;nofollow&#x22;"} - In App DevTools for Modern.js
- [Qwik DevTools](https://github.com/QwikDev/devtools){rel="&#x22;nofollow&#x22;"} - DevTools for Qwik

We are working closely with the maintainers of those projects to see how we can bring the experience of DevTools to the next level.

Nuxt DevTools just reached v1.0, but t doesn't mean we are done. There are still a lot of things we want to explore and improve. Here are some of the ideas we are considering:

- Nuxt Accessibility Integration - We are building an a11y integration for Nuxt ([#23255](https://github.com/nuxt/nuxt/issues/23255){rel="&#x22;nofollow&#x22;"}). We'll build a dedicated view in Nuxt DevTools for you to check the accessibility hints interactively.
- Vue DevTools Integration - We are working with the Vue team to bring the Vue DevTools experience to a shared tool that works for both browser extensions and in-app DevTools like `vite-plugin-vue-devtools` and Nuxt DevTools.
- [Let us know your ideas/suggestions!](https://github.com/nuxt/devtools/discussions/29){rel="&#x22;nofollow&#x22;"}

We are excited to see how Nuxt DevTools can help you build better apps and improve your developer experience. Going forward, we are imagining something bigger than Nuxt DevTools itself. We believe that having such framework-specific DevTools is the way onwards to provide even better developer experience. We also see there are many parts of such tools can actually be shared and reused across tools. We came up with the idea of the DevTools Kit.

DevTools Kit is an idea of the universal protocol that is still in the early brainstorming phase. We imagine that in the best world, each feature of the DevTools should be **composable, extensible, and collaborative**. Meta-frameworks could build their own features for their specific needs, while the common web-related tools could be shared and collaborated on between different frameworks.

![DevTools Kit](https://nuxt.com/assets/blog/devtools/slide-devtools-kit.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

Imagine we could have all these features, each as a standalone package. We could have general web-related tools like SEO, Accessibility, PWA, Static Assets, etc. Then low-level build tools related, like Vite build analyzer, Vite Inspector, or Webpack visualizer, etc. And finally, we could have framework and meta-framework specific tools like Vue Components view, or Nuxt Server API Playground, etc.

![Nuxt DevTools](https://nuxt.com/assets/blog/devtools/slide-nuxt-devtools.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

![Nuxt DevTools](https://nuxt.com/assets/blog/devtools/slide-vue-devtools.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

At that time, Vue DevTools would be a composition of common web features and Vue-specific features. And Nuxt DevTools would essentially be a composition of the features above, inherit all features from Vue DevTools, and add Nuxt specific features on top of it.

![Your DevTools](https://nuxt.com/assets/blog/devtools/slide-your-devtools.png){.border.border-gray-200.dark:border-gray-700.rounded-lg}

It would even be possible to compose your own DevTools as you like.

That said, we are still thinking about and discussing the details of the DevTools Kit. Stay tuned for more updates!

We hope you enjoy the new Nuxt DevTools experience! We are looking forward to seeing how it can help you build better apps and improve your developer experience. If you have any ideas or suggestions, feel free to let us know in the [Ideas & Suggestions](https://github.com/nuxt/devtools/discussions/29){rel="&#x22;nofollow&#x22;"} discussion.

Thank you for your support and happy hacking! 🚀

---

## defineLazyHydrationComponent

**URL:** llms-txt#definelazyhydrationcomponent

**Contents:**

- Usage
  - Visibility Strategy
  - Idle Strategy
  - Interaction Strategy
  - Media Query Strategy
  - Time Strategy
  - If Strategy
  - Never Hydrate
  - Listening to Hydration Events
- Parameters

`defineLazyHydrationComponent` is a compiler macro that helps you create a component with a specific lazy hydration strategy. Lazy hydration defers hydration until components become visible or until the browser has completed more critical tasks. This can significantly reduce the initial performance cost, especially for non-essential components.

### Visibility Strategy

Hydrates the component when it becomes visible in the viewport.

The `hydrateOnVisible` prop is optional. You can pass an object to customize the behavior of the `IntersectionObserver` under the hood.

## ::read-more

title: IntersectionObserver options
to: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver

---

Read more about the options for `hydrate-on-visible`.
::

::note
Under the hood, this uses Vue's built-in [`hydrateOnVisible` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-visible){rel=""nofollow""}.
::

Hydrates the component when the browser is idle. This is suitable if you need the component to load as soon as possible, but not block the critical rendering path.

The `hydrateOnIdle` prop is optional. You can pass a positive number to specify the maximum timeout.

Idle strategy is for components that can be hydrated when the browser is idle.

::note
Under the hood, this uses Vue's built-in [`hydrateOnIdle` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-idle){rel=""nofollow""}.
::

### Interaction Strategy

Hydrates the component after a specified interaction (e.g., click, mouseover).

The `hydrateOnInteraction` prop is optional. If you do not pass an event or a list of events, it defaults to hydrating on `pointerenter`, `click`, and `focus`.

::note
Under the hood, this uses Vue's built-in [`hydrateOnInteraction` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-interaction){rel=""nofollow""}.
::

### Media Query Strategy

Hydrates the component when the window matches a media query.

::note
Under the hood, this uses Vue's built-in [`hydrateOnMediaQuery` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-media-query){rel=""nofollow""}.
::

Hydrates the component after a specified delay (in milliseconds).

Time strategy is for components that can wait a specific amount of time.

Hydrates the component based on a boolean condition.

If strategy is best for components that might not always need to be hydrated.

Never hydrates the component.

### Listening to Hydration Events

All delayed hydration components emit a `@hydrated` event when they are hydrated.

::warning
To ensure that the compiler correctly recognizes this macro, avoid using external variables. The following approach will prevent the macro from being properly recognized:

- **Type**: `'visible' | 'idle' | 'interaction' | 'mediaQuery' | 'if' | 'time' | 'never'`
- **Required**: `true`

| Strategy      | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `visible`     | Hydrates when the component becomes visible in the viewport. |
| `idle`        | Hydrates when the browser is idle or after a delay.          |
| `interaction` | Hydrates upon user interaction (e.g., click, hover).         |
| `mediaQuery`  | Hydrates when the specified media query condition is met.    |
| `if`          | Hydrates when a specified boolean condition is met.          |
| `time`        | Hydrates after a specified time delay.                       |
| `never`       | Prevents Vue from hydrating the component.                   |

- **Type**: `() => Promise<Component>`
- **Required**: `true`

**Examples:**

Example 1 (vue):

```vue
<script setup lang="ts">
  const LazyHydrationMyComponent = defineLazyHydrationComponent(
    'visible',
    () => import('./components/MyComponent.vue')
  );
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is 100px away from entering the viewport.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

Example 2 (vue):

```vue
<script setup lang="ts">
  const LazyHydrationMyComponent = defineLazyHydrationComponent('idle', () => import('./components/MyComponent.vue'));
</script>

<template>
  <div>
    <!-- Hydration will be triggered when the browser is idle or after 2000ms. -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

Example 3 (vue):

```vue
<script setup lang="ts">
  const LazyHydrationMyComponent = defineLazyHydrationComponent(
    'interaction',
    () => import('./components/MyComponent.vue')
  );
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is hovered over by the pointer.
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

Example 4 (vue):

```vue
<script setup lang="ts">
  const LazyHydrationMyComponent = defineLazyHydrationComponent(
    'mediaQuery',
    () => import('./components/MyComponent.vue')
  );
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the window width is greater than or equal to 768px.
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

---

## Generates `pages/category/[id].vue`

**URL:** llms-txt#generates-`pages/category/[id].vue`

**Contents:**

- `nuxt add middleware`

npx nuxt add page "category/[id]"
bash [Terminal]

**Examples:**

Example 1 (unknown):

```unknown
## `nuxt add middleware`

- Modifier flags: `--global`
```

---

## Locale

**URL:** llms-txt#locale

::callout{icon="i-ph-info-duotone"}
You can right-click to "View Page Source" and see that Nuxt renders the correct date in SSR based on the visitor's locale.
::

## ::sandbox

branch: main
dir: examples/advanced/locale
file: app.vue
repo: nuxt/examples

---

::

---

## Prerendering

**URL:** llms-txt#prerendering

**Contents:**

- Crawl-based Pre-rendering
  - Selective Pre-rendering
- Runtime Prerender Configuration
  - `prerenderRoutes`
  - `prerender:routes` Nuxt hook
  - `prerender:generate` Nitro hook

Nuxt allows for select pages from your application to be rendered at build time. Nuxt will serve the prebuilt pages when requested instead of generating them on the fly.

## ::read-more

title: Nuxt rendering modes
to: https://nuxt.com/docs/guide/concepts/rendering

---

::

## Crawl-based Pre-rendering

Use the [`nuxt generate` command](https://nuxt.com/docs/3.x/api/commands/generate) to build and pre-render your application using the [Nitro](https://nuxt.com/docs/3.x/guide/concepts/server-engine) crawler. This command is similar to `nuxt build` with the `nitro.static` option set to `true`, or running `nuxt build --prerender`.

This will build your site, stand up a nuxt instance, and, by default, prerender the root page `/` along with any of your site's pages it links to, any of your site's pages they link to, and so on.

::code-group{sync="pm"}

You can now deploy the `.output/public` directory to any static hosting service or preview it locally with `npx serve .output/public`.

Working of the Nitro crawler:

1. Load the HTML of your application's root route (`/`), any non-dynamic pages in your `~/pages` directory, and any other routes in the `nitro.prerender.routes` array.
2. Save the HTML and `payload.json` to the `~/.output/public/` directory to be served statically.
3. Find all anchor tags (`<a href="...">`) in the HTML to navigate to other routes.
4. Repeat steps 1-3 for each anchor tag found until there are no more anchor tags to crawl.

This is important to understand since pages that are not linked to a discoverable page can't be pre-rendered automatically.

::read-more{to="https://nuxt.com/docs/api/commands/generate#nuxt-generate"}
Read more about the `nuxt generate` command.
::

### Selective Pre-rendering

You can manually specify routes that [Nitro](https://nuxt.com/docs/3.x/guide/concepts/server-engine) will fetch and pre-render during the build or ignore routes that you don't want to pre-render like `/dynamic` in the `nuxt.config` file:

You can combine this with the `crawlLinks` option to pre-render a set of routes that the crawler can't discover like your `/sitemap.xml` or `/robots.txt`:

Setting `nitro.prerender` to `true` is similar to `nitro.prerender.crawlLinks` to `true`.

::read-more{to="https://nitro.build/config#prerender"}
Read more about pre-rendering in the Nitro documentation.
::

Lastly, you can manually configure this using routeRules.

::read-more{to="https://nitro.build/config#routerules"}
Read more about Nitro's `routeRules` configuration.
::

As a shorthand, you can also configure this in a page file using [`defineRouteRules`](https://nuxt.com/docs/3.x/api/utils/define-route-rules).

## ::read-more

icon: i-lucide-star
to: https://nuxt.com/docs/guide/going-further/experimental-features#inlinerouterules

---

This feature is experimental and in order to use it you must enable the `experimental.inlineRouteRules` option in your `nuxt.config`.
::

This will be translated to:

## Runtime Prerender Configuration

### `prerenderRoutes`

You can use this at runtime within a [Nuxt context](https://nuxt.com/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) to add more routes for Nitro to prerender.

## ::read-more

title: prerenderRoutes
to: https://nuxt.com/docs/api/utils/prerender-routes

---

::

### `prerender:routes` Nuxt hook

This is called before prerendering for additional routes to be registered.

### `prerender:generate` Nitro hook

This is called for each route during prerendering. You can use this for fine-grained handling of each route that gets prerendered.

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

You can now deploy the `.output/public` directory to any static hosting service or preview it locally with `npx serve .output/public`.

Working of the Nitro crawler:

1. Load the HTML of your application's root route (`/`), any non-dynamic pages in your `~/pages` directory, and any other routes in the `nitro.prerender.routes` array.
2. Save the HTML and `payload.json` to the `~/.output/public/` directory to be served statically.
3. Find all anchor tags (`<a href="...">`) in the HTML to navigate to other routes.
4. Repeat steps 1-3 for each anchor tag found until there are no more anchor tags to crawl.

This is important to understand since pages that are not linked to a discoverable page can't be pre-rendered automatically.

::read-more{to="https://nuxt.com/docs/api/commands/generate#nuxt-generate"}
Read more about the `nuxt generate` command.
::

### Selective Pre-rendering

You can manually specify routes that [Nitro](https://nuxt.com/docs/3.x/guide/concepts/server-engine) will fetch and pre-render during the build or ignore routes that you don't want to pre-render like `/dynamic` in the `nuxt.config` file:
```

---

## 64 Robots

**URL:** llms-txt#64-robots

64 Robots is a software agency that specializes in custom software development using a powerful tech stack, consisting of Laravel, Vue.js, Nuxt.js, AWS, and Figma. Founded in 2016 and based in Baltimore, Maryland, our primary focus is on building highly-scalable, accessibility-focused, secure applications.

We believe that accessibility is a fundamental aspect of web application development. We prioritize accessibility in everything we do, from design to development to testing. We create accessibility-first web applications that are designed to meet the accessibility requirements of the Americans with Disabilities Act (ADA).

At 64 Robots, security is a critical aspect of web application development, and we take it seriously. We follow strict security protocols and employ a range of security testing techniques to identify and address potential vulnerabilities. We conduct a thorough risk assessment at the beginning of the development process to identify potential security risks and develop a plan to address them.

We pride ourselves on building partnerships with our clients and providing full transparency at each stage of every project lifecycle.

---

## Context

**URL:** llms-txt#context

**Contents:**

- `useNuxt`
  - Usage
  - Type
  - Return Value
  - Examples
- `tryUseNuxt`
  - Usage
  - Type
  - Return Value
  - Examples

Nuxt modules allow you to enhance Nuxt's capabilities. They offer a structured way to keep your code organized and modular. If you're looking to break down your module into smaller components, Nuxt offers the `useNuxt` and `tryUseNuxt` functions. These functions enable you to conveniently access the Nuxt instance from the context without having to pass it as an argument.

::note
When you're working with the `setup` function in Nuxt modules, Nuxt is already provided as the second argument. This means you can access it directly without needing to call `useNuxt()`.
::

Get the Nuxt instance from the context. It will throw an error if Nuxt is not available.

The `useNuxt` function returns the Nuxt instance, which contains all the options and methods available in Nuxt.

| Property   | Type                                              | Description                                                                                               |
| ---------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `options`  | `NuxtOptions`                                     | The resolved Nuxt configuration.                                                                          |
| `hooks`    | `Hookable<NuxtHooks>`                             | The Nuxt hook system. Allows registering and listening to lifecycle events.                               |
| `hook`     | `(name: string, (...args: any[]) => Promise<void> | void) => () => void`                                                                                      | Shortcut for `nuxt.hooks.hook`. Registers a single callback for a specific lifecycle hook. |
| `callHook` | `(name: string, ...args: any[]) => Promise<any>`  | Shortcut for `nuxt.hooks.callHook`. Triggers a lifecycle hook manually and runs all registered callbacks. |
| `addHooks` | `(configHooks: NestedHooks) => () => void`        | Shortcut for `nuxt.hooks.addHooks`. Registers multiple hooks at once.                                     |

Get the Nuxt instance from the context. It will return `null` if Nuxt is not available.

The `tryUseNuxt` function returns the Nuxt instance if available, or `null` if Nuxt is not available.

The Nuxt instance as described in the `useNuxt` section.

**Examples:**

Example 1 (ts):

```ts
import { useNuxt } from '@nuxt/kit';

const setupSomeFeature = () => {
  const nuxt = useNuxt();

  // You can now use the nuxt instance
  console.log(nuxt.options);
};
```

Example 2 (unknown):

```unknown
### Return Value

The `useNuxt` function returns the Nuxt instance, which contains all the options and methods available in Nuxt.

| Property   | Type                                                                     | Description                                                                                               |
| ---------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `options`  | `NuxtOptions`                                                            | The resolved Nuxt configuration.                                                                          |
| `hooks`    | `Hookable<NuxtHooks>`                                                    | The Nuxt hook system. Allows registering and listening to lifecycle events.                               |
| `hook`     | `(name: string, (...args: any[]) => Promise<void> | void) => () => void` | Shortcut for `nuxt.hooks.hook`. Registers a single callback for a specific lifecycle hook.                |
| `callHook` | `(name: string, ...args: any[]) => Promise<any>`                         | Shortcut for `nuxt.hooks.callHook`. Triggers a lifecycle hook manually and runs all registered callbacks. |
| `addHooks` | `(configHooks: NestedHooks) => () => void`                               | Shortcut for `nuxt.hooks.addHooks`. Registers multiple hooks at once.                                     |

### Examples

::code-group
```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

## `tryUseNuxt`

Get the Nuxt instance from the context. It will return `null` if Nuxt is not available.

### Usage
```

---

## Getting Help

**URL:** llms-txt#getting-help

**Contents:**

- "I can't figure out how to (...)."
- "Could there be a bug?"
- "I need professional help"

At some point, you may find that there's an issue you need some help with.

But don't worry! We're a friendly community of developers and we'd love to help.

::card-group
:::card

---

icon: i-simple-icons-discord
target: \_blank
title: Discord
to: https://go.nuxt.com/discord

---

Get real-time help, exchange with the core team and the community, and stay updated on the latest Nuxt news.
:::

:::card

---

icon: i-simple-icons-nuxt
target: \_blank
title: Nuxters
to: https://nuxters.nuxt.com

---

Connect with other Nuxt enthusiasts.
:::
::

## "I can't figure out how to (...)."

You've read through these docs and you think it should be possible, but it's not clear how. The best thing is to [open a GitHub Discussion](https://github.com/nuxt/nuxt/discussions){rel="&#x22;nofollow&#x22;"}.

Please don't feel embarrassed about asking a question that you think is easy - we've all been there! ❤️

Everyone you'll encounter is helping out because they care, not because they are paid to do so. The kindest thing to do is make it easy for them to help you. Here are some ideas:

- _Explain what your objective is, not just the problem you're facing._ "I need to ensure my form inputs are accessible, so I'm trying to get the ids to match between server and client."
- _Make sure you've first read the docs and used your favorite search engine_. Let people know by saying something like "I've Googled for 'nuxt script setup' but I couldn't find code examples anywhere."
- _Explain what you've tried._ Tell people the kind of solutions you've experimented with, and why. Often this can make people's advice more relevant to your situation.
- _Share your code._ People probably won't be able to help if they just see an error message or a screenshot - but that all changes if you share your code in a copy/pasteable format - preferably in the form of a minimal reproduction like a CodeSandbox.

And finally, just ask the question! There's no need to [ask permission to ask a question](https://dontasktoask.com){rel="&#x22;nofollow&#x22;"} or [wait for someone to reply to your 'hello'](https://www.nohello.com){rel="&#x22;nofollow&#x22;"}. If you do, you might not get a response because people are waiting for the whole question before engaging.

## "Could there be a bug?"

Something isn't working the way that the docs say that it should. You're not sure if it's a bug. You've searched through the [open issues](https://github.com/nuxt/nuxt/issues){rel="&#x22;nofollow&#x22;"} and [discussions](https://github.com/nuxt/nuxt/discussions){rel="&#x22;nofollow&#x22;"} but you can't find anything. (if there is a closed issue, please create a new one)

We recommend taking a look at [how to report bugs](https://nuxt.com/docs/3.x/community/reporting-bugs). Nuxt is still in active development, and every issue helps make it better.

## "I need professional help"

If the community couldn't provide the help you need in the time-frame you have, NuxtLabs offers professional support with the [Nuxt Experts](https://nuxt.com/enterprise/support){rel="&#x22;nofollow&#x22;"}.

The objective of the Nuxt Expert is to provide support to the Vue ecosystem, while also creating freelance opportunities for those contributing to open-source solutions, thus helping to maintain the sustainability of the ecosystem.

The Nuxt experts are Vue, Nuxt and Vite chosen contributors providing professional support and consulting services.

---
