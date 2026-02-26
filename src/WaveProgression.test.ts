// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// 1. Mock Stages
vi.mock('./stages/DogfightStage', () => ({ DogfightStage: class { constructor() {} cleanup() {} update() {} } }));
vi.mock('./stages/SurfaceStage', () => ({ SurfaceStage: class { constructor() {} cleanup() {} update() {} } }));
vi.mock('./stages/TrenchStage', () => ({ TrenchStage: class { constructor() {} cleanup() {} update() {} } }));
vi.mock('./stages/ExplosionStage', () => ({ ExplosionStage: class { constructor() {} cleanup() {} update() {} } }));

// 2. Mock State
vi.mock('./state', async () => {
    return {
        state: {
            wave: 1,
            stage: 'DOGFIGHT',
            shields: 3,
            kills: 0,
            player: null,
            stageManager: null
        }
    };
});

// 3. Mock GameConfig
vi.mock('./config', async () => {
    const actual = await vi.importActual('./config');
    const mutableConfig = JSON.parse(JSON.stringify(actual.GameConfig));
    mutableConfig.getDifficultyMultiplier = vi.fn((wave: number) => Math.min(1.0 + (wave - 1) * 0.2, 2.8));
    mutableConfig.getScaledInterval = vi.fn((base: number, multiplier: number) => base / multiplier);
    mutableConfig.getScaledSpeed = vi.fn((base: number, multiplier: number) => base * multiplier);
    
    return {
        ...actual,
        GameConfig: mutableConfig
    };
});

