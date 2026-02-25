import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('UIManager Shield Colors', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = false;
    state.isSmartAI = false;

    // Setup mock state
    mockState = {
      score: 0,
      shields: GameConfig.player.maxShields, // 6
      kills: 0,
      wave: 1,
      stage: 'DOGFIGHT',
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
      isSmartAI: false,
      isModeColoring: false,
      showChassis: false,
      canFireTorpedo: false,
      hasFiredTorpedo: false,
      isApproachingDeathStar: false,
      isDeathStarDestroyed: false,
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    uiManager.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should set shield bar to GREEN when shields are high (> 50%)', () => {
    // 6 shields (100%)
    mockState.shields = 6;
    uiManager.update(mockState);
    const shieldBar = document.getElementById('shield-bar');
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);

    // 4 shields (66%)
    mockState.shields = 4;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);
  });

  it('should set shield bar to YELLOW when shields are medium (25% < x <= 50%)', () => {
    // 3 shields (50%)
    mockState.shields = 3;
    uiManager.update(mockState);
    const shieldBar = document.getElementById('shield-bar');
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);

    // 2 shields (33%)
    mockState.shields = 2;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);
  });

  it('should set shield bar to RED when shields are low (<= 25%)', () => {
    // 1 shield (16%)
    mockState.shields = 1;
    uiManager.update(mockState);
    const shieldBar = document.getElementById('shield-bar');
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);

    // 0 shields (0%)
    mockState.shields = 0;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(true);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
  });

  it('should transition colors correctly when taking damage', () => {
    const shieldBar = document.getElementById('shield-bar');

    // Start Green
    mockState.shields = 6;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);

    // Drop to Yellow
    mockState.shields = 3;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(true);

    // Drop to Red
    mockState.shields = 1;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-yellow')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(true);

    // Heal back to Green (e.g. bonus for killing Death Star)
    mockState.shields = 6;
    uiManager.update(mockState);
    expect(shieldBar?.classList.contains('bg-vector-red')).toBe(false);
    expect(shieldBar?.classList.contains('bg-vector-green')).toBe(true);
  });
});
