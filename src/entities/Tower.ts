import * as THREE from 'three';
import { Entity, Targetable, FireballDebugContext } from './Entity';
import { GameConfig } from '../config';
import { state } from '../state';

export class Tower extends Entity implements Targetable {
    public mesh: THREE.Group;
    private collisionBox: THREE.Box3;
    private _isExploded: boolean = false;
    private topMesh!: THREE.Mesh;
    private fireCooldown: number = 0;
    private debris: { mesh: THREE.Mesh, velocity: THREE.Vector3 }[] = [];
    private baseMaterial: THREE.MeshBasicMaterial;
    private topMaterial: THREE.MeshBasicMaterial;
  
    // Targetable interface implementation
    public get isExploded(): boolean {
      return this._isExploded;
    }

    public get position(): THREE.Vector3 {
      return this.mesh.position;
    }

    public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
      this.mesh.updateWorldMatrix(true, false);
      return this.mesh.getWorldPosition(target);
    }

    public getTargetPositions(target: THREE.Vector3): THREE.Vector3[] {
      // Return both the base (represented by mesh position) and the top
      const basePos = this.getWorldPosition(target.clone());
      const topPos = this.getFirePosition(new THREE.Vector3());
      return [basePos, topPos];
    }

    public getFirePosition(target: THREE.Vector3): THREE.Vector3 {
      this.topMesh.updateWorldMatrix(true, false);
      return this.topMesh.getWorldPosition(target);
    }

    public getScore(): number {
      return GameConfig.stages.surface.towerPoints;
    }

    public getFireballSize(context?: FireballDebugContext): number {
      return context?.surfaceFireballSize ?? GameConfig.stages.surface.fireballSize;
    }

    public getFireballSpeed(context?: FireballDebugContext): number {
      const baseSpeed = context?.surfaceFireballSpeed ?? GameConfig.stages.surface.fireballSpeed;
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      return GameConfig.getScaledSpeed(baseSpeed, multiplier);
    }

    public getVelocity(_playerForward: THREE.Vector3, _playerSpeed: number): THREE.Vector3 {
      return new THREE.Vector3(0, 0, 0);
    }

    public explode(): void {
      if (this._isExploded) return;
      this._isExploded = true;
      state.audioManager?.playExplosion(this.position);
      const { towerExplosionColor, towerExplosionVelocity } = GameConfig.stages.surface;
      this.baseMaterial.color.setHex(towerExplosionColor);
      this.topMaterial.color.setHex(towerExplosionColor);

      this.debris.forEach((item) => {
        item.velocity.set(
          (Math.random() - 0.5) * towerExplosionVelocity,
          (Math.random() + 0.5) * towerExplosionVelocity, // Upward bias
          (Math.random() - 0.5) * towerExplosionVelocity
        );
      });
    }
  
    constructor(position: THREE.Vector3) {
      super();
      this.mesh = new THREE.Group();
      this.mesh.position.copy(position);
  
      // Initialize random cooldown so they don't all fire at once
      this.fireCooldown = Math.random() * GameConfig.fireball.fireRate;
  
      const { towerWidth, towerHeight, towerColor, towerTopColor } = GameConfig.stages.surface;
  
      // Split into Base and Top (80/20)
      const baseHeight = towerHeight * 0.8;
      const topHeight = towerHeight * 0.2;
  
      // Base
      const baseGeo = new THREE.BoxGeometry(towerWidth, baseHeight, towerWidth);
      this.baseMaterial = new THREE.MeshBasicMaterial({ 
        color: towerColor,
        wireframe: true 
      });
      const base = new THREE.Mesh(baseGeo, this.baseMaterial);
      base.name = 'debris';
      base.position.y = baseHeight / 2;
      this.mesh.add(base);
      this.debris.push({ mesh: base, velocity: new THREE.Vector3() });
  
      // Top
      const topGeo = new THREE.BoxGeometry(towerWidth * 0.8, topHeight, towerWidth * 0.8);
      this.topMaterial = new THREE.MeshBasicMaterial({ 
        color: towerTopColor,
        wireframe: true 
      });
      this.topMesh = new THREE.Mesh(topGeo, this.topMaterial);
      this.topMesh.name = 'debris';
      this.topMesh.position.y = baseHeight + topHeight / 2;
      this.mesh.add(this.topMesh);
      this.debris.push({ mesh: this.topMesh, velocity: new THREE.Vector3() });
  
      // Initial collision box calculation
      this.collisionBox = new THREE.Box3();
      this.updateCollisionBox();
    }

  update(deltaTime: number, playerPosition: THREE.Vector3, _playerQuaternion?: THREE.Quaternion, _playerSpeed?: number): THREE.Vector3 | null {
    if (this.isExploded) {
      const { towerDebrisRotationSpeed } = GameConfig.stages.surface;
      this.debris.forEach((item) => {
        item.mesh.position.addScaledVector(item.velocity, deltaTime);
        item.mesh.rotation.x += deltaTime * towerDebrisRotationSpeed;
        item.mesh.rotation.y += deltaTime * towerDebrisRotationSpeed;
      });
      return null;
    }

    this.fireCooldown -= deltaTime;
    if (this.fireCooldown <= 0) {
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      this.fireCooldown = GameConfig.getScaledInterval(GameConfig.fireball.fireRate, multiplier);
      // Aim at player from the top of the tower
      const firePos = this.getFirePosition(new THREE.Vector3());
      return new THREE.Vector3().subVectors(playerPosition, firePos).normalize();
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
      }
    });
    this.baseMaterial.dispose();
    this.topMaterial.dispose();
  }
}