import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { AudioSystem } from './AudioSystem';
import { AudioManager } from './AudioManager';
import { GameEventType, globalEvents } from './EventBus';
import { Targetable } from './entities/Entity';
import { state } from './state';

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

  it('triggers flyby sound when a TieFighter crosses the z=0 plane within lateral distance', () => {
    state.player = { position: new THREE.Vector3(0, 0, 0) } as any; // Mock player position
    const tieFighter = { constructor: { name: 'TieFighter' } } as any as Targetable;
    
    // Move from z = -10 to z = 5 (crossing z=0)
    audioSystem.updateEntityPosition(tieFighter, new THREE.Vector3(10, 0, -10));
    globalEvents.emit(GameEventType.ENTITY_MOVED, { position: new THREE.Vector3(10, 0, 5), entity: tieFighter });
    
    expect(audioManager.playTieFlyby).toHaveBeenCalledWith(new THREE.Vector3(10, 0, 5));
  });

  it('does NOT trigger flyby sound if lateral distance is too far', () => {
    state.player = { position: new THREE.Vector3(0, 0, 0) } as any; // Mock player position
    const tieFighter = { constructor: { name: 'TieFighter' } } as any as Targetable;
    
    // Far lateral distance (x = 100)
    audioSystem.updateEntityPosition(tieFighter, new THREE.Vector3(100, 0, -10));
    globalEvents.emit(GameEventType.ENTITY_MOVED, { position: new THREE.Vector3(100, 0, 5), entity: tieFighter });
    
    expect(audioManager.playTieFlyby).not.toHaveBeenCalled();
  });
});
