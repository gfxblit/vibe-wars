import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [{
    name: 'strict-csp',
    transformIndexHtml(html) {
      if (command === 'build') {
        return html.replace(
          /<meta\s+http-equiv=["']Content-Security-Policy["'][\s\S]*?>/i,
          `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self';">`
        );
      }
      return html;
    },
  }],
  base: './',
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'happy-dom',
  },
}));
