import * as THREE from 'three';
import { describe, it, expect, beforeEach } from 'vitest';
import { Turret } from './Turret';
import { Fireball } from './Fireball';
import { state } from '../state';
import { GameConfig } from '../config';

describe('Turret and Fireball Size Debug', () => {
  const position = new THREE.Vector3(0, 0, -500);
  const velocity = new THREE.Vector3(0, 0, -100);

  beforeEach(() => {
    state.stage = 'TRENCH';
    (state as any).debugTurretSize = undefined;
    (state as any).debugFireballSize = undefined;
  });

  it('should use default turret size when no debug override is set', () => {
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    const size = GameConfig.turret.meshSize;
    expect(box.max.x - box.min.x).toBeCloseTo(size * 0.8);
  });

  it('should use debug turret size override when set', () => {
    (state as any).debugTurretSize = 25.0;
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    expect(box.max.x - box.min.x).toBeCloseTo(25.0 * 0.8);
  });

  it('should use default fireball size when no debug override is set', () => {
    const fireball = new Fireball(position, velocity);
    // Fireball uses sparkleSize for sparkles (which are children)
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    const size = GameConfig.fireball.sparkleSize;
    expect(sparkle.scale.x).toBeCloseTo(size);
  });

  it('should use debug fireball size override when set', () => {
    (state as any).debugFireballSize = 15.0;
    const fireball = new Fireball(position, velocity);
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    expect(sparkle.scale.x).toBeCloseTo(15.0);
  });

  it('should NOT use debug turret size override when stage is not TRENCH', () => {
    state.stage = 'DOGFIGHT';
    (state as any).debugTurretSize = 25.0;
    const turret = new Turret(position);
    const baseMesh = turret.mesh.children[0] as THREE.Mesh;
    baseMesh.geometry.computeBoundingBox();
    const box = baseMesh.geometry.boundingBox!;
    const size = GameConfig.turret.meshSize;
    expect(box.max.x - box.min.x).toBeCloseTo(size * 0.8);
  });

  it('should NOT use debug fireball size override when stage is not TRENCH', () => {
    state.stage = 'DOGFIGHT';
    (state as any).debugFireballSize = 15.0;
    const fireball = new Fireball(position, velocity);
    const sparkle = fireball.mesh.children[0] as THREE.Sprite;
    const size = GameConfig.fireball.sparkleSize;
    expect(sparkle.scale.x).toBeCloseTo(size);
  });
});
