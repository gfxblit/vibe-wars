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

    this.addObstacles();
  }

  private addObstacles() {
    // Add catwalks every 500 units
    const catwalkGeometry = new THREE.BoxGeometry(GameConfig.stage.trenchWidth, 10, 20);
    const catwalkMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });

    for (let z = -500; z > -4500; z -= 500) {
      const catwalk = new THREE.Mesh(catwalkGeometry, catwalkMaterial);
      // Alternating height: some high, some low
      const y = (Math.abs(z) % 1000 === 0) ? 20 : -20;
      catwalk.position.set(0, y, z);
      this.mesh.add(catwalk);
    }

    // Add Exhaust Port at the end
    const portGeometry = new THREE.BoxGeometry(20, 20, 20);
    const portMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const port = new THREE.Mesh(portGeometry, portMaterial);
    port.position.set(0, -GameConfig.stage.trenchHeight / 2 + 10, -4900);
    this.mesh.add(port);
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
