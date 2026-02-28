import { defineConfig } from 'vite';

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
      {
        name: 'strict-csp',
        transformIndexHtml(html) {
          if (command === 'build') {
            const strictCSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws: wss:; object-src 'none'; base-uri 'self';";
            const withoutOldCSP = html.replace(/<meta[^>]+http-equiv=['"]Content-Security-Policy['"][^>]*>/gi, '');
            return withoutOldCSP.replace(
              /<head>/i,
              `<head>\n    <meta http-equiv="Content-Security-Policy" content="${strictCSP}">`
            );
          }
          return html;
        }
      }
    ]
  };
});
