import * as THREE from 'three';
import { CombatStrategy, CombatStrategyConfig } from './CombatStrategy';
import { UserInput } from './input';
import { state, spawnLasers, addScore, addKill, spawnTorpedo } from './state';
import { checkAim } from './collision';
import { Targetable } from './entities/Entity';

abstract class BaseCombatStrategy implements CombatStrategy {
  protected fireCooldown: number = 0;
  protected readonly laserPos2D = new THREE.Vector2();
  protected readonly fbPos2D = new THREE.Vector2();
  protected readonly tempVector3 = new THREE.Vector3();
  protected readonly scratchCameraPos = new THREE.Vector3();
  protected readonly config: CombatStrategyConfig;

  constructor(config: CombatStrategyConfig) {
    this.config = config;
  }

  public update(deltaTime: number, input: UserInput, camera: THREE.Camera): void {
    this.fireCooldown -= deltaTime;

    if (input.isFiring && this.fireCooldown <= 0) {
      this.fire(input, camera);
      this.fireCooldown = this.config.fireCooldown;
    }

    this.updateLasers(camera);
    this.updateSpecial(deltaTime, input, camera);
  }

  protected fire(input: UserInput, camera: THREE.Camera) {
    spawnLasers(input);
    this.checkHits(input, camera);
  }

  protected abstract checkHits(input: UserInput, camera: THREE.Camera): void;

  protected checkTargets(input: UserInput, camera: THREE.Camera) {
    if (!state.entityManager) return;

    // Use a mutable object to capture results in the callback, satisfying TS control flow analysis
    const result = {
      closestTarget: null as Targetable | null,
      closestDist: Infinity
    };
    
    camera.getWorldPosition(this.scratchCameraPos);

    state.entityManager.forEachTarget((target) => {
      if (target.isExploded) return;

      // Check all possible target points if the entity provides them, otherwise use base world position
      const targetPoints = target.getTargetPositions ? 
        target.getTargetPositions(this.tempVector3) : 
        [target.getWorldPosition(this.tempVector3)];
      
      let isHit = false;
      let hitDist = Infinity;

      for (const point of targetPoints) {
        if (checkAim(point, input, camera)) {
          const dist = point.distanceTo(this.scratchCameraPos);
          if (dist < hitDist) {
            hitDist = dist;
            isHit = true;
          }
        }
      }

      if (isHit && hitDist < result.closestDist && hitDist < this.config.maxRange) {
        result.closestDist = hitDist;
        result.closestTarget = target;
      }
    });

    // Only explode the single closest target that was aimed at
    if (result.closestTarget) {
      result.closestTarget.explode();
      addScore(result.closestTarget.getScore());
      addKill();
    }
  }

  protected updateSpecial(_deltaTime: number, _input: UserInput, _camera: THREE.Camera): void {
    // Override in subclasses for special weapons
  }

  protected updateLasers(camera: THREE.Camera) {
    if (!state.entityManager) return;

    const lasers = state.entityManager.getLasers();
    const fireballs = state.entityManager.getFireballs();
    const collisionRadiusSq = this.config.fireballCollisionRadiusNDC * this.config.fireballCollisionRadiusNDC;

    lasers.forEach(laser => {
      this.laserPos2D.set(laser.mesh.position.x, laser.mesh.position.y);

      for (let j = fireballs.length - 1; j >= 0; j--) {
        const fb = fireballs[j];
        if (fb.isExploded) continue;

        fb.projectToNDC(camera, this.tempVector3);
        this.fbPos2D.set(this.tempVector3.x, this.tempVector3.y);

        const distSq = this.laserPos2D.distanceToSquared(this.fbPos2D);
        if (distSq < collisionRadiusSq) {
          addScore(this.config.fireballPoints);
          fb.explode();
        }
      }
    });
  }

  protected launchTorpedo(input: UserInput, camera: THREE.Camera) {
    if (!state.player) return;

    const position = state.player.position.clone();
    const targetPoint = new THREE.Vector3(input.x, input.y, 0.5);
    targetPoint.unproject(camera);
    
    camera.getWorldPosition(this.tempVector3);
    const direction = new THREE.Vector3().subVectors(targetPoint, this.tempVector3).normalize();
    const stageSpeed = state.stageManager?.getStage()?.speed ?? this.config.baseForwardSpeed;
    const velocity = direction.multiplyScalar(stageSpeed * this.config.torpedoSpeedMultiplier);

    spawnTorpedo(position, velocity);
  }
}

export class DogfightCombatStrategy extends BaseCombatStrategy {
  constructor(config: CombatStrategyConfig) {
    super(config);
  }

  protected checkHits(input: UserInput, camera: THREE.Camera) {
    this.checkTargets(input, camera);
  }
}

export class SurfaceCombatStrategy extends BaseCombatStrategy {
  constructor(config: CombatStrategyConfig) {
    super(config);
  }

  protected checkHits(input: UserInput, camera: THREE.Camera) {
    this.checkTargets(input, camera);
  }
}

export class TrenchCombatStrategy extends BaseCombatStrategy {
  private wasFiring: boolean = false;

  constructor(config: CombatStrategyConfig) {
    super(config);
  }

  protected checkHits(input: UserInput, camera: THREE.Camera) {
    this.checkTargets(input, camera);
  }

  protected updateSpecial(_deltaTime: number, input: UserInput, camera: THREE.Camera): void {
    if (state.stage === 'TRENCH' && state.stageManager) {
      state.canFireTorpedo = state.stageManager.checkExhaustPortHit(input, camera);
      
      // Only fire if button was NOT pressed in previous frame (fresh press)
      if (input.isFiring && !this.wasFiring && state.canFireTorpedo && !state.hasFiredTorpedo) {
        this.launchTorpedo(input, camera);
        state.hasFiredTorpedo = true;
      }

      this.wasFiring = input.isFiring;
    }
  }
}