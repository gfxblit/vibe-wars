import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Accessibility', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    vi.useFakeTimers();
    state.debug = true;
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('debug toggle button should have appropriate aria-label', () => {
    const toggleBtn = document.getElementById('debug-minimize-toggle');
    expect(toggleBtn).not.toBeNull();
    // Initially expanded, so the action is to minimize
    expect(toggleBtn?.getAttribute('aria-label')).toBe('Minimize Debug Console');

    // Click to minimize
    toggleBtn?.click();
    // Now minimized, so the action is to maximize/expand
    expect(toggleBtn?.getAttribute('aria-label')).toBe('Expand Debug Console');

    // Click to expand
    toggleBtn?.click();
    expect(toggleBtn?.getAttribute('aria-label')).toBe('Minimize Debug Console');
  });

  it('debug input fields should have descriptive aria-labels', () => {
    const killsInput = document.getElementById('debug-kills-input');
    const turretSizeInput = document.getElementById('debug-turret-size-input');
    const fireballSizeInput = document.getElementById('debug-fireball-size-input');

    expect(killsInput?.getAttribute('aria-label')).toBe('Kills to Advance Threshold');
    expect(turretSizeInput?.getAttribute('aria-label')).toBe('Turret Mesh Size');
    expect(fireballSizeInput?.getAttribute('aria-label')).toBe('Fireball Sparkle Size');
  });
});
