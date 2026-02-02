/**
 * @vitest-environment happy-dom
 */
import { expect, test, describe, vi } from 'vitest'
import * as THREE from 'three'
import { updateCamera, initRenderer } from './renderer'

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

describe('Renderer Utils', () => {
  test('updateCamera should position camera behind player', () => {
    const camera = new THREE.PerspectiveCamera();
    const playerPosition = new THREE.Vector3(0, 0, -100);
    
    updateCamera(camera, playerPosition);
    
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(2);
    expect(camera.position.z).toBe(-90); // -100 + 10
  })

  test('initRenderer should return scene, camera, renderer and a cleanup function', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { scene, camera, renderer, cleanup } = initRenderer();
    
    expect(scene).toBeInstanceOf(THREE.Scene);
    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
    expect(renderer).toBeDefined();
    expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    expect(cleanup).toBeTypeOf('function');

    cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    // Clean up DOM
    if (document.body.contains(renderer.domElement)) {
      document.body.removeChild(renderer.domElement);
    }
  })

  test('initRenderer resize handler should update camera and renderer', () => {
    const { camera, renderer } = initRenderer();
    const setSizeSpy = vi.spyOn(renderer, 'setSize');
    const updateProjectionMatrixSpy = vi.spyOn(camera, 'updateProjectionMatrix');

    // Simulate resize
    window.innerWidth = 1024;
    window.innerHeight = 768;
    window.dispatchEvent(new Event('resize'));

    expect(camera.aspect).toBe(1024 / 768);
    expect(updateProjectionMatrixSpy).toHaveBeenCalled();
    expect(setSizeSpy).toHaveBeenCalledWith(1024, 768);

    // Clean up DOM
    if (document.body.contains(renderer.domElement)) {
      document.body.removeChild(renderer.domElement);
    }
  })
})
