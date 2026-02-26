import * as THREE from 'three';
import { Targetable } from './entities/Entity';

export enum GameEventType {
  ENTITY_EXPLODED = 'ENTITY_EXPLODED',
  PLAYER_FIRED_LASER = 'PLAYER_FIRED_LASER',
  ENEMY_FIRED_LASER = 'ENEMY_FIRED_LASER',
  ENTITY_MOVED = 'ENTITY_MOVED'
}

export interface GameEventPayloads {
  [GameEventType.ENTITY_EXPLODED]: { position: THREE.Vector3; entity: Targetable };
  [GameEventType.PLAYER_FIRED_LASER]: { position: THREE.Vector3 };
  [GameEventType.ENEMY_FIRED_LASER]: { position: THREE.Vector3 };
  [GameEventType.ENTITY_MOVED]: { position: THREE.Vector3; entity: Targetable };
}

export type GameEventListener<T extends GameEventType> = (payload: GameEventPayloads[T]) => void;

export class EventBus {
  private listeners: { [K in GameEventType]?: Array<GameEventListener<K>> } = {};

  on<T extends GameEventType>(type: T, listener: GameEventListener<T>): void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type]!.push(listener);
  }

  off<T extends GameEventType>(type: T, listener: GameEventListener<T>): void {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type]!.filter(l => l !== listener) as any;
  }

  emit<T extends GameEventType>(type: T, payload: GameEventPayloads[T]): void {
    if (!this.listeners[type]) return;
    for (const listener of this.listeners[type]!) {
      listener(payload);
    }
  }

  clear(): void {
    this.listeners = {};
  }
}

export const globalEvents = new EventBus();
