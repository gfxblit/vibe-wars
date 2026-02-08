import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class DeathStar extends Entity {
  public mesh: THREE.Mesh;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    // Death Star is a large wireframe sphere
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    // Position it far away
    this.mesh.position.set(0, 0, -GameConfig.stage.deathStarDistance);
  }

  update(deltaTime: number) {
    // Rotation for some visual interest
    this.mesh.rotation.y += deltaTime * 0.05;
  }

  dispose() {
    this.mesh.geometry.dispose();
    if (this.mesh.material instanceof THREE.Material) {
      this.mesh.material.dispose();
    }
  }
}
