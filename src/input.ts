import * as THREE from 'three';
import { state } from './state';
import { GameConfig } from './config';

export class InputManager {
  private input: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keyboardInput: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keyboardTarget: THREE.Vector2 = new THREE.Vector2(0, 0);
  private pointerInput: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keys: Set<string> = new Set();
  private isDragging: boolean = false;
  private useRelativeInput: boolean = false;
  private pointerAnchor: THREE.Vector2 = new THREE.Vector2(0, 0);
  
  private handleKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
    this.updateKeyboardTarget();
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
    this.updateKeyboardTarget();
  };

  private handleMouseDown = () => {
    this.isDragging = true;
    this.useRelativeInput = false;
  };

  private handleMouseUp = () => {
    this.isDragging = false;
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    this.updatePointerInput(event.clientX, event.clientY);
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.isDragging = true;
    this.useRelativeInput = true;
    if (event.touches.length > 0) {
      this.pointerAnchor.set(event.touches[0].clientX, event.touches[0].clientY);
      this.pointerInput.set(0, 0);
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
    let x: number;
    let y: number;

    if (this.useRelativeInput) {
      const dx = clientX - this.pointerAnchor.x;
      const dy = this.pointerAnchor.y - clientY; // Invert Y: up is positive
      x = dx / GameConfig.input.touchRadius;
      y = dy / GameConfig.input.touchRadius;
    } else {
      const { centerX, centerY } = state.viewport;
      
      // Normalize to [-1, 1]
      x = (clientX - centerX) / centerX;
      y = (centerY - clientY) / centerY; // Invert Y: top is 1, bottom is -1
    }
    
    this.pointerInput.set(
      THREE.MathUtils.clamp(x, -1, 1),
      THREE.MathUtils.clamp(y, -1, 1)
    );
  }

  private updateKeyboardTarget() {
    let x = 0;
    let y = 0;

    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) x += 1;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) y += 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) y -= 1;

    this.keyboardTarget.set(x, y);
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
    // Smoothed keyboard input
    const step = GameConfig.input.sensitivity * dt;
    this.keyboardInput.x = this.moveTowards(this.keyboardInput.x, this.keyboardTarget.x, step);
    this.keyboardInput.y = this.moveTowards(this.keyboardInput.y, this.keyboardTarget.y, step);

    // Pointer decay when not dragging
    if (!this.isDragging) {
      const decayStep = GameConfig.input.centeringSpeed * dt;
      this.pointerInput.x = this.moveTowards(this.pointerInput.x, 0, decayStep);
      this.pointerInput.y = this.moveTowards(this.pointerInput.y, 0, decayStep);
    }

    // Merge keyboard and pointer input
    this.input.set(
        THREE.MathUtils.clamp(this.keyboardInput.x + this.pointerInput.x, -1, 1),
        THREE.MathUtils.clamp(this.keyboardInput.y + this.pointerInput.y, -1, 1)
    );
  }

  private moveTowards(current: number, target: number, maxDelta: number): number {
    if (Math.abs(target - current) <= maxDelta) return target;
    return current + Math.sign(target - current) * maxDelta;
  }

  public getInput(): THREE.Vector2 {
    return this.input;
  }
}