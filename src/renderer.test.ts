/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';
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

describe('Renderer', () => {
  it('initRenderer sets up camera with correct far clip plane', () => {
    // Mocking document.body.appendChild as it's used in initRenderer
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => { return {} as any });
    
    const { camera } = initRenderer();
    
    expect(camera.far).toBe(5000);
    
    appendSpy.mockRestore();
  });
});
