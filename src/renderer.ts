/**
 * STUB: This renderer implementation is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import * as THREE from 'three';
import { GameState, state } from './state';

export function updateCamera(camera: THREE.Camera, playerPosition: THREE.Vector3) {
  camera.position.set(playerPosition.x, playerPosition.y + 2, playerPosition.z + 10);
  camera.lookAt(playerPosition);
}

export function initRenderer() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Black background for retro aesthetic
  
  const camera = new THREE.PerspectiveCamera(75, state.viewport.width / state.viewport.height, 0.1, 1000);
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
  camera: THREE.PerspectiveCamera, 
  state: GameState
) {
  if (state.player) {
    updateCamera(camera, state.player.position);
  }
  renderer.render(scene, camera);
}
