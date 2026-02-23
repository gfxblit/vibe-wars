import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { Tower } from './Tower';
import { state } from '../state';
import { EntityManager } from './EntityManager';

export interface CollisionResult {
  floorHit: boolean;
  towerHit: Tower | null;
}

export class Surface extends Entity {
  public mesh: THREE.Group;
  private towers: Tower[] = [];
  private floor: THREE.Group;
  private nextTowerSpawnTime: number = 0;
  private elapsedTime: number = 0;
  private collisionResult: CollisionResult = { floorHit: false, towerHit: null };

  constructor() {
    super();
    this.mesh = new THREE.Group();
    this.floor = new THREE.Group();
    this.createFloor();
    this.mesh.add(this.floor);
    this.nextTowerSpawnTime = 0;
  }

  private createFloor(): void {
    const { gridSpacing: surfaceGridSpacing, color: surfaceColor, floorY: surfaceFloorY } = GameConfig.stages.surface;
    const { far } = GameConfig.camera;

    // Grid size should be enough to cover the camera's far plane in all directions.
    // We add a buffer of two grid spacings to ensure that even when the floor is 
    // snapped and the player is at the edge of a grid square, the grid still 
    // extends beyond the camera far plane.
    const halfSize = far + surfaceGridSpacing * 2;
    
    const material = new THREE.LineBasicMaterial({ 
        color: surfaceColor, 
        opacity: 0.5,
        transparent: true 
    });
    
    const points: THREE.Vector3[] = [];
    
    // Longitudinal lines (along Z)
    const zStart = halfSize;
    const zEnd = -halfSize;
    const xStart = -halfSize;
    const xEnd = halfSize;
    
    for (let x = xStart; x <= xEnd; x += surfaceGridSpacing) {
        points.push(new THREE.Vector3(x, 0, zStart));
        points.push(new THREE.Vector3(x, 0, zEnd));
    }
    
    // Latitudinal lines (along X)
    for (let z = zStart; z >= zEnd; z -= surfaceGridSpacing) {
        points.push(new THREE.Vector3(xStart, 0, z));
        points.push(new THREE.Vector3(xEnd, 0, z));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const gridMesh = new THREE.LineSegments(geometry, material);
    
    gridMesh.position.y = surfaceFloorY;
    
    this.floor.add(gridMesh);
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, entityManager?: EntityManager): void {
    this.elapsedTime += deltaTime;
    const playerZ = playerPosition.z;
    const spacing = GameConfig.stages.surface.gridSpacing;

    // Update floor position to follow player with snapping
    this.floor.position.x = Math.round(playerPosition.x / spacing) * spacing;
    this.floor.position.z = Math.round(playerPosition.z / spacing) * spacing;
    
    // Spawn Towers
    if (this.elapsedTime >= this.nextTowerSpawnTime) {
      this.spawnTower(playerPosition.x, playerZ, entityManager);
      
      const { towerSpawnInterval } = GameConfig.stages.surface;
      const interval = towerSpawnInterval * (0.8 + Math.random() * 0.4);
      this.nextTowerSpawnTime = this.elapsedTime + interval;
    }

    // Update Towers
    for (let i = this.towers.length - 1; i >= 0; i--) {
        const tower = this.towers[i];
        
        // Cleanup passed towers
        if (tower.mesh.position.z > playerZ + GameConfig.stages.surface.towerCleanupDistance) {
            this.removeTower(i, entityManager);
            continue;
        }
    }
  }

  private spawnTower(playerX: number, playerZ: number, entityManager?: EntityManager): void {
     const { width: surfaceWidth, floorY: surfaceFloorY, towerSpawnDistance, towerMarginX } = GameConfig.stages.surface;
     
     const spawnZ = playerZ - towerSpawnDistance; 
     
     const rangeX = surfaceWidth / 2 - towerMarginX; 
     const x = playerX + (Math.random() * 2 - 1) * rangeX;
     
     const tower = new Tower(new THREE.Vector3(x, surfaceFloorY, spawnZ));
     this.towers.push(tower);
     this.mesh.add(tower.mesh);

     const manager = entityManager || state.entityManager;
     if (manager) {
       manager.addTarget(tower);
     }
  }

  private removeTower(index: number, entityManager?: EntityManager): void {
      const tower = this.towers[index];
      if (tower) {
        const manager = entityManager || state.entityManager;
        if (manager) {
          manager.removeTarget(tower);
        }
        this.mesh.remove(tower.mesh);
        tower.dispose();
        this.towers.splice(index, 1);
      }
  }

  public checkCollisions(playerBox: THREE.Box3, playerPosition: THREE.Vector3): CollisionResult {
      const { floorY: surfaceFloorY } = GameConfig.stages.surface;
      // Player Y is center of ship. Ship size is roughly 1.
      this.collisionResult.floorHit = playerPosition.y - 1 < surfaceFloorY;
      this.collisionResult.towerHit = null;

      for (const tower of this.towers) {
          if (tower.checkCollision(playerBox)) {
              this.collisionResult.towerHit = tower;
              break; 
          }
      }
      return this.collisionResult;
  }

  public getTowers(): Tower[] {
      return this.towers;
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
    while (this.towers.length > 0) {
      this.removeTower(0);
    }
  }
}
