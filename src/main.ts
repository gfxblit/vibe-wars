import './style.css'
import { initGame, state } from './state'
import { initRenderer, render, attachCameraToPlayer } from './renderer'
import { InputManager } from './input'
import { StarField } from './entities/StarField'
import { GameConfig } from './config'
import { Cursor } from './Cursor'
import { UIManager } from './UIManager'
import { GameSystem } from './GameSystem'

console.log('Vibe Wars starting...')

const { scene, camera, hudScene, hudCamera, renderer: webglRenderer } = initRenderer()
initGame(scene, hudScene)

const uiManager = new UIManager()

// Resume audio on first interaction
let audioUnlocked = false;
const resumeAudio = async () => {
  if (state.audioManager) {
    await state.audioManager.resume();
    
    if (!audioUnlocked) {
      audioUnlocked = true;
      // Play a very subtle "laser" blip to confirm audio is working,
      // similar to how prompt-man starts its music.
      state.audioManager.playPlayerLaser();
    }

    // Only remove events if we are successfully running
    if (state.audioManager.getState() === 'running') {
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
      window.removeEventListener('touchend', resumeAudio);
      window.removeEventListener('mousedown', resumeAudio);
    }
  }
};

window.addEventListener('click', resumeAudio);
window.addEventListener('keydown', resumeAudio);
window.addEventListener('touchstart', resumeAudio);
window.addEventListener('touchend', resumeAudio);
window.addEventListener('mousedown', resumeAudio);

const inputManager = new InputManager()
inputManager.setup()

const cursor = new Cursor()
const gameSystem = new GameSystem(camera)

const starField = new StarField()
scene.add(starField.points)

if (state.player) {
  scene.add(state.player.mesh)
  attachCameraToPlayer(camera, state.player)
}

let lastTime = 0

function animate(time: number) {
  const deltaTime = Math.min((time - lastTime) / 1000, GameConfig.core.deltaTimeCap);
  lastTime = time

  inputManager.update(deltaTime)
  const input = inputManager.getInput()

  if (state.isGameStarted) {
    gameSystem.update(deltaTime, input)
  }

  cursor.update(input)
  uiManager.update(state)

  // Render
  if (state.player) {
    starField.points.visible = state.stageManager?.getStage()?.showStarField ?? false;
    if (starField.points.visible) {
      starField.update(state.player.position)
    }
    render(webglRenderer, scene, camera, hudScene, hudCamera)
  }

  requestAnimationFrame(animate)
}

requestAnimationFrame((time) => {
  lastTime = time
  requestAnimationFrame(animate)
})
