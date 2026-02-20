import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Debug Panel Accessibility', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = true;

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should have correct aria attributes on debug toggle button', () => {
    const minimizeBtn = document.getElementById('debug-minimize-toggle');
    expect(minimizeBtn).not.toBeNull();

    // Initial state: Expanded
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Minimize Debug Panel');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('true');

    // Toggle to Minimized
    minimizeBtn?.click();
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Expand Debug Panel');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('false');

    // Toggle back to Expanded
    minimizeBtn?.click();
    expect(minimizeBtn?.getAttribute('aria-label')).toBe('Minimize Debug Panel');
    expect(minimizeBtn?.getAttribute('aria-expanded')).toBe('true');
  });
});
