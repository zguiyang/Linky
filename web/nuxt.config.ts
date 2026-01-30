// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3333',
      apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || '/api',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Linky'
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  icon: {
    serverBundle: {
      collections: ['lucide', 'heroicons']
    }
  },
  pinia: {
    storesDirs: ['app/stores/**']
  }
})
