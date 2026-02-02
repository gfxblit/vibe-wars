import * as THREE from 'three';
import { Entity } from './Entity';

export class Player extends Entity {
  public readonly mesh: THREE.LineSegments;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green wireframe
    this.mesh = new THREE.LineSegments(edges, material);
    this.position.set(0, 0, 0);
  }
}
