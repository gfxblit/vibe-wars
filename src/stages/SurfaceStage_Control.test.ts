import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { SurfaceStage } from './SurfaceStage';
import { GameConfig } from '../config';
import { state, initGame, updateState } from '../state';

describe('SurfaceStage Control Stability', () => {
  let scene: THREE.Scene;
  let camera: THREE.Camera;

  beforeEach(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    
    // Mock window for initGame
    vi.stubGlobal('window', {
        innerWidth: 1024,
        innerHeight: 768,
        location: { search: '' }
    });
    
    initGame(scene, new THREE.Scene());
    state.stage = 'SURFACE';
    if (state.stageManager) {
        state.stageManager.reset();
    }
  });

  it('should restrict player pitch and yaw in Surface stage via updateState', () => {
    const player = state.player!;
    
    // In DOGFIGHT (default if not for our override), player can loop.
    // In SURFACE, we want them locked upright with max pitch/yaw.
    
    // 1. Test Pitch Limit
    // Try to pitch UP (input.y = 1) for a long time
    for (let i = 0; i < 10; i++) {
        updateState(1.0, camera, { x: 0, y: 1, isFiring: false });
    }
    
    const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
    
    // Use a small epsilon for floating point comparison
    const EPSILON = 1e-6;
    expect(Math.abs(euler.x)).toBeLessThanOrEqual(GameConfig.stage.surfaceMaxPitch + EPSILON);
    expect(Math.abs(euler.y)).toBeLessThanOrEqual(GameConfig.stage.surfaceMaxYaw + EPSILON);
  });

  it('should keep player upright (roll = 0) in Surface stage', () => {
    const player = state.player!;
    
    // Try to yaw and pitch simultaneously which might induce roll in relative mode
    for (let i = 0; i < 10; i++) {
        updateState(0.1, camera, { x: 1, y: 1, isFiring: false });
    }
    
    const euler = new THREE.Euler().setFromQuaternion(player.mesh.quaternion, 'YXZ');
    expect(euler.z).toBeCloseTo(0);
  });

  it('should clamp player position in Surface stage', () => {
    const player = state.player!;
    const stage = new SurfaceStage(scene);
    
    // Test X clamping
    player.position.set(2000, 0, 0);
    stage.update(0.1, player);
    expect(player.position.x).toBeLessThanOrEqual(GameConfig.stage.surfaceWidth / 2);
    
    player.position.set(-2000, 0, 0);
    stage.update(0.1, player);
    expect(player.position.x).toBeGreaterThanOrEqual(-GameConfig.stage.surfaceWidth / 2);
    
    // Test Y clamping (ceiling)
    player.position.set(0, 500, 0);
    stage.update(0.1, player);
    expect(player.position.y).toBeLessThanOrEqual(GameConfig.stage.surfaceMaxHeight);
    
    // Test Y clamping (floor)
    player.position.set(0, -100, 0);
    stage.update(0.1, player);
    expect(player.position.y).toBeGreaterThanOrEqual(GameConfig.stage.surfaceFloorY - GameConfig.stage.surfaceFloorClampBuffer);
  });

  it('should return towers from getTowers', () => {
    const stage = new SurfaceStage(scene);
    const towers = stage.getTowers();
    expect(Array.isArray(towers)).toBe(true);
  });

  it('should cleanup resources', () => {
    const stage = new SurfaceStage(scene);
    const removeSpy = vi.spyOn(scene, 'remove');
    stage.cleanup();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should handle floor collision', () => {
    const player = state.player!;
    const stage = new SurfaceStage(scene);
    const initialShields = state.shields;
    
    // Force a floor hit by setting position to floor Y
    player.position.y = GameConfig.stage.surfaceFloorY;
    stage.update(0.1, player);
    
    // It should bounce the player up
    expect(player.position.y).toBeGreaterThan(GameConfig.stage.surfaceFloorY);
    // It should take damage
    expect(state.shields).toBeLessThan(initialShields);
  });

  it('should handle end condition', () => {
    const player = state.player!;
    const stage = new SurfaceStage(scene);
    
    state.stage = 'SURFACE';
    
    // Update for longer than duration
    stage.update(GameConfig.stage.surfaceDuration + 1, player);
    
    // Should have transitioned to TRENCH
    expect(state.stage).toBe('TRENCH');
  });

  it('should handle tower collision', () => {
    const player = state.player!;
    const stage = new SurfaceStage(scene);
    const initialShields = state.shields;
    
    // We need to mock surface.checkCollisions to return a towerHit
    // Since surface is private, we can either use it as any or just let it happen if we can position correctly.
    // Let's use any for simplicity in this test.
    const towerMock = { isDestroyed: false };
    vi.spyOn((stage as any).surface, 'checkCollisions').mockReturnValue({ floorHit: false, towerHit: towerMock });
    
    stage.update(0.1, player);
    
    expect(state.shields).toBeLessThan(initialShields);
    expect(towerMock.isDestroyed).toBe(true);
  });
});
