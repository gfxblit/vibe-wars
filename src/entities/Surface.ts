import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Surface extends Entity {
  public mesh: THREE.Group;
  private floor: THREE.Group;

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

  public update(_deltaTime: number, playerPosition: THREE.Vector3): void {
    const spacing = GameConfig.stages.surface.gridSpacing;

    // Update floor position to follow player with snapping
    const newFloorX = Math.round(playerPosition.x / spacing) * spacing;
    const newFloorZ = Math.round(playerPosition.z / spacing) * spacing;

    if (newFloorX !== this.floor.position.x || newFloorZ !== this.floor.position.z) {
        this.floor.position.x = newFloorX;
        this.floor.position.z = newFloorZ;
        this.createFloor(); // Regenerate with new world-aligned jitter/density
    }
  }

  public checkFloorCollision(playerPosition: THREE.Vector3): boolean {
    const { floorY: surfaceFloorY } = GameConfig.stages.surface;
    return playerPosition.y - 1 < surfaceFloorY;
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
  }
}
