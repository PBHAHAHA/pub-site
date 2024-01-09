import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.mjs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/<USERNAME>, set base to '/'.

  // If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/, for example your repository is at https://github.com/<USERNAME>/<REPO_NAME>, then set base to '/<REPO_NAME>/'.

  base: '/',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    },
  },
  server: {
    port: '3334',
  },
});
