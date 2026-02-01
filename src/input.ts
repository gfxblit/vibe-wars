import { state } from './state';

export function setupInput() {
  window.addEventListener('mousemove', (event) => {
    // Map clientX [0, window.innerWidth] to [-1, 1]
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    // Map clientY [0, window.innerHeight] to [1, -1] (Y is inverted)
    const y = -((event.clientY / window.innerHeight) * 2 - 1);
    
    state.targetInput.set(x, y);
  });
  console.log('Input setup');
}
