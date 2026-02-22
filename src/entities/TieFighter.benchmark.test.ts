import { describe, it } from 'vitest';
import { TieFighter } from './TieFighter';
import { DumbAIStrategy } from './DumbAIStrategy';
import * as THREE from 'three';

describe('TieFighter Performance Benchmark', () => {
  it('should measure update performance', () => {
    const count = 1000;
    const iterations = 1000;
    const fighters: TieFighter[] = [];
    const strategy = new DumbAIStrategy();

    // Create fighters
    for (let i = 0; i < count; i++) {
      fighters.push(new TieFighter(strategy));
    }

    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      for (const tf of fighters) {
        // Force color update every frame to stress test the loop
        tf.update(0.016, pos, quat, 10, false, undefined, 0xFF0000 + (i % 2));
      }
    }

    const end = performance.now();
    console.log(`TieFighter update x ${count * iterations}: ${(end - start).toFixed(2)}ms`);

    // Cleanup
    fighters.forEach(f => f.dispose());
  });
});
