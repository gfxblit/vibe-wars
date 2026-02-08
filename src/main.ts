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
  
  gameSystem.update(deltaTime, input)
  
  cursor.update(input)
  uiManager.update(state)

  // Render
  if (state.player) {
    starField.points.visible = state.phase !== 'TRENCH'
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