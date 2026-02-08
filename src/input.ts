import * as THREE from 'three';
import { state } from './state';
import { GameConfig } from './config';

export interface UserInput {
  x: number;
  y: number;
  isFiring: boolean;
  isLaunchingTorpedo: boolean;
}

export class InputManager {
  private input: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keyboardInput: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keyboardTarget: THREE.Vector2 = new THREE.Vector2(0, 0);
  private pointerInput: THREE.Vector2 = new THREE.Vector2(0, 0);
  private keys: Set<string> = new Set();
  private isDragging: boolean = false;
  private dragTouchId: number | null = null;
  private dragStartedOnFireButton: boolean = false;
  private isFiring: boolean = false;
  private isLaunchingTorpedo: boolean = false;
  private useRelativeInput: boolean = false;
  private pointerAnchor: THREE.Vector2 = new THREE.Vector2(0, 0);
  private fireButton: HTMLElement | null = null;
  
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.isLaunchingTorpedo = true;
    }
    this.keys.add(event.code);
    this.updateKeyboardTarget();
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.isLaunchingTorpedo = false;
    }
    this.keys.delete(event.code);
    this.updateKeyboardTarget();
  };

  private handleMouseDown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // Clicks on other UI elements should be ignored for game input.
    if (target !== this.fireButton && target.tagName !== 'CANVAS' && target !== document.body && target !== document.documentElement) {
      return;
    }

    if (event.button === 2) { // Right click
      this.isLaunchingTorpedo = true;
    } else {
      this.isFiring = true;
      this.startDrag(event.clientX, event.clientY, null, target === this.fireButton, false);
    }
  };

  private handlePointerUp = (event: MouseEvent) => {
    if (event.button === 2) { // Right click
      this.isLaunchingTorpedo = false;
    } else {
      this.isDragging = false;
      this.isFiring = false;
    }
  };

  private handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    this.updatePointerInput(event.clientX, event.clientY);
  };

  private handleTouchStart = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      const target = touch.target as HTMLElement;
      const isFireButton = target === this.fireButton;

      if (isFireButton) {
        this.isFiring = true;
        event.preventDefault();
      }

      // Valid targets: fire button, canvas, body, documentElement
      if (!isFireButton && target.tagName !== 'CANVAS' && target !== document.body && target !== document.documentElement) {
        continue;
      }

      if (!this.isDragging) {
        this.startDrag(touch.clientX, touch.clientY, touch.identifier, isFireButton, true);
      } else if (this.dragStartedOnFireButton && !isFireButton) {
        // HIJACK: Canvas touch takes over if drag started on fire button
        this.startDrag(touch.clientX, touch.clientY, touch.identifier, false, true);
      }
    }
  };

  private handleTouchEnd = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      
      if (touch.target === this.fireButton) {
        this.isFiring = false;
      }

      if (this.dragTouchId === touch.identifier) {
        this.isDragging = false;
        this.dragTouchId = null;
      }
    }
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging || this.dragTouchId === null) return;
    
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      if (touch.identifier === this.dragTouchId) {
        this.updatePointerInput(touch.clientX, touch.clientY);
        event.preventDefault(); // Prevent scrolling while playing
        break;
      }
    }
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

  private startDrag(clientX: number, clientY: number, identifier: number | null, startedOnFireButton: boolean, useRelative: boolean) {
    this.isDragging = true;
    this.dragTouchId = identifier;
    this.dragStartedOnFireButton = startedOnFireButton;
    this.useRelativeInput = useRelative;
    if (useRelative) {
      this.pointerAnchor.set(clientX, clientY);
      this.pointerInput.set(0, 0);
    } else {
      this.updatePointerInput(clientX, clientY);
    }
  }

  public setup(): void {
    this.fireButton = document.getElementById('fire-button');
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handlePointerUp);
    window.addEventListener('contextmenu', this.handleContextMenu);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', this.handleTouchEnd, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
  }

  public teardown(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handlePointerUp);
    window.removeEventListener('contextmenu', this.handleContextMenu);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchcancel', this.handleTouchEnd);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }

  public update(dt: number): void {
    // Smoothed keyboard input
    const step = GameConfig.input.sensitivity * dt;
    this.keyboardInput.x = this.moveTowards(this.keyboardInput.x, this.keyboardTarget.x, step);
    this.keyboardInput.y = this.moveTowards(this.keyboardInput.y, this.keyboardTarget.y, step);

    // Pointer decay when not dragging
    if (!this.isDragging) {
      const length = this.pointerInput.length();
      if (length > 1e-6) {
        const step = GameConfig.input.centeringSpeed * dt;
        const newLength = Math.max(0, length - step);
        this.pointerInput.multiplyScalar(newLength / length);
      } else {
        this.pointerInput.set(0, 0);
      }
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

  public getInput(): UserInput {
    return {
      x: this.input.x,
      y: this.input.y,
      isFiring: this.isFiring,
      isLaunchingTorpedo: this.isLaunchingTorpedo
    };
  }
}