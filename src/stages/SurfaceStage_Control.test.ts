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
    // If unrestricted, it would be around 10 * turnSpeedPitch (~21 radians)
    // We expect it to be capped at some value, e.g., Math.PI / 4
    
    // For now, it's UNRESTRICTED, so this test should FAIL if we assert it's restricted.
    expect(Math.abs(euler.x)).toBeLessThanOrEqual(Math.PI / 3); // Capped at 60 deg for example
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
  });
});
