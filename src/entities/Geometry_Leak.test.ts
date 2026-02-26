import * as THREE from 'three';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tower } from './Tower';
import { Turret } from './Turret';
import { TieFighter } from './TieFighter';
import { Player } from './Player';
import { DumbAIStrategy } from './DumbAIStrategy';

describe('Geometry Memory Leak', () => {
  let boxDisposeSpy: any;
  let sphereDisposeSpy: any;
  let cylinderDisposeSpy: any;
  let planeDisposeSpy: any;

  beforeEach(() => {
    boxDisposeSpy = vi.spyOn(THREE.BoxGeometry.prototype, 'dispose');
    sphereDisposeSpy = vi.spyOn(THREE.SphereGeometry.prototype, 'dispose');
    cylinderDisposeSpy = vi.spyOn(THREE.CylinderGeometry.prototype, 'dispose');
    planeDisposeSpy = vi.spyOn(THREE.PlaneGeometry.prototype, 'dispose');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Reset static fields in TieFighter to test first-time initialization
    (TieFighter as any).bodyGeo = undefined;
    (TieFighter as any).wingGeo = undefined;
  });

  it('Tower should dispose of its temporary source geometries', () => {
    const initialBoxDisposeCount = boxDisposeSpy.mock.calls.length;
    
    // Tower creates 2 BoxGeometries for its EdgesGeometry
    new Tower(new THREE.Vector3(0, 0, 0));
    
    const finalBoxDisposeCount = boxDisposeSpy.mock.calls.length;
    
    // It should have disposed 2 temporary BoxGeometries
    expect(finalBoxDisposeCount - initialBoxDisposeCount).toBe(2);
  });

  it('Turret should dispose of its temporary source geometries', () => {
    const initialBoxDisposeCount = boxDisposeSpy.mock.calls.length;
    const initialSphereDisposeCount = sphereDisposeSpy.mock.calls.length;
    const initialCylinderDisposeCount = cylinderDisposeSpy.mock.calls.length;
    
    // Turret creates:
    // 1. baseGeo: BoxGeometry
    // 2. domeGeo: SphereGeometry
    // 3. bodyGeo: BoxGeometry
    // 4. barrelGeo: CylinderGeometry
    new Turret(new THREE.Vector3(0, 0, 0));
    
    const finalBoxDisposeCount = boxDisposeSpy.mock.calls.length;
    const finalSphereDisposeCount = sphereDisposeSpy.mock.calls.length;
    const finalCylinderDisposeCount = cylinderDisposeSpy.mock.calls.length;
    
    expect(finalBoxDisposeCount - initialBoxDisposeCount).toBe(2);
    expect(finalSphereDisposeCount - initialSphereDisposeCount).toBe(1);
    expect(finalCylinderDisposeCount - initialCylinderDisposeCount).toBe(1);
  });

  it('TieFighter should dispose of its temporary source geometries on first initialization', () => {
    const initialSphereDisposeCount = sphereDisposeSpy.mock.calls.length;
    const initialPlaneDisposeCount = planeDisposeSpy.mock.calls.length;

    new TieFighter(new DumbAIStrategy());

    const finalSphereDisposeCount = sphereDisposeSpy.mock.calls.length;
    const finalPlaneDisposeCount = planeDisposeSpy.mock.calls.length;

    expect(finalSphereDisposeCount - initialSphereDisposeCount).toBe(1);
    expect(finalPlaneDisposeCount - initialPlaneDisposeCount).toBe(1);
  });

  it('Player should dispose of its temporary source geometries', () => {
    const initialBoxDisposeCount = boxDisposeSpy.mock.calls.length;

    new Player();

    const finalBoxDisposeCount = boxDisposeSpy.mock.calls.length;

    expect(finalBoxDisposeCount - initialBoxDisposeCount).toBe(1);
  });
});
