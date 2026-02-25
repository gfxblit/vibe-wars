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

  it('should update floor when updateGridSettings is called', () => {
    const floor = (surface as any).floor as THREE.Group;
    const initialGridMesh = floor.children[0] as THREE.LineSegments;

    // Call updateGridSettings
    surface.updateGridSettings(10, 5, 1.0);

    const currentGridMesh = floor.children[0] as THREE.LineSegments;
    // Now it SHOULD be the same mesh but with updated geometry
    expect(currentGridMesh).toBe(initialGridMesh);
    
    const positions = currentGridMesh.geometry.attributes.position.array;
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

  it('should recreate floor in update if state changes', () => {
    const customSurface = new Surface(10, 0);
    const floor = (customSurface as any).floor as THREE.Group;
    
    state.debugSurfaceVerticalLineHeight = 50;
    
    customSurface.update(0.1, new THREE.Vector3(0, 0, 0));
    
    const currentGridMesh = floor.children[0] as THREE.LineSegments;
    // For now it might still be a new mesh if we haven't optimized it yet, 
    // but the point is it should have the new height.
    const positions = currentGridMesh.geometry.attributes.position.array;
    expect(Math.abs(positions[1] - positions[4])).toBe(50);
    
    state.debugSurfaceVerticalLineHeight = undefined;
  });

  it('should NOT recreate floor in update if neither position nor state changes', () => {
    const customSurface = new Surface(10, 0);
    const floor = (customSurface as any).floor as THREE.Group;
    const initialGridMesh = floor.children[0] as THREE.LineSegments;
    
    // No change to position or state
    customSurface.update(0.1, new THREE.Vector3(0, 0, 0));
    
    const currentGridMesh = floor.children[0] as THREE.LineSegments;
    expect(currentGridMesh).toBe(initialGridMesh);
  });

  it('should initialize with a mesh containing a floor', () => {
    expect(surface.mesh).toBeDefined();
    expect(surface.mesh.children.length).toBeGreaterThan(0);
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
    const mesh1 = floor1.children[0] as THREE.LineSegments;
    const pos1 = mesh1.geometry.attributes.position.array;
    
    // Pick the first generated line
    const localIndex = 0;
    const worldX1 = pos1[localIndex] + floor1.position.x;
    const worldZ1 = pos1[localIndex+2] + floor1.position.z;

    // Create second surface and snap it so (0,0) is at a different local position
    const surface2 = new Surface(5, 20, 1.0);
    surface2.update(0.1, new THREE.Vector3(spacing, 0, 0)); 
    const floor2 = (surface2 as any).floor as THREE.Group;
    const mesh2 = floor2.children[0] as THREE.LineSegments;
    const pos2 = mesh2.geometry.attributes.position.array;
    const count2 = mesh2.geometry.drawRange.count * 3; // Number of numbers in position array to check

    console.log(`Floor1 pos: ${floor1.position.x}, ${floor1.position.z}`);
    console.log(`Floor2 pos: ${floor2.position.x}, ${floor2.position.z}`);
    console.log(`World target: ${worldX1}, ${worldZ1}`);

    // Find the line that corresponds to the same world position
    let foundMatch = false;
    for (let i = 0; i < count2; i += 6) {
      const wx = pos2[i] + floor2.position.x;
      const wz = pos2[i+2] + floor2.position.z;
      // if (i < 60) console.log(`Line ${i/6}: World (${wx}, ${wz})`);
      // Increased tolerance to 0.1 for more robustness
      if (Math.abs(wx - worldX1) < 0.1 && Math.abs(wz - worldZ1) < 0.1) {
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
    const floor = (surface as any).floor as THREE.Group;
    const gridMesh = floor.children[0] as THREE.LineSegments;
    const geometryDisposeSpy = vi.spyOn(gridMesh.geometry, 'dispose');
    const materialDisposeSpy = vi.spyOn(gridMesh.material as THREE.Material, 'dispose');
    
    surface.dispose();
    
    expect(geometryDisposeSpy).toHaveBeenCalled();
    expect(materialDisposeSpy).toHaveBeenCalled();
  });

  it('should detect floor collision', () => {
    const position = new THREE.Vector3(0, GameConfig.stages.surface.floorY - 5, 0);
    const floorHit = surface.checkFloorCollision(position);
    expect(floorHit).toBe(true);
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
