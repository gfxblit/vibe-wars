/**
 * STUB: This main entry point is a placeholder and subject to 
 * major refactoring as the architecture is finalized.
 */
import './style.css'
import { initGame } from './state'
import { initRenderer } from './renderer'
import { setupInput } from './input'

console.log('Vibe Wars starting...')
initRenderer()
initGame()
setupInput()
