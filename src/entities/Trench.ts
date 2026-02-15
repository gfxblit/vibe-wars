import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';
import { Turret } from './Turret';

export class Trench extends Entity {
  public mesh: THREE.Group;
  private turrets: Turret[] = [];

  constructor(turretSize: number = GameConfig.stages.trench.turretSize, turretFireballSize: number = GameConfig.stages.trench.fireballSize) {
    super();
    this.mesh = new THREE.Group();

    const { width: trenchWidth, height: trenchHeight, length: trenchLength } = GameConfig.stages.trench;
    const halfWidth = trenchWidth / 2;
    const halfHeight = trenchHeight / 2;
    
    // Add periodic detail lines (grid) and boundaries
    const { 
      verticalDetailSpacing: trenchVerticalDetailSpacing, 
      horizontalDetailSpacing: trenchHorizontalDetailSpacing,
      verticalDetailColor: trenchVerticalDetailColor,
      horizontalDetailColor: trenchHorizontalDetailColor
    } = GameConfig.stages.trench;

    // Vertical detail lines and longitudinal boundaries
    const verticalVertices: number[] = [];
    const leftX = -halfWidth;
    const rightX = halfWidth;
    const floorY = -halfHeight;
    const topY = halfHeight;

    // Main longitudinal boundary lines (Top and Bottom of walls)
    verticalVertices.push(leftX, topY, 0, leftX, topY, -trenchLength);    // Left top
    verticalVertices.push(leftX, floorY, 0, leftX, floorY, -trenchLength); // Left bottom
    verticalVertices.push(rightX, topY, 0, rightX, topY, -trenchLength);   // Right top
    verticalVertices.push(rightX, floorY, 0, rightX, floorY, -trenchLength); // Right bottom

    // Periodic vertical lines on walls
    for (let z = 0; z >= -trenchLength; z -= trenchVerticalDetailSpacing) {
      // Left wall vertical line
      verticalVertices.push(leftX, floorY, z, leftX, topY, z);
      // Right wall vertical line
      verticalVertices.push(rightX, floorY, z, rightX, topY, z);
    }

    // Back wall outline
    verticalVertices.push(leftX, floorY, -trenchLength, rightX, floorY, -trenchLength); // bottom
    verticalVertices.push(leftX, topY, -trenchLength, rightX, topY, -trenchLength);    // top
    verticalVertices.push(leftX, floorY, -trenchLength, leftX, topY, -trenchLength);    // left
    verticalVertices.push(rightX, floorY, -trenchLength, rightX, topY, -trenchLength);  // right

    const verticalGeometry = new THREE.BufferGeometry();
    verticalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verticalVertices, 3));
    const verticalLines = new THREE.LineSegments(
      verticalGeometry, 
      new THREE.LineBasicMaterial({ color: trenchVerticalDetailColor })
    );
    verticalLines.name = 'trench-grid-vertical';
    this.mesh.add(verticalLines);

    // Horizontal lines on floor (Longitudinal lanes)
    const horizontalVertices: number[] = [];
    // Skip the boundary lines which are already added above
    for (let x = leftX + trenchHorizontalDetailSpacing; x < rightX; x += trenchHorizontalDetailSpacing) {
      // Floor longitudinal line
      horizontalVertices.push(x, floorY, 0, x, floorY, -trenchLength);
    }

    const horizontalGeometry = new THREE.BufferGeometry();
    horizontalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(horizontalVertices, 3));
    const horizontalLines = new THREE.LineSegments(
      horizontalGeometry, 
      new THREE.LineBasicMaterial({ color: trenchHorizontalDetailColor })
    );
    horizontalLines.name = 'trench-grid-horizontal';
    this.mesh.add(horizontalLines);

    this.addObstacles(turretSize, turretFireballSize);
  }

  private isValidCatwalkZ(z: number): boolean {
    const { catwalkStartZ, catwalkEndZ } = GameConfig.stages.trench;
    // Corresponds to loop: for (let z = start; z > end; z -= spacing)
    // So z must be <= start and > end
    return z <= catwalkStartZ && z > catwalkEndZ;
  }

  private getCatwalkY(z: number): number {
    const { catwalkSpacing, catwalkYOffset } = GameConfig.stages.trench;
    // Alternating height: some high, some low
    return (Math.abs(z) % (catwalkSpacing * 2) === 0) ? catwalkYOffset : -catwalkYOffset;
  }

  private addObstacles(turretSize: number, turretFireballSize: number) {
    // Add catwalks using configuration
    const { catwalkStartZ, catwalkEndZ, catwalkSpacing, catwalkDepth, width: trenchWidth, exhaustPortZOffset, height: trenchHeight, catwalkColor } = GameConfig.stages.trench;

    const boxGeometry = new THREE.BoxGeometry(trenchWidth, 10, catwalkDepth);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
    const material = new THREE.LineBasicMaterial({
      color: catwalkColor,
    });

    for (let z = catwalkStartZ; z > catwalkEndZ; z -= catwalkSpacing) {
      const catwalk = new THREE.LineSegments(edgesGeometry, material);
      catwalk.name = 'catwalk';
      const y = this.getCatwalkY(z);
      catwalk.position.set(0, y, z);
      this.mesh.add(catwalk);
    }

    // Add Turrets along the walls
    const { spacing: turretSpacing } = GameConfig.turret;
    const halfWidth = trenchWidth / 2;

    for (let z = catwalkStartZ; z > catwalkEndZ; z -= turretSpacing) {
      // Alternate sides
      const isLeft = Math.floor(Math.abs(z) / turretSpacing) % 2 === 0;
      const x = isLeft ? -halfWidth : halfWidth;
      // Deterministic height within trench walls based on z
      // This creates a pattern player can learn (e.g. high, low, middle)
      const y = (((Math.abs(z) / turretSpacing) % 3) - 1) * trenchHeight * 0.25;
      
      const turret = new Turret(new THREE.Vector3(x, y, z), turretSize, turretFireballSize);
      // Rotate turret so its base is against the wall
      // The turret's default "up" is Y, and it looks towards +Z.
      // On the left wall (x = -50), it should look towards +X by default.
      if (isLeft) {
        turret.mesh.rotation.y = Math.PI / 2;
      } else {
        turret.mesh.rotation.y = -Math.PI / 2;
      }
      this.turrets.push(turret);
      this.mesh.add(turret.mesh);
    }

    boxGeometry.dispose();

    // Add Exhaust Port at the end
    const { exhaustPortColor } = GameConfig.stages.trench;
    const portGeometry = new THREE.BoxGeometry(20, 20, 20);
    const portEdges = new THREE.EdgesGeometry(portGeometry);
    const portMaterial = new THREE.LineBasicMaterial({
      color: exhaustPortColor,
    });
    const port = new THREE.LineSegments(portEdges, portMaterial);
    port.name = 'exhaust-port';
    // Place port just before the end of the trench visual
    port.position.set(0, -trenchHeight / 2 + 10, catwalkEndZ - exhaustPortZOffset);
    this.mesh.add(port);

    portGeometry.dispose();
  }

  public checkObstacleCollision(position: THREE.Vector3): number | null {
    const {
      catwalkStartZ,
      catwalkEndZ,
      catwalkSpacing,
      catwalkCollisionThreshold,
      catwalkHeightThreshold
    } = GameConfig.stages.trench;

    const pZ = position.z;
    const pY = position.y;

    // Optimization: Quick bounds check
    // We expand the range slightly to catch the collision volume of the first/last obstacles
    if (pZ > catwalkStartZ + catwalkCollisionThreshold || pZ < catwalkEndZ - catwalkCollisionThreshold) {
      return null;
    }

    // Find the nearest possible catwalk Z
    const catwalkZ = Math.round(pZ / catwalkSpacing) * catwalkSpacing;

    // Verify this Z corresponds to an actual generated catwalk
    if (!this.isValidCatwalkZ(catwalkZ)) {
      return null;
    }

    // Check depth (Z) collision
    if (Math.abs(pZ - catwalkZ) < catwalkCollisionThreshold) {
      // Check height (Y) collision
      const expectedY = this.getCatwalkY(catwalkZ);

      if (Math.abs(pY - expectedY) < catwalkHeightThreshold) {
        return catwalkZ;
      }
    }

    return null;
  }

  public checkPortCollision(position: THREE.Vector3): boolean {
    const { catwalkEndZ, exhaustPortZOffset, height: trenchHeight } = GameConfig.stages.trench;
    const portZ = catwalkEndZ - exhaustPortZOffset;
    const portY = -trenchHeight / 2 + 10;
    const portX = 0;
    const portSize = 20;
    const halfSize = portSize / 2;

    return (
      Math.abs(position.x - portX) < halfSize + 5 && // Add some tolerance for the player's ship
      Math.abs(position.y - portY) < halfSize + 5 &&
      Math.abs(position.z - portZ) < halfSize + 5
    );
  }

  public getTurrets(): Turret[] {
    return this.turrets;
  }

  update(_deltaTime: number) {
    // Turrets are updated by the EntityManager as registered targets.
  }

  dispose() {
    this.turrets.forEach(t => t.dispose());
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Line) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        } else if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        }
      }
    });
  }
}
