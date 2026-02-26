import * as THREE from 'three';
import { AudioManager } from './AudioManager';
import { EventBus, GameEventType } from './EventBus';
import { Targetable } from './entities/Entity';
import { state } from './state';

export class AudioSystem {
  private previousPositions = new WeakMap<Targetable, THREE.Vector3>();

  constructor(
    private audioManager: AudioManager,
    private eventBus: EventBus
  ) {}

  init(): void {
    this.eventBus.on(GameEventType.ENTITY_EXPLODED, this.handleEntityExploded.bind(this));
    this.eventBus.on(GameEventType.PLAYER_FIRED_LASER, this.handlePlayerFiredLaser.bind(this));
    this.eventBus.on(GameEventType.ENEMY_FIRED_LASER, this.handleEnemyFiredLaser.bind(this));
    this.eventBus.on(GameEventType.ENTITY_MOVED, this.handleEntityMoved.bind(this));
  }

  async resume(): Promise<void> {
    await this.audioManager.resume();
  }

  updateEntityPosition(entity: Targetable, position: THREE.Vector3): void {
    this.previousPositions.set(entity, position.clone());
  }

  private handleEntityExploded(payload: { position: THREE.Vector3; entity: Targetable }): void {
    this.audioManager.playExplosion(payload.position);
    this.previousPositions.delete(payload.entity);
  }

  private handlePlayerFiredLaser(_payload: { position: THREE.Vector3 }): void {
    this.audioManager.playPlayerLaser();
  }

  private handleEnemyFiredLaser(payload: { position: THREE.Vector3 }): void {
    this.audioManager.playEnemyLaser(payload.position);
  }

  private handleEntityMoved(payload: { position: THREE.Vector3; entity: Targetable }): void {
    const { position, entity } = payload;
    
    // Flyby logic for TieFighter
    if (entity.constructor.name === 'TieFighter') {
      const prevPosition = this.previousPositions.get(entity);
      if (prevPosition) {
        const playerPosition = state.player?.position;
        if (!playerPosition) return;
        
        const prevRelZ = prevPosition.z - playerPosition.z;
        const currRelZ = position.z - playerPosition.z;
        
        // Check if it crossed the player's Z-plane (from either direction)
        if ((prevRelZ > 0 && currRelZ <= 0) || (prevRelZ < 0 && currRelZ >= 0)) {
          const lateralDistSq =
            Math.pow(position.x - playerPosition.x, 2) +
            Math.pow(position.y - playerPosition.y, 2);
          if (lateralDistSq < 2500) { // 50 units distance threshold (squared)
            this.audioManager.playTieFlyby(position);
          }
        }
      }
    }

    this.updateEntityPosition(entity, position);
  }
}
