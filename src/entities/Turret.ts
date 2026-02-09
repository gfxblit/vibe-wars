import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Turret extends Entity {
  public readonly mesh: THREE.Group;
  private fireCooldown: number = Math.random() * GameConfig.turret.fireRate;
  public isExploded: boolean = false;
  private pieceVelocities: THREE.Vector3[] = [];

  constructor(position: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);

    const size = GameConfig.turret.meshSize;
    const material = new THREE.MeshBasicMaterial({
      color: GameConfig.turret.meshColor,
      wireframe: true
    });

    // Base (Cylinder)
    const baseGeo = new THREE.CylinderGeometry(size / 2, size / 1.5, size / 2, 8);
    const base = new THREE.Mesh(baseGeo, material);
    base.rotation.x = Math.PI / 2; // Orient along Z initially if we want, but actually it's a base
    // Actually, let's just make it a simple box for now to represent a turret
    const boxGeo = new THREE.BoxGeometry(size, size, size);
    const box = new THREE.Mesh(boxGeo, material);
    this.mesh.add(box);

    // Barrel
    const barrelGeo = new THREE.CylinderGeometry(size / 10, size / 10, size, 8);
    const barrel = new THREE.Mesh(barrelGeo, material);
    barrel.position.z = size / 2;
    barrel.rotation.x = Math.PI / 2;
    this.mesh.add(barrel);
  }

  public explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    // Generate random velocities for each piece
    this.mesh.children.forEach(() => {
      const vel = 20; // Explosion velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * vel,
        Math.random() * vel, // Mostly upwards
        (Math.random() - 0.5) * vel
      );
      this.pieceVelocities.push(velocity);
    });
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3): THREE.Vector3 | null {
    if (this.isExploded) {
      // Move pieces
      this.mesh.children.forEach((child, index) => {
        if (this.pieceVelocities[index]) {
          child.position.addScaledVector(this.pieceVelocities[index], deltaTime);
          child.rotation.x += deltaTime * 2;
          child.rotation.y += deltaTime * 2;
        }
      });
      return null;
    }

    this.fireCooldown -= deltaTime;

    // Aim at player
    this.mesh.lookAt(playerPosition);

    const dist = this.mesh.position.distanceTo(playerPosition);
    if (dist < GameConfig.turret.range && this.fireCooldown <= 0) {
      this.fireCooldown = GameConfig.turret.fireRate;
      // Return direction towards player
      return new THREE.Vector3().subVectors(playerPosition, this.mesh.position).normalize();
    }

    return null;
  }

  public dispose(): void {
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  }
}
