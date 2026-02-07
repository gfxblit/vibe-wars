import * as THREE from 'three';
import { state, spawnLasers, addScore } from './state';
import { checkAim } from './collision';
import { GameConfig } from './config';
import { UserInput } from './input';

export class CombatSystem {
  private camera: THREE.Camera;
  private fireCooldown: number = 0;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  public update(deltaTime: number, input: UserInput) {
    this.fireCooldown -= deltaTime;

    // 1. Handle Firing
    if (input.isFiring && this.fireCooldown <= 0) {
      this.fire(input);
      this.fireCooldown = GameConfig.laser.cooldown;
    }

    // 2. Update existing lasers and check collisions
    this.updateLasers();
  }

  private fire(input: UserInput) {
    spawnLasers(input);
    this.checkHits(input);
  }

  private checkHits(input: UserInput) {
    if (!state.entityManager) return;
    state.entityManager.getTieFighters().forEach(tf => {
      if (!tf.isExploded && checkAim(tf.position, input, this.camera)) {
        tf.explode();
        addScore(100);
      }
    });
  }

  private updateLasers() {
    if (!state.entityManager) return;

    const lasers = state.entityManager.getLasers();
    const fireballs = state.entityManager.getFireballs();

    const laserPos2D = new THREE.Vector2();
    const fbPos2D = new THREE.Vector2();
    const collisionRadiusSq = GameConfig.fireball.collisionRadiusNDC * GameConfig.fireball.collisionRadiusNDC;

    // We don't iterate lasers and remove them here because EntityManager.update handles their lifecycle (expiration).
    // However, we DO check collisions between current lasers and fireballs.
    lasers.forEach(laser => {
      laserPos2D.set(laser.mesh.position.x, laser.mesh.position.y);

      // Check for collision with fireballs
      for (let j = fireballs.length - 1; j >= 0; j--) {
        const fb = fireballs[j];
        const fbNDC = fb.getNDCDelta(this.camera);
        fbPos2D.set(fbNDC.x, fbNDC.y);

        const distSq = laserPos2D.distanceToSquared(fbPos2D);
        if (distSq < collisionRadiusSq) {
          addScore(GameConfig.fireball.points);
          state.entityManager!.removeFireball(j);
          // Laser continues for visual effect
        }
      }
    });
  }
}