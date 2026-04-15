import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ['src/**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  preview: {
    port: 3000,
    host: true,
  },
  server: {
    port: 5173,
  }
});