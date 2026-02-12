# Adonisjs - Views

**Pages:** 5

---

## Views and Templates

**URL:** https://docs.adonisjs.com/guides/views-and-templates/introduction

**Contents:**
- Views and Templates
- Popular options
- Hybrid applications

AdonisJS is an excellent fit for creating traditional server-rendered applications in Node.js. If you enjoy the simplicity of using a backend template engine that outputs HTML without any overhead of Virtual DOM and build tools, then this guide is for you.

The typical workflow of a server-rendered application in AdonisJS looks as follows.

The AdonisJS core team has created a framework-agnostic template engine called Edge.js but does not force you to use it. You can use any other template engine you would like inside an AdonisJS application.

Following is the list of popular template engines you can use inside an AdonisJS application (just like any other Node.js application).

AdonisJS is also a great fit for creating hybrid applications that render HTML on the server and then hydrate your JavaScript on the client. This approach is popular among developers who want to use Vue, React, Svelte, Solid, or others for building interactive user interfaces but still want a full backend stack to handle server-side concerns.

In this case, AdonisJS provide a first-class support for using InertiaJS to bridge the gap between your frontend and backend.

---

## Internationalization and Localization

**URL:** https://docs.adonisjs.com/guides/digging-deeper/i18n

**Contents:**
- Internationalization and Localization
- Installation
- Configuration
- Storing translations
  - Files format
- Resolving translations
  - Fallback locale
  - Missing translations
- Detecting user locale during an HTTP request
  - Changing the user language detection code

Internationalization and Localization aims to help you create web apps for multiple regions and languages. The support for i18n (shorthand for Internationalization) is provided by the @adonisjs/i18n package.

Localization is the process of translating the text of your application to multiple languages. You must write a copy for each language and reference them within Edge templates, validation error messages, or using i18n API directly.

Internationalization is the process of formatting values such as date, time, numbers as per a specific region or country.

Install and configure the package using the following command :

Installs the @adonisjs/i18n package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates the config/i18n.ts file.

Creates detect_user_locale_middleware inside the middleware directory.

register the following middleware inside the start/kernel.ts file.

The configuration for the i18n package is stored within the config/i18n.ts file.

See also: Config stub

Defines the format to use for storing translations. AdonisJS supports the ICU message format.

The ICU message format is a widely accepted standard supported by many translation services like Crowdin and Lokalise.

Also, you can add custom message formatters.

The default locale for the application. Translations and values formatting will fall back to this locale when your application does not support the user language.

A key-value pair that defines a collection of locales and their fallback locales. For example, if your application supports Spanish, you may define it as a fallback for the Catalin language.

An array of locales supported by your application.

If you do not define this value, we will infer the supportedLocales from translations. For example, if you have defined translations for English, French, and Spanish, the value of supportedLocales will be ['en', 'es', 'fr']

A collection of loaders to use for loading translations. By default, we only support the File system loader. However, you can add custom loaders.

The translations are stored inside the resources/lang directory, and you must create a sub-directory for every language as per IETF language tag format. For example:

You can define translations for a specific region by creating sub-directories with the region code. In the following example, we define different translations for English (Global), English (United States), and English (United Kingdom).

AdonisJS will automatically fall back to English (Global) when you have a missing translation in a region-specific translations set.

See also: ISO Language code

Translations must be stored inside .json or .yaml files. Feel free to create a nested directory structure for better organization.

Translations must be formatted per the ICU message syntax.

Before you can look up and format translations, you will have to create a locale-specific instance of the I18n class using the i18nManager.locale method.

Once you have an instance of the I18n class, you may use the .t method to format a translation.

Each instance has a pre-configured fallback language based upon the config.fallbackLocales collection. The fallback language is used when a translation is missing for the main language.

If a translation is missing in the main and the fallback locales, the .t method will return an error string formatted as follows.

You can replace this message with a different message or an empty string by defining a fallback value as the second parameter.

You may also compute a fallback value globally via the config file. The fallback method receives the translation path as the first parameter and the locale code as the second parameter. Make sure always to return a string value.

