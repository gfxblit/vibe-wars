import * as THREE from 'three'
import './style.css'
import { initGame, state, update } from './state'
import { initRenderer } from './renderer'
import { setupInput } from './input'
import { PlayerShip } from './entities/PlayerShip'
import { Crosshair } from './entities/Crosshair'

console.log('Vibe Wars starting...')

const { scene, camera, renderer } = initRenderer()
initGame()
setupInput()

const playerShip = new PlayerShip()
scene.add(playerShip.mesh)

const crosshair = new Crosshair()
scene.add(crosshair.mesh)

// Add some stars for a sense of movement
const starCount = 5000;
const starGeometry = new THREE.BufferGeometry();
const starVertices = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  starVertices[i * 3] = (Math.random() - 0.5) * 2000;
  starVertices[i * 3 + 1] = (Math.random() - 0.5) * 2000;
  starVertices[i * 3 + 2] = (Math.random() - 0.5) * 5000;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

let lastTime = performance.now();

function animate(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (dt > 0 && dt < 0.1) {
    update(dt);
    
    // Sync player ship
    playerShip.mesh.position.copy(state.playerPos);
    playerShip.mesh.rotation.copy(state.playerRot);
    
    // Sync crosshair
    crosshair.mesh.position.copy(state.crosshairPos);
    
    // Camera follows player (first person view)
    // Position camera at player position (cockpit)
    camera.position.x = state.playerPos.x;
    camera.position.y = state.playerPos.y + 0.5; // Slightly up from nose
    camera.position.z = state.playerPos.z + 1;   // Slightly back from nose tip
    camera.lookAt(state.crosshairPos);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
