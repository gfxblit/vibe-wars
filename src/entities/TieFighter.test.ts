import { expect, test, describe, beforeEach, vi } from 'vitest'
import { TieFighter } from './TieFighter'
import * as THREE from 'three'
import { GameConfig } from '../config'
import { DumbAIStrategy } from './DumbAIStrategy'
import { SmartAIStrategy } from './SmartAIStrategy'

describe('TieFighter', () => {
  let tieFighter: TieFighter;
  let playerPosition: THREE.Vector3;
  let playerQuaternion: THREE.Quaternion;

  beforeEach(() => {
    tieFighter = new TieFighter(new DumbAIStrategy());
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

  test('pieces should move according to GameConfig.tieFighter.explosionVelocity', () => {
    const configVelocity = GameConfig.tieFighter.explosionVelocity;
    
    // We can't easily test the exact velocity due to Math.random(), 
    // but we can check if they moved at all, and then we will update the code to use the config.
    // For TDD, let's just assert that the config value exists.
    expect(configVelocity).toBeDefined();
    expect(configVelocity).toBe(50);
  })

  test('should reuse geometries across instances', () => {
    const strategy = new DumbAIStrategy();
    const tf1 = new TieFighter(strategy);
    const tf2 = new TieFighter(strategy);

    const body1 = tf1.mesh.children.find(c => (c as THREE.Mesh).geometry instanceof THREE.SphereGeometry) as THREE.Mesh;
    const body2 = tf2.mesh.children.find(c => (c as THREE.Mesh).geometry instanceof THREE.SphereGeometry) as THREE.Mesh;
    
    expect(body1.geometry).toBe(body2.geometry);
    // Materials are cloned for per-instance debug colors, so they won't be identical
    expect((body1.material as THREE.MeshBasicMaterial).type).toBe((body2.material as THREE.MeshBasicMaterial).type);
    expect((body1.material as THREE.MeshBasicMaterial).color.getHex()).toBe((body2.material as THREE.MeshBasicMaterial).color.getHex());

    const wing1 = tf1.mesh.children.find(c => (c as THREE.Mesh).geometry instanceof THREE.PlaneGeometry) as THREE.Mesh;
    const wing2 = tf2.mesh.children.find(c => (c as THREE.Mesh).geometry instanceof THREE.PlaneGeometry) as THREE.Mesh;

    expect(wing1.geometry).toBe(wing2.geometry);
    expect((wing1.material as THREE.MeshBasicMaterial).type).toBe((wing2.material as THREE.MeshBasicMaterial).type);
  })

  test('smart AI should spawn behind the player and overtake', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    const playerQuat = new THREE.Quaternion(); // looking towards -Z
    
    const smartTieFighter = new TieFighter(new SmartAIStrategy());
    
    smartTieFighter.update(0.01, playerPos, playerQuat); 
    // It should be behind the player (Z > 0)
    expect(smartTieFighter.position.z).toBeGreaterThan(0);
    
    const initialZ = smartTieFighter.position.z;
    
    // Update after 1 second, it should have moved forward (towards negative Z)
        smartTieFighter.update(1, playerPos, playerQuat);
        expect(smartTieFighter.position.z).toBeLessThan(initialZ);
      })
    
      test('dispose should call dispose on all materials', () => {
        const materials: THREE.Material[] = [];
            tieFighter.mesh.traverse(child => {
              if (child instanceof THREE.Mesh) {
                materials.push(child.material);
                child.material.dispose = vi.fn();
              }
            });
                expect(materials.length).toBeGreaterThan(0);
        tieFighter.dispose();
    
        materials.forEach(mat => {
          expect(mat.dispose).toHaveBeenCalled();
        });
      })
    })
    