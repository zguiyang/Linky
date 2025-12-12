// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@nuxt/ui'],
  components: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  devServer: { port: 13090 },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss() as any],
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  icon: {
    serverBundle: {
      collections: ['lucide', 'heroicons'],
    },
  },
  runtimeConfig: {
    database: {
      url: process.env.NUXT_DATABASE_URI,
    },
    auth: {
      secret: process.env.NUXT_AUTH_SECRET,
      clientUrl: process.env.NUXT_BETTER_AUTH_CLIENT_URL,
      providers: {
        github: {
          clientId: process.env.NUXT_GITHUB_CLIENT_ID,
          clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
        },
        google: {
          clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
          clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
        },
      },
    },
    redis: {
      host: process.env.NUXT_REDIS_HOST,
      port: process.env.NUXT_REDIS_PORT,
      password: process.env.NUXT_REDIS_PASSWORD,
      db: process.env.NUXT_REDIS_DB,
    },
    public: {},
  },
});
