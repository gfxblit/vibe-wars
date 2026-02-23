import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UIManager } from './UIManager';
import { GameState, state } from './state';
import { GameConfig } from './config';
import * as THREE from 'three';

describe('UIManager - Distance Countdown', () => {
  let uiManager: UIManager;
  let mockState: GameState;

  beforeEach(() => {
    vi.useFakeTimers();
    state.debug = false;
    
    // Setup mock state
    mockState = {
      score: 0,
      shields: GameConfig.player.maxShields,
      kills: 0,
      wave: 1,
      stage: 'TRENCH',
      isGameStarted: true,
      isGameOver: false,
      player: {
        position: new THREE.Vector3(0, 0, 0)
      } as any,
      entityManager: null,
      stageManager: null,
      viewport: { width: 100, height: 100, centerX: 50, centerY: 50 },
      gunColorToggles: [],
      debug: false,
      isSmartAI: false,
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
    uiManager.destroy();
  });

  it('should show distance countdown when in TRENCH stage and within range', () => {
    // Determine the port Z position
    const { catwalkEndZ, exhaustPortZOffset } = GameConfig.stages.trench;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    
    // Place player 3000 units away from port (within 4000 range)
    mockState.player!.position.z = portZ + 3000;
    
    uiManager.update(mockState);
    
    const distanceValue = document.getElementById('distance-value');
    expect(distanceValue?.classList.contains('hidden')).toBe(false);
    expect(distanceValue?.textContent).toBe('3000');
  });

  it('should hide distance countdown when in TRENCH stage but out of range', () => {
    const { catwalkEndZ, exhaustPortZOffset } = GameConfig.stages.trench;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    
    // Place player 5000 units away from port (outside 4000 range)
    mockState.player!.position.z = portZ + 5000;
    
    uiManager.update(mockState);
    
    const distanceValue = document.getElementById('distance-value');
    expect(distanceValue?.classList.contains('hidden')).toBe(true);
  });

  it('should hide distance countdown when not in TRENCH stage', () => {
    mockState.stage = 'DOGFIGHT';
    // Even if close enough (though coordinates might not make sense in dogfight)
    mockState.player!.position.z = 0; 
    
    uiManager.update(mockState);
    
    const distanceValue = document.getElementById('distance-value');
    expect(distanceValue?.classList.contains('hidden')).toBe(true);
  });
});
