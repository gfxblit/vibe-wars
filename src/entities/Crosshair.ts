import * as THREE from 'three';
import { Entity } from './Entity';

export class Crosshair extends Entity {
  public static readonly COLOR = 0xff0000;

  constructor() {
    super();
    
    const material = new THREE.LineBasicMaterial({ color: Crosshair.COLOR });
    
    // Crosshair geometry: a diamond/square with inner lines
    const size = 0.5;
    const inner = 0.15;
    const vertices = new Float32Array([
      // Outer diamond
      -size, 0, 0, 0, size, 0,
      0, size, 0, size, 0, 0,
      size, 0, 0, 0, -size, 0,
      0, -size, 0, -size, 0, 0,
      
      // Inner cross
      -inner, 0, 0, inner, 0, 0,
      0, -inner, 0, 0, inner, 0,
      
      // Corner "ticks"
      -size, size, 0, (-size + inner), (size - inner), 0,
      size, size, 0, (size - inner), (size - inner), 0,
      -size, -size, 0, (-size + inner), (-size + inner), 0,
      size, -size, 0, (size - inner), (-size + inner), 0
    ]);
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const lineSegments = new THREE.LineSegments(geometry, material);
    this.mesh.add(lineSegments);
  }
}
