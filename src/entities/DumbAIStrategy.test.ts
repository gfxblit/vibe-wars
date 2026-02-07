import { expect, test, describe, beforeEach } from 'vitest'
import * as THREE from 'three'
import { DumbAIStrategy } from './DumbAIStrategy'
import { GameConfig } from '../config'

describe('DumbAIStrategy', () => {
  let strategy: DumbAIStrategy;
  let entityPosition: THREE.Vector3;
  let entityQuaternion: THREE.Quaternion;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;

  beforeEach(() => {
    strategy = new DumbAIStrategy();
    entityPosition = new THREE.Vector3();
    entityQuaternion = new THREE.Quaternion();
    playerPosition = new THREE.Vector3();
    playerQuaternion = new THREE.Quaternion();
  })

  test('update should move entity ahead of player', () => {
    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    const expectedZ = -GameConfig.tieFighter.distance;
    expect(entityPosition.z).toBeCloseTo(expectedZ, 1);
  })

  test('update should include horizontal oscillation', () => {
    const deltaTime = 0.5;
    strategy.update(deltaTime, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    const freq = GameConfig.tieFighter.oscillationFrequency;
    const amp = GameConfig.tieFighter.oscillationAmplitude;
    const expectedX = Math.sin(deltaTime * freq) * amp;
    
    expect(entityPosition.x).toBeCloseTo(expectedX, 1);
  })

  test('update should align entity rotation with player', () => {
    playerQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
    strategy.update(0.1, entityPosition, entityQuaternion, playerPosition, playerQuaternion);
    
    expect(entityQuaternion.x).toBeCloseTo(playerQuaternion.x);
    expect(entityQuaternion.y).toBeCloseTo(playerQuaternion.y);
    expect(entityQuaternion.z).toBeCloseTo(playerQuaternion.z);
    expect(entityQuaternion.w).toBeCloseTo(playerQuaternion.w);
  })
})
