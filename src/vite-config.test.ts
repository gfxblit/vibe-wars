import { describe, it, expect } from 'vitest';
import config from '../vite.config';

describe('Vite Configuration', () => {
  it('does not bypass host header validation (secure default)', () => {
    // We expect the server configuration to not override allowedHosts
    const serverConfig = (config as any).server;
    expect(serverConfig).toBeDefined();
    expect(serverConfig.allowedHosts).toBeUndefined();
  });
});
