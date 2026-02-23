import * as THREE from 'three';
import { SurfaceObstacle } from './SurfaceObstacle';
import { SurfaceObstacleFactory } from './SurfaceObstacleFactory';
import { GameConfig } from '../config';
import { EntityManager } from './EntityManager';

export class SurfaceSpawner {
  private obstacles: SurfaceObstacle[] = [];
  private elapsedTime: number = 0;
  private nextObstacleSpawnTime: number = 0;

  constructor(
    private targetScene: THREE.Object3D,
    private factory: SurfaceObstacleFactory,
    private entityManager: EntityManager
  ) {}

  public update(deltaTime: number, playerPosition: THREE.Vector3): void {
    this.elapsedTime += deltaTime;
    const playerZ = playerPosition.z;

    // Spawn Obstacles
    if (this.elapsedTime >= this.nextObstacleSpawnTime) {
      this.spawnObstacle(playerPosition.x, playerZ);
      
      const { towerSpawnInterval } = GameConfig.stages.surface;
      const interval = towerSpawnInterval * (0.8 + Math.random() * 0.4);
      this.nextObstacleSpawnTime = this.elapsedTime + interval;
    }

    // Update/Cleanup Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      if (obstacle.mesh.position.z > playerZ + GameConfig.stages.surface.towerCleanupDistance) {
        this.removeObstacle(i);
      }
    }
  }

  private spawnObstacle(playerX: number, playerZ: number): void {
    const { width: surfaceWidth, floorY: surfaceFloorY, towerSpawnDistance, towerMarginX } = GameConfig.stages.surface;
    
    const spawnZ = playerZ - towerSpawnDistance; 
    const rangeX = surfaceWidth / 2 - towerMarginX; 
    const x = playerX + (Math.random() * 2 - 1) * rangeX;
    
    const obstacle = this.factory.createRandom(new THREE.Vector3(x, surfaceFloorY, spawnZ));
    
    this.obstacles.push(obstacle);
    this.targetScene.add(obstacle.mesh);
    this.entityManager.addTarget(obstacle);
  }

  private removeObstacle(index: number): void {
    const obstacle = this.obstacles[index];
    if (obstacle) {
      this.entityManager.removeTarget(obstacle);
      this.targetScene.remove(obstacle.mesh);
      obstacle.dispose();
      this.obstacles.splice(index, 1);
    }
  }

  public checkCollisions(playerBox: THREE.Box3): SurfaceObstacle | null {
    for (const obstacle of this.obstacles) {
      if (obstacle.checkCollision(playerBox)) {
        return obstacle;
      }
    }
    return null;
  }

  public getObstacles(): SurfaceObstacle[] {
    return this.obstacles;
  }

  public dispose(): void {
    while (this.obstacles.length > 0) {
      this.removeObstacle(0);
    }
  }
}
