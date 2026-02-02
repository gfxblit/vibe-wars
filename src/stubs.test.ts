/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';
import { Entity } from './entities/Entity';
import { InputManager } from './input';
import { initRenderer } from './renderer';

vi.mock('three', async () => {
  const actual = await vi.importActual('three') as any;
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      dispose: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('Stubs', () => {
  it('Entity stub can be instantiated', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    new Entity();
    expect(consoleSpy).toHaveBeenCalledWith('Entity created');
    consoleSpy.mockRestore();
  });

  it('InputManager can be instantiated and setup', () => {
    const inputManager = new InputManager();
    inputManager.setup();
    expect(inputManager.getInput()).toBeDefined();
    inputManager.teardown();
  });

  it('initRenderer stub can be called', () => {
    // Mocking document.body.appendChild as it's used in initRenderer
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => { return {} as any });
    const consoleSpy = vi.spyOn(console, 'log');
    
    const result = initRenderer();
    expect(result).toHaveProperty('scene');
    expect(result).toHaveProperty('camera');
    expect(result).toHaveProperty('renderer');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Renderer initialized');
    result.cleanup();
    consoleSpy.mockRestore();
  });
});
