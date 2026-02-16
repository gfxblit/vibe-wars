import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Laser extends Entity {
  public readonly mesh: THREE.Mesh;
  private progress: number = 0; // 0 to 1
  
  private readonly originX: number;
  private readonly originY: number;
  private readonly targetX: number;
  private readonly targetY: number;
  private readonly color: number;

  private static geometry: THREE.PlaneGeometry;
  private static materials: Map<number, THREE.MeshBasicMaterial> = new Map();

  constructor(originX: number, originY: number, targetX: number, targetY: number, color: number) {
    super();
    this.originX = originX;
    this.originY = originY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;

    // Initialize static geometry if not exists
    if (!Laser.geometry) {
      Laser.geometry = new THREE.PlaneGeometry(1, 1);
    }

    // Get or create material
    let material = Laser.materials.get(color);
    if (!material) {
      material = new THREE.MeshBasicMaterial({
        color: this.color,
        transparent: true,
        opacity: 1.0,
        depthTest: false
      });
      Laser.materials.set(color, material);
    }
    
    this.mesh = new THREE.Mesh(Laser.geometry, material);
    
    this.updateMeshTransform();
  }

  private updateMeshTransform(): void {
    // Interpolate in 2D NDC space
    // boltLength is normalized based on depth (e.g. 30 / 200 = 0.15 of screen travel)
    const normBoltLength = GameConfig.laser.boltLength / GameConfig.laser.targetDepth;
    
    const startP = this.progress;
    const endP = Math.min(1.0, this.progress + normBoltLength);

    // Linear interpolation manually to avoid Vector2 allocation
    const startX = this.originX + (this.targetX - this.originX) * startP;
    const startY = this.originY + (this.targetY - this.originY) * startP;

    const endX = this.originX + (this.targetX - this.originX) * endP;
    const endY = this.originY + (this.targetY - this.originY) * endP;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    // Position at the center of the bolt segment
    const centerX = (startX + endX) * 0.5;
    const centerY = (startY + endY) * 0.5;

    this.mesh.position.set(centerX, centerY, 0);
    
    // Rotate to align with trajectory
    // Standard PlaneGeometry(1,1) faces +Z, with its 'up' along +Y.
    // We rotate it around Z. Subtract Math.PI/2 because we want it to point along X initially.
    this.mesh.rotation.z = angle - Math.PI / 2;

    // Scale
    // thickness: 10 pixels on a 1000px screen is 0.01.
    // We use a fixed scale factor for 'vibe'.
    // Assuming a reference height of 2000px for consistent thickness scaling.
    // NDC height is 2, so 1px = 2 / 2000 = 0.001 NDC units.
    const NDC_PER_PIXEL = 0.001;
    const thicknessScale = GameConfig.laser.thickness * NDC_PER_PIXEL; 
    this.mesh.scale.set(thicknessScale, length, 1);
  }

  public update(dt: number): void {
    // Constant speed in 2D space
    // distance / time = speed. 
    // targetDepth / speed = total duration.
    const duration = GameConfig.laser.targetDepth / GameConfig.laser.speed;
    this.progress += (1.0 / duration) * dt;
    this.updateMeshTransform();
  }

  public isExpired(): boolean {
    return this.progress >= 1.0;
  }

  public dispose(): void {
    // Do NOT dispose shared geometry and material to allow reuse.
    // EntityManager removes mesh from scene.
  }
}