During the initial setup, we create a detect_user_locale_middleware.ts file inside the ./app/middleware directory. The middleware performs the following actions.

Detect the locale of the request using the Accept-language header.

Create an instance of the I18n class for the request locale and share it with the rest of the request pipeline using the HTTP Context.

Share the same instance with Edge templates as a global i18n property.

Finally, hook into the Request validator and provide validation messages using translation files.

If this middleware is active, you can translate messages inside your controllers and Edge templates as follows.

Since the detect_user_locale_middleware is part of your application codebase, you may modify the getRequestLocale method and use custom logic to find the user language.

The detect_user_locale_middleware hooks into the Request validator and provides validation messages using the translation files.

The translations must be stored inside the validator.json file under the shared key. The validation messages can be defined for the validation rule or the field + rule combination.

During an HTTP request, the detect_user_locale_middleware hooks into the Request validator and registers a custom messages provider to lookup validation errors from translation files.

However, if you use VineJS outside of an HTTP request, in Ace commands or queue jobs, you must explicitly register a custom messages provider when calling the validator.validate method.

The ICU messages syntax uses a single curly brace for referencing dynamic values. For example:

The ICU messages syntax does not support nested data sets, and hence, you can only access properties from a flat object during interpolation.

You can also write HTML within the messages. However, use three curly braces within the Edge templates to render HTML without escaping it.

You can format numeric values within the translation messages using the {key, type, format} syntax. In the following example:

The following are examples of using the number format with different formatting styles and number skeletons.

You may format the Date instances or the luxon DateTime instances using the {key, type, format} syntax. In the following example:

You can use the time format to format the value as a time.

ICU provides a wide array of patterns to customize the date-time format. However, not all of them are available via ECMA402's Intl API. Therefore, we only support the following patterns.

ICU message syntax has first-class support for defining the plural rules within your messages. For example:

In the following example, we use YAML over JSON since writing multiline text in YAML is easier.

The # is a special token to be used as a placeholder for the numeric value. It will be formatted as {key, number}.

The plural rule uses the {key, plural, matches} syntax. The matches is a literal value matched to one of the following plural categories.

The table's content is referenced from formatjs.io

The select format lets you choose the output by matching a value against one of the many choices. Writing gender-specific text is an excellent example of the select format.

The select ordinal format allows you to choose the output based on the ordinal pluralization rules. The format is similar to the select format. However, the value is mapped to an ordinal plural category.

The select ordinal format uses the {key, selectordinal, matches} syntax. The match is a literal value and is matched to one of the following plural categories.

The table's content is referenced from formatjs.io

The following methods under the hood use the Node.js Intl API but have better performance. See benchmarks

Format a numeric value using the Intl.NumberFormat class. You may pass the following arguments.

Format a numeric value as a currency using the Intl.NumberFormat class. The formatCurrency method implicitly defines the style = currency option.

Format a date or a luxon date-time object using the Intl.DateTimeFormat class. You may pass the following arguments.

Format a date value to a time string using the Intl.DateTimeFormat class. The formatTime method implicitly defines the timeStyle = medium option.

The formatRelativeTime method uses the Intl.RelativeTimeFormat class to format a value to a relative time representation string. The method accepts the following arguments.

Set the unit's value to auto to display the diff in the best matching unit.

Find the plural category for a number using the Intl.PluralRules class. You may pass the following arguments.

Format an array of strings to a sentence using the Intl.ListFormat class. You may pass the following arguments.

Format currency, language, region, and calendar codes to their display names using the Intl.DisplayNames class. You may pass the following arguments.

The i18n Ally extension for VSCode provides an excellent workflow for storing, inspecting, and referencing translations with your code editor.

To make the extension work seamlessly with AdonisJS, you must create the following files inside the .vscode directory of your project root.

Copy/paste the following contents inside the settings.json file.

Copy/paste the following contents inside the .vscode/i18n-ally-custom-framework.yml file.

You may listen to the i18n:missing:translation event to get notified about the missing translations in your app.

The @adonisjs/i18n package reads the translation files when booting the application and stores them within the memory for quick access.

However, if you modify the translation files while your application is running, you may use the reloadTranslations method to refresh the in-memory cache.

