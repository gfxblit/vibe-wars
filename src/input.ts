import * as THREE from 'three';
import { state } from './state';
import { GameConfig } from './config';

export class InputManager {
  private input: THREE.Vector2 = new THREE.Vector2(0, 0);
  private virtualCursor: THREE.Vector2 = new THREE.Vector2(0, 0);
  private isDragging: boolean = false; // Kept for touch
  private useRelativeInput: boolean = false;
  private pointerAnchor: THREE.Vector2 = new THREE.Vector2(0, 0);
  
  private handleClick = () => {
    if (typeof document.body.requestPointerLock === 'function') {
      document.body.requestPointerLock();
    }
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    if (this.useRelativeInput) {
        this.virtualCursor.set(0, 0);
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (document.pointerLockElement === document.body) {
      this.useRelativeInput = false;
      this.updatePointerLockInput(event.movementX, event.movementY);
    }
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.isDragging = true;
    this.useRelativeInput = true;
    if (event.touches.length > 0) {
      this.pointerAnchor.set(event.touches[0].clientX, event.touches[0].clientY);
      this.virtualCursor.set(0, 0);
    }
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging) return;
    if (event.touches.length > 0) {
      this.updateTouchInput(event.touches[0].clientX, event.touches[0].clientY);
    }
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  private updatePointerLockInput(movementX: number, movementY: number) {
    const { width, height } = state.viewport;
    const sensitivity = GameConfig.input.sensitivity; 
    
    const dx = width > 0 ? (movementX / width) * sensitivity : 0;
    const dy = height > 0 ? (movementY / height) * sensitivity : 0;
    
    this.virtualCursor.x += dx;
    this.virtualCursor.y -= dy; 

    // Clamp
    this.virtualCursor.x = THREE.MathUtils.clamp(this.virtualCursor.x, -1, 1);
    this.virtualCursor.y = THREE.MathUtils.clamp(this.virtualCursor.y, -1, 1);
  }

  private updateTouchInput(clientX: number, clientY: number) {
     const dx = clientX - this.pointerAnchor.x;
     const dy = this.pointerAnchor.y - clientY; // Invert Y: up is positive
     
     const x = dx / GameConfig.input.touchRadius;
     const y = dy / GameConfig.input.touchRadius;
     
     this.virtualCursor.set(
       THREE.MathUtils.clamp(x, -1, 1),
       THREE.MathUtils.clamp(y, -1, 1)
     );
  }

  public setup(): void {
    document.body.addEventListener('click', this.handleClick);
    window.addEventListener('mouseup', this.handleMouseUp); // For touch end mainly
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
  }

  public teardown(): void {
    document.body.removeEventListener('click', this.handleClick);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }

  public update(_dt: number): void {
    // Just copy virtualCursor to input
    this.input.copy(this.virtualCursor);
  }

  public getInput(): THREE.Vector2 {
    return this.input;
  }
}