import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { state, initGame, updateState, addKill } from './state';
import { GameConfig } from './config';

describe('Trench Integration', () => {
  let worldScene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    worldScene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(worldScene, hudScene);
  });

  it('should transition from DOGFIGHT to SURFACE to TRENCH', () => {
    expect(state.phase).toBe('DOGFIGHT');
    expect(state.kills).toBe(0);

    // 1. Reaching kill threshold
    for (let i = 0; i < GameConfig.stage.trenchKillsThreshold; i++) {
      addKill();
    }
    
    // Trigger update to process transition
    updateState(0.1);
    
    expect(state.phase).toBe('SURFACE');
    // DeathStar should be in scene
    expect(worldScene.children.some(child => child.type === 'Mesh' && (child as THREE.Mesh).geometry.type === 'SphereGeometry')).toBe(true);

    // 2. Reaching DeathStar
    // DeathStar is at (0, 0, -2000)
    // Move player close to it
    state.player!.position.set(0, 0, -2000 + GameConfig.stage.trenchTransitionDistance - 10);
    
    updateState(0.1);
    
    expect(state.phase).toBe('TRENCH');
    // Trench should be in scene
    expect(worldScene.children.some(child => child instanceof THREE.Group)).toBe(true);

    // 3. Movement clamping in TRENCH
    const halfWidth = GameConfig.stage.trenchWidth / 2;
    state.player!.position.x = halfWidth + 50;
    
    updateState(0.1);
    expect(state.player!.position.x).toBeLessThanOrEqual(halfWidth);
  });
});
