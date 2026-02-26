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

describe('Stubs', () => {
  it('Entity stub can be instantiated', () => {
    const entity = new Entity();
    expect(entity).toBeInstanceOf(Entity);
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
