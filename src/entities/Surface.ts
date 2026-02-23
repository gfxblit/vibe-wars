import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { state } from '../state';

export type SurfaceObstacle = Tower | Turret;

export interface CollisionResult {
  floorHit: boolean;
  obstacleHit: SurfaceObstacle | null;
}

export interface SurfaceUpdateResult {
  spawned: SurfaceObstacle[];
  removed: SurfaceObstacle[];
}

export class Surface extends Entity {
  public mesh: THREE.Group;
  private obstacles: SurfaceObstacle[] = [];
  private floor: THREE.Group;
  private nextObstacleSpawnTime: number = 0;
  private elapsedTime: number = 0;
  private collisionResult: CollisionResult = { floorHit: false, obstacleHit: null };

  private currentVerticalLineHeight: number = 0;
  private currentVerticalLineNoise: number = 0;
  private currentVerticalLineDensity: number = 0;

  constructor(
    verticalLineHeight: number = GameConfig.stages.surface.verticalLineHeight,
    verticalLineNoise: number = GameConfig.stages.surface.verticalLineNoise,
    verticalLineDensity: number = GameConfig.stages.surface.verticalLineDensity
  ) {
    super();
    this.mesh = new THREE.Group();
    this.floor = new THREE.Group();
    
    this.currentVerticalLineHeight = verticalLineHeight;
    this.currentVerticalLineNoise = verticalLineNoise;
    this.currentVerticalLineDensity = verticalLineDensity;

    this.createFloor();
    this.mesh.add(this.floor);
    this.nextObstacleSpawnTime = 0;
  }

  private pseudoRandom(x: number, z: number): number {
    const angle = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
    return angle - Math.floor(angle);
  }

  private createFloor(): void {
    const { gridSpacing: surfaceGridSpacing, color: surfaceColor, floorY: surfaceFloorY } = GameConfig.stages.surface;
    const { far } = GameConfig.camera;

    const height = this.currentVerticalLineHeight;
    const noise = this.currentVerticalLineNoise;
    const density = this.currentVerticalLineDensity;
    
    // Grid size should be enough to cover the camera's far plane in all directions.
    const halfSize = far + surfaceGridSpacing * 2;
    
    const material = new THREE.LineBasicMaterial({ 
        color: surfaceColor, 
        opacity: 1.0,
        transparent: false 
    });
    
    const points: THREE.Vector3[] = [];
    
    const xStart = -halfSize;
    const xEnd = halfSize;
    const zStart = halfSize;
    const zEnd = -halfSize;
    
    const floorX = this.floor.position.x;
    const floorZ = this.floor.position.z;

    for (let x = xStart; x <= xEnd; x += surfaceGridSpacing) {
        for (let z = zStart; z >= zEnd; z -= surfaceGridSpacing) {
            // World grid indices
            const gx = Math.round((floorX + x) / surfaceGridSpacing);
            const gz = Math.round((floorZ + z) / surfaceGridSpacing);

            // Density check (deterministic)
            if (this.pseudoRandom(gx + 1234, gz + 5678) > density) {
                continue;
            }

            // Jitter (deterministic based on world position)
            const jx = (this.pseudoRandom(gx, gz) - 0.5) * noise;
            const jz = (this.pseudoRandom(gx + 999, gz + 999) - 0.5) * noise;
            
            const px = x + jx;
            const pz = z + jz;
            
            points.push(new THREE.Vector3(px, 0, pz));
            points.push(new THREE.Vector3(px, height, pz));
        }
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const gridMesh = new THREE.LineSegments(geometry, material);
    
    gridMesh.position.y = surfaceFloorY;
    
    // Clear existing floor children
    while (this.floor.children.length > 0) {
        const child = this.floor.children[0] as THREE.LineSegments;
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
            child.material.dispose();
        }
        this.floor.remove(child);
    }

    this.floor.add(gridMesh);
  }

