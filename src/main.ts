import './style.css'
import { initGame, state, updateState, spawnLasers } from './state'
import { initRenderer, render, attachCameraToPlayer } from './renderer'
import { InputManager } from './input'
import { StarField } from './entities/StarField'
import { GameConfig } from './config'
import { Cursor } from './Cursor'
import { UIManager } from './UIManager'

console.log('Vibe Wars starting...')

const { scene, camera, renderer: webglRenderer } = initRenderer()
initGame()

const uiManager = new UIManager()

const inputManager = new InputManager()
inputManager.setup()

const cursor = new Cursor()

const starField = new StarField()
scene.add(starField.points)

if (state.player) {
  scene.add(state.player.mesh)
  attachCameraToPlayer(camera, state.player)
}

state.tieFighters.forEach(tf => {
  scene.add(tf.mesh)
});

let lastTime = 0
let fireCooldown = 0;

function animate(time: number) {
  // Use a reasonable cap for deltaTime to avoid huge jumps
  const deltaTime = Math.min((time - lastTime) / 1000, GameConfig.core.deltaTimeCap);
  lastTime = time

  inputManager.update(deltaTime)
  const input = inputManager.getInput()
  updateState(deltaTime, input)
  
  cursor.update(input)
  uiManager.update(state)

  // Laser firing logic
  fireCooldown -= deltaTime;
  if (input.isFiring && fireCooldown <= 0) {
    const newLasers = spawnLasers(camera, input);
    newLasers.forEach(laser => scene.add(laser.mesh));
    fireCooldown = GameConfig.laser.cooldown;
  }

  // Update and cleanup lasers
  for (let i = state.lasers.length - 1; i >= 0; i--) {
    const laser = state.lasers[i];
    laser.update(deltaTime);
    if (laser.isExpired()) {
      scene.remove(laser.mesh);
      laser.dispose();
      state.lasers.splice(i, 1);
    }
  }

  if (state.player) {
    starField.update(state.player.position)
    render(webglRenderer, scene, camera)
  }

  requestAnimationFrame(animate)
}

requestAnimationFrame((time) => {
  lastTime = time
  requestAnimationFrame(animate)
})