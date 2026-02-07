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
    const freq = GameConfig.tieFighter.oscillationFrequency;
    const amp = GameConfig.tieFighter.oscillationAmplitude;

    // at t = 0.5, oscillation should be sin(0.5 * freq) * amp
    tieFighter.update(0.5, playerPosition, playerQuaternion);
    const expectedX = Math.sin(0.5 * freq) * amp;
    expect(tieFighter.position.x).toBeCloseTo(expectedX, 1);
  })

  test('should have a composite structure (body + 2 wings)', () => {
    // We expect the mesh (Group) to have 3 children: Body, Left Wing, Right Wing
    expect(tieFighter.mesh.children.length).toBe(3);
    
    // Check for Sphere body
    const body = tieFighter.mesh.children.find(c => (c as THREE.Mesh).geometry instanceof THREE.SphereGeometry);
    expect(body).toBeDefined();

    // Check for Plane wings
    const wings = tieFighter.mesh.children.filter(c => (c as THREE.Mesh).geometry instanceof THREE.PlaneGeometry);
    expect(wings.length).toBe(2);
  })

  test('explode() should set isExploded state', () => {
    expect(tieFighter.isExploded).toBe(false);
    tieFighter.explode();
    expect(tieFighter.isExploded).toBe(true);
  })

  test('update() should scatter pieces when exploded', () => {
    // Initial positions (relative to parent group)
    const piece1 = tieFighter.mesh.children[0];
    const initialPos = piece1.position.clone();

    tieFighter.explode();
    
    // Update a few times
    tieFighter.update(0.1, playerPosition, playerQuaternion);
    
    // Pieces should have moved relative to the group
    expect(piece1.position.equals(initialPos)).toBe(false);
  })
})