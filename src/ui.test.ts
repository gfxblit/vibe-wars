import { describe, it, expect, beforeEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState } from './state';
import { GameConfig } from './config';

describe('UIManager', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    // Setup mock state
    mockState = {
      score: 1234,
      shields: 4,
      wave: 2,
      phase: 'DOGFIGHT',
      isGameOver: false,
      player: null,
      tieFighters: [],
      viewport: {
        width: 1024,
        height: 768,
        centerX: 512,
        centerY: 384,
      },
      lasers: [],
      fireballs: [],
      gunColorToggles: [false, false, false, false],
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  it('should create HUD container on initialization', () => {
    const hud = document.getElementById('hud');
    expect(hud).not.toBeNull();
    // In happy-dom, style properties might not be exactly as expected if not set via style attribute or class
    // but we can check the element exists and has basic properties.
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
});
