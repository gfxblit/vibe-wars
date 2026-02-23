import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { state } from '../state';

export interface CollisionResult {
  floorHit: boolean;
  towerHit: Tower | null;
  turretHit: Turret | null;
}

export interface SurfaceUpdateResult {
  spawned: (Tower | Turret)[];
  removed: (Tower | Turret)[];
}

export class Surface extends Entity {
  public mesh: THREE.Group;
  private towers: Tower[] = [];
  private turrets: Turret[] = [];
  private floor: THREE.Group;
  private nextTowerSpawnTime: number = 0;
  private elapsedTime: number = 0;
  private collisionResult: CollisionResult = { floorHit: false, towerHit: null, turretHit: null };

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
    this.nextTowerSpawnTime = 0;
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
    
    // Spawn Towers/Turrets
    if (this.elapsedTime >= this.nextTowerSpawnTime) {
      const entity = this.spawnTower(playerPosition.x, playerZ);
      result.spawned.push(entity);
      
      const { towerSpawnInterval } = GameConfig.stages.surface;
      const multiplier = GameConfig.getDifficultyMultiplier(state.wave);
      const scaledInterval = GameConfig.getScaledInterval(towerSpawnInterval, multiplier);
      const interval = scaledInterval * (0.8 + Math.random() * 0.4);
      this.nextTowerSpawnTime = this.elapsedTime + interval;
    }

    // Update Towers and Cleanup
    for (let i = this.towers.length - 1; i >= 0; i--) {
        const tower = this.towers[i];
        
        // Cleanup passed towers
        if (tower.mesh.position.z > playerZ + GameConfig.stages.surface.towerCleanupDistance) {
            result.removed.push(tower);
            this.removeTower(i);
            continue;
        }
    }

    // Update Turrets and Cleanup
    for (let i = this.turrets.length - 1; i >= 0; i--) {
        const turret = this.turrets[i];
        
        // Cleanup passed turrets
        if (turret.mesh.position.z > playerZ + GameConfig.stages.surface.towerCleanupDistance) {
            result.removed.push(turret);
            this.removeTurret(i);
            continue;
        }
    }

    return result;
  }

  private spawnTower(playerX: number, playerZ: number): Tower | Turret {
     const { width: surfaceWidth, floorY: surfaceFloorY, towerSpawnDistance, towerMarginX, turretSpawnProbability } = GameConfig.stages.surface;
     
     const spawnZ = playerZ - towerSpawnDistance; 
     
     const rangeX = surfaceWidth / 2 - towerMarginX; 
     const x = playerX + (Math.random() * 2 - 1) * rangeX;
     
     if (Math.random() < turretSpawnProbability) {
        const turretSize = GameConfig.stages.surface.turretSize;
        const turret = new Turret(new THREE.Vector3(x, surfaceFloorY, spawnZ), turretSize);
        // Rotate turret to lie flat on the ground
        turret.mesh.rotation.x = -Math.PI / 2;
        this.turrets.push(turret);
        this.mesh.add(turret.mesh);
        return turret;
     } else {
        const tower = new Tower(new THREE.Vector3(x, surfaceFloorY, spawnZ));
        this.towers.push(tower);
        this.mesh.add(tower.mesh);
        return tower;
     }
  }

  private removeTurret(index: number): void {
      const turret = this.turrets[index];
      if (turret) {
        this.mesh.remove(turret.mesh);
        turret.dispose();
        this.turrets.splice(index, 1);
      }
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
      const { floorY: surfaceFloorY } = GameConfig.stages.surface;
      // Player Y is center of ship. Ship size is roughly 1.
      this.collisionResult.floorHit = playerPosition.y - 1 < surfaceFloorY;
      this.collisionResult.towerHit = null;
      this.collisionResult.turretHit = null;

      for (const tower of this.towers) {
          if (tower.checkCollision(playerBox)) {
              this.collisionResult.towerHit = tower;
              return this.collisionResult;
          }
      }

      for (const turret of this.turrets) {
        if (turret.checkCollision(playerBox)) {
            this.collisionResult.turretHit = turret;
            return this.collisionResult;
        }
      }

      return this.collisionResult;
  }

  public getTowers(): Tower[] {
      return this.towers;
  }

  public getTurrets(): Turret[] {
      return this.turrets;
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
    while (this.turrets.length > 0) {
      this.removeTurret(0);
    }
  }
}
