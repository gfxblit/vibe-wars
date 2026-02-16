## 2024-05-23 - Unprotected Debug Mode
**Vulnerability:** Debug mode was accessible in production via `?debug=true` URL parameter.
**Learning:** Client-side debug flags should be stripped or gated by build environment variables (`import.meta.env.DEV`), not just URL parameters.
**Prevention:** Use `import.meta.env.DEV` combined with specific path checks (e.g. `/pr-`) to safely enable debug features in non-production environments.
