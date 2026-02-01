import * as THREE from 'three';
import { Entity } from './Entity';

export class Player extends Entity {
  public position: THREE.Vector3;
  public mesh: THREE.Mesh;

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green cube for now
    this.mesh = new THREE.Mesh(geometry, material);
    this.position = this.mesh.position;
    this.position.set(0, 0, 0);
  }
}
