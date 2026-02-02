import * as THREE from 'three';
import { state } from './state';

export class InputManager {
  private input: THREE.Vector2 = new THREE.Vector2(0, 0);
  private targetInput: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keys: Set<string> = new Set();
  private isDragging: boolean = false;
  
  private readonly SENSITIVITY = 5.0; // Units per second

  private handleKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
    this.updateTargetInput();
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
    this.updateTargetInput();
  };

  private handleMouseDown = () => {
    this.isDragging = true;
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    this.targetInput.set(0, 0);
    this.input.set(0, 0); // Snap back on release
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    this.updatePointerInput(event.clientX, event.clientY);
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.isDragging = true;
    if (event.touches.length > 0) {
      this.updatePointerInput(event.touches[0].clientX, event.touches[0].clientY);
    }
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging) return;
    if (event.touches.length > 0) {
      this.updatePointerInput(event.touches[0].clientX, event.touches[0].clientY);
    }
    event.preventDefault(); // Prevent scrolling while playing
  };

  private updatePointerInput(clientX: number, clientY: number) {
    const { centerX, centerY } = state.viewport;
    
    // Normalize to [-1, 1]
    const x = (clientX - centerX) / centerX;
    const y = (centerY - clientY) / centerY; // Invert Y: top is 1, bottom is -1
    
    this.targetInput.set(
      THREE.MathUtils.clamp(x, -1, 1),
      THREE.MathUtils.clamp(y, -1, 1)
    );
    
    // For pointer input, we usually want immediate response
    this.input.copy(this.targetInput);
  }

  private updateTargetInput() {
    let x = 0;
    let y = 0;

    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) x += 1;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) y += 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) y -= 1;

    this.targetInput.set(x, y);
  }

  public setup(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
  }

  public teardown(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }

  public update(dt: number): void {
    // Keyboard input still uses gradual movement
    if (this.keys.size > 0 || (this.input.lengthSq() > 0 && !this.isDragging)) {
      const step = this.SENSITIVITY * dt;
      this.input.x = this.moveTowards(this.input.x, this.targetInput.x, step);
      this.input.y = this.moveTowards(this.input.y, this.targetInput.y, step);
    }
    // If dragging, pointer input already set this.input immediately in updatePointerInput
  }

  private moveTowards(current: number, target: number, maxDelta: number): number {
    if (Math.abs(target - current) <= maxDelta) return target;
    return current + Math.sign(target - current) * maxDelta;
  }

  public getInput(): THREE.Vector2 {
    return this.input;
  }
}


  