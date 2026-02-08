import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  preview: {
    allowedHosts: [
      'tapay-insurance-demo-production.up.railway.app',
      '.railway.app'
    ]
  }
})
