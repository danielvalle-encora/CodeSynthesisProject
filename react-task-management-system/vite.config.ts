import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5174,
    proxy: {
      '/auth': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      },
      '/task': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/task/, '')
      }
    }
  }
})