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

  test('should recycle stars in X and Y dimensions', () => {
    const starField = new StarField();
    const playerPosition = new THREE.Vector3(0, 0, 0);
    const halfSize = StarField.FIELD_SIZE / 2;
    const geometry = starField.points.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;

    // Test X recycling
    positions[0] = halfSize + 1; // Too far right
    starField.update(playerPosition);
    expect(positions[0]).toBe(halfSize + 1 - StarField.FIELD_SIZE);

    positions[0] = -halfSize - 1; // Too far left
    starField.update(playerPosition);
    expect(positions[0]).toBe(-halfSize - 1 + StarField.FIELD_SIZE);

    // Test Y recycling
    positions[1] = halfSize + 1; // Too far up
    starField.update(playerPosition);
    expect(positions[1]).toBe(halfSize + 1 - StarField.FIELD_SIZE);

    positions[1] = -halfSize - 1; // Too far down
    starField.update(playerPosition);
    expect(positions[1]).toBe(-halfSize - 1 + StarField.FIELD_SIZE);
  })

  test('should disable frustum culling', () => {
    const starField = new StarField();
    expect(starField.points.frustumCulled).toBe(false);
  })
})