A translations loader is responsible for loading translations from a persistent store. We ship with a file system loader and provide an API to register custom loaders.

A loader must implement the TranslationsLoaderContract interface and define the load method that returns an object with key-value pair. The key is the locale code, and the value is a flat object with a list of translations.

In the above code example, we export the following values.

Once the loader has been created, you can reference it inside the config file using the dbLoader factory function.

Translation formatters are responsible for formatting the translations as per a specific format. We ship with an implementation for the ICU message syntax and provide additional APIs to register custom formatters.

A formatter must implement the TranslationsFormatterContract interface and define the format method to format a translation message.

Once the formatter has been created, you can reference it inside the config file using the fluentFormatter factory function.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/i18n
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/i18n/i18n_provider')
  ]
}
```

Example 3 (typescript):
```typescript
router.use([
  () => import('#middleware/detect_user_locale_middleware')
])
```

Example 4 (typescript):
```typescript
import app from '@adonisjs/core/services/app'
import { defineConfig, formatters, loaders } from '@adonisjs/i18n'

const i18nConfig = defineConfig({
  defaultLocale: 'en',
  formatter: formatters.icu(),

  loaders: [
    loaders.fs({
      location: app.languageFilesPath()
    })
  ],
})

export default i18nConfig
```

---

## Inertia

**URL:** https://docs.adonisjs.com/guides/views-and-templates/inertia

**Contents:**
- Inertia
- Installation
- Client-side entrypoint
- Rendering pages
  - Root Edge template
  - Root template data
- Redirects
- Sharing data with all views
  - sharedData
  - Share from a middleware

Inertia is a framework-agnostic way to create single-page applications without much of the complexity of modern SPAs.

It is a great middle ground between traditional server-rendered applications (with templating engines) and modern SPAs (with client-side routing and state management).

Using Inertia will allow you to create a SPA with your favorite frontend framework (Vue.js, React, Svelte or Solid.js) without creating a separate API.

Are you starting a new project and want to use Inertia? Check out the Inertia starter kit.

Install the package from the npm registry running:

Once done, run the following command to configure the package.

Registers the following service provider and command inside the adonisrc.ts file.

Registers the following middleware inside the start/kernel.ts file

Create the config/inertia.ts file.

Copy a few stubs into your application to help you start quickly. Each copied file is adapted to the frontend framework previously selected.

Create a ./resources/views/inertia_layout.edge file that will be used to render the HTML page used to boot Inertia.

Create a ./inertia/css/app.css file with the content needed to style the inertia_layout.edge view.

Create a ./inertia/tsconfig.json file to differentiate between the server and client-side TypeScript configuration.

Create a ./inertia/app/app.ts for bootstrapping Inertia and your frontend framework.

Create a ./inertia/pages/home.{tsx|vue|svelte} file to render the home page of your application.

Create a ./inertia/pages/server_error.{tsx|vue|svelte} and ./inertia/pages/not_found.{tsx|vue|svelte} files to render the error pages.

Add the correct vite plugin to compile your frontend framework in the vite.config.ts file.

Add a dumb route at / in your start/routes.ts file to render the home page with Inertia as an example.

Install packages based on the selected frontend framework.

Once done, you should be ready to use Inertia in your AdonisJS application. Start your development server, and visit localhost:3333 to see the home page rendered using Inertia with your selected frontend framework.

Read the Inertia official documentation.

Inertia is a backend-agnostic library. We just created an adapter to make it work with AdonisJS. You should be familiar with the Inertia concepts before reading this documentation.

We will only cover AdonisJS's specific parts in this documentation.

If you used the configure or add command, the package will have created an entrypoint file at inertia/app/app.ts so you can skip this step.

Basically, this file will be the main entrypoint for your frontend application and will be used to bootstrap Inertia and your frontend framework. This file should be the entrypoint loaded by your root Edge template with the @vite tag.

The role of this file is to create an Inertia app and to resolve the page component. The page component you write when using inertia.render will be passed down the the resolve function and the role of this function is to return the component that need to be rendered.

While configuring your package, a inertia_middleware has been registered inside the start/kernel.ts file. This middleware is responsible for setting up the inertia object on the HttpContext.

To render a view using Inertia, use the inertia.render method. The method accepts the view name and the data to be passed to the component as props.

Do you see the home passed to the inertia.render method? It should be the path to the component file relative to the inertia/pages directory. We render the inertia/pages/home.(vue,tsx) file here.

Your frontend component will receive the user object as a prop :

While passing data to the frontend, everything is serialized to JSON. Do not expect to pass instances of models, dates, or other complex objects.

The Root template is a regular Edge template that will be loaded on the first-page visit of your application. It is the place where you should include your CSS and Javascript files and also where you should include the @inertia tag. A typical root template looks like this :

You can configure the root template path in the config/inertia.ts file. By default, it assumes your template is at resources/views/inertia_layout.edge.

If needed, you can pass a function to the rootView prop to dynamically decide which root template should be used.

You may want to share data with your root Edge template. For example, for adding a meta title or open graph tags. You can do so by using the 3rd argument of the inertia.render method :

The title and description will now be available to the root Edge template :

It is how you should do it in AdonisJS :

See the official documentation for more information.

Sometimes, you may need to share the same data across multiple views. For instance, we are sharing the current user information with all views. Having to do this for every controller can become tedious. Fortunately, we have two solutions for this issue.

In the config/inertia.ts file, you can define a sharedData object. This object allows you to define data that should be shared with all views.

Sometimes, sharing data from a middleware rather than the config/inertia.ts file might be more convenient. You can do so by using the inertia.share method :

First read the official documentation to understand what partial reloads are and how they work.

About lazy data evaluation, here is how it works in AdonisJS :

Usually, you will want to share the types of the data you are passing to your frontend pages components. A simple way to do this is to use the InferPageProps type.

If you're using Vue, you'll have to manually define each property in your defineProps. This is an annoying limitation of Vue, see this issue for more information.

Since your Inertia Application is a separate TypeScript project (with its own tsconfig.json), you will need to help TypeScript understand some types. Many of our official packages use module augmentation to add certain types to your AdonisJS project.

For example, the auth property on the HttpContext and its typing will only be available when you import @adonisjs/auth/initialize_auth_middleware into your project. Now, the issue is that we don't import this module in our Inertia project, so if you try to infer the page props from a controller that uses auth, then you will likely receive a TypeScript error or an invalid type.

To resolve this issue, you can use reference directives to help TypeScript understand certain types. To do this, you need to add the following line in your inertia/app/app.ts file:

Depending on the types you use, you may need to add other reference directives, such as references to certain configuration files that also use module augmentation.

An important thing to know about InferPageProps is that it will "serialize at the type level" the data you pass. For example, if you pass a Date object to inertia.render, the resulting type from InferPageProps will be string:

This makes total sense, as dates are serialized to string when they are passed over the network in JSON.

Keeping the last point in mind, another important thing to know is that if you pass an AdonisJS model to inertia.render, then the resulting type from InferPageProps will be a ModelObject: a type that contains almost no information. This can be problematic. To solve this issue, you have several options:

You will now have accurate types in your frontend component.

To have the types of your shared data in your components, ensure you have performed module augmentation in your config/inertia.ts file as follows:

Also, make sure to add this reference directive in your inertia/app/app.ts file:

Once this is done, you will have access to your shared props in your components via InferPageProps. InferPageProps will contain the types of your shared props and the props passed by inertia.render:

If needed, you can access only the types of your shared props via the SharedProps type:

If you enabled CSRF protection for your application, enable the enableXsrfCookie option in the config/shield.ts file.

Enabling this option will ensure that the XSRF-TOKEN cookie is set on the client side and sent back to the server with every request.

No additional configuration is needed to make Inertia work with CSRF protection.

When re-deploying your application, your users should always get the latest version of your client-side assets. It is something supported out-of-the-box by the Inertia protocol and AdonisJS.

By default, the @adonisjs/inertia package will compute a hash for the public/assets/manifest.json file and use it as the version of your assets.

If you want to tweak this behavior, you can edit the config/inertia.ts file. The assetsVersion prop defines the version of your assets and can be a string or a function.

Read the official documentation for more information.

Inertia Starter Kit comes with server-side rendering (SSR) support out of the box. So make sure to use it if you want to enable SSR for your application.

If you started your application without enabling SSR, you can always enable it later by following the following steps :

We need to add a server entrypoint that looks super similar to the client entrypoint. This entrypoint will render the first-page visit on the server and not on the browser.

You must create a inertia/app/ssr.ts that default export a function like this :

Head over to the config/inertia.ts file and update the ssr prop to enable it. Also, point to your server entrypoint if you use a different path.

First, make sure you have registered the inertia vite plugin. Once done, you should update the path to the server entrypoint in the vite.config.ts file if you use a different path.

You should now be able to render the first-page visit on the server and then continue with the client-side rendering.

When using SSR, you may want to not server-side render all your components. For example, you are building an admin dashboard gated by authentication, so these routes have no reason to be rendered on the server. But on the same application, you may have a landing page that could benefit from SSR to improve SEO.

So, you can add the pages that should be rendered on the server in the config/inertia.ts file.

You can also pass a function to the pages prop to dynamically decide which pages should be rendered on the server.

There are several ways to test your frontend code:

And finally, you can also test your Inertia endpoints to ensure they return the correct data. For that, we have a few test helpers available in Japa.

First, make sure to configure the inertiaApiClient and apiClient plugins in your test/bootsrap.ts file if you haven't already done so:

Next, we can request our Inertia endpoint using withInertia() to ensure the data is correctly returned in JSON format.

Let's take a look at the various assertions available to test your endpoints:

Adds the X-Inertia header to the request. It ensures that data is correctly returned in JSON format.

Checks that the component returned by the server is the one expected.

Checks that the props returned by the server are exactly those passed as parameters.

Checks that the props returned by the server contain some of the props passed as parameters. It uses containsSubset under the hood.

In addition to this, you can access the following properties on ApiResponse :

Let's say you are using React. Every time you update your frontend code, the server will reload and the browser will refresh. You are not benefiting from the hot module replacement (HMR) feature.

You need to exclude inertia/**/* from your root tsconfig.json file to make it work.

Because, the AdonisJS process that is responsible for restarting the server is watching files included in the tsconfig.json file.

If you are facing an error like this one:

A common issue is that you just forgot to set NODE_ENV=production when running your production build.

If you are facing an error like this one:

Then it's highly likely that you're importing backend code into your frontend. Taking a closer look at the error, which is generated by Vite, we see that it's trying to compile code from node_modules/@adonisjs/core. So, this means our backend code will end up in the frontend bundle. That's probably not what you want.

Generally, this error occurs when you try to share a type with your frontend. If this what you are trying to achieve, make sure to always import this type only via import type rather than import:

**Examples:**

Example 1 (typescript):
```typescript
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    const users = await User.all()

    return inertia.render('users/index', { users })
  }
}
```

Example 2 (vue):
```vue
<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'

