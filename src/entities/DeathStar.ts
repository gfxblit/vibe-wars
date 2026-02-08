import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class DeathStar extends Entity {
  public mesh: THREE.Mesh;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor(position: THREE.Vector3) {
    super();
    // Death Star is a large wireframe sphere
    const geometry = new THREE.SphereGeometry(GameConfig.stage.deathStarSize, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: GameConfig.stage.deathStarColor,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
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
