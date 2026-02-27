import { describe, it, expect } from 'vitest';
import config from '../vite.config';

describe('Vite Configuration', () => {
  it('allows external hosts in server configuration', async () => {
    let resolvedConfig = config;
    if (typeof config === 'function') {
      resolvedConfig = await (config as any)({ command: 'serve', mode: 'development' });
    }

    // We expect the server configuration to exist and allowedHosts to be true
    // Casting to any because the type definition might not explicitly include allowedHosts 
    // depending on the Vite version, but it is a valid config option.
    const serverConfig = (resolvedConfig as any).server;
    expect(serverConfig).toBeDefined();
    expect(serverConfig.allowedHosts).toBe(true);
  });
});
