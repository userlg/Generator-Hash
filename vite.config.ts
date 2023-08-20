//import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [vue()],
})
