import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // split heavy vendors into their own long-cache chunks (motion is the big one)
        manualChunks: {
          motion: ['framer-motion'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
