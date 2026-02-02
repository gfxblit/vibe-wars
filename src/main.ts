import './style.css'
import { initGame, state, updateState } from './state'
import { initRenderer, render } from './renderer'
import { InputManager } from './input'
import { StarField } from './entities/StarField'

console.log('Vibe Wars starting...')

const { scene, camera, renderer: webglRenderer } = initRenderer()
initGame()

const inputManager = new InputManager()
inputManager.setup()

const starField = new StarField()
scene.add(starField.points)

const cursorElement = document.getElementById('cursor');

let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
});

if (state.player) {
  scene.add(state.player.mesh)
}

let lastTime = 0
function animate(time: number) {
  // Use a reasonable cap for deltaTime to avoid huge jumps
  const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time

  inputManager.update(deltaTime)
  const input = inputManager.getInput()
  updateState(deltaTime, input)
  
  // Update visual cursor
  if (cursorElement) {
    const centerX = width / 2;
    const centerY = height / 2;
    const cursorX = centerX + input.x * centerX;
    const cursorY = centerY - input.y * centerY; // Invert Y back to screen space
    
    cursorElement.style.left = `${cursorX}px`;
    cursorElement.style.top = `${cursorY}px`;
    cursorElement.style.display = 'block';
  }

  if (state.player) {
    starField.update(state.player.position)
    render(webglRenderer, scene, camera, state)
  }

  requestAnimationFrame(animate)
}

requestAnimationFrame((time) => {
  lastTime = time
  requestAnimationFrame(animate)
})