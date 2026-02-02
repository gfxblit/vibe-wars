import { expect, test, describe } from 'vitest'
import { Player } from './Player'
import * as THREE from 'three'

describe('Player Quaternion Turning', () => {
  test('turning on a level plane should not change forward.y', () => {
    const player = new Player();
    
    // Initial state: looking at -Z, level.
    // Give X input (turn right).
    player.update(new THREE.Vector2(1, 0), 0.1);
    
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    
    // In the CURRENT implementation, this will NOT be 0 because it rotates around banked axis.
    // In the NEW implementation (as requested), it should be 0.
    expect(forward.y).toBeCloseTo(0, 5);
  })

  test('consecutive rotations should be correctly applied using quaternions', () => {
    const player = new Player();
    
    // 1. Pitch up 45 degrees
    // TURN_SPEED_PITCH is Math.PI / 1.5
    // 45 deg = (PI/4) / (PI/1.5) = 1.5/4 = 0.375s
    player.update(new THREE.Vector2(0, 1), 0.375);
    
    let forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    expect(forward.y).toBeCloseTo(Math.sin(Math.PI / 4), 5);
    
    // 2. Yaw right 90 degrees
    // TURN_SPEED_YAW is Math.PI / 1.5
    // 90 deg = (PI/2) / (PI/1.5) = 1.5/2 = 0.75s
    player.update(new THREE.Vector2(1, 0), 0.75);
    
    forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    
    // If we pitched up 45 deg (looking at -Z and +Y), and then yawed 90 deg right (relative to our ship),
    // we should now be looking at our old local RIGHT axis, which was (1, 0, 0).
    expect(forward.x).toBeCloseTo(1, 5);
    expect(forward.y).toBeCloseTo(0, 5);
    expect(forward.z).toBeCloseTo(0, 5);
  })
})
