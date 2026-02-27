import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Controls Hint', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    // Reset singleton state
    state.debug = false;
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
  });

  it('should display control hints on desktop', () => {
    const hint = document.getElementById('controls-hint');
    expect(hint).not.toBeNull();

    // Check content
    expect(hint?.textContent).toContain('WASD');
    expect(hint?.textContent).toContain('ARROWS');
    expect(hint?.textContent).toContain('SPACE');
    expect(hint?.textContent).toContain('CLICK');

    // Check visibility classes (hidden on mobile, block on desktop)
    expect(hint?.className).toContain('hidden');
    expect(hint?.className).toContain('md:block');

    // Check styling
    expect(hint?.className).toContain('text-vector-green');
    expect(hint?.className).toContain('opacity-50');
    expect(hint?.className).toContain('text-sm');
    expect(hint?.className).toContain('text-center');
  });
});
