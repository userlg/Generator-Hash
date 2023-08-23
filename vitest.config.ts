import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    test: {
        globals: true,
        environment: 'happy-dom',
        root: 'tests',
    },
    plugins: [vue()],
})