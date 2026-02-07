import { describe, it, expect, beforeEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('UIManager', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    // Reset singleton state
    state.debug = false;
    state.isSmartAI = true;

    // Setup mock state
    mockState = {
      score: 1234,
      shields: 4,
      wave: 2,
      phase: 'DOGFIGHT',
      isGameOver: false,
      player: null,
      entityManager: null,
      viewport: {
        width: 1024,
        height: 768,
        centerX: 512,
        centerY: 384,
      },
      gunColorToggles: [false, false, false, false],
      debug: false,
      isSmartAI: true,
      isModeColoring: false,
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  it('should create HUD container on initialization', () => {
    const hud = document.getElementById('hud');
    expect(hud).not.toBeNull();
  });

  it('should create debug panel when state.debug is true', () => {
    state.debug = true;
    const debugUi = new UIManager();
    expect(document.getElementById('debug-panel')).not.toBeNull();
    debugUi.destroy();
    document.getElementById('debug-panel')?.remove();
  });

  it('should display initial score, shields, and wave', () => {
    uiManager.update(mockState);

    const scoreElement = document.getElementById('score-value');
    const shieldElement = document.getElementById('shield-value');
    const waveElement = document.getElementById('wave-value');

    expect(scoreElement?.textContent).toBe('1234');
    expect(shieldElement?.textContent).toBe('4');
    expect(waveElement?.textContent).toBe('2');
  });

  it('should display high score from config', () => {
    uiManager.update(mockState);
    const highScoreElement = document.getElementById('high-score-value');
    expect(highScoreElement?.textContent).toBe(GameConfig.ui.highScore.toString());
  });

  it('should update shield bar width', () => {
    uiManager.update(mockState);
    const shieldBar = document.getElementById('shield-bar');
    const expectedWidth = (4 / GameConfig.player.maxShields) * 100;
    expect(shieldBar?.style.width).toBe(`${expectedWidth}%`);

    mockState.shields = 2;
    uiManager.update(mockState);
    const expectedWidth2 = (2 / GameConfig.player.maxShields) * 100;
    expect(shieldBar?.style.width).toBe(`${expectedWidth2}%`);
  });

  it('should show Game Over overlay when isGameOver is true', () => {
    uiManager.update(mockState);
    const gameOver = document.getElementById('game-over');
    expect(gameOver?.classList.contains('hidden')).toBe(true);

    mockState.isGameOver = true;
    uiManager.update(mockState);
    expect(gameOver?.classList.contains('hidden')).toBe(false);
  });

  it('should remove HUD container on destroy', () => {
    uiManager.destroy();
    const hud = document.getElementById('hud');
    expect(hud).toBeNull();
  });

  it('should remove debug panel on destroy', () => {
    state.debug = true;
    const ui = new UIManager();
    expect(document.getElementById('debug-panel')).not.toBeNull();
    ui.destroy();
    expect(document.getElementById('debug-panel')).toBeNull();
  });
});
