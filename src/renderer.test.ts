import { expect, test, describe } from 'vitest'
import * as THREE from 'three'
import { updateCamera } from './renderer'

describe('Renderer Utils', () => {
  test('updateCamera should position camera behind player', () => {
    const camera = new THREE.PerspectiveCamera();
    const playerPosition = new THREE.Vector3(0, 0, -100);
    
    updateCamera(camera, playerPosition);
    
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(2);
    expect(camera.position.z).toBe(-90); // -100 + 10
  })
})