// 4. Mock THREE
vi.mock('three', async () => {
  const actual = await vi.importActual('three');
  
  class MockVector3 {
    constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
    set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
    copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
    sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
    subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this; }
    add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
    normalize() { return this; }
    addScaledVector() { return this; }
    multiplyScalar() { return this; }
    clone() { return new MockVector3(this.x, this.y, this.z); }
    distanceTo() { return 10; }
    applyQuaternion() { return this; }
  }

  class MockQuaternion {
      constructor(x=0, y=0, z=0, w=1) { this.x=x; this.y=y; this.z=z; this.w=w; }
      setFromEuler() { return this; }
      copy(q) { this.x=q.x; this.y=q.y; this.z=q.z; this.w=q.w; return this; }
      clone() { return new MockQuaternion(this.x, this.y, this.z, this.w); }
      set() { return this; }
      conjugate() { return this; }
      invert() { return this; }
  }

  return {
    ...actual,
    Scene: class { add() {} remove() {} },
    WebGLRenderer: class { render() {} setSize() {} },
    Group: class { 
      constructor() { 
          this.children = []; 
          this.position = new MockVector3(); 
          this.rotation = { x: 0, y: 0, z: 0 }; 
          this.quaternion = new MockQuaternion();
          this.scale = { setScalar: () => {}, x: 1, y: 1, z: 1 }; 
      } 
      add(child) { this.children.push(child); } 
      remove() {} 
      updateWorldMatrix() {}
      getWorldPosition() { return new MockVector3(); }
      traverse() {}
      lookAt() {}
      rotateX() {}
      rotateY() {}
      rotateZ() {}
    },
    Mesh: class { 
      constructor(geo, mat) { 
          this.position = new MockVector3(); 
          this.rotation = { x: 0, y: 0, z: 0 }; 
          this.quaternion = new MockQuaternion();
          this.material = mat || { 
              color: { 
                  setHex: function() { return this; }, 
                  getHex: () => 0,
                  multiplyScalar: function() { return this; },
                  copy: function() { return this; }
              }, 
              dispose: () => {} 
          }; 
          this.geometry = geo || { dispose: () => {}, getAttribute: () => ({ count: 0, array: [] }), getIndex: () => null }; 
          this.scale = { setScalar: () => {}, x: 1, y: 1, z: 1 }; 
          this.children = []; 
      } 
      updateWorldMatrix() {}
      getWorldPosition() { return new MockVector3(); }
      add() {}
      traverse(cb) { cb(this); }
      lookAt() {}
      rotateX() {}
      rotateY() {}
      rotateZ() {}
    },
    Vector3: MockVector3,
    Quaternion: MockQuaternion,
    SphereGeometry: class { dispose() {} getAttribute() { return { count: 0, array: [] }; } getIndex() { return null; } },
    PlaneGeometry: class { dispose() {} getAttribute() { return { count: 0, array: [] }; } getIndex() { return null; } },
    BoxGeometry: class { dispose() {} getAttribute() { return { count: 0, array: [] }; } getIndex() { return null; } },
    CylinderGeometry: class { dispose() {} getAttribute() { return { count: 0, array: [] }; } getIndex() { return null; } },
    ConeGeometry: class { dispose() {} getAttribute() { return { count: 0, array: [] }; } getIndex() { return null; } },
    MeshBasicMaterial: class { 
        constructor(params) { 
            this.color = { 
                setHex: function() { return this; }, 
                getHex: () => 0,
                multiplyScalar: function() { return this; },
                copy: function() { return this; }
            }; 
            if (params && params.color) this.color.getHex = () => params.color;
        } 
        dispose() {} 
        clone() { return this; } 
    },
    LineBasicMaterial: class { 
        constructor(params) { 
            this.color = { 
                setHex: function() { return this; }, 
                getHex: () => 0,
                multiplyScalar: function() { return this; },
                copy: function() { return this; }
            }; 
            if (params && params.color) this.color.getHex = () => params.color;
        } 
        dispose() {} 
        clone() { return this; } 
    },
    BufferGeometry: class { 
        constructor() { this.attributes = {}; }
        setFromPoints() { return this; } 
        dispose() {} 
        setAttribute(name, attr) { this.attributes[name] = attr; }
        getAttribute(name) { return this.attributes[name] || { count: 0, array: [] }; }
        getIndex() { return null; }
    },
    LineSegments: class { 
        constructor(geo, mat) { 
            this.position = new MockVector3(); 
            this.rotation = { x: 0, y: 0, z: 0 }; 
            this.quaternion = new MockQuaternion();
            this.geometry = geo || { dispose: () => {}, setAttribute: () => {}, computeBoundingSphere: () => {} }; 
            this.material = mat || { dispose: () => {} };
            this.scale = { setScalar: () => {}, x: 1, y: 1, z: 1 };
        }
    },
    Float32BufferAttribute: class {},
    Box3: class {
        constructor() { this.min = new MockVector3(); this.max = new MockVector3(); }
        setFromObject() {}
        expandByObject() {}
        intersectsBox() { return false; }
    },
    EdgesGeometry: class {
        constructor() { this.attributes = {}; }
        getAttribute(name) { return { count: 0, array: [] }; }
        getIndex() { return null; }
        dispose() {}
    }
  };
});

// Import after mocks
import { GameConfig } from './config';
import { state } from './state';
import { StageManager } from './StageManager';
import { TieFighter } from './entities/TieFighter';
import { Turret } from './entities/Turret';
import { Surface } from './entities/Surface';
import { SurfaceSpawner } from './entities/SurfaceSpawner';
import { SurfaceObstacleFactory } from './entities/SurfaceObstacleFactory';
import { EntityManager } from './entities/EntityManager';
import { DumbAIStrategy } from './entities/DumbAIStrategy';

