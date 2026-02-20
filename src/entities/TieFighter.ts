import * as THREE from 'three';
import { Entity, Targetable } from './Entity';
import { GameConfig } from '../config';
import { AIStrategy } from './AIStrategy';
import { state } from '../state';

export class TieFighter extends Entity implements Targetable {
  public readonly mesh: THREE.Group;
  private strategy: AIStrategy;

  public isExploded: boolean = false;
  private pieceVelocities: THREE.Vector3[] = [];
  private baseSize: number;

  private static material: THREE.MeshBasicMaterial;
  private static bodyGeo: THREE.SphereGeometry;
  private static wingGeo: THREE.PlaneGeometry;

  private fireCooldown: number = Math.random() * GameConfig.fireball.fireRate;

  public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    this.mesh.updateWorldMatrix(true, false);
    return this.mesh.getWorldPosition(target);
  }

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor(strategy: AIStrategy, initialSize: number = GameConfig.tieFighter.meshSize) {
    super();
    this.mesh = new THREE.Group();
    this.strategy = strategy;
    this.baseSize = initialSize;

    // Use normalized size for geometry
    const size = 1.0;

    if (!TieFighter.material) {
      TieFighter.material = new THREE.MeshBasicMaterial({
        color: GameConfig.tieFighter.meshColor,
        wireframe: true
      });
    }

    if (!TieFighter.bodyGeo) {
      TieFighter.bodyGeo = new THREE.SphereGeometry(size / 3, 8, 8);
    }

    if (!TieFighter.wingGeo) {
      TieFighter.wingGeo = new THREE.PlaneGeometry(size, size);
    }

    // Body (Sphere)
    const bodyMaterial = TieFighter.material.clone();
    const body = new THREE.Mesh(TieFighter.bodyGeo, bodyMaterial);
    this.mesh.add(body);

    // Left Wing (Plane)
    const leftWing = new THREE.Mesh(TieFighter.wingGeo, bodyMaterial);
    leftWing.position.set(-size * 0.8, 0, 0);
    leftWing.rotation.y = Math.PI / 2;
    this.mesh.add(leftWing);

    // Right Wing (Plane)
    const rightWing = new THREE.Mesh(TieFighter.wingGeo, bodyMaterial);
    rightWing.position.set(size * 0.8, 0, 0);
    rightWing.rotation.y = Math.PI / 2;
    this.mesh.add(rightWing);

    this.mesh.scale.setScalar(this.baseSize);
  }

  public explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    // Generate random velocities for each piece
    this.mesh.children.forEach(() => {
      const vel = GameConfig.tieFighter.explosionVelocity;
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * vel,
        (Math.random() - 0.5) * vel,
        (Math.random() - 0.5) * vel
      );
      this.pieceVelocities.push(velocity);
    });
  }

  public update(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    playerQuaternion: THREE.Quaternion,
    playerSpeed: number,
    overrideSize?: number,
    overrideColor?: number
  ): THREE.Vector3 | null {
    if (this.isExploded) {
      // Move pieces
      this.mesh.children.forEach((child, index) => {
        if (this.pieceVelocities[index]) {
          child.position.addScaledVector(this.pieceVelocities[index], deltaTime);
          child.rotation.x += deltaTime * 2;
          child.rotation.y += deltaTime * 2;
        }
      });
      return null;
    }

    // Apply size override
    const targetSize = overrideSize ?? this.baseSize;
    if (Math.abs(this.mesh.scale.x - targetSize) > 0.001) {
      this.mesh.scale.setScalar(targetSize);
    }

    this.fireCooldown -= deltaTime;
    this.strategy.update(deltaTime, this.mesh.position, this.mesh.quaternion, playerPosition, playerQuaternion, playerSpeed);

    // Apply color: Override > Strategy > Default
    let targetColor: number | undefined = overrideColor;

    if (targetColor === undefined && this.strategy.getColor) {
      targetColor = this.strategy.getColor(state.isModeColoring);
    }

    if (targetColor !== undefined) {
      this.mesh.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
           if (child.material.color.getHex() !== targetColor) {
             child.material.color.setHex(targetColor);
           }
        }
      });
    }

    if (this.fireCooldown <= 0) {
      this.fireCooldown = GameConfig.fireball.fireRate;
      // Return direction towards player
      return new THREE.Vector3().subVectors(playerPosition, this.position).normalize();
    }

    return null;
  }

  public getScore(): number {
    return GameConfig.tieFighter.points;
  }

  public getVelocity(playerForward: THREE.Vector3, playerSpeed: number): THREE.Vector3 {
    return playerForward.clone().multiplyScalar(playerSpeed);
  }

  public setStrategy(strategy: AIStrategy): void {
    this.strategy = strategy;
  }

  public dispose(): void {
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  }
}