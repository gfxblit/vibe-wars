import { defineConfig, Plugin } from 'vite';

export default defineConfig(({ command }) => {
  const plugins: Plugin[] = [];

  if (command === 'build') {
    plugins.push({
      name: 'security-headers',
      transformIndexHtml(html) {
        // Strict CSP: Removes 'unsafe-eval'/'unsafe-inline' and 'ws:'/'wss:'
        const strictCsp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self';";

        // Remove any existing CSP meta tag to avoid duplication/conflicts
        const cspRegex = /<meta\s+[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i;
        const cleanedHtml = html.replace(cspRegex, '');

        // Return the cleaned HTML and inject the strict CSP meta tag
        return {
          html: cleanedHtml,
          tags: [
            {
              tag: 'meta',
              attrs: {
                'http-equiv': 'Content-Security-Policy',
                content: strictCsp,
              },
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    });
  }

  return {
    base: './',
    plugins,
    server: {
      allowedHosts: true,
    },
    test: {
      environment: 'happy-dom',
    },
  };
});
