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

  // Scratch vectors to avoid GC pressure
  private readonly scratchPlayerVelocity = new THREE.Vector3();
  private readonly scratchRelativeVelocity = new THREE.Vector3();
  private readonly scratchTotalVelocity = new THREE.Vector3();
  private readonly scratchFireballPos = new THREE.Vector3();
  private readonly scratchPlayerForward = new THREE.Vector3();
  private readonly scratchToFireball = new THREE.Vector3();

  constructor(worldScene: THREE.Scene, hudScene: THREE.Scene, strategyFactory: AIStrategyFactory = new AIStrategyFactory()) {
    this.worldScene = worldScene;
    this.hudScene = hudScene;
    this.strategyFactory = strategyFactory;
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, isSmartAI: boolean, onPlayerHit?: (damage: number) => void): void {
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

      // Remove if expired (after explosion animation completes)
      if (fb.isExpired()) {
        this.removeFireball(i);
        continue;
      }

      // If fireball is far behind player, expire it
      this.scratchToFireball.subVectors(fb.position, playerPosition);
      const dot = this.scratchToFireball.dot(this.scratchPlayerForward);

      // If it's more than configured units behind the player, it's missed
      if (dot < -GameConfig.fireball.expirationDistance) {
        this.removeFireball(i);
        continue;
      }

      // Basic collision check with player (only if not already exploded)
      if (!fb.isExploded) {
        const distance = fb.position.distanceTo(playerPosition);
        if (distance < (GameConfig.fireball.collisionRadiusWorld + GameConfig.player.meshSize)) {
          if (onPlayerHit) {
            onPlayerHit(GameConfig.fireball.damage);
          }
          fb.explode();
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
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= GameConfig.tieFighter.spawnInterval) {
      this.spawnTieFighter(isSmartAI);
      this.spawnTimer = 0;
    }
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


    