defineProps<{
  users: SerializedUser[]
}>()
</script>

<template>
  <Head title="Users" />

  <div v-for="user in users" :key="user.id">
    <Link :href="`/users/${user.id}`">
      {{ user.name }}
    </Link>
    <div>{{ user.email }}</div>
  </div>
</template>
```

Example 3 (python):
```python
npm i @adonisjs/inertia
```

Example 4 (python):
```python
node ace configure @adonisjs/inertia
```

---

## EdgeJS

**URL:** https://docs.adonisjs.com/guides/views-and-templates/edgejs

**Contents:**
- EdgeJS
- Installation
- Rendering your first template
  - Passing data to the template
- Configuring Edge
- Global helpers
- Learn more

Edge is a simple, Modern, and batteries included template engine created and maintained by the AdonisJS core team for Node.js. Edge is similar to writing JavaScript. If you know JavaScript, you know Edge.

The documentation for Edge is available on https://edgejs.dev

Install and configure Edge using the following command.

Installs the edge.js package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Once the configuration is completed, you can use Edge to render templates. Let's create a welcome.edge file inside the resources/views directory.

Open the newly created file and write the following markup inside it.

Finally, let's register a route to render the template.

You can also use the router.on().render method to render a template without assigning a callback to the route.

You can pass data to the template by passing an object as the second argument to the view.render method.

You can use Edge plugins or add global helpers to Edge by creating a preload file inside the start directory.

Please check the Edge helpers reference guide to view the list of helpers contributed by AdonisJS.

**Examples:**

Example 1 (unknown):
```unknown
node ace add edge
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/core/providers/edge_provider')
  ]
}
```

Example 3 (unknown):
```unknown
node ace make:view welcome
```

Example 4 (html):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>
    Hello world from {{ request.url() }} endpoint
  </h1>
</body>
</html>
```

