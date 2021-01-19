import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/status': 'http://localhost',
      '/text': 'http://localhost'
    }
  }
})
