import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { TrenchCombatStrategy } from './CombatStrategies';
import { state, initGame } from './state';
import * as StateModule from './state';
import { GameConfig } from './config';

// Mock dependencies
vi.mock('./state', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./state')>();
  return {
    ...actual,
    spawnLasers: vi.fn(),
    spawnTorpedo: vi.fn(),
  };
});

// Mock collision check to simulate aiming at the exhaust port
vi.mock('./collision', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./collision')>();
  return {
    ...actual,
    checkAim: vi.fn(),
  };
});

describe('TrenchCombatStrategy - Firing Logic', () => {
  let camera: THREE.Camera;
  let strategy: TrenchCombatStrategy;
  let checkAimMock: any;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup basic game state
    const scene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    // Setup camera
    camera = new THREE.PerspectiveCamera();
    camera.updateMatrixWorld();
    
    // Setup strategy
    const strategyConfig = {
      maxRange: GameConfig.laser.maxRange,
      fireCooldown: GameConfig.laser.cooldown,
      fireballCollisionRadiusNDC: GameConfig.fireball.collisionRadiusNDC,
      fireballPoints: GameConfig.fireball.points,
      baseForwardSpeed: GameConfig.player.baseForwardSpeed,
      torpedoSpeedMultiplier: GameConfig.torpedo.speedMultiplier,
    };
    strategy = new TrenchCombatStrategy(strategyConfig);
    
    // Setup player position near the exhaust port to satisfy range check
    const { catwalkEndZ, exhaustPortZOffset } = GameConfig.stages.trench;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    state.player!.position.set(0, 0, portZ + 10);
    
    // Get the mock function for checkAim
    const collisionModule = await import('./collision');
    checkAimMock = collisionModule.checkAim;
    checkAimMock.mockReturnValue(false); // Default to not aiming at port
  });

  it('PREVENTS firing torpedo if fire button was held BEFORE aiming at port', () => {
    // 1. Holding fire button, but NOT aiming at port
    checkAimMock.mockReturnValue(false);
    let input = { x: 0, y: 0, isFiring: true };
    strategy.update(0.016, input, camera);
    
    expect(state.canFireTorpedo).toBe(false);
    expect(StateModule.spawnTorpedo).not.toHaveBeenCalled();

    // 2. Still holding fire button, NOW aiming at port
    checkAimMock.mockReturnValue(true);
    input = { x: 0, y: 0, isFiring: true };
    strategy.update(0.016, input, camera);
    
    expect(state.canFireTorpedo).toBe(true);
    // Should not fire because the button was held down before aiming
    expect(StateModule.spawnTorpedo).not.toHaveBeenCalled(); 
  });

  it('ALLOWS firing torpedo if fire button is pressed AFTER aiming at port', () => {
    // 1. Aiming at port, NOT firing
    checkAimMock.mockReturnValue(true);
    let input = { x: 0, y: 0, isFiring: false };
    strategy.update(0.016, input, camera);
    
    expect(state.canFireTorpedo).toBe(true);
    expect(StateModule.spawnTorpedo).not.toHaveBeenCalled();

    // 2. Still aiming at port, NOW firing (fresh press)
    input = { x: 0, y: 0, isFiring: true };
    strategy.update(0.016, input, camera);

    expect(state.canFireTorpedo).toBe(true);
    expect(StateModule.spawnTorpedo).toHaveBeenCalled();
  });
});
