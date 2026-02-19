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

  private static material: THREE.MeshBasicMaterial;
  private static bodyGeo: THREE.SphereGeometry;
  private static wingGeo: THREE.PlaneGeometry;

  private material: THREE.MeshBasicMaterial;
  private lastAppliedColor: number = GameConfig.tieFighter.meshColor;

  private fireCooldown: number = Math.random() * GameConfig.fireball.fireRate;

  public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    this.mesh.updateWorldMatrix(true, false);
    return this.mesh.getWorldPosition(target);
  }

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor(strategy: AIStrategy) {
    super();
    this.mesh = new THREE.Group();
    this.strategy = strategy;

    const size = GameConfig.tieFighter.meshSize;

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

    // Optimization: Clone material once and reuse for all parts
    this.material = TieFighter.material.clone();

    // Body (Sphere)
    const body = new THREE.Mesh(TieFighter.bodyGeo, this.material);
    this.mesh.add(body);

    // Left Wing (Plane)
    const leftWing = new THREE.Mesh(TieFighter.wingGeo, this.material);
    leftWing.position.set(-size * 0.8, 0, 0);
    leftWing.rotation.y = Math.PI / 2;
    this.mesh.add(leftWing);

    // Right Wing (Plane)
    const rightWing = new THREE.Mesh(TieFighter.wingGeo, this.material);
    rightWing.position.set(size * 0.8, 0, 0);
    rightWing.rotation.y = Math.PI / 2;
    this.mesh.add(rightWing);
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

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, playerSpeed: number): THREE.Vector3 | null {
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

    this.fireCooldown -= deltaTime;
    this.strategy.update(deltaTime, this.mesh.position, this.mesh.quaternion, playerPosition, playerQuaternion, playerSpeed);

    // Debug: Update color if strategy provides one and mode coloring is enabled
    // Optimization: Only update if color has changed
    if (this.strategy.getColor) {
      const color = this.strategy.getColor(state.isModeColoring);
      if (this.lastAppliedColor !== color) {
        this.material.color.setHex(color);
        this.lastAppliedColor = color;
      }
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
    this.material.dispose();
  }
}
