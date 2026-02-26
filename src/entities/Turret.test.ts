import * as THREE from 'three';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Turret } from './Turret';
import { state } from '../state';

describe('Turret Entity', () => {
  let turret: Turret;
  const initialPosition = new THREE.Vector3(0, 0, -500);

  beforeEach(() => {
    state.debugTurretBloom = false;
    turret = new Turret(initialPosition);
  });

  it('should initialize with correct position and mesh', () => {
    expect(turret.mesh.position.equals(initialPosition)).toBe(true);
    expect(turret.position.equals(initialPosition)).toBe(true);
    expect(turret.mesh.children.length).toBeGreaterThan(0);
  });

  it('should return a direction when firing', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).not.toBeNull();
    if (fireDir) {
      const turretPos = new THREE.Vector3();
      turret.getWorldPosition(turretPos);
      const expectedDir = new THREE.Vector3().subVectors(playerPos, turretPos).normalize();
      expect(fireDir.distanceTo(expectedDir)).toBeLessThan(0.001);
    }
  });

  it('should obey fire rate', () => {
    const playerPos = new THREE.Vector3(0, 0, 0);
    // Force cooldown to 0
    (turret as any).fireCooldown = 0;
    
    let fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).not.toBeNull();
    
    // Immediately updating again should not fire
    fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).toBeNull();
  });

  it('should not fire if player is out of range', () => {
    const playerPos = new THREE.Vector3(0, 0, 10000); // Very far away
    (turret as any).fireCooldown = 0;
    
    const fireDir = turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    expect(fireDir).toBeNull();
  });

  it('should aim at the player', () => {
    const playerPos = new THREE.Vector3(100, 100, 0);
    turret.update(0.1, playerPos, new THREE.Quaternion(), 0);
    
    // Turret should look at the player (roughly)
    // We check if the forward vector of the mesh points towards the player
    const turretForward = new THREE.Vector3(0, 0, 1).applyQuaternion(turret.mesh.quaternion);
    const turretPos = new THREE.Vector3();
    turret.getWorldPosition(turretPos);
    const toPlayer = new THREE.Vector3().subVectors(playerPos, turretPos).normalize();
    
    // Depending on implementation, it might look at player with +Z or -Z.
    // Let's assume +Z for now.
    expect(turretForward.dot(toPlayer)).toBeGreaterThan(0.9);
  });

  it('should change color to orange when exploded', () => {
    turret.explode();
    
    let found = false;
    turret.mesh.traverse(child => {
      if (child instanceof THREE.LineSegments && child.material instanceof THREE.LineBasicMaterial) {
        expect(child.material.color.getHex()).toBe(0xffa500); // Orange
        found = true;
      }
    });
    expect(found).toBe(true);

    // Calling explode again should not change anything
    turret.explode();
    expect(turret.isExploded).toBe(true);
  });

  it('should move pieces when updated after explosion', () => {
    turret.explode();
    
    // Store initial positions of children
    const initialPositions = turret.mesh.children.map(child => child.position.clone());
    const initialRotations = turret.mesh.children.map(child => child.rotation.clone());

    // Update the turret
    turret.update(1.0, new THREE.Vector3(), new THREE.Quaternion(), 0);

    // Verify at least one piece has moved or rotated
    let moved = false;
    let rotated = false;
    turret.mesh.children.forEach((child, index) => {
      if (!child.position.equals(initialPositions[index])) {
        moved = true;
      }
      if (!child.rotation.equals(initialRotations[index])) {
        rotated = true;
      }
    });

    expect(moved).toBe(true);
    expect(rotated).toBe(true);
  });

  it('should return correct score, velocity and fireball size', () => {
    expect(turret.getScore()).toBeGreaterThan(0);
    
    const playerForward = new THREE.Vector3(0, 0, -1);
    const playerSpeed = 100;
    const velocity = turret.getVelocity(playerForward, playerSpeed);
    expect(velocity.z).toBe(0);
    
    expect(turret.getFireballSize()).toBeGreaterThan(0);
  });

  it('should allow configuring fireball size and speed', () => {
    const customSize = 50.0;
    const customFireballSize = 100.0;
    const customFireballSpeed = 500.0;
    const t = new Turret(initialPosition, customSize, customFireballSize, customFireballSpeed);
    
    expect(t.getFireballSize()).toBe(customFireballSize);
    expect(t.getFireballSpeed()).toBe(customFireballSpeed);
  });

  it('should return multiple target positions', () => {
    const turret = new Turret(new THREE.Vector3(0, 0, 0), 10);
    const targets = turret.getTargetPositions(new THREE.Vector3());
    expect(targets.length).toBeGreaterThan(0);
    // At least the base position
    expect(targets[0].length()).toBe(0);
  });

  it('should dispose resources correctly', () => {
    const materialDisposeSpy = vi.spyOn((turret as any).material, 'dispose');
    
    // Create a spy for geometry dispose
    const geometries: THREE.BufferGeometry[] = [];
    turret.mesh.traverse(child => {
      if (child instanceof THREE.LineSegments) {
        geometries.push(child.geometry);
      }
    });
    expect(geometries.length).toBeGreaterThan(0);
    const geoSpies = geometries.map(geo => vi.spyOn(geo, 'dispose'));

    turret.dispose();

    expect(materialDisposeSpy).toHaveBeenCalled();
    geoSpies.forEach(spy => expect(spy).toHaveBeenCalled());
  });

  it('should scale fire rate and fireball speed with wave count', () => {
    // Wave 1: base fireRate (3.0s), fireballSpeed (relativeSpeed: 40)
    state.wave = 1;
    turret = new Turret(initialPosition);
    (turret as any).fireCooldown = 3.0;

    let fire = turret.update(2.9, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), 100);
    expect(fire).toBeNull();
    fire = turret.update(0.2, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), 100);
    expect(fire).not.toBeNull();
    // Cooldown should reset to 3.0 / 1.0 = 3.0
    expect((turret as any).fireCooldown).toBeCloseTo(3.0);
    expect(turret.getFireballSpeed()).toBe(40);

    // Wave 10: multiplier 2.8, fireRate 3.0 / 2.8 ~= 1.071s, fireballSpeed 40 * 2.8 = 112
    state.wave = 10;
    turret = new Turret(initialPosition);
    const scaledRate = 3.0 / 2.8;
    (turret as any).fireCooldown = scaledRate;

    fire = turret.update(scaledRate - 0.1, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), 100);
    expect(fire).toBeNull();
    fire = turret.update(0.2, new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), 100);
    expect(fire).not.toBeNull();
    expect((turret as any).fireCooldown).toBeCloseTo(scaledRate, 2);
    expect(turret.getFireballSpeed()).toBe(112);
  });

  it('should detect collision with player box', () => {
    const playerBox = new THREE.Box3(
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(1, 1, 1)
    );
    
    // Position turret to collide
    turret.mesh.position.set(0, 0, 0);
    
    // Check if checkCollision exists and works
    expect((turret as any).checkCollision(playerBox)).toBe(true);
    
    // Move turret away
    turret.mesh.position.set(100, 100, 100);
    expect((turret as any).checkCollision(playerBox)).toBe(false);

    // Exploded turret should not collide
    turret.mesh.position.set(0, 0, 0);
    turret.explode();
    expect((turret as any).checkCollision(playerBox)).toBe(false);
  });
});
