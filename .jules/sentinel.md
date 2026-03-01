## 2025-03-01 - Strict Production Content Security Policy (CSP)
**Vulnerability:** Permissive CSP directives (`unsafe-inline`, `unsafe-eval`) required for Vite development mode were being shipped to production, weakening protection against Cross-Site Scripting (XSS).
**Learning:** Development-specific security overrides must be removed during the build process. A Vite configuration factory function can inject a strict production CSP only when `command === 'build'`, ensuring secure builds without breaking the local development server.
**Prevention:** Implement conditional logic in `vite.config.ts` using custom plugins to transform `index.html` dynamically based on the current environment (dev vs. prod).
