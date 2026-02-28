import * as THREE from 'three';
import { TieFighter } from './TieFighter';
import { AIStrategyFactory } from './AIStrategyFactory';
import { GameConfig } from '../config';
import { Fireball } from './Fireball';
import { Laser } from './Laser';
import { Torpedo } from './Torpedo';
import { Targetable, FireballDebugContext } from './Entity';
import { state } from '../state';
import { GameEventType, globalEvents } from '../EventBus';

export class EntityManager {
  private tieFighters: TieFighter[] = [];
  private fireballs: Fireball[] = [];
  private lasers: Laser[] = [];
  private torpedoes: Torpedo[] = [];
  private additionalTargets: Targetable[] = [];
  private spawnTimer: number = 0;
  private worldScene: THREE.Scene;
  private hudScene: THREE.Scene;
  private strategyFactory: AIStrategyFactory;
  private spawningEnabled: boolean = true;

  // Scratch vectors to avoid GC pressure
  private readonly scratchPlayerVelocity = new THREE.Vector3();
  private readonly scratchRelativeVelocity = new THREE.Vector3();
  private readonly scratchTotalVelocity = new THREE.Vector3();
  private readonly scratchFireballPos = new THREE.Vector3();
  private readonly scratchPlayerForward = new THREE.Vector3();
  private readonly scratchToFireball = new THREE.Vector3();
  private readonly scratchToPrevFireball = new THREE.Vector3();
  private readonly scratchCameraPos = new THREE.Vector3();
  private readonly scratchCameraDir = new THREE.Vector3();

  constructor(worldScene: THREE.Scene, hudScene: THREE.Scene, strategyFactory: AIStrategyFactory = new AIStrategyFactory()) {
    this.worldScene = worldScene;
    this.hudScene = hudScene;
    this.strategyFactory = strategyFactory;
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, isSmartAI: boolean, camera: THREE.Camera, playerSpeed: number, onPlayerHit?: (damage: number) => void): void {
    this.scratchPlayerForward.set(0, 0, -1).applyQuaternion(playerQuaternion);

    const debugSize = state.debug ? state.debugTieFighterSize : undefined;
    const debugColor = state.debug ? state.debugTieFighterColor : undefined;

    // 1. Update existing TIE fighters
    for (let i = this.tieFighters.length - 1; i >= 0; i--) {
      const tf = this.tieFighters[i];
      const fireDirection = tf.update(deltaTime, playerPosition, playerQuaternion, playerSpeed, state.isModeColoring, debugSize, debugColor);

      if (fireDirection && !tf.isExploded) {
        this.spawnFireballFromTarget(tf, fireDirection, playerQuaternion, playerSpeed);
      }

            if (!tf.isExploded) {
              globalEvents.emit(GameEventType.ENTITY_MOVED, { position: tf.position, entity: tf });
            }
      // Cleanup distant TIE fighters
      const distance = tf.position.distanceTo(playerPosition);
      if (distance > GameConfig.tieFighter.cleanupDistance) {
        this.removeTieFighter(i);
      }
    }

    // 2. Update fireballs and check for player collision
    for (let i = this.fireballs.length - 1; i >= 0; i--) {
      const fb = this.fireballs[i];
      fb.update(deltaTime);

      // Remove if exploded animation completes
      if (fb.isExpired()) {
        this.removeFireball(i);
        continue;
      }

      // Cleanup distant fireballs (missed or far away)
      const distToPlayer = fb.position.distanceTo(playerPosition);
      if (distToPlayer > GameConfig.fireball.expirationDistance) {
        this.removeFireball(i);
        continue;
      }

      // Collision checks
      if (!fb.isExploded) {
        camera.getWorldPosition(this.scratchCameraPos);
        camera.getWorldDirection(this.scratchCameraDir);

        this.scratchToFireball.subVectors(fb.position, this.scratchCameraPos);
        this.scratchToPrevFireball.subVectors(fb.previousPosition, this.scratchCameraPos);

        const currDist = this.scratchToFireball.dot(this.scratchCameraDir);
        const prevDist = this.scratchToPrevFireball.dot(this.scratchCameraDir);

        const threshold = GameConfig.fireball.hitDistanceThreshold;

        // A. Camera Plane Collision (Frontal)
        // Trigger if it crossed from front of threshold to behind threshold
        if (prevDist > threshold && currDist <= threshold) {
          // Use previous position for NDC check to avoid NaN/weirdness when too close to camera
          this.scratchFireballPos.copy(fb.previousPosition).project(camera);

          const ndcX = this.scratchFireballPos.x;
          const ndcY = this.scratchFireballPos.y;
          const ndcThreshold = GameConfig.fireball.hitNDCThreshold;

          // Check if it's roughly on screen at the moment of impact
          if (Math.abs(ndcX) <= ndcThreshold && Math.abs(ndcY) <= ndcThreshold) {
            if (onPlayerHit) {
              onPlayerHit(GameConfig.fireball.damage);
            }
            fb.explode();
          }
        }

        // B. Body Collision Fallback (Radius-based)
        // Handles hits from the side or back that don't cross the front camera plane
        if (!fb.isExploded) {
          if (distToPlayer < (GameConfig.fireball.collisionRadiusWorld + GameConfig.player.meshSize)) {
            if (onPlayerHit) {
              onPlayerHit(GameConfig.fireball.damage);
            }
            fb.explode();
          }
        }
      }
    }

    // 3. Update lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      laser.update(deltaTime);
      if (laser.isExpired()) {
        this.removeLaser(i);
      }
    }

