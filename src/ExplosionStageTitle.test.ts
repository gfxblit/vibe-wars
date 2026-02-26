import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';

describe('ExplosionStageTitle', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset singleton state
    state.debug = false;
    state.isSmartAI = true;
    state.stageManager = null;

    // Setup mock state
    const mockStageManager = {
      getStage: vi.fn().mockReturnValue({ showTitle: true })
    } as any;

    mockState = {
      score: 0,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 1,
      stage: 'DOGFIGHT',
      isGameOver: false,
      player: null,
      entityManager: null,
      stageManager: mockStageManager,
      audioManager: null,
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
    uiManager.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should display STAGE: DOGFIGHT when in DOGFIGHT stage', () => {
    mockState.stage = 'DOGFIGHT';
    uiManager.update(mockState);
    const hud = document.getElementById('hud');
    expect(hud?.textContent).toContain('STAGE: DOGFIGHT');
  });

  describe('when in EXPLOSION stage', () => {
    beforeEach(() => {
      // Initial update to establish lastStage
      uiManager.update(mockState);

      // Transition to EXPLOSION
      mockState.stage = 'EXPLOSION';
      (mockState.stageManager!.getStage as any).mockReturnValue({ showTitle: false });
      uiManager.update(mockState);
    });

    it('should NOT display STAGE: EXPLOSION', () => {
      const hud = document.getElementById('hud');
      expect(hud?.textContent).not.toContain('STAGE: EXPLOSION');
    });

    it('should still display GREAT SHOT KID!', () => {
      const hud = document.getElementById('hud');
      expect(hud?.textContent).toContain('GREAT SHOT KID!');
    });
  });
});
