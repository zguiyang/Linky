import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: [],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/`,
    },
  },
})
