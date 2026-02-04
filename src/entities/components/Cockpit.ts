import * as THREE from 'three';
import { GameConfig } from '../../config';
import { VisualComponent } from './VisualComponent';

export class Cockpit implements VisualComponent {
  public readonly mesh: THREE.Group;

  constructor() {
    this.mesh = new THREE.Group();
    this.mesh.name = 'cockpit';
    this.build();
  }

  private build(): void {
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
    
    this.mesh.add(noseMesh);
    this.mesh.add(innerNose);

    // Guns
    const gunGeometry = new THREE.BoxGeometry(guns.width, guns.height, guns.length);
    const gunEdges = new THREE.EdgesGeometry(gunGeometry);
    
    const leftGun = new THREE.LineSegments(gunEdges, materialPrimary);
    leftGun.position.set(-guns.offset.x, guns.offset.y, guns.offset.z);
    
    const rightGun = new THREE.LineSegments(gunEdges, materialPrimary);
    rightGun.position.set(guns.offset.x, guns.offset.y, guns.offset.z);
    
    this.mesh.add(leftGun);
    this.mesh.add(rightGun);
  }
}
