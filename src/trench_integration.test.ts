import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { state, initGame, updateState, addKill } from './state';
import { GameConfig } from './config';

describe('Trench Integration', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
  });

  it('should transition from DOGFIGHT to SURFACE to TRENCH (Wave 2+)', () => {
    state.wave = 2;
    const camera = new THREE.PerspectiveCamera();
    expect(state.stage).toBe('DOGFIGHT');
    expect(state.kills).toBe(0);

    // 1. Reaching kill threshold
    for (let i = 0; i < GameConfig.stage.dogfightKillsThreshold; i++) {
      addKill();
    }
    
    // Trigger update to process transition
    updateState(0.1, camera);
    
    expect(state.stage).toBe('DOGFIGHT'); // Still in Dogfight (Approach Phase)
    // DeathStar should be in scene
    const deathStar = worldScene.getObjectByName('DeathStar');
    expect(deathStar).toBeTruthy();

    // 2. Reaching DeathStar (Approach Phase -> Surface Stage)
    expect(deathStar).toBeDefined();

    // Move player close to the DeathStar's surface
    const dsPos = deathStar!.position.clone();
    state.player!.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));
    
    updateState(0.1, camera);
    
    expect(state.stage).toBe('SURFACE'); // Now in Surface Stage

    // 3. Wait for Surface Stage Timer (Surface -> Trench)
    updateState(GameConfig.stage.surfaceDuration + 1.0, camera);

    expect(state.stage).toBe('TRENCH');
    // Trench should be in scene
    expect(worldScene.children.some(child => child instanceof THREE.Group)).toBe(true);

    // 4. Movement clamping in TRENCH
    const halfWidth = GameConfig.stage.trenchWidth / 2;
    state.player!.position.x = halfWidth + 50;
    
    updateState(0.1, camera);
    expect(state.player!.position.x).toBeLessThanOrEqual(halfWidth);

    // 5. Orientation clamping in TRENCH
    // In TRENCH mode, orientation should be clamped.
    // Give extreme input for several frames
    for (let i = 0; i < 10; i++) {
      updateState(0.1, camera, { x: 1, y: 1, isFiring: false });
    }
    
    const euler = new THREE.Euler().setFromQuaternion(state.player!.mesh.quaternion, 'YXZ');
    // Pitch (x) should be clamped to GameConfig.stage.trenchMaxPitch (30 degrees ~ 0.52 rad)
    expect(euler.x).toBeCloseTo(GameConfig.stage.trenchMaxPitch);
    // Yaw (y) should be clamped to -GameConfig.stage.trenchMaxYaw (30 degrees ~ 0.52 rad)
    expect(euler.y).toBeCloseTo(-GameConfig.stage.trenchMaxYaw);
    // Roll (z) should be exactly 0
    expect(euler.z).toBeCloseTo(0);
  });

  it('should transition directly from DOGFIGHT to TRENCH in Wave 1', () => {
    state.wave = 1;
    const camera = new THREE.PerspectiveCamera();
    
    // Reaching kill threshold
    for (let i = 0; i < GameConfig.stage.dogfightKillsThreshold; i++) {
      addKill();
    }
    updateState(0.1, camera);
    
    const deathStar = worldScene.getObjectByName('DeathStar');
    const dsPos = deathStar!.position.clone();
    state.player!.position.copy(dsPos).add(new THREE.Vector3(0, 0, GameConfig.stage.deathStarSize + GameConfig.stage.trenchTransitionDistance - 10));
    
    updateState(0.1, camera);
    
    expect(state.stage).toBe('TRENCH');
  });
});
