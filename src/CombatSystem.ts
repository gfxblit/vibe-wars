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

  public update(deltaTime: number, input: UserInput, scene: THREE.Scene) {
    this.fireCooldown -= deltaTime;

    // 1. Handle Firing
    if (input.isFiring && this.fireCooldown <= 0) {
      this.fire(input);
      this.fireCooldown = GameConfig.laser.cooldown;
    }

    // 2. Update existing lasers and check collisions
    this.updateLasers(deltaTime, scene);
  }

  private fire(input: UserInput) {
    const newLasers = spawnLasers(input);
    newLasers.forEach(laser => {
      this.hudScene.add(laser.mesh);
    });

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

  private updateLasers(deltaTime: number, scene: THREE.Scene) {
    const laserPos2D = new THREE.Vector2();
    const fbPos2D = new THREE.Vector2();
    const collisionRadiusSq = GameConfig.fireball.collisionRadiusNDC * GameConfig.fireball.collisionRadiusNDC;

    for (let i = state.lasers.length - 1; i >= 0; i--) {
      const laser = state.lasers[i];
      laser.update(deltaTime);

      laserPos2D.set(laser.mesh.position.x, laser.mesh.position.y);

      // Check for collision with fireballs
      for (let j = state.fireballs.length - 1; j >= 0; j--) {
        const fb = state.fireballs[j];
        const fbNDC = fb.getNDCDelta(this.camera);
        fbPos2D.set(fbNDC.x, fbNDC.y);

        const distSq = laserPos2D.distanceToSquared(fbPos2D);
        if (distSq < collisionRadiusSq) {
          addScore(GameConfig.fireball.points);
          scene.remove(fb.mesh);
          fb.dispose();
          state.fireballs.splice(j, 1);
          // Laser continues for visual effect
        }
      }

      if (laser.isExpired()) {
        this.hudScene.remove(laser.mesh);
        laser.dispose();
        state.lasers.splice(i, 1);
      }
    }
  }
}