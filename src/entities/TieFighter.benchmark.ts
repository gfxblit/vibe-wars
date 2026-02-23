import { bench, describe } from 'vitest';
import { TieFighter } from './TieFighter';
import { DumbAIStrategy } from './DumbAIStrategy';
import * as THREE from 'three';

describe('TieFighter Performance', () => {
  const count = 100;
  const fighters: TieFighter[] = [];
  const playerPosition = new THREE.Vector3();
  const playerQuaternion = new THREE.Quaternion();

  for (let i = 0; i < count; i++) {
    fighters.push(new TieFighter(new DumbAIStrategy()));
  }

  bench('update 100 TieFighters', () => {
    for (const fighter of fighters) {
      fighter.update(0.016, playerPosition, playerQuaternion, 10, false);
    }
  });
});
