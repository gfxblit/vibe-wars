import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState } from './state';
import { GameConfig } from './config';

describe('UIManager Instructions', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    // Setup mock state
    mockState = {
      score: 0,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 1,
      stage: 'DOGFIGHT',
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
    };

    document.body.innerHTML = '';
    uiManager = new UIManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should not show "APPROACH THE DEATH STAR" during SURFACE stage', () => {
    // Initial update
    uiManager.update(mockState);

    // Change to SURFACE
    mockState.stage = 'SURFACE';
    uiManager.update(mockState);
    
    const hud = document.getElementById('hud');
    expect(hud?.textContent).not.toContain('APPROACH THE DEATH STAR');
  });

  it('should show "APPROACH DEATH STAR" ONLY during DOGFIGHT approach phase', () => {
    // 1. Regular DOGFIGHT
    uiManager.update(mockState);
    const hud = document.getElementById('hud');
    expect(hud?.textContent).toContain('CLEAR THE SECTOR OF TIE FIGHTERS');

    // 2. DOGFIGHT approach phase
    mockState.isApproachingDeathStar = true;
    uiManager.update(mockState);
    expect(hud?.textContent).toContain('APPROACH DEATH STAR');

    // 3. Transition to SURFACE
    mockState.isApproachingDeathStar = false;
    mockState.stage = 'SURFACE';
    uiManager.update(mockState);
    expect(hud?.textContent).not.toContain('APPROACH DEATH STAR');
    expect(hud?.textContent).not.toContain('APPROACH THE DEATH STAR');
  });
});
