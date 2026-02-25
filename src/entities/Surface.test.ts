import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { Surface } from './Surface';
import { GameConfig } from '../config';
import { state } from '../state';

describe('Surface Entity', () => {
  let surface: Surface;

  beforeEach(() => {
    surface = new Surface();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create vertical line segments at grid intersections with jitter', () => {
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const geometry = gridMesh.geometry;
    const positions = geometry.attributes.position.array;
    const spacing = GameConfig.stages.surface.gridSpacing;

    let hasNoise = false;

    // Each segment has 2 points, each point has 3 components (x, y, z)
    // So 6 components per segment.
    for (let i = 0; i < positions.length; i += 6) {
      const x1 = positions[i];
      const y1 = positions[i + 1];
      const z1 = positions[i + 2];
      const x2 = positions[i + 3];
      const y2 = positions[i + 4];
      const z2 = positions[i + 5];

      expect(x1).toBeCloseTo(x2);
      expect(z1).toBeCloseTo(z2);
      expect(Math.min(y1, y2)).toBe(0);
      expect(Math.abs(y1 - y2)).toBe(GameConfig.stages.surface.verticalLineHeight);

      if (x1 % spacing !== 0 || z1 % spacing !== 0) {
        hasNoise = true;
      }
    }

    expect(hasNoise).toBe(true);
  });

  it('should recreate floor when updateGridSettings is called', () => {
    const floor = (surface as any).floor as THREE.Group;
    const initialGridMesh = floor.children[0] as THREE.LineSegments;

    // Call updateGridSettings
    surface.updateGridSettings(10, 5, 1.0);

    const newGridMesh = floor.children[0] as THREE.LineSegments;
    expect(newGridMesh).not.toBe(initialGridMesh);
    
    const positions = newGridMesh.geometry.attributes.position.array;
    // Check height of first segment
    expect(Math.abs(positions[1] - positions[4])).toBe(10);
  });

  it('should not use global state for initial height and noise if provided to constructor', () => {
    state.debugSurfaceVerticalLineHeight = 100;
    
    const customHeight = 20;
    const customNoise = 5;
    const surface = new Surface(customHeight, customNoise);
    
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const positions = gridMesh.geometry.attributes.position.array;
    
    expect(Math.abs(positions[1] - positions[4])).toBe(customHeight);
    
    state.debugSurfaceVerticalLineHeight = undefined;
  });

  it('should have a public updateGridSettings method', () => {
    expect(typeof surface.updateGridSettings).toBe('function');
  });

  it('should NOT recreate floor in update even if state changes', () => {
    const customSurface = new Surface(10, 0);
    const floor = (customSurface as any).floor as THREE.Group;
    const initialGridMesh = floor.children[0] as THREE.LineSegments;
    
    state.debugSurfaceVerticalLineHeight = 50;
    
    customSurface.update(0.1, new THREE.Vector3(0, 0, 0));
    
    const currentGridMesh = floor.children[0] as THREE.LineSegments;
    expect(currentGridMesh).toBe(initialGridMesh);
    
    const positions = currentGridMesh.geometry.attributes.position.array;
    expect(Math.abs(positions[1] - positions[4])).toBe(10);
    
    state.debugSurfaceVerticalLineHeight = undefined;
  });

  it('should initialize with a mesh containing a floor', () => {
    expect(surface.mesh).toBeDefined();
    // floor is added to mesh. 
    // We can check if it has children (floor + maybe towers if spawned immediately? No, towers spawn in update)
    // Floor is a Group containing GridHelper (LineSegments)
    expect(surface.mesh.children.length).toBeGreaterThan(0);
  });

  it('should spawn towers over time', () => {
    const initialTowers = surface.getTowers().length;
    expect(initialTowers).toBe(0);

    // Update with enough time to trigger spawn
    const { spawned } = surface.update(0.1, new THREE.Vector3(0, 0, 0)); // playerZ = 0
    
    expect(spawned.length).toBeGreaterThan(0);
    expect(surface.getTowers().length).toBeGreaterThan(0);
  });

  it('should remove distant towers', () => {
    // Force spawn a tower
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    const towers = surface.getTowers();
    const tower = towers[0];
    
    // Move player far ahead (negative Z)
    const playerZ = -2000;
    const { removed } = surface.update(0.1, new THREE.Vector3(0, 0, playerZ));
    
    expect(removed).toContain(tower);
    expect(surface.getTowers()).not.toContain(tower);
  });

  it('should detect floor collision', () => {
    const playerBox = new THREE.Box3();
    const position = new THREE.Vector3(0, GameConfig.stages.surface.floorY - 5, 0);
    
    const { floorHit } = surface.checkCollisions(playerBox, position);
    expect(floorHit).toBe(true);
  });
  
  it('should detect tower collision', () => {
      // Force spawn
      const { spawned } = surface.update(0.1, new THREE.Vector3(0, 0, 0));
      const tower = spawned[0];
      
      const playerBox = new THREE.Box3().setFromObject(tower.mesh); // Overlap exactly
      const position = new THREE.Vector3(0, 0, 0);
      
      const { towerHit } = surface.checkCollisions(playerBox, position);
      expect(towerHit).toBe(tower);
  });

  it('should spawn towers relative to the player X position', () => {
    const playerX = 5000;
    const playerPos = new THREE.Vector3(playerX, 0, 0);
    
    // Force spawn
    surface.update(0.1, playerPos);
    
    const towers = surface.getTowers();
    expect(towers.length).toBeGreaterThan(0);
    
    const tower = towers[0];
    const { width: surfaceWidth } = GameConfig.stages.surface;
    
    // Tower X should be within range of playerX
    // Implementation uses relative positioning based on playerX
    // Towers spawn within range: playerX +/- (surfaceWidth/2 - margin)
    expect(tower.mesh.position.x).toBeGreaterThan(playerX - surfaceWidth / 2);
    expect(tower.mesh.position.x).toBeLessThan(playerX + surfaceWidth / 2);
  });

  it('should have the floor follow the player with snapping', () => {
    const spacing = GameConfig.stages.surface.gridSpacing;
    const playerPos = new THREE.Vector3(spacing * 1.2, 0, -spacing * 2.7);
    
    surface.update(0.1, playerPos);
    
    const floor = (surface as any).floor as THREE.Group;
    expect(floor.position.x).toBe(spacing);
    expect(floor.position.z).toBe(-spacing * 3);
  });

  it('should have a grid large enough to cover the camera far plane plus snapping buffer', () => {
    const far = GameConfig.camera.far;
    const spacing = GameConfig.stages.surface.gridSpacing;
    
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const geometry = gridMesh.geometry;
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox!;
    
    const halfWidth = (bbox.max.x - bbox.min.x) / 2;
    const halfLength = (bbox.max.z - bbox.min.z) / 2;
    
    expect(halfWidth).toBeGreaterThanOrEqual(far + spacing * 2);
    expect(halfLength).toBeGreaterThanOrEqual(far + spacing * 2);
  });

  it('should use the correct color and full opacity for the grid material', () => {
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const material = gridMesh.material as THREE.LineBasicMaterial;
    
    expect(material.color.getHex()).toBe(GameConfig.stages.surface.color);
    expect(material.opacity).toBe(1.0);
    expect(material.transparent).toBe(false);
  });

  it('should have deterministic positions for the same world coordinates', () => {
    const spacing = GameConfig.stages.surface.gridSpacing;
    
    // Create first surface and get jittered positions at (0,0)
    const surface1 = new Surface(5, 20, 1.0);
    surface1.update(0.1, new THREE.Vector3(0, 0, 0));
    const floor1 = (surface1 as any).floor as THREE.Group;
    const pos1 = (floor1.children[0] as THREE.LineSegments).geometry.attributes.position.array;
    
    // Find a specific line near local (0,0)
    let localIndex = -1;
    for (let i = 0; i < pos1.length; i += 6) {
      if (Math.abs(pos1[i]) < spacing / 2 && Math.abs(pos1[i+2]) < spacing / 2) {
        localIndex = i;
        break;
      }
    }
    expect(localIndex).toBeGreaterThanOrEqual(0);
    const worldX1 = pos1[localIndex] + floor1.position.x;
    const worldZ1 = pos1[localIndex+2] + floor1.position.z;

    // Create second surface and snap it so (0,0) is at a different local position
    const surface2 = new Surface(5, 20, 1.0);
    // Snap floor so that local (spacing, 0) corresponds to world (spacing, 0)
    // Actually, local (0,0) + floor.position(spacing, 0) = world(spacing, 0)
    surface2.update(0.1, new THREE.Vector3(spacing, 0, 0)); 
    const floor2 = (surface2 as any).floor as THREE.Group;
    const pos2 = (floor2.children[0] as THREE.LineSegments).geometry.attributes.position.array;

    // Find the line that corresponds to the same world position (spacing, 0)
    // Wait, let's just check if worldX1, worldZ1 remains consistent.
    // In surface1, floor.pos = (0,0). Line at worldX1, worldZ1.
    // In surface2, floor.pos = (100,0). The line at worldX1, worldZ1 should now be at local (worldX1 - 100, worldZ1).
    let foundMatch = false;
    for (let i = 0; i < pos2.length; i += 6) {
      const wx = pos2[i] + floor2.position.x;
      const wz = pos2[i+2] + floor2.position.z;
      if (Math.abs(wx - worldX1) < 0.01 && Math.abs(wz - worldZ1) < 0.01) {
        foundMatch = true;
        break;
      }
    }
    expect(foundMatch).toBe(true);
  });

  it('should respect the density parameter', () => {
    const surfaceHigh = new Surface(5, 20, 1.0);
    const floorHigh = (surfaceHigh as any).floor as THREE.Group;
    const countHigh = (floorHigh.children[0] as THREE.LineSegments).geometry.attributes.position.count;

    const surfaceLow = new Surface(5, 20, 0.1);
    const floorLow = (surfaceLow as any).floor as THREE.Group;
    const countLow = (floorLow.children[0] as THREE.LineSegments).geometry.attributes.position.count;

    expect(countLow).toBeLessThan(countHigh);
    // Should be roughly 10%
    expect(countLow).toBeLessThan(countHigh * 0.2);
    expect(countLow).toBeGreaterThan(0);
  });

  it('should dispose resources correctly', () => {
    // Spawn some towers first
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(surface.getTowers().length).toBeGreaterThan(0);
    
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const geometryDisposeSpy = vi.spyOn(gridMesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(gridMesh.material as THREE.Material, 'dispose');
    
    surface.dispose();
    
    expect(geometryDisposeSpy).toHaveBeenCalled();
    expect(materialDisposeSpy).toHaveBeenCalled();
    expect(surface.getTowers().length).toBe(0);
  });

  it('should scale tower spawn interval with wave count', () => {
    // Mock Math.random to return 0.5 (average case: interval = towerSpawnInterval * 1.0)
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    // Wave 1: base interval (1.5s)
    state.wave = 1;
    surface = new Surface();
    // first update spawns immediately
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(surface.getTowers().length).toBe(1);

    // second update at 1.4s (total 1.5s) should NOT spawn?
    // Wait, nextTowerSpawnTime is set to elapsedTime + interval.
    // 0.1 + 1.5 = 1.6s.
    surface.update(1.4, new THREE.Vector3(0, 0, 0)); // elapsedTime = 1.5
    expect(surface.getTowers().length).toBe(1);
    surface.update(0.2, new THREE.Vector3(0, 0, 0)); // elapsedTime = 1.7
    expect(surface.getTowers().length).toBe(2);

    // Wave 10: multiplier 2.8, interval 1.5 / 2.8 ~= 0.536s
    state.wave = 10;
    surface = new Surface();
    surface.update(0.1, new THREE.Vector3(0, 0, 0));
    expect(surface.getTowers().length).toBe(1);
    // nextTowerSpawnTime = 0.1 + 0.536 = 0.636s.
    surface.update(0.4, new THREE.Vector3(0, 0, 0)); // elapsedTime = 0.5
    expect(surface.getTowers().length).toBe(1);
    surface.update(0.2, new THREE.Vector3(0, 0, 0)); // elapsedTime = 0.7
    expect(surface.getTowers().length).toBe(2);
  });
});
