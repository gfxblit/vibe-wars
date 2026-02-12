import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { state, initGame, setStage, goToNextStage } from './state';
import { GameConfig } from './config';

describe('Stage Transitions', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
  });

  it('should reset kills when setStage is called', () => {
    state.kills = 5;
    setStage('SURFACE');
    expect(state.stage).toBe('SURFACE');
    expect(state.kills).toBe(0);
  });

  it('should reset kills when goToNextStage is called', () => {
    state.kills = GameConfig.stage.dogfightKillsThreshold;
    goToNextStage();
    expect(state.stage).toBe('SURFACE');
    expect(state.kills).toBe(0);
  });

  it('should auto-switch from DOGFIGHT to APPROACH phase if kills threshold already met on update', () => {
    state.stage = 'DOGFIGHT';
    state.kills = GameConfig.stage.dogfightKillsThreshold + 1;
    state.stageManager?.reset();
    
    expect(state.stage).toBe('DOGFIGHT');
    
    state.stageManager?.update(0.1, state.player!);
    
    // Should still be DOGFIGHT, but with DeathStar spawned (Approach Phase)
    expect(state.stage).toBe('DOGFIGHT');
    expect(scene.getObjectByName('DeathStar')).toBeTruthy();
  });

  it('should reset kills when cycling back to DOGFIGHT', () => {
    state.stage = 'TRENCH';
    state.kills = 10;
    goToNextStage(); // Should go to DOGFIGHT and increment wave
    
    expect(state.stage).toBe('DOGFIGHT');
    expect(state.wave).toBe(2);
    expect(state.kills).toBe(0);
  });
});
