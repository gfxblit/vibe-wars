/**
 * @vitest-environment happy-dom
 */
import { describe, it, vi, expect, beforeEach, MockInstance } from 'vitest';
import * as renderer from './renderer';
import * as state from './state';
import * as inputModule from './input';

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
  let setupInputSpy: MockInstance<[], ReturnType<typeof inputModule.setupInput>>;

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
    // Spy on the functions that main.ts is expected to call
    initRendererSpy = vi.spyOn(renderer, 'initRenderer');
    initGameSpy = vi.spyOn(state, 'initGame');
    setupInputSpy = vi.spyOn(inputModule, 'setupInput');
  });

  it('should call initRenderer, initGame, and setupInput on startup', async () => {
    // Dynamically import main.ts to ensure its side effects (the calls) run during the test
    await import('./main');

    expect(initRendererSpy).toHaveBeenCalledTimes(1);
    expect(initGameSpy).toHaveBeenCalledTimes(1);
    // STUB: This is a placeholder for input setup, which will be integrated later.
    // We expect it to be called once to ensure the infrastructure is bootstrapped.
    expect(setupInputSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Vibe Wars starting...');
  });
});
