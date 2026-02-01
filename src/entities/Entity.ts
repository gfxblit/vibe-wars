import * as THREE from 'three';

export class Entity {
  public mesh: THREE.Object3D;

  constructor() {
    this.mesh = new THREE.Group();
    console.log('Entity created');
  }

  update(_dt: number) {
    // To be overridden
  }
}
