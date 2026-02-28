## 2024-05-18 - [Strict CSP for Production Builds]
**Vulnerability:** Permissive Content Security Policy (CSP) allowed `unsafe-eval` and `unsafe-inline` for scripts in the production build.
**Learning:** The development environment (Vite) requires a permissive CSP for HMR and development scripts, but this introduces an XSS risk in production.
**Prevention:** Use a custom Vite plugin during the `build` process to replace the permissive development CSP meta tag with a strict, production-ready CSP tag using the `transformIndexHtml` hook.
