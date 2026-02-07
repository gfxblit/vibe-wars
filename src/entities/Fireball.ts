import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Fireball extends Entity {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  isExploded: boolean = false;
  private sparkleVelocities: THREE.Vector3[] = [];

  constructor(position: THREE.Vector3, velocity: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.velocity = velocity.clone();

    const material = new THREE.LineBasicMaterial({ color: GameConfig.fireball.meshColor });
    const size = GameConfig.fireball.sparkleSize;

    for (let i = 0; i < GameConfig.fireball.sparkleCount; i++) {
      // Create a small line segment
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, size, 0)
      ]);
      const sparkle = new THREE.Line(geometry, material);
      
      // Random orientation
      sparkle.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      this.mesh.add(sparkle);
      this.sparkleVelocities.push(new THREE.Vector3());
    }
  }

  get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    this.mesh.children.forEach((child, i) => {
      // Shards burst outward from the center
      const direction = new THREE.Vector3(0, 1, 0).applyEuler(child.rotation).normalize();
      this.sparkleVelocities[i].copy(direction).multiplyScalar(GameConfig.fireball.explosionVelocity);
    });
  }

  update(deltaTime: number): void {
    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    if (this.isExploded) {
      this.mesh.children.forEach((child, i) => {
        child.position.addScaledVector(this.sparkleVelocities[i], deltaTime);
      });
    }
  }

  projectToNDC(camera: THREE.Camera, target: THREE.Vector3): void {
    target.copy(this.position).project(camera);
  }

  dispose(): void {
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
        // Material is shared, so we only dispose it once if we were being careful, 
        // but since it's the same material object, disposing it multiple times 
        // usually doesn't hurt or we can just dispose it once.
      }
    });
    // Dispose the shared material once
    if (this.mesh.children.length > 0) {
      const firstChild = this.mesh.children[0] as THREE.Line;
      if (Array.isArray(firstChild.material)) {
        firstChild.material.forEach(m => m.dispose());
      } else {
        firstChild.material.dispose();
      }
    }
  }
}