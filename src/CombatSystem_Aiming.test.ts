import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { CombatSystem } from './CombatSystem';
import { state, initGame } from './state';
import * as StateModule from './state';

vi.mock('./state', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./state')>();
  return {
    ...actual,
    spawnLasers: vi.fn(actual.spawnLasers),
    spawnTorpedo: vi.fn(actual.spawnTorpedo),
  };
});

describe('CombatSystem Aiming', () => {
  let camera: THREE.PerspectiveCamera;
  let combatSystem: CombatSystem;
  let parent: THREE.Group;

  beforeEach(() => {
    const scene = new THREE.Scene();
    const hudScene = new THREE.Scene();
    initGame(scene, hudScene);
    
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    parent = new THREE.Group();
    parent.add(camera);
    scene.add(parent);
    
    // Move parent
    parent.position.set(100, 0, 0);
    parent.updateMatrixWorld();
    
    // Camera is at (0,0,0) locally, but (100,0,0) in world
    expect(camera.position.x).toBe(0);
    const worldPos = new THREE.Vector3();
    camera.getWorldPosition(worldPos);
    expect(worldPos.x).toBe(100);

    combatSystem = new CombatSystem(camera);
    vi.clearAllMocks();
  });

  it('launches torpedo correctly when camera is parented and moved', () => {
    state.stage = 'TRENCH';
    state.stageManager!.reset();
    vi.spyOn(state.stageManager!, 'checkExhaustPortHit').mockReturnValue(true);
    
    // Aim straight ahead in NDC (0,0)
    // In world, this should be (100, 0, -something)
    const input = { x: 0, y: 0, isFiring: true };
    combatSystem.update(0.01, input);

    expect(StateModule.spawnTorpedo).toHaveBeenCalled();
    const velocity = (StateModule.spawnTorpedo as any).mock.calls[0][1];
    
    // If it uses camera.position (0,0,0), it will aim from (0,0,0) towards targetPoint.
    // targetPoint = (0,0,0.5).unproject(camera)
    // unproject uses camera.matrixWorld, so targetPoint WILL be in front of world camera.
    // targetPoint should be roughly (100, 0, -some_z)
    
    // If direction = targetPoint - (0,0,0), then direction.x will be around 100.
    // If direction = targetPoint - (100,0,0), then direction.x should be 0.
    
    // We expect the torpedo to go straight ahead (along -Z), so velocity.x should be near 0.
    expect(Math.abs(velocity.x)).toBeLessThan(0.01);
  });
});
