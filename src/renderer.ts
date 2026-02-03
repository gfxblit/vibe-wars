/**
 * STUB: This renderer implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { state } from './state';
import { Player } from './entities/Player';
import { GameConfig } from './config';

export function attachCameraToPlayer(camera: THREE.Camera, player: Player) {
  player.mesh.add(camera);
  camera.position.set(
    GameConfig.camera.position.x,
    GameConfig.camera.position.y,
    GameConfig.camera.position.z
  );
  camera.lookAt(
    GameConfig.camera.lookAt.x,
    GameConfig.camera.lookAt.y,
    GameConfig.camera.lookAt.z
  ); // Look at player center in local space
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
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(state.viewport.width, state.viewport.height);
  document.body.appendChild(renderer.domElement);

  // Handle window resize
  const handleResize = () => {
    state.viewport.width = window.innerWidth;
    state.viewport.height = window.innerHeight;
    state.viewport.centerX = state.viewport.width / 2;
    state.viewport.centerY = state.viewport.height / 2;

    camera.aspect = state.viewport.width / state.viewport.height;
    camera.updateProjectionMatrix();
    renderer.setSize(state.viewport.width, state.viewport.height);
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
  return { scene, camera, renderer, cleanup };
}

export function render(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) {
  renderer.render(scene, camera);
}
