import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('UIManager UX Improvements', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = false;
    state.isSmartAI = true;
    state.stageManager = null;

    // Setup mock state
    mockState = {
      score: 1234,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 2,
      stage: 'DOGFIGHT',
      isGameStarted: true,
      isGameOver: false,
      player: null,
      entityManager: null,
      stageManager: null,
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
      showChassis: false,
      canFireTorpedo: false,
      hasFiredTorpedo: false,
      isApproachingDeathStar: false,
      isDeathStarDestroyed: false,
      debugKillsThreshold: undefined,
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    uiManager.destroy();
  });

  it('should set focus to restart button when Game Over screen appears', () => {
    // Initial update
    uiManager.update(mockState);

    // Simulate Game Over
    mockState.isGameOver = true;
    uiManager.update(mockState);

    const gameOver = document.getElementById('game-over');
    const restartBtn = gameOver?.querySelector('button');

    expect(document.activeElement).toBe(restartBtn);
  });

  it('should apply fade-in animation when Game Over screen appears', () => {
    // Initial update
    uiManager.update(mockState);

    const gameOver = document.getElementById('game-over');
    expect(gameOver?.classList.contains('hidden')).toBe(true);
    expect(gameOver?.classList.contains('animate-fade-in')).toBe(false);

    // Simulate Game Over
    mockState.isGameOver = true;
    uiManager.update(mockState);

    expect(gameOver?.classList.contains('hidden')).toBe(false);
    expect(gameOver?.classList.contains('animate-fade-in')).toBe(true);
  });
});
