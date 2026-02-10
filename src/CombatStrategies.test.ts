import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { DogfightCombatStrategy, TrenchCombatStrategy } from './CombatStrategies';
import { state, initGame } from './state';
import * as StateModule from './state';
import { GameConfig } from './config';

vi.mock('./state', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./state')>();
  return {
    ...actual,
    spawnLasers: vi.fn(actual.spawnLasers),
    spawnTorpedo: vi.fn(actual.spawnTorpedo),
  };
});

vi.mock('./collision', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./collision')>();
  return {
    ...actual,
    checkAim: vi.fn(actual.checkAim),
  };
});

describe('DogfightCombatStrategy', () => {
  let camera: THREE.Camera;
  let strategy: DogfightCombatStrategy;

  beforeEach(() => {
    const scene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    camera = new THREE.PerspectiveCamera();
    camera.updateMatrixWorld();
    strategy = new DogfightCombatStrategy();
    vi.clearAllMocks();
  });

  it('spawns lasers when firing', () => {
    const input = { x: 0, y: 0, isFiring: true };
    strategy.update(0.01, input, camera);

    expect(StateModule.spawnLasers).toHaveBeenCalled();
  });

  it('detects hits on TIE fighters', () => {
    const tf = state.entityManager!.getTieFighters()[0];
    tf.position.set(0, 0, -50);
    const input = { x: 0, y: 0, isFiring: true };

    const initialScore = state.score;
    strategy.update(0.01, input, camera);

    expect(tf.isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });
});

describe('TrenchCombatStrategy', () => {
  let camera: THREE.Camera;
  let strategy: TrenchCombatStrategy;

  beforeEach(() => {
    const scene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    camera = new THREE.PerspectiveCamera();
    camera.updateMatrixWorld();
    strategy = new TrenchCombatStrategy();
    vi.clearAllMocks();
  });

  it('spawns a torpedo when firing and over port', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    // Position player and input to hit the port
    const { catwalkEndZ, exhaustPortZOffset } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    
    state.player!.position.set(0, 0, portZ + 10); // Close enough
    const input = { x: 0, y: 0, isFiring: true };
    
    // Mock checkAim to return true
    vi.mock('./collision', async (importOriginal) => {
      const actual = await importOriginal<typeof import('./collision')>();
      return {
        ...actual,
        checkAim: vi.fn().mockReturnValue(true),
      };
    });

    strategy.update(0.01, input, camera);

    expect(StateModule.spawnTorpedo).toHaveBeenCalled();
    expect(state.hasFiredTorpedo).toBe(true);
  });

  it('does not fire torpedo when NOT over exhaust port', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    // Position player far from port
    state.player!.position.set(0, 0, 0); 
    const input = { x: 0, y: 0, isFiring: true };

    strategy.update(0.01, input, camera);

    expect(StateModule.spawnTorpedo).not.toHaveBeenCalled();
  });
});
