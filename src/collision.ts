import * as THREE from 'three';
import { GameConfig } from './config';

const scratchTargetDir = new THREE.Vector3();
const scratchCameraDir = new THREE.Vector3();
const scratchProjected = new THREE.Vector3();

export function checkAim(target: THREE.Vector3, input: { x: number, y: number }, camera: THREE.Camera): boolean {
  // 1. Check if target is behind camera
  scratchTargetDir.subVectors(target, camera.position).normalize();
  camera.getWorldDirection(scratchCameraDir);

  // If dot product is negative, it's behind the camera (angle > 90 degrees)
  // Actually, wait. dot(targetDir, cameraDir) > 0 means in front (angle < 90)
  if (scratchTargetDir.dot(scratchCameraDir) <= 0) {
    return false;
  }

  // 2. Project target to NDC
  scratchProjected.copy(target).project(camera);

  // 3. Calculate distance
  // projected.x and .y are in NDC [-1, 1]
  // input.x and .y are in NDC [-1, 1]
  const dx = scratchProjected.x - input.x;
  const dy = scratchProjected.y - input.y;
  
  // We ignore Z for distance check (screen space distance)
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < GameConfig.core.aimTolerance;
}
