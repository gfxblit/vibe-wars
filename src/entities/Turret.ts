import * as THREE from 'three';
import { Entity, Targetable, FireballDebugContext } from './Entity';
import { GameConfig } from '../config';
import { state } from '../state';
import { GameEventType, globalEvents } from '../EventBus';

export class Turret extends Entity implements Targetable {
  public readonly mesh: THREE.Group;
  private swivelBody: THREE.Group;
  private fireCooldown: number = Math.random() * 1.0; // Fire soon after encounter
  public isExploded: boolean = false;
  private pieceVelocities: THREE.Vector3[] = [];
  private size: number;
  private fireballSize: number;
  private fireballSpeed: number;
  private material: THREE.LineBasicMaterial;

  private readonly scratchVector3: THREE.Vector3 = new THREE.Vector3();
  private collisionBox: THREE.Box3 = new THREE.Box3();

  public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    this.mesh.updateWorldMatrix(true, false);
    return this.mesh.getWorldPosition(target);
  }

  public getTargetPositions(target: THREE.Vector3): THREE.Vector3[] {
    const basePos = this.getWorldPosition(target.clone());
    const firePos = this.getFirePosition(new THREE.Vector3());
    return [basePos, firePos];
  }

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  public getFirePosition(target: THREE.Vector3): THREE.Vector3 {
    this.swivelBody.updateWorldMatrix(true, false);
    this.scratchVector3.set(0, 0, this.size * 0.4);
    this.swivelBody.localToWorld(this.scratchVector3);
    return target.copy(this.scratchVector3);
  }

  public checkCollision(playerBox: THREE.Box3): boolean {
    if (this.isExploded) return false;
    // Update collision box from mesh
    this.collisionBox.setFromObject(this.mesh);
    return this.collisionBox.intersectsBox(playerBox);
  }

  constructor(
    position: THREE.Vector3, 
    size: number = GameConfig.turret.meshSize, 
    fireballSize: number = GameConfig.fireball.sparkleSize,
    fireballSpeed: number = GameConfig.fireball.relativeSpeed
  ) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.size = size;
    this.fireballSize = fireballSize;
    this.fireballSpeed = fireballSpeed;

    this.material = new THREE.LineBasicMaterial({
      color: GameConfig.turret.meshColor
    });

    // Base - stays on the wall
    const baseGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(size * 0.8, size * 0.8, size * 0.2));
    const base = new THREE.LineSegments(baseGeo, this.material);
    this.mesh.add(base);

    // Dome for ground turret look
    const domeGeo = new THREE.EdgesGeometry(new THREE.SphereGeometry(size * 0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2));
    const dome = new THREE.LineSegments(domeGeo, this.material);
    // Rotate dome to align with base (which is on XY plane locally)
    dome.rotation.x = -Math.PI / 2;
    this.mesh.add(dome);

    // Swivel Body - this is what looks at the player
    this.swivelBody = new THREE.Group();
    this.mesh.add(this.swivelBody);

    const bodyGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(size * 0.6, size * 0.4, size * 0.6));
    const body = new THREE.LineSegments(bodyGeo, this.material);
    this.swivelBody.add(body);

    // Two Barrels
    const barrelGeo = new THREE.EdgesGeometry(new THREE.CylinderGeometry(size / 20, size / 20, size * 0.7, 8));
    
    const leftBarrel = new THREE.LineSegments(barrelGeo, this.material);
    leftBarrel.position.set(-size * 0.15, 0, size * 0.3);
    leftBarrel.rotation.x = -Math.PI / 2;
    this.swivelBody.add(leftBarrel);

    const rightBarrel = new THREE.LineSegments(barrelGeo, this.material);
    rightBarrel.position.set(size * 0.15, 0, size * 0.3);
    rightBarrel.rotation.x = -Math.PI / 2;
    this.swivelBody.add(rightBarrel);
  }

  public explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;
    globalEvents.emit(GameEventType.ENTITY_EXPLODED, { position: this.position, entity: this });

    // Change color to orange
    this.material.color.setHex(0xffa500);

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
    this.swivelBody.lookAt(playerPosition);

    const worldPos = this.getWorldPosition(this.scratchVector3);
    const dist = worldPos.distanceTo(playerPosition);
    
    // Only fire if in range AND player is "ahead" of the turret (player.z > turret.z since moving towards -Z)
    // Actually, in the trench, player moves from 0 to -5000. 
    // Turret at -500 is ahead if player.z > -500.
    const isPlayerAhead = playerPosition.z > worldPos.z;

    if (isPlayerAhead && dist < GameConfig.turret.range && this.fireCooldown <= 0) {
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      this.fireCooldown = GameConfig.getScaledInterval(GameConfig.turret.fireRate, multiplier);
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

  public getFireballSize(_context?: FireballDebugContext): number {
    return this.fireballSize;
  }

  public getFireballSpeed(_context?: FireballDebugContext): number {
    const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
    return GameConfig.getScaledSpeed(this.fireballSpeed, multiplier);
  }

  public dispose(): void {
    this.material.dispose();
    this.mesh.traverse(child => {
      if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
      }
    });
  }
}
