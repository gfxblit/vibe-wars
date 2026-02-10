import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Tower extends Entity {
  public mesh: THREE.Group;
  private collisionBox: THREE.Box3;
  public isDestroyed: boolean = false;

  constructor(position: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);

    const { towerWidth, towerHeight, towerColor } = GameConfig.stage;

    // Tower Body
    const geometry = new THREE.BoxGeometry(towerWidth, towerHeight, towerWidth);
    const material = new THREE.MeshBasicMaterial({ 
      color: towerColor,
      wireframe: true 
    });
    const body = new THREE.Mesh(geometry, material);
    // Pivot at bottom so position.y is the base
    body.position.y = towerHeight / 2;
    this.mesh.add(body);

    // Initial collision box calculation
    this.collisionBox = new THREE.Box3();
    this.updateCollisionBox();
  }

  update(_deltaTime: number): void {
    // Towers are static in the world, but we might want to animate them later
  }

  private updateCollisionBox(): void {
    this.collisionBox.setFromObject(this.mesh);
  }

  checkCollision(playerBox: THREE.Box3): boolean {
    if (this.isDestroyed) return false;
    // We assume the tower doesn't move, so box is valid. 
    // If we implemented moving towers, we'd need to updateCollisionBox() here or in update().
    return this.collisionBox.intersectsBox(playerBox);
  }

  dispose(): void {
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