  public updateGridSettings(height: number, noise: number, density: number): void {
    if (this.currentVerticalLineHeight !== height || 
        this.currentVerticalLineNoise !== noise || 
        this.currentVerticalLineDensity !== density) {
      this.currentVerticalLineHeight = height;
      this.currentVerticalLineNoise = noise;
      this.currentVerticalLineDensity = density;
      this.createFloor();
    }
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3): SurfaceUpdateResult {
    const result: SurfaceUpdateResult = {
      spawned: [],
      removed: []
    };

    this.elapsedTime += deltaTime;
    const playerZ = playerPosition.z;
    const spacing = GameConfig.stages.surface.gridSpacing;

    // Update floor position to follow player with snapping
    const newFloorX = Math.round(playerPosition.x / spacing) * spacing;
    const newFloorZ = Math.round(playerPosition.z / spacing) * spacing;

    if (newFloorX !== this.floor.position.x || newFloorZ !== this.floor.position.z) {
        this.floor.position.x = newFloorX;
        this.floor.position.z = newFloorZ;
        this.createFloor(); // Regenerate with new world-aligned jitter/density
    }
    
    // Spawn Obstacles
    if (this.elapsedTime >= this.nextObstacleSpawnTime) {
      const entity = this.spawnObstacle(playerPosition.x, playerZ);
      result.spawned.push(entity);
      
      const { towerSpawnInterval } = GameConfig.stages.surface;
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      const scaledInterval = GameConfig.getScaledInterval(towerSpawnInterval, multiplier);
      const interval = scaledInterval * (0.8 + Math.random() * 0.4);
      this.nextObstacleSpawnTime = this.elapsedTime + interval;
    }

    // Update Obstacles and Cleanup
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obstacle = this.obstacles[i];
        
        // Cleanup passed obstacles
        if (obstacle.mesh.position.z > playerZ + GameConfig.stages.surface.towerCleanupDistance) {
            result.removed.push(obstacle);
            this.removeObstacle(i);
            continue;
        }
    }

    return result;
  }

  private spawnObstacle(playerX: number, playerZ: number): SurfaceObstacle {
     const { width: surfaceWidth, floorY: surfaceFloorY, towerSpawnDistance, towerMarginX, turretSpawnProbability } = GameConfig.stages.surface;
     
     const spawnZ = playerZ - towerSpawnDistance; 
     
     const rangeX = surfaceWidth / 2 - towerMarginX; 
     const x = playerX + (Math.random() * 2 - 1) * rangeX;
     
     if (Math.random() < turretSpawnProbability) {
        const turretSize = GameConfig.stages.surface.turretSize;
        const turret = new Turret(new THREE.Vector3(x, surfaceFloorY, spawnZ), turretSize);
        // Rotate turret to lie flat on the ground
        turret.mesh.rotation.x = -Math.PI / 2;
        this.obstacles.push(turret);
        this.mesh.add(turret.mesh);
        return turret;
     } else {
        const tower = new Tower(new THREE.Vector3(x, surfaceFloorY, spawnZ));
        this.obstacles.push(tower);
        this.mesh.add(tower.mesh);
        return tower;
     }
  }

  private removeObstacle(index: number): void {
      const obstacle = this.obstacles[index];
      if (obstacle) {
        this.mesh.remove(obstacle.mesh);
        obstacle.dispose();
        this.obstacles.splice(index, 1);
      }
  }


  public checkCollisions(playerBox: THREE.Box3, playerPosition: THREE.Vector3): CollisionResult {
      const { floorY: surfaceFloorY } = GameConfig.stages.surface;
      // Player Y is center of ship. Ship size is roughly 1.
      this.collisionResult.floorHit = playerPosition.y - 1 < surfaceFloorY;
      this.collisionResult.obstacleHit = null;

      for (const obstacle of this.obstacles) {
          if (obstacle.checkCollision(playerBox)) {
              this.collisionResult.obstacleHit = obstacle;
              return this.collisionResult;
          }
      }

      return this.collisionResult;
  }

  public getTowers(): Tower[] {
      return this.obstacles.filter((o): o is Tower => o instanceof Tower);
  }

  public getTurrets(): Turret[] {
      return this.obstacles.filter((o): o is Turret => o instanceof Turret);
  }

  public dispose(): void {
    if (this.floor) {
        this.floor.traverse(child => {
            if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
                child.geometry.dispose();
                if (child.material instanceof THREE.Material) {
                    child.material.dispose();
                }
            }
        });
    }
    while (this.obstacles.length > 0) {
      this.removeObstacle(0);
    }
  }
}
