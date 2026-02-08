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

    const { trenchWidth, trenchHeight, trenchLength } = GameConfig.stage;
    const wallGeometry = new THREE.BoxGeometry(10, trenchHeight, trenchLength);
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
    });

    const halfWidth = trenchWidth / 2;
    const halfLength = trenchLength / 2;

    this.leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    this.leftWall.position.set(-halfWidth - 5, 0, -halfLength);
    this.mesh.add(this.leftWall);

    this.rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    this.rightWall.position.set(halfWidth + 5, 0, -halfLength);
    this.mesh.add(this.rightWall);

    const floorGeometry = new THREE.BoxGeometry(trenchWidth, 10, trenchLength);
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
    });

    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.floor.position.set(0, -trenchHeight / 2 - 5, -halfLength);
    this.mesh.add(this.floor);

    this.addObstacles();
  }

  private isValidCatwalkZ(z: number): boolean {
    const { catwalkStartZ, catwalkEndZ } = GameConfig.stage;
    // Corresponds to loop: for (let z = start; z > end; z -= spacing)
    // So z must be <= start and > end
    return z <= catwalkStartZ && z > catwalkEndZ;
  }

  private getCatwalkY(z: number): number {
    const { catwalkSpacing, catwalkYOffset } = GameConfig.stage;
    // Alternating height: some high, some low
    return (Math.abs(z) % (catwalkSpacing * 2) === 0) ? catwalkYOffset : -catwalkYOffset;
  }

  private addObstacles() {
    // Add catwalks using configuration
    const { catwalkStartZ, catwalkEndZ, catwalkSpacing, catwalkDepth, trenchWidth, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    
    const catwalkGeometry = new THREE.BoxGeometry(trenchWidth, 10, catwalkDepth);
    const catwalkMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });

    for (let z = catwalkStartZ; z > catwalkEndZ; z -= catwalkSpacing) {
      const catwalk = new THREE.Mesh(catwalkGeometry, catwalkMaterial);
      const y = this.getCatwalkY(z);
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
    // Place port just before the end of the trench visual
    port.position.set(0, -trenchHeight / 2 + 10, catwalkEndZ - exhaustPortZOffset); 
    this.mesh.add(port);
  }

  public checkObstacleCollision(position: THREE.Vector3): number | null {
    const { 
      catwalkStartZ, 
      catwalkEndZ, 
      catwalkSpacing, 
      catwalkCollisionThreshold, 
      catwalkHeightThreshold 
    } = GameConfig.stage;

    const pZ = position.z;
    const pY = position.y;

    // Optimization: Quick bounds check
    // We expand the range slightly to catch the collision volume of the first/last obstacles
    if (pZ > catwalkStartZ + catwalkCollisionThreshold || pZ < catwalkEndZ - catwalkCollisionThreshold) {
      return null;
    }

    // Find the nearest possible catwalk Z
    const catwalkZ = Math.round(pZ / catwalkSpacing) * catwalkSpacing;

    // Verify this Z corresponds to an actual generated catwalk
    if (!this.isValidCatwalkZ(catwalkZ)) {
      return null;
    }

    // Check depth (Z) collision
    if (Math.abs(pZ - catwalkZ) < catwalkCollisionThreshold) {
      // Check height (Y) collision
      const expectedY = this.getCatwalkY(catwalkZ);
      
      if (Math.abs(pY - expectedY) < catwalkHeightThreshold) {
        return catwalkZ;
      }
    }

    return null;
  }

  public checkPortCollision(position: THREE.Vector3): boolean {
    const { catwalkEndZ, exhaustPortZOffset, trenchHeight } = GameConfig.stage;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    const portX = 0;
    const portSize = 20;
    const halfSize = portSize / 2;

    return (
      Math.abs(position.x - portX) < halfSize + 5 && // Add some tolerance for the player's ship
      Math.abs(position.y - portY) < halfSize + 5 &&
      Math.abs(position.z - portZ) < halfSize + 5
    );
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
