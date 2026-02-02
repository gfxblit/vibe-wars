import { expect, test, describe } from 'vitest'
import { StarField } from './StarField'
import * as THREE from 'three'

describe('StarField', () => {
  test('should have 1500 stars', () => {
    const starField = new StarField();
    expect(starField.points).toBeInstanceOf(THREE.Points);
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array;
    expect(positions.length).toBe(StarField.NUM_STARS * 3);
  })

  test('should recycle stars that are too far behind', () => {
    const starField = new StarField();
    const playerPosition = new THREE.Vector3(0, 0, 0);
    
    // Manually set a star position to be behind the player
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    // Set first star at Z > FIELD_SIZE / 2
    const halfSize = StarField.FIELD_SIZE / 2;
    positions[2] = halfSize + 1; 
    starField.update(playerPosition);
    
    // It should have moved FIELD_SIZE units forward (towards -Z)
    expect(positions[2]).toBe(halfSize + 1 - StarField.FIELD_SIZE);
  })

  test('should recycle stars that are too far ahead', () => {
    const starField = new StarField();
    const playerPosition = new THREE.Vector3(0, 0, 0);
    
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    
    // Set first star at Z < -FIELD_SIZE / 2
    const halfSize = StarField.FIELD_SIZE / 2;
    positions[2] = -halfSize - 1;
    starField.update(playerPosition);
    
    // It should move FIELD_SIZE units back
    expect(positions[2]).toBe(-halfSize - 1 + StarField.FIELD_SIZE);
  })
})
