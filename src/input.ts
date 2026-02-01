import { state } from './state';

const keysDown = new Set<string>();

function updateTargetInput() {
  let x = 0;
  let y = 0;
  if (keysDown.has('KeyW')) y += 1;
  if (keysDown.has('KeyS')) y -= 1;
  if (keysDown.has('KeyA')) x -= 1;
  if (keysDown.has('KeyD')) x += 1;
  state.targetInput.set(x, y);
}

const onKeyDown = (event: KeyboardEvent) => {
  keysDown.add(event.code);
  updateTargetInput();
};

const onKeyUp = (event: KeyboardEvent) => {
  keysDown.delete(event.code);
  updateTargetInput();
};

export function setupInput() {
  keysDown.clear();
  state.targetInput.set(0, 0);

  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}
