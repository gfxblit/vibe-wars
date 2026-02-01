import * as THREE from 'three'
import './style.css'
import { initGame, state, update } from './state'
import { initRenderer } from './renderer'
import { setupInput } from './input'
import { PlayerShip } from './entities/PlayerShip'
import { Crosshair } from './entities/Crosshair'

// Constants
const STAR_COUNT = 5000;
const STAR_POSITION_RANGE = 2000;
const STAR_DEPTH_RANGE = 5000;
const STAR_SIZE = 0.7;
const MAX_DELTA_TIME = 0.1;
const CAMERA_VERTICAL_OFFSET = 0.5;
const CAMERA_DEPTH_OFFSET = 1;

console.log('Vibe Wars starting...')

const { scene, camera, renderer } = initRenderer()
initGame()
setupInput()

const playerShip = new PlayerShip()
scene.add(playerShip.mesh)

const crosshair = new Crosshair()
scene.add(crosshair.mesh)

// Add some stars for a sense of movement
const starGeometry = new THREE.BufferGeometry();
const starVertices = new Float32Array(STAR_COUNT * 3);
for (let i = 0; i < STAR_COUNT; i++) {
  starVertices[i * 3] = (Math.random() - 0.5) * STAR_POSITION_RANGE;
  starVertices[i * 3 + 1] = (Math.random() - 0.5) * STAR_POSITION_RANGE;
  starVertices[i * 3 + 2] = (Math.random() - 0.5) * STAR_DEPTH_RANGE;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: STAR_SIZE });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

let lastTime = performance.now();

function animate(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (dt > 0 && dt < MAX_DELTA_TIME) {
    update(dt);
    
    // Sync player ship
    playerShip.mesh.position.copy(state.playerPos);
    playerShip.mesh.rotation.copy(state.playerRot);
    
    // Sync crosshair
    crosshair.mesh.position.copy(state.crosshairPos);
    
    // Camera follows player (first person view)
    // Position camera at player position (cockpit)
    camera.position.x = state.playerPos.x;
    camera.position.y = state.playerPos.y + CAMERA_VERTICAL_OFFSET; // Slightly up from nose
    camera.position.z = state.playerPos.z + CAMERA_DEPTH_OFFSET;   // Slightly back from nose tip
    camera.lookAt(state.crosshairPos);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
