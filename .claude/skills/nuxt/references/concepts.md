# Nuxt - Concepts

**Pages:** 3

---

## Custom Routing

**URL:** llms-txt#custom-routing

**Contents:**

- Adding custom routes
  - Router Config
  - Pages Hook
  - Nuxt Module
- Router Options
  - Using `app/router.options`
  - Using `nuxt.config`
  - Hash Mode (SPA)
  - Scroll Behavior for hash links

## Adding custom routes

In Nuxt, your routing is defined by the structure of your files inside the [pages directory](https://nuxt.com/docs/3.x/directory-structure/pages). However, since it uses [vue-router](https://router.vuejs.org){rel="&#x22;nofollow&#x22;"} under the hood, Nuxt offers you several ways to add custom routes in your project.

Using [router options](https://nuxt.com/docs/3.x/guide/recipes/custom-routing#router-options), you can optionally override or extend your routes using a function that accepts the scanned routes and returns customized routes.

If it returns `null` or `undefined`, Nuxt will fall back to the default routes (useful to modify input array).

::note
Nuxt will not augment any new routes you return from the `routes` function with metadata defined in `definePageMeta` of the component you provide. If you want that to happen, you should use the `pages:extend` hook which is [called at build-time](https://nuxt.com/docs/3.x/api/advanced/hooks#nuxt-hooks-build-time).
::

You can add, change or remove pages from the scanned routes with the `pages:extend` nuxt hook.

For example, to prevent creating routes for any `.ts` files:

If you plan to add a whole set of pages related with a specific functionality, you might want to use a [Nuxt module](https://nuxt.com/modules).

The [Nuxt kit](https://nuxt.com/docs/3.x/guide/going-further/kit) provides a few ways [to add routes](https://nuxt.com/docs/3.x/api/kit/pages):

- [`extendPages`](https://nuxt.com/docs/3.x/api/kit/pages#extendpages) (callback: pages => void)
- [`extendRouteRules`](https://nuxt.com/docs/3.x/api/kit/pages#extendrouterules) (route: string, rule: NitroRouteConfig, options: ExtendRouteRulesOptions)

On top of customizing options for [`vue-router`](https://router.vuejs.org/api/interfaces/routeroptions.html){rel="&#x22;nofollow&#x22;"}, Nuxt offers [additional options](https://nuxt.com/docs/3.x/api/nuxt-config#router) to customize the router.

### Using `app/router.options`

This is the recommended way to specify [router options](https://nuxt.com/docs/3.x/api/nuxt-config#router).

It is possible to add more router options files by adding files within the `pages:routerOptions` hook. Later items in the array override earlier ones.

::callout
Adding a router options file in this hook will switch on page-based routing, unless `optional` is set, in which case it will only apply when page-based routing is already enabled.
::

### Using `nuxt.config`

**Note:** Only JSON serializable [options](https://nuxt.com/docs/3.x/api/nuxt-config#router) are configurable:

- `linkActiveClass`
- `linkExactActiveClass`
- `end`
- `sensitive`
- `strict`
- `hashMode`
- `scrollBehaviorType`

You can enable hash history in SPA mode using the `hashMode` [config](https://nuxt.com/docs/3.x/api/nuxt-config#router). In this mode, router uses a hash character (#) before the actual URL that is internally passed. When enabled, the **URL is never sent to the server** and **SSR is not supported**.

### Scroll Behavior for hash links

You can optionally customize the scroll behavior for hash links. When you set the [config](https://nuxt.com/docs/3.x/api/nuxt-config#router) to be `smooth` and you load a page with a hash link (e.g. `https://example.com/blog/my-article#comments`), you will see that the browser smoothly scrolls to this anchor.

#### Custom History (advanced)

You can optionally override history mode using a function that accepts the base URL and returns the history mode. If it returns `null` or `undefined`, Nuxt will fallback to the default history.

**Examples:**

Example 1 (unknown):

```unknown
::note
Nuxt will not augment any new routes you return from the `routes` function with metadata defined in `definePageMeta` of the component you provide. If you want that to happen, you should use the `pages:extend` hook which is [called at build-time](https://nuxt.com/docs/3.x/api/advanced/hooks#nuxt-hooks-build-time).
::

### Pages Hook

You can add, change or remove pages from the scanned routes with the `pages:extend` nuxt hook.

For example, to prevent creating routes for any `.ts` files:
```

Example 2 (unknown):

```unknown
### Nuxt Module

If you plan to add a whole set of pages related with a specific functionality, you might want to use a [Nuxt module](https://nuxt.com/modules).

The [Nuxt kit](https://nuxt.com/docs/3.x/guide/going-further/kit) provides a few ways [to add routes](https://nuxt.com/docs/3.x/api/kit/pages):

- [`extendPages`](https://nuxt.com/docs/3.x/api/kit/pages#extendpages) (callback: pages => void)
- [`extendRouteRules`](https://nuxt.com/docs/3.x/api/kit/pages#extendrouterules) (route: string, rule: NitroRouteConfig, options: ExtendRouteRulesOptions)

## Router Options

On top of customizing options for [`vue-router`](https://router.vuejs.org/api/interfaces/routeroptions.html){rel="&#x22;nofollow&#x22;"}, Nuxt offers [additional options](https://nuxt.com/docs/3.x/api/nuxt-config#router) to customize the router.

### Using `app/router.options`

This is the recommended way to specify [router options](https://nuxt.com/docs/3.x/api/nuxt-config#router).
```

Example 3 (unknown):

```unknown
It is possible to add more router options files by adding files within the `pages:routerOptions` hook. Later items in the array override earlier ones.

::callout
Adding a router options file in this hook will switch on page-based routing, unless `optional` is set, in which case it will only apply when page-based routing is already enabled.
::
```

Example 4 (unknown):

```unknown
### Using `nuxt.config`

**Note:** Only JSON serializable [options](https://nuxt.com/docs/3.x/api/nuxt-config#router) are configurable:

- `linkActiveClass`
- `linkExactActiveClass`
- `end`
- `sensitive`
- `strict`
- `hashMode`
- `scrollBehaviorType`
```

---

## Rendering Modes

**URL:** llms-txt#rendering-modes

**Contents:**

- Universal Rendering
- Client-Side Rendering
  - Deploying a Static Client-Rendered App
- Hybrid Rendering
  - Route Rules
- Edge-Side Rendering

Nuxt supports different rendering modes, [universal rendering](https://nuxt.com/#universal-rendering), [client-side rendering](https://nuxt.com/#client-side-rendering) but also offers [hybrid-rendering](https://nuxt.com/#hybrid-rendering) and the possibility to render your application on [CDN Edge Servers](https://nuxt.com/#edge-side-rendering).

Both the browser and server can interpret JavaScript code to turn Vue.js components into HTML elements. This step is called **rendering**. Nuxt supports both **universal** and **client-side** rendering. The two approaches have benefits and downsides that we will cover.

By default, Nuxt uses **universal rendering** to provide better user experience, performance and to optimize search engine indexing, but you can switch rendering modes in [one line of configuration](https://nuxt.com/docs/3.x/api/nuxt-config#ssr).

## Universal Rendering

This step is similar to traditional **server-side rendering** performed by PHP or Ruby applications. When the browser requests a URL with universal rendering enabled, Nuxt runs the JavaScript (Vue.js) code in a server environment and returns a fully rendered HTML page to the browser. Nuxt may also return a fully rendered HTML page from a cache if the page was generated in advance. Users immediately get the entirety of the initial content of the application, contrary to client-side rendering.

Once the HTML document has been downloaded, the browser interprets this and Vue.js takes control of the document. The same JavaScript code that once ran on the server runs on the client (browser) **again** in the background now enabling interactivity (hence **Universal rendering**) by binding its listeners to the HTML. This is called **Hydration**. When hydration is complete, the page can enjoy benefits such as dynamic interfaces and page transitions.

Universal rendering allows a Nuxt application to provide quick page load times while preserving the benefits of client-side rendering. Furthermore, as the content is already present in the HTML document, crawlers can index it without overhead.

![Users can access the static content when the HTML document is loaded. Hydration then allows page's interactivity](https://nuxt.com/assets/docs/concepts/rendering/ssr.svg)

**What's server-rendered and what's client-rendered?**

It is normal to ask which parts of a Vue file runs on the server and/or the client in universal rendering mode.

On the initial request, the `counter` ref is initialized in the server since it is rendered inside the `<p>` tag. The contents of `handleClick` is never executed here. During hydration in the browser, the `counter` ref is re-initialized. The `handleClick` finally binds itself to the button; Therefore it is reasonable to deduce that the body of `handleClick` will always run in a browser environment.

[Middlewares](https://nuxt.com/docs/3.x/directory-structure/middleware) and [pages](https://nuxt.com/docs/3.x/directory-structure/pages) run in the server and on the client during hydration. [Plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) can be rendered on the server or client or both. [Components](https://nuxt.com/docs/3.x/directory-structure/components) can be forced to run on the client only as well. [Composables](https://nuxt.com/docs/3.x/directory-structure/composables) and [utilities](https://nuxt.com/docs/3.x/directory-structure/utils) are rendered based on the context of their usage.

**Benefits of server-side rendering:**

- **Performance**: Users can get immediate access to the page's content because browsers can display static content much faster than JavaScript-generated content. At the same time, Nuxt preserves the interactivity of a web application during the hydration process.
- **Search Engine Optimization**: Universal rendering delivers the entire HTML content of the page to the browser as a classic server application. Web crawlers can directly index the page's content, which makes Universal rendering a great choice for any content that you want to index quickly.

**Downsides of server-side rendering:**

- **Development constraints:** Server and browser environments don't provide the same APIs, and it can be tricky to write code that can run on both sides seamlessly. Fortunately, Nuxt provides guidelines and specific variables to help you determine where a piece of code is executed.
- **Cost:** A server needs to be running in order to render pages on the fly. This adds a monthly cost like any traditional server. However, the server calls are highly reduced thanks to universal rendering with the browser taking over on client-side navigation. A cost reduction is possible by leveraging [edge-side-rendering](https://nuxt.com/#edge-side-rendering).

Universal rendering is very versatile and can fit almost any use case, and is especially appropriate for any content-oriented websites: \*\*blogs, marketing websites, portfolios, e-commerce sites, and marketplaces.\*\*

::tip
For more examples about writing Vue code without hydration mismatch, see [the Vue docs](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch){rel=""nofollow""}.
::

::important
When importing a library that relies on browser APIs and has side effects, make sure the component importing it is only called client-side. Bundlers do not treeshake imports of modules containing side effects.
::

## Client-Side Rendering

Out of the box, a traditional Vue.js application is rendered in the browser (or **client**). Then, Vue.js generates HTML elements after the browser downloads and parses all the JavaScript code containing the instructions to create the current interface.

![Users have to wait for the browser to download, parse and execute the JavaScript before seeing the page's content](https://nuxt.com/assets/docs/concepts/rendering/csr.svg)

**Benefits of client-side rendering:**

- **Development speed**: When working entirely on the client-side, we don't have to worry about the server compatibility of the code, for example, by using browser-only APIs like the `window` object.
- **Cheaper:** Running a server adds a cost of infrastructure as you would need to run on a platform that supports JavaScript. We can host client-only applications on any static server with HTML, CSS, and JavaScript files.
- **Offline:** Because code entirely runs in the browser, it can nicely keep working while the internet is unavailable.

**Downsides of client-side rendering:**

- **Performance**: The user has to wait for the browser to download, parse and run JavaScript files. Depending on the network for the download part and the user's device for the parsing and execution, this can take some time and impact the user's experience.
- **Search Engine Optimization**: Indexing and updating the content delivered via client-side rendering takes more time than with a server-rendered HTML document. This is related to the performance drawback we discussed, as search engine crawlers won't wait for the interface to be fully rendered on their first try to index the page. Your content will take more time to show and update in search results pages with pure client-side rendering.

Client-side rendering is a good choice for heavily interactive **web applications** that don't need indexing or whose users visit frequently. It can leverage browser caching to skip the download phase on subsequent visits, such as **SaaS, back-office applications, or online games**.

You can enable client-side only rendering with Nuxt in your `nuxt.config.ts`:

::note
If you do use `ssr: false`, you should also place an HTML file in `~/app/spa-loading-template.html` with some HTML you would like to use to render a loading screen that will be rendered until your app is hydrated.

:::read-more

---

title: SPA Loading Template
to: https://nuxt.com/docs/api/configuration/nuxt-config#spaloadingtemplate

---

:::
::

## ::video-accordion

title: Watch a video from Alexander Lichter about Building a plain SPA with Nuxt
video-id: 7Lr0QTP1Ro8

---

::

### Deploying a Static Client-Rendered App

If you deploy your app to [static hosting](https://nuxt.com/docs/3.x/getting-started/deployment#static-hosting) with the `nuxt generate` or `nuxt build --prerender` commands, then by default, Nuxt will render every page as a separate static HTML file.

::warning
If you prerender your app with the `nuxt generate` or `nuxt build --prerender` commands, then you will not be able to use any server endpoints as no server will be included in your output folder. If you need server functionality, use `nuxt build` instead.
::

If you are using purely client-side rendering, then this might be unnecessary. You might only need a single `index.html` file, plus `200.html` and `404.html` fallbacks, which you can tell your static web host to serve up for all requests.

In order to achieve this we can change how the routes are prerendered. Just add this to [your hooks](https://nuxt.com/docs/3.x/api/advanced/hooks#nuxt-hooks-build-time) in your `nuxt.config.ts`:

This will produce three files:

- `index.html`
- `200.html`
- `404.html`

The `200.html` and `404.html` might be useful for the hosting provider you are using.

#### Skipping Client Fallback Generation

When prerendering a client-rendered app, Nuxt will generate `index.html`, `200.html` and `404.html` files by default. However, if you need to prevent any (or all) of these files from being generated in your build, you can use the `'prerender:generate'` hook from [Nitro](https://nuxt.com/docs/3.x/getting-started/prerendering#prerendergenerate-nitro-hook).

Hybrid rendering allows different caching rules per route using **Route Rules** and decides how the server should respond to a new request on a given URL.

Previously every route/page of a Nuxt application and server must use the same rendering mode, universal or client-side. In various cases, some pages could be generated at build time, while others should be client-side rendered. For example, think of a content website with an admin section. Every content page should be primarily static and generated once, but the admin section requires registration and behaves more like a dynamic application.

Nuxt includes route rules and hybrid rendering support. Using route rules you can define rules for a group of nuxt routes, change rendering mode or assign a cache strategy based on route!

Nuxt server will automatically register corresponding middleware and wrap routes with cache handlers using [Nitro caching layer](https://nitro.build/guide/cache){rel="&#x22;nofollow&#x22;"}.

The different properties you can use are the following:

- `redirect: string`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Define server-side redirects.
- `ssr: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Disables server-side rendering of the HTML for sections of your app and make them render only in the browser with `ssr: false`
- `cors: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Automatically adds cors headers with `cors: true` - you can customize the output by overriding with `headers`
- `headers: object`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Add specific headers to sections of your site - for example, your assets
- `swr: number | boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Add cache headers to the server response and cache it on the server or reverse proxy for a configurable TTL (time to live). The `node-server` preset of Nitro is able to cache the full response. When the TTL expired, the cached response will be sent while the page will be regenerated in the background. If true is used, a `stale-while-revalidate` header is added without a MaxAge.
- `isr: number | boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - The behavior is the same as `swr` except that we are able to add the response to the CDN cache on platforms that support this (currently Netlify or Vercel). If `true` is used, the content persists until the next deploy inside the CDN.
- `prerender: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Prerenders routes at build time and includes them in your build as static assets
- `noScripts: boolean`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Disables rendering of Nuxt scripts and JS resource hints for sections of your site.
- `appMiddleware: string | string[] | Record<string, boolean>`{.shiki,shiki-themes,material-theme-lighter,material-theme-lighter,material-theme-palenight lang="ts"} - Allows you to define middleware that should or should not run for page paths within the Vue app part of your application (that is, not your Nitro routes)

Whenever possible, route rules will be automatically applied to the deployment platform's native rules for optimal performances (Netlify and Vercel are currently supported).

::important
Note that Hybrid Rendering is not available when using [`nuxt generate`](https://nuxt.com/docs/3.x/api/commands/generate).
::

::card-group
:::card

---

ui:
icon:
base: text-black dark:text-white
icon: i-simple-icons-github
target: \_blank
title: Nuxt Vercel ISR
to: https://github.com/danielroe/nuxt-vercel-isr

---

Example of a Nuxt application with hybrid rendering deployed on Vercel.
:::
::

## Edge-Side Rendering

Edge-Side Rendering (ESR) is a powerful feature introduced in Nuxt that allows the rendering of your Nuxt application closer to your users via edge servers of a Content Delivery Network (CDN). By leveraging ESR, you can ensure improved performance and reduced latency, thereby providing an enhanced user experience.

With ESR, the rendering process is pushed to the 'edge' of the network - the CDN's edge servers. Note that ESR is more a deployment target than an actual rendering mode.

When a request for a page is made, instead of going all the way to the original server, it's intercepted by the nearest edge server. This server generates the HTML for the page and sends it back to the user. This process minimizes the physical distance the data has to travel, **reducing latency and loading the page faster**.

Edge-side rendering is possible thanks to [Nitro](https://nitro.build/){rel="&#x22;nofollow&#x22;"}, the [server engine](https://nuxt.com/docs/3.x/guide/concepts/server-engine) that powers Nuxt. It offers cross-platform support for Node.js, Deno, Cloudflare Workers, and more.

The current platforms where you can leverage ESR are:

- [Cloudflare Pages](https://pages.cloudflare.com){rel="&#x22;nofollow&#x22;"} with zero configuration using the git integration and the `nuxt build` command
- [Vercel Edge Functions](https://vercel.com/features/edge-functions){rel="&#x22;nofollow&#x22;"} using the `nuxt build` command and `NITRO_PRESET=vercel-edge` environment variable
- [Netlify Edge Functions](https://www.netlify.com/products/#netlify-edge-functions){rel="&#x22;nofollow&#x22;"} using the `nuxt build` command and `NITRO_PRESET=netlify-edge` environment variable

Note that **Hybrid Rendering** can be used when using Edge-Side Rendering with route rules.

You can explore open source examples deployed on some of the platform mentioned above:

::card-group
:::card

---

ui:
icon:
base: text-black dark:text-white
icon: i-simple-icons-github
target: \_blank
title: Nuxt Todos Edge
to: https://github.com/atinux/nuxt-todos-edge

---

A todos application with user authentication, SSR and SQLite.
:::

:::card

---

ui:
icon:
base: text-black dark:text-white
icon: i-simple-icons-github
target: \_blank
title: Atinotes
to: https://github.com/atinux/atinotes

---

An editable website with universal rendering based on Cloudflare KV.
:::
::

**Examples:**

Example 1 (unknown):

```unknown
On the initial request, the `counter` ref is initialized in the server since it is rendered inside the `<p>` tag. The contents of `handleClick` is never executed here. During hydration in the browser, the `counter` ref is re-initialized. The `handleClick` finally binds itself to the button; Therefore it is reasonable to deduce that the body of `handleClick` will always run in a browser environment.

[Middlewares](https://nuxt.com/docs/3.x/directory-structure/middleware) and [pages](https://nuxt.com/docs/3.x/directory-structure/pages) run in the server and on the client during hydration. [Plugins](https://nuxt.com/docs/3.x/directory-structure/plugins) can be rendered on the server or client or both. [Components](https://nuxt.com/docs/3.x/directory-structure/components) can be forced to run on the client only as well. [Composables](https://nuxt.com/docs/3.x/directory-structure/composables) and [utilities](https://nuxt.com/docs/3.x/directory-structure/utils) are rendered based on the context of their usage.

**Benefits of server-side rendering:**

- **Performance**: Users can get immediate access to the page's content because browsers can display static content much faster than JavaScript-generated content. At the same time, Nuxt preserves the interactivity of a web application during the hydration process.
- **Search Engine Optimization**: Universal rendering delivers the entire HTML content of the page to the browser as a classic server application. Web crawlers can directly index the page's content, which makes Universal rendering a great choice for any content that you want to index quickly.

**Downsides of server-side rendering:**

- **Development constraints:** Server and browser environments don't provide the same APIs, and it can be tricky to write code that can run on both sides seamlessly. Fortunately, Nuxt provides guidelines and specific variables to help you determine where a piece of code is executed.
- **Cost:** A server needs to be running in order to render pages on the fly. This adds a monthly cost like any traditional server. However, the server calls are highly reduced thanks to universal rendering with the browser taking over on client-side navigation. A cost reduction is possible by leveraging [edge-side-rendering](https://nuxt.com/#edge-side-rendering).

Universal rendering is very versatile and can fit almost any use case, and is especially appropriate for any content-oriented websites: &#x2A;*blogs, marketing websites, portfolios, e-commerce sites, and marketplaces.**

::tip
For more examples about writing Vue code without hydration mismatch, see [the Vue docs](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch){rel=""nofollow""}.
::

::important
When importing a library that relies on browser APIs and has side effects, make sure the component importing it is only called client-side. Bundlers do not treeshake imports of modules containing side effects.
::

## Client-Side Rendering

Out of the box, a traditional Vue.js application is rendered in the browser (or **client**). Then, Vue.js generates HTML elements after the browser downloads and parses all the JavaScript code containing the instructions to create the current interface.

![Users have to wait for the browser to download, parse and execute the JavaScript before seeing the page's content](https://nuxt.com/assets/docs/concepts/rendering/csr.svg)

**Benefits of client-side rendering:**

- **Development speed**: When working entirely on the client-side, we don't have to worry about the server compatibility of the code, for example, by using browser-only APIs like the `window` object.
- **Cheaper:** Running a server adds a cost of infrastructure as you would need to run on a platform that supports JavaScript. We can host client-only applications on any static server with HTML, CSS, and JavaScript files.
- **Offline:** Because code entirely runs in the browser, it can nicely keep working while the internet is unavailable.

**Downsides of client-side rendering:**

- **Performance**: The user has to wait for the browser to download, parse and run JavaScript files. Depending on the network for the download part and the user's device for the parsing and execution, this can take some time and impact the user's experience.
- **Search Engine Optimization**: Indexing and updating the content delivered via client-side rendering takes more time than with a server-rendered HTML document. This is related to the performance drawback we discussed, as search engine crawlers won't wait for the interface to be fully rendered on their first try to index the page. Your content will take more time to show and update in search results pages with pure client-side rendering.

Client-side rendering is a good choice for heavily interactive **web applications** that don't need indexing or whose users visit frequently. It can leverage browser caching to skip the download phase on subsequent visits, such as **SaaS, back-office applications, or online games**.

You can enable client-side only rendering with Nuxt in your `nuxt.config.ts`:
```

Example 2 (unknown):

```unknown
::note
If you do use `ssr: false`, you should also place an HTML file in `~/app/spa-loading-template.html` with some HTML you would like to use to render a loading screen that will be rendered until your app is hydrated.

  :::read-more
  ---
  title: SPA Loading Template
  to: https://nuxt.com/docs/api/configuration/nuxt-config#spaloadingtemplate
  ---
  :::
::

::video-accordion
---
title: Watch a video from Alexander Lichter about Building a plain SPA with Nuxt
video-id: 7Lr0QTP1Ro8
---
::

### Deploying a Static Client-Rendered App

If you deploy your app to [static hosting](https://nuxt.com/docs/3.x/getting-started/deployment#static-hosting) with the `nuxt generate` or `nuxt build --prerender` commands, then by default, Nuxt will render every page as a separate static HTML file.

::warning
If you prerender your app with the `nuxt generate` or `nuxt build --prerender` commands, then you will not be able to use any server endpoints as no server will be included in your output folder. If you need server functionality, use `nuxt build` instead.
::

If you are using purely client-side rendering, then this might be unnecessary. You might only need a single `index.html` file, plus `200.html` and `404.html` fallbacks, which you can tell your static web host to serve up for all requests.

In order to achieve this we can change how the routes are prerendered. Just add this to [your hooks](https://nuxt.com/docs/3.x/api/advanced/hooks#nuxt-hooks-build-time) in your `nuxt.config.ts`:
```

Example 3 (unknown):

```unknown
This will produce three files:

- `index.html`
- `200.html`
- `404.html`

The `200.html` and `404.html` might be useful for the hosting provider you are using.

#### Skipping Client Fallback Generation

When prerendering a client-rendered app, Nuxt will generate `index.html`, `200.html` and `404.html` files by default. However, if you need to prevent any (or all) of these files from being generated in your build, you can use the `'prerender:generate'` hook from [Nitro](https://nuxt.com/docs/3.x/getting-started/prerendering#prerendergenerate-nitro-hook).
```

Example 4 (unknown):

```unknown
## Hybrid Rendering

Hybrid rendering allows different caching rules per route using **Route Rules** and decides how the server should respond to a new request on a given URL.

Previously every route/page of a Nuxt application and server must use the same rendering mode, universal or client-side. In various cases, some pages could be generated at build time, while others should be client-side rendered. For example, think of a content website with an admin section. Every content page should be primarily static and generated once, but the admin section requires registration and behaves more like a dynamic application.

Nuxt includes route rules and hybrid rendering support. Using route rules you can define rules for a group of nuxt routes, change rendering mode or assign a cache strategy based on route!

Nuxt server will automatically register corresponding middleware and wrap routes with cache handlers using [Nitro caching layer](https://nitro.build/guide/cache){rel="&#x22;nofollow&#x22;"}.
```

---

## Routing

**URL:** llms-txt#routing

**Contents:**

- Pages
- Navigation
- Route Parameters
- Route Middleware
- Route Validation

One core feature of Nuxt is the file system router. Every Vue file inside the [`pages/`](https://nuxt.com/docs/3.x/directory-structure/pages) directory creates a corresponding URL (or route) that displays the contents of the file. By using dynamic imports for each page, Nuxt leverages code-splitting to ship the minimum amount of JavaScript for the requested route.

Nuxt routing is based on [vue-router](https://router.vuejs.org){rel="&#x22;nofollow&#x22;"} and generates the routes from every component created in the [`pages/` directory](https://nuxt.com/docs/3.x/directory-structure/pages), based on their filename.

This file system routing uses naming conventions to create dynamic and nested routes:

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
::

The [`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link) component links pages between them. It renders an `<a>` tag with the `href` attribute set to the route of the page. Once the application is hydrated, page transitions are performed in JavaScript by updating the browser URL. This prevents full-page refreshes and allows for animated transitions.

When a [`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link) enters the viewport on the client side, Nuxt will automatically prefetch components and payload (generated pages) of the linked pages ahead of time, resulting in faster navigation.

::read-more{to="https://nuxt.com/docs/api/components/nuxt-link"}
::

The [`useRoute()`](https://nuxt.com/docs/3.x/api/composables/use-route) composable can be used in a `<script setup>` block or a `setup()` method of a Vue component to access the current route details.

::read-more{to="https://nuxt.com/docs/api/composables/use-route"}
::

Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

::note
Route middleware runs within the Vue part of your Nuxt app. Despite the similar name, they are completely different from server middleware, which are run in the Nitro server part of your app.
::

::important
Route middleware does **not** run for server routes (e.g. `/api/*`) or other server requests. To apply middleware to these requests, use [server middleware](https://nuxt.com/docs/3.x/directory-structure/server#server-middleware) instead.
::

There are three kinds of route middleware:

1. Anonymous (or inline) route middleware, which are defined directly in the pages where they are used.
2. Named route middleware, which are placed in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) directory and will be automatically loaded via asynchronous import when used on a page. (**Note**: The route middleware name is normalized to kebab-case, so `someMiddleware` becomes `some-middleware`.)
3. Global route middleware, which are placed in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) directory (with a `.global` suffix) and will be automatically run on every route change.

Example of an `auth` middleware protecting the `/dashboard` page:

::read-more{to="https://nuxt.com/docs/guide/directory-structure/middleware"}
::

Nuxt offers route validation via the `validate` property in [`definePageMeta()`](https://nuxt.com/docs/3.x/api/utils/define-page-meta) in each page you wish to validate.

The `validate` property accepts the `route` as an argument. You can return a boolean value to determine whether or not this is a valid route to be rendered with this page. If you return `false`, this will cause a 404 error. You can also directly return an object with `statusCode`/`statusMessage` to customize the error returned.

If you have a more complex use case, then you can use anonymous route middleware instead.

::read-more{to="https://nuxt.com/docs/api/utils/define-page-meta"}
::

**Examples:**

Example 1 (unknown):

```unknown

```

Example 2 (unknown):

```unknown
::

::read-more{to="https://nuxt.com/docs/guide/directory-structure/pages"}
::

## Navigation

The [`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link) component links pages between them. It renders an `<a>` tag with the `href` attribute set to the route of the page. Once the application is hydrated, page transitions are performed in JavaScript by updating the browser URL. This prevents full-page refreshes and allows for animated transitions.

When a [`<NuxtLink>`](https://nuxt.com/docs/3.x/api/components/nuxt-link) enters the viewport on the client side, Nuxt will automatically prefetch components and payload (generated pages) of the linked pages ahead of time, resulting in faster navigation.
```

Example 3 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/api/components/nuxt-link"}
::

## Route Parameters

The [`useRoute()`](https://nuxt.com/docs/3.x/api/composables/use-route) composable can be used in a `<script setup>` block or a `setup()` method of a Vue component to access the current route details.
```

Example 4 (unknown):

```unknown
::read-more{to="https://nuxt.com/docs/api/composables/use-route"}
::

## Route Middleware

Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

::note
Route middleware runs within the Vue part of your Nuxt app. Despite the similar name, they are completely different from server middleware, which are run in the Nitro server part of your app.
::

::important
Route middleware does **not** run for server routes (e.g. `/api/*`) or other server requests. To apply middleware to these requests, use [server middleware](https://nuxt.com/docs/3.x/directory-structure/server#server-middleware) instead.
::

There are three kinds of route middleware:

1. Anonymous (or inline) route middleware, which are defined directly in the pages where they are used.
2. Named route middleware, which are placed in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) directory and will be automatically loaded via asynchronous import when used on a page. (**Note**: The route middleware name is normalized to kebab-case, so `someMiddleware` becomes `some-middleware`.)
3. Global route middleware, which are placed in the [`middleware/`](https://nuxt.com/docs/3.x/directory-structure/middleware) directory (with a `.global` suffix) and will be automatically run on every route change.

Example of an `auth` middleware protecting the `/dashboard` page:

::code-group
```

---
