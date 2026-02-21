import * as THREE from 'three';
import { Entity, Targetable } from './Entity';
import { GameConfig } from '../config';
import { state } from '../state';

export class Tower extends Entity implements Targetable {
    public mesh: THREE.Group;
    private collisionBox: THREE.Box3;
    private _isExploded: boolean = false;
    private topMesh!: THREE.Mesh;
    private fireCooldown: number = 0;
  
    // Targetable interface implementation
    public get isExploded(): boolean {
      return this._isExploded;
    }
  
    public set isExploded(value: boolean) {
      this._isExploded = value;
      if (this.topMesh) {
        this.topMesh.visible = !value;
      }
    }

    public get position(): THREE.Vector3 {
      return this.mesh.position;
    }

    public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
      this.mesh.updateWorldMatrix(true, false);
      return this.mesh.getWorldPosition(target);
    }

    public getScore(): number {
      return GameConfig.stages.surface.towerPoints;
    }

    public getFireballSize(): number {
      return state.debugSurfaceFireballSize ?? GameConfig.stages.surface.fireballSize ?? GameConfig.fireball.sparkleSize;
    }

    public getFireballSpeed(): number {
      return state.debugSurfaceFireballSpeed ?? GameConfig.stages.surface.fireballSpeed ?? GameConfig.fireball.relativeSpeed;
    }

    public explode(): void {
      this.isExploded = true;
    }
  
    constructor(position: THREE.Vector3) {
      super();
      this.mesh = new THREE.Group();
      this.mesh.position.copy(position);
  
      // Initialize random cooldown so they don't all fire at once
      this.fireCooldown = Math.random() * GameConfig.fireball.fireRate;
  
      const { towerWidth, towerHeight, towerColor } = GameConfig.stages.surface;
  
      // Split into Base and Top
      const baseHeight = towerHeight * 0.7;
      const topHeight = towerHeight * 0.3;
  
      // Base
      const baseGeo = new THREE.BoxGeometry(towerWidth, baseHeight, towerWidth);
      const material = new THREE.MeshBasicMaterial({ 
        color: towerColor,
        wireframe: true 
      });
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = baseHeight / 2;
      this.mesh.add(base);
  
      // Top
      const topGeo = new THREE.BoxGeometry(towerWidth * 0.8, topHeight, towerWidth * 0.8);
      this.topMesh = new THREE.Mesh(topGeo, material);
      this.topMesh.position.y = baseHeight + topHeight / 2;
      this.mesh.add(this.topMesh);
  
      // Initial collision box calculation
      this.collisionBox = new THREE.Box3();
      this.updateCollisionBox();
    }

  update(deltaTime: number, playerPosition: THREE.Vector3, _playerQuaternion?: THREE.Quaternion, _playerSpeed?: number): THREE.Vector3 | null {
    if (this.isExploded) return null;

    this.fireCooldown -= deltaTime;
    if (this.fireCooldown <= 0) {
      this.fireCooldown = GameConfig.fireball.fireRate;
      // Aim at player
      return new THREE.Vector3().subVectors(playerPosition, this.mesh.position).normalize();
    }
    return null;
  }

  private updateCollisionBox(): void {
    this.collisionBox.setFromObject(this.mesh);
  }

  checkCollision(playerBox: THREE.Box3): boolean {
    if (this.isExploded) return false;
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
