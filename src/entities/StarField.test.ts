import { expect, test, describe } from 'vitest'
import { StarField } from './StarField'
import * as THREE from 'three'

describe('StarField', () => {
  test('should have 1500 stars', () => {
    const starField = new StarField();
    expect(starField.points).toBeInstanceOf(THREE.Points);
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array;
    expect(positions.length).toBe(1500 * 3);
  })

  test('should recycle stars that are too far behind', () => {
    const starField = new StarField();
    const playerPosition = new THREE.Vector3(0, 0, 0);
    
    // Manually set a star position to be behind the player
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    // Set first star at Z = 251 (behind camera if moving towards -Z)
    // Actually the issue says "moving into the screen" which usually means -Z.
    // "if a star is > 250 units behind, move it 500 units forward"
    // If player is at 0 and moving towards -Z, "behind" is positive Z.
    
    positions[2] = 251; 
    starField.update(playerPosition);
    
    // It should have moved 500 units forward (towards -Z)
    // 251 - 500 = -249
    expect(positions[2]).toBe(-249);
  })

  test('should recycle stars that are too far ahead', () => {
    const starField = new StarField();
    const playerPosition = new THREE.Vector3(0, 0, 0);
    
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    // Set first star at Z = -251 (too far ahead)
    positions[2] = -251;
    starField.update(playerPosition);
    
    // It should move 500 units back
    // -251 + 500 = 249
    expect(positions[2]).toBe(249);
  })
})
