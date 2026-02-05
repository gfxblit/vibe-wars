import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Laser extends Entity {
  public readonly mesh: THREE.Line;
  private direction: THREE.Vector3;
  private lifeTimeRemaining: number;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor(origin: THREE.Vector3, direction: THREE.Vector3) {
    super();
    this.direction = direction.clone().normalize();
    this.lifeTimeRemaining = GameConfig.laser.lifetime;

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -2) // 2 units long
    ]);
    const material = new THREE.LineBasicMaterial({ color: GameConfig.laser.color });
    this.mesh = new THREE.Line(geometry, material);

    this.mesh.position.copy(origin);
    // Align mesh with direction
    this.mesh.lookAt(origin.clone().add(this.direction));
  }

  public update(dt: number): void {
    const moveStep = this.direction.clone().multiplyScalar(GameConfig.laser.speed * dt);
    this.position.add(moveStep);
    this.lifeTimeRemaining -= dt;
  }

  public isExpired(): boolean {
    return this.lifeTimeRemaining <= 0;
  }
}
