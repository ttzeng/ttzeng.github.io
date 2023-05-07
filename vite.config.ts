import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: './www',
    minify: false,
    emptyOutDir: true,
  },
});
