import * as THREE from 'three';
import { Entity } from './Entity';

export class PlayerShip extends Entity {
  constructor() {
    super();
    
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    
    // Simple nose geometry (tapered box)
    const noseVertices = new Float32Array([
      // Back frame (around cockpit)
      -2, 1, 0,  2, 1, 0,
       2, 1, 0,  2, -1, 0,
       2, -1, 0, -2, -1, 0,
      -2, -1, 0, -2, 1, 0,
      
      // Front frame (tip of nose)
      -0.5, 0.3, -8,  0.5, 0.3, -8,
       0.5, 0.3, -8,  0.5, -0.3, -8,
       0.5, -0.3, -8, -0.5, -0.3, -8,
      -0.5, -0.3, -8, -0.5, 0.3, -8,
      
      // Connecting lines
      -2, 1, 0, -0.5, 0.3, -8,
       2, 1, 0,  0.5, 0.3, -8,
       2, -1, 0,  0.5, -0.3, -8,
      -2, -1, 0, -0.5, -0.3, -8
    ]);
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(noseVertices, 3));
    
    const nose = new THREE.LineSegments(geometry, material);
    this.mesh.add(nose);
    
    // Add cannons (the four tips visible in the corners)
    const cannonVertices = new Float32Array([
        -8, 4, -2, -7, 3.5, -10, // Top left
         8, 4, -2,  7, 3.5, -10, // Top right
        -8, -4, -2, -7, -3.5, -10, // Bottom left
         8, -4, -2,  7, -3.5, -10  // Bottom right
    ]);
    const cannonGeometry = new THREE.BufferGeometry();
    cannonGeometry.setAttribute('position', new THREE.BufferAttribute(cannonVertices, 3));
    const cannons = new THREE.LineSegments(cannonGeometry, material);
    this.mesh.add(cannons);
  }
}
