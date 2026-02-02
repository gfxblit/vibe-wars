import { expect, test, describe } from 'vitest'
import { Player } from './Player'
import * as THREE from 'three'

describe('Player Relative Turning with Bank', () => {
  test('turning while banked should be relative to the banked orientation', () => {
    const player = new Player();
    
    // 1. Give X input (turn right). This will also bank the ship right.
    // MAX_BANK is 45 deg.
    // Input is (1, 0) for right.
    
    // If turning is relative to the bank, then "turning right" should be around the TILTED up axis.
    // Initial state: Forward = -Z, Up = +Y, Right = +X.
    // Bank right 45 deg: New Up = (+0.707, +0.707, 0) approx, New Right = (+0.707, -0.707, 0) approx.
    
    player.update(new THREE.Vector2(1, 0), 0.1);
    
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(player.mesh.quaternion);
    
    // If it's relative to the BANKED ship, forward.y should change from 0.
    expect(forward.y).not.toBe(0);
  })
})
