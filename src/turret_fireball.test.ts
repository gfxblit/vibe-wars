import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { EntityManager } from './entities/EntityManager';
import { Turret } from './entities/Turret';
import { Player } from './entities/Player';
import { GameConfig } from './config';
import { state, initGame } from './state';
import { DogfightCombatStrategy } from './CombatStrategies';

describe('Turret Fireball Movement', () => {
  let scene: THREE.Scene;
  let hudScene: THREE.Scene;
  let entityManager: EntityManager;
  let player: Player;

  beforeEach(() => {
    scene = new THREE.Scene();
    hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    entityManager = state.entityManager!;
    entityManager.clear(); // Clear default TIE fighter
    player = state.player!;
  });

  it('should fire fireballs that move towards the player in TRENCH stage', () => {
    // Trench stage speed
    const playerSpeed = GameConfig.player.forwardSpeeds.TRENCH; // 500
    
    // Player at Z = 0
    player.position.set(0, 0, 0);
    // Player moving forward (negative Z)
    const playerQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);
    
    // Turret at Z = -500 (ahead of player)
    const turretPos = new THREE.Vector3(0, 0, -500);
    const turret = new Turret(turretPos);
    entityManager.addTarget(turret);

    // Force turret to fire
    (turret as any).fireCooldown = 0;
    
    // Update entityManager
    entityManager.update(0.1, player.position, playerQuaternion, false, new THREE.Camera(), playerSpeed);
    
    const fireballs = entityManager.getFireballs();
    expect(fireballs.length).toBe(1);
    
    const fireball = fireballs[0];
    const initialZ = fireball.position.z;
    expect(initialZ).toBe(-500);
    
    // Update fireball for 0.1s
    fireball.update(0.1);
    
    // The fireball should have moved TOWARDS the player (player is at ~ -50 after 0.1s update if we updated player)
    // Wait, let's see where the fireball SHOULD move.
    // If player is at 0 and moving to -500.
    // Turret is at -500.
    // Fireball should move in +Z direction to hit the player.
    
    expect(fireball.position.z).toBeGreaterThan(initialZ);
  });

  it('should be possible to destroy turrets in the trench', () => {
    // Turret at Z = -500
    const turretPos = new THREE.Vector3(0, 0, -500);
    const turret = new Turret(turretPos);
    entityManager.addTarget(turret);

    expect(turret.isExploded).toBe(false);

    // Mock player aiming at the turret
    // In checkAim, we need the target to be in front of the camera and within aimTolerance
    // Camera is at (0, 0.5, 0) looking at (0, 0.5, -1) by default in GameConfig
    const camera = new THREE.Camera();
    camera.position.set(0, 0.5, 0);
    camera.lookAt(0, 0.5, -1);
    camera.updateMatrixWorld();

    // Aim at the turret's NDC position
    const projected = turretPos.clone().project(camera);
    const input = { x: projected.x, y: projected.y, isFiring: true };

    // Update via CombatSystem or directly via state methods
    const strategy = new DogfightCombatStrategy();
    strategy.update(0.1, input, camera);

    expect(turret.isExploded).toBe(true);
  });
});
