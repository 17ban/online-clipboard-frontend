import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://cb.17ban.icu',
    }
  }
})
