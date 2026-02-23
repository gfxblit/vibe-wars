import { expect, test, describe, beforeEach, vi } from 'vitest'
import * as THREE from 'three'
import { SmartAIStrategy } from './SmartAIStrategy'
import { GameConfig } from '../config'
import { RandomGenerator } from './AIStrategy'

import { state } from '../state'

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
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    // with 0.5, random offset is 0.
    expect(entityPosition.z).toBeCloseTo(GameConfig.tieFighter.smartAI.spawnDistanceBehind + 0.5 * GameConfig.tieFighter.smartAI.spawnRandomZ, 1);

    const initialZ = entityPosition.z;
    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    expect(entityPosition.z).toBeLessThan(initialZ);
  })

  test('should use provided RNG for initialization', () => {
    mockRng.random = vi.fn()
      .mockReturnValueOnce(0.1) // arcDirection X: 0.1 > 0.5 ? false -> -1
      .mockReturnValueOnce(0.9) // arcDirection Y: 0.9 > 0.5 ? true -> 1
      .mockReturnValueOnce(0.0) // stageOffset X: 0
      .mockReturnValueOnce(0.0) // stageOffset Y: 0
      .mockReturnValueOnce(0.5) // initialZOffset random: 0.5
      .mockReturnValueOnce(0.6) // offset X random: 0.6
      .mockReturnValueOnce(0.5); // offset Y random: 0.5

    const rngStrategy = new SmartAIStrategy(mockRng);
    // elapsedTime will be 0 on first update
    rngStrategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);

    // offset.x = (0.6 - 0.5) * spawnRandomX = 0.1 * 40 = 4
    // xOsc = sin(0) = 0
    // xArc = sin(0 + 0) = 0
    // entityPosition.x = offset.x + xArc + xOsc = 4
    expect(entityPosition.x).toBeCloseTo(4, 0.1);
  })

  test('should face direction of motion', () => {
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    const pos1 = entityPosition.clone();

    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
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

    // Initial Z is around 100. relativeSpeed is smartAI.speed (180) - playerSpeed (100) = 80.
    // Takes about 1.25s to reach Z=0.

    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);

    // Check lateral movement near Z=0 and during shadow stage
    let maxLateralMovement = 0;
    for (let t = 0; t < 5; t += 0.1) {
      strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
      const lateralDist = Math.sqrt(entityPosition.x * entityPosition.x + entityPosition.y * entityPosition.y);
      maxLateralMovement = Math.max(maxLateralMovement, lateralDist);
    }

    // It should have significant lateral movement at some point
    expect(maxLateralMovement).toBeGreaterThan(GameConfig.tieFighter.smartAI.arcAmplitude * 0.4);
  })

  test('should maintain constant distance during shadowing stage', () => {
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);

    // Fast forward to shadowing stage
    // relative speed is 80, distance to -50 is 150-200. 
    // Braking zone is 60. 
    // We need enough time to decelerate smoothly to the 0.1 threshold.
    for (let t = 0; t < 8.0; t += 0.1) {
      strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    }

    // Now it should be shadowing at -50
    expect(entityPosition.z).toBeCloseTo(GameConfig.tieFighter.smartAI.shadowDistance, 0);

    const zBefore = entityPosition.z;
    strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    // Should still be at -50
    expect(entityPosition.z).toBeCloseTo(zBefore, 0.1);

    // Wait for shadow duration (3s)
    for (let t = 0; t < 3.0; t += 0.5) {
      strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    }

    // Now it should be escaping
    const zShadow = entityPosition.z;
    strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    expect(entityPosition.z).toBeLessThan(zShadow);
  })

  test('should use far-away escape trajectory when RNG allows', () => {
    // We need to trigger SHADOW -> ESCAPE transition with random > 0.5
    strategy.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    
    // Fast forward to SHADOW
    for (let t = 0; t < 8.0; t += 0.1) {
      strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    }
    
    // In SHADOW stage. Wait for duration.
    // Transition happens when shadowTimer >= shadowDuration.
    for (let t = 0; t < GameConfig.tieFighter.smartAI.shadowDuration - 0.5; t += 0.5) {
      strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    }

    // Next update will transition to ESCAPE. Mock RNG to return 0.6 for isFarAway.
    mockRng.random = vi.fn().mockReturnValue(0.6);
    strategy.update(0.5, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
    
    // Should be in ESCAPE stage and moving according to escapeFarZ
    // We can't easily check the private escapeDirection, but we can check movement.
        const zBefore = entityPosition.z;
        strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
        expect(entityPosition.z).toBeLessThan(zBefore);
      })
    
        test('speed should scale with wave count', () => {
          // Wave 1: base speed (180). relativeSpeed = 180 - 100 = 80
      
        state.wave = 1;
        let strategyW1 = new SmartAIStrategy(mockRng);
        strategyW1.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
        const z1 = entityPosition.z;
        strategyW1.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
        const dz1 = z1 - entityPosition.z; // should be 80 * 0.1 = 8
    
        // Wave 10: multiplier 2.8. speed = 180 * 2.8 = 504. relativeSpeed = 504 - 100 = 404
        state.wave = 10;
        let strategyW10 = new SmartAIStrategy(mockRng);
        strategyW10.update(0, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
        const z10 = entityPosition.z;
        strategyW10.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion, GameConfig.player.baseForwardSpeed);
        const dz10 = z10 - entityPosition.z; // should be 404 * 0.1 = 40.4
    
        expect(dz10).toBeGreaterThan(dz1 * 2.0);
        expect(dz1).toBeCloseTo(8, 0.1);
        expect(dz10).toBeCloseTo(40.4, 0.1);
      });
    })
    