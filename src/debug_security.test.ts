import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { state, initGame } from './state';
import * as THREE from 'three';
import * as environment from './environment';

// Mock the environment module
vi.mock('./environment', () => ({
  isDev: vi.fn(),
}));

describe('Debug Security', () => {
  const mockScene = new THREE.Scene();
  const mockHudScene = new THREE.Scene();

  // Store original window.location
  const originalLocation = window.location;

  beforeEach(() => {
    // Reset state before each test
    state.debug = false;

    // Reset mocks
    vi.resetAllMocks();

    // Mock window.location
    // Use delete to remove the existing property if it's configurable
    // happy-dom usually allows this
    delete (window as any).location;
    (window as any).location = {
      search: '',
      pathname: '/',
      assign: vi.fn(),
      reload: vi.fn(),
      href: 'http://localhost/',
      origin: 'http://localhost',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      hash: ''
    };
  });

  afterEach(() => {
    // Restore window.location
    (window as any).location = originalLocation;
  });

  test('Debug mode is ENABLED in DEV environment with ?debug=true', () => {
    // Setup DEV environment
    vi.mocked(environment.isDev).mockReturnValue(true);

    // Setup URL
    (window.location as any).search = '?debug=true';
    (window.location as any).pathname = '/';

    initGame(mockScene, mockHudScene);

    expect(state.debug).toBe(true);
  });

  test('Debug mode is DISABLED in PROD environment with ?debug=true', () => {
    // Setup PROD environment
    vi.mocked(environment.isDev).mockReturnValue(false);

    // Setup URL
    (window.location as any).search = '?debug=true';
    (window.location as any).pathname = '/';

    initGame(mockScene, mockHudScene);

    expect(state.debug).toBe(false);
  });

  test('Debug mode is ENABLED in PROD environment on PR preview with ?debug=true', () => {
    // Setup PROD environment
    vi.mocked(environment.isDev).mockReturnValue(false);

    // Setup URL with PR path
    (window.location as any).search = '?debug=true';
    (window.location as any).pathname = '/pr-123/';

    initGame(mockScene, mockHudScene);

    expect(state.debug).toBe(true);
  });

  test('Debug mode is DISABLED if ?debug=true is missing', () => {
    // Setup DEV environment
    vi.mocked(environment.isDev).mockReturnValue(true);

    // Setup URL without debug param
    (window.location as any).search = '';
    (window.location as any).pathname = '/';

    initGame(mockScene, mockHudScene);

    expect(state.debug).toBe(false);
  });

  test('Debug mode is DISABLED if ?debug=false even in DEV', () => {
    // Setup DEV environment
    vi.mocked(environment.isDev).mockReturnValue(true);

    // Setup URL
    (window.location as any).search = '?debug=false';
    (window.location as any).pathname = '/';

    initGame(mockScene, mockHudScene);

    expect(state.debug).toBe(false);
  });
});
