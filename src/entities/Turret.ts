import * as THREE from 'three';
import { Entity, Targetable } from './Entity';
import { GameConfig } from '../config';

export class Turret extends Entity implements Targetable {
  public readonly mesh: THREE.Group;
  private fireCooldown: number = Math.random() * 1.0; // Fire soon after encounter
  public isExploded: boolean = false;
  private pieceVelocities: THREE.Vector3[] = [];

  private readonly scratchVector3: THREE.Vector3 = new THREE.Vector3();

  public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    return this.mesh.getWorldPosition(target);
  }

  constructor(position: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);

    const size = GameConfig.turret.meshSize;
    const material = new THREE.MeshBasicMaterial({
      color: GameConfig.turret.meshColor,
      wireframe: true
    });

    // Actually, let's just make it a simple box for now to represent a turret
    const boxGeo = new THREE.BoxGeometry(size, size, size);
    const box = new THREE.Mesh(boxGeo, material.clone());
    this.mesh.add(box);

    // Barrel
    const barrelGeo = new THREE.CylinderGeometry(size / 10, size / 10, size, 8);
    const barrel = new THREE.Mesh(barrelGeo, material.clone());
    barrel.position.z = size / 2;
    barrel.rotation.x = Math.PI / 2;
    this.mesh.add(barrel);
    
    // Dispose of original material template
    material.dispose();
  }

  public explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    // Change color to orange
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.color.setHex(0xffa500);
      }
    });

    // Generate random velocities for each piece
    this.mesh.children.forEach(() => {
      const vel = 20; // Explosion velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * vel,
        Math.random() * vel, // Mostly upwards
        (Math.random() - 0.5) * vel
      );
      this.pieceVelocities.push(velocity);
    });
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, _playerQuaternion: THREE.Quaternion, _playerSpeed: number): THREE.Vector3 | null {
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

    // Aim at player
    this.mesh.lookAt(playerPosition);

    const worldPos = this.getWorldPosition(this.scratchVector3);
    const dist = worldPos.distanceTo(playerPosition);
    
    // Only fire if in range AND player is "ahead" of the turret (player.z > turret.z since moving towards -Z)
    // Actually, in the trench, player moves from 0 to -5000. 
    // Turret at -500 is ahead if player.z > -500.
    const isPlayerAhead = playerPosition.z > worldPos.z;

    if (isPlayerAhead && dist < GameConfig.turret.range && this.fireCooldown <= 0) {
      this.fireCooldown = GameConfig.turret.fireRate;
      // Return direction towards player
      return new THREE.Vector3().subVectors(playerPosition, worldPos).normalize();
    }

    return null;
  }

  public getScore(): number {
    return GameConfig.turret.points;
  }

  public getVelocity(_playerForward: THREE.Vector3, _playerSpeed: number): THREE.Vector3 {
    return new THREE.Vector3(0, 0, 0);
  }

  public dispose(): void {
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
