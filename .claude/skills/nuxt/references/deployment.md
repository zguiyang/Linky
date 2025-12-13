# Nuxt - Deployment

**Pages:** 8

---

## nuxt preview

**URL:** llms-txt#nuxt-preview

**Contents:**

- Arguments
- Options

The `preview` command starts a server to preview your Nuxt application after running the `build` command. The `start` command is an alias for `preview`. When running your application in production refer to the [Deployment section](https://nuxt.com/docs/3.x/getting-started/deployment).

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                       | Default | Description                                                                                                                                          |
| ---------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------- |
| `--cwd=<directory>`          |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)                                                                     |
| `--logLevel=<silent          | info    | verbose>`                                                                                                                                            |     | Specify build-time log level |
| `--envName`                  |         | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server) |
| `-e, --extends=<layer-name>` |         | Extend from a Nuxt layer                                                                                                                             |
| `-p, --port`                 |         | Port to listen on (use `PORT` environment variable to override)                                                                                      |
| `--dotenv`                   |         | Path to `.env` file to load, relative to the root directory                                                                                          |

This command sets `process.env.NODE_ENV` to `production`. To override, define `NODE_ENV` in a `.env` file or as command-line argument.

::note
For convenience, in preview mode, your [`.env`](https://nuxt.com/docs/3.x/directory-structure/env) file will be loaded into `process.env`. (However, in production you will need to ensure your environment variables are set yourself. For example, with Node.js 20+ you could do this by running `node --env-file .env .output/server/index.mjs` to start your server.)
::

---

## Nitro

**URL:** llms-txt#nitro

**Contents:**

- Remove Modules
- Update Config
- Update Your Scripts
  - Install Nuxi
  - Nuxi
  - Static Target
  - Server Target
- Exclude Built Nitro Folder From Git
- Ensure Everything Goes Well

- Remove `@nuxt/nitro`: Bridge injects same functionality

## Update Your Scripts

You will also need to update your scripts within your `package.json` to reflect the fact that Nuxt will now produce a Nitro server as build output.

Install `nuxi` as a development dependency:

::code-group{sync="pm"}

Nuxt 3 introduced the new Nuxt CLI command [`nuxi`](https://nuxt.com/docs/3.x/api/commands/add). Update your scripts as follows to leverage the better support from Nuxt Bridge:

::tip
If `nitro: false`, use the `nuxt2` command.
::

If you have set `target: 'static'` in your `nuxt.config` then you need to ensure that you update your build script to be `nuxi generate`.

For all other situations, you can use the `nuxi build` command.

## Exclude Built Nitro Folder From Git

Add the folder `.output` to the `.gitignore` file.

## Ensure Everything Goes Well

✔️ Try with `nuxi dev` and `nuxi build` (or `nuxi generate`) to see if everything goes well.

**Examples:**

Example 1 (unknown):

```unknown
## Update Your Scripts

You will also need to update your scripts within your `package.json` to reflect the fact that Nuxt will now produce a Nitro server as build output.

### Install Nuxi

Install `nuxi` as a development dependency:

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

## Heroku

**URL:** llms-txt#heroku

**Contents:**

- Using the Heroku CLI
- Learn more

Nuxt supports deploying on [Heroku](https://heroku.com/){rel="&#x22;nofollow&#x22;"} with minimal configuration.

## Using the Heroku CLI

1. Create a new Heroku app.

2. Configure Heroku to use the nodejs buildpack.

3. Configure your app.

4. Ensure you have `start` and `build` commands in your `package.json` file.

::read-more{to="https://nitro.unjs.io/deploy/providers/heroku" target="\_blank"}
Head over **Nitro documentation** to learn more about the Heroku deployment preset.
::

````

**Examples:**

Example 1 (unknown):
```unknown
2. Configure Heroku to use the nodejs buildpack.
```

Example 2 (unknown):
```unknown
3. Configure your app.
```

Example 3 (unknown):
```unknown
4. Ensure you have `start` and `build` commands in your `package.json` file.
```

Example 4 (unknown):
```unknown
## Learn more

::read-more{to="https://nitro.unjs.io/deploy/providers/heroku" target="_blank"}
Head over **Nitro documentation** to learn more about the Heroku deployment preset.
::
```

---

## Vercel

**URL:** llms-txt#vercel

**Contents:**
- Deploy using Git
- Custom Build Output Configuration
- Templates
- Learn More

::tip
**Zero Configuration ✨**

Integration with Vercel is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

1. Push your code to your git repository (GitHub, GitLab, Bitbucket).
2. [Import your project](https://vercel.com/new){rel="&#x22;nofollow&#x22;"} into Vercel.
3. Vercel will detect that you are using Nitro and will enable the correct settings for your deployment.
4. Your application is deployed!

After your project has been imported and deployed, all subsequent pushes to branches will generate [Preview Deployments](https://vercel.com/docs/concepts/deploy/environments#preview){rel="&#x22;nofollow&#x22;"}, and all changes made to the Production Branch (commonly “main”) will result in a [Production Deployment](https://vercel.com/docs/concepts/deploy/environments#production){rel="&#x22;nofollow&#x22;"}.

Learn more about Vercel’s [Git Integration](https://vercel.com/docs/concepts/git){rel="&#x22;nofollow&#x22;"}.

## Custom Build Output Configuration

You can provide additional [build output configuration](https://vercel.com/docs/build-output-api/v3){rel="&#x22;nofollow&#x22;"} using `nitro.vercel.config` key inside `nuxt.config.ts`. It will be merged with built-in auto generated config.

::card-group
  :::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Nuxt Vercel ISR
  to: https://github.com/danielroe/nuxt-vercel-isr
  ---
  Example of a Nuxt application with hybrid rendering deployed on Vercel.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Nuxt on the Edge on Vercel
  to: https://github.com/pi0/nuxt-on-the-edge
  ---
  Example of a Nuxt application running on Vercel Edge Functions.
  :::
::

::read-more{target="_blank" to="https://nitro.unjs.io/deploy/providers/vercel"}
Head over **Nitro documentation** to learn more about On-Demand Incremental Static Regeneration or more advanced options.
::

---

## Deployment

**URL:** llms-txt#deployment

**Contents:**
- Node.js Server
  - Entry Point
  - PM2
  - Cluster Mode
  - Learn More
- Static Hosting
  - Client-side Only Rendering
- Hosting Providers
- Presets
- CDN Proxy

A Nuxt application can be deployed on a Node.js server, pre-rendered for static hosting, or deployed to serverless or edge (CDN) environments.

::tip
If you are looking for a list of cloud providers that support Nuxt, see the [Hosting providers](https://nuxt.com/deploy) section.
::

Discover the Node.js server preset with Nitro to deploy on any Node hosting.

- **Default output format** if none is specified or auto-detected :br
- Loads only the required chunks to render the request for optimal cold start timing :br
- Useful for deploying Nuxt apps to any Node.js hosting

When running `nuxt build` with the Node server preset, the result will be an entry point that launches a ready-to-run Node server.

This will launch your production Nuxt server that listens on port 3000 by default.

It respects the following runtime environment variables:

- `NITRO_PORT` or `PORT` (defaults to `3000`)
- `NITRO_HOST` or `HOST` (defaults to `'0.0.0.0'`)
- `NITRO_SSL_CERT` and `NITRO_SSL_KEY` - if both are present, this will launch the server in HTTPS mode. In the vast majority of cases, this should not be used other than for testing, and the Nitro server should be run behind a reverse proxy like nginx or Cloudflare which terminates SSL.

[PM2](https://pm2.keymetrics.io/){rel="&#x22;nofollow&#x22;"} (Process Manager 2) is a fast and easy solution for hosting your Nuxt application on your server or VM.

To use `pm2`, use an `ecosystem.config.cjs`:

You can use `NITRO_PRESET=node_cluster` in order to leverage multi-process performance using Node.js [cluster](https://nodejs.org/dist/latest/docs/api/cluster.html){rel="&#x22;nofollow&#x22;"} module.

By default, the workload gets distributed to the workers with the round robin strategy.

::read-more
---
title: the Nitro documentation for node-server preset
to: https://nitro.build/deploy/runtimes/node
---
::

::video-accordion
---
title: Watch Daniel Roe's short video on the topic
video-id: 0x1H6K5yOfs
---
::

There are two ways to deploy a Nuxt application to any static hosting services:

- Static site generation (SSG) with `ssr: true` pre-renders routes of your application at build time. (This is the default behavior when running `nuxt generate`.) It will also generate `/200.html` and `/404.html` single-page app fallback pages, which can render dynamic routes or 404 errors on the client (though you may need to configure this on your static host).
- Alternatively, you can prerender your site with `ssr: false` (static single-page app). This will produce HTML pages with an empty `<div id="__nuxt"></div>` where your Vue app would normally be rendered. You will lose many SEO benefits of prerendering your site, so it is suggested instead to use [`<ClientOnly>`](https://nuxt.com/docs/3.x/api/components/client-only) to wrap the portions of your site that cannot be server rendered (if any).

::read-more
---
title: Nuxt prerendering
to: https://nuxt.com/docs/getting-started/prerendering
---
::

### Client-side Only Rendering

If you don't want to pre-render your routes, another way of using static hosting is to set the `ssr` property to `false` in the `nuxt.config` file. The `nuxt generate` command will then output an `.output/public/index.html` entrypoint and JavaScript bundles like a classic client-side Vue.js application.

Nuxt can be deployed to several cloud providers with a minimal amount of configuration:

::read-more{to="https://nuxt.com/deploy"}
::

In addition to Node.js servers and static hosting services, a Nuxt project can be deployed with several well-tested presets and minimal amount of configuration.

You can explicitly set the desired preset in the [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file:

... or use the `NITRO_PRESET` environment variable when running `nuxt build`:

🔎 Check [the Nitro deployment](https://nitro.build/deploy){rel="&#x22;nofollow&#x22;"} for all possible deployment presets and providers.

In most cases, Nuxt can work with third-party content that is not generated or created by Nuxt itself. But sometimes such content can cause problems, especially Cloudflare's "Minification and Security Options".

Accordingly, you should make sure that the following options are unchecked / disabled in Cloudflare. Otherwise, unnecessary re-rendering or hydration errors could impact your production application.

1. Speed > Optimization > Content Optimization > Disable "Rocket Loader™"
2. Speed > Optimization > Image Optimization > Disable "Mirage"
3. Scrape Shield > Disable "Email Address Obfuscation"

With these settings, you can be sure that Cloudflare won't inject scripts into your Nuxt application that may cause unwanted side effects.

::tip
Their location on the Cloudflare dashboard sometimes changes so don't hesitate to look around.
::

**Examples:**

Example 1 (unknown):
```unknown
This will launch your production Nuxt server that listens on port 3000 by default.

It respects the following runtime environment variables:

- `NITRO_PORT` or `PORT` (defaults to `3000`)
- `NITRO_HOST` or `HOST` (defaults to `'0.0.0.0'`)
- `NITRO_SSL_CERT` and `NITRO_SSL_KEY` - if both are present, this will launch the server in HTTPS mode. In the vast majority of cases, this should not be used other than for testing, and the Nitro server should be run behind a reverse proxy like nginx or Cloudflare which terminates SSL.

### PM2

[PM2](https://pm2.keymetrics.io/){rel="&#x22;nofollow&#x22;"} (Process Manager 2) is a fast and easy solution for hosting your Nuxt application on your server or VM.

To use `pm2`, use an `ecosystem.config.cjs`:
```

Example 2 (unknown):
```unknown
### Cluster Mode

You can use `NITRO_PRESET=node_cluster` in order to leverage multi-process performance using Node.js [cluster](https://nodejs.org/dist/latest/docs/api/cluster.html){rel="&#x22;nofollow&#x22;"} module.

By default, the workload gets distributed to the workers with the round robin strategy.

### Learn More

::read-more
---
title: the Nitro documentation for node-server preset
to: https://nitro.build/deploy/runtimes/node
---
::

::video-accordion
---
title: Watch Daniel Roe's short video on the topic
video-id: 0x1H6K5yOfs
---
::

## Static Hosting

There are two ways to deploy a Nuxt application to any static hosting services:

- Static site generation (SSG) with `ssr: true` pre-renders routes of your application at build time. (This is the default behavior when running `nuxt generate`.) It will also generate `/200.html` and `/404.html` single-page app fallback pages, which can render dynamic routes or 404 errors on the client (though you may need to configure this on your static host).
- Alternatively, you can prerender your site with `ssr: false` (static single-page app). This will produce HTML pages with an empty `<div id="__nuxt"></div>` where your Vue app would normally be rendered. You will lose many SEO benefits of prerendering your site, so it is suggested instead to use [`<ClientOnly>`](https://nuxt.com/docs/3.x/api/components/client-only) to wrap the portions of your site that cannot be server rendered (if any).

::read-more
---
title: Nuxt prerendering
to: https://nuxt.com/docs/getting-started/prerendering
---
::

### Client-side Only Rendering

If you don't want to pre-render your routes, another way of using static hosting is to set the `ssr` property to `false` in the `nuxt.config` file. The `nuxt generate` command will then output an `.output/public/index.html` entrypoint and JavaScript bundles like a classic client-side Vue.js application.
```

Example 3 (unknown):
```unknown
## Hosting Providers

Nuxt can be deployed to several cloud providers with a minimal amount of configuration:

::read-more{to="https://nuxt.com/deploy"}
::

## Presets

In addition to Node.js servers and static hosting services, a Nuxt project can be deployed with several well-tested presets and minimal amount of configuration.

You can explicitly set the desired preset in the [`nuxt.config.ts`](https://nuxt.com/docs/3.x/directory-structure/nuxt-config) file:
```

Example 4 (unknown):
```unknown
... or use the `NITRO_PRESET` environment variable when running `nuxt build`:
```

---

## Azure

**URL:** llms-txt#azure

**Contents:**
- Azure Static Web Apps
  - Local preview
  - Configuration
  - Custom Configuration
  - Deploy from CI/CD via GitHub Actions
- More options

## Azure Static Web Apps

::tip
**Zero Configuration ✨**

Integration with Azure Static Web Apps provider is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

Azure Static Web Apps are designed to be deployed continuously in a [GitHub Actions workflow](https://docs.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow){rel="&#x22;nofollow&#x22;"}. By default, Nuxt will detect this deployment environment to enable the `azure` preset.

Install [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local){rel="&#x22;nofollow&#x22;"} if you want to test locally.

You can invoke a development environment to preview before deploying.

Azure Static Web Apps are [configured](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration){rel="&#x22;nofollow&#x22;"} using the `staticwebapp.config.json` file.

Nuxt automatically generates this configuration file whenever the application is built with the `azure` preset.

It adds the following properties based on the following criteria:

| Property                                                                                                                                            | Criteria                                                                                                                                                                                                                                                      | Default       |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **[platform.apiRuntime](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#platform){rel="&#x22;nofollow&#x22;"}**               | Will automatically set to `node:16` or `node:14` depending on your package configuration.                                                                                                                                                                     | `node:16`     |
| **[navigationFallback.rewrite](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#fallback-routes){rel="&#x22;nofollow&#x22;"}** | Is always `/api/server`                                                                                                                                                                                                                                       | `/api/server` |
| **[routes](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#routes){rel="&#x22;nofollow&#x22;"}**                              | All prerendered routes are added. Additionally, if you do not have an `index.html` file an empty one is created for you for compatibility purposes and also requests to `/index.html` are redirected to the root directory which is handled by `/api/server`. | `[]`          |

### Custom Configuration

You can alter the generated configuration using `azure.config` option. For instance, if you wanted to specify a Node runtime for your Azure Functions, edit your `nuxt.config.ts` file to the following:

Custom routes will be added and matched first. In the case of a conflict (determined if an object has the same route property), custom routes will override generated ones.

### Deploy from CI/CD via GitHub Actions

When you link your GitHub repository to Azure Static Web Apps, a workflow file is added to the repository.

When you are asked to select your framework, select custom and provide the following information:

| Input                | Value            |
| -------------------- | ---------------- |
| **app\_location**    | '/'              |
| **api\_location**    | '.output/server' |
| **output\_location** | '.output/public' |

If you miss this step, you can always find the build configuration section in your workflow and update the build configuration:

::callout
That's it! Now Azure Static Web Apps will automatically deploy your Nitro-powered application on push.
::

If you are using `runtimeConfig`, you will likely want to configure the corresponding [environment variables on Azure](https://docs.microsoft.com/en-us/azure/static-web-apps/application-settings){rel="&#x22;nofollow&#x22;"}.

::read-more{target="_blank" to="https://nitro.unjs.io/deploy/providers/azure"}
Learn about the other Azure deployment presets on Nitro documentation.
::

**Examples:**

Example 1 (unknown):
```unknown
### Configuration

Azure Static Web Apps are [configured](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration){rel="&#x22;nofollow&#x22;"} using the `staticwebapp.config.json` file.

Nuxt automatically generates this configuration file whenever the application is built with the `azure` preset.

It adds the following properties based on the following criteria:

| Property                                                                                                                                            | Criteria                                                                                                                                                                                                                                                      | Default       |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **[platform.apiRuntime](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#platform){rel="&#x22;nofollow&#x22;"}**               | Will automatically set to `node:16` or `node:14` depending on your package configuration.                                                                                                                                                                     | `node:16`     |
| **[navigationFallback.rewrite](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#fallback-routes){rel="&#x22;nofollow&#x22;"}** | Is always `/api/server`                                                                                                                                                                                                                                       | `/api/server` |
| **[routes](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#routes){rel="&#x22;nofollow&#x22;"}**                              | All prerendered routes are added. Additionally, if you do not have an `index.html` file an empty one is created for you for compatibility purposes and also requests to `/index.html` are redirected to the root directory which is handled by `/api/server`. | `[]`          |

### Custom Configuration

You can alter the generated configuration using `azure.config` option. For instance, if you wanted to specify a Node runtime for your Azure Functions, edit your `nuxt.config.ts` file to the following:
```

Example 2 (unknown):
```unknown
Custom routes will be added and matched first. In the case of a conflict (determined if an object has the same route property), custom routes will override generated ones.

### Deploy from CI/CD via GitHub Actions

When you link your GitHub repository to Azure Static Web Apps, a workflow file is added to the repository.

When you are asked to select your framework, select custom and provide the following information:

| Input                | Value            |
| -------------------- | ---------------- |
| **app\_location**    | '/'              |
| **api\_location**    | '.output/server' |
| **output\_location** | '.output/public' |

If you miss this step, you can always find the build configuration section in your workflow and update the build configuration:
```

---

## NuxtHub

**URL:** llms-txt#nuxthub

**Contents:**
- Introduction
- NuxtHub CLI
- Deploy using Git
- Templates

::tip
**Zero Configuration ✨**

Integration with NuxtHub is possible with zero configuration, [learn more](https://nitro.unjs.io/deploy#zero-config-providers){rel=""nofollow""}.
::

NuxtHub is a deployment and administration platform for Nuxt, powered by Cloudflare.

The main difference with the [Cloudflare](https://nuxt.com/deploy/cloudflare) deployment is that NuxtHub provides a zero-configuration deployment experience (provisioning, deployment, and administration).

It also provides a powerful admin interface to manage your Nuxt projects (database, blob, KV, ...) as well as [remote storage](https://hub.nuxt.com/docs/getting-started/remote-storage?utm_source=nuxt-website\&utm_medium=deploy-page){rel="&#x22;nofollow&#x22;"}.

Read more on [hub.nuxt.com](https://hub.nuxt.com/?utm_source=nuxt-website\&utm_medium=deploy-page){rel="&#x22;nofollow&#x22;"}.

You can deploy your local project with a single command:

1. Ensure you are logged in on [admin.hub.nuxt.com](https://admin.hub.nuxt.com/?utm_source=nuxt-website\&utm_medium=deploy-page){rel="&#x22;nofollow&#x22;"}
2. Link your local project with a NuxtHub project or help you create a new one
3. Build your Nuxt project with the correct preset
4. Deploy it to your Cloudflare account with all the necessary resources
5. Provide you with a URL to access your project

See an example in video:

:video{.rounded.dark:border.dark:border-gray-700.md:w-2/3 controls controls="true" poster="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.jpg"}

::note
You can also install the [NuxtHub CLI](https://github.com/nuxt-hub/cli){rel=""nofollow""} globally with: `npm i -g nuxthub`.
::

1. Push your code to your git repository (GitHub)
2. Click on `New Project` then `Import a Git repository`
3. Select your repository and click on `Import repository`
4. NuxtHub will configure a GitHub Action workflow to deploy your project
5. Your application is deployed with a `.nuxt.dev` domain

After your project has been imported and deployed, all subsequent pushes to branches will generate preview deployments and all changes made to the production branch (commonly “main”) will result in a production deployment.

::card-group
  :::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Hello Edge
  to: https://github.com/nuxt-hub/hello-edge
  ---
  A minimal Nuxt starter running on the edge.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: NuxtHub Starter
  to: https://github.com/nuxt-hub/starter
  ---
  A starter to get started with NuxtHub features (Database, Blob, KV, ...).
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Atidone
  to: https://github.com/atinux/atidone
  ---
  A full-stack application with authentication and a database to manage your Todos.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Nuxt Image Gallery
  to: https://github.com/flosciante/nuxt-image-gallery
  ---
  An image gallery to upload, edit and share your images to the world.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Atinotes
  to: https://github.com/atinux/atinotes
  ---
  An editable website powered by Markdown & Vue components with dynamic OG image generation.
  :::

:::card
  ---
  ui:
    icon:
      base: text-black dark:text-white
  icon: i-simple-icons-github
  target: _blank
  title: Atidraw
  to: https://github.com/atinux/atidraw
  ---
  Web application that lets you to draw and share your drawings with the world, with Cloudflare R2 & AI.
  :::
::

::callout
See the whole list of templates on <https://hub.nuxt.com/templates>{rel=""nofollow""}
::

---

## .output

**URL:** llms-txt#.output

::important
This directory should be added to your [`.gitignore`](https://nuxt.com/docs/3.x/directory-structure/gitignore) file to avoid pushing the build output to your repository.
::

Use this directory to deploy your Nuxt application to production.

::read-more{to="https://nuxt.com/docs/getting-started/deployment"}
::

::warning
You should not touch any files inside since the whole directory will be re-created when running [`nuxt build`](https://nuxt.com/docs/3.x/api/commands/build).
::

---
````
