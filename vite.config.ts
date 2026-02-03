import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'happy-dom',
  },
});
