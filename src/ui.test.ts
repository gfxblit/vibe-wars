import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('UIManager', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = false;
    state.isSmartAI = true;

    // Setup mock state
    mockState = {
      score: 1234,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 2,
      phase: 'DOGFIGHT',
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
    };

    // Clean up body
    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
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
    expect(shieldElement?.textContent).toBe(GameConfig.player.maxShields.toString());
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
    const expectedWidth = (GameConfig.player.maxShields / GameConfig.player.maxShields) * 100;
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

  it('should create damage-overlay on initialization', () => {
    const overlay = document.getElementById('damage-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay?.classList.contains('bg-vector-red')).toBe(true);
    expect(overlay?.classList.contains('opacity-0')).toBe(true);
  });

  it('should trigger damage flash when shields decrease', () => {
    uiManager.update(mockState); // First update (sets lastShields)
    
    mockState.shields = GameConfig.player.maxShields - 1;
    uiManager.update(mockState);
    
    const overlay = document.getElementById('damage-overlay');
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(true);

    // Verify cleanup
    vi.advanceTimersByTime(GameConfig.ui.damageFlashDuration + 150);
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(false);
  });

  it('should trigger shield impact animation when shields decrease', () => {
    uiManager.update(mockState); // First update
    
    mockState.shields = GameConfig.player.maxShields - 1;
    uiManager.update(mockState);
    
    const shieldBar = document.getElementById('shield-bar');
    expect(shieldBar?.classList.contains('animate-shield-impact')).toBe(true);

    // Verify cleanup
    vi.advanceTimersByTime(GameConfig.ui.damageFlashDuration + 150);
    expect(shieldBar?.classList.contains('animate-shield-impact')).toBe(false);
  });

  it('should not trigger damage FX on the very first update', () => {
    // Start with low shields
    mockState.shields = 2;
    uiManager.update(mockState);
    
    const overlay = document.getElementById('damage-overlay');
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(false);
  });

  it('should not trigger damage FX when shields stay the same or increase', () => {
    uiManager.update(mockState); // First update
    const overlay = document.getElementById('damage-overlay');
    
    // Reset if it somehow got there
    overlay?.classList.remove('animate-damage-flash');

    mockState.shields = GameConfig.player.maxShields;
    uiManager.update(mockState);
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(false);

    mockState.shields = GameConfig.player.maxShields + 1;
    uiManager.update(mockState);
    expect(overlay?.classList.contains('animate-damage-flash')).toBe(false);
  });

  it('should display phase and instructions when phase changes', () => {
    // Initial update (DOGFIGHT)
    uiManager.update(mockState);
    
    // We don't have IDs on phase/instruction elements, but we can find them by content or relative to HUD
    const hud = document.getElementById('hud');
    
    // Check for DOGFIGHT instruction
    expect(hud?.textContent).toContain('CLEAR THE SECTOR OF TIE FIGHTERS');
    expect(hud?.textContent).toContain('PHASE: DOGFIGHT');

    // Change to SURFACE
    mockState.phase = 'SURFACE';
    uiManager.update(mockState);
    expect(hud?.textContent).toContain('APPROACH THE DEATH STAR');
    expect(hud?.textContent).toContain('PHASE: SURFACE');

    // Change to TRENCH
    mockState.phase = 'TRENCH';
    uiManager.update(mockState);
    expect(hud?.textContent).toContain('STAY LOW AND FIRE TORPEDOES INTO THE PORT (SPACE/RIGHT-CLICK)');
    expect(hud?.textContent).toContain('PHASE: TRENCH');
  });
});
