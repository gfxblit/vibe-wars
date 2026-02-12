import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { Tower } from './Tower';

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
    const { surfaceLength, surfaceWidth, surfaceGridSpacing, surfaceColor, surfaceFloorY } = GameConfig.stage;
    
    const material = new THREE.LineBasicMaterial({ 
        color: surfaceColor, 
        opacity: 0.5,
        transparent: true 
    });
    
    const points: THREE.Vector3[] = [];
    
    // Longitudinal lines (along Z)
    const zStart = 0;
    const zEnd = -surfaceLength;
    const xStart = -surfaceWidth / 2;
    const xEnd = surfaceWidth / 2;
    
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

  public update(deltaTime: number, playerPosition: THREE.Vector3, spawnFireball?: (pos: THREE.Vector3, vel: THREE.Vector3) => void): void {
    this.elapsedTime += deltaTime;
    const playerZ = playerPosition.z;
    
    // Spawn Towers
    if (this.elapsedTime >= this.nextTowerSpawnTime) {
      this.spawnTower(playerZ);
      
      const { towerSpawnInterval } = GameConfig.stage;
      const interval = towerSpawnInterval * (0.8 + Math.random() * 0.4);
      this.nextTowerSpawnTime = this.elapsedTime + interval;
    }

    // Update Towers
    for (let i = this.towers.length - 1; i >= 0; i--) {
        const tower = this.towers[i];
        
        // Cleanup passed towers
        if (tower.mesh.position.z > playerZ + GameConfig.stage.towerCleanupDistance) {
            this.removeTower(i);
            continue;
        }

        // Firing logic
        if (!tower.isDestroyed && spawnFireball) {
          const fireDir = tower.update(deltaTime, playerPosition);
          if (fireDir) {
            const vel = fireDir.multiplyScalar(GameConfig.fireball.relativeSpeed);
            spawnFireball(tower.mesh.position.clone(), vel);
          }
        } else {
             // Still need to update cooldown if we want consistent timing? 
             // Or just update if destroyed?
             // tower.update checks isDestroyed internally.
             tower.update(deltaTime, playerPosition);
        }
    }
  }

  private spawnTower(playerZ: number): void {
     const { surfaceWidth, surfaceFloorY, towerSpawnDistance, towerMarginX } = GameConfig.stage;
     
     const spawnZ = playerZ - towerSpawnDistance; 
     
     const rangeX = surfaceWidth / 2 - towerMarginX; 
     const x = (Math.random() * 2 - 1) * rangeX;
     
     const tower = new Tower(new THREE.Vector3(x, surfaceFloorY, spawnZ));
     this.towers.push(tower);
     this.mesh.add(tower.mesh);
  }

  private removeTower(index: number): void {
      const tower = this.towers[index];
      if (tower) {
        this.mesh.remove(tower.mesh);
        tower.dispose();
        this.towers.splice(index, 1);
      }
  }

  public checkCollisions(playerBox: THREE.Box3, playerPosition: THREE.Vector3): CollisionResult {
      const { surfaceFloorY } = GameConfig.stage;
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
