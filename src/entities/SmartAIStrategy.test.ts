import { expect, test, describe, beforeEach, vi } from 'vitest'
import * as THREE from 'three'
import { SmartAIStrategy } from './SmartAIStrategy'
import { GameConfig } from '../config'
import { RandomGenerator } from './AIStrategy'

describe('SmartAIStrategy', () => {
  let strategy: SmartAIStrategy;
  let entityPosition: THREE.Vector3;
  let entityQuaternion: THREE.Quaternion;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;
  let mockRng: RandomGenerator;

  beforeEach(() => {
    mockRng = {
      random: vi.fn().mockReturnValue(0.5)
    };
    strategy = new SmartAIStrategy(mockRng);
    entityPosition = new THREE.Vector3();
    entityQuaternion = new THREE.Quaternion();
    playerPosition = new THREE.Vector3(0, 0, 0);
    playerQuaternion = new THREE.Quaternion();
  })

  test('should initialize behind player and move forward', () => {
    // First update initializes
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    // with 0.5, random offset is 0.
    expect(entityPosition.z).toBeCloseTo(GameConfig.tieFighter.spawnDistanceBehind + 0.5 * GameConfig.tieFighter.smartSpawnRandomZ, 1);

    const initialZ = entityPosition.z;
    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    expect(entityPosition.z).toBeLessThan(initialZ);
  })

  test('should use provided RNG for initialization', () => {
    mockRng.random = vi.fn()
      .mockReturnValueOnce(0.1) // arcDirection X: 0.1 > 0.5 ? false -> -1
      .mockReturnValueOnce(0.9) // arcDirection Y: 0.9 > 0.5 ? true -> 1
      .mockReturnValueOnce(0.0) // phaseOffset X: 0
      .mockReturnValueOnce(0.0) // phaseOffset Y: 0
      .mockReturnValueOnce(0.5) // initialZOffset random: 0.5
      .mockReturnValueOnce(0.6) // offset X random: 0.6
      .mockReturnValueOnce(0.5); // offset Y random: 0.5
      
    const rngStrategy = new SmartAIStrategy(mockRng);
    // elapsedTime will be 0 on first update
    rngStrategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    // offset.x = (0.6 - 0.5) * smartSpawnRandomX = 0.1 * 40 = 4
    // xOsc = sin(0) = 0
    // xArc = sin(0 + 0) = 0
    // entityPosition.x = offset.x + xArc + xOsc = 4
    expect(entityPosition.x).toBeCloseTo(4, 0.1);
  })

  test('should face direction of motion', () => {
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    const pos1 = entityPosition.clone();
    
    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    const pos2 = entityPosition.clone();
    
    const velocity = pos2.clone().sub(pos1).normalize();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(entityQuaternion);
    
    // Dot product of forward and velocity should be close to 1
    expect(forward.dot(velocity)).toBeGreaterThan(0.9);
  })

  test('should perform an arc when near the player', () => {
    // We need to simulate the entity passing Z=0
    // Manually setting offset is not possible because it's private.
    // But we can update until it reaches Z=0.
    
    // Initial Z is around 100. relativeSpeed is smartSpeed (180) - playerSpeed (100) = 80.
    // Takes about 1.25s to reach Z=0.
    
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    // Check lateral movement near Z=0 and during shadow phase
    let maxLateralMovement = 0;
    for (let t = 0; t < 5; t += 0.1) {
      strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
      const lateralDist = Math.sqrt(entityPosition.x * entityPosition.x + entityPosition.y * entityPosition.y);
      maxLateralMovement = Math.max(maxLateralMovement, lateralDist);
    }
    
    // It should have significant lateral movement at some point
    expect(maxLateralMovement).toBeGreaterThan(GameConfig.tieFighter.smartArcAmplitude * 0.4);
  })

  test('should maintain constant distance during shadowing phase', () => {
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    // Fast forward to shadowing phase
    // relative speed is 80, distance to -50 is 150-200. 
    // Braking zone is 60. 
    // We need enough time to decelerate smoothly to the 0.1 threshold.
    for (let t = 0; t < 8.0; t += 0.1) {
      strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    }
    
    // Now it should be shadowing at -50
    expect(entityPosition.z).toBeCloseTo(GameConfig.tieFighter.smartShadowDistance, 0);
    
    const zBefore = entityPosition.z;
    strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    // Should still be at -50
    expect(entityPosition.z).toBeCloseTo(zBefore, 0.1);
    
    // Wait for shadow duration (3s)
    for (let t = 0; t < 3.0; t += 0.5) {
      strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    }
    
    // Now it should be escaping
    const zShadow = entityPosition.z;
    strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    expect(entityPosition.z).toBeLessThan(zShadow);
  })
})
