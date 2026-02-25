import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Trench } from './Trench';
import { GameConfig } from '../config';

describe('Trench Entity', () => {
  let trench: Trench;

  beforeEach(() => {
    trench = new Trench(1);
  });

  it('should be created successfully', () => {
    expect(trench).toBeDefined();
    expect(trench.mesh).toBeDefined();
  });

  it('should detect collision with obstacles', () => {
    const { catwalkStartZ, catwalkCollisionThreshold, catwalkYOffset, catwalkHeightThreshold } = GameConfig.stages.trench;
    
    // First obstacle at catwalkStartZ (-500)
    // New logic: index = 0, Y = catwalkYOffset (20).
    const obstacleZ = catwalkStartZ;
    const obstacleY = catwalkYOffset;

    // Direct hit
    const hitPos = new THREE.Vector3(0, obstacleY, obstacleZ);
    expect(trench.checkObstacleCollision(hitPos)).toBe(obstacleZ);

    // Hit within threshold
    const nearHitPos = new THREE.Vector3(0, obstacleY + catwalkHeightThreshold - 1, obstacleZ + catwalkCollisionThreshold - 1);
    expect(trench.checkObstacleCollision(nearHitPos)).toBe(obstacleZ);
  });

  it('should not report collision when missing obstacles', () => {
    const { catwalkStartZ, catwalkYOffset } = GameConfig.stages.trench;
    
    // First obstacle at catwalkStartZ (-500), Y = 20.
    const obstacleZ = catwalkStartZ;
    
    // Miss by Z (safely between obstacles)
    const missZ = new THREE.Vector3(0, catwalkYOffset, obstacleZ - 100);
    expect(trench.checkObstacleCollision(missZ)).toBeNull();

    // Miss by Y (flying under high obstacle)
    const missY = new THREE.Vector3(0, -catwalkYOffset, obstacleZ);
    expect(trench.checkObstacleCollision(missY)).toBeNull();
  });

  it('should detect collision with exhaust port', () => {
    const { catwalkEndZ, exhaustPortZOffset, height: trenchHeight } = GameConfig.stages.trench;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    
    const hitPos = new THREE.Vector3(0, portY, portZ);
    expect(trench.checkPortCollision(hitPos)).toBe(true);

    const missPos = new THREE.Vector3(0, portY + 100, portZ);
    expect(trench.checkPortCollision(missPos)).toBe(false);
  });

  it('should have turrets', () => {
    expect(trench.getTurrets().length).toBeGreaterThan(0);
  });

  it('should scale density with wave count and maintain navigability', () => {
    // Wave 1: base spacing (500)
    const trenchW1 = new Trench(1);
    const catwalksW1 = trenchW1.mesh.children.filter(c => c.name === 'catwalk');
    const turretsW1 = trenchW1.getTurrets();

    // Wave 10: multiplier 2.8, spacing 500 / 2.8 ~= 178
    const trenchW10 = new Trench(10);
    const catwalksW10 = trenchW10.mesh.children.filter(c => c.name === 'catwalk');
    const turretsW10 = trenchW10.getTurrets();

    expect(catwalksW10.length).toBeGreaterThan(catwalksW1.length * 2);
    expect(turretsW10.length).toBeGreaterThan(turretsW1.length * 2);

    // Navigability check: verify alternating high/low pattern
    // We can't easily check the private getCatwalkY, but we can check collision behavior
    const { catwalkYOffset } = GameConfig.stages.trench;
    
    // Check first 10 catwalks in Wave 10
    for (let i = 0; i < 10; i++) {
        const cw1 = catwalksW10[i];
        const cw2 = catwalksW10[i+1];
        if (cw1 && cw2) {
            expect(Math.abs(cw1.position.y)).toBeCloseTo(catwalkYOffset);
            expect(cw1.position.y).not.toBe(cw2.position.y);
        }
    }
  });
});
