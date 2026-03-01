import { defineConfig, HtmlTagDescriptor } from 'vite';

const strictCsp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self';";

export default defineConfig(({ command }) => {
  return {
    base: './',
    server: {
      allowedHosts: true,
    },
    test: {
      environment: 'happy-dom',
    },
    plugins: [
      command === 'build' ? {
        name: 'inject-strict-csp',
        enforce: 'pre',
        transformIndexHtml(html) {
          // Remove any existing CSP tags
          const cleanHtml = html.replace(/<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '');

          const cspTag: HtmlTagDescriptor = {
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content: strictCsp
            },
            injectTo: 'head-prepend'
          };

          return {
            html: cleanHtml,
            tags: [cspTag]
          };
        }
      } : undefined
    ]
  };
});
