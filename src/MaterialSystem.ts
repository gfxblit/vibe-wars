import * as THREE from 'three';
import { GameConfig } from './config';
import { state } from './state';

export type BloomCategory = 
  | 'Player'
  | 'StarField'
  | 'Surface'
  | 'Trench'
  | 'DeathStar'
  | 'TieFighter'
  | 'Laser'
  | 'Fireball'
  | 'Turret'
  | 'Torpedo';

interface MaterialEntry {
  material: THREE.Material;
  category: BloomCategory;
  baseColor: THREE.Color;
}

export class MaterialSystem {
  private materials: MaterialEntry[] = [];

  public register(material: THREE.Material, category: BloomCategory, baseColor: number) {
    const entry: MaterialEntry = {
      material,
      category,
      baseColor: new THREE.Color(baseColor),
    };
    this.materials.push(entry);

    // Set initial color based on current state
    const intensity = this.getBloomIntensity(category);
    if ((material as any).color) {
      (material as any).color.copy(entry.baseColor).multiplyScalar(intensity);
    }
  }

  public unregister(material: THREE.Material) {
    this.materials = this.materials.filter(entry => entry.material !== material);
  }

  public setBaseColor(material: THREE.Material, color: number) {
    const entry = this.materials.find(e => e.material === material);
    if (entry) {
      entry.baseColor.setHex(color);
      // Immediately update to avoid frame delay
      const intensity = this.getBloomIntensity(entry.category);
      if ((material as any).color) {
        (material as any).color.copy(entry.baseColor).multiplyScalar(intensity);
      }
    }
  }

  public update() {
    this.materials.forEach(entry => {
      const intensity = this.getBloomIntensity(entry.category);
      if ((entry.material as any).color) {
        (entry.material as any).color.copy(entry.baseColor).multiplyScalar(intensity);
      }
    });
  }

  private getBloomIntensity(category: BloomCategory): number {
    const debugFlag = (state as any)[`debug${category}Bloom`];
    
    let configFlag = false;
    switch (category) {
      case 'Player': configFlag = GameConfig.player.bloom; break;
      case 'StarField': configFlag = GameConfig.starField.bloom; break;
      case 'Surface': configFlag = GameConfig.stages.surface.bloom; break;
      case 'Trench': configFlag = GameConfig.stages.trench.bloom; break;
      case 'DeathStar': configFlag = GameConfig.stages.deathStar.bloom; break;
      case 'TieFighter': configFlag = GameConfig.tieFighter.bloom; break;
      case 'Laser': configFlag = GameConfig.laser.bloom; break;
      case 'Fireball': configFlag = GameConfig.fireball.bloom; break;
      case 'Turret': configFlag = GameConfig.turret.bloom; break;
      case 'Torpedo': configFlag = GameConfig.torpedo.bloom; break;
    }

    return (debugFlag ?? configFlag) ? 2.0 : 1.0;
  }
}

// Singleton instance for global access
export const materialSystem = new MaterialSystem();
