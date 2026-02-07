import * as THREE from 'three';
import { TieFighter } from './TieFighter';
import { AIStrategyFactory } from './AIStrategyFactory';
import { GameConfig } from '../config';
import { Fireball } from './Fireball';

export class EntityManager {
  private tieFighters: TieFighter[] = [];
  private spawnTimer: number = 0;
  private scene: THREE.Scene;
  private strategyFactory: AIStrategyFactory;

  constructor(scene: THREE.Scene, strategyFactory: AIStrategyFactory = new AIStrategyFactory()) {
    this.scene = scene;
    this.strategyFactory = strategyFactory;
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion, isSmartAI: boolean): { newFireballs: Fireball[] } {
    const newFireballs: Fireball[] = [];
    const playerForward = new THREE.Vector3(0, 0, -1).applyQuaternion(playerQuaternion);

    // Update existing TIE fighters
    for (let i = this.tieFighters.length - 1; i >= 0; i--) {
      const tf = this.tieFighters[i];
      const fireDirection = tf.update(deltaTime, playerPosition, playerQuaternion);

      if (fireDirection && !tf.isExploded) {
        // Inherit player's forward velocity so the fireball closure rate is exactly relativeSpeed
        const playerVelocity = playerForward.clone().multiplyScalar(GameConfig.player.forwardSpeed);
        const relativeVelocity = fireDirection.multiplyScalar(GameConfig.fireball.relativeSpeed);
        const totalVelocity = playerVelocity.add(relativeVelocity);
        
        const fireball = new Fireball(tf.position.clone(), totalVelocity);
        newFireballs.push(fireball);
      }

      // Cleanup distant TIE fighters
      const distance = tf.position.distanceTo(playerPosition);
      if (distance > GameConfig.tieFighter.cleanupDistance) {
        this.removeTieFighter(i);
      }
    }

    // Spawn new TIE fighters
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= GameConfig.tieFighter.spawnInterval) {
      this.spawnTieFighter(isSmartAI);
      this.spawnTimer = 0;
    }

    return { newFireballs };
  }

  public spawnTieFighter(isSmartAI: boolean): void {
    const strategy = this.strategyFactory.createStrategy(isSmartAI);
    const tf = new TieFighter(strategy);
    this.tieFighters.push(tf);
    this.scene.add(tf.mesh);
  }

  private removeTieFighter(index: number): void {
    const tf = this.tieFighters[index];
    this.scene.remove(tf.mesh);
    tf.dispose();
    this.tieFighters.splice(index, 1);
  }

  public getTieFighters(): TieFighter[] {
    return this.tieFighters;
  }

  public clear(): void {
    this.tieFighters.forEach(tf => {
        this.scene.remove(tf.mesh);
        tf.dispose();
    });
    this.tieFighters = [];
    this.spawnTimer = 0;
  }
}