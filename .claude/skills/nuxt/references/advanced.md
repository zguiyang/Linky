# Nuxt - Advanced

**Pages:** 2

---

## Testing

**URL:** llms-txt#testing

::read-more{to="https://nuxt.com/docs/getting-started/testing"}
::

## ::sandbox

branch: main
dir: examples/advanced/testing
file: app.vue
repo: nuxt/examples

---

::

---

## useSeoMeta

**URL:** llms-txt#useseometa

**Contents:**

- Usage
- Parameters
- Performance

This helps you avoid common mistakes, such as using `name` instead of `property`, as well as typos - with over 100+ meta tags fully typed.

::important
This is the recommended way to add meta tags to your site as it is XSS safe and has full TypeScript support.
::

::read-more{to="https://nuxt.com/docs/getting-started/seo-meta"}
::

When inserting tags that are reactive, you should use the computed getter syntax (`() => value`):

There are over 100 parameters. See the [full list of parameters in the source code](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035){rel="&#x22;nofollow&#x22;"}.

::read-more{to="https://nuxt.com/docs/getting-started/seo-meta"}
::

In most instances, SEO meta tags don't need to be reactive as search engine robots primarily scan the initial page load.

For better performance, you can wrap your `useSeoMeta` calls in a server-only condition when the meta tags don't need to be reactive:

This previously used the [`useServerSeoMeta`](https://nuxt.com/docs/3.x/api/composables/use-server-seo-meta) composable, but it has been deprecated in favor of this approach.

**Examples:**

Example 1 (unknown):

```unknown
When inserting tags that are reactive, you should use the computed getter syntax (`() => value`):
```

Example 2 (unknown):

```unknown
## Parameters

There are over 100 parameters. See the [full list of parameters in the source code](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035){rel="&#x22;nofollow&#x22;"}.

::read-more{to="https://nuxt.com/docs/getting-started/seo-meta"}
::

## Performance

In most instances, SEO meta tags don't need to be reactive as search engine robots primarily scan the initial page load.

For better performance, you can wrap your `useSeoMeta` calls in a server-only condition when the meta tags don't need to be reactive:
```

---
