import * as THREE from 'three';
import { TieFighter } from './TieFighter';
import { AIStrategyFactory } from './AIStrategyFactory';
import { GameConfig } from '../config';
import { Fireball } from './Fireball';
import { Laser } from './Laser';

export class EntityManager {
  private tieFighters: TieFighter[] = [];
  private fireballs: Fireball[] = [];
  private lasers: Laser[] = [];
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

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, isSmartAI: boolean, camera: THREE.Camera, onPlayerHit?: (damage: number) => void): void {
    this.scratchPlayerForward.set(0, 0, -1).applyQuaternion(playerQuaternion);

    // 1. Update existing TIE fighters
    for (let i = this.tieFighters.length - 1; i >= 0; i--) {
      const tf = this.tieFighters[i];
      const fireDirection = tf.update(deltaTime, playerPosition, playerQuaternion);

      if (fireDirection && !tf.isExploded) {
        // Inherit player's forward velocity so the fireball closure rate is exactly relativeSpeed
        this.scratchPlayerVelocity.copy(this.scratchPlayerForward).multiplyScalar(GameConfig.player.forwardSpeed);
        this.scratchRelativeVelocity.copy(fireDirection).multiplyScalar(GameConfig.fireball.relativeSpeed);
        this.scratchTotalVelocity.copy(this.scratchPlayerVelocity).add(this.scratchRelativeVelocity);

        this.scratchFireballPos.copy(tf.position);
        this.spawnFireball(this.scratchFireballPos, this.scratchTotalVelocity);
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

    // 4. Spawn new TIE fighters
    if (this.spawningEnabled) {
      this.spawnTimer += deltaTime;
      if (this.spawnTimer >= GameConfig.tieFighter.spawnInterval) {
        this.spawnTieFighter(isSmartAI);
        this.spawnTimer = 0;
      }
    }
  }

  public setSpawningEnabled(enabled: boolean): void {
    this.spawningEnabled = enabled;
  }

  public spawnTieFighter(isSmartAI: boolean): void {
    const strategy = this.strategyFactory.createStrategy(isSmartAI);
    const tf = new TieFighter(strategy);
    this.tieFighters.push(tf);
    this.worldScene.add(tf.mesh);
  }

  public spawnFireball(position: THREE.Vector3, velocity: THREE.Vector3): Fireball {
    const fireball = new Fireball(position, velocity);
    this.fireballs.push(fireball);
    this.worldScene.add(fireball.mesh);
    return fireball;
  }

  public spawnLaser(origin2D: THREE.Vector2, target2D: THREE.Vector2, color: number): Laser {
    const laser = new Laser(origin2D, target2D, color);
    this.lasers.push(laser);
    this.hudScene.add(laser.mesh);
    return laser;
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

  public getTieFighters(): TieFighter[] {
    return this.tieFighters;
  }

  public getFireballs(): Fireball[] {
    return this.fireballs;
  }

  public getLasers(): Laser[] {
    return this.lasers;
  }

  public clear(): void {
    this.tieFighters.forEach(tf => {
      this.worldScene.remove(tf.mesh);
      tf.dispose();
    });
    this.tieFighters = [];

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

    this.spawnTimer = 0;
  }
}


    