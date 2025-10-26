import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This server section is the crucial part for connecting to your backend
  server: {
    proxy: {
      // Proxies any request starting with /api
      // to your backend server on http://127.0.0.1:5001
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      }
    }
  }
})