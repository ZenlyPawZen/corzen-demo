import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'corzen-demo.js',
        chunkFileNames: 'corzen-demo-[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
