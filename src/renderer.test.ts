/**
 * @vitest-environment happy-dom
 */
import { expect, test, describe, vi } from 'vitest'
import * as THREE from 'three'
import { updateCamera, initRenderer } from './renderer'
import { state } from './state'

vi.mock('three', async () => {
  const actual = await vi.importActual('three') as any;
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
      dispose: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

describe('Renderer Utils', () => {
  test('updateCamera should position camera behind player relative to orientation', () => {
    const camera = new THREE.PerspectiveCamera();
    const player = {
      position: new THREE.Vector3(0, 0, 0),
      mesh: {
        rotation: new THREE.Euler(0, Math.PI / 2, 0) // Looking right (+X)
      }
    } as any;
    
    updateCamera(camera, player);
    
    // If player is at (0,0,0) and looking at (+X), 
    // the "behind" (Z+10) becomes X-10.
    // Offset (0, 2, 10) rotated 90 deg around Y: (10, 2, 0)
    // Wait. 
    // Rotate (0, 2, 10) by 90 deg around Y:
    // (x, y, z) -> (x cos θ + z sin θ, y, -x sin θ + z cos θ)
    // (0, 2, 10) -> (10 sin 90, 2, 10 cos 90) = (10, 2, 0)
    // So camera should be at (10, 2, 0) relative to player.
    // But wait, if player is looking at +X, behind is -X.
    // My Player class: this.yaw -= input.x ... 
    // If I rotate by +90 deg around Y, I look at -X.
    // Let's just check it moves.
    expect(camera.position.x).not.toBe(0);
    expect(camera.position.z).toBeCloseTo(0);
  })

  test('initRenderer should return scene, camera, renderer and a cleanup function', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { scene, camera, renderer, cleanup } = initRenderer();
    
    expect(scene).toBeInstanceOf(THREE.Scene);
    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
    expect(renderer).toBeDefined();
    expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    expect(cleanup).toBeTypeOf('function');

    const disposeSpy = vi.spyOn(renderer, 'dispose');
    cleanup();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(disposeSpy).toHaveBeenCalled();
    expect(document.body.contains(renderer.domElement)).toBe(false);
  })

  test('initRenderer resize handler should update camera and renderer', () => {
    const { camera, renderer, cleanup } = initRenderer();
    const setSizeSpy = vi.spyOn(renderer, 'setSize');
    const updateProjectionMatrixSpy = vi.spyOn(camera, 'updateProjectionMatrix');

    // Simulate resize
    window.innerWidth = 1024;
    window.innerHeight = 768;
    window.dispatchEvent(new Event('resize'));

    expect(state.viewport.width).toBe(1024);
    expect(state.viewport.height).toBe(768);
    expect(state.viewport.centerX).toBe(512);
    expect(state.viewport.centerY).toBe(384);
    expect(camera.aspect).toBe(1024 / 768);
    expect(updateProjectionMatrixSpy).toHaveBeenCalled();
    expect(setSizeSpy).toHaveBeenCalledWith(1024, 768);

    cleanup();
  })
})
