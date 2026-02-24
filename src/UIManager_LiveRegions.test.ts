import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UIManager } from './UIManager';
import { state } from './state';

describe('UIManager Live Regions', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    vi.useFakeTimers();
    state.debug = false; // Disable debug UI for cleaner DOM
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
  });

  it('should have correct ARIA attributes on instruction elements', () => {
    const instructionEl = document.getElementById('instruction-value');
    expect(instructionEl).not.toBeNull();
    expect(instructionEl?.getAttribute('role')).toBe('status');
    expect(instructionEl?.getAttribute('aria-live')).toBe('polite');

    // Simulate a state change to verify text content update doesn't remove attributes
    state.stage = 'DOGFIGHT';
    uiManager.update(state);

    expect(instructionEl?.textContent).toBe('CLEAR THE SECTOR OF TIE FIGHTERS');
    expect(instructionEl?.getAttribute('role')).toBe('status');
  });

  it('should have correct ARIA attributes on critical events', () => {
    const destructionEl = document.getElementById('destruction-value');
    expect(destructionEl).not.toBeNull();
    expect(destructionEl?.getAttribute('role')).toBe('status');
    expect(destructionEl?.getAttribute('aria-live')).toBe('assertive');

    const greatShotEl = document.getElementById('great-shot-value');
    expect(greatShotEl).not.toBeNull();
    expect(greatShotEl?.getAttribute('role')).toBe('status');
    expect(greatShotEl?.getAttribute('aria-live')).toBe('polite');
  });

  it('should have alert role on torpedo ready indicator', () => {
    const torpedoEl = document.getElementById('torpedo-ready-value');
    expect(torpedoEl).not.toBeNull();
    expect(torpedoEl?.getAttribute('role')).toBe('alert');

    // Verify it becomes visible when ready
    state.stage = 'TRENCH';
    state.canFireTorpedo = true;
    uiManager.update(state);

    expect(torpedoEl?.classList.contains('hidden')).toBe(false);
  });

  it('should have alertdialog role on game over screen', () => {
    const gameOverEl = document.getElementById('game-over');
    expect(gameOverEl).not.toBeNull();
    expect(gameOverEl?.getAttribute('role')).toBe('alertdialog');
    expect(gameOverEl?.getAttribute('aria-modal')).toBe('true');
    expect(gameOverEl?.getAttribute('aria-labelledby')).toBe('game-over-title');

    const titleEl = document.getElementById('game-over-title');
    expect(titleEl).not.toBeNull();
    expect(titleEl?.textContent).toBe('GAME OVER');
  });
});
