import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Accessibility', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    // Clean up document body before each test
    document.body.innerHTML = '';
    state.debug = true; // Enable debug mode to show the panel

    // We need to instantiate UIManager which will append elements to the body
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    state.debug = false;
  });

  it('should have accessible label for debug panel toggle button', () => {
    const toggleBtn = document.getElementById('debug-minimize-toggle');
    expect(toggleBtn).not.toBeNull();

    // Initial state (expanded) - checks if aria-label is set
    expect(toggleBtn?.getAttribute('aria-label')).toBe('Minimize Debug Panel');

    // Click to minimize
    if (toggleBtn) {
      toggleBtn.click();
      expect(toggleBtn.getAttribute('aria-label')).toBe('Expand Debug Panel');

      // Click to expand
      toggleBtn.click();
      expect(toggleBtn.getAttribute('aria-label')).toBe('Minimize Debug Panel');
    }
  });

  it('should have accessible labels for debug inputs', () => {
    const killsInput = document.getElementById('debug-kills-input');
    const turretSizeInput = document.getElementById('debug-turret-size-input');
    const fireballSizeInput = document.getElementById('debug-fireball-size-input');

    expect(killsInput).not.toBeNull();
    expect(turretSizeInput).not.toBeNull();
    expect(fireballSizeInput).not.toBeNull();

    expect(killsInput?.getAttribute('aria-label')).toBe('Kills to advance threshold');
    expect(turretSizeInput?.getAttribute('aria-label')).toBe('Turret mesh size');
    expect(fireballSizeInput?.getAttribute('aria-label')).toBe('Fireball sparkle size');
  });
});