describe('Wave Progression System', () => {
  beforeEach(() => {
    state.wave = 1;
    state.stage = 'DOGFIGHT';
    state.shields = 3;
    state.kills = 0;
    
    // Mock player
    state.player = {
        position: new THREE.Vector3(),
        mesh: {
            quaternion: new THREE.Quaternion(),
            position: new THREE.Vector3()
        }
    } as any;

    vi.clearAllMocks();
  });

  describe('GameConfig Difficulty Multiplier', () => {
    it('should increase multiplier with wave number', () => {
      const w1 = GameConfig.getDifficultyMultiplier(1);
      const w2 = GameConfig.getDifficultyMultiplier(2);
      const w3 = GameConfig.getDifficultyMultiplier(3);
      const w10 = GameConfig.getDifficultyMultiplier(10);

      expect(w1).toBe(1.0);
      expect(w2).toBeGreaterThan(w1);
      expect(w3).toBeGreaterThan(w2);
      expect(w10).toBeLessThanOrEqual(2.8); // Cap check
    });

    it('should scale intervals inversely', () => {
      const baseInterval = 1.0;
      const multiplier = 2.0;
      const scaled = GameConfig.getScaledInterval(baseInterval, multiplier);
      expect(scaled).toBe(0.5);
    });

    it('should scale speeds directly', () => {
      const baseSpeed = 100;
      const multiplier = 2.0;
      const scaled = GameConfig.getScaledSpeed(baseSpeed, multiplier);
      expect(scaled).toBe(200);
    });
  });

  describe('StageManager Progression', () => {
    let mockScene: any;
    let stageManager: StageManager;

    beforeEach(() => {
      mockScene = new THREE.Scene();
      stageManager = new StageManager(mockScene);
    });

    it('should follow Wave 1 sequence correctly', () => {
      state.stage = 'DOGFIGHT';
      stageManager.goToNextStage();
      expect(state.stage).toBe('TRENCH');

      stageManager.goToNextStage();
      expect(state.stage).toBe('EXPLOSION');

      stageManager.goToNextStage();
      expect(state.wave).toBe(2);
      expect(state.stage).toBe('DOGFIGHT');
    });

    it('should follow Default sequence for Wave 2+', () => {
      state.wave = 2;
      state.stage = 'DOGFIGHT';
      
      stageManager.goToNextStage();
      expect(state.stage).toBe('SURFACE');

      stageManager.goToNextStage();
      expect(state.stage).toBe('TRENCH');

      stageManager.goToNextStage();
      expect(state.stage).toBe('EXPLOSION');

      stageManager.goToNextStage();
      expect(state.wave).toBe(3);
      expect(state.stage).toBe('DOGFIGHT');
    });

    it('should award shield bonus on wave completion', () => {
      state.stage = 'EXPLOSION';
      state.shields = 1;
      
      stageManager.goToNextStage(); 
      
      expect(state.shields).toBe(2);
    });

    it('should cap shield bonus at max', () => {
      state.stage = 'EXPLOSION';
      state.shields = GameConfig.player.maxShields;
      
      stageManager.goToNextStage();
      
      expect(state.shields).toBe(GameConfig.player.maxShields);
    });
  });

  describe('Entity Difficulty Scaling', () => {
    it('TieFighter fire rate should increase with wave', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        
        state.wave = 1;
        const fighter1 = new TieFighter(new DumbAIStrategy());
        
        (GameConfig.getDifficultyMultiplier as any).mockClear();
        
        fighter1.update(100, new THREE.Vector3(), new THREE.Quaternion(), 0);
        
        expect(GameConfig.getDifficultyMultiplier).toHaveBeenCalledWith(1);
        
        state.wave = 10;
        fighter1.update(100, new THREE.Vector3(), new THREE.Quaternion(), 0);
        expect(GameConfig.getDifficultyMultiplier).toHaveBeenCalledWith(10);
    });

    it('Turret fire rate should increase with wave', () => {
        (GameConfig.getDifficultyMultiplier as any).mockClear();
        
        const turret = new Turret(new THREE.Vector3());
        
        state.wave = 5;
        
        turret.update(100, new THREE.Vector3(0, 0, 10), new THREE.Quaternion(), 0);
        
        expect(GameConfig.getDifficultyMultiplier).toHaveBeenCalledWith(5);
    });

    it('Surface tower spawn rate should increase with wave', () => {
       (GameConfig.getDifficultyMultiplier as any).mockClear();
       const scene = new THREE.Scene();
       const factory = new SurfaceObstacleFactory();
       const entityManager = new EntityManager(scene);
       const spawner = new SurfaceSpawner(scene, factory, entityManager);
       
       state.wave = 3;
       
       spawner.update(100, new THREE.Vector3());
       
       expect(GameConfig.getDifficultyMultiplier).toHaveBeenCalledWith(3);
    });
  });
});
