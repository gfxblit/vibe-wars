import * as THREE from 'three';
import { GameConfig } from './config';

export function checkAim(target: THREE.Vector3, input: { x: number, y: number }, camera: THREE.Camera): boolean {
  // 1. Check if target is behind camera
  const targetDir = target.clone().sub(camera.position).normalize();
  const cameraDir = new THREE.Vector3();
  camera.getWorldDirection(cameraDir);

  // If dot product is negative, it's behind the camera (angle > 90 degrees)
  // Actually, wait. dot(targetDir, cameraDir) > 0 means in front (angle < 90)
  if (targetDir.dot(cameraDir) <= 0) {
    return false;
  }

  // 2. Project target to NDC
  const projected = target.clone().project(camera);

  // 3. Calculate distance
  // projected.x and .y are in NDC [-1, 1]
  // input.x and .y are in NDC [-1, 1]
  const dx = projected.x - input.x;
  const dy = projected.y - input.y;
  
  // We ignore Z for distance check (screen space distance)
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < GameConfig.core.aimTolerance;
}
