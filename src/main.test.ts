/**
 * @vitest-environment happy-dom
 */
import { describe, it, vi, expect, beforeEach, MockInstance } from 'vitest';
import * as renderer from './renderer';
import * as state from './state';
import * as inputModule from './input';

import { init } from './main';

// Mock the console.log to prevent test output from cluttering the console
const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

vi.mock('three', async () => {
  const actual = await vi.importActual('three') as any;
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('main.ts initialization', () => {
  let initRendererSpy: MockInstance<[], ReturnType<typeof renderer.initRenderer>>;
  let initGameSpy: MockInstance<[], ReturnType<typeof state.initGame>>;
  let setupInputSpy: MockInstance;

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    
    // Setup DOM
    document.body.innerHTML = `
      <div id="overlay">CLICK TO START</div>
      <div id="cursor"></div>
    `;

    // Spy on the functions that main.ts is expected to call
    initRendererSpy = vi.spyOn(renderer, 'initRenderer');
    initGameSpy = vi.spyOn(state, 'initGame');
    setupInputSpy = vi.spyOn(inputModule.InputManager.prototype, 'setup');

    // Mock requestAnimationFrame to NOT recurse automatically in tests unless we want it to.
    vi.stubGlobal('requestAnimationFrame', vi.fn());
  });

  it('should call initRenderer, initGame, and InputManager.setup on startup', async () => {
    init();

    expect(initRendererSpy).toHaveBeenCalledTimes(1);
    expect(initGameSpy).toHaveBeenCalledTimes(1);
    expect(setupInputSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Vibe Wars starting...');

    // Check if HUD is created
    const hud = document.getElementById('hud');
    expect(hud).not.toBeNull();
  });

  it('should have a click-to-start overlay', async () => {
    init();
    const overlay = document.getElementById('overlay');
    expect(overlay).not.toBeNull();
    expect(overlay?.textContent).toContain('CLICK TO START');
  });

  it('should hide overlay and show cursor when locked', async () => {
    // Mock locked state
    Object.defineProperty(document, 'pointerLockElement', {
        value: document.body,
        configurable: true
    });

    // RAF mock that can be manually triggered
    const callbacks: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => {
        callbacks.push(cb);
        return 0;
    }));

    init();

    // Trigger frames until we reach 'animate'
    // 1st RAF: (time) => { lastTime = time; RAF(animate); }
    // 2nd RAF: animate
    
    // Run exactly 2 frames to ensure animate() executes at least once
    if (callbacks.length > 0) callbacks.shift()!(performance.now());
    if (callbacks.length > 0) callbacks.shift()!(performance.now());

    const overlay = document.getElementById('overlay');
    const cursor = document.getElementById('cursor');

    expect(overlay?.style.display).toBe('none');
    expect(cursor?.style.display).toBe('block');
  });

  it('should show overlay and hide cursor when not locked', async () => {
    // Mock unlocked state
    Object.defineProperty(document, 'pointerLockElement', {
        value: null,
        configurable: true
    });

    const callbacks: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => {
        callbacks.push(cb);
        return 0;
    }));

    init();

    // Run exactly 2 frames
    if (callbacks.length > 0) callbacks.shift()!(performance.now());
    if (callbacks.length > 0) callbacks.shift()!(performance.now());

    const overlay = document.getElementById('overlay');
    const cursor = document.getElementById('cursor');

    expect(overlay?.style.display).toBe('flex');
    expect(cursor?.style.display).toBe('none');
  });
});
