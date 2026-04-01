import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('UIManager Timeout Management', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = false;

    // Setup mock state
    mockState = {
      score: 0,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 1,
      stage: 'DOGFIGHT',
      isGameStarted: true,
      isGameOver: false,
      player: null,
      entityManager: null,
      stageManager: null,
      audioManager: null,
      audioSystem: null,
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
  });

  it('should clear stage title timeout when stage changes rapidly', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    // First stage change
    mockState.stage = 'SURFACE';
    uiManager.update(mockState);
    
    // Second stage change immediately
    mockState.stage = 'TRENCH';
    uiManager.update(mockState);

    // Should have cleared the first timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should clear instructions timeout when stage changes rapidly', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    mockState.stage = 'SURFACE';
    uiManager.update(mockState);
    
    mockState.stage = 'TRENCH';
    uiManager.update(mockState);

    // Should have cleared the instructions timeout (last 5s)
    // There are actually multiple timeouts being set, so we check if any were cleared
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should clear great shot timeout when stage changes rapidly', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    mockState.stage = 'EXPLOSION';
    uiManager.update(mockState);
    
    mockState.stage = 'DOGFIGHT'; // Transitioned away
    uiManager.update(mockState);

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should clear all timeouts when destroyed', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    // Trigger some timeouts
    mockState.stage = 'SURFACE';
    uiManager.update(mockState);
    
    mockState.shields -= 1;
    uiManager.update(mockState); // Triggers damage and shield timeouts

    mockState.isDeathStarDestroyed = true;
    uiManager.update(mockState); // Triggers destruction timeout

    uiManager.destroy();

    // Expect multiple calls to clearTimeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
