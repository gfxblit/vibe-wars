/**
 * @vitest-environment happy-dom
 */
import { describe, it, vi, expect, beforeEach, MockInstance } from 'vitest';
import * as renderer from './renderer';
import * as state from './state';
import * as inputModule from './input';
import * as THREE from 'three';

// Mock the console.log to prevent test output from cluttering the console
const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

vi.mock('three', async () => {
  const actual = await vi.importActual('three') as any;
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
      clear: vi.fn(),
      getPixelRatio: vi.fn().mockReturnValue(1),
      getSize: vi.fn().mockImplementation((target: THREE.Vector2) => target.set(1024, 768)),
      domElement: document.createElement('canvas'),
    })),
  };
});

vi.mock('three/examples/jsm/postprocessing/EffectComposer.js', () => ({
  EffectComposer: vi.fn().mockImplementation(() => ({
    addPass: vi.fn(),
    render: vi.fn(),
    setSize: vi.fn(),
    passes: [],
  })),
}));

vi.mock('three/examples/jsm/postprocessing/RenderPass.js', () => ({
  RenderPass: vi.fn().mockImplementation(() => ({})),
}));

vi.mock('three/examples/jsm/postprocessing/UnrealBloomPass.js', () => ({
  UnrealBloomPass: vi.fn().mockImplementation(() => ({})),
}));

vi.mock('three/examples/jsm/postprocessing/OutputPass.js', () => ({
  OutputPass: vi.fn().mockImplementation(() => ({})),
}));

describe('main.ts initialization', () => {
  let initRendererSpy: MockInstance<[], ReturnType<typeof renderer.initRenderer>>;
  let initGameSpy: MockInstance<[THREE.Scene, THREE.Scene], ReturnType<typeof state.initGame>>;
  let setupInputSpy: MockInstance;

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    // Spy on the functions that main.ts is expected to call
    initRendererSpy = vi.spyOn(renderer, 'initRenderer');
    initGameSpy = vi.spyOn(state, 'initGame');
    setupInputSpy = vi.spyOn(inputModule.InputManager.prototype, 'setup');
  });

  it('should call initRenderer, initGame, and InputManager.setup on startup', async () => {
    // Dynamically import main.ts to ensure its side effects (the calls) run during the test
    await import('./main');

    expect(initRendererSpy).toHaveBeenCalledTimes(1);
    expect(initGameSpy).toHaveBeenCalledTimes(1);
    expect(setupInputSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Vibe Wars starting...');

    // Check if HUD is created
    const hud = document.getElementById('hud');
    expect(hud).not.toBeNull();
  });
});
