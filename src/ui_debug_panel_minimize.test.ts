import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Debug Panel Minimize', () => {
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

  it('should have a minimize button in the debug panel', () => {
    const minimizeBtn = document.getElementById('debug-minimize-toggle');
    expect(minimizeBtn).not.toBeNull();
  });

  it('should toggle minimized state when clicked', () => {
    const minimizeBtn = document.getElementById('debug-minimize-toggle');
    const debugPanel = document.getElementById('debug-panel');
    
    // Initially expanded (default)
    expect(debugPanel?.classList.contains('debug-minimized')).toBe(false);
    expect(minimizeBtn?.textContent).toBe('[-]');

    // Click to minimize
    minimizeBtn?.click();
    expect(debugPanel?.classList.contains('debug-minimized')).toBe(true);
    expect(minimizeBtn?.textContent).toBe('[+]');

    // Click to expand
    minimizeBtn?.click();
    expect(debugPanel?.classList.contains('debug-minimized')).toBe(false);
    expect(minimizeBtn?.textContent).toBe('[-]');
  });
});
