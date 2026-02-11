import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class DeathStar extends Entity {
  public mesh: THREE.Group;
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor(position: THREE.Vector3) {
    super();
    this.mesh = new THREE.Group();
    this.mesh.name = 'DeathStar';

    const radius = GameConfig.stage.deathStarSize;
    const hullMaterial = new THREE.LineBasicMaterial({
      color: GameConfig.stage.deathStarColor,
      transparent: true,
      opacity: 0.6,
    });
    this.materials.push(hullMaterial);

    const dishMaterial = new THREE.LineBasicMaterial({
      color: GameConfig.stage.deathStarDishColor,
      transparent: true,
      opacity: 0.9,
    });
    this.materials.push(dishMaterial);

    // 1. Hull: Two hemispheres with a gap for the trench
    this.createHull(radius, hullMaterial);

    // 2. Trench: Interior details
    this.createTrench(radius, hullMaterial);

    // 3. Dish: Superlaser dish
    this.createDish(radius, dishMaterial);

    this.mesh.position.copy(position);
  }

  private createHull(radius: number, material: THREE.Material): void {
    const segmentsX = GameConfig.stage.deathStarHullSegmentsX;
    const segmentsY = GameConfig.stage.deathStarHullSegmentsY;
    const trenchHalfWidthPhi = 0.04; // Roughly the angle of the trench gap

    // Upper Hull
    const upperGeom = new THREE.SphereGeometry(
      radius,
      segmentsX,
      segmentsY,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2 - trenchHalfWidthPhi
    );
    this.geometries.push(upperGeom);
    const upperEdges = new THREE.EdgesGeometry(upperGeom, 1);
    this.geometries.push(upperEdges);
    const upper = new THREE.LineSegments(upperEdges, material);
    upper.name = 'DeathStarHullUpper';
    this.mesh.add(upper);

    // Lower Hull
    const lowerGeom = new THREE.SphereGeometry(
      radius,
      segmentsX,
      segmentsY,
      0,
      Math.PI * 2,
      Math.PI / 2 + trenchHalfWidthPhi,
      Math.PI / 2 - trenchHalfWidthPhi
    );
    this.geometries.push(lowerGeom);
    const lowerEdges = new THREE.EdgesGeometry(lowerGeom, 1);
    this.geometries.push(lowerEdges);
    const lower = new THREE.LineSegments(lowerEdges, material);
    lower.name = 'DeathStarHullLower';
    this.mesh.add(lower);
  }

  private createTrench(radius: number, material: THREE.Material): void {
    const trenchWidth = GameConfig.stage.deathStarTrenchWidth;
    const segments = GameConfig.stage.deathStarTrenchSegments;

    // Interior horizontal rings for the trench
    const createRing = (y: number, r: number, name?: string) => {
      const ringGeom = new THREE.CylinderGeometry(r, r, 0, segments, 1, true);
      this.geometries.push(ringGeom);
      const ringEdges = new THREE.EdgesGeometry(ringGeom, 1);
      this.geometries.push(ringEdges);
      const ring = new THREE.LineSegments(ringEdges, material);
      ring.position.y = y;
      if (name) ring.name = name;
      return ring;
    };

    // Trench floor (recessed slightly)
    const floorRadius = radius * 0.98;
    this.mesh.add(createRing(trenchWidth / 2, radius, 'DeathStarTrenchEdgeTop')); // Top edge
    this.mesh.add(createRing(-trenchWidth / 2, radius, 'DeathStarTrenchEdgeBottom')); // Bottom edge
    this.mesh.add(createRing(trenchWidth / 2, floorRadius, 'DeathStarTrenchInnerTop')); // Inner top edge
    this.mesh.add(createRing(-trenchWidth / 2, floorRadius, 'DeathStarTrenchInnerBottom')); // Inner bottom edge

    // Vertical lines in the trench (optional, but adds "vector" feel)
    const verticalLinesGeom = new THREE.BufferGeometry();
    this.geometries.push(verticalLinesGeom);
    const positions = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle);
      const z = Math.sin(angle);
      
      // Line from top outer to top inner
      positions.push(x * radius, trenchWidth / 2, z * radius);
      positions.push(x * floorRadius, trenchWidth / 2, z * floorRadius);
      
      // Line from bottom outer to bottom inner
      positions.push(x * radius, -trenchWidth / 2, z * radius);
      positions.push(x * floorRadius, -trenchWidth / 2, z * floorRadius);

      // Line from top inner to bottom inner
      positions.push(x * floorRadius, trenchWidth / 2, z * floorRadius);
      positions.push(x * floorRadius, -trenchWidth / 2, z * floorRadius);
    }
    verticalLinesGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const verticalLines = new THREE.LineSegments(verticalLinesGeom, material);
    verticalLines.name = 'DeathStarTrenchVerticals';
    this.mesh.add(verticalLines);
  }

  private createDish(radius: number, material: THREE.Material): void {
    const dishRadius = GameConfig.stage.deathStarDishSize;
    const segments = GameConfig.stage.deathStarDishSegments;
    
    // Dish is a shallow cone, recessed
    const dishDepth = dishRadius * 0.4;
    const dishGeom = new THREE.ConeGeometry(dishRadius, dishDepth, segments, 2, true);
    this.geometries.push(dishGeom);
    const dishEdges = new THREE.EdgesGeometry(dishGeom, 1);
    this.geometries.push(dishEdges);
    const dish = new THREE.LineSegments(dishEdges, material);
    dish.name = 'DeathStarDish';
    
    // Position the dish on the hull
    // We want it in the northern hemisphere, offset
    const phi = Math.PI * 0.25;
    const theta = Math.PI * 0.25;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    // Recess it slightly by moving it towards center
    const dishPos = new THREE.Vector3(x, y, z);
    const centerDir = dishPos.clone().normalize();
    dish.position.copy(dishPos).addScaledVector(centerDir, -dishDepth * 0.5);
    
    // Orient it to face "out" (away from center)
    // lookAt(0,0,0) points local +Z towards origin. 
    // Cone is along Y, so we rotate -90 deg around X to align cone axis (Y) with Z.
    dish.lookAt(new THREE.Vector3(0, 0, 0));
    dish.rotateX(-Math.PI / 2);
    
    this.mesh.add(dish);

    // Add some concentric rings inside the dish for more "vector" detail
    for (let i = 1; i < 3; i++) {
        const ringR = (dishRadius * i) / 3;
        const ringGeom = new THREE.CircleGeometry(ringR, segments);
        this.geometries.push(ringGeom);
        const ringEdges = new THREE.EdgesGeometry(ringGeom, 1);
        this.geometries.push(ringEdges);
        const ring = new THREE.LineSegments(ringEdges, material);
        // Position it slightly "up" from the tip of the cone
        ring.position.y = -dishDepth / 2 + (dishDepth * i) / 3;
        ring.rotation.x = Math.PI / 2;
        dish.add(ring);
    }
  }

  update(deltaTime: number) {
    // Rotation for some visual interest
    this.mesh.rotation.y += deltaTime * 0.05;
  }

  dispose() {
    this.geometries.forEach(g => g.dispose());
    this.materials.forEach(m => m.dispose());
    this.geometries = [];
    this.materials = [];
    
    // Remove children from mesh group
    for (let i = this.mesh.children.length - 1; i >= 0; i--) {
      this.mesh.remove(this.mesh.children[i]);
    }
  }
}
