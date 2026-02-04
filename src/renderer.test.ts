/**
 * @vitest-environment happy-dom
 */
import { expect, test, describe, vi } from 'vitest'
import * as THREE from 'three'
import { attachCameraToPlayer, initRenderer } from './renderer'
import { state } from './state'
import { Player } from './entities/Player'

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
  test('attachCameraToPlayer should add camera as child of player mesh with correct offset', () => {
    const camera = new THREE.PerspectiveCamera();
    const player = new Player();
    
    attachCameraToPlayer(camera, player);
    
    expect(camera.parent).toBe(player.mesh);
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(0);
    expect(camera.position.z).toBe(0);
    
    // Check orientation (looking at target defined in config, relative to camera pos)
    // Camera at 0,0,0 looking at 0,0,-1
    const target = new THREE.Vector3(0, 0, -1);
    const cameraDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const toTarget = new THREE.Vector3().subVectors(target, camera.position).normalize();
    expect(cameraDir.dot(toTarget)).toBeGreaterThan(0.9);
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
