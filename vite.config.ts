import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'

import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    vue(),
    ui({
      router: 'inertia',
      colorMode: true,
      dts: true,
      autoImport: {
        imports: ['vue', '@vueuse/core'],
        dts: 'inertia/auto-imports.d.ts',
      },
      components: {
        dts: 'inertia/components.d.ts',
      },
      ui: {
        icons: {
          light: 'i-lucide-sun',
          dark: 'i-lucide-moon',
        },
        colors: {
          primary: 'indigo',
          secondary: 'gray',
          warning: 'amber',
          success: 'green',
          error: 'red',
          info: 'blue',
          neutral: 'zinc',
        },
      },
    }),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
