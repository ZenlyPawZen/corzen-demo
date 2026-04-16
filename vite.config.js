import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'corzen-demo.js',
        chunkFileNames: 'corzen-demo-[name].js',
        assetFileNames: (info) =>
          info.name?.endsWith('.css') ? 'corzen-demo.css' : 'assets/[name]-[hash][extname]',
      },
    },
  },
})
