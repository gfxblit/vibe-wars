import * as THREE from 'three';
import { AudioManager } from './AudioManager';
import { EventBus, GameEventType } from './EventBus';
import { Targetable } from './entities/Entity';

export class AudioSystem {
  constructor(
    private audioManager: AudioManager,
    private eventBus: EventBus
  ) {}

  init(): void {
    this.eventBus.on(GameEventType.ENTITY_EXPLODED, this.handleEntityExploded.bind(this));
    this.eventBus.on(GameEventType.PLAYER_FIRED_LASER, this.handlePlayerFiredLaser.bind(this));
    this.eventBus.on(GameEventType.ENEMY_FIRED_LASER, this.handleEnemyFiredLaser.bind(this));
    this.eventBus.on(GameEventType.ENTITY_FLYBY, this.handleEntityFlyby.bind(this));
  }

  async resume(): Promise<void> {
    await this.audioManager.resume();
  }

  private handleEntityExploded(payload: { position: THREE.Vector3; entity: Targetable }): void {
    this.audioManager.playExplosion(payload.position);
  }

  private handlePlayerFiredLaser(_payload: { position: THREE.Vector3 }): void {
    this.audioManager.playPlayerLaser();
  }

  private handleEnemyFiredLaser(payload: { position: THREE.Vector3 }): void {
    this.audioManager.playEnemyLaser(payload.position);
  }

  private handleEntityFlyby(payload: { position: THREE.Vector3; entity: Targetable }): void {
    this.audioManager.playTieFlyby(payload.position);
  }
}

