import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Laser extends Entity {
  public readonly mesh: THREE.Mesh;
  private progress: number = 0; // 0 to 1
  
  private readonly origin2D: THREE.Vector2;
  private readonly target2D: THREE.Vector2;
  private readonly color: number;

  private static geometry: THREE.PlaneGeometry;
  private static materials: Map<number, THREE.MeshBasicMaterial> = new Map();

  constructor(origin2D: THREE.Vector2, target2D: THREE.Vector2, color: number) {
    super();
    this.origin2D = origin2D.clone();
    this.target2D = target2D.clone();
    this.color = color;

    // Use shared geometry
    if (!Laser.geometry) {
      Laser.geometry = new THREE.PlaneGeometry(1, 1);
    }

    // Use shared material per color
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

    const start = new THREE.Vector2().lerpVectors(this.origin2D, this.target2D, startP);
    const end = new THREE.Vector2().lerpVectors(this.origin2D, this.target2D, endP);

    const delta = new THREE.Vector2().subVectors(end, start);
    const length = delta.length();
    const angle = Math.atan2(delta.y, delta.x);

    // Position at the center of the bolt segment
    const center = new THREE.Vector2().lerpVectors(start, end, 0.5);
    this.mesh.position.set(center.x, center.y, 0);
    
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
    // Shared geometry and materials should NOT be disposed as they are reused by all lasers
    // The mesh itself will be garbage collected when removed from the scene
  }
}