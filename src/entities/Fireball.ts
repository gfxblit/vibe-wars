import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Fireball extends Entity {
  mesh: THREE.LineSegments;
  velocity: THREE.Vector3;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3) {
    super();
    const geometry = new THREE.OctahedronGeometry(GameConfig.fireball.meshSize, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: GameConfig.fireball.meshColor });
    
    this.mesh = new THREE.LineSegments(edges, material);
    this.mesh.position.copy(position);
    this.velocity = velocity;
  }

  get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  update(deltaTime: number): void {
    this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));
  }

  getNDCDelta(camera: THREE.Camera): THREE.Vector3 {
    const pos = this.position.clone();
    pos.project(camera);
    return pos;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach(m => m.dispose());
    } else {
      this.mesh.material.dispose();
    }
  }
}
