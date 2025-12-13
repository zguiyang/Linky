# Nuxt - Migrations

**Pages:** 2

---

## nuxt upgrade

**URL:** llms-txt#nuxt-upgrade

**Contents:**

- Arguments
- Options

The `upgrade` command upgrades Nuxt to the latest version.

| Argument      | Description                                    |
| ------------- | ---------------------------------------------- |
| `ROOTDIR="."` | Specifies the working directory (default: `.`) |

| Option                  | Default | Description                                                                      |
| ----------------------- | ------- | -------------------------------------------------------------------------------- | --- | ---------------------------- | ------------ | -------- | --------------------------------------------------- |
| `--cwd=<directory>`     |         | Specify the working directory, this takes precedence over ROOTDIR (default: `.`) |
| `--logLevel=<silent     | info    | verbose>`                                                                        |     | Specify build-time log level |
| `--dedupe`              |         | Dedupe dependencies after upgrading                                              |
| `-f, --force`           |         | Force upgrade to recreate lockfile and node_modules                              |
| `-ch, --channel=<stable | nightly | v3                                                                               | v4  | v4-nightly                   | v3-nightly>` | `stable` | Specify a channel to install from (default: stable) |

---

## Upgrade Guide

**URL:** llms-txt#upgrade-guide

**Contents:**

- Upgrading Nuxt
  - Latest release
  - Nightly Release Channel
- Testing Nuxt 4
  - Opting in to Nuxt 4
  - Migrating Using Codemods

To upgrade Nuxt to the [latest release](https://github.com/nuxt/nuxt/releases){rel="&#x22;nofollow&#x22;"}, use the `nuxt upgrade` command.

::code-group{sync="pm"}

### Nightly Release Channel

To use the latest Nuxt build and test features before their release, read about the [nightly release channel](https://nuxt.com/docs/3.x/guide/going-further/nightly-release-channel) guide.

::warning
The nightly release channel `latest` tag is currently tracking the Nuxt v4 branch, meaning that it is particularly likely to have breaking changes right now — be careful! You can opt in to the 3.x branch nightly releases with `"nuxt": "npm:nuxt-nightly@3x"`.
::

Nuxt 4 is **scheduled for release in Q2 2025**. It will include all the features currently available through `compatibilityVersion: 4`.

Until the release, it is possible to test many of Nuxt 4's breaking changes from Nuxt version 3.12+.

## ::video-accordion

title: Watch a video from Alexander Lichter showing how to opt in to Nuxt 4's
breaking changes already
video-id: r4wFKlcJK6c

---

::

### Opting in to Nuxt 4

First, upgrade Nuxt to the [latest release](https://github.com/nuxt/nuxt/releases){rel="&#x22;nofollow&#x22;"}.

Then you can set your `compatibilityVersion` to match Nuxt 4 behavior:

::note
For now, you need to define the compatibility version in each layer that opts into Nuxt 4 behavior. This will not be required after Nuxt 4 is released.
::

When you set your `compatibilityVersion` to `4`, defaults throughout your Nuxt configuration will change to opt in to Nuxt v4 behavior, but you can granularly re-enable Nuxt v3 behavior when testing, following the commented out lines above. Please file issues if so, so that we can address them in Nuxt or in the ecosystem.

Breaking or significant changes will be noted here along with migration steps for backward/forward compatibility.

::note
This section is subject to change until the final release, so please check back here regularly if you are testing Nuxt 4 using `compatibilityVersion: 4`.
::

### Migrating Using Codemods

To facilitate the upgrade process, we have collaborated with the [Codemod](https://github.com/codemod-com/codemod){rel="&#x22;nofollow&#x22;"} team to automate many migration steps with some open-source codemods.

::note
If you encounter any issues, please report them to the Codemod team with `npx codemod feedback` 🙏
::

For a complete list of Nuxt 4 codemods, detailed information on each, their source, and various ways to run them, visit the [Codemod Registry](https://go.codemod.com/codemod-registry){rel="&#x22;nofollow&#x22;"}.

You can run all the codemods mentioned in this guide using the following `codemod` recipe:

::code-group

````bash [npm]

**Examples:**

Example 1 (unknown):
```unknown

````

Example 2 (unknown):

```unknown

```

Example 3 (unknown):

```unknown

```

Example 4 (unknown):

```unknown
::

### Nightly Release Channel

To use the latest Nuxt build and test features before their release, read about the [nightly release channel](https://nuxt.com/docs/3.x/guide/going-further/nightly-release-channel) guide.

::warning
The nightly release channel `latest` tag is currently tracking the Nuxt v4 branch, meaning that it is particularly likely to have breaking changes right now — be careful! You can opt in to the 3.x branch nightly releases with `"nuxt": "npm:nuxt-nightly@3x"`.
::

## Testing Nuxt 4

Nuxt 4 is **scheduled for release in Q2 2025**. It will include all the features currently available through `compatibilityVersion: 4`.

Until the release, it is possible to test many of Nuxt 4's breaking changes from Nuxt version 3.12+.

::video-accordion
---
title: Watch a video from Alexander Lichter showing how to opt in to Nuxt 4's
  breaking changes already
video-id: r4wFKlcJK6c
---
::

### Opting in to Nuxt 4

First, upgrade Nuxt to the [latest release](https://github.com/nuxt/nuxt/releases){rel="&#x22;nofollow&#x22;"}.

Then you can set your `compatibilityVersion` to match Nuxt 4 behavior:

::code-collapse
```

---
