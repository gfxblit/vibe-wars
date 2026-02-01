import { state } from './state';

const keysDown = new Set<string>();

function updateTargetInput() {
  let x = 0;
  let y = 0;
  if (keysDown.has('w') || keysDown.has('W')) y += 1;
  if (keysDown.has('s') || keysDown.has('S')) y -= 1;
  if (keysDown.has('a') || keysDown.has('A')) x -= 1;
  if (keysDown.has('d') || keysDown.has('D')) x += 1;
  state.targetInput.set(x, y);
}

const onKeyDown = (event: KeyboardEvent) => {
  keysDown.add(event.key);
  updateTargetInput();
};

const onKeyUp = (event: KeyboardEvent) => {
  keysDown.delete(event.key);
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
