/**
 * STUB: This renderer implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { state } from './state';
import { Player } from './entities/Player';
import { GameConfig } from './config';

export function attachCameraToPlayer(camera: THREE.Camera, player: Player) {
  player.mesh.add(camera);
  const { position, lookAt } = GameConfig.camera;
  camera.position.set(position.x, position.y, position.z);
  camera.lookAt(lookAt.x, lookAt.y, lookAt.z); // Look at player center in local space
}

export function initRenderer() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(GameConfig.camera.backgroundColor);

  const camera = new THREE.PerspectiveCamera(
    GameConfig.camera.fov,
    state.viewport.width / state.viewport.height,
    GameConfig.camera.near,
    GameConfig.camera.far
  );

  // 2D HUD Setup (Accelerated via GPU)
  const hudScene = new THREE.Scene();
  const hudCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(state.viewport.width, state.viewport.height);
  renderer.autoClear = false; // Allow manual clearing for compositing
  document.body.appendChild(renderer.domElement);

  // Post-processing setup
  const renderTarget = new THREE.WebGLRenderTarget(state.viewport.width, state.viewport.height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
  });
  const composer = new EffectComposer(renderer, renderTarget);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const hudRenderPass = new RenderPass(hudScene, hudCamera);
  hudRenderPass.clear = false; // Don't clear main scene
  composer.addPass(hudRenderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(state.viewport.width, state.viewport.height),
    state.debugBloomStrength ?? GameConfig.bloom.strength,
    state.debugBloomRadius ?? GameConfig.bloom.radius,
    state.debugBloomThreshold ?? GameConfig.bloom.threshold
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // Handle window resize
  const handleResize = () => {
    state.viewport.width = window.innerWidth;
    state.viewport.height = window.innerHeight;
    state.viewport.centerX = state.viewport.width / 2;
    state.viewport.centerY = state.viewport.height / 2;

    camera.aspect = state.viewport.width / state.viewport.height;
    camera.updateProjectionMatrix();
    renderer.setSize(state.viewport.width, state.viewport.height);
    composer.setSize(state.viewport.width, state.viewport.height);
  };
  window.addEventListener('resize', handleResize);

  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
    if (document.body.contains(renderer.domElement)) {
      document.body.removeChild(renderer.domElement);
    }
    renderer.dispose();
  };

  console.log('Renderer initialized');
  return { scene, camera, hudScene, hudCamera, renderer, composer, cleanup };
}

export function render(
  composer: EffectComposer,
  _scene?: THREE.Scene,
  _camera?: THREE.Camera,
  _hudScene?: THREE.Scene,
  _hudCamera?: THREE.Camera
) {
  composer.render();
}