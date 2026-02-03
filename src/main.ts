import './style.css'
import { initGame, state, updateState } from './state'
import { initRenderer, render, attachCameraToPlayer } from './renderer'
import { InputManager } from './input'
import { StarField } from './entities/StarField'
import { GameConfig } from './config'

console.log('Vibe Wars starting...')

const { scene, camera, renderer: webglRenderer } = initRenderer()
initGame()

const inputManager = new InputManager()
inputManager.setup()

const starField = new StarField()
scene.add(starField.points)

const cursorElement = document.getElementById('cursor');

if (state.player) {
  scene.add(state.player.mesh)
  attachCameraToPlayer(camera, state.player)
}

let lastTime = 0
function animate(time: number) {
  // Use a reasonable cap for deltaTime to avoid huge jumps
  const deltaTime = Math.min((time - lastTime) / 1000, GameConfig.core.deltaTimeCap);
  lastTime = time

  inputManager.update(deltaTime)
  const input = inputManager.getInput()
  updateState(deltaTime, input)
  
  // Update visual cursor
  if (cursorElement) {
    const { centerX, centerY } = state.viewport;
    const cursorX = centerX + input.x * centerX;
    const cursorY = centerY - input.y * centerY; // Invert Y back to screen space
    
    // Use transform for better performance
    cursorElement.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
    
    // Only set display once
    if (cursorElement.style.display !== 'block') {
      cursorElement.style.display = 'block';
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