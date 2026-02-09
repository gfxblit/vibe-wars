import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { CombatSystem } from './CombatSystem';
import { state, initGame } from './state';
import * as StateModule from './state';

vi.mock('./state', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./state')>();
  return {
    ...actual,
    spawnLasers: vi.fn(actual.spawnLasers),
    spawnTorpedo: vi.fn(actual.spawnTorpedo),
  };
});

describe('CombatSystem', () => {
  let hudScene: THREE.Scene;
  let camera: THREE.Camera;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    const scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    camera = new THREE.PerspectiveCamera();
    camera.updateMatrixWorld();
    combatSystem = new CombatSystem(camera);
    vi.clearAllMocks();
  });

  it('spawns lasers when firing and cooldown is 0', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    expect(StateModule.spawnLasers).toHaveBeenCalled();
    expect(state.entityManager!.getLasers().length).toBeGreaterThanOrEqual(2);
  });

  it('respects firing cooldown using spy', () => {
    const input = { x: 0, y: 0, isFiring: true };

    // First shot
    combatSystem.update(0.01, input);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    // Should not fire again immediately
    combatSystem.update(0.01, input);
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    // Wait for cooldown (GameConfig.laser.cooldown is 0.15)
    combatSystem.update(0.1, input); // total elapsed since first shot: 0.11. Cooldown remaining: 0.04
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(1);

    combatSystem.update(0.05, input); // total elapsed: 0.16. Should fire.
    expect(StateModule.spawnLasers).toHaveBeenCalledTimes(2);
  });

  it('updates and removes expired lasers', () => {
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    const initialCount = state.entityManager!.getLasers().length;
    expect(initialCount).toBeGreaterThan(0);

    // Update via EntityManager to expire lasers
    state.entityManager!.update(2.1, new THREE.Vector3(), new THREE.Quaternion(), true, camera, 100, () => { });

    expect(state.entityManager!.getLasers().length).toBe(0);
    expect(hudScene.children.length).toBe(0);
  });

  it('detects hits and updates score', () => {
    // We need a TIE fighter in front of the camera
    const tf = state.entityManager!.getTieFighters()[0];
    tf.position.set(0, 0, -50);

    // input pointing directly at it (0,0 in NDC)
    const input = { x: 0, y: 0, isFiring: true };

    const initialScore = state.score;
    combatSystem.update(0.01, input);

    expect(tf.isExploded).toBe(true);
    expect(state.score).toBeGreaterThan(initialScore);
  });

  it('increments kills when a TIE fighter is hit', () => {
    const tf = state.entityManager!.getTieFighters()[0];
    tf.position.set(0, 0, -50);
    const input = { x: 0, y: 0, isFiring: true };

    const initialKills = state.kills;
    combatSystem.update(0.01, input);

    expect(tf.isExploded).toBe(true);
    expect(state.kills).toBe(initialKills + 1);
  });

  it('spawns a torpedo when firing and over port in TRENCH stage', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(true);
    
    const input = { x: 0, y: 0, isFiring: true };

    combatSystem.update(0.01, input);

    expect(StateModule.spawnTorpedo).toHaveBeenCalled();
    expect(state.stage).toBe('TRENCH'); // Should still be in TRENCH until torpedo hits
  });

  it('does not fire torpedo when firing but NOT over exhaust port', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(false);

    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    expect(StateModule.spawnTorpedo).not.toHaveBeenCalled();
  });

  it('only fires one torpedo per trench stage', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(true);

    const input = { x: 0, y: 0, isFiring: true };
    
    combatSystem.update(0.01, input);
    expect(StateModule.spawnTorpedo).toHaveBeenCalledTimes(1);

    combatSystem.update(0.01, input);
    expect(StateModule.spawnTorpedo).toHaveBeenCalledTimes(1);
  });

  it('resets torpedo quota when resetting TRENCH stage', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(true);

    const input = { x: 0, y: 0, isFiring: true };
    
    combatSystem.update(0.01, input);
    expect(StateModule.spawnTorpedo).toHaveBeenCalledTimes(1);

    state.stageManager!.reset();
    
    combatSystem.update(0.01, input);
    expect(StateModule.spawnTorpedo).toHaveBeenCalledTimes(2);
  });

  it('launches torpedo towards aim point when auto-firing', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(true);
    
    // Reset camera orientation
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();
    
    // Aim to the right
    const input = { x: 0.5, y: 0, isFiring: true };
    combatSystem.update(0.1, input);

    expect(StateModule.spawnTorpedo).toHaveBeenCalled();
    const velocity = (StateModule.spawnTorpedo as any).mock.calls[0][1];
    expect(velocity.x).toBeGreaterThan(0);
  });

  it('detects turret hits in TRENCH stage', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    
    // Clear TIE fighters to avoid interference
    state.entityManager!.clear();

    // Re-register turrets since we cleared
    state.stageManager!.reset();

    const targets = state.entityManager!.getTargets();
    const turret = targets.find(t => t.getScore() === 200);
    expect(turret).toBeDefined();

    const turretPos = turret!.position.clone();

    // Position player and camera to look at the turret
    state.player!.position.set(turretPos.x, turretPos.y, turretPos.z + 50);
    camera.position.copy(state.player!.position);
    camera.lookAt(turretPos);
    camera.updateMatrixWorld();

    const input = { x: 0, y: 0, isFiring: true };
    const initialScore = state.score;
    const initialKills = state.kills;

    combatSystem.update(0.01, input);

    expect(turret!.isExploded).toBe(true);
    expect(state.score).toBe(initialScore + 200);
    expect(state.kills).toBe(initialKills + 1);
  });
});
