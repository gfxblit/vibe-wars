import { expect, test, describe } from 'vitest';
import * as THREE from 'three';
import { checkAim } from './collision';
import { GameConfig } from './config';

describe('checkAim', () => {
  test('should return true when target is under the cursor', () => {
    const target = new THREE.Vector3(0, 0, -10);
    const cursor = { x: 0, y: 0 };
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    expect(checkAim(target, cursor, camera)).toBe(true);
  });

  test('should return false when target is far from the cursor', () => {
    const target = new THREE.Vector3(5, 5, -10); // Far top-right
    const cursor = { x: 0, y: 0 };
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    expect(checkAim(target, cursor, camera)).toBe(false);
  });

  test('should return false when target is behind the camera', () => {
    const target = new THREE.Vector3(0, 0, 10); // Behind
    const cursor = { x: 0, y: 0 };
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();

    expect(checkAim(target, cursor, camera)).toBe(false);
  });

  test('should respect GameConfig.core.aimTolerance', () => {
    const tolerance = GameConfig.core.aimTolerance;
    
    // Just inside tolerance
    const targetInside = new THREE.Vector3(0, 0, -10);
    const cursorInside = { x: tolerance * 0.9, y: 0 }; // In NDC X
    
    // Just outside tolerance
    const targetOutside = new THREE.Vector3(0, 0, -10);
    const cursorOutside = { x: tolerance * 1.1, y: 0 }; // In NDC X

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    camera.updateMatrixWorld();
    
    // We mock project behavior because actual projection depends on FOV/Aspect
    // But for this integration test using a real camera is better if we control the math.
    // However, strictly unit testing logic:
    
    // Let's rely on the fact that (0,0,-10) projects to (0,0) in NDC for this camera setup.
    // So cursor at (tolerance * 0.9, 0) should be distance tolerance * 0.9 < tolerance -> true
    
    expect(checkAim(targetInside, cursorInside, camera)).toBe(true);
    expect(checkAim(targetOutside, cursorOutside, camera)).toBe(false);
  });
});
