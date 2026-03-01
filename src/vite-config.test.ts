import { describe, it, expect } from 'vitest';
import configFactory from '../vite.config';

describe('Vite Configuration', () => {
  it('allows external hosts in server configuration', () => {
    // Determine the configuration using the factory function
    const config = typeof configFactory === 'function' ? configFactory({ command: 'serve', mode: 'development' }) : configFactory;

    // We expect the server configuration to exist and allowedHosts to be true
    const serverConfig = (config as any).server;
    expect(serverConfig).toBeDefined();
    expect(serverConfig.allowedHosts).toBe(true);
  });
});
