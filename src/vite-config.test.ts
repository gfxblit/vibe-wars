import { describe, it, expect } from 'vitest';
import config from '../vite.config';

describe('Vite Configuration', () => {
  it('allows external hosts in server configuration', () => {
    let resolvedConfig = config;
    if (typeof config === 'function') {
        resolvedConfig = (config as any)({ command: 'serve', mode: 'development' });
    }

    const serverConfig = (resolvedConfig as any).server;
    expect(serverConfig).toBeDefined();
    expect(serverConfig.allowedHosts).toBe(true);
  });

  it('includes strict-csp plugin that replaces CSP in build mode', () => {
    let resolvedConfig = config;
    if (typeof config === 'function') {
        resolvedConfig = (config as any)({ command: 'build', mode: 'production' });
    } else {
        throw new Error('Config should be a function');
    }

    const plugins = (resolvedConfig as any).plugins;
    expect(plugins).toBeDefined();

    const cspPlugin = plugins.find((p: any) => p.name === 'strict-csp');
    expect(cspPlugin).toBeDefined();
    expect(cspPlugin.transformIndexHtml).toBeDefined();

    const inputHtml = `
      <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';">
      </head>
    `;

    const outputHtml = cspPlugin.transformIndexHtml(inputHtml);

    expect(outputHtml).toContain("default-src 'self'");
    expect(outputHtml).toContain("script-src 'self'");
    expect(outputHtml).not.toContain("'unsafe-eval'");
    // It should keep unsafe-inline for styles but remove for scripts.
    // My regex replaces the whole tag, so let's verify the whole tag content.
    expect(outputHtml).toContain("style-src 'self' 'unsafe-inline'");
  });

  it('does not replace CSP in serve mode', () => {
    let resolvedConfig = config;
    if (typeof config === 'function') {
        resolvedConfig = (config as any)({ command: 'serve', mode: 'development' });
    } else {
        throw new Error('Config should be a function');
    }

    const plugins = (resolvedConfig as any).plugins;
    const cspPlugin = plugins.find((p: any) => p.name === 'strict-csp');

    const inputHtml = `
      <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';">
      </head>
    `;

    const outputHtml = cspPlugin.transformIndexHtml(inputHtml);

    expect(outputHtml).toBe(inputHtml);
  });
});
