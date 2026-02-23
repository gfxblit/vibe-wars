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
    
    // Static turrets no longer inherit player velocity.
    // direction is (0, 0, 1) (towards player at Z=0 from turret at Z=-500)
    // relativeSpeed is 40
    // Total velocity: (0, 0, 40)
    expect(fireball.velocity.z).toBeCloseTo(GameConfig.fireball.relativeSpeed);

    // Update fireball for 0.1s
    fireball.update(0.1);
    
    // It moved towards Z=0
    expect(fireball.position.z).toBeGreaterThan(initialZ); // -496 > -500
    
    // Closing speed check:
    // Initial distance: 500
    // After 0.1s:
    // Player would be at -50 (if updated)
    // Fireball is at -496
    // Relative distance: |-50 - (-496)| = 446. 446 < 500.
    const playerZAfterUpdate = -playerSpeed * 0.1;
    const relativeDistance = Math.abs(playerZAfterUpdate - fireball.position.z);
    expect(relativeDistance).toBeLessThan(500);
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

    const strategyConfig = {
      maxRange: GameConfig.laser.maxRange,
      fireCooldown: GameConfig.laser.cooldown,
      fireballCollisionRadiusNDC: GameConfig.fireball.collisionRadiusNDC,
      fireballPoints: GameConfig.fireball.points,
      baseForwardSpeed: GameConfig.player.baseForwardSpeed,
      torpedoSpeedMultiplier: GameConfig.torpedo.speedMultiplier,
    };

    // Update via CombatSystem or directly via state methods
    const strategy = new DogfightCombatStrategy(strategyConfig);
    strategy.update(0.1, input, camera);

    expect(turret.isExploded).toBe(true);
  });
});
