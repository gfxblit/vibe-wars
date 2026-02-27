/**
 * @vitest-environment happy-dom
 */
import { expect, test, describe, vi, beforeEach } from 'vitest'
import * as THREE from 'three'
import { attachCameraToPlayer, initRenderer, render } from './renderer'
import { state } from './state'
import { Player } from './entities/Player'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

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

describe('Renderer Utils', () => {
  beforeEach(() => {
    state.debugBloomThreshold = undefined;
    state.debugBloomStrength = undefined;
    state.debugBloomRadius = undefined;
    vi.clearAllMocks();
  });

  test('attachCameraToPlayer should add camera as child of player mesh with correct offset', () => {
    const camera = new THREE.PerspectiveCamera();
    const player = new Player();
    
    attachCameraToPlayer(camera, player);
    
    expect(camera.parent).toBe(player.mesh);
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(0.5);
    expect(camera.position.z).toBe(0);
    
    // Check orientation (looking forward)
    const forward = new THREE.Vector3(0, 0, -1);
    const cameraDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    expect(cameraDir.dot(forward)).toBeGreaterThan(0.9);
  })

  test('initRenderer should return scene, camera, renderer, composer and a cleanup function', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { scene, camera, renderer, composer, cleanup } = initRenderer();
    
    expect(scene).toBeInstanceOf(THREE.Scene);
    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
    expect(renderer).toBeDefined();
    expect(composer).toBeDefined();
    expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    expect(cleanup).toBeTypeOf('function');

    const disposeSpy = vi.spyOn(renderer, 'dispose');
    cleanup();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(disposeSpy).toHaveBeenCalled();
    expect(document.body.contains(renderer.domElement)).toBe(false);
  })

  test('initRenderer resize handler should update camera, renderer and composer', () => {
    const { camera, renderer, composer, cleanup } = initRenderer();
    const setSizeSpy = vi.spyOn(renderer, 'setSize');
    const composerSetSizeSpy = vi.spyOn(composer, 'setSize');
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
    expect(composerSetSizeSpy).toHaveBeenCalledWith(1024, 768);

    cleanup();
  })

  test('initRenderer should use bloom settings from state if available', () => {
    state.debugBloomThreshold = 0.5;
    state.debugBloomStrength = 2.5;
    state.debugBloomRadius = 0.8;
    
    const { cleanup } = initRenderer();
    
    expect(UnrealBloomPass).toHaveBeenCalledWith(
      expect.any(THREE.Vector2),
      2.5,
      0.8,
      0.5
    );
    cleanup();
  });

  test('render should call composer.render', () => {
    const { composer } = initRenderer();
    const composerRenderSpy = vi.spyOn(composer, 'render');
    
    render(composer as any);
    
    expect(composerRenderSpy).toHaveBeenCalled();
  })

  test('render should update bloom pass properties when state changes', () => {
    const { composer } = initRenderer();
    
    // Simulate UnrealBloomPass being in composer.passes
    const bloomPass = {
      strength: 0,
      radius: 0,
      threshold: 0
    };
    // We need to make it an instance of UnrealBloomPass for the find to work
    Object.setPrototypeOf(bloomPass, UnrealBloomPass.prototype);
    (composer.passes as any[]).push(bloomPass);

    // Update state
    state.debugBloomStrength = 2.5;
    state.debugBloomRadius = 0.8;
    state.debugBloomThreshold = 0.5;

    // Call render
    render(composer as any);

    // Verify properties are updated
    expect(bloomPass.strength).toBe(2.5);
    expect(bloomPass.radius).toBe(0.8);
    expect(bloomPass.threshold).toBe(0.5);
  });
})
