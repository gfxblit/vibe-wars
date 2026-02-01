import './style.css'
import { initGame, state, updateState } from './state'
import { initRenderer, render } from './renderer'
import { setupInput } from './input'
import { StarField } from './entities/StarField'

console.log('Vibe Wars starting...')

const { scene, camera, renderer: webglRenderer } = initRenderer()
initGame()
setupInput()

const starField = new StarField()
scene.add(starField.points)

if (state.player) {
  scene.add(state.player.mesh)
}

let lastTime = 0
function animate(time: number) {
  // Use a reasonable cap for deltaTime to avoid huge jumps
  const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time

  updateState(deltaTime)
  starField.update(state.player.position)
  render(webglRenderer, scene, camera, state)

  requestAnimationFrame(animate)
}

requestAnimationFrame((time) => {
  lastTime = time
  requestAnimationFrame(animate)
})