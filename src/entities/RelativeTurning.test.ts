import { expect, test, describe } from 'vitest'
import { Player } from './Player'
import * as THREE from 'three'

describe('Player Relative Turning', () => {
  test('yaw should be relative to current orientation, not world Y', () => {
    const player = new Player();
    
    // 1. Pitch up 90 degrees (looking straight up at +Y)
    // TURN_SPEED_PITCH is Math.PI / 1.5
    // 90 deg is 0.75s
    player.update(new THREE.Vector2(0, 1), 0.75);
    
    // Confirm we are looking UP
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    expect(forward.y).toBeGreaterThan(0.99);
    
    // At this point:
    // Local Forward is World +Y
    // Local Up is World -Z (since we tilted up from -Z)
    // Local Right is World +X
    
    // 2. Now "turn right" (input.x = 1).
    // In a relative system, "turning right" means rotating around LOCAL UP.
    // Local UP is World -Z.
    // So rotating around World -Z should change where our LOCAL FORWARD (+Y world) is pointing?
    // Wait. If we rotate around an axis that our forward vector is NOT aligned with, 
    // our forward vector should change.
    
    // WAIT. If Local Up is World -Z, and Local Forward is World +Y.
    // Rotating around Local Up (-Z) will rotate the Forward vector (+Y) in the XY plane.
    
    player.update(new THREE.Vector2(1, 0), 0.1);
    
    const newForward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    
    // In the CURRENT (absolute/Euler) implementation:
    // Yaw is around WORLD Y.
    // Since we are looking AT world Y, rotating around world Y should NOT change the forward vector.
    // It should only ROLL the ship.
    
    // If it's absolute, newForward should still be roughly (0, 1, 0)
    // If it's relative, newForward should have moved!
    
    expect(newForward.y).toBeLessThan(0.99); // This should FAIL with current implementation
  })
})