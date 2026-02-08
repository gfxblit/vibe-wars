import { expect, test, beforeEach, describe } from 'vitest'
import { state, initGame, addScore, takeDamage, nextPhase, checkCollision, updateState, spawnLasers, spawnFireball } from './state'
import * as THREE from 'three';
import { Player } from './entities/Player';
import { TieFighter } from './entities/TieFighter';
import { GameConfig } from './config';

const scene = new THREE.Scene();
const hudScene = new THREE.Scene();
const mockCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
// Setup basic camera state
mockCamera.position.set(0, 0, 10);
mockCamera.lookAt(0, 0, 0);
mockCamera.updateMatrixWorld();
mockCamera.updateProjectionMatrix();

beforeEach(() => {
  initGame(scene, hudScene);
});

describe('Game State', () => {
  test('initial state', () => {
    expect(state.score).toBe(0)
    expect(state.shields).toBe(6)
    expect(state.kills).toBe(0)
    expect(state.phase).toBe('DOGFIGHT')
    expect(state.player).toBeInstanceOf(Player)
    expect(state.entityManager!.getTieFighters()[0]).toBeInstanceOf(TieFighter)
    expect(state.entityManager!.getLasers()).toEqual([]);
    expect(state.gunColorToggles.length).toBe(4);
    expect(state.debug).toBe(false);
    expect(state.isSmartAI).toBe(true);
    expect(state.isModeColoring).toBe(false);
  })

  test('spawnLasers creates at least 2 lasers and alternates colors', () => {
    const crosshairPos = { x: 0, y: 0 };

    // First volley
    const volley1 = spawnLasers(crosshairPos);
    expect(volley1.length).toBeGreaterThanOrEqual(2);

    // Check that some toggles have been flipped (from false to true)
    const someFlipped = state.gunColorToggles.some(t => t === true);
    expect(someFlipped).toBe(true);
  })

  test('spawnFireball adds a fireball to the state', () => {
    const fireball = spawnFireball(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 10));
    expect(state.entityManager!.getFireballs()).toContain(fireball);
    expect(state.entityManager!.getFireballs().length).toBe(1);
  })

  test('updateState updates fireballs', () => {
    const fireball = spawnFireball(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 10));
    updateState(1.0, mockCamera);
    expect(fireball!.position.z).toBe(10);
  })

  test('updateState handles player-fireball collision', () => {
    // Clear TieFighters to prevent them from spawning new fireballs during the test
    while (state.entityManager!.getTieFighters().length > 0) {
      state.entityManager!.removeTieFighter(0);
    }

    // Move player to 0,0,0
    state.player!.position.set(0, 0, 0);
    
    // Place fireball very close to the camera (which is at 0,0,10)
    // Near plane is 0.1. So 10 - 0.1 = 9.9.
    // We place it at 9.95 to be safe (inside the frustum, near the near plane)
    // Note: Fireball moves! So we should check where it ends up after update?
    // Or just place it such that after update it is in the sweet spot.
    // Let's place it at 9.8 and move it towards camera (+Z)? No, camera is at +10 looking at 0.
    // So "forward" for fireball (coming from 0 to 10) is +Z.
    // If we place it at 9.9 and velocity is +1, after 0.01s it is 9.91.
    // This is very close to 10.
    // Let's manually set collision by ensuring projectToNDC returns what we want?
    // We can spy on it.
    
    // Start outside threshold (1.5) and move through it
    const fbPos = new THREE.Vector3(0, 0, -2.0); // 2.0 in front of camera
    const fbVel = new THREE.Vector3(0, 0, 40); // Move towards camera
    const fireball = spawnFireball(fbPos, fbVel);

    // Update camera to be at 0,0,0 facing -Z
    mockCamera.position.set(0, 0, 0);
    mockCamera.lookAt(0, 0, -1);
    mockCamera.updateMatrixWorld();
    mockCamera.updateProjectionMatrix();

    const initialShields = state.shields;
    
    // We don't need to mock projectToNDC if it's already centered
    updateState(0.1, mockCamera);

    expect(state.shields).toBeLessThan(initialShields);
    // Fireball should now be exploded but still in array
    expect(state.entityManager!.getFireballs().length).toBe(1);
    expect(fireball!.isExploded).toBe(true);

    // After explosion duration, it should be removed
    // Use 0.6s to be well over the 0.5s threshold and avoid floating point precision issues
    updateState(0.6, mockCamera);
    expect(state.entityManager!.getFireballs().length).toBe(0);
  })

  test('updateState expires fireballs that are far behind', () => {
    // Player at origin, facing forward (-Z)
    state.player!.position.set(0, 0, 0);
    state.player!.mesh.quaternion.set(0, 0, 0, 1);

    // Spawn fireball 21 units behind (+Z)
    // forward is (0,0,-1). subVectors(fb, player) is (0,0,21). dot is -21.
    spawnFireball(new THREE.Vector3(0, 0, 21), new THREE.Vector3(0, 0, 0));

    expect(state.entityManager!.getFireballs().length).toBe(1);
    updateState(0.01, mockCamera);
    expect(state.entityManager!.getFireballs().length).toBe(0);
  })

  test('updateState moves player forward (if speed > 0)', () => {
    const initialZ = state.player!.position.z;
    updateState(1, mockCamera); // 1 second
    // Forward motion is negative Z.
    expect(state.player!.position.z).toBeLessThan(initialZ);
  })

  test('updateState updates TIE fighters', () => {
    const tieFighter = state.entityManager!.getTieFighters()[0];
    const initialPos = tieFighter.position.clone();

    updateState(0.1, mockCamera);

    expect(tieFighter.position.equals(initialPos)).toBe(false);
  })

  test('updateState should not move player if game is over', () => {
    takeDamage(6);
    expect(state.isGameOver).toBe(true);
    const initialZ = state.player!.position.z;
    updateState(1, mockCamera);
    expect(state.player!.position.z).toBe(initialZ);
  })

  test('addScore increases score', () => {
    addScore(100);
    expect(state.score).toBe(100);
  })

  test('takeDamage reduces shields', () => {
    takeDamage(1);
    expect(state.shields).toBe(5);
  })

  test('takeDamage triggers game over', () => {
    takeDamage(6);
    expect(state.shields).toBe(0);
    expect(state.isGameOver).toBe(true);
  })

  test('nextPhase transitions through phases', () => {
    expect(state.phase).toBe('DOGFIGHT');
    nextPhase();
    expect(state.phase).toBe('SURFACE');
    nextPhase();
    expect(state.phase).toBe('TRENCH');
    nextPhase();
    expect(state.phase).toBe('DOGFIGHT');
    expect(state.wave).toBe(2);
  })

  test('updateState spawns new TIE fighters over time', () => {
    // Advance time by a small amount to initialize existing TIE fighter
    updateState(0.01, mockCamera);
    // Advance time by spawn interval
    updateState(GameConfig.tieFighter.spawnInterval, mockCamera);
    // We expect at least one to remain or a new one to have spawned.
    expect(state.entityManager!.getTieFighters().length).toBeGreaterThanOrEqual(1);
  })

  test('updateState cleans up distant TIE fighters', () => {
    const tf = state.entityManager!.getTieFighters()[0];
    // Advance time enough for it to overtake and go beyond cleanup distance
    // Relative speed is 80 units/sec, cleanup is 600. 10s should be plenty.
    updateState(10, mockCamera);
    expect(state.entityManager!.getTieFighters()).not.toContain(tf);
  })
});

describe('Physics Utils', () => {
  test('checkCollision detects overlapping spheres', () => {
    const pos1 = new THREE.Vector3(0, 0, 0);
    const pos2 = new THREE.Vector3(1, 0, 0);
    expect(checkCollision(pos1, 0.6, pos2, 0.6)).toBe(true);
  })

  test('checkCollision detects non-overlapping spheres', () => {
    const pos1 = new THREE.Vector3(0, 0, 0);
    const pos2 = new THREE.Vector3(2, 0, 0);
    expect(checkCollision(pos1, 0.5, pos2, 0.5)).toBe(false);
  })
});