---

## Edge helpers and tags

**URL:** https://docs.adonisjs.com/guides/references/edge

**Contents:**
- Edge helpers and tags
- request
- route/signedRoute
- app
- config
- session
- flashMessages
- old
- t
- i18n

In this guide, we will learn about the helpers and the tags contributed to Edge by the AdonisJS official packages. The helpers shipped with Edge are not covered in this guide and must reference Edge documentation for the same.

Reference to the instance of ongoing HTTP request. The property is only available when a template is rendered using the ctx.view.render method.

Helper functions to create URL for a route using the URL builder. Unlike the URL builder, the view helpers do not have a fluent API and accept the following parameters.

The options object with the following properties.

Reference to the Application instance.

A helper function to reference configuration values inside Edge templates. You may use the config.has method to check if the value for a key exists.

A read-only copy of the session object. You cannot mutate session data within Edge templates. The session property is only available when the template is rendered using the ctx.view.render method.

A read-only copy of session flash messages. The flashMessages property is only available when the template is rendered using the ctx.view.render method.

The old method is a shorthand for the flashMessages.get method.

The t method is contributed by the @adonisjs/i18n package to display translations using the i18n class. The method accepts the translation key identifier, message data and a fallback message as the parameters.

Reference to an instance of the I18n class configured using the application's default locale. However, the DetectUserLocaleMiddleware overrides this property with an instance created for the current HTTP request locale.

