import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  build: {
    chunkSizeWarningLimit: 5000
  },
  plugins: [vue()],
})
