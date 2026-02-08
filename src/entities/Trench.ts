import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Trench extends Entity {
  public mesh: THREE.Group;
  private leftWall: THREE.Mesh;
  private rightWall: THREE.Mesh;
  private floor: THREE.Mesh;

  constructor() {
    super();
    this.mesh = new THREE.Group();

    const wallGeometry = new THREE.BoxGeometry(10, GameConfig.stage.trenchHeight, 5000);
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
    });

    const halfWidth = GameConfig.stage.trenchWidth / 2;

    this.leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    this.leftWall.position.set(-halfWidth - 5, 0, -2500);
    this.mesh.add(this.leftWall);

    this.rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    this.rightWall.position.set(halfWidth + 5, 0, -2500);
    this.mesh.add(this.rightWall);

    const floorGeometry = new THREE.BoxGeometry(GameConfig.stage.trenchWidth, 10, 5000);
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
    });

    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.floor.position.set(0, -GameConfig.stage.trenchHeight / 2 - 5, -2500);
    this.mesh.add(this.floor);
  }

  update(_deltaTime: number) {
    // Keep the trench centered on Z but far enough to cover the run
    // For now it's static at origin, we might want to move it with the player or tile it.
    // The plan says "procedural valley of walls".
  }

  dispose() {
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