Reference to the ctx.auth property shared by the InitializeAuthMiddleware. You may use this property to access information about the logged-in user.

If you are displaying the logged-in user info on a public page (not protected by the auth middleware), then you may want to first silently check if the user is logged-in or not.

Resolve the URL of an asset processed by Vite. Learn more about referencing assets inside Edge templates.

The embedImage and the embedImageData helpers are added by the mail package and are only available when rendering a template to send an email.

The @flashMessage tag provides a better DX for reading flash messages for a given key conditionally.

Instead of writing conditionals

You may prefer using the tag

The @error tag provides a better DX for reading error messages stored inside the errorsBag key in flashMessages.

Instead of writing conditionals

You may prefer using the tag

The @inputError tag provides a better DX for reading validation error messages stored inside the inputErrorsBag key in flashMessages.

Instead of writing conditionals

You may prefer using the tag

The @vite tag accepts an array of entry point paths and returns the script and the link tags for the same. The path you provide to the @vite tag should match exactly the path registered inside the vite.config.js file.

You can define the script tag attributes as the 2nd argument. For example:

The @viteReactRefresh tag returns a script tag to enable React HMR for project using the @vitejs/plugin-react package.

The @can and @cannot tags allows you write authorization checks in Edge templates by referencing the ability name or the policy name as a string.

The first argument is the ability or the policy reference followed by the arguments accepted by the check.

See also: Pre-registering abilities and policies

**Examples:**

Example 1 (json):
```json
{{ request.url() }}
{{ request.input('signature') }}
```

Example 2 (jsx):
```jsx
<a href="{{ route('posts.show', [post.id]) }}">
  View post
</a>
```

Example 3 (jsx):
```jsx
<a href="{{
  signedRoute('unsubscribe', [user.id], {
    expiresIn: '3 days',
    prefixUrl: 'https://blog.adonisjs.com'    
  })
}}">
 Unsubscribe
</a>
```

Example 4 (json):
```json
{{ app.getEnvironment() }}
```

---
