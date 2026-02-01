/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';
import { Entity } from './entities/Entity';
import { setupInput } from './input';
import { initRenderer } from './renderer';

vi.mock('three', async () => {
  const actual = await vi.importActual('three') as any;
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      setPixelRatio: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('Stubs', () => {
  it('Entity stub can be instantiated', () => {
    const entity = new Entity();
    expect(entity).toBeDefined();
    expect(entity.mesh).toBeDefined();
  });

  it('setupInput stub can be called', () => {
    // This should not throw
    setupInput();
  });

  it('initRenderer stub can be called', () => {
    // Mocking document.body.appendChild as it's used in initRenderer
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => { return {} as any });
    
    const result = initRenderer();
    
    expect(result).toHaveProperty('scene');
    expect(result).toHaveProperty('camera');
    expect(result).toHaveProperty('renderer');
    
    appendSpy.mockRestore();
  });
});
