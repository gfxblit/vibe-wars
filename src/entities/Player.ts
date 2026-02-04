import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class Player extends Entity {
  public readonly mesh: THREE.Group;
  private readonly visualMesh: THREE.LineSegments;

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();

    const geometry = new THREE.BoxGeometry(
      GameConfig.player.meshSize,
      GameConfig.player.meshSize,
      GameConfig.player.meshSize
    );
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: GameConfig.player.meshColor });
    this.visualMesh = new THREE.LineSegments(edges, material);

    this.mesh.add(this.visualMesh);
    
    const cockpit = this.buildCockpit();
    this.mesh.add(cockpit);

    this.position.set(0, 0, 0);
  }

  private buildCockpit(): THREE.Group {
    const cockpit = new THREE.Group();
    cockpit.name = 'cockpit';
    
    const { colors, nose, guns } = GameConfig.cockpit;
    const materialPrimary = new THREE.LineBasicMaterial({ color: colors.primary });
    const materialSecondary = new THREE.LineBasicMaterial({ color: colors.secondary });

    // Nose
    // Cylinder radius is distance to corner. width is side-to-side.
    // radius = (width / 2) * sqrt(2)
    const radiusBase = (nose.widthBase / 2) * Math.sqrt(2);
    const radiusTip = (nose.widthTip / 2) * Math.sqrt(2);
    
    const noseGeometry = new THREE.CylinderGeometry(radiusTip, radiusBase, nose.length, 4, 1);
    // Align to axes (Cylinder 4 segments is diamond by default)
    noseGeometry.rotateY(Math.PI / 4);
    // Point forward (Y -> -Z)
    noseGeometry.rotateX(-Math.PI / 2);

    const noseEdges = new THREE.EdgesGeometry(noseGeometry);
    const noseMesh = new THREE.LineSegments(noseEdges, materialPrimary);
    noseMesh.position.set(nose.position.x, nose.position.y, nose.position.z);
    
    // Inner Nose (Blue)
    const innerNose = new THREE.LineSegments(noseEdges, materialSecondary);
    innerNose.scale.set(0.8, 0.8, 0.9); 
    innerNose.position.copy(noseMesh.position);
    
    cockpit.add(noseMesh);
    cockpit.add(innerNose);

    // Guns
    const gunGeometry = new THREE.BoxGeometry(guns.width, guns.height, guns.length);
    const gunEdges = new THREE.EdgesGeometry(gunGeometry);
    
    const leftGun = new THREE.LineSegments(gunEdges, materialPrimary);
    leftGun.position.set(-guns.offset.x, guns.offset.y, guns.offset.z);
    
    const rightGun = new THREE.LineSegments(gunEdges, materialPrimary);
    rightGun.position.set(guns.offset.x, guns.offset.y, guns.offset.z);
    
    cockpit.add(leftGun);
    cockpit.add(rightGun);

    return cockpit;
  }

  public update(input: THREE.Vector2, deltaTime: number): void {
    // Relative turning amounts
    const yawAmount = -input.x * GameConfig.player.turnSpeedYaw * deltaTime;
    const pitchAmount = input.y * GameConfig.player.turnSpeedPitch * deltaTime;

    // Create relative rotation quaternion from Euler angles
    // Order 'YXZ' is standard for relative orientation changes (Yaw then Pitch)
    const qRelative = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(pitchAmount, yawAmount, 0, 'YXZ')
    );

    // Apply relative rotation to current orientation
    // Post-multiplication applies the rotation in the object's local space
    this.mesh.quaternion.multiply(qRelative);

    // Visual Bank (Roll) - non-accumulating
    const bankRoll = -input.x * GameConfig.player.maxBank;
    this.visualMesh.rotation.z = bankRoll;

    // Calculate forward vector based on current orientation
    // Initial direction is negative Z
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);

    // Move position forward
    this.position.add(forward.multiplyScalar(GameConfig.player.forwardSpeed * deltaTime));
  }
}
