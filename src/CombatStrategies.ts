import * as THREE from 'three';
import { CombatStrategy } from './CombatStrategy';
import { UserInput } from './input';
import { state, spawnLasers, addScore, addKill, spawnTorpedo } from './state';
import { checkAim } from './collision';
import { GameConfig } from './config';

abstract class BaseCombatStrategy implements CombatStrategy {
  protected fireCooldown: number = 0;
  protected readonly laserPos2D = new THREE.Vector2();
  protected readonly fbPos2D = new THREE.Vector2();
  protected readonly tempVector3 = new THREE.Vector3();

  public update(deltaTime: number, input: UserInput, camera: THREE.Camera): void {
    this.fireCooldown -= deltaTime;

    if (input.isFiring && this.fireCooldown <= 0) {
      this.fire(input, camera);
      this.fireCooldown = GameConfig.laser.cooldown;
    }

    this.updateLasers(camera);
    this.updateSpecial(deltaTime, input, camera);
  }

  protected fire(input: UserInput, camera: THREE.Camera) {
    spawnLasers(input);
    this.checkHits(input, camera);
  }

  protected abstract checkHits(input: UserInput, camera: THREE.Camera): void;

  protected updateSpecial(_deltaTime: number, _input: UserInput, _camera: THREE.Camera): void {
    // Override in subclasses for special weapons
  }

  protected updateLasers(camera: THREE.Camera) {
    if (!state.entityManager) return;

    const lasers = state.entityManager.getLasers();
    const fireballs = state.entityManager.getFireballs();
    const collisionRadiusSq = GameConfig.fireball.collisionRadiusNDC * GameConfig.fireball.collisionRadiusNDC;

    lasers.forEach(laser => {
      this.laserPos2D.set(laser.mesh.position.x, laser.mesh.position.y);

      for (let j = fireballs.length - 1; j >= 0; j--) {
        const fb = fireballs[j];
        if (fb.isExploded) continue;

        fb.projectToNDC(camera, this.tempVector3);
        this.fbPos2D.set(this.tempVector3.x, this.tempVector3.y);

        const distSq = this.laserPos2D.distanceToSquared(this.fbPos2D);
        if (distSq < collisionRadiusSq) {
          addScore(GameConfig.fireball.points);
          fb.explode();
        }
      }
    });
  }
}

export class DogfightCombatStrategy extends BaseCombatStrategy {
  protected checkHits(input: UserInput, camera: THREE.Camera) {
    if (!state.entityManager) return;

    state.entityManager.getTieFighters().forEach(tf => {
      if (!tf.isExploded && checkAim(tf.position, input, camera)) {
        tf.explode();
        addScore(100);
        addKill();
      }
    });
  }
}

export class SurfaceCombatStrategy extends BaseCombatStrategy {
  protected checkHits(_input: UserInput, _camera: THREE.Camera) {
    // Currently no surface targets, but extensible
  }
}

export class TrenchCombatStrategy extends BaseCombatStrategy {
  protected checkHits(_input: UserInput, _camera: THREE.Camera) {
    // Trench specific hits if any (other than exhaust port)
  }

  protected updateSpecial(_deltaTime: number, input: UserInput, camera: THREE.Camera): void {
    if (state.stage === 'TRENCH' && state.stageManager) {
      state.canFireTorpedo = state.stageManager.checkExhaustPortHit(input, camera);
      
      if (input.isFiring && state.canFireTorpedo && !state.hasFiredTorpedo) {
        this.launchTorpedo(input, camera);
        state.hasFiredTorpedo = true;
      }
    }
  }

  private launchTorpedo(input: UserInput, camera: THREE.Camera) {
    if (!state.player) return;

    const position = state.player.position.clone();
    const targetPoint = new THREE.Vector3(input.x, input.y, 0.5);
    targetPoint.unproject(camera);
    
    camera.getWorldPosition(this.tempVector3);
    const direction = new THREE.Vector3().subVectors(targetPoint, this.tempVector3).normalize();
    const stageSpeed = state.stageManager?.getStage()?.speed ?? GameConfig.player.baseForwardSpeed;
    const velocity = direction.multiplyScalar(stageSpeed * GameConfig.torpedo.speedMultiplier);

    spawnTorpedo(position, velocity);
  }
}