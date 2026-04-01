import { expect, test, beforeEach, describe } from 'vitest';
import { UIManager } from './UIManager';
import { state, initGame } from './state';
import * as THREE from 'three';

describe('UIManager Start Screen', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    // Reset state
    state.debug = false;
    state.isGameStarted = false;

    // Setup DOM
    document.body.innerHTML = '';

    // Initialize game state (required for UIManager)
    initGame(new THREE.Scene(), new THREE.Scene());

    uiManager = new UIManager();
  });

  test('Start screen is created and visible initially', () => {
    const startScreen = document.getElementById('start-screen');
    expect(startScreen).toBeTruthy();
    expect(startScreen!.classList.contains('hidden')).toBe(false);
  });

  test('Start screen contains correct title and button', () => {
    const startScreen = document.getElementById('start-screen');
    expect(startScreen!.textContent).toContain('VIBE WARS');
    expect(startScreen!.textContent).toContain('A NEW HOPE');

    const button = startScreen!.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.textContent).toBe('START MISSION');
    expect(button!.getAttribute('aria-label')).toBe('Start Game');
  });

  test('Clicking Start Mission button updates state and hides screen', () => {
    const startScreen = document.getElementById('start-screen');
    const button = startScreen!.querySelector('button') as HTMLButtonElement;

    expect(state.isGameStarted).toBe(false);

    button.click();

    expect(state.isGameStarted).toBe(true);

    // We need to call update to reflect the change in UI
    uiManager.update(state);
    expect(startScreen!.classList.contains('hidden')).toBe(true);
  });

  test('Start screen is hidden if game is already started', () => {
    state.isGameStarted = true;
    uiManager.update(state);

    const startScreen = document.getElementById('start-screen');
    expect(startScreen!.classList.contains('hidden')).toBe(true);
  });
});
