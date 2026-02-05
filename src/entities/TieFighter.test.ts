import { expect, test, describe, beforeEach } from 'vitest'
import { TieFighter } from './TieFighter'
import * as THREE from 'three'
import { GameConfig } from '../config'

describe('TieFighter', () => {
  let tieFighter: TieFighter;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;

  beforeEach(() => {
    tieFighter = new TieFighter();
    playerPosition = new THREE.Vector3(0, 0, 0);
    playerQuaternion = new THREE.Quaternion();
  })

  test('should have a position and a mesh', () => {
    expect(tieFighter.position).toBeInstanceOf(THREE.Vector3);
    expect(tieFighter.mesh).toBeInstanceOf(THREE.Group);
  })

  test('update should move TieFighter ahead of the player', () => {
    tieFighter.update(0, playerPosition, playerQuaternion);
    
    const expectedZ = -GameConfig.tieFighter.distance;
    expect(tieFighter.position.z).toBeCloseTo(expectedZ, 1);
    expect(tieFighter.position.x).toBeCloseTo(0, 1);
  })

  test('update should follow player position', () => {
    playerPosition.set(10, 20, 30);
    tieFighter.update(0, playerPosition, playerQuaternion);
    
    const expectedZ = 30 - GameConfig.tieFighter.distance;
    expect(tieFighter.position.z).toBeCloseTo(expectedZ, 1);
    expect(tieFighter.position.x).toBeCloseTo(10, 1);
    expect(tieFighter.position.y).toBeCloseTo(20, 1);
  })

  test('update should follow player rotation', () => {
    playerQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    
    tieFighter.update(0, playerPosition, playerQuaternion);
    
    const expectedX = GameConfig.tieFighter.distance;
    expect(tieFighter.position.x).toBeCloseTo(expectedX, 1);
    expect(tieFighter.position.z).toBeCloseTo(0, 1);
  })

  test('update should oscillate horizontally', () => {
    tieFighter.update(0, playerPosition, playerQuaternion);
    const x0 = tieFighter.position.x;
    
    tieFighter.update(0.5, playerPosition, playerQuaternion);
    const x1 = tieFighter.position.x;
    
    expect(x1).not.toBe(x0);
  })
})
