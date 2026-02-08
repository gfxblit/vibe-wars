import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Trench } from './Trench';
import { GameConfig } from '../config';

describe('Trench Entity', () => {
  let trench: Trench;

  beforeEach(() => {
    trench = new Trench();
  });

  it('should be created successfully', () => {
    expect(trench).toBeDefined();
    expect(trench.mesh).toBeDefined();
  });

  it('should detect collision with obstacles', () => {
    const { catwalkStartZ, catwalkCollisionThreshold, catwalkYOffset, catwalkHeightThreshold } = GameConfig.stage;
    
    // First obstacle at catwalkStartZ (-500)
    // Height depends on logic: abs(-500) % 1000 = 500. So it's not 0. Y = -catwalkYOffset (-20).
    const obstacleZ = catwalkStartZ;
    const obstacleY = -catwalkYOffset;

    // Direct hit
    const hitPos = new THREE.Vector3(0, obstacleY, obstacleZ);
    expect(trench.checkObstacleCollision(hitPos)).toBe(obstacleZ);

    // Hit within threshold
    const nearHitPos = new THREE.Vector3(0, obstacleY + catwalkHeightThreshold - 1, obstacleZ + catwalkCollisionThreshold - 1);
    expect(trench.checkObstacleCollision(nearHitPos)).toBe(obstacleZ);
  });

  it('should not report collision when missing obstacles', () => {
    const { catwalkStartZ, catwalkYOffset } = GameConfig.stage;
    
    // First obstacle at catwalkStartZ (-500), Y = -20.
    const obstacleZ = catwalkStartZ;
    
    // Miss by Z (safely between obstacles)
    const missZ = new THREE.Vector3(0, -catwalkYOffset, obstacleZ - 100);
    expect(trench.checkObstacleCollision(missZ)).toBeNull();

    // Miss by Y (flying over low obstacle)
    const missY = new THREE.Vector3(0, catwalkYOffset, obstacleZ);
    expect(trench.checkObstacleCollision(missY)).toBeNull();
  });

  it('should detect collision with exhaust port', () => {
    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    
    const hitPos = new THREE.Vector3(0, portY, portZ);
    expect(trench.checkPortCollision(hitPos)).toBe(true);

    const missPos = new THREE.Vector3(0, portY + 100, portZ);
    expect(trench.checkPortCollision(missPos)).toBe(false);
  });
});