    // 4. Update torpedoes
    for (let i = this.torpedoes.length - 1; i >= 0; i--) {
      const torpedo = this.torpedoes[i];
      torpedo.update(deltaTime);
      
      if (torpedo.isExpired()) {
        this.removeTorpedo(i);
        continue;
      }

      // Check collision with additional targets (like turrets)
      if (!torpedo.isExploded) {
        for (const target of this.additionalTargets) {
          if (!target.isExploded) {
            const worldPos = target.getWorldPosition(this.scratchFireballPos);
            const dist = torpedo.position.distanceTo(worldPos);
            // Using a threshold for torpedo-target collision
            if (dist < 20) { // Same size as exhaust port hit detection roughly
              target.explode();
              torpedo.explode();
              state.score += target.getScore();
              state.kills++;
              break; 
            }
          }
        }
      }
    }

    // 5. Spawn new TIE fighters
    if (this.spawningEnabled) {
      this.spawnTimer += deltaTime;
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      const interval = GameConfig.getScaledInterval(GameConfig.tieFighter.spawnInterval, multiplier);
      if (this.spawnTimer >= interval) {
        this.spawnTieFighter(isSmartAI);
        this.spawnTimer = 0;
      }
    }

    // 5. Update additional targets (like turrets)
    for (const target of this.additionalTargets) {
      if (target.update) {
        const fireDirection = target.update(deltaTime, playerPosition, playerQuaternion, playerSpeed);
        if (fireDirection && !target.isExploded) {
          this.spawnFireballFromTarget(target, fireDirection, playerQuaternion, playerSpeed);
        }
      }
    }
  }

  private spawnFireballFromTarget(target: Targetable, fireDirection: THREE.Vector3, playerQuaternion: THREE.Quaternion, playerSpeed: number) {
    this.scratchPlayerForward.set(0, 0, -1).applyQuaternion(playerQuaternion);
    
    // Get target's base velocity (e.g. TIE fighters move with player, turrets are static)
    if (target.getVelocity) {
      this.scratchPlayerVelocity.copy(target.getVelocity(this.scratchPlayerForward, playerSpeed));
    } else {
      // Default fallback (previous behavior)
      this.scratchPlayerVelocity.copy(this.scratchPlayerForward).multiplyScalar(playerSpeed);
    }

    const debugContext: FireballDebugContext = {
      surfaceFireballSize: state.debugSurfaceFireballSize,
      surfaceFireballSpeed: state.debugSurfaceFireballSpeed,
    };

    const relativeSpeed = target.getFireballSpeed ? target.getFireballSpeed(debugContext) : GameConfig.fireball.relativeSpeed;
    const size = target.getFireballSize ? target.getFireballSize(debugContext) : undefined;

    this.scratchRelativeVelocity.copy(fireDirection).multiplyScalar(relativeSpeed);
    this.scratchTotalVelocity.copy(this.scratchPlayerVelocity).add(this.scratchRelativeVelocity);

    if (target.getFirePosition) {
      target.getFirePosition(this.scratchFireballPos);
    } else {
      target.getWorldPosition(this.scratchFireballPos);
    }
    
    this.spawnFireball(this.scratchFireballPos, this.scratchTotalVelocity, size);
    globalEvents.emit(GameEventType.ENEMY_FIRED_LASER, { position: this.scratchFireballPos });
  }

  public setSpawningEnabled(enabled: boolean): void {
    this.spawningEnabled = enabled;
  }

  public spawnTieFighter(isSmartAI: boolean): void {
    const strategy = this.strategyFactory.createStrategy(isSmartAI);
    const initialSize = (state.debug && state.debugTieFighterSize) ? state.debugTieFighterSize : GameConfig.tieFighter.meshSize;
    const tf = new TieFighter(strategy, initialSize);
    this.tieFighters.push(tf);
    this.worldScene.add(tf.mesh);
  }

  public spawnFireball(position: THREE.Vector3, velocity: THREE.Vector3, size?: number): Fireball {
    const finalSize = state.debugFireballSize ?? size ?? GameConfig.fireball.sparkleSize;
    const fireball = new Fireball(position, velocity, finalSize);
    this.fireballs.push(fireball);
    this.worldScene.add(fireball.mesh);
    return fireball;
  }

  public spawnLaser(origin2D: THREE.Vector2, target2D: THREE.Vector2, color: number): Laser {
    const laser = new Laser(origin2D, target2D, color);
    this.lasers.push(laser);
    this.hudScene.add(laser.mesh);
    globalEvents.emit(GameEventType.PLAYER_FIRED_LASER, { position: new THREE.Vector3(origin2D.x, origin2D.y, 0) });
    return laser;
  }

  public spawnTorpedo(position: THREE.Vector3, velocity: THREE.Vector3): Torpedo {
    const torpedo = new Torpedo(position, velocity);
    this.torpedoes.push(torpedo);
    this.worldScene.add(torpedo.mesh);
    return torpedo;
  }

  public removeTieFighter(index: number): void {
    const tf = this.tieFighters[index];
    this.worldScene.remove(tf.mesh);
    tf.dispose();
    this.tieFighters.splice(index, 1);
  }

  public removeFireball(index: number): void {
    const fb = this.fireballs[index];
    this.worldScene.remove(fb.mesh);
    fb.dispose();
    this.fireballs.splice(index, 1);
  }

  public removeFireballByObject(fb: Fireball): void {
    const index = this.fireballs.indexOf(fb);
    if (index !== -1) {
      this.removeFireball(index);
    }
  }

  public removeLaser(index: number): void {
    const laser = this.lasers[index];
    this.hudScene.remove(laser.mesh);
    laser.dispose();
    this.lasers.splice(index, 1);
  }

  public removeTorpedo(index: number): void {
    const torpedo = this.torpedoes[index];
    this.worldScene.remove(torpedo.mesh);
    torpedo.dispose();
    this.torpedoes.splice(index, 1);
  }

  public getTieFighters(): TieFighter[] {
    return this.tieFighters;
  }

  public getFireballs(): Fireball[] {
    return this.fireballs;
  }

  public getLasers(): Laser[] {
    return this.lasers;
  }

  public getTorpedoes(): Torpedo[] {
    return this.torpedoes;
  }

  public addTarget(target: Targetable): void {
    if (!this.additionalTargets.includes(target)) {
      this.additionalTargets.push(target);
    }
  }

  public getTargets(): Targetable[] {
    return [...this.tieFighters, ...this.additionalTargets];
  }

  /**
   * Iterates over all current targets without allocating intermediate arrays,
   * avoiding garbage collection pressure in hot paths.
   */
  public forEachTarget(callback: (target: Targetable) => void): void {
    for (const tf of this.tieFighters) {
      callback(tf);
    }
    for (const target of this.additionalTargets) {
      callback(target);
    }
  }

  public removeTarget(target: Targetable): void {
    const index = this.additionalTargets.indexOf(target);
    if (index !== -1) {
      this.additionalTargets.splice(index, 1);
    }
  }

  public clear(): void {
    this.tieFighters.forEach(tf => {
      this.worldScene.remove(tf.mesh);
      tf.dispose();
    });
    this.tieFighters = [];

    this.additionalTargets = [];

    this.fireballs.forEach(fb => {
      this.worldScene.remove(fb.mesh);
      fb.dispose();
    });
    this.fireballs = [];

    this.lasers.forEach(laser => {
      this.hudScene.remove(laser.mesh);
      laser.dispose();
    });
    this.lasers = [];

    this.torpedoes.forEach(torpedo => {
      this.worldScene.remove(torpedo.mesh);
      torpedo.dispose();
    });
    this.torpedoes = [];

    this.spawnTimer = 0;
  }
}
