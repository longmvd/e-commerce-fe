import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/apis': path.resolve(__dirname, './src/apis'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/enums': path.resolve(__dirname, './src/enums'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
