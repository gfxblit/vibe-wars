import * as THREE from 'three';
import { state, spawnLasers, addScore } from './state';
import { checkAim } from './collision';
import { GameConfig } from './config';
import { UserInput } from './input';

export class CombatSystem {
  private hudScene: THREE.Scene;
  private camera: THREE.Camera;
  private fireCooldown: number = 0;

  constructor(hudScene: THREE.Scene, camera: THREE.Camera) {
    this.hudScene = hudScene;
    this.camera = camera;
  }

  public update(deltaTime: number, input: UserInput) {
    this.fireCooldown -= deltaTime;

    // 1. Handle Firing
    if (input.isFiring && this.fireCooldown <= 0) {
      this.fire(input);
      this.fireCooldown = GameConfig.laser.cooldown;
    }

    // 2. Update existing lasers
    this.updateLasers(deltaTime);
  }

  private fire(input: UserInput) {
    const newLasers = spawnLasers(input);
    newLasers.forEach(laser => {
      this.hudScene.add(laser.mesh);
    });

    // Check hits immediately upon firing? 
    // Or should it be when the laser reaches the target?
    // In arcade games like this, often hitscan logic is used for "firing" even if there's a projectile visual.
    // The previous implementation did it immediately.
    this.checkHits(input);
  }

  private checkHits(input: UserInput) {
    state.tieFighters.forEach(tf => {
      if (!tf.isExploded && checkAim(tf.position, input, this.camera)) {
        tf.explode();
        addScore(100);
      }
    });
  }

  private updateLasers(deltaTime: number) {
    for (let i = state.lasers.length - 1; i >= 0; i--) {
      const laser = state.lasers[i];
      laser.update(deltaTime);
      if (laser.isExpired()) {
        this.hudScene.remove(laser.mesh);
        laser.dispose();
        state.lasers.splice(i, 1);
      }
    }
  }
}
