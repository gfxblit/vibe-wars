import * as THREE from 'three';
import { Entity } from './Entity';
import { GameConfig } from '../config';

export class TieFighter extends Entity {
  public readonly mesh: THREE.Group;
  private elapsedTime: number = 0;
  private readonly offset = new THREE.Vector3();
  
  public isExploded: boolean = false;
  private pieceVelocities: THREE.Vector3[] = [];

  public get position(): THREE.Vector3 {
    return this.mesh.position;
  }

  constructor() {
    super();
    this.mesh = new THREE.Group();
    
    const size = GameConfig.tieFighter.meshSize;
    const color = GameConfig.tieFighter.meshColor;
    const material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });

    // Body (Sphere)
    const bodyGeo = new THREE.SphereGeometry(size / 3, 8, 8);
    const body = new THREE.Mesh(bodyGeo, material);
    this.mesh.add(body);

    // Left Wing (Plane)
    const wingGeo = new THREE.PlaneGeometry(size, size);
    const leftWing = new THREE.Mesh(wingGeo, material);
    leftWing.position.set(-size * 0.8, 0, 0);
    leftWing.rotation.y = Math.PI / 2;
    this.mesh.add(leftWing);

    // Right Wing (Plane)
    const rightWing = new THREE.Mesh(wingGeo, material);
    rightWing.position.set(size * 0.8, 0, 0);
    rightWing.rotation.y = Math.PI / 2;
    this.mesh.add(rightWing);
  }

  public explode(): void {
    if (this.isExploded) return;
    this.isExploded = true;

    // Generate random velocities for each piece
    this.mesh.children.forEach(() => {
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        this.pieceVelocities.push(velocity);
    });
  }

  public update(deltaTime: number, playerPosition: THREE.Vector3, playerQuaternion: THREE.Quaternion): void {
    if (this.isExploded) {
        // Move pieces
        this.mesh.children.forEach((child, index) => {
            if (this.pieceVelocities[index]) {
                child.position.addScaledVector(this.pieceVelocities[index], deltaTime);
                child.rotation.x += deltaTime * 2;
                child.rotation.y += deltaTime * 2;
            }
        });
        return; 
    }

    this.elapsedTime += deltaTime;

    // Calculate relative offset in front of player
    this.offset.set(0, 0, -GameConfig.tieFighter.distance);

    // Apply horizontal oscillation
    const oscillation = Math.sin(this.elapsedTime * GameConfig.tieFighter.oscillationFrequency) * GameConfig.tieFighter.oscillationAmplitude;
    this.offset.x += oscillation;

    // Rotate the offset by the player's quaternion to keep it relative to player's heading
    this.offset.applyQuaternion(playerQuaternion);

    // Add player's position to get world position
    this.position.copy(playerPosition).add(this.offset);

    // Maintain orientation matching player for now
    this.mesh.quaternion.copy(playerQuaternion);
  }
}