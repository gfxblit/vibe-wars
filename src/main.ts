import './style.css'
import { initGame, state, updateState } from './state'
import { initRenderer, render, attachCameraToPlayer } from './renderer'
import { InputManager } from './input'
import { StarField } from './entities/StarField'
import { GameConfig } from './config'
import { Cursor } from './Cursor'
import { UIManager } from './UIManager'

export function init() {
  console.log('Vibe Wars starting...')
  const { scene, camera, renderer: webglRenderer } = initRenderer()
  initGame()

  const inputManager = new InputManager()
  inputManager.setup()

  const uiManager = new UIManager()

  const starField = new StarField()
  scene.add(starField.points)

  const cursor = new Cursor()
  const overlayElement = document.getElementById('overlay');

  if (state.player) {
    scene.add(state.player.mesh)
    attachCameraToPlayer(camera, state.player)
  }

  state.tieFighters.forEach(tf => {
    scene.add(tf.mesh)
  });

  let lastTime = 0
  function animate(time: number) {
    // Use a reasonable cap for deltaTime to avoid huge jumps
    const deltaTime = Math.min((time - lastTime) / 1000, GameConfig.core.deltaTimeCap);
    lastTime = time

    inputManager.update(deltaTime)
    const input = inputManager.getInput()
    updateState(deltaTime, input)
    
    const isLocked = document.pointerLockElement === document.body;

    // Update visual cursor
    cursor.update(input, isLocked)

    // Update overlay
    if (overlayElement) {
      overlayElement.style.display = isLocked ? 'none' : 'flex';
    }

    uiManager.update(state)

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

  return { inputManager, starField };
}

// Only run automatically if not in a test environment
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  init();
}
