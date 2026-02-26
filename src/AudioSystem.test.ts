import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { AudioSystem } from './AudioSystem';
import { AudioManager } from './AudioManager';
import { GameEventType, globalEvents } from './EventBus';
import { Targetable } from './entities/Entity';

describe('AudioSystem', () => {
  let audioManager: AudioManager;
  let audioSystem: AudioSystem;

  beforeEach(() => {
    audioManager = new AudioManager();
    vi.spyOn(audioManager, 'playExplosion').mockImplementation(() => {});
    vi.spyOn(audioManager, 'playPlayerLaser').mockImplementation(() => {});
    vi.spyOn(audioManager, 'playEnemyLaser').mockImplementation(() => {});
    vi.spyOn(audioManager, 'playTieFlyby').mockImplementation(() => {});

    globalEvents.clear();
    audioSystem = new AudioSystem(audioManager, globalEvents);
    audioSystem.init();
  });

  it('plays explosion sound when an entity explodes', () => {
    const dummyEntity = { constructor: { name: 'Dummy' } } as any as Targetable;
    const position = new THREE.Vector3(1, 2, 3);
    
    globalEvents.emit(GameEventType.ENTITY_EXPLODED, { position, entity: dummyEntity });
    
    expect(audioManager.playExplosion).toHaveBeenCalledWith(position);
  });

  it('plays player laser sound', () => {
    globalEvents.emit(GameEventType.PLAYER_FIRED_LASER, { position: new THREE.Vector3() });
    
    expect(audioManager.playPlayerLaser).toHaveBeenCalled();
  });

  it('plays enemy laser sound', () => {
    const position = new THREE.Vector3(5, 5, 5);
    globalEvents.emit(GameEventType.ENEMY_FIRED_LASER, { position });
    
    expect(audioManager.playEnemyLaser).toHaveBeenCalledWith(position);
  });

  it('triggers flyby sound when ENTITY_FLYBY is emitted', () => {
    const tieFighter = { constructor: { name: 'TieFighter' } } as any as Targetable;
    const position = new THREE.Vector3(10, 0, 5);
    
    globalEvents.emit(GameEventType.ENTITY_FLYBY, { position, entity: tieFighter });
    
    expect(audioManager.playTieFlyby).toHaveBeenCalledWith(position);
  });
});
