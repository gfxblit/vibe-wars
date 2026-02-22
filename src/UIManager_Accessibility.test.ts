import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Accessibility', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = true;
    state.isSmartAI = false;
    state.isModeColoring = false;
    state.showChassis = false;

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should have aria-label and aria-expanded on debug panel minimize button', () => {
    const minimizeBtn = document.getElementById('debug-minimize-toggle');
    expect(minimizeBtn).not.toBeNull();

    // Initial state (Expanded)
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Minimize Debug Console');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('true');

    // Click to minimize
    minimizeBtn?.click();
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Expand Debug Console');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('false');

    // Click to expand
    minimizeBtn?.click();
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Minimize Debug Console');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-label on debug inputs matching visual labels', () => {
    const killsInput = document.getElementById('debug-kills-input');
    expect(killsInput?.getAttribute('aria-label')).toBe('Kills to Advance');

    const turretSizeInput = document.getElementById('debug-turret-size-input');
    expect(turretSizeInput?.getAttribute('aria-label')).toBe('Turret Size');

    const fireballSizeInput = document.getElementById('debug-fireball-size-input');
    expect(fireballSizeInput?.getAttribute('aria-label')).toBe('Fireball Size');
  });

  it('should have aria-pressed on toggle buttons reflecting state', () => {
    // AI Toggle
    const aiToggle = document.getElementById('ai-mode-toggle');
    expect(aiToggle?.getAttribute('aria-pressed')).toBe('false'); // Initially false

    aiToggle?.click();
    expect(aiToggle?.getAttribute('aria-pressed')).toBe('true'); // Should become true

    // Coloring Toggle
    const colorToggle = document.getElementById('mode-coloring-toggle');
    expect(colorToggle?.getAttribute('aria-pressed')).toBe('false');

    colorToggle?.click();
    expect(colorToggle?.getAttribute('aria-pressed')).toBe('true');

    // Chassis Toggle
    const chassisToggle = document.getElementById('chassis-toggle');
    expect(chassisToggle?.getAttribute('aria-pressed')).toBe('false');

    chassisToggle?.click();
    expect(chassisToggle?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should have focus styles on interactive elements', () => {
    // Check buttons created with BUTTON_CLASSES
    const aiToggle = document.getElementById('ai-mode-toggle');
    expect(aiToggle?.className).toContain('focus:outline-none');
    expect(aiToggle?.className).toContain('focus:ring-2');
    expect(aiToggle?.className).toContain('focus:ring-vector-green');

    // Check minimize button
    const minimizeBtn = document.getElementById('debug-minimize-toggle');
    expect(minimizeBtn?.className).toContain('focus:outline-none');
    expect(minimizeBtn?.className).toContain('focus:text-white');
    expect(minimizeBtn?.className).toContain('focus:ring-1');

    // Check inputs
    const killsInput = document.getElementById('debug-kills-input');
    expect(killsInput?.className).toContain('focus:outline-none');
    expect(killsInput?.className).toContain('focus:ring-1');
    expect(killsInput?.className).toContain('focus:ring-vector-green');
  });
});
