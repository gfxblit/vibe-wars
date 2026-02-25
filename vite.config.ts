import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    // allowedHosts: true, // Removed to restore secure default behavior (Host header validation)
  },
  test: {
    environment: 'happy-dom',
  },
});
